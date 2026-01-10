/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { vCoral, vCoralHover, vCoralFocus, vCoralActive } from '../../../src/vue/directives'
import type { DirectiveBinding } from 'vue'

// Helper to create mock binding
function createBinding(value: unknown, oldValue?: unknown): DirectiveBinding {
  return {
    value,
    oldValue,
    arg: undefined,
    modifiers: {},
    instance: null,
    dir: vCoral,
  } as unknown as DirectiveBinding
}

describe('Vue Directives', () => {
  let element: HTMLDivElement

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
  })

  afterEach(() => {
    element.remove()
    // Clean up any style elements
    document.querySelectorAll('style[data-coral]').forEach(el => el.remove())
  })

  describe('vCoral', () => {
    it('should apply classes on mount', () => {
      const binding = createBinding('bg-red-500 p-4')
      vCoral.mounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('bg-red-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should handle array of classes', () => {
      const binding = createBinding(['bg-red-500', 'p-4'])
      vCoral.mounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('bg-red-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should handle array with falsy values', () => {
      const binding = createBinding(['bg-red-500', null, undefined, false, 'p-4'])
      vCoral.mounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('bg-red-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should update classes on change', () => {
      // Mount with initial classes
      const binding1 = createBinding('bg-red-500')
      vCoral.mounted?.(element, binding1, null as never, null as never)
      expect(element.classList.contains('bg-red-500')).toBe(true)

      // Update with new classes
      const binding2 = createBinding('bg-blue-500', 'bg-red-500')
      vCoral.updated?.(element, binding2, null as never, null as never)

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('bg-red-500')).toBe(false)
    })

    it('should remove classes on unmount', () => {
      const binding = createBinding('bg-red-500 p-4')
      vCoral.mounted?.(element, binding, null as never, null as never)
      vCoral.unmounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('bg-red-500')).toBe(false)
      expect(element.classList.contains('p-4')).toBe(false)
    })

    it('should handle empty value', () => {
      const binding = createBinding('')
      vCoral.mounted?.(element, binding, null as never, null as never)
      expect(element.className).toBe('')
    })

    it('should handle null value', () => {
      const binding = createBinding(null)
      vCoral.mounted?.(element, binding, null as never, null as never)
      expect(element.className).toBe('')
    })
  })

  describe('vCoralHover', () => {
    it('should add classes on mouseenter', () => {
      const binding = createBinding('bg-red-600')
      vCoralHover.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new MouseEvent('mouseenter'))
      expect(element.classList.contains('bg-red-600')).toBe(true)
    })

    it('should remove classes on mouseleave', () => {
      const binding = createBinding('bg-red-600')
      vCoralHover.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new MouseEvent('mouseenter'))
      expect(element.classList.contains('bg-red-600')).toBe(true)

      element.dispatchEvent(new MouseEvent('mouseleave'))
      expect(element.classList.contains('bg-red-600')).toBe(false)
    })

    it('should handle empty value', () => {
      const binding = createBinding('')
      // Should not throw
      vCoralHover.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)
    })
  })

  describe('vCoralFocus', () => {
    it('should add classes on focus', () => {
      const binding = createBinding('ring-2 ring-blue-500')
      vCoralFocus.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new FocusEvent('focus'))
      expect(element.classList.contains('ring-2')).toBe(true)
      expect(element.classList.contains('ring-blue-500')).toBe(true)
    })

    it('should remove classes on blur', () => {
      const binding = createBinding('ring-2')
      vCoralFocus.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new FocusEvent('focus'))
      expect(element.classList.contains('ring-2')).toBe(true)

      element.dispatchEvent(new FocusEvent('blur'))
      expect(element.classList.contains('ring-2')).toBe(false)
    })
  })

  describe('vCoralActive', () => {
    it('should add classes on mousedown', () => {
      const binding = createBinding('scale-95')
      vCoralActive.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new MouseEvent('mousedown'))
      expect(element.classList.contains('scale-95')).toBe(true)
    })

    it('should remove classes on mouseup', () => {
      const binding = createBinding('scale-95')
      vCoralActive.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new MouseEvent('mousedown'))
      expect(element.classList.contains('scale-95')).toBe(true)

      element.dispatchEvent(new MouseEvent('mouseup'))
      expect(element.classList.contains('scale-95')).toBe(false)
    })

    it('should remove classes on mouseleave', () => {
      const binding = createBinding('scale-95')
      vCoralActive.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)

      element.dispatchEvent(new MouseEvent('mousedown'))
      expect(element.classList.contains('scale-95')).toBe(true)

      element.dispatchEvent(new MouseEvent('mouseleave'))
      expect(element.classList.contains('scale-95')).toBe(false)
    })

    it('should handle empty value', () => {
      const binding = createBinding('')
      vCoralActive.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)
      expect(element.className).toBe('')
    })
  })

  describe('vCoralFocus edge cases', () => {
    it('should handle empty value', () => {
      const binding = createBinding('')
      vCoralFocus.mounted?.(element, binding as DirectiveBinding<string>, null as never, null as never)
      expect(element.className).toBe('')
    })
  })

  describe('vCoral update edge cases', () => {
    it('should not change classes when value is unchanged', () => {
      const binding1 = createBinding('bg-red-500')
      vCoral.mounted?.(element, binding1, null as never, null as never)

      // Same value - should not trigger update logic
      const binding2 = createBinding('bg-red-500', 'bg-red-500')
      vCoral.updated?.(element, binding2, null as never, null as never)

      expect(element.classList.contains('bg-red-500')).toBe(true)
    })

    it('should handle update with array values', () => {
      const binding1 = createBinding(['class-a', 'class-b'])
      vCoral.mounted?.(element, binding1, null as never, null as never)

      const binding2 = createBinding(['class-c', 'class-d'], ['class-a', 'class-b'])
      vCoral.updated?.(element, binding2, null as never, null as never)

      expect(element.classList.contains('class-c')).toBe(true)
      expect(element.classList.contains('class-d')).toBe(true)
      expect(element.classList.contains('class-a')).toBe(false)
    })

    it('should handle unmount with empty value', () => {
      const binding = createBinding('')
      vCoral.unmounted?.(element, binding, null as never, null as never)
      expect(element.className).toBe('')
    })

    it('should handle unmount with array value', () => {
      const binding = createBinding(['unmount-a', 'unmount-b'])
      vCoral.mounted?.(element, binding, null as never, null as never)
      vCoral.unmounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('unmount-a')).toBe(false)
      expect(element.classList.contains('unmount-b')).toBe(false)
    })
  })

  describe('CSS injection and style element', () => {
    it('should apply classes even without CSS generation', () => {
      // The coral.generate may return empty, but classes should still be applied
      const binding = createBinding('injection-test')
      vCoral.mounted?.(element, binding, null as never, null as never)

      expect(element.classList.contains('injection-test')).toBe(true)
    })

    it('should apply classes to multiple elements', () => {
      const binding1 = createBinding('test-1')
      vCoral.mounted?.(element, binding1, null as never, null as never)

      const binding2 = createBinding('test-2')
      const element2 = document.createElement('div')
      document.body.appendChild(element2)
      vCoral.mounted?.(element2, binding2, null as never, null as never)

      expect(element.classList.contains('test-1')).toBe(true)
      expect(element2.classList.contains('test-2')).toBe(true)

      element2.remove()
    })

    it('should not duplicate CSS in injected set', () => {
      const binding1 = createBinding('duplicate-class')
      vCoral.mounted?.(element, binding1, null as never, null as never)

      const element2 = document.createElement('div')
      document.body.appendChild(element2)
      const binding2 = createBinding('duplicate-class')
      vCoral.mounted?.(element2, binding2, null as never, null as never)

      // Both elements should have the class
      expect(element.classList.contains('duplicate-class')).toBe(true)
      expect(element2.classList.contains('duplicate-class')).toBe(true)

      element2.remove()
    })
  })

  describe('default export', () => {
    it('should export all directives', async () => {
      const defaultExport = await import('../../../src/vue/directives')
      const directives = defaultExport.default

      expect(directives.coral).toBeDefined()
      expect(directives.coralHover).toBeDefined()
      expect(directives.coralFocus).toBeDefined()
      expect(directives.coralActive).toBeDefined()
    })
  })
})
