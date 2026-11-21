# monopix

> Lightweight, zero-dependency JavaScript/TypeScript avatar generator creating pixel-art avatars from initials with extensible multi-mode architecture.

## Features

- **Initial Extractor**: Unicode & Arabic-aware character extraction.
- **Pixel Mode Engine**:
  - Handcrafted, crisp 5x5 and 7x7 bitmap fonts for Latin (A-Z, 0-9) and Arabic alphabet (أ-ي).
  - Algorithmic scaling to any arbitrary grid size ($N \times N$, e.g. 10x10, 16x16).
  - Deterministic procedural fallback for symbols, emojis, and rare glyphs.
- **Customizable Styling**:
  - Foreground letter color & background color.
  - Pixel shapes: `square`, `circle`, `rounded`.
  - Avatar shapes: `square`, `circle`.
  - Configurable padding, pixel radius, and gap.
- **Multiple Output Formats**:
  - `.toSVG()`: Crisp standalone SVG markup.
  - `.toDataURI()`: Data URI for `<img src="...">` (UTF-8 or base64).
  - `.renderToCanvas()`: Direct rendering into HTML5 Canvas.
  - `.getGrid()`: 2D boolean grid matrix.
- **Multi-Mode Extensibility**: Easily register custom avatar modes with `registerMode()`.
- **Zero Runtime Dependencies**: Ultra-fast, runs anywhere (Node.js, Browser, Deno, Bun, Cloudflare Workers).

---

## Installation

```bash
npm install monopix
```

---

## Quick Start

### ESM / TypeScript
```typescript
import { createAvatar } from 'monopix';

const avatar = createAvatar({
  name: 'Ahmed',
  size: 128,
  options: {
    gridSize: 7,
    color: '#10B981',
    background: '#0F172A',
  },
});

// Output formats:
const svg = avatar.toSVG();
const dataUri = avatar.toDataURI();
```

### CommonJS
```javascript
const { createAvatar } = require('monopix');

const avatar = createAvatar({
  name: 'سعيد',
  options: {
    gridSize: 7,
    shape: 'circle',
    pixelShape: 'circle',
    color: '#F43F5E',
    background: '#1E1B4B',
  },
});
```

---

## API Reference

### `createAvatar(options: MonopixOptions): MonopixAvatar`
Alias: `monopix(options)`.

#### `MonopixOptions`
| Property | Type | Default | Description |
|---|---|---|---|
| `name` | `string` | *(required)* | Name, username, or text to extract the initial from |
| `mode` | `string` | `'pixel'` | Avatar mode (`pixel` or custom registered mode) |
| `size` | `number` | `128` | Output width and height in pixels |
| `options`| `PixelOptions` | `{}` | Mode-specific options |

#### `PixelOptions`
| Option | Type | Default | Description |
|---|---|---|---|
| `gridSize` | `number` | `7` | Size of the pixel grid (e.g. 5 for 5x5, 7 for 7x7, 14 for 14x14) |
| `color` | `string` | `'#FFFFFF'` | CSS color string for letter pixels |
| `background` | `string` | `'#0F172A'` | CSS color string for the avatar background |
| `shape` | `'square' \| 'circle'` | `'square'` | Outer shape of the avatar |
| `pixelShape` | `'square' \| 'circle' \| 'rounded'` | `'square'` | Shape of individual pixels |
| `padding` | `number` | `1` | Padding (in grid cells) around the character |
| `pixelRadius`| `number` | `0.25` | Corner radius ratio when `pixelShape: 'rounded'` (0 to 0.5) |
| `gap` | `number` | `0` | Spacing between pixels (0 to 0.5) |

---

## Custom Modes

You can register custom avatar modes:

```typescript
import { registerMode, createAvatar } from 'monopix';

registerMode('initials-circle', (name, size, options) => {
  const char = name.charAt(0).toUpperCase();
  return {
    char,
    grid: [[true]],
    svg: `<svg viewBox="0 0 ${size} ${size}"><circle cx="${size/2}" cy="${size/2}" r="${size/2}" fill="#3B82F6"/><text x="50%" y="55%" text-anchor="middle" fill="#FFF">${char}</text></svg>`,
  };
});

const avatar = createAvatar({
  name: 'John',
  mode: 'initials-circle',
});
```

---

## License

MIT
