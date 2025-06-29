export async function uploadToS3(file: File): Promise<string> {
    const presignRes = await fetch(
      "/api/s3-presign?filename=" + encodeURIComponent(file.name)
    );
    const { url, fields } = await presignRes.json();

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append("file", file);

    const uploadRes = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!uploadRes.ok) throw new Error("S3 upload failed");

    // Construct the actual public URL if bucket is public
    return `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}.s3.${process.env.NEXT_PUBLIC_AWS_REGION}.amazonaws.com/${fields.key}`;
  }