import * as motion from "motion/react-client";
import { InfiniteMovingCards } from "@/app/components/infiniteScroll";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const projectInfo = {
    id: id,
    heroImage: "/image.png",
    images: [
      "/image.png",
      "/image1.png",
      "/image.png",
      "/image1.png",
      "/image.png",
      "/image1.png",
      "/image.png",
      "/image1.png",
      "/image.png",
    ],
    info: {
      title: "Project Title",
      client: "Client Name",
      brand: "Amazing Brand",
      description: "About the brand",
      service: "Service Provided",
      services:
        "Superdry challenges us to create a dynamic campaign for their new collection launch in collaboration with Parmish Verma. The campaign should capture the energy of the partnership and engage the target audience effectively.",
    },
  };
  return (
    <div className="bg-cover p-5">
      <img
        src={projectInfo.heroImage}
        className="w-full object-cover pb-5"
        alt=""
      />

      <div className="w-full flex flex-row justify-end items-center">
        <div className="md:w-2/3">
          {Object.entries(projectInfo.info).map(([key, value], index) => (
            <div key={index} className="w-full flex flex-col md:flex-row p-5">
              <div className="md:w-1/4 uppercase font-normal">{key}</div>
              <div className="md:w-3/4">{value}</div>
            </div>
          ))}
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.75,
          type: "spring",
          damping: 10,
          stiffness: 100,
        }}
        className="relative mx-auto flex w-full flex-col items-center justify-center overflow-hidden antialiased"
      >
        <InfiniteMovingCards items={projectInfo.images} />
      </motion.div>

      {/* video */}
      <img
        src={projectInfo.heroImage}
        className="w-full object-cover pb-5"
        alt=""
      />
      <div className="hidden md:flex fixed bottom-0 md:w-1/3 flex-col justify-end items-end p-5 font-medium uppercase">
        <div className="h-full flex flex-col justify-end items-start">
          <span>{projectInfo.info.client}</span>
          <span className="">{projectInfo.info.title}</span>
        </div>
      </div>
    </div>
  );
}
