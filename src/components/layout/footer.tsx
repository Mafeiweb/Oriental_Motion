import Link from "next/link";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import type { Locale } from "@/i18n/routing";
import { getMessages } from "@/i18n/messages";
import { localizedHref } from "@/lib/i18n/paths";

type FooterProps = {
  locale: Locale;
};

export function Footer({ locale }: FooterProps) {
  const messages = getMessages(locale);
  const navMessages = messages.nav;
  const footerMessages = messages.footer;
  const shopLinks = navigation.filter((item) =>
    ["/collections", "/membership"].includes(item.href)
  );
  const learnLinks = navigation.filter((item) =>
    ["/technology", "/journal", "/about"].includes(item.href)
  );

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--surface-paper)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <section className="space-y-3">
          <Link
            href={localizedHref(locale, "/")}
            className="inline-flex text-base font-semibold text-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-clay)]"
          >
            {siteConfig.name}
          </Link>
          <p className="max-w-sm text-sm leading-6 text-[var(--color-stone)]">
            {footerMessages.tagline}
          </p>
          <p className="text-sm leading-6 text-[var(--color-stone)]">
            {footerMessages.support}:{" "}
            <a
              className="font-medium text-[var(--color-carbon)] underline-offset-4 hover:underline"
              href={`mailto:${siteConfig.supportEmail}`}
            >
              {siteConfig.supportEmail}
            </a>
          </p>
        </section>

        <FooterLinkGroup
          label={footerMessages.shop}
          links={shopLinks.map((item) => {
            const key = item.labelKey.replace("nav.", "") as keyof typeof navMessages;

            return {
              href: localizedHref(locale, item.href),
              label: navMessages[key]
            };
          })}
        />

        <FooterLinkGroup
          label={footerMessages.learn}
          links={learnLinks.map((item) => {
            const key = item.labelKey.replace("nav.", "") as keyof typeof navMessages;

            return {
              href: localizedHref(locale, item.href),
              label: navMessages[key]
            };
          })}
        />

        <LocaleSwitcher
          ariaLabel={footerMessages.locale}
          locale={locale}
          variant="list"
        />
      </div>
    </footer>
  );
}

type FooterLinkGroupProps = {
  label: string;
  links: Array<{
    href: string;
    label: string;
  }>;
};

function FooterLinkGroup({ label, links }: FooterLinkGroupProps) {
  return (
    <nav aria-label={label} className="space-y-3">
      <h2 className="text-sm font-semibold text-[var(--color-carbon)]">
        {label}
      </h2>
      <ul className="space-y-2 text-sm text-[var(--color-stone)]">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className="inline-flex rounded-sm leading-6 underline-offset-4 hover:text-[var(--color-carbon)] hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-clay)]"
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
