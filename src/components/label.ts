/**
 * Label Component
 *
 * Accessible label for form controls.
 * @module components/label
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface LabelConfig extends ComponentConfig {
  /** ID of the control this label is for */
  htmlFor?: string
}

export interface LabelState extends ComponentState {
  disabled: boolean
}

/**
 * Label component for form accessibility
 */
export class Label extends BaseComponent {
  protected getDefaultConfig(): LabelConfig {
    return {}
  }

  protected getInitialState(): LabelState {
    return {
      disabled: false,
    }
  }

  protected setupAria(): void {
    const config = this.config as LabelConfig

    if (config.htmlFor) {
      this.element.setAttribute('for', config.htmlFor)
    }

    // Check if associated control is disabled
    const htmlFor = this.element.getAttribute('for')
    if (htmlFor) {
      const control = document.getElementById(htmlFor)
      if (control?.hasAttribute('disabled')) {
        this.setState({ disabled: true })
      }
    }
  }

  protected bindEvents(): void {
    // Click to focus associated control
    const handleClick = () => {
      const htmlFor = this.element.getAttribute('for')
      if (htmlFor) {
        const control = document.getElementById(htmlFor) as HTMLElement
        control?.focus()
      }
    }
    this.addEventListener(this.element, 'click', handleClick)
  }

  protected override render(): void {
    const state = this.state as LabelState

    if (state.disabled) {
      this.element.dataset.disabled = ''
    } else {
      delete this.element.dataset.disabled
    }
  }

  setFor(id: string): void {
    this.element.setAttribute('for', id)
  }
}

export const createLabel = createComponentFactory(Label)
export default Label
