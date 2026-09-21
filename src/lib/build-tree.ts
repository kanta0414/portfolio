import 'server-only';
import { getAllWorks } from './content';
import { site } from './site';
import type { TreeSection } from './tree';

/**
 * サイドバーのファイルツリーを content から組み立てる（サーバー専用）。
 * 作品 MDX を追加すると自動で `works/` 配下に現れる（要件 §5 保守性）。
 */
export function buildTree(): TreeSection[] {
  const works = getAllWorks();

  return [
    {
      label: 'EXPLORER',
      nodes: [
        {
          kind: 'dir',
          name: 'works/',
          children: works.map((work) => ({
            kind: 'file' as const,
            name: `${work.slug}.md`,
            href: `/works/${work.slug}`,
            description: work.summary,
          })),
        },
        {
          kind: 'file',
          name: 'about.md',
          href: '/',
          aliases: ['/about'],
          description: `${site.fullName} — ${site.role}`,
        },
        {
          kind: 'file',
          name: 'contact.md',
          href: '/contact',
          description: 'GitHub / Email / X',
        },
      ],
    },
    {
      label: 'LINKS',
      nodes: [
        { kind: 'file', name: hostPath(site.links.github), href: site.links.github, external: true },
        { kind: 'file', name: 'mail', href: site.links.email, external: true },
      ],
    },
  ];
}

/** 表示用にプロトコルと末尾スラッシュを落とす。URL と表示名が食い違わないよう導出する。 */
function hostPath(url: string): string {
  return url.replace(/^https?:\/\//, '').replace(/\/$/, '');
}
