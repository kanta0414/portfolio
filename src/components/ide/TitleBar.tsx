import { site } from '@/lib/site';
import { SidebarToggle } from './SidebarToggle';

/**
 * L-01 タイトルバー。
 * 信号機ボタンは純粋な装飾なので aria-hidden かつフォーカス不可（要件 §7.6）。
 * 768px 以上ではここにサイドバーの開閉トグルが出る（requirements-sidebar.md §4.2）。
 */
export function TitleBar() {
  return (
    <header className="sticky top-0 z-30 flex h-(--spacing-titlebar) shrink-0 items-center border-b border-line bg-chrome px-3">
      <div aria-hidden="true" className="hidden shrink-0 items-center gap-2 pl-1 sm:flex">
        <span className="size-3 rounded-full bg-traffic-red" />
        <span className="size-3 rounded-full bg-traffic-yellow" />
        <span className="size-3 rounded-full bg-traffic-green" />
      </div>

      <SidebarToggle />

      <p className="flex-1 truncate text-center font-mono text-xs text-dim">{site.title}</p>

      {/*
        タイトルを中央に保つためのスペーサー（装飾）。
        左側の占有幅に合わせる: 信号機のみ 56px / トグルが出る 768px 以上は 88px。
      */}
      <div aria-hidden="true" className="hidden shrink-0 sm:block sm:w-[56px] md:w-[88px]" />
    </header>
  );
}
