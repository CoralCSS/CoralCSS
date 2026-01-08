/**
 * Collapsible Component
 *
 * Expandable/collapsible content section.
 * @module components/collapsible
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface CollapsibleConfig extends ComponentConfig {
  /** Initial open state */
  defaultOpen?: boolean
  /** Disabled state */
  disabled?: boolean
}

export interface CollapsibleState extends ComponentState {
  isOpen: boolean
  disabled: boolean
}

/**
 * Collapsible component for show/hide content
 */
export class Collapsible extends BaseComponent {
  private trigger: HTMLElement | null = null
  private content: HTMLElement | null = null

  protected getDefaultConfig(): CollapsibleConfig {
    return {
      defaultOpen: false,
      disabled: false,
    }
  }

  protected getInitialState(): CollapsibleState {
    const config = this.config as CollapsibleConfig
    return {
      isOpen: config.defaultOpen ?? false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.trigger = this.query('[data-coral-collapsible-trigger]')
    this.content = this.query('[data-coral-collapsible-content]')

    if (this.trigger && this.content) {
      const contentId = this.content.id || `${this.id}-content`
      this.content.id = contentId

      this.trigger.setAttribute('aria-expanded', String(this.state.isOpen))
      this.trigger.setAttribute('aria-controls', contentId)

      this.content.setAttribute('role', 'region')
      this.content.setAttribute('aria-labelledby', this.trigger.id || `${this.id}-trigger`)

      if (!this.trigger.id) {
        this.trigger.id = `${this.id}-trigger`
      }
    }
  }

  protected bindEvents(): void {
    if (this.trigger) {
      const handleClick = () => {
        if (!(this.state as CollapsibleState).disabled) {
          this.toggle()
        }
      }
      this.addEventListener(this.trigger, 'click', handleClick)

      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        if ((ke.key === ' ' || ke.key === 'Enter') && !(this.state as CollapsibleState).disabled) {
          e.preventDefault()
          this.toggle()
        }
      }
      this.addEventListener(this.trigger, 'keydown', handleKeydown)
    }
  }

  protected override render(): void {
    const state = this.state as CollapsibleState

    this.element.dataset.state = state.isOpen ? 'open' : 'closed'

    if (this.trigger) {
      this.trigger.setAttribute('aria-expanded', String(state.isOpen))
      this.trigger.dataset.state = state.isOpen ? 'open' : 'closed'
      if (state.disabled) {
        this.trigger.setAttribute('data-disabled', '')
      } else {
        this.trigger.removeAttribute('data-disabled')
      }
    }

    if (this.content) {
      this.content.dataset.state = state.isOpen ? 'open' : 'closed'
      this.content.hidden = !state.isOpen
    }
  }

  override open(): void {
    if (!this.state.isOpen && !(this.state as CollapsibleState).disabled) {
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

  override toggle(): void {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createCollapsible = createComponentFactory(Collapsible)
export default Collapsible
