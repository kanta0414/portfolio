import Image from 'next/image';

/**
 * L-05 プレビュー画像。作品を見せる主役なのでエディタ内のプレビューパネルとして扱う。
 * 実寸（width/height）はビルド時に content 側で解決済みなので、
 * ブラウザは読み込み前に縦横比を知れる = CLS が出ない（非機能要件: CLS 0.1未満）。
 */
export function Screenshot({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  priority?: boolean;
}) {
  const filename = src.split('/').pop() ?? 'preview.png';

  return (
    <figure className="max-w-[820px] overflow-hidden rounded-lg border border-line bg-chrome">
      <div
        aria-hidden="true"
        className="flex h-8 items-center border-b border-line bg-hover px-4 font-mono text-[11px] text-dim"
      >
        {filename}
      </div>

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes="(min-width: 1024px) 820px, 100vw"
        className="h-auto w-full"
      />

      {caption && (
        <figcaption className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-dim">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
