import { Analytics } from '@vercel/analytics/next';
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import type { ReactNode } from 'react';
import { MobileIndex } from '@/components/ide/MobileIndex';
import { Sidebar } from '@/components/ide/Sidebar';
import { StatusBar } from '@/components/ide/StatusBar';
import { TabBar } from '@/components/ide/TabBar';
import { TitleBar } from '@/components/ide/TitleBar';
import { IDE_SHELL_ID } from '@/components/ide/ids';
import { getAllWorks } from '@/lib/content';
import { site } from '@/lib/site';
import { buildTree } from '@/lib/build-tree';
import '@/styles/globals.css';

/*
  欧文は Inter を Web フォントで配信する（latin のみ・約 48KB）。
  和文は端末のシステムフォントに委ねる。理由は globals.css の --font-sans を参照。
*/
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  authors: [{ name: site.fullName, url: site.links.github }],
  creator: site.fullName,
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: site.title,
    description: site.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0D1117',
  colorScheme: 'dark', // ダーク固定（要件 F-12）
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const sections = buildTree();
  const workCount = getAllWorks().length;

  return (
    <html lang="ja" className={inter.variable}>
      <body>
        <a href="#main" className="skip-link">
          本文へスキップ
        </a>

        {/*
          768px 以上: IDEシェル（ビューポート固定・内側スクロール、サイドバー常設）
          767px 以下: 比喩を捨てて通常の縦積み文書
          （要件 §7.5 / requirements-sidebar.md §4.1）

          この div の data-sidebar 属性でサイドバーの折りたたみを表す。
          書き込むのは SidebarToggle、畳むのは globals.css。
        */}
        <div id={IDE_SHELL_ID} className="flex min-h-dvh flex-col md:h-dvh md:overflow-hidden">
          <TitleBar />

          <div className="flex min-h-0 flex-1 md:overflow-hidden">
            <Sidebar sections={sections} />

            <div className="flex min-w-0 flex-1 flex-col">
              <TabBar sections={sections} />

              <main id="main" className="relative min-h-0 flex-1 md:overflow-y-auto">
                {children}
                <MobileIndex sections={sections} />
              </main>
            </div>
          </div>

          <StatusBar workCount={workCount} />
        </div>

        {/*
          F-15 アクセス解析。
          計測スクリプトは Vercel のエッジが配信するため、Vercel 上でのみ差し込む。
          （ローカルの本番確認では /_vercel/insights/script.js が 404 になりコンソールを汚す）
        */}
        {process.env.VERCEL === '1' && <Analytics />}
      </body>
    </html>
  );
}
