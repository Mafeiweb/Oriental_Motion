import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/commerce/product-card";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import type { Locale } from "@/i18n/routing";
import { getMessages } from "@/i18n/messages";
import { getArticles } from "@/lib/content/journal";
import { getProducts } from "@/lib/content/catalog";

type HomeSectionsProps = {
  locale: Locale;
};

export function HomeSections({ locale }: HomeSectionsProps) {
  const messages = getMessages(locale);
  const { home, common } = messages;
  const products = getProducts();
  const articles = getArticles()
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug))
    .slice(0, 3);
  const featureImages = [
    "/images/products/balance-walker-generated.jpg",
    "/images/brand/ritual-kit-still-life.jpg",
    "/images/brand/wellness-outerwear.jpg"
  ];

  return (
    <div className="bg-[var(--color-canvas)]">
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-20">
        <div className="flex flex-col items-center justify-center space-y-6 text-center sm:space-y-7 lg:items-start lg:text-left">
          <Badge>{home.eyebrow}</Badge>
          <div className="space-y-5">
            <h1 className="mx-auto max-w-4xl text-4xl font-semibold leading-[1.08] text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-6xl lg:mx-0">
              {home.title}
            </h1>
            <p className="mx-auto max-w-2xl text-base leading-8 text-[var(--color-stone)] lg:mx-0">{home.description}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            <ButtonLink href={`/${locale}/collections`}>{home.primaryCta}</ButtonLink>
            <ButtonLink href={`/${locale}/technology`} variant="secondary">
              {home.secondaryCta}
            </ButtonLink>
          </div>
        </div>

        <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[linear-gradient(145deg,var(--surface-paper),var(--color-mist)_55%,#d4c0ab)] sm:min-h-[440px]">
          <Image
            alt={home.proofTitle}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            src="/images/brand/ritual-kit-still-life.jpg"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,253,248,0.92),rgba(255,253,248,0.52)_45%,rgba(255,253,248,0.04))]" />
          <div className="absolute left-5 top-5 max-w-52 space-y-2 sm:left-8 sm:top-8 sm:max-w-56 sm:space-y-3">
            <span className="block text-sm font-medium text-[var(--color-botanical)]">{common.safetyFirst}</span>
            <p className="text-xl font-semibold leading-tight text-[var(--color-carbon)] sm:text-2xl">{home.proofTitle}</p>
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-paper)]">
        <div className="mx-auto grid w-full max-w-7xl gap-3 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {home.proofItems.map((item) => (
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--color-canvas)] px-4 py-3" key={item}>
              <p className="text-sm font-medium leading-6 text-[var(--color-carbon)]">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl space-y-3">
            <Badge>{common.shopNow}</Badge>
            <h2 className="text-2xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-4xl">
              {home.collectionTitle}
            </h2>
            <p className="text-base leading-8 text-[var(--color-stone)]">{home.collectionDescription}</p>
          </div>
          <ButtonLink href={`/${locale}/collections`} variant="secondary">
            {common.shopNow}
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} locale={locale} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-[var(--surface-paper)]">
        <div className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-3 lg:px-8 lg:py-16">
          {[
            {
              eyebrow: common.safetyFirst,
              title: home.technologyTitle,
              body: home.technologyDescription,
              href: `/${locale}/technology`,
              cta: common.learnMore,
              image: featureImages[0]
            },
            {
              eyebrow: common.ritualThird,
              title: home.ritualTitle,
              body: home.ritualDescription,
              href: `/${locale}/membership`,
              cta: common.learnMore,
              image: featureImages[1]
            },
            {
              eyebrow: common.wellnessSecond,
              title: home.journalTitle,
              body: home.journalDescription,
              href: `/${locale}/journal`,
              cta: common.readMore,
              image: featureImages[2]
            }
          ].map((feature) => (
            <FeaturePanel
              body={feature.body}
              cta={feature.cta}
              eyebrow={feature.eyebrow}
              href={feature.href}
              image={feature.image}
              key={feature.title}
              title={feature.title}
            />
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="max-w-2xl space-y-3">
          <Badge>{messages.journal.eyebrow}</Badge>
          <h2 className="text-2xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-4xl">{home.journalTitle}</h2>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link
              className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 transition-colors hover:border-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]"
              href={`/${locale}/journal/${article.slug}`}
              key={article.slug}
            >
              <article className="space-y-4">
                <Badge>{article.category[locale]}</Badge>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold leading-tight text-[var(--color-carbon)]">{article.title[locale]}</h3>
                  <p className="text-sm leading-7 text-[var(--color-stone)]">{article.excerpt[locale]}</p>
                </div>
                <span className="inline-flex text-sm font-semibold text-[var(--color-botanical)]">{common.readMore}</span>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

type FeaturePanelProps = {
  eyebrow: string;
  title: string;
  body: string;
  href: string;
  cta: string;
  image: string;
};

function FeaturePanel({ eyebrow, title, body, href, cta, image }: FeaturePanelProps) {
  return (
    <Link
      className="group grid min-h-0 grid-rows-[160px_1fr] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--color-canvas)] transition-colors hover:border-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)] sm:min-h-80 sm:grid-rows-[180px_1fr]"
      href={href}
    >
      <span className="relative block overflow-hidden bg-[var(--color-mist)]">
        <Image
          alt={title}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          src={image}
        />
      </span>
      <span className="flex flex-col items-start justify-between gap-8 p-5">
        <Badge>{eyebrow}</Badge>
        <span className="space-y-3">
          <span className="block text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">{title}</span>
          <span className="block text-sm leading-7 text-[var(--color-stone)]">{body}</span>
          <span className="inline-flex text-sm font-semibold text-[var(--color-botanical)]">{cta}</span>
        </span>
      </span>
    </Link>
  );
}
