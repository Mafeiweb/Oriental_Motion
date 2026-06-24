import { describe, expect, it } from "vitest";
import { localizedHref, switchLocalePath } from "./paths";

describe("i18n path helpers", () => {
  it("prefixes localized navigation links", () => {
    expect(localizedHref("en-us", "/")).toBe("/en-us");
    expect(localizedHref("zh-cn", "/collections")).toBe("/zh-cn/collections");
  });

  it("switches the locale while preserving deep storefront paths", () => {
    expect(switchLocalePath("/en-us/products/balance-walker", "es-us")).toBe(
      "/es-us/products/balance-walker"
    );
    expect(switchLocalePath("/zh-cn/journal/slip-resistant-tai-chi-shoes", "en-us")).toBe(
      "/en-us/journal/slip-resistant-tai-chi-shoes"
    );
  });

  it("handles missing or unlocalized paths defensively", () => {
    expect(switchLocalePath(null, "zh-cn")).toBe("/zh-cn");
    expect(switchLocalePath("/products/balance-walker", "zh-cn")).toBe("/zh-cn/products/balance-walker");
  });
});
