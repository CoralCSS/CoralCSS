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
 */
function createDataStateVariants(states: string[]): Variant[] {
  return states.map((state) => ({
    name: `data-state-${state}`,
    handler: (selector) => `${selector}[data-state="${state}"]`,
  }))
}

/**
 * Helper to create peer/group variants
 * FIXED: group uses space (descendant), peer uses ~ (sibling)
 */
function createPeerVariants(attrs: string[], peerType: 'peer' | 'group' | 'parent'): Variant[] {
  const combinator = peerType === 'peer' ? ' ~ ' : ' '

  return attrs.map((attr) => ({
    name: `${peerType}-${attr}`,
    handler: (selector) => {
      // Handle aria-* attributes
      if (attr.startsWith('aria-')) {
        return `.${peerType}[${attr}="true"]${combinator}${selector}`
      }
      // Handle data-state-* attributes
      if (attr.startsWith('data-state-')) {
        const state = attr.replace('data-state-', '')
        return `.${peerType}[data-state="${state}"]${combinator}${selector}`
      }
      // Handle data-* attributes (presence)
      if (attr.startsWith('data-')) {
        return `.${peerType}[${attr}]${combinator}${selector}`
      }
      return selector
    },
  }))
}

/**
 * Helper to create @supports variants
 * Maps feature descriptors to short friendly names
 */
function createSupportsVariants(features: Array<{ name: string; feature: string }>, negate = false): Variant[] {
  const prefix = negate ? 'not-supports' : 'supports'

  return features.map(({ name, feature }) => {
    const variantName = `${prefix}-${name}`
    // selector() function should not be wrapped in extra parentheses
    const featureStr = feature.startsWith('selector(')
      ? feature
      : `(${feature})`
    return {
      name: variantName,
      handler: (selector) => selector,
      wrapper: `@supports ${negate ? 'not ' : ''}${featureStr}`,
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

      // aria-readonly (FIXED: editable instead of readwrite)
      variants.push(...createBooleanVariants('readonly', 'aria', { falseName: 'editable' }))

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

      variants.push({
        name: 'aria-current',
        handler: (selector) => `${selector}[aria-current="true"]`,
      })

      variants.push({
        name: 'aria-invalid',
        handler: (selector) => `${selector}[aria-invalid="true"]`,
      })

      variants.push({
        name: 'aria-valid',
        handler: (selector) => `${selector}[aria-invalid="false"]`,
      })

      variants.push({
        name: 'aria-optional',
        handler: (selector) => `${selector}[aria-required="false"]`,
      })

      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })

      variants.push({
        name: 'aria-horizontal',
        handler: (selector) => `${selector}[aria-orientation="horizontal"]`,
      })

      variants.push({
        name: 'aria-vertical',
        handler: (selector) => `${selector}[aria-orientation="vertical"]`,
      })

      // aria-haspopup variants
      const hasPopupValues = ['true', 'false', 'menu', 'listbox', 'tree', 'grid', 'dialog']
      for (const value of hasPopupValues) {
        variants.push({
          name: `aria-haspopup-${value}`,
          handler: (selector) => `${selector}[aria-haspopup="${value}"]`,
        })
      }

      variants.push({
        name: 'aria-haspopup',
        handler: (selector) => `${selector}[aria-haspopup="true"]`,
      })

      // ========================================
      // ARBITRARY ARIA VARIANT (aria-[key=value])
      // ========================================

      variants.push({
        name: 'aria',
        match: /^aria-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const attr = matches[1]!
          if (attr.includes('=')) {
            const [key, ...valueParts] = attr.split('=')
            const value = valueParts.join('=')
            return `${selector}[aria-${key}="${value}"]`
          }
          // Default to "true" for presence-only
          return `${selector}[aria-${attr}="true"]`
        },
      })

      // ========================================
      // ARBITRARY DATA VARIANT (data-[key=value])
      // ========================================

      variants.push({
        name: 'data',
        match: /^data-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const attr = matches[1]!
          if (attr.includes('=')) {
            const [key, ...valueParts] = attr.split('=')
            const value = valueParts.join('=')
            return `${selector}[data-${key}="${value}"]`
          }
          // Presence-only
          return `${selector}[data-${attr}]`
        },
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

      // Data swipe variants (FIXED: added missing variants)
      variants.push(...createEnumVariants('swipe', 'data', ['start', 'move', 'end', 'cancel']))

      // Swipe direction: [up, down, left, right]
      variants.push(...createEnumVariants('swipe-direction', 'data', ['up', 'down', 'left', 'right']))

      // Toggle state: [on, off]
      variants.push(...createEnumVariants('toggle', 'data', ['on', 'off']))

      // Value state: [on, off]
      variants.push(...createEnumVariants('value', 'data', ['on', 'off']))

      // ========================================
      // SIMPLE DATA STATE VARIANTS
      // ========================================

      // Note: 'loading' is handled as presence-only in dataPresenceStates
      const dataStateValues = [
        'open', 'closed', 'active', 'inactive',
        'checked', 'unchecked', 'indeterminate',
        'on', 'off'
      ]
      for (const state of dataStateValues) {
        variants.push({
          name: `data-${state}`,
          handler: (selector) => `${selector}[data-state="${state}"]`,
        })
      }

      // Data presence variants (FIXED: presence-only, no boolean value)
      const dataPresenceStates = [
        'disabled', 'highlighted', 'selected', 'placeholder', 'loading', 'focus',
        'focus-visible', 'pressed', 'dragging', 'resizing', 'swiping', 'hovered', 'focused'
      ]
      for (const state of dataPresenceStates) {
        variants.push({
          name: `data-${state}`,
          handler: (selector) => `${selector}[data-${state}]`,
        })
      }

      variants.push({
        name: 'data-enabled',
        handler: (selector) => `${selector}[data-disabled="false"]`,
      })

      variants.push({
        name: 'data-horizontal',
        handler: (selector) => `${selector}[data-orientation="horizontal"]`,
      })
      variants.push({
        name: 'data-vertical',
        handler: (selector) => `${selector}[data-orientation="vertical"]`,
      })

      // ========================================
      // PEER/GROUP VARIANTS
      // ========================================

      const peerAttrs = [
        'aria-checked', 'aria-disabled', 'aria-expanded', 'aria-hidden',
        'aria-pressed', 'aria-selected', 'aria-required', 'aria-invalid',
        'aria-readonly', 'aria-busy',
      ]
      const peerDataStates = [
        'data-state-open', 'data-state-closed', 'data-state-loading',
        'data-state-active', 'data-state-inactive', 'data-state-disabled',
        'data-state-checked', 'data-state-selected',
        'data-disabled', 'data-selected', 'data-highlighted', 'data-loading',
      ]

      variants.push(...createPeerVariants(peerAttrs, 'peer'))
      variants.push(...createPeerVariants(peerDataStates, 'peer'))
      variants.push(...createPeerVariants(peerAttrs, 'group'))
      variants.push(...createPeerVariants(peerDataStates, 'group'))
      variants.push(...createPeerVariants(peerAttrs, 'parent'))
      variants.push(...createPeerVariants(peerDataStates, 'parent'))

      // ========================================
      // SPECIAL GROUP/PEER ARIA VARIANTS
      // ========================================

      for (const peerType of ['group', 'peer', 'parent'] as const) {
        const combinator = peerType === 'peer' ? ' ~ ' : ' '

        variants.push({
          name: `${peerType}-aria-collapsed`,
          handler: (selector) => `.${peerType}[aria-expanded="false"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-current`,
          handler: (selector) => `.${peerType}[aria-current="true"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-current-page`,
          handler: (selector) => `.${peerType}[aria-current="page"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-invalid`,
          handler: (selector) => `.${peerType}[aria-invalid="true"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-valid`,
          handler: (selector) => `.${peerType}[aria-invalid="false"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-disabled`,
          handler: (selector) => `.${peerType}[aria-disabled="true"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-enabled`,
          handler: (selector) => `.${peerType}[aria-disabled="false"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-readonly`,
          handler: (selector) => `.${peerType}[aria-readonly="true"]${combinator}${selector}`,
        })

        variants.push({
          name: `${peerType}-aria-readwrite`,
          handler: (selector) => `.${peerType}[aria-readonly="false"]${combinator}${selector}`,
        })
      }

      // ========================================
      // DATA STATE SHORT FORM VARIANTS
      // ========================================

      const dataStates = ['open', 'closed', 'loading', 'active', 'inactive', 'disabled', 'checked', 'selected']
      for (const state of dataStates) {
        for (const peerType of ['peer', 'group', 'parent'] as const) {
          const combinator = peerType === 'peer' ? ' ~ ' : ' '
          variants.push({
            name: `${peerType}-data-${state}`,
            match: `${peerType}-data-${state}`,
            handler: (selector) => `.${peerType}[data-state="${state}"]${combinator}${selector}`,
          })
        }
      }

      // group-data-disabled and group-data-loading use presence (not data-state)
      for (const peerType of ['peer', 'group', 'parent'] as const) {
        const combinator = peerType === 'peer' ? ' ~ ' : ' '
        variants.push({
          name: `${peerType}-data-disabled`,
          handler: (selector) => `.${peerType}[data-disabled]${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-data-loading`,
          handler: (selector) => `.${peerType}[data-loading]${combinator}${selector}`,
        })
      }

      // ========================================
      // GROUP-HAS-* AND PEER-HAS-* VARIANTS
      // ========================================

      const hasPseudoClasses = [
        'hover', 'focus', 'focus-visible', 'focus-within', 'active',
        'checked', 'disabled', 'enabled', 'invalid', 'valid', 'empty',
        'required', 'optional', 'autofill', 'in-range', 'out-of-range',
        'read-only', 'read-write', 'placeholder-shown', 'indeterminate',
      ]

      for (const pseudo of hasPseudoClasses) {
        for (const peerType of ['peer', 'group'] as const) {
          const combinator = peerType === 'peer' ? ' ~ ' : ' '
          variants.push({
            name: `${peerType}-has-${pseudo}`,
            handler: (selector) => `.${peerType}:has(:${pseudo})${combinator}${selector}`,
          })
        }
      }

      // Element variants for group-has-* and peer-has-*
      const hasElements = ['input', 'textarea', 'select', 'button', 'img', 'svg', 'video', 'audio']
      for (const element of hasElements) {
        for (const peerType of ['peer', 'group'] as const) {
          const combinator = peerType === 'peer' ? ' ~ ' : ' '
          variants.push({
            name: `${peerType}-has-${element}`,
            handler: (selector) => `.${peerType}:has(${element})${combinator}${selector}`,
          })
        }
      }

      // Special element variants
      for (const peerType of ['peer', 'group'] as const) {
        const combinator = peerType === 'peer' ? ' ~ ' : ' '
        variants.push({
          name: `${peerType}-has-checkbox`,
          handler: (selector) => `.${peerType}:has(input[type="checkbox"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-radio`,
          handler: (selector) => `.${peerType}:has(input[type="radio"])${combinator}${selector}`,
        })
      }

      // ARIA/Data variants for group-has-* and peer-has-*
      for (const peerType of ['peer', 'group'] as const) {
        const combinator = peerType === 'peer' ? ' ~ ' : ' '
        variants.push({
          name: `${peerType}-has-aria-expanded`,
          handler: (selector) => `.${peerType}:has([aria-expanded="true"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-aria-checked`,
          handler: (selector) => `.${peerType}:has([aria-checked="true"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-aria-selected`,
          handler: (selector) => `.${peerType}:has([aria-selected="true"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-aria-disabled`,
          handler: (selector) => `.${peerType}:has([aria-disabled="true"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-data-open`,
          handler: (selector) => `.${peerType}:has([data-state="open"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-data-active`,
          handler: (selector) => `.${peerType}:has([data-state="active"])${combinator}${selector}`,
        })
        variants.push({
          name: `${peerType}-has-data-checked`,
          handler: (selector) => `.${peerType}:has([data-state="checked"])${combinator}${selector}`,
        })
      }

      // ========================================
      // NOT-HAS VARIANTS
      // ========================================

      for (const pseudo of hasPseudoClasses) {
        for (const peerType of ['peer', 'group', 'parent'] as const) {
          const combinator = peerType === 'peer' ? ' ~ ' : ' '
          variants.push({
            name: `${peerType}-not-has-${pseudo}`,
            handler: (selector) => `.${peerType}:not(:has(:${pseudo}))${combinator}${selector}`,
          })
        }
      }

      // ========================================
      // ARBITRARY PEER/GROUP ARIA & DATA VARIANTS
      // ========================================

      for (const peerType of ['peer', 'group', 'parent'] as const) {
        const combinator = peerType === 'peer' ? ' ~ ' : ' '

        variants.push({
          name: `${peerType}-aria`,
          match: new RegExp(`^${peerType}-aria-\\[([^\\]]+)\\]`),
          handler: (selector, matches) => {
            if (!matches || !matches[1]) {return selector}
            const attr = matches[1]!
            if (attr.includes('=')) {
              const [key, ...valueParts] = attr.split('=')
              const value = valueParts.join('=')
              return `.${peerType}[aria-${key}="${value}"]${combinator}${selector}`
            }
            return `.${peerType}[aria-${attr}="true"]${combinator}${selector}`
          },
        })

        variants.push({
          name: `${peerType}-data`,
          match: new RegExp(`^${peerType}-data-\\[([^\\]]+)\\]`),
          handler: (selector, matches) => {
            if (!matches || !matches[1]) {return selector}
            const attr = matches[1]!
            if (attr.includes('=')) {
              const [key, ...valueParts] = attr.split('=')
              const value = valueParts.join('=')
              return `.${peerType}[data-${key}="${value}"]${combinator}${selector}`
            }
            return `.${peerType}[data-${attr}]${combinator}${selector}`
          },
        })
      }

      // ========================================
      // MEDIA QUERY VARIANTS
      // ========================================

      // Print/Screen
      variants.push({
        name: 'print',
        handler: (selector) => selector,
        wrapper: '@media print',
      })
      variants.push({
        name: 'screen',
        handler: (selector) => selector,
        wrapper: '@media screen',
      })

      // Forced colors
      variants.push({
        name: 'forced-colors',
        handler: (selector) => selector,
        wrapper: '@media (forced-colors: active)',
      })
      variants.push({
        name: 'forced-colors-none',
        handler: (selector) => selector,
        wrapper: '@media (forced-colors: none)',
      })

      // Contrast preference
      variants.push({
        name: 'contrast-more',
        handler: (selector) => selector,
        wrapper: '@media (prefers-contrast: more)',
      })
      variants.push({
        name: 'contrast-less',
        handler: (selector) => selector,
        wrapper: '@media (prefers-contrast: less)',
      })
      variants.push({
        name: 'contrast-custom',
        handler: (selector) => selector,
        wrapper: '@media (prefers-contrast: custom)',
      })

      // Transparency preference
      variants.push({
        name: 'reduce-transparency',
        handler: (selector) => selector,
        wrapper: '@media (prefers-reduced-transparency: reduce)',
      })

      // Color gamut
      variants.push({
        name: 'color-srgb',
        handler: (selector) => selector,
        wrapper: '@media (color-gamut: srgb)',
      })
      variants.push({
        name: 'color-p3',
        handler: (selector) => selector,
        wrapper: '@media (color-gamut: p3)',
      })
      variants.push({
        name: 'color-rec2020',
        handler: (selector) => selector,
        wrapper: '@media (color-gamut: rec2020)',
      })

      // Display mode (PWA)
      variants.push({
        name: 'standalone',
        handler: (selector) => selector,
        wrapper: '@media (display-mode: standalone)',
      })
      variants.push({
        name: 'display-fullscreen',
        handler: (selector) => selector,
        wrapper: '@media (display-mode: fullscreen)',
      })
      variants.push({
        name: 'minimal-ui',
        handler: (selector) => selector,
        wrapper: '@media (display-mode: minimal-ui)',
      })
      variants.push({
        name: 'browser',
        handler: (selector) => selector,
        wrapper: '@media (display-mode: browser)',
      })
      variants.push({
        name: 'picture-in-picture',
        handler: (selector) => selector,
        wrapper: '@media (display-mode: picture-in-picture)',
      })

      // Inverted colors
      variants.push({
        name: 'inverted-colors',
        handler: (selector) => selector,
        wrapper: '@media (inverted-colors: inverted)',
      })

      // Scripting
      variants.push({
        name: 'scripting-enabled',
        handler: (selector) => selector,
        wrapper: '@media (scripting: enabled)',
      })
      variants.push({
        name: 'scripting-none',
        handler: (selector) => selector,
        wrapper: '@media (scripting: none)',
      })
      variants.push({
        name: 'scripting-initial-only',
        handler: (selector) => selector,
        wrapper: '@media (scripting: initial-only)',
      })

      // Pointer capability
      variants.push({
        name: 'pointer-fine',
        handler: (selector) => selector,
        wrapper: '@media (pointer: fine)',
      })
      variants.push({
        name: 'pointer-coarse',
        handler: (selector) => selector,
        wrapper: '@media (pointer: coarse)',
      })
      variants.push({
        name: 'pointer-none',
        handler: (selector) => selector,
        wrapper: '@media (pointer: none)',
      })
      variants.push({
        name: 'any-pointer-fine',
        handler: (selector) => selector,
        wrapper: '@media (any-pointer: fine)',
      })
      variants.push({
        name: 'any-pointer-coarse',
        handler: (selector) => selector,
        wrapper: '@media (any-pointer: coarse)',
      })

      // Hover capability
      variants.push({
        name: 'hover-hover',
        handler: (selector) => selector,
        wrapper: '@media (hover: hover)',
      })
      variants.push({
        name: 'hover-none',
        handler: (selector) => selector,
        wrapper: '@media (hover: none)',
      })
      variants.push({
        name: 'any-hover-hover',
        handler: (selector) => selector,
        wrapper: '@media (any-hover: hover)',
      })
      variants.push({
        name: 'any-hover-none',
        handler: (selector) => selector,
        wrapper: '@media (any-hover: none)',
      })

      // Update frequency
      variants.push({
        name: 'update-fast',
        handler: (selector) => selector,
        wrapper: '@media (update: fast)',
      })
      variants.push({
        name: 'update-slow',
        handler: (selector) => selector,
        wrapper: '@media (update: slow)',
      })
      variants.push({
        name: 'update-none',
        handler: (selector) => selector,
        wrapper: '@media (update: none)',
      })

      // Color scheme preference
      variants.push({
        name: 'prefer-light',
        handler: (selector) => selector,
        wrapper: '@media (prefers-color-scheme: light)',
      })
      variants.push({
        name: 'prefer-dark',
        handler: (selector) => selector,
        wrapper: '@media (prefers-color-scheme: dark)',
      })

      // Dynamic range (HDR)
      variants.push({
        name: 'hdr',
        handler: (selector) => selector,
        wrapper: '@media (dynamic-range: high)',
      })
      variants.push({
        name: 'sdr',
        handler: (selector) => selector,
        wrapper: '@media (dynamic-range: standard)',
      })
      variants.push({
        name: 'video-hdr',
        handler: (selector) => selector,
        wrapper: '@media (video-dynamic-range: high)',
      })
      variants.push({
        name: 'video-sdr',
        handler: (selector) => selector,
        wrapper: '@media (video-dynamic-range: standard)',
      })

      // ========================================
      // DIRECTIONAL VARIANTS
      // ========================================

      variants.push({
        name: 'rtl',
        handler: (selector) => `[dir="rtl"] ${selector}, ${selector}:dir(rtl)`,
      })
      variants.push({
        name: 'ltr',
        handler: (selector) => `[dir="ltr"] ${selector}, ${selector}:dir(ltr)`,
      })

      // ========================================
      // OPEN/CLOSED STATE VARIANTS
      // ========================================

      variants.push({
        name: 'open',
        handler: (selector) => `${selector}[open], ${selector}:open`,
      })
      variants.push({
        name: 'closed',
        handler: (selector) => `${selector}:not([open]), ${selector}:closed`,
      })
      variants.push({
        name: 'details-open',
        handler: (selector) => `details[open] ${selector}`,
      })
      variants.push({
        name: 'dialog-open',
        handler: (selector) => `dialog[open] ${selector}`,
      })

      // ========================================
      // PSEUDO-ELEMENT VARIANTS
      // ========================================

      variants.push({
        name: 'selection',
        handler: (selector) => `${selector}::selection`,
      })
      variants.push({
        name: 'first-letter',
        handler: (selector) => `${selector}::first-letter`,
      })
      variants.push({
        name: 'first-line',
        handler: (selector) => `${selector}::first-line`,
      })
      variants.push({
        name: 'backdrop',
        handler: (selector) => `${selector}::backdrop`,
      })
      variants.push({
        name: 'marker',
        handler: (selector) => `${selector}::marker`,
      })
      variants.push({
        name: 'placeholder',
        handler: (selector) => `${selector}::placeholder`,
      })

      // File selector button
      variants.push({
        name: 'file',
        handler: (selector) => `${selector}::file-selector-button`,
      })
      variants.push({
        name: 'file-hover',
        handler: (selector) => `${selector}::file-selector-button:hover`,
      })

      // Cue variants
      variants.push({
        name: 'cue',
        handler: (selector) => `${selector}::cue`,
      })
      variants.push({
        name: 'cue-region',
        handler: (selector) => `${selector}::cue-region`,
      })

      // Grammar/spelling
      variants.push({
        name: 'grammar-error',
        handler: (selector) => `${selector}::grammar-error`,
      })
      variants.push({
        name: 'spelling-error',
        handler: (selector) => `${selector}::spelling-error`,
      })

      // ========================================
      // FORM STATE PSEUDO-CLASS VARIANTS
      // ========================================

      variants.push({
        name: 'autofill',
        handler: (selector) => `${selector}:autofill`,
      })
      variants.push({
        name: '-webkit-autofill',
        handler: (selector) => `${selector}:-webkit-autofill`,
      })
      variants.push({
        name: 'blank',
        handler: (selector) => `${selector}:blank`,
      })
      variants.push({
        name: 'user-invalid',
        handler: (selector) => `${selector}:user-invalid`,
      })
      variants.push({
        name: 'user-valid',
        handler: (selector) => `${selector}:user-valid`,
      })

      // Link states
      variants.push({
        name: 'any-link',
        handler: (selector) => `${selector}:any-link`,
      })
      variants.push({
        name: 'local-link',
        handler: (selector) => `${selector}:local-link`,
      })

      // ========================================
      // MEDIA STATE VARIANTS
      // ========================================

      const mediaStates = ['playing', 'paused', 'seeking', 'buffering', 'stalled', 'muted', 'volume-locked']
      for (const state of mediaStates) {
        variants.push({
          name: state,
          handler: (selector) => `${selector}:${state}`,
        })
      }

      // ========================================
      // TIMELINE STATE VARIANTS
      // ========================================

      variants.push({
        name: 'past',
        handler: (selector) => `${selector}:past`,
      })
      variants.push({
        name: 'current',
        handler: (selector) => `${selector}:current`,
      })
      variants.push({
        name: 'future',
        handler: (selector) => `${selector}:future`,
      })

      // ========================================
      // STRUCTURAL VARIANTS
      // ========================================

      variants.push({
        name: 'only',
        handler: (selector) => `${selector}:only-child`,
      })
      variants.push({
        name: 'first-of-type',
        handler: (selector) => `${selector}:first-of-type`,
      })
      variants.push({
        name: 'last-of-type',
        handler: (selector) => `${selector}:last-of-type`,
      })
      variants.push({
        name: 'only-of-type',
        handler: (selector) => `${selector}:only-of-type`,
      })

      // nth-child variants
      for (let i = 2; i <= 10; i++) {
        variants.push({
          name: `nth-${i}`,
          handler: (selector) => `${selector}:nth-child(${i})`,
        })
        variants.push({
          name: `nth-last-${i}`,
          handler: (selector) => `${selector}:nth-last-child(${i})`,
        })
      }

      // ========================================
      // TARGET VARIANTS
      // ========================================

      variants.push({
        name: 'target',
        handler: (selector) => `${selector}:target`,
      })
      variants.push({
        name: 'target-within',
        handler: (selector) => `${selector}:target-within`,
      })

      // ========================================
      // SCOPE VARIANT
      // ========================================

      variants.push({
        name: 'scope',
        handler: (selector) => `${selector}:scope`,
      })

      // ========================================
      // SHADOW DOM VARIANTS
      // ========================================

      variants.push({
        name: 'host',
        handler: (selector) => `:host(${selector})`,
      })
      variants.push({
        name: 'host-context',
        handler: (selector) => `:host-context(${selector})`,
      })
      variants.push({
        name: 'slotted',
        handler: (selector) => `::slotted(${selector})`,
      })

      // ========================================
      // CUSTOM ELEMENT VARIANTS
      // ========================================

      variants.push({
        name: 'defined',
        handler: (selector) => `${selector}:defined`,
      })

      // ========================================
      // FULLSCREEN VARIANTS
      // ========================================

      variants.push({
        name: 'fullscreen',
        handler: (selector) => `${selector}:fullscreen`,
      })
      variants.push({
        name: '-webkit-fullscreen',
        handler: (selector) => `${selector}:-webkit-full-screen`,
      })
      variants.push({
        name: 'not-fullscreen',
        handler: (selector) => `${selector}:not(:fullscreen)`,
      })

      // ========================================
      // POPOVER VARIANTS
      // ========================================

      variants.push({
        name: 'popover-open',
        handler: (selector) => `${selector}:popover-open`,
      })

      // ========================================
      // PICTURE-IN-PICTURE VARIANT
      // ========================================

      variants.push({
        name: 'pip',
        handler: (selector) => `${selector}:picture-in-picture`,
      })

      // ========================================
      // STICKY STATE VARIANTS
      // ========================================

      variants.push({
        name: 'stuck',
        handler: (selector) => `${selector}[data-stuck]`,
      })
      variants.push({
        name: 'stuck-top',
        handler: (selector) => `${selector}[data-stuck="top"]`,
      })
      variants.push({
        name: 'stuck-bottom',
        handler: (selector) => `${selector}[data-stuck="bottom"]`,
      })

      // ========================================
      // VIEW TIMELINE VARIANTS
      // ========================================

      variants.push({
        name: 'in-view',
        handler: (selector) => `${selector}[data-in-view]`,
      })
      variants.push({
        name: 'out-of-view',
        handler: (selector) => `${selector}:not([data-in-view])`,
      })

      // ========================================
      // ANIMATION STATE VARIANTS
      // ========================================

      variants.push({
        name: 'animating',
        handler: (selector) => `${selector}[data-animating]`,
      })
      variants.push({
        name: 'animation-paused',
        handler: (selector) => `${selector}[data-animation-state="paused"]`,
      })
      variants.push({
        name: 'animation-running',
        handler: (selector) => `${selector}[data-animation-state="running"]`,
      })

      // ========================================
      // OVERFLOWING STATE VARIANTS
      // ========================================

      variants.push({
        name: 'overflowing',
        handler: (selector) => `${selector}[data-overflowing]`,
      })
      variants.push({
        name: 'overflowing-x',
        handler: (selector) => `${selector}[data-overflowing-x]`,
      })
      variants.push({
        name: 'overflowing-y',
        handler: (selector) => `${selector}[data-overflowing-y]`,
      })
      variants.push({
        name: 'truncated',
        handler: (selector) => `${selector}[data-truncated]`,
      })

      // ========================================
      // :has() PSEUDO-CLASS VARIANTS
      // ========================================

      const hasVariants = [
        { name: 'has-checked', selector: ':checked' },
        { name: 'has-unchecked', selector: ':not(:checked)' },
        { name: 'has-focus', selector: ':focus' },
        { name: 'has-focus-within', selector: ':focus-within' },
        { name: 'has-focus-visible', selector: ':focus-visible' },
        { name: 'has-hover', selector: ':hover' },
        { name: 'has-active', selector: ':active' },
        { name: 'has-disabled', selector: ':disabled' },
        { name: 'has-enabled', selector: ':enabled' },
        { name: 'has-valid', selector: ':valid' },
        { name: 'has-invalid', selector: ':invalid' },
        { name: 'has-empty', selector: ':empty' },
        { name: 'has-required', selector: ':required' },
        { name: 'has-optional', selector: ':optional' },
        { name: 'has-placeholder-shown', selector: ':placeholder-shown' },
      ]

      for (const { name, selector: sel } of hasVariants) {
        variants.push({
          name,
          handler: (selector) => `${selector}:has(${sel})`,
        })
      }

      // ARIA :has() variants
      const hasAriaVariants = [
        { name: 'has-aria-expanded', selector: '[aria-expanded="true"]' },
        { name: 'has-aria-checked', selector: '[aria-checked="true"]' },
        { name: 'has-aria-selected', selector: '[aria-selected="true"]' },
      ]

      for (const { name, selector: sel } of hasAriaVariants) {
        variants.push({
          name,
          handler: (selector) => `${selector}:has(${sel})`,
        })
      }

      // Data :has() variants
      const hasDataVariants = [
        { name: 'has-data-open', selector: '[data-state="open"]' },
        { name: 'has-data-active', selector: '[data-state="active"]' },
        { name: 'has-data-checked', selector: '[data-state="checked"]' },
      ]

      for (const { name, selector: sel } of hasDataVariants) {
        variants.push({
          name,
          handler: (selector) => `${selector}:has(${sel})`,
        })
      }

      // Element :has() variants
      const hasElementVariants = [
        { name: 'has-img', selector: 'img' },
        { name: 'has-svg', selector: 'svg' },
        { name: 'has-input', selector: 'input' },
        { name: 'has-video', selector: 'video' },
        { name: 'has-audio', selector: 'audio' },
        { name: 'has-iframe', selector: 'iframe' },
        { name: 'has-textarea', selector: 'textarea' },
        { name: 'has-select', selector: 'select' },
        { name: 'has-button', selector: 'button' },
      ]

      for (const { name, selector: sel } of hasElementVariants) {
        variants.push({
          name,
          handler: (selector) => `${selector}:has(${sel})`,
        })
      }

      // Special :has() variants
      variants.push({
        name: 'has-children',
        handler: (selector) => `${selector}:has(> *)`,
      })
      variants.push({
        name: 'has-no-children',
        handler: (selector) => `${selector}:not(:has(> *))`,
      })
      variants.push({
        name: 'has-next',
        handler: (selector) => `${selector}:has(+ *)`,
      })
      variants.push({
        name: 'has-no-next',
        handler: (selector) => `${selector}:not(:has(+ *))`,
      })

      // ========================================
      // :not() PSEUDO-CLASS VARIANTS
      // ========================================

      const notVariants = [
        { name: 'not-first', selector: ':first-child' },
        { name: 'not-last', selector: ':last-child' },
        { name: 'not-only', selector: ':only-child' },
        { name: 'not-empty', selector: ':empty' },
        { name: 'not-disabled', selector: ':disabled' },
        { name: 'not-checked', selector: ':checked' },
      ]

      for (const { name, selector: sel } of notVariants) {
        variants.push({
          name,
          handler: (selector) => `${selector}:not(${sel})`,
        })
      }

      // ========================================
      // @supports FEATURE QUERY VARIANTS
      // ========================================

      const supportFeatures = [
        { name: 'grid', feature: 'display: grid' },
        { name: 'flex', feature: 'display: flex' },
        { name: 'container', feature: 'container-type: inline-size' },
        { name: 'has', feature: 'selector(:has(*))' },
        { name: 'backdrop-blur', feature: 'backdrop-filter: blur(1px)' },
        { name: 'scroll-timeline', feature: 'animation-timeline: scroll()' },
        { name: 'field-sizing', feature: 'field-sizing: content' },
        { name: 'anchor', feature: 'anchor-name: --foo' },
      ]
      variants.push(...createSupportsVariants(supportFeatures))
      variants.push(...createSupportsVariants(supportFeatures, true))

      // Arbitrary @supports
      variants.push({
        name: 'supports',
        match: /^supports-\[([^\]]+)\]$/,
        handler: (selector) => selector,
        wrapper: (matches: RegExpMatchArray | null) => {
          if (!matches || !matches[1]) { return '' }
          const condition = matches[1]!.replace(/_/g, ' ')
          if (condition.startsWith('selector(')) {
            return `@supports ${condition}`
          }
          if (condition.includes(':')) {
            const [prop, val] = condition.split(':')
            return `@supports (${prop}: ${val})`
          }
          return `@supports (${condition})`
        },
      })

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
      // CSS PSEUDO-CLASS VARIANTS (not-, is-, where-, has-)
      // ========================================

      variants.push({
        name: 'not',
        match: /^not-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const pseudo = matches[1]!
          return `${selector}:not(${pseudo.replace(/_/g, ' ')})`
        },
      })

      variants.push({
        name: 'is',
        match: /^is-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const content = matches[1]!
          return `${selector}:is(${content.replace(/_/g, ' ')})`
        },
      })

      variants.push({
        name: 'where',
        match: /^where-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const content = matches[1]!
          return `${selector}:where(${content.replace(/_/g, ' ')})`
        },
      })

      variants.push({
        name: 'has',
        match: /^has-\[([^\]]+)\]$/,
        handler: (selector, matches) => {
          if (!matches || !matches[1]) {return selector}
          const content = matches[1]!
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
