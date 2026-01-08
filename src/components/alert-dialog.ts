/**
 * AlertDialog Component
 *
 * Confirmation dialog with cancel/confirm actions.
 * @module components/alert-dialog
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface AlertDialogConfig extends ComponentConfig {
  /** Close on overlay click */
  closeOnOverlay?: boolean
  /** Close on escape key */
  closeOnEscape?: boolean
  /** Auto-focus cancel button */
  focusCancel?: boolean
}

export interface AlertDialogState extends ComponentState {
  isOpen: boolean
  result?: 'confirm' | 'cancel'
}

/**
 * AlertDialog component for confirmation dialogs
 */
export class AlertDialog extends BaseComponent {
  private overlay: HTMLElement | null = null
  private cancelBtn: HTMLElement | null = null
  private confirmBtn: HTMLElement | null = null
  private previousActiveElement: HTMLElement | null = null

  protected getDefaultConfig(): AlertDialogConfig {
    return {
      closeOnOverlay: false,
      closeOnEscape: true,
      focusCancel: true,
    }
  }

  protected getInitialState(): AlertDialogState {
    return {
      isOpen: false,
      result: undefined,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'alertdialog')
    this.element.setAttribute('aria-modal', 'true')
    this.element.setAttribute('aria-hidden', 'true')

    const title = this.query('[data-coral-alert-dialog-title]')
    if (title) {
      const titleId = title.id || `${this.id}-title`
      title.id = titleId
      this.element.setAttribute('aria-labelledby', titleId)
    }

    const description = this.query('[data-coral-alert-dialog-description]')
    if (description) {
      const descId = description.id || `${this.id}-description`
      description.id = descId
      this.element.setAttribute('aria-describedby', descId)
    }
  }

  protected bindEvents(): void {
    this.overlay = this.element.closest('[data-coral-alert-dialog-overlay]')
    this.cancelBtn = this.query('[data-coral-alert-dialog-cancel]')
    this.confirmBtn = this.query('[data-coral-alert-dialog-confirm]')

    // Cancel button
    if (this.cancelBtn) {
      const handleCancel = () => this.cancel()
      this.addEventListener(this.cancelBtn, 'click', handleCancel)
    }

    // Confirm button
    if (this.confirmBtn) {
      const handleConfirm = () => this.confirm()
      this.addEventListener(this.confirmBtn, 'click', handleConfirm)
    }

    // Overlay click
    if (this.overlay && (this.config as AlertDialogConfig).closeOnOverlay) {
      const handleOverlay = (e: Event) => {
        if (e.target === this.overlay) {
          this.cancel()
        }
      }
      this.addEventListener(this.overlay, 'click', handleOverlay)
    }

    // Keyboard
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      if (ke.key === 'Escape' && (this.config as AlertDialogConfig).closeOnEscape) {
        this.cancel()
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  protected override render(): void {
    const state = this.state as AlertDialogState
    this.element.setAttribute('aria-hidden', String(!state.isOpen))
    this.element.dataset.state = state.isOpen ? 'open' : 'closed'
    if (this.overlay) {
      this.overlay.dataset.state = state.isOpen ? 'open' : 'closed'
    }
  }

  override open(): void {
    if (this.state.isOpen) return

    this.previousActiveElement = document.activeElement as HTMLElement
    this.setState({ isOpen: true, result: undefined })
    this.lockScroll()
    this.trapFocus()

    // Focus appropriate button
    if ((this.config as AlertDialogConfig).focusCancel && this.cancelBtn) {
      this.cancelBtn.focus()
    } else if (this.confirmBtn) {
      this.confirmBtn.focus()
    }

    this.dispatch('open')
  }

  override close(): void {
    if (!this.state.isOpen) return

    this.setState({ isOpen: false })
    this.unlockScroll()
    this.releaseFocusTrap()

    if (this.previousActiveElement) {
      this.previousActiveElement.focus()
    }

    this.dispatch('close', { result: (this.state as AlertDialogState).result })
  }

  confirm(): void {
    this.setState({ result: 'confirm' })
    this.dispatch('confirm')
    this.close()
  }

  cancel(): void {
    this.setState({ result: 'cancel' })
    this.dispatch('cancel')
    this.close()
  }

  getResult(): 'confirm' | 'cancel' | undefined {
    return (this.state as AlertDialogState).result
  }
}

export const createAlertDialog = createComponentFactory(AlertDialog)
export default AlertDialog
