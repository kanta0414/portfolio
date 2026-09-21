import type { Metadata } from 'next';
import { EditorPane } from '@/components/ide/EditorPane';
import { EditorRow } from '@/components/ide/EditorRow';
import { Mdx } from '@/components/mdx/Mdx';
import { getPageBody } from '@/lib/content';
import { site } from '@/lib/site';

/** F-04 Contact。ページというより「パネル1枚」（要件 §4.1）。 */
export const metadata: Metadata = {
  title: 'Contact',
  description: `${site.fullName} への連絡先。GitHub / メール。`,
  alternates: { canonical: '/contact' },
};

/** 表示名は URL から導出する（site.ts と食い違わないように） */
const hostPath = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const channels = [
  { label: 'GitHub', value: hostPath(site.links.github), href: site.links.github },
  { label: 'Email', value: site.links.email.replace('mailto:', ''), href: site.links.email },
] as const;

export default function ContactPage() {
  return (
    <EditorPane>
      <Mdx source={getPageBody('contact')} />

      <EditorRow blankAfter={false}>
        <ul className="flex max-w-[68ch] flex-col gap-px overflow-hidden rounded-lg border border-line">
          {channels.map((channel) => (
            <li key={channel.label}>
              <a
                href={channel.href}
                {...(channel.href.startsWith('mailto:')
                  ? {}
                  : { target: '_blank', rel: 'noopener noreferrer' })}
                className="flex items-center gap-4 bg-chrome px-5 py-4 transition-colors hover:bg-hover"
              >
                <span className="w-16 shrink-0 font-mono text-[11px] tracking-[0.12em] text-label uppercase">
                  {channel.label}
                </span>
                <span className="min-w-0 flex-1 truncate font-mono text-[15px] text-link">
                  {channel.value}
                </span>
                <span aria-hidden="true" className="shrink-0 text-xs text-faint">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </EditorRow>
    </EditorPane>
  );
}
