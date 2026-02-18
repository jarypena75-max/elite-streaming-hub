"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="fixed top-4 inset-x-0 z-50 mx-auto max-w-2xl px-4">
      <nav className="flex items-center justify-between rounded-full border border-white/40 bg-white/70 p-2 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.05)]">
        <Link href="/catalog" className="ml-4 flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-emerald-500 shadow-inner" />
          <span className="text-sm font-black tracking-tighter text-zinc-900 uppercase">Elite</span>
        </Link>

        <div className="flex gap-1">
          {[
            { h: "/catalog", l: "Catálogo" },
            { h: "/admin", l: "Admin" },
          ].map((link) => (
            <Link
              key={link.h}
              href={link.h}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-black uppercase tracking-widest transition-all",
                pathname === link.h
                  ? "bg-zinc-900 text-white shadow-lg"
                  : "text-zinc-400 hover:text-zinc-900"
              )}
            >
              {link.l}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}