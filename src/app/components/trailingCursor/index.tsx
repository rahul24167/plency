"use client";
import { useState, useEffect } from "react";
//import { motion } from "motion/react";

const TrailingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
const colors = [
  "#d4d4d4",
  "#c4c4c4",
  "#b4b4b4",
  "#a4a4a4",
  "#949494",
  "#848484",
  "#747474",
  "#646464",
  "#545454",
  "#444444",
  "#343434",
  "#2c2c2c",
  "#242424",
  "#1c1c1c",
  "#141414",
  "#0c0c0c",
  "#040404",
  "#000000",
];


  const n = colors.length;

  useEffect(() => {
    const moveHandler = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", moveHandler);
    return () => window.removeEventListener("mousemove", moveHandler);
  }, []);

  return (
    <>
      
      {[...Array(n)].map((_, i) => (
        <div
          key={i}
          style={{
            backgroundColor: colors[i],
            transform: `translate(${position.x}px, ${
              position.y
            }px) translate(-50%, -50%) scale(${(n - i) /n})`,
            transitionDuration: `${n+ i * 4}ms`,

            zIndex: i-n+1,
          }}
          className={`h-20 w-20 absolute top-0 left-0 pointer-events-none rounded-full transition-transform ease-linear `}
        ></div>
      ))}
    </>
  );
};

export default TrailingCursor;
