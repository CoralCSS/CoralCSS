/**
 * Pointer-Aware Variants Plugin
 *
 * Media query variants for pointer devices and hover capability.
 * Provides better UX for different input methods (mouse, touch, pen).
 *
 * @module plugins/core/variants/pointer
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Pointer-aware variants plugin for CoralCSS
 *
 * Features:
 * - Pointer coarse/fine (touch vs mouse)
 * - Hover capability detection
 * - Any-pointer/any-hover for device capabilities
 *
 * @example
 * ```html
 * <!-- Touch device (coarse pointer) -->
 * <button class="pointer-coarse:text-lg">
 *   Larger text for touch
 * </button>
 *
 * <!-- Mouse device (fine pointer) -->
 * <button class="pointer-fine:hover:bg-blue-500">
 *   Hover effect for mouse
 * </button>
 *
 * <!-- Only show hover effect on hover-capable devices -->
 * <div class="hover-supported:opacity-100 opacity-50">
 *   Fade in on hover (mouse only)
 * </div>
 * ```
 */
export function pointerVariantsPlugin(): Plugin {
  return {
    name: 'pointer-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // POINTER TYPE VARIANTS
      // ========================================

      // Primary pointer is coarse (touchscreen, finger)
      ctx.addVariant({
        name: 'pointer',
        match: 'pointer-coarse',
        transform: (selector) =>
          `@media (pointer: coarse) { ${selector} }`
      })

      // Primary pointer is fine (mouse, pen)
      ctx.addVariant({
        name: 'pointer',
        match: 'pointer-fine',
        transform: (selector) =>
          `@media (pointer: fine) { ${selector} }`
      })

      // Any pointer is coarse (at least one coarse input)
      ctx.addVariant({
        name: 'any-pointer',
        match: 'coarse',
        transform: (selector) =>
          `@media (any-pointer: coarse) { ${selector} }`
      })

      // Any pointer is fine (at least one fine input)
      ctx.addVariant({
        name: 'any-pointer',
        match: 'fine',
        transform: (selector) =>
          `@media (any-pointer: fine) { ${selector} }`
      })

      // No pointer (no pointing device)
      ctx.addVariant({
        name: 'any-pointer',
        match: 'none',
        transform: (selector) =>
          `@media (any-pointer: none) { ${selector} }`
      })

      // ========================================
      // HOVER CAPABILITY VARIANTS
      // ========================================

      // Primary input can hover (e.g., mouse)
      ctx.addVariant({
        name: 'hover-supported',
        match: 'hover',
        transform: (selector) =>
          `@media (hover: hover) { ${selector}:hover }`
      })

      // Primary input cannot hover (e.g., touch)
      ctx.addVariant({
        name: 'hover-none',
        match: 'hover',
        transform: (selector) =>
          `@media (hover: none) { ${selector}:hover }`
      })

      // Any input can hover
      ctx.addVariant({
        name: 'any-hover',
        match: 'hover',
        transform: (selector) =>
          `@media (any-hover: hover) { ${selector}:hover }`
      })

      // ========================================
      // SHORTCUT ALIASES
      // ========================================

      // Touch-only (coarse pointer + no hover)
      ctx.addVariant({
        name: 'touch',
        match: 'only',
        transform: (selector) =>
          `@media (pointer: coarse) and (hover: none) { ${selector} }`
      })

      // Mouse-only (fine pointer + hover capable)
      ctx.addVariant({
        name: 'mouse',
        match: 'only',
        transform: (selector) =>
          `@media (pointer: fine) and (hover: hover) { ${selector} }`
      })

      // Touch device (has coarse pointer)
      ctx.addVariant({
        name: 'touch',
        match: 'device',
        transform: (selector) =>
          `@media (pointer: coarse) { ${selector} }`
      })

      // ========================================
      // CURSOR VARIANTS
      // ========================================

      // When cursor is available (fine pointer)
      ctx.addVariant({
        name: 'cursor',
        match: 'available',
        transform: (selector) =>
          `@media (pointer: fine) { ${selector} }`
      })

      // When cursor is not available (touch)
      ctx.addVariant({
        name: 'cursor',
        match: 'unavailable',
        transform: (selector) =>
          `@media (pointer: coarse) { ${selector} }`
      })
    }
  }
}

export default pointerVariantsPlugin
