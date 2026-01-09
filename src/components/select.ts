/**
 * Select/Combobox Component
 *
 * Accessible custom select and combobox component.
 * @module components/select
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Select option
 */
export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  group?: string
}

/**
 * Select configuration
 */
export interface SelectConfig extends ComponentConfig {
  /**
   * Available options
   */
  options?: SelectOption[]

  /**
   * Default/initial value
   */
  defaultValue?: string | string[]

  /**
   * Placeholder text
   * @default 'Select an option'
   */
  placeholder?: string

  /**
   * Allow multiple selections
   * @default false
   */
  multiple?: boolean

  /**
   * Enable search/filter
   * @default false
   */
  searchable?: boolean

  /**
   * Allow clearing selection
   * @default false
   */
  clearable?: boolean

  /**
   * Disable the select
   * @default false
   */
  disabled?: boolean

  /**
   * Close on select (for single select)
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Maximum height of dropdown (px)
   * @default 300
   */
  maxHeight?: number

  /**
   * Trigger element selector
   * @default '[data-coral-select-trigger]'
   */
  triggerSelector?: string

  /**
   * Listbox element selector
   * @default '[data-coral-select-listbox]'
   */
  listboxSelector?: string

  /**
   * Option element selector
   * @default '[data-coral-select-option]'
   */
  optionSelector?: string

  /**
   * Input element selector (for searchable)
   * @default '[data-coral-select-input]'
   */
  inputSelector?: string
}

/**
 * Select state
 */
export interface SelectState extends ComponentState {
  isOpen: boolean
  value: string | string[]
  highlightedIndex: number
  searchQuery: string
  filteredOptions: SelectOption[]
}

/**
 * Select component
 *
 * @example
 * ```html
 * <div data-coral-select>
 *   <button data-coral-select-trigger>
 *     <span data-coral-select-value>Select an option</span>
 *     <span data-coral-select-icon></span>
 *   </button>
 *   <div data-coral-select-listbox role="listbox">
 *     <div data-coral-select-option data-value="1">Option 1</div>
 *     <div data-coral-select-option data-value="2">Option 2</div>
 *     <div data-coral-select-option data-value="3">Option 3</div>
 *   </div>
 * </div>
 * ```
 */
export class Select extends BaseComponent {
  protected declare config: SelectConfig
  protected declare state: SelectState

  private trigger: HTMLElement | null = null
  private listbox: HTMLElement | null = null
  private input: HTMLInputElement | null = null
  private valueDisplay: HTMLElement | null = null
  private options: HTMLElement[] = []

  protected getDefaultConfig(): SelectConfig {
    return {
      options: [],
      placeholder: 'Select an option',
      multiple: false,
      searchable: false,
      clearable: false,
      disabled: false,
      closeOnSelect: true,
      maxHeight: 300,
      triggerSelector: '[data-coral-select-trigger]',
      listboxSelector: '[data-coral-select-listbox]',
      optionSelector: '[data-coral-select-option]',
      inputSelector: '[data-coral-select-input]',
    }
  }

  protected getInitialState(): SelectState {
    const defaultValue = this.config.defaultValue
    return {
      isOpen: false,
      value: defaultValue ?? (this.config.multiple ? [] : ''),
      highlightedIndex: -1,
      searchQuery: '',
      filteredOptions: this.config.options ?? [],
    }
  }

  protected setupAria(): void {
    this.trigger = this.query(this.config.triggerSelector!)
    this.listbox = this.query(this.config.listboxSelector!)
    this.input = this.query(this.config.inputSelector!)
    this.valueDisplay = this.query('[data-coral-select-value]')
    this.options = Array.from(this.queryAll(this.config.optionSelector!))

    if (!this.trigger || !this.listbox) {return}

    // Build options from DOM if not provided in config
    if (!this.config.options?.length && this.options.length) {
      this.config.options = this.options.map((option) => ({
        value: option.dataset.value ?? '',
        label: option.textContent?.trim() ?? '',
        disabled: option.hasAttribute('data-disabled'),
      }))
      this.state.filteredOptions = this.config.options
    }

    // Set up listbox ID
    if (!this.listbox.id) {
      this.listbox.id = `${this.id}-listbox`
    }

    // Set up trigger ARIA
    this.trigger.setAttribute('role', 'combobox')
    this.trigger.setAttribute('aria-haspopup', 'listbox')
    this.trigger.setAttribute('aria-expanded', 'false')
    this.trigger.setAttribute('aria-controls', this.listbox.id)

    if (this.config.disabled) {
      this.trigger.setAttribute('aria-disabled', 'true')
      this.trigger.setAttribute('tabindex', '-1')
    } else {
      this.trigger.setAttribute('tabindex', '0')
    }

    // Set up listbox ARIA
    this.listbox.setAttribute('role', 'listbox')
    this.listbox.setAttribute('aria-multiselectable', String(this.config.multiple))
    this.listbox.style.display = 'none'

    // Set up options ARIA
    this.options.forEach((option, index) => {
      option.setAttribute('role', 'option')
      option.setAttribute('id', `${this.id}-option-${index}`)
      option.setAttribute('aria-selected', 'false')

      if (option.hasAttribute('data-disabled')) {
        option.setAttribute('aria-disabled', 'true')
      }
    })
  }

  protected bindEvents(): void {
    if (!this.trigger || !this.listbox) {return}

    // Trigger click
    this.addEventListener(this.trigger, 'click', () => {
      if (!this.config.disabled) {
        this.toggle()
      }
    })

    // Keyboard navigation
    this.addEventListener(this.trigger, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })

    // Option selection
    this.options.forEach((option, index) => {
      this.addEventListener(option, 'click', () => {
        if (!option.hasAttribute('data-disabled')) {
          this.selectIndex(index)
        }
      })

      this.addEventListener(option, 'mouseenter', () => {
        this.highlightIndex(index)
      })
    })

    // Search input
    if (this.input) {
      this.addEventListener(this.input, 'input', (e: Event) => {
        const target = e.target as HTMLInputElement
        this.search(target.value)
      })
    }

    // Click outside
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.isOpen && !this.element.contains(e.target as Node)) {
        this.close()
      }
    })
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const { isOpen, highlightedIndex, filteredOptions } = this.state

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          this.selectIndex(highlightedIndex)
        } else {
          this.open()
        }
        break

      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          this.open()
        } else {
          this.highlightIndex(Math.min(highlightedIndex + 1, filteredOptions.length - 1))
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (!isOpen) {
          this.open()
        } else {
          this.highlightIndex(Math.max(highlightedIndex - 1, 0))
        }
        break

      case 'Home':
        e.preventDefault()
        if (isOpen) {
          this.highlightIndex(0)
        }
        break

      case 'End':
        e.preventDefault()
        if (isOpen) {
          this.highlightIndex(filteredOptions.length - 1)
        }
        break

      case 'Escape':
        e.preventDefault()
        this.close()
        break

      case 'Tab':
        if (isOpen) {
          this.close()
        }
        break

      default:
        // Type-ahead: find option starting with pressed key
        if (e.key.length === 1 && !this.config.searchable) {
          const char = e.key.toLowerCase()
          const startIndex = highlightedIndex + 1
          const index = filteredOptions.findIndex(
            (opt, i) => i >= startIndex && opt.label.toLowerCase().startsWith(char)
          )
          if (index >= 0) {
            this.highlightIndex(index)
          } else {
            // Wrap around
            const wrapIndex = filteredOptions.findIndex(
              (opt) => opt.label.toLowerCase().startsWith(char)
            )
            if (wrapIndex >= 0) {
              this.highlightIndex(wrapIndex)
            }
          }
        }
    }
  }

  private highlightIndex(index: number): void {
    this.setState({ highlightedIndex: index })

    // Update visual highlight
    this.options.forEach((option, i) => {
      if (i === index) {
        option.setAttribute('data-highlighted', '')
        option.scrollIntoView({ block: 'nearest' })
      } else {
        option.removeAttribute('data-highlighted')
      }
    })

    // Update ARIA
    if (index >= 0 && this.options[index]) {
      this.trigger?.setAttribute('aria-activedescendant', this.options[index].id)
    }
  }

  private selectIndex(index: number): void {
    const option = this.state.filteredOptions[index]
    if (!option || option.disabled) {return}

    this.selectValue(option.value)
  }

  /**
   * Select a value
   */
  selectValue(value: string): void {
    let newValue: string | string[]

    if (this.config.multiple) {
      const currentValues = Array.isArray(this.state.value) ? this.state.value : []
      if (currentValues.includes(value)) {
        newValue = currentValues.filter((v) => v !== value)
      } else {
        newValue = [...currentValues, value]
      }
    } else {
      newValue = value
    }

    this.setState({ value: newValue })
    this.updateValueDisplay()
    this.updateSelectedState()

    // Dispatch change event
    this.dispatch('change', { value: newValue })

    // Close if configured
    if (this.config.closeOnSelect && !this.config.multiple) {
      this.close()
    }
  }

  /**
   * Clear selection
   */
  clear(): void {
    const newValue = this.config.multiple ? [] : ''
    this.setState({ value: newValue })
    this.updateValueDisplay()
    this.updateSelectedState()
    this.dispatch('change', { value: newValue })
  }

  private updateValueDisplay(): void {
    if (!this.valueDisplay) {return}

    const { value } = this.state
    const { options, placeholder } = this.config

    if (this.config.multiple) {
      const values = Array.isArray(value) ? value : []
      if (values.length === 0) {
        this.valueDisplay.textContent = placeholder ?? ''
        this.valueDisplay.setAttribute('data-placeholder', '')
      } else {
        const labels = values.map(
          (v) => options?.find((o) => o.value === v)?.label ?? v
        )
        this.valueDisplay.textContent = labels.join(', ')
        this.valueDisplay.removeAttribute('data-placeholder')
      }
    } else {
      const singleValue = Array.isArray(value) ? value[0] ?? '' : value
      if (!singleValue) {
        this.valueDisplay.textContent = placeholder ?? ''
        this.valueDisplay.setAttribute('data-placeholder', '')
      } else {
        const label = options?.find((o) => o.value === singleValue)?.label ?? singleValue
        this.valueDisplay.textContent = label
        this.valueDisplay.removeAttribute('data-placeholder')
      }
    }
  }

  private updateSelectedState(): void {
    const { value } = this.state

    this.options.forEach((option) => {
      const optionValue = option.dataset.value
      const isSelected = this.config.multiple
        ? Array.isArray(value) && value.includes(optionValue ?? '')
        : value === optionValue

      option.setAttribute('aria-selected', String(isSelected))
      if (isSelected) {
        option.setAttribute('data-selected', '')
      } else {
        option.removeAttribute('data-selected')
      }
    })
  }

  /**
   * Search/filter options
   */
  search(query: string): void {
    const { options } = this.config
    const filtered = query
      ? options?.filter((opt) =>
          opt.label.toLowerCase().includes(query.toLowerCase())
        ) ?? []
      : options ?? []

    this.setState({
      searchQuery: query,
      filteredOptions: filtered,
      highlightedIndex: filtered.length > 0 ? 0 : -1,
    })

    // Update visible options
    this.options.forEach((option) => {
      const optionValue = option.dataset.value
      const isVisible = filtered.some((opt) => opt.value === optionValue)
      option.style.display = isVisible ? '' : 'none'
    })
  }

  protected override render(): void {
    if (!this.trigger || !this.listbox) {return}

    if (this.state.isOpen) {
      this.listbox.style.display = ''
      this.listbox.removeAttribute('hidden')
      this.listbox.setAttribute('data-open', '')
      this.trigger.setAttribute('aria-expanded', 'true')
      this.trigger.setAttribute('data-open', '')

      // Set max height
      if (this.config.maxHeight) {
        this.listbox.style.maxHeight = `${this.config.maxHeight}px`
        this.listbox.style.overflowY = 'auto'
      }
    } else {
      this.listbox.style.display = 'none'
      this.listbox.setAttribute('hidden', '')
      this.listbox.removeAttribute('data-open')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.trigger.removeAttribute('data-open')
    }

    this.updateValueDisplay()
  }

  /**
   * Get current value
   */
  getValue(): string | string[] {
    return this.state.value
  }

  /**
   * Set value programmatically
   */
  setValue(value: string | string[]): void {
    this.setState({ value })
    this.updateValueDisplay()
    this.updateSelectedState()
  }

  /**
   * Enable the select
   */
  enable(): void {
    this.config.disabled = false
    this.trigger?.removeAttribute('aria-disabled')
    this.trigger?.setAttribute('tabindex', '0')
    this.element.removeAttribute('data-disabled')
  }

  /**
   * Disable the select
   */
  disable(): void {
    this.config.disabled = true
    this.trigger?.setAttribute('aria-disabled', 'true')
    this.trigger?.setAttribute('tabindex', '-1')
    this.element.setAttribute('data-disabled', '')
    this.close()
  }
}

/**
 * Create a select instance
 */
export const createSelect = createComponentFactory(Select)

export default Select
