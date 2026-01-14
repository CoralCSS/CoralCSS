/**
 * Interactive Utilities Plugin
 *
 * Advanced cursor, selection, touch, and interaction utilities.
 * These go beyond Tailwind's basic interactivity utilities.
 *
 * @module plugins/core/utilities/interactive
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Theme colors for selection and caret
 */
const themeColors: Record<string, string> = {
  'primary': 'var(--coral-primary, #ff6b6b)',
  'secondary': 'var(--coral-secondary, #4ecdc4)',
  'accent': 'var(--coral-accent, #feca57)',
  'success': 'var(--coral-success, #10b981)',
  'warning': 'var(--coral-warning, #f59e0b)',
  'error': 'var(--coral-error, #ef4444)',
  'info': 'var(--coral-info, #3b82f6)',
}

/**
 * Standard colors
 */
const standardColors: Record<string, string> = {
  'inherit': 'inherit',
  'current': 'currentColor',
  'transparent': 'transparent',
  'black': '#000000',
  'white': '#ffffff',
  // Slate
  'slate-50': '#f8fafc',
  'slate-100': '#f1f5f9',
  'slate-200': '#e2e8f0',
  'slate-300': '#cbd5e1',
  'slate-400': '#94a3b8',
  'slate-500': '#64748b',
  'slate-600': '#475569',
  'slate-700': '#334155',
  'slate-800': '#1e293b',
  'slate-900': '#0f172a',
  'slate-950': '#020617',
  // Gray
  'gray-50': '#f9fafb',
  'gray-100': '#f3f4f6',
  'gray-200': '#e5e7eb',
  'gray-300': '#d1d5db',
  'gray-400': '#9ca3af',
  'gray-500': '#6b7280',
  'gray-600': '#4b5563',
  'gray-700': '#374151',
  'gray-800': '#1f2937',
  'gray-900': '#111827',
  'gray-950': '#030712',
  // Red
  'red-50': '#fef2f2',
  'red-100': '#fee2e2',
  'red-200': '#fecaca',
  'red-300': '#fca5a5',
  'red-400': '#f87171',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'red-700': '#b91c1c',
  'red-800': '#991b1b',
  'red-900': '#7f1d1d',
  'red-950': '#450a0a',
  // Blue
  'blue-50': '#eff6ff',
  'blue-100': '#dbeafe',
  'blue-200': '#bfdbfe',
  'blue-300': '#93c5fd',
  'blue-400': '#60a5fa',
  'blue-500': '#3b82f6',
  'blue-600': '#2563eb',
  'blue-700': '#1d4ed8',
  'blue-800': '#1e40af',
  'blue-900': '#1e3a8a',
  'blue-950': '#172554',
  // Green
  'green-50': '#f0fdf4',
  'green-100': '#dcfce7',
  'green-200': '#bbf7d0',
  'green-300': '#86efac',
  'green-400': '#4ade80',
  'green-500': '#22c55e',
  'green-600': '#16a34a',
  'green-700': '#15803d',
  'green-800': '#166534',
  'green-900': '#14532d',
  'green-950': '#052e16',
  // Purple
  'purple-50': '#faf5ff',
  'purple-100': '#f3e8ff',
  'purple-200': '#e9d5ff',
  'purple-300': '#d8b4fe',
  'purple-400': '#c084fc',
  'purple-500': '#a855f7',
  'purple-600': '#9333ea',
  'purple-700': '#7e22ce',
  'purple-800': '#6b21a8',
  'purple-900': '#581c87',
  'purple-950': '#3b0764',
  // Pink
  'pink-50': '#fdf2f8',
  'pink-100': '#fce7f3',
  'pink-200': '#fbcfe8',
  'pink-300': '#f9a8d4',
  'pink-400': '#f472b6',
  'pink-500': '#ec4899',
  'pink-600': '#db2777',
  'pink-700': '#be185d',
  'pink-800': '#9d174d',
  'pink-900': '#831843',
  'pink-950': '#500724',
  // Orange
  'orange-50': '#fff7ed',
  'orange-100': '#ffedd5',
  'orange-200': '#fed7aa',
  'orange-300': '#fdba74',
  'orange-400': '#fb923c',
  'orange-500': '#f97316',
  'orange-600': '#ea580c',
  'orange-700': '#c2410c',
  'orange-800': '#9a3412',
  'orange-900': '#7c2d12',
  'orange-950': '#431407',
  // Yellow
  'yellow-50': '#fefce8',
  'yellow-100': '#fef9c3',
  'yellow-200': '#fef08a',
  'yellow-300': '#fde047',
  'yellow-400': '#facc15',
  'yellow-500': '#eab308',
  'yellow-600': '#ca8a04',
  'yellow-700': '#a16207',
  'yellow-800': '#854d0e',
  'yellow-900': '#713f12',
  'yellow-950': '#422006',
  // Cyan
  'cyan-50': '#ecfeff',
  'cyan-100': '#cffafe',
  'cyan-200': '#a5f3fc',
  'cyan-300': '#67e8f9',
  'cyan-400': '#22d3ee',
  'cyan-500': '#06b6d4',
  'cyan-600': '#0891b2',
  'cyan-700': '#0e7490',
  'cyan-800': '#155e75',
  'cyan-900': '#164e63',
  'cyan-950': '#083344',
}

// Merge all colors
const allColors = { ...themeColors, ...standardColors }

/**
 * Interactive Utilities Plugin
 */
export function interactiveUtilitiesPlugin(): Plugin {
  return {
    name: 'interactive-utilities',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // CURSOR ENHANCEMENTS
      // ========================================

      // Extended cursor types
      const cursorTypes: Record<string, string> = {
        'auto': 'auto',
        'default': 'default',
        'pointer': 'pointer',
        'wait': 'wait',
        'text': 'text',
        'move': 'move',
        'help': 'help',
        'not-allowed': 'not-allowed',
        'none': 'none',
        'context-menu': 'context-menu',
        'progress': 'progress',
        'cell': 'cell',
        'crosshair': 'crosshair',
        'vertical-text': 'vertical-text',
        'alias': 'alias',
        'copy': 'copy',
        'no-drop': 'no-drop',
        'grab': 'grab',
        'grabbing': 'grabbing',
        'all-scroll': 'all-scroll',
        'col-resize': 'col-resize',
        'row-resize': 'row-resize',
        'n-resize': 'n-resize',
        's-resize': 's-resize',
        'e-resize': 'e-resize',
        'w-resize': 'w-resize',
        'ne-resize': 'ne-resize',
        'nw-resize': 'nw-resize',
        'se-resize': 'se-resize',
        'sw-resize': 'sw-resize',
        'ew-resize': 'ew-resize',
        'ns-resize': 'ns-resize',
        'nesw-resize': 'nesw-resize',
        'nwse-resize': 'nwse-resize',
        'zoom-in': 'zoom-in',
        'zoom-out': 'zoom-out',
      }

      for (const [key, value] of Object.entries(cursorTypes)) {
        rules.push({
          pattern: `cursor-${key}`,
          properties: { cursor: value },
        })
      }

      // Custom cursor URL support
      rules.push({
        pattern: /^cursor-\[url\(([^)]+)\)\]$/,
        handler: (match) => {
          const url = match[1]
          if (!url) {return null}
          return { properties: { cursor: `url(${url}), auto` } }
        },
      })

      // ========================================
      // SELECTION UTILITIES
      // ========================================

      // Selection colors (::selection pseudo-element)
      for (const [key, value] of Object.entries(allColors)) {
        rules.push({
          pattern: `selection-${key}`,
          selector: (s) => `${s}::selection`,
          properties: { 'background-color': value },
        })
        rules.push({
          pattern: `selection-text-${key}`,
          selector: (s) => `${s}::selection`,
          properties: { color: value },
        })
      }

      // Selection none (no text selection)
      rules.push({
        pattern: 'select-none',
        properties: {
          '-webkit-user-select': 'none',
          'user-select': 'none',
        },
      })
      rules.push({
        pattern: 'select-text',
        properties: {
          '-webkit-user-select': 'text',
          'user-select': 'text',
        },
      })
      rules.push({
        pattern: 'select-all',
        properties: {
          '-webkit-user-select': 'all',
          'user-select': 'all',
        },
      })
      rules.push({
        pattern: 'select-auto',
        properties: {
          '-webkit-user-select': 'auto',
          'user-select': 'auto',
        },
      })
      rules.push({
        pattern: 'select-contain',
        properties: {
          '-webkit-user-select': 'contain',
          'user-select': 'contain',
        },
      })

      // ========================================
      // CARET COLOR
      // ========================================

      for (const [key, value] of Object.entries(allColors)) {
        rules.push({
          pattern: `caret-${key}`,
          properties: { 'caret-color': value },
        })
      }

      // Arbitrary caret color
      rules.push({
        pattern: /^caret-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'caret-color': v } }
        },
      })

      // ========================================
      // ACCENT COLOR
      // ========================================

      for (const [key, value] of Object.entries(allColors)) {
        rules.push({
          pattern: `accent-${key}`,
          properties: { 'accent-color': value },
        })
      }

      // Arbitrary accent color
      rules.push({
        pattern: /^accent-\[(.+)\]$/,
        handler: (match) => {
          const v = match[1]
          if (!v) {return null}
          return { properties: { 'accent-color': v } }
        },
      })

      // Auto accent (browser default)
      rules.push({
        pattern: 'accent-auto',
        properties: { 'accent-color': 'auto' },
      })

      // ========================================
      // TOUCH ACTION
      // ========================================

      const touchActions: Record<string, string> = {
        'auto': 'auto',
        'none': 'none',
        'pan-x': 'pan-x',
        'pan-left': 'pan-left',
        'pan-right': 'pan-right',
        'pan-y': 'pan-y',
        'pan-up': 'pan-up',
        'pan-down': 'pan-down',
        'pinch-zoom': 'pinch-zoom',
        'manipulation': 'manipulation',
      }

      for (const [key, value] of Object.entries(touchActions)) {
        rules.push({
          pattern: `touch-${key}`,
          properties: { 'touch-action': value },
        })
      }

      // Combined touch actions
      rules.push({
        pattern: 'touch-pan-x-pan-y',
        properties: { 'touch-action': 'pan-x pan-y' },
      })
      rules.push({
        pattern: 'touch-pan-x-pinch-zoom',
        properties: { 'touch-action': 'pan-x pinch-zoom' },
      })
      rules.push({
        pattern: 'touch-pan-y-pinch-zoom',
        properties: { 'touch-action': 'pan-y pinch-zoom' },
      })

      // ========================================
      // POINTER EVENTS
      // ========================================

      rules.push({ pattern: 'pointer-events-none', properties: { 'pointer-events': 'none' } })
      rules.push({ pattern: 'pointer-events-auto', properties: { 'pointer-events': 'auto' } })
      rules.push({ pattern: 'pointer-events-all', properties: { 'pointer-events': 'all' } })
      rules.push({ pattern: 'pointer-events-visible', properties: { 'pointer-events': 'visible' } })
      rules.push({ pattern: 'pointer-events-painted', properties: { 'pointer-events': 'painted' } })
      rules.push({ pattern: 'pointer-events-fill', properties: { 'pointer-events': 'fill' } })
      rules.push({ pattern: 'pointer-events-stroke', properties: { 'pointer-events': 'stroke' } })

      // ========================================
      // SCROLL BEHAVIOR
      // ========================================

      rules.push({ pattern: 'scroll-smooth', properties: { 'scroll-behavior': 'smooth' } })
      rules.push({ pattern: 'scroll-auto', properties: { 'scroll-behavior': 'auto' } })

      // ========================================
      // OVERSCROLL BEHAVIOR
      // ========================================

      rules.push({ pattern: 'overscroll-auto', properties: { 'overscroll-behavior': 'auto' } })
      rules.push({ pattern: 'overscroll-contain', properties: { 'overscroll-behavior': 'contain' } })
      rules.push({ pattern: 'overscroll-none', properties: { 'overscroll-behavior': 'none' } })
      rules.push({ pattern: 'overscroll-x-auto', properties: { 'overscroll-behavior-x': 'auto' } })
      rules.push({ pattern: 'overscroll-x-contain', properties: { 'overscroll-behavior-x': 'contain' } })
      rules.push({ pattern: 'overscroll-x-none', properties: { 'overscroll-behavior-x': 'none' } })
      rules.push({ pattern: 'overscroll-y-auto', properties: { 'overscroll-behavior-y': 'auto' } })
      rules.push({ pattern: 'overscroll-y-contain', properties: { 'overscroll-behavior-y': 'contain' } })
      rules.push({ pattern: 'overscroll-y-none', properties: { 'overscroll-behavior-y': 'none' } })

      // ========================================
      // WILL-CHANGE (Performance hints)
      // ========================================

      rules.push({ pattern: 'will-change-auto', properties: { 'will-change': 'auto' } })
      rules.push({ pattern: 'will-change-scroll', properties: { 'will-change': 'scroll-position' } })
      rules.push({ pattern: 'will-change-contents', properties: { 'will-change': 'contents' } })
      rules.push({ pattern: 'will-change-transform', properties: { 'will-change': 'transform' } })
      rules.push({ pattern: 'will-change-opacity', properties: { 'will-change': 'opacity' } })

      // ========================================
      // CONTAIN (CSS Containment)
      // ========================================

      rules.push({ pattern: 'contain-none', properties: { contain: 'none' } })
      rules.push({ pattern: 'contain-strict', properties: { contain: 'strict' } })
      rules.push({ pattern: 'contain-content', properties: { contain: 'content' } })
      rules.push({ pattern: 'contain-size', properties: { contain: 'size' } })
      rules.push({ pattern: 'contain-layout', properties: { contain: 'layout' } })
      rules.push({ pattern: 'contain-style', properties: { contain: 'style' } })
      rules.push({ pattern: 'contain-paint', properties: { contain: 'paint' } })
      rules.push({ pattern: 'contain-inline-size', properties: { contain: 'inline-size' } })

      // Combined containment
      rules.push({ pattern: 'contain-layout-paint', properties: { contain: 'layout paint' } })
      rules.push({ pattern: 'contain-size-layout', properties: { contain: 'size layout' } })
      rules.push({ pattern: 'contain-size-layout-paint', properties: { contain: 'size layout paint' } })

      // ========================================
      // CONTENT VISIBILITY (Performance)
      // ========================================

      rules.push({ pattern: 'content-visibility-visible', properties: { 'content-visibility': 'visible' } })
      rules.push({ pattern: 'content-visibility-hidden', properties: { 'content-visibility': 'hidden' } })
      rules.push({ pattern: 'content-visibility-auto', properties: { 'content-visibility': 'auto' } })

      // ========================================
      // FORCED COLOR ADJUST
      // ========================================

      rules.push({ pattern: 'forced-color-adjust-auto', properties: { 'forced-color-adjust': 'auto' } })
      rules.push({ pattern: 'forced-color-adjust-none', properties: { 'forced-color-adjust': 'none' } })

      // ========================================
      // COLOR SCHEME
      // ========================================

      rules.push({ pattern: 'color-scheme-normal', properties: { 'color-scheme': 'normal' } })
      rules.push({ pattern: 'color-scheme-light', properties: { 'color-scheme': 'light' } })
      rules.push({ pattern: 'color-scheme-dark', properties: { 'color-scheme': 'dark' } })
      rules.push({ pattern: 'color-scheme-light-dark', properties: { 'color-scheme': 'light dark' } })
      rules.push({ pattern: 'color-scheme-only-light', properties: { 'color-scheme': 'only light' } })
      rules.push({ pattern: 'color-scheme-only-dark', properties: { 'color-scheme': 'only dark' } })

      // ========================================
      // PRINT-COLOR-ADJUST
      // ========================================

      rules.push({ pattern: 'print-color-adjust-economy', properties: { 'print-color-adjust': 'economy' } })
      rules.push({ pattern: 'print-color-adjust-exact', properties: { 'print-color-adjust': 'exact' } })

      // ========================================
      // IMAGE RENDERING
      // ========================================

      rules.push({ pattern: 'image-render-auto', properties: { 'image-rendering': 'auto' } })
      rules.push({ pattern: 'image-render-crisp', properties: { 'image-rendering': 'crisp-edges' } })
      rules.push({ pattern: 'image-render-pixelated', properties: { 'image-rendering': 'pixelated' } })
      rules.push({ pattern: 'image-render-smooth', properties: { 'image-rendering': 'smooth' } })
      rules.push({ pattern: 'image-render-optimizeQuality', properties: { 'image-rendering': 'optimizeQuality' } })
      rules.push({ pattern: 'image-render-optimizeSpeed', properties: { 'image-rendering': 'optimizeSpeed' } })

      // ========================================
      // SHAPE RENDERING (SVG)
      // ========================================

      rules.push({ pattern: 'shape-render-auto', properties: { 'shape-rendering': 'auto' } })
      rules.push({ pattern: 'shape-render-optimizeSpeed', properties: { 'shape-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'shape-render-crispEdges', properties: { 'shape-rendering': 'crispEdges' } })
      rules.push({ pattern: 'shape-render-geometricPrecision', properties: { 'shape-rendering': 'geometricPrecision' } })

      // ========================================
      // TEXT RENDERING
      // ========================================

      rules.push({ pattern: 'text-render-auto', properties: { 'text-rendering': 'auto' } })
      rules.push({ pattern: 'text-render-optimizeSpeed', properties: { 'text-rendering': 'optimizeSpeed' } })
      rules.push({ pattern: 'text-render-optimizeLegibility', properties: { 'text-rendering': 'optimizeLegibility' } })
      rules.push({ pattern: 'text-render-geometricPrecision', properties: { 'text-rendering': 'geometricPrecision' } })

      // ========================================
      // BACKDROP (for dialogs/modals)
      // ========================================

      rules.push({
        pattern: 'backdrop-blur-sm',
        selector: (s) => `${s}::backdrop`,
        properties: { 'backdrop-filter': 'blur(4px)' },
      })
      rules.push({
        pattern: 'backdrop-blur',
        selector: (s) => `${s}::backdrop`,
        properties: { 'backdrop-filter': 'blur(8px)' },
      })
      rules.push({
        pattern: 'backdrop-blur-lg',
        selector: (s) => `${s}::backdrop`,
        properties: { 'backdrop-filter': 'blur(16px)' },
      })
      rules.push({
        pattern: 'backdrop-dark',
        selector: (s) => `${s}::backdrop`,
        properties: { 'background-color': 'rgba(0, 0, 0, 0.5)' },
      })
      rules.push({
        pattern: 'backdrop-darker',
        selector: (s) => `${s}::backdrop`,
        properties: { 'background-color': 'rgba(0, 0, 0, 0.75)' },
      })
      rules.push({
        pattern: 'backdrop-light',
        selector: (s) => `${s}::backdrop`,
        properties: { 'background-color': 'rgba(255, 255, 255, 0.5)' },
      })

      // ========================================
      // SCROLL SNAP STOP
      // ========================================

      rules.push({ pattern: 'snap-normal', properties: { 'scroll-snap-stop': 'normal' } })
      rules.push({ pattern: 'snap-always', properties: { 'scroll-snap-stop': 'always' } })

      // ========================================
      // HIGHLIGHT (::highlight pseudo-element)
      // ========================================

      // These need custom highlight name support via CSS.highlights API
      rules.push({
        pattern: 'highlight-yellow',
        selector: (s) => `${s}::highlight(search)`,
        properties: {
          'background-color': '#fef08a',
          color: 'inherit',
        },
      })
      rules.push({
        pattern: 'highlight-green',
        selector: (s) => `${s}::highlight(search)`,
        properties: {
          'background-color': '#bbf7d0',
          color: 'inherit',
        },
      })
      rules.push({
        pattern: 'highlight-blue',
        selector: (s) => `${s}::highlight(search)`,
        properties: {
          'background-color': '#bfdbfe',
          color: 'inherit',
        },
      })
      rules.push({
        pattern: 'highlight-pink',
        selector: (s) => `${s}::highlight(search)`,
        properties: {
          'background-color': '#fbcfe8',
          color: 'inherit',
        },
      })

      // ========================================
      // SCROLLBAR GUTTER
      // ========================================

      rules.push({ pattern: 'scrollbar-gutter-auto', properties: { 'scrollbar-gutter': 'auto' } })
      rules.push({ pattern: 'scrollbar-gutter-stable', properties: { 'scrollbar-gutter': 'stable' } })
      rules.push({ pattern: 'scrollbar-gutter-stable-both', properties: { 'scrollbar-gutter': 'stable both-edges' } })

      // ========================================
      // INPUT SECURITY
      // ========================================

      rules.push({ pattern: 'input-security-none', properties: { 'input-security': 'none' } })
      rules.push({ pattern: 'input-security-auto', properties: { 'input-security': 'auto' } })

      // ========================================
      // FIELD SIZING
      // ========================================

      rules.push({ pattern: 'field-sizing-fixed', properties: { 'field-sizing': 'fixed' } })
      rules.push({ pattern: 'field-sizing-content', properties: { 'field-sizing': 'content' } })

      // ========================================
      // INTERPOLATE SIZE
      // ========================================

      rules.push({ pattern: 'interpolate-size-numeric-only', properties: { 'interpolate-size': 'numeric-only' } })
      rules.push({ pattern: 'interpolate-size-allow-keywords', properties: { 'interpolate-size': 'allow-keywords' } })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default interactiveUtilitiesPlugin
