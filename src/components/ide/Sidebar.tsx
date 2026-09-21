import type { TreeSection } from '@/lib/tree';
import { FileTree } from './FileTree';
import { SIDEBAR_ID } from './ids';

/**
 * 768px 以上で常設されるサイドバー（要件 requirements-sidebar.md §4.1）。
 * 767px 以下では MobileIndex に置き換わる。
 *
 * 折りたたみは `.ide-sidebar` を CSS で畳むことで行う（globals.css）。
 * ここをクライアントコンポーネントにしないための取り決め（同 §6.1）。
 */
export function Sidebar({ sections }: { sections: TreeSection[] }) {
  return (
    <aside
      id={SIDEBAR_ID}
      className="ide-sidebar hidden w-(--spacing-sidebar) shrink-0 overflow-y-auto border-r border-line bg-chrome py-6 md:block"
    >
      <FileTree sections={sections} />
    </aside>
  );
}
