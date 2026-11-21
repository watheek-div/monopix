import { PixelOptions, RenderResult } from '../../types.js';
import { extractFirstChar } from '../../utils/char.js';
import { rasterizeChar } from './rasterizer.js';
import { renderPixelSvg } from './renderer.js';

export function renderPixelMode(name: string, size: number = 128, options: PixelOptions = {}): RenderResult {
  const char = extractFirstChar(name);
  const gridSize = options.gridSize && options.gridSize >= 3 ? Math.floor(options.gridSize) : 7;
  const grid = rasterizeChar(char, gridSize);
  const svg = renderPixelSvg({ grid, size, options });

  return {
    char,
    grid,
    svg,
  };
}
