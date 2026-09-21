import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

/** 非機能要件 SEO: robots.txt */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
