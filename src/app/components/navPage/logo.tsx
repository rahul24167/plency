"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import useBreakpoint from "@/src/app/hooks/useBreakpoint";
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

  const shouldAnimate = () => {
    return ["md", "lg", "xl", "2xl"].includes(breakpoint);
  };

  const getScale = () => {
    if (pathname !== "/" || !shouldAnimate()) return 1;
    if (isInsideViewport) return 1;

    return 4.5;
  };

  const initialProps = shouldAnimate()
    ? {
        scale: PageLoaded && pathname === "/" ? getScale() : 1,
        y: pathname === "/" ? 50 : 0,
        color:"#E42626"
      }
    : {
        scale: 1,
        y: 0,
        color:"#E42626"
      };

  const animateProps = shouldAnimate()
    ? {
        scale:
          pathname === "/"
            ? isInsideViewport
              ? 1
              : getScale()
            : 1,
        y: pathname === "/" ? (isInsideViewport ? 0 : 50) : 0,
        color:"#E42626"
      }
    : {
        scale: 1,
        y: 0,
        color:"#E42626"
      };

  return (
    <motion.div
      style={{ transformOrigin: "left top" }}
      initial={initialProps}
      animate={animateProps}
      
      transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
      className="pointer-events-none w-1/3 mx-5 "
    >
      <h1 className="pointer-events-auto w-fit font-bold uppercase">
        <Link href={logoText.path} className="pointer-events-auto">
          {logoText.title}
        </Link>
      </h1>
    </motion.div>
  );
};

export default Logo;

