import { PathTracker } from "@/utils/pathTracker";import { DragAndDrop } from "@/utils/dragAndDrop";import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { API_URL } from "@/utils/env";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MiniPlayer | Lightweight Video Player",
  description: "A simple and efficient video player with essential playback controls",
  icons: {
    icon: `${API_URL}/assets/default/favicon.ico`,
    shortcut: `${API_URL}/assets/default/favicon.ico`
  }
};

export default function RootLayout({
  children


}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <main className="min-h-screen" data-path="frontend/src/app/layout.tsx" id="el_bc5f252c">
          {children}
        </main>
      </body>
    
  <DragAndDrop />

  <PathTracker />
    </html>);}