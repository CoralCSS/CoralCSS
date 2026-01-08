/**
 * Alert Component
 *
 * Accessible alert/notification banner component.
 * @module components/alert
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Alert variant
 */
export type AlertVariant = 'info' | 'success' | 'warning' | 'error' | 'default'

/**
 * Alert configuration
 */
export interface AlertConfig extends ComponentConfig {
  /**
   * Alert variant
   * @default 'default'
   */
  variant?: AlertVariant

  /**
   * Alert title
   */
  title?: string

  /**
   * Alert message
   */
  message?: string

  /**
   * Whether the alert is dismissible
   * @default false
   */
  dismissible?: boolean

  /**
   * Auto-dismiss after duration (ms, 0 = no auto-dismiss)
   * @default 0
   */
  autoDismiss?: number

  /**
   * Whether to use ARIA live region
   * @default true
   */
  live?: boolean

  /**
   * ARIA live politeness
   * @default 'polite'
   */
  politeness?: 'polite' | 'assertive'

  /**
   * Icon element selector
   * @default '[data-coral-alert-icon]'
   */
  iconSelector?: string

  /**
   * Title element selector
   * @default '[data-coral-alert-title]'
   */
  titleSelector?: string

  /**
   * Message element selector
   * @default '[data-coral-alert-message]'
   */
  messageSelector?: string

  /**
   * Close button selector
   * @default '[data-coral-alert-close]'
   */
  closeSelector?: string
}

/**
 * Alert state
 */
export interface AlertState extends ComponentState {
  visible: boolean
  dismissing: boolean
}

/**
 * Alert component
 *
 * @example
 * ```html
 * <div data-coral-alert data-variant="success" data-dismissible="true">
 *   <span data-coral-alert-icon></span>
 *   <div>
 *     <h4 data-coral-alert-title>Success!</h4>
 *     <p data-coral-alert-message>Your changes have been saved.</p>
 *   </div>
 *   <button data-coral-alert-close aria-label="Dismiss">&times;</button>
 * </div>
 * ```
 */
export class Alert extends BaseComponent {
  protected declare config: AlertConfig
  protected declare state: AlertState

  private icon: HTMLElement | null = null
  private titleEl: HTMLElement | null = null
  private messageEl: HTMLElement | null = null
  private closeBtn: HTMLElement | null = null
  private dismissTimeout: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): AlertConfig {
    return {
      variant: 'default',
      dismissible: false,
      autoDismiss: 0,
      live: true,
      politeness: 'polite',
      iconSelector: '[data-coral-alert-icon]',
      titleSelector: '[data-coral-alert-title]',
      messageSelector: '[data-coral-alert-message]',
      closeSelector: '[data-coral-alert-close]',
    }
  }

  protected getInitialState(): AlertState {
    return {
      visible: true,
      dismissing: false,
    }
  }

  protected setupAria(): void {
    this.icon = this.query(this.config.iconSelector!)
    this.titleEl = this.query(this.config.titleSelector!)
    this.messageEl = this.query(this.config.messageSelector!)
    this.closeBtn = this.query(this.config.closeSelector!)

    // Set up alert ARIA
    this.element.setAttribute('role', 'alert')

    if (this.config.live) {
      this.element.setAttribute('aria-live', this.config.politeness ?? 'polite')
      this.element.setAttribute('aria-atomic', 'true')
    }

    // Set variant
    this.element.setAttribute('data-variant', this.config.variant ?? 'default')

    // Set up close button
    if (this.closeBtn) {
      if (!this.closeBtn.getAttribute('aria-label')) {
        this.closeBtn.setAttribute('aria-label', 'Dismiss alert')
      }

      if (!this.config.dismissible) {
        this.closeBtn.style.display = 'none'
      }
    }

    // Set content if provided in config
    if (this.config.title && this.titleEl) {
      this.titleEl.textContent = this.config.title
    }
    if (this.config.message && this.messageEl) {
      this.messageEl.textContent = this.config.message
    }

    // Start auto-dismiss timer
    if (this.config.autoDismiss && this.config.autoDismiss > 0) {
      this.dismissTimeout = setTimeout(() => {
        this.dismiss()
      }, this.config.autoDismiss)
    }
  }

  protected bindEvents(): void {
    // Close button
    if (this.closeBtn && this.config.dismissible) {
      this.addEventListener(this.closeBtn, 'click', () => {
        this.dismiss()
      })
    }

    // Keyboard dismiss
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      if (keyEvent.key === 'Escape' && this.config.dismissible) {
        this.dismiss()
      }
    })
  }

  /**
   * Dismiss the alert
   */
  dismiss(): void {
    if (this.state.dismissing || !this.state.visible) return

    // Clear auto-dismiss timer
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout)
      this.dismissTimeout = null
    }

    this.setState({ dismissing: true })
    this.element.setAttribute('data-dismissing', '')

    // Dispatch event (cancellable)
    const canDismiss = this.dispatch('dismiss')

    if (!canDismiss) {
      this.setState({ dismissing: false })
      this.element.removeAttribute('data-dismissing')
      return
    }

    // Wait for animation then hide
    const animationDuration = parseFloat(
      getComputedStyle(this.element).transitionDuration || '0'
    ) * 1000

    setTimeout(() => {
      this.setState({ visible: false, dismissing: false })
      this.element.style.display = 'none'
      this.element.setAttribute('aria-hidden', 'true')
      this.element.removeAttribute('data-dismissing')
      this.dispatch('dismissed')
    }, animationDuration || 200)
  }

  /**
   * Show the alert
   */
  show(): void {
    if (this.state.visible) return

    this.setState({ visible: true })
    this.element.style.display = ''
    this.element.removeAttribute('aria-hidden')
    this.dispatch('show')

    // Restart auto-dismiss timer
    if (this.config.autoDismiss && this.config.autoDismiss > 0) {
      if (this.dismissTimeout) {
        clearTimeout(this.dismissTimeout)
      }
      this.dismissTimeout = setTimeout(() => {
        this.dismiss()
      }, this.config.autoDismiss)
    }
  }

  /**
   * Update variant
   */
  setVariant(variant: AlertVariant): void {
    this.config.variant = variant
    this.element.setAttribute('data-variant', variant)
  }

  /**
   * Update title
   */
  setTitle(title: string): void {
    this.config.title = title
    if (this.titleEl) {
      this.titleEl.textContent = title
    }
  }

  /**
   * Update message
   */
  setMessage(message: string): void {
    this.config.message = message
    if (this.messageEl) {
      this.messageEl.textContent = message
    }
  }

  /**
   * Check if alert is visible
   */
  isVisible(): boolean {
    return this.state.visible
  }

  override destroy(): void {
    if (this.dismissTimeout) {
      clearTimeout(this.dismissTimeout)
    }
    super.destroy()
  }
}

/**
 * Create an alert instance
 */
export const createAlert = createComponentFactory(Alert)

export default Alert
