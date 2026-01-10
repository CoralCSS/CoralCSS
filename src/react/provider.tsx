/**
 * CoralCSS React Provider
 *
 * Context provider for CoralCSS in React applications.
 * @module react/provider
 */

import React, { createContext, useContext, useMemo, useEffect, useRef } from 'react'
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
  children: React.ReactNode
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
 * import { CoralProvider } from '@coral-css/core/react'
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
export function CoralProvider({
  children,
  config,
  instance,
  autoInject = true,
}: CoralProviderProps): React.ReactElement {
  // Create or use provided Coral instance
  const coral = useMemo(() => {
    return instance ?? createCoral(config)
  }, [instance, config])

  // Track injected styles
  const styleRef = useRef<HTMLStyleElement | null>(null)
  const injectedCSS = useRef<Set<string>>(new Set())

  // Setup style element for injection
  useEffect(() => {
    if (autoInject && typeof document !== 'undefined') {
      styleRef.current = document.createElement('style')
      styleRef.current.id = 'coral-css-react'
      styleRef.current.setAttribute('data-coral', 'react')
      document.head.appendChild(styleRef.current)

      return () => {
        if (styleRef.current) {
          styleRef.current.remove()
          styleRef.current = null
        }
      }
    }
    return undefined
  }, [autoInject])

  // Generate CSS without injection
  const generate = useMemo(() => {
    return (classNames: string | string[]): string => {
      const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
      return coral.generate(classes)
    }
  }, [coral])

  // Generate and inject CSS
  const process = useMemo(() => {
    return (classNames: string | string[]): string => {
      const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
      const css = coral.generate(classes)

      // Inject if not already injected
      if (autoInject && styleRef.current && css && !injectedCSS.current.has(css)) {
        injectedCSS.current.add(css)
        styleRef.current.textContent = Array.from(injectedCSS.current).join('\n')
      }

      return classes.join(' ')
    }
  }, [coral, autoInject])

  // Memoize context value
  const value = useMemo<CoralContextValue>(() => ({
    coral,
    generate,
    process,
  }), [coral, generate, process])

  return React.createElement(CoralContext.Provider, { value }, children)
}

export default CoralProvider
