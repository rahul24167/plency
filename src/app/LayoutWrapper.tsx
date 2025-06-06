"use client";
import {motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";


export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    const pathname = usePathname();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="relative h-screen overflow-hidden"
      >
        {children}
      </motion.div>
      </AnimatePresence>
  )
}