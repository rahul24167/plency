import imageCompression from 'browser-image-compression';
type FileType =  'banner' | 'generic';
export async function compressFile(file: File, type: FileType = "generic"): Promise<File> {
  const isImage = file.type.startsWith('image/');

  if (isImage) {
    const options = {
      maxSizeMB: type === "banner" ? 1 : 0.5, // ~500 KB target for banners, ~1 MB for generic
      maxWidthOrHeight: type === "banner" ? 1920 : 1600, // Resize for web display
      useWebWorker: true,
    };
    const compressed = await imageCompression(file, options);
    return compressed;
  }
  // Handle videos or other types as-is for now
  return file;
}

export async function uploadToGCS(file: File, type: FileType = "generic"): Promise<string> {
  const isImage = file.type.startsWith('image/');
  // 1. Get a presigned URL from the API route
  const compressedFile = isImage ? await compressFile(file, type) : file;
  const presignRes = await fetch(
    `/api/gcs-presign?filename=${encodeURIComponent(compressedFile.name)}&contentType=${compressedFile.type}`
  );
  
  if (!presignRes.ok) {
    throw new Error('Failed to get signed URL');
  }

  const { uploadUrl, publicUrl } = await presignRes.json();

  // 2. Upload the file directly to GCS using the signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': compressedFile.type,
    },
    body: compressedFile,
  });

  if (!uploadRes.ok) {
    throw new Error('Failed to upload file to GCS');
  }

  // 3. Return the public URL to store in state or database
  return publicUrl;
}
