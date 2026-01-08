/**
 * NavigationMenu Component
 *
 * Accessible navigation menu with submenus.
 * @module components/navigation-menu
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface NavigationMenuConfig extends ComponentConfig {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Delay before opening submenus */
  openDelay?: number
  /** Delay before closing submenus */
  closeDelay?: number
}

export interface NavigationMenuState extends ComponentState {
  activeItem: string | null
  activeSubmenu: string | null
}

/**
 * NavigationMenu component for site navigation
 */
export class NavigationMenu extends BaseComponent {
  private items: HTMLElement[] = []
  private triggers: Map<string, HTMLElement> = new Map()
  private contents: Map<string, HTMLElement> = new Map()
  private openTimeout: ReturnType<typeof setTimeout> | null = null
  private closeTimeout: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): NavigationMenuConfig {
    return {
      orientation: 'horizontal',
      openDelay: 200,
      closeDelay: 300,
    }
  }

  protected getInitialState(): NavigationMenuState {
    return {
      activeItem: null,
      activeSubmenu: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'navigation')
    this.element.setAttribute('aria-label', 'Main navigation')

    const list = this.query('[data-coral-navigation-list]')
    if (list) {
      list.setAttribute('role', 'menubar')
      const config = this.config as NavigationMenuConfig
      list.setAttribute('aria-orientation', config.orientation!)
    }

    // Setup items
    this.items = Array.from(this.queryAll('[data-coral-navigation-item]'))
    this.items.forEach((item) => {
      const trigger = item.querySelector('[data-coral-navigation-trigger]') as HTMLElement
      const content = item.querySelector('[data-coral-navigation-content]') as HTMLElement
      const value = item.dataset.value || item.id

      if (trigger) {
        trigger.setAttribute('role', 'menuitem')
        this.triggers.set(value, trigger)

        if (content) {
          trigger.setAttribute('aria-haspopup', 'true')
          trigger.setAttribute('aria-expanded', 'false')
          const contentId = content.id || `${this.id}-content-${value}`
          content.id = contentId
          trigger.setAttribute('aria-controls', contentId)
        }
      }

      if (content) {
        content.setAttribute('role', 'menu')
        content.hidden = true
        this.contents.set(value, content)
      }
    })
  }

  protected bindEvents(): void {
    this.items.forEach((item) => {
      const value = item.dataset.value || item.id
      const trigger = this.triggers.get(value)
      const content = this.contents.get(value)

      if (trigger) {
        // Mouse enter
        const handleMouseEnter = () => {
          this.clearTimeouts()
          const config = this.config as NavigationMenuConfig
          this.openTimeout = setTimeout(() => {
            if (content) {
              this.openSubmenu(value)
            }
          }, config.openDelay)
        }
        this.addEventListener(trigger, 'mouseenter', handleMouseEnter)

        // Mouse leave
        const handleMouseLeave = () => {
          this.clearTimeouts()
          const config = this.config as NavigationMenuConfig
          this.closeTimeout = setTimeout(() => {
            this.closeSubmenu()
          }, config.closeDelay)
        }
        this.addEventListener(trigger, 'mouseleave', handleMouseLeave)

        // Click
        const handleClick = (e: Event) => {
          if (content) {
            e.preventDefault()
            const state = this.state as NavigationMenuState
            if (state.activeSubmenu === value) {
              this.closeSubmenu()
            } else {
              this.openSubmenu(value)
            }
          }
        }
        this.addEventListener(trigger, 'click', handleClick)

        // Keyboard
        const handleKeydown = (e: Event) => {
          const ke = e as KeyboardEvent
          const config = this.config as NavigationMenuConfig

          if (ke.key === 'Enter' || ke.key === ' ') {
            e.preventDefault()
            if (content) {
              this.openSubmenu(value)
              const firstItem = content.querySelector('[role="menuitem"]') as HTMLElement
              firstItem?.focus()
            }
          } else if (ke.key === 'ArrowDown' && config.orientation === 'horizontal') {
            e.preventDefault()
            if (content) {
              this.openSubmenu(value)
              const firstItem = content.querySelector('[role="menuitem"]') as HTMLElement
              firstItem?.focus()
            }
          } else if (ke.key === 'Escape') {
            this.closeSubmenu()
            trigger.focus()
          }
        }
        this.addEventListener(trigger, 'keydown', handleKeydown)
      }

      if (content) {
        // Keep submenu open when hovering
        const handleContentEnter = () => {
          this.clearTimeouts()
        }
        this.addEventListener(content, 'mouseenter', handleContentEnter)

        // Close when leaving content
        const handleContentLeave = () => {
          this.clearTimeouts()
          const config = this.config as NavigationMenuConfig
          this.closeTimeout = setTimeout(() => {
            this.closeSubmenu()
          }, config.closeDelay)
        }
        this.addEventListener(content, 'mouseleave', handleContentLeave)
      }
    })
  }

  private clearTimeouts(): void {
    if (this.openTimeout) {
      clearTimeout(this.openTimeout)
      this.openTimeout = null
    }
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout)
      this.closeTimeout = null
    }
  }

  protected override render(): void {
    const state = this.state as NavigationMenuState

    this.triggers.forEach((trigger, value) => {
      const isActive = state.activeSubmenu === value
      trigger.setAttribute('aria-expanded', String(isActive))
      trigger.dataset.state = isActive ? 'open' : 'closed'
    })

    this.contents.forEach((content, value) => {
      const isActive = state.activeSubmenu === value
      content.hidden = !isActive
      content.dataset.state = isActive ? 'open' : 'closed'
    })
  }

  openSubmenu(value: string): void {
    this.setState({ activeSubmenu: value })
    this.dispatch('open', { submenu: value })
  }

  closeSubmenu(): void {
    const prev = (this.state as NavigationMenuState).activeSubmenu
    this.setState({ activeSubmenu: null })
    if (prev) {
      this.dispatch('close', { submenu: prev })
    }
  }

  override destroy(): void {
    this.clearTimeouts()
    super.destroy()
  }
}

export const createNavigationMenu = createComponentFactory(NavigationMenu)
export default NavigationMenu
