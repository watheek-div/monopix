import { PixelOptions, PixelShape, AvatarShape } from '../../types.js';
import { sanitizeColor } from '../../utils/sanitize.js';

interface RenderSvgParams {
  grid: boolean[][];
  size: number;
  options?: PixelOptions;
}

/**
 * Renders a boolean grid into a crisp, standalone SVG string.
 */
export function renderPixelSvg({ grid, size, options = {} }: RenderSvgParams): string {
  const gridSize = grid.length;
  const padding = typeof options.padding === 'number' && options.padding >= 0 ? options.padding : 1;
  const color = sanitizeColor(options.color, '#FFFFFF');
  const background = sanitizeColor(options.background, '#0F172A');
  const pixelShape: PixelShape = options.pixelShape || 'square';
  const shape: AvatarShape = options.shape || 'square';
  const gapRatio = Math.min(Math.max(options.gap ?? 0, 0), 0.5);
  const pixelRadius = Math.min(Math.max(options.pixelRadius ?? 0.25, 0), 0.5);

  const totalCells = gridSize + padding * 2;
  const cellSize = size / totalCells;
  const gapOffset = cellSize * (gapRatio / 2);
  const cellRenderSize = cellSize * (1 - gapRatio);

  let pixelsSvg = '';

  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (!grid[r][c]) continue;

      const x = (c + padding) * cellSize + gapOffset;
      const y = (r + padding) * cellSize + gapOffset;

      if (pixelShape === 'circle') {
        const radius = cellRenderSize / 2;
        const cx = x + radius;
        const cy = y + radius;
        pixelsSvg += `<circle cx="${cx.toFixed(2)}" cy="${cy.toFixed(2)}" r="${radius.toFixed(2)}" fill="${color}"/>`;
      } else if (pixelShape === 'rounded') {
        const rx = (cellRenderSize * pixelRadius).toFixed(2);
        pixelsSvg += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellRenderSize.toFixed(2)}" height="${cellRenderSize.toFixed(2)}" rx="${rx}" fill="${color}"/>`;
      } else {
        pixelsSvg += `<rect x="${x.toFixed(2)}" y="${y.toFixed(2)}" width="${cellRenderSize.toFixed(2)}" height="${cellRenderSize.toFixed(2)}" fill="${color}"/>`;
      }
    }
  }

  let clipDefinition = '';
  let clipAttribute = '';
  let backgroundElement = '';

  if (shape === 'circle') {
    const half = size / 2;
    clipDefinition = `<clipPath id="monopix-clip"><circle cx="${half}" cy="${half}" r="${half}"/></clipPath>`;
    clipAttribute = ' clip-path="url(#monopix-clip)"';
    backgroundElement = `<circle cx="${half}" cy="${half}" r="${half}" fill="${background}"/>`;
  } else {
    backgroundElement = `<rect width="${size}" height="${size}" fill="${background}"/>`;
  }

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">`,
    clipDefinition ? `  <defs>${clipDefinition}</defs>` : '',
    `  <g${clipAttribute}>`,
    `    ${backgroundElement}`,
    `    ${pixelsSvg}`,
    '  </g>',
    '</svg>',
  ]
    .filter(Boolean)
    .join('\n');
}
