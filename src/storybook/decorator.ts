/**
 * CoralCSS Storybook Decorator
 *
 * Decorator for wrapping Storybook stories with CoralCSS support.
 * @module storybook/decorator
 */

import { createCoral, type Coral } from '../index'
import type { CoralOptions } from '../types'

/**
 * Decorator configuration options
 */
export interface CoralDecoratorConfig extends CoralOptions {
  /** Auto-inject CSS into preview iframe */
  autoInject?: boolean
  /** Style element ID */
  styleId?: string
  /** Base classes to apply to story root */
  baseClasses?: string[]
  /** Enable dark mode toggle */
  enableDarkMode?: boolean
  /** Dark mode class name */
  darkModeClass?: string
}

/**
 * Global Coral instance for Storybook
 */
let coralInstance: Coral | null = null
let styleElement: HTMLStyleElement | null = null
const injectedCSS = new Set<string>()

/**
 * Initialize Coral instance
 */
function initializeCoral(config: CoralDecoratorConfig): Coral {
  if (coralInstance) {
    return coralInstance
  }

  const { autoInject: _autoInject, styleId: _styleId, baseClasses: _baseClasses, enableDarkMode: _enableDarkMode, darkModeClass: _darkModeClass, ...coralOptions } = config
  coralInstance = createCoral(coralOptions)

  return coralInstance
}

/**
 * Get or create style element
 */
function getStyleElement(styleId = 'coral-storybook-styles'): HTMLStyleElement {
  if (styleElement) {
    return styleElement
  }

  if (typeof document === 'undefined') {
    throw new Error('Document is not available')
  }

  // Check if element already exists
  const existing = document.getElementById(styleId) as HTMLStyleElement | null
  if (existing) {
    styleElement = existing
    return styleElement
  }

  // Create new element
  styleElement = document.createElement('style')
  styleElement.id = styleId
  styleElement.setAttribute('data-coral', 'storybook')
  document.head.appendChild(styleElement)

  return styleElement
}

/**
 * Inject CSS into the style element
 */
function injectCSS(css: string): void {
  if (!css || injectedCSS.has(css)) {
    return
  }

  const style = getStyleElement()
  injectedCSS.add(css)
  style.textContent = Array.from(injectedCSS).join('\n')
}

/**
 * Process classes and inject CSS
 */
function processClasses(classes: string[], config: CoralDecoratorConfig): string {
  const coral = initializeCoral(config)
  const css = coral.generate(classes)

  if (config.autoInject !== false) {
    injectCSS(css)
  }

  return classes.join(' ')
}

/**
 * Create a Storybook decorator for CoralCSS
 *
 * @example
 * ```typescript
 * // .storybook/preview.ts
 * import { withCoralCSS } from '@coral-css/core/storybook'
 *
 * export const decorators = [
 *   withCoralCSS({
 *     darkMode: 'class',
 *     autoInject: true,
 *     enableDarkMode: true,
 *   }),
 * ]
 * ```
 */
export function withCoralCSS(config: CoralDecoratorConfig = {}) {
  // Initialize on load
  const _coral = initializeCoral(config)

  // Return decorator function
  return function coralDecorator(
    Story: () => unknown,
    context: { globals?: Record<string, unknown>; args?: Record<string, unknown> }
  ) {
    // Check for dark mode from globals
    const isDarkMode = context.globals?.darkMode === true || context.globals?.theme === 'dark'

    // Process base classes
    if (config.baseClasses && config.baseClasses.length > 0) {
      processClasses(config.baseClasses, config)
    }

    // Apply dark mode class to document
    if (config.enableDarkMode && typeof document !== 'undefined') {
      const darkClass = config.darkModeClass || 'dark'
      if (isDarkMode) {
        document.documentElement.classList.add(darkClass)
      } else {
        document.documentElement.classList.remove(darkClass)
      }
    }

    // Return story - framework-agnostic
    return Story()
  }
}

/**
 * Reset decorator state (useful for testing)
 */
export function resetDecorator(): void {
  if (styleElement) {
    styleElement.remove()
    styleElement = null
  }
  coralInstance = null
  injectedCSS.clear()
}

/**
 * Get current Coral instance
 */
export function getCoralInstance(): Coral | null {
  return coralInstance
}

/**
 * Get all injected CSS
 */
export function getInjectedCSS(): string[] {
  return Array.from(injectedCSS)
}

/**
 * Manual CSS generation helper for stories
 *
 * @example
 * ```typescript
 * import { generateCSS } from '@coral-css/core/storybook'
 *
 * export const Button = () => {
 *   const classes = generateCSS('bg-coral-500 px-4 py-2 rounded')
 *   return `<button class="${classes}">Click me</button>`
 * }
 * ```
 */
export function generateCSS(
  classes: string | string[],
  config: CoralDecoratorConfig = {}
): string {
  const classArray = Array.isArray(classes) ? classes : classes.split(/\s+/)
  return processClasses(classArray, config)
}

/**
 * Create CSS for component variants
 *
 * @example
 * ```typescript
 * const buttonVariants = createVariantCSS({
 *   base: 'px-4 py-2 rounded font-medium',
 *   variants: {
 *     primary: 'bg-coral-500 text-white',
 *     secondary: 'bg-gray-200 text-gray-800',
 *   },
 * })
 *
 * // In story
 * const classes = buttonVariants('primary')
 * ```
 */
export function createVariantCSS(options: {
  base?: string
  variants: Record<string, string>
  config?: CoralDecoratorConfig
}): (variant: string) => string {
  const { base = '', variants, config = {} } = options

  // Pre-generate all variant CSS
  const allClasses = [
    ...base.split(/\s+/).filter(Boolean),
    ...Object.values(variants).flatMap((v) => v.split(/\s+/).filter(Boolean)),
  ]
  processClasses(allClasses, config)

  return (variant: string): string => {
    const variantClasses = variants[variant] || ''
    const combined = `${base} ${variantClasses}`.trim()
    return combined
  }
}
