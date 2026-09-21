import type { ReactNode } from 'react';

/**
 * エディタ1行分。行番号は CSS counter が描画し、実体は aria-hidden な <span>。
 * スクリーンリーダーに数字を読ませない（要件 §7.6）。
 */
export function EditorRow({
  children,
  as: Tag = 'div',
  blankAfter = true,
}: {
  children: ReactNode;
  as?: 'div' | 'li';
  blankAfter?: boolean;
}) {
  return (
    <>
      <Tag className="editor-row">
        <span className="editor-gutter" aria-hidden="true" />
        <div className="min-w-0">{children}</div>
      </Tag>
      {blankAfter && <BlankRow />}
    </>
  );
}

/** 本文ブロックの間に挟む空行。エディタらしい行送りを作るためだけの装飾。 */
export function BlankRow() {
  return (
    <div className="editor-row editor-row--blank" aria-hidden="true">
      <span className="editor-gutter" />
      <div />
    </div>
  );
}
