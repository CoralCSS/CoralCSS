/**
 * Spinner Component
 *
 * Loading spinner indicator.
 * @module components/spinner
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface SpinnerConfig extends ComponentConfig {
  /** Size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  /** Variant */
  variant?: 'default' | 'primary' | 'secondary'
  /** Loading label */
  label?: string
  /** Show as overlay */
  overlay?: boolean
}

export interface SpinnerState extends ComponentState {
  spinning: boolean
}

/**
 * Spinner component for loading states
 */
export class Spinner extends BaseComponent {
  protected getDefaultConfig(): SpinnerConfig {
    return {
      size: 'md',
      variant: 'primary',
      label: 'Loading...',
      overlay: false,
    }
  }

  protected getInitialState(): SpinnerState {
    return {
      spinning: true,
    }
  }

  protected setupAria(): void {
    const config = this.config as SpinnerConfig
    this.element.setAttribute('role', 'status')
    this.element.setAttribute('aria-live', 'polite')
    this.element.setAttribute('aria-label', config.label!)
  }

  protected bindEvents(): void {
    // No events needed
    this.render()
  }

  protected override render(): void {
    const state = this.state as SpinnerState
    const config = this.config as SpinnerConfig

    this.element.dataset.size = config.size
    this.element.dataset.variant = config.variant
    this.element.dataset.overlay = String(config.overlay)
    this.element.dataset.spinning = String(state.spinning)

    if (state.spinning) {
      this.element.removeAttribute('hidden')
    } else {
      this.element.setAttribute('hidden', '')
    }
  }

  start(): void {
    this.setState({ spinning: true })
  }

  stop(): void {
    this.setState({ spinning: false })
  }

  isSpinning(): boolean {
    return (this.state as SpinnerState).spinning
  }
}

export const createSpinner = createComponentFactory(Spinner)
export default Spinner
