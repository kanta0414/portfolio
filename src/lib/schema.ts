import { z } from 'zod';

/**
 * content/works/*.mdx の frontmatter スキーマ。
 * 要件 §4.3 の「情報量を絞る」方針を型で強制する（タグ3つまで / 数字2つまで / 画像2枚まで）。
 */
export const workFrontmatterSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1).max(200, '概要は1〜2文（200字以内）に収めること'),
  role: z.string().min(1),
  tags: z.array(z.string().min(1)).min(1).max(3, 'タグは3つまで'),
  metrics: z
    .array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    )
    .min(1, '数字は必ず1つ以上入れる（要件 §7.7）')
    .max(2, '数字は2つまで'),
  screenshots: z
    .array(
      z.object({
        src: z.string().min(1),
        alt: z.string().min(1, 'alt は必須（要件 §7.6）'),
        caption: z.string().optional(),
      }),
    )
    .max(2, 'スクリーンショットは2枚まで'),
  links: z.object({
    readme: z.string().url('README リンクは必須'),
    demo: z.string().url().optional(),
    article: z.string().url().optional(),
  }),
  order: z.number().int().nonnegative(),
  draft: z.boolean().optional().default(false),
});

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>;

/** frontmatter のスクリーンショットに、ビルド時に読んだ実寸を足したもの */
export type ResolvedScreenshot = WorkFrontmatter['screenshots'][number] & {
  width: number;
  height: number;
};

export type Work = Omit<WorkFrontmatter, 'screenshots'> & {
  screenshots: ResolvedScreenshot[];
  /** = ファイル名（拡張子なし） = ツリー表示名 */
  slug: string;
  /** MDX 本文（frontmatter を除いたもの） */
  body: string;
};
