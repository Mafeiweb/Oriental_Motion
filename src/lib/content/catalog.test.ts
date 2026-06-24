import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { locales } from "../../i18n/routing";
import {
  getCollection,
  getCollections,
  getProduct,
  getProducts,
  getProductsByCollection
} from "./catalog";

describe("catalog adapter", () => {
  it("returns products for a collection slug", () => {
    const products = getProductsByCollection("tai-chi-shoes");
    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.collectionSlugs.includes("tai-chi-shoes"))).toBe(true);
  });

  it("returns undefined for a missing collection", () => {
    expect(getCollection("missing")).toBeUndefined();
  });

  it("returns the expected product by slug", () => {
    const product = getProduct("balance-walker");

    expect(product).toBeDefined();
    expect(product?.slug).toBe("balance-walker");
    expect(product?.name["en-us"]).toBe("Balance Walker");
  });

  it("uses only collection slugs that exist", () => {
    const collectionSlugs = new Set(getCollections().map((collection) => collection.slug));

    for (const product of getProducts()) {
      expect(product.collectionSlugs.length).toBeGreaterThan(0);
      expect(product.collectionSlugs.every((slug) => collectionSlugs.has(slug))).toBe(true);
    }
  });

  it("has unique product and collection slugs", () => {
    const productSlugs = getProducts().map((product) => product.slug);
    const collectionSlugs = getCollections().map((collection) => collection.slug);

    expect(new Set(productSlugs).size).toBe(productSlugs.length);
    expect(new Set(collectionSlugs).size).toBe(collectionSlugs.length);
  });

  it("has practical localized product fields for every locale", () => {
    for (const product of getProducts()) {
      for (const locale of locales) {
        expect(product.name[locale]).toBeTruthy();
        expect(product.eyebrow[locale]).toBeTruthy();
        expect(product.description[locale]).toBeTruthy();
        expect(product.imageAlt[locale]).toBeTruthy();
        expect(product.benefits[locale]?.length).toBeGreaterThan(0);
        expect(product.benefits[locale].every(Boolean)).toBe(true);
        expect(product.specs[locale]?.length).toBeGreaterThan(0);
        expect(product.specs[locale].every((spec) => spec.label && spec.value)).toBe(true);
        expect(product.faqs[locale]?.length).toBeGreaterThan(0);
        expect(product.faqs[locale].every((faq) => faq.question && faq.answer)).toBe(true);
      }
    }
  });

  it("has localized collection fields for every locale", () => {
    for (const collection of getCollections()) {
      for (const locale of locales) {
        expect(collection.name[locale]).toBeTruthy();
        expect(collection.description[locale]).toBeTruthy();
        expect(collection.seoTitle[locale]).toBeTruthy();
      }
    }
  });

  it("returns new array instances for catalog lists", () => {
    expect(getProducts()).not.toBe(getProducts());
    expect(getCollections()).not.toBe(getCollections());
  });

  it("has public image files for every product image path", () => {
    for (const product of getProducts()) {
      const imagePath = join(process.cwd(), "public", product.image.replace(/^\/+/, ""));

      expect(existsSync(imagePath), `${product.slug} image is missing at ${imagePath}`).toBe(true);
    }
  });
});
