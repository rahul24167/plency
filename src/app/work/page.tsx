export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/src/lib/prisma";
//import Image from "next/image";

const Work = async () => {
  const projects = await prisma.project.findMany({
    select: {
      id: true,
      title: true,
      client: true,
      heroImage: true,
    },
  });
  return (
    <div className="bg-cover w-full flex flex-row flex-wrap  ">
      <div className="flex flex-row flex-wrap w-full pr-5 ">
        {projects.map((project, index) => (
          <div
            key={index}
            className="w-full md:w-1/2 h-[76vh] flex flex-col p-5 pr-0 "
          >
            <Link
              href={`/work/${project.id}`}
              className="w-full h-auto flex-grow relative"
            >
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
              />
            </Link>

            <div className="w-full flex flex-row justify-start items-center px-2">
              <h2 className="w-1/3 uppercase font-bold">{project.title}</h2>
              <p className="w-1/3 uppercase font-bold">{project.client}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Work;
