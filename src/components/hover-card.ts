/**
 * HoverCard Component
 *
 * Card that appears on hover, similar to popover but hover-triggered.
 * @module components/hover-card
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface HoverCardConfig extends ComponentConfig {
  /** Delay before opening (ms) */
  openDelay?: number
  /** Delay before closing (ms) */
  closeDelay?: number
  /** Side to show (top, right, bottom, left) */
  side?: 'top' | 'right' | 'bottom' | 'left'
  /** Alignment (start, center, end) */
  align?: 'start' | 'center' | 'end'
}

export interface HoverCardState extends ComponentState {
  isOpen: boolean
}

/**
 * HoverCard component for hover-triggered content
 */
export class HoverCard extends BaseComponent {
  private trigger: HTMLElement | null = null
  private content: HTMLElement | null = null
  private openTimeout: ReturnType<typeof setTimeout> | null = null
  private closeTimeout: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): HoverCardConfig {
    return {
      openDelay: 700,
      closeDelay: 300,
      side: 'bottom',
      align: 'center',
    }
  }

  protected getInitialState(): HoverCardState {
    return {
      isOpen: false,
    }
  }

  protected setupAria(): void {
    this.trigger = this.query('[data-coral-hover-card-trigger]')
    this.content = this.query('[data-coral-hover-card-content]')

    if (this.trigger && this.content) {
      const contentId = this.content.id || `${this.id}-content`
      this.content.id = contentId
      this.trigger.setAttribute('aria-describedby', contentId)
    }
  }

  protected bindEvents(): void {
    if (this.trigger) {
      // Mouse enter trigger
      const handleTriggerEnter = () => {
        this.clearTimeouts()
        const config = this.config as HoverCardConfig
        this.openTimeout = setTimeout(() => this.open(), config.openDelay)
      }
      this.addEventListener(this.trigger, 'mouseenter', handleTriggerEnter)

      // Mouse leave trigger
      const handleTriggerLeave = () => {
        this.clearTimeouts()
        const config = this.config as HoverCardConfig
        this.closeTimeout = setTimeout(() => this.close(), config.closeDelay)
      }
      this.addEventListener(this.trigger, 'mouseleave', handleTriggerLeave)

      // Focus
      const handleFocus = () => {
        this.clearTimeouts()
        this.open()
      }
      this.addEventListener(this.trigger, 'focus', handleFocus)

      // Blur
      const handleBlur = () => {
        this.clearTimeouts()
        const config = this.config as HoverCardConfig
        this.closeTimeout = setTimeout(() => this.close(), config.closeDelay)
      }
      this.addEventListener(this.trigger, 'blur', handleBlur)
    }

    if (this.content) {
      // Keep open when hovering content
      const handleContentEnter = () => {
        this.clearTimeouts()
      }
      this.addEventListener(this.content, 'mouseenter', handleContentEnter)

      // Close when leaving content
      const handleContentLeave = () => {
        this.clearTimeouts()
        const config = this.config as HoverCardConfig
        this.closeTimeout = setTimeout(() => this.close(), config.closeDelay)
      }
      this.addEventListener(this.content, 'mouseleave', handleContentLeave)
    }
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
    const state = this.state as HoverCardState

    this.element.dataset.state = state.isOpen ? 'open' : 'closed'

    if (this.trigger) {
      this.trigger.dataset.state = state.isOpen ? 'open' : 'closed'
    }

    if (this.content) {
      this.content.dataset.state = state.isOpen ? 'open' : 'closed'
      this.content.hidden = !state.isOpen

      // Apply positioning
      if (state.isOpen) {
        this.position()
      }
    }
  }

  private position(): void {
    if (!this.trigger || !this.content) return

    const config = this.config as HoverCardConfig
    const triggerRect = this.trigger.getBoundingClientRect()
    const contentRect = this.content.getBoundingClientRect()

    let top = 0
    let left = 0

    // Calculate position based on side
    switch (config.side) {
      case 'top':
        top = triggerRect.top - contentRect.height - 8
        break
      case 'bottom':
        top = triggerRect.bottom + 8
        break
      case 'left':
        left = triggerRect.left - contentRect.width - 8
        top = triggerRect.top
        break
      case 'right':
        left = triggerRect.right + 8
        top = triggerRect.top
        break
    }

    // Calculate alignment
    if (config.side === 'top' || config.side === 'bottom') {
      switch (config.align) {
        case 'start':
          left = triggerRect.left
          break
        case 'center':
          left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
          break
        case 'end':
          left = triggerRect.right - contentRect.width
          break
      }
    } else {
      switch (config.align) {
        case 'start':
          top = triggerRect.top
          break
        case 'center':
          top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
          break
        case 'end':
          top = triggerRect.bottom - contentRect.height
          break
      }
    }

    this.content.style.position = 'fixed'
    this.content.style.top = `${top}px`
    this.content.style.left = `${left}px`
    this.content.dataset.side = config.side
    this.content.dataset.align = config.align
  }

  override open(): void {
    if (!this.state.isOpen) {
      this.setState({ isOpen: true })
      this.dispatch('open')
    }
  }

  override close(): void {
    if (this.state.isOpen) {
      this.setState({ isOpen: false })
      this.dispatch('close')
    }
  }

  override destroy(): void {
    this.clearTimeouts()
    super.destroy()
  }
}

export const createHoverCard = createComponentFactory(HoverCard)
export default HoverCard
