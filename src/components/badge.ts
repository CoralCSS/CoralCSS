/**
 * Badge Component
 *
 * Status indicator or label badge.
 * @module components/badge
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface BadgeConfig extends ComponentConfig {
  /** Badge variant */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning'
  /** Size */
  size?: 'sm' | 'md' | 'lg'
}

export interface BadgeState extends ComponentState {
  variant: string
  size: string
}

/**
 * Badge component for status indicators
 */
export class Badge extends BaseComponent {
  protected getDefaultConfig(): BadgeConfig {
    return {
      variant: 'default',
      size: 'md',
    }
  }

  protected getInitialState(): BadgeState {
    const config = this.config as BadgeConfig
    return {
      variant: config.variant ?? 'default',
      size: config.size ?? 'md',
    }
  }

  protected setupAria(): void {
    // Badge is typically decorative, but add role if interactive
    const isInteractive = this.element.hasAttribute('data-coral-badge-interactive')
    if (isInteractive) {
      this.element.setAttribute('role', 'status')
    }
  }

  protected bindEvents(): void {
    // Badges are typically non-interactive
  }

  protected override render(): void {
    const state = this.state as BadgeState

    this.element.dataset.variant = state.variant
    this.element.dataset.size = state.size
  }

  setVariant(variant: string): void {
    this.setState({ variant })
  }

  setSize(size: string): void {
    this.setState({ size })
  }

  getVariant(): string {
    return (this.state as BadgeState).variant
  }
}

export const createBadge = createComponentFactory(Badge)
export default Badge
