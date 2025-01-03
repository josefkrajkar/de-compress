export type LZ77Token = {
  type: 'match' | 'literal';
  data: number | string;
  length?: number;
  offset?: number;
};

export type HuffmanNode = {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
  code?: string;
};

export type CompressedData = {
  huffmanTree: number[];
  compressedContent: Uint8Array;
  originalSize: number;
};
