import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";

type ButtonLinkVariant = "primary" | "secondary" | "ghost";

type ButtonLinkProps = Omit<ComponentPropsWithoutRef<typeof Link>, "className"> & {
  children: ReactNode;
  className?: string;
  variant?: ButtonLinkVariant;
};

const variantClasses: Record<ButtonLinkVariant, string> = {
  primary:
    "bg-[var(--color-carbon)] !text-[var(--color-on-dark)] hover:bg-[var(--color-botanical)]",
  secondary:
    "border border-[var(--border-subtle)] bg-[var(--surface-paper)] text-[var(--color-carbon)] hover:border-[var(--color-carbon)]",
  ghost:
    "text-[var(--color-carbon)] hover:bg-[var(--color-mist)] hover:text-[var(--color-botanical)]"
};

export function ButtonLink({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={clsx(
        "inline-flex min-h-11 max-w-full items-center justify-center rounded-full px-5 py-2.5 text-center text-sm font-medium leading-tight transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]",
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span className="[overflow-wrap:anywhere]">{children}</span>
    </Link>
  );
}
