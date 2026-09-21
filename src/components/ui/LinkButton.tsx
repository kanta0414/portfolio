/**
 * `[→ READMEを読む]` 形式のリンク（モック準拠）。
 * 角括弧は装飾なので aria-hidden。外部リンクは新規タブで開く（要件 §7.4）。
 */
export function LinkButton({
  href,
  children,
  external = true,
}: {
  href: string;
  children: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className="group relative inline-flex items-center font-mono text-[15px] text-link transition-colors hover:text-fg"
    >
      <span aria-hidden="true" className="text-faint transition-colors group-hover:text-link">
        [
      </span>
      <span aria-hidden="true" className="px-1">
        →
      </span>
      <span className="underline decoration-link/30 underline-offset-4 transition-colors group-hover:decoration-current">
        {children}
      </span>
      <span aria-hidden="true" className="text-faint transition-colors group-hover:text-link">
        ]
      </span>
      {external && <span className="sr-only">（新しいタブで開く）</span>}
    </a>
  );
}
