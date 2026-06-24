import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales, type Locale } from "@/i18n/routing";

type LocaleLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;

  if (!isLocale(localeParam)) {
    notFound();
  }

  const locale = localeParam as Locale;
  const messages = getMessages(locale);

  return (
    <>
      <a
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-[var(--color-carbon)] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:!text-[var(--color-on-dark)] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[var(--color-clay)]"
        href="#main-content"
      >
        {messages.a11y.skipToContent}
      </a>
      <Header locale={locale} />
      <main id="main-content" tabIndex={-1}>
        {children}
      </main>
      <Footer locale={locale} />
    </>
  );
}
