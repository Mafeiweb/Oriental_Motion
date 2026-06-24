import { articles } from "../../data/journal";

export function getArticles() {
  return [...articles];
}

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}
