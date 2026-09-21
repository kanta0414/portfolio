import { Fragment } from 'react';
import { EditorPane } from '@/components/ide/EditorPane';
import { EditorRow } from '@/components/ide/EditorRow';
import { Mdx } from '@/components/mdx/Mdx';
import { LinkButton } from '@/components/ui/LinkButton';
import { MetricBadge } from '@/components/ui/MetricBadge';
import { Screenshot } from '@/components/ui/Screenshot';
import { Tag } from '@/components/ui/Tag';
import type { Work } from '@/lib/schema';

/**
 * 作品ページの本体（要件 §4.3 のテンプレートそのまま）。
 * 並び順を frontmatter ではなくここで固定することで、どの作品も同じ読み順になる。
 * 技術構成・設計判断・セットアップ手順はここに書かない。README に委譲する。
 */
export function WorkDocument({ work }: { work: Work }) {
  const hasBody = work.body.trim().length > 0;

  return (
    <EditorPane>
      {/* 1. タイトル */}
      <EditorRow>
        <h1 className="font-mono text-2xl font-semibold text-fg md:text-[26px]">
          <span aria-hidden="true" className="mr-3 text-faint">
            #
          </span>
          {work.title}
        </h1>
      </EditorRow>

      {/* 2. 概要 */}
      <EditorRow>
        <p className="max-w-[68ch] text-[15px] leading-[1.9] text-muted">{work.summary}</p>
      </EditorRow>

      {/* 4. 数字 / 5. 担当範囲 / 6. タグ を1行に畳む */}
      <EditorRow>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[15px] text-muted">
          {work.metrics.map((metric) => (
            <Fragment key={metric.label}>
              <MetricBadge label={metric.label} value={metric.value} />
              <Separator />
            </Fragment>
          ))}
          <span className="font-mono text-[14px]">{work.role}</span>
          <Separator />
          <ul className="flex flex-wrap items-center gap-1.5">
            {work.tags.map((tag) => (
              <li key={tag}>
                <Tag label={tag} />
              </li>
            ))}
          </ul>
        </div>
      </EditorRow>

      {/* 3. スクリーンショット（作品そのものを見せる主役 / L-05） */}
      {work.screenshots.map((shot, index) => (
        <EditorRow key={shot.src}>
          <Screenshot {...shot} priority={index === 0} />
        </EditorRow>
      ))}

      {/* 任意の補足本文（MDX） */}
      {hasBody && <Mdx source={work.body} />}

      {/* 7. リンク */}
      <EditorRow blankAfter={false}>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <LinkButton href={work.links.readme}>READMEを読む</LinkButton>
          {work.links.demo && <LinkButton href={work.links.demo}>デモ</LinkButton>}
          {work.links.article && <LinkButton href={work.links.article}>記事</LinkButton>}
        </div>
      </EditorRow>
    </EditorPane>
  );
}

/** メタ行の区切り。装飾なので読み上げない。 */
function Separator() {
  return (
    <span aria-hidden="true" className="text-faint">
      ·
    </span>
  );
}
