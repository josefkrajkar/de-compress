export function lz77Compress(input: string, windowSize = 20) {
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
