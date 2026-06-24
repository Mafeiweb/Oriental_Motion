import Link from "next/link";
import { navigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { LocaleSwitcher } from "@/components/layout/locale-switcher";
import { PrimaryNav } from "@/components/layout/primary-nav";
import type { Locale } from "@/i18n/routing";
import { getMessages } from "@/i18n/messages";
import { localizedHref } from "@/lib/i18n/paths";

type HeaderProps = {
  locale: Locale;
};

export function Header({ locale }: HeaderProps) {
  const messages = getMessages(locale);
  const navMessages = messages.nav;
  const navLinks = navigation.map((item) => {
    const key = item.labelKey.replace("nav.", "") as keyof typeof navMessages;

    return {
      href: localizedHref(locale, item.href),
      label: navMessages[key]
    };
  });

  return (
    <header className="border-b border-[var(--border-subtle)] bg-[var(--color-canvas)]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex min-w-0 flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <Link
            href={localizedHref(locale, "/")}
            className="max-w-full text-base font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-clay)]"
          >
            {siteConfig.name}
          </Link>

          <PrimaryNav ariaLabel={messages.a11y.primaryNav} links={navLinks} />
        </div>

        <LocaleSwitcher ariaLabel={messages.a11y.localeNav} locale={locale} />
      </div>
    </header>
  );
}
