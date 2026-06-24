import {
  isLocale,
  type Locale
} from "../../i18n/routing";
import { siteConfig } from "../../config/site";

export function localizedHref(locale: Locale, href: string) {
  return `/${locale}${href === "/" ? "" : href}`;
}

export function switchLocalePath(pathname: string | null, targetLocale: Locale) {
  const segments = stripBasePath(pathname ?? "").split("/").filter(Boolean);

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

export function assetPath(path: string) {
  if (/^(?:[a-z][a-z\d+.-]*:)?\/\//i.test(path)) {
    return path;
  }

  return withBasePath(path);
}

function withBasePath(path: string) {
  return `${siteConfig.basePath}${path}`;
}

export function stripBasePath(path: string) {
  if (!siteConfig.basePath || path === siteConfig.basePath) {
    return path === siteConfig.basePath ? "/" : path;
  }

  return path.startsWith(`${siteConfig.basePath}/`) ? path.slice(siteConfig.basePath.length) : path;
}
