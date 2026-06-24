"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

type PrimaryNavProps = {
  ariaLabel: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

function isActiveTopLevel(pathname: string | null, href: string) {
  const currentTopLevel = (pathname ?? "").split("/").filter(Boolean)[1];
  const linkTopLevel = href.split("/").filter(Boolean)[1];

  return Boolean(currentTopLevel && linkTopLevel && currentTopLevel === linkTopLevel);
}

export function PrimaryNav({ ariaLabel, links }: PrimaryNavProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label={ariaLabel}
      className="scrollbar-none -mx-4 flex min-w-0 max-w-[calc(100vw-2rem)] flex-1 snap-x items-center gap-1 overflow-x-auto px-4 pb-1 text-sm text-[var(--color-stone)] sm:mx-0 sm:max-w-none sm:flex-wrap sm:justify-end sm:overflow-visible sm:px-0 sm:pb-0"
    >
      {links.map((link) => {
        const isActive = isActiveTopLevel(pathname, link.href);

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={clsx(
              "shrink-0 snap-start rounded-full px-3 py-2 text-center leading-tight transition-colors [overflow-wrap:anywhere] hover:bg-[var(--color-mist)] hover:text-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]",
              isActive && "bg-[var(--color-mist)] text-[var(--color-carbon)]"
            )}
            href={link.href}
            key={link.href}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
