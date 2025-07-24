"use client";
import { useState, useEffect } from "react";
//import { motion } from "motion/react";

const TrailingCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
const colors = [
  "#dddddd",
  "#d1d1d1",
  "#c5c5c5",
  "#b9b9b9",
  "#adadad",
  "#a1a1a1",
  "#959595",
  "#898989",
  "#7d7d7d",
  "#717171",
  "#656565",
  "#595959",
  "#4d4d4d",
  "#414141",
  "#3a3a3a",
  "#343434",
  "#2e2e2e",
  "#2c2c2c",
  "#2b2b2b",
  "#2a2a2a",
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
          className={`h-8 w-8 absolute top-0 left-0 pointer-events-none rounded-full transition-transform ease-linear `}
        ></div>
      ))}
    </>
  );
};

export default TrailingCursor;
