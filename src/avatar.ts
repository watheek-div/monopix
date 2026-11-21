import { MonopixOptions, RenderResult } from './types.js';
import { executeMode } from './modes/index.js';

export class MonopixAvatar {
  readonly char: string;
  readonly grid: boolean[][];
  private readonly svgContent: string;
  readonly options: MonopixOptions;

  constructor(options: MonopixOptions) {
    this.options = options;
    const result: RenderResult = executeMode(options);
    this.char = result.char;
    this.grid = result.grid;
    this.svgContent = result.svg;
  }

  /**
   * Returns the generated avatar as an SVG markup string.
   */
  toSVG(): string {
    return this.svgContent;
  }

  /**
   * Returns the avatar encoded as a data URI string suitable for <img src="...">.
   */
  toDataURI(base64: boolean = false): string {
    if (base64) {
      if (typeof btoa === 'function') {
        return `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(this.svgContent)))}`;
      }
      const maybeBuffer = (globalThis as unknown as { Buffer?: { from: (str: string) => { toString: (enc: string) => string } } }).Buffer;
      if (maybeBuffer && typeof maybeBuffer.from === 'function') {
        return `data:image/svg+xml;base64,${maybeBuffer.from(this.svgContent).toString('base64')}`;
      }
    }
    return `data:image/svg+xml;utf8,${encodeURIComponent(this.svgContent)}`;
  }

  /**
   * Renders the avatar into an HTML5 Canvas element (browser environments).
   */
  renderToCanvas(canvas: HTMLCanvasElement): Promise<void> {
    return new Promise((resolve, reject) => {
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        return reject(new Error('[monopix] Canvas 2D context not available'));
      }

      const img = new Image();
      img.onload = () => {
        canvas.width = this.options.size || 128;
        canvas.height = this.options.size || 128;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        resolve();
      };
      img.onerror = (err) => reject(err);
      img.src = this.toDataURI();
    });
  }

  /**
   * Returns the boolean grid representation (true = pixel filled).
   */
  getGrid(): boolean[][] {
    return this.grid.map((row) => [...row]);
  }
}
