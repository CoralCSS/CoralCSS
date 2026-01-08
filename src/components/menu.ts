/**
 * Menu Component
 *
 * Accessible menu/navigation component with keyboard support.
 * @module components/menu
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Menu item type
 */
export interface MenuItem {
  id: string
  label: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  separator?: boolean
  submenu?: MenuItem[]
  action?: () => void
}

/**
 * Menu orientation
 */
export type MenuOrientation = 'horizontal' | 'vertical'

/**
 * Menu configuration
 */
export interface MenuConfig extends ComponentConfig {
  /**
   * Menu items
   */
  items?: MenuItem[]

  /**
   * Menu orientation
   * @default 'vertical'
   */
  orientation?: MenuOrientation

  /**
   * Whether to loop keyboard navigation
   * @default true
   */
  loop?: boolean

  /**
   * Close on select
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Trigger element selector (for dropdown menus)
   * @default '[data-coral-menu-trigger]'
   */
  triggerSelector?: string

  /**
   * Menu list selector
   * @default '[data-coral-menu-list]'
   */
  listSelector?: string

  /**
   * Menu item selector
   * @default '[data-coral-menu-item]'
   */
  itemSelector?: string

  /**
   * Submenu selector
   * @default '[data-coral-menu-submenu]'
   */
  submenuSelector?: string
}

/**
 * Menu state
 */
export interface MenuState extends ComponentState {
  isOpen: boolean
  activeIndex: number
  activeSubmenuIndex: number | null
}

/**
 * Menu component
 *
 * @example
 * ```html
 * <!-- Standalone menu -->
 * <nav data-coral-menu>
 *   <ul data-coral-menu-list role="menubar">
 *     <li data-coral-menu-item role="menuitem">Home</li>
 *     <li data-coral-menu-item role="menuitem">About</li>
 *     <li data-coral-menu-item role="menuitem">
 *       Products
 *       <ul data-coral-menu-submenu role="menu">
 *         <li data-coral-menu-item role="menuitem">Product 1</li>
 *         <li data-coral-menu-item role="menuitem">Product 2</li>
 *       </ul>
 *     </li>
 *   </ul>
 * </nav>
 *
 * <!-- Dropdown menu -->
 * <div data-coral-menu>
 *   <button data-coral-menu-trigger>Actions</button>
 *   <ul data-coral-menu-list role="menu">
 *     <li data-coral-menu-item role="menuitem">Edit</li>
 *     <li data-coral-menu-item role="menuitem" data-disabled>Delete</li>
 *     <li data-coral-menu-item role="separator"></li>
 *     <li data-coral-menu-item role="menuitem">Share</li>
 *   </ul>
 * </div>
 * ```
 */
export class Menu extends BaseComponent {
  protected declare config: MenuConfig
  protected declare state: MenuState

  private trigger: HTMLElement | null = null
  private list: HTMLElement | null = null
  private items: HTMLElement[] = []
  private isDropdown = false

  protected getDefaultConfig(): MenuConfig {
    return {
      items: [],
      orientation: 'vertical',
      loop: true,
      closeOnSelect: true,
      triggerSelector: '[data-coral-menu-trigger]',
      listSelector: '[data-coral-menu-list]',
      itemSelector: '[data-coral-menu-item]',
      submenuSelector: '[data-coral-menu-submenu]',
    }
  }

  protected getInitialState(): MenuState {
    return {
      isOpen: false,
      activeIndex: -1,
      activeSubmenuIndex: null,
    }
  }

  protected setupAria(): void {
    this.trigger = this.query(this.config.triggerSelector!)
    this.list = this.query(this.config.listSelector!)
    this.items = Array.from(this.queryAll(`:scope > ${this.config.listSelector} > ${this.config.itemSelector}`))

    this.isDropdown = !!this.trigger

    if (!this.list) return

    // Set up list ID
    if (!this.list.id) {
      this.list.id = `${this.id}-list`
    }

    // Set up list ARIA
    this.list.setAttribute('role', this.isDropdown ? 'menu' : 'menubar')
    this.list.setAttribute('aria-orientation', this.config.orientation!)

    if (this.isDropdown) {
      this.list.style.display = 'none'
    }

    // Set up trigger ARIA (if dropdown)
    if (this.trigger) {
      this.trigger.setAttribute('aria-haspopup', 'menu')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.trigger.setAttribute('aria-controls', this.list.id)
    }

    // Set up items ARIA
    this.items.forEach((item, index) => {
      const isSeparator = item.getAttribute('role') === 'separator' ||
                          item.hasAttribute('data-separator')

      if (isSeparator) {
        item.setAttribute('role', 'separator')
        return
      }

      item.setAttribute('role', 'menuitem')
      item.setAttribute('id', `${this.id}-item-${index}`)
      item.setAttribute('tabindex', index === 0 ? '0' : '-1')

      if (item.hasAttribute('data-disabled')) {
        item.setAttribute('aria-disabled', 'true')
      }

      // Check for submenu
      const submenu = item.querySelector(this.config.submenuSelector!)
      if (submenu) {
        item.setAttribute('aria-haspopup', 'menu')
        item.setAttribute('aria-expanded', 'false')
        submenu.setAttribute('role', 'menu')
        submenu.setAttribute('id', `${this.id}-submenu-${index}`)
        item.setAttribute('aria-controls', `${this.id}-submenu-${index}`)
      }
    })
  }

  protected bindEvents(): void {
    // Trigger click (for dropdowns)
    if (this.trigger) {
      this.addEventListener(this.trigger, 'click', () => this.toggle())
      this.addEventListener(this.trigger, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === 'ArrowDown' || keyEvent.key === 'Enter' || keyEvent.key === ' ') {
          e.preventDefault()
          this.open()
          this.focusItem(0)
        }
      })
    }

    // Item interactions
    this.items.forEach((item, index) => {
      if (item.getAttribute('role') === 'separator') return

      this.addEventListener(item, 'click', (e: Event) => {
        e.stopPropagation()
        if (!item.hasAttribute('data-disabled')) {
          this.activateItem(index)
        }
      })

      this.addEventListener(item, 'keydown', (e: Event) => {
        this.handleKeyDown(e as KeyboardEvent, index)
      })

      this.addEventListener(item, 'mouseenter', () => {
        this.focusItem(index)
      })
    })

    // Click outside (for dropdowns)
    if (this.isDropdown) {
      this.addEventListener(document, 'click', (e: Event) => {
        if (this.state.isOpen && !this.element.contains(e.target as Node)) {
          this.close()
        }
      })
    }

    // Escape key
    this.addEventListener(document, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      if (keyEvent.key === 'Escape' && this.state.isOpen) {
        this.close()
        this.trigger?.focus()
      }
    })
  }

  private handleKeyDown(e: KeyboardEvent, currentIndex: number): void {
    const isHorizontal = this.config.orientation === 'horizontal'
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'

    switch (e.key) {
      case nextKey:
        e.preventDefault()
        this.focusNextItem(currentIndex)
        break

      case prevKey:
        e.preventDefault()
        this.focusPreviousItem(currentIndex)
        break

      case 'ArrowRight':
        // Open submenu
        if (!isHorizontal) {
          const submenu = this.items[currentIndex]?.querySelector(this.config.submenuSelector!)
          if (submenu) {
            e.preventDefault()
            this.openSubmenu(currentIndex)
          }
        }
        break

      case 'ArrowLeft':
        // Close submenu
        if (!isHorizontal && this.state.activeSubmenuIndex !== null) {
          e.preventDefault()
          this.closeSubmenu()
        }
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
        this.activateItem(currentIndex)
        break

      case 'Tab':
        if (this.isDropdown) {
          this.close()
        }
        break
    }
  }

  private focusItem(index: number): void {
    // Skip separators and disabled items
    let targetIndex = index
    while (
      targetIndex >= 0 &&
      targetIndex < this.items.length &&
      (this.items[targetIndex]?.getAttribute('role') === 'separator' ||
       this.items[targetIndex]?.hasAttribute('data-disabled'))
    ) {
      targetIndex++
    }

    if (targetIndex >= this.items.length) {
      targetIndex = this.items.length - 1
      while (
        targetIndex >= 0 &&
        (this.items[targetIndex]?.getAttribute('role') === 'separator' ||
         this.items[targetIndex]?.hasAttribute('data-disabled'))
      ) {
        targetIndex--
      }
    }

    if (targetIndex < 0) return

    // Update tabindex
    this.items.forEach((item, i) => {
      item.setAttribute('tabindex', i === targetIndex ? '0' : '-1')
      item.removeAttribute('data-active')
    })

    // Focus the item
    this.items[targetIndex]?.focus()
    this.items[targetIndex]?.setAttribute('data-active', '')
    this.setState({ activeIndex: targetIndex })
  }

  private focusNextItem(currentIndex: number): void {
    let nextIndex = currentIndex + 1

    // Skip separators
    while (
      nextIndex < this.items.length &&
      (this.items[nextIndex]?.getAttribute('role') === 'separator' ||
       this.items[nextIndex]?.hasAttribute('data-disabled'))
    ) {
      nextIndex++
    }

    if (nextIndex >= this.items.length) {
      nextIndex = this.config.loop ? 0 : currentIndex
    }

    this.focusItem(nextIndex)
  }

  private focusPreviousItem(currentIndex: number): void {
    let prevIndex = currentIndex - 1

    // Skip separators
    while (
      prevIndex >= 0 &&
      (this.items[prevIndex]?.getAttribute('role') === 'separator' ||
       this.items[prevIndex]?.hasAttribute('data-disabled'))
    ) {
      prevIndex--
    }

    if (prevIndex < 0) {
      prevIndex = this.config.loop ? this.items.length - 1 : currentIndex
    }

    this.focusItem(prevIndex)
  }

  private activateItem(index: number): void {
    const item = this.items[index]
    if (!item || item.hasAttribute('data-disabled')) return

    // Check for submenu
    const submenu = item.querySelector(this.config.submenuSelector!)
    if (submenu) {
      this.openSubmenu(index)
      return
    }

    // Dispatch select event
    this.dispatch('select', {
      index,
      item,
      value: item.dataset.value,
    })

    // Execute action if defined in config
    const configItem = this.config.items?.[index]
    if (configItem?.action) {
      configItem.action()
    }

    // Close if configured
    if (this.config.closeOnSelect && this.isDropdown) {
      this.close()
      this.trigger?.focus()
    }
  }

  private openSubmenu(index: number): void {
    const item = this.items[index]
    const submenu = item?.querySelector(this.config.submenuSelector!) as HTMLElement

    if (!submenu) return

    // Close other submenus
    this.items.forEach((i, idx) => {
      if (idx !== index) {
        const otherSubmenu = i.querySelector(this.config.submenuSelector!) as HTMLElement
        if (otherSubmenu) {
          otherSubmenu.style.display = 'none'
          i.setAttribute('aria-expanded', 'false')
        }
      }
    })

    // Open this submenu
    submenu.style.display = ''
    item?.setAttribute('aria-expanded', 'true')
    this.setState({ activeSubmenuIndex: index })

    // Focus first item in submenu
    const firstSubmenuItem = submenu.querySelector(this.config.itemSelector!) as HTMLElement
    firstSubmenuItem?.focus()
  }

  private closeSubmenu(): void {
    if (this.state.activeSubmenuIndex === null) return

    const item = this.items[this.state.activeSubmenuIndex]
    const submenu = item?.querySelector(this.config.submenuSelector!) as HTMLElement

    if (submenu && item) {
      submenu.style.display = 'none'
      item.setAttribute('aria-expanded', 'false')
    }

    this.setState({ activeSubmenuIndex: null })
    item?.focus()
  }

  protected override render(): void {
    if (!this.list) return

    if (this.isDropdown) {
      if (this.state.isOpen) {
        this.list.style.display = ''
        this.list.removeAttribute('hidden')
        this.list.setAttribute('data-open', '')
        this.trigger?.setAttribute('aria-expanded', 'true')
        this.trigger?.setAttribute('data-open', '')
      } else {
        this.list.style.display = 'none'
        this.list.setAttribute('hidden', '')
        this.list.removeAttribute('data-open')
        this.trigger?.setAttribute('aria-expanded', 'false')
        this.trigger?.removeAttribute('data-open')
      }
    }
  }

  override open(): void {
    if (this.isDropdown) {
      super.open()
    }
  }

  override close(): void {
    if (this.isDropdown) {
      this.closeSubmenu()
      super.close()
    }
  }
}

/**
 * Create a menu instance
 */
export const createMenu = createComponentFactory(Menu)

export default Menu
