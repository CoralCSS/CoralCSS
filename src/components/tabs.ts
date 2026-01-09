/**
 * Tabs Component
 *
 * Accessible tabs component with keyboard navigation.
 * @module components/tabs
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Tabs configuration
 */
export interface TabsConfig extends ComponentConfig {
  /**
   * Whether to activate tab on arrow key press (automatic) or only on Enter/Space (manual)
   * @default 'automatic'
   */
  activation?: 'automatic' | 'manual'

  /**
   * Whether tabs should loop when navigating with arrow keys
   * @default true
   */
  loop?: boolean

  /**
   * Orientation of the tabs
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Tab list selector
   * @default '[data-coral-tabs-list]'
   */
  listSelector?: string

  /**
   * Tab trigger selector
   * @default '[data-coral-tabs-trigger]'
   */
  triggerSelector?: string

  /**
   * Tab panel selector
   * @default '[data-coral-tabs-panel]'
   */
  panelSelector?: string

  /**
   * Default active tab index
   * @default 0
   */
  defaultIndex?: number
}

/**
 * Tabs state
 */
export interface TabsState extends ComponentState {
  activeIndex: number
  focusedIndex: number
}

/**
 * Tabs component
 *
 * @example
 * ```html
 * <div data-coral-tabs>
 *   <div data-coral-tabs-list role="tablist">
 *     <button data-coral-tabs-trigger data-value="tab1">Tab 1</button>
 *     <button data-coral-tabs-trigger data-value="tab2">Tab 2</button>
 *     <button data-coral-tabs-trigger data-value="tab3">Tab 3</button>
 *   </div>
 *   <div data-coral-tabs-panel data-value="tab1">Content 1</div>
 *   <div data-coral-tabs-panel data-value="tab2">Content 2</div>
 *   <div data-coral-tabs-panel data-value="tab3">Content 3</div>
 * </div>
 * ```
 */
export class Tabs extends BaseComponent {
  protected declare config: TabsConfig
  protected declare state: TabsState

  private list: HTMLElement | null = null
  private triggers: HTMLElement[] = []
  private panels: HTMLElement[] = []

  protected getDefaultConfig(): TabsConfig {
    return {
      activation: 'automatic',
      loop: true,
      orientation: 'horizontal',
      listSelector: '[data-coral-tabs-list]',
      triggerSelector: '[data-coral-tabs-trigger]',
      panelSelector: '[data-coral-tabs-panel]',
      defaultIndex: 0,
    }
  }

  protected getInitialState(): TabsState {
    return {
      activeIndex: this.config.defaultIndex ?? 0,
      focusedIndex: this.config.defaultIndex ?? 0,
    }
  }

  protected setupAria(): void {
    this.list = this.query(this.config.listSelector!)
    this.triggers = Array.from(this.queryAll(this.config.triggerSelector!))
    this.panels = Array.from(this.queryAll(this.config.panelSelector!))

    if (this.list) {
      this.list.setAttribute('role', 'tablist')
      this.list.setAttribute('aria-orientation', this.config.orientation!)
    }

    this.triggers.forEach((trigger, index) => {
      const panel = this.panels[index]

      // Generate IDs
      if (!trigger.id) {
        trigger.id = `${this.element.id}-tab-${index}`
      }
      if (panel && !panel.id) {
        panel.id = `${this.element.id}-panel-${index}`
      }

      // Set up trigger
      trigger.setAttribute('role', 'tab')
      trigger.setAttribute('aria-selected', index === this.state.activeIndex ? 'true' : 'false')
      trigger.setAttribute('tabindex', index === this.state.activeIndex ? '0' : '-1')
      if (panel) {
        trigger.setAttribute('aria-controls', panel.id)
      }

      // Set up panel
      if (panel) {
        panel.setAttribute('role', 'tabpanel')
        panel.setAttribute('aria-labelledby', trigger.id)
        panel.setAttribute('tabindex', '0')
        if (index !== this.state.activeIndex) {
          panel.setAttribute('hidden', '')
        }
      }
    })
  }

  protected bindEvents(): void {
    // Trigger click
    this.triggers.forEach((trigger, index) => {
      this.addEventListener(trigger, 'click', () => this.selectTab(index))
    })

    // Keyboard navigation on tablist
    if (this.list) {
      this.addEventListener(this.list, 'keydown', (e: Event) => this.handleKeydown(e as KeyboardEvent))
    }

    // Focus events
    this.triggers.forEach((trigger, index) => {
      this.addEventListener(trigger, 'focus', () => {
        this.setState({ focusedIndex: index })
      })
    })
  }

  private handleKeydown(e: KeyboardEvent): void {
    const isHorizontal = this.config.orientation === 'horizontal'
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp'
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown'

    let newIndex = this.state.focusedIndex

    switch (e.key) {
      case prevKey:
        e.preventDefault()
        newIndex = this.getPreviousIndex()
        break
      case nextKey:
        e.preventDefault()
        newIndex = this.getNextIndex()
        break
      case 'Home':
        e.preventDefault()
        newIndex = 0
        break
      case 'End':
        e.preventDefault()
        newIndex = this.triggers.length - 1
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        this.selectTab(this.state.focusedIndex)
        return
      default:
        return
    }

    this.focusTab(newIndex)

    if (this.config.activation === 'automatic') {
      this.selectTab(newIndex)
    }
  }

  private getNextIndex(): number {
    const next = this.state.focusedIndex + 1
    if (next >= this.triggers.length) {
      return this.config.loop ? 0 : this.triggers.length - 1
    }
    return next
  }

  private getPreviousIndex(): number {
    const prev = this.state.focusedIndex - 1
    if (prev < 0) {
      return this.config.loop ? this.triggers.length - 1 : 0
    }
    return prev
  }

  private focusTab(index: number): void {
    if (index >= 0 && index < this.triggers.length) {
      this.triggers[index]?.focus()
      this.setState({ focusedIndex: index })
    }
  }

  private selectTab(index: number): void {
    if (index === this.state.activeIndex) {return}
    if (index < 0 || index >= this.triggers.length) {return}

    const prevIndex = this.state.activeIndex
    this.setState({ activeIndex: index, focusedIndex: index })

    this.dispatch('change', { index, prevIndex })
  }

  protected override render(): void {
    this.triggers.forEach((trigger, index) => {
      const isActive = index === this.state.activeIndex
      const panel = this.panels[index]

      trigger.setAttribute('aria-selected', String(isActive))
      trigger.setAttribute('tabindex', isActive ? '0' : '-1')

      if (isActive) {
        trigger.setAttribute('data-active', '')
      } else {
        trigger.removeAttribute('data-active')
      }

      if (panel) {
        if (isActive) {
          panel.removeAttribute('hidden')
          panel.setAttribute('data-active', '')
        } else {
          panel.setAttribute('hidden', '')
          panel.removeAttribute('data-active')
        }
      }
    })
  }

  /**
   * Get the active tab index
   */
  getActiveIndex(): number {
    return this.state.activeIndex
  }

  /**
   * Set the active tab by index
   */
  setActiveIndex(index: number): void {
    this.selectTab(index)
  }

  /**
   * Set the active tab by value
   */
  setActiveValue(value: string): void {
    const index = this.triggers.findIndex((t) => t.getAttribute('data-value') === value)
    if (index >= 0) {
      this.selectTab(index)
    }
  }
}

/**
 * Create a tabs instance
 */
export const createTabs = createComponentFactory(Tabs)

export default Tabs
