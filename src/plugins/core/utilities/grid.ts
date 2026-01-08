/**
 * Grid Utilities Plugin
 *
 * CSS Grid layout utilities.
 * @module plugins/core/utilities/grid
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Grid utilities plugin
 */
export function gridPlugin(): Plugin {
  return {
    name: 'grid',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Grid template columns
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `grid-cols-${i}`,
          properties: { 'grid-template-columns': `repeat(${i}, minmax(0, 1fr))` },
        })
      }
      rules.push({ pattern: 'grid-cols-none', properties: { 'grid-template-columns': 'none' } })
      rules.push({ pattern: 'grid-cols-subgrid', properties: { 'grid-template-columns': 'subgrid' } })

      // Grid template rows
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `grid-rows-${i}`,
          properties: { 'grid-template-rows': `repeat(${i}, minmax(0, 1fr))` },
        })
      }
      rules.push({ pattern: 'grid-rows-none', properties: { 'grid-template-rows': 'none' } })
      rules.push({ pattern: 'grid-rows-subgrid', properties: { 'grid-template-rows': 'subgrid' } })

      // Grid column span
      rules.push({ pattern: 'col-auto', properties: { 'grid-column': 'auto' } })
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `col-span-${i}`,
          properties: { 'grid-column': `span ${i} / span ${i}` },
        })
      }
      rules.push({ pattern: 'col-span-full', properties: { 'grid-column': '1 / -1' } })

      // Grid column start
      rules.push({ pattern: 'col-start-auto', properties: { 'grid-column-start': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `col-start-${i}`,
          properties: { 'grid-column-start': String(i) },
        })
      }

      // Grid column end
      rules.push({ pattern: 'col-end-auto', properties: { 'grid-column-end': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `col-end-${i}`,
          properties: { 'grid-column-end': String(i) },
        })
      }

      // Grid row span
      rules.push({ pattern: 'row-auto', properties: { 'grid-row': 'auto' } })
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `row-span-${i}`,
          properties: { 'grid-row': `span ${i} / span ${i}` },
        })
      }
      rules.push({ pattern: 'row-span-full', properties: { 'grid-row': '1 / -1' } })

      // Grid row start
      rules.push({ pattern: 'row-start-auto', properties: { 'grid-row-start': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `row-start-${i}`,
          properties: { 'grid-row-start': String(i) },
        })
      }

      // Grid row end
      rules.push({ pattern: 'row-end-auto', properties: { 'grid-row-end': 'auto' } })
      for (let i = 1; i <= 13; i++) {
        rules.push({
          pattern: `row-end-${i}`,
          properties: { 'grid-row-end': String(i) },
        })
      }

      // Grid auto flow
      rules.push({ pattern: 'grid-flow-row', properties: { 'grid-auto-flow': 'row' } })
      rules.push({ pattern: 'grid-flow-col', properties: { 'grid-auto-flow': 'column' } })
      rules.push({ pattern: 'grid-flow-dense', properties: { 'grid-auto-flow': 'dense' } })
      rules.push({ pattern: 'grid-flow-row-dense', properties: { 'grid-auto-flow': 'row dense' } })
      rules.push({ pattern: 'grid-flow-col-dense', properties: { 'grid-auto-flow': 'column dense' } })

      // Grid auto columns
      rules.push({ pattern: 'auto-cols-auto', properties: { 'grid-auto-columns': 'auto' } })
      rules.push({ pattern: 'auto-cols-min', properties: { 'grid-auto-columns': 'min-content' } })
      rules.push({ pattern: 'auto-cols-max', properties: { 'grid-auto-columns': 'max-content' } })
      rules.push({ pattern: 'auto-cols-fr', properties: { 'grid-auto-columns': 'minmax(0, 1fr)' } })

      // Grid auto rows
      rules.push({ pattern: 'auto-rows-auto', properties: { 'grid-auto-rows': 'auto' } })
      rules.push({ pattern: 'auto-rows-min', properties: { 'grid-auto-rows': 'min-content' } })
      rules.push({ pattern: 'auto-rows-max', properties: { 'grid-auto-rows': 'max-content' } })
      rules.push({ pattern: 'auto-rows-fr', properties: { 'grid-auto-rows': 'minmax(0, 1fr)' } })

      // Arbitrary values
      rules.push({
        pattern: /^grid-cols-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-template-columns': v } } },
      })
      rules.push({
        pattern: /^grid-rows-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-template-rows': v } } },
      })
      rules.push({
        pattern: /^col-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column': v } } },
      })
      rules.push({
        pattern: /^col-start-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column-start': v } } },
      })
      rules.push({
        pattern: /^col-end-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-column-end': v } } },
      })
      rules.push({
        pattern: /^row-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row': v } } },
      })
      rules.push({
        pattern: /^row-start-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row-start': v } } },
      })
      rules.push({
        pattern: /^row-end-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-row-end': v } } },
      })
      rules.push({
        pattern: /^auto-cols-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-auto-columns': v } } },
      })
      rules.push({
        pattern: /^auto-rows-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'grid-auto-rows': v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default gridPlugin
