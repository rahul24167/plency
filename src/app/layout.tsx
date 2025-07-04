import type { Metadata } from "next";
import localFont from 'next/font/local';
//import { Readex_Pro } from "next/font/google";
import "./globals.css";

import LayoutWrapper from "./LayoutWrapper";
//components
import NavPage from "@/src/app/components/navPage";
const readexPro = localFont({
  display: 'swap',
  src: [
    {
      path: "../../public/fonts/ReadexPro-VariableFont_HEXP,wght.ttf",
    },
  ],
  variable: '--font-readex-pro',
});

// const readexPro = Readex_Pro({
//   variable: "--font-readex-pro",
//   subsets: ['latin'],
//   weight: ['400', '500', '600', '700'],
//   display: 'swap',
// })

export const metadata: Metadata = {
  title: "Plenly",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${readexPro.variable} antialiased `}
      >
       
          <LayoutWrapper>
           
            <NavPage />
            
            {children}
          </LayoutWrapper>
      </body>
    </html>
  );
}

