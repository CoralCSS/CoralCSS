/**
 * CoralCSS Svelte Actions
 *
 * Svelte actions for applying CoralCSS classes.
 * @module svelte/actions
 */

import type { Action } from 'svelte/action'
import { coralStore } from './store'

/**
 * Parameters for coral action
 */
type CoralActionParams = string | string[] | undefined

/**
 * Coral action - apply and inject CSS classes
 *
 * @example
 * ```svelte
 * <script>
 *   import { coral } from '@coral-css/core/svelte'
 * </script>
 *
 * <div use:coral={'bg-coral-500 p-4 rounded'}>
 *   Hello World
 * </div>
 *
 * <div use:coral={['bg-coral-500', 'p-4', isActive && 'ring-2']}>
 *   Dynamic classes
 * </div>
 * ```
 */
export const coral: Action<HTMLElement, CoralActionParams> = (node, params) => {
  const applyClasses = (value: CoralActionParams) => {
    if (!value) { return }

    const classes = normalizeClasses(value)
    if (classes.length === 0) { return }

    // Process and inject CSS
    coralStore.process(classes)

    // Apply classes to element
    node.classList.add(...classes)
  }

  const removeClasses = (value: CoralActionParams) => {
    if (!value) { return }

    const classes = normalizeClasses(value)
    node.classList.remove(...classes)
  }

  // Initial application
  applyClasses(params)

  return {
    update(newParams: CoralActionParams) {
      removeClasses(params)
      applyClasses(newParams)
      params = newParams
    },
    destroy() {
      removeClasses(params)
    },
  }
}

/**
 * Coral hover action - apply classes on hover
 *
 * @example
 * ```svelte
 * <script>
 *   import { coral, coralHover } from '@coral-css/core/svelte'
 * </script>
 *
 * <button
 *   use:coral={'bg-coral-500 text-white px-4 py-2 rounded'}
 *   use:coralHover={'bg-coral-600 shadow-lg'}
 * >
 *   Hover me
 * </button>
 * ```
 */
export const coralHover: Action<HTMLElement, string | undefined> = (node, params) => {
  if (!params) { return }

  const classes = normalizeClasses(params)
  if (classes.length === 0) { return }

  // Pre-generate CSS
  coralStore.process(classes)

  const handleEnter = () => {
    node.classList.add(...classes)
  }

  const handleLeave = () => {
    node.classList.remove(...classes)
  }

  node.addEventListener('mouseenter', handleEnter)
  node.addEventListener('mouseleave', handleLeave)

  return {
    update(newParams: string | undefined) {
      node.classList.remove(...classes)
      if (newParams) {
        const newClasses = normalizeClasses(newParams)
        coralStore.process(newClasses)
        classes.length = 0
        classes.push(...newClasses)
      }
    },
    destroy() {
      node.removeEventListener('mouseenter', handleEnter)
      node.removeEventListener('mouseleave', handleLeave)
    },
  }
}

/**
 * Coral focus action - apply classes on focus
 *
 * @example
 * ```svelte
 * <script>
 *   import { coral, coralFocus } from '@coral-css/core/svelte'
 * </script>
 *
 * <input
 *   use:coral={'border border-gray-300 px-3 py-2 rounded'}
 *   use:coralFocus={'border-coral-500 ring-2 ring-coral-500/20'}
 * />
 * ```
 */
export const coralFocus: Action<HTMLElement, string | undefined> = (node, params) => {
  if (!params) { return }

  const classes = normalizeClasses(params)
  if (classes.length === 0) { return }

  // Pre-generate CSS
  coralStore.process(classes)

  const handleFocus = () => {
    node.classList.add(...classes)
  }

  const handleBlur = () => {
    node.classList.remove(...classes)
  }

  node.addEventListener('focus', handleFocus)
  node.addEventListener('blur', handleBlur)

  return {
    update(newParams: string | undefined) {
      node.classList.remove(...classes)
      if (newParams) {
        const newClasses = normalizeClasses(newParams)
        coralStore.process(newClasses)
        classes.length = 0
        classes.push(...newClasses)
      }
    },
    destroy() {
      node.removeEventListener('focus', handleFocus)
      node.removeEventListener('blur', handleBlur)
    },
  }
}

/**
 * Coral active action - apply classes when pressed
 *
 * @example
 * ```svelte
 * <script>
 *   import { coral, coralActive } from '@coral-css/core/svelte'
 * </script>
 *
 * <button
 *   use:coral={'bg-coral-500 text-white px-4 py-2 rounded transition-transform'}
 *   use:coralActive={'scale-95 bg-coral-600'}
 * >
 *   Press me
 * </button>
 * ```
 */
export const coralActive: Action<HTMLElement, string | undefined> = (node, params) => {
  if (!params) { return }

  const classes = normalizeClasses(params)
  if (classes.length === 0) { return }

  // Pre-generate CSS
  coralStore.process(classes)

  const handleDown = () => {
    node.classList.add(...classes)
  }

  const handleUp = () => {
    node.classList.remove(...classes)
  }

  node.addEventListener('mousedown', handleDown)
  node.addEventListener('mouseup', handleUp)
  node.addEventListener('mouseleave', handleUp)

  return {
    update(newParams: string | undefined) {
      node.classList.remove(...classes)
      if (newParams) {
        const newClasses = normalizeClasses(newParams)
        coralStore.process(newClasses)
        classes.length = 0
        classes.push(...newClasses)
      }
    },
    destroy() {
      node.removeEventListener('mousedown', handleDown)
      node.removeEventListener('mouseup', handleUp)
      node.removeEventListener('mouseleave', handleUp)
    },
  }
}

/**
 * Normalize class input to array
 */
function normalizeClasses(value: string | string[] | undefined): string[] {
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
