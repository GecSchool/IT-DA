import { Dog, User } from "lucide-react";
import type { HTMLAttributes } from "react";

import { cn } from "@/shared/lib/cn";

type AvatarProps = HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  kind?: "user" | "dog";
  size?: "sm" | "md" | "lg";
};

export function Avatar({ src, alt = "", kind = "user", size = "md", className, ...props }: AvatarProps) {
  const Icon = kind === "dog" ? Dog : User;

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center overflow-hidden rounded-pill bg-muted text-muted-foreground",
        size === "sm" && "size-9",
        size === "md" && "size-11",
        size === "lg" && "size-14",
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <Icon className={cn(size === "sm" && "size-5", size === "md" && "size-6", size === "lg" && "size-7")} />
      )}
    </div>
  );
}
