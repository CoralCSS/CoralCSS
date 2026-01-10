/**
 * Astro Integration
 *
 * Astro integration for CoralCSS.
 * Supports Astro components, Islands architecture, and SSR.
 *
 * @module build/astro
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'

/**
 * Astro integration options
 */
export interface AstroIntegrationOptions {
  /**
   * File patterns to scan for classes
   * @default ['./src/**\/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}']
   */
  content?: string[]

  /**
   * Dark mode strategy
   * @default 'class'
   */
  darkMode?: DarkModeStrategy

  /**
   * Whether to minify CSS in production
   * @default true
   */
  minify?: boolean

  /**
   * Additional classes to always include
   */
  safelist?: string[]

  /**
   * Whether to include base reset styles
   * @default true
   */
  base?: boolean

  /**
   * Whether to apply styles automatically via injection
   * @default true
   */
  applyBaseStyles?: boolean

  /**
   * Additional CoralCSS options
   */
  coralOptions?: Partial<CoralOptions>
}

/**
 * Astro integration types
 */
interface AstroIntegration {
  name: string
  hooks: {
    'astro:config:setup'?: (options: AstroConfigSetupOptions) => void | Promise<void>
    'astro:config:done'?: (options: AstroConfigDoneOptions) => void | Promise<void>
    'astro:build:start'?: () => void | Promise<void>
    'astro:build:done'?: (options: AstroBuildDoneOptions) => void | Promise<void>
    'astro:server:setup'?: (options: AstroServerSetupOptions) => void | Promise<void>
  }
}

interface AstroConfigSetupOptions {
  config: AstroConfig
  command: 'dev' | 'build' | 'preview'
  isRestart: boolean
  updateConfig: (newConfig: Partial<AstroConfig>) => void
  addRenderer: (renderer: unknown) => void
  addWatchFile: (path: string) => void
  injectScript: (stage: 'head-inline' | 'before-hydration' | 'page' | 'page-ssr', content: string) => void
  injectRoute: (options: { pattern: string; entrypoint: string }) => void
}

interface AstroConfigDoneOptions {
  config: AstroConfig
}

interface AstroBuildDoneOptions {
  pages: Map<string, { pathname: string }>
  dir: URL
  routes: AstroRoute[]
}

interface AstroServerSetupOptions {
  server: {
    middlewares: {
      use: (middleware: unknown) => void
    }
  }
}

interface AstroConfig {
  root: URL
  srcDir: URL
  publicDir: URL
  outDir: URL
  build: {
    assets: string
    format: 'file' | 'directory'
  }
  vite: ViteConfig
}

interface ViteConfig {
  plugins?: unknown[]
  css?: {
    postcss?: unknown
  }
  [key: string]: unknown
}

interface AstroRoute {
  route: string
  pathname?: string
  type: 'page' | 'endpoint' | 'redirect'
}

/**
 * Create Astro integration for CoralCSS
 *
 * @example
 * ```javascript
 * // astro.config.mjs
 * import { defineConfig } from 'astro/config'
 * import coral from '@coral-css/core/astro'
 *
 * export default defineConfig({
 *   integrations: [
 *     coral({
 *       darkMode: 'class',
 *       content: ['./src/**\/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
 *     }),
 *   ],
 * })
 * ```
 */
export function coralAstroIntegration(options: AstroIntegrationOptions = {}): AstroIntegration {
  const {
    content = ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    darkMode = 'class',
    minify = true,
    safelist = [],
    base = true,
    applyBaseStyles = true,
    coralOptions = {},
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let isProduction = false

  return {
    name: '@coral-css/astro',

    hooks: {
      'astro:config:setup': ({ command, updateConfig, injectScript }) => {
        isProduction = command === 'build'

        // Initialize Coral
        coral = createCoral(coralOptions as CoralOptions)
        const plugins = coralPreset({ darkMode })
        plugins.forEach((plugin) => coral.use(plugin))

        // Add safelist classes
        safelist.forEach((cls) => seenClasses.add(cls))

        // Inject base styles if enabled
        if (applyBaseStyles && base) {
          const baseCSS = generateBaseCSS()
          injectScript('head-inline', `
            (function() {
              var style = document.createElement('style');
              style.setAttribute('data-coral-base', '');
              style.textContent = ${JSON.stringify(baseCSS)};
              document.head.appendChild(style);
            })();
          `)
        }

        // Inject runtime observer for dynamic class detection
        injectScript('page', `
          import { initRuntime } from '@coral-css/core/runtime';
          if (typeof window !== 'undefined') {
            initRuntime({ darkMode: '${darkMode}' });
          }
        `)

        // Configure Vite plugin
        updateConfig({
          vite: {
            plugins: [
              createVitePlugin({
                content,
                darkMode,
                minify: isProduction && minify,
                coral,
                seenClasses,
              }),
            ],
          },
        })
      },

      'astro:config:done': ({ config }) => {
        // Log configuration
        if (process.env.DEBUG) {
          console.log('[CoralCSS] Configuration complete')
          console.log('[CoralCSS] Content patterns:', content)
          console.log('[CoralCSS] Dark mode:', darkMode)
          console.log('[CoralCSS] Output dir:', config.outDir.pathname)
        }
      },

      'astro:build:start': () => {
        // Reset seen classes for fresh build
        seenClasses.clear()
        safelist.forEach((cls) => seenClasses.add(cls))
      },

      'astro:build:done': async ({ dir }) => {
        // Generate final CSS file
        if (coral && seenClasses.size > 0) {
          const classes = Array.from(seenClasses)
          let css = coral.generate(classes)

          if (isProduction && minify) {
            css = minifyCSS(css)
          }

          // Write CSS file to output directory
          const fs = await import('fs/promises')
          const path = await import('path')

          const outputPath = path.join(dir.pathname, '_coral', 'styles.css')
          const outputDir = path.dirname(outputPath)

          await fs.mkdir(outputDir, { recursive: true })
          await fs.writeFile(outputPath, css, 'utf-8')

          if (process.env.DEBUG) {
            console.log(`[CoralCSS] Generated ${css.length} bytes of CSS`)
            console.log(`[CoralCSS] Output: ${outputPath}`)
          }
        }
      },

      'astro:server:setup': ({ server }) => {
        // Add middleware for development CSS endpoint
        server.middlewares.use((req: { url?: string }, res: { setHeader: (name: string, value: string) => void; end: (data: string) => void }, next: () => void) => {
          if (req.url === '/_coral/styles.css') {
            const classes = Array.from(seenClasses)
            const css = coral.generate(classes)

            res.setHeader('Content-Type', 'text/css')
            res.setHeader('Cache-Control', 'no-cache')
            res.end(css)
          } else {
            next()
          }
        })
      },
    },
  }
}

/**
 * Create Vite plugin for Astro integration
 */
function createVitePlugin(options: {
  content: string[]
  darkMode: DarkModeStrategy
  minify: boolean
  coral: Coral
  seenClasses: Set<string>
}) {
  const { content, coral, seenClasses } = options

  const VIRTUAL_MODULE_ID = 'virtual:coral.css'
  const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

  return {
    name: 'coral-astro-vite',
    enforce: 'pre' as const,

    resolveId(id: string) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id: string) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const classes = Array.from(seenClasses)
        return coral.generate(classes)
      }
    },

    transform(code: string, id: string) {
      // Check if file matches content patterns
      const shouldProcess = content.some((pattern) => {
        const regex = patternToRegex(pattern)
        return regex.test(id)
      })

      if (!shouldProcess) {
        return null
      }

      // Extract classes from Astro/HTML/JSX code
      const classes = extractClasses(code)

      for (const cls of classes) {
        seenClasses.add(cls)
      }

      return null
    },
  }
}

/**
 * Extract classes from code
 */
function extractClasses(code: string): string[] {
  const classes = new Set<string>()

  // Match class="..." and className="..."
  const classAttrRegex = /(?:class|className)=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) {
          classes.add(cls)
        }
      })
    }
  }

  // Match class:list={[...]} (Astro syntax)
  const classListRegex = /class:list=\{?\[([^\]]+)\]/g
  while ((match = classListRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      // Extract string literals
      const stringRegex = /["']([^"']+)["']/g
      let strMatch
      while ((strMatch = stringRegex.exec(content)) !== null) {
        const cls = strMatch[1]
        if (cls) {
          cls.split(/\s+/).forEach((c) => {
            if (c) {
              classes.add(c)
            }
          })
        }
      }
    }
  }

  // Match class={`...`} template literals
  const templateRegex = /class(?:Name)?=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      staticParts.split(/\s+/).forEach((cls) => {
        if (cls) {
          classes.add(cls)
        }
      })
    }
  }

  // Match cn(), clsx(), cva() function calls
  const fnRegex = /(?:cn|clsx|cva|classnames)\s*\(\s*["']([^"']+)["']/g
  while ((match = fnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) {
          classes.add(cls)
        }
      })
    }
  }

  return Array.from(classes)
}

/**
 * Generate base CSS
 */
function generateBaseCSS(): string {
  return `
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
  font-family: ui-sans-serif, system-ui, sans-serif;
  font-feature-settings: normal;
}

body {
  margin: 0;
  line-height: inherit;
}

h1, h2, h3, h4, h5, h6 {
  font-size: inherit;
  font-weight: inherit;
}

a {
  color: inherit;
  text-decoration: inherit;
}

img, svg, video, canvas, audio, iframe, embed, object {
  display: block;
  vertical-align: middle;
}

img, video {
  max-width: 100%;
  height: auto;
}

[hidden] {
  display: none;
}
`.trim()
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
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>+~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .trim()
}

/**
 * Astro component helper for inline styles
 *
 * @example
 * ```astro
 * ---
 * import { CoralStyles } from '@coral-css/core/astro'
 * const classes = ['bg-coral-500', 'text-white', 'p-4']
 * ---
 * <CoralStyles classes={classes} />
 * ```
 */
export function generateStyleTag(classes: string[], options: {
  darkMode?: DarkModeStrategy
} = {}): string {
  const coral = createCoral({})
  const plugins = coralPreset({ darkMode: options.darkMode || 'class' })
  plugins.forEach((plugin) => coral.use(plugin))

  const css = coral.generate(classes)
  return `<style data-coral>${css}</style>`
}

/**
 * View Transitions API helper for Astro
 *
 * @example
 * ```astro
 * ---
 * import { viewTransitionStyles } from '@coral-css/core/astro'
 * ---
 * <style set:html={viewTransitionStyles}></style>
 * ```
 */
export const viewTransitionStyles = `
/* CoralCSS View Transition Styles */
::view-transition-old(root),
::view-transition-new(root) {
  animation-duration: 0.3s;
  animation-timing-function: ease-in-out;
}

::view-transition-old(root) {
  animation-name: coral-fade-out;
}

::view-transition-new(root) {
  animation-name: coral-fade-in;
}

@keyframes coral-fade-out {
  from { opacity: 1; }
  to { opacity: 0; }
}

@keyframes coral-fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* Slide transition variant */
[data-coral-transition="slide"]::view-transition-old(root) {
  animation-name: coral-slide-out;
}

[data-coral-transition="slide"]::view-transition-new(root) {
  animation-name: coral-slide-in;
}

@keyframes coral-slide-out {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(-100%); opacity: 0; }
}

@keyframes coral-slide-in {
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
`

export default coralAstroIntegration
