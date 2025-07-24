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
        className="-z-0 w-[60vh] h-[60vh] rounded-full fixed pointer-events-none transition-transform duration-75 ease-linear opacity-90 blur-2xl"
        style={{
          background: `
      radial-gradient(circle, 
        rgba(255, 255, 255, 0.3) 7%,     /* Small white core */
        rgba(128, 128, 128, 0.7) 100%     /* Soft fade at outer edge */
      )
    `,
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      ></div>
    </>
  );
}
