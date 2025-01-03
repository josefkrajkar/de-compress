import { LZ77Token, HuffmanNode, CompressedData } from './types';

const WINDOW_SIZE = 4096;
const MIN_MATCH_LENGTH = 3;

function lz77Compress(input: string): LZ77Token[] {
  const result: LZ77Token[] = [];
  let i = 0;

  while (i < input.length) {
    let bestLength = 0;
    let bestDistance = 0;

    // Look for the longest match in the sliding window
    const windowStart = Math.max(0, i - WINDOW_SIZE);
    for (let j = windowStart; j < i; j++) {
      let length = 0;
      while (
        i + length < input.length &&
        j + length < i &&
        input[j + length] === input[i + length] &&
        length < 255 // Maximum length we can encode in a byte
      ) {
        length++;
      }

      if (length >= MIN_MATCH_LENGTH && length > bestLength) {
        bestLength = length;
        bestDistance = i - j;
      }
    }

    // Add match or literal
    if (bestLength >= MIN_MATCH_LENGTH) {
      result.push({
        type: 'match',
        offset: bestDistance,
        length: bestLength,
        data: input.charCodeAt(i + bestLength),
      });
      i += bestLength + 1;
    } else {
      result.push({
        type: 'literal',
        data: input.charCodeAt(i),
      });
      i++;
    }
  }

  return result;
}

function buildHuffmanTree(tokens: LZ77Token[]): HuffmanNode {
  const freqMap = new Map<number, number>();

  // Count frequencies
  for (const token of tokens) {
    if (token.type === 'literal') {
      const value = token.data as number;
      freqMap.set(value, (freqMap.get(value) || 0) + 1);
    } else {
      const value = token.data as number;
      freqMap.set(value, (freqMap.get(value) || 0) + 1);
      // Also count match lengths and offsets
      if (token.length !== undefined) {
        freqMap.set(token.length, (freqMap.get(token.length) || 0) + 1);
      }
      if (token.offset !== undefined) {
        freqMap.set(token.offset, (freqMap.get(token.offset) || 0) + 1);
      }
    }
  }

  // Create leaf nodes
  const nodes: HuffmanNode[] = Array.from(freqMap.entries()).map(([char, freq]) => ({
    char: String.fromCharCode(char),
    freq,
    left: null,
    right: null,
  }));

  // Build the tree
  while (nodes.length > 1) {
    nodes.sort((a, b) => a.freq - b.freq);
    const left = nodes.shift()!;
    const right = nodes.shift()!;
    nodes.push({
      char: null,
      freq: left.freq + right.freq,
      left,
      right,
    });
  }

  return nodes[0];
}

function assignHuffmanCodes(node: HuffmanNode, code = ''): Map<string, string> {
  const codes = new Map<string, string>();

  function traverse(node: HuffmanNode, currentCode: string) {
    if (node.char !== null) {
      codes.set(node.char, currentCode);
      node.code = currentCode;
    } else {
      if (node.left) traverse(node.left, currentCode + '0');
      if (node.right) traverse(node.right, currentCode + '1');
    }
  }

  traverse(node, code);
  return codes;
}

function serializeHuffmanTree(node: HuffmanNode): number[] {
  const result: number[] = [];

  function traverse(node: HuffmanNode) {
    if (node.char !== null) {
      result.push(1); // Leaf node
      result.push(node.char.charCodeAt(0));
    } else {
      result.push(0); // Internal node
      if (node.left) traverse(node.left);
      if (node.right) traverse(node.right);
    }
  }

  traverse(node);
  return result;
}

function compressTokens(tokens: LZ77Token[], huffmanCodes: Map<string, string>): Uint8Array {
  let bitString = '';

  for (const token of tokens) {
    if (token.type === 'literal') {
      bitString += '0'; // Flag for literal
      const charCode = token.data as number;
      bitString += huffmanCodes.get(String.fromCharCode(charCode)) || '';
    } else {
      bitString += '1'; // Flag for match
      const nextChar = token.data as number;
      const length = token.length!;
      const offset = token.offset!;

      // Encode match length (8 bits)
      bitString += length.toString(2).padStart(8, '0');
      // Encode offset (12 bits)
      bitString += offset.toString(2).padStart(12, '0');
      // Encode next char
      bitString += huffmanCodes.get(String.fromCharCode(nextChar)) || '';
    }
  }

  // Convert bit string to Uint8Array
  const bytes = new Uint8Array(Math.ceil(bitString.length / 8));
  for (let i = 0; i < bitString.length; i += 8) {
    const byte = bitString.slice(i, i + 8).padEnd(8, '0');
    bytes[i / 8] = parseInt(byte, 2);
  }

  return bytes;
}

export function compressWithDynamicTables(input: string): CompressedData {
  // Step 1: LZ77 compression
  const tokens = lz77Compress(input);

  // Step 2: Build Huffman tree and get codes
  const huffmanTree = buildHuffmanTree(tokens);
  const huffmanCodes = assignHuffmanCodes(huffmanTree);

  // Step 3: Serialize the Huffman tree
  const serializedTree = serializeHuffmanTree(huffmanTree);

  // Step 4: Compress tokens using Huffman codes
  const compressedContent = compressTokens(tokens, huffmanCodes);

  return {
    huffmanTree: serializedTree,
    compressedContent,
    originalSize: input.length,
  };
}
