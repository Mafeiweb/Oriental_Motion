# Next.js Independent Site Design

## Goal

Build a reusable, SEO-first, multilingual DTC independent site for the "Eastern functional light-wellness footwear and apparel" concept from the source PDF. The first version should serve US market operations, communicate functional safety first, express Eastern wellness aesthetics second, and reserve a clear path for future membership, content, and commerce expansion.

## Positioning

The site strategy is:

- A as the primary conversion axis: functional safety, slip resistance, cushioning, durability, and daily scenario switching.
- B as the visual language: Eastern aesthetics, natural materials, calm wellness, and premium lifestyle cues.
- C as the future growth layer: ritual kits, practice content, QR/NFC activation, member perks, and retention loops.

The US-facing message should answer two questions in this order:

1. Why buy: safer, more comfortable, more versatile movement gear.
2. Why this brand: Eastern wellness design, natural-feeling materials, and a distinctive ritual lifestyle.

## Initial Languages

The first version supports:

- `en-us`: default US market storefront language and primary SEO canonical market.
- `zh-cn`: Chinese brand, team, partner, and source-material reuse.
- `es-us`: US Spanish localization for broader US market reach.

Every localized route must support language-aware metadata, alternates, and `hreflang` relationships.

## Recommended Stack

Use a Next.js independent frontend:

- Next.js App Router for nested layouts, metadata, server components, static generation, and route-level SEO.
- `next-intl` or an equivalent message-based i18n layer for locale routing and translations.
- TypeScript for typed content models, product models, and component contracts.
- Tailwind CSS plus the requested `npx getdesign@latest add shopify` UI base.
- A small design token layer to adapt Shopify-style components into the brand's Eastern performance wellness aesthetic.

This route is preferred over Hydrogen because the first milestone is brand, SEO, and content architecture rather than deep Shopify commerce. The frontend should remain Shopify-ready through clean commerce interfaces.

## Page Architecture

The initial route tree should be locale-prefixed:

```text
app/
  [locale]/
    page.tsx
    collections/
      page.tsx
      [slug]/
        page.tsx
    products/
      [slug]/
        page.tsx
    technology/
      page.tsx
    journal/
      page.tsx
      [slug]/
        page.tsx
    membership/
      page.tsx
    about/
      page.tsx
```

Recommended launch pages:

- Home: clear hero around slip-safe movement and daily ritual, featured products, technology proof, scenario modules, social proof, journal/member entry.
- Collections: Tai Chi shoes, slip-resistant walking shoes, wellness apparel, ritual kits.
- Product detail: benefits, technical specs, scenario fit, materials, care instructions, FAQ, reviews-ready section, related products.
- Technology: wet-grip outsole, nitrogen midsole, hemp-silk or natural material system, care and performance proof.
- Journal: SEO content hub for Tai Chi shoes, mindful movement, wellness styling, gift guides, material care, and US search demand.
- Membership: lightweight placeholder for practice videos, QR/NFC activation, perks, and loyalty without requiring full account infrastructure at launch.
- About: brand story, Eastern wellness design philosophy, material philosophy, and US-market trust cues.

## SEO Requirements

The architecture must support:

- Server-rendered metadata per route and locale.
- Locale-specific title, description, Open Graph, Twitter card, canonical, and alternates.
- `hreflang` for `en-US`, `zh-CN`, and `es-US`.
- Static sitemap generation for localized routes.
- Robots configuration.
- JSON-LD for organization, website, product, collection, article, FAQ, and breadcrumb where relevant.
- Semantic HTML sections and accessible headings.
- Content-first URLs and slugs designed for US search intent.

Primary SEO topic clusters:

- Slip-resistant Tai Chi shoes.
- Shoes for balance and mindful movement.
- Comfortable walking shoes for older adults.
- Modern Chinese wellness apparel.
- Hemp silk wellness clothing.
- Tai Chi practice outfit.
- Gift guide for wellness and movement.

## Component And Data Boundaries

Use a low-redundancy project structure:

```text
src/
  app/
  components/
    ui/
    layout/
    commerce/
    content/
    sections/
  config/
    site.ts
    locales.ts
    navigation.ts
    seo.ts
  data/
    products/
    collections/
    journal/
  i18n/
    messages/
    routing.ts
  lib/
    seo/
    commerce/
    content/
    analytics/
  styles/
    globals.css
    tokens.css
  types/
```

Responsibilities:

- `components/ui`: primitive reusable UI from the Shopify design base, wrapped only when needed.
- `components/layout`: header, footer, locale switcher, navigation, announcement bar.
- `components/commerce`: product cards, price display, product gallery, variant selector, add-to-cart boundary, cart shell.
- `components/content`: rich text, article cards, FAQ blocks, trust badges, comparison modules.
- `components/sections`: page-level marketing sections assembled from reusable components.
- `config`: site-wide constants, navigation, locale map, SEO defaults, markets.
- `data`: static launch data that can later be replaced by Shopify/CMS adapters.
- `lib/seo`: metadata builders, JSON-LD builders, sitemap helpers.
- `lib/commerce`: commerce provider interface and mock/static implementation for launch.
- `types`: shared product, collection, article, market, and locale types.

The launch site may use static data files, but data access should go through small adapter functions so Shopify Storefront API or a CMS can be added later without rewriting page components.

## Visual Direction

Use the Shopify-style UI base for commercial clarity and conversion ergonomics, then adapt it with brand tokens:

- Backgrounds: warm off-white, mist gray, and light natural textile surfaces.
- Primary color: deep botanical green for trust, safety, and brand recognition.
- Support colors: carbon black, stone, muted clay, and restrained metallic gray.
- Typography: clean modern Latin typography for US readability, with Chinese support for `zh-cn`.
- Layout: calm, premium, scan-friendly, and product-led.
- Avoid over-decorative oriental motifs. Use Eastern cues through spacing, materials, natural textures, silhouettes, and restrained iconography.

## Commerce Boundary

The first version should be Shopify-ready but not tightly coupled to Shopify internals.

At launch:

- Products can be represented by typed static data.
- Product cards and product detail pages should call a commerce adapter.
- Cart and checkout can be represented as a clean UI shell or external checkout boundary.

Future Shopify integration:

- Replace static product adapter with Shopify Storefront API.
- Map Shopify products, variants, images, prices, and collections into internal types.
- Keep page sections and UI components unchanged where possible.

## Multilingual Content Model

Translations should be message-based for interface copy and content-aware for products/articles:

- UI copy lives in locale message files.
- Product and collection display copy supports localized names, descriptions, benefits, specs, and FAQs.
- Journal articles can be locale-specific rather than forced one-to-one translations.
- Missing translations should fail visibly during development and degrade gracefully in production only if explicitly configured.

## Accessibility And Performance

Requirements:

- Semantic navigation, landmarks, headings, buttons, and links.
- Keyboard-accessible menus, locale switcher, product controls, and cart controls.
- Image alt text for every product and editorial image.
- Responsive behavior for mobile, tablet, and desktop.
- Optimized images through Next.js image handling.
- Avoid layout shift in product grids, hero media, and cards.
- Keep first-page content server-rendered and crawlable.

## Testing And Verification

Implementation should include:

- Type checking.
- Linting.
- Build verification.
- Focused unit tests for locale routing, SEO metadata builders, JSON-LD builders, and commerce adapters if test tooling is present.
- Browser verification for desktop and mobile layouts after the site is built.

## Non-Goals For First Version

The first milestone does not need:

- Full Shopify checkout integration.
- Real user login.
- Complete member video platform.
- CMS authoring UI.
- Inventory synchronization.
- Payment processing.

These should remain clean extension points rather than launch blockers.

## Open Decisions

- Final brand name and logo assets are not present in the current project.
- Product photography is not present; first build may use generated or carefully selected placeholder imagery.
- Exact Shopify integration timing is not yet decided.
- The requested `getdesign` command should be validated against the local project setup during implementation.
