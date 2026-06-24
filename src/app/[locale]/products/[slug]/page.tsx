import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/commerce/product-detail";
import { JsonLd } from "@/components/content/json-ld";
import { getCollection, getProduct, getProducts } from "@/lib/content/catalog";
import { buildMetadata, localizedPath } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqPageJsonLd, productJsonLd } from "@/lib/seo/jsonld";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales } from "@/i18n/routing";

type ProductPageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getPageData(params: ProductPageProps["params"]) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  return { locale, product };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getProducts().map((product) => ({
      locale,
      slug: product.slug
    }))
  );
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { locale, product } = await getPageData(params);

  return buildMetadata({
    locale,
    path: `products/${product.slug}`,
    title: product.name[locale],
    description: product.description[locale],
    image: product.image
  });
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { locale, product } = await getPageData(params);
  const commerce = getMessages(locale).commerce;
  const primaryCollection = getCollection(product.collectionSlugs[0]);
  const productPath = localizedPath(locale, `products/${product.slug}`);

  return (
    <>
      <JsonLd data={productJsonLd(product, locale, productPath)} />
      <JsonLd
        data={breadcrumbJsonLd(
          [
            { name: commerce.collections, path: localizedPath(locale, "collections") },
            primaryCollection
              ? {
                  name: primaryCollection.name[locale],
                  path: localizedPath(locale, `collections/${primaryCollection.slug}`)
                }
              : undefined,
            { name: product.name[locale], path: productPath }
          ].filter((item): item is { name: string; path: string } => Boolean(item))
        )}
      />
      <JsonLd data={faqPageJsonLd(product.faqs[locale])} />
      <ProductDetail locale={locale} product={product} />
    </>
  );
}
