export type AvatarShape = 'square' | 'circle';
export type PixelShape = 'square' | 'circle' | 'rounded';

export interface PixelOptions {
  /**
   * Size of the pixel grid (e.g., 5 for 5x5, 7 for 7x7).
   * Default: 7
   */
  gridSize?: number;

  /**
   * Color of the letter pixels (CSS color string: hex, rgb, hsl, named).
   * Default: '#FFFFFF'
   */
  color?: string;

  /**
   * Background color of the avatar.
   * Default: '#0F172A'
   */
  background?: string;

  /**
   * Shape of individual pixels.
   * Default: 'square'
   */
  pixelShape?: PixelShape;

  /**
   * Outer shape of the generated avatar.
   * Default: 'square'
   */
  shape?: AvatarShape;

  /**
   * Padding (in cells) around the character inside the grid.
   * Default: 1
   */
  padding?: number;

  /**
   * Corner radius ratio for rounded pixels (0 to 0.5).
   * Default: 0.25
   */
  pixelRadius?: number;

  /**
   * Spacing between pixels (in SVG units relative to pixel size, 0 to 0.3).
   * Default: 0
   */
  gap?: number;
}

export type AvatarMode = 'pixel' | string;

export interface MonopixOptions {
  /**
   * Full name, username, or single character to generate avatar for.
   */
  name: string;

  /**
   * Avatar generation mode.
   * Default: 'pixel'
   */
  mode?: AvatarMode;

  /**
   * Output dimension (width and height in px).
   * Default: 128
   */
  size?: number;

  /**
   * Mode-specific options.
   */
  options?: PixelOptions;
}

export interface RenderResult {
  char: string;
  grid: boolean[][];
  svg: string;
}
