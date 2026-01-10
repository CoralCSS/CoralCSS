/**
 * Remix Integration
 *
 * Remix plugin for CoralCSS integration.
 * Provides Vite plugin compatibility, SSR support, and Remix-specific features.
 * @module build/remix
 */

import type { Plugin as VitePlugin } from 'vite'
import type { Coral, CoralOptions, DarkModeStrategy } from '../types'
import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'

/**
 * Remix plugin options
 */
export interface RemixPluginOptions extends Partial<CoralOptions> {
  /**
   * File patterns to scan for classes
   * @default ['app/**\/*.{tsx,jsx,ts,js}']
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
   * Enable prefetching optimization for Link components
   * @default true
   */
  prefetchOptimization?: boolean

  /**
   * Extract classes from meta functions
   * @default true
   */
  extractFromMeta?: boolean

  /**
   * Extract classes from loader/action data
   * @default true
   */
  extractFromLoaders?: boolean
}

const VIRTUAL_MODULE_ID = 'virtual:coral.css'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

/**
 * Create Remix Vite plugin for CoralCSS
 *
 * @example
 * ```typescript
 * // vite.config.ts
 * import { vitePlugin as remix } from '@remix-run/dev'
 * import { coralRemix } from '@coral-css/core/remix'
 *
 * export default defineConfig({
 *   plugins: [
 *     remix(),
 *     coralRemix({
 *       darkMode: 'class',
 *     }),
 *   ],
 * })
 * ```
 *
 * @example
 * ```typescript
 * // app/root.tsx
 * import 'virtual:coral.css'
 *
 * export default function App() {
 *   return (
 *     <html className="dark">
 *       <head>
 *         <Meta />
 *         <Links />
 *       </head>
 *       <body className="bg-white dark:bg-gray-900">
 *         <Outlet />
 *         <Scripts />
 *       </body>
 *     </html>
 *   )
 * }
 * ```
 */
export function coralRemix(options: RemixPluginOptions = {}): VitePlugin {
  const {
    include = ['app/**/*.{tsx,jsx,ts,js}'],
    exclude = ['node_modules/**'],
    minify = true,
    darkMode = 'class',
    preset: _preset = 'coral',
    output = VIRTUAL_MODULE_ID,
    prefetchOptimization: _prefetchOptimization = true,
    extractFromMeta = true,
    extractFromLoaders = true,
    ...coralOptions
  } = options

  let coral: Coral
  const seenClasses = new Set<string>()
  let generatedCSS = ''
  let isProduction = false

  return {
    name: 'coral-remix',
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

      // Extract classes from code
      const newClasses = extractClassesFromRemix(code, {
        extractFromMeta,
        extractFromLoaders,
      })

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

interface ExtractOptions {
  extractFromMeta: boolean
  extractFromLoaders: boolean
}

/**
 * Extract classes from Remix components
 */
function extractClassesFromRemix(code: string, options: ExtractOptions): string[] {
  const classes = new Set<string>()

  // Match className="..." and class="..."
  const classAttrRegex = /(?:class|className)=["']([^"']+)["']/g
  let match

  while ((match = classAttrRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls && !cls.includes('{')) {
          classes.add(cls)
        }
      })
    }
  }

  // Match className={`...`} template literals
  const templateRegex = /className=\{`([^`]+)`\}/g
  while ((match = templateRegex.exec(code)) !== null) {
    const content = match[1]
    if (content) {
      const staticParts = content.replace(/\$\{[^}]+\}/g, ' ')
      staticParts.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match className={cn('...')} or clsx('...')
  const cnRegex = /(?:cn|clsx|cva|classnames|twMerge)\s*\(\s*["']([^"']+)["']/g
  while ((match = cnRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match ternary class expressions className={isActive ? 'active' : 'inactive'}
  const ternaryRegex = /className=\{[^?]+\?\s*["']([^"']+)["']\s*:\s*["']([^"']+)["']\s*\}/g
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

  // Match classes in JSX spread attributes {...{ className: '...' }}
  const spreadRegex = /\{\.\.\..*className:\s*["']([^"']+)["']/g
  while ((match = spreadRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Extract from meta function if enabled
  if (options.extractFromMeta) {
    // Match export const meta: MetaFunction = () => [{ "og:image": className: "..." }]
    const metaFunctionRegex = /export\s+(?:const|function)\s+meta[^{]*\{([\s\S]*?)^}/gm
    while ((match = metaFunctionRegex.exec(code)) !== null) {
      const metaContent = match[1]
      if (metaContent) {
        // Look for class references in meta return
        const classInMeta = /["']([^"']+)["']/g
        let metaMatch
        while ((metaMatch = classInMeta.exec(metaContent)) !== null) {
          const value = metaMatch[1]
          if (value && looksLikeClassName(value)) {
            value.split(/\s+/).forEach((cls) => {
              if (cls) { classes.add(cls) }
            })
          }
        }
      }
    }
  }

  // Extract from loader/action data if enabled
  if (options.extractFromLoaders) {
    // Match export const loader/action = async ({ ... }) => { return json({ className: "..." }) }
    const loaderRegex = /export\s+(?:const|async function)\s+(?:loader|action)[^{]*\{([\s\S]*?)return\s+(?:json|defer|redirect)/g
    while ((match = loaderRegex.exec(code)) !== null) {
      const loaderContent = match[1]
      if (loaderContent) {
        // Look for class references in loader data
        const classInLoader = /(?:className|class|classes?):\s*["']([^"']+)["']/g
        let loaderMatch
        while ((loaderMatch = classInLoader.exec(loaderContent)) !== null) {
          const value = loaderMatch[1]
          if (value) {
            value.split(/\s+/).forEach((cls) => {
              if (cls) { classes.add(cls) }
            })
          }
        }
      }
    }
  }

  // Match Link component prefetch classes
  const linkPrefetchRegex = /<Link[^>]*className=["']([^"']+)["'][^>]*>/g
  while ((match = linkPrefetchRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match NavLink component with active classes
  const navLinkRegex = /NavLink[^>]*className=\{[^}]*["']([^"']+)["'][^}]*\}/g
  while ((match = navLinkRegex.exec(code)) !== null) {
    const captured = match[1]
    if (captured) {
      captured.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Match NavLink isActive/isPending patterns
  const navLinkActiveRegex = /NavLink[^>]*className=\{\s*\(\s*\{[^}]+\}\s*\)\s*=>\s*[`"']([^`"']+)[`"']/g
  while ((match = navLinkActiveRegex.exec(code)) !== null) {
    const template = match[1]
    if (template) {
      const staticParts = template.replace(/\$\{[^}]+\}/g, ' ')
      staticParts.split(/\s+/).forEach((cls) => {
        if (cls) { classes.add(cls) }
      })
    }
  }

  // Extract array of classes from clsx/cn object syntax
  const objectSyntaxRegex = /(?:cn|clsx|cva)\s*\(\s*\{([^}]+)\}/g
  while ((match = objectSyntaxRegex.exec(code)) !== null) {
    const objectContent = match[1]
    if (objectContent) {
      // Match keys that look like class names
      const keyRegex = /["']?([a-zA-Z][a-zA-Z0-9_:-]*)["']?\s*:/g
      let keyMatch
      while ((keyMatch = keyRegex.exec(objectContent)) !== null) {
        const key = keyMatch[1]
        if (key && looksLikeClassName(key)) {
          classes.add(key)
        }
      }
    }
  }

  return Array.from(classes)
}

/**
 * Check if a string looks like a CSS class name
 */
function looksLikeClassName(str: string): boolean {
  // Check for common utility patterns
  const utilityPatterns = [
    /^[a-z]+-/,          // prefixed like bg-, text-, p-, m-
    /^-?[mp][trblxy]?-/, // margin/padding
    /^(?:w|h|min|max)-/, // width/height
    /^(?:flex|grid|gap)/, // layout
    /^(?:text|font|leading)/, // typography
    /^(?:bg|border|ring|shadow)/, // colors/effects
    /^(?:rounded|opacity|z)/, // misc utilities
    /^(?:hover|focus|active|dark):/, // variants
    /^(?:sm|md|lg|xl|2xl):/, // responsive
  ]

  return utilityPatterns.some((pattern) => pattern.test(str))
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
 * Remix utilities for runtime dark mode
 */
export interface DarkModeUtils {
  /**
   * Get dark mode cookie value
   */
  getDarkModeCookie: (request: Request) => boolean | null

  /**
   * Set dark mode cookie
   */
  setDarkModeCookie: (value: boolean) => string

  /**
   * Get dark mode from system preference
   */
  getSystemDarkMode: (request: Request) => boolean
}

/**
 * Create dark mode utilities for Remix loaders/actions
 *
 * @example
 * ```typescript
 * // app/utils/dark-mode.server.ts
 * import { createDarkModeUtils } from '@coral-css/core/remix'
 *
 * export const darkMode = createDarkModeUtils()
 *
 * // app/root.tsx
 * export async function loader({ request }: LoaderFunctionArgs) {
 *   const darkModePreference = darkMode.getDarkModeCookie(request)
 *   return json({ darkMode: darkModePreference })
 * }
 * ```
 */
export function createDarkModeUtils(): DarkModeUtils {
  return {
    getDarkModeCookie(request: Request): boolean | null {
      const cookies = request.headers.get('Cookie') || ''
      const match = cookies.match(/coral-dark-mode=(\w+)/)
      if (match) {
        return match[1] === 'dark'
      }
      return null
    },

    setDarkModeCookie(value: boolean): string {
      const mode = value ? 'dark' : 'light'
      return `coral-dark-mode=${mode}; Path=/; Max-Age=31536000; SameSite=Lax`
    },

    getSystemDarkMode(request: Request): boolean {
      // Check Sec-CH-Prefers-Color-Scheme header (Client Hints)
      const colorScheme = request.headers.get('Sec-CH-Prefers-Color-Scheme')
      return colorScheme === 'dark'
    },
  }
}

/**
 * React hook code for dark mode (as string for code generation)
 */
export const useDarkModeHook = `
import { useFetcher } from '@remix-run/react'
import { useCallback, useEffect, useState } from 'react'

export function useDarkMode(initialValue?: boolean) {
  const [darkMode, setDarkModeState] = useState(() => {
    if (typeof initialValue !== 'undefined') return initialValue
    if (typeof window === 'undefined') return false
    return (
      localStorage.getItem('coral-dark-mode') === 'dark' ||
      (!localStorage.getItem('coral-dark-mode') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    )
  })

  const fetcher = useFetcher()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    localStorage.setItem('coral-dark-mode', darkMode ? 'dark' : 'light')
  }, [darkMode])

  const toggle = useCallback(() => {
    const newValue = !darkMode
    setDarkModeState(newValue)
    fetcher.submit(
      { darkMode: newValue ? 'dark' : 'light' },
      { method: 'post', action: '/api/dark-mode' }
    )
  }, [darkMode, fetcher])

  const setDarkMode = useCallback((value: boolean) => {
    setDarkModeState(value)
    fetcher.submit(
      { darkMode: value ? 'dark' : 'light' },
      { method: 'post', action: '/api/dark-mode' }
    )
  }, [fetcher])

  return { darkMode, toggle, setDarkMode }
}
`

/**
 * Dark mode action handler code (as string for code generation)
 */
export const darkModeAction = `
import type { ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const darkMode = formData.get('darkMode') === 'dark'

  return json(
    { success: true },
    {
      headers: {
        'Set-Cookie': \`coral-dark-mode=\${darkMode ? 'dark' : 'light'}; Path=/; Max-Age=31536000; SameSite=Lax\`,
      },
    }
  )
}
`

/**
 * Create client hints headers for dark mode
 *
 * @example
 * ```typescript
 * // app/entry.server.tsx
 * import { getClientHintsHeaders } from '@coral-css/core/remix'
 *
 * export default function handleRequest(
 *   request: Request,
 *   responseStatusCode: number,
 *   responseHeaders: Headers,
 *   remixContext: EntryContext
 * ) {
 *   // Add client hints headers
 *   const clientHints = getClientHintsHeaders()
 *   Object.entries(clientHints).forEach(([key, value]) => {
 *     responseHeaders.set(key, value)
 *   })
 *   // ...
 * }
 * ```
 */
export function getClientHintsHeaders(): Record<string, string> {
  return {
    'Accept-CH': 'Sec-CH-Prefers-Color-Scheme',
    'Vary': 'Sec-CH-Prefers-Color-Scheme',
    'Critical-CH': 'Sec-CH-Prefers-Color-Scheme',
  }
}

/**
 * Remix-specific type declarations
 */
export interface CoralRemixContext {
  darkMode: boolean
  theme: 'light' | 'dark' | 'system'
}

/**
 * Type augmentation for Remix LoaderData
 */
export interface WithDarkMode {
  darkMode?: boolean
}

/**
 * Helper to create Remix-compatible CSS link
 *
 * @example
 * ```typescript
 * // app/root.tsx
 * import { coralLinks } from '@coral-css/core/remix'
 *
 * export const links = () => [
 *   ...coralLinks(),
 * ]
 * ```
 */
export function coralLinks(): Array<{ rel: string; href: string }> {
  return [
    { rel: 'stylesheet', href: 'virtual:coral.css' },
  ]
}

export default coralRemix
