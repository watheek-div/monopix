/**
 * Extracts the first meaningful character from a name or text.
 * Correctly handles Unicode grapheme clusters, Arabic characters, Latin alphabets, and symbols.
 */
export function extractFirstChar(input: string): string {
  if (!input || typeof input !== 'string') {
    return '?';
  }

  const trimmed = input.trim();
  if (trimmed.length === 0) {
    return '?';
  }

  // Use Intl.Segmenter for proper Unicode grapheme segmentation
  if (typeof Intl !== 'undefined' && typeof Intl.Segmenter === 'function') {
    const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });
    const segments = Array.from(segmenter.segment(trimmed));
    if (segments.length > 0) {
      const first = segments[0].segment;
      return normalizeChar(first);
    }
  }

  // Fallback: Code point extraction
  const codePoints = Array.from(trimmed);
  const first = codePoints[0] || '?';
  return normalizeChar(first);
}

function normalizeChar(char: string): string {
  // Uppercase for Latin characters
  return char.toLocaleUpperCase();
}
