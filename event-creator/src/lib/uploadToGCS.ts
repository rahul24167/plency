export async function uploadToGCS(file: File): Promise<string> {
  // 1. Get a presigned URL from the API route
  const presignRes = await fetch(
    `/api/gcs-presign?filename=${encodeURIComponent(file.name)}&contentType=${file.type}`
  );
  
  if (!presignRes.ok) {
    throw new Error('Failed to get signed URL');
  }

  const { uploadUrl, publicUrl } = await presignRes.json();

  // 2. Upload the file directly to GCS using the signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': file.type,
    },
    body: file,
  });

  if (!uploadRes.ok) {
    throw new Error('Failed to upload file to GCS');
  }

  // 3. Return the public URL to store in state or database
  return publicUrl;
}
