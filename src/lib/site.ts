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
  // OGP / sitemap の絶対URLに使う。値の決め方は下の resolveUrl() を参照
  url: resolveUrl(),
  locale: 'ja_JP',
  links: {
    github: 'https://github.com/kanta0414',
    email: 'mailto:kantah650414@gmail.com',
  },
} as const;

export type SiteConfig = typeof site;

/**
 * 本番URLを解決する。
 *
 * Vercel は本番ドメインを `VERCEL_PROJECT_PRODUCTION_URL` に自動で入れるので、
 * デプロイ後に手でドメインを書き写さなくても OGP と sitemap の絶対URLが正しくなる。
 * （`VERCEL_URL` はデプロイごとに変わるため canonical には使わない）
 *
 * 独自ドメインを取ったら、Vercel の環境変数 `SITE_URL` に入れれば上書きできる。
 */
function resolveUrl(): string {
  if (process.env.SITE_URL) return process.env.SITE_URL.replace(/\/$/, '');
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return 'http://localhost:3000';
}
