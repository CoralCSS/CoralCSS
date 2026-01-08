/**
 * Pseudo-class and Pseudo-element Variants Plugin
 *
 * Hover, focus, active, and other pseudo-class variants.
 * @module plugins/core/variants/pseudo
 */

import type { Plugin, Variant, PluginContext } from '../../../types'

/**
 * Pseudo variants plugin
 */
export function pseudoVariantsPlugin(): Plugin {
  return {
    name: 'pseudo-variants',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const variants: Variant[] = []

      // Pseudo-classes
      variants.push({
        name: 'hover',
        handler: (selector) => `${selector}:hover`,
      })
      variants.push({
        name: 'focus',
        handler: (selector) => `${selector}:focus`,
      })
      variants.push({
        name: 'focus-within',
        handler: (selector) => `${selector}:focus-within`,
      })
      variants.push({
        name: 'focus-visible',
        handler: (selector) => `${selector}:focus-visible`,
      })
      variants.push({
        name: 'active',
        handler: (selector) => `${selector}:active`,
      })
      variants.push({
        name: 'visited',
        handler: (selector) => `${selector}:visited`,
      })
      variants.push({
        name: 'target',
        handler: (selector) => `${selector}:target`,
      })

      // First/last/only/odd/even child
      variants.push({
        name: 'first',
        handler: (selector) => `${selector}:first-child`,
      })
      variants.push({
        name: 'last',
        handler: (selector) => `${selector}:last-child`,
      })
      variants.push({
        name: 'only',
        handler: (selector) => `${selector}:only-child`,
      })
      variants.push({
        name: 'odd',
        handler: (selector) => `${selector}:nth-child(odd)`,
      })
      variants.push({
        name: 'even',
        handler: (selector) => `${selector}:nth-child(even)`,
      })

      // First/last of type
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

      // Empty
      variants.push({
        name: 'empty',
        handler: (selector) => `${selector}:empty`,
      })

      // Disabled/enabled
      variants.push({
        name: 'disabled',
        handler: (selector) => `${selector}:disabled`,
      })
      variants.push({
        name: 'enabled',
        handler: (selector) => `${selector}:enabled`,
      })

      // Checked/indeterminate
      variants.push({
        name: 'checked',
        handler: (selector) => `${selector}:checked`,
      })
      variants.push({
        name: 'indeterminate',
        handler: (selector) => `${selector}:indeterminate`,
      })

      // Default
      variants.push({
        name: 'default',
        handler: (selector) => `${selector}:default`,
      })

      // Required/optional
      variants.push({
        name: 'required',
        handler: (selector) => `${selector}:required`,
      })
      variants.push({
        name: 'optional',
        handler: (selector) => `${selector}:optional`,
      })

      // Valid/invalid
      variants.push({
        name: 'valid',
        handler: (selector) => `${selector}:valid`,
      })
      variants.push({
        name: 'invalid',
        handler: (selector) => `${selector}:invalid`,
      })

      // In-range/out-of-range
      variants.push({
        name: 'in-range',
        handler: (selector) => `${selector}:in-range`,
      })
      variants.push({
        name: 'out-of-range',
        handler: (selector) => `${selector}:out-of-range`,
      })

      // Placeholder shown
      variants.push({
        name: 'placeholder-shown',
        handler: (selector) => `${selector}:placeholder-shown`,
      })

      // Autofill
      variants.push({
        name: 'autofill',
        handler: (selector) => `${selector}:autofill`,
      })

      // Read-only/read-write
      variants.push({
        name: 'read-only',
        handler: (selector) => `${selector}:read-only`,
      })
      variants.push({
        name: 'read-write',
        handler: (selector) => `${selector}:read-write`,
      })

      // Dialog open
      variants.push({
        name: 'open',
        handler: (selector) => `${selector}[open]`,
      })

      // Pseudo-elements
      variants.push({
        name: 'before',
        handler: (selector) => `${selector}::before`,
      })
      variants.push({
        name: 'after',
        handler: (selector) => `${selector}::after`,
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
        name: 'marker',
        handler: (selector) => `${selector}::marker`,
      })
      variants.push({
        name: 'selection',
        handler: (selector) => `${selector}::selection`,
      })
      variants.push({
        name: 'file',
        handler: (selector) => `${selector}::file-selector-button`,
      })
      variants.push({
        name: 'backdrop',
        handler: (selector) => `${selector}::backdrop`,
      })
      variants.push({
        name: 'placeholder',
        handler: (selector) => `${selector}::placeholder`,
      })

      // Group variants (for styling based on parent state)
      variants.push({
        name: 'group-hover',
        handler: (selector) => `.group:hover ${selector}`,
      })
      variants.push({
        name: 'group-focus',
        handler: (selector) => `.group:focus ${selector}`,
      })
      variants.push({
        name: 'group-focus-within',
        handler: (selector) => `.group:focus-within ${selector}`,
      })
      variants.push({
        name: 'group-focus-visible',
        handler: (selector) => `.group:focus-visible ${selector}`,
      })
      variants.push({
        name: 'group-active',
        handler: (selector) => `.group:active ${selector}`,
      })
      variants.push({
        name: 'group-visited',
        handler: (selector) => `.group:visited ${selector}`,
      })
      variants.push({
        name: 'group-target',
        handler: (selector) => `.group:target ${selector}`,
      })
      variants.push({
        name: 'group-disabled',
        handler: (selector) => `.group:disabled ${selector}`,
      })
      variants.push({
        name: 'group-checked',
        handler: (selector) => `.group:checked ${selector}`,
      })
      variants.push({
        name: 'group-first',
        handler: (selector) => `.group:first-child ${selector}`,
      })
      variants.push({
        name: 'group-last',
        handler: (selector) => `.group:last-child ${selector}`,
      })
      variants.push({
        name: 'group-odd',
        handler: (selector) => `.group:nth-child(odd) ${selector}`,
      })
      variants.push({
        name: 'group-even',
        handler: (selector) => `.group:nth-child(even) ${selector}`,
      })

      // Peer variants (for styling based on sibling state)
      variants.push({
        name: 'peer-hover',
        handler: (selector) => `.peer:hover ~ ${selector}`,
      })
      variants.push({
        name: 'peer-focus',
        handler: (selector) => `.peer:focus ~ ${selector}`,
      })
      variants.push({
        name: 'peer-focus-within',
        handler: (selector) => `.peer:focus-within ~ ${selector}`,
      })
      variants.push({
        name: 'peer-focus-visible',
        handler: (selector) => `.peer:focus-visible ~ ${selector}`,
      })
      variants.push({
        name: 'peer-active',
        handler: (selector) => `.peer:active ~ ${selector}`,
      })
      variants.push({
        name: 'peer-visited',
        handler: (selector) => `.peer:visited ~ ${selector}`,
      })
      variants.push({
        name: 'peer-target',
        handler: (selector) => `.peer:target ~ ${selector}`,
      })
      variants.push({
        name: 'peer-disabled',
        handler: (selector) => `.peer:disabled ~ ${selector}`,
      })
      variants.push({
        name: 'peer-checked',
        handler: (selector) => `.peer:checked ~ ${selector}`,
      })
      variants.push({
        name: 'peer-invalid',
        handler: (selector) => `.peer:invalid ~ ${selector}`,
      })
      variants.push({
        name: 'peer-required',
        handler: (selector) => `.peer:required ~ ${selector}`,
      })
      variants.push({
        name: 'peer-placeholder-shown',
        handler: (selector) => `.peer:placeholder-shown ~ ${selector}`,
      })

      // Register all variants
      for (const variant of variants) {
        ctx.addVariant(variant)
      }
    },
  }
}

export default pseudoVariantsPlugin
