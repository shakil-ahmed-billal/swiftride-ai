import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Rubik, Caveat } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  title: "SwiftRide AI - Fast & Easy Car Rental Platform",
  description: "A high-performing web-based car rental platform for any rent-a-car company and website.",
};

import ChatWidget from "@/components/ai-assistant/ChatWidget";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={`${plusJakarta.variable} ${rubik.variable} ${caveat.variable} scroll-smooth`}>
      <body className="font-sans antialiased text-[#1A202C] bg-white selection:bg-blue-[#3563E9] selection:text-white">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
