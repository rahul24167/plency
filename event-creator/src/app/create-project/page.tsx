"use client";
import Image from "next/image";
import { useState } from "react";
type Media = {
  url: string;
  type: "IMAGE" | "VIDEO";
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
};

export default function CreateProjectPage() {
  const [heroUrl, setHeroUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    client: "",
    service: "",
    description: "",
  });

  const [images, setImages] = useState<Media[]>([]);

  async function uploadToS3(file: File): Promise<string> {
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
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/create-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projectInfo.title,
          clientName: projectInfo.client,
          service: projectInfo.service,
          description: projectInfo.description,
          heroUrl,
          medias: images,
        }),
      });
      if (res.ok) {
        alert("Project submitted successfully!");
        // Reset form or redirect as needed
        setHeroUrl("");
        setImages([]);
        setProjectInfo({
          title: "",
          client: "",
          service: "",
          description: "",
        });
      } else {
        const err = await res.json();
        console.error(err);
        throw new Error("Failed to submit project");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit project");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-cover p-5 w-full flex flex-col justify-between item-center ">
        {/* Hero Image Preview */}
        {heroUrl ? (
          <img src={heroUrl} className="w-full object-cover" alt="" />
        ) : (
          <div className="w-full h-[50vh] bg-gray-200 flex flex-col items-center justify-center">
            <span>No Hero Media Selected</span>
            <label className="z-20">Hero Image</label>
            <input
              className="z-20"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadToS3(file).then((url) => setHeroUrl(url));
                }
              }}
            />
          </div>
        )}
        {/* Project Info Preview */}
        <div className="w-full flex flex-row justify-end items-center">
          <div className="md:w-2/3">
            {Object.entries(projectInfo).map(([key, value], index) => (
              <div
                key={index}
                className="w-full flex flex-col md:flex-row gap-1"
              >
                <input
                  className="border p-2"
                  type="text"
                  placeholder={key}
                  value={value}
                  onChange={(e) => {
                    setProjectInfo((prev) => ({
                      ...prev,
                      [key]: e.target.value,
                    }));
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Controller */}
        <div className="w-full flex flex-row">
          <div>
            <label htmlFor="">Add Image/Video</label>
            <input
              type="file"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const isVideo = file?.type.startsWith("video/");
                if (file) {
                  uploadToS3(file).then((url) => {
                    setImages((prev) => [
                      ...prev,
                      {
                        url,
                        type: isVideo ? "VIDEO" : "IMAGE",
                        width: 30,
                        height: 30,
                        positionX: 20,
                        positionY: 5,
                        zIndex: 1,
                      },
                    ]);
                    setSelectedImage(images.length - 1);
                  });
                }
              }}
            />
          </div>
        </div>
        <div className="w-full flex flex-row gap-3">
          {images.length > 0 &&
            images.map((image, index) => (
              <div key={index}>
                <label htmlFor={index.toString()}>{index + 1}</label>
                <input
                  id={index.toString()}
                  type="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedImage(index);
                    }
                  }}
                  checked={selectedImage === index}
                />
              </div>
            ))}
        </div>
        <div className="w-full  flex flex-row flex-wrap justify-center items-center gap-4">
          {/* Image Position Controller */}
          {images[selectedImage] && (
            <div
              className="flex flex-row gap-2 items-center justify-center my-4"
              tabIndex={0}
              onKeyDown={(e) => {
                if (!images[selectedImage]) return;
                let dx = 0,
                  dy = 0;
                if (e.key === "a" || e.key === "A") dx = -1;
                if (e.key === "d" || e.key === "D") dx = 1;
                if (e.key === "w" || e.key === "W") dy = -1;
                if (e.key === "s" || e.key === "S") dy = 1;
                if (dx !== 0 || dy !== 0) {
                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[selectedImage] = {
                      ...newImages[selectedImage],
                      positionX: newImages[selectedImage].positionX + dx,
                      positionY: newImages[selectedImage].positionY + dy,
                    };
                    return newImages;
                  });
                  e.preventDefault();
                }
              }}
              style={{ outline: "none" }}
            >
              <button
                type="button"
                className="border rounded px-2 py-1"
                onClick={() =>
                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[selectedImage] = {
                      ...newImages[selectedImage],
                      positionY: newImages[selectedImage].positionY - 1,
                    };
                    return newImages;
                  })
                }
                aria-label="Move Up"
              >
                ↑
              </button>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  className="border rounded px-2 py-1"
                  onClick={() =>
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[selectedImage] = {
                        ...newImages[selectedImage],
                        positionX: newImages[selectedImage].positionX - 1,
                      };
                      return newImages;
                    })
                  }
                  aria-label="Move Left"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="border rounded px-2 py-1"
                  onClick={() =>
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[selectedImage] = {
                        ...newImages[selectedImage],
                        positionX: newImages[selectedImage].positionX + 1,
                      };
                      return newImages;
                    })
                  }
                  aria-label="Move Right"
                >
                  →
                </button>
              </div>
              <button
                type="button"
                className="border rounded px-2 py-1"
                onClick={() =>
                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[selectedImage] = {
                      ...newImages[selectedImage],
                      positionY: newImages[selectedImage].positionY + 1,
                    };
                    return newImages;
                  })
                }
                aria-label="Move Down"
              >
                ↓
              </button>
            </div>
          )}
          {/* Image Size and Z-Index Controller */}
          {images[selectedImage] && (
            <div className="flex flex-row gap-4 items-center justify-center my-4">
              {/* Width */}
              <label>
                Width:
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={images[selectedImage].width}
                  onChange={(e) => {
                    const width = Math.max(1, Number(e.target.value));
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[selectedImage] = {
                        ...newImages[selectedImage],
                        width,
                      };
                      return newImages;
                    });
                  }}
                  className="border p-1 w-20 mx-2"
                />
              </label>
              {/* Height */}
              <label>
                Height:
                <input
                  type="number"
                  min={1}
                  max={100}
                  value={images[selectedImage].height}
                  onChange={(e) => {
                    const height = Math.max(1, Number(e.target.value));
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[selectedImage] = {
                        ...newImages[selectedImage],
                        height,
                      };
                      return newImages;
                    });
                  }}
                  className="border p-1 w-20 mx-2"
                />
              </label>
              {/* Z-Index */}
              <label>
                Z-Index:
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={images[selectedImage].zIndex}
                  onChange={(e) => {
                    const zIndex = Math.max(0, Number(e.target.value));
                    setImages((prev) => {
                      const newImages = [...prev];
                      newImages[selectedImage] = {
                        ...newImages[selectedImage],
                        zIndex,
                      };
                      return newImages;
                    });
                  }}
                  className="border p-1 w-16 mx-2"
                />
              </label>
            </div>
          )}
          {/* Submit Button */}
          <button
            className="px-6 py-2 mx-10 border bg-green-600 rounded-xl font-semibold disabled:opacity-50"
            disabled={
              images.length === 0 ||
              !heroUrl ||
              !projectInfo.client ||
              !projectInfo.title ||
              !projectInfo.description ||
              !projectInfo.service
            }
            onClick={handleSubmit}
          >
            SUBMIT
          </button>
        </div>
        {/* Image Gallery Previews */}
        <div className="relative w-full h-auto border overflow-hidden border-b-0">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                index === selectedImage ? "border-2 border-red-500" : ""
              }`}
              style={{
                width: `${image.width}vw`,
                height: `${image.height}vw`,
                marginLeft: `${image.positionX}vw`,
                marginTop: `${image.positionY}vw`,
                zIndex: image.zIndex,
              }}
            >
              <div className="w-full h-full relative">
                {image.type === "IMAGE" && (
                  <Image
                    src={image.url}
                    alt={`Image ${index + 1}`}
                    fill
                    style={{ objectFit: "fill" }}
                  />
                )}
                {image.type === "VIDEO" && (
                  <video
                    src={image.url}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
