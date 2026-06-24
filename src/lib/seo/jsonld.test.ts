import { describe, expect, it } from "vitest";
import { siteConfig } from "../../config/site";
import { getArticle } from "../content/journal";
import { getProduct } from "../content/catalog";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  itemListJsonLd,
  organizationJsonLd,
  productJsonLd,
  serializeJsonLd
} from "./jsonld";

describe("json-ld helpers", () => {
  it("builds organization structured data", () => {
    expect(organizationJsonLd()).toMatchObject({
      "@type": "Organization"
    });
  });

  it("builds product structured data with stable localized absolute commerce URLs", () => {
    const product = getProduct("balance-walker");

    expect(product).toBeDefined();
    expect(productJsonLd(product!, "zh-cn")).toMatchObject({
      "@type": "Product",
      url: `${siteConfig.url}/zh-cn/products/balance-walker`,
      image: `${siteConfig.url}${product!.image}`,
      brand: {
        "@type": "Brand",
        name: "Oriental Motion"
      },
      sku: "balance-walker",
      itemCondition: "https://schema.org/NewCondition",
      offers: {
        "@type": "Offer",
        url: `${siteConfig.url}/zh-cn/products/balance-walker`,
        priceCurrency: "USD",
        seller: {
          "@type": "Organization",
          name: "Oriental Motion"
        }
      }
    });
  });

  it("builds breadcrumb structured data", () => {
    expect(
      breadcrumbJsonLd([
        { name: "Colecciones", path: "es-us/collections" },
        { name: "Zapatos de Tai Chi", path: "es-us/collections/tai-chi-shoes" }
      ])
    ).toMatchObject({
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Colecciones",
          item: `${siteConfig.url}/es-us/collections`
        },
        {
          position: 2,
          item: `${siteConfig.url}/es-us/collections/tai-chi-shoes`
        }
      ]
    });
  });

  it("builds item list structured data", () => {
    expect(
      itemListJsonLd([
        { name: "Balance Walker", path: "zh-cn/products/balance-walker" },
        { name: "Ritual Slip-On", path: "zh-cn/products/ritual-slip-on" }
      ])
    ).toMatchObject({
      "@type": "ItemList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Balance Walker",
          url: `${siteConfig.url}/zh-cn/products/balance-walker`
        },
        {
          position: 2,
          url: `${siteConfig.url}/zh-cn/products/ritual-slip-on`
        }
      ]
    });
  });

  it("builds article structured data with localized URL, image, and publisher", () => {
    const article = getArticle("slip-resistant-tai-chi-shoes");

    expect(article).toBeDefined();
    expect(articleJsonLd(article!, "es-us", "/es-us/journal/slip-resistant-tai-chi-shoes")).toMatchObject({
      "@type": "Article",
      url: `${siteConfig.url}/es-us/journal/slip-resistant-tai-chi-shoes`,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${siteConfig.url}/es-us/journal/slip-resistant-tai-chi-shoes`
      },
      image: `${siteConfig.url}${siteConfig.defaultImage}`,
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: siteConfig.url
      }
    });
  });

  it("builds FAQPage structured data", () => {
    expect(faqPageJsonLd([{ question: "Is it only for tai chi?", answer: "No." }])).toMatchObject({
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Is it only for tai chi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No."
          }
        }
      ]
    });
  });

  it("safely serializes script-breaking strings", () => {
    const serialized = serializeJsonLd({
      value: "</script><script>alert('x')</script>",
      separator: "\u2028",
      terminator: "\u2029"
    });

    expect(serialized).not.toContain("<");
    expect(serialized).not.toContain(">");
    expect(serialized).toContain("\\u003c/script\\u003e\\u003cscript\\u003e");
    expect(serialized).toContain("\\u2028");
    expect(serialized).toContain("\\u2029");
  });
});
