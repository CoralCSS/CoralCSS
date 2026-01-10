/**
 * Design Token Types
 * @module tokens/types
 */

/**
 * Primitive token value types
 */
export type TokenValue = string | number | boolean | TokenValue[] | { [key: string]: TokenValue }

/**
 * Token reference (points to another token)
 */
export interface TokenReference {
  $ref: string
}

/**
 * Token categories
 */
export type TokenCategory =
  | 'colors'
  | 'spacing'
  | 'sizing'
  | 'typography'
  | 'borders'
  | 'shadows'
  | 'radii'
  | 'zIndex'
  | 'durations'
  | 'easings'
  | 'opacity'

/**
 * Color token structure
 */
export interface ColorTokens {
  // Primitive color scales
  primitives?: {
    [colorName: string]: {
      [shade: string]: string
    }
  }

  // Semantic color assignments
  background?: {
    default?: string | TokenReference
    subtle?: string | TokenReference
    muted?: string | TokenReference
    emphasized?: string | TokenReference
    inverse?: string | TokenReference
    [key: string]: string | TokenReference | undefined
  }

  foreground?: {
    default?: string | TokenReference
    muted?: string | TokenReference
    subtle?: string | TokenReference
    inverse?: string | TokenReference
    [key: string]: string | TokenReference | undefined
  }

  border?: {
    default?: string | TokenReference
    muted?: string | TokenReference
    emphasis?: string | TokenReference
    [key: string]: string | TokenReference | undefined
  }

  accent?: {
    default?: string | TokenReference
    emphasis?: string | TokenReference
    muted?: string | TokenReference
    subtle?: string | TokenReference
    [key: string]: string | TokenReference | undefined
  }

  status?: {
    success?: string | TokenReference
    warning?: string | TokenReference
    error?: string | TokenReference
    info?: string | TokenReference
    [key: string]: string | TokenReference | undefined
  }

  [key: string]: unknown
}

/**
 * Spacing token structure
 */
export interface SpacingTokens {
  [key: string]: string | number
}

/**
 * Sizing token structure
 */
export interface SizingTokens {
  [key: string]: string | number
}

/**
 * Typography token structure
 */
export interface TypographyTokens {
  fontFamily?: {
    sans?: string | string[] | TokenReference
    serif?: string | string[] | TokenReference
    mono?: string | string[] | TokenReference
    display?: string | string[] | TokenReference
    body?: string | string[] | TokenReference
    heading?: string | string[] | TokenReference
    [key: string]: string | string[] | TokenReference | undefined
  }

  fontSize?: {
    [key: string]: string | [string, { lineHeight?: string; letterSpacing?: string; fontWeight?: string | number }]
  }

  fontWeight?: {
    [key: string]: number | string
  }

  lineHeight?: {
    [key: string]: string | number
  }

  letterSpacing?: {
    [key: string]: string
  }
}

/**
 * Border token structure
 */
export interface BorderTokens {
  width?: {
    [key: string]: string
  }

  style?: {
    [key: string]: string
  }

  radius?: {
    [key: string]: string
  }
}

/**
 * Shadow token structure
 */
export interface ShadowTokens {
  [key: string]: string | {
    x: string
    y: string
    blur: string
    spread?: string
    color: string
    inset?: boolean
  }[]
}

/**
 * Duration token structure
 */
export interface DurationTokens {
  [key: string]: string
}

/**
 * Easing token structure
 */
export interface EasingTokens {
  [key: string]: string
}

/**
 * Z-index token structure
 */
export interface ZIndexTokens {
  [key: string]: number
}

/**
 * Opacity token structure
 */
export interface OpacityTokens {
  [key: string]: number | string
}

/**
 * Complete design tokens structure
 */
export interface DesignTokens {
  colors: ColorTokens
  spacing: SpacingTokens
  sizing: SizingTokens
  typography: TypographyTokens
  borders: BorderTokens
  shadows: ShadowTokens
  radii: { [key: string]: string }
  zIndex: ZIndexTokens
  durations: DurationTokens
  easings: EasingTokens
  opacity: OpacityTokens
}

/**
 * Theme variant (light/dark)
 */
export interface ThemeVariant {
  name: string
  tokens: Partial<DesignTokens>
  selector?: string
  mediaQuery?: string
}

/**
 * Complete theme definition
 */
export interface ThemeDefinition {
  name: string
  tokens: DesignTokens
  variants?: ThemeVariant[]
}

/**
 * Token resolution context
 */
export interface TokenContext {
  tokens: DesignTokens
  theme?: string
  colorScheme?: 'light' | 'dark'
}

/**
 * Token transformer function
 */
export type TokenTransformer = (
  value: TokenValue,
  path: string,
  context: TokenContext
) => TokenValue

/**
 * Token output format
 */
export type TokenOutputFormat = 'css' | 'scss' | 'json' | 'js' | 'ts'

/**
 * Token generation options
 */
export interface TokenGenerationOptions {
  format?: TokenOutputFormat
  prefix?: string
  selector?: string
  includeComments?: boolean
  categorize?: boolean
}
