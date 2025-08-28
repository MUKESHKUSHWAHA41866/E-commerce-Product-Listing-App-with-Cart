 

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import CartBadge from "@/components/CartBadge"; // 👈 import it
import CartButton from "@/components/CartButton";
import UserMenu from "@/components/UserMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-commerce App",
  description: "Fullstack assignment demo",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en">
      {/* 👇 base bg + text color here */}
      <body className={`${inter.className} min-h-screen bg-[#0b0c10] text-zinc-100`}>
        {/* 👇 global background glows (behind everything) */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute -left-24 -top-24 h-[26rem] w-[26rem] rounded-full bg-purple-600/20 blur-3xl" />
          <div className="absolute -right-32 -bottom-40 h-[34rem] w-[34rem] rounded-full bg-cyan-500/20 blur-3xl" />
        </div>

        <header className="flex items-center justify-between border-b border-white/10 bg-black/30 px-6 py-4 backdrop-blur">
          <h1 className="text-lg font-semibold">My Shop</h1>
          <div className="flex items-center gap-3">
            <UserMenu />
            <CartButton />
          </div>
        </header>

        {/* page content */}
        <main className="px-6 py-8">{children}</main>
      </body>
    </html>
  );
}
