/**
 * Checkbox Component
 *
 * Accessible checkbox with indeterminate state support.
 * @module components/checkbox
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface CheckboxConfig extends ComponentConfig {
  /** Initial checked state */
  defaultChecked?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Required state */
  required?: boolean
  /** Name for form submission */
  name?: string
  /** Value for form submission */
  value?: string
}

export interface CheckboxState extends ComponentState {
  checked: boolean
  indeterminate: boolean
  disabled: boolean
}

/**
 * Checkbox component with custom styling support
 */
export class Checkbox extends BaseComponent {
  private input: HTMLInputElement | null = null
  private indicator: HTMLElement | null = null

  protected getDefaultConfig(): CheckboxConfig {
    return {
      defaultChecked: false,
      disabled: false,
      required: false,
    }
  }

  protected getInitialState(): CheckboxState {
    const config = this.config as CheckboxConfig
    const input = this.element.querySelector('input[type="checkbox"]') as HTMLInputElement
    return {
      checked: input?.checked ?? config.defaultChecked ?? false,
      indeterminate: input?.indeterminate ?? false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'checkbox')
    this.element.setAttribute('aria-checked', String(this.state.checked))
    this.element.setAttribute('tabindex', this.state.disabled ? '-1' : '0')

    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true')
    }

    const config = this.config as CheckboxConfig
    if (config.required) {
      this.element.setAttribute('aria-required', 'true')
    }
  }

  protected bindEvents(): void {
    this.input = this.element.querySelector('input[type="checkbox"]')
    this.indicator = this.query('[data-coral-checkbox-indicator]')

    // Click handler
    const handleClick = (e: Event) => {
      e.preventDefault()
      if (!(this.state as CheckboxState).disabled) {
        this.toggle()
      }
    }
    this.addEventListener(this.element, 'click', handleClick)

    // Keyboard
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      if ((ke.key === ' ' || ke.key === 'Enter') && !(this.state as CheckboxState).disabled) {
        e.preventDefault()
        this.toggle()
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)

    // Sync with input
    if (this.input) {
      const handleChange = () => {
        this.setState({
          checked: this.input!.checked,
          indeterminate: this.input!.indeterminate,
        })
      }
      this.addEventListener(this.input, 'change', handleChange)
    }
  }

  protected override render(): void {
    const state = this.state as CheckboxState

    this.element.setAttribute('aria-checked', state.indeterminate ? 'mixed' : String(state.checked))
    this.element.dataset.state = state.checked ? 'checked' : 'unchecked'

    if (state.indeterminate) {
      this.element.dataset.state = 'indeterminate'
    }

    if (state.disabled) {
      this.element.dataset.disabled = ''
    } else {
      delete this.element.dataset.disabled
    }

    if (this.input) {
      this.input.checked = state.checked
      this.input.indeterminate = state.indeterminate
      this.input.disabled = state.disabled
    }

    if (this.indicator) {
      this.indicator.dataset.state = this.element.dataset.state
    }
  }

  override toggle(): void {
    const state = this.state as CheckboxState
    const newChecked = !state.checked
    this.setState({ checked: newChecked, indeterminate: false })
    this.dispatch('change', { checked: newChecked })
  }

  check(): void {
    if (!(this.state as CheckboxState).checked) {
      this.setState({ checked: true, indeterminate: false })
      this.dispatch('change', { checked: true })
    }
  }

  uncheck(): void {
    if ((this.state as CheckboxState).checked) {
      this.setState({ checked: false, indeterminate: false })
      this.dispatch('change', { checked: false })
    }
  }

  setIndeterminate(value: boolean): void {
    this.setState({ indeterminate: value })
  }

  isChecked(): boolean {
    return (this.state as CheckboxState).checked
  }

  isIndeterminate(): boolean {
    return (this.state as CheckboxState).indeterminate
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
    this.element.setAttribute('tabindex', disabled ? '-1' : '0')
    if (disabled) {
      this.element.setAttribute('aria-disabled', 'true')
    } else {
      this.element.removeAttribute('aria-disabled')
    }
  }
}

export const createCheckbox = createComponentFactory(Checkbox)
export default Checkbox
