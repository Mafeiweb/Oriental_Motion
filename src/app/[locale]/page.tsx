import { notFound } from "next/navigation";
import { JsonLd } from "@/components/content/json-ld";
import { HomeSections } from "@/components/sections/home-sections";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd } from "@/lib/seo/jsonld";

type HomePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: HomePageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: HomePageProps) {
  const locale = await getLocale(params);
  const home = getMessages(locale).home;

  return buildMetadata({
    locale,
    path: "/",
    title: home.seoTitle,
    description: home.seoDescription
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const locale = await getLocale(params);

  return (
    <>
      <JsonLd data={organizationJsonLd()} />
      <HomeSections locale={locale} />
    </>
  );
}
