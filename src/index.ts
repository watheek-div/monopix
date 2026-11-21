import { MonopixAvatar } from './avatar.js';
import { MonopixOptions } from './types.js';
import { registerMode } from './modes/index.js';

/**
 * Creates a new MonopixAvatar instance.
 */
export function createAvatar(options: MonopixOptions): MonopixAvatar {
  return new MonopixAvatar(options);
}

/**
 * Alias for createAvatar.
 */
export const monopix = createAvatar;

export { MonopixAvatar, registerMode };
export * from './types.js';
export { extractFirstChar } from './utils/char.js';
