import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Faq } from "@/components/content/faq";
import type { Locale } from "@/i18n/routing";
import { getMessages } from "@/i18n/messages";
import { formatPrice } from "@/lib/commerce/format";
import { assetPath } from "@/lib/i18n/paths";
import type { Product } from "@/types/catalog";

type ProductDetailProps = {
  locale: Locale;
  product: Product;
};

export function ProductDetail({ locale, product }: ProductDetailProps) {
  const commerce = getMessages(locale).commerce;
  const checkoutMessageId = `${product.slug}-checkout-message`;

  return (
    <article>
      <section className="border-b border-[var(--border-subtle)]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)] lg:gap-10 lg:px-8 lg:py-16">
          <div className="relative min-h-[300px] overflow-hidden rounded-lg bg-[var(--color-mist)] sm:min-h-[420px]">
            <Image
              alt={product.imageAlt[locale]}
              className="object-cover"
              fill
              loading="eager"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={assetPath(product.image)}
            />
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(21,25,21,0.2)] to-transparent" />
          </div>

          <div className="flex flex-col justify-center gap-7">
            <div className="space-y-4">
              <Badge>{product.eyebrow[locale]}</Badge>
              <div className="space-y-4">
                <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">
                  {product.name[locale]}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-[var(--color-stone)]">{product.description[locale]}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-3">
              <p className="text-2xl font-semibold text-[var(--color-carbon)]">{formatPrice(locale, product.price)}</p>
              {product.compareAtPrice ? (
                <p className="pb-1 text-base text-[var(--color-stone)] line-through">
                  {formatPrice(locale, product.compareAtPrice)}
                </p>
              ) : null}
            </div>

            <div className="space-y-3 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-4">
              <button
                aria-describedby={checkoutMessageId}
                className="min-h-12 w-full rounded-full bg-[var(--color-carbon)] px-5 py-3 text-sm font-semibold leading-tight !text-[var(--color-on-dark)] opacity-70"
                disabled
                type="button"
              >
                {commerce.addToCart}
              </button>
              <p className="text-center text-sm leading-6 text-[var(--color-stone)]" id={checkoutMessageId}>
                {commerce.checkoutSoon}
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:gap-10 lg:px-8">
        <section aria-labelledby="benefits-heading" className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
          <h2 id="benefits-heading" className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">
            {commerce.benefits}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-3">
            {product.benefits[locale].map((benefit) => (
              <li
                className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-4 text-sm leading-7 text-[var(--color-carbon)]"
                key={benefit}
              >
                {benefit}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="specs-heading" className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
          <h2 id="specs-heading" className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">
            {commerce.specifications}
          </h2>
          <dl className="divide-y divide-[var(--border-subtle)] rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)]">
            {product.specs[locale].map((spec) => (
              <div className="grid gap-2 p-4 sm:grid-cols-[180px_minmax(0,1fr)]" key={spec.label}>
                <dt className="text-sm font-semibold text-[var(--color-carbon)]">{spec.label}</dt>
                <dd className="text-sm leading-7 text-[var(--color-stone)]">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="care-heading" className="grid gap-5 md:grid-cols-[280px_minmax(0,1fr)]">
          <h2 id="care-heading" className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">
            {commerce.careNotes}
          </h2>
          <div className="space-y-3 text-sm leading-7 text-[var(--color-stone)]">
            <p>{commerce.careCopy}</p>
            <p>{commerce.proofCopy}</p>
          </div>
        </section>

        <Faq id="product-faq-heading" items={product.faqs[locale]} title={commerce.faq} />
      </div>
    </article>
  );
}
