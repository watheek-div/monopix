import { MonopixOptions, RenderResult } from '../types.js';
import { renderPixelMode } from './pixel/index.js';

export type ModeRenderer = (name: string, size: number, options?: any) => RenderResult;

const modeRegistry: Map<string, ModeRenderer> = new Map();

// Register default pixel mode
modeRegistry.set('pixel', (name, size, options) => renderPixelMode(name, size, options));

/**
 * Registers a new custom avatar generation mode.
 */
export function registerMode(modeName: string, renderer: ModeRenderer): void {
  modeRegistry.set(modeName.toLowerCase(), renderer);
}

/**
 * Dispatches avatar generation to the corresponding mode renderer.
 */
export function executeMode(options: MonopixOptions): RenderResult {
  const modeName = (options.mode || 'pixel').toLowerCase();
  const renderer = modeRegistry.get(modeName);

  if (!renderer) {
    throw new Error(`[monopix] Unsupported mode: "${modeName}". Registered modes: ${Array.from(modeRegistry.keys()).join(', ')}`);
  }

  const size = options.size && options.size > 0 ? options.size : 128;
  return renderer(options.name, size, options.options);
}
