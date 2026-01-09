/**
 * Chip Component
 *
 * Compact element for tags, filters, or input.
 * @module components/chip
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ChipConfig extends ComponentConfig {
  /** Variant */
  variant?: 'filled' | 'outlined' | 'soft'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Removable */
  removable?: boolean
  /** Selectable */
  selectable?: boolean
  /** Disabled */
  disabled?: boolean
  /** Value */
  value?: string
}

export interface ChipState extends ComponentState {
  selected: boolean
  disabled: boolean
}

/**
 * Chip component for tags and filters
 */
export class Chip extends BaseComponent {
  private removeBtn: HTMLElement | null = null

  protected getDefaultConfig(): ChipConfig {
    return {
      variant: 'filled',
      size: 'md',
      removable: false,
      selectable: false,
      disabled: false,
    }
  }

  protected getInitialState(): ChipState {
    const config = this.config as ChipConfig
    return {
      selected: false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    const config = this.config as ChipConfig

    if (config.selectable) {
      this.element.setAttribute('role', 'option')
      this.element.setAttribute('aria-selected', 'false')
    } else {
      this.element.setAttribute('role', 'status')
    }

    this.element.setAttribute('tabindex', config.disabled ? '-1' : '0')
  }

  protected bindEvents(): void {
    const config = this.config as ChipConfig

    // Selection
    if (config.selectable && !config.disabled) {
      const handleClick = () => {
        this.toggleSelection()
      }
      this.addEventListener(this.element, 'click', handleClick)

      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        if (ke.key === 'Enter' || ke.key === ' ') {
          e.preventDefault()
          this.toggleSelection()
        }
      }
      this.addEventListener(this.element, 'keydown', handleKeydown)
    }

    // Remove button
    this.removeBtn = this.query('[data-coral-chip-remove]')
    if (this.removeBtn && config.removable) {
      const handleRemove = (e: Event) => {
        e.stopPropagation()
        this.remove()
      }
      this.addEventListener(this.removeBtn, 'click', handleRemove)
    }
  }

  protected override render(): void {
    const state = this.state as ChipState
    const config = this.config as ChipConfig

    this.element.dataset.variant = config.variant
    this.element.dataset.size = config.size
    this.element.dataset.selected = String(state.selected)

    if (state.disabled) {
      this.element.dataset.disabled = ''
      this.element.setAttribute('tabindex', '-1')
    } else {
      delete this.element.dataset.disabled
      this.element.setAttribute('tabindex', '0')
    }

    if (config.selectable) {
      this.element.setAttribute('aria-selected', String(state.selected))
    }
  }

  toggleSelection(): void {
    const state = this.state as ChipState
    if (state.disabled) {return}

    this.setState({ selected: !state.selected })
    this.dispatch('selection-change', { selected: !state.selected })
  }

  select(): void {
    if (!(this.state as ChipState).selected) {
      this.setState({ selected: true })
      this.dispatch('selection-change', { selected: true })
    }
  }

  deselect(): void {
    if ((this.state as ChipState).selected) {
      this.setState({ selected: false })
      this.dispatch('selection-change', { selected: false })
    }
  }

  remove(): void {
    this.dispatch('remove', { value: (this.config as ChipConfig).value })
    this.element.remove()
    this.destroy()
  }

  isSelected(): boolean {
    return (this.state as ChipState).selected
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
  }
}

export const createChip = createComponentFactory(Chip)
export default Chip
