/**
 * CoralCSS Styled Components
 *
 * styled-components like API for CoralCSS.
 * @module react/styled
 */

import React, { forwardRef, useMemo } from 'react'
import type { ComponentType, ElementType, ComponentPropsWithRef, ForwardRefExoticComponent, RefAttributes } from 'react'
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
type IntrinsicElementsKeys = keyof React.JSX.IntrinsicElements

/**
 * Styled component type
 */
export type StyledComponent<
  T extends IntrinsicElementsKeys | ComponentType<Record<string, unknown>>,
  V extends Record<string, Record<string, string>> = Record<string, never>
> = ForwardRefExoticComponent<
  Omit<ComponentPropsWithRef<T extends ElementType ? T : never>, keyof V> &
  Partial<{ [K in keyof V]: keyof V[K] }> &
  { className?: string } &
  RefAttributes<unknown>
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
    const Component = component as ElementType
    return React.createElement(Component, {
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
styled.div = createStyled('div')
styled.span = createStyled('span')
styled.button = createStyled('button')
styled.a = createStyled('a')
styled.p = createStyled('p')
styled.h1 = createStyled('h1')
styled.h2 = createStyled('h2')
styled.h3 = createStyled('h3')
styled.input = createStyled('input')
styled.label = createStyled('label')
styled.form = createStyled('form')
styled.ul = createStyled('ul')
styled.li = createStyled('li')
styled.nav = createStyled('nav')
styled.header = createStyled('header')
styled.footer = createStyled('footer')
styled.main = createStyled('main')
styled.section = createStyled('section')
styled.article = createStyled('article')
styled.aside = createStyled('aside')
styled.img = createStyled('img')

export default styled
