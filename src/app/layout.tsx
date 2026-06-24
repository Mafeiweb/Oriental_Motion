import "./globals.css";
import type { ReactNode } from "react";
import { defaultLocale, isLocale } from "@/i18n/routing";

type RootLayoutProps = {
  children: ReactNode;
  params: Promise<{
    locale?: string;
  }>;
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam && isLocale(localeParam) ? localeParam : defaultLocale;

  return (
    <html data-scroll-behavior="smooth" lang={locale}>
      <body>{children}</body>
    </html>
  );
}
