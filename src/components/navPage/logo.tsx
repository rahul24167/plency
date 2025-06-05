"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useBreakpoint from "@/hooks/useBreakpoint";
import { motion } from "motion/react";
import Link from "next/link";
import { logoText } from "./data";
const Logo = () => {
  const pathname = usePathname();
    const breakpoint = useBreakpoint();

  const [isInsideViewport, setIsInsideViewport] = useState(true);
  const [PageLoaded, setPageLoaded] = useState(false);

  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);
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
  const getFont = () => {
    if (pathname !== "/") return 1;
    if (isInsideViewport) return 1;

    // Scale based on breakpoints when not in viewport
    switch (breakpoint) {
      case "2xl":
      case "xl":
      case "lg":
        return "5.0625rem";
      case "md":
        return "4.25rem";
      default:
        return "3.25rem";
    }
  };
  return (
    <motion.div
      style={{ transformOrigin: "left top" }}
      initial={{
        opacity: 1,
        fontSize: PageLoaded && pathname === "/" ? getFont() : "1.25rem",
        x: 0,
        y: pathname === "/" ? 50 : 0,
      }}
      animate={{
        opacity: pathname === "/" && isInsideViewport ? 1 : 1,
        fontSize:
          pathname === "/"
            ? isInsideViewport
              ? "1.25rem"
              : getFont()
            : "1.25rem",
        y: pathname === "/" ? (isInsideViewport ? 0 : 50) : 0,
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="pointer-events-none w-1/3"
    >
      <h1 className="pointer-events-auto w-fit px-5 font-bold uppercase">
        {" "}
        <Link href={logoText.path} className="pointer-events-auto">
          {logoText.title}
        </Link>
      </h1>
    </motion.div>
  );
};

export default Logo;
