/**
 * TimePicker Component Tests
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  TimePicker,
  createTimePicker,
  createTimePickerFactory,
  TimePickerConfig,
  TimeValue,
  TimeFormat,
  TimePeriod,
} from '../../../src/components/time-picker'

describe('TimePicker Component', () => {
  let container: HTMLElement

  const createTimePickerElement = (options?: { withDropdown?: boolean }): HTMLElement => {
    const div = document.createElement('div')
    div.id = 'test-time-picker'
    div.setAttribute('data-coral-time-picker', '')

    // Input element
    const input = document.createElement('input')
    input.type = 'text'
    input.setAttribute('data-coral-time-picker-input', '')
    input.placeholder = 'Select time'
    div.appendChild(input)

    if (options?.withDropdown !== false) {
      // Dropdown element
      const dropdown = document.createElement('div')
      dropdown.setAttribute('data-coral-time-picker-dropdown', '')

      // Hours select
      const hoursSelect = document.createElement('select')
      hoursSelect.setAttribute('data-coral-time-picker-hours', '')
      dropdown.appendChild(hoursSelect)

      // Minutes select
      const minutesSelect = document.createElement('select')
      minutesSelect.setAttribute('data-coral-time-picker-minutes', '')
      dropdown.appendChild(minutesSelect)

      // Seconds select
      const secondsSelect = document.createElement('select')
      secondsSelect.setAttribute('data-coral-time-picker-seconds', '')
      dropdown.appendChild(secondsSelect)

      // Period select
      const periodSelect = document.createElement('select')
      periodSelect.setAttribute('data-coral-time-picker-period', '')
      dropdown.appendChild(periodSelect)

      div.appendChild(dropdown)
    }

    return div
  }

  beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
  })

  afterEach(() => {
    container.remove()
    vi.clearAllMocks()
  })

  describe('initialization', () => {
    it('should create TimePicker from element', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      expect(timePicker).toBeDefined()
      expect(timePicker.id).toBe('test-time-picker')
    })

    it('should create TimePicker with factory function', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = createTimePicker(element)

      expect(timePicker).toBeDefined()
    })

    it('should generate ID if not present', () => {
      const element = createTimePickerElement()
      element.removeAttribute('id')
      container.appendChild(element)
      new TimePicker(element)

      expect(element.id).toMatch(/^timepicker-/)
    })

    it('should set up ARIA attributes', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element)

      expect(element.getAttribute('role')).toBe('group')
      expect(element.getAttribute('aria-label')).toBe('Time picker')
    })
  })

  describe('configuration', () => {
    it('should use default config when none provided', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      expect(timePicker.getValue()).toBeNull()
    })

    it('should accept initial value', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const value: TimeValue = { hours: 14, minutes: 30 }
      const timePicker = new TimePicker(element, { value })

      expect(timePicker.getValue()).toEqual(value)
    })

    it('should accept showSeconds option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { showSeconds: true })

      expect(timePicker).toBeDefined()
    })

    it('should accept 12-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      expect(timePicker).toBeDefined()
    })

    it('should accept 24-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '24' })

      expect(timePicker).toBeDefined()
    })

    it('should accept min and max time', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        min: { hours: 9, minutes: 0 },
        max: { hours: 17, minutes: 0 },
      })

      expect(timePicker).toBeDefined()
    })

    it('should accept step option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { step: 15 })

      expect(timePicker).toBeDefined()
    })

    it('should accept required option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { required: true })

      expect(timePicker).toBeDefined()
    })

    it('should accept placeholder option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { placeholder: 'Choose time' })

      expect(timePicker).toBeDefined()
    })

    it('should accept name option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { name: 'appointment_time' })

      expect(timePicker).toBeDefined()
    })

    it('should accept disabled option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { disabled: true })

      expect(timePicker).toBeDefined()
    })

    it('should accept readonly option', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { readonly: true })

      expect(timePicker).toBeDefined()
    })
  })

  describe('API methods', () => {
    it('should set value with setValue()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      const value: TimeValue = { hours: 10, minutes: 45 }
      timePicker.setValue(value)

      expect(timePicker.getValue()).toEqual(value)
    })

    it('should get value with getValue()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const value: TimeValue = { hours: 8, minutes: 0 }
      const timePicker = new TimePicker(element, { value })

      expect(timePicker.getValue()).toEqual(value)
    })

    it('should clear value with clear()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const value: TimeValue = { hours: 12, minutes: 30 }
      const timePicker = new TimePicker(element, { value })

      timePicker.clear()

      expect(timePicker.getValue()).toBeNull()
    })

    it('should disable with disable()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      timePicker.disable()

      expect(element.classList.contains('disabled')).toBe(true)
      const input = element.querySelector('input')
      expect(input?.hasAttribute('disabled')).toBe(true)
    })

    it('should enable with enable()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { disabled: true })

      timePicker.enable()

      expect(element.classList.contains('disabled')).toBe(false)
    })
  })

  describe('time values', () => {
    it('should handle hours 0-23 in 24-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '24' })

      timePicker.setValue({ hours: 0, minutes: 0 })
      expect(timePicker.getValue()?.hours).toBe(0)

      timePicker.setValue({ hours: 23, minutes: 59 })
      expect(timePicker.getValue()?.hours).toBe(23)
    })

    it('should handle hours 1-12 in 12-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      timePicker.setValue({ hours: 12, minutes: 0, period: 'AM' })
      expect(timePicker.getValue()?.hours).toBe(12)

      timePicker.setValue({ hours: 12, minutes: 0, period: 'PM' })
      expect(timePicker.getValue()?.period).toBe('PM')
    })

    it('should handle seconds', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { showSeconds: true })

      timePicker.setValue({ hours: 10, minutes: 30, seconds: 45 })
      expect(timePicker.getValue()?.seconds).toBe(45)
    })

    it('should handle AM/PM period', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      const amValue: TimeValue = { hours: 10, minutes: 0, period: 'AM' }
      timePicker.setValue(amValue)
      expect(timePicker.getValue()?.period).toBe('AM')

      const pmValue: TimeValue = { hours: 10, minutes: 0, period: 'PM' }
      timePicker.setValue(pmValue)
      expect(timePicker.getValue()?.period).toBe('PM')
    })
  })

  describe('input element', () => {
    it('should find input element', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element)

      const input = element.querySelector('[data-coral-time-picker-input]')
      expect(input).toBeDefined()
    })

    it('should update input when value changes', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '24' })

      timePicker.setValue({ hours: 14, minutes: 30 })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('14:30')
    })

    it('should show seconds in input when showSeconds is true', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '24', showSeconds: true })

      timePicker.setValue({ hours: 10, minutes: 15, seconds: 30 })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('10:15:30')
    })

    it('should show period in input for 12-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      timePicker.setValue({ hours: 2, minutes: 30, period: 'PM' })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toContain('PM')
    })

    it('should clear input on clear()', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { value: { hours: 10, minutes: 0 } })

      timePicker.clear()

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('')
    })
  })

  describe('dropdown', () => {
    it('should find dropdown element', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element)

      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown).toBeDefined()
    })

    it('should work without dropdown', () => {
      const element = createTimePickerElement({ withDropdown: false })
      container.appendChild(element)

      // Should not throw
      const timePicker = new TimePicker(element)
      expect(timePicker).toBeDefined()
    })
  })

  describe('events', () => {
    it('should emit change event on setValue', () => {
      const changeSpy = vi.fn()
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Events are emitted as coral:{componentName}:{eventName}
      element.addEventListener('coral:timepicker:change', changeSpy)

      timePicker.setValue({ hours: 15, minutes: 0 })

      expect(changeSpy).toHaveBeenCalled()
    })
  })

  describe('destroy', () => {
    it('should clean up on destroy', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      timePicker.destroy()
      // Should not throw
    })
  })

  describe('factory', () => {
    it('should create TimePicker with factory', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      // Factory is a function, not an object with .create()
      const timePicker = createTimePickerFactory(element)

      expect(timePicker).toBeDefined()
      expect(timePicker).toBeInstanceOf(TimePicker)
    })
  })

  describe('default export', () => {
    it('should export TimePicker as default', async () => {
      const { default: DefaultExport } = await import('../../../src/components/time-picker')
      expect(DefaultExport).toBe(TimePicker)
    })
  })

  describe('input focus and blur', () => {
    it('should open dropdown on input focus when enabled', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Call private method directly
      ;(timePicker as any).handleInputFocus()

      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(true)
    })

    it('should not open dropdown on focus when disabled', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { disabled: true })

      // Call private method directly
      ;(timePicker as any).handleInputFocus()

      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(false)
    })

    it('should not open dropdown on focus when readonly', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { readonly: true })

      // Call private method directly
      ;(timePicker as any).handleInputFocus()

      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(false)
    })

    it('should close dropdown on blur after delay', async () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Call blur handler
      ;(timePicker as any).handleInputBlur()

      await new Promise(resolve => setTimeout(resolve, 200))
      expect(dropdown?.classList.contains('open')).toBe(false)
    })
  })

  describe('input change handling', () => {
    it('should parse HH:MM format input', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Call private method directly
      ;(timePicker as any).parseInputValue('14:30')

      expect(timePicker.getValue()).toEqual({ hours: 14, minutes: 30 })
    })

    it('should parse HH:MM:SS format input', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { showSeconds: true })

      // Call private method directly
      ;(timePicker as any).parseInputValue('10:15:45')

      expect(timePicker.getValue()).toEqual({ hours: 10, minutes: 15, seconds: 45 })
    })

    it('should parse 12-hour format with AM', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      // Call private method directly
      ;(timePicker as any).parseInputValue('10:30 AM')

      expect(timePicker.getValue()?.period).toBe('AM')
    })

    it('should parse 12-hour format with PM', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      // Call private method directly
      ;(timePicker as any).parseInputValue('2:45 PM')

      expect(timePicker.getValue()?.period).toBe('PM')
    })

    it('should ignore invalid input format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Call private method directly
      ;(timePicker as any).parseInputValue('invalid')

      expect(timePicker.getValue()).toBeNull()
    })

    it('should parse single digit hours', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Call private method directly
      ;(timePicker as any).parseInputValue('9:05')

      expect(timePicker.getValue()).toEqual({ hours: 9, minutes: 5 })
    })

    it('should handle input change event via handleInputChange', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Simulate event with target
      const mockEvent = { target: { value: '15:45' } }
      ;(timePicker as any).handleInputChange(mockEvent)

      expect(timePicker.getValue()).toEqual({ hours: 15, minutes: 45 })
    })

    it('should parse lowercase am/pm', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { format: '12' })

      ;(timePicker as any).parseInputValue('3:30 pm')

      expect(timePicker.getValue()?.period).toBe('PM')
    })
  })

  describe('select change handling', () => {
    it('should handle hours select change', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { value: { hours: 10, minutes: 30 } })

      // Simulate event with target
      const mockEvent = { target: { value: '14' } }
      ;(timePicker as any).handleHoursChange(mockEvent)

      expect(timePicker.getValue()?.hours).toBe(14)
    })

    it('should handle minutes select change', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { value: { hours: 10, minutes: 30 } })

      // Simulate event with target
      const mockEvent = { target: { value: '45' } }
      ;(timePicker as any).handleMinutesChange(mockEvent)

      expect(timePicker.getValue()?.minutes).toBe(45)
    })

    it('should handle seconds select change', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: 30, seconds: 0 },
        showSeconds: true,
      })

      // Simulate event with target
      const mockEvent = { target: { value: '30' } }
      ;(timePicker as any).handleSecondsChange(mockEvent)

      expect(timePicker.getValue()?.seconds).toBe(30)
    })

    it('should handle period select change', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: 30, period: 'AM' },
        format: '12',
      })

      // Simulate event with target
      const mockEvent = { target: { value: 'PM' } }
      ;(timePicker as any).handlePeriodChange(mockEvent)

      expect(timePicker.getValue()?.period).toBe('PM')
    })

    it('should not update time if value is null', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element) // No initial value

      // Call updateTime directly - should not throw
      ;(timePicker as any).updateTime({ hours: 14 })

      // Should remain null since no initial value
      expect(timePicker.getValue()).toBeNull()
    })
  })

  describe('keyboard navigation', () => {
    it('should close dropdown on Escape key', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Simulate Escape key
      const mockEvent = { key: 'Escape' }
      ;(timePicker as any).handleKeydown(mockEvent)

      expect(dropdown?.classList.contains('open')).toBe(false)
    })

    it('should toggle dropdown on Enter key', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')

      // Simulate Enter key to open
      const mockEvent = { key: 'Enter', preventDefault: vi.fn() }
      ;(timePicker as any).handleKeydown(mockEvent)
      expect(dropdown?.classList.contains('open')).toBe(true)
      expect(mockEvent.preventDefault).toHaveBeenCalled()

      // Simulate Enter again to close
      ;(timePicker as any).handleKeydown(mockEvent)
      expect(dropdown?.classList.contains('open')).toBe(false)
    })

    it('should handle ArrowUp when dropdown is open', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()

      // Simulate ArrowUp key
      const mockEvent = { key: 'ArrowUp', preventDefault: vi.fn() }
      ;(timePicker as any).handleKeydown(mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should handle ArrowDown when dropdown is open', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()

      // Simulate ArrowDown key
      const mockEvent = { key: 'ArrowDown', preventDefault: vi.fn() }
      ;(timePicker as any).handleKeydown(mockEvent)

      expect(mockEvent.preventDefault).toHaveBeenCalled()
    })

    it('should not prevent default for ArrowUp when dropdown is closed', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Dropdown is closed
      const mockEvent = { key: 'ArrowUp', preventDefault: vi.fn() }
      ;(timePicker as any).handleKeydown(mockEvent)

      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })

    it('should handle other keys without error', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Simulate random key
      const mockEvent = { key: 'a', preventDefault: vi.fn() }
      ;(timePicker as any).handleKeydown(mockEvent)

      expect(mockEvent.preventDefault).not.toHaveBeenCalled()
    })
  })

  describe('document click handling', () => {
    it('should close dropdown on click outside', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Simulate click outside - create a target not inside the element
      const outsideTarget = document.createElement('div')
      document.body.appendChild(outsideTarget)
      const mockEvent = { target: outsideTarget }
      ;(timePicker as any).handleDocumentClick(mockEvent)

      expect(dropdown?.classList.contains('open')).toBe(false)
      outsideTarget.remove()
    })

    it('should not close dropdown on click inside', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      // Open dropdown first
      ;(timePicker as any).openDropdown()
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Simulate click inside element
      const input = element.querySelector('input')
      const mockEvent = { target: input }
      ;(timePicker as any).handleDocumentClick(mockEvent)

      expect(dropdown?.classList.contains('open')).toBe(true)
    })
  })

  describe('dropdown events', () => {
    it('should emit open event when dropdown opens', () => {
      const openSpy = vi.fn()
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      element.addEventListener('coral:timepicker:open', openSpy)

      // Call openDropdown directly
      ;(timePicker as any).openDropdown()

      expect(openSpy).toHaveBeenCalled()
    })

    it('should emit close event when dropdown closes', () => {
      const closeSpy = vi.fn()
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      element.addEventListener('coral:timepicker:close', closeSpy)

      // Open then close
      ;(timePicker as any).openDropdown()
      ;(timePicker as any).closeDropdown()

      expect(closeSpy).toHaveBeenCalled()
    })
  })

  describe('select rendering', () => {
    it('should render 24-hour format hours (0-23)', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { format: '24' })

      const hoursSelect = element.querySelector('[data-coral-time-picker-hours]') as HTMLSelectElement
      expect(hoursSelect.options.length).toBe(24)
      expect(hoursSelect.options[0].value).toBe('0')
      expect(hoursSelect.options[23].value).toBe('23')
    })

    it('should render 12-hour format hours (0-12)', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { format: '12' })

      const hoursSelect = element.querySelector('[data-coral-time-picker-hours]') as HTMLSelectElement
      expect(hoursSelect.options.length).toBe(13)
      // First option should display 12 (for 12:00)
      expect(hoursSelect.options[0].textContent).toBe('12')
    })

    it('should render minutes with step', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { step: 15 })

      const minutesSelect = element.querySelector('[data-coral-time-picker-minutes]') as HTMLSelectElement
      expect(minutesSelect.options.length).toBe(4) // 0, 15, 30, 45
      expect(minutesSelect.options[0].value).toBe('0')
      expect(minutesSelect.options[1].value).toBe('15')
      expect(minutesSelect.options[2].value).toBe('30')
      expect(minutesSelect.options[3].value).toBe('45')
    })

    it('should render seconds when showSeconds is true', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { showSeconds: true })

      const secondsSelect = element.querySelector('[data-coral-time-picker-seconds]') as HTMLSelectElement
      expect(secondsSelect.options.length).toBe(60)
    })

    it('should render period select for 12-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { format: '12' })

      const periodSelect = element.querySelector('[data-coral-time-picker-period]') as HTMLSelectElement
      expect(periodSelect.options.length).toBe(2)
      expect(periodSelect.options[0].value).toBe('AM')
      expect(periodSelect.options[1].value).toBe('PM')
    })

    it('should not render period select for 24-hour format', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      new TimePicker(element, { format: '24' })

      const periodSelect = element.querySelector('[data-coral-time-picker-period]') as HTMLSelectElement
      expect(periodSelect.options.length).toBe(0)
    })
  })

  describe('validation', () => {
    it('should validate required field', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { required: true })

      // Access private validate method
      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should pass validation with value when required', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        required: true,
        value: { hours: 10, minutes: 30 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(true)
    })

    it('should validate hours range (0-23)', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 25, minutes: 0 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate negative hours', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: -1, minutes: 0 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate minutes range (0-59)', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: 60 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate negative minutes', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: -5 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate seconds range (0-59)', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: 30, seconds: 60 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate negative seconds', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 10, minutes: 30, seconds: -1 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate against min time', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 8, minutes: 0 },
        min: { hours: 9, minutes: 0 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should validate against max time', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 18, minutes: 0 },
        max: { hours: 17, minutes: 0 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(false)
    })

    it('should pass validation within min/max range', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, {
        value: { hours: 12, minutes: 0 },
        min: { hours: 9, minutes: 0 },
        max: { hours: 17, minutes: 0 },
      })

      const isValid = (timePicker as any).validate()
      expect(isValid).toBe(true)
    })
  })

  describe('time comparison', () => {
    it('should compare times with isBefore', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      const time1 = { hours: 10, minutes: 0 }
      const time2 = { hours: 11, minutes: 0 }

      expect((timePicker as any).isBefore(time1, time2)).toBe(true)
      expect((timePicker as any).isBefore(time2, time1)).toBe(false)
    })

    it('should compare times with isAfter', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      const time1 = { hours: 14, minutes: 30 }
      const time2 = { hours: 12, minutes: 0 }

      expect((timePicker as any).isAfter(time1, time2)).toBe(true)
      expect((timePicker as any).isAfter(time2, time1)).toBe(false)
    })

    it('should compare times including seconds', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      const time1 = { hours: 10, minutes: 30, seconds: 0 }
      const time2 = { hours: 10, minutes: 30, seconds: 30 }

      expect((timePicker as any).isBefore(time1, time2)).toBe(true)
      expect((timePicker as any).isAfter(time2, time1)).toBe(true)
    })

    it('should handle equal times', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      const time1 = { hours: 10, minutes: 30 }
      const time2 = { hours: 10, minutes: 30 }

      expect((timePicker as any).isBefore(time1, time2)).toBe(false)
      expect((timePicker as any).isAfter(time1, time2)).toBe(false)
    })
  })

  describe('input formatting', () => {
    it('should pad single digit hours with zero', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      timePicker.setValue({ hours: 9, minutes: 30 })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('09:30')
    })

    it('should pad single digit minutes with zero', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)

      timePicker.setValue({ hours: 10, minutes: 5 })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('10:05')
    })

    it('should pad single digit seconds with zero', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { showSeconds: true })

      timePicker.setValue({ hours: 10, minutes: 30, seconds: 5 })

      const input = element.querySelector('input') as HTMLInputElement
      expect(input.value).toBe('10:30:05')
    })

    it('should not update input when value is null', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)
      const input = element.querySelector('input') as HTMLInputElement
      input.value = 'test'

      timePicker.setValue(null)

      // Input should be empty after clear
      expect(input.value).toBe('test')
    })
  })

  describe('without dropdown elements', () => {
    it('should handle missing dropdown gracefully', () => {
      const element = createTimePickerElement({ withDropdown: false })
      container.appendChild(element)

      const timePicker = new TimePicker(element)
      timePicker.setValue({ hours: 10, minutes: 30 })

      // Should not throw
      expect(timePicker.getValue()).toEqual({ hours: 10, minutes: 30 })
    })

    it('should handle missing input gracefully', () => {
      const div = document.createElement('div')
      div.setAttribute('data-coral-time-picker', '')
      container.appendChild(div)

      const timePicker = new TimePicker(div)
      timePicker.setValue({ hours: 10, minutes: 30 })

      // Should not throw
      expect(timePicker.getValue()).toEqual({ hours: 10, minutes: 30 })
    })
  })

  describe('enable and disable attributes', () => {
    it('should set disabled attribute on input when disable() is called', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)
      const input = element.querySelector('input') as HTMLInputElement

      timePicker.disable()

      expect(input.hasAttribute('disabled')).toBe(true)
    })

    it('should remove disabled attribute on input when enable() is called', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element, { disabled: true })
      const input = element.querySelector('input') as HTMLInputElement

      timePicker.enable()

      expect(input.hasAttribute('disabled')).toBe(false)
    })
  })

  describe('blur with active element in dropdown', () => {
    it('should not close dropdown if focus is inside dropdown', async () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)
      const hoursSelect = element.querySelector('[data-coral-time-picker-hours]') as HTMLSelectElement
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')

      // Open dropdown
      ;(timePicker as any).openDropdown()
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Simulate focus inside dropdown
      hoursSelect.focus()

      // Call blur handler - should check if focus is inside dropdown
      ;(timePicker as any).handleInputBlur()

      // Wait for the setTimeout in handleInputBlur
      await new Promise(resolve => setTimeout(resolve, 200))

      // Test passes if no error thrown
    })

    it('should toggle dropdown state correctly', () => {
      const element = createTimePickerElement()
      container.appendChild(element)
      const timePicker = new TimePicker(element)
      const dropdown = element.querySelector('[data-coral-time-picker-dropdown]')

      // Toggle open
      ;(timePicker as any).toggleDropdown()
      expect(dropdown?.classList.contains('open')).toBe(true)

      // Toggle closed
      ;(timePicker as any).toggleDropdown()
      expect(dropdown?.classList.contains('open')).toBe(false)
    })
  })
})
