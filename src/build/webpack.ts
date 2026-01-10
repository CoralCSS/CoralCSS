/**
 * Webpack Plugin
 *
 * Webpack plugin for CoralCSS build-time CSS generation.
 * @module build/webpack
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * Webpack plugin options
 */
export interface WebpackPluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['**\/*.{html,jsx,tsx,vue,svelte}']
   */
  include?: string[]

  /**
   * File patterns to exclude
   * @default ['node_modules/**']
   */
  exclude?: string[]

  /**
   * Output CSS file name
   * @default 'coral.css'
   */
  output?: string

  /**
   * Whether to minify CSS in production
   * @default true
   */
  minify?: boolean

  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Custom preset to use
   */
  preset?: 'coral' | 'wind' | 'mini' | 'full'
}

/**
 * Webpack compiler types
 */
interface WebpackCompiler {
  hooks: {
    thisCompilation: {
      tap: (name: string, callback: (compilation: WebpackCompilation) => void) => void
    }
    emit: {
      tapAsync: (
        name: string,
        callback: (compilation: WebpackCompilation, done: () => void) => void
      ) => void
    }
    watchRun: {
      tapAsync: (
        name: string,
        callback: (compiler: WebpackCompiler, done: () => void) => void
      ) => void
    }
  }
  options: {
    mode?: 'production' | 'development' | 'none'
  }
}

interface WebpackCompilation {
  hooks: {
    processAssets: {
      tap: (
        options: { name: string; stage: number },
        callback: (assets: Record<string, WebpackAsset>) => void
      ) => void
    }
  }
  emitAsset: (filename: string, source: WebpackSource) => void
  getAssets: () => Array<{ name: string; source: WebpackAsset }>
}

interface WebpackAsset {
  source: () => string | Buffer
}

interface WebpackSource {
  source: () => string
  size: () => number
}

/**
 * Create Webpack plugin for CoralCSS
 *
 * @example
 * ```javascript
 * // webpack.config.js
 * const { CoralWebpackPlugin } = require('@coral-css/core/webpack')
 *
 * module.exports = {
 *   plugins: [
 *     new CoralWebpackPlugin({
 *       include: ['./src/**\/*.{js,jsx,ts,tsx}'],
 *       darkMode: 'class',
 *     }),
 *   ],
 * }
 * ```
 */
export class CoralWebpackPlugin {
  private options: WebpackPluginOptions
  private coral: Coral | null = null
  private seenClasses: Set<string> = new Set()
  private generatedCSS: string = ''

  constructor(options: WebpackPluginOptions = {}) {
    this.options = {
      include: ['**/*.{html,jsx,tsx,vue,svelte}'],
      exclude: ['node_modules/**'],
      output: 'coral.css',
      minify: true,
      darkMode: 'class',
      preset: 'coral',
      ...options,
    }
  }

  apply(compiler: WebpackCompiler): void {
    const pluginName = 'CoralWebpackPlugin'
    const isProduction = compiler.options.mode === 'production'

    // Initialize Coral
    compiler.hooks.thisCompilation.tap(pluginName, () => {
      if (!this.coral) {
        const { darkMode, ...coralOptions } = this.options
        this.coral = createCoral(coralOptions as CoralOptions)

        // Load preset
        const plugins = coralPreset({ darkMode: darkMode || 'class' })
        plugins.forEach((plugin) => this.coral!.use(plugin))
      }
    })

    // Process assets and emit CSS
    compiler.hooks.emit.tapAsync(pluginName, (compilation, done) => {
      // Extract classes from all JS/TS assets
      const assets = compilation.getAssets()

      for (const asset of assets) {
        if (this.shouldProcessFile(asset.name)) {
          const content = asset.source.source()
          const code = typeof content === 'string' ? content : content.toString('utf-8')
          const classes = this.extractClassesFromCode(code)

          for (const cls of classes) {
            this.seenClasses.add(cls)
          }
        }
      }

      // Generate CSS
      if (this.coral && this.seenClasses.size > 0) {
        const classes = Array.from(this.seenClasses)
        this.generatedCSS = this.coral.generate(classes)

        if (isProduction && this.options.minify) {
          this.generatedCSS = minifyCSS(this.generatedCSS)
        }

        // Emit CSS file
        const outputFilename = this.options.output || 'coral.css'
        compilation.emitAsset(outputFilename, {
          source: () => this.generatedCSS,
          size: () => this.generatedCSS.length,
        })
      }

      done()
    })

    // Reset on watch mode rebuild
    compiler.hooks.watchRun.tapAsync(pluginName, (_compiler, done) => {
      this.seenClasses.clear()
      done()
    })
  }

  private shouldProcessFile(filename: string): boolean {
    const include = this.options.include || []
    const exclude = this.options.exclude || []

    const shouldInclude = include.some((pattern) => {
      const regex = patternToRegex(pattern)
      return regex.test(filename)
    })

    const shouldExclude = exclude.some((pattern) => {
      const regex = patternToRegex(pattern)
      return regex.test(filename)
    })

    return shouldInclude && !shouldExclude
  }

  private extractClassesFromCode(code: string): string[] {
    const classes = new Set<string>()

    // Match class="..." and className="..."
    const classAttrRegex = /(?:class|className)=["']([^"']+)["']/g
    let match

    while ((match = classAttrRegex.exec(code)) !== null) {
      const captured = match[1]
      if (captured) {
        const classList = captured.split(/\s+/)
        classList.forEach((cls) => {
          if (cls) {
            classes.add(cls)
          }
        })
      }
    }

    // Match class={`...`} template literals (JSX)
    const templateRegex = /(?:class|className)=\{`([^`]+)`\}/g
    while ((match = templateRegex.exec(code)) !== null) {
      const content = match[1]
      if (content) {
        // Extract static parts (not ${...})
        const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
        const classList = staticParts.split(/\s+/)
        classList.forEach((cls) => {
          if (cls) {
            classes.add(cls)
          }
        })
      }
    }

    // Match class={cn('...')} or clsx('...')
    const cnRegex = /(?:cn|clsx|cva|classnames)\s*\(\s*["']([^"']+)["']/g
    while ((match = cnRegex.exec(code)) !== null) {
      const captured = match[1]
      if (captured) {
        const classList = captured.split(/\s+/)
        classList.forEach((cls) => {
          if (cls) {
            classes.add(cls)
          }
        })
      }
    }

    return Array.from(classes)
  }
}

/**
 * Webpack loader for CoralCSS
 *
 * @example
 * ```javascript
 * // webpack.config.js
 * module.exports = {
 *   module: {
 *     rules: [
 *       {
 *         test: /\.coral\.css$/,
 *         use: ['@coral-css/core/webpack/loader'],
 *       },
 *     ],
 *   },
 * }
 * ```
 */
export interface CoralLoaderOptions {
  /**
   * Dark mode strategy
   */
  darkMode?: DarkModeStrategy

  /**
   * Additional classes to always include
   */
  safelist?: string[]
}

interface LoaderContext {
  getOptions: () => CoralLoaderOptions
  async: () => (error: Error | null, result?: string) => void
  resourcePath: string
}

export function coralLoader(this: LoaderContext, source: string): void {
  const callback = this.async()
  const options = this.getOptions()

  try {
    const coral = createCoral({})
    const plugins = coralPreset({ darkMode: options.darkMode || 'class' })
    plugins.forEach((plugin) => coral.use(plugin))

    // Extract classes from the source
    const classes = extractClassesFromCSS(source)

    // Add safelist classes
    if (options.safelist) {
      options.safelist.forEach((cls) => classes.push(cls))
    }

    // Generate CSS
    const css = coral.generate(classes)

    callback(null, css)
  } catch (error) {
    callback(error instanceof Error ? error : new Error(String(error)))
  }
}

/**
 * Extract @coral directives and class references from CSS
 */
function extractClassesFromCSS(css: string): string[] {
  const classes: string[] = []

  // Match @coral utilities directive with classes
  const utilitiesRegex = /@coral\s+utilities\s*\{([^}]*)\}/g
  let match

  while ((match = utilitiesRegex.exec(css)) !== null) {
    const content = match[1]
    if (content) {
      const classList = content.trim().split(/\s+/)
      classList.forEach((cls) => {
        if (cls && !cls.startsWith('@')) {
          classes.push(cls)
        }
      })
    }
  }

  // Match @apply directives
  const applyRegex = /@apply\s+([^;]+);/g
  while ((match = applyRegex.exec(css)) !== null) {
    const content = match[1]
    if (content) {
      const classList = content.trim().split(/\s+/)
      classList.forEach((cls) => {
        if (cls) {
          classes.push(cls)
        }
      })
    }
  }

  return classes
}

/**
 * Convert glob pattern to regex
 */
function patternToRegex(pattern: string): RegExp {
  const escaped = pattern
    .replace(/[.+^${}()|[\]\\]/g, '\\$&')
    .replace(/\*\*/g, '{{GLOBSTAR}}')
    .replace(/\*/g, '[^/]*')
    .replace(/\{\{GLOBSTAR\}\}/g, '.*')
  return new RegExp(escaped)
}

/**
 * Simple CSS minification
 */
function minifyCSS(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
    .replace(/\s+/g, ' ') // Collapse whitespace
    .replace(/\s*([{}:;,>+~])\s*/g, '$1') // Remove space around special chars
    .replace(/;}/g, '}') // Remove last semicolon
    .trim()
}

/**
 * Create Webpack plugin (factory function)
 */
export function coralWebpackPlugin(options: WebpackPluginOptions = {}): CoralWebpackPlugin {
  return new CoralWebpackPlugin(options)
}

export default CoralWebpackPlugin
