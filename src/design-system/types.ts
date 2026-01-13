/**
 * Design System Types
 *
 * Type definitions for Style Dictionary and Figma integration.
 *
 * @module design-system/types
 */

/**
 * Style Dictionary Token Format (DTCG compliant)
 * Following W3C Design Tokens Community Group specification
 */
export interface StyleDictionaryToken {
  $value: string | number | boolean | object
  $type?: TokenType
  $description?: string
  $deprecated?: boolean | string
  $extensions?: {
    [key: string]: unknown
    'com.figma'?: FigmaExtension
    'com.coralcss'?: CoralExtension
  }
}

/**
 * Token types per DTCG specification
 */
export type TokenType =
  | 'color'
  | 'dimension'
  | 'fontFamily'
  | 'fontWeight'
  | 'fontStyle'
  | 'number'
  | 'duration'
  | 'cubicBezier'
  | 'shadow'
  | 'strokeStyle'
  | 'border'
  | 'transition'
  | 'gradient'
  | 'typography'
  | 'spacing'
  | 'sizing'
  | 'borderRadius'
  | 'opacity'

/**
 * Figma Token Extension
 */
export interface FigmaExtension {
  hiddenFromPublishing?: boolean
  scopes?: FigmaScope[]
  codeSyntax?: Record<string, string>
  variableId?: string
  styleId?: string
}

/**
 * Figma Variable Scopes
 */
export type FigmaScope =
  | 'ALL_SCOPES'
  | 'TEXT_CONTENT'
  | 'CORNER_RADIUS'
  | 'WIDTH_HEIGHT'
  | 'GAP'
  | 'ALL_FILLS'
  | 'FRAME_FILL'
  | 'SHAPE_FILL'
  | 'TEXT_FILL'
  | 'STROKE_COLOR'
  | 'EFFECT_COLOR'

/**
 * CoralCSS Token Extension
 */
export interface CoralExtension {
  utility?: string
  variants?: string[]
  responsive?: boolean
  darkMode?: boolean
  cssProperty?: string | string[]
  pluginName?: string
}

/**
 * Token Group (container for tokens)
 */
export interface TokenGroup {
  [key: string]: StyleDictionaryToken | TokenGroup
}

/**
 * Complete Design Token File
 */
export interface DesignTokenFile {
  $name?: string
  $description?: string
  $version?: string
  [key: string]: StyleDictionaryToken | TokenGroup | string | undefined
}

/**
 * Style Dictionary Build Configuration
 */
export interface StyleDictionaryConfig {
  source: string[]
  platforms: Record<string, PlatformConfig>
  hooks?: {
    transformGroups?: Record<string, string[]>
    transforms?: Record<string, TransformConfig>
    formats?: Record<string, FormatConfig>
    actions?: Record<string, ActionConfig>
    filters?: Record<string, FilterConfig>
  }
}

/**
 * Platform Configuration
 */
export interface PlatformConfig {
  transformGroup?: string
  transforms?: string[]
  buildPath: string
  prefix?: string
  files: FileConfig[]
  options?: Record<string, unknown>
}

/**
 * File Configuration
 */
export interface FileConfig {
  destination: string
  format: string
  filter?: string | FilterFunction
  options?: Record<string, unknown>
}

/**
 * Transform Configuration
 */
export interface TransformConfig {
  type: 'attribute' | 'name' | 'value'
  transitive?: boolean
  filter?: FilterFunction
  transform: (token: ProcessedToken, config: PlatformConfig) => unknown
}

/**
 * Format Configuration
 */
export interface FormatConfig {
  format: (args: {
    dictionary: TokenDictionary
    platform: PlatformConfig
    file: FileConfig
    options: Record<string, unknown>
  }) => string
}

/**
 * Action Configuration
 */
export interface ActionConfig {
  do: (dictionary: TokenDictionary, config: PlatformConfig) => void
  undo?: (dictionary: TokenDictionary, config: PlatformConfig) => void
}

/**
 * Filter Configuration
 */
export interface FilterConfig {
  filter: FilterFunction
}

/**
 * Filter Function
 */
export type FilterFunction = (token: ProcessedToken) => boolean

/**
 * Processed Token (after transforms)
 */
export interface ProcessedToken {
  name: string
  value: string | number | boolean | object
  original: StyleDictionaryToken
  path: string[]
  attributes?: Record<string, string>
  filePath?: string
}

/**
 * Token Dictionary
 */
export interface TokenDictionary {
  tokens: Record<string, ProcessedToken>
  allTokens: ProcessedToken[]
  unfilteredTokens: ProcessedToken[]
  usesReference: (value: string) => boolean
  getReferences: (value: string) => ProcessedToken[]
}

/**
 * Figma Token File (Tokens Studio format)
 */
export interface FigmaTokenFile {
  [collectionName: string]: FigmaTokenCollection
}

/**
 * Figma Token Collection
 */
export interface FigmaTokenCollection {
  [tokenName: string]: FigmaToken | FigmaTokenCollection
}

/**
 * Figma Token (Tokens Studio format)
 */
export interface FigmaToken {
  value: string | number | Record<string, unknown>
  type: FigmaTokenType
  description?: string
}

/**
 * Figma Token Types (Tokens Studio)
 */
export type FigmaTokenType =
  | 'color'
  | 'borderRadius'
  | 'borderWidth'
  | 'sizing'
  | 'spacing'
  | 'opacity'
  | 'fontFamilies'
  | 'fontWeights'
  | 'fontSizes'
  | 'lineHeights'
  | 'letterSpacing'
  | 'paragraphSpacing'
  | 'textCase'
  | 'textDecoration'
  | 'typography'
  | 'boxShadow'
  | 'composition'
  | 'dimension'
  | 'other'

/**
 * Platform Output Targets
 */
export type PlatformTarget =
  | 'web'
  | 'web-scss'
  | 'web-css-vars'
  | 'web-js'
  | 'web-ts'
  | 'ios'
  | 'ios-swift'
  | 'android'
  | 'android-compose'
  | 'react-native'
  | 'flutter'
  | 'figma'

/**
 * Build Options
 */
export interface BuildOptions {
  platforms?: PlatformTarget[]
  outputDir?: string
  prefix?: string
  includeDeprecated?: boolean
  sourceMaps?: boolean
  minify?: boolean
  watch?: boolean
}

/**
 * Token Validation Result
 */
export interface ValidationResult {
  valid: boolean
  errors: ValidationError[]
  warnings: ValidationWarning[]
}

/**
 * Validation Error
 */
export interface ValidationError {
  path: string
  message: string
  type: 'missing-value' | 'invalid-type' | 'invalid-reference' | 'circular-reference' | 'schema-error'
}

/**
 * Validation Warning
 */
export interface ValidationWarning {
  path: string
  message: string
  type: 'deprecated' | 'unused' | 'naming-convention' | 'accessibility'
}
