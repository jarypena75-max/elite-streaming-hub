import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function Badge({ children, variant }: { children: React.ReactNode; variant: "ok" | "warn" | "neutral" }) {
  const styles = {
    ok: "bg-emerald-50 text-emerald-600 border-emerald-100",
    warn: "bg-rose-50 text-rose-500 border-rose-100",
    neutral: "bg-zinc-100 text-zinc-500 border-zinc-200",
  };

  return (
    <span className={cn(
      "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-wider", 
      styles[variant]
    )}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  href,
  disabled,
  variant = "primary",
  className,
}: any) {
  const base = "inline-flex items-center justify-center rounded-2xl px-6 py-3 text-sm font-extrabold transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none";
  
  const styles = {
    primary: "bg-zinc-900 text-white hover:bg-zinc-800 shadow-xl shadow-zinc-200/50",
    ghost: "bg-zinc-50 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900",
    success: "bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-100",
  };

  const klass = cn(base, styles[variant as keyof typeof styles], className);

  if (href) return <a className={klass} href={href}>{children}</a>;
  return <button className={klass} onClick={onClick} disabled={disabled}>{children}</button>;
}