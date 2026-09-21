# 公開前チェックリスト

作品と数字は実在のリポジトリの内容に差し替え済み（§1・§2）。
**残っているのはプロフィール（§4）・スクリーンショット1枚（§3）・リンクとドメイン（§5）**。
このファイルの未チェック項目を潰すまで公開しないこと。

---

## 1. 作品の確定（Q1）— 済

実在する2件に差し替え済み。捏造していたテンプレート2件（`doc-extract-agent` / `rag-eval-harness`）は削除した。

| ファイル | 状態 |
|---------|------|
| `content/works/tepco-kepco-structural-break.mdx` | **公開中**。[kanta0414/tepco-kepco-structural-break](https://github.com/kanta0414/tepco-kepco-structural-break) |
| `content/works/ai-task-manager.mdx` | **公開中**。[kanta0414/ai-task-manager](https://github.com/kanta0414/ai-task-manager) |
| `content/works/portfolio.mdx` | **下書き（`draft: true`）**。§5 参照 |

- [ ] 掲載順を確認する（現在 tepco → ai-task-manager）。応募先が LLM 領域であることを踏まえると、
      `ai-task-manager` を先頭にしたほうが §1.2 の「Python×LLM の実装・評価経験を提示」に合う。
      入れ替えるなら各 `.mdx` の `order` を交換するだけ
- [ ] 担当範囲が両方 `個人開発` でよいか（README に記載が無かったため推定）

## 2. 数字（Q2）— 済

すべて README に記載された実測値。捏造した数字は残っていない。

| 作品 | 数字 | 出典 |
|------|------|------|
| tepco-kepco-structural-break | 東京電力のβ 0.14 → 1.83 / Chow検定 p = 0.00005 | README の結論テーブル |
| ai-task-manager | LLM応答 102秒 → 19秒 / テスト 242件 | README「ローカルLLMで実測したこと」「テスト」（202 + 40 件） |

## 3. スクリーンショット（Q3）

- [x] `tepco-kepco-structural-break.png` — リポジトリの `output/fig_scatter.png`（実際の分析結果）を使用
- [ ] **`ai-task-manager.png` がダミーのまま**。`public/screenshots/ai-task-manager.png` が
      「screenshot placeholder」と描かれた画像になっている。アプリを起動して実画面を撮り、
      同じパスに置き換えること。あわせて `content/works/ai-task-manager.mdx` の `alt` と
      `caption` を実際に写っている内容に合わせる

## 4. プロフィール

`content/about.mdx` の以下が伏せ字のまま。

- [ ] 学校名・学部・在学年（`20XX.04 — 〇〇大学 〇〇学部`）
- [ ] インターン歴（`20XX.XX — 〇〇でのインターン`）
- [ ] 「使える道具」が実態と合っているか

## 5. リンクとドメイン（Q4）

`src/lib/site.ts` を確認する。

- [x] `links.github` — `https://github.com/kanta0414` に修正済み
- [ ] `links.x` — **未確認**。`https://x.com/kanta` のまま。実アカウントに直すか、
      X をやっていないなら `src/lib/build-tree.ts` の LINKS と `src/app/contact/page.tsx` から外す
- [ ] `links.email` — `kantah650414@gmail.com` でよいか
- [ ] `url` — **Vercel の本番URL（または独自ドメイン）に変更**。OGP と sitemap の絶対URLがここから作られる

### portfolio.mdx を公開するには

`kanta0414/portfolio` リポジトリがまだ無く、README リンクが 404 になるため `draft: true` にしてある
（本番ビルドから除外され、`npm run dev` でのみ見える）。このサイト自体を GitHub に push したら
`draft` を消せば公開される。§1.2 の「TypeScript/React の実装力はサイト自体の完成度で証明する」を
明示的に見せられるので、公開を推奨する。

### 承認済みの仕様変更（確認不要・記録のみ）

サイドバーを 768px 以上で常設化した（旧 §7.5 の「768〜1023px はハンバーガーでオーバーレイ」を廃止）。
依頼にもとづく変更で、[requirements-sidebar.md](./requirements-sidebar.md) に要件をまとめ、
requirements.md §7.4 / §7.5 も更新済み。767px 以下は変更していない。

## 7. 公開前の最終確認（Q5）

- [ ] `npm run build` が通る（frontmatter の検証もここで落ちる）
- [ ] Lighthouse Performance / A11y ともに 90+（要件 §5）
- [ ] 1024px / 900px / 375px の3幅で表示を確認（要件 §7.5）
- [ ] OGP画像を確認（`/opengraph-image`）
- [ ] NDA案件が混ざっていないこと（要件 §5 セキュリティ）
