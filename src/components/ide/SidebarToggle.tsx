'use client';

import { useEffect, useState } from 'react';
import { IDE_SHELL_ID, SIDEBAR_ID } from './ids';

/**
 * 常設サイドバーの開閉トグル（要件 requirements-sidebar.md §4.2）。
 *
 * - 既定は展開（T-01）
 * - 768px 未満はサイドバー自体が存在しないため表示しない（T-03）
 * - 開閉はシェルの `data-sidebar` 属性に書き、畳むのは CSS 側の責務にする。
 *   こうすることで Sidebar をサーバーコンポーネントのまま保てる（§6.1）
 *
 * 常設パネルであってモーダルではないので、暗幕・フォーカス奪取・Escape での
 * 閉じる処理は持たない（§4.3）。
 */
export function SidebarToggle() {
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const shell = document.getElementById(IDE_SHELL_ID);
    if (!shell) return;

    if (expanded) {
      delete shell.dataset.sidebar;
    } else {
      shell.dataset.sidebar = 'collapsed';
    }
  }, [expanded]);

  return (
    <button
      type="button"
      onClick={() => setExpanded((value) => !value)}
      aria-expanded={expanded}
      aria-controls={SIDEBAR_ID}
      className="relative hidden size-8 shrink-0 items-center justify-center rounded-sm text-muted transition-colors hover:bg-hover hover:text-fg md:inline-flex"
    >
      <span className="sr-only">ファイルツリーを{expanded ? '閉じる' : '開く'}</span>
      <svg
        viewBox="0 0 16 16"
        aria-hidden="true"
        className="size-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="2" y="3" width="12" height="10" rx="2" />
        <line x1="6.25" y1="3.4" x2="6.25" y2="12.6" />
        {/* 展開中は左ペインを塗って、いまツリーが出ていることを示す */}
        {expanded && (
          <rect x="2.9" y="3.9" width="2.6" height="8.2" rx="0.6" fill="currentColor" stroke="none" />
        )}
      </svg>
    </button>
  );
}
