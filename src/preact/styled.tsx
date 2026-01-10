/** @jsxImportSource preact */
/**
 * CoralCSS Preact Styled Components
 *
 * styled-components like API for CoralCSS in Preact.
 * @module preact/styled
 */

import { h } from 'preact'
import { forwardRef } from 'preact/compat'
import { useMemo } from 'preact/hooks'
import type { JSX, ComponentType, Ref } from 'preact'
import { useCoralContext } from './provider'
import { cn } from './utils'

/**
 * Styled component options
 */
export interface StyledOptions<V extends Record<string, Record<string, string>> = Record<string, never>> {
  /** Base class names */
  base?: string
  /** Variant definitions */
  variants?: V
  /** Default variant values */
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
  /** Compound variants for combining multiple variants */
  compoundVariants?: Array<{
    [K in keyof V]?: keyof V[K]
  } & { className: string }>
}

/**
 * Intrinsic element types
 */
type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

/**
 * Styled component type
 */
export type StyledComponent<
  T extends IntrinsicElementsKeys | ComponentType<Record<string, unknown>>,
  V extends Record<string, Record<string, string>> = Record<string, never>
> = ComponentType<
  Omit<T extends IntrinsicElementsKeys ? JSX.IntrinsicElements[T] : Record<string, unknown>, keyof V> &
  Partial<{ [K in keyof V]: keyof V[K] }> &
  { className?: string; ref?: Ref<unknown> }
>

/**
 * Create a styled component with CoralCSS classes
 *
 * @example
 * ```tsx
 * const Button = styled('button', {
 *   base: 'px-4 py-2 rounded font-medium transition-colors',
 *   variants: {
 *     variant: {
 *       primary: 'bg-coral-500 text-white hover:bg-coral-600',
 *       secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
 *       ghost: 'bg-transparent hover:bg-gray-100',
 *     },
 *     size: {
 *       sm: 'text-sm px-3 py-1.5',
 *       md: 'text-base px-4 py-2',
 *       lg: 'text-lg px-6 py-3',
 *     },
 *   },
 *   defaultVariants: {
 *     variant: 'primary',
 *     size: 'md',
 *   },
 *   compoundVariants: [
 *     { variant: 'primary', size: 'lg', className: 'shadow-lg' },
 *   ],
 * })
 *
 * // Usage
 * <Button variant="secondary" size="lg">Click me</Button>
 * ```
 */
export function styled<
  T extends IntrinsicElementsKeys | ComponentType<Record<string, unknown>>,
  V extends Record<string, Record<string, string>> = Record<string, never>
>(
  component: T,
  options: StyledOptions<V>
): StyledComponent<T, V> {
  const { base, variants, defaultVariants, compoundVariants } = options

  // Extract variant keys for prop filtering
  const variantKeys = new Set(Object.keys(variants ?? {}))

  const StyledComponent = forwardRef<unknown, Record<string, unknown>>((props, ref) => {
    const { process } = useCoralContext()
    const { className: propClassName, ...restProps } = props

    // Compute class names
    const computedClassName = useMemo(() => {
      const classes: string[] = []

      // Add base classes
      if (base) {
        classes.push(base)
      }

      // Add variant classes
      if (variants) {
        for (const [variantName, variantValues] of Object.entries(variants)) {
          const value = (props[variantName] ?? defaultVariants?.[variantName as keyof V]) as string | undefined
          if (value !== undefined && variantValues[value]) {
            classes.push(variantValues[value])
          }
        }
      }

      // Add compound variant classes
      if (compoundVariants) {
        for (const compound of compoundVariants) {
          const { className: compoundClass, ...conditions } = compound
          let matches = true

          for (const [key, value] of Object.entries(conditions)) {
            const propValue = props[key] ?? defaultVariants?.[key as keyof V]
            if (propValue !== value) {
              matches = false
              break
            }
          }

          if (matches) {
            classes.push(compoundClass)
          }
        }
      }

      // Add prop className
      if (propClassName && typeof propClassName === 'string') {
        classes.push(propClassName)
      }

      return cn(...classes)
    }, [props, propClassName])

    // Inject CSS
    useMemo(() => {
      process(computedClassName)
    }, [computedClassName, process])

    // Filter out variant props
    const componentProps = useMemo(() => {
      const filtered: Record<string, unknown> = {}
      for (const [key, value] of Object.entries(restProps)) {
        if (!variantKeys.has(key)) {
          filtered[key] = value
        }
      }
      return filtered
    }, [restProps])

    // Create element
    return h(component as string, {
      ...componentProps,
      ref,
      className: computedClassName,
    })
  })

  StyledComponent.displayName = typeof component === 'string'
    ? `Styled(${component})`
    : `Styled(${(component as ComponentType<unknown>).displayName ?? 'Component'})`

  return StyledComponent as StyledComponent<T, V>
}

/**
 * Create styled component factory for a specific element
 *
 * @example
 * ```tsx
 * const styledDiv = createStyled('div')
 * const Box = styledDiv({ base: 'p-4 rounded' })
 * ```
 */
export function createStyled<T extends IntrinsicElementsKeys>(element: T) {
  return <V extends Record<string, Record<string, string>> = Record<string, never>>(
    options: StyledOptions<V>
  ): StyledComponent<T, V> => styled(element, options)
}

// Pre-bound styled factories for common elements
type StyledFactory = typeof styled & {
  div: ReturnType<typeof createStyled<'div'>>
  span: ReturnType<typeof createStyled<'span'>>
  button: ReturnType<typeof createStyled<'button'>>
  a: ReturnType<typeof createStyled<'a'>>
  p: ReturnType<typeof createStyled<'p'>>
  h1: ReturnType<typeof createStyled<'h1'>>
  h2: ReturnType<typeof createStyled<'h2'>>
  h3: ReturnType<typeof createStyled<'h3'>>
  h4: ReturnType<typeof createStyled<'h4'>>
  h5: ReturnType<typeof createStyled<'h5'>>
  h6: ReturnType<typeof createStyled<'h6'>>
  input: ReturnType<typeof createStyled<'input'>>
  label: ReturnType<typeof createStyled<'label'>>
  form: ReturnType<typeof createStyled<'form'>>
  ul: ReturnType<typeof createStyled<'ul'>>
  ol: ReturnType<typeof createStyled<'ol'>>
  li: ReturnType<typeof createStyled<'li'>>
  nav: ReturnType<typeof createStyled<'nav'>>
  header: ReturnType<typeof createStyled<'header'>>
  footer: ReturnType<typeof createStyled<'footer'>>
  main: ReturnType<typeof createStyled<'main'>>
  section: ReturnType<typeof createStyled<'section'>>
  article: ReturnType<typeof createStyled<'article'>>
  aside: ReturnType<typeof createStyled<'aside'>>
  img: ReturnType<typeof createStyled<'img'>>
}

const styledWithFactories = styled as StyledFactory
styledWithFactories.div = createStyled('div')
styledWithFactories.span = createStyled('span')
styledWithFactories.button = createStyled('button')
styledWithFactories.a = createStyled('a')
styledWithFactories.p = createStyled('p')
styledWithFactories.h1 = createStyled('h1')
styledWithFactories.h2 = createStyled('h2')
styledWithFactories.h3 = createStyled('h3')
styledWithFactories.h4 = createStyled('h4')
styledWithFactories.h5 = createStyled('h5')
styledWithFactories.h6 = createStyled('h6')
styledWithFactories.input = createStyled('input')
styledWithFactories.label = createStyled('label')
styledWithFactories.form = createStyled('form')
styledWithFactories.ul = createStyled('ul')
styledWithFactories.ol = createStyled('ol')
styledWithFactories.li = createStyled('li')
styledWithFactories.nav = createStyled('nav')
styledWithFactories.header = createStyled('header')
styledWithFactories.footer = createStyled('footer')
styledWithFactories.main = createStyled('main')
styledWithFactories.section = createStyled('section')
styledWithFactories.article = createStyled('article')
styledWithFactories.aside = createStyled('aside')
styledWithFactories.img = createStyled('img')

export default styledWithFactories
