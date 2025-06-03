"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { navLinks1, navLinks2, logoText } from "./data";
const NavPage = () => {
  const router = useRouter();
  const pathname = usePathname();

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
  }
  , []);

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
          <div className="h-1/2 w-full text-largest"></div>
          <div className="h-1/2 w-full">
            <nav className="flex flex-row justify-between items-center w-full p-4 ">
              <motion.div
                style={{ transformOrigin: "left top" }}
                initial={{ opacity: 1, scale: PageLoaded && pathname === "/" ? 5:1, x: 0, y: pathname === "/" ? 50: 0 }}
                animate={{
                  opacity: pathname === "/" && isInsideViewport ? 1 : 1,
                  scale: pathname === "/" ?(isInsideViewport ? 1 : 5) : 1,
                  y: pathname === "/" ? (isInsideViewport ? 0 : 50) :0,
                }}
                transition={{delay: 0.2, duration: 0.5, ease: "easeInOut" }}
              >
                <h1 onClick={() => handleNavClick(logoText.path)} className="">
                  {logoText.title}
                </h1>
              </motion.div>
              

              <div>
                {navLinks2.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleNavClick(link.path)}
                    className="px-4 py-2"
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
                    className="px-4 py-2"
                  >
                    {link.title}
                  </button>
                ))}
              </div>
            </nav>
            
            {pathname !== "/" && (
              <div className="px-4 text-largest uppercase ">{pathname
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
