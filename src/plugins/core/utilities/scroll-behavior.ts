/**
 * Scroll Behavior & Overscroll Utilities Plugin
 *
 * Control scrolling behavior and overscroll/elastic scrolling effects.
 *
 * @module plugins/core/utilities/scroll-behavior
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Scroll behavior utilities plugin
 *
 * @example
 * ```html
 * <html class="scroll-smooth">
 *
 * <div class="overscroll-contain">
 *   Prevent rubber-band effect
 * </div>
 * ```
 */
export function scrollBehaviorPlugin(): Plugin {
  return {
    name: 'scroll-behavior',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // SCROLL BEHAVIOR
      // ========================================

      ctx.addRule({
        pattern: 'scroll-auto',
        properties: { 'scroll-behavior': 'auto' },
      })

      ctx.addRule({
        pattern: 'scroll-smooth',
        properties: { 'scroll-behavior': 'smooth' },
      })

      // ========================================
      // OVERSCROLL BEHAVIOR
      // ========================================

      // Overscroll behavior (rubber-band effect control)
      ctx.addRule({
        pattern: 'overscroll-auto',
        properties: { 'overscroll-behavior': 'auto' },
      })

      ctx.addRule({
        pattern: 'overscroll-contain',
        properties: { 'overscroll-behavior': 'contain' },
      })

      ctx.addRule({
        pattern: 'overscroll-none',
        properties: { 'overscroll-behavior': 'none' },
      })

      // Overscroll behavior X
      ctx.addRule({
        pattern: 'overscroll-x-auto',
        properties: { 'overscroll-behavior-x': 'auto' },
      })

      ctx.addRule({
        pattern: 'overscroll-x-contain',
        properties: { 'overscroll-behavior-x': 'contain' },
      })

      ctx.addRule({
        pattern: 'overscroll-x-none',
        properties: { 'overscroll-behavior-x': 'none' },
      })

      // Overscroll behavior Y
      ctx.addRule({
        pattern: 'overscroll-y-auto',
        properties: { 'overscroll-behavior-y': 'auto' },
      })

      ctx.addRule({
        pattern: 'overscroll-y-contain',
        properties: { 'overscroll-behavior-y': 'contain' },
      })

      ctx.addRule({
        pattern: 'overscroll-y-none',
        properties: { 'overscroll-behavior-y': 'none' },
      })

      // ========================================
      // WEBKIT OVERSCROLL (iOS)
      // ========================================

      ctx.addRule({
        pattern: '-webkit-overflow-scrolling',
        properties: { '-webkit-overflow-scrolling': 'touch' },
      })

      ctx.addRule({
        pattern: '-webkit-overflow-scrolling-auto',
        properties: { '-webkit-overflow-scrolling': 'auto' },
      })
    }
  }
}

export default scrollBehaviorPlugin
