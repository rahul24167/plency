"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { navLinks1, navLinks2, logoText } from "./data";
import useBreakpoint from "@/hooks/useBreakpoint";
const NavPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const breakpoint = useBreakpoint();

  const [isInsideViewport, setIsInsideViewport] = useState(true);
  const [PageLoaded, setPageLoaded] = useState(false);
  useEffect(() => {
    const handleLoad = () => {
      setPageLoaded(true);
    };
    window.addEventListener("load", handleLoad);
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const [isExiting, setIsExiting] = useState(false);
  const [nextPath, setNextPath] = useState("");

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

  useEffect(() => {
    if (isExiting && nextPath) {
      const timeout = setTimeout(() => {
        router.push(nextPath);
        setIsExiting(false);
        setNextPath("");
      }, 500);
      return () => clearTimeout(timeout);
    }
  }, [isExiting, nextPath, router]);

  const handleNavClick = (path: string) => {
    if (path === pathname) return;
    setIsExiting(true);
    setNextPath(path);
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
    <AnimatePresence mode="wait">
      {!isExiting && (
        <motion.div
          key={pathname} // Re-animate on path change
          initial={{ y: "-100vh" }}
          animate={{ y: 0 }}
          exit={{ y: "100vh" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-screen fixed bg-transparent flex flex-col justify-between w-full uppercase "
        >
          <div className="h-2/3 sm:h-1/2 w-full text-largest"></div>
          <div className="h-1/3 sm:h-1/2 w-full">
            <nav className="flex flex-col-reverse sm:flex-row justify-between sm:items-center w-full py-4">
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
                transition={{ delay: 0.2, duration: 0.5, ease: "easeInOut" }}
              >
                <h1
                  onClick={() => handleNavClick(logoText.path)}
                  className="px-5 font-bold"
                >
                  {logoText.title}
                </h1>
              </motion.div>

              <div >
                {navLinks2.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-5 py-2 font-small uppercase font-bold ${
                      pathname === link.path ? "text-blue-500" : ""
                    }`}
                  >
                    {link.title}
                  </button>
                ))}
              </div>
              <div>
                {navLinks1.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.path)}
                    className={`px-5 py-2 font-small uppercase font-bold ${
                      pathname === link.path ? "text-secondary" : ""
                    }`}
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            </nav>

            {pathname !== "/" && (
              <div className="px-4 text-medium md:text-large lg:text-largest font-bold uppercase ">
                {pathname
                  .replace("/", "")
                  .replace(/-/g, " ")
                  .replace(/\b\w/g, (l) => l.toUpperCase())}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavPage;
