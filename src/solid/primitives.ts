/**
 * CoralCSS Solid.js Primitives
 *
 * Reactive primitives for using CoralCSS in Solid.js components.
 * @module solid/primitives
 */

import { createMemo, type Accessor } from 'solid-js'
import { useCoralContext } from './provider'
import { cn } from './utils'

/**
 * Primitive to access the Coral instance
 *
 * @example
 * ```tsx
 * function Component() {
 *   const coral = useCoral()
 *   const css = coral.generate(['bg-red-500', 'p-4'])
 *   return <div class="bg-red-500 p-4">Hello</div>
 * }
 * ```
 */
export function useCoral() {
  const { coral } = useCoralContext()
  return coral
}

/**
 * Primitive to generate CSS for class names
 *
 * @example
 * ```tsx
 * function Button(props: { variant: 'primary' | 'secondary' }) {
 *   const css = useCoralCSS(
 *     () => [
 *       'px-4 py-2 rounded',
 *       props.variant === 'primary' && 'bg-coral-500 text-white',
 *       props.variant === 'secondary' && 'bg-gray-200 text-gray-800'
 *     ]
 *   )
 *   return <button class={css().className}>{props.children}</button>
 * }
 * ```
 */
export function useCoralCSS(
  classesAccessor: Accessor<Array<string | boolean | null | undefined>>
): Accessor<{ className: string; css: string }> {
  const { generate, process } = useCoralContext()

  return createMemo(() => {
    const inputs = classesAccessor()
    const className = cn(...inputs)
    const css = generate(className)
    process(className) // Inject CSS
    return { className, css }
  })
}

/**
 * Primitive for conditional class names with auto CSS injection
 *
 * @example
 * ```tsx
 * function Card(props: { active: boolean }) {
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
 *   return <div class={classes({ active: props.active })}>Card content</div>
 * }
 * ```
 */
export function useClasses<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
}) {
  const { process } = useCoralContext()

  return (props: Partial<{ [K in keyof V]: keyof V[K] }> = {}) => {
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
  }
}

/**
 * Primitive to manually inject CSS
 *
 * @example
 * ```tsx
 * function Component() {
 *   const inject = useInjectCSS()
 *
 *   onMount(() => {
 *     inject('bg-red-500', 'hover:bg-red-600')
 *   })
 *
 *   return <div class="bg-red-500 hover:bg-red-600">Hello</div>
 * }
 * ```
 */
export function useInjectCSS() {
  const { process } = useCoralContext()

  return (...classNames: string[]) => {
    process(classNames)
  }
}

/**
 * Primitive for responsive class names
 *
 * @example
 * ```tsx
 * function ResponsiveBox() {
 *   const className = useResponsive(() => ({
 *     base: 'p-2',
 *     sm: 'p-4',
 *     md: 'p-6',
 *     lg: 'p-8',
 *   }))
 *   return <div class={className()}>Responsive content</div>
 * }
 * ```
 */
export function useResponsive(classesAccessor: Accessor<{
  base?: string
  sm?: string
  md?: string
  lg?: string
  xl?: string
  '2xl'?: string
}>): Accessor<string> {
  const { process } = useCoralContext()

  return createMemo(() => {
    const classes = classesAccessor()
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
  })
}

/**
 * Create a signal-based class accessor
 *
 * @example
 * ```tsx
 * function Toggle() {
 *   const [active, setActive] = createSignal(false)
 *   const className = createClassAccessor(
 *     'px-4 py-2 rounded transition-colors',
 *     () => active() ? 'bg-coral-500 text-white' : 'bg-gray-200'
 *   )
 *
 *   return (
 *     <button class={className()} onClick={() => setActive(a => !a)}>
 *       Toggle
 *     </button>
 *   )
 * }
 * ```
 */
export function createClassAccessor(
  ...inputs: (string | Accessor<string | boolean | null | undefined>)[]
): Accessor<string> {
  const { process } = useCoralContext()

  return createMemo(() => {
    const resolved = inputs.map(input =>
      typeof input === 'function' ? input() : input
    )
    const className = cn(...resolved)
    process(className)
    return className
  })
}

/**
 * Directive for applying coral classes to elements
 * Use with Solid.js `use:` directive
 *
 * @example
 * ```tsx
 * <div use:coral="bg-red-500 p-4">Hello</div>
 * ```
 */
export function coral(el: HTMLElement, accessor: Accessor<string>) {
  const { process } = useCoralContext()

  createMemo(() => {
    const className = accessor()
    process(className)
    el.className = className
  })
}
