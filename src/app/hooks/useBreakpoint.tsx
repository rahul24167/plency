"use client";
import { useEffect, useState } from "react";

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<"xs" | "sm" | "md" | "lg" | "xl" | "2xl">("sm");

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width >= 1536) return "2xl";
      if (width >= 1280) return "xl";
      if (width >= 1024) return "lg";
      if (width >= 768) return "md";
      if (width >= 640) return "sm";
      return "xs";
    };

    const handleResize = () => setBreakpoint(getBreakpoint());

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
};
export default useBreakpoint;