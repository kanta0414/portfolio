import type { ReactNode } from 'react';

/**
 * L-04 エディタ領域。行番号カウンタの基点になる。
 * 767px 以下ではガターが畳まれ、通常の1カラム文書として表示される（要件 §7.5 / globals.css）。
 */
export function EditorPane({ children }: { children: ReactNode }) {
  return (
    <article className="panel-enter editor-doc px-4 py-8 md:px-6 md:py-10">{children}</article>
  );
}
