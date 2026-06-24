import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";
import { assetPath, localizedHref } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo/metadata";

type TechnologyPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: TechnologyPageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: TechnologyPageProps) {
  const locale = await getLocale(params);
  const technology = getMessages(locale).technology;

  return buildMetadata({
    locale,
    path: "technology",
    title: technology.seoTitle,
    description: technology.seoDescription
  });
}

export default async function TechnologyPage({ params }: TechnologyPageProps) {
  const locale = await getLocale(params);
  const technology = getMessages(locale).technology;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
        <div className="max-w-3xl space-y-4">
          <Badge>{technology.eyebrow}</Badge>
          <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">{technology.title}</h1>
          <p className="text-base leading-8 text-[var(--color-stone)]">{technology.description}</p>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--color-mist)] sm:min-h-80">
          <Image
            alt={technology.title}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            src={assetPath("/images/products/balance-walker-generated.jpg")}
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(21,25,21,0.18)] to-transparent" />
        </div>
      </header>

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-2">
        {technology.sections.map((section, index) => (
          <section
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-6"
            key={section.title}
          >
            <span className="text-sm font-semibold text-[var(--color-botanical)]">{String(index + 1).padStart(2, "0")}</span>
            <h2 className="mt-6 text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:mt-8 sm:text-2xl">{section.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-stone)]">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={localizedHref(locale, "/collections/tai-chi-shoes")}>
          {technology.collectionCta}
        </ButtonLink>
        <ButtonLink href={localizedHref(locale, "/products/balance-walker")} variant="secondary">
          {technology.productCta}
        </ButtonLink>
      </div>
    </div>
  );
}
