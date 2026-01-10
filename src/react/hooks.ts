/**
 * CoralCSS React Hooks
 *
 * Custom hooks for using CoralCSS in React components.
 * @module react/hooks
 */

import { useMemo, useCallback } from 'react'
import { useCoralContext } from './provider'
import { cn } from './utils'

/**
 * Hook to access the Coral instance
 *
 * @example
 * ```tsx
 * function Component() {
 *   const coral = useCoral()
 *   const css = coral.generate(['bg-red-500', 'p-4'])
 *   return <div className="bg-red-500 p-4">Hello</div>
 * }
 * ```
 */
export function useCoral() {
  const { coral } = useCoralContext()
  return coral
}

/**
 * Hook to generate CSS for class names
 *
 * @example
 * ```tsx
 * function Button({ variant }: { variant: 'primary' | 'secondary' }) {
 *   const css = useCoralCSS(
 *     'px-4 py-2 rounded',
 *     variant === 'primary' && 'bg-coral-500 text-white',
 *     variant === 'secondary' && 'bg-gray-200 text-gray-800'
 *   )
 *   return <button className={css.className}>{children}</button>
 * }
 * ```
 */
export function useCoralCSS(
  ...inputs: Array<string | boolean | null | undefined>
): { className: string; css: string } {
  const { generate, process } = useCoralContext()

  return useMemo(() => {
    const className = cn(...inputs)
    const css = generate(className)
    process(className) // Inject CSS
    return { className, css }
  }, [inputs, generate, process])
}

/**
 * Hook for conditional class names with auto CSS injection
 *
 * @example
 * ```tsx
 * function Card({ active }: { active: boolean }) {
 *   const classes = useClasses({
 *     base: 'rounded-lg shadow-md p-4',
 *     variants: {
 *       active: {
 *         true: 'border-coral-500 bg-coral-50',
 *         false: 'border-gray-200 bg-white',
 *       },
 *     },
 *   })
 *
 *   return <div className={classes({ active })}>Card content</div>
 * }
 * ```
 */
export function useClasses<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
}) {
  const { process } = useCoralContext()

  return useCallback(
    (props: Partial<{ [K in keyof V]: keyof V[K] }> = {}) => {
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
      process(className) // Inject CSS
      return className
    },
    [config, process]
  )
}

/**
 * Hook to manually inject CSS
 *
 * @example
 * ```tsx
 * function Component() {
 *   const inject = useInjectCSS()
 *
 *   useEffect(() => {
 *     inject('bg-red-500', 'hover:bg-red-600')
 *   }, [])
 *
 *   return <div className="bg-red-500 hover:bg-red-600">Hello</div>
 * }
 * ```
 */
export function useInjectCSS() {
  const { process } = useCoralContext()

  return useCallback(
    (...classNames: string[]) => {
      process(classNames)
    },
    [process]
  )
}

/**
 * Hook for responsive class names
 *
 * @example
 * ```tsx
 * function ResponsiveBox() {
 *   const className = useResponsive({
 *     base: 'p-2',
 *     sm: 'p-4',
 *     md: 'p-6',
 *     lg: 'p-8',
 *   })
 *   return <div className={className}>Responsive content</div>
 * }
 * ```
 */
export function useResponsive(classes: {
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}) {
  const { process } = useCoralContext()

  return useMemo(() => {
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
    process(className)
    return className
  }, [classes, process])
}
