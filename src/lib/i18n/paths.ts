import {
  isLocale,
  type Locale
} from "../../i18n/routing";

export function localizedHref(locale: Locale, href: string) {
  return `/${locale}${href === "/" ? "" : href}`;
}

export function switchLocalePath(pathname: string | null, targetLocale: Locale) {
  const segments = (pathname ?? "").split("/").filter(Boolean);

  if (segments.length === 0) {
    return `/${targetLocale}`;
  }

  if (isLocale(segments[0])) {
    segments[0] = targetLocale;
  } else {
    segments.unshift(targetLocale);
  }

  return `/${segments.join("/")}`;
}
