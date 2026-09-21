/**
 * ファイルツリーの型と純粋関数のみを置く。
 * クライアントコンポーネント（FileTree / TabBar）から import されるため、
 * ここに node:fs を持ち込まないこと（組み立ては build-tree.ts 側）。
 */

export type TreeFile = {
  kind: 'file';
  /** ツリー上の表示名（= ファイル名） */
  name: string;
  href: string;
  /** 外部リンク（新規タブ + `↗`） */
  external?: boolean;
  /** アクティブ判定に使う追加パス（例: `/` と `/about` は同じファイル） */
  aliases?: string[];
  /** タブバーやタイトルに使う短い説明 */
  description?: string;
};

export type TreeDir = {
  kind: 'dir';
  name: string;
  children: TreeFile[];
};

export type TreeNode = TreeDir | TreeFile;

export type TreeSection = {
  /** サイドバーのセクション見出し（EXPLORER / LINKS） */
  label: string;
  nodes: TreeNode[];
};

/** ツリー内のファイルを平坦化（キーボード操作・タブの解決に使う） */
export function flattenFiles(sections: TreeSection[]): TreeFile[] {
  return sections.flatMap((section) =>
    section.nodes.flatMap((node) => (node.kind === 'dir' ? node.children : [node])),
  );
}

/** pathname に対応するツリー上のファイルを返す（タブバー用） */
export function findFileByPath(sections: TreeSection[], pathname: string): TreeFile | undefined {
  return flattenFiles(sections).find((file) => isActiveFile(file, pathname));
}

export function isActiveFile(file: TreeFile, pathname: string): boolean {
  if (file.external) return false;
  return file.href === pathname || (file.aliases?.includes(pathname) ?? false);
}
