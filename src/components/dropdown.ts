/**
 * Dropdown Component
 *
 * Accessible dropdown menu component.
 * @module components/dropdown
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Dropdown configuration
 */
export interface DropdownConfig extends ComponentConfig {
  /**
   * Whether clicking outside closes the dropdown
   * @default true
   */
  closeOnClickOutside?: boolean

  /**
   * Whether pressing Escape closes the dropdown
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to close when an item is selected
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Trigger element selector
   * @default '[data-coral-dropdown-trigger]'
   */
  triggerSelector?: string

  /**
   * Menu element selector
   * @default '[data-coral-dropdown-menu]'
   */
  menuSelector?: string

  /**
   * Menu item selector
   * @default '[data-coral-dropdown-item]'
   */
  itemSelector?: string

  /**
   * Placement of the dropdown
   * @default 'bottom-start'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'
}

/**
 * Dropdown state
 */
export interface DropdownState extends ComponentState {
  isOpen: boolean
  activeIndex: number
}

/**
 * Dropdown component
 *
 * @example
 * ```html
 * <div data-coral-dropdown>
 *   <button data-coral-dropdown-trigger>
 *     Open Menu
 *   </button>
 *   <ul data-coral-dropdown-menu role="menu">
 *     <li data-coral-dropdown-item role="menuitem">Item 1</li>
 *     <li data-coral-dropdown-item role="menuitem">Item 2</li>
 *     <li data-coral-dropdown-item role="menuitem">Item 3</li>
 *   </ul>
 * </div>
 * ```
 */
export class Dropdown extends BaseComponent {
  protected declare config: DropdownConfig
  protected declare state: DropdownState

  private trigger: HTMLElement | null = null
  private menu: HTMLElement | null = null
  private items: HTMLElement[] = []

  protected getDefaultConfig(): DropdownConfig {
    return {
      closeOnClickOutside: true,
      closeOnEscape: true,
      closeOnSelect: true,
      triggerSelector: '[data-coral-dropdown-trigger]',
      menuSelector: '[data-coral-dropdown-menu]',
      itemSelector: '[data-coral-dropdown-item]',
      placement: 'bottom-start',
    }
  }

  protected getInitialState(): DropdownState {
    return {
      isOpen: false,
      activeIndex: -1,
    }
  }

  protected setupAria(): void {
    this.trigger = this.query(this.config.triggerSelector!)
    this.menu = this.query(this.config.menuSelector!)
    this.items = Array.from(this.queryAll(this.config.itemSelector!))

    if (this.trigger && this.menu) {
      // Generate IDs
      if (!this.menu.id) {
        this.menu.id = `${this.element.id}-menu`
      }

      // Set up trigger
      this.trigger.setAttribute('aria-haspopup', 'menu')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.trigger.setAttribute('aria-controls', this.menu.id)

      // Set up menu
      if (!this.menu.getAttribute('role')) {
        this.menu.setAttribute('role', 'menu')
      }
      this.menu.setAttribute('aria-labelledby', this.trigger.id || `${this.element.id}-trigger`)

      // Set up items
      this.items.forEach((item, index) => {
        if (!item.getAttribute('role')) {
          item.setAttribute('role', 'menuitem')
        }
        item.setAttribute('tabindex', '-1')
        if (!item.id) {
          item.id = `${this.element.id}-item-${index}`
        }
      })
    }
  }

  protected bindEvents(): void {
    // Trigger click
    if (this.trigger) {
      this.addEventListener(this.trigger, 'click', () => this.toggle())
      this.addEventListener(this.trigger, 'keydown', (e: Event) => this.handleTriggerKeydown(e as KeyboardEvent))
    }

    // Item click
    this.items.forEach((item) => {
      this.addEventListener(item, 'click', () => this.selectItem(item))
    })

    // Menu keyboard navigation
    if (this.menu) {
      this.addEventListener(this.menu, 'keydown', (e: Event) => this.handleMenuKeydown(e as KeyboardEvent))
    }

    // Click outside
    if (this.config.closeOnClickOutside) {
      this.addEventListener(document, 'click', (e: Event) => {
        if (this.state.isOpen && !this.element.contains(e.target as Node)) {
          this.close()
        }
      })
    }

    // Escape key
    if (this.config.closeOnEscape) {
      this.addEventListener(document, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === 'Escape' && this.state.isOpen) {
          this.close()
          this.trigger?.focus()
        }
      })
    }
  }

  private handleTriggerKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.open()
        this.focusItem(0)
        break
      case 'ArrowUp':
        e.preventDefault()
        this.open()
        this.focusItem(this.items.length - 1)
        break
    }
  }

  private handleMenuKeydown(e: KeyboardEvent): void {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        this.focusNextItem()
        break
      case 'ArrowUp':
        e.preventDefault()
        this.focusPreviousItem()
        break
      case 'Home':
        e.preventDefault()
        this.focusItem(0)
        break
      case 'End':
        e.preventDefault()
        this.focusItem(this.items.length - 1)
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (this.state.activeIndex >= 0) {
          const item = this.items[this.state.activeIndex]
          if (item) {this.selectItem(item)}
        }
        break
      case 'Tab':
        this.close()
        break
    }
  }

  private focusItem(index: number): void {
    if (index >= 0 && index < this.items.length) {
      this.setState({ activeIndex: index })
      this.items[index]?.focus()
    }
  }

  private focusNextItem(): void {
    const next = (this.state.activeIndex + 1) % this.items.length
    this.focusItem(next)
  }

  private focusPreviousItem(): void {
    const prev = this.state.activeIndex <= 0 ? this.items.length - 1 : this.state.activeIndex - 1
    this.focusItem(prev)
  }

  private selectItem(item: HTMLElement): void {
    this.dispatch('select', { item, index: this.items.indexOf(item) })

    if (this.config.closeOnSelect) {
      this.close()
      this.trigger?.focus()
    }
  }

  protected override render(): void {
    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', String(this.state.isOpen))
    }

    if (this.menu) {
      if (this.state.isOpen) {
        this.menu.removeAttribute('hidden')
        this.menu.setAttribute('data-open', '')
        this.element.setAttribute('data-open', '')
      } else {
        this.menu.setAttribute('hidden', '')
        this.menu.removeAttribute('data-open')
        this.element.removeAttribute('data-open')
      }
    }

    // Update active item
    this.items.forEach((item, index) => {
      if (index === this.state.activeIndex) {
        item.setAttribute('data-active', '')
      } else {
        item.removeAttribute('data-active')
      }
    })
  }

  /**
   * Open the dropdown
   */
  override open(): void {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true, activeIndex: -1 })
      this.hooks.onOpen?.(this.getContext())
      this.dispatch('open')
    }
  }

  /**
   * Close the dropdown
   */
  override close(): void {
    if (this.state.isOpen) {
      this.setState({ isOpen: false, activeIndex: -1 })
      this.hooks.onClose?.(this.getContext())
      this.dispatch('close')
    }
  }
}

/**
 * Create a dropdown instance
 */
export const createDropdown = createComponentFactory(Dropdown)

export default Dropdown
