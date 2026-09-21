import rehypeShiki from '@shikijs/rehype';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from './mdx-components';

/**
 * MDX 本文をエディタ表示にコンパイルする（ビルド時に解決）。
 * コードブロックの構文色は Shiki（VS Code と同じエンジン）で、
 * 配色はトークンに合わせて GitHub Dark 系にそろえる（要件 §6 / §7.7）。
 */
export function Mdx({ source }: { source: string }) {
  return (
    <MDXRemote
      source={source}
      components={mdxComponents}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [[rehypeShiki, { theme: 'github-dark-default' }]],
        },
      }}
    />
  );
}
