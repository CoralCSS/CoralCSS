/**
 * SvelteKit Integration
 *
 * SvelteKit plugin for CoralCSS integration.
 * Provides automatic CSS injection, HMR support, and Svelte-specific class extraction.
 * @module build/sveltekit
 */

import type { Plugin as VitePlugin } from 'vite'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'

/**
 * SvelteKit plugin options
 */
export interface SvelteKitPluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['src/**\/*.{svelte,js,ts}']
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

  /**
   * Output CSS file path
   * @default 'virtual:coral.css'
   */
  output?: string

  /**
   * Enable preprocessor for @apply in <style> blocks
   * @default true
   */
  preprocessor?: boolean
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

/**
 * Create SvelteKit Vite plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // vite.config.ts
 * import { sveltekit } from '@sveltejs/kit/vite'
 * import { coralSvelteKit } from '@coral-css/core/sveltekit'
 *
 * export default defineConfig({
 *   plugins: [
 *     sveltekit(),
 *     coralSvelteKit({
 *       darkMode: 'class',
 *     }),
 *   ],
 * })
 * ```
 */
export function coralSvelteKit(options: SvelteKitPluginOptions = {}): VitePlugin {
  const {
    include = ['src/**/*.{svelte,js,ts}'],
    exclude = ['node_modules/**'],
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    output = VIRTUAL_MODULE_ID,
    preprocessor: _preprocessor = true,
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let generatedCSS = ''
  let isProduction = false

  return {
    name: 'coral-sveltekit',
    enforce: 'pre',

    configResolved(config) {
      isProduction = config.command === 'build' || config.mode === 'production'

      // Initialize Coral
      coral = createCoral(coralOptions)
      const plugins = coralPreset({ darkMode })
      plugins.forEach((plugin) => coral.use(plugin))
    },

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID || id === output) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        return generatedCSS || '/* CoralCSS - No classes found */'
      }
    },

    transform(code, id) {
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

      // Extract classes from code (Svelte-specific)
      const newClasses = id.endsWith('.svelte')
        ? extractClassesFromSvelte(code)
        : extractClassesFromCode(code)

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

        if (isProduction && minify) {
          generatedCSS = minifyCSS(generatedCSS)
        }
      }

      return null
    },

    handleHotUpdate({ file, server }) {
      // Check if file should trigger CSS regeneration
      const shouldProcess = include.some((pattern) => {
        const regex = new RegExp(pattern.replace(/\*\*/g, '.*').replace(/\*/g, '[^/]*'))
        return regex.test(file)
      })

      if (shouldProcess) {
        // Invalidate virtual module to trigger reload
        const module = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID)
        if (module) {
          server.moduleGraph.invalidateModule(module)
          return [module]
        }
      }
    },
  }
}

/**
 * Extract classes from Svelte components
 */
function extractClassesFromSvelte(code: string): string[] {
  const classes = new Set<string>()

  // Match class="..." and class:name={condition}
  const classAttrRegex = /class=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls && !cls.includes('{')) {
          classes.add(cls)
        }
      })
    }
  }

  // Match class={`...`} template literals
  const templateRegex = /class=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      const classList = staticParts.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match class:name={condition} directive
  const classDirectiveRegex = /class:([a-zA-Z0-9_-]+)(?:=\{[^}]+\})?/g
  while ((match = classDirectiveRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      classes.add(captured)
    }
  }

  // Match class={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames|twMerge)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      const classList = captured.split(/\s+/)
      classList.forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match @apply directive in <style> blocks
  const styleBlockRegex = /<style[^>]*>([\s\S]*?)<\/style>/g
  while ((match = styleBlockRegex.exec(code)) !== null) {
    const styleContent = match[1]
    if (styleContent) {
      const applyRegex = /@apply\s+([^;]+);/g
      let applyMatch
      while ((applyMatch = applyRegex.exec(styleContent)) !== null) {
        const captured = applyMatch[1]
        if (captured) {
          captured.split(/\s+/).forEach((cls) => {
            if (cls) { classes.add(cls) }
          })
        }
      }
    }
  }

  // Match classes in {#each} and {#if} blocks
  const eachBlockRegex = /\{#(?:each|if)[^}]+\}([\s\S]*?)\{\/(?:each|if)\}/g
  while ((match = eachBlockRegex.exec(code)) !== null) {
    const blockContent = match[1]
    if (blockContent) {
      const innerClasses = extractClassesFromSvelte(blockContent)
      innerClasses.forEach((cls) => classes.add(cls))
    }
  }

  // Match ternary class expressions class={isActive ? 'active' : 'inactive'}
  const ternaryRegex = /class=\{[^?]+\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']\s*\}/g
  while ((match = ternaryRegex.exec(code)) !== null) {
    const [, trueClass, falseClass] = match
    if (trueClass) {
      trueClass.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
    if (falseClass) {
      falseClass.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  return Array.from(classes)
}

/**
 * Extract classes from regular JS/TS code
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

  // Match class={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames|twMerge)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
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
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Create Svelte preprocessor for @apply support
 *
 * @example
 * ```typescript
 * // svelte.config.js
 * import { coralPreprocessor } from '@coral-css/core/sveltekit'
 *
 * export default {
 *   preprocess: [
 *     coralPreprocessor(),
 *     vitePreprocess(),
 *   ],
 * }
 * ```
 */
export interface SveltePreprocessor {
  name: string
  style: (options: {
    content: string
    filename: string
    attributes: Record<string, string>
  }) => Promise<{ code: string; map?: string } | undefined> | { code: string; map?: string } | undefined
}

export function coralPreprocessor(options: Partial<CoralOptions> = {}): SveltePreprocessor {
  let coral: Coral

  // Initialize Coral
  coral = createCoral(options)
  const plugins = coralPreset({ darkMode: options.darkMode as DarkModeStrategy || 'class' })
  plugins.forEach((plugin) => coral.use(plugin))

  return {
    name: 'coral-preprocessor',

    style({ content, filename: _filename, attributes }) {
      // Only process lang="postcss" or no lang
      if (attributes.lang && attributes.lang !== 'postcss' && attributes.lang !== 'css') {
        return undefined
      }

      // Check for @apply directives
      if (!content.includes('@apply')) {
        return undefined
      }

      // Process @apply directives
      let processed = content
      const applyRegex = /@apply\s+([^;]+);/g
      let match

      while ((match = applyRegex.exec(content)) !== null) {
        const captured = match[1]
        if (captured) {
          const classes = captured.split(/\s+/).filter(Boolean)
          const css = coral.generate(classes)

          // Extract just the properties from the generated CSS
          const propsMatch = css.match(/\{([^}]+)\}/)
          if (propsMatch && propsMatch[1]) {
            const props = propsMatch[1].trim()
            processed = processed.replace(match[0], props)
          }
        }
      }

      return {
        code: processed,
      }
    },
  }
}

/**
 * SvelteKit hooks for server-side rendering
 *
 * @example
 * ```typescript
 * // src/hooks.server.ts
 * import { createCoralHandle } from '@coral-css/core/sveltekit'
 *
 * export const handle = createCoralHandle()
 * ```
 */
export interface SvelteKitHandle {
  (options: {
    event: { request: Request; url: URL; locals: Record<string, unknown> }
    resolve: (
      event: unknown,
      opts?: { transformPageChunk?: (options: { html: string }) => string }
    ) => Promise<Response>
  }): Promise<Response>
}

export function createCoralHandle(options: SvelteKitPluginOptions = {}): SvelteKitHandle {
  const { darkMode = 'class' } = options

  return async ({ event, resolve }) => {
    // Detect dark mode preference from cookies or headers
    const cookies = event.request.headers.get('cookie') || ''
    const prefersDark = cookies.includes('coral-dark-mode=dark')
    const systemDark = event.request.headers.get('sec-ch-prefers-color-scheme') === 'dark'

    // Set locals for use in components
    event.locals.darkMode = prefersDark || (darkMode === 'auto' && systemDark)

    const response = await resolve(event, {
      transformPageChunk: ({ html }) => {
        // Add dark class to html if needed
        if (event.locals.darkMode && darkMode === 'class') {
          html = html.replace('<html', '<html class="dark"')
        }
        return html
      },
    })

    return response
  }
}

/**
 * Svelte store for dark mode
 */
export const darkModeStore = `
import { writable, derived } from 'svelte/store'
import { browser } from '$app/environment'

function createDarkModeStore() {
  const stored = browser ? localStorage.getItem('coral-dark-mode') : null
  const prefersDark = browser ? window.matchMedia('(prefers-color-scheme: dark)').matches : false
  const initial = stored ? stored === 'dark' : prefersDark

  const { subscribe, set, update } = writable(initial)

  return {
    subscribe,
    toggle: () => update((dark) => {
      const newValue = !dark
      if (browser) {
        localStorage.setItem('coral-dark-mode', newValue ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', newValue)
      }
      return newValue
    }),
    set: (value: boolean) => {
      set(value)
      if (browser) {
        localStorage.setItem('coral-dark-mode', value ? 'dark' : 'light')
        document.documentElement.classList.toggle('dark', value)
      }
    },
  }
}

export const darkMode = createDarkModeStore()
`

/**
 * Svelte action for class manipulation
 */
export const classAction = `
export function coral(node: HTMLElement, classes: string | string[]) {
  const classList = Array.isArray(classes) ? classes : classes.split(/\\s+/)

  classList.forEach((cls) => {
    if (cls) node.classList.add(cls)
  })

  return {
    update(newClasses: string | string[]) {
      // Remove old classes
      classList.forEach((cls) => {
        if (cls) node.classList.remove(cls)
      })

      // Add new classes
      const newList = Array.isArray(newClasses) ? newClasses : newClasses.split(/\\s+/)
      newList.forEach((cls) => {
        if (cls) node.classList.add(cls)
      })

      classList.length = 0
      classList.push(...newList)
    },
    destroy() {
      classList.forEach((cls) => {
        if (cls) node.classList.remove(cls)
      })
    },
  }
}
`

/**
 * Type definitions for SvelteKit app.d.ts
 */
export const svelteKitTypes = `
// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Locals {
      darkMode?: boolean
    }
  }
}

export {}
`

export default coralSvelteKit
