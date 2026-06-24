import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Locale } from "@/i18n/routing";
import { getMessages } from "@/i18n/messages";
import { formatPrice } from "@/lib/commerce/format";
import { assetPath, localizedHref } from "@/lib/i18n/paths";
import type { Product } from "@/types/catalog";

type ProductCardProps = {
  locale: Locale;
  product: Product;
};

export function ProductCard({ locale, product }: ProductCardProps) {
  const commerce = getMessages(locale).commerce;

  return (
    <article className="group grid h-full grid-rows-[auto_1fr] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)]">
      <div className="relative min-h-56 overflow-hidden bg-[var(--color-mist)] sm:min-h-64">
        <Image
          alt={product.imageAlt[locale]}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          src={assetPath(product.image)}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[rgba(21,25,21,0.18)] to-transparent" />
      </div>

      <div className="flex flex-col gap-5 p-5">
        <div className="space-y-3">
          <Badge>{product.eyebrow[locale]}</Badge>
          <div className="space-y-2">
            <h2 className="text-xl font-semibold leading-tight text-[var(--color-carbon)]">{product.name[locale]}</h2>
            <p className="text-sm leading-7 text-[var(--color-stone)]">{product.description[locale]}</p>
          </div>
        </div>

        <div className="mt-auto flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <p className="text-base font-semibold text-[var(--color-carbon)]">
            <span className="text-sm font-medium text-[var(--color-stone)]">{commerce.from} </span>
            {formatPrice(locale, product.price)}
          </p>
          <Link
            href={localizedHref(locale, `/products/${product.slug}`)}
            className="inline-flex min-h-10 max-w-full items-center rounded-full border border-[var(--border-subtle)] px-4 py-2 text-center text-sm font-medium leading-tight text-[var(--color-carbon)] transition-colors hover:border-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]"
          >
            {commerce.viewDetails}
          </Link>
        </div>
      </div>
    </article>
  );
}
