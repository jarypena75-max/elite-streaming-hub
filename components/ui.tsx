import { clsx } from "clsx";

export function cn(...classes: Array<string | undefined | null | false>) {
  return clsx(classes);
}

export function Badge({ children, variant }: { children: React.ReactNode; variant: "ok" | "warn" | "neutral" }) {
  const klass =
    variant === "ok"
      ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
      : variant === "warn"
      ? "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
      : "bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200";

  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold", klass)}>{children}</span>;
}

export function Button({
  children,
  onClick,
  href,
  disabled,
  variant = "primary",
  type = "button",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  disabled?: boolean;
  variant?: "primary" | "ghost" | "danger";
  type?: "button" | "submit";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition ring-1 ring-inset focus:outline-none focus:ring-2 focus:ring-offset-2";
  const styles =
    variant === "primary"
      ? "bg-zinc-900 text-white ring-zinc-900 hover:bg-zinc-800 focus:ring-zinc-900"
      : variant === "danger"
      ? "bg-rose-600 text-white ring-rose-600 hover:bg-rose-500 focus:ring-rose-600"
      : "bg-transparent text-zinc-900 ring-zinc-200 hover:bg-zinc-50 focus:ring-zinc-400";

  const klass = cn(base, styles, disabled && "opacity-50 cursor-not-allowed");

  if (href) {
    return (
      <a className={klass} href={href}>
        {children}
      </a>
    );
  }
  return (
    <button className={klass} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
