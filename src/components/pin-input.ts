/**
 * PinInput Component
 *
 * PIN/OTP input with multiple fields.
 * @module components/pin-input
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface PinInputConfig extends ComponentConfig {
  /** Number of digits */
  length?: number
  /** Mask input (password mode) */
  mask?: boolean
  /** Auto-submit on complete */
  autoSubmit?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Placeholder character */
  placeholder?: string
  /** Input type */
  type?: 'numeric' | 'alphanumeric'
}

export interface PinInputState extends ComponentState {
  values: string[]
  focusedIndex: number
  disabled: boolean
  complete: boolean
}

/**
 * PinInput component for PIN/OTP entry
 */
export class PinInput extends BaseComponent {
  private inputs: HTMLInputElement[] = []

  protected getDefaultConfig(): PinInputConfig {
    return {
      length: 6,
      mask: false,
      autoSubmit: false,
      disabled: false,
      placeholder: '',
      type: 'numeric',
    }
  }

  protected getInitialState(): PinInputState {
    const config = this.config as PinInputConfig
    return {
      values: new Array(config.length).fill(''),
      focusedIndex: -1,
      disabled: config.disabled ?? false,
      complete: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'PIN input')
  }

  protected bindEvents(): void {
    const config = this.config as PinInputConfig

    // Create or find inputs
    this.inputs = Array.from(this.queryAll('input'))

    if (this.inputs.length === 0) {
      // Create inputs dynamically
      for (let i = 0; i < config.length!; i++) {
        const input = document.createElement('input')
        input.type = config.mask ? 'password' : 'text'
        input.inputMode = config.type === 'numeric' ? 'numeric' : 'text'
        input.maxLength = 1
        input.className = 'pin-input-field'
        input.placeholder = config.placeholder || ''
        input.dataset.index = String(i)
        this.element.appendChild(input)
        this.inputs.push(input)
      }
    }

    // Bind events to each input
    this.inputs.forEach((input, index) => {
      // Input event
      const handleInput = (e: Event) => {
        const ie = e as InputEvent
        let value = input.value

        // Validate input
        if (config.type === 'numeric' && !/^\d*$/.test(value)) {
          value = value.replace(/\D/g, '')
          input.value = value
        }

        if (value.length > 0) {
          this.setValueAt(index, value.charAt(0))

          // Handle paste
          if (value.length > 1 && ie.inputType === 'insertFromPaste') {
            this.handlePaste(value, index)
            return
          }

          // Move to next
          if (index < this.inputs.length - 1) {
            this.focusInput(index + 1)
          }
        }
      }
      this.addEventListener(input, 'input', handleInput)

      // Keydown
      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent

        if (ke.key === 'Backspace') {
          if (input.value === '' && index > 0) {
            e.preventDefault()
            this.setValueAt(index - 1, '')
            this.focusInput(index - 1)
          } else {
            this.setValueAt(index, '')
          }
        } else if (ke.key === 'ArrowLeft' && index > 0) {
          e.preventDefault()
          this.focusInput(index - 1)
        } else if (ke.key === 'ArrowRight' && index < this.inputs.length - 1) {
          e.preventDefault()
          this.focusInput(index + 1)
        } else if (ke.key === 'Delete') {
          this.setValueAt(index, '')
        }
      }
      this.addEventListener(input, 'keydown', handleKeydown)

      // Focus
      const handleFocus = () => {
        input.select()
        this.setState({ focusedIndex: index })
      }
      this.addEventListener(input, 'focus', handleFocus)

      // Blur
      const handleBlur = () => {
        this.setState({ focusedIndex: -1 })
      }
      this.addEventListener(input, 'blur', handleBlur)

      // Paste
      const handlePaste = (e: Event) => {
        e.preventDefault()
        const pe = e as ClipboardEvent
        const text = pe.clipboardData?.getData('text') || ''
        this.handlePaste(text, index)
      }
      this.addEventListener(input, 'paste', handlePaste)
    })
  }

  private handlePaste(text: string, startIndex: number): void {
    const config = this.config as PinInputConfig
    let cleanText = text

    if (config.type === 'numeric') {
      cleanText = text.replace(/\D/g, '')
    }

    const chars = cleanText.split('')
    const state = this.state as PinInputState
    const newValues = [...state.values]

    chars.forEach((char, i) => {
      const targetIndex = startIndex + i
      if (targetIndex < this.inputs.length) {
        newValues[targetIndex] = char
      }
    })

    this.setState({ values: newValues })
    this.updateInputs()

    // Focus appropriate input
    const nextIndex = Math.min(startIndex + chars.length, this.inputs.length - 1)
    this.focusInput(nextIndex)
  }

  private setValueAt(index: number, value: string): void {
    const state = this.state as PinInputState
    const newValues = [...state.values]
    newValues[index] = value

    const complete = newValues.every(v => v !== '')

    this.setState({ values: newValues, complete })
    this.inputs[index]!.value = value

    if (complete) {
      this.dispatch('complete', { value: newValues.join('') })

      if ((this.config as PinInputConfig).autoSubmit) {
        this.dispatch('submit', { value: newValues.join('') })
      }
    }

    this.dispatch('change', { values: newValues, value: newValues.join('') })
  }

  private updateInputs(): void {
    const state = this.state as PinInputState
    this.inputs.forEach((input, index) => {
      input.value = state.values[index] || ''
    })
  }

  private focusInput(index: number): void {
    if (index >= 0 && index < this.inputs.length) {
      this.inputs[index]?.focus()
    }
  }

  protected override render(): void {
    const state = this.state as PinInputState

    this.inputs.forEach((input, index) => {
      input.disabled = state.disabled
      input.dataset.filled = String(state.values[index] !== '')
      input.dataset.focused = String(state.focusedIndex === index)
    })

    this.element.dataset.complete = String(state.complete)
    this.element.dataset.disabled = String(state.disabled)
  }

  getValue(): string {
    return (this.state as PinInputState).values.join('')
  }

  setValue(value: string): void {
    const config = this.config as PinInputConfig
    const chars = value.slice(0, config.length).split('')
    const values = new Array(config.length).fill('').map((_, i) => chars[i] || '')
    const complete = values.every(v => v !== '')

    this.setState({ values, complete })
    this.updateInputs()
  }

  clear(): void {
    const config = this.config as PinInputConfig
    this.setState({
      values: new Array(config.length).fill(''),
      complete: false,
    })
    this.updateInputs()
    this.focusInput(0)
  }

  focus(): void {
    this.focusInput(0)
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }

  isComplete(): boolean {
    return (this.state as PinInputState).complete
  }
}

export const createPinInput = createComponentFactory(PinInput)
export default PinInput
