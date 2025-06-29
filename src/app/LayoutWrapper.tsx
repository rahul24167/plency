"use client";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import CustomCursor from "@/src/app/components/customCursor";

export default function LayoutWrapper({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const mainPages = [
    "/",
    "/work",
    "/about",
    "/contact",
    "/career",
    "/playground",
  ];

  const isMainPage = mainPages.includes(pathname);
  return (
   <AnimatePresence mode="popLayout">
  <motion.div
    key={pathname}
    initial={{ y: "-100vh" }}
    animate={{ y: 0 }}
    exit={{ y: "200vh", opacity: 0 }}
    transition={{ delay: 0, duration: 1, ease: "easeInOut" }}
    className="h-screen overflow-auto z-10"
  >
    <CustomCursor />
    <div className="w-full h-16 md:hidden bg-transparent"></div>
    <div className="relative w-full">
      {/* Page Title - overlays on top of children */}
      {isMainPage && pathname !== "/" && (
        <div className="md:absolute md:top-0 md:left-0 w-full md:h-screen flex flex-col justify-end md:z-30 pointer-events-none">
         <div className="h-1/2 w-full">
          <h1 className="px-5 md:mt-[10vh] text-medium md:text-large lg:text-largest font-bold uppercase">
            {pathname
              .replace("/", "")
              .replace(/-/g, " ")
              .replace(/\b\w/g, (l) => l.toUpperCase())}
          </h1>
         </div>
        </div>
      )}
  
    {/* Children — no vertical offset */}
      <div className="relative md:z-10">
        {children}
      </div>
    </div>
  </motion.div>
</AnimatePresence>

  );
}
