"use client";

import { useEffect, useState, createContext, useContext } from "react";

const PointerContext = createContext(true);
export const usePointerInside = () => useContext(PointerContext);

export default function PointerTracker({ children }: { children: React.ReactNode }) {
  const [isInside, setIsInside] = useState(true);

  useEffect(() => {
    const handleEnter = () => {
      console.log("Pointer entered the window");
      setIsInside(true);
    };

    const handleLeave = (e: MouseEvent) => {
      if (e.relatedTarget === null) {
        console.log("Pointer left the window");
        setIsInside(false);
      }
    };

    window.addEventListener("mouseenter", handleEnter);
    window.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mouseenter", handleEnter);
      window.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  return (
    <PointerContext.Provider value={isInside}>
      {children}
    </PointerContext.Provider>
  );
}

