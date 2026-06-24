import { siteConfig } from "../../config/site";
import type { Locale } from "../../i18n/routing";
import type { Article, Product } from "../../types/catalog";
import { absoluteUrl, localizedPath } from "./metadata";

const jsonLdEscapes: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
  "\u2028": "\\u2028",
  "\u2029": "\\u2029"
};

export function serializeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/[<>&\u2028\u2029]/g, (character) => jsonLdEscapes[character]);
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.supportEmail
  };
}

type BreadcrumbItem = {
  name: string;
  path: string;
};

type ItemListItem = {
  name: string;
  path: string;
};

type FaqPageItem = {
  question: string;
  answer: string;
};

export function productJsonLd(product: Product, locale: Locale, path = localizedPath(locale, `products/${product.slug}`)) {
  const url = absoluteUrl(path);
  const seller = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.description[locale],
    url,
    image: absoluteUrl(product.image),
    brand: {
      "@type": "Brand",
      name: siteConfig.name
    },
    sku: product.slug,
    productID: product.slug,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      url,
      price: product.price,
      priceCurrency: siteConfig.markets[locale].currency,
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller
    },
    seller
  };
}

export function breadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function itemListJsonLd(items: ItemListItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path)
    }))
  };
}

export function faqPageJsonLd(items: FaqPageItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleJsonLd(article: Article, locale: Locale, path = localizedPath(locale, `journal/${article.slug}`)) {
  const url = absoluteUrl(path);
  const publisher = {
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url
  };

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.excerpt[locale],
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    },
    image: absoluteUrl(siteConfig.defaultImage),
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    },
    publisher
  };
}
