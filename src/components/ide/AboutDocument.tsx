import { EditorPane } from '@/components/ide/EditorPane';
import { Mdx } from '@/components/mdx/Mdx';
import { getPageBody } from '@/lib/content';

/** F-01 / F-03。トップと /about で同一内容を描画する。 */
export function AboutDocument() {
  return (
    <EditorPane>
      <Mdx source={getPageBody('about')} />
    </EditorPane>
  );
}
