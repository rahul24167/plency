'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { cdnUrl } from "../lib/cdnUrl";
import { LoaderThree } from "../components/loader";
interface Project {
  id: string;
  title: string;
  client: string;
  heroImage: string;
}

const WorkCard = ({ project, index }: { project: Project; index: number }) => {
    const [imgLoading, setImgLoading] = useState(true);
  return (
    <div
      key={index}
      className="w-full md:w-1/2 h-[85vh] flex flex-col p-5 pr-0 "

    >
      <Link
        href={`/work/${project.id}`}
        className="w-full h-auto flex-grow relative"   
      >
        {imgLoading && (
          <div className="z-10 h-full w-full bg-slate-200 grid place-items-center backdrop-blur-[1px]">
            <LoaderThree />
          </div>
        )}
        <Image
          src={cdnUrl(project.heroImage)}
          alt={project.title}
          fill
          className="object-cover"
          onLoadingComplete={() => setImgLoading(false)}
        />
      </Link>

      <div className="w-full flex flex-row justify-start items-center px-2">
        <h2 className="w-1/3 uppercase font-normal">{project.title}</h2>
        <p className="w-1/3 uppercase font-normal">{project.client}</p>
      </div>
    </div>
  );
};

export default WorkCard;
