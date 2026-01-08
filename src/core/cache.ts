/**
 * CSS Cache
 *
 * Caches generated CSS for performance.
 * @module core/cache
 */

import type { CacheStats } from '../types'

/**
 * CSS Cache for storing generated CSS
 *
 * @example
 * ```typescript
 * const cache = new CSSCache()
 * cache.set('p-4', '.p-4 { padding: 1rem; }')
 * const css = cache.get('p-4') // '.p-4 { padding: 1rem; }'
 * ```
 */
export class CSSCache {
  private cache: Map<string, string>
  private hits: number
  private misses: number

  constructor() {
    this.cache = new Map()
    this.hits = 0
    this.misses = 0
  }

  /**
   * Get cached CSS for a class name
   *
   * @example
   * ```typescript
   * const css = cache.get('p-4')
   * if (css) {
   *   // Use cached value
   * }
   * ```
   */
  get(className: string): string | undefined {
    const value = this.cache.get(className)
    if (value !== undefined) {
      this.hits++
      return value
    }
    this.misses++
    return undefined
  }

  /**
   * Store CSS for a class name
   *
   * @example
   * ```typescript
   * cache.set('p-4', '.p-4 { padding: 1rem; }')
   * ```
   */
  set(className: string, css: string): void {
    this.cache.set(className, css)
  }

  /**
   * Check if a class name is cached
   *
   * @example
   * ```typescript
   * if (cache.has('p-4')) {
   *   // Already cached
   * }
   * ```
   */
  has(className: string): boolean {
    return this.cache.has(className)
  }

  /**
   * Delete a cached entry
   */
  delete(className: string): boolean {
    return this.cache.delete(className)
  }

  /**
   * Clear all cached entries
   *
   * @example
   * ```typescript
   * cache.clear() // Reset cache
   * ```
   */
  clear(): void {
    this.cache.clear()
    this.hits = 0
    this.misses = 0
  }

  /**
   * Get cache statistics
   *
   * @example
   * ```typescript
   * const stats = cache.stats()
   * console.log(`Hit rate: ${stats.hits / (stats.hits + stats.misses) * 100}%`)
   * ```
   */
  stats(): CacheStats {
    return {
      hits: this.hits,
      misses: this.misses,
      size: this.cache.size,
    }
  }

  /**
   * Get all cached entries
   */
  entries(): IterableIterator<[string, string]> {
    return this.cache.entries()
  }

  /**
   * Get all cached class names
   */
  keys(): IterableIterator<string> {
    return this.cache.keys()
  }

  /**
   * Get all cached CSS values
   */
  values(): IterableIterator<string> {
    return this.cache.values()
  }

  /**
   * Get the number of cached entries
   */
  get size(): number {
    return this.cache.size
  }

  /**
   * Get multiple cached values
   */
  getMany(classNames: string[]): Map<string, string> {
    const result = new Map<string, string>()
    for (const className of classNames) {
      const css = this.get(className)
      if (css !== undefined) {
        result.set(className, css)
      }
    }
    return result
  }

  /**
   * Set multiple cached values
   */
  setMany(entries: Map<string, string> | Array<[string, string]>): void {
    const iterable = entries instanceof Map ? entries.entries() : entries
    for (const [className, css] of iterable) {
      this.set(className, css)
    }
  }

  /**
   * Get hit rate percentage
   */
  getHitRate(): number {
    const total = this.hits + this.misses
    if (total === 0) {
      return 0
    }
    return (this.hits / total) * 100
  }
}

/**
 * Create a new CSS cache instance
 *
 * @example
 * ```typescript
 * const cache = createCache()
 * ```
 */
export function createCache(): CSSCache {
  return new CSSCache()
}
