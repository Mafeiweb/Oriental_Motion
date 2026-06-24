import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getCollections } from "@/lib/content/catalog";
import { buildMetadata } from "@/lib/seo/metadata";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";

type CollectionsPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: CollectionsPageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: CollectionsPageProps) {
  const locale = await getLocale(params);
  const commerce = getMessages(locale).commerce;

  return buildMetadata({
    locale,
    path: "collections",
    title: commerce.allCollectionsTitle,
    description: commerce.allCollectionsDescription
  });
}

export default async function CollectionsPage({ params }: CollectionsPageProps) {
  const locale = await getLocale(params);
  const commerce = getMessages(locale).commerce;
  const collections = getCollections();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="max-w-3xl space-y-4">
        <Badge>{commerce.collections}</Badge>
        <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">
          {commerce.allCollectionsTitle}
        </h1>
        <p className="text-base leading-8 text-[var(--color-stone)]">{commerce.allCollectionsDescription}</p>
      </header>

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
        {collections.map((collection) => (
          <Link
            className="group grid min-h-0 grid-rows-[160px_1fr] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] transition-colors hover:border-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)] sm:min-h-96 sm:grid-rows-[180px_1fr]"
            href={`/${locale}/collections/${collection.slug}`}
            key={collection.slug}
          >
            <span className="relative block overflow-hidden bg-[var(--color-mist)]">
              <Image
                alt={collection.imageAlt[locale]}
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                src={collection.image}
              />
            </span>
            <span className="flex flex-col justify-between gap-8 p-5">
              <span className="text-sm font-medium text-[var(--color-stone)]">{commerce.collections}</span>
              <span className="space-y-3">
                <span className="block text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">
                  {collection.name[locale]}
                </span>
                <span className="block text-sm leading-7 text-[var(--color-stone)]">{collection.description[locale]}</span>
                <span className="inline-flex text-sm font-semibold text-[var(--color-botanical)]">{commerce.viewDetails}</span>
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
