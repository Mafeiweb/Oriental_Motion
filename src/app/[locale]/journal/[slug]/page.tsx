import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/content/json-ld";
import { getMessages } from "@/i18n/messages";
import { isLocale, locales } from "@/i18n/routing";
import { getArticle, getArticles } from "@/lib/content/journal";
import { buildMetadata, localizedPath } from "@/lib/seo/metadata";
import { articleJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

type ArticlePageProps = {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
};

async function getPageData(params: ArticlePageProps["params"]) {
  const { locale, slug } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const article = getArticle(slug);

  if (!article) {
    notFound();
  }

  return { article, locale };
}

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    getArticles().map((article) => ({
      locale,
      slug: article.slug
    }))
  );
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { article, locale } = await getPageData(params);

  return buildMetadata({
    locale,
    path: `journal/${article.slug}`,
    title: article.title[locale],
    description: article.excerpt[locale],
    image: "/images/products/balance-walker.jpg",
    type: "article",
    publishedTime: article.publishedAt
  });
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { article, locale } = await getPageData(params);
  const messages = getMessages(locale);
  const articlePath = localizedPath(locale, `journal/${article.slug}`);

  return (
    <>
      <JsonLd data={articleJsonLd(article, locale, articlePath)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: messages.journal.title, path: localizedPath(locale, "journal") },
          { name: article.title[locale], path: articlePath }
        ])}
      />
      <article className="mx-auto w-full max-w-3xl px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <header className="space-y-5">
          <Badge>{article.category[locale]}</Badge>
          <div className="space-y-4">
            <h1 className="text-3xl font-semibold leading-tight text-[var(--color-carbon)] [overflow-wrap:anywhere] sm:text-5xl">
              {article.title[locale]}
            </h1>
            <p className="text-base leading-8 text-[var(--color-stone)]">{article.excerpt[locale]}</p>
          </div>
          <p className="text-xs font-medium uppercase tracking-[0.08em] text-[var(--color-stone)]">
            {messages.journal.published} {article.publishedAt}
          </p>
        </header>

        <div className="mt-8 space-y-6 border-t border-[var(--border-subtle)] pt-8 md:mt-10">
          {article.body[locale].map((paragraph) => (
            <p className="text-base leading-8 text-[var(--color-carbon)]" key={paragraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </>
  );
}
