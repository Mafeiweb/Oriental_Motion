import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { clsx } from "clsx";

type BadgeProps = ComponentPropsWithoutRef<"span"> & {
  children: ReactNode;
};

export function Badge({ children, className, ...props }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex w-fit max-w-full items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--surface-paper)] px-3 py-1 text-center text-xs font-medium leading-tight text-[var(--color-stone)]",
        className
      )}
      {...props}
    >
      <span className="[overflow-wrap:anywhere]">{children}</span>
    </span>
  );
}
