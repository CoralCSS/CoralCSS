/**
 * Context Menu Component
 *
 * Accessible right-click context menu component.
 * @module components/context-menu
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Context menu item
 */
export interface ContextMenuItem {
  id: string
  label: string
  icon?: string
  shortcut?: string
  disabled?: boolean
  danger?: boolean
  separator?: boolean
  submenu?: ContextMenuItem[]
  action?: () => void
}

/**
 * Context menu configuration
 */
export interface ContextMenuConfig extends ComponentConfig {
  /**
   * Menu items
   */
  items?: ContextMenuItem[]

  /**
   * Trigger element selector (where right-click is captured)
   * @default null (uses parent element)
   */
  triggerSelector?: string | null

  /**
   * Whether to close on item select
   * @default true
   */
  closeOnSelect?: boolean

  /**
   * Whether to close on outside click
   * @default true
   */
  closeOnOutsideClick?: boolean

  /**
   * Whether to close on escape
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Menu offset from cursor (px)
   * @default 2
   */
  offset?: number

  /**
   * Menu element selector
   * @default '[data-coral-context-menu]'
   */
  menuSelector?: string

  /**
   * Item element selector
   * @default '[data-coral-context-item]'
   */
  itemSelector?: string

  /**
   * Separator element selector
   * @default '[data-coral-context-separator]'
   */
  separatorSelector?: string

  /**
   * Submenu element selector
   * @default '[data-coral-context-submenu]'
   */
  submenuSelector?: string
}

/**
 * Context menu state
 */
export interface ContextMenuState extends ComponentState {
  isOpen: boolean
  position: { x: number; y: number }
  highlightedIndex: number
  activeSubmenu: string | null
}

/**
 * Context menu component
 *
 * @example
 * ```html
 * <!-- Context menu trigger area -->
 * <div data-coral-context-trigger>
 *   Right-click me for context menu
 * </div>
 *
 * <!-- Context menu (hidden by default) -->
 * <div data-coral-context-menu role="menu" hidden>
 *   <button data-coral-context-item role="menuitem">Cut</button>
 *   <button data-coral-context-item role="menuitem">Copy</button>
 *   <button data-coral-context-item role="menuitem">Paste</button>
 *   <div data-coral-context-separator role="separator"></div>
 *   <button data-coral-context-item role="menuitem" data-danger>Delete</button>
 * </div>
 * ```
 */
export class ContextMenu extends BaseComponent {
  protected declare config: ContextMenuConfig
  protected declare state: ContextMenuState

  private trigger: HTMLElement | null = null
  private menu: HTMLElement | null = null
  private itemElements: HTMLElement[] = []
  private activeSubmenus: Map<string, HTMLElement> = new Map()

  protected getDefaultConfig(): ContextMenuConfig {
    return {
      items: [],
      triggerSelector: null,
      closeOnSelect: true,
      closeOnOutsideClick: true,
      closeOnEscape: true,
      offset: 2,
      menuSelector: '[data-coral-context-menu]',
      itemSelector: '[data-coral-context-item]',
      separatorSelector: '[data-coral-context-separator]',
      submenuSelector: '[data-coral-context-submenu]',
    }
  }

  protected getInitialState(): ContextMenuState {
    return {
      isOpen: false,
      position: { x: 0, y: 0 },
      highlightedIndex: -1,
      activeSubmenu: null,
    }
  }

  protected setupAria(): void {
    // Find trigger element
    if (this.config.triggerSelector) {
      this.trigger = document.querySelector(this.config.triggerSelector)
    } else {
      this.trigger = this.element.parentElement
    }

    // The element itself is the menu
    this.menu = this.element

    // Set up menu ARIA
    this.menu.setAttribute('role', 'menu')
    this.menu.setAttribute('aria-hidden', 'true')
    this.menu.style.position = 'fixed'
    this.menu.style.display = 'none'
    this.menu.style.zIndex = '9999'

    // Build menu from items config if provided
    if (this.config.items?.length) {
      this.buildMenu(this.config.items)
    }

    // Get item elements
    this.itemElements = Array.from(this.menu.querySelectorAll(this.config.itemSelector!))

    // Set up item ARIA
    this.itemElements.forEach((item, index) => {
      item.setAttribute('role', 'menuitem')
      item.setAttribute('tabindex', '-1')
      if (!item.id) {
        item.id = `${this.id}-item-${index}`
      }
    })

    // Set up separators
    const separators = this.menu.querySelectorAll(this.config.separatorSelector!)
    separators.forEach((sep) => {
      sep.setAttribute('role', 'separator')
    })
  }

  protected bindEvents(): void {
    // Context menu trigger (right-click)
    if (this.trigger) {
      this.addEventListener(this.trigger, 'contextmenu', (e: Event) => {
        e.preventDefault()
        const mouseEvent = e as MouseEvent
        this.openAt(mouseEvent.clientX, mouseEvent.clientY)
      })
    }

    // Item click handlers
    this.itemElements.forEach((item, index) => {
      this.addEventListener(item, 'click', () => {
        if (!item.hasAttribute('disabled') && !item.hasAttribute('data-disabled')) {
          this.selectItem(index)
        }
      })

      this.addEventListener(item, 'mouseenter', () => {
        this.highlightItem(index)
      })
    })

    // Keyboard navigation
    this.addEventListener(this.menu!, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })

    // Close on outside click
    if (this.config.closeOnOutsideClick) {
      this.addEventListener(document, 'click', (e: Event) => {
        if (this.state.isOpen && !this.menu?.contains(e.target as Node)) {
          this.close()
        }
      })

      // Also close on left-click anywhere when menu is open
      this.addEventListener(document, 'mousedown', (e: Event) => {
        if (this.state.isOpen && !this.menu?.contains(e.target as Node)) {
          this.close()
        }
      })
    }

    // Close on escape
    if (this.config.closeOnEscape) {
      this.addEventListener(document, 'keydown', (e: Event) => {
        if ((e as KeyboardEvent).key === 'Escape' && this.state.isOpen) {
          this.close()
        }
      })
    }

    // Close on scroll
    this.addEventListener(window, 'scroll', () => {
      if (this.state.isOpen) {
        this.close()
      }
    })

    // Close on resize
    this.addEventListener(window, 'resize', () => {
      if (this.state.isOpen) {
        this.close()
      }
    })
  }

  private buildMenu(items: ContextMenuItem[]): void {
    if (!this.menu) return

    this.menu.innerHTML = ''

    items.forEach((item) => {
      if (item.separator) {
        const separator = document.createElement('div')
        separator.setAttribute('data-coral-context-separator', '')
        separator.setAttribute('role', 'separator')
        this.menu!.appendChild(separator)
        return
      }

      const button = document.createElement('button')
      button.setAttribute('data-coral-context-item', '')
      button.setAttribute('role', 'menuitem')
      button.setAttribute('tabindex', '-1')
      button.id = `${this.id}-item-${item.id}`

      if (item.disabled) {
        button.setAttribute('disabled', '')
        button.setAttribute('aria-disabled', 'true')
      }

      if (item.danger) {
        button.setAttribute('data-danger', '')
      }

      // Build content
      let content = ''

      if (item.icon) {
        content += `<span data-coral-context-icon>${item.icon}</span>`
      }

      content += `<span data-coral-context-label>${item.label}</span>`

      if (item.shortcut) {
        content += `<span data-coral-context-shortcut>${item.shortcut}</span>`
      }

      if (item.submenu) {
        content += `<span data-coral-context-arrow>▶</span>`
        button.setAttribute('aria-haspopup', 'true')
        button.setAttribute('aria-expanded', 'false')
      }

      button.innerHTML = content

      // Store action
      if (item.action) {
        ;(button as unknown as { _action: () => void })._action = item.action
      }

      this.menu!.appendChild(button)

      // Build submenu if exists
      if (item.submenu) {
        const submenu = document.createElement('div')
        submenu.setAttribute('data-coral-context-submenu', '')
        submenu.setAttribute('data-parent', item.id)
        submenu.setAttribute('role', 'menu')
        submenu.setAttribute('aria-hidden', 'true')
        submenu.style.position = 'fixed'
        submenu.style.display = 'none'

        this.buildSubmenu(submenu, item.submenu)
        this.menu!.appendChild(submenu)
        this.activeSubmenus.set(item.id, submenu)
      }
    })

    // Update item elements reference
    this.itemElements = Array.from(this.menu.querySelectorAll(this.config.itemSelector!))
  }

  private buildSubmenu(container: HTMLElement, items: ContextMenuItem[]): void {
    items.forEach((item) => {
      if (item.separator) {
        const separator = document.createElement('div')
        separator.setAttribute('data-coral-context-separator', '')
        separator.setAttribute('role', 'separator')
        container.appendChild(separator)
        return
      }

      const button = document.createElement('button')
      button.setAttribute('data-coral-context-item', '')
      button.setAttribute('role', 'menuitem')
      button.setAttribute('tabindex', '-1')

      if (item.disabled) {
        button.setAttribute('disabled', '')
      }

      if (item.danger) {
        button.setAttribute('data-danger', '')
      }

      let content = ''
      if (item.icon) {
        content += `<span data-coral-context-icon>${item.icon}</span>`
      }
      content += `<span data-coral-context-label>${item.label}</span>`
      if (item.shortcut) {
        content += `<span data-coral-context-shortcut>${item.shortcut}</span>`
      }

      button.innerHTML = content

      if (item.action) {
        ;(button as unknown as { _action: () => void })._action = item.action
      }

      container.appendChild(button)
    })
  }

  private handleKeyDown(e: KeyboardEvent): void {
    const { highlightedIndex } = this.state
    const enabledItems = this.itemElements.filter(
      (item) => !item.hasAttribute('disabled') && !item.hasAttribute('data-disabled')
    )
    const currentEnabledIndex = enabledItems.findIndex(
      (item) => item === this.itemElements[highlightedIndex]
    )

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (currentEnabledIndex < enabledItems.length - 1) {
          const nextItem = enabledItems[currentEnabledIndex + 1]
          if (nextItem) {
            const nextIndex = this.itemElements.indexOf(nextItem)
            this.highlightItem(nextIndex)
          }
        } else {
          const firstItem = enabledItems[0]
          if (firstItem) {
            const firstIndex = this.itemElements.indexOf(firstItem)
            this.highlightItem(firstIndex)
          }
        }
        break

      case 'ArrowUp':
        e.preventDefault()
        if (currentEnabledIndex > 0) {
          const prevItem = enabledItems[currentEnabledIndex - 1]
          if (prevItem) {
            const prevIndex = this.itemElements.indexOf(prevItem)
            this.highlightItem(prevIndex)
          }
        } else {
          const lastItem = enabledItems[enabledItems.length - 1]
          if (lastItem) {
            const lastIndex = this.itemElements.indexOf(lastItem)
            this.highlightItem(lastIndex)
          }
        }
        break

      case 'Enter':
      case ' ':
        e.preventDefault()
        if (highlightedIndex >= 0) {
          this.selectItem(highlightedIndex)
        }
        break

      case 'Home':
        e.preventDefault()
        if (enabledItems.length > 0) {
          const firstItem = enabledItems[0]
          if (firstItem) {
            const firstIndex = this.itemElements.indexOf(firstItem)
            this.highlightItem(firstIndex)
          }
        }
        break

      case 'End':
        e.preventDefault()
        if (enabledItems.length > 0) {
          const lastItem = enabledItems[enabledItems.length - 1]
          if (lastItem) {
            const lastIndex = this.itemElements.indexOf(lastItem)
            this.highlightItem(lastIndex)
          }
        }
        break
    }
  }

  private highlightItem(index: number): void {
    this.setState({ highlightedIndex: index })

    this.itemElements.forEach((item, i) => {
      if (i === index) {
        item.setAttribute('data-highlighted', '')
        item.focus()
      } else {
        item.removeAttribute('data-highlighted')
      }
    })
  }

  private selectItem(index: number): void {
    const item = this.itemElements[index]
    if (!item || item.hasAttribute('disabled')) return

    // Execute action if exists
    const action = (item as HTMLElement & { _action?: () => void })._action
    if (action) {
      action()
    }

    // Find matching config item for event
    const itemId = item.id.replace(`${this.id}-item-`, '')
    const configItem = this.config.items?.find((i) => i.id === itemId)

    this.dispatch('select', { item: configItem, element: item })

    if (this.config.closeOnSelect) {
      this.close()
    }
  }

  private positionMenu(x: number, y: number): void {
    if (!this.menu) return

    const offset = this.config.offset ?? 2
    const menuRect = this.menu.getBoundingClientRect()
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let posX = x + offset
    let posY = y + offset

    // Adjust if menu goes off right edge
    if (posX + menuRect.width > viewportWidth) {
      posX = x - menuRect.width - offset
    }

    // Adjust if menu goes off bottom edge
    if (posY + menuRect.height > viewportHeight) {
      posY = y - menuRect.height - offset
    }

    // Ensure menu doesn't go off left/top edges
    posX = Math.max(offset, posX)
    posY = Math.max(offset, posY)

    this.menu.style.left = `${posX}px`
    this.menu.style.top = `${posY}px`

    this.setState({ position: { x: posX, y: posY } })
  }

  protected override render(): void {
    if (!this.menu) return

    if (this.state.isOpen) {
      this.menu.style.display = ''
      this.menu.removeAttribute('hidden')
      this.menu.setAttribute('aria-hidden', 'false')
      this.menu.setAttribute('data-open', '')
    } else {
      this.menu.style.display = 'none'
      this.menu.setAttribute('hidden', '')
      this.menu.setAttribute('aria-hidden', 'true')
      this.menu.removeAttribute('data-open')
    }
  }

  /**
   * Open context menu at specific coordinates
   */
  openAt(x: number, y: number): void {
    // Show menu first to get dimensions
    if (this.menu) {
      this.menu.style.display = ''
      this.menu.style.visibility = 'hidden'
    }

    // Position menu
    requestAnimationFrame(() => {
      this.positionMenu(x, y)

      if (this.menu) {
        this.menu.style.visibility = ''
      }

      this.setState({ isOpen: true, highlightedIndex: -1 })

      // Focus first item
      const firstEnabled = this.itemElements.find(
        (item) => !item.hasAttribute('disabled')
      )
      if (firstEnabled) {
        firstEnabled.focus()
        this.highlightItem(this.itemElements.indexOf(firstEnabled))
      }

      this.dispatch('open', { x, y })
    })
  }

  /**
   * Open context menu
   */
  override open(): void {
    // Open at center of trigger if no coordinates
    if (this.trigger) {
      const rect = this.trigger.getBoundingClientRect()
      this.openAt(rect.left + rect.width / 2, rect.top + rect.height / 2)
    }
  }

  /**
   * Close context menu
   */
  override close(): void {
    if (!this.state.isOpen) return

    this.setState({ isOpen: false, highlightedIndex: -1, activeSubmenu: null })

    // Close all submenus
    this.activeSubmenus.forEach((submenu) => {
      submenu.style.display = 'none'
      submenu.setAttribute('aria-hidden', 'true')
    })

    this.dispatch('close')
  }

  /**
   * Set menu items programmatically
   */
  setItems(items: ContextMenuItem[]): void {
    this.config.items = items
    this.buildMenu(items)
  }

  /**
   * Enable/disable a specific item
   */
  setItemDisabled(id: string, disabled: boolean): void {
    const item = this.menu?.querySelector(`#${this.id}-item-${id}`) as HTMLElement
    if (item) {
      if (disabled) {
        item.setAttribute('disabled', '')
        item.setAttribute('aria-disabled', 'true')
      } else {
        item.removeAttribute('disabled')
        item.removeAttribute('aria-disabled')
      }
    }
  }
}

/**
 * Create a context menu instance
 */
export const createContextMenu = createComponentFactory(ContextMenu)

export default ContextMenu
