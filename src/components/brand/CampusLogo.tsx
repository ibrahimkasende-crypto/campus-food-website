import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  size?: "sm" | "md" | "lg" | "hero";
  showText?: boolean;
  href?: string | null;
  className?: string;
  animate?: boolean;
};

const sizes = {
  sm: { img: 32, text: "text-sm" },
  md: { img: 40, text: "text-base" },
  lg: { img: 56, text: "text-lg" },
  hero: { img: 88, text: "text-xl" },
};

export function CampusLogo({
  size = "md",
  showText = true,
  href = "/",
  className,
  animate = false,
}: Props) {
  const s = sizes[size];
  const content = (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative shrink-0",
          animate && "animate-[pulse-soft_2s_ease-in-out_infinite]"
        )}
      >
        <Image
          src="/logo-icone-app-sans-fond.png"
          alt="Campus Food"
          width={s.img}
          height={s.img}
          priority={size === "hero"}
          className="object-contain"
        />
      </span>
      {showText && (
        <span className={cn("font-extrabold tracking-tight text-brand-primary", s.text)}>
          Campus Food
        </span>
      )}
    </span>
  );

  if (href != null) {
    return (
      <Link href={href} className="transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }
  return content;
}
