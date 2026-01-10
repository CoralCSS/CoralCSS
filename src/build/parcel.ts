/**
 * Parcel Plugin
 *
 * Parcel plugin for CoralCSS build-time CSS generation.
 * Implements Parcel's transformer and resolver plugin interfaces.
 * @module build/parcel
 */

import type { Coral, CoralOptions, DarkModeStrategy } from '../types'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'

/**
 * Parcel plugin options
 */
export interface ParcelPluginOptions extends Partial<CoralOptions> {
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
 * Parcel Transformer interface (simplified)
 */
export interface ParcelTransformer {
  name: string
  loadConfig?: (options: { config: unknown }) => Promise<ParcelPluginOptions>
  transform?: (options: {
    asset: {
      type: string
      getCode: () => Promise<string>
      filePath: string
      setCode: (code: string) => void
      addDependency: (dep: { specifier: string; specifierType: string }) => void
    }
    config: ParcelPluginOptions
  }) => Promise<unknown[]>
}

/**
 * Parcel Resolver interface (simplified)
 */
export interface ParcelResolver {
  name: string
  resolve?: (options: {
    specifier: string
    dependency: { specifierType: string }
    options: { projectRoot: string }
  }) => Promise<{ filePath: string } | null>
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const CORAL_CSS_PATH = '/.coral/coral.css'

/**
 * Create Parcel transformer for CoralCSS
 *
 * @example
 * ```javascript
 * // .parcelrc
 * {
 *   "extends": "@parcel/config-default",
 *   "transformers": {
 *     "*.{js,jsx,ts,tsx,vue,svelte}": ["@coral-css/parcel-transformer", "..."]
 *   }
 * }
 * ```
 */
export function createCoralTransformer(options: ParcelPluginOptions = {}): ParcelTransformer {
  const {
    include = ['**/*.{html,jsx,tsx,vue,svelte,astro}'],
    exclude = ['node_modules/**'],
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let generatedCSS = ''

  // Initialize Coral
  coral = createCoral(coralOptions)
  const plugins = coralPreset({ darkMode })
  plugins.forEach((plugin) => coral.use(plugin))

  return {
    name: 'coral-parcel-transformer',

    async loadConfig({ config: _config }) {
      // Load config from package.json or coral.config.js
      return options
    },

    async transform({ asset, config: _config }) {
      // Check if file should be processed
      const filePath = asset.filePath

      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(filePath)
      })

      const shouldExclude = exclude.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(filePath)
      })

      if (!shouldProcess || shouldExclude) {
        return []
      }

      // Get source code
      const code = await asset.getCode()

      // Extract classes
      const newClasses = extractClassesFromCode(code)
      let hasNewClasses = false

      for (const cls of newClasses) {
        if (!seenClasses.has(cls)) {
          seenClasses.add(cls)
          hasNewClasses = true
        }
      }

      // Regenerate CSS if new classes found
      if (hasNewClasses) {
        const classes = Array.from(seenClasses)
        generatedCSS = coral.generate(classes)

        if (minify) {
          generatedCSS = minifyCSS(generatedCSS)
        }
      }

      // Add dependency on virtual CSS module
      if (hasNewClasses) {
        asset.addDependency({
          specifier: VIRTUAL_MODULE_ID,
          specifierType: 'esm',
        })
      }

      return []
    },
  }
}

/**
 * Create Parcel resolver for CoralCSS virtual module
 *
 * @example
 * ```javascript
 * // .parcelrc
 * {
 *   "extends": "@parcel/config-default",
 *   "resolvers": ["@coral-css/parcel-resolver", "..."]
 * }
 * ```
 */
export function createCoralResolver(options: ParcelPluginOptions = {}): ParcelResolver {
  const {
    minify = true,
    darkMode = 'class',
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()

  // Initialize Coral
  coral = createCoral(coralOptions)
  const plugins = coralPreset({ darkMode })
  plugins.forEach((plugin) => coral.use(plugin))

  return {
    name: 'coral-parcel-resolver',

    async resolve({ specifier, dependency: _dependency, options: resolveOptions }) {
      if (specifier === VIRTUAL_MODULE_ID) {
        return {
          filePath: `${resolveOptions.projectRoot}${CORAL_CSS_PATH}`,
        }
      }
      return null
    },
  }
}

/**
 * Create Parcel namer for CoralCSS (controls output file naming)
 */
export interface ParcelNamer {
  name: string
  getName?: (options: {
    bundle: { type: string; getMainEntry: () => { filePath: string } | null }
  }) => Promise<string | null>
}

export function createCoralNamer(): ParcelNamer {
  return {
    name: 'coral-parcel-namer',

    async getName({ bundle }) {
      if (bundle.type === 'css') {
        const mainEntry = bundle.getMainEntry()
        if (mainEntry && mainEntry.filePath.includes('.coral')) {
          return 'coral.css'
        }
      }
      return null
    },
  }
}

/**
 * Parcel plugin factory - creates all necessary Parcel plugins
 *
 * @example
 * ```javascript
 * // coral.config.js
 * module.exports = {
 *   darkMode: 'class',
 *   minify: true,
 * }
 *
 * // .parcelrc
 * {
 *   "extends": "@parcel/config-default",
 *   "transformers": {
 *     "*.{js,jsx,ts,tsx}": ["@coral-css/parcel/transformer", "..."]
 *   },
 *   "resolvers": ["@coral-css/parcel/resolver", "..."]
 * }
 * ```
 */
export function coralParcelPlugin(options: ParcelPluginOptions = {}): {
  transformer: ParcelTransformer
  resolver: ParcelResolver
  namer: ParcelNamer
} {
  return {
    transformer: createCoralTransformer(options),
    resolver: createCoralResolver(options),
    namer: createCoralNamer(),
  }
}

/**
 * Standalone class for use with Parcel's plugin system
 *
 * @example
 * ```typescript
 * // parcel-transformer-coral/index.js
 * const { Transformer } = require('@parcel/plugin')
 * const { CoralParcelTransformer } = require('@coral-css/core/parcel')
 *
 * module.exports = new Transformer({
 *   async transform({ asset, config }) {
 *     const transformer = new CoralParcelTransformer(config)
 *     return transformer.transform(asset)
 *   },
 * })
 * ```
 */
export class CoralParcelTransformer {
  private coral: Coral
  private seenClasses = new Set<string>()
  private options: ParcelPluginOptions

  constructor(options: ParcelPluginOptions = {}) {
    this.options = {
      include: ['**/*.{html,jsx,tsx,vue,svelte,astro}'],
      exclude: ['node_modules/**'],
      minify: true,
      darkMode: 'class',
      preset: 'coral',
      ...options,
    }

    this.coral = createCoral(options)
    const plugins = coralPreset({ darkMode: this.options.darkMode })
    plugins.forEach((plugin) => this.coral.use(plugin))
  }

  async transform(asset: {
    type: string
    getCode: () => Promise<string>
    filePath: string
    setCode: (code: string) => void
    addDependency: (dep: { specifier: string; specifierType: string }) => void
  }): Promise<unknown[]> {
    const { include = [], exclude = [] } = this.options
    const filePath = asset.filePath

    const shouldProcess = include.some((pattern) => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
      return regex.test(filePath)
    })

    const shouldExclude = exclude.some((pattern) => {
      const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
      return regex.test(filePath)
    })

    if (!shouldProcess || shouldExclude) {
      return []
    }

    const code = await asset.getCode()
    const newClasses = extractClassesFromCode(code)
    let hasNewClasses = false

    for (const cls of newClasses) {
      if (!this.seenClasses.has(cls)) {
        this.seenClasses.add(cls)
        hasNewClasses = true
      }
    }

    if (hasNewClasses) {
      asset.addDependency({
        specifier: VIRTUAL_MODULE_ID,
        specifierType: 'esm',
      })
    }

    return []
  }

  generateCSS(): string {
    const classes = Array.from(this.seenClasses)
    let css = this.coral.generate(classes)

    if (this.options.minify) {
      css = minifyCSS(css)
    }

    return css
  }

  addClass(className: string): void {
    this.seenClasses.add(className)
  }

  addClasses(classNames: string[]): void {
    classNames.forEach((cls) => this.seenClasses.add(cls))
  }

  getClasses(): string[] {
    return Array.from(this.seenClasses)
  }
}

/**
 * Extract classes from code
 */
function extractClassesFromCode(code: string): string[] {
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

  // Match @apply directive in CSS
  const applyRegex = /@apply\s+([^;]+);/g
  while ((match = applyRegex.exec(code)) !== null) {
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
 * Create runtime injector for development mode
 */
export function createDevInjector(): string {
  return `
(function() {
  if (typeof window === 'undefined') return;

  const style = document.createElement('style');
  style.id = 'coral-dev-styles';
  document.head.appendChild(style);

  // Hot reload support
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
      const existing = document.getElementById('coral-dev-styles');
      if (existing) existing.remove();
    });
  }
})();
`
}

export default coralParcelPlugin
