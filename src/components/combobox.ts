/**
 * Combobox Component
 *
 * An accessible autocomplete input with async loading support.
 * Combines text input with a dropdown of suggestions.
 *
 * @module components/combobox
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Sanitize SVG/icon HTML to prevent XSS
 *
 * Only allows safe SVG elements and attributes.
 * Blocks script, event handlers, and dangerous attributes.
 *
 * @example
 * ```typescript
 * sanitizeSvg('<svg><script>alert(1)</script></svg>') // '<svg></svg>'
 * ```
 */
function sanitizeIconHtml(html: string): string {
  // Use DOMParser to parse and sanitize HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'image/svg+xml')

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror')
  if (parserError) {
    // Invalid SVG, return empty string
    return ''
  }

  // Remove dangerous elements
  const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form']
  for (const tag of dangerousTags) {
    const elements = doc.getElementsByTagName(tag)
    for (let i = elements.length - 1; i >= 0; i--) {
      elements[i]!.remove()
    }
  }

  // Remove dangerous attributes (onclick, onerror, etc.)
  const allElements = doc.getElementsByTagName('*')
  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i]
    const attrs = el?.attributes
    if (!attrs) {
      continue
    }

    // Remove event handlers and dangerous attributes
    const dangerousAttrs = [
      'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout',
      'onfocus', 'onblur', 'onkeydown', 'onkeyup', 'onkeypress',
      'xlink:href', 'data', 'href', // Some attributes can execute javascript:
    ]

    for (let j = attrs.length - 1; j >= 0; j--) {
      const attr = attrs[j]
      if (!attr) {
        continue
      }

      const attrName = attr.name.toLowerCase()
      if (dangerousAttrs.some(da => attrName === da || attrName.startsWith('on'))) {
        el.removeAttribute(attr.name)
      }
    }
  }

  return doc.documentElement.outerHTML
}

/**
 * Combobox option
 */
export interface ComboboxOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  group?: string
  icon?: string
  data?: Record<string, unknown>
}

/**
 * Combobox configuration
 */
export interface ComboboxConfig extends ComponentConfig {
  /**
   * Static options (if not using async)
   */
  options?: ComboboxOption[]

  /**
   * Default/initial value
   */
  defaultValue?: string

  /**
   * Placeholder text
   * @default 'Search...'
   */
  placeholder?: string

  /**
   * Minimum characters before searching
   * @default 1
   */
  minChars?: number

  /**
   * Debounce delay for async search (ms)
   * @default 300
   */
  debounce?: number

  /**
   * Allow free-form input (not just options)
   * @default false
   */
  allowCustomValue?: boolean

  /**
   * Allow clearing the selection
   * @default true
   */
  clearable?: boolean

  /**
   * Disable the combobox
   * @default false
   */
  disabled?: boolean

  /**
   * Maximum height of dropdown (px)
   * @default 300
   */
  maxHeight?: number

  /**
   * Show loading indicator during async search
   * @default true
   */
  showLoading?: boolean

  /**
   * Text to show when no results found
   * @default 'No results found'
   */
  emptyText?: string

  /**
   * Text to show while loading
   * @default 'Loading...'
   */
  loadingText?: string

  /**
   * Async search function
   */
  onSearch?: (query: string) => Promise<ComboboxOption[]>

  /**
   * Input element selector
   * @default '[data-coral-combobox-input]'
   */
  inputSelector?: string

  /**
   * Listbox element selector
   * @default '[data-coral-combobox-listbox]'
   */
  listboxSelector?: string

  /**
   * Option element selector
   * @default '[data-coral-combobox-option]'
   */
  optionSelector?: string

  /**
   * Clear button selector
   * @default '[data-coral-combobox-clear]'
   */
  clearSelector?: string
}

/**
 * Combobox state
 */
export interface ComboboxState extends ComponentState {
  isOpen: boolean
  isLoading: boolean
  inputValue: string
  selectedValue: string | null
  selectedOption: ComboboxOption | null
  highlightedIndex: number
  options: ComboboxOption[]
}

/**
 * Combobox component
 *
 * @example
 * ```html
 * <div data-coral-combobox>
 *   <div data-coral-combobox-control>
 *     <input data-coral-combobox-input type="text" placeholder="Search..." />
 *     <button data-coral-combobox-clear>×</button>
 *   </div>
 *   <div data-coral-combobox-listbox role="listbox">
 *     <!-- Options rendered dynamically -->
 *   </div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * // Async search
 * const combobox = createCombobox(element, {
 *   placeholder: 'Search users...',
 *   minChars: 2,
 *   onSearch: async (query) => {
 *     const response = await fetch(`/api/users?q=${query}`)
 *     const users = await response.json()
 *     return users.map(u => ({
 *       value: u.id,
 *       label: u.name,
 *       description: u.email
 *     }))
 *   }
 * })
 * ```
 */
export class Combobox extends BaseComponent {
  protected declare config: ComboboxConfig
  protected declare state: ComboboxState

  private input: HTMLInputElement | null = null
  private listbox: HTMLElement | null = null
  private clearButton: HTMLElement | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): ComboboxConfig {
    return {
      options: [],
      placeholder: 'Search...',
      minChars: 1,
      debounce: 300,
      allowCustomValue: false,
      clearable: true,
      disabled: false,
      maxHeight: 300,
      showLoading: true,
      emptyText: 'No results found',
      loadingText: 'Loading...',
      inputSelector: '[data-coral-combobox-input]',
      listboxSelector: '[data-coral-combobox-listbox]',
      optionSelector: '[data-coral-combobox-option]',
      clearSelector: '[data-coral-combobox-clear]',
    }
  }

  protected getInitialState(): ComboboxState {
    return {
      isOpen: false,
      isLoading: false,
      inputValue: '',
      selectedValue: this.config.defaultValue || null,
      selectedOption: null,
      highlightedIndex: -1,
      options: this.config.options || [],
    }
  }

  protected setupAria(): void {
    this.input = this.query(this.config.inputSelector!) as HTMLInputElement
    this.listbox = this.query(this.config.listboxSelector!)
    this.clearButton = this.query(this.config.clearSelector!)

    if (!this.input) {
      return
    }

    // Create listbox if not present
    if (!this.listbox) {
      this.listbox = document.createElement('div')
      this.listbox.setAttribute('data-coral-combobox-listbox', '')
      this.element.appendChild(this.listbox)
    }

    // Set up listbox ID
    if (!this.listbox.id) {
      this.listbox.id = `${this.id}-listbox`
    }

    // Set up input ARIA
    this.input.setAttribute('role', 'combobox')
    this.input.setAttribute('aria-autocomplete', 'list')
    this.input.setAttribute('aria-haspopup', 'listbox')
    this.input.setAttribute('aria-expanded', 'false')
    this.input.setAttribute('aria-controls', this.listbox.id)

    if (this.config.placeholder) {
      this.input.placeholder = this.config.placeholder
    }

    if (this.config.disabled) {
      this.input.disabled = true
      this.input.setAttribute('aria-disabled', 'true')
    }

    // Set up listbox
    this.listbox.setAttribute('role', 'listbox')
    this.listbox.style.display = 'none'

    // Initialize with default value
    if (this.config.defaultValue && this.config.options) {
      const option = this.config.options.find((o) => o.value === this.config.defaultValue)
      if (option) {
        this.setState({
          selectedOption: option,
          inputValue: option.label,
        })
        this.input.value = option.label
      }
    }

    // Set up clear button
    if (this.clearButton) {
      this.clearButton.style.display = this.state.selectedValue ? '' : 'none'
    }
  }

  protected bindEvents(): void {
    if (!this.input || !this.listbox) {
      return
    }

    // Input events
    this.addEventListener(this.input, 'input', (e: Event) => {
      const target = e.target as HTMLInputElement
      this.handleInput(target.value)
    })

    this.addEventListener(this.input, 'focus', () => {
      if (this.state.options.length > 0 || this.config.options?.length) {
        this.open()
      }
    })

    this.addEventListener(this.input, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })

    // Clear button
    if (this.clearButton) {
      this.addEventListener(this.clearButton, 'click', () => {
        this.clear()
      })
    }

    // Click outside
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.isOpen && !this.element.contains(e.target as Node)) {
        this.close()
      }
    })
  }

  private handleInput(value: string): void {
    this.setState({ inputValue: value, highlightedIndex: -1 })

    // Clear selection if input doesn't match
    if (this.state.selectedOption && value !== this.state.selectedOption.label) {
      this.setState({ selectedValue: null, selectedOption: null })
      this.dispatch('change', { value: null, option: null })
    }

    // Check minimum characters
    if (value.length < (this.config.minChars || 1)) {
      this.setState({ options: this.config.options || [] })
      if (value.length === 0 && this.config.options?.length) {
        this.renderOptions()
        this.open()
      } else {
        this.close()
      }
      return
    }

    // Debounce search
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer)
    }

    this.debounceTimer = setTimeout(() => {
      this.search(value)
    }, this.config.debounce)
  }

  private async search(query: string): Promise<void> {
    // Async search
    if (this.config.onSearch) {
      this.setState({ isLoading: true })
      this.renderOptions()

      try {
        const results = await this.config.onSearch(query)
        this.setState({
          options: results,
          isLoading: false,
          highlightedIndex: results.length > 0 ? 0 : -1,
        })
      } catch (error) {
        console.error('Combobox search error:', error)
        this.setState({ options: [], isLoading: false })
      }
    } else {
      // Local filtering
      const filtered = (this.config.options || []).filter((option) =>
        option.label.toLowerCase().includes(query.toLowerCase())
      )
      this.setState({
        options: filtered,
        highlightedIndex: filtered.length > 0 ? 0 : -1,
      })
    }

    this.renderOptions()
    this.open()
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const { isOpen, highlightedIndex, options } = this.state

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (!isOpen) {
          this.open()
        } else {
          this.highlightIndex(Math.min(highlightedIndex + 1, options.length - 1))
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (isOpen) {
          this.highlightIndex(Math.max(highlightedIndex - 1, 0))
        }
        break

      case 'Enter':
        e.preventDefault()
        if (isOpen && highlightedIndex >= 0) {
          this.selectOption(options[highlightedIndex]!)
        } else if (this.config.allowCustomValue && this.state.inputValue) {
          this.selectCustomValue(this.state.inputValue)
        }
        break

      case 'Escape':
        e.preventDefault()
        this.close()
        break

      case 'Tab':
        this.close()
        break

      case 'Home':
        if (isOpen) {
          e.preventDefault()
          this.highlightIndex(0)
        }
        break

      case 'End':
        if (isOpen) {
          e.preventDefault()
          this.highlightIndex(options.length - 1)
        }
        break
    }
  }

  private highlightIndex(index: number): void {
    if (index < 0 || index >= this.state.options.length) {
      return
    }

    this.setState({ highlightedIndex: index })

    // Update visual highlight
    const optionElements = this.listbox?.querySelectorAll(this.config.optionSelector!)
    optionElements?.forEach((el, i) => {
      if (i === index) {
        el.setAttribute('data-highlighted', '')
        el.scrollIntoView({ block: 'nearest' })
        this.input?.setAttribute('aria-activedescendant', el.id)
      } else {
        el.removeAttribute('data-highlighted')
      }
    })
  }

  private renderOptions(): void {
    if (!this.listbox) {
      return
    }

    const { options, isLoading, highlightedIndex } = this.state

    // Clear existing content
    this.listbox.innerHTML = ''

    // Show loading
    if (isLoading && this.config.showLoading) {
      const loading = document.createElement('div')
      loading.className = 'combobox-loading'
      loading.setAttribute('data-coral-combobox-loading', '')
      loading.textContent = this.config.loadingText!
      this.listbox.appendChild(loading)
      return
    }

    // Show empty state
    if (options.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'combobox-empty'
      empty.setAttribute('data-coral-combobox-empty', '')
      empty.textContent = this.config.emptyText!
      this.listbox.appendChild(empty)
      return
    }

    // Group options if needed
    const groups = new Map<string, ComboboxOption[]>()
    const ungrouped: ComboboxOption[] = []

    options.forEach((option) => {
      if (option.group) {
        const group = groups.get(option.group) || []
        group.push(option)
        groups.set(option.group, group)
      } else {
        ungrouped.push(option)
      }
    })

    // Render ungrouped options
    let globalIndex = 0

    ungrouped.forEach((option) => {
      const el = this.createOptionElement(option, globalIndex)
      this.listbox!.appendChild(el)
      globalIndex++
    })

    // Render grouped options
    groups.forEach((groupOptions, groupName) => {
      // Group header
      const header = document.createElement('div')
      header.className = 'combobox-group-header'
      header.setAttribute('data-coral-combobox-group', '')
      header.setAttribute('role', 'presentation')
      header.textContent = groupName
      this.listbox!.appendChild(header)

      // Group options
      groupOptions.forEach((option) => {
        const el = this.createOptionElement(option, globalIndex)
        this.listbox!.appendChild(el)
        globalIndex++
      })
    })

    // Apply initial highlight
    if (highlightedIndex >= 0) {
      this.highlightIndex(highlightedIndex)
    }

    // Set max height
    this.listbox.style.maxHeight = `${this.config.maxHeight}px`
    this.listbox.style.overflowY = 'auto'
  }

  private createOptionElement(option: ComboboxOption, index: number): HTMLElement {
    const el = document.createElement('div')
    el.className = 'combobox-option'
    el.setAttribute('data-coral-combobox-option', '')
    el.setAttribute('role', 'option')
    el.setAttribute('id', `${this.id}-option-${index}`)
    el.setAttribute('data-value', option.value)
    el.setAttribute('aria-selected', String(option.value === this.state.selectedValue))

    if (option.disabled) {
      el.setAttribute('aria-disabled', 'true')
      el.setAttribute('data-disabled', '')
    }

    // Icon (sanitize to prevent XSS)
    if (option.icon) {
      const icon = document.createElement('span')
      icon.className = 'combobox-option-icon'
      icon.innerHTML = sanitizeIconHtml(option.icon)
      el.appendChild(icon)
    }

    // Content
    const content = document.createElement('div')
    content.className = 'combobox-option-content'

    const label = document.createElement('span')
    label.className = 'combobox-option-label'
    label.textContent = option.label
    content.appendChild(label)

    if (option.description) {
      const desc = document.createElement('span')
      desc.className = 'combobox-option-description'
      desc.textContent = option.description
      content.appendChild(desc)
    }

    el.appendChild(content)

    // Event listeners
    el.addEventListener('click', () => {
      if (!option.disabled) {
        this.selectOption(option)
      }
    })

    el.addEventListener('mouseenter', () => {
      if (!option.disabled) {
        this.highlightIndex(index)
      }
    })

    return el
  }

  private selectOption(option: ComboboxOption): void {
    if (option.disabled) {
      return
    }

    this.setState({
      selectedValue: option.value,
      selectedOption: option,
      inputValue: option.label,
    })

    if (this.input) {
      this.input.value = option.label
    }

    // Update clear button visibility
    if (this.clearButton) {
      this.clearButton.style.display = this.config.clearable ? '' : 'none'
    }

    this.dispatch('select', { value: option.value, option })
    this.dispatch('change', { value: option.value, option })
    this.close()
  }

  private selectCustomValue(value: string): void {
    const customOption: ComboboxOption = {
      value,
      label: value,
    }

    this.setState({
      selectedValue: value,
      selectedOption: customOption,
      inputValue: value,
    })

    this.dispatch('select', { value, option: customOption, isCustom: true })
    this.dispatch('change', { value, option: customOption, isCustom: true })
    this.close()
  }

  protected override render(): void {
    if (!this.input || !this.listbox) {
      return
    }

    if (this.state.isOpen) {
      this.listbox.style.display = ''
      this.listbox.removeAttribute('hidden')
      this.input.setAttribute('aria-expanded', 'true')
      this.element.setAttribute('data-open', '')
    } else {
      this.listbox.style.display = 'none'
      this.listbox.setAttribute('hidden', '')
      this.input.setAttribute('aria-expanded', 'false')
      this.input.removeAttribute('aria-activedescendant')
      this.element.removeAttribute('data-open')
    }
  }

  /**
   * Clear the selection
   */
  clear(): void {
    this.setState({
      selectedValue: null,
      selectedOption: null,
      inputValue: '',
      highlightedIndex: -1,
    })

    if (this.input) {
      this.input.value = ''
      this.input.focus()
    }

    if (this.clearButton) {
      this.clearButton.style.display = 'none'
    }

    this.dispatch('clear')
    this.dispatch('change', { value: null, option: null })
  }

  /**
   * Get current value
   */
  getValue(): string | null {
    return this.state.selectedValue
  }

  /**
   * Set value programmatically
   */
  setValue(value: string): void {
    const option = this.state.options.find((o) => o.value === value)
    if (option) {
      this.selectOption(option)
    } else if (this.config.allowCustomValue) {
      this.selectCustomValue(value)
    }
  }

  /**
   * Enable the combobox
   */
  enable(): void {
    this.config.disabled = false
    if (this.input) {
      this.input.disabled = false
      this.input.removeAttribute('aria-disabled')
    }
    this.element.removeAttribute('data-disabled')
  }

  /**
   * Disable the combobox
   */
  disable(): void {
    this.config.disabled = true
    if (this.input) {
      this.input.disabled = true
      this.input.setAttribute('aria-disabled', 'true')
    }
    this.element.setAttribute('data-disabled', '')
    this.close()
  }

  /**
   * Focus the input
   */
  focus(): void {
    this.input?.focus()
  }

  /**
   * Update options
   */
  setOptions(options: ComboboxOption[]): void {
    this.config.options = options
    this.setState({ options })
    this.renderOptions()
  }
}

/**
 * Create a combobox instance
 */
export const createCombobox = createComponentFactory(Combobox)

export default Combobox
