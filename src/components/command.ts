/**
 * Command Palette Component
 *
 * Accessible command palette (Cmd+K style) component.
 * @module components/command
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Command item
 */
export interface CommandItem {
  id: string
  label: string
  description?: string
  icon?: string
  shortcut?: string
  group?: string
  disabled?: boolean
  action?: () => void
  keywords?: string[]
}

/**
 * Command group
 */
export interface CommandGroup {
  id: string
  label: string
  items: CommandItem[]
}

/**
 * Command configuration
 */
export interface CommandConfig extends ComponentConfig {
  /**
   * Command items
   */
  items?: CommandItem[]

  /**
   * Command groups
   */
  groups?: CommandGroup[]

  /**
   * Placeholder text
   * @default 'Type a command or search...'
   */
  placeholder?: string

  /**
   * Keyboard shortcut to open
   * @default 'k'
   */
  openKey?: string

  /**
   * Modifier key for shortcut
   * @default 'meta' (Cmd on Mac, Ctrl on others)
   */
  openModifier?: 'meta' | 'ctrl' | 'alt' | 'shift'

  /**
   * Close on select
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Empty message when no results
   * @default 'No results found.'
   */
  emptyMessage?: string

  /**
   * Maximum items to show
   * @default 10
   */
  maxResults?: number

  /**
   * Dialog element selector
   * @default '[data-coral-command-dialog]'
   */
  dialogSelector?: string

  /**
   * Input element selector
   * @default '[data-coral-command-input]'
   */
  inputSelector?: string

  /**
   * List element selector
   * @default '[data-coral-command-list]'
   */
  listSelector?: string

  /**
   * Item element selector
   * @default '[data-coral-command-item]'
   */
  itemSelector?: string

  /**
   * Group element selector
   * @default '[data-coral-command-group]'
   */
  groupSelector?: string

  /**
   * Empty element selector
   * @default '[data-coral-command-empty]'
   */
  emptySelector?: string
}

/**
 * Command state
 */
export interface CommandState extends ComponentState {
  isOpen: boolean
  query: string
  highlightedIndex: number
  filteredItems: CommandItem[]
  filteredGroups: CommandGroup[]
}

/**
 * Command palette component
 *
 * @example
 * ```html
 * <div data-coral-command>
 *   <div data-coral-command-dialog role="dialog">
 *     <div data-coral-command-header>
 *       <input data-coral-command-input type="text" placeholder="Type a command..." />
 *     </div>
 *     <div data-coral-command-list role="listbox">
 *       <div data-coral-command-group>
 *         <div data-coral-command-group-heading>Actions</div>
 *         <div data-coral-command-item role="option">New File</div>
 *         <div data-coral-command-item role="option">Open File</div>
 *       </div>
 *     </div>
 *     <div data-coral-command-empty>No results found.</div>
 *   </div>
 * </div>
 * ```
 */
export class Command extends BaseComponent {
  protected declare config: CommandConfig
  protected declare state: CommandState

  private dialog: HTMLElement | null = null
  private input: HTMLInputElement | null = null
  private list: HTMLElement | null = null
  private emptyEl: HTMLElement | null = null
  private itemElements: HTMLElement[] = []
  private previousActiveElement: Element | null = null

  protected getDefaultConfig(): CommandConfig {
    return {
      items: [],
      groups: [],
      placeholder: 'Type a command or search...',
      openKey: 'k',
      openModifier: 'meta',
      closeOnSelect: true,
      emptyMessage: 'No results found.',
      maxResults: 10,
      dialogSelector: '[data-coral-command-dialog]',
      inputSelector: '[data-coral-command-input]',
      listSelector: '[data-coral-command-list]',
      itemSelector: '[data-coral-command-item]',
      groupSelector: '[data-coral-command-group]',
      emptySelector: '[data-coral-command-empty]',
    }
  }

  protected getInitialState(): CommandState {
    return {
      isOpen: false,
      query: '',
      highlightedIndex: 0,
      filteredItems: this.config.items ?? [],
      filteredGroups: this.config.groups ?? [],
    }
  }

  protected setupAria(): void {
    this.dialog = this.query(this.config.dialogSelector!)
    this.input = this.query(this.config.inputSelector!) as HTMLInputElement
    this.list = this.query(this.config.listSelector!)
    this.emptyEl = this.query(this.config.emptySelector!)
    this.itemElements = Array.from(this.queryAll(this.config.itemSelector!))

    // Set up dialog ARIA
    if (this.dialog) {
      this.dialog.setAttribute('role', 'dialog')
      this.dialog.setAttribute('aria-modal', 'true')
      this.dialog.setAttribute('aria-label', 'Command palette')
    }

    // Set up input ARIA
    if (this.input) {
      this.input.setAttribute('role', 'combobox')
      this.input.setAttribute('aria-haspopup', 'listbox')
      this.input.setAttribute('aria-expanded', 'false')
      this.input.setAttribute('aria-autocomplete', 'list')
      this.input.placeholder = this.config.placeholder ?? ''

      if (this.list) {
        if (!this.list.id) {
          this.list.id = `${this.id}-list`
        }
        this.input.setAttribute('aria-controls', this.list.id)
      }
    }

    // Set up list ARIA
    if (this.list) {
      this.list.setAttribute('role', 'listbox')
    }

    // Build items from DOM if not in config
    if (!this.config.items?.length && this.itemElements.length) {
      this.config.items = this.itemElements.map((item) => ({
        id: item.id || this.generateItemId(),
        label: item.textContent?.trim() ?? '',
        disabled: item.hasAttribute('data-disabled'),
      }))
      this.state.filteredItems = this.config.items
    }

    // Set up item ARIA
    this.itemElements.forEach((item, index) => {
      item.setAttribute('role', 'option')
      if (!item.id) {
        item.id = `${this.id}-item-${index}`
      }
      item.setAttribute('aria-selected', 'false')
    })

    // Initial state - hidden
    this.element.style.display = 'none'
    this.element.setAttribute('aria-hidden', 'true')
  }

  private generateItemId(): string {
    return `${this.id}-item-${Math.random().toString(36).substring(2, 9)}`
  }

  protected bindEvents(): void {
    // Global keyboard shortcut
    this.addEventListener(document, 'keydown', (e: Event) => {
      this.handleGlobalKeyDown(e as KeyboardEvent)
    })

    // Input events
    if (this.input) {
      this.addEventListener(this.input, 'input', (e: Event) => {
        const target = e.target as HTMLInputElement
        this.search(target.value)
      })

      this.addEventListener(this.input, 'keydown', (e: Event) => {
        this.handleInputKeyDown(e as KeyboardEvent)
      })
    }

    // Item interactions
    this.itemElements.forEach((item, index) => {
      this.addEventListener(item, 'click', () => {
        if (!item.hasAttribute('data-disabled')) {
          this.selectIndex(index)
        }
      })

      this.addEventListener(item, 'mouseenter', () => {
        this.highlightIndex(index)
      })
    })

    // Click outside to close
    this.addEventListener(document, 'click', (e: Event) => {
      if (this.state.isOpen && !this.element.contains(e.target as Node)) {
        this.close()
      }
    })
  }

  private handleGlobalKeyDown(e: KeyboardEvent): void {
    const { openKey, openModifier } = this.config

    // Check modifier
    let modifierPressed = false
    switch (openModifier) {
      case 'meta':
        modifierPressed = e.metaKey || e.ctrlKey
        break
      case 'ctrl':
        modifierPressed = e.ctrlKey
        break
      case 'alt':
        modifierPressed = e.altKey
        break
      case 'shift':
        modifierPressed = e.shiftKey
        break
    }

    if (modifierPressed && e.key.toLowerCase() === openKey) {
      e.preventDefault()
      this.toggle()
    }

    // Escape to close
    if (e.key === 'Escape' && this.state.isOpen) {
      this.close()
    }
  }

  private handleInputKeyDown(e: KeyboardEvent): void {
    const { highlightedIndex, filteredItems } = this.state

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.highlightIndex(Math.min(highlightedIndex + 1, filteredItems.length - 1))
        break

      case 'ArrowUp':
        e.preventDefault()
        this.highlightIndex(Math.max(highlightedIndex - 1, 0))
        break

      case 'Enter':
        e.preventDefault()
        if (highlightedIndex >= 0 && filteredItems[highlightedIndex]) {
          this.selectIndex(highlightedIndex)
        }
        break

      case 'Home':
        e.preventDefault()
        this.highlightIndex(0)
        break

      case 'End':
        e.preventDefault()
        this.highlightIndex(filteredItems.length - 1)
        break
    }
  }

  private search(query: string): void {
    const { items, groups, maxResults } = this.config
    const lowerQuery = query.toLowerCase()

    let filteredItems: CommandItem[] = []

    // Filter items
    if (items?.length) {
      filteredItems = items.filter((item) => {
        if (item.disabled) {return false}

        const matchLabel = item.label.toLowerCase().includes(lowerQuery)
        const matchDescription = item.description?.toLowerCase().includes(lowerQuery)
        const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))

        return matchLabel || matchDescription || matchKeywords
      })
    }

    // Filter groups
    const filteredGroups: CommandGroup[] = []
    if (groups?.length) {
      groups.forEach((group) => {
        const groupItems = group.items.filter((item) => {
          if (item.disabled) {return false}

          const matchLabel = item.label.toLowerCase().includes(lowerQuery)
          const matchDescription = item.description?.toLowerCase().includes(lowerQuery)
          const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(lowerQuery))

          return matchLabel || matchDescription || matchKeywords
        })

        if (groupItems.length > 0) {
          filteredGroups.push({ ...group, items: groupItems })
          filteredItems.push(...groupItems)
        }
      })
    }

    // Limit results
    if (maxResults && filteredItems.length > maxResults) {
      filteredItems = filteredItems.slice(0, maxResults)
    }

    this.setState({
      query,
      filteredItems,
      filteredGroups,
      highlightedIndex: filteredItems.length > 0 ? 0 : -1,
    })

    // Update DOM visibility
    this.updateItemVisibility(filteredItems)

    // Update empty state
    if (this.emptyEl) {
      this.emptyEl.style.display = query && filteredItems.length === 0 ? '' : 'none'
    }
  }

  private updateItemVisibility(filteredItems: CommandItem[]): void {
    const filteredIds = new Set(filteredItems.map((item) => item.id))

    this.itemElements.forEach((el) => {
      const itemId = el.id || el.dataset.id
      const isVisible = filteredIds.has(itemId ?? '')
      el.style.display = isVisible ? '' : 'none'
    })
  }

  private highlightIndex(index: number): void {
    this.setState({ highlightedIndex: index })

    // Update visual highlight
    this.itemElements.forEach((item, i) => {
      if (i === index) {
        item.setAttribute('data-highlighted', '')
        item.setAttribute('aria-selected', 'true')
        item.scrollIntoView({ block: 'nearest' })
      } else {
        item.removeAttribute('data-highlighted')
        item.setAttribute('aria-selected', 'false')
      }
    })

    // Update ARIA
    if (index >= 0 && this.itemElements[index]) {
      this.input?.setAttribute('aria-activedescendant', this.itemElements[index].id)
    }
  }

  private selectIndex(index: number): void {
    const item = this.state.filteredItems[index]
    if (!item || item.disabled) {return}

    // Execute action
    if (item.action) {
      item.action()
    }

    // Dispatch event
    this.dispatch('select', { item })

    // Close if configured
    if (this.config.closeOnSelect) {
      this.close()
    }
  }

  protected override render(): void {
    if (this.state.isOpen) {
      this.element.style.display = ''
      this.element.removeAttribute('aria-hidden')
      this.element.setAttribute('data-open', '')
      this.input?.setAttribute('aria-expanded', 'true')
    } else {
      this.element.style.display = 'none'
      this.element.setAttribute('aria-hidden', 'true')
      this.element.removeAttribute('data-open')
      this.input?.setAttribute('aria-expanded', 'false')
    }
  }

  /**
   * Open the command palette
   */
  override open(): void {
    if (this.state.isOpen) {return}

    // Store active element
    this.previousActiveElement = document.activeElement

    // Lock scroll
    this.lockScroll()

    // Open
    this.setState({ isOpen: true })

    // Focus input
    requestAnimationFrame(() => {
      this.input?.focus()
      this.input?.select()
    })

    this.dispatch('open')
  }

  /**
   * Close the command palette
   */
  override close(): void {
    if (!this.state.isOpen) {return}

    // Clear search
    if (this.input) {
      this.input.value = ''
    }
    this.search('')

    // Unlock scroll
    this.unlockScroll()

    // Close
    this.setState({ isOpen: false, highlightedIndex: 0 })

    // Restore focus
    if (this.previousActiveElement instanceof HTMLElement) {
      this.previousActiveElement.focus()
    }

    this.dispatch('close')
  }

  /**
   * Set items programmatically
   */
  setItems(items: CommandItem[]): void {
    this.config.items = items
    this.search(this.state.query)
  }

  /**
   * Set groups programmatically
   */
  setGroups(groups: CommandGroup[]): void {
    this.config.groups = groups
    this.search(this.state.query)
  }

  /**
   * Get current query
   */
  getQuery(): string {
    return this.state.query
  }
}

/**
 * Create a command palette instance
 */
export const createCommand = createComponentFactory(Command)

export default Command
