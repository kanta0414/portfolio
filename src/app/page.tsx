import type { Metadata } from 'next';
import { AboutDocument } from '@/components/ide/AboutDocument';

/** F-01 トップ。初期表示は about.md を開いた状態（要件 §4.1）。 */
export const metadata: Metadata = {
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return <AboutDocument />;
}
