import imageCompression from "browser-image-compression";
const fileTypes = {
  banner: { maxSizeMB: 1.5 },
  generic: { maxSizeMB: 1.5 },
  thumbnail: { maxSizeMB: 0.5 },
} as const;

type FileType = keyof typeof fileTypes;
export async function compressFile(
  file: File,
  type: FileType = "generic",
  limitWH?: number,
  fileTypeOverride?: string
): Promise<File> {
  const isImage = file.type.startsWith("image/");
  const { maxSizeMB} = fileTypes[type];
  const isLargerThanLimit = file.size / 1024 / 1024 > maxSizeMB;

  if (isImage && isLargerThanLimit) {
    let low = 0.3; // lower bound (more compression)
    let high = 0.95; // upper bound (near original)
    let best: File | null = null;
    const TARGET_BYTES = maxSizeMB * 1024 * 1024;

    for (let i = 0; i < 8; i++) {
      // ~8 iterations is plenty
      const q = (low + high) / 2;
      const out = await imageCompression(file, {
        useWebWorker: true,
        initialQuality: q,
        ...(limitWH ? { maxWidthOrHeight: limitWH } : {}),
        ...(fileTypeOverride ? { fileType: fileTypeOverride } : {}),
        // NOTE: we do NOT set maxSizeMB here; we control size via binary search.
      });

      if (out.size <= TARGET_BYTES) {
        best = out; // feasible -> keep it and try higher quality
        low = q;
      } else {
        high = q; // too big -> lower quality
      }
    }
    return best || file;
  }
  // Handle videos or other types as-is for now
  return file;
}

export async function uploadToGCS(
  file: File,
  type: FileType = "generic"
): Promise<string> {
  const isImage = file.type.startsWith("image/");
  // 1. Get a presigned URL from the API route
  const compressedFile = isImage ? await compressFile(file, type) : file;
  const presignRes = await fetch(
    `/api/gcs-presign?filename=${encodeURIComponent(
      compressedFile.name
    )}&contentType=${compressedFile.type}`
  );

  if (!presignRes.ok) {
    throw new Error("Failed to get signed URL");
  }

  const { uploadUrl, publicUrl } = await presignRes.json();

  // 2. Upload the file directly to GCS using the signed URL
  const uploadRes = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": compressedFile.type,
    },
    body: compressedFile,
  });

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file to GCS");
  }

  // 3. Return the public URL to store in state or database
  const baseUrl = "https://storage.googleapis.com/plency-bucket/";
  const trimmedPath = publicUrl.startsWith(baseUrl)
    ? publicUrl.slice(baseUrl.length)
    : publicUrl;

  return trimmedPath;
}
