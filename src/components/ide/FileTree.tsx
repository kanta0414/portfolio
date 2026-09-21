'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useRef } from 'react';
import { isActiveFile, type TreeFile, type TreeSection } from '@/lib/tree';

type Variant = 'sidebar' | 'list';

/**
 * L-02 ファイルツリー。
 * 要件 §7.6 に従い <nav> + <ul>/<li> + <a> で実装する（div + onClick は禁止）。
 * F-14: ↑↓ で項目間を移動し、Enter は <a> の既定動作で開く。
 */
export function FileTree({
  sections,
  variant = 'sidebar',
  onNavigate,
}: {
  sections: TreeSection[];
  variant?: Variant;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
    if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) return;

    const items = Array.from(
      navRef.current?.querySelectorAll<HTMLAnchorElement>('a[data-tree-item]') ?? [],
    );
    if (items.length === 0) return;

    const current = items.findIndex((item) => item === document.activeElement);
    let next: number;

    switch (event.key) {
      case 'ArrowDown':
        next = current < 0 ? 0 : (current + 1) % items.length;
        break;
      case 'ArrowUp':
        next = current < 0 ? items.length - 1 : (current - 1 + items.length) % items.length;
        break;
      case 'Home':
        next = 0;
        break;
      default:
        next = items.length - 1;
    }

    event.preventDefault();
    items[next]?.focus();
  }, []);

  return (
    <nav
      ref={navRef}
      onKeyDown={handleKeyDown}
      aria-label="サイト内のファイル"
      className={variant === 'sidebar' ? 'font-mono text-[13px]' : 'font-mono text-sm'}
    >
      {sections.map((section, index) => (
        <div key={section.label} className={index > 0 ? 'mt-6 border-t border-line pt-5' : ''}>
          {/*
            EXPLORER / LINKS は IDE の装飾であって文書構造ではないので見出しにしない。
            代わりに各リストへ aria-label を付け、支援技術にはグループ名として伝える。
          */}
          <p aria-hidden="true" className="px-6 pb-3 text-[11px] tracking-[0.12em] text-label">
            {section.label}
          </p>

          <ul aria-label={section.label === 'LINKS' ? '外部リンク' : 'サイト内のファイル'}>
            {section.label === 'EXPLORER' && variant === 'sidebar' && (
              <li aria-hidden="true" className="px-6 py-1 text-[13px] text-tree">
                <Chevron /> kanta/
              </li>
            )}

            {section.nodes.map((node) =>
              node.kind === 'dir' ? (
                <li key={node.name}>
                  <span
                    aria-hidden="true"
                    className={`block py-1 text-[13px] text-num ${
                      variant === 'sidebar' ? 'pl-10 pr-6' : 'px-6'
                    }`}
                  >
                    <Chevron /> {node.name}
                  </span>
                  <ul aria-label={node.name.replace(/\/$/, '')}>
                    {node.children.map((file) => (
                      <TreeItem
                        key={file.href}
                        file={file}
                        pathname={pathname}
                        depth={2}
                        variant={variant}
                        onNavigate={onNavigate}
                      />
                    ))}
                  </ul>
                </li>
              ) : (
                <TreeItem
                  key={file_key(node)}
                  file={node}
                  pathname={pathname}
                  depth={section.label === 'LINKS' ? 0 : 1}
                  variant={variant}
                  onNavigate={onNavigate}
                />
              ),
            )}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function TreeItem({
  file,
  pathname,
  depth,
  variant,
  onNavigate,
}: {
  file: TreeFile;
  pathname: string;
  depth: number;
  variant: Variant;
  onNavigate?: () => void;
}) {
  const active = isActiveFile(file, pathname);

  const indent = variant === 'sidebar' ? ['pl-6', 'pl-10', 'pl-14'][depth] : 'pl-6';
  const base = `group relative flex items-center gap-2 py-1.5 pr-4 transition-colors duration-100 ${indent}`;
  const tone = file.external
    ? 'text-link hover:bg-hover'
    : active
      ? 'bg-selected text-fg'
      : 'text-muted hover:bg-hover hover:text-fg';

  const label = (
    <>
      {/* 長いファイル名はツリー幅で省略されるため、ホバーで全体を出す。
          アクセシブル名には元から全体が入っているので、これは視覚利用者向けの補助。 */}
      <span className="truncate" title={file.name}>
        {file.name}
      </span>
      {file.external && (
        <span aria-hidden="true" className="shrink-0 text-[11px] opacity-70">
          ↗
        </span>
      )}
    </>
  );

  return (
    <li>
      {file.external ? (
        <a
          data-tree-item
          href={file.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${tone}`}
        >
          {label}
          <span className="sr-only">（新しいタブで開く）</span>
        </a>
      ) : (
        <Link
          data-tree-item
          href={file.href}
          onClick={onNavigate}
          aria-current={active ? 'page' : undefined}
          className={`${base} ${tone} ${active ? 'rounded-r-[5px]' : ''}`}
        >
          {label}
        </Link>
      )}
    </li>
  );
}

function Chevron() {
  return <span className="text-[10px]">▾</span>;
}

function file_key(file: TreeFile): string {
  return `${file.name}:${file.href}`;
}
