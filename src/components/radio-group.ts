/**
 * RadioGroup Component
 *
 * Accessible radio button group with keyboard navigation.
 * @module components/radio-group
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface RadioGroupConfig extends ComponentConfig {
  /** Default selected value */
  defaultValue?: string
  /** Name for form submission */
  name?: string
  /** Disabled state */
  disabled?: boolean
  /** Required state */
  required?: boolean
  /** Orientation for keyboard navigation */
  orientation?: 'horizontal' | 'vertical'
}

export interface RadioGroupState extends ComponentState {
  value: string | null
  disabled: boolean
}

/**
 * RadioGroup component for exclusive selection
 */
export class RadioGroup extends BaseComponent {
  private items: HTMLElement[] = []
  private focusedIndex = -1

  protected getDefaultConfig(): RadioGroupConfig {
    return {
      orientation: 'vertical',
      disabled: false,
      required: false,
    }
  }

  protected getInitialState(): RadioGroupState {
    const config = this.config as RadioGroupConfig
    return {
      value: config.defaultValue ?? null,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'radiogroup')

    const config = this.config as RadioGroupConfig
    if (config.required) {
      this.element.setAttribute('aria-required', 'true')
    }
    if (config.orientation) {
      this.element.setAttribute('aria-orientation', config.orientation)
    }

    // Setup items
    this.items = Array.from(this.queryAll('[data-coral-radio-item]'))
    this.items.forEach((item, index) => {
      item.setAttribute('role', 'radio')
      item.setAttribute('tabindex', index === 0 ? '0' : '-1')
      const value = item.dataset.value
      const isChecked = value === (this.state as RadioGroupState).value
      item.setAttribute('aria-checked', String(isChecked))
    })
  }

  protected bindEvents(): void {
    this.items.forEach((item, index) => {
      // Click
      const handleClick = () => {
        if (!(this.state as RadioGroupState).disabled && !item.hasAttribute('data-disabled')) {
          this.select(item.dataset.value!)
          this.focusItem(index)
        }
      }
      this.addEventListener(item, 'click', handleClick)

      // Focus
      const handleFocus = () => {
        this.focusedIndex = index
      }
      this.addEventListener(item, 'focus', handleFocus)
    })

    // Keyboard navigation
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      const config = this.config as RadioGroupConfig
      const isVertical = config.orientation === 'vertical'
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'

      if ([prevKey, nextKey, 'Home', 'End', ' '].includes(ke.key)) {
        e.preventDefault()

        if (ke.key === ' ') {
          const item = this.items[this.focusedIndex]
          if (item && !item.hasAttribute('data-disabled')) {
            this.select(item.dataset.value!)
          }
          return
        }

        let newIndex = this.focusedIndex

        if (ke.key === prevKey) {
          newIndex = this.findPrevEnabled(this.focusedIndex)
        } else if (ke.key === nextKey) {
          newIndex = this.findNextEnabled(this.focusedIndex)
        } else if (ke.key === 'Home') {
          newIndex = this.findNextEnabled(-1)
        } else if (ke.key === 'End') {
          newIndex = this.findPrevEnabled(this.items.length)
        }

        if (newIndex !== -1) {
          this.focusItem(newIndex)
          const item = this.items[newIndex]
          if (item) {
            this.select(item.dataset.value!)
          }
        }
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  private findNextEnabled(from: number): number {
    for (let i = from + 1; i < this.items.length; i++) {
      if (!this.items[i]?.hasAttribute('data-disabled')) {
        return i
      }
    }
    return from
  }

  private findPrevEnabled(from: number): number {
    for (let i = from - 1; i >= 0; i--) {
      if (!this.items[i]?.hasAttribute('data-disabled')) {
        return i
      }
    }
    return from
  }

  private focusItem(index: number): void {
    this.items.forEach((item, i) => {
      item.setAttribute('tabindex', i === index ? '0' : '-1')
    })
    this.items[index]?.focus()
    this.focusedIndex = index
  }

  protected override render(): void {
    const state = this.state as RadioGroupState

    this.items.forEach((item) => {
      const isChecked = item.dataset.value === state.value
      item.setAttribute('aria-checked', String(isChecked))
      item.dataset.state = isChecked ? 'checked' : 'unchecked'
    })
  }

  select(value: string): void {
    const prevValue = (this.state as RadioGroupState).value
    if (prevValue !== value) {
      this.setState({ value })
      this.dispatch('change', { value, prevValue })
    }
  }

  getValue(): string | null {
    return (this.state as RadioGroupState).value
  }

  setValue(value: string): void {
    this.select(value)
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
    if (disabled) {
      this.element.setAttribute('aria-disabled', 'true')
    } else {
      this.element.removeAttribute('aria-disabled')
    }
  }
}

export const createRadioGroup = createComponentFactory(RadioGroup)
export default RadioGroup
