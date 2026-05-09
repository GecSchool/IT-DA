import { ImageIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/shared/lib/cn";
import { Text } from "@/shared/ui/text";

type PhotoTileProps = HTMLAttributes<HTMLDivElement> & {
  src?: string;
  alt?: string;
  aspect?: "portrait" | "square";
  overlay?: ReactNode;
};

export function PhotoTile({
  src,
  alt = "",
  aspect = "portrait",
  overlay,
  className,
  ...props
}: PhotoTileProps) {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-hidden rounded-m bg-muted",
        aspect === "portrait" && "aspect-[4/5]",
        aspect === "square" && "aspect-square",
        className
      )}
      {...props}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="size-full object-cover" />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-sm text-muted-foreground">
          <ImageIcon className={cn(aspect === "portrait" ? "size-8" : "size-6")} />
          <Text size={aspect === "portrait" ? "sm" : "xs"} color="muted">
            {aspect === "portrait" ? "4 : 5" : "1 : 1"}
          </Text>
        </div>
      )}
      {overlay ? <div className="absolute inset-0">{overlay}</div> : null}
    </div>
  );
}
