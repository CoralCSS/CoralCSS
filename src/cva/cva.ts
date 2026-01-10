/**
 * Class Variance Authority Core
 *
 * Create type-safe, variant-driven component classes.
 *
 * @module cva/cva
 */

import { cx } from './utils'

/**
 * Configuration for a CVA component
 */
export interface CVAConfig<V extends VariantsSchema = VariantsSchema> {
  /**
   * Base classes applied to all variants
   */
  base?: ClassValue

  /**
   * Variant definitions
   */
  variants?: V

  /**
   * Compound variants for combining multiple variant conditions
   */
  compoundVariants?: CompoundVariant<V>[]

  /**
   * Default variant values
   */
  defaultVariants?: DefaultVariants<V>
}

/**
 * Schema for variant definitions
 */
export type VariantsSchema = {
  [variant: string]: {
    [value: string]: ClassValue
  }
}

/**
 * Class value types
 */
export type ClassValue =
  | string
  | string[]
  | undefined
  | null
  | false
  | ClassValue[]
  | { [key: string]: boolean | undefined }

/**
 * Compound variant definition
 */
export type CompoundVariant<V extends VariantsSchema> = {
  [K in keyof V]?: keyof V[K] | (keyof V[K])[]
} & {
  class?: ClassValue
  className?: ClassValue
}

/**
 * Default variant values
 */
export type DefaultVariants<V extends VariantsSchema> = {
  [K in keyof V]?: keyof V[K] | null | undefined
}

/**
 * Props for variant selection
 */
export type VariantProps<T extends (...args: unknown[]) => unknown> =
  T extends (props: infer P) => unknown
    ? Omit<P, 'class' | 'className'>
    : never

/**
 * CVA function signature
 */
export interface CVAFunction<V extends VariantsSchema> {
  (props?: CVAProps<V>): string
  variants: V
  defaultVariants: DefaultVariants<V>
}

/**
 * Props passed to CVA function
 */
export type CVAProps<V extends VariantsSchema> = {
  [K in keyof V]?: keyof V[K] | null | undefined
} & {
  class?: ClassValue
  className?: ClassValue
}

/**
 * Create a CVA (Class Variance Authority) component
 *
 * @example
 * ```ts
 * const button = cva({
 *   base: 'inline-flex items-center justify-center font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       solid: 'bg-coral-500 text-white hover:bg-coral-600',
 *       outline: 'border-2 border-coral-500 text-coral-600 hover:bg-coral-50',
 *       ghost: 'text-coral-600 hover:bg-coral-50',
 *     },
 *     size: {
 *       sm: 'h-8 px-3 text-sm',
 *       md: 'h-10 px-4 text-sm',
 *       lg: 'h-12 px-6 text-base',
 *     },
 *   },
 *   compoundVariants: [
 *     { variant: 'solid', size: 'lg', class: 'shadow-lg' },
 *   ],
 *   defaultVariants: {
 *     variant: 'solid',
 *     size: 'md',
 *   },
 * })
 *
 * // Usage
 * button() // Default: solid + md
 * button({ variant: 'outline', size: 'lg' })
 * button({ class: 'mt-4' }) // Additional classes
 * ```
 */
export function cva<V extends VariantsSchema>(
  config: CVAConfig<V>
): CVAFunction<V> {
  const { base, variants = {} as V, compoundVariants = [], defaultVariants = {} } = config

  const cvafn = (props: CVAProps<V> = {}): string => {
    // Separate class props from variant props
    const { class: classProp, className, ...variantProps } = props as CVAProps<V> & {
      class?: ClassValue
      className?: ClassValue
    }

    // Collect classes
    const classes: ClassValue[] = []

    // Add base classes
    if (base) {
      classes.push(base)
    }

    // Process variants
    if (variants) {
      for (const [variantName, variantValues] of Object.entries(variants)) {
        // Get the variant value (from props or defaults)
        const variantValue =
          (variantProps as Record<string, unknown>)[variantName] ??
          (defaultVariants as Record<string, unknown>)[variantName]

        // Skip if no value
        if (variantValue === null || variantValue === undefined) {
          continue
        }

        // Get the class for this variant value
        const variantClass = (variantValues as Record<string, ClassValue>)[
          variantValue as string
        ]

        if (variantClass) {
          classes.push(variantClass)
        }
      }
    }

    // Process compound variants
    for (const compound of compoundVariants) {
      const { class: compoundClass, className: compoundClassName, ...conditions } = compound

      // Check if all conditions match
      const matches = Object.entries(conditions).every(([key, value]) => {
        const currentValue =
          (variantProps as Record<string, unknown>)[key] ?? (defaultVariants as Record<string, unknown>)[key]

        // Handle array of values
        if (Array.isArray(value)) {
          return value.includes(currentValue as typeof value[number])
        }

        return currentValue === value
      })

      if (matches) {
        if (compoundClass) {
          classes.push(compoundClass)
        }
        if (compoundClassName) {
          classes.push(compoundClassName)
        }
      }
    }

    // Add custom class/className props
    if (classProp) {
      classes.push(classProp)
    }
    if (className) {
      classes.push(className)
    }

    return cx(...classes)
  }

  // Attach metadata
  cvafn.variants = variants
  cvafn.defaultVariants = defaultVariants as DefaultVariants<V>

  return cvafn as CVAFunction<V>
}

/**
 * Helper to extract variant keys from a CVA config
 */
export type VariantKeys<T extends CVAConfig> = T extends CVAConfig<infer V>
  ? keyof V
  : never

/**
 * Helper to extract variant values for a specific key
 */
export type VariantValues<T extends CVAConfig, K extends VariantKeys<T>> =
  T extends CVAConfig<infer V>
    ? K extends keyof V
      ? keyof V[K]
      : never
    : never

/**
 * Create variant props type from CVA config
 */
export type InferVariantProps<T extends CVAConfig> = T extends CVAConfig<infer V>
  ? {
      [K in keyof V]?: keyof V[K] | null | undefined
    }
  : never
