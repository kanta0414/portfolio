/** 作品のタグ（要件 §4.3 / 3つまで）。 */
export function Tag({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-muted">
      {label}
    </span>
  );
}
