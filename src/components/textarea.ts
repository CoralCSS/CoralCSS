/**
 * Textarea Component
 *
 * Multi-line text input with auto-resize support.
 * @module components/textarea
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface TextareaConfig extends ComponentConfig {
  /** Placeholder text */
  placeholder?: string
  /** Disabled state */
  disabled?: boolean
  /** Required state */
  required?: boolean
  /** Auto-resize to content */
  autoResize?: boolean
  /** Min rows */
  minRows?: number
  /** Max rows */
  maxRows?: number
  /** Max length */
  maxLength?: number
}

export interface TextareaState extends ComponentState {
  value: string
  disabled: boolean
  focused: boolean
  charCount: number
}

/**
 * Textarea component with auto-resize
 */
export class Textarea extends BaseComponent {
  private textarea: HTMLTextAreaElement | null = null

  protected getDefaultConfig(): TextareaConfig {
    return {
      disabled: false,
      required: false,
      autoResize: false,
      minRows: 3,
    }
  }

  protected getInitialState(): TextareaState {
    const textarea = this.element.querySelector('textarea') as HTMLTextAreaElement
    return {
      value: textarea?.value ?? '',
      disabled: (this.config as TextareaConfig).disabled ?? false,
      focused: false,
      charCount: textarea?.value.length ?? 0,
    }
  }

  protected setupAria(): void {
    this.textarea = this.element.querySelector('textarea')

    if (this.textarea) {
      const config = this.config as TextareaConfig

      if (config.required) {
        this.textarea.setAttribute('aria-required', 'true')
      }

      const description = this.query('[data-coral-textarea-description]')
      if (description) {
        const descId = description.id || `${this.id}-description`
        description.id = descId
        this.textarea.setAttribute('aria-describedby', descId)
      }
    }
  }

  protected bindEvents(): void {
    if (!this.textarea) {return}

    const config = this.config as TextareaConfig

    // Input
    const handleInput = () => {
      const value = this.textarea!.value
      this.setState({ value, charCount: value.length })

      if (config.autoResize) {
        this.autoResize()
      }

      this.dispatch('input', { value })
    }
    this.addEventListener(this.textarea, 'input', handleInput)

    // Focus
    const handleFocus = () => {
      this.setState({ focused: true })
    }
    this.addEventListener(this.textarea, 'focus', handleFocus)

    // Blur
    const handleBlur = () => {
      this.setState({ focused: false })
    }
    this.addEventListener(this.textarea, 'blur', handleBlur)

    // Initial auto-resize
    if (config.autoResize) {
      this.autoResize()
    }
  }

  private autoResize(): void {
    if (!this.textarea) {return}

    const config = this.config as TextareaConfig

    // Reset height to calculate scroll height
    this.textarea.style.height = 'auto'

    // Get line height
    const style = window.getComputedStyle(this.textarea)
    const lineHeight = parseInt(style.lineHeight) || 20
    const paddingTop = parseInt(style.paddingTop) || 0
    const paddingBottom = parseInt(style.paddingBottom) || 0
    const borderTop = parseInt(style.borderTopWidth) || 0
    const borderBottom = parseInt(style.borderBottomWidth) || 0

    // Calculate min and max heights
    const minHeight = config.minRows ? config.minRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom : 0
    const maxHeight = config.maxRows ? config.maxRows * lineHeight + paddingTop + paddingBottom + borderTop + borderBottom : Infinity

    // Set height
    const scrollHeight = this.textarea.scrollHeight
    const newHeight = Math.min(Math.max(scrollHeight, minHeight), maxHeight)
    this.textarea.style.height = `${newHeight}px`

    // Enable scrolling if max height reached
    this.textarea.style.overflowY = scrollHeight > maxHeight ? 'auto' : 'hidden'
  }

  protected override render(): void {
    const state = this.state as TextareaState
    const config = this.config as TextareaConfig

    this.element.dataset.state = state.focused ? 'focused' : 'default'

    if (state.disabled) {
      this.element.dataset.disabled = ''
    } else {
      delete this.element.dataset.disabled
    }

    // Update character count display
    const counter = this.query('[data-coral-textarea-counter]')
    if (counter && config.maxLength) {
      counter.textContent = `${state.charCount}/${config.maxLength}`
    }
  }

  getValue(): string {
    return (this.state as TextareaState).value
  }

  setValue(value: string): void {
    if (this.textarea) {
      this.textarea.value = value
      this.setState({ value, charCount: value.length })

      if ((this.config as TextareaConfig).autoResize) {
        this.autoResize()
      }
    }
  }

  setDisabled(disabled: boolean): void {
    if (this.textarea) {
      this.textarea.disabled = disabled
      this.setState({ disabled })
    }
  }

  focus(): void {
    this.textarea?.focus()
  }

  blur(): void {
    this.textarea?.blur()
  }

  clear(): void {
    this.setValue('')
  }

  getCharCount(): number {
    return (this.state as TextareaState).charCount
  }
}

export const createTextarea = createComponentFactory(Textarea)
export default Textarea
