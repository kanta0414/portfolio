# 公開前チェックリスト

作品・数字・スクリーンショット・リンクは実物に差し替え済み。
**残っているのは主にプロフィールの詰め（§4）と、`portfolio.png` の差し替え（§3）**。
公開自体は可能な状態。

---

## 1. 作品の確定（Q1）— 済

| ファイル | 掲載順 | リポジトリ |
|---------|-------|-----------|
| `content/works/ai-task-manager.mdx` | 1 | [kanta0414/ai-task-manager](https://github.com/kanta0414/ai-task-manager) |
| `content/works/tepco-kepco-structural-break.mdx` | 2 | [kanta0414/tepco-kepco-structural-break](https://github.com/kanta0414/tepco-kepco-structural-break) |
| `content/works/portfolio.mdx` | 3 | [kanta0414/portfolio](https://github.com/kanta0414/portfolio)（このサイト） |

架空だったテンプレート2件（`doc-extract-agent` / `rag-eval-harness`）は削除済み。

- [ ] 担当範囲が3件とも `個人開発` でよいか（README に記載が無かったため推定）

## 2. 数字（Q2）— 済

すべて README 記載の実測値。

| 作品 | 数字 |
|------|------|
| ai-task-manager | LLM応答 102秒 → 19秒 / テスト 242件 |
| tepco-kepco-structural-break | 東京電力のβ 0.14 → 1.83 / Chow検定 p = 0.00005 |
| portfolio | Lighthouse 90+ / 作品追加 MDX 1ファイル |

- [ ] `portfolio` の Lighthouse 表記。実測はデスクトップ 100 なので「100」に上げてもよい

## 3. スクリーンショット（Q3）— 済

- [x] `ai-task-manager.png` — 実画面。2枚のスクショからブラウザUIを除去して結合（§6 参照）
- [x] `tepco-kepco-structural-break.png` — リポジトリの `output/fig_scatter.png`
- [ ] `portfolio.png` が**ダミーのまま**。完成したサイト自身のスクショに差し替える

## 4. プロフィール

- [x] 学校 — 滋賀大学 経済学部 経済学科（2020.04）
- [ ] **在学中か卒業済みか**。2020.04 入学で4年制なら2024.03卒業のはず。現在の表記は期間だけで状態を書いていないので、
      「在学中」「2024.03 卒業」などに直すか確認する
- [ ] インターン歴・その他の経歴（`content/about.mdx` にコメントで差し込み口を用意してある）
- [ ] 「いま」「使える道具」の文面が実態と合っているか（掲載2作品から書き起こしたもの）

## 5. リンクとドメイン（Q4）— 済

- [x] `links.github` — `https://github.com/kanta0414`
- [x] X — アカウントが無いため、ツリー・Contact ともに削除済み
- [x] `url` — Vercel の `VERCEL_PROJECT_PRODUCTION_URL` から自動で決まる。手で書き写す必要はない
- [ ] `links.email` — `kantah650414@gmail.com` でよいか
- [ ] 独自ドメインを取る場合のみ、Vercel の環境変数 `SITE_URL` に設定する

### 承認済みの仕様変更（確認不要・記録のみ）

- サイドバーを 768px 以上で常設化した（旧 §7.5 の「768〜1023px はハンバーガーでオーバーレイ」を廃止）。
  [requirements-sidebar.md](./requirements-sidebar.md) に要件をまとめ、requirements.md §7.4 / §7.5 も更新済み。
  767px 以下は変更していない。

### `ai-task-manager.png` の作り方（記録）

提供された2枚のスクリーンショットから合成した。加工内容は以下のみで、UI の中身は変えていない。

- ブラウザUI（タブ・URL欄・ブックマークバー）を切り落とし（上端 122px）
- 2枚を結合。**継ぎ目はカレンダー枠の下端（ページ座標 y=900）**。
  ページ全体は 245px スクロールしていたが、カレンダーは内部でさらに 420px スクロールしていたため、
  枠内で継ぐと実在しない表示になる。枠の外で継ぐことで、カレンダーは1枚目・AIアシスタントは2枚目から取っている
- macOS のスクリーンショット・サムネイル（右下）と Next.js の開発モードバッジ（左下）を背景色で塗りつぶし
- 上半分にだけ写っていたブラウザのスクロールバー（右端15px）を切り落とし

撮り直す場合は、ブラウザUIを含まない1枚（フルページスクショ）にすれば加工は不要。

## 7. 公開前の最終確認（Q5）

- [ ] `npm run build` が通る（frontmatter の検証もここで落ちる）
- [ ] Lighthouse Performance / A11y ともに 90+（要件 §5）
- [ ] 1024px / 900px / 375px の3幅で表示を確認（要件 §7.5）
- [ ] OGP画像を確認（`/opengraph-image`）
- [ ] NDA案件が混ざっていないこと（要件 §5 セキュリティ）
