import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { imageSize } from 'image-size';
import {
  workFrontmatterSchema,
  type ResolvedScreenshot,
  type Work,
  type WorkFrontmatter,
} from './schema';

const WORKS_DIR = path.join(process.cwd(), 'content', 'works');

/**
 * content/works/*.mdx を読み、frontmatter を Zod で検証して返す。
 * 「作品追加が MDX 1ファイルで完結」（要件 §5 保守性）を成立させる唯一の入口。
 *
 * ビルド時に1度だけ走ればよいのでモジュールスコープでキャッシュする。
 */
let cache: Work[] | null = null;

export function getAllWorks(): Work[] {
  if (cache) return cache;

  if (!fs.existsSync(WORKS_DIR)) {
    cache = [];
    return cache;
  }

  const works = fs
    .readdirSync(WORKS_DIR)
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(WORKS_DIR, file), 'utf8');
      const { data, content } = matter(raw);

      const parsed = workFrontmatterSchema.safeParse(data);
      if (!parsed.success) {
        // ビルドを落とす。frontmatter の入れ忘れを本番に出さない（要件 §6 Zod）
        throw new Error(
          `content/works/${file} の frontmatter が不正です:\n${z_issues(parsed.error)}`,
        );
      }

      return {
        ...parsed.data,
        slug,
        body: content,
        screenshots: parsed.data.screenshots.map((shot) => resolveScreenshot(shot, file)),
      } satisfies Work;
    })
    .filter((work) => !work.draft || process.env.NODE_ENV === 'development')
    .sort((a, b) => a.order - b.order || a.slug.localeCompare(b.slug));

  cache = works;
  return works;
}

export function getWorkBySlug(slug: string): Work | undefined {
  return getAllWorks().find((work) => work.slug === slug);
}

/**
 * content/<name>.mdx（about / contact など単体ページの本文）を読む。
 * 本文を TSX に埋めず、作品と同じ「ファイルを開いている」構造にそろえるため。
 */
export function getPageBody(name: string): string {
  const file = path.join(process.cwd(), 'content', `${name}.mdx`);
  if (!fs.existsSync(file)) {
    throw new Error(`content/${name}.mdx が見つかりません`);
  }
  return matter(fs.readFileSync(file, 'utf8')).content;
}

export function getWorkSlugs(): string[] {
  return getAllWorks().map((work) => work.slug);
}

/**
 * public/ 配下の画像の実寸をビルド時に読む。
 * 縦横比を決め打ちにせず、どんなスクリーンショットでもレターボックスにならず、
 * かつブラウザが比率を先に知れるので CLS が出ない（非機能要件: CLS 0.1未満）。
 */
function resolveScreenshot(
  shot: WorkFrontmatter['screenshots'][number],
  sourceFile: string,
): ResolvedScreenshot {
  const file = path.join(process.cwd(), 'public', shot.src.replace(/^\//, ''));

  if (!fs.existsSync(file)) {
    throw new Error(`content/works/${sourceFile}: 画像が見つかりません → public${shot.src}`);
  }

  const { width, height } = imageSize(fs.readFileSync(file));

  if (!width || !height) {
    throw new Error(`content/works/${sourceFile}: 画像サイズを読めません → public${shot.src}`);
  }

  return { ...shot, width, height };
}

function z_issues(error: { issues: readonly { path: PropertyKey[]; message: string }[] }): string {
  return error.issues
    .map((issue) => `  - ${issue.path.join('.') || '(root)'}: ${issue.message}`)
    .join('\n');
}
