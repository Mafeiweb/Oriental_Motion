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
