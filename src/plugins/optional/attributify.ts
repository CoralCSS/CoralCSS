/**
 * Attributify Plugin
 *
 * Enables attributify mode for CoralCSS, allowing utilities to be written
 * as HTML attributes instead of classes.
 *
 * @example
 * ```html
 * <!-- Traditional class-based -->
 * <div class="bg-red-500 text-white p-4 flex items-center">
 *
 * <!-- Attributify mode -->
 * <div bg="red-500" text="white" p="4" flex="~" items="center">
 * ```
 *
 * @module plugins/optional/attributify
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Attributify plugin options
 */
export interface AttributifyPluginOptions {
  /** Prefix for attributify attributes (default: none) */
  prefix?: string
  /** Use strict mode - only allow predefined attributes (default: false) */
  strict?: boolean
  /** Ignore certain attributes from processing */
  ignoreAttributes?: string[]
  /** Transform only these attributes */
  onlyAttributes?: string[]
  /** Enable valueless attributes like `flex` instead of `flex="~"` */
  valueless?: boolean
  /** Enable variant groups in attributes like hover="bg-red-500 text-white" */
  variantGroups?: boolean
  /** Separator for multiple values (default: space) */
  separator?: string
}

/**
 * Attribute category definitions
 * Maps attribute names to their CSS property patterns
 */
const attributeCategories = {
  // Layout
  display: ['block', 'inline-block', 'inline', 'flex', 'inline-flex', 'grid', 'inline-grid', 'contents', 'hidden', 'table', 'table-row', 'table-cell'],
  position: ['static', 'fixed', 'absolute', 'relative', 'sticky'],
  float: ['left', 'right', 'none'],
  clear: ['left', 'right', 'both', 'none'],
  overflow: ['auto', 'hidden', 'visible', 'scroll', 'x-auto', 'y-auto', 'x-hidden', 'y-hidden', 'x-scroll', 'y-scroll'],
  z: true, // z-{value}

  // Flexbox
  flex: ['1', 'auto', 'initial', 'none', 'row', 'row-reverse', 'col', 'col-reverse', 'wrap', 'wrap-reverse', 'nowrap', 'grow', 'grow-0', 'shrink', 'shrink-0'],
  justify: ['start', 'end', 'center', 'between', 'around', 'evenly'],
  items: ['start', 'end', 'center', 'baseline', 'stretch'],
  content: ['start', 'end', 'center', 'between', 'around', 'evenly', 'stretch'],
  self: ['auto', 'start', 'end', 'center', 'stretch', 'baseline'],
  order: ['first', 'last', 'none'],

  // Grid
  grid: ['cols', 'rows', 'flow-row', 'flow-col', 'flow-row-dense', 'flow-col-dense'],
  col: ['auto', 'span-1', 'span-2', 'span-3', 'span-4', 'span-5', 'span-6', 'span-7', 'span-8', 'span-9', 'span-10', 'span-11', 'span-12', 'span-full', 'start-1', 'start-2', 'start-3', 'end-1', 'end-2', 'end-3'],
  row: ['auto', 'span-1', 'span-2', 'span-3', 'span-4', 'span-5', 'span-6', 'span-full', 'start-1', 'start-2', 'end-1', 'end-2'],
  gap: true, // gap-{value}
  'gap-x': true,
  'gap-y': true,

  // Spacing
  p: true, // padding
  px: true,
  py: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
  m: true, // margin
  mx: true,
  my: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
  space: ['x', 'y', 'x-reverse', 'y-reverse'],

  // Sizing
  w: true, // width
  h: true, // height
  'min-w': true,
  'max-w': true,
  'min-h': true,
  'max-h': true,
  size: true, // w + h combined

  // Typography
  text: ['xs', 'sm', 'base', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl', 'left', 'center', 'right', 'justify', 'start', 'end', 'wrap', 'nowrap', 'balance', 'pretty'],
  font: ['thin', 'extralight', 'light', 'normal', 'medium', 'semibold', 'bold', 'extrabold', 'black', 'sans', 'serif', 'mono'],
  tracking: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
  leading: ['none', 'tight', 'snug', 'normal', 'relaxed', 'loose'],
  decoration: ['underline', 'overline', 'line-through', 'no-underline'],
  transform: ['uppercase', 'lowercase', 'capitalize', 'normal-case'],
  truncate: ['~'],
  'line-clamp': true,

  // Backgrounds
  bg: true, // background color + utilities
  from: true, // gradient from
  via: true, // gradient via
  to: true, // gradient to

  // Borders
  border: ['0', '2', '4', '8', 't', 'r', 'b', 'l', 'x', 'y', 'solid', 'dashed', 'dotted', 'double', 'none', 'hidden'],
  rounded: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', 'full', 't', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl'],
  ring: ['0', '1', '2', '4', '8', 'inset'],
  divide: ['x', 'y', 'x-reverse', 'y-reverse', 'solid', 'dashed', 'dotted'],
  outline: ['none', '0', '1', '2', '4', '8', 'dashed', 'dotted', 'double'],

  // Effects
  shadow: ['sm', 'md', 'lg', 'xl', '2xl', 'inner', 'none'],
  opacity: true, // opacity-{value}

  // Filters
  blur: ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
  brightness: true,
  contrast: true,
  grayscale: ['0', '~'],
  'hue-rotate': true,
  invert: ['0', '~'],
  saturate: true,
  sepia: ['0', '~'],
  'backdrop-blur': ['none', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],

  // Transforms
  scale: true,
  rotate: true,
  translate: ['x', 'y', 'z'],
  skew: ['x', 'y'],
  origin: ['center', 'top', 'top-right', 'right', 'bottom-right', 'bottom', 'bottom-left', 'left', 'top-left'],

  // Transitions & Animation
  transition: ['none', 'all', 'colors', 'opacity', 'shadow', 'transform'],
  duration: true,
  ease: ['linear', 'in', 'out', 'in-out'],
  delay: true,
  animate: ['none', 'spin', 'ping', 'pulse', 'bounce'],

  // Interactivity
  cursor: ['auto', 'default', 'pointer', 'wait', 'text', 'move', 'help', 'not-allowed', 'none', 'context-menu', 'progress', 'cell', 'crosshair', 'vertical-text', 'alias', 'copy', 'no-drop', 'grab', 'grabbing', 'all-scroll', 'col-resize', 'row-resize', 'n-resize', 's-resize', 'e-resize', 'w-resize', 'ne-resize', 'nw-resize', 'se-resize', 'sw-resize', 'ew-resize', 'ns-resize', 'nesw-resize', 'nwse-resize', 'zoom-in', 'zoom-out'],
  select: ['none', 'text', 'all', 'auto'],
  resize: ['none', 'x', 'y', 'both'],
  pointer: ['none', 'auto'],
  touch: ['auto', 'none', 'pan-x', 'pan-left', 'pan-right', 'pan-y', 'pan-up', 'pan-down', 'pinch-zoom', 'manipulation'],

  // Accessibility
  sr: ['only', 'not-sr-only'],

  // Positioning
  inset: true,
  top: true,
  right: true,
  bottom: true,
  left: true,

  // Aspect Ratio
  aspect: ['auto', 'square', 'video'],

  // Container
  container: ['~'],

  // Object Fit/Position
  object: ['contain', 'cover', 'fill', 'none', 'scale-down', 'bottom', 'center', 'left', 'left-bottom', 'left-top', 'right', 'right-bottom', 'right-top', 'top'],

  // Visibility
  visible: ['~'],
  invisible: ['~'],
  collapse: ['~'],

  // Will Change
  'will-change': ['auto', 'scroll', 'contents', 'transform'],

  // Break
  break: ['normal', 'words', 'all', 'keep'],

  // Hyphens
  hyphens: ['none', 'manual', 'auto'],

  // Whitespace
  whitespace: ['normal', 'nowrap', 'pre', 'pre-line', 'pre-wrap', 'break-spaces'],

  // Word/Overflow Break
  'overflow-wrap': ['normal', 'break-word'],
}

/**
 * Variant prefixes that can be used with attributify
 */
const variantPrefixes = [
  'hover', 'focus', 'focus-within', 'focus-visible', 'active', 'visited',
  'disabled', 'checked', 'indeterminate', 'default', 'required', 'valid', 'invalid',
  'placeholder', 'autofill', 'read-only',
  'first', 'last', 'only', 'odd', 'even', 'first-of-type', 'last-of-type', 'only-of-type',
  'empty', 'target', 'enabled',
  'before', 'after', 'selection', 'first-letter', 'first-line', 'marker', 'backdrop',
  'sm', 'md', 'lg', 'xl', '2xl',
  'dark', 'light', 'motion-safe', 'motion-reduce', 'contrast-more', 'contrast-less',
  'portrait', 'landscape', 'print',
  'rtl', 'ltr', 'open',
  'group-hover', 'group-focus', 'group-active', 'group-visited',
  'peer-hover', 'peer-focus', 'peer-active', 'peer-checked', 'peer-disabled',
]

/**
 * Ignored HTML attributes that should not be processed
 */
const defaultIgnoredAttributes = [
  'id', 'class', 'style', 'href', 'src', 'alt', 'title', 'type', 'name', 'value',
  'placeholder', 'disabled', 'readonly', 'checked', 'selected', 'required',
  'autocomplete', 'autofocus', 'multiple', 'pattern', 'min', 'max', 'step',
  'rows', 'cols', 'wrap', 'for', 'form', 'action', 'method', 'enctype', 'target',
  'rel', 'download', 'media', 'sizes', 'srcset', 'usemap', 'ismap', 'width', 'height',
  'loading', 'decoding', 'crossorigin', 'referrerpolicy', 'integrity',
  'sandbox', 'allow', 'allowfullscreen', 'frameborder', 'scrolling',
  'tabindex', 'accesskey', 'contenteditable', 'draggable', 'dropzone',
  'hidden', 'lang', 'dir', 'spellcheck', 'translate', 'role',
  'aria-label', 'aria-labelledby', 'aria-describedby', 'aria-hidden', 'aria-expanded',
  'aria-controls', 'aria-haspopup', 'aria-current', 'aria-pressed', 'aria-checked',
  'data-*', // Will be handled specially
]

/**
 * Convert attributify syntax to class names
 */
function attributeToClasses(
  attrName: string,
  attrValue: string,
  options: AttributifyPluginOptions
): string[] {
  const classes: string[] = []
  const prefix = options.prefix || ''

  // Handle valueless attributes (just the attribute name)
  if (attrValue === '~' || attrValue === '' || attrValue === 'true') {
    const prefixedName = prefix ? `${prefix}-${attrName}` : attrName
    classes.push(prefixedName)
    return classes
  }

  // Split by separator (default: space)
  const separator = options.separator || ' '
  const values = attrValue.split(separator).filter(Boolean)

  for (const value of values) {
    // Check if value has a variant prefix (e.g., "hover:bg-red-500")
    if (value.includes(':') && options.variantGroups) {
      classes.push(value)
      continue
    }

    // Construct class name
    let className: string
    if (prefix) {
      className = `${prefix}-${attrName}-${value}`
    } else {
      className = `${attrName}-${value}`
    }

    classes.push(className)
  }

  return classes
}

/**
 * Extract attributes from HTML string for processing
 */
function extractAttributifyClasses(
  html: string,
  options: AttributifyPluginOptions
): string[] {
  const classes: string[] = []
  const prefix = options.prefix || ''
  const ignoreAttrs = new Set([...(options.ignoreAttributes || []), ...defaultIgnoredAttributes])
  const onlyAttrs = options.onlyAttributes ? new Set(options.onlyAttributes) : null

  // Regex to match HTML attributes
  const attrRegex = /\s+([a-zA-Z][a-zA-Z0-9\-_]*)\s*(?:=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g

  let match
  while ((match = attrRegex.exec(html)) !== null) {
    if (!match[1]) {continue}
    const attrName = match[1].toLowerCase()
    const attrValue = match[2] || match[3] || match[4] || '~'

    // Skip ignored attributes
    if (ignoreAttrs.has(attrName)) {continue}
    if (attrName.startsWith('data-') || attrName.startsWith('aria-')) {continue}

    // If onlyAttributes is set, skip attributes not in the list
    if (onlyAttrs && !onlyAttrs.has(attrName)) {continue}

    // Check if this is a valid attributify attribute
    const category = attributeCategories[attrName as keyof typeof attributeCategories]
    const isVariantPrefix = variantPrefixes.includes(attrName)

    if (category || isVariantPrefix) {
      const newClasses = attributeToClasses(attrName, attrValue, options)
      classes.push(...newClasses)
    }
  }

  return classes
}

/**
 * Attributify utilities plugin
 */
export function attributifyPlugin(options: AttributifyPluginOptions = {}): Plugin {
  const {
    prefix = '',
    strict = false,
    ignoreAttributes = [],
    onlyAttributes,
    valueless = true,
    variantGroups = true,
    separator = ' ',
  } = options

  return {
    name: 'attributify',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // ATTRIBUTIFY TRANSFORMER
      // ========================================

      // This plugin primarily works by providing an HTML extractor
      // that converts attributify syntax to class names

      // Register a custom extractor hook
      ctx.extendTheme({
        attributify: {
          enabled: true,
          prefix,
          strict,
          ignoreAttributes: [...defaultIgnoredAttributes, ...ignoreAttributes],
          onlyAttributes,
          valueless,
          variantGroups,
          separator,
        },
      })

      // ========================================
      // ATTRIBUTIFY-SPECIFIC UTILITIES
      // ========================================

      // Valueless attribute utilities (when used as just attribute without value)
      // These map attribute presence to a specific class

      if (valueless) {
        // Layout valueless
        rules.push({ pattern: 'flex', properties: { display: 'flex' } })
        rules.push({ pattern: 'grid', properties: { display: 'grid' } })
        rules.push({ pattern: 'block', properties: { display: 'block' } })
        rules.push({ pattern: 'inline', properties: { display: 'inline' } })
        rules.push({ pattern: 'inline-block', properties: { display: 'inline-block' } })
        rules.push({ pattern: 'inline-flex', properties: { display: 'inline-flex' } })
        rules.push({ pattern: 'inline-grid', properties: { display: 'inline-grid' } })
        rules.push({ pattern: 'hidden', properties: { display: 'none' } })
        rules.push({ pattern: 'contents', properties: { display: 'contents' } })

        // Position valueless
        rules.push({ pattern: 'relative', properties: { position: 'relative' } })
        rules.push({ pattern: 'absolute', properties: { position: 'absolute' } })
        rules.push({ pattern: 'fixed', properties: { position: 'fixed' } })
        rules.push({ pattern: 'sticky', properties: { position: 'sticky' } })
        rules.push({ pattern: 'static', properties: { position: 'static' } })

        // Visibility valueless
        rules.push({ pattern: 'visible', properties: { visibility: 'visible' } })
        rules.push({ pattern: 'invisible', properties: { visibility: 'hidden' } })
        rules.push({ pattern: 'collapse', properties: { visibility: 'collapse' } })

        // Text utilities valueless
        rules.push({ pattern: 'truncate', properties: { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' } })
        rules.push({ pattern: 'uppercase', properties: { 'text-transform': 'uppercase' } })
        rules.push({ pattern: 'lowercase', properties: { 'text-transform': 'lowercase' } })
        rules.push({ pattern: 'capitalize', properties: { 'text-transform': 'capitalize' } })
        rules.push({ pattern: 'underline', properties: { 'text-decoration-line': 'underline' } })
        rules.push({ pattern: 'overline', properties: { 'text-decoration-line': 'overline' } })
        rules.push({ pattern: 'line-through', properties: { 'text-decoration-line': 'line-through' } })
        rules.push({ pattern: 'no-underline', properties: { 'text-decoration-line': 'none' } })
        rules.push({ pattern: 'italic', properties: { 'font-style': 'italic' } })
        rules.push({ pattern: 'not-italic', properties: { 'font-style': 'normal' } })

        // Container
        rules.push({
          pattern: 'container',
          properties: {
            width: '100%',
            'margin-left': 'auto',
            'margin-right': 'auto',
          },
        })

        // Overflow
        rules.push({ pattern: 'overflow-hidden', properties: { overflow: 'hidden' } })
        rules.push({ pattern: 'overflow-auto', properties: { overflow: 'auto' } })
        rules.push({ pattern: 'overflow-scroll', properties: { overflow: 'scroll' } })
        rules.push({ pattern: 'overflow-visible', properties: { overflow: 'visible' } })

        // Pointer events
        rules.push({ pattern: 'pointer-events-none', properties: { 'pointer-events': 'none' } })
        rules.push({ pattern: 'pointer-events-auto', properties: { 'pointer-events': 'auto' } })

        // User select
        rules.push({ pattern: 'select-none', properties: { 'user-select': 'none' } })
        rules.push({ pattern: 'select-text', properties: { 'user-select': 'text' } })
        rules.push({ pattern: 'select-all', properties: { 'user-select': 'all' } })
        rules.push({ pattern: 'select-auto', properties: { 'user-select': 'auto' } })

        // Screen reader
        rules.push({
          pattern: 'sr-only',
          properties: {
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: '0',
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            'white-space': 'nowrap',
            'border-width': '0',
          },
        })
        rules.push({
          pattern: 'not-sr-only',
          properties: {
            position: 'static',
            width: 'auto',
            height: 'auto',
            padding: '0',
            margin: '0',
            overflow: 'visible',
            clip: 'auto',
            'white-space': 'normal',
          },
        })

        // Antialiased text
        rules.push({
          pattern: 'antialiased',
          properties: {
            '-webkit-font-smoothing': 'antialiased',
            '-moz-osx-font-smoothing': 'grayscale',
          },
        })
        rules.push({
          pattern: 'subpixel-antialiased',
          properties: {
            '-webkit-font-smoothing': 'auto',
            '-moz-osx-font-smoothing': 'auto',
          },
        })

        // Box sizing
        rules.push({ pattern: 'box-border', properties: { 'box-sizing': 'border-box' } })
        rules.push({ pattern: 'box-content', properties: { 'box-sizing': 'content-box' } })

        // List style
        rules.push({ pattern: 'list-none', properties: { 'list-style-type': 'none' } })
        rules.push({ pattern: 'list-disc', properties: { 'list-style-type': 'disc' } })
        rules.push({ pattern: 'list-decimal', properties: { 'list-style-type': 'decimal' } })
        rules.push({ pattern: 'list-inside', properties: { 'list-style-position': 'inside' } })
        rules.push({ pattern: 'list-outside', properties: { 'list-style-position': 'outside' } })

        // Appearance
        rules.push({ pattern: 'appearance-none', properties: { appearance: 'none' } })
        rules.push({ pattern: 'appearance-auto', properties: { appearance: 'auto' } })
      }

      // ========================================
      // VARIANT ATTRIBUTE HANDLERS
      // ========================================

      // Allow variant prefixes as attributes
      // e.g., <div hover="bg-red-500 text-white">
      for (const variant of variantPrefixes) {
        rules.push({
          pattern: new RegExp(`^${variant}-(.+)$`),
          handler: (match) => {
            // This is handled at extraction time, not generation
            // Return null to skip CSS generation for this pattern
            return null
          },
        })
      }

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

// Export utilities for external use
export {
  attributeCategories,
  variantPrefixes,
  defaultIgnoredAttributes,
  extractAttributifyClasses,
  attributeToClasses,
}

export default attributifyPlugin
