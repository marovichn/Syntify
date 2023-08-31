import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synthify",
  description: "Fly to the rythim",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={figtree.className}>
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
}
