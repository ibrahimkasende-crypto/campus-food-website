import Link from "next/link";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "outline";
  icon?: ReactNode;
  className?: string;
};

export function PremiumButton({
  href,
  children,
  variant = "primary",
  icon,
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center justify-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-bold transition-all duration-300",
        variant === "primary" &&
          "bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent text-white shadow-premium-lg hover:scale-[1.03] hover:shadow-glow active:scale-[0.98]",
        variant === "secondary" &&
          "bg-brand-primary text-white shadow-premium hover:bg-brand-primaryDark hover:scale-[1.02] active:scale-[0.98]",
        variant === "outline" &&
          "border-2 border-brand-primary/30 bg-white/90 text-brand-primary hover:border-brand-primary hover:bg-white hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      {children}
      {icon && <span className="transition-transform group-hover:translate-x-0.5">{icon}</span>}
    </Link>
  );
}
