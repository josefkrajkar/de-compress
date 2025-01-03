export type LZ77Token = {
  offset: number;
  length: number;
  nextChar: string | null;
};

export type HuffmanNode = {
  char: string | null;
  freq: number;
  left: HuffmanNode | null;
  right: HuffmanNode | null;
};

export type HuffmanResult = {
  encodedText: string;
  codes: Record<string, string>;
  huffmanTree: HuffmanNode;
};
