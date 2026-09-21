/**
 * 作品の数字（要件 §4.3 / 1〜2個）。
 * Markdown の `**強調**` と同じ見た目にして、本文の一部として読ませる（要件 §7.3）。
 */
export function MetricBadge({ label, value }: { label: string; value: string }) {
  return (
    <span className="whitespace-nowrap font-mono text-[15px]">
      <span aria-hidden="true" className="md-marker text-faint">
        **
      </span>
      <strong className="font-semibold text-num">
        {label} {value}
      </strong>
      <span aria-hidden="true" className="md-marker text-faint">
        **
      </span>
    </span>
  );
}
