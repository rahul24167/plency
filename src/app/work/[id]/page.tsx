import { prisma } from "@/src/lib/prisma";
import Image from "next/image";

import { Project as ProjectType, ProjectMedia } from "@prisma/client";
import { cdnUrl } from "../../lib/cdnUrl";

type FullProject = ProjectType & {
  images: ProjectMedia[];
};

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
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
    <div className="bg-cover p-5 w-full flex flex-col justify-between item-center ">
      <div className="h-auto md:h-screen mb-0 relative flex items-center justify-center">
        {project?.heroImage && (
          <Image
            src={cdnUrl(project?.heroImage)}
            alt=""
            width={2000}
            height={2000}
            className="w-full h-auto"
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
      <div className="hidden md:block relative w-full h-auto overflow-hidden">
  
          {project?.images.map((image, index) => (
            <div
              key={index}
              className="relative"
              style={{
                width: `${image.width}vw`,
                // height: `${image.height}vw`,
                marginLeft: `${image.positionX}vw`,
                marginTop: `${image.positionY}vw`,
                zIndex: image.zIndex,
              }}
            >
                {image.url.startsWith("images/")  && (
                  <Image
                    src={cdnUrl(image.url)}
                    alt={`Image ${index + 1}`}
                   width={image.width * 150}
                      height={image.height * 150}
                    className="w-full h-auto"
                  />
                )}
                {!image.url.startsWith("images/") && (
                  <video
                    src={cdnUrl(image.url)}
                    autoPlay
                    loop
                    muted
                    playsInline
                    preload="auto"
                    className="w-full  h-auto object-cover"
                  />
                )}

            </div>
          ))}

      </div>
      <div className="md:hidden overflow-hidden w-full flex flex-col gap-2 justify-center items-center">
        {project?.images.map((image, index) => (
          <div key={index} className="w-full">
            {image.url.startsWith("images/") && (
              <Image
                src={cdnUrl(image.url)}
                alt={`Image ${index + 1}`}
                width={image.width * 200}
                height={image.height * 200}
                className="w-full h-auto object-cover"
              />
            )}
            {!image.url.startsWith("images/")  && (
              <video
                src={cdnUrl(image.url)}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>

      <div className="z-50 hidden md:flex fixed bottom-0 md:w-1/3 flex-col justify-end items-end p-5 font-medium uppercase">
        <div className="h-full flex flex-col justify-end items-start">
          <span>{project?.client}</span>
          <span className="">{project?.title}</span>
        </div>
      </div>
    </div>
  );
}
