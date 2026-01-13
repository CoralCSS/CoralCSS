/**
 * Form Utilities Plugin
 *
 * Form state utilities for inputs, selects, textareas, etc.
 * Tailwind 4.1 compatible.
 *
 * @module plugins/core/utilities/forms
 */

import type { Plugin, PluginContext } from '../../../types'

/**
 * Form utilities plugin
 *
 * @example
 * ```html
 * <input class="invalid:border-red-500 valid:border-green-500" />
 *
 * <textarea class="resize-y" />
 *
 * <select class="disabled:opacity-50" />
 * ```
 */
export function formsPlugin(): Plugin {
  return {
    name: 'forms',
    version: '1.0.0',

    install(ctx: PluginContext) {
      // ========================================
      // FORM STATES
      // ========================================

      // Required state
      ctx.addRule({
        pattern: 'required',
        properties: { '&:required': { 'content': '""' } },
      })

      // Optional state
      ctx.addRule({
        pattern: 'optional',
        properties: { '&:optional': { 'content': '""' } },
      })

      // Valid state
      ctx.addRule({
        pattern: 'valid',
        properties: { '&:valid': { 'content': '""' } },
      })

      // Invalid state
      ctx.addRule({
        pattern: 'invalid',
        properties: { '&:invalid': { 'content': '""' } },
      })

      // In-range state (for range/number inputs)
      ctx.addRule({
        pattern: 'in-range',
        properties: { '&:in-range': { 'content': '""' } },
      })

      // Out-of-range state
      ctx.addRule({
        pattern: 'out-of-range',
        properties: { '&:out-of-range': { 'content': '""' } },
      })

      // Placeholder shown state
      ctx.addRule({
        pattern: 'placeholder-shown',
        properties: { '&:placeholder-shown': { 'content': '""' } },
      })

      // Autofill state (browser autofilled)
      ctx.addRule({
        pattern: 'autofill',
        properties: { '&:-webkit-autofill': { 'content': '""' } },
      })

      // ========================================
      // READ-ONLY/DISABLED
      // ========================================

      // Read-only
      ctx.addRule({
        pattern: 'read-only',
        properties: { '&:read-only': { 'content': '""' } },
      })

      // Disabled
      ctx.addRule({
        pattern: 'disabled',
        properties: { '&:disabled': { 'content': '""' } },
      })

      // Disabled cursor
      ctx.addRule({
        pattern: 'cursor-not-allowed',
        properties: { cursor: 'not-allowed' },
      })

      ctx.addRule({
        pattern: 'cursor-default',
        properties: { cursor: 'default' },
      })

      // ========================================
      // RESIZE
      // ========================================

      ctx.addRule({
        pattern: 'resize-none',
        properties: { resize: 'none' },
      })

      ctx.addRule({
        pattern: 'resize',
        properties: { resize: 'both' },
      })

      ctx.addRule({
        pattern: 'resize-x',
        properties: { resize: 'horizontal' },
      })

      ctx.addRule({
        pattern: 'resize-y',
        properties: { resize: 'vertical' },
      })

      // ========================================
      // FILE UPLOAD BUTTON
      // ========================================

      ctx.addRule({
        pattern: 'file:',
        properties: { '&::file-selector-button': { 'content': '""' } },
      })

      // ========================================
      // SPELL CHECK
      // ========================================

      ctx.addRule({
        pattern: 'spellcheck',
        properties: { 'spellcheck': 'true' },
      })

      ctx.addRule({
        pattern: 'spellcheck-false',
        properties: { 'spellcheck': 'false' },
      })

      // ========================================
      // AUTO COMPLETE
      // ========================================

      ctx.addRule({
        pattern: 'autocomplete-on',
        properties: { autocomplete: 'on' },
      })

      ctx.addRule({
        pattern: 'autocomplete-off',
        properties: { autocomplete: 'off' },
      })

      ctx.addRule({
        pattern: 'autocomplete-name',
        properties: { autocomplete: 'name' },
      })

      ctx.addRule({
        pattern: 'autocomplete-email',
        properties: { autocomplete: 'email' },
      })

      ctx.addRule({
        pattern: 'autocomplete-username',
        properties: { autocomplete: 'username' },
      })

      ctx.addRule({
        pattern: 'autocomplete-password',
        properties: { autocomplete: 'current-password' },
      })

      ctx.addRule({
        pattern: 'autocomplete-new-password',
        properties: { autocomplete: 'new-password' },
      })

      ctx.addRule({
        pattern: 'autocomplete-tel',
        properties: { autocomplete: 'tel' },
      })

      ctx.addRule({
        pattern: 'autocomplete-url',
        properties: { autocomplete: 'url' },
      })

      ctx.addRule({
        pattern: 'autocomplete-search',
        properties: { autocomplete: 'off' },
      })

      ctx.addRule({
        pattern: 'autocomplete-street-address',
        properties: { autocomplete: 'street-address' },
      })

      // ========================================
      // INPUT MODE
      // ========================================

      ctx.addRule({
        pattern: 'inputmode-none',
        properties: { inputmode: 'none' },
      })

      ctx.addRule({
        pattern: 'inputmode-text',
        properties: { inputmode: 'text' },
      })

      ctx.addRule({
        pattern: 'inputmode-decimal',
        properties: { inputmode: 'decimal' },
      })

      ctx.addRule({
        pattern: 'inputmode-numeric',
        properties: { inputmode: 'numeric' },
      })

      ctx.addRule({
        pattern: 'inputmode-tel',
        properties: { inputmode: 'tel' },
      })

      ctx.addRule({
        pattern: 'inputmode-email',
        properties: { inputmode: 'email' },
      })

      ctx.addRule({
        pattern: 'inputmode-url',
        properties: { inputmode: 'url' },
      })

      ctx.addRule({
        pattern: 'inputmode-search',
        properties: { inputmode: 'search' },
      })

      // ========================================
      // ENTER KEY HINT
      // ========================================

      ctx.addRule({
        pattern: 'enterkeyhint-enter',
        properties: { enterkeyhint: 'enter' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-done',
        properties: { enterkeyhint: 'done' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-go',
        properties: { enterkeyhint: 'go' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-next',
        properties: { enterkeyhint: 'next' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-previous',
        properties: { enterkeyhint: 'previous' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-search',
        properties: { enterkeyhint: 'search' },
      })

      ctx.addRule({
        pattern: 'enterkeyhint-send',
        properties: { enterkeyhint: 'send' },
      })
    }
  }
}

export default formsPlugin
