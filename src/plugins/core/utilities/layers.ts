/**
 * CSS Cascade Layers Plugin
 *
 * Provides @layer support for managing CSS specificity and cascade order.
 * Similar to Tailwind CSS v4's layer system.
 *
 * @module plugins/core/utilities/layers
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Layer configuration
 */
export interface LayerConfig {
  /**
   * Layer order (first = lowest priority, last = highest)
   */
  order: string[]

  /**
   * Custom layer definitions
   */
  custom?: Record<string, string[]>
}

/**
 * Default layer order
 */
const defaultLayerOrder = [
  'reset',
  'base',
  'components',
  'utilities',
  'variants',
  'overrides',
]

/**
 * CSS Cascade Layers plugin
 *
 * @example
 * ```ts
 * // Generates:
 * // @layer reset, base, components, utilities, variants, overrides;
 * //
 * // @layer base {
 * //   *, *::before, *::after { box-sizing: border-box; }
 * // }
 * ```
 */
export function layersPlugin(config: Partial<LayerConfig> = {}): Plugin {
  const layerOrder = config.order || defaultLayerOrder

  return {
    name: 'layers',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // Add layer declaration rule
      ctx.addRule({
        name: '@layer-declaration',
        pattern: '@layer-declaration',
        properties: {
          '--coral-layers': layerOrder.join(', '),
        },
      })

      // Layer assignment utilities
      for (const layer of layerOrder) {
        ctx.addRule({
          name: `in-layer-${layer}`,
          pattern: `in-layer-${layer}`,
          properties: {
            '--coral-current-layer': layer,
          },
        })
      }

      // Arbitrary layer assignment
      ctx.addRule({
        name: 'in-layer-arb',
        pattern: /^in-layer-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return {
            properties: { '--coral-current-layer': value },
          }
        },
      })

      // Layer-specific variants
      ctx.addVariant({
        name: 'layer-base',
        match: 'layer-base',
        handler: (selector) => selector,
        wrapper: '@layer base',
      })

      ctx.addVariant({
        name: 'layer-components',
        match: 'layer-components',
        handler: (selector) => selector,
        wrapper: '@layer components',
      })

      ctx.addVariant({
        name: 'layer-utilities',
        match: 'layer-utilities',
        handler: (selector) => selector,
        wrapper: '@layer utilities',
      })

      ctx.addVariant({
        name: 'layer-overrides',
        match: 'layer-overrides',
        handler: (selector) => selector,
        wrapper: '@layer overrides',
      })

      // Arbitrary layer variant
      ctx.addVariant({
        name: 'layer',
        match: /^layer-\[(.+)\]$/,
        handler: (selector, matches) => {
          return selector
        },
        wrapper: (css: string) => {
          // Extract layer name from the wrapper context
          return `@layer {\n${css}\n}`
        },
      })
    },
  }
}

/**
 * Generate @layer declaration CSS
 */
export function generateLayerDeclaration(layers: string[] = defaultLayerOrder): string {
  return `@layer ${layers.join(', ')};`
}

/**
 * Generate base reset layer
 */
export function generateBaseResetLayer(): string {
  return `@layer reset {
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    tab-size: 4;
  }

  body {
    font-family: system-ui, -apple-system, sans-serif;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  input, button, textarea, select {
    font: inherit;
  }

  p, h1, h2, h3, h4, h5, h6 {
    overflow-wrap: break-word;
  }
}`
}

/**
 * Generate base styles layer
 */
export function generateBaseLayer(): string {
  return `@layer base {
  :root {
    --coral-font-sans: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    --coral-font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
    --coral-font-mono: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
  }

  html {
    color-scheme: light dark;
  }

  body {
    color: var(--coral-color-foreground, #0f172a);
    background-color: var(--coral-color-background, #ffffff);
  }

  ::selection {
    background-color: var(--coral-color-accent, #ff6b6b);
    color: white;
  }

  :focus-visible {
    outline: 2px solid var(--coral-color-accent, #ff6b6b);
    outline-offset: 2px;
  }
}`
}

/**
 * Generate full layer system CSS
 */
export function generateLayerSystem(options: {
  includeReset?: boolean
  includeBase?: boolean
  layers?: string[]
} = {}): string {
  const {
    includeReset = true,
    includeBase = true,
    layers = defaultLayerOrder,
  } = options

  const parts: string[] = []

  // Layer declaration
  parts.push(generateLayerDeclaration(layers))
  parts.push('')

  // Reset layer
  if (includeReset) {
    parts.push(generateBaseResetLayer())
    parts.push('')
  }

  // Base layer
  if (includeBase) {
    parts.push(generateBaseLayer())
  }

  return parts.join('\n')
}

export default layersPlugin
