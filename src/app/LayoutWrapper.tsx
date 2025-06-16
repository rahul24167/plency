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
    <AnimatePresence mode="popLayout">
      <motion.div
        key={pathname}
        initial={{ y: "-100vh" }}
        animate={{ y: 0 }}
        exit={{ y: "100vh",
                opacity: 0,
         }}
        transition={{ delay:0,duration: 1, ease: "easeInOut" }}
        className="h-screen overflow-auto"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
