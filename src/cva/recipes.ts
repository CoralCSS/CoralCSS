/**
 * CVA Recipes
 *
 * Higher-level abstractions for creating styled components.
 * Inspired by Panda CSS recipes.
 *
 * @module cva/recipes
 */

import { cva, type CVAConfig, type VariantsSchema, type CVAFunction, type ClassValue } from './cva'
import { cx } from './utils'

/**
 * Recipe configuration
 */
export interface RecipeConfig<V extends VariantsSchema = VariantsSchema> extends CVAConfig<V> {
  /**
   * Recipe name for debugging
   */
  name?: string

  /**
   * Description of the recipe
   */
  description?: string

  /**
   * JSX element this recipe is designed for
   */
  jsx?: string[]
}

/**
 * Recipe function with metadata
 */
export interface Recipe<V extends VariantsSchema = VariantsSchema> extends CVAFunction<V> {
  recipeName?: string
  description?: string
  jsx?: string[]
  config: RecipeConfig<V>
}

/**
 * Define a recipe (named CVA with metadata)
 *
 * @example
 * ```ts
 * const button = defineRecipe({
 *   name: 'button',
 *   description: 'A versatile button component',
 *   jsx: ['Button', 'IconButton'],
 *   base: 'inline-flex items-center justify-center font-medium',
 *   variants: {
 *     size: {
 *       sm: 'h-8 px-3 text-sm',
 *       md: 'h-10 px-4 text-sm',
 *       lg: 'h-12 px-6 text-base',
 *     },
 *     variant: {
 *       solid: 'bg-coral-500 text-white',
 *       outline: 'border-2 border-coral-500 text-coral-600',
 *     },
 *   },
 *   defaultVariants: {
 *     size: 'md',
 *     variant: 'solid',
 *   },
 * })
 * ```
 */
export function defineRecipe<V extends VariantsSchema>(
  config: RecipeConfig<V>
): Recipe<V> {
  const { name, description, jsx, ...cvaConfig } = config
  const fn = cva(cvaConfig) as Recipe<V>

  fn.recipeName = name
  fn.description = description
  fn.jsx = jsx
  fn.config = config

  return fn
}

/**
 * Slot recipe configuration
 */
export interface SlotRecipeConfig<
  S extends string = string,
  V extends VariantsSchema = VariantsSchema
> {
  /**
   * Recipe name
   */
  name?: string

  /**
   * Description
   */
  description?: string

  /**
   * Slot names and their base classes
   */
  slots: Record<S, ClassValue>

  /**
   * Variants that apply to all slots
   */
  variants?: {
    [K in keyof V]: {
      [Value in keyof V[K]]: Partial<Record<S, ClassValue>>
    }
  }

  /**
   * Compound variants
   */
  compoundVariants?: Array<
    {
      [K in keyof V]?: keyof V[K] | (keyof V[K])[]
    } & {
      css: Partial<Record<S, ClassValue>>
    }
  >

  /**
   * Default variant values
   */
  defaultVariants?: {
    [K in keyof V]?: keyof V[K]
  }
}

/**
 * Slot recipe function
 */
export interface SlotRecipe<
  S extends string = string,
  V extends VariantsSchema = VariantsSchema
> {
  (props?: { [K in keyof V]?: keyof V[K] }): Record<S, string>
  slots: S[]
  variants: V
  defaultVariants: { [K in keyof V]?: keyof V[K] }
  config: SlotRecipeConfig<S, V>
}

/**
 * Define a slot recipe (multi-part component)
 *
 * @example
 * ```ts
 * const card = defineSlotRecipe({
 *   name: 'card',
 *   slots: {
 *     root: 'bg-white rounded-2xl shadow',
 *     header: 'px-6 py-4 border-b',
 *     body: 'px-6 py-4',
 *     footer: 'px-6 py-4 border-t bg-slate-50',
 *   },
 *   variants: {
 *     size: {
 *       sm: {
 *         root: 'max-w-sm',
 *         header: 'px-4 py-3',
 *         body: 'px-4 py-3',
 *         footer: 'px-4 py-3',
 *       },
 *       lg: {
 *         root: 'max-w-lg',
 *         header: 'px-8 py-5',
 *         body: 'px-8 py-5',
 *         footer: 'px-8 py-5',
 *       },
 *     },
 *   },
 * })
 *
 * // Usage
 * const styles = card({ size: 'lg' })
 * // styles.root, styles.header, styles.body, styles.footer
 * ```
 */
export function defineSlotRecipe<
  S extends string,
  V extends VariantsSchema
>(
  config: SlotRecipeConfig<S, V>
): SlotRecipe<S, V> {
  const { slots, variants = {} as V, compoundVariants = [], defaultVariants = {} } = config

  const slotNames = Object.keys(slots) as S[]

  const fn = (props: { [K in keyof V]?: keyof V[K] } = {}): Record<S, string> => {
    const result = {} as Record<S, string>

    // Initialize with base classes for each slot
    for (const slot of slotNames) {
      result[slot] = cx(slots[slot])
    }

    // Apply variant classes
    for (const [variantName, variantDef] of Object.entries(variants)) {
      const value = (props as Record<string, unknown>)[variantName] ?? (defaultVariants as Record<string, unknown>)[variantName]

      if (value !== undefined && value !== null) {
        const slotClasses = (variantDef as Record<string, Record<S, ClassValue>>)[value as string]

        if (slotClasses) {
          for (const [slot, classes] of Object.entries(slotClasses)) {
            if (classes) {
              result[slot as S] = cx(result[slot as S], classes as ClassValue)
            }
          }
        }
      }
    }

    // Apply compound variants
    for (const compound of compoundVariants) {
      const { css, ...conditions } = compound

      const matches = Object.entries(conditions).every(([key, value]) => {
        const currentValue = (props as Record<string, unknown>)[key] ?? (defaultVariants as Record<string, unknown>)[key]

        if (Array.isArray(value)) {
          return value.includes(currentValue as typeof value[number])
        }

        return currentValue === value
      })

      if (matches && css) {
        for (const [slot, classes] of Object.entries(css)) {
          if (classes) {
            result[slot as S] = cx(result[slot as S], classes as ClassValue)
          }
        }
      }
    }

    return result
  }

  fn.slots = slotNames
  fn.variants = variants
  fn.defaultVariants = defaultVariants
  fn.config = config

  return fn as SlotRecipe<S, V>
}

/**
 * Create a styled component factory from a recipe
 *
 * @example
 * ```ts
 * const button = defineRecipe({ ... })
 * const styled = createStyled(button)
 *
 * // Can be used with any component library
 * const Button = styled('button')
 * ```
 */
export function createStyled<V extends VariantsSchema>(
  recipe: Recipe<V>
) {
  return <E extends string>(element: E) => {
    return {
      element,
      recipe,
      getClassName: (props: { [K in keyof V]?: keyof V[K] } = {}) => recipe(props),
    }
  }
}

/**
 * Pre-built recipes for common components
 */
export const recipes = {
  /**
   * Button recipe
   */
  button: defineRecipe({
    name: 'button',
    description: 'Interactive button component',
    base: 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    variants: {
      variant: {
        solid: 'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 focus-visible:ring-coral-500',
        soft: 'bg-coral-100 text-coral-700 hover:bg-coral-200 dark:bg-coral-500/20 dark:text-coral-400',
        outline: 'border-2 border-coral-500 text-coral-600 hover:bg-coral-50 dark:text-coral-400',
        ghost: 'text-coral-600 hover:bg-coral-50 dark:text-coral-400 dark:hover:bg-coral-500/10',
        link: 'text-coral-600 hover:underline dark:text-coral-400',
      },
      size: {
        xs: 'h-7 px-2.5 text-xs gap-1 rounded-lg',
        sm: 'h-8 px-3 text-sm gap-1.5 rounded-lg',
        md: 'h-10 px-4 text-sm gap-2 rounded-xl',
        lg: 'h-11 px-5 text-base gap-2 rounded-xl',
        xl: 'h-12 px-6 text-lg gap-2.5 rounded-xl',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed pointer-events-none',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  }),

  /**
   * Badge recipe
   */
  badge: defineRecipe({
    name: 'badge',
    description: 'Status label component',
    base: 'inline-flex items-center font-medium',
    variants: {
      variant: {
        solid: 'bg-coral-500 text-white',
        soft: 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-400',
        outline: 'border border-coral-500 text-coral-600 dark:text-coral-400',
      },
      size: {
        sm: 'text-xs px-2 py-0.5 rounded-full',
        md: 'text-xs px-2.5 py-1 rounded-full',
        lg: 'text-sm px-3 py-1 rounded-full',
      },
    },
    defaultVariants: {
      variant: 'soft',
      size: 'md',
    },
  }),

  /**
   * Card recipe
   */
  card: defineRecipe({
    name: 'card',
    description: 'Content container component',
    base: 'bg-white dark:bg-slate-800 overflow-hidden transition-shadow',
    variants: {
      variant: {
        elevated: 'shadow-lg hover:shadow-xl',
        outlined: 'border border-slate-200 dark:border-slate-700',
        filled: 'bg-slate-50 dark:bg-slate-800/50',
      },
      size: {
        sm: 'rounded-xl p-4',
        md: 'rounded-2xl p-6',
        lg: 'rounded-2xl p-8',
      },
      interactive: {
        true: 'cursor-pointer hover:border-coral-500',
      },
    },
    defaultVariants: {
      variant: 'outlined',
      size: 'md',
    },
  }),

  /**
   * Input recipe
   */
  input: defineRecipe({
    name: 'input',
    description: 'Form input component',
    base: 'w-full transition-all duration-200 focus:outline-none text-slate-900 dark:text-white placeholder-slate-400',
    variants: {
      variant: {
        default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20',
        filled: 'bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-coral-500',
        flushed: 'bg-transparent border-b-2 border-slate-200 dark:border-slate-700 rounded-none focus:border-coral-500',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-lg',
        md: 'h-10 px-4 text-sm rounded-xl',
        lg: 'h-12 px-4 text-base rounded-xl',
      },
      error: {
        true: 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }),
}

/**
 * Pre-built slot recipes for multi-part components
 */
export const slotRecipes = {
  /**
   * Card slot recipe
   */
  card: defineSlotRecipe({
    name: 'card',
    slots: {
      root: 'bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden',
      header: 'px-6 py-4 border-b border-slate-200 dark:border-slate-700',
      title: 'text-lg font-semibold text-slate-900 dark:text-white',
      description: 'text-sm text-slate-500 dark:text-slate-400 mt-1',
      body: 'px-6 py-4',
      footer: 'px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50',
    },
    variants: {
      size: {
        sm: {
          root: '',
          header: 'px-4 py-3',
          title: 'text-base',
          description: '',
          body: 'px-4 py-3',
          footer: 'px-4 py-3',
        },
        lg: {
          root: '',
          header: 'px-8 py-5',
          title: 'text-xl',
          description: '',
          body: 'px-8 py-6',
          footer: 'px-8 py-5',
        },
      },
    },
  }),

  /**
   * Modal slot recipe
   */
  modal: defineSlotRecipe({
    name: 'modal',
    slots: {
      overlay: 'fixed inset-0 z-50 bg-black/50 backdrop-blur-sm',
      container: 'fixed inset-0 z-50 flex items-center justify-center p-4',
      content: 'w-full bg-white dark:bg-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200',
      header: 'px-6 py-4 border-b border-slate-200 dark:border-slate-700',
      title: 'text-lg font-semibold text-slate-900 dark:text-white',
      body: 'px-6 py-4',
      footer: 'px-6 py-4 border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50 flex items-center justify-end gap-3',
      close: 'p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors',
    },
    variants: {
      size: {
        sm: { content: 'max-w-sm', header: '', title: '', body: '', footer: '', overlay: '', container: '', close: '' },
        md: { content: 'max-w-md', header: '', title: '', body: '', footer: '', overlay: '', container: '', close: '' },
        lg: { content: 'max-w-lg', header: '', title: '', body: '', footer: '', overlay: '', container: '', close: '' },
        xl: { content: 'max-w-xl', header: '', title: '', body: '', footer: '', overlay: '', container: '', close: '' },
        full: { content: 'max-w-full min-h-screen rounded-none', header: '', title: '', body: '', footer: '', overlay: '', container: '', close: '' },
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }),
}
