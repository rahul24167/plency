"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
// import * as motion from "motion/react-client";
import { usePathname, useRouter } from "next/navigation";
import { navLinks1, navLinks2, logoText } from "./data";
import useBreakpoint from "@/hooks/useBreakpoint";
const NavPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const breakpoint = useBreakpoint();

  const [isInsideViewport, setIsInsideViewport] = useState(true);
  const [PageLoaded, setPageLoaded] = useState(false);

  const mainPages = [
    "/",
    "/work",
    "/about",
    "/contact",
    "/career",
    "/playground",
  ];
  const isMainPage = mainPages.includes(pathname);

  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  useEffect(() => {
    const handlePointerEnter = () => {
      setIsInsideViewport(true);
    };
    const handlePointerLeave = () => {
      setIsInsideViewport(false);
    };
    document.body.addEventListener("pointerenter", handlePointerEnter);
    document.body.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      document.body.removeEventListener("pointerenter", handlePointerEnter);
      document.body.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  const handleNavClick = (path: string) => {
    if (path === pathname) return;
    router.push(path);
  };

  const getFont = () => {
    if (pathname !== "/") return 1;
    if (isInsideViewport) return 1;

    // Scale based on breakpoints when not in viewport
    switch (breakpoint) {
      case "2xl":
      case "xl":
      case "lg":
        return "5.0625rem";
      case "md":
        return "4.25rem";
      default:
        return "3.25rem";
    }
  };

  return (
    
    <div className={`fixed bottom-0 ${isMainPage? "h-1/3 sm:h-1/2 ": ""} w-full border-b pointer-events-none`}>
      <nav className="pointer-events-none flex flex-col-reverse sm:flex-row justify-between sm:items-center w-full py-4">
        <motion.div
          style={{ transformOrigin: "left top" }}
          initial={{
            opacity: 1,
            fontSize: PageLoaded && pathname === "/" ? getFont() : "1.25rem",
            x: 0,
            y: pathname === "/" ? 50 : 0,
          }}
          animate={{
            opacity: pathname === "/" && isInsideViewport ? 1 : 1,
            fontSize:
              pathname === "/" ? (isInsideViewport ? "1.25rem" : getFont()) : "1.25rem",
            y: pathname === "/" ? (isInsideViewport ? 0 : 50) : 0,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="pointer-events-none w-1/3"
        >
          <h1
            onClick={() => handleNavClick(logoText.path)}
            className="pointer-events-auto px-5 font-bold"
          >
            {logoText.title}
          </h1>
        </motion.div>

        <div className="pointer-events-none w-1/3" >
          {navLinks2.map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(link.path)}
              className={` pointer-events-auto px-5 py-2 font-small uppercase font-bold ${
                pathname === link.path ? "text-secondary" : ""
              }`}
            >
              {link.title}
            </button>
          ))}
        </div>
        <div className="pointer-events-none w-1/3 flex justify-end">
          {navLinks1.map((link, index) => (
            <button
              key={index}
              onClick={() => handleNavClick(link.path)}
              className={`pointer-events-auto px-5 py-2 font-small uppercase font-bold ${
                pathname === link.path ? "text-secondary" : ""
              }`}
            >
              {link.title}
            </button>
          ))}
        </div>
      </nav>

      {(isMainPage && pathname !== "/") && (
        <div className="pointer-events-none px-4 text-medium md:text-large lg:text-largest font-bold uppercase ">
          {pathname
            .replace("/", "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </div>
      )}
    </div>
  );
};

export default NavPage;
