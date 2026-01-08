/**
 * Card Component
 *
 * Flexible card container for content grouping.
 * @module components/card
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface CardConfig extends ComponentConfig {
  /** Interactive (clickable) card */
  interactive?: boolean
  /** Link destination for interactive cards */
  href?: string
}

export interface CardState extends ComponentState {
  hovered: boolean
  focused: boolean
}

/**
 * Card component for content containers
 */
export class Card extends BaseComponent {
  private header: HTMLElement | null = null
  private content: HTMLElement | null = null
  private footer: HTMLElement | null = null

  protected getDefaultConfig(): CardConfig {
    return {
      interactive: false,
    }
  }

  protected getInitialState(): CardState {
    return {
      hovered: false,
      focused: false,
    }
  }

  protected setupAria(): void {
    const config = this.config as CardConfig

    if (config.interactive) {
      this.element.setAttribute('role', 'button')
      this.element.setAttribute('tabindex', '0')
    } else {
      this.element.setAttribute('role', 'article')
    }

    // Get card parts
    this.header = this.query('[data-coral-card-header]')
    this.content = this.query('[data-coral-card-content]')
    this.footer = this.query('[data-coral-card-footer]')

    // Link title to card
    const title = this.query('[data-coral-card-title]')
    if (title) {
      const titleId = title.id || `${this.id}-title`
      title.id = titleId
      this.element.setAttribute('aria-labelledby', titleId)
    }

    const description = this.query('[data-coral-card-description]')
    if (description) {
      const descId = description.id || `${this.id}-description`
      description.id = descId
      this.element.setAttribute('aria-describedby', descId)
    }
  }

  protected bindEvents(): void {
    const config = this.config as CardConfig

    // Hover
    const handleMouseEnter = () => {
      this.setState({ hovered: true })
    }
    this.addEventListener(this.element, 'mouseenter', handleMouseEnter)

    const handleMouseLeave = () => {
      this.setState({ hovered: false })
    }
    this.addEventListener(this.element, 'mouseleave', handleMouseLeave)

    // Focus
    const handleFocus = () => {
      this.setState({ focused: true })
    }
    this.addEventListener(this.element, 'focus', handleFocus)

    const handleBlur = () => {
      this.setState({ focused: false })
    }
    this.addEventListener(this.element, 'blur', handleBlur)

    // Interactive click/keyboard
    if (config.interactive) {
      const handleClick = () => {
        if (config.href) {
          window.location.href = config.href
        }
        this.dispatch('click')
      }
      this.addEventListener(this.element, 'click', handleClick)

      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        if (ke.key === 'Enter' || ke.key === ' ') {
          e.preventDefault()
          if (config.href) {
            window.location.href = config.href
          }
          this.dispatch('click')
        }
      }
      this.addEventListener(this.element, 'keydown', handleKeydown)
    }
  }

  protected override render(): void {
    const state = this.state as CardState
    const config = this.config as CardConfig

    if (state.hovered) {
      this.element.dataset.hovered = ''
    } else {
      delete this.element.dataset.hovered
    }

    if (state.focused) {
      this.element.dataset.focused = ''
    } else {
      delete this.element.dataset.focused
    }

    if (config.interactive) {
      this.element.dataset.interactive = ''
    }
  }

  setInteractive(interactive: boolean, href?: string): void {
    const cardConfig = this.config as CardConfig
    cardConfig.interactive = interactive
    cardConfig.href = href

    if (interactive) {
      this.element.setAttribute('role', 'button')
      this.element.setAttribute('tabindex', '0')
    } else {
      this.element.setAttribute('role', 'article')
      this.element.removeAttribute('tabindex')
    }

    this.render()
  }
}

export const createCard = createComponentFactory(Card)
export default Card
