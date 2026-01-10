/**
 * Design Tokens System
 *
 * A comprehensive design token system for consistent, themeable design.
 * Supports semantic tokens, component tokens, and CSS custom properties.
 *
 * @module tokens
 */

// Export ref utilities first to avoid circular imports
export { ref, isRef } from './ref'

export * from './primitives'
export * from './semantic'
export * from './component'
export * from './generator'
export * from './resolver'
export type * from './types'

import type { DesignTokens, TokenValue, TokenCategory } from './types'

export type { DesignTokens, TokenValue, TokenCategory }

/**
 * Create a complete design tokens configuration
 */
export function defineTokens(tokens: Partial<DesignTokens>): DesignTokens {
  return {
    colors: tokens.colors || {},
    spacing: tokens.spacing || {},
    sizing: tokens.sizing || {},
    typography: tokens.typography || {},
    borders: tokens.borders || {},
    shadows: tokens.shadows || {},
    radii: tokens.radii || {},
    zIndex: tokens.zIndex || {},
    durations: tokens.durations || {},
    easings: tokens.easings || {},
    opacity: tokens.opacity || {},
  }
}

/**
 * Token value with metadata
 */
export interface TokenDefinition<T = TokenValue> {
  value: T
  description?: string
  deprecated?: boolean | string
  type?: string
}

/**
 * Create a token with metadata
 */
export function token<T extends TokenValue>(
  value: T,
  metadata?: Omit<TokenDefinition<T>, 'value'>
): TokenDefinition<T> {
  return { value, ...metadata }
}

/**
 * Design token types
 */
export interface TokenTypes {
  color: string
  dimension: string
  duration: string
  fontFamily: string | string[]
  fontWeight: string | number
  number: number
  string: string
  shadow: string | ShadowValue
  gradient: string
  'cubic-bezier': string
}

export interface ShadowValue {
  x: string
  y: string
  blur: string
  spread: string
  color: string
  inset?: boolean
}

/**
 * Token collection for a specific category
 */
export type TokenCollection<T extends TokenValue = TokenValue> = {
  [key: string]: T | TokenDefinition<T> | TokenCollection<T>
}
