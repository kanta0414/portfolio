import type { MDXComponents } from 'mdx/types';
import type { ReactNode } from 'react';
import { BlankRow, EditorRow } from '@/components/ide/EditorRow';

/**
 * MDX → エディタ表示のマッピング（要件 §6.1 components/mdx）。
 * ブロック要素は必ず EditorRow を通し、行番号のカウントに乗せる。
 * 見出しの `#` や強調の `**` を淡色で残し、「Markdownを開いている画面」であることを保つ（要件 §7.3）。
 */
export const mdxComponents: MDXComponents = {
  h1: ({ children }) => (
    <EditorRow>
      <h1 className="font-mono text-2xl font-semibold text-fg md:text-[26px]">
        <Marker>#</Marker>
        {children}
      </h1>
    </EditorRow>
  ),

  h2: ({ children }) => (
    <EditorRow>
      <h2 className="font-mono text-lg font-semibold text-fg">
        <Marker>##</Marker>
        {children}
      </h2>
    </EditorRow>
  ),

  h3: ({ children }) => (
    <EditorRow>
      <h3 className="font-mono text-base font-semibold text-fg">
        <Marker>###</Marker>
        {children}
      </h3>
    </EditorRow>
  ),

  p: ({ children }) => (
    <EditorRow>
      <p className="max-w-[68ch] text-[15px] leading-[1.9] text-muted">{children}</p>
    </EditorRow>
  ),

  ul: ({ children }) => (
    <>
      <ul className="max-w-[68ch]">{children}</ul>
      <BlankRow />
    </>
  ),

  ol: ({ children }) => (
    <>
      <ol className="max-w-[68ch]">{children}</ol>
      <BlankRow />
    </>
  ),

  li: ({ children }) => (
    <EditorRow as="li" blankAfter={false}>
      <span className="flex gap-2 text-[15px] leading-[1.9] text-muted">
        <span aria-hidden="true" className="text-faint">
          -
        </span>
        <span className="min-w-0">{children}</span>
      </span>
    </EditorRow>
  ),

  strong: ({ children }) => (
    <span className="whitespace-nowrap">
      <Marker inline>**</Marker>
      <strong className="font-semibold text-num">{children}</strong>
      <Marker inline>**</Marker>
    </span>
  ),

  em: ({ children }) => <em className="text-fg not-italic underline decoration-line">{children}</em>,

  a: ({ href, children }) => {
    const external = typeof href === 'string' && /^https?:\/\//.test(href);

    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="relative text-link underline decoration-link/30 underline-offset-4 transition-colors hover:decoration-link"
      >
        {children}
        {external && <span className="sr-only">（新しいタブで開く）</span>}
      </a>
    );
  },

  blockquote: ({ children }) => (
    <EditorRow>
      <blockquote className="max-w-[68ch] border-l-2 border-line pl-4 text-[15px] leading-[1.9] text-muted italic">
        {children}
      </blockquote>
    </EditorRow>
  ),

  code: ({ children, className }) => {
    // Shiki が付けたクラスがある = コードブロック内なので素通しする
    if (className) return <code className={className}>{children}</code>;

    return (
      <code className="rounded-sm border border-line bg-chrome px-1.5 py-0.5 font-mono text-[0.85em] text-fg">
        {children}
      </code>
    );
  },

  pre: ({ children, ...props }) => (
    <EditorRow>
      <pre {...props}>{children}</pre>
    </EditorRow>
  ),

  hr: () => (
    <EditorRow>
      <hr className="border-line" />
    </EditorRow>
  ),

  // 作品のスクリーンショットは frontmatter 側（実寸つき）で扱う。
  // ここは本文中に画像を差し込んだ場合のフォールバック。
  img: ({ src, alt }) =>
    typeof src === 'string' ? (
      <EditorRow>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ''}
          className="max-w-[820px] rounded-lg border border-line"
        />
      </EditorRow>
    ) : null,

  table: ({ children }) => (
    <EditorRow>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full border-collapse text-left text-[14px]">{children}</table>
      </div>
    </EditorRow>
  ),

  th: ({ children }) => (
    <th className="border-b border-line px-3 py-2 font-mono text-xs font-medium text-dim">
      {children}
    </th>
  ),

  td: ({ children }) => (
    <td className="border-b border-line px-3 py-2 text-muted">{children}</td>
  ),
};

/** `#` や `**` といった Markdown 記法の記号を淡色で残す（要件 §7.3） */
function Marker({ children, inline = false }: { children: ReactNode; inline?: boolean }) {
  return (
    <span aria-hidden="true" className={`text-faint ${inline ? 'md-marker' : 'mr-3'}`}>
      {children}
    </span>
  );
}
