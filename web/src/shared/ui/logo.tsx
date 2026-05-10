import Image from "next/image";

import { cn } from "@/shared/lib/cn";

type LogoProps = {
  alt?: string;
  className?: string;
  priority?: boolean;
  size?: number;
};

export function Logo({
  alt = "유기견매칭",
  className,
  priority = false,
  size = 64,
}: LogoProps) {
  return (
    <Image
      src="/logo.svg"
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0", className)}
      priority={priority}
    />
  );
}
