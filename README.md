# portfolio

IDEの画面をそのままUIにしたポートフォリオサイト。
ファイルツリーから作品（Markdown）を開く構成。

要件は [docs/requirements.md](docs/requirements.md)、デザインは [docs/design/term-3-ide.svg](docs/design/term-3-ide.svg)。
公開前にやることは [docs/CONTENT-TODO.md](docs/CONTENT-TODO.md)。

## 開発

```bash
npm install
npm run dev        # http://localhost:3000
```

| コマンド | 内容 |
|---------|------|
| `npm run dev` | 開発サーバー |
| `npm run build` | 本番ビルド（frontmatter の検証もここで走る） |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |

> `npm run build` は `.next/` を作り直すため、`npm run dev` と同時に走らせないこと。

## 作品を1件追加する

`content/works/<slug>.mdx` を1つ置くだけ。ツリー・タブ・sitemap・`N works` 表示はすべて自動で追従する。

```mdx
---
title: my-project                      # 見出しに出る名前
summary: 何を解決するものかを1〜2文で。 # 200字まで
role: 個人開発                          # "3人チーム・バックエンド担当" など
tags: [LLM, Python, PDF]               # 3つまで
metrics:                               # 1〜2個。必ず1つは入れる
  - label: 抽出精度
    value: 92%
screenshots:                           # 2枚まで。alt は必須
  - src: /screenshots/my-project.png
    alt: 何が写っているかの説明
    caption: 任意のキャプション
links:
  readme: https://github.com/kanta0414/my-project#readme   # 必須
  demo: https://example.com                            # 任意
  article: https://example.com/post                    # 任意
order: 4                               # ツリーの並び順
draft: false                           # true にすると dev でのみ表示
---

任意の補足を1〜2行。技術構成・設計判断・セットアップ手順はここではなく README に書く。
```

- `slug`（ファイル名）がそのまま URL `/works/<slug>` とツリーの表示名になる
- スクリーンショットは `public/screenshots/` に置く。**実寸はビルド時に読むので、縦横比は何でもよい**
- frontmatter に不足があると **ビルドが落ちる**（Zod 検証）。記入漏れが本番に出ない

## 構成

```
src/
├─ app/                  # ルーティング（/ , /about, /contact, /works/[slug], 404, OGP, sitemap, robots）
├─ components/
│  ├─ ide/               # TitleBar / Sidebar / FileTree / TabBar / EditorPane / StatusBar
│  ├─ ui/                # Tag / MetricBadge / LinkButton / Screenshot
│  └─ mdx/               # MDX → エディタ表示のマッピング
├─ lib/                  # content ローダー / Zod スキーマ / ツリー組み立て / サイト定数
└─ styles/globals.css    # カラートークン（§7.2）とエディタ行のCSS
content/
├─ works/*.mdx           # 作品 = ファイル
├─ about.mdx
└─ contact.mdx
```

編集の入口:

| 変えたいもの | 場所 |
|-------------|------|
| 氏名・URL・連絡先 | `src/lib/site.ts` |
| 配色 | `src/styles/globals.css` の `@theme` |
| 自己紹介 | `content/about.mdx` |
| 作品 | `content/works/*.mdx` |

## レスポンシブ

要件 §7.5 のとおり3分岐する。

| 幅 | レイアウト |
|----|-----------|
| 1024px 以上 | フルIDE。常設サイドバー + エディタ |
| 768〜1023px | サイドバーをハンバーガーのオーバーレイに |
| 767px 以下 | **IDE比喩を放棄**。タイトルバーとステータスバーだけ残し、1カラム。ツリーはページ下部の一覧に |

## デプロイ

Vercel にリポジトリを接続するだけ（設定不要）。公開URLが決まったら `src/lib/site.ts` の `url` を実ドメインに変える — OGP と sitemap の絶対URLがそこから作られる。
