import type { MetadataRoute } from "next";
import { siteConfig } from "../config/site";
import { locales } from "../i18n/routing";
import { getCollections, getProducts } from "../lib/content/catalog";
import { getArticles } from "../lib/content/journal";
import { buildAlternates, localizedPath } from "../lib/seo/metadata";

export const dynamic = "force-static";

const staticPaths = [
  "/",
  "/collections",
  "/technology",
  "/journal",
  "/membership",
  "/about"
];

function sitemapUrl(path: string) {
  return locales.map((locale) => ({
    url: `${siteConfig.url}${localizedPath(locale, path)}`,
    alternates: {
      languages: buildAlternates(path)
    }
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  const collectionPaths = getCollections().map((collection) => `/collections/${collection.slug}`);
  const productPaths = getProducts().map((product) => `/products/${product.slug}`);
  const articlePaths = getArticles().map((article) => `/journal/${article.slug}`);
  const paths = [...staticPaths, ...collectionPaths, ...productPaths, ...articlePaths];

  return paths.flatMap(sitemapUrl);
}
