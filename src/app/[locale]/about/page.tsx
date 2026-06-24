import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";
import { assetPath, localizedHref } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo/metadata";

type AboutPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: AboutPageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: AboutPageProps) {
  const locale = await getLocale(params);
  const about = getMessages(locale).about;

  return buildMetadata({
    locale,
    path: "about",
    title: about.seoTitle,
    description: about.seoDescription
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const locale = await getLocale(params);
  const about = getMessages(locale).about;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge>{about.eyebrow}</Badge>
            <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">{about.title}</h1>
          </div>
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--color-mist)]">
            <Image
              alt={about.title}
              className="object-cover"
              fill
              priority
              sizes="(min-width: 1024px) 36vw, 100vw"
              src={assetPath("/images/brand/ritual-kit-still-life.jpg")}
            />
          </div>
        </div>
        <p className="text-base leading-8 text-[var(--color-stone)]">{about.description}</p>
      </header>

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">
        {about.sections.map((section) => (
          <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-6" key={section.title}>
            <h2 className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-stone)]">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={localizedHref(locale, "/collections")}>
          {about.collectionCta}
        </ButtonLink>
        <ButtonLink href={localizedHref(locale, "/journal")} variant="secondary">
          {about.journalCta}
        </ButtonLink>
      </div>
    </div>
  );
}
