/**
 * L-06 ステータスバー（Should）。
 * 完全な装飾なので aria-hidden かつフォーカス不可（要件 §7.6）。
 * 767px 以下でもタイトルバーとともに残す（要件 §7.5）。
 */
export function StatusBar({ workCount }: { workCount: number }) {
  return (
    <footer
      aria-hidden="true"
      className="sticky bottom-0 z-30 flex h-(--spacing-statusbar) shrink-0 select-none items-center gap-6 bg-hover px-6 font-mono text-[11px] text-dim md:static"
    >
      <span>main*</span>
      <span>{workCount} works</span>
      <span className="hidden sm:inline">Markdown</span>
      <span className="hidden md:inline">UTF-8</span>
      <span className="hidden lg:inline">Ln 1, Col 1</span>
    </footer>
  );
}
