/**
 * Input Component
 *
 * Enhanced text input with validation and states.
 * @module components/input
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface InputConfig extends ComponentConfig {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'
  /** Placeholder text */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Required state */
  required?: boolean
  /** Pattern for validation */
  pattern?: string
  /** Min length */
  minLength?: number
  /** Max length */
  maxLength?: number
}

export interface InputState extends ComponentState {
  value: string
  disabled: boolean
  focused: boolean
  valid: boolean
  touched: boolean
}

/**
 * Input component with validation
 */
export class Input extends BaseComponent {
  private input: HTMLInputElement | null = null

  protected getDefaultConfig(): InputConfig {
    return {
      type: 'text',
      disabled: false,
      required: false,
    }
  }

  protected getInitialState(): InputState {
    const input = this.element.querySelector('input') as HTMLInputElement
    const config = this.config as InputConfig
    return {
      value: input?.value ?? '',
      disabled: config.disabled ?? false,
      focused: false,
      valid: true,
      touched: false,
    }
  }

  protected setupAria(): void {
    this.input = this.element.querySelector('input')

    if (this.input) {
      const config = this.config as InputConfig

      if (config.required) {
        this.input.setAttribute('aria-required', 'true')
      }

      const description = this.query('[data-coral-input-description]')
      if (description) {
        const descId = description.id || `${this.id}-description`
        description.id = descId
        this.input.setAttribute('aria-describedby', descId)
      }

      const error = this.query('[data-coral-input-error]')
      if (error) {
        const errorId = error.id || `${this.id}-error`
        error.id = errorId
      }
    }
  }

  protected bindEvents(): void {
    if (!this.input) return

    // Input
    const handleInput = () => {
      this.setState({ value: this.input!.value })
      this.validate()
      this.dispatch('input', { value: this.input!.value })
    }
    this.addEventListener(this.input, 'input', handleInput)

    // Change
    const handleChange = () => {
      this.dispatch('change', { value: this.input!.value })
    }
    this.addEventListener(this.input, 'change', handleChange)

    // Focus
    const handleFocus = () => {
      this.setState({ focused: true })
    }
    this.addEventListener(this.input, 'focus', handleFocus)

    // Blur
    const handleBlur = () => {
      this.setState({ focused: false, touched: true })
      this.validate()
    }
    this.addEventListener(this.input, 'blur', handleBlur)
  }

  private validate(): void {
    if (!this.input) return

    const isValid = this.input.checkValidity()
    this.setState({ valid: isValid })

    const error = this.query('[data-coral-input-error]')
    if (error) {
      if (!isValid && (this.state as InputState).touched) {
        error.textContent = this.input.validationMessage
        error.removeAttribute('hidden')
        this.input.setAttribute('aria-invalid', 'true')
        this.input.setAttribute('aria-errormessage', error.id)
      } else {
        error.setAttribute('hidden', '')
        this.input.removeAttribute('aria-invalid')
        this.input.removeAttribute('aria-errormessage')
      }
    }
  }

  protected override render(): void {
    const state = this.state as InputState

    this.element.dataset.state = state.focused ? 'focused' : 'default'

    if (!state.valid && state.touched) {
      this.element.dataset.invalid = ''
    } else {
      delete this.element.dataset.invalid
    }

    if (state.disabled) {
      this.element.dataset.disabled = ''
    } else {
      delete this.element.dataset.disabled
    }
  }

  getValue(): string {
    return (this.state as InputState).value
  }

  setValue(value: string): void {
    if (this.input) {
      this.input.value = value
      this.setState({ value })
    }
  }

  isValid(): boolean {
    return (this.state as InputState).valid
  }

  setDisabled(disabled: boolean): void {
    if (this.input) {
      this.input.disabled = disabled
      this.setState({ disabled })
    }
  }

  focus(): void {
    this.input?.focus()
  }

  blur(): void {
    this.input?.blur()
  }

  clear(): void {
    this.setValue('')
  }
}

export const createInput = createComponentFactory(Input)
export default Input
