/**
 * State Variants Plugin
 *
 * ARIA attribute and data attribute variants.
 * Provides aria-*, data-* variants for accessible and state-driven styling.
 * @module plugins/core/variants/state
 */

import type { Plugin, Variant, PluginContext } from '../../../types'

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

      // aria-checked
      variants.push({
        name: 'aria-checked',
        handler: (selector) => `${selector}[aria-checked="true"]`,
      })
      variants.push({
        name: 'aria-not-checked',
        handler: (selector) => `${selector}[aria-checked="false"]`,
      })
      variants.push({
        name: 'aria-mixed',
        handler: (selector) => `${selector}[aria-checked="mixed"]`,
      })

      // aria-disabled
      variants.push({
        name: 'aria-disabled',
        handler: (selector) => `${selector}[aria-disabled="true"]`,
      })
      variants.push({
        name: 'aria-enabled',
        handler: (selector) => `${selector}[aria-disabled="false"]`,
      })

      // aria-expanded
      variants.push({
        name: 'aria-expanded',
        handler: (selector) => `${selector}[aria-expanded="true"]`,
      })
      variants.push({
        name: 'aria-collapsed',
        handler: (selector) => `${selector}[aria-expanded="false"]`,
      })

      // aria-hidden
      variants.push({
        name: 'aria-hidden',
        handler: (selector) => `${selector}[aria-hidden="true"]`,
      })
      variants.push({
        name: 'aria-visible',
        handler: (selector) => `${selector}[aria-hidden="false"]`,
      })

      // aria-pressed
      variants.push({
        name: 'aria-pressed',
        handler: (selector) => `${selector}[aria-pressed="true"]`,
      })
      variants.push({
        name: 'aria-not-pressed',
        handler: (selector) => `${selector}[aria-pressed="false"]`,
      })

      // aria-selected
      variants.push({
        name: 'aria-selected',
        handler: (selector) => `${selector}[aria-selected="true"]`,
      })
      variants.push({
        name: 'aria-not-selected',
        handler: (selector) => `${selector}[aria-selected="false"]`,
      })

      // aria-current
      variants.push({
        name: 'aria-current',
        handler: (selector) => `${selector}[aria-current="true"]`,
      })
      variants.push({
        name: 'aria-current-page',
        handler: (selector) => `${selector}[aria-current="page"]`,
      })
      variants.push({
        name: 'aria-current-step',
        handler: (selector) => `${selector}[aria-current="step"]`,
      })
      variants.push({
        name: 'aria-current-location',
        handler: (selector) => `${selector}[aria-current="location"]`,
      })
      variants.push({
        name: 'aria-current-date',
        handler: (selector) => `${selector}[aria-current="date"]`,
      })
      variants.push({
        name: 'aria-current-time',
        handler: (selector) => `${selector}[aria-current="time"]`,
      })

      // aria-grabbed
      variants.push({
        name: 'aria-grabbed',
        handler: (selector) => `${selector}[aria-grabbed="true"]`,
      })
      variants.push({
        name: 'aria-not-grabbed',
        handler: (selector) => `${selector}[aria-grabbed="false"]`,
      })

      // aria-busy
      variants.push({
        name: 'aria-busy',
        handler: (selector) => `${selector}[aria-busy="true"]`,
      })
      variants.push({
        name: 'aria-not-busy',
        handler: (selector) => `${selector}[aria-busy="false"]`,
      })

      // aria-live
      variants.push({
        name: 'aria-live-polite',
        handler: (selector) => `${selector}[aria-live="polite"]`,
      })
      variants.push({
        name: 'aria-live-assertive',
        handler: (selector) => `${selector}[aria-live="assertive"]`,
      })
      variants.push({
        name: 'aria-live-off',
        handler: (selector) => `${selector}[aria-live="off"]`,
      })

      // aria-invalid
      variants.push({
        name: 'aria-invalid',
        handler: (selector) => `${selector}[aria-invalid="true"]`,
      })
      variants.push({
        name: 'aria-valid',
        handler: (selector) => `${selector}[aria-invalid="false"]`,
      })
      variants.push({
        name: 'aria-invalid-grammar',
        handler: (selector) => `${selector}[aria-invalid="grammar"]`,
      })
      variants.push({
        name: 'aria-invalid-spelling',
        handler: (selector) => `${selector}[aria-invalid="spelling"]`,
      })

      // aria-required
      variants.push({
        name: 'aria-required',
        handler: (selector) => `${selector}[aria-required="true"]`,
      })
      variants.push({
        name: 'aria-optional',
        handler: (selector) => `${selector}[aria-required="false"]`,
      })

      // aria-readonly
      variants.push({
        name: 'aria-readonly',
        handler: (selector) => `${selector}[aria-readonly="true"]`,
      })
      variants.push({
        name: 'aria-editable',
        handler: (selector) => `${selector}[aria-readonly="false"]`,
      })

      // aria-sort
      variants.push({
        name: 'aria-sort-ascending',
        handler: (selector) => `${selector}[aria-sort="ascending"]`,
      })
      variants.push({
        name: 'aria-sort-descending',
        handler: (selector) => `${selector}[aria-sort="descending"]`,
      })
      variants.push({
        name: 'aria-sort-none',
        handler: (selector) => `${selector}[aria-sort="none"]`,
      })
      variants.push({
        name: 'aria-sort-other',
        handler: (selector) => `${selector}[aria-sort="other"]`,
      })

      // aria-orientation
      variants.push({
        name: 'aria-horizontal',
        handler: (selector) => `${selector}[aria-orientation="horizontal"]`,
      })
      variants.push({
        name: 'aria-vertical',
        handler: (selector) => `${selector}[aria-orientation="vertical"]`,
      })

      // aria-autocomplete
      variants.push({
        name: 'aria-autocomplete-none',
        handler: (selector) => `${selector}[aria-autocomplete="none"]`,
      })
      variants.push({
        name: 'aria-autocomplete-list',
        handler: (selector) => `${selector}[aria-autocomplete="list"]`,
      })
      variants.push({
        name: 'aria-autocomplete-inline',
        handler: (selector) => `${selector}[aria-autocomplete="inline"]`,
      })
      variants.push({
        name: 'aria-autocomplete-both',
        handler: (selector) => `${selector}[aria-autocomplete="both"]`,
      })

      // aria-haspopup
      variants.push({
        name: 'aria-haspopup',
        handler: (selector) => `${selector}[aria-haspopup="true"]`,
      })
      variants.push({
        name: 'aria-haspopup-menu',
        handler: (selector) => `${selector}[aria-haspopup="menu"]`,
      })
      variants.push({
        name: 'aria-haspopup-dialog',
        handler: (selector) => `${selector}[aria-haspopup="dialog"]`,
      })
      variants.push({
        name: 'aria-haspopup-listbox',
        handler: (selector) => `${selector}[aria-haspopup="listbox"]`,
      })
      variants.push({
        name: 'aria-haspopup-tree',
        handler: (selector) => `${selector}[aria-haspopup="tree"]`,
      })
      variants.push({
        name: 'aria-haspopup-grid',
        handler: (selector) => `${selector}[aria-haspopup="grid"]`,
      })

      // aria-modal
      variants.push({
        name: 'aria-modal',
        handler: (selector) => `${selector}[aria-modal="true"]`,
      })

      // aria-multiselectable
      variants.push({
        name: 'aria-multiselectable',
        handler: (selector) => `${selector}[aria-multiselectable="true"]`,
      })

      // aria-multiline
      variants.push({
        name: 'aria-multiline',
        handler: (selector) => `${selector}[aria-multiline="true"]`,
      })

      // ========================================
      // Common Data Attribute Variants
      // ========================================

      // data-state (common in headless UI)
      variants.push({
        name: 'data-open',
        handler: (selector) => `${selector}[data-state="open"]`,
      })
      variants.push({
        name: 'data-closed',
        handler: (selector) => `${selector}[data-state="closed"]`,
      })
      variants.push({
        name: 'data-active',
        handler: (selector) => `${selector}[data-state="active"]`,
      })
      variants.push({
        name: 'data-inactive',
        handler: (selector) => `${selector}[data-state="inactive"]`,
      })
      variants.push({
        name: 'data-checked',
        handler: (selector) => `${selector}[data-state="checked"]`,
      })
      variants.push({
        name: 'data-unchecked',
        handler: (selector) => `${selector}[data-state="unchecked"]`,
      })
      variants.push({
        name: 'data-indeterminate',
        handler: (selector) => `${selector}[data-state="indeterminate"]`,
      })
      variants.push({
        name: 'data-on',
        handler: (selector) => `${selector}[data-state="on"]`,
      })
      variants.push({
        name: 'data-off',
        handler: (selector) => `${selector}[data-state="off"]`,
      })

      // data-orientation
      variants.push({
        name: 'data-horizontal',
        handler: (selector) => `${selector}[data-orientation="horizontal"]`,
      })
      variants.push({
        name: 'data-vertical',
        handler: (selector) => `${selector}[data-orientation="vertical"]`,
      })

      // data-side (popover positioning)
      variants.push({
        name: 'data-side-top',
        handler: (selector) => `${selector}[data-side="top"]`,
      })
      variants.push({
        name: 'data-side-bottom',
        handler: (selector) => `${selector}[data-side="bottom"]`,
      })
      variants.push({
        name: 'data-side-left',
        handler: (selector) => `${selector}[data-side="left"]`,
      })
      variants.push({
        name: 'data-side-right',
        handler: (selector) => `${selector}[data-side="right"]`,
      })

      // data-align (popover alignment)
      variants.push({
        name: 'data-align-start',
        handler: (selector) => `${selector}[data-align="start"]`,
      })
      variants.push({
        name: 'data-align-center',
        handler: (selector) => `${selector}[data-align="center"]`,
      })
      variants.push({
        name: 'data-align-end',
        handler: (selector) => `${selector}[data-align="end"]`,
      })

      // data-disabled
      variants.push({
        name: 'data-disabled',
        handler: (selector) => `${selector}[data-disabled]`,
      })

      // data-highlighted (for dropdown/combobox items)
      variants.push({
        name: 'data-highlighted',
        handler: (selector) => `${selector}[data-highlighted]`,
      })

      // data-selected
      variants.push({
        name: 'data-selected',
        handler: (selector) => `${selector}[data-selected]`,
      })

      // data-placeholder (for select)
      variants.push({
        name: 'data-placeholder',
        handler: (selector) => `${selector}[data-placeholder]`,
      })

      // data-loading
      variants.push({
        name: 'data-loading',
        handler: (selector) => `${selector}[data-loading]`,
      })

      // data-focus
      variants.push({
        name: 'data-focus',
        handler: (selector) => `${selector}[data-focus]`,
      })
      variants.push({
        name: 'data-focus-visible',
        handler: (selector) => `${selector}[data-focus-visible]`,
      })

      // data-pressed
      variants.push({
        name: 'data-pressed',
        handler: (selector) => `${selector}[data-pressed]`,
      })

      // data-dragging
      variants.push({
        name: 'data-dragging',
        handler: (selector) => `${selector}[data-dragging]`,
      })

      // data-resizing
      variants.push({
        name: 'data-resizing',
        handler: (selector) => `${selector}[data-resizing]`,
      })

      // data-swipe
      variants.push({
        name: 'data-swipe-start',
        handler: (selector) => `${selector}[data-swipe="start"]`,
      })
      variants.push({
        name: 'data-swipe-move',
        handler: (selector) => `${selector}[data-swipe="move"]`,
      })
      variants.push({
        name: 'data-swipe-end',
        handler: (selector) => `${selector}[data-swipe="end"]`,
      })
      variants.push({
        name: 'data-swipe-cancel',
        handler: (selector) => `${selector}[data-swipe="cancel"]`,
      })

      // data-swipe-direction
      variants.push({
        name: 'data-swipe-direction-up',
        handler: (selector) => `${selector}[data-swipe-direction="up"]`,
      })
      variants.push({
        name: 'data-swipe-direction-down',
        handler: (selector) => `${selector}[data-swipe-direction="down"]`,
      })
      variants.push({
        name: 'data-swipe-direction-left',
        handler: (selector) => `${selector}[data-swipe-direction="left"]`,
      })
      variants.push({
        name: 'data-swipe-direction-right',
        handler: (selector) => `${selector}[data-swipe-direction="right"]`,
      })

      // ========================================
      // Group ARIA Variants
      // ========================================

      variants.push({
        name: 'group-aria-expanded',
        handler: (selector) => `.group[aria-expanded="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-collapsed',
        handler: (selector) => `.group[aria-expanded="false"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-checked',
        handler: (selector) => `.group[aria-checked="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-selected',
        handler: (selector) => `.group[aria-selected="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-disabled',
        handler: (selector) => `.group[aria-disabled="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-pressed',
        handler: (selector) => `.group[aria-pressed="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-current',
        handler: (selector) => `.group[aria-current="true"] ${selector}`,
      })
      variants.push({
        name: 'group-aria-current-page',
        handler: (selector) => `.group[aria-current="page"] ${selector}`,
      })

      // ========================================
      // Group Data Variants
      // ========================================

      variants.push({
        name: 'group-data-open',
        handler: (selector) => `.group[data-state="open"] ${selector}`,
      })
      variants.push({
        name: 'group-data-closed',
        handler: (selector) => `.group[data-state="closed"] ${selector}`,
      })
      variants.push({
        name: 'group-data-active',
        handler: (selector) => `.group[data-state="active"] ${selector}`,
      })
      variants.push({
        name: 'group-data-checked',
        handler: (selector) => `.group[data-state="checked"] ${selector}`,
      })
      variants.push({
        name: 'group-data-disabled',
        handler: (selector) => `.group[data-disabled] ${selector}`,
      })
      variants.push({
        name: 'group-data-loading',
        handler: (selector) => `.group[data-loading] ${selector}`,
      })

      // ========================================
      // Peer ARIA Variants
      // ========================================

      variants.push({
        name: 'peer-aria-expanded',
        handler: (selector) => `.peer[aria-expanded="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-collapsed',
        handler: (selector) => `.peer[aria-expanded="false"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-checked',
        handler: (selector) => `.peer[aria-checked="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-selected',
        handler: (selector) => `.peer[aria-selected="true"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-aria-disabled',
        handler: (selector) => `.peer[aria-disabled="true"] ~ ${selector}`,
      })

      // ========================================
      // Peer Data Variants
      // ========================================

      variants.push({
        name: 'peer-data-open',
        handler: (selector) => `.peer[data-state="open"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-closed',
        handler: (selector) => `.peer[data-state="closed"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-active',
        handler: (selector) => `.peer[data-state="active"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-checked',
        handler: (selector) => `.peer[data-state="checked"] ~ ${selector}`,
      })
      variants.push({
        name: 'peer-data-disabled',
        handler: (selector) => `.peer[data-disabled] ~ ${selector}`,
      })

      // ========================================
      // :has() ARIA/Data Variants (Modern CSS)
      // ========================================

      variants.push({
        name: 'has-aria-expanded',
        handler: (selector) => `${selector}:has([aria-expanded="true"])`,
      })
      variants.push({
        name: 'has-aria-checked',
        handler: (selector) => `${selector}:has([aria-checked="true"])`,
      })
      variants.push({
        name: 'has-aria-selected',
        handler: (selector) => `${selector}:has([aria-selected="true"])`,
      })
      variants.push({
        name: 'has-data-open',
        handler: (selector) => `${selector}:has([data-state="open"])`,
      })
      variants.push({
        name: 'has-data-active',
        handler: (selector) => `${selector}:has([data-state="active"])`,
      })
      variants.push({
        name: 'has-data-checked',
        handler: (selector) => `${selector}:has([data-state="checked"])`,
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default stateVariantsPlugin
