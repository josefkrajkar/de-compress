import { LZ77Token, HuffmanNode, HuffmanResult } from '../utils/types';

function lz77Compress(input: string, windowSize = 20): LZ77Token[] {
  const result = [];
  let i = 0;

  while (i < input.length) {
    let matchLength = 0;
    let matchDistance = 0;

    // Look for the longest match in the sliding window
    for (let j = Math.max(0, i - windowSize); j < i; j++) {
      let length = 0;
      while (input[j + length] === input[i + length] && i + length < input.length) {
        length++;
      }
      if (length > matchLength) {
        matchLength = length;
        matchDistance = i - j;
      }
    }

    // Add match or literal
    if (matchLength > 1) {
      result.push({ offset: matchDistance, length: matchLength, nextChar: input[i + matchLength] });
      i += matchLength + 1;
    } else {
      result.push({ offset: 0, length: 0, nextChar: input[i] });
      i++;
    }
  }

  return result;
}

function huffmanEncode(input: string): HuffmanResult {
  const frequency: Record<string, number> = {};
  for (const char of input) {
    frequency[char] = (frequency[char] || 0) + 1;
  }

  const nodes: HuffmanNode[] = Object.entries(frequency).map(([char, freq]) => ({
    char,
    freq,
    left: null,
    right: null,
  }));

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

  const huffmanTree = nodes[0];
  const codes: Record<string, string> = {};

  function generateCodes(node: HuffmanNode, code = ''): void {
    if (node.char !== null) {
      codes[node.char] = code;
      return;
    }
    if (node.left) generateCodes(node.left, code + '0');
    if (node.right) generateCodes(node.right, code + '1');
  }

  generateCodes(huffmanTree);

  const encodedText = input
    .split('')
    .map(char => codes[char])
    .join('');

  return { encodedText, codes, huffmanTree };
}

export function compress(input: string): { lz77: LZ77Token[]; huffman: HuffmanResult } {
  // Step 1: Apply LZ77
  const lz77Tokens = lz77Compress(input);

  // Convert LZ77 tokens back to a string representation
  const lz77String = lz77Tokens
    .map(token =>
      token.offset === 0 && token.length === 0
        ? token.nextChar
        : `[${token.offset},${token.length},${token.nextChar || ''}]`
    )
    .join('');

  // Step 2: Apply Huffman Encoding on LZ77 output
  const huffmanResult = huffmanEncode(lz77String);

  return { lz77: lz77Tokens, huffman: huffmanResult };
}
