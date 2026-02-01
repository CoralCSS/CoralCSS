/**
 * Rollup Plugin
 *
 * Rollup plugin for CoralCSS build-time CSS generation.
 * @module build/rollup
 */

import type { Plugin as RollupPlugin, PluginContext, TransformResult } from 'rollup'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * Rollup plugin options
 */
export interface RollupPluginOptions extends Partial<CoralOptions> {
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
   * Output CSS file path
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

  /**
   * Whether to emit CSS as a separate file or inject inline
   * @default 'file'
   */
  mode?: 'file' | 'inject'

  /**
   * CSS file name for emitted asset
   * @default 'coral.css'
   */
  fileName?: string
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const RESOLVED_VIRTUAL_MODULE_ID = '\0virtual:coral.css'

/**
 * Create Rollup plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // rollup.config.js
 * import coral from '@coral-css/core/rollup'
 *
 * export default {
 *   input: 'src/index.js',
 *   plugins: [
 *     coral({
 *       darkMode: 'class',
 *       output: 'dist/coral.css',
 *     }),
 *   ],
 *   output: {
 *     dir: 'dist',
 *     format: 'esm',
 *   },
 * }
 * ```
 */
export function coralRollupPlugin(options: RollupPluginOptions = {}): RollupPlugin {
  const {
    include = ['**/*.{html,jsx,tsx,vue,svelte,astro}'],
    exclude = ['node_modules/**'],
    output = 'coral.css',
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    mode = 'file',
    fileName = 'coral.css',
    ...coralOptions
  } = options

  const coral: Coral = createCoral(coralOptions)
  const seenClasses = new Set<string>()
  let generatedCSS = ''
  const plugins = coralPreset({ darkMode })
  plugins.forEach((plugin) => coral.use(plugin))

  return {
    name: 'coral-rollup',

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID || id === output) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
      return null
    },

    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generatedCSS || '/* CoralCSS - No classes found */'
      }
      return null
    },

    transform(code: string, id: string): TransformResult {
      // Check if file should be processed
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      const shouldExclude = exclude.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      if (!shouldProcess || shouldExclude) {
        return null
      }

      // Extract classes from code
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

      return null
    },

    generateBundle(this: PluginContext) {
      // Generate final CSS
      if (seenClasses.size > 0) {
        const classes = Array.from(seenClasses)
        generatedCSS = coral.generate(classes)

        if (minify) {
          generatedCSS = minifyCSS(generatedCSS)
        }
      }

      if (mode === 'file' && generatedCSS) {
        // Emit CSS as a separate file
        this.emitFile({
          type: 'asset',
          fileName,
          source: generatedCSS,
        })
      }
    },

    // Watch mode support
    watchChange(id: string) {
      // Check if file should trigger CSS regeneration
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(id)
      })

      if (shouldProcess) {
        // File changed, will be re-transformed
        return
      }
    },
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
        if (cls) { classes.add(cls) }
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
        if (cls) { classes.add(cls) }
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
        if (cls) { classes.add(cls) }
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
        if (cls) { classes.add(cls) }
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
 * Create a CSS injection helper for inject mode
 */
export function createCSSInjector(css: string): string {
  return `
(function() {
  var style = document.createElement('style');
  style.textContent = ${JSON.stringify(css)};
  document.head.appendChild(style);
})();
`
}

export default coralRollupPlugin
