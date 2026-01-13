/**
 * Migration Types
 *
 * Type definitions for the migration module.
 * @module migration/types
 */

/**
 * Migration mode
 */
export type MigrationMode = 'dry-run' | 'apply' | 'interactive'

/**
 * Migration source framework
 */
export type MigrationSource = 'tailwind' | 'bootstrap' | 'bulma' | 'unocss'

/**
 * File type for migration
 */
export type FileType = 'html' | 'jsx' | 'tsx' | 'vue' | 'svelte' | 'config' | 'css' | 'postcss'

/**
 * Migration options
 */
export interface MigrationOptions {
  /** Source framework */
  source: MigrationSource
  /** Migration mode */
  mode: MigrationMode
  /** Source directory */
  sourceDir: string
  /** Output directory (for dry-run reports) */
  outputDir?: string
  /** File patterns to include */
  include?: string[]
  /** File patterns to exclude */
  exclude?: string[]
  /** Whether to backup original files */
  backup?: boolean
  /** Whether to preserve comments */
  preserveComments?: boolean
  /** Custom class mappings */
  customMappings?: Record<string, string>
  /** Whether to use Wind preset for compatibility */
  useWindPreset?: boolean
  /** Verbose output */
  verbose?: boolean
}

/**
 * Class mapping result
 */
export interface ClassMapping {
  /** Original class name */
  original: string
  /** Mapped class name (null if no change) */
  mapped: string | null
  /** Whether the class is deprecated */
  deprecated?: boolean
  /** Replacement suggestion if deprecated */
  replacement?: string
  /** Warning message */
  warning?: string
  /** Whether class is fully compatible */
  compatible: boolean
}

/**
 * File analysis result
 */
export interface FileAnalysis {
  /** File path */
  filePath: string
  /** File type */
  fileType: FileType
  /** Total classes found */
  totalClasses: number
  /** Compatible classes count */
  compatibleClasses: number
  /** Incompatible classes */
  incompatibleClasses: ClassMapping[]
  /** Deprecated classes */
  deprecatedClasses: ClassMapping[]
  /** Warnings */
  warnings: string[]
  /** Suggestions */
  suggestions: string[]
}

/**
 * Migration report
 */
export interface MigrationReport {
  /** Source framework */
  source: MigrationSource
  /** Total files analyzed */
  totalFiles: number
  /** Files with changes needed */
  filesWithChanges: number
  /** Total classes analyzed */
  totalClasses: number
  /** Compatible classes (percentage) */
  compatibilityRate: number
  /** File analyses */
  files: FileAnalysis[]
  /** Config migration needed */
  configMigration: ConfigMigration | null
  /** Build tool migration needed */
  buildToolMigration: BuildToolMigration | null
  /** Overall suggestions */
  suggestions: string[]
  /** Estimated migration effort (1-10) */
  effort: number
}

/**
 * Config migration details
 */
export interface ConfigMigration {
  /** Original config file */
  originalFile: string
  /** New config file name */
  newFile: string
  /** Config transformations */
  transformations: ConfigTransformation[]
  /** Generated config content */
  generatedConfig: string
}

/**
 * Config transformation
 */
export interface ConfigTransformation {
  /** Property path */
  path: string
  /** Original value */
  original: unknown
  /** New value */
  transformed: unknown
  /** Transformation type */
  type: 'rename' | 'restructure' | 'remove' | 'add'
  /** Notes */
  notes?: string
}

/**
 * Build tool migration
 */
export interface BuildToolMigration {
  /** Build tool type */
  tool: 'vite' | 'webpack' | 'postcss' | 'esbuild' | 'rollup'
  /** Original config */
  originalConfig: string
  /** New config */
  newConfig: string
  /** Changes needed */
  changes: string[]
}

/**
 * Migration result
 */
export interface MigrationResult {
  /** Whether migration was successful */
  success: boolean
  /** Migration report */
  report: MigrationReport
  /** Files modified */
  modifiedFiles: string[]
  /** Backup files created */
  backupFiles: string[]
  /** Errors encountered */
  errors: MigrationError[]
}

/**
 * Migration error
 */
export interface MigrationError {
  /** Error type */
  type: 'parse' | 'transform' | 'write' | 'config'
  /** File path */
  filePath?: string
  /** Error message */
  message: string
  /** Stack trace */
  stack?: string
}

/**
 * Tailwind config structure (partial)
 */
export interface TailwindConfig {
  content?: string[]
  darkMode?: 'class' | 'media' | ['class', string]
  theme?: {
    extend?: Record<string, unknown>
    colors?: Record<string, unknown>
    spacing?: Record<string, string>
    screens?: Record<string, string>
    fontFamily?: Record<string, string[]>
    fontSize?: Record<string, string | [string, string]>
  }
  plugins?: unknown[]
  prefix?: string
  important?: boolean | string
  separator?: string
  safelist?: (string | { pattern: RegExp })[]
}

/**
 * CoralCSS config structure (partial)
 */
export interface CoralConfig {
  plugins?: unknown[]
  theme?: Record<string, unknown>
  content?: string[]
  darkMode?: 'class' | 'media' | 'selector' | 'auto'
  prefix?: string
}
