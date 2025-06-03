"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
const subHeading:string = "BUILDING BRIDGES BETWEEN BRANDS AND PEOPLE."
export default function Home() {
  const [isInsideViewport, setIsInsideViewport] = useState(true);

  useEffect(() => {
    const handlePointerEnter = () => {
      setIsInsideViewport(true);
    };
    const handlePointerLeave = () => {
      setIsInsideViewport(false);
    };
    document.body.addEventListener("pointerenter", handlePointerEnter);
    document.body.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      document.body.removeEventListener("pointerenter", handlePointerEnter);
      document.body.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);
 
  return (
    <div className="h-screen">
      <motion.div initial={{ opacity: 0 }}
        animate={{ opacity: isInsideViewport ? 1 : 0 }}
        transition={{delay: 0.2, duration: 0.5, ease: "easeInOut" }}
        className={`px-5 pt-6 h-1/2 w-full text-medium md:text-large lg:text-largest font-bold
        `}>{subHeading}
        </motion.div>
      <div className="h-1/2 w-full">
      </div>
    </div>
  );
}
