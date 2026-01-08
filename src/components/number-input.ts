/**
 * NumberInput Component
 *
 * Number input with increment/decrement buttons.
 * @module components/number-input
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface NumberInputConfig extends ComponentConfig {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step value */
  step?: number
  /** Default value */
  defaultValue?: number
  /** Disabled state */
  disabled?: boolean
  /** Allow keyboard input */
  allowInput?: boolean
  /** Format options */
  format?: Intl.NumberFormatOptions
}

export interface NumberInputState extends ComponentState {
  value: number
  disabled: boolean
  focused: boolean
}

/**
 * NumberInput component with stepper buttons
 */
export class NumberInput extends BaseComponent {
  private input: HTMLInputElement | null = null
  private incrementBtn: HTMLElement | null = null
  private decrementBtn: HTMLElement | null = null

  protected getDefaultConfig(): NumberInputConfig {
    return {
      min: -Infinity,
      max: Infinity,
      step: 1,
      defaultValue: 0,
      disabled: false,
      allowInput: true,
    }
  }

  protected getInitialState(): NumberInputState {
    const config = this.config as NumberInputConfig
    return {
      value: config.defaultValue ?? 0,
      disabled: config.disabled ?? false,
      focused: false,
    }
  }

  protected setupAria(): void {
    const config = this.config as NumberInputConfig
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Number input')

    this.input = this.query('input')
    if (this.input) {
      this.input.setAttribute('role', 'spinbutton')
      this.input.setAttribute('aria-valuemin', String(config.min))
      this.input.setAttribute('aria-valuemax', String(config.max))
      this.input.setAttribute('aria-valuenow', String(this.state.value))
    }
  }

  protected bindEvents(): void {
    const config = this.config as NumberInputConfig

    this.incrementBtn = this.query('[data-coral-number-input-increment]')
    this.decrementBtn = this.query('[data-coral-number-input-decrement]')

    // Increment button
    if (this.incrementBtn) {
      const handleIncrement = () => {
        if (!(this.state as NumberInputState).disabled) {
          this.increment()
        }
      }
      this.addEventListener(this.incrementBtn, 'click', handleIncrement)
    }

    // Decrement button
    if (this.decrementBtn) {
      const handleDecrement = () => {
        if (!(this.state as NumberInputState).disabled) {
          this.decrement()
        }
      }
      this.addEventListener(this.decrementBtn, 'click', handleDecrement)
    }

    // Input
    if (this.input) {
      if (config.allowInput) {
        const handleInput = () => {
          const value = parseFloat(this.input!.value)
          if (!isNaN(value)) {
            this.setValue(value)
          }
        }
        this.addEventListener(this.input, 'change', handleInput)
      } else {
        this.input.readOnly = true
      }

      // Focus
      const handleFocus = () => {
        this.setState({ focused: true })
      }
      this.addEventListener(this.input, 'focus', handleFocus)

      const handleBlur = () => {
        this.setState({ focused: false })
      }
      this.addEventListener(this.input, 'blur', handleBlur)

      // Keyboard
      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        if (ke.key === 'ArrowUp') {
          e.preventDefault()
          this.increment()
        } else if (ke.key === 'ArrowDown') {
          e.preventDefault()
          this.decrement()
        }
      }
      this.addEventListener(this.input, 'keydown', handleKeydown)
    }
  }

  protected override render(): void {
    const state = this.state as NumberInputState
    const config = this.config as NumberInputConfig

    if (this.input) {
      if (config.format) {
        this.input.value = new Intl.NumberFormat(undefined, config.format).format(state.value)
      } else {
        this.input.value = String(state.value)
      }
      this.input.setAttribute('aria-valuenow', String(state.value))
      this.input.disabled = state.disabled
    }

    // Update button states
    const atMin = state.value <= (config.min ?? -Infinity)
    const atMax = state.value >= (config.max ?? Infinity)

    if (this.incrementBtn) {
      (this.incrementBtn as HTMLButtonElement).disabled = atMax || state.disabled
      this.incrementBtn.dataset.disabled = String(atMax || state.disabled)
    }

    if (this.decrementBtn) {
      (this.decrementBtn as HTMLButtonElement).disabled = atMin || state.disabled
      this.decrementBtn.dataset.disabled = String(atMin || state.disabled)
    }

    this.element.dataset.focused = String(state.focused)
    this.element.dataset.disabled = String(state.disabled)
  }

  increment(): void {
    const config = this.config as NumberInputConfig
    const state = this.state as NumberInputState
    this.setValue(state.value + (config.step ?? 1))
  }

  decrement(): void {
    const config = this.config as NumberInputConfig
    const state = this.state as NumberInputState
    this.setValue(state.value - (config.step ?? 1))
  }

  setValue(value: number): void {
    const config = this.config as NumberInputConfig
    const clamped = Math.max(config.min ?? -Infinity, Math.min(config.max ?? Infinity, value))
    const prevValue = (this.state as NumberInputState).value

    if (clamped !== prevValue) {
      this.setState({ value: clamped })
      this.dispatch('change', { value: clamped, prevValue })
    }
  }

  getValue(): number {
    return (this.state as NumberInputState).value
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createNumberInput = createComponentFactory(NumberInput)
export default NumberInput
