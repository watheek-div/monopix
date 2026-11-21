import { describe, it, expect } from 'vitest';
import { extractFirstChar } from '../src/utils/char.js';

describe('extractFirstChar', () => {
  it('extracts and uppercases Latin letters', () => {
    expect(extractFirstChar('alice')).toBe('A');
    expect(extractFirstChar('Bob')).toBe('B');
    expect(extractFirstChar('z')).toBe('Z');
  });

  it('extracts Arabic letters accurately', () => {
    expect(extractFirstChar('محمد')).toBe('م');
    expect(extractFirstChar('سارة')).toBe('س');
    expect(extractFirstChar('أحمد')).toBe('أ');
    expect(extractFirstChar('خالد')).toBe('خ');
    expect(extractFirstChar('يوسف')).toBe('ي');
  });

  it('handles leading and trailing whitespace', () => {
    expect(extractFirstChar('   John')).toBe('J');
    expect(extractFirstChar('  فاطمة  ')).toBe('ف');
  });

  it('falls back to ? on empty or invalid inputs', () => {
    expect(extractFirstChar('')).toBe('?');
    expect(extractFirstChar('   ')).toBe('?');
    // @ts-expect-error test invalid type
    expect(extractFirstChar(null)).toBe('?');
    // @ts-expect-error test invalid type
    expect(extractFirstChar(undefined)).toBe('?');
  });
});
