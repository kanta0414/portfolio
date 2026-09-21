import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // 静的生成のみ（非機能要件: セキュリティ / パフォーマンス）
  images: {
    formats: ['image/avif', 'image/webp'],
    // スクリーンショットの表示幅は最大 820px なので、2048/3840 の variant は選ばれない。
    // 生成対象から外して Vercel の画像最適化コストを減らす。
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  eslint: {
    dirs: ['src'],
  },
};

export default nextConfig;
