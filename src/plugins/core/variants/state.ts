/**
 * State Variants Plugin
 *
 * ARIA attribute and data attribute variants.
 * Provides aria-*, data-* variants for accessible and state-driven styling.
 * @module plugins/core/variants/state
 */

import type { Plugin, Variant, PluginContext } from '../../../types'

/**
 * Helper to create boolean attribute variants (true/false)
 *
 * @example
 * ```typescript
 * // Creates: aria-checked (true), aria-not-checked (false)
 * createBooleanVariants('aria-checked', 'aria')
 * ```
 */
function createBooleanVariants(
  attr: string,
  prefix: string,
  options: { trueValue?: string; falseValue?: string; falseName?: string } = {}
): Variant[] {
  const { trueValue = 'true', falseValue = 'false', falseName = `not-${attr}` } = options
  const variants: Variant[] = []

  // True variant
  variants.push({
    name: `${prefix}-${attr}`,
    handler: (selector) => `${selector}[${prefix}-${attr}="${trueValue}"]`,
  })

  // False variant
  variants.push({
    name: `${prefix}-${falseName}`,
    handler: (selector) => `${selector}[${prefix}-${attr}="${falseValue}"]`,
  })

  return variants
}

/**
 * Helper to create enum attribute variants
 *
 * @example
 * ```typescript
 * // Creates: aria-current-page, aria-current-step, aria-current-location, etc.
 * createEnumVariants('aria-current', 'aria', ['page', 'step', 'location', 'date', 'time', true])
 * ```
 */
function createEnumVariants(
  attr: string,
  prefix: string,
  values: Array<string | boolean>
): Variant[] {
  return values.map((value) => ({
    name: `${prefix}-${attr}-${String(value)}`,
    handler: (selector) => {
      const attrValue = value === true ? 'true' : String(value)
      return `${selector}[${prefix}-${attr}="${attrValue}"]`
    },
  }))
}

/**
 * Helper to create data attribute state variants
 *
 * @example
 * ```typescript
 * // Creates: data-state-open, data-state-closed, data-state-loading
 * createDataStateVariants(['open', 'closed', 'loading', 'active', 'inactive'])
 * ```
 */
function createDataStateVariants(states: string[]): Variant[] {
  return states.map((state) => ({
    name: `data-state-${state}`,
    handler: (selector) => `${selector}[data-state="${state}"]`,
  }))
}

/**
 * Helper to create peer/group variants
 *
 * @example
 * ```typescript
 * // Creates: peer-aria-checked, group-data-loading, etc.
 * createPeerVariants(['aria-checked', 'data-loading'], 'peer')
 * ```
 */
function createPeerVariants(attrs: string[], peerType: 'peer' | 'group' | 'parent'): Variant[] {
  return attrs.map((attr) => ({
    name: `${peerType}-${attr}`,
    handler: (selector) => {
      // Handle aria-* attributes
      if (attr.startsWith('aria-')) {
        return `.${peerType}[${attr}="true"] ~ ${selector}`
      }
      // Handle data-* attributes
      if (attr.startsWith('data-')) {
        return `.${peerType}[${attr}] ~ ${selector}`
      }
      return selector
    },
  }))
}

/**
 * Helper to create @supports variants
 *
 * @example
 * ```typescript
 * // Creates: supports-grid, supports-flex, supports-container
 * createSupportsVariants(['display: grid', 'display: flex', 'container-type: inline-size'])
 * ```
 */
function createSupportsVariants(features: string[], negate = false): Variant[] {
  const prefix = negate ? 'not-supports' : 'supports'

  return features.map((feature) => {
    const name = feature.replace(/\s+/g, '-').replace(/:/g, '-').replace(/\(/g, '').replace(/\)/g, '')
    const variantName = `${prefix}-${name}`
    // Create shorter match regexes for common features
    let matchPattern = new RegExp(`^${variantName}`)
    if (feature === 'backdrop-filter: blur(1px)') {
      matchPattern = new RegExp(`^${prefix}-backdrop-blur`)
    } else if (feature === 'animation-timeline: scroll()') {
      matchPattern = new RegExp(`^${prefix}-scroll-timeline`)
    }
    return {
      name: variantName,
      match: matchPattern,
      handler: (selector) => selector,
      wrapper: `@supports ${negate ? 'not ' : ''}(${feature})`,
    }
  })
}

/**
 * State variants plugin - aria-* and data-* attribute variants
 */
export function stateVariantsPlugin(): Plugin {
  return {
    name: 'state-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // ========================================
      // ARIA Boolean Attribute Variants
      // ========================================

      // aria-checked: [true, false, mixed]
      variants.push(...createBooleanVariants('checked', 'aria'))
      variants.push({
        name: 'aria-mixed',
        handler: (selector) => `${selector}[aria-checked="mixed"]`,
      })

      // aria-disabled
      variants.push(...createBooleanVariants('disabled', 'aria', { falseName: 'enabled' }))

      // aria-expanded
      variants.push(...createBooleanVariants('expanded', 'aria', { falseName: 'collapsed' }))

      // aria-hidden
      variants.push(...createBooleanVariants('hidden', 'aria', { falseName: 'visible' }))

      // aria-pressed
      variants.push(...createBooleanVariants('pressed', 'aria', { falseName: 'not-pressed' }))

      // aria-selected
      variants.push(...createBooleanVariants('selected', 'aria', { falseName: 'not-selected' }))

      // aria-current: [page, step, location, date, time, true, false]
      variants.push(...createEnumVariants('current', 'aria', ['page', 'step', 'location', 'date', 'time', 'true', 'false']))

      // aria-grabbed: [true, false]
      variants.push(...createBooleanVariants('grabbed', 'aria', { falseName: 'not-grabbed' }))

      // aria-busy
      variants.push(...createBooleanVariants('busy', 'aria'))

      // aria-live: [polite, assertive, off]
      variants.push(...createEnumVariants('live', 'aria', ['polite', 'assertive', 'off']))

      // aria-atomic: [true, false]
      variants.push(...createBooleanVariants('atomic', 'aria'))

      // aria-relevant: [additions, removals, text, all]
      variants.push(...createEnumVariants('relevant', 'aria', ['additions', 'removals', 'text', 'all']))

      // aria-invalid: [true, false, grammar, spelling]
      variants.push(...createEnumVariants('invalid', 'aria', ['true', 'false', 'grammar', 'spelling']))

      // aria-required
      variants.push(...createBooleanVariants('required', 'aria'))

      // aria-readonly
      variants.push(...createBooleanVariants('readonly', 'aria', { falseName: 'readwrite' }))

      // aria-sort: [ascending, descending, none, other]
      variants.push(...createEnumVariants('sort', 'aria', ['ascending', 'descending', 'none', 'other']))

      // aria-orientation: [horizontal, vertical, undefined]
      variants.push(...createEnumVariants('orientation', 'aria', ['horizontal', 'vertical', 'undefined']))

      // aria-autocomplete: [inline, list, both, none]
      variants.push(...createEnumVariants('autocomplete', 'aria', ['inline', 'list', 'both', 'none']))

      // aria-haspopup: [true, false, menu, listbox, tree, grid, dialog]
      variants.push(...createEnumVariants('haspopup', 'aria', ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog']))

      // aria-modal
      variants.push(...createBooleanVariants('modal', 'aria'))

      // aria-multiselectable
      variants.push(...createBooleanVariants('multiselectable', 'aria'))

      // aria-multiline
      variants.push(...createBooleanVariants('multiline', 'aria'))

      // ========================================
      // SIMPLE ARIA VARIANTS (without value suffix)
      // ========================================

      // aria-current → [aria-current="true"]
      variants.push({
        name: 'aria-current',
        handler: (selector) => `${selector}[aria-current="true"]`,
      })

      // aria-invalid → [aria-invalid="true"]
      variants.push({
        name: 'aria-invalid',
        handler: (selector) => `${selector}[aria-invalid="true"]`,
      })

      // aria-valid → [aria-invalid="false"]
      variants.push({
        name: 'aria-valid',
        handler: (selector) => `${selector}[aria-invalid="false"]`,
      })

      // aria-optional (inverse of aria-required) → [aria-required="false"]
      variants.push({
        name: 'aria-optional',
        handler: (selector) => `${selector}[aria-required="false"]`,
      })

      // aria-required → [aria-required="true"]
      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })

      // aria-horizontal → [aria-orientation="horizontal"]
      variants.push({
        name: 'aria-horizontal',
        handler: (selector) => `${selector}[aria-orientation="horizontal"]`,
      })

      // aria-vertical → [aria-orientation="vertical"]
      variants.push({
        name: 'aria-vertical',
        handler: (selector) => `${selector}[aria-orientation="vertical"]`,
      })

      // aria-haspopup variants → [aria-haspopup="menu"], [aria-haspopup="dialog"], etc.
      const hasPopupValues = ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog']
      for (const value of hasPopupValues) {
        variants.push({
          name: `aria-haspopup-${value}`,
          handler: (selector) => `${selector}[aria-haspopup="${value}"]`,
        })
      }

      // Simple aria-haspopup → [aria-haspopup="true"]
      variants.push({
        name: 'aria-haspopup',
        handler: (selector) => `${selector}[aria-haspopup="true"]`,
      })

      // ========================================
      // DATA Attribute Variants
      // ========================================

      // data-state: [open, closed, loading, active, inactive, disabled, checked, selected, expanded, collapsed]
      variants.push(
        ...createDataStateVariants(['open', 'closed', 'loading', 'active', 'inactive', 'disabled', 'checked', 'selected', 'expanded', 'collapsed'])
      )

      // data-orientation: [horizontal, vertical]
      variants.push(...createEnumVariants('orientation', 'data', ['horizontal', 'vertical']))

      // data-side: [top, right, bottom, left, start, end]
      variants.push(...createEnumVariants('side', 'data', ['top', 'right', 'bottom', 'left', 'start', 'end']))

      // data-align: [start, center, end]
      variants.push(...createEnumVariants('align', 'data', ['start', 'center', 'end']))

      // Data boolean states
      for (const state of ['disabled', 'highlighted', 'selected', 'placeholder', 'loading', 'focus']) {
        variants.push(...createBooleanVariants(state, 'data'))
      }

      // Interactive states
      for (const state of ['pressed', 'dragging', 'resizing', 'swiping', 'hovered', 'focused']) {
        variants.push(...createBooleanVariants(state, 'data'))
      }

      // Swipe direction: [up, down, left, right]
      variants.push(...createEnumVariants('swipe-direction', 'data', ['up', 'down', 'left', 'right']))

      // Toggle state: [on, off]
      variants.push(...createEnumVariants('toggle', 'data', ['on', 'off']))

      // Value state: [on, off]
      variants.push(...createEnumVariants('value', 'data', ['on', 'off']))

      // ========================================
      // SIMPLE DATA STATE VARIANTS (without value suffix)
      // ========================================

      // data-state variants: data-open, data-closed, etc. → [data-state="..."]
      const dataStateValues = [
        'open', 'closed', 'loading', 'active', 'inactive',
        'checked', 'unchecked', 'indeterminate',
        'on', 'off'
      ]
      for (const state of dataStateValues) {
        variants.push({
          name: `data-${state}`,
          handler: (selector) => `${selector}[data-state="${state}"]`,
        })
      }

      // data-disabled → [data-disabled]
      variants.push({
        name: 'data-disabled',
        handler: (selector) => `${selector}[data-disabled]`,
      })

      // data-enabled → [data-disabled="false"]
      variants.push({
        name: 'data-enabled',
        handler: (selector) => `${selector}[data-disabled="false"]`,
      })

      // data-highlighted → [data-highlighted]
      variants.push({
        name: 'data-highlighted',
        handler: (selector) => `${selector}[data-highlighted]`,
      })

      // data-selected → [data-selected]
      variants.push({
        name: 'data-selected',
        handler: (selector) => `${selector}[data-selected]`,
      })

      // data-orientation variants
      variants.push({
        name: 'data-horizontal',
        handler: (selector) => `${selector}[data-orientation="horizontal"]`,
      })
      variants.push({
        name: 'data-vertical',
        handler: (selector) => `${selector}[data-orientation="vertical"]`,
      })

      // ========================================
      // DATA ATTRIBUTE PRESENCE VARIANTS
      // ========================================

      // Interactive states: placeholder, loading, focus, etc.
      const dataPresenceStates = [
        'placeholder', 'loading', 'busy', 'idle', 'empty',
        'focus', 'focus-visible', 'active', 'inactive',
        'checked', 'unchecked', 'indeterminate', 'selected', 'unselected',
        'disabled', 'enabled', 'readonly', 'readwrite',
        'pressed', 'unpressed',
        'dragging', 'droppable', 'drag-over', 'drop',
        'resizing', 'scrolling', 'swiping',
        'hovered', 'unhovered',
        'expanded', 'collapsed',
        'open', 'closed', 'locked', 'sticky',
        'pinned', 'unpinned', 'detached', 'attached',
        'valid', 'invalid', 'touched', 'untouched',
        'dirty', 'pristine', 'visited', 'unvisited',
      ]

      for (const state of dataPresenceStates) {
        variants.push({
          name: `data-${state}`,
          handler: (selector) => `${selector}[data-${state}]`,
        })
      }

      // ========================================
      // PEER/GROUP VARIANTS
      // ========================================

      // Peer ARIA states
      const peerAttrs = [
        'aria-checked',
        'aria-disabled',
        'aria-expanded',
        'aria-hidden',
        'aria-pressed',
        'aria-selected',
        'aria-required',
        'aria-invalid',
        'aria-readonly',
        'aria-busy',
      ]
      variants.push(...createPeerVariants(peerAttrs, 'peer'))

      // Peer data states
      const peerDataStates = [
        'data-state-open',
        'data-state-closed',
        'data-state-loading',
        'data-state-active',
        'data-state-inactive',
        'data-state-disabled',
        'data-state-checked',
        'data-state-selected',
        'data-disabled',
        'data-selected',
        'data-highlighted',
      ]
      variants.push(...createPeerVariants(peerDataStates, 'peer'))

      // Group variants
      variants.push(...createPeerVariants(peerAttrs, 'group'))
      variants.push(...createPeerVariants(peerDataStates, 'group'))

      // ========================================
      // SPECIAL GROUP/PEER/PARENT ARIA VARIANTS
      // ========================================

      // Special group aria variants with specific value mappings
      for (const peerType of ['group', 'peer', 'parent']) {
        // {peerType}-aria-collapsed → [{peerType}][aria-expanded="false"]
        variants.push({
          name: `${peerType}-aria-collapsed`,
          handler: (selector) => `.${peerType}[aria-expanded="false"] ~ ${selector}`,
        })

        // {peerType}-aria-current → [{peerType}][aria-current="true"]
        variants.push({
          name: `${peerType}-aria-current`,
          handler: (selector) => `.${peerType}[aria-current="true"] ~ ${selector}`,
        })

        // {peerType}-aria-current-page → [{peerType}][aria-current="page"]
        variants.push({
          name: `${peerType}-aria-current-page`,
          handler: (selector) => `.${peerType}[aria-current="page"] ~ ${selector}`,
        })

        // {peerType}-aria-invalid → [{peerType}][aria-invalid="true"]
        variants.push({
          name: `${peerType}-aria-invalid`,
          handler: (selector) => `.${peerType}[aria-invalid="true"] ~ ${selector}`,
        })

        // {peerType}-aria-valid → [{peerType}][aria-invalid="false"]
        variants.push({
          name: `${peerType}-aria-valid`,
          handler: (selector) => `.${peerType}[aria-invalid="false"] ~ ${selector}`,
        })

        // {peerType}-aria-disabled → [{peerType}][aria-disabled="true"]
        variants.push({
          name: `${peerType}-aria-disabled`,
          handler: (selector) => `.${peerType}[aria-disabled="true"] ~ ${selector}`,
        })

        // {peerType}-aria-enabled → [{peerType}][aria-disabled="false"]
        variants.push({
          name: `${peerType}-aria-enabled`,
          handler: (selector) => `.${peerType}[aria-disabled="false"] ~ ${selector}`,
        })

        // {peerType}-aria-readonly → [{peerType}][aria-readonly="true"]
        variants.push({
          name: `${peerType}-aria-readonly`,
          handler: (selector) => `.${peerType}[aria-readonly="true"] ~ ${selector}`,
        })

        // {peerType}-aria-readwrite → [{peerType}][aria-readonly="false"]
        variants.push({
          name: `${peerType}-aria-readwrite`,
          handler: (selector) => `.${peerType}[aria-readonly="false"] ~ ${selector}`,
        })
      }

      // Parent variants
      variants.push(...createPeerVariants(peerAttrs, 'parent'))
      variants.push(...createPeerVariants(peerDataStates, 'parent'))

      // ========================================
      // DATA STATE VARIANTS (short form: data-open, data-closed, etc.)
      // ========================================

      // Short form data-state variants: data-open, data-closed, etc.
      // These match classes like 'group-data-open', 'peer-data-loading', etc.
      const dataStates = ['open', 'closed', 'loading', 'active', 'inactive', 'disabled', 'checked', 'selected']
      for (const state of dataStates) {
        for (const peerType of ['peer', 'group', 'parent']) {
          const variantName = `${peerType}-data-${state}`
          variants.push({
            name: variantName,
            match: variantName,
            handler: (selector) => `.${peerType}[data-state="${state}"] ~ ${selector}`,
          })
        }
      }

      // ========================================
      // NOT-HAS VARIANTS (peer-not-has-checked, etc.)
      // ========================================

      // Pseudo-classes for :has() negation
      // These match classes like 'peer-not-has-checked', 'group-not-has-focus', etc.
      const pseudoClasses = [
        'checked', 'focus', 'hover', 'active', 'disabled', 'required', 'invalid', 'valid',
        'autofill', 'in-range', 'out-of-range', 'read-only', 'read-write',
      ]

      for (const pseudo of pseudoClasses) {
        for (const peerType of ['peer', 'group', 'parent']) {
          const variantName = `${peerType}-not-has-${pseudo}`
          variants.push({
            name: variantName,
            match: variantName,
            handler: (selector) => `.${peerType}:not(:has(:${pseudo})) ~ ${selector}`,
          })
        }
      }

      // ========================================
      // FORM STATE VARIANTS
      // ========================================

      // Form states: [valid, invalid]
      variants.push(...createEnumVariants('state', 'data', ['valid', 'invalid']))

      // Form interaction states
      for (const state of ['touched', 'untouched', 'dirty', 'pristine']) {
        variants.push(...createBooleanVariants(state, 'data'))
      }

      // ========================================
      // ARBITRARY PEER/GROUP/PARENT ARIA & DATA VARIANTS
      // ========================================

      // Arbitrary peer aria variants: peer-aria-[key=value], peer-aria-[key]
      for (const peerType of ['peer', 'group', 'parent']) {
        // peer-aria-[key=value] or peer-aria-[key]
        variants.push({
          name: `${peerType}-aria`,
          match: new RegExp(`^${peerType}-aria-\\[([^\\]]+)\\]`),
          handler: (selector, matches) => {
            if (!matches || !matches[1]) return selector
            const attr = matches[1]!
            // Handle key=value or just key (defaults to "true")
            // Add quotes around the value for proper CSS attribute selector
            if (attr.includes('=')) {
              const [key, ...valueParts] = attr.split('=')
              const value = valueParts.join('=')
              return `.${peerType}[aria-${key}="${value}"] ~ ${selector}`
            }
            return `.${peerType}[aria-${attr}="true"] ~ ${selector}`
          },
        })

        // peer-data-[key=value] or peer-data-[key]
        variants.push({
          name: `${peerType}-data`,
          match: new RegExp(`^${peerType}-data-\\[([^\\]]+)\\]`),
          handler: (selector, matches) => {
            if (!matches || !matches[1]) return selector
            const attr = matches[1]!
            // Handle key=value or just key (as a state)
            if (attr.includes('=')) {
              const [key, ...valueParts] = attr.split('=')
              const value = valueParts.join('=')
              return `.${peerType}[data-${key}="${value}"] ~ ${selector}`
            }
            return `.${peerType}[data-${attr}] ~ ${selector}`
          },
        })
      }

      // ========================================
      // MEDIA QUERY VARIANTS
      // ========================================

      // Print media
      variants.push({
        name: 'print',
        handler: (selector) => selector,
        wrapper: '@media print',
      })

      // Screen media
      variants.push({
        name: 'screen',
        handler: (selector) => selector,
        wrapper: '@media screen',
      })

      // ========================================
      // DIRECTIONAL VARIANTS
      // ========================================

      // RTL/LTR
      variants.push({
        name: 'rtl',
        handler: (selector) => `${selector}[dir="rtl"]`,
      })
      variants.push({
        name: 'ltr',
        handler: (selector) => `${selector}[dir="ltr"]`,
      })

      // ========================================
      // @supports FEATURE QUERY VARIANTS
      // ========================================

      // Common @supports
      const supportFeatures = [
        'display: grid',
        'display: flex',
        'container-type: inline-size',
        'selector(:has(*))',
        'backdrop-filter: blur(1px)',
        'animation-timeline: scroll()',
        'field-sizing: content',
        'anchor-positioning: anchor-bottom',
      ]
      variants.push(...createSupportsVariants(supportFeatures))

      // Negated @supports
      variants.push(...createSupportsVariants(supportFeatures, true))

      // Arbitrary @supports
      // Usage: supports-[display:grid]:flex, supports-[backdrop-filter:blur(10px)]:bg-white/80
      variants.push({
        name: 'supports',
        match: /^supports-\[([^\]]+)\]$/,
        handler: (selector) => selector,
        wrapper: (matches: RegExpMatchArray | null) => {
          if (!matches || !matches[1]) { return '' }
          const condition = matches[1]!.replace(/_/g, ' ')
          // Check if it's a selector() query or property:value
          if (condition.startsWith('selector(')) {
            return `@supports ${condition}`
          }
          // Handle property:value format
          if (condition.includes(':')) {
            const [prop, val] = condition.split(':')
            return `@supports (${prop}: ${val})`
          }
          // Fallback - wrap in parentheses
          return `@supports (${condition})`
        },
      })

      // not-supports - negate feature queries
      // Usage: not-supports-[display:grid]:block
      variants.push({
        name: 'not-supports',
        match: /^not-supports-\[([^\]]+)\]$/,
        handler: (selector) => selector,
        wrapper: (matches: RegExpMatchArray | null) => {
          if (!matches || !matches[1]) { return '' }
          const condition = matches[1]!.replace(/_/g, ' ')
          if (condition.startsWith('selector(')) {
            return `@supports not ${condition}`
          }
          if (condition.includes(':')) {
            const [prop, val] = condition.split(':')
            return `@supports not (${prop}: ${val})`
          }
          return `@supports not (${condition})`
        },
      })

      // ========================================
      // CSS PSEUDO-CLASS VARIANTS (not-, is-, where-)
      // ========================================

      // Arbitrary not- pseudo-class variants: not-[:hover], not-[:focus:visible]
      // Usage: not-[:hover]:pointer-events-none
      variants.push({
        name: 'not',
        match: /^not-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) return selector
          const pseudo = matches[1]!
          // Replace underscores with spaces (for compound selectors)
          return `${selector}:not(${pseudo.replace(/_/g, ' ')})`
        },
      })

      // Arbitrary is- pseudo-class variants: is-[div_span], is-[:hover_focus]
      // Usage: is-[div_span]:text-red-500
      variants.push({
        name: 'is',
        match: /^is-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) return selector
          const content = matches[1]!
          // Replace underscores with spaces (for compound selectors)
          return `${selector}:is(${content.replace(/_/g, ' ')})`
        },
      })

      // Arbitrary where- pseudo-class variants: where-[div_span], where-[:hover_focus]
      // Usage: where-[div_span]:text-red-500
      variants.push({
        name: 'where',
        match: /^where-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) return selector
          const content = matches[1]!
          // Replace underscores with spaces (for compound selectors)
          return `${selector}:where(${content.replace(/_/g, ' ')})`
        },
      })

      // Arbitrary :has() pseudo-class variants: has-[>img], has-[>_img], has-[img]
      // Usage: has-[>_img]:p-4
      variants.push({
        name: 'has',
        match: /^has-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) return selector
          const content = matches[1]!
          // Replace underscores with spaces (for compound selectors)
          return `${selector}:has(${content.replace(/_/g, ' ')})`
        },
      })

      // ========================================
      // @starting-style VARIANT
      // ========================================

      variants.push({
        name: 'starting',
        handler: (selector) => selector,
        wrapper: '@starting-style',
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default stateVariantsPlugin
