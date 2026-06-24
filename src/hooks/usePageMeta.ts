import { useEffect } from 'react';

interface PageMeta {
  title: string;
  description: string;
  /** Absolute canonical URL, e.g. https://alhaltech.com/about */
  canonical: string;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Reliably sets per-route SEO/social tags in a client-rendered SPA.
 * Upserts existing tags (from index.html) instead of duplicating them, so
 * navigating between routes always leaves exactly one of each tag.
 */
export function usePageMeta({ title, description, canonical }: PageMeta) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = canonical;
  }, [title, description, canonical]);
}
