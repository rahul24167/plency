"use client";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
//import { uploadToS3 } from "@/event-creator/src/lib/s3Uploader";
import { uploadToGCS } from "@/event-creator/src/lib/uploadToGCS";
import { createProject } from "@/event-creator/src/app/actions/createProject";
import { ResizableImageWrapper } from "@/event-creator/src/app/components/ResizeImageWrapper";
import { cdnUrl } from "@/event-creator/src/app/utills/cdnUrl";
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
  const divRef = useRef<HTMLDivElement>(null);
  const [heroUrl, setHeroUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    client: "",
    service: "",
    description: "",
    challenge: "",
  });

  const [images, setImages] = useState<Partial<Media>[]>([]);

  useEffect(() => {
    if (!divRef.current) return;

    const observer = new ResizeObserver(([entry]) => {
      const newHeight = entry.contentRect.height;
      // const height = Math.max(1, Number(e.target.value));
      setImages((prev) => {
        const newImages = [...prev];
        newImages[selectedImage].height = newHeight;
        return newImages;
      });
    });

    observer.observe(divRef.current);

    return () => observer.disconnect(); // clean up
  }, [selectedImage]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      images.length === 0 ||
      !heroUrl ||
      !projectInfo.client ||
      !projectInfo.title ||
      !projectInfo.description ||
      !projectInfo.service
    ) {
      alert("Please fill all fields and upload at least one image.");
      return;
    }
    try {
      const res = await createProject({
        id: "", // placeholder, backend will set
        title: projectInfo.title,
        client: projectInfo.client,
        service: projectInfo.service,
        description: projectInfo.description,
        challenge: projectInfo.challenge, // placeholder, update if you have a challenge field
        createdAt: new Date(), // placeholder, backend will set
        heroImage: heroUrl,
        images: images
          .filter(
            (img): img is Media =>
              !!img.url &&
              !!img.type &&
              typeof img.positionX === "number" &&
              typeof img.positionY === "number" &&
              typeof img.width === "number" &&
              typeof img.height === "number" &&
              typeof img.zIndex === "number"
          )
          .map((image) => ({
            id: "",
            createdAt: new Date(),
            projectId: "",
            url: image.url,
            type: image.type,
            positionX: image.positionX,
            positionY: image.positionY,
            width: image.width,
            height: image.height,
            zIndex: image.zIndex,
          })),
      });
      if (!res.success) {
        throw new Error("Failed to create project");
      }
      alert("Project submitted successfully!");
      // Reset form or redirect as needed
      setHeroUrl("");
      setImages([]);
      setProjectInfo({
        title: "",
        client: "",
        service: "",
        description: "",
        challenge: "",
      });
    } catch (error) {
      console.error("Error submitting project:", error);
      alert("Failed to submit project. Please try again.");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="bg-cover p-5 w-full flex flex-col justify-between item-center ">
        {/* Hero Image Preview */}
        {heroUrl ? (
          <div className="h-[50vh] md:h-screen mb-0 relative">
            <Image src={cdnUrl(heroUrl)} alt="" fill className="object-cover" />
          </div>
        ) : (
          <div className="w-full h-[50vh] bg-gray-100 flex flex-col items-center justify-center border-4 border-dashed border-gray-300 rounded-2xl shadow-inner hover:shadow-lg transition-all duration-300 ease-in-out px-6 text-center">
            <span className="text-gray-500 text-lg mb-4">
              No Hero Media Selected
            </span>

            <label
              htmlFor="heroImageUpload"
              className="cursor-pointer px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition-colors z-20"
            >
              Upload Hero Image
            </label>

            <input
              id="heroImageUpload"
              className="hidden"
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadToGCS(file, "banner").then((url) => setHeroUrl(url));
                  //uploadToS3(file).then((url) => setHeroUrl(url));
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
                {key !== "description" && key !== "challenge" ? (
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
                ) : (
                  <textarea
                    className="border p-2"
                    placeholder={key}
                    value={value}
                    onChange={(e) => {
                      setProjectInfo((prev) => ({
                        ...prev,
                        [key]: e.target.value,
                      }));
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="fixed flex flex-col justify-center items-center bg-transparent w-[90vw] z-50">
          {/* Image Controller */}
          <div className="w-full flex flex-col gap-6 p-6 bg-white rounded-xl shadow-md">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">
                Add Image/Video
              </label>
              <input
                type="file"
                className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;

                  const isVideo = file.type.startsWith("video/");
                  uploadToGCS(file).then((url) => {
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
                }}
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {images.length > 0 &&
              images.map((image, index) => (
                <label
                  key={index}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedImage === index}
                    onChange={(e) => {
                      if (e.target.checked) setSelectedImage(index);
                    }}
                    className="accent-blue-600"
                  />
                  <span className="text-sm font-medium text-gray-600">
                    Media {index + 1}
                  </span>
                </label>
              ))}
          </div>
          <div className="flex flex-row">
            {/* Image Position Controller */}
            {images[selectedImage] && (
              <div
                className="flex items-center justify-center gap-4 flex-wrap border p-4 rounded-lg bg-gray-50"
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
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded"
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
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded"
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
                    className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded"
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
                  className="bg-gray-200 hover:bg-gray-300 text-black font-bold py-2 px-3 rounded"
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
              <div className="flex flex-wrap items-center justify-center gap-6 border p-4 rounded-lg bg-gray-50">
                {/* Width */}
                <label className="flex flex-col text-sm font-medium text-gray-700">
                  Width
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={images[selectedImage].width}
                    onChange={(e) => {
                      const width = Math.max(1, Number(e.target.value));
                      setImages((prev) => {
                        const newImages = [...prev];
                        newImages[selectedImage].width = width;
                        return newImages;
                      });
                    }}
                    className="border rounded p-2 w-24"
                  />
                </label>
                {/* Height */}
                <label className="flex flex-col text-sm font-medium text-gray-700">
                  Height
                  <input
                    type="number"
                    min={1}
                    max={100}
                    value={images[selectedImage].height}
                    readOnly
                    className="border rounded p-2 w-24"
                  />
                </label>
                {/* Z-Index */}
                <label className="flex flex-col text-sm font-medium text-gray-700">
                  Z-Index
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={images[selectedImage].zIndex}
                    onChange={(e) => {
                      const zIndex = Math.max(0, Number(e.target.value));
                      setImages((prev) => {
                        const newImages = [...prev];
                        newImages[selectedImage].zIndex = zIndex;
                        return newImages;
                      });
                    }}
                    className="border rounded p-2 w-20"
                  />
                </label>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            className="self-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
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
            <ResizableImageWrapper
              key={index}
              image={image}
              index={index}
              selectedImage={selectedImage}
              setImages={setImages}
            >
              {image.type === "IMAGE" && (
                <Image
                  src={cdnUrl(image.url)}
                  alt={`Image ${index + 1}`}
                  width={image.width * 150}
                  height={image.height * 150 || 1}
                  className={`${
                    index === selectedImage ? "" : ""
                  } w-full h-auto`}
                />
              )}
              {image.type === "VIDEO" && (
                <video
                  src={cdnUrl(image.url)}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  className="w-full h-auto object-cover"
                />
              )}
            </ResizableImageWrapper>
          ))}
        </div>
      </div>
    </div>
  );
}
