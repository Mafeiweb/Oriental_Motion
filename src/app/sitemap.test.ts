import { describe, expect, it } from "vitest";
import { siteConfig } from "../config/site";
import sitemap from "./sitemap";

describe("sitemap", () => {
  it("includes localized alternate languages for entries", () => {
    const entries = sitemap();
    const technologyEntry = entries.find((entry) => entry.url === `${siteConfig.url}/en-us/technology`);

    expect(technologyEntry).toBeDefined();
    expect(technologyEntry?.alternates?.languages).toMatchObject({
      "en-US": `${siteConfig.url}/en-us/technology`,
      "zh-CN": `${siteConfig.url}/zh-cn/technology`,
      "es-US": `${siteConfig.url}/es-us/technology`,
      "x-default": `${siteConfig.url}/en-us/technology`
    });
  });
});
