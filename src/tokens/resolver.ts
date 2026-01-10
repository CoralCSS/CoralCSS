/**
 * Token Resolver
 *
 * Resolves token references and provides runtime token access.
 *
 * @module tokens/resolver
 */

import type { DesignTokens, TokenValue, TokenContext, TokenTransformer } from './types'
import { isRef } from './ref'

/**
 * Get a nested value from an object using a dot-notation path
 */
export function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  const keys = path.split('.')
  let current: unknown = obj

  for (const key of keys) {
    if (current === null || current === undefined) {
      return undefined
    }
    if (typeof current !== 'object') {
      return undefined
    }
    current = (current as Record<string, unknown>)[key]
  }

  return current
}

/**
 * Set a nested value in an object using a dot-notation path
 */
export function setNestedValue(obj: Record<string, unknown>, path: string, value: unknown): void {
  const keys = path.split('.')
  let current = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]!
    if (!(key in current) || typeof current[key] !== 'object') {
      current[key] = {}
    }
    current = current[key] as Record<string, unknown>
  }

  const lastKey = keys[keys.length - 1]
  if (lastKey !== undefined) {
    current[lastKey] = value
  }
}

/**
 * Resolve a single token reference
 */
export function resolveRef(
  ref: { $ref: string },
  tokens: Record<string, unknown>,
  visited: Set<string> = new Set()
): TokenValue {
  const path = ref.$ref

  // Check for circular references
  if (visited.has(path)) {
    throw new Error(`Circular token reference detected: ${path}`)
  }

  visited.add(path)
  const value = getNestedValue(tokens, path)

  if (value === undefined) {
    throw new Error(`Token reference not found: ${path}`)
  }

  // Recursively resolve if the value is also a reference
  if (isRef(value)) {
    return resolveRef(value as { $ref: string }, tokens, visited)
  }

  return value as TokenValue
}

/**
 * Resolve all token references in a token object
 */
export function resolveTokens(tokens: Record<string, unknown>): Record<string, unknown> {
  const resolved: Record<string, unknown> = {}

  function traverse(obj: Record<string, unknown>, path: string[] = []): Record<string, unknown> {
    const result: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(obj)) {
      const currentPath = [...path, key]

      if (isRef(value)) {
        try {
          result[key] = resolveRef(value as { $ref: string }, tokens)
        } catch {
          // Keep the reference if resolution fails
          result[key] = value
        }
      } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        result[key] = traverse(value as Record<string, unknown>, currentPath)
      } else {
        result[key] = value
      }
    }

    return result
  }

  return traverse(tokens)
}

/**
 * Token resolver class for runtime token access
 */
export class TokenResolver {
  private tokens: DesignTokens
  private resolvedTokens: Record<string, unknown> | null = null
  private transformers: TokenTransformer[] = []
  private cache: Map<string, TokenValue> = new Map()

  constructor(tokens: DesignTokens) {
    this.tokens = tokens
  }

  /**
   * Add a token transformer
   */
  addTransformer(transformer: TokenTransformer): this {
    this.transformers.push(transformer)
    this.clearCache()
    return this
  }

  /**
   * Clear the resolution cache
   */
  clearCache(): void {
    this.cache.clear()
    this.resolvedTokens = null
  }

  /**
   * Get a token value by path
   */
  get(path: string): TokenValue | undefined {
    // Check cache first
    if (this.cache.has(path)) {
      return this.cache.get(path)
    }

    let value = getNestedValue(this.tokens as unknown as Record<string, unknown>, path)

    if (value === undefined) {
      return undefined
    }

    // Resolve references
    if (isRef(value)) {
      value = resolveRef(value as { $ref: string }, this.tokens as unknown as Record<string, unknown>)
    }

    // Apply transformers
    const context: TokenContext = {
      tokens: this.tokens,
    }

    for (const transformer of this.transformers) {
      value = transformer(value as TokenValue, path, context)
    }

    // Cache the result
    this.cache.set(path, value as TokenValue)

    return value as TokenValue
  }

  /**
   * Get a token value as a CSS variable reference
   */
  var(path: string, fallback?: string): string {
    const varName = path
      .replace(/\./g, '-')
      .replace(/([a-z])([A-Z])/g, '$1-$2')
      .toLowerCase()

    if (fallback) {
      return `var(--${varName}, ${fallback})`
    }

    return `var(--${varName})`
  }

  /**
   * Get all tokens in a category
   */
  category<T extends keyof DesignTokens>(name: T): DesignTokens[T] {
    return this.tokens[name]
  }

  /**
   * Get all resolved tokens
   */
  getResolved(): Record<string, unknown> {
    if (!this.resolvedTokens) {
      this.resolvedTokens = resolveTokens(this.tokens as unknown as Record<string, unknown>)
    }
    return this.resolvedTokens
  }

  /**
   * Check if a token exists
   */
  has(path: string): boolean {
    return getNestedValue(this.tokens as unknown as Record<string, unknown>, path) !== undefined
  }

  /**
   * Get multiple tokens at once
   */
  getMany(paths: string[]): Record<string, TokenValue | undefined> {
    const result: Record<string, TokenValue | undefined> = {}
    for (const path of paths) {
      result[path] = this.get(path)
    }
    return result
  }

  /**
   * Create a subset resolver for a specific path
   */
  scope(path: string): TokenResolver | undefined {
    const scopedTokens = getNestedValue(this.tokens as unknown as Record<string, unknown>, path)
    if (scopedTokens && typeof scopedTokens === 'object') {
      return new TokenResolver(scopedTokens as unknown as DesignTokens)
    }
    return undefined
  }
}

/**
 * Create a token resolver instance
 */
export function createResolver(tokens: DesignTokens): TokenResolver {
  return new TokenResolver(tokens)
}

/**
 * Common token transformers
 */
export const transformers = {
  /**
   * Add unit to numeric values
   */
  addUnit(unit: string): TokenTransformer {
    return (value: TokenValue) => {
      if (typeof value === 'number') {
        return `${value}${unit}`
      }
      return value
    }
  },

  /**
   * Scale numeric values
   */
  scale(factor: number): TokenTransformer {
    return (value: TokenValue) => {
      if (typeof value === 'number') {
        return value * factor
      }
      return value
    }
  },

  /**
   * Prefix string values
   */
  prefix(prefix: string): TokenTransformer {
    return (value: TokenValue) => {
      if (typeof value === 'string') {
        return `${prefix}${value}`
      }
      return value
    }
  },

  /**
   * Convert to CSS variable reference
   */
  toVar(varPrefix: string = ''): TokenTransformer {
    return (value: TokenValue, path: string) => {
      const varName = path
        .replace(/\./g, '-')
        .replace(/([a-z])([A-Z])/g, '$1-$2')
        .toLowerCase()
      const prefix = varPrefix ? `${varPrefix}-` : ''
      return `var(--${prefix}${varName})`
    }
  },
}

/**
 * Merge multiple token objects
 */
export function mergeTokens(...tokenSets: Partial<DesignTokens>[]): DesignTokens {
  const result: Record<string, unknown> = {}

  for (const tokens of tokenSets) {
    deepMerge(result, tokens as unknown as Record<string, unknown>)
  }

  return result as unknown as DesignTokens
}

/**
 * Deep merge helper
 */
function deepMerge(target: Record<string, unknown>, source: Record<string, unknown>): void {
  for (const key of Object.keys(source)) {
    const sourceValue = source[key]
    const targetValue = target[key]

    if (
      typeof sourceValue === 'object' &&
      sourceValue !== null &&
      !Array.isArray(sourceValue) &&
      typeof targetValue === 'object' &&
      targetValue !== null &&
      !Array.isArray(targetValue)
    ) {
      deepMerge(targetValue as Record<string, unknown>, sourceValue as Record<string, unknown>)
    } else {
      target[key] = sourceValue
    }
  }
}

/**
 * Validate token structure
 */
export function validateTokens(tokens: unknown): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  if (typeof tokens !== 'object' || tokens === null) {
    return { valid: false, errors: ['Tokens must be an object'] }
  }

  // Check for circular references
  function checkCircular(obj: unknown, path: string[] = [], seen: WeakSet<object> = new WeakSet()): void {
    if (typeof obj !== 'object' || obj === null) {
      return
    }

    if (seen.has(obj)) {
      errors.push(`Circular reference detected at path: ${path.join('.')}`)
      return
    }

    seen.add(obj)

    for (const [key, value] of Object.entries(obj)) {
      checkCircular(value, [...path, key], seen)
    }
  }

  checkCircular(tokens)

  // Check for unresolved references
  function checkRefs(obj: unknown, path: string[] = []): void {
    if (typeof obj !== 'object' || obj === null) {
      return
    }

    if (isRef(obj)) {
      const ref = (obj as { $ref: string }).$ref
      if (getNestedValue(tokens as Record<string, unknown>, ref) === undefined) {
        errors.push(`Unresolved reference at ${path.join('.')}: ${ref}`)
      }
      return
    }

    for (const [key, value] of Object.entries(obj)) {
      checkRefs(value, [...path, key])
    }
  }

  checkRefs(tokens)

  return { valid: errors.length === 0, errors }
}
