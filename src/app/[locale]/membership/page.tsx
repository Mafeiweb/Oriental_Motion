import Image from "next/image";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";
import { buildMetadata } from "@/lib/seo/metadata";

type MembershipPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: MembershipPageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: MembershipPageProps) {
  const locale = await getLocale(params);
  const membership = getMessages(locale).membership;

  return buildMetadata({
    locale,
    path: "membership",
    title: membership.seoTitle,
    description: membership.seoDescription
  });
}

export default async function MembershipPage({ params }: MembershipPageProps) {
  const locale = await getLocale(params);
  const membership = getMessages(locale).membership;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="grid gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-end">
        <div className="max-w-3xl space-y-4">
          <Badge>{membership.eyebrow}</Badge>
          <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">{membership.title}</h1>
          <p className="text-base leading-8 text-[var(--color-stone)]">{membership.description}</p>
        </div>
        <div className="relative min-h-64 overflow-hidden rounded-lg border border-[var(--border-subtle)] bg-[var(--color-mist)] sm:min-h-80">
          <Image
            alt={membership.title}
            className="object-cover"
            fill
            priority
            sizes="(min-width: 1024px) 44vw, 100vw"
            src="/images/brand/ritual-kit-still-life.jpg"
          />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[rgba(21,25,21,0.18)] to-transparent" />
        </div>
      </header>

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
        {membership.items.map((item, index) => (
          <section className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-6" key={item.title}>
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-[var(--color-mist)] text-sm font-semibold text-[var(--color-botanical)] sm:mb-10">
              {String(index + 1).padStart(2, "0")}
            </div>
            <h2 className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-2xl">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-[var(--color-stone)]">{item.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href={`/${locale}/collections/ritual-kits`}>
          {membership.collectionCta}
        </ButtonLink>
        <ButtonLink href={`/${locale}/products/cloud-hemp-set`} variant="secondary">
          {membership.productCta}
        </ButtonLink>
      </div>
    </div>
  );
}
