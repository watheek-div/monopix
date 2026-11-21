import { getGlyphMatrix } from './matrices.js';

/**
 * Creates a blank boolean grid of dimensions size x size.
 */
export function createEmptyGrid(size: number): boolean[][] {
  return Array.from({ length: size }, () => Array(size).fill(false));
}

/**
 * Converts a string-based GlyphMatrix to a boolean 2D array.
 */
export function matrixToBooleanGrid(matrix: string[]): boolean[][] {
  return matrix.map((row) => Array.from(row).map((cell) => cell === '1'));
}

/**
 * Scales a 2D boolean grid from srcSize to targetSize using nearest-neighbor interpolation.
 */
export function scaleGrid(src: boolean[][], targetSize: number): boolean[][] {
  const srcHeight = src.length;
  const srcWidth = src[0].length;
  const target = createEmptyGrid(targetSize);

  for (let r = 0; r < targetSize; r++) {
    const srcR = Math.min(Math.floor((r / targetSize) * srcHeight), srcHeight - 1);
    for (let c = 0; c < targetSize; c++) {
      const srcC = Math.min(Math.floor((c / targetSize) * srcWidth), srcWidth - 1);
      target[r][c] = src[srcR][srcC];
    }
  }

  return target;
}

/**
 * Generates a deterministic, vertically symmetric pixel grid for characters
 * that do not have a predefined glyph matrix (e.g., emojis, rare scripts, symbols).
 */
export function generateFallbackGrid(char: string, gridSize: number): boolean[][] {
  const grid = createEmptyGrid(gridSize);
  let hash = 0;

  for (let i = 0; i < char.length; i++) {
    hash = (hash << 5) - hash + char.charCodeAt(i);
    hash |= 0;
  }

  const halfWidth = Math.ceil(gridSize / 2);

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < halfWidth; c++) {
      const bitIndex = (r * halfWidth + c) % 31;
      const isFilled = ((Math.abs(hash) >> bitIndex) & 1) === 1;

      grid[r][c] = isFilled;
      grid[r][gridSize - 1 - c] = isFilled; // Horizontal symmetry
    }
  }

  // Ensure grid is not completely blank
  const hasPixel = grid.some((row) => row.some((cell) => cell));
  if (!hasPixel) {
    const mid = Math.floor(gridSize / 2);
    grid[mid][mid] = true;
  }

  return grid;
}

/**
 * Rasterizes a single character onto a boolean grid of size gridSize x gridSize.
 */
export function rasterizeChar(char: string, gridSize: number = 7): boolean[][] {
  const validSize = Math.max(3, Math.floor(gridSize));
  const glyph = getGlyphMatrix(char, validSize);

  if (!glyph) {
    return generateFallbackGrid(char, validSize);
  }

  const baseGrid = matrixToBooleanGrid(glyph.matrix);

  if (glyph.baseSize === validSize) {
    return baseGrid;
  }

  return scaleGrid(baseGrid, validSize);
}
