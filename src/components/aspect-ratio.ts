/**
 * AspectRatio Component
 *
 * Container that maintains a specific aspect ratio.
 * @module components/aspect-ratio
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface AspectRatioConfig extends ComponentConfig {
  /** Aspect ratio (width / height) */
  ratio?: number
}

export interface AspectRatioState extends ComponentState {
  ratio: number
}

/**
 * AspectRatio component for maintaining proportions
 */
export class AspectRatio extends BaseComponent {
  protected getDefaultConfig(): AspectRatioConfig {
    return {
      ratio: 16 / 9,
    }
  }

  protected getInitialState(): AspectRatioState {
    const config = this.config as AspectRatioConfig
    return {
      ratio: config.ratio ?? 16 / 9,
    }
  }

  protected setupAria(): void {
    // No ARIA needed for aspect ratio container
  }

  protected bindEvents(): void {
    // No events needed
  }

  protected override render(): void {
    const state = this.state as AspectRatioState
    this.element.style.position = 'relative'
    this.element.style.width = '100%'
    this.element.style.paddingBottom = `${(1 / state.ratio) * 100}%`

    // Style child to fill container
    const child = this.element.firstElementChild as HTMLElement
    if (child) {
      child.style.position = 'absolute'
      child.style.inset = '0'
      child.style.width = '100%'
      child.style.height = '100%'
    }
  }

  setRatio(ratio: number): void {
    this.setState({ ratio })
  }

  getRatio(): number {
    return (this.state as AspectRatioState).ratio
  }
}

export const createAspectRatio = createComponentFactory(AspectRatio)
export default AspectRatio
