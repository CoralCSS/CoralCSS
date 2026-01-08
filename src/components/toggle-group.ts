/**
 * ToggleGroup Component
 *
 * Group of toggle buttons with single or multiple selection.
 * @module components/toggle-group
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ToggleGroupConfig extends ComponentConfig {
  /** Selection type */
  type?: 'single' | 'multiple'
  /** Default value(s) */
  defaultValue?: string | string[]
  /** Disabled state */
  disabled?: boolean
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Allow deselection in single mode */
  allowEmpty?: boolean
}

export interface ToggleGroupState extends ComponentState {
  value: string[]
  disabled: boolean
}

/**
 * ToggleGroup component for grouped toggles
 */
export class ToggleGroup extends BaseComponent {
  private items: HTMLElement[] = []
  private focusedIndex = 0

  protected getDefaultConfig(): ToggleGroupConfig {
    return {
      type: 'single',
      orientation: 'horizontal',
      disabled: false,
      allowEmpty: true,
    }
  }

  protected getInitialState(): ToggleGroupState {
    const config = this.config as ToggleGroupConfig
    let value: string[] = []

    if (config.defaultValue) {
      value = Array.isArray(config.defaultValue) ? config.defaultValue : [config.defaultValue]
    }

    return {
      value,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')

    const config = this.config as ToggleGroupConfig
    if (config.orientation) {
      this.element.setAttribute('aria-orientation', config.orientation)
    }

    // Setup items
    this.items = Array.from(this.queryAll('[data-coral-toggle-group-item]'))
    this.items.forEach((item, index) => {
      item.setAttribute('role', 'button')
      item.setAttribute('tabindex', index === 0 ? '0' : '-1')
      const value = item.dataset.value
      const isPressed = value ? (this.state as ToggleGroupState).value.includes(value) : false
      item.setAttribute('aria-pressed', String(isPressed))
    })
  }

  protected bindEvents(): void {
    this.items.forEach((item, index) => {
      // Click
      const handleClick = () => {
        if (!(this.state as ToggleGroupState).disabled && !item.hasAttribute('data-disabled')) {
          this.toggleItem(item.dataset.value!)
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
      const config = this.config as ToggleGroupConfig
      const isVertical = config.orientation === 'vertical'
      const prevKey = isVertical ? 'ArrowUp' : 'ArrowLeft'
      const nextKey = isVertical ? 'ArrowDown' : 'ArrowRight'

      if ([prevKey, nextKey, 'Home', 'End', ' ', 'Enter'].includes(ke.key)) {
        e.preventDefault()

        if (ke.key === ' ' || ke.key === 'Enter') {
          const item = this.items[this.focusedIndex]
          if (item && !item.hasAttribute('data-disabled')) {
            this.toggleItem(item.dataset.value!)
          }
          return
        }

        let newIndex = this.focusedIndex

        if (ke.key === prevKey) {
          newIndex = Math.max(0, this.focusedIndex - 1)
        } else if (ke.key === nextKey) {
          newIndex = Math.min(this.items.length - 1, this.focusedIndex + 1)
        } else if (ke.key === 'Home') {
          newIndex = 0
        } else if (ke.key === 'End') {
          newIndex = this.items.length - 1
        }

        this.focusItem(newIndex)
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  private focusItem(index: number): void {
    this.items.forEach((item, i) => {
      item.setAttribute('tabindex', i === index ? '0' : '-1')
    })
    this.items[index]?.focus()
    this.focusedIndex = index
  }

  protected override render(): void {
    const state = this.state as ToggleGroupState

    this.items.forEach((item) => {
      const value = item.dataset.value
      const isPressed = value ? state.value.includes(value) : false
      item.setAttribute('aria-pressed', String(isPressed))
      item.dataset.state = isPressed ? 'on' : 'off'
    })
  }

  toggleItem(value: string): void {
    const config = this.config as ToggleGroupConfig
    const state = this.state as ToggleGroupState
    let newValue: string[]

    if (config.type === 'single') {
      if (state.value.includes(value)) {
        newValue = config.allowEmpty ? [] : [value]
      } else {
        newValue = [value]
      }
    } else {
      if (state.value.includes(value)) {
        newValue = state.value.filter(v => v !== value)
      } else {
        newValue = [...state.value, value]
      }
    }

    this.setState({ value: newValue })
    this.dispatch('change', { value: config.type === 'single' ? newValue[0] ?? null : newValue })
  }

  getValue(): string | string[] | null {
    const config = this.config as ToggleGroupConfig
    const state = this.state as ToggleGroupState

    if (config.type === 'single') {
      return state.value[0] ?? null
    }
    return state.value
  }

  setValue(value: string | string[]): void {
    const newValue = Array.isArray(value) ? value : [value]
    this.setState({ value: newValue })
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

export const createToggleGroup = createComponentFactory(ToggleGroup)
export default ToggleGroup
