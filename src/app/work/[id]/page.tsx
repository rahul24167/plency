import Image from "next/image";
import { prisma } from "@/src/lib/prisma";

import { Project as ProjectType, ProjectMedia } from "@prisma/client";

type FullProject = ProjectType & {
  images: ProjectMedia[];
};

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } =  await params;
  const project = (await prisma.project.findUnique({
    where: {
      id: id ?? undefined,
    },
    include: {
      images: true,
    },
  })) as FullProject;
  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="flex flex-col w-full">
      <div className="h-[50vh] md:h-screen m-5 mb-0 relative">
        {project?.heroImage && (
          <Image
            src={project?.heroImage}
            alt=""
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>

      <div className="w-full flex flex-row md:justify-end justify-center items-center">
        <div className="md:w-2/3">
          {Object.entries({
            title: project?.title,
            client: project?.client,
            service: project?.service,
            description: project?.description,
            challenge: project?.challenge,
          }).map(([key, value], index) => (
            <div key={index} className="w-full flex flex-col md:flex-row p-3">
              <div className="md:w-1/4 uppercase font-normal break-words">
                {key}
              </div>
              <div className="md:w-3/4 break-words font-normal whitespace-pre-line">
                {value}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block overflow-hidden m-5">
        <div className="relative w-full h-auto">
          {project?.images.map((image, index) => (
            <div
              key={index}
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
                    unoptimized
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
      <div className="md:hidden overflow-hidden px-5 w-full flex flex-col gap-2 justify-center items-center">
        {project?.images.map((image, index) => (
          <div key={index} className="w-full">
            {image.type === "IMAGE" && (
              <Image
                src={image.url}
                alt={`Image ${index + 1}`}
                width={image.width * 200}
                height={image.height * 200}
                className="w-full h-auto object-cover"
                unoptimized
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
        ))}
      </div>

      <div className="hidden md:flex fixed bottom-0 md:w-1/3 flex-col justify-end items-end p-5 font-medium uppercase">
        <div className="h-full flex flex-col justify-end items-start">
          <span>{project?.client}</span>
          <span className="">{project?.title}</span>
        </div>
      </div>
    </div>
  );
}
