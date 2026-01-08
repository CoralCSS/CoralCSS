/**
 * CDN Bundle
 *
 * Auto-initializing bundle for CDN usage.
 * @module runtime/cdn
 */

import { createCoral } from '../kernel'
import { coralPreset } from '../presets/coral'
import { DOMObserver, createObserver } from './observer'
import { StyleInjector, createInjector } from './injector'
import { initComponents } from '../components'
import type { Coral, CoralOptions } from '../types'

/**
 * CDN configuration
 */
export interface CDNConfig extends Partial<CoralOptions> {
  /**
   * Whether to auto-start observing
   * @default true
   */
  autoStart?: boolean

  /**
   * Whether to auto-initialize components
   * @default true
   */
  autoInitComponents?: boolean

  /**
   * Injector configuration
   */
  injector?: {
    id?: string
    nonce?: string
  }

  /**
   * Observer configuration
   */
  observer?: {
    debounce?: number
  }
}

/**
 * CoralCSS CDN instance
 */
export interface CoralCDN {
  /**
   * The Coral instance
   */
  coral: Coral

  /**
   * The DOM observer
   */
  observer: DOMObserver

  /**
   * The style injector
   */
  injector: StyleInjector

  /**
   * Start observing and generating CSS
   */
  start(): void

  /**
   * Stop observing
   */
  stop(): void

  /**
   * Generate CSS for specific classes
   */
  generate(classes: string[]): string

  /**
   * Generate CSS from HTML string
   */
  generateFromHTML(html: string): string

  /**
   * Get all generated CSS
   */
  getCSS(): string

  /**
   * Reset and clear all generated CSS
   */
  reset(): void

  /**
   * Initialize components
   */
  initComponents(): void

  /**
   * Destroy the CDN instance
   */
  destroy(): void
}

/**
 * Create CoralCSS CDN instance
 */
export function createCoralCDN(config: CDNConfig = {}): CoralCDN {
  const {
    autoStart = true,
    autoInitComponents = true,
    injector: injectorConfig = {},
    observer: observerConfig = {},
    ...coralOptions
  } = config

  // Create Coral instance with preset
  const coral = createCoral({
    ...coralOptions,
  })

  // Use coral preset by default
  const plugins = coralPreset({
    darkMode: coralOptions.darkMode ?? 'class',
  })
  plugins.forEach((plugin) => coral.use(plugin))

  // Create injector
  const injector = createInjector({
    id: injectorConfig.id ?? 'coral-styles',
    nonce: injectorConfig.nonce,
  })
  injector.init()

  // Create observer with CSS injection callback
  const observer = createObserver(coral, {
    debounce: observerConfig.debounce ?? 10,
    onClassesDetected: (classes) => {
      const css = coral.generate(classes)
      if (css) {
        injector.append(css)
      }
    },
  })

  const instance: CoralCDN = {
    coral,
    observer,
    injector,

    start() {
      observer.start()
    },

    stop() {
      observer.stop()
    },

    generate(classes: string[]): string {
      const css = coral.generate(classes)
      if (css) {
        injector.append(css)
      }
      return css
    },

    generateFromHTML(html: string): string {
      const css = coral.generateFromHTML(html)
      if (css) {
        injector.append(css)
      }
      return css
    },

    getCSS(): string {
      return injector.getCSS()
    },

    reset() {
      coral.reset()
      injector.clear()
      observer.clearCache()
    },

    initComponents() {
      initComponents()
    },

    destroy() {
      observer.stop()
      injector.destroy()
    },
  }

  // Auto-start if configured
  if (autoStart) {
    // Wait for DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        instance.start()
        if (autoInitComponents) {
          instance.initComponents()
        }
      })
    } else {
      instance.start()
      if (autoInitComponents) {
        instance.initComponents()
      }
    }
  }

  return instance
}

// Auto-initialize on script load
let globalInstance: CoralCDN | null = null

/**
 * Get or create global CoralCSS CDN instance
 */
export function getCoralCDN(): CoralCDN {
  if (!globalInstance) {
    // Check for configuration in script tag or window
    const config: CDNConfig = (window as unknown as { CORAL_CONFIG?: CDNConfig }).CORAL_CONFIG ?? {}
    globalInstance = createCoralCDN(config)
  }
  return globalInstance
}

// Expose to window for CDN usage
if (typeof window !== 'undefined') {
  (window as unknown as { CoralCSS: { createCoralCDN: typeof createCoralCDN; getCoralCDN: typeof getCoralCDN } }).CoralCSS = {
    createCoralCDN,
    getCoralCDN,
  }
}

// Export createCoralCDN as CoralCDN for convenience
export { createCoralCDN as CoralCDN }

export default createCoralCDN
