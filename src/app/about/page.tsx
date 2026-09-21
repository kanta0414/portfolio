import type { Metadata } from 'next';
import { AboutDocument } from '@/components/ide/AboutDocument';
import { site } from '@/lib/site';

/**
 * F-03 About。トップの初期表示と同一内容（要件 §4.1）。
 * 同じ本文が2つのURLに出るため、正規URLはトップに寄せる。
 */
export const metadata: Metadata = {
  title: 'About',
  description: site.description,
  alternates: { canonical: '/' },
};

export default function AboutPage() {
  return <AboutDocument />;
}
