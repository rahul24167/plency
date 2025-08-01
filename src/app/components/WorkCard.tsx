"use client";
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
      className="w-full md:w-1/2  rounded-2xl flex flex-col p-5 pr-0 pb-0 "
    >
      <Link
        href={`/work/${project.id}`}
        className="w-full h-auto flex-grow relative "
      >
        {imgLoading && (
          <div className="absolute inset-0 z-20 w-full h-full  bg-slate-200 grid place-items-center backdrop-blur-[1px]">
            <LoaderThree />
          </div>
        )}
        <Image
          src={cdnUrl(project.heroImage)}
          alt={project.title}
          width={1920}
          height={1080}
          className="object-cover aspect-[4/3] w-full rounded-2xl"
          onLoadingComplete={() => setImgLoading(false)}
        />
      </Link>

      <div className="w-full flex flex-row flex-wrap justify-between items-center px-2">
        <h2 className="max-w-1/2 uppercase font-normal">{project.title}</h2>
        <p className="max-w-1/2 uppercase font-normal text-right">{project.client}</p>
      </div>
    </div>
  );
};

export default WorkCard;
