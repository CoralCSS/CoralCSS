/**
 * Toggle Component
 *
 * Two-state toggle button.
 * @module components/toggle
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ToggleConfig extends ComponentConfig {
  /** Initial pressed state */
  defaultPressed?: boolean
  /** Disabled state */
  disabled?: boolean
}

export interface ToggleState extends ComponentState {
  pressed: boolean
  disabled: boolean
}

/**
 * Toggle component for on/off states
 */
export class Toggle extends BaseComponent {
  protected getDefaultConfig(): ToggleConfig {
    return {
      defaultPressed: false,
      disabled: false,
    }
  }

  protected getInitialState(): ToggleState {
    const config = this.config as ToggleConfig
    return {
      pressed: config.defaultPressed ?? false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'button')
    this.element.setAttribute('aria-pressed', String(this.state.pressed))
    this.element.setAttribute('tabindex', this.state.disabled ? '-1' : '0')

    if (this.state.disabled) {
      this.element.setAttribute('aria-disabled', 'true')
    }
  }

  protected bindEvents(): void {
    // Click
    const handleClick = () => {
      if (!(this.state as ToggleState).disabled) {
        this.toggle()
      }
    }
    this.addEventListener(this.element, 'click', handleClick)

    // Keyboard
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      if ((ke.key === ' ' || ke.key === 'Enter') && !(this.state as ToggleState).disabled) {
        e.preventDefault()
        this.toggle()
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  protected override render(): void {
    const state = this.state as ToggleState

    this.element.setAttribute('aria-pressed', String(state.pressed))
    this.element.dataset.state = state.pressed ? 'on' : 'off'

    if (state.disabled) {
      this.element.dataset.disabled = ''
      this.element.setAttribute('tabindex', '-1')
      this.element.setAttribute('aria-disabled', 'true')
    } else {
      delete this.element.dataset.disabled
      this.element.setAttribute('tabindex', '0')
      this.element.removeAttribute('aria-disabled')
    }
  }

  override toggle(): void {
    const state = this.state as ToggleState
    const newPressed = !state.pressed
    this.setState({ pressed: newPressed })
    this.dispatch('change', { pressed: newPressed })
  }

  press(): void {
    if (!(this.state as ToggleState).pressed) {
      this.setState({ pressed: true })
      this.dispatch('change', { pressed: true })
    }
  }

  unpress(): void {
    if ((this.state as ToggleState).pressed) {
      this.setState({ pressed: false })
      this.dispatch('change', { pressed: false })
    }
  }

  isPressed(): boolean {
    return (this.state as ToggleState).pressed
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createToggle = createComponentFactory(Toggle)
export default Toggle
