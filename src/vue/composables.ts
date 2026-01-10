/**
 * CoralCSS Vue Composables
 *
 * Vue 3 composition API hooks for CoralCSS.
 * @module vue/composables
 */

import { inject, computed, provide, ref, watch, type Ref, type ComputedRef } from 'vue'
import { CoralKey, CoralCSSKey } from './plugin'
import { Coral, createCoral } from '../index'
import { cn } from './utils'

/**
 * Provide a Coral instance to child components
 *
 * @example
 * ```ts
 * // In parent component
 * const coral = provideCoralInstance({ darkMode: 'class' })
 * ```
 */
export function provideCoralInstance(options = {}): Coral {
  const coral = createCoral(options)
  provide(CoralKey, coral)
  provide(CoralCSSKey, new Set<string>())
  return coral
}

/**
 * Get the Coral instance
 *
 * @example
 * ```ts
 * const coral = useCoral()
 * const css = coral.generate(['bg-red-500', 'p-4'])
 * ```
 */
export function useCoral(): Coral {
  const coral = inject(CoralKey)
  if (!coral) {
    throw new Error('useCoral must be used within a component that has CoralPlugin installed')
  }
  return coral
}

/**
 * Generate and inject CSS for class names
 *
 * @example
 * ```vue
 * <script setup>
 * const { className, css } = useCoralCSS(
 *   'px-4 py-2 rounded',
 *   props.active && 'bg-coral-500 text-white'
 * )
 * </script>
 *
 * <template>
 *   <button :class="className">Click me</button>
 * </template>
 * ```
 */
export function useCoralCSS(
  ...inputs: Array<string | boolean | null | undefined | Ref<string | boolean | null | undefined>>
): { className: ComputedRef<string>; css: ComputedRef<string> } {
  const coral = useCoral()
  const injectedCSS = inject(CoralCSSKey) ?? new Set<string>()

  const className = computed(() => {
    const resolvedInputs = inputs.map(input => {
      if (input && typeof input === 'object' && 'value' in input) {
        return input.value
      }
      return input
    })
    return cn(...resolvedInputs as (string | boolean | null | undefined)[])
  })

  const css = computed(() => {
    const generatedCSS = coral.generate(className.value.split(/\s+/))

    // Inject CSS if not already injected
    if (generatedCSS && !injectedCSS.has(generatedCSS)) {
      injectedCSS.add(generatedCSS)
      if (typeof document !== 'undefined') {
        const style = document.getElementById('coral-css-vue')
        if (style) {
          style.textContent = Array.from(injectedCSS).join('\n')
        }
      }
    }

    return generatedCSS
  })

  return { className, css }
}

/**
 * Create a variant-based class generator
 *
 * @example
 * ```vue
 * <script setup>
 * const classes = useClasses({
 *   base: 'rounded-lg shadow-md p-4',
 *   variants: {
 *     active: {
 *       true: 'border-coral-500 bg-coral-50',
 *       false: 'border-gray-200 bg-white',
 *     },
 *   },
 * })
 *
 * const active = ref(false)
 * const cardClass = computed(() => classes({ active: active.value }))
 * </script>
 *
 * <template>
 *   <div :class="cardClass">Card content</div>
 * </template>
 * ```
 */
export function useClasses<V extends Record<string, Record<string, string>>>(config: {
  base?: string
  variants?: V
  defaultVariants?: Partial<{ [K in keyof V]: keyof V[K] }>
}) {
  const coral = useCoral()
  const injectedCSS = inject(CoralCSSKey) ?? new Set<string>()

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

    // Generate and inject CSS
    const css = coral.generate(className.split(/\s+/))
    if (css && !injectedCSS.has(css)) {
      injectedCSS.add(css)
      if (typeof document !== 'undefined') {
        const style = document.getElementById('coral-css-vue')
        if (style) {
          style.textContent = Array.from(injectedCSS).join('\n')
        }
      }
    }

    return className
  }
}

/**
 * Create responsive class names
 *
 * @example
 * ```vue
 * <script setup>
 * const className = useResponsive({
 *   base: 'p-2',
 *   sm: 'p-4',
 *   md: 'p-6',
 *   lg: 'p-8',
 * })
 * </script>
 *
 * <template>
 *   <div :class="className">Responsive content</div>
 * </template>
 * ```
 */
export function useResponsive(classes: {
  base?: string | Ref<string>
  sm?: string | Ref<string>
  md?: string | Ref<string>
  lg?: string | Ref<string>
  xl?: string | Ref<string>
  '2xl'?: string | Ref<string>
}): ComputedRef<string> {
  const coral = useCoral()
  const injectedCSS = inject(CoralCSSKey) ?? new Set<string>()

  return computed(() => {
    const result: string[] = []

    const getValue = (value: string | Ref<string> | undefined): string | undefined => {
      if (!value) { return undefined }
      if (typeof value === 'object' && 'value' in value) {
        return value.value
      }
      return value
    }

    const base = getValue(classes.base)
    const sm = getValue(classes.sm)
    const md = getValue(classes.md)
    const lg = getValue(classes.lg)
    const xl = getValue(classes.xl)
    const xxl = getValue(classes['2xl'])

    if (base) {
      result.push(base)
    }
    if (sm) {
      result.push(sm.split(' ').map(c => `sm:${c}`).join(' '))
    }
    if (md) {
      result.push(md.split(' ').map(c => `md:${c}`).join(' '))
    }
    if (lg) {
      result.push(lg.split(' ').map(c => `lg:${c}`).join(' '))
    }
    if (xl) {
      result.push(xl.split(' ').map(c => `xl:${c}`).join(' '))
    }
    if (xxl) {
      result.push(xxl.split(' ').map(c => `2xl:${c}`).join(' '))
    }

    const className = result.join(' ')

    // Generate and inject CSS
    const css = coral.generate(className.split(/\s+/))
    if (css && !injectedCSS.has(css)) {
      injectedCSS.add(css)
      if (typeof document !== 'undefined') {
        const style = document.getElementById('coral-css-vue')
        if (style) {
          style.textContent = Array.from(injectedCSS).join('\n')
        }
      }
    }

    return className
  })
}

/**
 * Watch a reactive value and inject its CSS
 *
 * @example
 * ```vue
 * <script setup>
 * const dynamicClass = ref('bg-red-500')
 * useWatchCSS(dynamicClass)
 * </script>
 * ```
 */
export function useWatchCSS(classRef: Ref<string | string[]>) {
  const coral = useCoral()
  const injectedCSS = inject(CoralCSSKey) ?? new Set<string>()

  watch(classRef, (newValue) => {
    const classes = Array.isArray(newValue) ? newValue : newValue.split(/\s+/)
    const css = coral.generate(classes)

    if (css && !injectedCSS.has(css)) {
      injectedCSS.add(css)
      if (typeof document !== 'undefined') {
        const style = document.getElementById('coral-css-vue')
        if (style) {
          style.textContent = Array.from(injectedCSS).join('\n')
        }
      }
    }
  }, { immediate: true })
}
