/**
 * IDEシェル内で DOM を指し示すための識別子。
 * SidebarToggle（クライアント）と Sidebar / layout（サーバー）の双方から参照するため、
 * 文字列リテラルを散らさずここに集約する。
 */

/** サイドバーの開閉状態を `data-sidebar` 属性で持つラッパー（requirements-sidebar.md §6.1） */
export const IDE_SHELL_ID = 'ide-shell';

/** サイドバー本体。トグルの aria-controls が指す先（同 §4.2 T-05） */
export const SIDEBAR_ID = 'ide-sidebar';
