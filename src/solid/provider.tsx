/** @jsxImportSource solid-js */
/**
 * CoralCSS Solid.js Provider
 *
 * Context provider for CoralCSS in Solid.js applications.
 * @module solid/provider
 */

import { createContext, useContext, createMemo, onMount, onCleanup, type JSX, type Accessor } from 'solid-js'
import { Coral, createCoral } from '../index'
import type { CoralOptions } from '../types'

/**
 * Coral context value
 */
export interface CoralContextValue {
  /** The Coral instance */
  coral: Coral
  /** Generate CSS for class names */
  generate: (classNames: string | string[]) => string
  /** Generate and inject CSS, returning processed class names */
  process: (classNames: string | string[]) => string
}

/**
 * Coral provider props
 */
export interface CoralProviderProps {
  /** Children to render */
  children: JSX.Element
  /** Coral configuration options */
  config?: CoralOptions
  /** Existing Coral instance (optional) */
  instance?: Coral
  /** Auto-inject generated CSS into document */
  autoInject?: boolean
}

// Create context with undefined default
const CoralContext = createContext<CoralContextValue | undefined>(undefined)

/**
 * Hook to access Coral context
 * @throws Error if used outside of CoralProvider
 */
export function useCoralContext(): CoralContextValue {
  const context = useContext(CoralContext)
  if (!context) {
    throw new Error('useCoralContext must be used within a CoralProvider')
  }
  return context
}

/**
 * CoralCSS Provider Component
 *
 * Provides Coral instance and utilities to child components.
 *
 * @example
 * ```tsx
 * import { CoralProvider } from '@coral-css/core/solid'
 *
 * function App() {
 *   return (
 *     <CoralProvider config={{ darkMode: 'class' }}>
 *       <YourApp />
 *     </CoralProvider>
 *   )
 * }
 * ```
 */
export function CoralProvider(props: CoralProviderProps): JSX.Element {
  // Create or use provided Coral instance
  const coral = createMemo(() => {
    return props.instance ?? createCoral(props.config)
  })

  // Track injected styles
  let styleEl: HTMLStyleElement | null = null
  const injectedCSS = new Set<string>()

  // Setup style element for injection
  onMount(() => {
    if (props.autoInject !== false && typeof document !== 'undefined') {
      styleEl = document.createElement('style')
      styleEl.id = 'coral-css-solid'
      styleEl.setAttribute('data-coral', 'solid')
      document.head.appendChild(styleEl)
    }
  })

  onCleanup(() => {
    if (styleEl) {
      styleEl.remove()
      styleEl = null
    }
  })

  // Generate CSS without injection
  const generate = (classNames: string | string[]): string => {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    return coral().generate(classes)
  }

  // Generate and inject CSS
  const process = (classNames: string | string[]): string => {
    const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
    const css = coral().generate(classes)

    // Inject if not already injected
    if (props.autoInject !== false && styleEl && css && !injectedCSS.has(css)) {
      injectedCSS.add(css)
      styleEl.textContent = Array.from(injectedCSS).join('\n')
    }

    return classes.join(' ')
  }

  // Create context value
  const value: Accessor<CoralContextValue> = createMemo(() => ({
    coral: coral(),
    generate,
    process,
  }))

  return (
    <CoralContext.Provider value={value()}>
      {props.children}
    </CoralContext.Provider>
  )
}

export default CoralProvider
