/** @jsxImportSource solid-js */
/**
 * CoralCSS Solid.js Styled Components
 *
 * styled-components like API for CoralCSS in Solid.js.
 * @module solid/styled
 */

import { createMemo, splitProps, type JSX, type Component } from 'solid-js'
import { Dynamic } from 'solid-js/web'
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
  } & { class: string }>
}

/**
 * Intrinsic element types
 */
type IntrinsicElementsKeys = keyof JSX.IntrinsicElements

/**
 * Props type for styled component
 */
type StyledProps<
  T extends IntrinsicElementsKeys,
  V extends Record<string, Record<string, string>>
> = JSX.IntrinsicElements[T] & Partial<{ [K in keyof V]: keyof V[K] }> & { class?: string }

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
 *     { variant: 'primary', size: 'lg', class: 'shadow-lg' },
 *   ],
 * })
 *
 * // Usage
 * <Button variant="secondary" size="lg">Click me</Button>
 * ```
 */
export function styled<
  T extends IntrinsicElementsKeys,
  V extends Record<string, Record<string, string>> = Record<string, never>
>(
  component: T,
  options: StyledOptions<V>
): Component<StyledProps<T, V>> {
  const { base, variants, defaultVariants, compoundVariants } = options

  // Extract variant keys for prop filtering
  const variantKeys = Object.keys(variants ?? {})

  return (props: StyledProps<T, V>) => {
    const { process } = useCoralContext()

    // Split variant props from element props
    const [variantProps, elementProps] = splitProps(
      props,
      [...variantKeys, 'class'] as (keyof StyledProps<T, V>)[]
    )

    // Compute class names
    const computedClass = createMemo(() => {
      const classes: string[] = []

      // Add base classes
      if (base) {
        classes.push(base)
      }

      // Add variant classes
      if (variants) {
        for (const [variantName, variantValues] of Object.entries(variants)) {
          const value = ((variantProps as Record<string, unknown>)[variantName] ?? defaultVariants?.[variantName as keyof V]) as string | undefined
          if (value !== undefined && variantValues[value]) {
            classes.push(variantValues[value])
          }
        }
      }

      // Add compound variant classes
      if (compoundVariants) {
        for (const compound of compoundVariants) {
          const { class: compoundClass, ...conditions } = compound
          let matches = true

          for (const [key, value] of Object.entries(conditions)) {
            const propValue = (variantProps as Record<string, unknown>)[key] ?? defaultVariants?.[key as keyof V]
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

      // Add prop class
      if ((variantProps as { class?: string }).class) {
        classes.push((variantProps as { class: string }).class)
      }

      return cn(...classes)
    })

    // Inject CSS reactively
    createMemo(() => {
      process(computedClass())
    })

    // Use type assertion to handle complex prop spreading
    const dynamicProps = {
      component,
      ...elementProps,
      class: computedClass(),
    } as Parameters<typeof Dynamic>[0]

    return <Dynamic {...dynamicProps} />
  }
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
  ): Component<StyledProps<T, V>> => styled(element, options)
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
  table: ReturnType<typeof createStyled<'table'>>
  thead: ReturnType<typeof createStyled<'thead'>>
  tbody: ReturnType<typeof createStyled<'tbody'>>
  tr: ReturnType<typeof createStyled<'tr'>>
  th: ReturnType<typeof createStyled<'th'>>
  td: ReturnType<typeof createStyled<'td'>>
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
styledWithFactories.table = createStyled('table')
styledWithFactories.thead = createStyled('thead')
styledWithFactories.tbody = createStyled('tbody')
styledWithFactories.tr = createStyled('tr')
styledWithFactories.th = createStyled('th')
styledWithFactories.td = createStyled('td')

export default styledWithFactories
