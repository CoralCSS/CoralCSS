/**
 * EmptyState Component
 *
 * Empty state display with actions.
 * @module components/empty-state
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface EmptyStateConfig extends ComponentConfig {
  /** Size variant */
  size?: 'sm' | 'md' | 'lg'
}

export interface EmptyStateState extends ComponentState {
  visible: boolean
}

/**
 * EmptyState component for empty content areas
 */
export class EmptyState extends BaseComponent {
  protected getDefaultConfig(): EmptyStateConfig {
    return {
      size: 'md',
    }
  }

  protected getInitialState(): EmptyStateState {
    return {
      visible: true,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'status')
    this.element.setAttribute('aria-live', 'polite')
  }

  protected bindEvents(): void {
    const config = this.config as EmptyStateConfig
    this.element.dataset.size = config.size

    // Handle action buttons
    const actions = this.queryAll('[data-coral-empty-state-action]')
    actions.forEach((action) => {
      const handleClick = () => {
        const actionName = (action as HTMLElement).dataset.action
        this.dispatch('action', { action: actionName })
      }
      this.addEventListener(action, 'click', handleClick)
    })
  }

  protected override render(): void {
    const state = this.state as EmptyStateState
    this.element.hidden = !state.visible
  }

  show(): void {
    this.setState({ visible: true })
  }

  hide(): void {
    this.setState({ visible: false })
  }

  isVisible(): boolean {
    return (this.state as EmptyStateState).visible
  }
}

export const createEmptyState = createComponentFactory(EmptyState)
export default EmptyState
