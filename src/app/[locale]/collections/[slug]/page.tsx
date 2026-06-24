import { notFound } from "next/navigation";
import { ProductCard } from "@/components/commerce/product-card";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/content/json-ld";
import { getCollection, getCollections, getProductsByCollection } from "@/lib/content/catalog";
import { buildMetadata, localizedPath } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/jsonld";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales } from "@/i18n/routing";

type CollectionPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getPageData(params: CollectionPageProps["params"]) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const collection = getCollection(slug);

  if (!collection) {
    notFound();
  }

  return {
    collection,
    locale,
    products: getProductsByCollection(slug)
  };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getCollections().map((collection) => ({
      locale,
      slug: collection.slug
    }))
  );
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const { collection, locale } = await getPageData(params);

  return buildMetadata({
    locale,
    path: `collections/${collection.slug}`,
    title: collection.seoTitle[locale],
    description: collection.description[locale]
  });
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { collection, locale, products } = await getPageData(params);
  const commerce = getMessages(locale).commerce;
  const collectionPath = localizedPath(locale, `collections/${collection.slug}`);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: commerce.collections, path: localizedPath(locale, "collections") },
          { name: collection.name[locale], path: collectionPath }
        ])}
      />
      <JsonLd
        data={itemListJsonLd(
          products.map((product) => ({
            name: product.name[locale],
            path: localizedPath(locale, `products/${product.slug}`)
          }))
        )}
      />
      <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <header className="max-w-3xl space-y-4">
          <Badge>{commerce.collections}</Badge>
          <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">
            {collection.name[locale]}
          </h1>
          <p className="text-base leading-8 text-[var(--color-stone)]">{collection.description[locale]}</p>
        </header>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.slug} locale={locale} product={product} />
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 text-sm text-[var(--color-stone)] md:mt-10">
            {commerce.emptyCollection}
          </p>
        )}
      </div>
    </>
  );
}
