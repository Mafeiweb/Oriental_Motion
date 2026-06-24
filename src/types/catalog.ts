import type { Locale } from "../i18n/routing";

export type LocalizedText = Record<Locale, string>;

export type Product = {
  slug: string;
  collectionSlugs: string[];
  name: LocalizedText;
  eyebrow: LocalizedText;
  description: LocalizedText;
  price: number;
  compareAtPrice?: number;
  image: string;
  imageAlt: LocalizedText;
  benefits: Record<Locale, string[]>;
  specs: Record<Locale, { label: string; value: string }[]>;
  faqs: Record<Locale, { question: string; answer: string }[]>;
};

export type Collection = {
  slug: string;
  name: LocalizedText;
  description: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
  seoTitle: LocalizedText;
};

export type Article = {
  slug: string;
  title: LocalizedText;
  excerpt: LocalizedText;
  category: LocalizedText;
  publishedAt: string;
  body: Record<Locale, string[]>;
};
