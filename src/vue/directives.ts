/**
 * CoralCSS Vue Directives
 *
 * Custom directives for CoralCSS in Vue.
 * @module vue/directives
 */

import type { Directive, DirectiveBinding } from 'vue'
import { createCoral } from '../index'

// Shared coral instance for directive use
let sharedCoral: ReturnType<typeof createCoral> | null = null
const injectedCSS = new Set<string>()

function getCoralInstance() {
  if (!sharedCoral) {
    sharedCoral = createCoral()
  }
  return sharedCoral
}

function injectCSS(css: string) {
  if (!css || injectedCSS.has(css)) { return }

  injectedCSS.add(css)

  if (typeof document !== 'undefined') {
    let style = document.getElementById('coral-css-directive')
    if (!style) {
      style = document.createElement('style')
      style.id = 'coral-css-directive'
      style.setAttribute('data-coral', 'directive')
      document.head.appendChild(style)
    }
    style.textContent = Array.from(injectedCSS).join('\n')
  }
}

/**
 * v-coral directive
 *
 * Apply CoralCSS classes with automatic CSS injection.
 *
 * @example
 * ```vue
 * <template>
 *   <!-- Static classes -->
 *   <div v-coral="'bg-coral-500 p-4 rounded'">Hello</div>
 *
 *   <!-- Dynamic classes -->
 *   <div v-coral="isActive ? 'bg-coral-500' : 'bg-gray-200'">Dynamic</div>
 *
 *   <!-- Array of classes -->
 *   <div v-coral="['p-4', 'rounded', isActive && 'bg-coral-500']">Array</div>
 * </template>
 * ```
 */
export const vCoral: Directive<HTMLElement, string | string[] | (string | boolean | undefined | null)[]> = {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    applyClasses(el, binding.value)
  },

  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (binding.oldValue !== binding.value) {
      // Remove old classes
      removeClasses(el, binding.oldValue)
      // Apply new classes
      applyClasses(el, binding.value)
    }
  },

  unmounted(el: HTMLElement, binding: DirectiveBinding) {
    removeClasses(el, binding.value)
  },
}

function normalizeClasses(value: string | string[] | (string | boolean | undefined | null)[] | undefined): string[] {
  if (!value) { return [] }

  if (typeof value === 'string') {
    return value.split(/\s+/).filter(Boolean)
  }

  if (Array.isArray(value)) {
    const result: string[] = []
    for (const v of value) {
      if (typeof v === 'string' && v.length > 0) {
        result.push(...v.split(/\s+/).filter(Boolean))
      }
    }
    return result
  }

  return []
}

function applyClasses(el: HTMLElement, value: unknown) {
  const classes = normalizeClasses(value as string | string[])
  if (classes.length === 0) { return }

  const coral = getCoralInstance()
  const css = coral.generate(classes)
  injectCSS(css)

  el.classList.add(...classes)
}

function removeClasses(el: HTMLElement, value: unknown) {
  const classes = normalizeClasses(value as string | string[])
  if (classes.length === 0) { return }

  el.classList.remove(...classes)
}

/**
 * v-coral-hover directive
 *
 * Apply classes on hover with CoralCSS.
 *
 * @example
 * ```vue
 * <template>
 *   <div
 *     v-coral="'bg-white'"
 *     v-coral-hover="'bg-coral-100 shadow-lg'"
 *   >
 *     Hover me
 *   </div>
 * </template>
 * ```
 */
export const vCoralHover: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const classes = normalizeClasses(binding.value)
    if (classes.length === 0) { return }

    // Pre-generate CSS
    const coral = getCoralInstance()
    const css = coral.generate(classes)
    injectCSS(css)

    // Add event listeners
    el.addEventListener('mouseenter', () => {
      el.classList.add(...classes)
    })
    el.addEventListener('mouseleave', () => {
      el.classList.remove(...classes)
    })
  },
}

/**
 * v-coral-focus directive
 *
 * Apply classes on focus with CoralCSS.
 *
 * @example
 * ```vue
 * <template>
 *   <input
 *     v-coral="'border border-gray-300 rounded px-3 py-2'"
 *     v-coral-focus="'border-coral-500 ring-2 ring-coral-500/20'"
 *   />
 * </template>
 * ```
 */
export const vCoralFocus: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const classes = normalizeClasses(binding.value)
    if (classes.length === 0) { return }

    // Pre-generate CSS
    const coral = getCoralInstance()
    const css = coral.generate(classes)
    injectCSS(css)

    // Add event listeners
    el.addEventListener('focus', () => {
      el.classList.add(...classes)
    })
    el.addEventListener('blur', () => {
      el.classList.remove(...classes)
    })
  },
}

/**
 * v-coral-active directive
 *
 * Apply classes when element is active (mousedown).
 *
 * @example
 * ```vue
 * <template>
 *   <button
 *     v-coral="'bg-coral-500 text-white px-4 py-2 rounded'"
 *     v-coral-active="'bg-coral-600 scale-95'"
 *   >
 *     Click me
 *   </button>
 * </template>
 * ```
 */
export const vCoralActive: Directive<HTMLElement, string> = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string>) {
    const classes = normalizeClasses(binding.value)
    if (classes.length === 0) { return }

    // Pre-generate CSS
    const coral = getCoralInstance()
    const css = coral.generate(classes)
    injectCSS(css)

    // Add event listeners
    el.addEventListener('mousedown', () => {
      el.classList.add(...classes)
    })
    el.addEventListener('mouseup', () => {
      el.classList.remove(...classes)
    })
    el.addEventListener('mouseleave', () => {
      el.classList.remove(...classes)
    })
  },
}

export default {
  coral: vCoral,
  coralHover: vCoralHover,
  coralFocus: vCoralFocus,
  coralActive: vCoralActive,
}
