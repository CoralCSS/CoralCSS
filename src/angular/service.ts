/**
 * CoralCSS Angular Service
 *
 * Injectable service for CoralCSS in Angular applications.
 * @module angular/service
 */

import { Coral, createCoral } from '../index'
import type { CoralOptions } from '../types'
import { cn } from './utils'

/**
 * Coral configuration token type
 */
export interface CoralConfig extends CoralOptions {
  /** Auto-inject generated CSS into document */
  autoInject?: boolean
}

/**
 * Injection token for Coral configuration
 * Use this token to provide custom configuration
 *
 * @example
 * ```typescript
 * @NgModule({
 *   providers: [
 *     { provide: CORAL_CONFIG, useValue: { darkMode: 'class' } }
 *   ]
 * })
 * ```
 */
export const CORAL_CONFIG = 'CORAL_CONFIG'

/**
 * CoralCSS Service
 *
 * Injectable service that provides CoralCSS functionality to Angular components.
 *
 * @example
 * ```typescript
 * @Component({
 *   selector: 'app-button',
 *   template: '<button [class]="classes">Click me</button>'
 * })
 * export class ButtonComponent {
 *   constructor(private coral: CoralService) {}
 *
 *   get classes() {
 *     return this.coral.cn('px-4 py-2 rounded', this.variant === 'primary' && 'bg-coral-500')
 *   }
 * }
 * ```
 */
export class CoralService {
  private coral: Coral
  private styleElement: HTMLStyleElement | null = null
  private injectedCSS = new Set<string>()
  private autoInject: boolean

  constructor(config?: CoralConfig) {
    this.coral = createCoral(config)
    this.autoInject = config?.autoInject !== false

    if (this.autoInject && typeof document !== 'undefined') {
      this.setupStyleElement()
    }
  }

  /**
   * Setup style element for CSS injection
   */
  private setupStyleElement(): void {
    this.styleElement = document.createElement('style')
    this.styleElement.id = 'coral-css-angular'
    this.styleElement.setAttribute('data-coral', 'angular')
    document.head.appendChild(this.styleElement)
  }

  /**
   * Cleanup style element
   */
  destroy(): void {
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null
    }
  }

  /**
   * Get the underlying Coral instance
   */
  getInstance(): Coral {
    return this.coral
  }

  /**
   * Generate CSS for given class names
   */
  generate(classNames: string | string[]): string {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    return this.coral.generate(classes)
  }

  /**
   * Generate and inject CSS, returning the class names
   */
  process(classNames: string | string[]): string {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    const css = this.coral.generate(classes)

    // Inject if not already injected
    if (this.autoInject && this.styleElement && css && !this.injectedCSS.has(css)) {
      this.injectedCSS.add(css)
      this.styleElement.textContent = Array.from(this.injectedCSS).join('\n')
    }

    return classes.join(' ')
  }

  /**
   * Combine class names conditionally
   */
  cn(...inputs: (string | boolean | null | undefined | Record<string, boolean | null | undefined>)[]): string {
    const className = cn(...inputs)
    this.process(className)
    return className
  }

  /**
   * Create variant-aware class generator
   */
  createVariants<V extends Record<string, Record<string, string>>>(config: {
    base?: string
    variants?: V
    defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
  }): (props?: Partial<{ [K in keyof V]: keyof V[K] }>) => string {
    return (props = {}) => {
      const classes: string[] = []

      // Add base classes
      if (config.base) {
        classes.push(config.base)
      }

      // Add variant classes
      if (config.variants) {
        for (const [variantName, variantValues] of Object.entries(config.variants)) {
          const value = props[variantName as keyof V] ?? config.defaultVariants?.[variantName as keyof V]
          if (value !== undefined) {
            const variantClass = variantValues[value as string]
            if (variantClass) {
              classes.push(variantClass)
            }
          }
        }
      }

      const className = classes.join(' ')
      this.process(className)
      return className
    }
  }

  /**
   * Generate responsive class names
   */
  responsive(classes: {
    base?: string
    sm?: string
    md?: string
    lg?: string
    xl?: string
    '2xl'?: string
  }): string {
    const result: string[] = []

    if (classes.base) {
      result.push(classes.base)
    }
    if (classes.sm) {
      result.push(classes.sm.split(' ').map(c => `sm:${c}`).join(' '))
    }
    if (classes.md) {
      result.push(classes.md.split(' ').map(c => `md:${c}`).join(' '))
    }
    if (classes.lg) {
      result.push(classes.lg.split(' ').map(c => `lg:${c}`).join(' '))
    }
    if (classes.xl) {
      result.push(classes.xl.split(' ').map(c => `xl:${c}`).join(' '))
    }
    if (classes['2xl']) {
      result.push(classes['2xl'].split(' ').map(c => `2xl:${c}`).join(' '))
    }

    const className = result.join(' ')
    this.process(className)
    return className
  }

  /**
   * Generate dark mode aware class names
   */
  darkMode(classes: { light: string; dark: string }): string {
    const lightClasses = classes.light
    const darkClasses = classes.dark.split(' ').map(c => `dark:${c}`).join(' ')
    const className = `${lightClasses} ${darkClasses}`
    this.process(className)
    return className
  }
}

/**
 * Factory function to create CoralService
 * Use with Angular's factory provider
 */
export function createCoralService(config?: CoralConfig): CoralService {
  return new CoralService(config)
}
