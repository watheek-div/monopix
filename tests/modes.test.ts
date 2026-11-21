import { describe, it, expect } from 'vitest';
import { createAvatar, registerMode } from '../src/index.js';

describe('Mode System', () => {
  it('throws an error when an unregistered mode is requested', () => {
    expect(() => {
      createAvatar({
        name: 'Test',
        mode: 'non_existent_mode',
      });
    }).toThrow(/Unsupported mode: "non_existent_mode"/);
  });

  it('allows registering and using custom avatar modes', () => {
    registerMode('custom-badge', (name, size) => {
      const char = name.charAt(0);
      return {
        char,
        grid: [[true]],
        svg: `<svg viewBox="0 0 ${size} ${size}"><text>${char}</text></svg>`,
      };
    });

    const avatar = createAvatar({
      name: 'Custom',
      mode: 'custom-badge',
      size: 64,
    });

    expect(avatar.char).toBe('C');
    expect(avatar.toSVG()).toContain('<text>C</text>');
  });
});
