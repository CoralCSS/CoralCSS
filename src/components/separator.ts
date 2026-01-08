/**
 * Separator Component
 *
 * Visual divider between content sections.
 * @module components/separator
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface SeparatorConfig extends ComponentConfig {
  /** Orientation */
  orientation?: 'horizontal' | 'vertical'
  /** Decorative (no semantic meaning) */
  decorative?: boolean
}

export interface SeparatorState extends ComponentState {
  orientation: 'horizontal' | 'vertical'
}

/**
 * Separator component for visual division
 */
export class Separator extends BaseComponent {
  protected getDefaultConfig(): SeparatorConfig {
    return {
      orientation: 'horizontal',
      decorative: true,
    }
  }

  protected getInitialState(): SeparatorState {
    const config = this.config as SeparatorConfig
    return {
      orientation: config.orientation ?? 'horizontal',
    }
  }

  protected setupAria(): void {
    const config = this.config as SeparatorConfig
    const state = this.state as SeparatorState

    if (config.decorative) {
      this.element.setAttribute('role', 'none')
    } else {
      this.element.setAttribute('role', 'separator')
      this.element.setAttribute('aria-orientation', state.orientation)
    }
  }

  protected bindEvents(): void {
    // No events needed
  }

  protected override render(): void {
    const state = this.state as SeparatorState
    this.element.dataset.orientation = state.orientation
  }

  setOrientation(orientation: 'horizontal' | 'vertical'): void {
    this.setState({ orientation })
    if (!(this.config as SeparatorConfig).decorative) {
      this.element.setAttribute('aria-orientation', orientation)
    }
  }
}

export const createSeparator = createComponentFactory(Separator)
export default Separator
