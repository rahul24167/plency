'use client';
import { useState } from 'react';
//import supabase from '@/event-creator/src/lib/supabase';

export default function CreateProjectPage() {
  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [name, setName] = useState('');
  const [clientName, setClientName] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [positions, setPositions] = useState<{ width: number; height: number; x: number; y: number; z: number }[]>([]);

  const handleImageChange = (files: FileList | null) => {
    if (!files) return;
    const fileArr = Array.from(files);
    setImages(fileArr);
    setPositions(fileArr.map(() => ({ width: 100, height: 100, x: 0, y: 0, z: 1 })));
  };

  const handlePositionChange = (index: number, field: string, value: number) => {
    setPositions(prev => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!heroImage) return alert("Hero image is required");

    // Upload hero image to S3 (call your API route)
    const heroUrl = await uploadToS3(heroImage);

    // Save project to DB (via API or directly here using Prisma API route)
    const res = await fetch('/api/create-project', {
      method: 'POST',
      body: JSON.stringify({
        name,
        clientName,
        heroUrl,
        images: await Promise.all(images.map(uploadToS3)),
        positions,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      alert("Project created!");
    } else {
      alert("Failed to create project");
    }
  }

  async function uploadToS3(file: File): Promise<string> {
    // Call your API to get S3 presigned URL, then upload file
    const presignRes = await fetch('/api/s3-presign?filename=' + encodeURIComponent(file.name));
    const { url, fields } = await presignRes.json();

    const formData = new FormData();
    Object.entries(fields).forEach(([key, value]) => {
      formData.append(key, value as string);
    });
    formData.append('file', file);

    const uploadRes = await fetch(url, { method: 'POST', body: formData });
    if (!uploadRes.ok) throw new Error("S3 upload failed");
    
    return url + '/' + fields.key;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 p-4">
      <h1 className="text-2xl font-bold">Create Project</h1>

      <input type="file" onChange={e => setHeroImage(e.target.files?.[0] || null)} required />
      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Project Name" required />
      <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Client Name" required />

      <input type="file" multiple onChange={e => handleImageChange(e.target.files)} />

      {images.map((img, i) => (
        <div key={i} className="flex gap-2">
          <span>{img.name}</span>
          <input type="number" value={positions[i]?.width} onChange={e => handlePositionChange(i, 'width', +e.target.value)} placeholder="Width" />
          <input type="number" value={positions[i]?.height} onChange={e => handlePositionChange(i, 'height', +e.target.value)} placeholder="Height" />
          <input type="number" value={positions[i]?.x} onChange={e => handlePositionChange(i, 'x', +e.target.value)} placeholder="X" />
          <input type="number" value={positions[i]?.y} onChange={e => handlePositionChange(i, 'y', +e.target.value)} placeholder="Y" />
          <input type="number" value={positions[i]?.z} onChange={e => handlePositionChange(i, 'z', +e.target.value)} placeholder="Z-index" />
        </div>
      ))}

      <button type="submit" className="bg-green-600 text-white p-2 rounded">Submit Project</button>
    </form>
  );
}
