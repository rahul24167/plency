// "use client";
// import { useState } from "react";
// import { Rnd } from "react-rnd";

// type Position = {
//   x: number;
//   y: number;
//   width: number;
//   height: number;
//   z: number;
// };
// export default function CreateProjectPage() {
//   const [heroImage, setHeroImage] = useState<File | null>(null);
//   const [name, setName] = useState("");
//   const [clientName, setClientName] = useState("");
//   const [service, setService] = useState("");
//   const [description, setDescription] = useState("");
//   const [images, setImages] = useState<File[]>([]);
//   const [positions, setPositions] = useState<Position[]>([]);

//   const handleImageChange = (files: FileList | null) => {
//     if (!files) return;
//     const fileArr = Array.from(files);
//     setImages(fileArr);
//     setPositions(
//       fileArr.map(() => ({
//         width: 150,
//         height: 150,
//         x: 50,
//         y: 50,
//         z: 1,
//       }))
//     );
//   };

//   const updatePosition = (index: number, updated: Partial<Position>) => {
//     setPositions((prev) => {
//       const copy = [...prev];
//       copy[index] = { ...copy[index], ...updated };
//       return copy;
//     });
//   };

//   async function uploadToS3(file: File): Promise<string> {
//     const presignRes = await fetch(
//       "/api/s3-presign?filename=" + encodeURIComponent(file.name)
//     );
//     const { url, fields } = await presignRes.json();

//     const formData = new FormData();
//     Object.entries(fields).forEach(([key, value]) => {
//       formData.append(key, value as string);
//     });
//     formData.append("file", file);

//     const uploadRes = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!uploadRes.ok) throw new Error("S3 upload failed");
//     return url + "/" + fields.key;
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     if (!heroImage) return alert("Hero image is required");
//     if (images.length === 0) return alert("At least one image is required");

//     try {
//       const heroUrl = await uploadToS3(heroImage);
//       const imageUrls = await Promise.all(images.map(uploadToS3));

//       const res = await fetch("/api/create-project", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           clientName,
//           service,
//           description,
//           heroUrl,
//           images: imageUrls,
//           positions,
//         }),
//       });

//       if (res.ok) {
//         alert("Project created!");
//         // Reset form optionally
//       } else {
//         const err = await res.json();
//         console.error(err);
//         alert("Failed to create project");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Something went wrong");
//     }
//   }

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-col gap-6 p-5 w-full max-w-7xl"
//     >
//       <h1 className="text-2xl font-bold">Create Project</h1>

//       {/* INPUTS */}
//       <div className="flex flex-col gap-1 w-full">
//         <label>Hero Image</label>
//         <input
//           type="file"
//           accept="image/*"
//           onChange={(e) => {
//             setHeroImage(e.target.files?.[0] || null)}}
//         />

//         <input
//           value={name}
//           placeholder="Project Name"
//           onChange={(e) => setName(e.target.value)}
//           className="border p-2"
//           required
//         />

//         <input
//           value={clientName}
//           placeholder="Client Name"
//           onChange={(e) => setClientName(e.target.value)}
//           className="border p-2"
//           required
//         />

//         <input
//           value={service}
//           placeholder="Service"
//           onChange={(e) => setService(e.target.value)}
//           className="border p-2"
//           required
//         />

//         <textarea
//           value={description}
//           placeholder="Description"
//           onChange={(e) => setDescription(e.target.value)}
//           className="border p-2"
//         />

//         <label>Layout Images</label>
//         <input
//           type="file"
//           accept="image/*"
//           multiple
//           onChange={(e) => handleImageChange(e.target.files)}
//         />
//       </div>
//       <div className="w-full"></div>

//       {/* PAGE PREVIEW */}
//       <div className="p-5 border border-gray-300 rounded-md ">
//         {/* Hero Preview */}
//         {heroImage && (
//           <img
//             src={URL.createObjectURL(heroImage)}
//             className="w-full object-cover pb-5 "
//             alt="Hero"
//           />
//         )}

//         {/* Info Section */}
//         <div className="w-full flex flex-row justify-end items-center">
//           <div className="md:w-2/3">
//             <div className="w-full flex flex-col md:flex-row p-3">
//               <div className="md:w-1/4 uppercase font-normal">Client</div>
//               <div className="md:w-3/4">{clientName}</div>
//             </div>
//             <div className="w-full flex flex-col md:flex-row p-3">
//               <div className="md:w-1/4 uppercase font-normal">Title</div>
//               <div className="md:w-3/4">{name}</div>
//             </div>
//             <div className="w-full flex flex-col md:flex-row p-3">
//               <div className="md:w-1/4 uppercase font-normal">Service</div>
//               <div className="md:w-3/4">{service}</div>
//             </div>
//             <div className="w-full flex flex-col md:flex-row p-3">
//               <div className="md:w-1/4 uppercase font-normal">Description</div>
//               <div className="md:w-3/4">{description}</div>
//             </div>
//           </div>
//         </div>

//         {/* Layout Images with react-rnd */}
//         <div className="relative w-full h-[500px] bg-white rounded-md border border-dashed mt-6">
//           {images.map(
//             (file, i) =>
//               positions[i] && (
//                 <Rnd
//                   key={i}
//                   bounds="parent"
//                   size={{
//                     width: positions[i].width,
//                     height: positions[i].height,
//                   }}
//                   position={{ x: positions[i].x, y: positions[i].y }}
//                   onDragStop={(e, d) => updatePosition(i, { x: d.x, y: d.y })}
//                   onResizeStop={(e, dir, ref, delta, pos) =>
//                     updatePosition(i, {
//                       width: parseInt(ref.style.width),
//                       height: parseInt(ref.style.height),
//                       x: pos.x,
//                       y: pos.y,
//                     })
//                   }
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     className="w-full h-full object-contain border shadow-md"
//                     alt={`layout-${i}`}
//                   />
//                 </Rnd>
//               )
//           )}
//         </div>

//         {/* Floating Info Panel */}
//         <div className="hidden md:flex fixed bottom-0 right-0 md:w-1/3 flex-col justify-end items-end p-5 font-medium uppercase">
//           <div className="h-full flex flex-col justify-end items-start">
//             <span>{clientName}</span>
//             <span>{name}</span>
//           </div>
//         </div>
//       </div>

//       <button
//         type="submit"
//         className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
//       >
//         Submit Project
//       </button>
//     </form>
//   );
// }

"use client";
import { useState } from "react";
interface Image {
  url: string;
  width: number;
  height: number;
  positionX: number;
  positionY: number;
  zIndex: number;
}
export default function CreateProjectPage() {
  const [heroUrl, setHeroUrl] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [projectInfo, setProjectInfo] = useState({
    title: "",
    client: "",
    service: "",
    description: "",
  });

  const [images, setImages] = useState<Image[]>([]);

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

  return (
    <div className="flex flex-col w-full">
      <div className="w-full flex flex-row">
        <div>
          <label htmlFor="">Add Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                uploadToS3(file).then((url) => {
                  setImages((prev) => [
                    ...prev,
                    {
                      url,
                      width: 150,
                      height: 150,
                      positionX: 50,
                      positionY: 50,
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
      <div className="bg-cover p-5 w-full border flex flex-col justify-between item-center border-green-700">
        {/* Hero Image Preview */}
        {heroUrl ? (
          <img src={heroUrl} className="w-full object-cover pb-5" alt="" />
        ) : (
          <div className="w-full h-[50vh] bg-gray-200 flex flex-col items-center justify-center">
            <span>No Hero Image Selected</span>
            <label className="z-20">Hero Image</label>
            <input
              className="z-20"
              type="file"
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
        <div className="w-full flex flex-row gap-3">
          {images.length > 0 && images.map((image, index) => (
            <div key={index}>
              <label htmlFor={index.toString()}>{index + 1}</label>
              <input id={index.toString()} type="checkbox" onChange={(e)=>{
                if(e.target.checked) {
                  setSelectedImage(index);
                }
              }}
              checked={selectedImage === index} />
            </div>
          ))}
        </div>
        <div className="w-full ">
          {/* Image Position Controller */}
          {images[selectedImage] && (
            <div
              className="flex flex-row gap-2 items-center justify-center my-4"
              tabIndex={0}
              onKeyDown={(e) => {
                if (!images[selectedImage]) return;
                let dx = 0, dy = 0;
                if (e.key === "a" || e.key === "A") dx = -10;
                if (e.key === "d" || e.key === "D") dx = 10;
                if (e.key === "w" || e.key === "W") dy = -10;
                if (e.key === "s" || e.key === "S") dy = 10;
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
                      positionY: newImages[selectedImage].positionY - 10,
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
                        positionX: newImages[selectedImage].positionX - 10,
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
                        positionX: newImages[selectedImage].positionX + 10,
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
                      positionY: newImages[selectedImage].positionY + 10,
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
          {images[selectedImage] && (
            <div className="flex flex-row gap-4 items-center justify-center my-4">
              {/* Width */}
              <label>
                Width:
                <input
                  type="number"
                  min={10}
                  max={2000}
                  value={images[selectedImage].width}
                  onChange={(e) => {
                    const width = Math.max(10, Number(e.target.value));
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
                  min={10}
                  max={2000}
                  value={images[selectedImage].height}
                  onChange={(e) => {
                    const height = Math.max(10, Number(e.target.value));
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
        </div>
         {/* Image Gallery Previews */}
        <div className="relative min-h-screen border">
          {images.map((image, index) => (
            
            <img 
            key={index} 
            src={image.url} 
            className={`object-fill ${index === selectedImage ? "border-2 border-red-500" : ""}`}
            style={{
              width: image.width,
              height: image.height,
              position: "relative",
              left: image.positionX,
              top: image.positionY,
              zIndex: image.zIndex,
            }}
            alt={`Project Image ${index+1}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
