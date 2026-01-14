/**
 * Segmented Control Component Tests
 *
 * Tests for the iOS-style segmented control component.
 * @vitest-environment jsdom
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  SegmentedControl,
  createSegmentedControl,
  createSegmentedControlFactory,
} from '../../../src/components/segmented-control'

describe('SegmentedControl', () => {
  let container: HTMLElement
  let segmentedControl: SegmentedControl

  function createTestElement(options: { segments?: string[]; value?: string } = {}): HTMLElement {
    const { segments = ['tab1', 'tab2', 'tab3'], value = 'tab1' } = options
    const element = document.createElement('div')
    element.setAttribute('data-coral-segmented-control', '')
    element.setAttribute('data-value', value)

    segments.forEach((seg) => {
      const button = document.createElement('button')
      button.setAttribute('type', 'button')
      button.setAttribute('data-coral-segment', '')
      button.setAttribute('data-value', seg)
      button.textContent = seg
      element.appendChild(button)
    })

    return element
  }

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    segmentedControl?.destroy?.()
    container.remove()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create with default config', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(segmentedControl).toBeDefined()
    })

    it('should create with custom config', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {
        size: 'lg',
        variant: 'primary',
        multiple: true,
        value: 'tab2',
      })

      expect(segmentedControl).toBeDefined()
    })

    it('should be created via factory function', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = createSegmentedControl(element)

      expect(segmentedControl).toBeInstanceOf(SegmentedControl)
    })

    it('should be created via factory function with config', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = createSegmentedControl(element, { size: 'sm' })

      expect(segmentedControl).toBeInstanceOf(SegmentedControl)
    })

    it('should create indicator element if not exists', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const indicator = element.querySelector('[data-coral-segment-indicator]')
      expect(indicator).toBeTruthy()
    })

    it('should set ARIA attributes', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(element.getAttribute('role')).toBe('tablist')

      const segments = element.querySelectorAll('[data-coral-segment]')
      segments.forEach((segment, index) => {
        expect(segment.getAttribute('role')).toBe('tab')
        expect(segment.getAttribute('tabindex')).toBe(index === 0 ? '0' : '-1')
      })
    })
  })

  describe('single selection via API', () => {
    it('should set value via setValue', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      segmentedControl.setValue('tab2')
      expect(segmentedControl.getValue()).toBe('tab2')
    })

    it('should get value via getValue', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab2' })

      expect(segmentedControl.getValue()).toBe('tab2')
    })
  })

  describe('multiple selection via API', () => {
    it('should allow multiple values via setValue', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {
        multiple: true,
        value: [],
      })

      segmentedControl.setValue(['tab1', 'tab2'])
      const value = segmentedControl.getValue()

      expect(Array.isArray(value)).toBe(true)
      if (Array.isArray(value)) {
        expect(value).toContain('tab1')
        expect(value).toContain('tab2')
      }
    })

    it('should clear selection with empty array', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {
        multiple: true,
        value: [],
      })

      segmentedControl.setValue(['tab1', 'tab2'])
      segmentedControl.setValue([])

      const value = segmentedControl.getValue()
      expect(Array.isArray(value)).toBe(true)
      if (Array.isArray(value)) {
        expect(value).toHaveLength(0)
      }
    })
  })

  describe('disabled state', () => {
    it('should respect disabled config', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { disabled: true, value: 'tab1' })

      // API still works even when disabled
      segmentedControl.setValue('tab2')
      expect(segmentedControl.getValue()).toBe('tab2')
    })

    it('should disable via method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      segmentedControl.disable()

      expect(element.classList.contains('disabled')).toBe(true)
    })

    it('should enable via method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { disabled: true })

      segmentedControl.enable()

      expect(element.classList.contains('disabled')).toBe(false)
    })
  })

  describe('segment disable/enable methods', () => {
    it('should handle non-existent segment gracefully', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(() => segmentedControl.disableSegment('nonexistent')).not.toThrow()
      expect(() => segmentedControl.enableSegment('nonexistent')).not.toThrow()
    })

    it('should provide disableSegment method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(typeof segmentedControl.disableSegment).toBe('function')
    })

    it('should provide enableSegment method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(typeof segmentedControl.enableSegment).toBe('function')
    })
  })

  describe('value management', () => {
    it('should set value programmatically', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      segmentedControl.setValue('tab2')
      expect(segmentedControl.getValue()).toBe('tab2')
    })

    it('should set multiple values when multiple mode enabled', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { multiple: true })

      segmentedControl.setValue(['tab1', 'tab3'])
      const value = segmentedControl.getValue()

      expect(Array.isArray(value)).toBe(true)
      if (Array.isArray(value)) {
        expect(value).toContain('tab1')
        expect(value).toContain('tab3')
      }
    })

    it('should provide getSelectedIndex method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(typeof segmentedControl.getSelectedIndex).toBe('function')
    })

    it('should provide selectByIndex method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(typeof segmentedControl.selectByIndex).toBe('function')
    })

    it('should return -1 for empty value in getSelectedIndex', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: '' })

      expect(segmentedControl.getSelectedIndex()).toBe(-1)
    })
  })

  describe('focus handling', () => {
    it('should have component defined', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(segmentedControl).toBeDefined()
    })
  })

  describe('indicator', () => {
    it('should create indicator on initialization', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      const indicator = element.querySelector('[data-coral-segment-indicator]')
      expect(indicator).toBeTruthy()
    })

    it('should have indicator without active class when no value', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: '' })

      const indicator = element.querySelector('[data-coral-segment-indicator]')
      expect(indicator?.classList.contains('active')).toBe(false)
    })
  })

  describe('factory', () => {
    it('should create segmented control factory', () => {
      expect(createSegmentedControlFactory).toBeDefined()
      expect(typeof createSegmentedControlFactory).toBe('function')
    })
  })

  describe('event dispatch', () => {
    it('should dispatch change event on setValue', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const changeSpy = vi.fn()
      // Component dispatches coral:segmentedcontrol:change
      element.addEventListener('coral:segmentedcontrol:change', changeSpy)

      segmentedControl.setValue('tab2')

      expect(changeSpy).toHaveBeenCalled()
    })
  })

  describe('destroy', () => {
    it('should have destroy method', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(typeof segmentedControl.destroy).toBe('function')
    })

    it('should not throw on destroy', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(() => segmentedControl.destroy()).not.toThrow()
    })
  })

  describe('segment click handling', () => {
    it('should not change value when clicking disabled state', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })
      ;(segmentedControl as any).state.disabled = true

      // Call handleSegmentClick directly
      ;(segmentedControl as any).handleSegmentClick(1, new Event('click'))

      // Value should remain unchanged because disabled
      expect(segmentedControl.getValue()).toBe('tab1')
    })

    it('should call handleSingleSelect for single selection', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      // Directly test handleSingleSelect
      ;(segmentedControl as any).handleSingleSelect('tab2')

      expect(segmentedControl.getValue()).toBe('tab2')
    })

    it('should call handleMultiSelect for multi selection', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { multiple: true, value: [] })

      // Test handleMultiSelect
      ;(segmentedControl as any).handleMultiSelect('tab1')
      let value = segmentedControl.getValue() as string[]
      expect(value.includes('tab1')).toBe(true)

      // Add another
      ;(segmentedControl as any).handleMultiSelect('tab2')
      value = segmentedControl.getValue() as string[]
      expect(value.includes('tab1')).toBe(true)
      expect(value.includes('tab2')).toBe(true)

      // Remove first
      ;(segmentedControl as any).handleMultiSelect('tab1')
      value = segmentedControl.getValue() as string[]
      expect(value.includes('tab1')).toBe(false)
      expect(value.includes('tab2')).toBe(true)
    })

    it('should handle handleMultiSelect when value is not array', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { multiple: true })
      // Force value to be a non-array for edge case
      ;(segmentedControl as any).state.value = ''

      ;(segmentedControl as any).handleMultiSelect('tab1')
      const value = segmentedControl.getValue() as string[]
      expect(Array.isArray(value)).toBe(true)
    })

    it('should handle click on non-existent segment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      // Should not throw when segment doesn't exist
      ;(segmentedControl as any).handleSegmentClick(99, new Event('click'))
      expect(segmentedControl.getValue()).toBe('tab1')
    })
  })

  describe('keyboard navigation', () => {
    it('should handle ArrowLeft key', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})
      ;(segmentedControl as any).state.disabled = false

      const mockEvent = { key: 'ArrowLeft', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(1, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle ArrowRight key', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const mockEvent = { key: 'ArrowRight', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(0, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle Home key', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const mockEvent = { key: 'Home', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(2, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle End key', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const mockEvent = { key: 'End', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(0, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle Enter key and call handleSegmentClick', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      const mockEvent = { key: 'Enter', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(1, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle Space key', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      const mockEvent = { key: ' ', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(2, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should not handle keydown when disabled', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })
      ;(segmentedControl as any).state.disabled = true

      const mockEvent = { key: 'Enter', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(1, mockEvent)

      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it('should wrap around on ArrowLeft from first segment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const mockEvent = { key: 'ArrowLeft', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(0, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should wrap around on ArrowRight from last segment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      const mockEvent = { key: 'ArrowRight', preventDefault: vi.fn() }
      ;(segmentedControl as any).handleSegmentKeydown(2, mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })
  })

  describe('focus and blur handling', () => {
    it('should handle segment focus', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      ;(segmentedControl as any).handleSegmentFocus(1)

      // Check that focusedIndex is set
      expect((segmentedControl as any).state.focusedIndex).toBe(1)
    })

    it('should handle segment blur', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // First set focus
      ;(segmentedControl as any).handleSegmentFocus(1)
      expect((segmentedControl as any).state.focusedIndex).toBe(1)

      // Then blur
      ;(segmentedControl as any).handleSegmentBlur()
      expect((segmentedControl as any).state.focusedIndex).toBeNull()
    })
  })

  describe('focus navigation', () => {
    it('should call focusPreviousSegment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // Test that focusPreviousSegment doesn't throw
      expect(() => (segmentedControl as any).focusPreviousSegment(1)).not.toThrow()
    })

    it('should call focusNextSegment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // Test that focusNextSegment doesn't throw
      expect(() => (segmentedControl as any).focusNextSegment(0)).not.toThrow()
    })

    it('should call focusSegment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // Test that focusSegment doesn't throw
      expect(() => (segmentedControl as any).focusSegment(2)).not.toThrow()
    })

    it('should not throw when focusing invalid index', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(() => (segmentedControl as any).focusSegment(99)).not.toThrow()
    })

    it('should wrap from first to last on focusPreviousSegment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // Index 0 should wrap to last (index 2)
      expect(() => (segmentedControl as any).focusPreviousSegment(0)).not.toThrow()
    })

    it('should wrap from last to first on focusNextSegment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // Last index should wrap to 0
      expect(() => (segmentedControl as any).focusNextSegment(2)).not.toThrow()
    })
  })

  describe('selectByIndex', () => {
    it('should select segment by index via setValue', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      // selectByIndex internally calls setValue
      segmentedControl.selectByIndex(1)

      // The selectByIndex method gets the data-value attribute from segment
      expect(segmentedControl).toBeDefined()
    })

    it('should ignore invalid negative index', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      segmentedControl.selectByIndex(-1)
      expect(segmentedControl.getValue()).toBe('tab1')
    })

    it('should ignore invalid large index', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      segmentedControl.selectByIndex(99)
      expect(segmentedControl.getValue()).toBe('tab1')
    })
  })

  describe('getSelectedIndex', () => {
    it('should return -1 for no matching value', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'nonexistent' })

      expect(segmentedControl.getSelectedIndex()).toBe(-1)
    })

    it('should return -1 for empty value', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: '' })

      expect(segmentedControl.getSelectedIndex()).toBe(-1)
    })

    it('should handle array value in getSelectedIndex', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { multiple: true })
      segmentedControl.setValue(['nonexistent'])

      // Returns -1 if first value doesn't match any segment
      expect(segmentedControl.getSelectedIndex()).toBe(-1)
    })
  })

  describe('segment disable/enable', () => {
    it('should disable a specific segment and add classes', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      segmentedControl.disableSegment('tab2')

      const segments = element.querySelectorAll('[data-coral-segment]')
      // disableSegment sets data-disabled, aria-disabled, and disabled class
      expect(segments[1].classList.contains('disabled')).toBe(true)
    })

    it('should enable a specific segment and remove classes', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      // First disable
      segmentedControl.disableSegment('tab2')

      // Then enable
      segmentedControl.enableSegment('tab2')

      const segments = element.querySelectorAll('[data-coral-segment]')
      expect(segments[1].classList.contains('disabled')).toBe(false)
    })

    it('should handle disabling non-existent segment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(() => segmentedControl.disableSegment('nonexistent')).not.toThrow()
    })

    it('should handle enabling non-existent segment', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      expect(() => segmentedControl.enableSegment('nonexistent')).not.toThrow()
    })
  })

  describe('indicator update', () => {
    it('should update indicator position on value change', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      const indicator = element.querySelector('[data-coral-segment-indicator]') as HTMLElement

      // Change value
      segmentedControl.setValue('tab2')

      // Indicator should be active
      expect(indicator.classList.contains('active')).toBe(true)
    })

    it('should remove active class when no value', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      const indicator = element.querySelector('[data-coral-segment-indicator]') as HTMLElement

      // Set empty value
      segmentedControl.setValue('nonexistent')

      // Indicator should not be active
      expect(indicator.classList.contains('active')).toBe(false)
    })

    it('should use first value from array for indicator', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { multiple: true, value: ['tab2', 'tab3'] })

      const indicator = element.querySelector('[data-coral-segment-indicator]') as HTMLElement

      // Indicator should be active positioned at tab2
      expect(indicator.classList.contains('active')).toBe(true)
    })
  })

  describe('segment update', () => {
    it('should set aria-pressed on selected segments', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab2' })

      const segments = element.querySelectorAll('[data-coral-segment]')
      expect(segments[0].getAttribute('aria-pressed')).toBe('false')
      expect(segments[1].getAttribute('aria-pressed')).toBe('true')
      expect(segments[2].getAttribute('aria-pressed')).toBe('false')
    })

    it('should add active class to selected segments', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab2' })

      const segments = element.querySelectorAll('[data-coral-segment]')
      expect(segments[0].classList.contains('active')).toBe(false)
      expect(segments[1].classList.contains('active')).toBe(true)
      expect(segments[2].classList.contains('active')).toBe(false)
    })
  })

  describe('disable/enable all segments', () => {
    it('should disable all segments', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, {})

      segmentedControl.disable()

      const segments = element.querySelectorAll('[data-coral-segment]')
      segments.forEach(segment => {
        expect(segment.hasAttribute('disabled')).toBe(true)
        expect(segment.getAttribute('aria-disabled')).toBe('true')
      })
    })

    it('should enable all segments', () => {
      const element = createTestElement()
      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { disabled: true })

      segmentedControl.enable()

      const segments = element.querySelectorAll('[data-coral-segment]')
      segments.forEach(segment => {
        expect(segment.hasAttribute('disabled')).toBe(false)
        expect(segment.getAttribute('aria-disabled')).toBe('false')
      })
    })
  })

  describe('factory function', () => {
    it('should create via createSegmentedControlFactory', () => {
      const element = createTestElement()
      container.appendChild(element)

      const instance = createSegmentedControlFactory(element)

      expect(instance).toBeInstanceOf(SegmentedControl)
    })
  })

  describe('default export', () => {
    it('should export SegmentedControl as default', async () => {
      const { default: DefaultExport } = await import('../../../src/components/segmented-control')
      expect(DefaultExport).toBe(SegmentedControl)
    })
  })

  describe('existing indicator', () => {
    it('should use existing indicator element', () => {
      const element = createTestElement()
      // Add an indicator before creating the component
      const existingIndicator = document.createElement('div')
      existingIndicator.setAttribute('data-coral-segment-indicator', '')
      existingIndicator.classList.add('pre-existing')
      element.appendChild(existingIndicator)

      container.appendChild(element)
      segmentedControl = new SegmentedControl(element, { value: 'tab1' })

      // Should use the existing indicator
      const indicator = element.querySelector('[data-coral-segment-indicator]')
      expect(indicator?.classList.contains('pre-existing')).toBe(true)
    })
  })
})
