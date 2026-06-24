import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";

export function formatPrice(locale: Locale, price: number) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: siteConfig.markets[locale].currency,
    maximumFractionDigits: 0
  }).format(price);
}

