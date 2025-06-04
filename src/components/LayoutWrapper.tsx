// components/LayoutWrapper.tsx
"use client";
import { AnimatePresence } from "motion/react"
export default function LayoutWrapper({ children }: { children: React.ReactNode }) {

  return (
    <AnimatePresence mode="wait">
        {children}
    </AnimatePresence>
  );
}
