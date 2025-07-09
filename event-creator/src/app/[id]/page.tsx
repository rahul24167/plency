"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getProjectById, getImagesByProjectId } from "../actions/getProject";
import { updateProject } from "../actions/updateProject";
import { v4 as uuidv4 } from "uuid";

import { uploadToS3 } from "@/event-creator/src/lib/s3Uploader";
import { Project, ProjectMedia } from "@prisma/client";

export default function UpdateProjectPage() {
  const params = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [images, setImages] = useState<Partial<ProjectMedia>[]>([]);

  const projectId = params.id as string;
  useEffect(() => {
    async function fetchProject() {
      const projectData = await getProjectById(projectId);
      setProject(projectData);
      const projectMedia = await getImagesByProjectId(projectId);
      setImages(projectMedia);
    }
    fetchProject();
  }, [projectId]);
  const [selectedImage, setSelectedImage] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;
    const res = await updateProject(projectId, {
      title: project.title,
      client: project.client,
      service: project.service,
      description: project.description ?? "",
      heroImage: project.heroImage,
      images: images as ProjectMedia[], // ensure your state contains `id`, `projectId`, etc.
    });
    if (res.success) {
      setIsEdit(false);
      alert("✅ Project updated successfully!");
    } else {
      alert("❌ Failed to update project. Please try again.");
    }
  };

  return (
    <div className="md:flex flex-col w-full">
      <button
        className="bg-blue-600 text-white font-semibold py-2 px-4 mx-4 rounded w-fit self-end"
        onClick={() => setIsEdit((prev) => !prev)}
      >
        {!isEdit ? "Editing Mode" : "View Mode"}
      </button>
      <div className="bg-cover p-5 w-full flex flex-col justify-between item-center ">
        {/* Hero Image Preview */}
        {project?.heroImage ? (
          <div className="h-[50vh] md:h-screen mb-0 relative flex items-center justify-center">
            <Image
              src={project?.heroImage}
              alt=""
              fill
              className="object-cover"
            />
            <div
              className={`z-30 w-fit ${
                isEdit ? "flex" : "hidden"
              } flex-col bg-black opacity-50 `}
            >
              <label
                htmlFor="heroImageUpload"
                className="text-white font-semibold"
              >
                Change Hero Image
              </label>
              <input
                id="heroImageUpload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    uploadToS3(file).then((url) =>
                      setProject((prev) =>
                        prev ? ({ ...prev, heroImage: url } as Project) : prev
                      )
                    );
                  }
                }}
              />
            </div>
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
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  uploadToS3(file).then((url) =>
                    setProject((prev) =>
                      prev ? ({ ...prev, heroImage: url } as Project) : prev
                    )
                  );
                }
              }}
            />
          </div>
        )}
        {/* Project Info Preview */}
        <div className="w-full flex flex-row justify-end items-center">
          <div className="md:w-2/3">
            {project &&
              Object.entries(project).map(([key, value], index) => {
                if (
                  !["client", "title", "service", "description"].includes(key)
                )
                  return null;

                return (
                  <div
                    key={index}
                    className="w-full flex flex-col md:flex-row gap-1"
                  >
                    {key !== "description" ? (
                      <input
                        className="border p-2"
                        type="text"
                        placeholder={key}
                        value={value as string}
                        onChange={(e) => {
                          if (!isEdit) return;
                          setProject((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  [key]: e.target.value,
                                }
                              : null
                          );
                        }}
                      />
                    ) : (
                      <textarea
                        className="border p-2"
                        placeholder={key}
                        value={value as string}
                        onChange={(e) => {
                          if (!isEdit) return;
                          setProject((prev) =>
                            prev
                              ? {
                                  ...prev,
                                  [key]: e.target.value,
                                }
                              : null
                          );
                        }}
                      />
                    )}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Image Controller */}
        <div
          className={`w-full ${
            isEdit ? "flex" : "hidden"
          } flex-col gap-6 p-6 bg-white rounded-xl shadow-md`}
        >
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">
              Add Image/Video
            </label>
            <input
              type="file"
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
              onChange={(e) => {
                const file = e.target.files?.[0];
                const isVideo = file?.type.startsWith("video/");
                if (file) {
                  uploadToS3(file).then((url) => {
                    setImages((prev) => [
                      ...prev,
                      {
                        id: uuidv4(),
                        projectId: "temp-project-id",
                        url,
                        type: isVideo ? "VIDEO" : "IMAGE",
                        width: 30,
                        height: 30,
                        positionX: 20,
                        positionY: 5,
                        zIndex: 1,
                        createdAt: new Date(),
                      },
                    ]);
                    setSelectedImage(images.length - 1);
                  });
                }
              }}
            />
          </div>
        </div>
        <div className={`${isEdit ? "flex" : "hidden"} flex-wrap gap-4`}>
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
                  New Media {index + 1}
                </span>
              </label>
            ))}
        </div>
        {/* Image Position Controller */}
        {images[selectedImage] && (
          <div
            className={`${
              isEdit ? "flex" : "hidden"
            } items-center justify-center gap-4 flex-wrap border p-4 rounded-lg bg-gray-50`}
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
                  const selected = newImages[selectedImage];

                  if (!selected) return prev; // early return if undefined

                  newImages[selectedImage] = {
                    ...selected,
                    positionX: (selected.positionX ?? 0) + dx,
                    positionY: (selected.positionY ?? 0) + dy,
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
                  const selected = newImages[selectedImage];
                  if (!selected) return prev; // early return if undefined
                  newImages[selectedImage] = {
                    ...selected,
                    positionY: (selected.positionY ?? 0) - 1,
                    
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
                    const selected = newImages[selectedImage];
                    if (!selected) return prev; // early return if undefined
                    newImages[selectedImage] = {
                      ...selected,
                      positionX: (selected.positionX ?? 0) - 1,
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
                    const selected = newImages[selectedImage];
                    if (!selected) return prev; // early return if undefined

                    newImages[selectedImage] = {
                      ...selected,
                      positionX: (selected.positionX ?? 0) + 1,
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
                  const selected = newImages[selectedImage];
                  if (!selected) return prev; // early return if undefined
                  newImages[selectedImage] = {
                    ...selected,
                    positionY: (selected.positionY ?? 0) + 1,
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
          <div
            className={` ${
              isEdit ? "flex" : "hidden"
            } flex-wrap items-center justify-center gap-6 border p-4 rounded-lg bg-gray-50`}
          >
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
                onChange={(e) => {
                  const height = Math.max(1, Number(e.target.value));
                  setImages((prev) => {
                    const newImages = [...prev];
                    newImages[selectedImage].height = height;
                    return newImages;
                  });
                }}
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
        {/* Submit Button */}
        <button
          className={` ${
            isEdit ? "flex" : "hidden"
          } self-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition`}
          disabled={images.length === 0}
          onClick={handleSubmit}
        >
          SUBMIT
        </button>
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
                    src={image.url ?? ""}
                    alt={`Image ${index + 1}`}
                    fill
                    style={{ objectFit: "fill" }}
                  />
                )}
                {image.type === "VIDEO" && (
                  <video
                    src={image.url ?? ""}
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
