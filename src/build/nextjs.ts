/**
 * Next.js Plugin
 *
 * Next.js integration for CoralCSS.
 * Supports both Pages Router and App Router.
 *
 * @module build/nextjs
 */

import { CoralWebpackPlugin } from './webpack'
import type { WebpackPluginOptions } from './webpack'
import type { DarkModeStrategy } from '../types'

/**
 * Next.js plugin options
 */
export interface NextJSPluginOptions {
  /**
   * File patterns to scan for classes
   * @default ['./pages/**\/*.{js,jsx,ts,tsx}', './components/**\/*.{js,jsx,ts,tsx}', './app/**\/*.{js,jsx,ts,tsx}', './src/**\/*.{js,jsx,ts,tsx}']
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
   * Output CSS file name (relative to .next/static/css)
   * @default 'coral.css'
   */
  output?: string

  /**
   * Additional classes to always include
   */
  safelist?: string[]

  /**
   * Additional webpack plugin options
   */
  webpack?: Partial<WebpackPluginOptions>
}

/**
 * Next.js config type
 */
interface NextConfig {
  webpack?: (
    config: WebpackConfig,
    context: WebpackContext
  ) => WebpackConfig
  experimental?: Record<string, unknown>
  [key: string]: unknown
}

interface WebpackConfig {
  plugins: unknown[]
  module: {
    rules: WebpackRule[]
  }
  [key: string]: unknown
}

interface WebpackRule {
  test: RegExp
  use: unknown[]
  [key: string]: unknown
}

interface WebpackContext {
  dev: boolean
  isServer: boolean
  buildId: string
  config: NextConfig
}

/**
 * Create Next.js plugin for CoralCSS
 *
 * @example
 * ```javascript
 * // next.config.js
 * const withCoral = require('@coral-css/core/next')
 *
 * module.exports = withCoral({
 *   darkMode: 'class',
 *   content: ['./src/**\/*.{js,jsx,ts,tsx}'],
 * })({
 *   // Your Next.js config
 * })
 * ```
 *
 * @example
 * ```javascript
 * // next.config.mjs (ES modules)
 * import withCoral from '@coral-css/core/next'
 *
 * export default withCoral({
 *   darkMode: 'class',
 * })({
 *   // Your Next.js config
 * })
 * ```
 */
export function withCoral(options: NextJSPluginOptions = {}) {
  const {
    content = [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './app/**/*.{js,jsx,ts,tsx}',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
    darkMode = 'class',
    minify = true,
    output = 'coral.css',
    safelist = [],
    webpack: webpackOptions = {},
  } = options

  return (nextConfig: NextConfig = {}): NextConfig => {
    return {
      ...nextConfig,

      webpack(config, context) {
        // Only add plugin on client build
        if (!context.isServer) {
          const coralPlugin = new CoralWebpackPlugin({
            include: content,
            exclude: ['node_modules/**', '.next/**'],
            darkMode,
            minify: !context.dev && minify,
            output,
            safelist,
            ...webpackOptions,
          } as WebpackPluginOptions)

          config.plugins.push(coralPlugin)
        }

        // Add CSS loader rule for .coral.css files
        config.module.rules.push({
          test: /\.coral\.css$/,
          use: [
            {
              loader: require.resolve('./webpack'),
              options: {
                darkMode,
                safelist,
              },
            },
          ],
        })

        // Call user's webpack function if provided
        if (typeof nextConfig.webpack === 'function') {
          return nextConfig.webpack(config, context)
        }

        return config
      },
    }
  }
}

/**
 * App Router specific configuration
 *
 * @example
 * ```javascript
 * // next.config.js
 * const { withCoralApp } = require('@coral-css/core/next')
 *
 * module.exports = withCoralApp({
 *   darkMode: 'class',
 * })({
 *   experimental: {
 *     appDir: true,
 *   },
 * })
 * ```
 */
export function withCoralApp(options: NextJSPluginOptions = {}) {
  const baseConfig = withCoral({
    ...options,
    content: [
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './src/**/*.{js,jsx,ts,tsx}',
      ...(options.content || []),
    ],
  })

  return (nextConfig: NextConfig = {}): NextConfig => {
    return baseConfig({
      ...nextConfig,
      experimental: {
        ...nextConfig.experimental,
      },
    })
  }
}

/**
 * Pages Router specific configuration
 *
 * @example
 * ```javascript
 * // next.config.js
 * const { withCoralPages } = require('@coral-css/core/next')
 *
 * module.exports = withCoralPages({
 *   darkMode: 'class',
 * })({
 *   // Your Next.js config
 * })
 * ```
 */
export function withCoralPages(options: NextJSPluginOptions = {}) {
  return withCoral({
    ...options,
    content: [
      './pages/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './src/**/*.{js,jsx,ts,tsx}',
      ...(options.content || []),
    ],
  })
}

/**
 * Next.js API route handler for dynamic CSS generation
 *
 * @example
 * ```typescript
 * // pages/api/coral.ts or app/api/coral/route.ts
 * import { createCoralHandler } from '@coral-css/core/next'
 *
 * export default createCoralHandler({
 *   darkMode: 'class',
 * })
 * ```
 */
export function createCoralHandler(options: {
  darkMode?: DarkModeStrategy
  safelist?: string[]
} = {}) {
  // This is a factory that creates an API handler
  // Can be used in both Pages Router and App Router
  return async (req: Request): Promise<Response> => {
    try {
      // Dynamic import to avoid bundling issues
      const { createCoral } = await import('../kernel')
      const { coralPreset } = await import('../presets/coral')

      const coral = createCoral({})
      const plugins = coralPreset({ darkMode: options.darkMode || 'class' })
      plugins.forEach((plugin) => coral.use(plugin))

      // Get classes from request body or query
      let classes: string[] = []

      if (req.method === 'POST') {
        const body = await req.json()
        classes = body.classes || []
      } else {
        const url = new URL(req.url)
        const classParam = url.searchParams.get('classes')
        if (classParam) {
          classes = classParam.split(',')
        }
      }

      // Add safelist
      if (options.safelist) {
        classes = [...classes, ...options.safelist]
      }

      // Generate CSS
      const css = coral.generate(classes)

      return new Response(css, {
        headers: {
          'Content-Type': 'text/css',
          'Cache-Control': 'public, max-age=31536000, immutable',
        },
      })
    } catch (error) {
      return new Response(
        `/* Error generating CSS: ${error instanceof Error ? error.message : 'Unknown error'} */`,
        {
          status: 500,
          headers: { 'Content-Type': 'text/css' },
        }
      )
    }
  }
}

/**
 * Server Component helper for generating inline styles
 *
 * @example
 * ```tsx
 * // app/layout.tsx
 * import { CoralStyles } from '@coral-css/core/next'
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <CoralStyles classes={['bg-white', 'text-slate-900']} />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   )
 * }
 * ```
 */
export interface CoralStylesProps {
  /**
   * Classes to generate CSS for
   */
  classes: string[]

  /**
   * Dark mode strategy
   */
  darkMode?: DarkModeStrategy

  /**
   * Additional inline styles
   */
  additionalCSS?: string
}

/**
 * Generate CoralCSS styles as a style tag (for Server Components)
 * Note: This is a helper function, not a React component
 */
export async function generateCoralStyles(props: CoralStylesProps): Promise<string> {
  const { createCoral } = await import('../kernel')
  const { coralPreset } = await import('../presets/coral')

  const coral = createCoral({})
  const plugins = coralPreset({ darkMode: props.darkMode || 'class' })
  plugins.forEach((plugin) => coral.use(plugin))

  const css = coral.generate(props.classes)
  const additionalCSS = props.additionalCSS || ''

  return `<style data-coral>${css}${additionalCSS}</style>`
}

/**
 * Turbopack configuration helper (experimental)
 *
 * @example
 * ```javascript
 * // next.config.js
 * const { withCoralTurbopack } = require('@coral-css/core/next')
 *
 * module.exports = withCoralTurbopack({
 *   darkMode: 'class',
 * })
 * ```
 */
export function withCoralTurbopack(options: NextJSPluginOptions = {}) {
  const {
    darkMode = 'class',
    content = [
      './app/**/*.{js,jsx,ts,tsx}',
      './components/**/*.{js,jsx,ts,tsx}',
      './src/**/*.{js,jsx,ts,tsx}',
    ],
  } = options

  return (nextConfig: NextConfig = {}): NextConfig => {
    return {
      ...nextConfig,
      experimental: {
        ...nextConfig.experimental,
        turbo: {
          rules: {
            '*.coral.css': {
              loaders: ['@coral-css/core/webpack/loader'],
              as: '*.css',
            },
          },
        },
      },
      // Store options for runtime access
      env: {
        ...((nextConfig as Record<string, unknown>).env as Record<string, string> || {}),
        CORAL_DARK_MODE: darkMode,
        CORAL_CONTENT: JSON.stringify(content),
      },
    }
  }
}

export default withCoral
