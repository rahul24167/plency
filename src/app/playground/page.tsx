"use client";
import { getExperiments } from "../actions/getExperiments";
import Link from "next/link";
import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { Experiment } from "@prisma/client";

interface ExperimentWithImage extends Experiment {
  images: { url: string }[];
}

const Playground = () => {
  const [experiments, setExperiments] = useState<ExperimentWithImage[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mouseY, setMouseY] = useState(0);
  const [id, setId] = useState(-1);
  useEffect(() => {
    async function fetchData() {
      const experimentsData = await getExperiments();
      if (!experimentsData) {
        console.error("No experiments data found");
        return;
      }
      setExperiments(experimentsData);
    }
    fetchData();
  }, []);
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY-68);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setId(-1);
    }, 100);
  };

  return (
    <div className="w-full flex flex-row md:justify-end items-end ">
      <div className={`${experiments.length > 0 ? "" : "hidden"} w-1/3 h-full md:flex flex-col items-end justify-start relative `}>
        <motion.img

          src={experiments[id]?.images[0].url}
          alt={experiments[id]?.brand}
          width={112}
          height={112}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: mouseY }}
          transition={{ duration: 0 }}
          className={`${id===(-1)? "hidden": ""} rounded-lg overflow-hidden`}
        />
      </div>
      <div className="md:w-1/3 py-6  flex flex-col justify-start relative">
        {experiments.map((experiment, index) => (
          <div
            key={experiment.id}
            onMouseEnter={() => {
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              setId(index);
            }}
            onMouseLeave={() => {
              handleMouseLeave();
            }}
            className="md:flex-row justify-center items-center h-14 p-5"
          >
            <Link href={`/playground/${experiment.id}`} className=" uppercase transition-all duration-300 ease-in-out hover:text-white hover:pl-2 font-normal md:font-medium">
              {experiment.brand}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playground;
