"use client";
import Link from "next/link";
import Logo from "./logo";
import { motion , AnimatePresence} from "motion/react";
import { navLinks1, navLinks2 } from "./data";
import { usePathname} from "next/navigation";
import { useState } from "react";

export default function NavPage() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };
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
    <div
      className={`fixed top-0 md:top-auto md:bottom-0 ${
        isMainPage ? "md:h-1/2" : ""
      } w-full md:border-b pointer-events-none bg-transparent z-50`}
    >
      <nav className="pointer-events-none flex flex-col md:flex-row justify-between md:items-end py-5 w-full ">
        <div className="w-full md:w-1/3 flex justify-between">
          <Logo />
          <button
            onClick={handleMenuClick}
            className="flex md:hidden pointer-events-auto mx-5 font-medium uppercase"
          >
            {isMenuOpen ? "CLOSE" : "MENU"}
          </button>
        </div>
        <div className={`hidden md:flex pointer-events-none w-1/3`}>
          {navLinks2.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`pointer-events-auto px-5 font-small uppercase font-medium ${
                pathname === link.path ? "text-white" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className={`hidden md:flex pointer-events-none w-1/3 justify-end`}>
          {navLinks1.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`pointer-events-auto px-5 font-small uppercase font-medium ${
                pathname === link.path ? "text-white" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>

        {/* Animated Menu Modal */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="pointer-events-auto fixed top-16 bottom-0 flex flex-col gap-5 w-full bg-tertiary bg-opacity-80"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="flex flex-col text-largest font-medium uppercase px-5">
              {navLinks2.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
            <div className="flex flex-col text-largest font-medium uppercase px-5">
              {navLinks1.map((link, index) => (
                <Link 
                  key={index} 
                  href={link.path}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
