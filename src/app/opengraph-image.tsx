import { ImageResponse } from 'next/og';
import { getAllWorks } from '@/lib/content';
import { site } from '@/lib/site';

/**
 * F-11 OGP。IDE 画面そのものを OG 画像にする。
 * ImageResponse の既定フォントは日本語グリフを持たないため、ここは英数字のみで組む。
 */
export const alt = `${site.title} — IDE style portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const C = {
  editor: '#0D1117',
  chrome: '#0A0E13',
  line: '#1C2530',
  fg: '#E6EDF3',
  muted: '#8B949E',
  faint: '#3D4753',
  link: '#58A6FF',
  num: '#7EE787',
  tab: '#F78166',
  selected: '#152030',
  dim: '#57636F',
  label: '#4A5561',
} as const;

const mono = 'ui-monospace, Menlo, monospace';

export default async function OpenGraphImage() {
  const files = [
    ...getAllWorks().map((work) => `${work.slug}.md`),
    'about.md',
    'contact.md',
  ].slice(0, 5);

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          backgroundColor: C.editor,
          fontFamily: mono,
        }}
      >
        {/* タイトルバー */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 44,
            backgroundColor: C.chrome,
            borderBottom: `1px solid ${C.line}`,
            padding: '0 18px',
          }}
        >
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: '#FF5F57' }} />
            <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: '#FEBC2E' }} />
            <div style={{ width: 11, height: 11, borderRadius: 6, backgroundColor: '#28C840' }} />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
              color: C.dim,
              fontSize: 15,
            }}
          >
            {site.title}
          </div>
          <div style={{ display: 'flex', width: 60 }} />
        </div>

        <div style={{ display: 'flex', flex: 1 }}>
          {/* サイドバー */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: 300,
              backgroundColor: C.chrome,
              borderRight: `1px solid ${C.line}`,
              padding: '26px 0',
            }}
          >
            <div
              style={{ display: 'flex', color: C.label, fontSize: 13, padding: '0 26px 18px' }}
            >
              EXPLORER
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: C.num,
                fontSize: 16,
                padding: '0 26px 12px',
              }}
            >
              {/* 折りたたみ三角は satori が正しく描けないため OG 画像では省く */}
              works/
            </div>
            {files.map((file, index) => (
              <div
                key={file}
                style={{
                  display: 'flex',
                  fontSize: 16,
                  color: index === 0 ? C.fg : C.muted,
                  backgroundColor: index === 0 ? C.selected : 'transparent',
                  padding: '7px 26px 7px 44px',
                }}
              >
                {file}
              </div>
            ))}
          </div>

          {/* エディタ */}
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: 40,
                borderBottom: `1px solid ${C.line}`,
                borderTop: `2px solid ${C.tab}`,
                padding: '0 26px',
                color: C.fg,
                fontSize: 14,
              }}
            >
              {files[0] ?? 'about.md'}
            </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '54px 44px',
                gap: 22,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ color: C.faint, fontSize: 18 }}>1</span>
                <span style={{ color: C.faint, fontSize: 44 }}>#</span>
                <span style={{ color: C.fg, fontSize: 56, fontWeight: 700 }}>{site.name}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ color: C.faint, fontSize: 18 }}>2</span>
                <span style={{ color: C.muted, fontSize: 27 }}>Python / LLM engineer</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 }}>
                <span style={{ color: C.faint, fontSize: 18 }}>3</span>
                <span style={{ color: C.num, fontSize: 25 }}>
                  **{getAllWorks().length} works**
                </span>
                <span style={{ color: C.muted, fontSize: 25 }}>· LLM · Python · TypeScript</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginTop: 22 }}>
                <span style={{ color: C.faint, fontSize: 18 }}>4</span>
                <span style={{ color: C.link, fontSize: 25 }}>
                  [{site.url.replace('https://', '')}]
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ステータスバー */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 34,
            height: 32,
            backgroundColor: '#11161D',
            padding: '0 26px',
            color: C.dim,
            fontSize: 13,
          }}
        >
          <span>main*</span>
          <span>{getAllWorks().length} works</span>
          <span>Markdown</span>
          <span>UTF-8</span>
        </div>
      </div>
    ),
    size,
  );
}
