import type { TreeSection } from '@/lib/tree';
import { FileTree } from './FileTree';

/**
 * 767px 以下：IDE比喩を放棄し、ツリーをページ下部の一覧に変換する（要件 §7.5）。
 * サイドバーではなく本文の続きとして読ませるため、見出しを持つ通常のセクションにする。
 */
export function MobileIndex({ sections }: { sections: TreeSection[] }) {
  return (
    <section className="border-t border-line bg-chrome py-8 md:hidden">
      <h2 className="px-6 pb-5 font-sans text-sm font-semibold text-fg">ほかのページ</h2>
      <FileTree sections={sections} variant="list" />
    </section>
  );
}
