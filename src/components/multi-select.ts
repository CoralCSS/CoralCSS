/**
 * MultiSelect Component
 *
 * An accessible multi-selection dropdown component.
 * Allows selecting multiple options with tags/chips display.
 *
 * @module components/multi-select
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Sanitize SVG/icon HTML to prevent XSS
 *
 * Only allows safe SVG elements and attributes.
 * Blocks script, event handlers, and dangerous attributes.
 */
function sanitizeIconHtml(html: string): string {
  // Use DOMParser to parse and sanitize HTML
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'image/svg+xml')

  // Check for parsing errors
  const parserError = doc.querySelector('parsererror')
  if (parserError) {
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

  // Remove dangerous attributes
  const allElements = doc.getElementsByTagName('*')
  for (let i = 0; i < allElements.length; i++) {
    const el = allElements[i]
    const attrs = el?.attributes
    if (!attrs) continue

    const dangerousAttrs = [
      'onload', 'onerror', 'onclick', 'onmouseover', 'onmouseout',
      'onfocus', 'onblur', 'onkeydown', 'onkeyup', 'onkeypress',
      'xlink:href', 'data', 'href',
    ]

    for (let j = attrs.length - 1; j >= 0; j--) {
      const attr = attrs[j]
      if (!attr) continue

      const attrName = attr.name.toLowerCase()
      if (dangerousAttrs.some(da => attrName === da || attrName.startsWith('on'))) {
        el.removeAttribute(attr.name)
      }
    }
  }

  return doc.documentElement.outerHTML
}

/**
 * MultiSelect option
 */
export interface MultiSelectOption {
  value: string
  label: string
  description?: string
  disabled?: boolean
  group?: string
  icon?: string
  data?: Record<string, unknown>
}

/**
 * MultiSelect configuration
 */
export interface MultiSelectConfig extends ComponentConfig {
  /**
   * Available options
   */
  options?: MultiSelectOption[]

  /**
   * Default selected values
   */
  defaultValue?: string[]

  /**
   * Placeholder text when no items selected
   * @default 'Select items...'
   */
  placeholder?: string

  /**
   * Maximum number of selections allowed
   * @default Infinity
   */
  maxItems?: number

  /**
   * Minimum number of selections required
   * @default 0
   */
  minItems?: number

  /**
   * Allow searching/filtering options
   * @default true
   */
  searchable?: boolean

  /**
   * Allow clearing all selections
   * @default true
   */
  clearable?: boolean

  /**
   * Disable the component
   * @default false
   */
  disabled?: boolean

  /**
   * Close dropdown after selection
   * @default false
   */
  closeOnSelect?: boolean

  /**
   * Show selected items as tags
   * @default true
   */
  showTags?: boolean

  /**
   * Maximum tags to show before collapsing
   * @default 3
   */
  maxTags?: number

  /**
   * Empty message when no options match
   * @default 'No options found'
   */
  emptyText?: string

  /**
   * Loading text during async operations
   * @default 'Loading...'
   */
  loadingText?: string

  /**
   * Async search function
   */
  onSearch?: (query: string) => Promise<MultiSelectOption[]>

  /**
   * Trigger element selector
   * @default '[data-coral-multi-select-trigger]'
   */
  triggerSelector?: string

  /**
   * Content/dropdown element selector
   * @default '[data-coral-multi-select-content]'
   */
  contentSelector?: string

  /**
   * Input element selector
   * @default '[data-coral-multi-select-input]'
   */
  inputSelector?: string

  /**
   * Tags container selector
   * @default '[data-coral-multi-select-tags]'
   */
  tagsSelector?: string
}

/**
 * MultiSelect state
 */
export interface MultiSelectState extends ComponentState {
  isOpen: boolean
  isLoading: boolean
  searchQuery: string
  selectedValues: string[]
  selectedOptions: MultiSelectOption[]
  filteredOptions: MultiSelectOption[]
  highlightedIndex: number
}

/**
 * MultiSelect component
 *
 * @example
 * ```html
 * <div data-coral-multi-select>
 *   <div data-coral-multi-select-trigger>
 *     <div data-coral-multi-select-tags></div>
 *     <input data-coral-multi-select-input type="text" placeholder="Select items..." />
 *   </div>
 *   <div data-coral-multi-select-content>
 *     <!-- Options rendered dynamically -->
 *   </div>
 * </div>
 * ```
 *
 * @example
 * ```typescript
 * const multiSelect = createMultiSelect(element, {
 *   options: [
 *     { value: 'react', label: 'React' },
 *     { value: 'vue', label: 'Vue' },
 *     { value: 'svelte', label: 'Svelte' },
 *     { value: 'angular', label: 'Angular' },
 *   ],
 *   maxItems: 3,
 *   placeholder: 'Select frameworks...',
 * })
 * ```
 */
export class MultiSelect extends BaseComponent {
  protected declare config: MultiSelectConfig
  protected declare state: MultiSelectState

  private trigger: HTMLElement | null = null
  private content: HTMLElement | null = null
  private input: HTMLInputElement | null = null
  private tagsContainer: HTMLElement | null = null
  private debounceTimer: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): MultiSelectConfig {
    return {
      options: [],
      defaultValue: [],
      placeholder: 'Select items...',
      maxItems: Infinity,
      minItems: 0,
      searchable: true,
      clearable: true,
      disabled: false,
      closeOnSelect: false,
      showTags: true,
      maxTags: 3,
      emptyText: 'No options found',
      loadingText: 'Loading...',
      triggerSelector: '[data-coral-multi-select-trigger]',
      contentSelector: '[data-coral-multi-select-content]',
      inputSelector: '[data-coral-multi-select-input]',
      tagsSelector: '[data-coral-multi-select-tags]',
    }
  }

  protected getInitialState(): MultiSelectState {
    const defaultValues = this.config.defaultValue || []
    const selectedOptions = (this.config.options || []).filter((opt) =>
      defaultValues.includes(opt.value)
    )

    return {
      isOpen: false,
      isLoading: false,
      searchQuery: '',
      selectedValues: defaultValues,
      selectedOptions,
      filteredOptions: this.config.options || [],
      highlightedIndex: -1,
    }
  }

  protected setupAria(): void {
    this.trigger = this.query(this.config.triggerSelector!)
    this.content = this.query(this.config.contentSelector!)
    this.input = this.query(this.config.inputSelector!) as HTMLInputElement
    this.tagsContainer = this.query(this.config.tagsSelector!)

    // Create content if not present
    if (!this.content) {
      this.content = document.createElement('div')
      this.content.setAttribute('data-coral-multi-select-content', '')
      this.element.appendChild(this.content)
    }

    // Set up IDs
    if (!this.content.id) {
      this.content.id = `${this.id}-content`
    }

    // Set up trigger ARIA
    if (this.trigger) {
      this.trigger.setAttribute('role', 'combobox')
      this.trigger.setAttribute('aria-haspopup', 'listbox')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.trigger.setAttribute('aria-controls', this.content.id)
      this.trigger.tabIndex = 0
    }

    // Set up input
    if (this.input) {
      this.input.setAttribute('role', 'searchbox')
      this.input.setAttribute('aria-autocomplete', 'list')
      this.input.placeholder = this.config.placeholder!

      if (!this.config.searchable) {
        this.input.readOnly = true
      }
    }

    // Set up content
    this.content.setAttribute('role', 'listbox')
    this.content.setAttribute('aria-multiselectable', 'true')
    this.content.style.display = 'none'

    // Disable state
    if (this.config.disabled) {
      this.element.setAttribute('data-disabled', '')
      if (this.input) {
        this.input.disabled = true
      }
    }

    // Render initial state
    this.renderTags()
    this.renderOptions()
  }

  protected bindEvents(): void {
    // Trigger click
    if (this.trigger) {
      this.addEventListener(this.trigger, 'click', (e: Event) => {
        if ((e.target as HTMLElement).closest('[data-coral-multi-select-tag-remove]')) {
          return // Let tag remove handler handle it
        }
        this.toggle()
      })

      this.addEventListener(this.trigger, 'keydown', (e: Event) => {
        this.handleTriggerKeyDown(e as KeyboardEvent)
      })
    }

    // Input events
    if (this.input) {
      this.addEventListener(this.input, 'input', (e: Event) => {
        const target = e.target as HTMLInputElement
        this.handleSearch(target.value)
      })

      this.addEventListener(this.input, 'keydown', (e: Event) => {
        this.handleInputKeyDown(e as KeyboardEvent)
      })

      this.addEventListener(this.input, 'focus', () => {
        if (!this.state.isOpen) {
          this.open()
        }
      })
    }

    // Click outside
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.isOpen && !this.element.contains(e.target as Node)) {
        this.close()
      }
    })
  }

  private handleTriggerKeyDown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.toggle()
        break
      case 'ArrowDown':
        e.preventDefault()
        this.open()
        break
      case 'Escape':
        if (this.state.isOpen) {
          this.close()
        }
        break
    }
  }

  private handleInputKeyDown(e: KeyboardEvent): void {
    const { highlightedIndex, filteredOptions, selectedValues } = this.state

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.highlightIndex(Math.min(highlightedIndex + 1, filteredOptions.length - 1))
        break

      case 'ArrowUp':
        e.preventDefault()
        this.highlightIndex(Math.max(highlightedIndex - 1, 0))
        break

      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          this.toggleOption(filteredOptions[highlightedIndex]!)
        }
        break

      case 'Escape':
        this.close()
        break

      case 'Backspace':
        // Remove last tag if input is empty
        if (!this.state.searchQuery && selectedValues.length > 0) {
          const lastValue = selectedValues[selectedValues.length - 1]
          if (lastValue) {
            this.deselectValue(lastValue)
          }
        }
        break

      case 'Tab':
        this.close()
        break
    }
  }

  private handleSearch(query: string): void {
    this.setState({ searchQuery: query, highlightedIndex: 0 })

    // Debounce async search
    if (this.config.onSearch) {
      if (this.debounceTimer) {
        clearTimeout(this.debounceTimer)
      }

      this.debounceTimer = setTimeout(async () => {
        this.setState({ isLoading: true })
        this.renderOptions()

        try {
          const results = await this.config.onSearch!(query)
          this.setState({ filteredOptions: results, isLoading: false })
        } catch (error) {
          console.error('MultiSelect search error:', error)
          this.setState({ filteredOptions: [], isLoading: false })
        }

        this.renderOptions()
      }, 300)
    } else {
      // Local filtering
      const lowerQuery = query.toLowerCase()
      const filtered = (this.config.options || []).filter(
        (opt) =>
          opt.label.toLowerCase().includes(lowerQuery) ||
          opt.description?.toLowerCase().includes(lowerQuery)
      )
      this.setState({ filteredOptions: filtered })
      this.renderOptions()
    }
  }

  private highlightIndex(index: number): void {
    if (index < 0 || index >= this.state.filteredOptions.length) {
      return
    }

    this.setState({ highlightedIndex: index })

    // Update visual highlight
    const optionElements = this.content?.querySelectorAll('[data-coral-multi-select-option]')
    optionElements?.forEach((el, i) => {
      if (i === index) {
        el.setAttribute('data-highlighted', '')
        el.scrollIntoView({ block: 'nearest' })
      } else {
        el.removeAttribute('data-highlighted')
      }
    })
  }

  private toggleOption(option: MultiSelectOption): void {
    if (option.disabled) {
      return
    }

    const { selectedValues, selectedOptions } = this.state
    const isSelected = selectedValues.includes(option.value)

    if (isSelected) {
      this.deselectValue(option.value)
    } else {
      // Check max items
      if (selectedValues.length >= (this.config.maxItems || Infinity)) {
        this.dispatch('max-reached', { maxItems: this.config.maxItems })
        return
      }

      const newValues = [...selectedValues, option.value]
      const newOptions = [...selectedOptions, option]

      this.setState({
        selectedValues: newValues,
        selectedOptions: newOptions,
      })

      this.dispatch('select', { value: option.value, option, values: newValues })
      this.dispatch('change', { values: newValues, options: newOptions })
    }

    // Clear search
    this.setState({ searchQuery: '' })
    if (this.input) {
      this.input.value = ''
    }

    // Render updates
    this.renderTags()
    this.renderOptions()

    // Close if configured
    if (this.config.closeOnSelect) {
      this.close()
    } else {
      this.input?.focus()
    }
  }

  private deselectValue(value: string): void {
    const { selectedValues, selectedOptions } = this.state
    const minItems = this.config.minItems ?? 0

    // Check min items
    if (selectedValues.length <= minItems) {
      this.dispatch('min-reached', { minItems })
      return
    }

    const newValues = selectedValues.filter((v) => v !== value)
    const newOptions = selectedOptions.filter((o) => o.value !== value)
    const removedOption = selectedOptions.find((o) => o.value === value)

    this.setState({
      selectedValues: newValues,
      selectedOptions: newOptions,
    })

    this.dispatch('deselect', { value, option: removedOption, values: newValues })
    this.dispatch('change', { values: newValues, options: newOptions })

    this.renderTags()
    this.renderOptions()
  }

  private renderTags(): void {
    if (!this.tagsContainer || !this.config.showTags) {
      return
    }

    const { selectedOptions, selectedValues } = this.state
    const maxTags = this.config.maxTags || 3

    this.tagsContainer.innerHTML = ''

    // Render visible tags
    const visibleOptions = selectedOptions.slice(0, maxTags)
    visibleOptions.forEach((option) => {
      const tag = this.createTagElement(option)
      this.tagsContainer!.appendChild(tag)
    })

    // Show overflow count
    if (selectedValues.length > maxTags) {
      const overflow = document.createElement('span')
      overflow.className = 'multi-select-overflow'
      overflow.setAttribute('data-coral-multi-select-overflow', '')
      overflow.textContent = `+${selectedValues.length - maxTags}`
      this.tagsContainer.appendChild(overflow)
    }

    // Update placeholder visibility
    if (this.input) {
      this.input.placeholder = selectedValues.length > 0 ? '' : this.config.placeholder!
    }
  }

  private createTagElement(option: MultiSelectOption): HTMLElement {
    const tag = document.createElement('span')
    tag.className = 'multi-select-tag'
    tag.setAttribute('data-coral-multi-select-tag', '')
    tag.setAttribute('data-value', option.value)

    const label = document.createElement('span')
    label.className = 'multi-select-tag-label'
    label.textContent = option.label
    tag.appendChild(label)

    const removeBtn = document.createElement('button')
    removeBtn.type = 'button'
    removeBtn.className = 'multi-select-tag-remove'
    removeBtn.setAttribute('data-coral-multi-select-tag-remove', '')
    removeBtn.setAttribute('aria-label', `Remove ${option.label}`)
    removeBtn.innerHTML = '×'

    removeBtn.addEventListener('click', (e) => {
      e.stopPropagation()
      this.deselectValue(option.value)
    })

    tag.appendChild(removeBtn)

    return tag
  }

  private renderOptions(): void {
    if (!this.content) {
      return
    }

    const { filteredOptions, selectedValues, isLoading, highlightedIndex } = this.state

    this.content.innerHTML = ''

    // Loading state
    if (isLoading) {
      const loading = document.createElement('div')
      loading.className = 'multi-select-loading'
      loading.setAttribute('data-coral-multi-select-loading', '')
      loading.textContent = this.config.loadingText!
      this.content.appendChild(loading)
      return
    }

    // Empty state
    if (filteredOptions.length === 0) {
      const empty = document.createElement('div')
      empty.className = 'multi-select-empty'
      empty.setAttribute('data-coral-multi-select-empty', '')
      empty.textContent = this.config.emptyText!
      this.content.appendChild(empty)
      return
    }

    // Group options
    const groups = new Map<string, MultiSelectOption[]>()
    const ungrouped: MultiSelectOption[] = []

    filteredOptions.forEach((option) => {
      if (option.group) {
        const group = groups.get(option.group) || []
        group.push(option)
        groups.set(option.group, group)
      } else {
        ungrouped.push(option)
      }
    })

    // Render ungrouped
    let globalIndex = 0

    ungrouped.forEach((option) => {
      const el = this.createOptionElement(option, globalIndex, selectedValues.includes(option.value))
      this.content!.appendChild(el)
      globalIndex++
    })

    // Render groups
    groups.forEach((groupOptions, groupName) => {
      const header = document.createElement('div')
      header.className = 'multi-select-group-header'
      header.setAttribute('data-coral-multi-select-group', '')
      header.setAttribute('role', 'presentation')
      header.textContent = groupName
      this.content!.appendChild(header)

      groupOptions.forEach((option) => {
        const el = this.createOptionElement(option, globalIndex, selectedValues.includes(option.value))
        this.content!.appendChild(el)
        globalIndex++
      })
    })

    // Apply highlight
    if (highlightedIndex >= 0) {
      this.highlightIndex(highlightedIndex)
    }
  }

  private createOptionElement(option: MultiSelectOption, index: number, isSelected: boolean): HTMLElement {
    const el = document.createElement('div')
    el.className = 'multi-select-option'
    el.setAttribute('data-coral-multi-select-option', '')
    el.setAttribute('role', 'option')
    el.setAttribute('id', `${this.id}-option-${index}`)
    el.setAttribute('data-value', option.value)
    el.setAttribute('aria-selected', String(isSelected))

    if (isSelected) {
      el.setAttribute('data-selected', '')
    }

    if (option.disabled) {
      el.setAttribute('aria-disabled', 'true')
      el.setAttribute('data-disabled', '')
    }

    // Checkbox indicator
    const checkbox = document.createElement('span')
    checkbox.className = 'multi-select-option-checkbox'
    checkbox.setAttribute('data-coral-multi-select-checkbox', '')
    el.appendChild(checkbox)

    // Icon (sanitize to prevent XSS)
    if (option.icon) {
      const icon = document.createElement('span')
      icon.className = 'multi-select-option-icon'
      icon.innerHTML = sanitizeIconHtml(option.icon)
      el.appendChild(icon)
    }

    // Content
    const content = document.createElement('div')
    content.className = 'multi-select-option-content'

    const label = document.createElement('span')
    label.className = 'multi-select-option-label'
    label.textContent = option.label
    content.appendChild(label)

    if (option.description) {
      const desc = document.createElement('span')
      desc.className = 'multi-select-option-description'
      desc.textContent = option.description
      content.appendChild(desc)
    }

    el.appendChild(content)

    // Events
    el.addEventListener('click', () => {
      if (!option.disabled) {
        this.toggleOption(option)
      }
    })

    el.addEventListener('mouseenter', () => {
      if (!option.disabled) {
        this.highlightIndex(index)
      }
    })

    return el
  }

  protected override render(): void {
    if (!this.trigger || !this.content) {
      return
    }

    if (this.state.isOpen) {
      this.content.style.display = ''
      this.content.removeAttribute('hidden')
      this.trigger.setAttribute('aria-expanded', 'true')
      this.element.setAttribute('data-open', '')
    } else {
      this.content.style.display = 'none'
      this.content.setAttribute('hidden', '')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.element.removeAttribute('data-open')
    }
  }

  /**
   * Get selected values
   */
  getValue(): string[] {
    return [...this.state.selectedValues]
  }

  /**
   * Get selected options
   */
  getSelectedOptions(): MultiSelectOption[] {
    return [...this.state.selectedOptions]
  }

  /**
   * Set selected values programmatically
   */
  setValue(values: string[]): void {
    const options = (this.config.options || []).filter((opt) => values.includes(opt.value))

    this.setState({
      selectedValues: values,
      selectedOptions: options,
    })

    this.renderTags()
    this.renderOptions()

    this.dispatch('change', { values, options })
  }

  /**
   * Select a value
   */
  select(value: string): void {
    const option = (this.config.options || []).find((o) => o.value === value)
    if (option) {
      this.toggleOption(option)
    }
  }

  /**
   * Deselect a value
   */
  deselect(value: string): void {
    if (this.state.selectedValues.includes(value)) {
      this.deselectValue(value)
    }
  }

  /**
   * Clear all selections
   */
  clear(): void {
    if (!this.config.clearable) {
      return
    }

    this.setState({
      selectedValues: [],
      selectedOptions: [],
      searchQuery: '',
    })

    if (this.input) {
      this.input.value = ''
    }

    this.renderTags()
    this.renderOptions()

    this.dispatch('clear')
    this.dispatch('change', { values: [], options: [] })
  }

  /**
   * Update options
   */
  setOptions(options: MultiSelectOption[]): void {
    this.config.options = options

    // Re-filter
    if (this.state.searchQuery) {
      this.handleSearch(this.state.searchQuery)
    } else {
      this.setState({ filteredOptions: options })
      this.renderOptions()
    }
  }

  /**
   * Enable the component
   */
  enable(): void {
    this.config.disabled = false
    this.element.removeAttribute('data-disabled')
    if (this.input) {
      this.input.disabled = false
    }
  }

  /**
   * Disable the component
   */
  disable(): void {
    this.config.disabled = true
    this.element.setAttribute('data-disabled', '')
    if (this.input) {
      this.input.disabled = true
    }
    this.close()
  }

  /**
   * Focus the input
   */
  focus(): void {
    this.input?.focus()
  }
}

/**
 * Create a multi-select instance
 */
export const createMultiSelect = createComponentFactory(MultiSelect)

export default MultiSelect
