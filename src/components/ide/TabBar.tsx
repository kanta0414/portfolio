'use client';

import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { findFileByPath, type TreeSection } from '@/lib/tree';

const MAX_TABS = 3; // 要件 L-03: 最大3枚、超えたら古い順に閉じる
const STORAGE_KEY = 'ide:tabs';

type Tab = { name: string; href: string };

/**
 * L-03 タブバー（Should）。
 * 装飾扱いなので、ここが無くてもツリーから全ページに到達できる（要件 §7.6）。
 * そのため aria-hidden にはせず単純な補助ナビとして置き、role=tablist は名乗らない
 * （実体はタブUIではなくリンクの並びであり、タブロールを名乗ると SR の期待と食い違うため）。
 */
export function TabBar({ sections }: { sections: TreeSection[] }) {
  const pathname = usePathname();
  const router = useRouter();

  const current = findFileByPath(sections, pathname);

  // 初期値は現在のページのみ。SSR とクライアントで同じ結果になるため hydration mismatch が起きない。
  const [tabs, setTabs] = useState<Tab[]>(() =>
    current ? [{ name: current.name, href: current.href }] : [],
  );

  // リロードしてもタブが残るよう sessionStorage から復元する（マウント後に実行）
  useEffect(() => {
    try {
      const saved: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(saved)) return;

      const restored = saved.filter(isTab);
      if (restored.length === 0) return;

      setTabs((existing) => merge(restored, existing));
    } catch {
      // sessionStorage が使えない環境では復元しないだけでよい
    }
  }, []);

  // ページが変わったらタブを追加（既にあれば何もしない）
  useEffect(() => {
    if (!current) return;
    setTabs((existing) => merge(existing, [{ name: current.name, href: current.href }]));
  }, [current]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(tabs));
    } catch {
      // 保存できなくても動作に影響しない
    }
  }, [tabs]);

  const close = useCallback(
    (href: string) => {
      setTabs((existing) => {
        const index = existing.findIndex((tab) => tab.href === href);
        if (index < 0) return existing;

        const next = existing.filter((tab) => tab.href !== href);

        // アクティブなタブを閉じたら直前のタブへ（要件 §7.4）
        if (href === current?.href) {
          const fallback = next[index - 1] ?? next[0];
          router.push(fallback ? fallback.href : '/');
        }

        return next;
      });
    },
    [current, router],
  );

  if (tabs.length === 0) return null;

  return (
    <div className="hidden h-(--spacing-tabbar) shrink-0 items-stretch overflow-x-auto border-b border-line bg-editor md:flex">
      {tabs.map((tab) => {
        const active = tab.href === current?.href;

        return (
          <div
            key={tab.href}
            className={`group relative flex shrink-0 items-center gap-2 border-r border-line pr-2 ${
              active ? 'bg-editor' : 'bg-chrome'
            }`}
          >
            {active && (
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-0.5 bg-tab"
              />
            )}
            <Link
              href={tab.href}
              className={`py-2 pl-5 font-mono text-xs transition-colors ${
                active ? 'text-fg' : 'text-dim hover:text-muted'
              }`}
            >
              {tab.name}
            </Link>
            <button
              type="button"
              onClick={() => close(tab.href)}
              className="flex size-5 items-center justify-center rounded-sm text-dim opacity-0 transition-opacity hover:bg-hover hover:text-fg focus-visible:opacity-100 group-hover:opacity-100"
            >
              <span className="sr-only">{tab.name} のタブを閉じる</span>
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3 fill-current">
                <path d="M4.22 4.22a.75.75 0 0 1 1.06 0L8 6.94l2.72-2.72a.75.75 0 1 1 1.06 1.06L9.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L8 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L6.94 8 4.22 5.28a.75.75 0 0 1 0-1.06Z" />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  );
}

/** 重複を除いて連結し、上限を超えた分は古い順に落とす */
function merge(older: Tab[], newer: Tab[]): Tab[] {
  const seen = new Set<string>();
  const combined: Tab[] = [];

  for (const tab of [...older, ...newer]) {
    if (seen.has(tab.href)) continue;
    seen.add(tab.href);
    combined.push(tab);
  }

  return combined.slice(-MAX_TABS);
}

function isTab(value: unknown): value is Tab {
  return (
    typeof value === 'object' &&
    value !== null &&
    typeof (value as Tab).name === 'string' &&
    typeof (value as Tab).href === 'string'
  );
}
