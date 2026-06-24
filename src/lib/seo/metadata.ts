import type { Metadata } from "next";
import { siteConfig } from "../../config/site";
import { defaultLocale, localeHreflang, locales, type Locale } from "../../i18n/routing";
import { assetPath } from "../i18n/paths";

type BuildMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
};

export function localizedPath(locale: Locale, path: string) {
  const cleanPath = path === "/" || path === "" ? "" : `/${path.replace(/^\/+/, "")}`;
  return `/${locale}${cleanPath}`;
}

export function absoluteUrl(pathOrUrl: string) {
  return new URL(assetPath(pathOrUrl), siteConfig.url).toString();
}

export function buildAlternates(path: string) {
  const alternates = Object.fromEntries(
    locales.map((locale) => [localeHreflang[locale], `${siteConfig.url}${localizedPath(locale, path)}`])
  );

  return {
    ...alternates,
    "x-default": `${siteConfig.url}${localizedPath(defaultLocale, path)}`
  };
}

function openGraphLocale(locale: Locale) {
  return localeHreflang[locale].replace("-", "_");
}

function twitterImages(image?: string) {
  return image ? [absoluteUrl(image)] : undefined;
}

function openGraphImages(image?: string) {
  return image ? [{ url: absoluteUrl(image) }] : undefined;
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${localizedPath(input.locale, input.path)}`;
  const images = twitterImages(input.image);
  const openGraphBase = {
    title: input.title,
    description: input.description,
    url,
    siteName: siteConfig.name,
    images: openGraphImages(input.image),
    locale: openGraphLocale(input.locale)
  };

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: buildAlternates(input.path)
    },
    openGraph:
      input.type === "article"
        ? {
            ...openGraphBase,
            type: "article",
            publishedTime: input.publishedTime
          }
        : {
            ...openGraphBase,
            type: "website"
          },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images
    }
  };
}
