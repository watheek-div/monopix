/**
 * Sanitizes color inputs to prevent SVG injection or malformed attributes.
 */
export function sanitizeColor(color: string | undefined, fallback: string): string {
  if (!color || typeof color !== 'string') return fallback;

  const trimmed = color.trim();
  // Validates standard hex, rgb, rgba, hsl, hsla, and safe CSS color names
  const safeColorRegex = /^#([0-9a-fA-F]{3,8})$|^rgba?\([0-9\s,.\/%]+\)$|^hsla?\([0-9\s,.\/%degturnrad]+\)$|^[a-zA-Z]+$/;

  if (safeColorRegex.test(trimmed)) {
    return trimmed;
  }

  return fallback;
}
