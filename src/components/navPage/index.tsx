"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { navLinks1, navLinks2, logoText } from "./data";
const NavPage = () => {
  const pathname = usePathname();
  const [isInsideViewport, setIsInsideViewport] = useState(true);
   const shouldAnimate = pathname === "/";
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
    <div className="h-screen fixed bg-transparent flex flex-col justify-between w-full uppercase ">
      <div className="h-1/2 w-full text-largest"></div>
      <div className="h-1/2 w-full">
        <nav className="flex flex-row justify-between items-center w-full p-4 ">
          <motion.div
            style={{ transformOrigin: "left top" }}
            initial={{ opacity:1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: shouldAnimate && isInsideViewport ? 1 : 1,
              scale: shouldAnimate && isInsideViewport ? 5 : 1,
              
              y: shouldAnimate && isInsideViewport ? 50 : 0, // 10px lower
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <h1 className="">{logoText.title}</h1>
          </motion.div>
          <div>
            {navLinks2.map((link, index) => (
              <a key={index} href={link.path} className={`px-4 py-2 `}>
                {link.title}
              </a>
            ))}
          </div>
          <div>
            {navLinks1.map((link, index) => (
              <a key={index} href={link.path} className={`px-4 py-2 `}>
                {link.title}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavPage;
