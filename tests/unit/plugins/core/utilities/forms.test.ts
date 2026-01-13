/**
 * Tests for Form Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { formsPlugin } from '../../../../../src/plugins/core/utilities/forms'

describe('Forms Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = formsPlugin()
      expect(plugin.name).toBe('forms')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Resize Utilities', () => {
    it('should generate resize-none', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-none'])
      expect(css).toContain('resize: none')
    })

    it('should generate resize', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize'])
      expect(css).toContain('resize: both')
    })

    it('should generate resize-x', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-x'])
      expect(css).toContain('resize: horizontal')
    })

    it('should generate resize-y', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-y'])
      expect(css).toContain('resize: vertical')
    })
  })

  describe('Autocomplete Utilities', () => {
    it('should generate autocomplete-on', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-on'])
      expect(css).toContain('autocomplete: on')
    })

    it('should generate autocomplete-off', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-off'])
      expect(css).toContain('autocomplete: off')
    })

    it('should generate autocomplete-email', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-email'])
      expect(css).toContain('autocomplete: email')
    })

    it('should generate autocomplete-username', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-username'])
      expect(css).toContain('autocomplete: username')
    })

    it('should generate autocomplete-password', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-password'])
      expect(css).toContain('autocomplete: current-password')
    })

    it('should generate autocomplete-new-password', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-new-password'])
      expect(css).toContain('autocomplete: new-password')
    })

    it('should generate autocomplete-tel', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-tel'])
      expect(css).toContain('autocomplete: tel')
    })

    it('should generate autocomplete-url', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-url'])
      expect(css).toContain('autocomplete: url')
    })

    it('should generate autocomplete-search', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-search'])
      expect(css).toContain('autocomplete: off')
    })
  })

  describe('Input Mode Utilities', () => {
    it('should generate inputmode-none', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-none'])
      expect(css).toContain('inputmode: none')
    })

    it('should generate inputmode-text', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-text'])
      expect(css).toContain('inputmode: text')
    })

    it('should generate inputmode-decimal', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-decimal'])
      expect(css).toContain('inputmode: decimal')
    })

    it('should generate inputmode-numeric', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-numeric'])
      expect(css).toContain('inputmode: numeric')
    })

    it('should generate inputmode-tel', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-tel'])
      expect(css).toContain('inputmode: tel')
    })

    it('should generate inputmode-email', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-email'])
      expect(css).toContain('inputmode: email')
    })

    it('should generate inputmode-url', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-url'])
      expect(css).toContain('inputmode: url')
    })

    it('should generate inputmode-search', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['inputmode-search'])
      expect(css).toContain('inputmode: search')
    })
  })

  describe('Enter Key Hint Utilities', () => {
    it('should generate enterkeyhint-enter', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-enter'])
      expect(css).toContain('enterkeyhint: enter')
    })

    it('should generate enterkeyhint-done', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-done'])
      expect(css).toContain('enterkeyhint: done')
    })

    it('should generate enterkeyhint-go', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-go'])
      expect(css).toContain('enterkeyhint: go')
    })

    it('should generate enterkeyhint-next', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-next'])
      expect(css).toContain('enterkeyhint: next')
    })

    it('should generate enterkeyhint-previous', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-previous'])
      expect(css).toContain('enterkeyhint: previous')
    })

    it('should generate enterkeyhint-search', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-search'])
      expect(css).toContain('enterkeyhint: search')
    })

    it('should generate enterkeyhint-send', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['enterkeyhint-send'])
      expect(css).toContain('enterkeyhint: send')
    })
  })

  describe('Cursor Utilities', () => {
    it('should generate cursor-not-allowed', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['cursor-not-allowed'])
      expect(css).toContain('cursor: not-allowed')
    })

    it('should generate cursor-default', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['cursor-default'])
      expect(css).toContain('cursor: default')
    })
  })

  describe('Spell Check Utilities', () => {
    it('should generate spellcheck', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['spellcheck'])
      expect(css).toContain('spellcheck: true')
    })

    it('should generate spellcheck-false', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['spellcheck-false'])
      expect(css).toContain('spellcheck: false')
    })
  })

  describe('Form State Variants (Pseudo-class markers)', () => {
    it('should generate required marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['required'])
      expect(css).toContain('&:required')
      expect(css).toContain('content: ""')
    })

    it('should generate optional marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['optional'])
      expect(css).toContain('&:optional')
      expect(css).toContain('content: ""')
    })

    it('should generate valid marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['valid'])
      expect(css).toContain('&:valid')
      expect(css).toContain('content: ""')
    })

    it('should generate invalid marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['invalid'])
      expect(css).toContain('&:invalid')
      expect(css).toContain('content: ""')
    })

    it('should generate in-range marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['in-range'])
      expect(css).toContain('&:in-range')
      expect(css).toContain('content: ""')
    })

    it('should generate out-of-range marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['out-of-range'])
      expect(css).toContain('&:out-of-range')
      expect(css).toContain('content: ""')
    })

    it('should generate placeholder-shown marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['placeholder-shown'])
      expect(css).toContain('&:placeholder-shown')
      expect(css).toContain('content: ""')
    })

    it('should generate autofill marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autofill'])
      expect(css).toContain('&:-webkit-autofill')
      expect(css).toContain('content: ""')
    })
  })

  describe('Read-only and Disabled State Markers', () => {
    it('should generate read-only marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['read-only'])
      expect(css).toContain('&:read-only')
      expect(css).toContain('content: ""')
    })

    it('should generate disabled marker', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['disabled'])
      expect(css).toContain('&:disabled')
      expect(css).toContain('content: ""')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate resizable textarea', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-y', 'w-full'])
      expect(css).toContain('resize: vertical')
    })

    it('should generate non-resizable textarea', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-none'])
      expect(css).toContain('resize: none')
    })

    it('should generate email input with proper autocomplete', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-email', 'inputmode-email'])
      expect(css).toContain('autocomplete: email')
      expect(css).toContain('inputmode: email')
    })

    it('should generate password input with proper autocomplete', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['autocomplete-password', 'enterkeyhint-enter'])
      expect(css).toContain('autocomplete: current-password')
      expect(css).toContain('enterkeyhint: enter')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [formsPlugin()] })
      const css = coral.generate(['resize-y'])
      expect(css).toContain('resize: vertical')
    })
  })
})
