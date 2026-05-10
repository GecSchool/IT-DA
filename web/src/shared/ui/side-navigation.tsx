"use client";

import { ClipboardList, Dog, Heart, Home, LogIn, Pencil, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ComponentType } from "react";

import { cn } from "@/shared/lib/cn";
import { Logo } from "@/shared/ui/logo";

type NavigationItem = {
  href: string;
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
};

const navigationItems: NavigationItem[] = [
  { href: "/", label: "홈", icon: Home },
  { href: "/posts/new", label: "글쓰기", icon: Pencil },
  { href: "/likes", label: "관심", icon: Heart },
  { href: "/applications", label: "신청", icon: ClipboardList },
  { href: "/dogs", label: "강아지", icon: Dog },
  { href: "/profile", label: "프로필", icon: User },
];

export function SideNavigation() {
  return (
    <>
      <aside className="fixed left-0 top-1/2 z-40 hidden h-[95vh] w-[72px] -translate-y-1/2 bg-background md:block">
        <div className="absolute left-0 top-0 flex h-16 w-full items-center justify-center">
          <Logo size={32} priority />
        </div>
        <nav
          aria-label="주요 메뉴"
          className="absolute left-0 top-1/2 flex w-full -translate-y-1/2 flex-col items-center gap-md"
        >
          {navigationItems.map((item) => (
            <SideNavigationLink key={item.href} item={item} />
          ))}
        </nav>
        <div className="absolute bottom-md left-0 flex w-full justify-center">
          <SideNavigationLink
            item={{ href: "/login", label: "로그인", icon: LogIn }}
            activeMatch="exact"
          />
        </div>
      </aside>

      <nav
        aria-label="주요 메뉴"
        className="fixed inset-x-0 bottom-0 z-40 flex h-[calc(64px+env(safe-area-inset-bottom))] items-start justify-around border-t border-border bg-background px-xs pb-[env(safe-area-inset-bottom)] pt-sm md:hidden"
      >
        {navigationItems.slice(0, 5).map((item) => (
          <SideNavigationLink key={item.href} item={item} compact />
        ))}
        <SideNavigationLink item={{ href: "/profile", label: "프로필", icon: User }} compact />
      </nav>
    </>
  );
}

type SideNavigationLinkProps = {
  item: NavigationItem;
  compact?: boolean;
  activeMatch?: "prefix" | "exact";
};

function SideNavigationLink({
  item,
  compact = false,
  activeMatch = "prefix",
}: SideNavigationLinkProps) {
  const pathname = usePathname();
  const Icon = item.icon;
  const isActive =
    activeMatch === "exact"
      ? pathname === item.href
      : pathname === item.href || pathname.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      aria-label={item.label}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-pill transition-colors",
        isActive
          ? "bg-secondary text-primary"
          : "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
        compact && "size-11"
      )}
    >
      <Icon className="size-[18px]" aria-hidden />
    </Link>
  );
}
