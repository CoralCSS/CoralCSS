/**
 * Layout Utilities Plugin
 *
 * Display, position, visibility, and layout utilities.
 * @module plugins/core/utilities/layout
 */

import type { Plugin, Rule, PluginContext } from '../../../types'
import { inset, zIndex, spacing } from '../../../theme'

/**
 * Layout utilities plugin
 */
export function layoutPlugin(): Plugin {
  return {
    name: 'layout',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // Display
      rules.push({ pattern: 'block', properties: { display: 'block' } })
      rules.push({ pattern: 'inline-block', properties: { display: 'inline-block' } })
      rules.push({ pattern: 'inline', properties: { display: 'inline' } })
      rules.push({ pattern: 'flex', properties: { display: 'flex' } })
      rules.push({ pattern: 'inline-flex', properties: { display: 'inline-flex' } })
      rules.push({ pattern: 'grid', properties: { display: 'grid' } })
      rules.push({ pattern: 'inline-grid', properties: { display: 'inline-grid' } })
      rules.push({ pattern: 'contents', properties: { display: 'contents' } })
      rules.push({ pattern: 'flow-root', properties: { display: 'flow-root' } })
      rules.push({ pattern: 'list-item', properties: { display: 'list-item' } })
      rules.push({ pattern: 'hidden', properties: { display: 'none' } })
      rules.push({ pattern: 'table', properties: { display: 'table' } })
      rules.push({ pattern: 'table-caption', properties: { display: 'table-caption' } })
      rules.push({ pattern: 'table-cell', properties: { display: 'table-cell' } })
      rules.push({ pattern: 'table-column', properties: { display: 'table-column' } })
      rules.push({ pattern: 'table-column-group', properties: { display: 'table-column-group' } })
      rules.push({ pattern: 'table-footer-group', properties: { display: 'table-footer-group' } })
      rules.push({ pattern: 'table-header-group', properties: { display: 'table-header-group' } })
      rules.push({ pattern: 'table-row', properties: { display: 'table-row' } })
      rules.push({ pattern: 'table-row-group', properties: { display: 'table-row-group' } })

      // Position
      rules.push({ pattern: 'static', properties: { position: 'static' } })
      rules.push({ pattern: 'fixed', properties: { position: 'fixed' } })
      rules.push({ pattern: 'absolute', properties: { position: 'absolute' } })
      rules.push({ pattern: 'relative', properties: { position: 'relative' } })
      rules.push({ pattern: 'sticky', properties: { position: 'sticky' } })

      // Inset (top, right, bottom, left)
      for (const [key, value] of Object.entries(inset)) {
        rules.push({ pattern: `inset-${key}`, properties: { inset: value } })
        rules.push({ pattern: `inset-x-${key}`, properties: { left: value, right: value } })
        rules.push({ pattern: `inset-y-${key}`, properties: { top: value, bottom: value } })
        rules.push({ pattern: `top-${key}`, properties: { top: value } })
        rules.push({ pattern: `right-${key}`, properties: { right: value } })
        rules.push({ pattern: `bottom-${key}`, properties: { bottom: value } })
        rules.push({ pattern: `left-${key}`, properties: { left: value } })
        rules.push({ pattern: `start-${key}`, properties: { 'inset-inline-start': value } })
        rules.push({ pattern: `end-${key}`, properties: { 'inset-inline-end': value } })
      }

      // Negative inset
      for (const [key, value] of Object.entries(spacing)) {
        if (key !== '0' && key !== 'px') {
          const negValue = `-${value}`
          rules.push({ pattern: `-inset-${key}`, properties: { inset: negValue } })
          rules.push({ pattern: `-inset-x-${key}`, properties: { left: negValue, right: negValue } })
          rules.push({ pattern: `-inset-y-${key}`, properties: { top: negValue, bottom: negValue } })
          rules.push({ pattern: `-top-${key}`, properties: { top: negValue } })
          rules.push({ pattern: `-right-${key}`, properties: { right: negValue } })
          rules.push({ pattern: `-bottom-${key}`, properties: { bottom: negValue } })
          rules.push({ pattern: `-left-${key}`, properties: { left: negValue } })
        }
      }

      // Z-index
      for (const [key, value] of Object.entries(zIndex)) {
        rules.push({
          pattern: `z-${key}`,
          properties: { 'z-index': value },
        })
      }

      // Negative z-index
      rules.push({ pattern: '-z-10', properties: { 'z-index': '-10' } })
      rules.push({ pattern: '-z-20', properties: { 'z-index': '-20' } })
      rules.push({ pattern: '-z-30', properties: { 'z-index': '-30' } })
      rules.push({ pattern: '-z-40', properties: { 'z-index': '-40' } })
      rules.push({ pattern: '-z-50', properties: { 'z-index': '-50' } })

      // Visibility
      rules.push({ pattern: 'visible', properties: { visibility: 'visible' } })
      rules.push({ pattern: 'invisible', properties: { visibility: 'hidden' } })
      rules.push({ pattern: 'collapse', properties: { visibility: 'collapse' } })

      // Float
      rules.push({ pattern: 'float-start', properties: { float: 'inline-start' } })
      rules.push({ pattern: 'float-end', properties: { float: 'inline-end' } })
      rules.push({ pattern: 'float-right', properties: { float: 'right' } })
      rules.push({ pattern: 'float-left', properties: { float: 'left' } })
      rules.push({ pattern: 'float-none', properties: { float: 'none' } })

      // Clear
      rules.push({ pattern: 'clear-start', properties: { clear: 'inline-start' } })
      rules.push({ pattern: 'clear-end', properties: { clear: 'inline-end' } })
      rules.push({ pattern: 'clear-right', properties: { clear: 'right' } })
      rules.push({ pattern: 'clear-left', properties: { clear: 'left' } })
      rules.push({ pattern: 'clear-both', properties: { clear: 'both' } })
      rules.push({ pattern: 'clear-none', properties: { clear: 'none' } })

      // Isolation
      rules.push({ pattern: 'isolate', properties: { isolation: 'isolate' } })
      rules.push({ pattern: 'isolation-auto', properties: { isolation: 'auto' } })

      // Object fit
      rules.push({ pattern: 'object-contain', properties: { 'object-fit': 'contain' } })
      rules.push({ pattern: 'object-cover', properties: { 'object-fit': 'cover' } })
      rules.push({ pattern: 'object-fill', properties: { 'object-fit': 'fill' } })
      rules.push({ pattern: 'object-none', properties: { 'object-fit': 'none' } })
      rules.push({ pattern: 'object-scale-down', properties: { 'object-fit': 'scale-down' } })

      // Object position
      rules.push({ pattern: 'object-bottom', properties: { 'object-position': 'bottom' } })
      rules.push({ pattern: 'object-center', properties: { 'object-position': 'center' } })
      rules.push({ pattern: 'object-left', properties: { 'object-position': 'left' } })
      rules.push({ pattern: 'object-left-bottom', properties: { 'object-position': 'left bottom' } })
      rules.push({ pattern: 'object-left-top', properties: { 'object-position': 'left top' } })
      rules.push({ pattern: 'object-right', properties: { 'object-position': 'right' } })
      rules.push({ pattern: 'object-right-bottom', properties: { 'object-position': 'right bottom' } })
      rules.push({ pattern: 'object-right-top', properties: { 'object-position': 'right top' } })
      rules.push({ pattern: 'object-top', properties: { 'object-position': 'top' } })

      // Overflow
      rules.push({ pattern: 'overflow-auto', properties: { overflow: 'auto' } })
      rules.push({ pattern: 'overflow-hidden', properties: { overflow: 'hidden' } })
      rules.push({ pattern: 'overflow-clip', properties: { overflow: 'clip' } })
      rules.push({ pattern: 'overflow-visible', properties: { overflow: 'visible' } })
      rules.push({ pattern: 'overflow-scroll', properties: { overflow: 'scroll' } })
      rules.push({ pattern: 'overflow-x-auto', properties: { 'overflow-x': 'auto' } })
      rules.push({ pattern: 'overflow-y-auto', properties: { 'overflow-y': 'auto' } })
      rules.push({ pattern: 'overflow-x-hidden', properties: { 'overflow-x': 'hidden' } })
      rules.push({ pattern: 'overflow-y-hidden', properties: { 'overflow-y': 'hidden' } })
      rules.push({ pattern: 'overflow-x-clip', properties: { 'overflow-x': 'clip' } })
      rules.push({ pattern: 'overflow-y-clip', properties: { 'overflow-y': 'clip' } })
      rules.push({ pattern: 'overflow-x-visible', properties: { 'overflow-x': 'visible' } })
      rules.push({ pattern: 'overflow-y-visible', properties: { 'overflow-y': 'visible' } })
      rules.push({ pattern: 'overflow-x-scroll', properties: { 'overflow-x': 'scroll' } })
      rules.push({ pattern: 'overflow-y-scroll', properties: { 'overflow-y': 'scroll' } })

      // Overscroll
      rules.push({ pattern: 'overscroll-auto', properties: { 'overscroll-behavior': 'auto' } })
      rules.push({ pattern: 'overscroll-contain', properties: { 'overscroll-behavior': 'contain' } })
      rules.push({ pattern: 'overscroll-none', properties: { 'overscroll-behavior': 'none' } })
      rules.push({ pattern: 'overscroll-x-auto', properties: { 'overscroll-behavior-x': 'auto' } })
      rules.push({ pattern: 'overscroll-x-contain', properties: { 'overscroll-behavior-x': 'contain' } })
      rules.push({ pattern: 'overscroll-x-none', properties: { 'overscroll-behavior-x': 'none' } })
      rules.push({ pattern: 'overscroll-y-auto', properties: { 'overscroll-behavior-y': 'auto' } })
      rules.push({ pattern: 'overscroll-y-contain', properties: { 'overscroll-behavior-y': 'contain' } })
      rules.push({ pattern: 'overscroll-y-none', properties: { 'overscroll-behavior-y': 'none' } })

      // Box sizing
      rules.push({ pattern: 'box-border', properties: { 'box-sizing': 'border-box' } })
      rules.push({ pattern: 'box-content', properties: { 'box-sizing': 'content-box' } })

      // Container
      rules.push({
        pattern: 'container',
        properties: {
          width: '100%',
          'margin-left': 'auto',
          'margin-right': 'auto',
        },
      })

      // Aspect ratio
      rules.push({ pattern: 'aspect-auto', properties: { 'aspect-ratio': 'auto' } })
      rules.push({ pattern: 'aspect-square', properties: { 'aspect-ratio': '1 / 1' } })
      rules.push({ pattern: 'aspect-video', properties: { 'aspect-ratio': '16 / 9' } })

      // Columns
      for (let i = 1; i <= 12; i++) {
        rules.push({
          pattern: `columns-${i}`,
          properties: { columns: String(i) },
        })
      }
      rules.push({ pattern: 'columns-auto', properties: { columns: 'auto' } })
      rules.push({ pattern: 'columns-3xs', properties: { columns: '16rem' } })
      rules.push({ pattern: 'columns-2xs', properties: { columns: '18rem' } })
      rules.push({ pattern: 'columns-xs', properties: { columns: '20rem' } })
      rules.push({ pattern: 'columns-sm', properties: { columns: '24rem' } })
      rules.push({ pattern: 'columns-md', properties: { columns: '28rem' } })
      rules.push({ pattern: 'columns-lg', properties: { columns: '32rem' } })
      rules.push({ pattern: 'columns-xl', properties: { columns: '36rem' } })
      rules.push({ pattern: 'columns-2xl', properties: { columns: '42rem' } })
      rules.push({ pattern: 'columns-3xl', properties: { columns: '48rem' } })
      rules.push({ pattern: 'columns-4xl', properties: { columns: '56rem' } })
      rules.push({ pattern: 'columns-5xl', properties: { columns: '64rem' } })
      rules.push({ pattern: 'columns-6xl', properties: { columns: '72rem' } })
      rules.push({ pattern: 'columns-7xl', properties: { columns: '80rem' } })

      // Break after/before/inside
      rules.push({ pattern: 'break-after-auto', properties: { 'break-after': 'auto' } })
      rules.push({ pattern: 'break-after-avoid', properties: { 'break-after': 'avoid' } })
      rules.push({ pattern: 'break-after-all', properties: { 'break-after': 'all' } })
      rules.push({ pattern: 'break-after-avoid-page', properties: { 'break-after': 'avoid-page' } })
      rules.push({ pattern: 'break-after-page', properties: { 'break-after': 'page' } })
      rules.push({ pattern: 'break-after-left', properties: { 'break-after': 'left' } })
      rules.push({ pattern: 'break-after-right', properties: { 'break-after': 'right' } })
      rules.push({ pattern: 'break-after-column', properties: { 'break-after': 'column' } })
      rules.push({ pattern: 'break-before-auto', properties: { 'break-before': 'auto' } })
      rules.push({ pattern: 'break-before-avoid', properties: { 'break-before': 'avoid' } })
      rules.push({ pattern: 'break-before-all', properties: { 'break-before': 'all' } })
      rules.push({ pattern: 'break-before-avoid-page', properties: { 'break-before': 'avoid-page' } })
      rules.push({ pattern: 'break-before-page', properties: { 'break-before': 'page' } })
      rules.push({ pattern: 'break-before-left', properties: { 'break-before': 'left' } })
      rules.push({ pattern: 'break-before-right', properties: { 'break-before': 'right' } })
      rules.push({ pattern: 'break-before-column', properties: { 'break-before': 'column' } })
      rules.push({ pattern: 'break-inside-auto', properties: { 'break-inside': 'auto' } })
      rules.push({ pattern: 'break-inside-avoid', properties: { 'break-inside': 'avoid' } })
      rules.push({ pattern: 'break-inside-avoid-page', properties: { 'break-inside': 'avoid-page' } })
      rules.push({ pattern: 'break-inside-avoid-column', properties: { 'break-inside': 'avoid-column' } })

      // Box decoration break
      rules.push({ pattern: 'box-decoration-clone', properties: { 'box-decoration-break': 'clone' } })
      rules.push({ pattern: 'box-decoration-slice', properties: { 'box-decoration-break': 'slice' } })

      // Arbitrary values
      rules.push({
        pattern: /^inset-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { inset: v } } },
      })
      rules.push({
        pattern: /^top-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { top: v } } },
      })
      rules.push({
        pattern: /^right-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { right: v } } },
      })
      rules.push({
        pattern: /^bottom-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { bottom: v } } },
      })
      rules.push({
        pattern: /^left-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { left: v } } },
      })
      rules.push({
        pattern: /^z-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'z-index': v } } },
      })
      rules.push({
        pattern: /^aspect-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { 'aspect-ratio': v.replace('/', ' / ') } } },
      })
      rules.push({
        pattern: /^columns-\[(.+)\]$/,
        handler: (match) => { const v = match[1]; if (!v) return null; return { properties: { columns: v } } },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default layoutPlugin
