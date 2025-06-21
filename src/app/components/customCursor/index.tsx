"use client";
import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <>
      <div
        className="w-[40vh] h-[40vh] rounded-full fixed pointer-events-none transition-transform duration-75 ease-linear opacity-80 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%)",
          boxShadow: `
            0 0 60px 20px rgba(255, 255, 255, 0.4),
            0 0 120px 40px rgba(255, 255, 255, 0.3),
            0 0 180px 60px rgba(255, 255, 255, 0.2)`,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      ></div>
    </>
  );
}
