/**
 * Isolation & Blend Mode Utilities Plugin
 *
 * Control element isolation and blend modes for creative effects.
 * Tailwind 4.1 compatible + enhanced features.
 *
 * @module plugins/core/utilities/blending
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Isolation & blend mode utilities plugin
 *
 * @example
 * ```html
 * <div class="isolate">
 *   <div class="mix-blend-multiply">
 *     Blended content
 *   </div>
 * </div>
 *
 * <div class="bg-blend-screen bg-gradient-to-r from-blue-500 to-red-500">
 *   Background blending
 * </div>
 * ```
 */
export function blendingPlugin(): Plugin {
  return {
    name: 'blending',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // ISOLATION
      // ========================================

      ctx.addRule({
        pattern: 'isolate',
        properties: { isolation: 'isolate' },
      })

      ctx.addRule({
        pattern: 'isolation-auto',
        properties: { isolation: 'auto' },
      })

      // ========================================
      // MIX BLEND MODE
      // ========================================

      ctx.addRule({
        pattern: 'mix-blend-normal',
        properties: { 'mix-blend-mode': 'normal' },
      })

      ctx.addRule({
        pattern: 'mix-blend-multiply',
        properties: { 'mix-blend-mode': 'multiply' },
      })

      ctx.addRule({
        pattern: 'mix-blend-screen',
        properties: { 'mix-blend-mode': 'screen' },
      })

      ctx.addRule({
        pattern: 'mix-blend-overlay',
        properties: { 'mix-blend-mode': 'overlay' },
      })

      ctx.addRule({
        pattern: 'mix-blend-darken',
        properties: { 'mix-blend-mode': 'darken' },
      })

      ctx.addRule({
        pattern: 'mix-blend-lighten',
        properties: { 'mix-blend-mode': 'lighten' },
      })

      ctx.addRule({
        pattern: 'mix-blend-color-dodge',
        properties: { 'mix-blend-mode': 'color-dodge' },
      })

      ctx.addRule({
        pattern: 'mix-blend-color-burn',
        properties: { 'mix-blend-mode': 'color-burn' },
      })

      ctx.addRule({
        pattern: 'mix-blend-hard-light',
        properties: { 'mix-blend-mode': 'hard-light' },
      })

      ctx.addRule({
        pattern: 'mix-blend-soft-light',
        properties: { 'mix-blend-mode': 'soft-light' },
      })

      ctx.addRule({
        pattern: 'mix-blend-difference',
        properties: { 'mix-blend-mode': 'difference' },
      })

      ctx.addRule({
        pattern: 'mix-blend-exclusion',
        properties: { 'mix-blend-mode': 'exclusion' },
      })

      ctx.addRule({
        pattern: 'mix-blend-hue',
        properties: { 'mix-blend-mode': 'hue' },
      })

      ctx.addRule({
        pattern: 'mix-blend-saturation',
        properties: { 'mix-blend-mode': 'saturation' },
      })

      ctx.addRule({
        pattern: 'mix-blend-color',
        properties: { 'mix-blend-mode': 'color' },
      })

      ctx.addRule({
        pattern: 'mix-blend-luminosity',
        properties: { 'mix-blend-mode': 'luminosity' },
      })

      // Plus lighter (newer blend mode)
      ctx.addRule({
        pattern: 'mix-blend-plus-lighter',
        properties: { 'mix-blend-mode': 'plus-lighter' },
      })

      // ========================================
      // BACKGROUND BLEND MODE
      // ========================================

      ctx.addRule({
        pattern: 'bg-blend-normal',
        properties: { 'background-blend-mode': 'normal' },
      })

      ctx.addRule({
        pattern: 'bg-blend-multiply',
        properties: { 'background-blend-mode': 'multiply' },
      })

      ctx.addRule({
        pattern: 'bg-blend-screen',
        properties: { 'background-blend-mode': 'screen' },
      })

      ctx.addRule({
        pattern: 'bg-blend-overlay',
        properties: { 'background-blend-mode': 'overlay' },
      })

      ctx.addRule({
        pattern: 'bg-blend-darken',
        properties: { 'background-blend-mode': 'darken' },
      })

      ctx.addRule({
        pattern: 'bg-blend-lighten',
        properties: { 'background-blend-mode': 'lighten' },
      })

      ctx.addRule({
        pattern: 'bg-blend-color-dodge',
        properties: { 'background-blend-mode': 'color-dodge' },
      })

      ctx.addRule({
        pattern: 'bg-blend-color-burn',
        properties: { 'background-blend-mode': 'color-burn' },
      })

      ctx.addRule({
        pattern: 'bg-blend-hard-light',
        properties: { 'background-blend-mode': 'hard-light' },
      })

      ctx.addRule({
        pattern: 'bg-blend-soft-light',
        properties: { 'background-blend-mode': 'soft-light' },
      })

      ctx.addRule({
        pattern: 'bg-blend-difference',
        properties: { 'background-blend-mode': 'difference' },
      })

      ctx.addRule({
        pattern: 'bg-blend-exclusion',
        properties: { 'background-blend-mode': 'exclusion' },
      })

      ctx.addRule({
        pattern: 'bg-blend-hue',
        properties: { 'background-blend-mode': 'hue' },
      })

      ctx.addRule({
        pattern: 'bg-blend-saturation',
        properties: { 'background-blend-mode': 'saturation' },
      })

      ctx.addRule({
        pattern: 'bg-blend-color',
        properties: { 'background-blend-mode': 'color' },
      })

      ctx.addRule({
        pattern: 'bg-blend-luminosity',
        properties: { 'background-blend-mode': 'luminosity' },
      })

      // ========================================
      // COMBINATIONS (Multiple blend modes)
      // ========================================

      ctx.addRule({
        pattern: 'bg-blend-multiply-screen',
        properties: {
          'background-blend-mode': 'multiply, screen',
        },
      })

      ctx.addRule({
        pattern: 'bg-blend-screen-overlay',
        properties: {
          'background-blend-mode': 'screen, overlay',
        },
      })

      ctx.addRule({
        pattern: 'bg-blend-overlay-color',
        properties: {
          'background-blend-mode': 'overlay, color',
        },
      })
    }
  }
}

export default blendingPlugin
