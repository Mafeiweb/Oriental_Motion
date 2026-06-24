import type { Locale } from "../i18n/routing";

function withoutTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}

const repositoryName = "Oriental_Motion";
const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubPagesUrl = `https://mafeiweb.github.io/${repositoryName}`;

export const siteConfig = {
  name: "Oriental Motion",
  url: withoutTrailingSlash(process.env.NEXT_PUBLIC_SITE_URL || (isGitHubPages ? githubPagesUrl : "https://oriental-motion.com")),
  basePath: isGitHubPages ? `/${repositoryName}` : "",
  defaultMarket: "US",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "support@oriental-motion.com",
  defaultImage: "/images/products/balance-walker.jpg",
  markets: {
    "en-us": { currency: "USD", country: "United States" },
    "zh-cn": { currency: "USD", country: "United States" },
    "es-us": { currency: "USD", country: "United States" }
  } satisfies Record<Locale, { currency: string; country: string }>
};
