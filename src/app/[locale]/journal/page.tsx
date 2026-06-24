import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getMessages } from "@/i18n/messages";
import { isLocale } from "@/i18n/routing";
import { getArticles } from "@/lib/content/journal";
import { localizedHref } from "@/lib/i18n/paths";
import { buildMetadata } from "@/lib/seo/metadata";

type JournalPageProps = {
  params: Promise<{
    locale: string;
  }>;
};

async function getLocale(params: JournalPageProps["params"]) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}

export async function generateMetadata({ params }: JournalPageProps) {
  const locale = await getLocale(params);
  const journal = getMessages(locale).journal;

  return buildMetadata({
    locale,
    path: "journal",
    title: journal.seoTitle,
    description: journal.seoDescription
  });
}

export default async function JournalPage({ params }: JournalPageProps) {
  const locale = await getLocale(params);
  const messages = getMessages(locale);
  const articles = getArticles();

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
      <header className="max-w-3xl space-y-4">
        <Badge>{messages.journal.eyebrow}</Badge>
        <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">{messages.journal.title}</h1>
        <p className="text-base leading-8 text-[var(--color-stone)]">{messages.journal.description}</p>
      </header>

      <div className="mt-8 grid gap-5 md:mt-10 md:grid-cols-3">
        {articles.map((article) => (
          <Link
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--surface-paper)] p-5 transition-colors hover:border-[var(--color-carbon)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-clay)]"
            href={localizedHref(locale, `/journal/${article.slug}`)}
            key={article.slug}
          >
            <article className="space-y-4">
              <Badge>{article.category[locale]}</Badge>
              <div className="space-y-2">
                <h2 className="text-xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere]">{article.title[locale]}</h2>
                <p className="text-sm leading-7 text-[var(--color-stone)]">{article.excerpt[locale]}</p>
              </div>
              <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-stone)]">
                {messages.journal.published} {article.publishedAt}
              </p>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
