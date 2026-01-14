/**
 * Vitest Setup File
 *
 * Configures test environment with proper mocks for browser APIs
 * that are not available in Node.js/jsdom.
 */

import { vi, beforeAll, afterEach } from 'vitest'

// Store original console methods
const originalConsoleWarn = console.warn
const originalConsoleError = console.error

// Patterns to suppress (expected warnings in test environment)
const suppressedPatterns = [
  'Not implemented: HTMLCanvasElement',
  'Not implemented: Window\'s scrollTo',
  'Not implemented: navigation',
  'Failed to cleanup persistent cache',
  'CSS config validation errors',
  'IDBKeyRange is not defined',
]

// Override console methods to filter expected warnings
beforeAll(() => {
  console.warn = (...args: unknown[]) => {
    const message = args.join(' ')
    if (!suppressedPatterns.some(pattern => message.includes(pattern))) {
      originalConsoleWarn.apply(console, args)
    }
  }

  console.error = (...args: unknown[]) => {
    const message = args.join(' ')
    if (!suppressedPatterns.some(pattern => message.includes(pattern))) {
      originalConsoleError.apply(console, args)
    }
  }

  // Mock IDBKeyRange for IndexedDB tests
  if (typeof globalThis.IDBKeyRange === 'undefined') {
    (globalThis as Record<string, unknown>).IDBKeyRange = {
      upperBound: (value: number) => ({ upper: value, upperOpen: false }),
      lowerBound: (value: number) => ({ lower: value, lowerOpen: false }),
      bound: (lower: number, upper: number) => ({ lower, upper, lowerOpen: false, upperOpen: false }),
      only: (value: number) => ({ lower: value, upper: value }),
    }
  }

  // Mock window.scrollTo for jsdom
  if (typeof window !== 'undefined' && !window.scrollTo) {
    window.scrollTo = vi.fn()
  }
})

afterEach(() => {
  vi.clearAllMocks()
})
