export const dynamic = "force-dynamic";
import { prisma } from "@/src/lib/prisma";
import WorkCard from "../components/WorkCard";
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
          <WorkCard key={index} project={project} index={index} />
          
        ))}
      </div>
    </div>
  );
};

export default Work;
