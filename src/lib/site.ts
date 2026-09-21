/**
 * サイト全体で一元管理する定数。
 * ここ以外に氏名・URL・連絡先をハードコードしないこと。
 */
export const site = {
  name: 'kanta',
  fullName: '細川寛太',
  title: 'kanta — portfolio',
  role: 'LLM / Python エンジニア',
  description:
    'Python × LLM の実装と評価を中心に手を動かしているエンジニアのポートフォリオ。作品の詳細は各リポジトリの README に。',
  // 本番ドメインが決まったら差し替える（OGP / sitemap の絶対URLに使う）
  url: 'https://kanta-portfolio.vercel.app',
  locale: 'ja_JP',
  links: {
    github: 'https://github.com/kanta0414',
    email: 'mailto:kantah650414@gmail.com',
  },
} as const;

export type SiteConfig = typeof site;
