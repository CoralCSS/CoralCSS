/**
 * CSS Transformer
 *
 * Transforms generated CSS into final output string.
 * @module core/transformer
 */

import type { GeneratedCSS, CSSLayer } from '../types'
import { formatCSS, minifyCSS, wrapInLayer } from '../utils/css'

/**
 * Transformer options
 */
export interface TransformerOptions {
  /** Minify output */
  minify?: boolean
  /** Use CSS layers */
  useLayers?: boolean
  /** Pretty print with newlines */
  pretty?: boolean
  /** Indentation size */
  indent?: number
}

/**
 * Default transformer options
 */
const defaultOptions: Required<TransformerOptions> = {
  minify: false,
  useLayers: false,
  pretty: true,
  indent: 2,
}

/**
 * CSS Transformer class
 *
 * @example
 * ```typescript
 * const transformer = new Transformer()
 * const css = transformer.transform(generatedCSSArray)
 * ```
 */
export class Transformer {
  private options: Required<TransformerOptions>

  constructor(options: TransformerOptions = {}) {
    this.options = { ...defaultOptions, ...options }
  }

  /**
   * Transform generated CSS array to final CSS string
   *
   * @example
   * ```typescript
   * const cssString = transformer.transform(generatedCSSArray)
   * ```
   */
  transform(items: GeneratedCSS[]): string {
    if (items.length === 0) {
      return ''
    }

    // Sort items
    const sorted = this.sort(items)

    // Group by layer if using layers
    if (this.options.useLayers) {
      return this.transformWithLayers(sorted)
    }

    // Transform without layers
    return this.transformWithoutLayers(sorted)
  }

  /**
   * Transform with CSS @layer
   */
  private transformWithLayers(items: GeneratedCSS[]): string {
    const layers: Record<CSSLayer, string[]> = {
      base: [],
      components: [],
      utilities: [],
    }

    // Group CSS by layer
    for (const item of items) {
      const css = this.itemToCSS(item)
      layers[item.layer].push(css)
    }

    // Combine each layer
    const parts: string[] = []

    // Add layer order declaration
    parts.push('@layer base, components, utilities;')

    // Add each layer
    for (const layer of ['base', 'components', 'utilities'] as CSSLayer[]) {
      const layerCSS = layers[layer]
      if (layerCSS.length > 0) {
        const combined = layerCSS.join('\n')
        parts.push(wrapInLayer(combined, layer))
      }
    }

    return this.format(parts.join('\n\n'))
  }

  /**
   * Transform without CSS layers
   */
  private transformWithoutLayers(items: GeneratedCSS[]): string {
    const cssStrings = items.map((item) => this.itemToCSS(item))
    return this.format(cssStrings.join('\n'))
  }

  /**
   * Convert a single GeneratedCSS item to CSS string
   */
  private itemToCSS(item: GeneratedCSS): string {
    // This is the raw CSS from the generator
    // The variants have already been applied by the generator
    const props = Object.entries(item.properties)
      .map(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`)
        return `${cssKey}: ${value};`
      })
      .join(' ')

    return `${item.selector} { ${props} }`
  }

  /**
   * Sort generated CSS items
   */
  sort(items: GeneratedCSS[]): GeneratedCSS[] {
    const layerOrder: Record<CSSLayer, number> = {
      base: 0,
      components: 1,
      utilities: 2,
    }

    return [...items].sort((a, b) => {
      // First by layer
      const layerDiff = layerOrder[a.layer] - layerOrder[b.layer]
      if (layerDiff !== 0) {
        return layerDiff
      }

      // Then by priority (higher = later = more specific)
      return a.priority - b.priority
    })
  }

  /**
   * Format CSS output
   */
  format(css: string): string {
    if (this.options.minify) {
      return minifyCSS(css)
    }

    if (this.options.pretty) {
      return formatCSS(css, { indent: this.options.indent, newlines: true })
    }

    return css
  }

  /**
   * Update options
   */
  setOptions(options: Partial<TransformerOptions>): void {
    this.options = { ...this.options, ...options }
  }

  /**
   * Get current options
   */
  getOptions(): Required<TransformerOptions> {
    return { ...this.options }
  }
}

/**
 * Create a new transformer instance
 */
export function createTransformer(options?: TransformerOptions): Transformer {
  return new Transformer(options)
}

/**
 * Transform CSS items to string (convenience function)
 */
export function transformToCSS(
  items: GeneratedCSS[],
  options?: TransformerOptions
): string {
  const transformer = new Transformer(options)
  return transformer.transform(items)
}

/**
 * Group CSS items by selector
 */
export function groupBySelector(items: GeneratedCSS[]): Map<string, GeneratedCSS[]> {
  const groups = new Map<string, GeneratedCSS[]>()

  for (const item of items) {
    const existing = groups.get(item.selector)
    if (existing) {
      existing.push(item)
    } else {
      groups.set(item.selector, [item])
    }
  }

  return groups
}

/**
 * Merge CSS items with same selector
 */
export function mergeSameSelector(items: GeneratedCSS[]): GeneratedCSS[] {
  const groups = groupBySelector(items)
  const merged: GeneratedCSS[] = []

  for (const [selector, group] of groups) {
    if (group.length === 1) {
      merged.push(group[0]!)
    } else {
      // Merge properties
      const combinedProps = Object.assign({}, ...group.map((g) => g.properties))
      merged.push({
        selector,
        properties: combinedProps,
        layer: group[0]!.layer,
        priority: Math.max(...group.map((g) => g.priority)),
        className: group[0]!.className,
        variants: group[0]!.variants,
      })
    }
  }

  return merged
}

/**
 * Create CSS reset/preflight
 */
export function createPreflight(): string {
  return `
*, *::before, *::after {
  box-sizing: border-box;
}

* {
  margin: 0;
}

html {
  line-height: 1.5;
  -webkit-text-size-adjust: 100%;
  tab-size: 4;
}

body {
  line-height: inherit;
  -webkit-font-smoothing: antialiased;
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

#root, #__next {
  isolation: isolate;
}
`.trim()
}
