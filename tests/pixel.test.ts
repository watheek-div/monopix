import { describe, it, expect } from 'vitest';
import { createAvatar } from '../src/index.js';

describe('Pixel Mode', () => {
  it('generates standard 7x7 grid avatar by default', () => {
    const avatar = createAvatar({ name: 'Alexander' });

    expect(avatar.char).toBe('A');
    expect(avatar.grid.length).toBe(7);
    expect(avatar.grid[0].length).toBe(7);

    const svg = avatar.toSVG();
    expect(svg).toContain('<svg');
    expect(svg).toContain('viewBox="0 0 128 128"');
    expect(svg).toContain('fill="#0F172A"'); // default background
    expect(svg).toContain('fill="#FFFFFF"'); // default pixel color
  });

  it('supports 5x5 grid generation', () => {
    const avatar = createAvatar({
      name: 'Bob',
      options: {
        gridSize: 5,
      },
    });

    expect(avatar.char).toBe('B');
    expect(avatar.grid.length).toBe(5);
    expect(avatar.grid[0].length).toBe(5);
  });

  it('supports custom scaled grid sizes (e.g. 10x10, 16x16)', () => {
    const avatar10 = createAvatar({
      name: 'Charlie',
      options: { gridSize: 10 },
    });
    expect(avatar10.grid.length).toBe(10);
    expect(avatar10.grid[0].length).toBe(10);

    const avatar16 = createAvatar({
      name: 'David',
      options: { gridSize: 16 },
    });
    expect(avatar16.grid.length).toBe(16);
    expect(avatar16.grid[0].length).toBe(16);
  });

  it('correctly applies custom colors for letter and background', () => {
    const avatar = createAvatar({
      name: 'Emma',
      size: 256,
      options: {
        color: '#FF0055',
        background: '#112233',
      },
    });

    const svg = avatar.toSVG();
    expect(svg).toContain('viewBox="0 0 256 256"');
    expect(svg).toContain('fill="#FF0055"');
    expect(svg).toContain('fill="#112233"');
  });

  it('renders circle shape and circle pixels', () => {
    const avatar = createAvatar({
      name: 'Fiona',
      options: {
        shape: 'circle',
        pixelShape: 'circle',
      },
    });

    const svg = avatar.toSVG();
    expect(svg).toContain('clip-path="url(#monopix-clip)"');
    expect(svg).toContain('<circle cx="');
  });

  it('renders rounded pixels', () => {
    const avatar = createAvatar({
      name: 'George',
      options: {
        pixelShape: 'rounded',
        pixelRadius: 0.3,
      },
    });

    const svg = avatar.toSVG();
    expect(svg).toContain('rx="');
  });

  it('supports Arabic names in pixel mode', () => {
    const avatar = createAvatar({
      name: 'أحمد',
      options: {
        gridSize: 7,
        color: '#00E676',
        background: '#0D1117',
      },
    });

    expect(avatar.char).toBe('أ');
    expect(avatar.grid.length).toBe(7);
    const svg = avatar.toSVG();
    expect(svg).toContain('fill="#00E676"');
    expect(svg).toContain('fill="#0D1117"');
  });

  it('generates valid data URIs', () => {
    const avatar = createAvatar({ name: 'Helen' });

    const uriUtf8 = avatar.toDataURI();
    expect(uriUtf8.startsWith('data:image/svg+xml;utf8,')).toBe(true);

    const uriBase64 = avatar.toDataURI(true);
    expect(uriBase64.startsWith('data:image/svg+xml;base64,')).toBe(true);
  });

  it('generates deterministic fallback for unknown characters or emojis', () => {
    const avatar = createAvatar({ name: '🌟 Star' });
    expect(avatar.grid.length).toBe(7);
    const hasPixel = avatar.grid.some((row) => row.some((c) => c));
    expect(hasPixel).toBe(true);
  });
});
