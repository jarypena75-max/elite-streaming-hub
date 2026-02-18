"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/components/ui";

export function Navbar() {
  const pathname = usePathname();

  const item = (href: string, label: string) => (
    <Link
      href={href}
      className={cn(
        "rounded-xl px-3 py-2 text-sm font-semibold transition",
        pathname === href
          ? "bg-zinc-900 text-white shadow-sm"
          : "text-zinc-700 hover:bg-white hover:shadow-sm"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 border-b border-white/40 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/catalog" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-2xl bg-zinc-900 text-white shadow-sm">
            ES
          </span>
          <div className="leading-tight">
            <p className="text-sm font-black tracking-tight text-zinc-900">Elite Streaming Hub</p>
            <p className="text-xs text-zinc-500">Catálogo premium</p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {item("/catalog", "Catálogo")}
          {item("/admin", "Admin")}
        </nav>
      </div>
    </header>
  );
}
