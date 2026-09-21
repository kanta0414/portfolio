import Link from 'next/link';
import { EditorPane } from '@/components/ide/EditorPane';
import { EditorRow } from '@/components/ide/EditorRow';

/** F-06 404。IDE 風に「ファイルが見つからない」として見せる。 */
export default function NotFound() {
  return (
    <EditorPane>
      <EditorRow>
        <h1 className="font-mono text-2xl font-semibold text-fg md:text-[26px]">
          <span aria-hidden="true" className="mr-3 text-faint">
            #
          </span>
          404 — file not found
        </h1>
      </EditorRow>

      <EditorRow>
        <p className="max-w-[68ch] text-[15px] leading-[1.9] text-muted">
          開こうとしたファイルはこのワークスペースにありません。左のツリー（モバイルではページ下部の一覧）から選び直してください。
        </p>
      </EditorRow>

      <EditorRow blankAfter={false}>
        <Link
          href="/"
          className="group relative inline-flex items-center font-mono text-[15px] text-link transition-colors hover:text-fg"
        >
          <span aria-hidden="true" className="text-faint transition-colors group-hover:text-link">
            [
          </span>
          <span aria-hidden="true" className="px-1">
            →
          </span>
          <span className="underline decoration-link/30 underline-offset-4 group-hover:decoration-current">
            about.md を開く
          </span>
          <span aria-hidden="true" className="text-faint transition-colors group-hover:text-link">
            ]
          </span>
        </Link>
      </EditorRow>
    </EditorPane>
  );
}
