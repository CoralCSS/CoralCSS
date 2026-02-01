/**
 * Menubar Component
 *
 * A horizontal menu bar with dropdown menus, similar to desktop application menus.
 * Supports keyboard navigation with arrow keys.
 *
 * @module components/menubar
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Menubar item type
 */
export interface MenubarItem {
  id: string
  label: string
  disabled?: boolean
  items?: MenubarSubItem[]
}

/**
 * Menubar sub-item type
 */
export interface MenubarSubItem {
  id: string
  label: string
  shortcut?: string
  disabled?: boolean
  checked?: boolean
  type?: 'item' | 'checkbox' | 'radio' | 'separator'
  items?: MenubarSubItem[]
}

/**
 * Menubar configuration
 */
export interface MenubarConfig extends ComponentConfig {
  /**
   * Menu items
   */
  items?: MenubarItem[]

  /**
   * Whether to loop keyboard navigation
   * @default true
   */
  loop?: boolean

  /**
   * Close menus when clicking outside
   * @default true
   */
  closeOnClickOutside?: boolean

  /**
   * Menu trigger selector
   * @default '[data-coral-menubar-trigger]'
   */
  triggerSelector?: string

  /**
   * Menu content selector
   * @default '[data-coral-menubar-content]'
   */
  contentSelector?: string

  /**
   * Menu item selector
   * @default '[data-coral-menubar-item]'
   */
  itemSelector?: string
}

/**
 * Menubar state
 */
export interface MenubarState extends ComponentState {
  openMenu: string | null
  highlightedTrigger: number
  highlightedItem: number
}

/**
 * Menubar component
 *
 * @example
 * ```html
 * <div data-coral-menubar role="menubar">
 *   <div data-coral-menubar-menu>
 *     <button data-coral-menubar-trigger>File</button>
 *     <div data-coral-menubar-content role="menu">
 *       <button data-coral-menubar-item role="menuitem">New</button>
 *       <button data-coral-menubar-item role="menuitem">Open</button>
 *       <div data-coral-menubar-separator role="separator"></div>
 *       <button data-coral-menubar-item role="menuitem">Save</button>
 *       <button data-coral-menubar-item role="menuitem" data-shortcut="Ctrl+S">Save As</button>
 *     </div>
 *   </div>
 *   <div data-coral-menubar-menu>
 *     <button data-coral-menubar-trigger>Edit</button>
 *     <div data-coral-menubar-content role="menu">
 *       <button data-coral-menubar-item role="menuitem" data-shortcut="Ctrl+Z">Undo</button>
 *       <button data-coral-menubar-item role="menuitem" data-shortcut="Ctrl+Y">Redo</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export class Menubar extends BaseComponent {
  protected declare config: MenubarConfig
  protected declare state: MenubarState

  private triggers: HTMLElement[] = []
  private menus: HTMLElement[] = []
  private menuContents: Map<HTMLElement, HTMLElement> = new Map()
  private menuItems: Map<HTMLElement, HTMLElement[]> = new Map()

  protected getDefaultConfig(): MenubarConfig {
    return {
      items: [],
      loop: true,
      closeOnClickOutside: true,
      triggerSelector: '[data-coral-menubar-trigger]',
      contentSelector: '[data-coral-menubar-content]',
      itemSelector: '[data-coral-menubar-item]',
    }
  }

  protected getInitialState(): MenubarState {
    return {
      openMenu: null,
      highlightedTrigger: -1,
      highlightedItem: -1,
    }
  }

  protected setupAria(): void {
    // Set up menubar role
    this.element.setAttribute('role', 'menubar')

    // Get all menu groups
    this.menus = Array.from(this.element.querySelectorAll('[data-coral-menubar-menu]'))
    this.triggers = []

    this.menus.forEach((menu, menuIndex) => {
      const trigger = menu.querySelector(this.config.triggerSelector!) as HTMLElement
      const content = menu.querySelector(this.config.contentSelector!) as HTMLElement

      if (trigger && content) {
        this.triggers.push(trigger)
        this.menuContents.set(trigger, content)

        // Set up trigger ARIA
        trigger.setAttribute('role', 'menuitem')
        trigger.setAttribute('aria-haspopup', 'menu')
        trigger.setAttribute('aria-expanded', 'false')
        trigger.setAttribute('tabindex', menuIndex === 0 ? '0' : '-1')

        // Set up content ID
        if (!content.id) {
          content.id = `${this.id}-menu-${menuIndex}`
        }
        trigger.setAttribute('aria-controls', content.id)

        // Set up content
        content.setAttribute('role', 'menu')
        content.setAttribute('aria-labelledby', trigger.id || `${this.id}-trigger-${menuIndex}`)
        content.style.display = 'none'

        // Set up menu items
        const items = Array.from(content.querySelectorAll(this.config.itemSelector!)) as HTMLElement[]
        this.menuItems.set(trigger, items)

        items.forEach((item, _itemIndex) => {
          // Skip separators
          if (item.hasAttribute('data-coral-menubar-separator')) {
            item.setAttribute('role', 'separator')
            return
          }

          item.setAttribute('role', 'menuitem')
          item.setAttribute('tabindex', '-1')

          // Handle checkbox items
          if (item.dataset.type === 'checkbox') {
            item.setAttribute('role', 'menuitemcheckbox')
            item.setAttribute('aria-checked', item.dataset.checked || 'false')
          }

          // Handle radio items
          if (item.dataset.type === 'radio') {
            item.setAttribute('role', 'menuitemradio')
            item.setAttribute('aria-checked', item.dataset.checked || 'false')
          }

          // Set up shortcut display
          const shortcut = item.dataset.shortcut
          if (shortcut) {
            const shortcutSpan = document.createElement('span')
            shortcutSpan.className = 'menubar-shortcut'
            shortcutSpan.textContent = shortcut
            shortcutSpan.setAttribute('aria-hidden', 'true')
            item.appendChild(shortcutSpan)
          }
        })
      }
    })
  }

  protected bindEvents(): void {
    // Trigger interactions
    this.triggers.forEach((trigger, index) => {
      this.addEventListener(trigger, 'click', () => {
        this.toggleMenu(trigger)
      })

      this.addEventListener(trigger, 'mouseenter', () => {
        if (this.state.openMenu !== null) {
          this.openMenu(trigger)
        }
      })

      this.addEventListener(trigger, 'keydown', (e: Event) => {
        this.handleTriggerKeyDown(e as KeyboardEvent, index)
      })
    })

    // Menu item interactions
    this.menuItems.forEach((items, trigger) => {
      items.forEach((item, itemIndex) => {
        if (item.getAttribute('role') === 'separator') {
          return
        }

        this.addEventListener(item, 'click', () => {
          this.selectItem(trigger, item)
        })

        this.addEventListener(item, 'mouseenter', () => {
          this.highlightItem(trigger, itemIndex)
        })

        this.addEventListener(item, 'keydown', (e: Event) => {
          this.handleItemKeyDown(e as KeyboardEvent, trigger, itemIndex)
        })
      })
    })

    // Click outside
    if (this.config.closeOnClickOutside) {
      this.addEventListener(document, 'click', (e: Event) => {
        if (this.state.openMenu && !this.element.contains(e.target as Node)) {
          this.closeAll()
        }
      })
    }
  }

  private handleTriggerKeyDown(e: KeyboardEvent, index: number): void {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault()
        this.openMenu(this.triggers[index]!)
        this.focusFirstItem(this.triggers[index]!)
        break

      case 'ArrowRight':
        e.preventDefault()
        this.focusNextTrigger(index)
        break

      case 'ArrowLeft':
        e.preventDefault()
        this.focusPreviousTrigger(index)
        break

      case 'Escape':
        e.preventDefault()
        this.closeAll()
        break
    }
  }

  private handleItemKeyDown(e: KeyboardEvent, trigger: HTMLElement, itemIndex: number): void {
    const items = this.menuItems.get(trigger) || []

    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.selectItem(trigger, items[itemIndex]!)
        break

      case 'ArrowDown':
        e.preventDefault()
        this.focusNextItem(trigger, itemIndex)
        break

      case 'ArrowUp':
        e.preventDefault()
        this.focusPreviousItem(trigger, itemIndex)
        break

      case 'ArrowRight': {
        e.preventDefault()
        const triggerIndex = this.triggers.indexOf(trigger)
        this.focusNextTrigger(triggerIndex)
        const nextTrigger = this.triggers[(triggerIndex + 1) % this.triggers.length]
        if (nextTrigger) {
          this.openMenu(nextTrigger)
          this.focusFirstItem(nextTrigger)
        }
        break
      }

      case 'ArrowLeft': {
        e.preventDefault()
        const triggerIdx = this.triggers.indexOf(trigger)
        this.focusPreviousTrigger(triggerIdx)
        const prevTrigger = this.triggers[(triggerIdx - 1 + this.triggers.length) % this.triggers.length]
        if (prevTrigger) {
          this.openMenu(prevTrigger)
          this.focusFirstItem(prevTrigger)
        }
        break
      }

      case 'Home':
        e.preventDefault()
        this.focusFirstItem(trigger)
        break

      case 'End':
        e.preventDefault()
        this.focusLastItem(trigger)
        break

      case 'Escape':
        e.preventDefault()
        this.closeAll()
        trigger.focus()
        break
    }
  }

  private focusNextTrigger(currentIndex: number): void {
    const nextIndex = this.config.loop
      ? (currentIndex + 1) % this.triggers.length
      : Math.min(currentIndex + 1, this.triggers.length - 1)

    this.triggers.forEach((t, i) => {
      t.setAttribute('tabindex', i === nextIndex ? '0' : '-1')
    })

    this.triggers[nextIndex]?.focus()
    this.setState({ highlightedTrigger: nextIndex })
  }

  private focusPreviousTrigger(currentIndex: number): void {
    const prevIndex = this.config.loop
      ? (currentIndex - 1 + this.triggers.length) % this.triggers.length
      : Math.max(currentIndex - 1, 0)

    this.triggers.forEach((t, i) => {
      t.setAttribute('tabindex', i === prevIndex ? '0' : '-1')
    })

    this.triggers[prevIndex]?.focus()
    this.setState({ highlightedTrigger: prevIndex })
  }

  private focusNextItem(trigger: HTMLElement, currentIndex: number): void {
    const items = this.menuItems.get(trigger) || []
    const focusableItems = items.filter((item) => item.getAttribute('role') !== 'separator')
    const currentFocusableIndex = focusableItems.indexOf(items[currentIndex]!)

    const nextIndex = this.config.loop
      ? (currentFocusableIndex + 1) % focusableItems.length
      : Math.min(currentFocusableIndex + 1, focusableItems.length - 1)

    this.highlightItem(trigger, items.indexOf(focusableItems[nextIndex]!))
  }

  private focusPreviousItem(trigger: HTMLElement, currentIndex: number): void {
    const items = this.menuItems.get(trigger) || []
    const focusableItems = items.filter((item) => item.getAttribute('role') !== 'separator')
    const currentFocusableIndex = focusableItems.indexOf(items[currentIndex]!)

    const prevIndex = this.config.loop
      ? (currentFocusableIndex - 1 + focusableItems.length) % focusableItems.length
      : Math.max(currentFocusableIndex - 1, 0)

    this.highlightItem(trigger, items.indexOf(focusableItems[prevIndex]!))
  }

  private focusFirstItem(trigger: HTMLElement): void {
    const items = this.menuItems.get(trigger) || []
    const firstFocusable = items.find((item) => item.getAttribute('role') !== 'separator')
    if (firstFocusable) {
      this.highlightItem(trigger, items.indexOf(firstFocusable))
    }
  }

  private focusLastItem(trigger: HTMLElement): void {
    const items = this.menuItems.get(trigger) || []
    const focusableItems = items.filter((item) => item.getAttribute('role') !== 'separator')
    const lastFocusable = focusableItems[focusableItems.length - 1]
    if (lastFocusable) {
      this.highlightItem(trigger, items.indexOf(lastFocusable))
    }
  }

  private highlightItem(trigger: HTMLElement, index: number): void {
    const items = this.menuItems.get(trigger) || []

    items.forEach((item, i) => {
      if (i === index) {
        item.setAttribute('data-highlighted', '')
        item.focus()
      } else {
        item.removeAttribute('data-highlighted')
      }
    })

    this.setState({ highlightedItem: index })
  }

  private selectItem(trigger: HTMLElement, item: HTMLElement): void {
    if (item.hasAttribute('disabled') || item.getAttribute('aria-disabled') === 'true') {
      return
    }

    const role = item.getAttribute('role')
    const value = item.dataset.value || item.textContent?.trim()

    // Handle checkbox toggle
    if (role === 'menuitemcheckbox') {
      const checked = item.getAttribute('aria-checked') === 'true'
      item.setAttribute('aria-checked', String(!checked))
      item.dataset.checked = String(!checked)
    }

    // Handle radio selection
    if (role === 'menuitemradio') {
      const items = this.menuItems.get(trigger) || []
      const group = item.dataset.group
      items.forEach((i) => {
        if (i.getAttribute('role') === 'menuitemradio' && i.dataset.group === group) {
          i.setAttribute('aria-checked', 'false')
          i.dataset.checked = 'false'
        }
      })
      item.setAttribute('aria-checked', 'true')
      item.dataset.checked = 'true'
    }

    // Dispatch event
    this.dispatch('select', {
      item: value,
      trigger: trigger.textContent?.trim(),
      element: item,
    })

    // Close menu after selection
    this.closeAll()
    trigger.focus()
  }

  protected override render(): void {
    const { openMenu } = this.state

    this.triggers.forEach((trigger) => {
      const content = this.menuContents.get(trigger)
      const isOpen = openMenu === trigger.id || (openMenu === 'true' && this.triggers.indexOf(trigger) === 0)

      trigger.setAttribute('aria-expanded', String(isOpen))
      trigger.setAttribute('data-state', isOpen ? 'open' : 'closed')

      if (content) {
        content.style.display = isOpen ? '' : 'none'
        content.setAttribute('data-state', isOpen ? 'open' : 'closed')
      }
    })
  }

  /**
   * Open a specific menu
   */
  openMenu(trigger: HTMLElement): void {
    this.closeAll()
    this.setState({ openMenu: trigger.id || 'true', highlightedItem: -1 })
    this.dispatch('open', { menu: trigger.textContent?.trim() })
  }

  /**
   * Close a specific menu
   */
  closeMenu(trigger: HTMLElement): void {
    const content = this.menuContents.get(trigger)
    if (content) {
      content.style.display = 'none'
      trigger.setAttribute('aria-expanded', 'false')
    }
  }

  /**
   * Toggle a menu
   */
  toggleMenu(trigger: HTMLElement): void {
    const isOpen = trigger.getAttribute('aria-expanded') === 'true'
    if (isOpen) {
      this.closeAll()
    } else {
      this.openMenu(trigger)
    }
  }

  /**
   * Close all menus
   */
  closeAll(): void {
    this.setState({ openMenu: null, highlightedItem: -1 })
    this.dispatch('close')
  }
}

/**
 * Create a menubar instance
 */
export const createMenubar = createComponentFactory(Menubar)

export default Menubar
