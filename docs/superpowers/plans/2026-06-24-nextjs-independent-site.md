# Next.js Independent Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Next.js multilingual, SEO-first independent DTC site for Eastern functional light-wellness footwear and apparel.

**Architecture:** Use Next.js App Router with locale-prefixed routes, typed static content adapters, reusable section/components, and SEO helper functions. Keep commerce behind an adapter so static launch data can later be replaced with Shopify Storefront API without rewriting pages.

**Tech Stack:** Next.js, TypeScript, Tailwind CSS, next-intl-style locale routing, getdesign Shopify UI base where installation succeeds, Vitest for focused helper tests.

---

## File Structure

Create or modify these files:

- `package.json`: scripts and dependencies.
- `next.config.ts`: Next.js configuration.
- `tsconfig.json`: path aliases and TypeScript settings.
- `postcss.config.mjs`: Tailwind processing.
- `tailwind.config.ts`: theme tokens and content paths.
- `src/app/globals.css`: global CSS import surface.
- `src/styles/tokens.css`: brand CSS variables.
- `src/middleware.ts`: locale detection and redirect for `/`.
- `src/i18n/routing.ts`: supported locales and helpers.
- `src/i18n/messages/en-us.json`, `src/i18n/messages/zh-cn.json`, `src/i18n/messages/es-us.json`: interface copy.
- `src/config/site.ts`: brand, base URL, markets, and social defaults.
- `src/config/navigation.ts`: localized navigation keys.
- `src/types/catalog.ts`: product, collection, article, and locale types.
- `src/data/catalog.ts`: typed launch products and collections.
- `src/data/journal.ts`: typed launch article data.
- `src/lib/content/catalog.ts`: adapter functions for products and collections.
- `src/lib/content/journal.ts`: adapter functions for articles.
- `src/lib/seo/metadata.ts`: metadata and alternate builders.
- `src/lib/seo/jsonld.ts`: structured data builders.
- `src/components/ui/button.tsx`: reusable button/link primitive.
- `src/components/ui/badge.tsx`: reusable badge primitive.
- `src/components/layout/header.tsx`: navigation and locale switcher.
- `src/components/layout/footer.tsx`: footer navigation and market copy.
- `src/components/commerce/product-card.tsx`: reusable product card.
- `src/components/commerce/product-detail.tsx`: PDP body.
- `src/components/content/faq.tsx`: accessible FAQ section.
- `src/components/content/json-ld.tsx`: JSON-LD injection component.
- `src/components/sections/home-sections.tsx`: homepage sections.
- `src/app/[locale]/layout.tsx`: locale layout and metadata alternates.
- `src/app/[locale]/page.tsx`: home page.
- `src/app/[locale]/collections/page.tsx`: all collections page.
- `src/app/[locale]/collections/[slug]/page.tsx`: collection detail page.
- `src/app/[locale]/products/[slug]/page.tsx`: product detail page.
- `src/app/[locale]/technology/page.tsx`: technology page.
- `src/app/[locale]/journal/page.tsx`: journal index.
- `src/app/[locale]/journal/[slug]/page.tsx`: article page.
- `src/app/[locale]/membership/page.tsx`: member content entry page.
- `src/app/[locale]/about/page.tsx`: brand story page.
- `src/app/robots.ts`: robots config.
- `src/app/sitemap.ts`: localized sitemap.
- `src/lib/seo/metadata.test.ts`: metadata helper tests.
- `src/lib/seo/jsonld.test.ts`: JSON-LD helper tests.
- `src/lib/content/catalog.test.ts`: catalog adapter tests.

Current repository note: `/Users/anze/Documents/xieFu` is not a git repository. Commit steps are documented as optional and should be skipped unless a git repository is initialized later.

---

### Task 1: Scaffold Next.js Project And Tooling

**Files:**
- Create: `package.json`
- Create: `next.config.ts`
- Create: `tsconfig.json`
- Create: `postcss.config.mjs`
- Create: `tailwind.config.ts`
- Create: `src/app/globals.css`
- Create: `src/styles/tokens.css`

- [ ] **Step 1: Create the package manifest**

Create `package.json`:

```json
{
  "name": "eastern-wellness-storefront",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "typecheck": "tsc --noEmit",
    "test": "vitest run"
  },
  "dependencies": {
    "@next/third-parties": "latest",
    "clsx": "latest",
    "lucide-react": "latest",
    "next": "latest",
    "react": "latest",
    "react-dom": "latest"
  },
  "devDependencies": {
    "@testing-library/react": "latest",
    "@types/node": "latest",
    "@types/react": "latest",
    "@types/react-dom": "latest",
    "autoprefixer": "latest",
    "eslint": "latest",
    "eslint-config-next": "latest",
    "jsdom": "latest",
    "postcss": "latest",
    "tailwindcss": "latest",
    "typescript": "latest",
    "vitest": "latest"
  }
}
```

- [ ] **Step 2: Install dependencies**

Run:

```bash
pnpm install
```

Expected: `node_modules` and `pnpm-lock.yaml` are created.

- [ ] **Step 3: Try the requested Shopify design base**

Run:

```bash
npx getdesign@latest add shopify
```

Expected: the command either adds Shopify-style UI assets/components or exits with an actionable message. If the command fails because the package is unavailable or incompatible, continue with the local Shopify-inspired primitives in later tasks and record the failure in the final verification notes.

- [ ] **Step 4: Add Next.js and TypeScript config**

Create `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    typedRoutes: false
  }
};

export default nextConfig;
```

Create `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "es2022"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 5: Add Tailwind config and tokens**

Create `postcss.config.mjs`:

```js
const config = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};

export default config;
```

Create `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--color-canvas)",
        mist: "var(--color-mist)",
        botanical: "var(--color-botanical)",
        carbon: "var(--color-carbon)",
        stone: "var(--color-stone)",
        clay: "var(--color-clay)"
      },
      borderRadius: {
        sm: "6px",
        md: "8px"
      },
      boxShadow: {
        soft: "0 18px 55px rgba(23, 32, 24, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
```

Create `src/styles/tokens.css`:

```css
:root {
  --color-canvas: #f7f4ec;
  --color-mist: #e8ede4;
  --color-botanical: #1f4d33;
  --color-carbon: #151915;
  --color-stone: #686f64;
  --color-clay: #b4815d;
  --surface-paper: #fffdf8;
  --border-subtle: #d8d1c4;
}
```

Create `src/app/globals.css`:

```css
@import "../styles/tokens.css";

@tailwind base;
@tailwind components;
@tailwind utilities;

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  background: var(--color-canvas);
  color: var(--color-carbon);
  font-family: Arial, "Noto Sans SC", "Microsoft YaHei", sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}
```

- [ ] **Step 6: Verify scaffold**

Run:

```bash
pnpm typecheck
```

Expected: TypeScript may report no inputs until app files exist. This is acceptable for Task 1 if configuration files parse.

---

### Task 2: Locale, Site Config, And Static Data

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/messages/en-us.json`
- Create: `src/i18n/messages/zh-cn.json`
- Create: `src/i18n/messages/es-us.json`
- Create: `src/config/site.ts`
- Create: `src/config/navigation.ts`
- Create: `src/types/catalog.ts`
- Create: `src/data/catalog.ts`
- Create: `src/data/journal.ts`
- Create: `src/lib/content/catalog.ts`
- Create: `src/lib/content/journal.ts`
- Create: `src/lib/content/catalog.test.ts`

- [ ] **Step 1: Define locales**

Create `src/i18n/routing.ts`:

```ts
export const locales = ["en-us", "zh-cn", "es-us"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en-us";

export const localeLabels: Record<Locale, string> = {
  "en-us": "English",
  "zh-cn": "简体中文",
  "es-us": "Español"
};

export const localeHreflang: Record<Locale, string> = {
  "en-us": "en-US",
  "zh-cn": "zh-CN",
  "es-us": "es-US"
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
```

- [ ] **Step 2: Add site config**

Create `src/config/site.ts`:

```ts
import type { Locale } from "@/i18n/routing";

export const siteConfig = {
  name: "Oriental Motion",
  url: "https://example.com",
  defaultMarket: "US",
  supportEmail: "hello@example.com",
  markets: {
    "en-us": { currency: "USD", country: "United States" },
    "zh-cn": { currency: "USD", country: "United States" },
    "es-us": { currency: "USD", country: "United States" }
  } satisfies Record<Locale, { currency: string; country: string }>
};
```

Create `src/config/navigation.ts`:

```ts
export const navigation = [
  { href: "/collections", labelKey: "nav.collections" },
  { href: "/technology", labelKey: "nav.technology" },
  { href: "/journal", labelKey: "nav.journal" },
  { href: "/membership", labelKey: "nav.membership" },
  { href: "/about", labelKey: "nav.about" }
] as const;
```

- [ ] **Step 3: Add message files**

Create `src/i18n/messages/en-us.json`, `zh-cn.json`, and `es-us.json` with keys for `nav`, `home`, `common`, `footer`, `technology`, `membership`, and `about`. Use translated copy that matches the A/B/C strategy.

- [ ] **Step 4: Add catalog types and data**

Create `src/types/catalog.ts`:

```ts
import type { Locale } from "@/i18n/routing";

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
```

Create `src/data/catalog.ts` with three launch products: `balance-walker`, `ritual-slip-on`, and `cloud-hemp-set`; create three collections: `tai-chi-shoes`, `wellness-apparel`, and `ritual-kits`.

Create `src/data/journal.ts` with three articles: `slip-resistant-tai-chi-shoes`, `hemp-silk-wellnesswear`, and `wellness-gift-guide`.

- [ ] **Step 5: Add adapter functions**

Create `src/lib/content/catalog.ts`:

```ts
import { collections, products } from "@/data/catalog";

export function getCollections() {
  return collections;
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProducts() {
  return products;
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(collectionSlug: string) {
  return products.filter((product) => product.collectionSlugs.includes(collectionSlug));
}
```

Create `src/lib/content/journal.ts`:

```ts
import { articles } from "@/data/journal";

export function getArticles() {
  return articles;
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
```

- [ ] **Step 6: Add catalog adapter tests**

Create `src/lib/content/catalog.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { getCollection, getProductsByCollection } from "./catalog";

describe("catalog adapter", () => {
  it("returns products for a collection slug", () => {
    const products = getProductsByCollection("tai-chi-shoes");
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.collectionSlugs.includes("tai-chi-shoes"))).toBe(true);
  });

  it("returns undefined for a missing collection", () => {
    expect(getCollection("missing")).toBeUndefined();
  });
});
```

- [ ] **Step 7: Run tests**

Run:

```bash
pnpm test src/lib/content/catalog.test.ts
```

Expected: tests pass.

---

### Task 3: SEO Helpers, Middleware, Robots, And Sitemap

**Files:**
- Create: `src/middleware.ts`
- Create: `src/lib/seo/metadata.ts`
- Create: `src/lib/seo/jsonld.ts`
- Create: `src/components/content/json-ld.tsx`
- Create: `src/app/robots.ts`
- Create: `src/app/sitemap.ts`
- Create: `src/lib/seo/metadata.test.ts`
- Create: `src/lib/seo/jsonld.test.ts`

- [ ] **Step 1: Add locale middleware**

Create `src/middleware.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale } from "@/i18n/routing";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const firstSegment = pathname.split("/")[1];

  if (pathname.startsWith("/_next") || pathname.includes(".")) {
    return NextResponse.next();
  }

  if (isLocale(firstSegment)) {
    return NextResponse.next();
  }

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
```

- [ ] **Step 2: Add metadata helpers**

Create `src/lib/seo/metadata.ts`:

```ts
import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { localeHreflang, locales, type Locale } from "@/i18n/routing";

type BuildMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
};

export function localizedPath(locale: Locale, path: string) {
  const cleanPath = path === "/" ? "" : path;
  return `/${locale}${cleanPath}`;
}

export function buildAlternates(path: string) {
  return Object.fromEntries(
    locales.map((locale) => [localeHreflang[locale], `${siteConfig.url}${localizedPath(locale, path)}`])
  );
}

export function buildMetadata(input: BuildMetadataInput): Metadata {
  const url = `${siteConfig.url}${localizedPath(input.locale, input.path)}`;

  return {
    title: input.title,
    description: input.description,
    alternates: {
      canonical: url,
      languages: buildAlternates(input.path)
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: siteConfig.name,
      images: input.image ? [{ url: input.image }] : undefined,
      locale: input.locale,
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description
    }
  };
}
```

- [ ] **Step 3: Add JSON-LD helpers**

Create `src/lib/seo/jsonld.ts`:

```ts
import { siteConfig } from "@/config/site";
import type { Article, Product } from "@/types/catalog";
import type { Locale } from "@/i18n/routing";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.supportEmail
  };
}

export function productJsonLd(product: Product, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name[locale],
    description: product.description[locale],
    image: product.image,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "USD",
      availability: "https://schema.org/InStock"
    }
  };
}

export function articleJsonLd(article: Article, locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title[locale],
    description: article.excerpt[locale],
    datePublished: article.publishedAt,
    author: {
      "@type": "Organization",
      name: siteConfig.name
    }
  };
}
```

Create `src/components/content/json-ld.tsx`:

```tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

- [ ] **Step 4: Add robots and sitemap**

Create `src/app/robots.ts` and `src/app/sitemap.ts` using site config, locales, collections, products, and articles to generate crawlable localized URLs.

- [ ] **Step 5: Add SEO tests**

Create `src/lib/seo/metadata.test.ts` asserting `buildAlternates("/technology")` includes `en-US`, `zh-CN`, and `es-US`.

Create `src/lib/seo/jsonld.test.ts` asserting `organizationJsonLd()` returns `@type: "Organization"` and `productJsonLd()` returns `@type: "Product"` with USD offers.

- [ ] **Step 6: Run SEO tests**

Run:

```bash
pnpm test src/lib/seo/metadata.test.ts src/lib/seo/jsonld.test.ts
```

Expected: tests pass.

---

### Task 4: Layout And UI Primitives

**Files:**
- Create: `src/components/ui/button.tsx`
- Create: `src/components/ui/badge.tsx`
- Create: `src/components/layout/header.tsx`
- Create: `src/components/layout/footer.tsx`
- Create: `src/app/[locale]/layout.tsx`

- [ ] **Step 1: Add UI primitives**

Create a `ButtonLink` component with variants `primary`, `secondary`, and `ghost`. Create a compact `Badge` component for proof points such as "Wet grip outsole" and "Hemp-silk blend".

- [ ] **Step 2: Add header**

Create `src/components/layout/header.tsx` with:

- Brand link.
- Collection, technology, journal, membership, and about navigation.
- Locale switcher linking to the same top-level path under `en-us`, `zh-cn`, and `es-us`.
- Mobile-safe wrapping without overlapping text.

- [ ] **Step 3: Add footer**

Create `src/components/layout/footer.tsx` with:

- Brand statement.
- Shop links.
- Learn links.
- Locale links.
- SEO-friendly support email text.

- [ ] **Step 4: Add locale layout**

Create `src/app/[locale]/layout.tsx`:

```tsx
import "../globals.css";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { isLocale, locales, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isLocale(params.locale)) {
    notFound();
  }

  const locale = params.locale as Locale;

  return (
    <html lang={locale}>
      <body>
        <Header locale={locale} />
        <main>{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
```

- [ ] **Step 5: Verify layout type checks**

Run:

```bash
pnpm typecheck
```

Expected: no TypeScript errors.

---

### Task 5: Commerce Components And Product Pages

**Files:**
- Create: `src/components/commerce/product-card.tsx`
- Create: `src/components/commerce/product-detail.tsx`
- Create: `src/components/content/faq.tsx`
- Create: `src/app/[locale]/collections/page.tsx`
- Create: `src/app/[locale]/collections/[slug]/page.tsx`
- Create: `src/app/[locale]/products/[slug]/page.tsx`

- [ ] **Step 1: Add product card**

Create a product card that accepts `{ product, locale }`, renders image, localized name, eyebrow, price, and a "View details" link.

- [ ] **Step 2: Add FAQ component**

Create an accessible FAQ component using semantic headings and buttons or simple definition sections. Use product FAQ data on PDP.

- [ ] **Step 3: Add product detail component**

Render product hero, benefits, specs, care/proof copy, FAQ, and a Shopify-ready "Add to cart" disabled shell that says "Checkout integration coming soon" in localized copy.

- [ ] **Step 4: Add collection pages**

All collections page lists collection cards. Collection detail page lists products by collection and uses metadata built from localized collection SEO title.

- [ ] **Step 5: Add product route**

PDP route uses `generateStaticParams()` for every locale and product slug, `generateMetadata()` for localized SEO, and `JsonLd` with `productJsonLd()`.

- [ ] **Step 6: Verify product pages build**

Run:

```bash
pnpm typecheck
pnpm test src/lib/content/catalog.test.ts
```

Expected: both pass.

---

### Task 6: Marketing, Technology, Journal, Membership, And About Pages

**Files:**
- Create: `src/components/sections/home-sections.tsx`
- Create: `src/app/[locale]/page.tsx`
- Create: `src/app/[locale]/technology/page.tsx`
- Create: `src/app/[locale]/journal/page.tsx`
- Create: `src/app/[locale]/journal/[slug]/page.tsx`
- Create: `src/app/[locale]/membership/page.tsx`
- Create: `src/app/[locale]/about/page.tsx`

- [ ] **Step 1: Add homepage sections**

Create sections for:

- Hero: "Built for balance, styled for daily ritual" strategy in localized copy.
- Proof strip: wet grip, cushioning, washable layers, natural-feeling materials.
- Product collection spotlight.
- Technology preview.
- Ritual/member preview.
- Journal teaser.

- [ ] **Step 2: Add homepage route**

Use metadata helper, organization JSON-LD, and homepage sections.

- [ ] **Step 3: Add technology page**

Render wet grip outsole, nitrogen midsole, hemp-silk material system, and restrained Eastern design language sections.

- [ ] **Step 4: Add journal pages**

Journal index lists articles. Article route renders localized title, excerpt, body, article JSON-LD, and article metadata.

- [ ] **Step 5: Add membership page**

Render future QR/NFC practice content, member perks, and ritual kit retention concept without implementing login.

- [ ] **Step 6: Add about page**

Render brand story derived from the PDF: Eastern wellness, modern performance, US daily movement, and material philosophy.

- [ ] **Step 7: Verify content routes**

Run:

```bash
pnpm typecheck
pnpm build
```

Expected: build succeeds and generates all localized static routes.

---

### Task 7: Visual Polish, Responsive Behavior, And Accessibility

**Files:**
- Modify: `src/styles/tokens.css`
- Modify: `src/app/globals.css`
- Modify: component files from Tasks 4-6 as needed.

- [ ] **Step 1: Apply brand visual system**

Use warm off-white, mist, botanical green, stone, clay, and carbon. Keep cards at 8px radius or less. Avoid decorative bokeh/orb backgrounds.

- [ ] **Step 2: Stabilize layout dimensions**

Ensure product cards, hero media, proof tiles, and journal cards have stable aspect ratios and min heights so text and hover states do not shift layout.

- [ ] **Step 3: Check mobile navigation**

At mobile width, navigation must wrap or collapse without text overlap. Locale links must remain keyboard accessible.

- [ ] **Step 4: Check headings and landmarks**

Each page must have one visible `h1`, semantic sections, accessible link text, and image alt text.

- [ ] **Step 5: Run browser verification**

Start dev server:

```bash
pnpm dev
```

Open:

```text
http://localhost:3000/en-us
http://localhost:3000/en-us/products/balance-walker
http://localhost:3000/es-us/technology
http://localhost:3000/zh-cn/journal
```

Expected: pages render without visual overlap at desktop and mobile widths.

---

### Task 8: Final Verification And Delivery

**Files:**
- Modify only files needed to fix verification issues.

- [ ] **Step 1: Run full checks**

Run:

```bash
pnpm typecheck
pnpm test
pnpm build
```

Expected: all commands pass.

- [ ] **Step 2: Confirm SEO artifacts**

Open:

```text
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
```

Expected: sitemap includes localized home, collections, products, technology, journal, membership, and about URLs. Robots references sitemap.

- [ ] **Step 3: Check generated metadata manually**

Inspect page source for one product page and one article page. Expected: localized title, description, canonical, `hreflang`, JSON-LD script, and crawlable body content.

- [ ] **Step 4: Optional commit**

If this folder is later initialized as a git repository:

```bash
git add .
git commit -m "feat: build multilingual Next.js storefront"
```

Current expected behavior: skip this step because `/Users/anze/Documents/xieFu` is not a git repository.
