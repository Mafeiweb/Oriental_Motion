"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";
import { Globe2 } from "lucide-react";
import {
  localeLabels,
  locales,
  type Locale
} from "@/i18n/routing";
import { switchLocalePath } from "@/lib/i18n/paths";

type LocaleSwitcherProps = {
  ariaLabel: string;
  locale: Locale;
  variant?: "pills" | "list";
};

export function LocaleSwitcher({
  ariaLabel,
  locale,
  variant = "pills"
}: LocaleSwitcherProps) {
  const pathname = usePathname();

  if (variant === "list") {
    return (
      <nav aria-label={ariaLabel} className="space-y-3">
        <h2 className="text-sm font-semibold text-[var(--color-carbon)]">
          {ariaLabel}
        </h2>
        <ul className="space-y-2 text-sm text-[var(--color-stone)]">
          {locales.map((targetLocale) => (
            <li key={targetLocale}>
              <Link
                aria-current={targetLocale === locale ? "page" : undefined}
                className="inline-flex rounded-sm leading-6 underline-offset-4 hover:text-[var(--color-carbon)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-clay)]"
                href={switchLocalePath(pathname, targetLocale)}
                lang={targetLocale}
              >
                {localeLabels[targetLocale]}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <nav
      aria-label={ariaLabel}
      className="flex flex-wrap items-center gap-2 text-xs text-[var(--color-stone)]"
    >
      <Globe2 aria-hidden="true" className="h-4 w-4 shrink-0" />
      {locales.map((targetLocale) => (
        <Link
          aria-current={targetLocale === locale ? "page" : undefined}
          className={clsx(
            "rounded-full border px-3 py-1.5 text-center leading-tight transition-colors [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]",
            targetLocale === locale
              ? "border-[var(--color-carbon)] bg-[var(--color-carbon)] !text-[var(--color-on-dark)]"
              : "border-[var(--border-subtle)] bg-[var(--surface-paper)] hover:border-[var(--color-botanical)] hover:text-[var(--color-botanical)]"
          )}
          href={switchLocalePath(pathname, targetLocale)}
          key={targetLocale}
          lang={targetLocale}
        >
          {localeLabels[targetLocale]}
        </Link>
      ))}
    </nav>
  );
}
