import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { WorkDocument } from '@/components/ide/WorkDocument';
import { getWorkBySlug, getWorkSlugs } from '@/lib/content';
import { site } from '@/lib/site';

type PageProps = { params: Promise<{ slug: string }> };

/** F-02 作品ページ。content/works/*.mdx から全件を静的生成する。 */
export function generateStaticParams(): { slug: string }[] {
  return getWorkSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) return {};

  const url = `${site.url}/works/${work.slug}`;

  return {
    title: work.title,
    description: work.summary,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: `${work.title} — ${site.name}`,
      description: work.summary,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${work.title} — ${site.name}`,
      description: work.summary,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) notFound();

  return <WorkDocument work={work} />;
}
