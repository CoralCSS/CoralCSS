/**
 * CoralCSS Svelte Store
 *
 * Svelte stores for CoralCSS integration.
 * @module svelte/store
 */

import { writable, get, type Writable } from 'svelte/store'
import { getContext, setContext } from 'svelte'
import { Coral, createCoral } from '../index'
import type { CoralOptions } from '../types'

/**
 * Coral store options
 */
export interface CoralStoreOptions extends CoralOptions {
  /** Auto-inject generated CSS into document */
  autoInject?: boolean
}

/**
 * Coral store interface
 */
export interface CoralStore {
  /** The Coral instance */
  coral: Coral
  /** Set of injected CSS */
  injectedCSS: Set<string>
  /** Generate CSS for class names */
  generate: (classNames: string | string[]) => string
  /** Process and inject CSS, returning class name string */
  process: (classNames: string | string[]) => string
  /** Subscribe to injected CSS changes */
  subscribe: Writable<string>['subscribe']
}

const CORAL_CONTEXT_KEY = Symbol('coral')

/**
 * Create a Coral store
 *
 * @example
 * ```svelte
 * <script>
 *   import { createCoralStore } from '@coral-css/core/svelte'
 *
 *   const coralStore = createCoralStore({
 *     darkMode: 'class',
 *     autoInject: true,
 *   })
 * </script>
 * ```
 */
export function createCoralStore(options: CoralStoreOptions = {}): CoralStore {
  const { autoInject = true, ...coralOptions } = options

  const coral = createCoral(coralOptions)
  const injectedCSS = new Set<string>()
  const cssStore = writable('')

  // Setup style element
  let styleEl: HTMLStyleElement | null = null
  if (autoInject && typeof document !== 'undefined') {
    styleEl = document.createElement('style')
    styleEl.id = 'coral-css-svelte'
    styleEl.setAttribute('data-coral', 'svelte')
    document.head.appendChild(styleEl)
  }

  const generate = (classNames: string | string[]): string => {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    return coral.generate(classes)
  }

  const process = (classNames: string | string[]): string => {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    const css = coral.generate(classes)

    if (css && !injectedCSS.has(css)) {
      injectedCSS.add(css)
      const fullCSS = Array.from(injectedCSS).join('\n')
      cssStore.set(fullCSS)

      if (styleEl) {
        styleEl.textContent = fullCSS
      }
    }

    return classes.join(' ')
  }

  return {
    coral,
    injectedCSS,
    generate,
    process,
    subscribe: cssStore.subscribe,
  }
}

/**
 * Default Coral store instance
 */
export const coralStore = createCoralStore()

/**
 * Set Coral context for child components
 *
 * @example
 * ```svelte
 * <script>
 *   import { setCoralContext, createCoralStore } from '@coral-css/core/svelte'
 *
 *   const store = createCoralStore()
 *   setCoralContext(store)
 * </script>
 * ```
 */
export function setCoralContext(store: CoralStore): void {
  setContext(CORAL_CONTEXT_KEY, store)
}

/**
 * Get Coral context from parent
 *
 * @example
 * ```svelte
 * <script>
 *   import { getCoralContext } from '@coral-css/core/svelte'
 *
 *   const { process } = getCoralContext()
 *   const className = process('bg-coral-500 p-4')
 * </script>
 * ```
 */
export function getCoralContext(): CoralStore {
  const store = getContext<CoralStore | undefined>(CORAL_CONTEXT_KEY)
  if (!store) {
    // Return default store if no context
    return coralStore
  }
  return store
}

/**
 * Create a reactive class name generator
 *
 * @example
 * ```svelte
 * <script>
 *   import { createClassGenerator } from '@coral-css/core/svelte'
 *
 *   const getClass = createClassGenerator({
 *     base: 'rounded-lg p-4',
 *     variants: {
 *       variant: {
 *         primary: 'bg-coral-500 text-white',
 *         secondary: 'bg-gray-200 text-gray-800',
 *       },
 *     },
 *   })
 *
 *   let variant = 'primary'
 *   $: className = getClass({ variant })
 * </script>
 * ```
 */
export function createClassGenerator<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
}) {
  const store = coralStore

  return (props: Partial<{ [K in keyof V]: keyof V[K] }> = {}): string => {
    const classes: string[] = []

    if (config.base) {
      classes.push(config.base)
    }

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

    return store.process(classes.join(' '))
  }
}
