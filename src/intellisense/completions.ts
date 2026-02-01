/**
 * CoralCSS IntelliSense Completions
 *
 * Generates completion items for utility classes.
 * @module intellisense/completions
 */

import type { Theme } from '../types'
import { defaultTheme } from '../theme/default'

/**
 * Safely parse fraction strings like "1/2", "3/4" without eval()
 *
 * @example
 * ```typescript
 * parseFraction("1/2") // 0.5
 * parseFraction("3/4") // 0.75
 * parseFraction("invalid") // 0
 * ```
 */
function parseFraction(fraction: string): number {
  // Validate format: only digits and single forward slash
  if (!/^\d+\/\d+$/.test(fraction)) {
    return 0
  }

  const parts = fraction.split('/')
  const numerator = Number.parseInt(parts[0]!, 10)
  const denominator = Number.parseInt(parts[1]!, 10)

  // Safety checks
  if (Number.isNaN(numerator) || Number.isNaN(denominator)) {
    return 0
  }
  if (denominator === 0) {
    return 0 // Prevent division by zero
  }

  return numerator / denominator
}

/**
 * Completion item structure
 */
export interface CompletionItem {
  /** Class name */
  label: string
  /** Category (spacing, colors, typography, etc.) */
  category: string
  /** CSS properties and values */
  css: string
  /** Documentation/description */
  description?: string
  /** Color value for color utilities */
  color?: string
  /** Sort priority (lower = higher priority) */
  sortOrder?: number
}

/**
 * Completion category
 */
export interface CompletionCategory {
  name: string
  prefix: string
  items: CompletionItem[]
}

/**
 * Generate all completion items from theme
 */
export function generateCompletions(theme: Theme = defaultTheme): CompletionItem[] {
  const items: CompletionItem[] = []

  // Spacing utilities
  items.push(...generateSpacingCompletions(theme))

  // Color utilities
  items.push(...generateColorCompletions(theme))

  // Typography utilities
  items.push(...generateTypographyCompletions(theme))

  // Layout utilities
  items.push(...generateLayoutCompletions())

  // Flexbox utilities
  items.push(...generateFlexboxCompletions())

  // Grid utilities
  items.push(...generateGridCompletions())

  // Sizing utilities
  items.push(...generateSizingCompletions(theme))

  // Border utilities
  items.push(...generateBorderCompletions(theme))

  // Effect utilities
  items.push(...generateEffectCompletions())

  // Transform utilities
  items.push(...generateTransformCompletions())

  // Transition utilities
  items.push(...generateTransitionCompletions())

  // Filter utilities
  items.push(...generateFilterCompletions())

  // Interactivity utilities
  items.push(...generateInteractivityCompletions())

  return items
}

/**
 * Generate spacing completions (margin, padding, gap)
 */
function generateSpacingCompletions(theme: Theme): CompletionItem[] {
  const items: CompletionItem[] = []
  const spacing = theme.spacing || {}

  // Margin utilities
  const marginPrefixes = [
    { prefix: 'm', prop: 'margin', desc: 'margin on all sides' },
    { prefix: 'mx', prop: 'margin-inline', desc: 'horizontal margin' },
    { prefix: 'my', prop: 'margin-block', desc: 'vertical margin' },
    { prefix: 'mt', prop: 'margin-top', desc: 'top margin' },
    { prefix: 'mr', prop: 'margin-right', desc: 'right margin' },
    { prefix: 'mb', prop: 'margin-bottom', desc: 'bottom margin' },
    { prefix: 'ml', prop: 'margin-left', desc: 'left margin' },
    { prefix: 'ms', prop: 'margin-inline-start', desc: 'start margin (RTL-aware)' },
    { prefix: 'me', prop: 'margin-inline-end', desc: 'end margin (RTL-aware)' },
  ]

  // Padding utilities
  const paddingPrefixes = [
    { prefix: 'p', prop: 'padding', desc: 'padding on all sides' },
    { prefix: 'px', prop: 'padding-inline', desc: 'horizontal padding' },
    { prefix: 'py', prop: 'padding-block', desc: 'vertical padding' },
    { prefix: 'pt', prop: 'padding-top', desc: 'top padding' },
    { prefix: 'pr', prop: 'padding-right', desc: 'right padding' },
    { prefix: 'pb', prop: 'padding-bottom', desc: 'bottom padding' },
    { prefix: 'pl', prop: 'padding-left', desc: 'left padding' },
    { prefix: 'ps', prop: 'padding-inline-start', desc: 'start padding (RTL-aware)' },
    { prefix: 'pe', prop: 'padding-inline-end', desc: 'end padding (RTL-aware)' },
  ]

  // Gap utilities
  const gapPrefixes = [
    { prefix: 'gap', prop: 'gap', desc: 'gap between grid/flex items' },
    { prefix: 'gap-x', prop: 'column-gap', desc: 'horizontal gap' },
    { prefix: 'gap-y', prop: 'row-gap', desc: 'vertical gap' },
  ]

  // Space between utilities
  const spacePrefixes = [
    { prefix: 'space-x', prop: '> * + * { margin-left', desc: 'horizontal space between children' },
    { prefix: 'space-y', prop: '> * + * { margin-top', desc: 'vertical space between children' },
  ]

  for (const [key, value] of Object.entries(spacing)) {
    // Margin
    for (const { prefix, prop, desc } of marginPrefixes) {
      items.push({
        label: `${prefix}-${key}`,
        category: 'spacing',
        css: `${prop}: ${value};`,
        description: `Set ${desc} to ${value}`,
        sortOrder: 10,
      })

      // Negative margins
      if (key !== '0' && key !== 'px' && key !== 'auto') {
        items.push({
          label: `-${prefix}-${key}`,
          category: 'spacing',
          css: `${prop}: -${value};`,
          description: `Set negative ${desc} to -${value}`,
          sortOrder: 11,
        })
      }
    }

    // Padding
    for (const { prefix, prop, desc } of paddingPrefixes) {
      items.push({
        label: `${prefix}-${key}`,
        category: 'spacing',
        css: `${prop}: ${value};`,
        description: `Set ${desc} to ${value}`,
        sortOrder: 10,
      })
    }

    // Gap
    for (const { prefix, prop, desc } of gapPrefixes) {
      items.push({
        label: `${prefix}-${key}`,
        category: 'spacing',
        css: `${prop}: ${value};`,
        description: `Set ${desc} to ${value}`,
        sortOrder: 12,
      })
    }

    // Space between
    for (const { prefix, desc } of spacePrefixes) {
      items.push({
        label: `${prefix}-${key}`,
        category: 'spacing',
        css: `> * + * { margin: ${value}; }`,
        description: `Set ${desc} to ${value}`,
        sortOrder: 13,
      })
    }
  }

  // Auto margin
  items.push({
    label: 'm-auto',
    category: 'spacing',
    css: 'margin: auto;',
    description: 'Set margin to auto',
    sortOrder: 10,
  })
  items.push({
    label: 'mx-auto',
    category: 'spacing',
    css: 'margin-inline: auto;',
    description: 'Center element horizontally',
    sortOrder: 10,
  })
  items.push({
    label: 'my-auto',
    category: 'spacing',
    css: 'margin-block: auto;',
    description: 'Center element vertically',
    sortOrder: 10,
  })

  return items
}

/**
 * Generate color completions
 */
function generateColorCompletions(theme: Theme): CompletionItem[] {
  const items: CompletionItem[] = []
  const colors = theme.colors || {}

  // Color utility prefixes
  const colorPrefixes = [
    { prefix: 'text', prop: 'color', desc: 'text color' },
    { prefix: 'bg', prop: 'background-color', desc: 'background color' },
    { prefix: 'border', prop: 'border-color', desc: 'border color' },
    { prefix: 'ring', prop: '--tw-ring-color', desc: 'ring/outline color' },
    { prefix: 'divide', prop: 'border-color', desc: 'divide color between children' },
    { prefix: 'outline', prop: 'outline-color', desc: 'outline color' },
    { prefix: 'accent', prop: 'accent-color', desc: 'accent color for form controls' },
    { prefix: 'caret', prop: 'caret-color', desc: 'text cursor color' },
    { prefix: 'fill', prop: 'fill', desc: 'SVG fill color' },
    { prefix: 'stroke', prop: 'stroke', desc: 'SVG stroke color' },
    { prefix: 'decoration', prop: 'text-decoration-color', desc: 'underline/decoration color' },
    { prefix: 'shadow', prop: '--tw-shadow-color', desc: 'box shadow color' },
    { prefix: 'placeholder', prop: 'color', desc: 'placeholder text color' },
  ]

  // Process color palettes
  for (const [colorName, colorValue] of Object.entries(colors)) {
    if (typeof colorValue === 'string') {
      // Simple color (e.g., transparent, inherit)
      for (const { prefix, prop, desc } of colorPrefixes) {
        items.push({
          label: `${prefix}-${colorName}`,
          category: 'colors',
          css: `${prop}: ${colorValue};`,
          description: `Set ${desc} to ${colorName}`,
          color: colorValue,
          sortOrder: 20,
        })
      }
    } else if (typeof colorValue === 'object' && colorValue !== null) {
      // Color palette (e.g., coral-500)
      const colorScale = colorValue as unknown as { [key: string]: string }
      for (const shade of Object.keys(colorScale)) {
        const shadeValue = colorScale[shade]
        if (typeof shadeValue !== 'string') { continue }
        for (const { prefix, prop, desc } of colorPrefixes) {
          const label = shade === 'DEFAULT' ? `${prefix}-${colorName}` : `${prefix}-${colorName}-${shade}`
          items.push({
            label,
            category: 'colors',
            css: `${prop}: ${shadeValue};`,
            description: `Set ${desc} to ${colorName}-${shade}`,
            color: shadeValue,
            sortOrder: 20,
          })

          // Opacity variants
          for (const opacity of [5, 10, 20, 25, 30, 40, 50, 60, 70, 75, 80, 90, 95]) {
            items.push({
              label: `${label}/${opacity}`,
              category: 'colors',
              css: `${prop}: ${shadeValue}; opacity: ${opacity}%;`,
              description: `Set ${desc} to ${colorName}-${shade} with ${opacity}% opacity`,
              color: shadeValue,
              sortOrder: 21,
            })
          }
        }
      }
    }
  }

  // Special color values
  const specialColors = ['inherit', 'current', 'transparent']
  for (const color of specialColors) {
    for (const { prefix, prop, desc } of colorPrefixes) {
      items.push({
        label: `${prefix}-${color}`,
        category: 'colors',
        css: `${prop}: ${color === 'current' ? 'currentColor' : color};`,
        description: `Set ${desc} to ${color}`,
        sortOrder: 22,
      })
    }
  }

  return items
}

/**
 * Generate typography completions
 */
function generateTypographyCompletions(_theme: Theme): CompletionItem[] {
  const items: CompletionItem[] = []

  // Font size
  const fontSizes: Record<string, string> = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  }

  for (const [size, value] of Object.entries(fontSizes)) {
    items.push({
      label: `text-${size}`,
      category: 'typography',
      css: `font-size: ${value};`,
      description: `Set font size to ${value}`,
      sortOrder: 30,
    })
  }

  // Font weight
  const fontWeights: Record<string, string> = {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  }

  for (const [weight, value] of Object.entries(fontWeights)) {
    items.push({
      label: `font-${weight}`,
      category: 'typography',
      css: `font-weight: ${value};`,
      description: `Set font weight to ${value}`,
      sortOrder: 31,
    })
  }

  // Font family
  const fontFamilies = ['sans', 'serif', 'mono']
  for (const family of fontFamilies) {
    items.push({
      label: `font-${family}`,
      category: 'typography',
      css: `font-family: var(--font-${family});`,
      description: `Use ${family} font family`,
      sortOrder: 32,
    })
  }

  // Letter spacing
  const tracking: Record<string, string> = {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  }

  for (const [name, value] of Object.entries(tracking)) {
    items.push({
      label: `tracking-${name}`,
      category: 'typography',
      css: `letter-spacing: ${value};`,
      description: `Set letter spacing to ${value}`,
      sortOrder: 33,
    })
  }

  // Line height
  const leading: Record<string, string> = {
    none: '1',
    tight: '1.25',
    snug: '1.375',
    normal: '1.5',
    relaxed: '1.625',
    loose: '2',
    '3': '.75rem',
    '4': '1rem',
    '5': '1.25rem',
    '6': '1.5rem',
    '7': '1.75rem',
    '8': '2rem',
    '9': '2.25rem',
    '10': '2.5rem',
  }

  for (const [name, value] of Object.entries(leading)) {
    items.push({
      label: `leading-${name}`,
      category: 'typography',
      css: `line-height: ${value};`,
      description: `Set line height to ${value}`,
      sortOrder: 34,
    })
  }

  // Text alignment
  const textAligns = ['left', 'center', 'right', 'justify', 'start', 'end']
  for (const align of textAligns) {
    items.push({
      label: `text-${align}`,
      category: 'typography',
      css: `text-align: ${align};`,
      description: `Align text to ${align}`,
      sortOrder: 35,
    })
  }

  // Text decoration
  items.push(
    { label: 'underline', category: 'typography', css: 'text-decoration-line: underline;', description: 'Add underline', sortOrder: 36 },
    { label: 'overline', category: 'typography', css: 'text-decoration-line: overline;', description: 'Add overline', sortOrder: 36 },
    { label: 'line-through', category: 'typography', css: 'text-decoration-line: line-through;', description: 'Add strikethrough', sortOrder: 36 },
    { label: 'no-underline', category: 'typography', css: 'text-decoration-line: none;', description: 'Remove text decoration', sortOrder: 36 },
  )

  // Text transform
  items.push(
    { label: 'uppercase', category: 'typography', css: 'text-transform: uppercase;', description: 'Transform to uppercase', sortOrder: 37 },
    { label: 'lowercase', category: 'typography', css: 'text-transform: lowercase;', description: 'Transform to lowercase', sortOrder: 37 },
    { label: 'capitalize', category: 'typography', css: 'text-transform: capitalize;', description: 'Capitalize each word', sortOrder: 37 },
    { label: 'normal-case', category: 'typography', css: 'text-transform: none;', description: 'No text transform', sortOrder: 37 },
  )

  // Truncate and wrapping
  items.push(
    { label: 'truncate', category: 'typography', css: 'overflow: hidden; text-overflow: ellipsis; white-space: nowrap;', description: 'Truncate text with ellipsis', sortOrder: 38 },
    { label: 'text-ellipsis', category: 'typography', css: 'text-overflow: ellipsis;', description: 'Use ellipsis for overflow', sortOrder: 38 },
    { label: 'text-clip', category: 'typography', css: 'text-overflow: clip;', description: 'Clip overflowing text', sortOrder: 38 },
    { label: 'text-wrap', category: 'typography', css: 'text-wrap: wrap;', description: 'Allow text wrapping', sortOrder: 38 },
    { label: 'text-nowrap', category: 'typography', css: 'text-wrap: nowrap;', description: 'Prevent text wrapping', sortOrder: 38 },
    { label: 'text-balance', category: 'typography', css: 'text-wrap: balance;', description: 'Balance text across lines', sortOrder: 38 },
    { label: 'text-pretty', category: 'typography', css: 'text-wrap: pretty;', description: 'Pretty text wrapping', sortOrder: 38 },
  )

  // Whitespace
  const whitespaces = ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces']
  for (const ws of whitespaces) {
    items.push({
      label: `whitespace-${ws}`,
      category: 'typography',
      css: `white-space: ${ws};`,
      description: `Set white-space to ${ws}`,
      sortOrder: 39,
    })
  }

  // Word break
  items.push(
    { label: 'break-normal', category: 'typography', css: 'overflow-wrap: normal; word-break: normal;', description: 'Normal word breaks', sortOrder: 40 },
    { label: 'break-words', category: 'typography', css: 'overflow-wrap: break-word;', description: 'Break words to prevent overflow', sortOrder: 40 },
    { label: 'break-all', category: 'typography', css: 'word-break: break-all;', description: 'Break anywhere', sortOrder: 40 },
    { label: 'break-keep', category: 'typography', css: 'word-break: keep-all;', description: 'Keep words together', sortOrder: 40 },
  )

  return items
}

/**
 * Generate layout completions
 */
function generateLayoutCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Display
  const displays = ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents', 'flow-root', 'hidden', 'table', 'table-row', 'table-cell']
  for (const display of displays) {
    items.push({
      label: display === 'hidden' ? 'hidden' : display,
      category: 'layout',
      css: display === 'hidden' ? 'display: none;' : `display: ${display};`,
      description: `Set display to ${display}`,
      sortOrder: 50,
    })
  }

  // Position
  const positions = ['static', 'fixed', 'absolute', 'relative', 'sticky']
  for (const position of positions) {
    items.push({
      label: position,
      category: 'layout',
      css: `position: ${position};`,
      description: `Set position to ${position}`,
      sortOrder: 51,
    })
  }

  // Inset
  const insetValues = ['0', 'px', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', 'auto', '1/2', '1/3', '2/3', '1/4', '3/4', 'full']
  for (const value of insetValues) {
    items.push(
      { label: `inset-${value}`, category: 'layout', css: `inset: ${value};`, description: `Set inset to ${value}`, sortOrder: 52 },
      { label: `inset-x-${value}`, category: 'layout', css: `left: ${value}; right: ${value};`, description: `Set horizontal inset to ${value}`, sortOrder: 52 },
      { label: `inset-y-${value}`, category: 'layout', css: `top: ${value}; bottom: ${value};`, description: `Set vertical inset to ${value}`, sortOrder: 52 },
      { label: `top-${value}`, category: 'layout', css: `top: ${value};`, description: `Set top to ${value}`, sortOrder: 52 },
      { label: `right-${value}`, category: 'layout', css: `right: ${value};`, description: `Set right to ${value}`, sortOrder: 52 },
      { label: `bottom-${value}`, category: 'layout', css: `bottom: ${value};`, description: `Set bottom to ${value}`, sortOrder: 52 },
      { label: `left-${value}`, category: 'layout', css: `left: ${value};`, description: `Set left to ${value}`, sortOrder: 52 },
    )
  }

  // Z-index
  const zIndexes = ['0', '10', '20', '30', '40', '50', 'auto']
  for (const z of zIndexes) {
    items.push({
      label: `z-${z}`,
      category: 'layout',
      css: `z-index: ${z};`,
      description: `Set z-index to ${z}`,
      sortOrder: 53,
    })
  }

  // Overflow
  const overflows = ['auto', 'hidden', 'clip', 'visible', 'scroll']
  for (const overflow of overflows) {
    items.push(
      { label: `overflow-${overflow}`, category: 'layout', css: `overflow: ${overflow};`, description: `Set overflow to ${overflow}`, sortOrder: 54 },
      { label: `overflow-x-${overflow}`, category: 'layout', css: `overflow-x: ${overflow};`, description: `Set horizontal overflow to ${overflow}`, sortOrder: 54 },
      { label: `overflow-y-${overflow}`, category: 'layout', css: `overflow-y: ${overflow};`, description: `Set vertical overflow to ${overflow}`, sortOrder: 54 },
    )
  }

  // Visibility
  items.push(
    { label: 'visible', category: 'layout', css: 'visibility: visible;', description: 'Make element visible', sortOrder: 55 },
    { label: 'invisible', category: 'layout', css: 'visibility: hidden;', description: 'Make element invisible', sortOrder: 55 },
    { label: 'collapse', category: 'layout', css: 'visibility: collapse;', description: 'Collapse element', sortOrder: 55 },
  )

  // Float and clear
  items.push(
    { label: 'float-right', category: 'layout', css: 'float: right;', description: 'Float element right', sortOrder: 56 },
    { label: 'float-left', category: 'layout', css: 'float: left;', description: 'Float element left', sortOrder: 56 },
    { label: 'float-none', category: 'layout', css: 'float: none;', description: 'Remove float', sortOrder: 56 },
    { label: 'clear-left', category: 'layout', css: 'clear: left;', description: 'Clear left floats', sortOrder: 56 },
    { label: 'clear-right', category: 'layout', css: 'clear: right;', description: 'Clear right floats', sortOrder: 56 },
    { label: 'clear-both', category: 'layout', css: 'clear: both;', description: 'Clear all floats', sortOrder: 56 },
    { label: 'clear-none', category: 'layout', css: 'clear: none;', description: 'Remove clear', sortOrder: 56 },
  )

  // Isolation
  items.push(
    { label: 'isolate', category: 'layout', css: 'isolation: isolate;', description: 'Create stacking context', sortOrder: 57 },
    { label: 'isolation-auto', category: 'layout', css: 'isolation: auto;', description: 'Auto isolation', sortOrder: 57 },
  )

  // Object fit
  const objectFits = ['contain', 'cover', 'fill', 'none', 'scale-down']
  for (const fit of objectFits) {
    items.push({
      label: `object-${fit}`,
      category: 'layout',
      css: `object-fit: ${fit};`,
      description: `Set object-fit to ${fit}`,
      sortOrder: 58,
    })
  }

  // Object position
  const objectPositions = ['bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top']
  for (const pos of objectPositions) {
    items.push({
      label: `object-${pos}`,
      category: 'layout',
      css: `object-position: ${pos.replace('-', ' ')};`,
      description: `Set object-position to ${pos}`,
      sortOrder: 58,
    })
  }

  return items
}

/**
 * Generate flexbox completions
 */
function generateFlexboxCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Flex direction
  items.push(
    { label: 'flex-row', category: 'flexbox', css: 'flex-direction: row;', description: 'Horizontal flex direction', sortOrder: 60 },
    { label: 'flex-row-reverse', category: 'flexbox', css: 'flex-direction: row-reverse;', description: 'Reversed horizontal flex', sortOrder: 60 },
    { label: 'flex-col', category: 'flexbox', css: 'flex-direction: column;', description: 'Vertical flex direction', sortOrder: 60 },
    { label: 'flex-col-reverse', category: 'flexbox', css: 'flex-direction: column-reverse;', description: 'Reversed vertical flex', sortOrder: 60 },
  )

  // Flex wrap
  items.push(
    { label: 'flex-wrap', category: 'flexbox', css: 'flex-wrap: wrap;', description: 'Allow flex wrapping', sortOrder: 61 },
    { label: 'flex-wrap-reverse', category: 'flexbox', css: 'flex-wrap: wrap-reverse;', description: 'Reverse flex wrapping', sortOrder: 61 },
    { label: 'flex-nowrap', category: 'flexbox', css: 'flex-wrap: nowrap;', description: 'Prevent flex wrapping', sortOrder: 61 },
  )

  // Flex grow/shrink
  items.push(
    { label: 'flex-1', category: 'flexbox', css: 'flex: 1 1 0%;', description: 'Grow and shrink equally', sortOrder: 62 },
    { label: 'flex-auto', category: 'flexbox', css: 'flex: 1 1 auto;', description: 'Grow and shrink based on content', sortOrder: 62 },
    { label: 'flex-initial', category: 'flexbox', css: 'flex: 0 1 auto;', description: 'Shrink but dont grow', sortOrder: 62 },
    { label: 'flex-none', category: 'flexbox', css: 'flex: none;', description: 'Dont grow or shrink', sortOrder: 62 },
    { label: 'grow', category: 'flexbox', css: 'flex-grow: 1;', description: 'Allow growing', sortOrder: 62 },
    { label: 'grow-0', category: 'flexbox', css: 'flex-grow: 0;', description: 'Prevent growing', sortOrder: 62 },
    { label: 'shrink', category: 'flexbox', css: 'flex-shrink: 1;', description: 'Allow shrinking', sortOrder: 62 },
    { label: 'shrink-0', category: 'flexbox', css: 'flex-shrink: 0;', description: 'Prevent shrinking', sortOrder: 62 },
  )

  // Justify content
  const justifyContent = [
    { name: 'start', value: 'flex-start' },
    { name: 'end', value: 'flex-end' },
    { name: 'center', value: 'center' },
    { name: 'between', value: 'space-between' },
    { name: 'around', value: 'space-around' },
    { name: 'evenly', value: 'space-evenly' },
    { name: 'stretch', value: 'stretch' },
  ]
  for (const { name, value } of justifyContent) {
    items.push({
      label: `justify-${name}`,
      category: 'flexbox',
      css: `justify-content: ${value};`,
      description: `Justify content to ${name}`,
      sortOrder: 63,
    })
  }

  // Justify items
  const justifyItems = ['start', 'end', 'center', 'stretch']
  for (const item of justifyItems) {
    items.push({
      label: `justify-items-${item}`,
      category: 'flexbox',
      css: `justify-items: ${item};`,
      description: `Justify items to ${item}`,
      sortOrder: 63,
    })
  }

  // Justify self
  for (const item of justifyItems) {
    items.push({
      label: `justify-self-${item}`,
      category: 'flexbox',
      css: `justify-self: ${item};`,
      description: `Justify self to ${item}`,
      sortOrder: 63,
    })
  }

  // Align content
  const alignContent = [
    { name: 'start', value: 'flex-start' },
    { name: 'end', value: 'flex-end' },
    { name: 'center', value: 'center' },
    { name: 'between', value: 'space-between' },
    { name: 'around', value: 'space-around' },
    { name: 'evenly', value: 'space-evenly' },
    { name: 'baseline', value: 'baseline' },
    { name: 'stretch', value: 'stretch' },
  ]
  for (const { name, value } of alignContent) {
    items.push({
      label: `content-${name}`,
      category: 'flexbox',
      css: `align-content: ${value};`,
      description: `Align content to ${name}`,
      sortOrder: 64,
    })
  }

  // Align items
  const alignItems = [
    { name: 'start', value: 'flex-start' },
    { name: 'end', value: 'flex-end' },
    { name: 'center', value: 'center' },
    { name: 'baseline', value: 'baseline' },
    { name: 'stretch', value: 'stretch' },
  ]
  for (const { name, value } of alignItems) {
    items.push({
      label: `items-${name}`,
      category: 'flexbox',
      css: `align-items: ${value};`,
      description: `Align items to ${name}`,
      sortOrder: 64,
    })
  }

  // Align self
  for (const { name, value } of alignItems) {
    items.push({
      label: `self-${name}`,
      category: 'flexbox',
      css: `align-self: ${value};`,
      description: `Align self to ${name}`,
      sortOrder: 64,
    })
  }
  items.push({ label: 'self-auto', category: 'flexbox', css: 'align-self: auto;', description: 'Auto align self', sortOrder: 64 })

  // Place content/items/self
  const placeValues = ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch']
  for (const value of placeValues) {
    items.push(
      { label: `place-content-${value}`, category: 'flexbox', css: `place-content: ${value};`, description: `Place content to ${value}`, sortOrder: 65 },
      { label: `place-items-${value}`, category: 'flexbox', css: `place-items: ${value};`, description: `Place items to ${value}`, sortOrder: 65 },
      { label: `place-self-${value}`, category: 'flexbox', css: `place-self: ${value};`, description: `Place self to ${value}`, sortOrder: 65 },
    )
  }

  // Order
  const orders = ['first', 'last', 'none', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  for (const order of orders) {
    const value = order === 'first' ? '-9999' : order === 'last' ? '9999' : order === 'none' ? '0' : order
    items.push({
      label: `order-${order}`,
      category: 'flexbox',
      css: `order: ${value};`,
      description: `Set order to ${order}`,
      sortOrder: 66,
    })
  }

  return items
}

/**
 * Generate grid completions
 */
function generateGridCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Grid template columns
  for (let i = 1; i <= 12; i++) {
    items.push({
      label: `grid-cols-${i}`,
      category: 'grid',
      css: `grid-template-columns: repeat(${i}, minmax(0, 1fr));`,
      description: `Create ${i} equal columns`,
      sortOrder: 70,
    })
  }
  items.push(
    { label: 'grid-cols-none', category: 'grid', css: 'grid-template-columns: none;', description: 'No grid columns', sortOrder: 70 },
    { label: 'grid-cols-subgrid', category: 'grid', css: 'grid-template-columns: subgrid;', description: 'Use parent grid columns', sortOrder: 70 },
  )

  // Grid template rows
  for (let i = 1; i <= 6; i++) {
    items.push({
      label: `grid-rows-${i}`,
      category: 'grid',
      css: `grid-template-rows: repeat(${i}, minmax(0, 1fr));`,
      description: `Create ${i} equal rows`,
      sortOrder: 71,
    })
  }
  items.push(
    { label: 'grid-rows-none', category: 'grid', css: 'grid-template-rows: none;', description: 'No grid rows', sortOrder: 71 },
    { label: 'grid-rows-subgrid', category: 'grid', css: 'grid-template-rows: subgrid;', description: 'Use parent grid rows', sortOrder: 71 },
  )

  // Grid column span
  for (let i = 1; i <= 12; i++) {
    items.push({
      label: `col-span-${i}`,
      category: 'grid',
      css: `grid-column: span ${i} / span ${i};`,
      description: `Span ${i} columns`,
      sortOrder: 72,
    })
  }
  items.push(
    { label: 'col-span-full', category: 'grid', css: 'grid-column: 1 / -1;', description: 'Span all columns', sortOrder: 72 },
    { label: 'col-auto', category: 'grid', css: 'grid-column: auto;', description: 'Auto column placement', sortOrder: 72 },
  )

  // Grid column start/end
  for (let i = 1; i <= 13; i++) {
    items.push(
      { label: `col-start-${i}`, category: 'grid', css: `grid-column-start: ${i};`, description: `Start at column ${i}`, sortOrder: 73 },
      { label: `col-end-${i}`, category: 'grid', css: `grid-column-end: ${i};`, description: `End at column ${i}`, sortOrder: 73 },
    )
  }
  items.push(
    { label: 'col-start-auto', category: 'grid', css: 'grid-column-start: auto;', description: 'Auto column start', sortOrder: 73 },
    { label: 'col-end-auto', category: 'grid', css: 'grid-column-end: auto;', description: 'Auto column end', sortOrder: 73 },
  )

  // Grid row span
  for (let i = 1; i <= 6; i++) {
    items.push({
      label: `row-span-${i}`,
      category: 'grid',
      css: `grid-row: span ${i} / span ${i};`,
      description: `Span ${i} rows`,
      sortOrder: 74,
    })
  }
  items.push(
    { label: 'row-span-full', category: 'grid', css: 'grid-row: 1 / -1;', description: 'Span all rows', sortOrder: 74 },
    { label: 'row-auto', category: 'grid', css: 'grid-row: auto;', description: 'Auto row placement', sortOrder: 74 },
  )

  // Grid row start/end
  for (let i = 1; i <= 7; i++) {
    items.push(
      { label: `row-start-${i}`, category: 'grid', css: `grid-row-start: ${i};`, description: `Start at row ${i}`, sortOrder: 75 },
      { label: `row-end-${i}`, category: 'grid', css: `grid-row-end: ${i};`, description: `End at row ${i}`, sortOrder: 75 },
    )
  }
  items.push(
    { label: 'row-start-auto', category: 'grid', css: 'grid-row-start: auto;', description: 'Auto row start', sortOrder: 75 },
    { label: 'row-end-auto', category: 'grid', css: 'grid-row-end: auto;', description: 'Auto row end', sortOrder: 75 },
  )

  // Grid auto flow
  items.push(
    { label: 'grid-flow-row', category: 'grid', css: 'grid-auto-flow: row;', description: 'Place items row by row', sortOrder: 76 },
    { label: 'grid-flow-col', category: 'grid', css: 'grid-auto-flow: column;', description: 'Place items column by column', sortOrder: 76 },
    { label: 'grid-flow-dense', category: 'grid', css: 'grid-auto-flow: dense;', description: 'Fill holes in grid', sortOrder: 76 },
    { label: 'grid-flow-row-dense', category: 'grid', css: 'grid-auto-flow: row dense;', description: 'Row flow with dense packing', sortOrder: 76 },
    { label: 'grid-flow-col-dense', category: 'grid', css: 'grid-auto-flow: column dense;', description: 'Column flow with dense packing', sortOrder: 76 },
  )

  // Auto columns/rows
  const autoSizes = ['auto', 'min', 'max', 'fr']
  for (const size of autoSizes) {
    const value = size === 'min' ? 'min-content' : size === 'max' ? 'max-content' : size === 'fr' ? 'minmax(0, 1fr)' : size
    items.push(
      { label: `auto-cols-${size}`, category: 'grid', css: `grid-auto-columns: ${value};`, description: `Auto columns: ${size}`, sortOrder: 77 },
      { label: `auto-rows-${size}`, category: 'grid', css: `grid-auto-rows: ${value};`, description: `Auto rows: ${size}`, sortOrder: 77 },
    )
  }

  return items
}

/**
 * Generate sizing completions
 */
function generateSizingCompletions(theme: Theme): CompletionItem[] {
  const items: CompletionItem[] = []
  const spacing = theme.spacing || {}

  // Width values
  for (const [key, value] of Object.entries(spacing)) {
    items.push({
      label: `w-${key}`,
      category: 'sizing',
      css: `width: ${value};`,
      description: `Set width to ${value}`,
      sortOrder: 80,
    })
    items.push({
      label: `h-${key}`,
      category: 'sizing',
      css: `height: ${value};`,
      description: `Set height to ${value}`,
      sortOrder: 80,
    })
  }

  // Percentage widths
  const percentages = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', 'full', 'screen']
  for (const pct of percentages) {
    const value = pct === 'full' ? '100%' : pct === 'screen' ? '100vw' : `${parseFraction(pct) * 100}%`
    items.push({
      label: `w-${pct}`,
      category: 'sizing',
      css: `width: ${value};`,
      description: `Set width to ${pct}`,
      sortOrder: 81,
    })
  }

  // Height percentages
  const heightPcts = ['1/2', '1/3', '2/3', '1/4', '2/4', '3/4', '1/5', '2/5', '3/5', '4/5', '1/6', '5/6', 'full', 'screen', 'svh', 'lvh', 'dvh']
  for (const pct of heightPcts) {
    let value: string
    if (pct === 'full') { value = '100%' }
    else if (pct === 'screen') { value = '100vh' }
    else if (pct === 'svh') { value = '100svh' }
    else if (pct === 'lvh') { value = '100lvh' }
    else if (pct === 'dvh') { value = '100dvh' }
    else { value = `${parseFraction(pct) * 100}%` }
    items.push({
      label: `h-${pct}`,
      category: 'sizing',
      css: `height: ${value};`,
      description: `Set height to ${pct}`,
      sortOrder: 81,
    })
  }

  // Special sizes
  items.push(
    { label: 'w-auto', category: 'sizing', css: 'width: auto;', description: 'Auto width', sortOrder: 82 },
    { label: 'w-min', category: 'sizing', css: 'width: min-content;', description: 'Min-content width', sortOrder: 82 },
    { label: 'w-max', category: 'sizing', css: 'width: max-content;', description: 'Max-content width', sortOrder: 82 },
    { label: 'w-fit', category: 'sizing', css: 'width: fit-content;', description: 'Fit-content width', sortOrder: 82 },
    { label: 'h-auto', category: 'sizing', css: 'height: auto;', description: 'Auto height', sortOrder: 82 },
    { label: 'h-min', category: 'sizing', css: 'height: min-content;', description: 'Min-content height', sortOrder: 82 },
    { label: 'h-max', category: 'sizing', css: 'height: max-content;', description: 'Max-content height', sortOrder: 82 },
    { label: 'h-fit', category: 'sizing', css: 'height: fit-content;', description: 'Fit-content height', sortOrder: 82 },
  )

  // Min/max width
  const minMaxSizes = ['0', 'full', 'min', 'max', 'fit']
  for (const size of minMaxSizes) {
    const value = size === 'full' ? '100%' : size === 'min' ? 'min-content' : size === 'max' ? 'max-content' : size === 'fit' ? 'fit-content' : size
    items.push(
      { label: `min-w-${size}`, category: 'sizing', css: `min-width: ${value};`, description: `Min-width: ${size}`, sortOrder: 83 },
      { label: `max-w-${size}`, category: 'sizing', css: `max-width: ${value};`, description: `Max-width: ${size}`, sortOrder: 83 },
      { label: `min-h-${size}`, category: 'sizing', css: `min-height: ${value};`, description: `Min-height: ${size}`, sortOrder: 83 },
      { label: `max-h-${size}`, category: 'sizing', css: `max-height: ${value};`, description: `Max-height: ${size}`, sortOrder: 83 },
    )
  }

  // Max-width sizes
  const maxWidthSizes: Record<string, string> = {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    '3xl': '48rem',
    '4xl': '56rem',
    '5xl': '64rem',
    '6xl': '72rem',
    '7xl': '80rem',
    prose: '65ch',
    'screen-sm': '640px',
    'screen-md': '768px',
    'screen-lg': '1024px',
    'screen-xl': '1280px',
    'screen-2xl': '1536px',
  }
  for (const [name, value] of Object.entries(maxWidthSizes)) {
    items.push({
      label: `max-w-${name}`,
      category: 'sizing',
      css: `max-width: ${value};`,
      description: `Max-width: ${value}`,
      sortOrder: 84,
    })
  }

  // Size (width + height)
  for (const [key, value] of Object.entries(spacing)) {
    items.push({
      label: `size-${key}`,
      category: 'sizing',
      css: `width: ${value}; height: ${value};`,
      description: `Set size to ${value}`,
      sortOrder: 85,
    })
  }

  return items
}

/**
 * Generate border completions
 */
function generateBorderCompletions(_theme: Theme): CompletionItem[] {
  const items: CompletionItem[] = []

  // Border width
  const borderWidths = ['0', '2', '4', '8', '']
  for (const width of borderWidths) {
    const value = width === '' ? '1px' : `${width}px`
    const label = width === '' ? 'border' : `border-${width}`
    items.push(
      { label, category: 'borders', css: `border-width: ${value};`, description: `Border width: ${value}`, sortOrder: 90 },
      { label: `${label}-x`, category: 'borders', css: `border-left-width: ${value}; border-right-width: ${value};`, description: `Horizontal border: ${value}`, sortOrder: 90 },
      { label: `${label}-y`, category: 'borders', css: `border-top-width: ${value}; border-bottom-width: ${value};`, description: `Vertical border: ${value}`, sortOrder: 90 },
      { label: `${label}-t`, category: 'borders', css: `border-top-width: ${value};`, description: `Top border: ${value}`, sortOrder: 90 },
      { label: `${label}-r`, category: 'borders', css: `border-right-width: ${value};`, description: `Right border: ${value}`, sortOrder: 90 },
      { label: `${label}-b`, category: 'borders', css: `border-bottom-width: ${value};`, description: `Bottom border: ${value}`, sortOrder: 90 },
      { label: `${label}-l`, category: 'borders', css: `border-left-width: ${value};`, description: `Left border: ${value}`, sortOrder: 90 },
    )
  }

  // Border style
  const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none']
  for (const style of borderStyles) {
    items.push({
      label: `border-${style}`,
      category: 'borders',
      css: `border-style: ${style};`,
      description: `Border style: ${style}`,
      sortOrder: 91,
    })
  }

  // Border radius
  const radiusSizes: Record<string, string> = {
    none: '0px',
    sm: '0.125rem',
    '': '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  }
  for (const [name, value] of Object.entries(radiusSizes)) {
    const label = name === '' ? 'rounded' : `rounded-${name}`
    items.push(
      { label, category: 'borders', css: `border-radius: ${value};`, description: `Border radius: ${value}`, sortOrder: 92 },
      { label: `${label}-t`, category: 'borders', css: `border-top-left-radius: ${value}; border-top-right-radius: ${value};`, description: `Top radius: ${value}`, sortOrder: 92 },
      { label: `${label}-r`, category: 'borders', css: `border-top-right-radius: ${value}; border-bottom-right-radius: ${value};`, description: `Right radius: ${value}`, sortOrder: 92 },
      { label: `${label}-b`, category: 'borders', css: `border-bottom-left-radius: ${value}; border-bottom-right-radius: ${value};`, description: `Bottom radius: ${value}`, sortOrder: 92 },
      { label: `${label}-l`, category: 'borders', css: `border-top-left-radius: ${value}; border-bottom-left-radius: ${value};`, description: `Left radius: ${value}`, sortOrder: 92 },
      { label: `${label}-tl`, category: 'borders', css: `border-top-left-radius: ${value};`, description: `Top-left radius: ${value}`, sortOrder: 92 },
      { label: `${label}-tr`, category: 'borders', css: `border-top-right-radius: ${value};`, description: `Top-right radius: ${value}`, sortOrder: 92 },
      { label: `${label}-br`, category: 'borders', css: `border-bottom-right-radius: ${value};`, description: `Bottom-right radius: ${value}`, sortOrder: 92 },
      { label: `${label}-bl`, category: 'borders', css: `border-bottom-left-radius: ${value};`, description: `Bottom-left radius: ${value}`, sortOrder: 92 },
    )
  }

  // Divide
  const divideWidths = ['0', '2', '4', '8', '']
  for (const width of divideWidths) {
    const value = width === '' ? '1px' : `${width}px`
    const label = width === '' ? 'divide' : `divide-${width}`
    items.push(
      { label: `${label}-x`, category: 'borders', css: `> * + * { border-left-width: ${value}; }`, description: `Horizontal divide: ${value}`, sortOrder: 93 },
      { label: `${label}-y`, category: 'borders', css: `> * + * { border-top-width: ${value}; }`, description: `Vertical divide: ${value}`, sortOrder: 93 },
    )
  }

  // Divide style
  for (const style of borderStyles) {
    items.push({
      label: `divide-${style}`,
      category: 'borders',
      css: `> * + * { border-style: ${style}; }`,
      description: `Divide style: ${style}`,
      sortOrder: 93,
    })
  }

  // Outline
  items.push(
    { label: 'outline', category: 'borders', css: 'outline-style: solid;', description: 'Solid outline', sortOrder: 94 },
    { label: 'outline-none', category: 'borders', css: 'outline: 2px solid transparent; outline-offset: 2px;', description: 'Remove outline', sortOrder: 94 },
    { label: 'outline-dashed', category: 'borders', css: 'outline-style: dashed;', description: 'Dashed outline', sortOrder: 94 },
    { label: 'outline-dotted', category: 'borders', css: 'outline-style: dotted;', description: 'Dotted outline', sortOrder: 94 },
    { label: 'outline-double', category: 'borders', css: 'outline-style: double;', description: 'Double outline', sortOrder: 94 },
  )

  // Outline width
  const outlineWidths = ['0', '1', '2', '4', '8']
  for (const width of outlineWidths) {
    items.push({
      label: `outline-${width}`,
      category: 'borders',
      css: `outline-width: ${width}px;`,
      description: `Outline width: ${width}px`,
      sortOrder: 94,
    })
  }

  // Outline offset
  for (const offset of outlineWidths) {
    items.push({
      label: `outline-offset-${offset}`,
      category: 'borders',
      css: `outline-offset: ${offset}px;`,
      description: `Outline offset: ${offset}px`,
      sortOrder: 94,
    })
  }

  // Ring
  const ringWidths = ['0', '1', '2', '4', '8', '']
  for (const width of ringWidths) {
    const value = width === '' ? '3px' : `${width}px`
    const label = width === '' ? 'ring' : `ring-${width}`
    items.push({
      label,
      category: 'borders',
      css: `box-shadow: 0 0 0 ${value} var(--tw-ring-color);`,
      description: `Ring width: ${value}`,
      sortOrder: 95,
    })
  }
  items.push({ label: 'ring-inset', category: 'borders', css: '--tw-ring-inset: inset;', description: 'Inset ring', sortOrder: 95 })

  // Ring offset
  for (const offset of ['0', '1', '2', '4', '8']) {
    items.push({
      label: `ring-offset-${offset}`,
      category: 'borders',
      css: `--tw-ring-offset-width: ${offset}px;`,
      description: `Ring offset: ${offset}px`,
      sortOrder: 95,
    })
  }

  return items
}

/**
 * Generate effect completions
 */
function generateEffectCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Box shadow
  const shadows: Record<string, string> = {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
    none: 'none',
  }
  for (const [name, value] of Object.entries(shadows)) {
    const label = name === '' ? 'shadow' : `shadow-${name}`
    items.push({
      label,
      category: 'effects',
      css: `box-shadow: ${value};`,
      description: `Box shadow: ${name || 'default'}`,
      sortOrder: 100,
    })
  }

  // Opacity
  const opacities = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]
  for (const opacity of opacities) {
    items.push({
      label: `opacity-${opacity}`,
      category: 'effects',
      css: `opacity: ${opacity / 100};`,
      description: `Set opacity to ${opacity}%`,
      sortOrder: 101,
    })
  }

  // Mix blend mode
  const blendModes = ['normal', 'multiply', 'screen', 'overlay', 'darken', 'lighten', 'color-dodge', 'color-burn', 'hard-light', 'soft-light', 'difference', 'exclusion', 'hue', 'saturation', 'color', 'luminosity', 'plus-lighter']
  for (const mode of blendModes) {
    items.push({
      label: `mix-blend-${mode}`,
      category: 'effects',
      css: `mix-blend-mode: ${mode};`,
      description: `Mix blend mode: ${mode}`,
      sortOrder: 102,
    })
  }

  // Background blend mode
  for (const mode of blendModes) {
    items.push({
      label: `bg-blend-${mode}`,
      category: 'effects',
      css: `background-blend-mode: ${mode};`,
      description: `Background blend mode: ${mode}`,
      sortOrder: 102,
    })
  }

  return items
}

/**
 * Generate transform completions
 */
function generateTransformCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Scale
  const scales = [0, 50, 75, 90, 95, 100, 105, 110, 125, 150]
  for (const scale of scales) {
    items.push(
      { label: `scale-${scale}`, category: 'transforms', css: `transform: scale(${scale / 100});`, description: `Scale to ${scale}%`, sortOrder: 110 },
      { label: `scale-x-${scale}`, category: 'transforms', css: `transform: scaleX(${scale / 100});`, description: `Scale X to ${scale}%`, sortOrder: 110 },
      { label: `scale-y-${scale}`, category: 'transforms', css: `transform: scaleY(${scale / 100});`, description: `Scale Y to ${scale}%`, sortOrder: 110 },
    )
  }

  // Rotate
  const rotations = [0, 1, 2, 3, 6, 12, 45, 90, 180]
  for (const deg of rotations) {
    items.push(
      { label: `rotate-${deg}`, category: 'transforms', css: `transform: rotate(${deg}deg);`, description: `Rotate ${deg} degrees`, sortOrder: 111 },
      { label: `-rotate-${deg}`, category: 'transforms', css: `transform: rotate(-${deg}deg);`, description: `Rotate -${deg} degrees`, sortOrder: 111 },
    )
  }

  // Translate
  const translates = ['0', 'px', '0.5', '1', '2', '3', '4', '5', '6', '8', '10', '12', '16', '20', '24', '1/2', '1/3', '2/3', '1/4', '3/4', 'full']
  for (const value of translates) {
    items.push(
      { label: `translate-x-${value}`, category: 'transforms', css: `transform: translateX(${value});`, description: `Translate X: ${value}`, sortOrder: 112 },
      { label: `translate-y-${value}`, category: 'transforms', css: `transform: translateY(${value});`, description: `Translate Y: ${value}`, sortOrder: 112 },
      { label: `-translate-x-${value}`, category: 'transforms', css: `transform: translateX(-${value});`, description: `Translate X: -${value}`, sortOrder: 112 },
      { label: `-translate-y-${value}`, category: 'transforms', css: `transform: translateY(-${value});`, description: `Translate Y: -${value}`, sortOrder: 112 },
    )
  }

  // Skew
  const skews = [0, 1, 2, 3, 6, 12]
  for (const deg of skews) {
    items.push(
      { label: `skew-x-${deg}`, category: 'transforms', css: `transform: skewX(${deg}deg);`, description: `Skew X: ${deg}deg`, sortOrder: 113 },
      { label: `skew-y-${deg}`, category: 'transforms', css: `transform: skewY(${deg}deg);`, description: `Skew Y: ${deg}deg`, sortOrder: 113 },
      { label: `-skew-x-${deg}`, category: 'transforms', css: `transform: skewX(-${deg}deg);`, description: `Skew X: -${deg}deg`, sortOrder: 113 },
      { label: `-skew-y-${deg}`, category: 'transforms', css: `transform: skewY(-${deg}deg);`, description: `Skew Y: -${deg}deg`, sortOrder: 113 },
    )
  }

  // Transform origin
  const origins = ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left']
  for (const origin of origins) {
    items.push({
      label: `origin-${origin}`,
      category: 'transforms',
      css: `transform-origin: ${origin.replace('-', ' ')};`,
      description: `Transform origin: ${origin}`,
      sortOrder: 114,
    })
  }

  return items
}

/**
 * Generate transition completions
 */
function generateTransitionCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Transition property
  const transitionProps: Record<string, string> = {
    none: 'none',
    all: 'all',
    '': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter',
    colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
    opacity: 'opacity',
    shadow: 'box-shadow',
    transform: 'transform',
  }
  for (const [name, value] of Object.entries(transitionProps)) {
    const label = name === '' ? 'transition' : `transition-${name}`
    items.push({
      label,
      category: 'transitions',
      css: `transition-property: ${value};`,
      description: `Transition: ${name || 'default properties'}`,
      sortOrder: 120,
    })
  }

  // Duration
  const durations = [0, 75, 100, 150, 200, 300, 500, 700, 1000]
  for (const ms of durations) {
    items.push({
      label: `duration-${ms}`,
      category: 'transitions',
      css: `transition-duration: ${ms}ms;`,
      description: `Duration: ${ms}ms`,
      sortOrder: 121,
    })
  }

  // Timing function
  const easings: Record<string, string> = {
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  }
  for (const [name, value] of Object.entries(easings)) {
    items.push({
      label: `ease-${name}`,
      category: 'transitions',
      css: `transition-timing-function: ${value};`,
      description: `Easing: ${name}`,
      sortOrder: 122,
    })
  }

  // Delay
  for (const ms of durations) {
    items.push({
      label: `delay-${ms}`,
      category: 'transitions',
      css: `transition-delay: ${ms}ms;`,
      description: `Delay: ${ms}ms`,
      sortOrder: 123,
    })
  }

  // Animation
  const animations: Record<string, string> = {
    none: 'none',
    spin: 'spin 1s linear infinite',
    ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    bounce: 'bounce 1s infinite',
  }
  for (const [name, value] of Object.entries(animations)) {
    items.push({
      label: `animate-${name}`,
      category: 'transitions',
      css: `animation: ${value};`,
      description: `Animation: ${name}`,
      sortOrder: 124,
    })
  }

  return items
}

/**
 * Generate filter completions
 */
function generateFilterCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Blur
  const blurs: Record<string, string> = {
    none: '0',
    sm: '4px',
    '': '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    '2xl': '40px',
    '3xl': '64px',
  }
  for (const [name, value] of Object.entries(blurs)) {
    const label = name === '' ? 'blur' : `blur-${name}`
    items.push({
      label,
      category: 'filters',
      css: `filter: blur(${value});`,
      description: `Blur: ${value}`,
      sortOrder: 130,
    })
    items.push({
      label: `backdrop-${label}`,
      category: 'filters',
      css: `backdrop-filter: blur(${value});`,
      description: `Backdrop blur: ${value}`,
      sortOrder: 130,
    })
  }

  // Brightness
  const brightnesses = [0, 50, 75, 90, 95, 100, 105, 110, 125, 150, 200]
  for (const value of brightnesses) {
    items.push({
      label: `brightness-${value}`,
      category: 'filters',
      css: `filter: brightness(${value / 100});`,
      description: `Brightness: ${value}%`,
      sortOrder: 131,
    })
    items.push({
      label: `backdrop-brightness-${value}`,
      category: 'filters',
      css: `backdrop-filter: brightness(${value / 100});`,
      description: `Backdrop brightness: ${value}%`,
      sortOrder: 131,
    })
  }

  // Contrast
  for (const value of brightnesses) {
    items.push({
      label: `contrast-${value}`,
      category: 'filters',
      css: `filter: contrast(${value / 100});`,
      description: `Contrast: ${value}%`,
      sortOrder: 132,
    })
    items.push({
      label: `backdrop-contrast-${value}`,
      category: 'filters',
      css: `backdrop-filter: contrast(${value / 100});`,
      description: `Backdrop contrast: ${value}%`,
      sortOrder: 132,
    })
  }

  // Grayscale
  items.push(
    { label: 'grayscale', category: 'filters', css: 'filter: grayscale(100%);', description: 'Full grayscale', sortOrder: 133 },
    { label: 'grayscale-0', category: 'filters', css: 'filter: grayscale(0);', description: 'No grayscale', sortOrder: 133 },
    { label: 'backdrop-grayscale', category: 'filters', css: 'backdrop-filter: grayscale(100%);', description: 'Backdrop grayscale', sortOrder: 133 },
    { label: 'backdrop-grayscale-0', category: 'filters', css: 'backdrop-filter: grayscale(0);', description: 'No backdrop grayscale', sortOrder: 133 },
  )

  // Invert
  items.push(
    { label: 'invert', category: 'filters', css: 'filter: invert(100%);', description: 'Full invert', sortOrder: 134 },
    { label: 'invert-0', category: 'filters', css: 'filter: invert(0);', description: 'No invert', sortOrder: 134 },
    { label: 'backdrop-invert', category: 'filters', css: 'backdrop-filter: invert(100%);', description: 'Backdrop invert', sortOrder: 134 },
    { label: 'backdrop-invert-0', category: 'filters', css: 'backdrop-filter: invert(0);', description: 'No backdrop invert', sortOrder: 134 },
  )

  // Sepia
  items.push(
    { label: 'sepia', category: 'filters', css: 'filter: sepia(100%);', description: 'Full sepia', sortOrder: 135 },
    { label: 'sepia-0', category: 'filters', css: 'filter: sepia(0);', description: 'No sepia', sortOrder: 135 },
    { label: 'backdrop-sepia', category: 'filters', css: 'backdrop-filter: sepia(100%);', description: 'Backdrop sepia', sortOrder: 135 },
    { label: 'backdrop-sepia-0', category: 'filters', css: 'backdrop-filter: sepia(0);', description: 'No backdrop sepia', sortOrder: 135 },
  )

  // Saturate
  const saturates = [0, 50, 100, 150, 200]
  for (const value of saturates) {
    items.push({
      label: `saturate-${value}`,
      category: 'filters',
      css: `filter: saturate(${value / 100});`,
      description: `Saturate: ${value}%`,
      sortOrder: 136,
    })
    items.push({
      label: `backdrop-saturate-${value}`,
      category: 'filters',
      css: `backdrop-filter: saturate(${value / 100});`,
      description: `Backdrop saturate: ${value}%`,
      sortOrder: 136,
    })
  }

  // Hue rotate
  const hueRotates = [0, 15, 30, 60, 90, 180]
  for (const deg of hueRotates) {
    items.push(
      { label: `hue-rotate-${deg}`, category: 'filters', css: `filter: hue-rotate(${deg}deg);`, description: `Hue rotate: ${deg}deg`, sortOrder: 137 },
      { label: `-hue-rotate-${deg}`, category: 'filters', css: `filter: hue-rotate(-${deg}deg);`, description: `Hue rotate: -${deg}deg`, sortOrder: 137 },
      { label: `backdrop-hue-rotate-${deg}`, category: 'filters', css: `backdrop-filter: hue-rotate(${deg}deg);`, description: `Backdrop hue rotate: ${deg}deg`, sortOrder: 137 },
    )
  }

  // Drop shadow
  const dropShadows: Record<string, string> = {
    sm: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
    '': 'drop-shadow(0 1px 2px rgb(0 0 0 / 0.1)) drop-shadow(0 1px 1px rgb(0 0 0 / 0.06))',
    md: 'drop-shadow(0 4px 3px rgb(0 0 0 / 0.07)) drop-shadow(0 2px 2px rgb(0 0 0 / 0.06))',
    lg: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
    xl: 'drop-shadow(0 20px 13px rgb(0 0 0 / 0.03)) drop-shadow(0 8px 5px rgb(0 0 0 / 0.08))',
    '2xl': 'drop-shadow(0 25px 25px rgb(0 0 0 / 0.15))',
    none: 'drop-shadow(0 0 #0000)',
  }
  for (const [name, value] of Object.entries(dropShadows)) {
    const label = name === '' ? 'drop-shadow' : `drop-shadow-${name}`
    items.push({
      label,
      category: 'filters',
      css: `filter: ${value};`,
      description: `Drop shadow: ${name || 'default'}`,
      sortOrder: 138,
    })
  }

  return items
}

/**
 * Generate interactivity completions
 */
function generateInteractivityCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Cursor
  const cursors = ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 's-resize', 'e-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out']
  for (const cursor of cursors) {
    items.push({
      label: `cursor-${cursor}`,
      category: 'interactivity',
      css: `cursor: ${cursor};`,
      description: `Cursor: ${cursor}`,
      sortOrder: 140,
    })
  }

  // Pointer events
  items.push(
    { label: 'pointer-events-none', category: 'interactivity', css: 'pointer-events: none;', description: 'Disable pointer events', sortOrder: 141 },
    { label: 'pointer-events-auto', category: 'interactivity', css: 'pointer-events: auto;', description: 'Enable pointer events', sortOrder: 141 },
  )

  // Resize
  items.push(
    { label: 'resize-none', category: 'interactivity', css: 'resize: none;', description: 'Disable resizing', sortOrder: 142 },
    { label: 'resize-y', category: 'interactivity', css: 'resize: vertical;', description: 'Vertical resize', sortOrder: 142 },
    { label: 'resize-x', category: 'interactivity', css: 'resize: horizontal;', description: 'Horizontal resize', sortOrder: 142 },
    { label: 'resize', category: 'interactivity', css: 'resize: both;', description: 'Resize in both directions', sortOrder: 142 },
  )

  // Scroll behavior
  items.push(
    { label: 'scroll-auto', category: 'interactivity', css: 'scroll-behavior: auto;', description: 'Instant scroll', sortOrder: 143 },
    { label: 'scroll-smooth', category: 'interactivity', css: 'scroll-behavior: smooth;', description: 'Smooth scrolling', sortOrder: 143 },
  )

  // Scroll snap
  items.push(
    { label: 'snap-start', category: 'interactivity', css: 'scroll-snap-align: start;', description: 'Snap to start', sortOrder: 144 },
    { label: 'snap-end', category: 'interactivity', css: 'scroll-snap-align: end;', description: 'Snap to end', sortOrder: 144 },
    { label: 'snap-center', category: 'interactivity', css: 'scroll-snap-align: center;', description: 'Snap to center', sortOrder: 144 },
    { label: 'snap-align-none', category: 'interactivity', css: 'scroll-snap-align: none;', description: 'No snap alignment', sortOrder: 144 },
    { label: 'snap-normal', category: 'interactivity', css: 'scroll-snap-stop: normal;', description: 'Normal snap stop', sortOrder: 144 },
    { label: 'snap-always', category: 'interactivity', css: 'scroll-snap-stop: always;', description: 'Always stop at snap point', sortOrder: 144 },
    { label: 'snap-none', category: 'interactivity', css: 'scroll-snap-type: none;', description: 'No snapping', sortOrder: 144 },
    { label: 'snap-x', category: 'interactivity', css: 'scroll-snap-type: x var(--tw-scroll-snap-strictness);', description: 'Horizontal snapping', sortOrder: 144 },
    { label: 'snap-y', category: 'interactivity', css: 'scroll-snap-type: y var(--tw-scroll-snap-strictness);', description: 'Vertical snapping', sortOrder: 144 },
    { label: 'snap-both', category: 'interactivity', css: 'scroll-snap-type: both var(--tw-scroll-snap-strictness);', description: 'Snap in both directions', sortOrder: 144 },
    { label: 'snap-mandatory', category: 'interactivity', css: '--tw-scroll-snap-strictness: mandatory;', description: 'Mandatory snapping', sortOrder: 144 },
    { label: 'snap-proximity', category: 'interactivity', css: '--tw-scroll-snap-strictness: proximity;', description: 'Proximity snapping', sortOrder: 144 },
  )

  // Touch action
  const touchActions = ['auto', 'none', 'pan-x', 'pan-left', 'pan-right', 'pan-y', 'pan-up', 'pan-down', 'pinch-zoom', 'manipulation']
  for (const action of touchActions) {
    items.push({
      label: `touch-${action}`,
      category: 'interactivity',
      css: `touch-action: ${action};`,
      description: `Touch action: ${action}`,
      sortOrder: 145,
    })
  }

  // User select
  items.push(
    { label: 'select-none', category: 'interactivity', css: 'user-select: none;', description: 'Disable text selection', sortOrder: 146 },
    { label: 'select-text', category: 'interactivity', css: 'user-select: text;', description: 'Allow text selection', sortOrder: 146 },
    { label: 'select-all', category: 'interactivity', css: 'user-select: all;', description: 'Select all on click', sortOrder: 146 },
    { label: 'select-auto', category: 'interactivity', css: 'user-select: auto;', description: 'Auto text selection', sortOrder: 146 },
  )

  // Will change
  items.push(
    { label: 'will-change-auto', category: 'interactivity', css: 'will-change: auto;', description: 'Auto will-change', sortOrder: 147 },
    { label: 'will-change-scroll', category: 'interactivity', css: 'will-change: scroll-position;', description: 'Optimize scroll', sortOrder: 147 },
    { label: 'will-change-contents', category: 'interactivity', css: 'will-change: contents;', description: 'Optimize contents', sortOrder: 147 },
    { label: 'will-change-transform', category: 'interactivity', css: 'will-change: transform;', description: 'Optimize transforms', sortOrder: 147 },
  )

  // Appearance
  items.push(
    { label: 'appearance-none', category: 'interactivity', css: 'appearance: none;', description: 'Remove default styling', sortOrder: 148 },
    { label: 'appearance-auto', category: 'interactivity', css: 'appearance: auto;', description: 'Default appearance', sortOrder: 148 },
  )

  return items
}

/**
 * Generate variant completions (prefixes)
 */
export function generateVariantCompletions(): CompletionItem[] {
  const items: CompletionItem[] = []

  // Pseudo-class variants
  const pseudoClasses = [
    { name: 'hover', desc: 'On mouse hover' },
    { name: 'focus', desc: 'On focus' },
    { name: 'focus-within', desc: 'When child has focus' },
    { name: 'focus-visible', desc: 'On keyboard focus' },
    { name: 'active', desc: 'On active/pressed' },
    { name: 'visited', desc: 'Visited link' },
    { name: 'target', desc: 'URL target' },
    { name: 'first', desc: 'First child' },
    { name: 'last', desc: 'Last child' },
    { name: 'only', desc: 'Only child' },
    { name: 'odd', desc: 'Odd children' },
    { name: 'even', desc: 'Even children' },
    { name: 'first-of-type', desc: 'First of type' },
    { name: 'last-of-type', desc: 'Last of type' },
    { name: 'only-of-type', desc: 'Only of type' },
    { name: 'empty', desc: 'Empty element' },
    { name: 'disabled', desc: 'Disabled state' },
    { name: 'enabled', desc: 'Enabled state' },
    { name: 'checked', desc: 'Checked state' },
    { name: 'indeterminate', desc: 'Indeterminate state' },
    { name: 'default', desc: 'Default option' },
    { name: 'required', desc: 'Required field' },
    { name: 'valid', desc: 'Valid input' },
    { name: 'invalid', desc: 'Invalid input' },
    { name: 'in-range', desc: 'Value in range' },
    { name: 'out-of-range', desc: 'Value out of range' },
    { name: 'placeholder-shown', desc: 'Placeholder visible' },
    { name: 'autofill', desc: 'Autofilled input' },
    { name: 'read-only', desc: 'Read-only input' },
  ]

  for (const { name, desc } of pseudoClasses) {
    items.push({
      label: `${name}:`,
      category: 'variants',
      css: `:${name}`,
      description: desc,
      sortOrder: 1,
    })
  }

  // Pseudo-element variants
  const pseudoElements = [
    { name: 'before', desc: '::before pseudo-element' },
    { name: 'after', desc: '::after pseudo-element' },
    { name: 'first-letter', desc: '::first-letter' },
    { name: 'first-line', desc: '::first-line' },
    { name: 'marker', desc: 'List marker' },
    { name: 'selection', desc: 'Selected text' },
    { name: 'file', desc: 'File input button' },
    { name: 'placeholder', desc: 'Placeholder text' },
    { name: 'backdrop', desc: 'Dialog backdrop' },
  ]

  for (const { name, desc } of pseudoElements) {
    items.push({
      label: `${name}:`,
      category: 'variants',
      css: `::${name}`,
      description: desc,
      sortOrder: 2,
    })
  }

  // Responsive variants
  const breakpoints = [
    { name: 'sm', desc: 'Small screens (640px+)' },
    { name: 'md', desc: 'Medium screens (768px+)' },
    { name: 'lg', desc: 'Large screens (1024px+)' },
    { name: 'xl', desc: 'Extra large screens (1280px+)' },
    { name: '2xl', desc: '2XL screens (1536px+)' },
  ]

  for (const { name, desc } of breakpoints) {
    items.push({
      label: `${name}:`,
      category: 'variants',
      css: `@media (min-width: ...)`,
      description: desc,
      sortOrder: 3,
    })
  }

  // Dark mode
  items.push({
    label: 'dark:',
    category: 'variants',
    css: '.dark &',
    description: 'Dark mode',
    sortOrder: 3,
  })

  // Group/peer variants
  const groupPeer = [
    { name: 'group-hover', desc: 'When group is hovered' },
    { name: 'group-focus', desc: 'When group is focused' },
    { name: 'group-active', desc: 'When group is active' },
    { name: 'peer-hover', desc: 'When peer is hovered' },
    { name: 'peer-focus', desc: 'When peer is focused' },
    { name: 'peer-checked', desc: 'When peer is checked' },
    { name: 'peer-invalid', desc: 'When peer is invalid' },
  ]

  for (const { name, desc } of groupPeer) {
    items.push({
      label: `${name}:`,
      category: 'variants',
      css: `.${name.split('-')[0]}:${name.split('-')[1]} ~ &`,
      description: desc,
      sortOrder: 4,
    })
  }

  // Modern CSS variants
  const modernVariants = [
    { name: 'motion-safe', desc: 'Prefers reduced motion: no-preference' },
    { name: 'motion-reduce', desc: 'Prefers reduced motion: reduce' },
    { name: 'contrast-more', desc: 'Prefers more contrast' },
    { name: 'contrast-less', desc: 'Prefers less contrast' },
    { name: 'portrait', desc: 'Portrait orientation' },
    { name: 'landscape', desc: 'Landscape orientation' },
    { name: 'print', desc: 'Print media' },
    { name: 'rtl', desc: 'Right-to-left direction' },
    { name: 'ltr', desc: 'Left-to-right direction' },
    { name: 'open', desc: 'Open state (details/dialog)' },
  ]

  for (const { name, desc } of modernVariants) {
    items.push({
      label: `${name}:`,
      category: 'variants',
      css: `@media or selector`,
      description: desc,
      sortOrder: 5,
    })
  }

  return items
}

/**
 * Get completions by category
 */
export function getCompletionsByCategory(completions: CompletionItem[]): Map<string, CompletionItem[]> {
  const categories = new Map<string, CompletionItem[]>()

  for (const item of completions) {
    const existing = categories.get(item.category) || []
    existing.push(item)
    categories.set(item.category, existing)
  }

  return categories
}

/**
 * Filter completions by prefix
 */
export function filterCompletions(completions: CompletionItem[], prefix: string): CompletionItem[] {
  if (!prefix) {
    // Sort by sortOrder even with empty prefix
    return [...completions].sort((a, b) => (a.sortOrder ?? 100) - (b.sortOrder ?? 100))
  }

  const lower = prefix.toLowerCase()
  return completions
    .filter(item => item.label.toLowerCase().startsWith(lower))
    .sort((a, b) => {
      // Exact match first
      if (a.label.toLowerCase() === lower) { return -1 }
      if (b.label.toLowerCase() === lower) { return 1 }
      // Then by sort order
      return (a.sortOrder ?? 100) - (b.sortOrder ?? 100)
    })
}
