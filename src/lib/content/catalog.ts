import { collections, products } from "../../data/catalog";

export function getCollections() {
  return [...collections];
}

export function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

export function getProducts() {
  return [...products];
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCollection(collectionSlug: string) {
  return products.filter((product) => product.collectionSlugs.includes(collectionSlug));
}
