import Sidebar from "@/components/Sidebar";
import "./globals.css";
import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import SupabaseProvider from "@/providers/SupabaseProvider";
import UserProvider from "@/providers/UserProvider";
import ModalProvider from "@/providers/ModalProvider";
import { Toaster } from "react-hot-toast";
import { getSongsByUserId } from "@/actions/getSongsByUserId";

const figtree = Figtree({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Synthify",
  description: "Fly to the rythim",
};

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
const userSongs =await getSongsByUserId();

  return (
    <html lang='en'>
      <body className={figtree.className}>
        <Toaster/>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
            <Sidebar songs={userSongs}>{children}</Sidebar>
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  );
}
