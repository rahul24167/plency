"use client";
import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveHandler = (e:MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <>

      <div
        className=" w-25 h-25 rounded-full bg-gray-500 blur-2xl fixed pointer-events-none shadow-lg shadow-gray-500 transition-transform duration-75 ease-linear "
        style={{
          transform: `translate(${position.x}px, ${position.y}px) translate(-50%, -50%)`,
        }}
      ></div>
    </>
  );
}
