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
        "rounded-xl px-3 py-2 text-sm font-semibold",
        pathname === href ? "bg-zinc-900 text-white" : "text-zinc-700 hover:bg-zinc-100"
      )}
    >
      {label}
    </Link>
  );

  return (
    <header className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-base font-black tracking-tight">
          Elite Streaming Hub
        </Link>
        <nav className="flex items-center gap-2">
          {item("/catalog", "Catálogo")}
          {item("/admin", "Admin")}
        </nav>
      </div>
    </header>
  );
}
