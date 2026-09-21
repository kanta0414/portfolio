import type { MetadataRoute } from 'next';
import { getWorkSlugs } from '@/lib/content';
import { site } from '@/lib/site';

/** 非機能要件 SEO: sitemap.xml */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: site.url, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
    ...getWorkSlugs().map((slug) => ({
      url: `${site.url}/works/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ];
}
