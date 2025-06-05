"use client";
import Link from "next/link";
import Logo from "./logo";
import { navLinks1, navLinks2 } from "./data";
import { usePathname } from "next/navigation";


export default  function NavPage() {
  const pathname = usePathname();

  const mainPages = ["/", "/work", "/about", "/contact", "/career", "/playground"];
  const isMainPage = mainPages.includes(pathname);

  return (
    <div className={`fixed bottom-0 ${isMainPage ? "h-1/3 sm:h-1/2" : ""} w-full border-b pointer-events-none`}>
      <nav className="pointer-events-none flex flex-col-reverse sm:flex-row justify-between sm:items-center w-full py-4">
        <Logo />
        <div className="pointer-events-none w-1/3">
          {navLinks2.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`pointer-events-auto px-5 py-2 font-small uppercase font-bold ${
                pathname === link.path ? "text-secondary" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
        <div className="pointer-events-none w-1/3 flex justify-end">
          {navLinks1.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className={`pointer-events-auto px-5 py-2 font-small uppercase font-bold ${
                pathname === link.path ? "text-secondary" : ""
              }`}
            >
              {link.title}
            </Link>
          ))}
        </div>
      </nav>

      {isMainPage && pathname !== "/" && (
        <div className="pointer-events-none px-4 text-medium md:text-large lg:text-largest font-bold uppercase">
          {pathname
            .replace("/", "")
            .replace(/-/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())}
        </div>
      )}
    </div>
  );
}

