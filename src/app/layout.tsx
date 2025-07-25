import type { Metadata } from "next";
import localFont from 'next/font/local';
import "./globals.css";
import LayoutWrapper from "./LayoutWrapper";
//components
import NavPage from "@/src/app/components/navPage";

const readexPro = localFont({
  display: 'swap',
  src: [
    {
      path: "./font/ReadexPro-VariableFont_HEXP,wght.ttf"
    },
    
  ],
  variable: '--font-readex-pro',
});


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
        className={` cursor-[url('/cursor.png')_12_12,auto] ${readexPro.variable} antialiased`}
        style={{
          cursor: "url('/cursor.png') 12 12, auto",
          
        }}
      >
       
          <LayoutWrapper>
           
            <NavPage />
            
            {children}
           
          </LayoutWrapper>
      </body>
    </html>
  );
}

