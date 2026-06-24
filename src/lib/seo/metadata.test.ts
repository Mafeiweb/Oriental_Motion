import { describe, expect, it } from "vitest";
import { siteConfig } from "../../config/site";
import { buildAlternates, buildMetadata, localizedPath } from "./metadata";

describe("metadata helpers", () => {
  it("builds localized alternates for technology", () => {
    const alternates = buildAlternates("/technology");

    expect(alternates).toMatchObject({
      "en-US": `${siteConfig.url}/en-us/technology`,
      "zh-CN": `${siteConfig.url}/zh-cn/technology`,
      "es-US": `${siteConfig.url}/es-us/technology`,
      "x-default": `${siteConfig.url}/en-us/technology`
    });
  });

  it("localizes paths that do not start with a slash", () => {
    expect(localizedPath("en-us", "technology")).toBe("/en-us/technology");
  });

  it("builds canonical, underscore Open Graph locale, and Twitter images", () => {
    const metadata = buildMetadata({
      locale: "zh-cn",
      path: "technology",
      title: "Technology",
      description: "Eastern wellness technology.",
      image: "/images/og/technology.jpg"
    });

    expect(metadata.alternates).toMatchObject({
      canonical: `${siteConfig.url}/zh-cn/technology`
    });
    expect(metadata.openGraph).toMatchObject({
      locale: "zh_CN",
      images: [{ url: `${siteConfig.url}/images/og/technology.jpg` }]
    });
    expect(metadata.twitter).toMatchObject({
      images: [`${siteConfig.url}/images/og/technology.jpg`]
    });
  });

  it("builds article Open Graph metadata", () => {
    const metadata = buildMetadata({
      locale: "en-us",
      path: "journal/slip-resistant-tai-chi-shoes",
      title: "Why Slip Resistance Matters in Tai Chi Shoes",
      description: "Balance practice starts with a stable base.",
      image: siteConfig.defaultImage,
      type: "article",
      publishedTime: "2026-06-24"
    });

    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: `${siteConfig.url}/en-us/journal/slip-resistant-tai-chi-shoes`,
      images: [{ url: `${siteConfig.url}${siteConfig.defaultImage}` }],
      publishedTime: "2026-06-24"
    });
  });
});
