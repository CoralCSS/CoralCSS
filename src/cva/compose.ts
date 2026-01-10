/**
 * CVA Composition Utilities
 *
 * Utilities for composing and extending CVA configurations.
 *
 * @module cva/compose
 */

import { cva, type CVAConfig, type VariantsSchema, type CVAFunction, type ClassValue } from './cva'
import { cx } from './utils'

/**
 * Compose multiple CVA functions into one
 * All base classes and variants are merged
 *
 * @example
 * ```ts
 * const baseButton = cva({
 *   base: 'inline-flex items-center',
 *   variants: { size: { sm: 'h-8', md: 'h-10' } }
 * })
 *
 * const coloredButton = cva({
 *   variants: { color: { red: 'bg-red-500', blue: 'bg-blue-500' } }
 * })
 *
 * const button = compose(baseButton, coloredButton)
 * // Has both size and color variants
 * ```
 */
export function compose<
  V1 extends VariantsSchema,
  V2 extends VariantsSchema
>(
  fn1: CVAFunction<V1>,
  fn2: CVAFunction<V2>
): CVAFunction<V1 & V2>

export function compose<
  V1 extends VariantsSchema,
  V2 extends VariantsSchema,
  V3 extends VariantsSchema
>(
  fn1: CVAFunction<V1>,
  fn2: CVAFunction<V2>,
  fn3: CVAFunction<V3>
): CVAFunction<V1 & V2 & V3>

export function compose<
  V1 extends VariantsSchema,
  V2 extends VariantsSchema,
  V3 extends VariantsSchema,
  V4 extends VariantsSchema
>(
  fn1: CVAFunction<V1>,
  fn2: CVAFunction<V2>,
  fn3: CVAFunction<V3>,
  fn4: CVAFunction<V4>
): CVAFunction<V1 & V2 & V3 & V4>

export function compose(
  ...fns: CVAFunction<VariantsSchema>[]
): CVAFunction<VariantsSchema> {
  // Merge all variants
  const mergedVariants: VariantsSchema = {}
  const mergedDefaults: Record<string, unknown> = {}

  for (const fn of fns) {
    Object.assign(mergedVariants, fn.variants)
    Object.assign(mergedDefaults, fn.defaultVariants)
  }

  // Create composed function
  const composed = (props: Record<string, unknown> = {}): string => {
    const classes: string[] = []

    for (const fn of fns) {
      classes.push(fn(props as Parameters<typeof fn>[0]))
    }

    // Add any extra class/className props
    if (props.class) {
      classes.push(props.class as string)
    }
    if (props.className) {
      classes.push(props.className as string)
    }

    return cx(...classes)
  }

  composed.variants = mergedVariants
  composed.defaultVariants = mergedDefaults

  return composed as CVAFunction<VariantsSchema>
}

/**
 * Extend an existing CVA function with additional configuration
 *
 * @example
 * ```ts
 * const button = cva({
 *   base: 'inline-flex items-center',
 *   variants: { size: { sm: 'h-8', md: 'h-10' } }
 * })
 *
 * const iconButton = extend(button, {
 *   base: 'justify-center',
 *   variants: {
 *     size: { sm: 'w-8', md: 'w-10' } // Extends existing
 *   }
 * })
 * ```
 */
export function extend<
  V extends VariantsSchema,
  E extends VariantsSchema
>(
  base: CVAFunction<V>,
  extension: CVAConfig<E>
): CVAFunction<V & E> {
  // Deep merge variants
  const mergedVariants: VariantsSchema = { ...base.variants }

  if (extension.variants) {
    for (const [key, values] of Object.entries(extension.variants)) {
      if (key in mergedVariants) {
        // Merge with existing variant
        mergedVariants[key] = {
          ...mergedVariants[key],
          ...values,
        }
      } else {
        // Add new variant
        mergedVariants[key] = values
      }
    }
  }

  // Merge default variants
  const mergedDefaults = {
    ...base.defaultVariants,
    ...extension.defaultVariants,
  }

  // Create extended function
  const extended = (props: Record<string, unknown> = {}): string => {
    const baseClasses = base(props as Parameters<typeof base>[0])
    const extensionBase = extension.base ? cx(extension.base) : ''

    // Process compound variants from extension
    const compoundClasses: string[] = []
    if (extension.compoundVariants) {
      for (const compound of extension.compoundVariants) {
        const { class: compoundClass, className, ...conditions } = compound

        const matches = Object.entries(conditions).every(([key, value]) => {
          const currentValue = props[key] ?? mergedDefaults[key]
          if (Array.isArray(value)) {
            return value.includes(currentValue)
          }
          return currentValue === value
        })

        if (matches) {
          if (compoundClass) {
            compoundClasses.push(cx(compoundClass))
          }
          if (className) {
            compoundClasses.push(cx(className))
          }
        }
      }
    }

    return cx(baseClasses, extensionBase, ...compoundClasses)
  }

  extended.variants = mergedVariants as V & E
  extended.defaultVariants = mergedDefaults

  return extended as CVAFunction<V & E>
}

/**
 * Create a CVA wrapper with preset defaults
 *
 * @example
 * ```ts
 * const button = cva({
 *   variants: {
 *     size: { sm: 'h-8', md: 'h-10', lg: 'h-12' },
 *     variant: { solid: 'bg-blue-500', outline: 'border-blue-500' }
 *   }
 * })
 *
 * const smallButton = withDefaults(button, { size: 'sm' })
 * smallButton({ variant: 'solid' }) // size is already 'sm'
 * ```
 */
export function withDefaults<V extends VariantsSchema>(
  fn: CVAFunction<V>,
  defaults: Partial<{ [K in keyof V]: keyof V[K] }>
): CVAFunction<V> {
  const wrapped = (props: Record<string, unknown> = {}): string => {
    return fn({ ...defaults, ...props })
  }

  wrapped.variants = fn.variants
  wrapped.defaultVariants = { ...fn.defaultVariants, ...defaults }

  return wrapped as CVAFunction<V>
}

/**
 * Create a responsive wrapper that applies different variants at breakpoints
 *
 * @example
 * ```ts
 * const button = cva({ variants: { size: { sm: 'h-8', md: 'h-10' } } })
 * const classes = responsive(button, {
 *   size: { base: 'sm', md: 'md' }
 * })
 * // Returns classes with responsive prefixes
 * ```
 */
export function responsive<V extends VariantsSchema>(
  fn: CVAFunction<V>,
  responsiveProps: {
    [K in keyof V]?: {
      base?: keyof V[K]
      sm?: keyof V[K]
      md?: keyof V[K]
      lg?: keyof V[K]
      xl?: keyof V[K]
      '2xl'?: keyof V[K]
    }
  }
): string {
  const classes: string[] = []
  const breakpoints = ['base', 'sm', 'md', 'lg', 'xl', '2xl'] as const

  for (const breakpoint of breakpoints) {
    const propsForBreakpoint: Record<string, unknown> = {}

    for (const [variantKey, breakpointValues] of Object.entries(responsiveProps)) {
      const value = (breakpointValues as Record<string, unknown>)?.[breakpoint]
      if (value !== undefined) {
        propsForBreakpoint[variantKey] = value
      }
    }

    if (Object.keys(propsForBreakpoint).length > 0) {
      const variantClasses = fn(propsForBreakpoint as Parameters<typeof fn>[0])

      if (breakpoint === 'base') {
        classes.push(variantClasses)
      } else {
        // Prefix each class with the breakpoint
        const prefixedClasses = variantClasses
          .split(' ')
          .map(c => `${breakpoint}:${c}`)
          .join(' ')
        classes.push(prefixedClasses)
      }
    }
  }

  return cx(...classes)
}

/**
 * Create a conditional variant that only applies when a condition is true
 *
 * @example
 * ```ts
 * const button = cva({ variants: { disabled: { true: 'opacity-50' } } })
 * const classes = conditional(button, 'disabled', isDisabled)
 * ```
 */
export function conditional<V extends VariantsSchema, K extends keyof V>(
  fn: CVAFunction<V>,
  variantKey: K,
  condition: boolean,
  trueValue: keyof V[K],
  falseValue?: keyof V[K]
): string {
  const props = {
    [variantKey]: condition ? trueValue : falseValue,
  } as Parameters<typeof fn>[0]

  return fn(props)
}

/**
 * Merge multiple class sources with proper precedence
 *
 * @example
 * ```ts
 * const classes = mergeVariants(
 *   button({ size: 'md' }),
 *   'custom-class',
 *   isActive && 'is-active',
 *   { 'is-disabled': isDisabled }
 * )
 * ```
 */
export function mergeVariants(...sources: ClassValue[]): string {
  return cx(...sources)
}
