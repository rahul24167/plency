"use client";
import {motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
//components
import NavPage from "@/components/navPage";

export default function Application({
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
        exit={{ y: "100vh" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative"
      > 
        <NavPage />
        {children}
        
      </motion.div>
      </AnimatePresence>
  )
}
