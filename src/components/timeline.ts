/**
 * Timeline Component
 *
 * Vertical timeline for displaying events.
 * @module components/timeline
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface TimelineConfig extends ComponentConfig {
  /** Orientation */
  orientation?: 'vertical' | 'horizontal'
  /** Alternating layout */
  alternating?: boolean
  /** Line position */
  linePosition?: 'start' | 'center' | 'end'
}

export interface TimelineState extends ComponentState {
  activeItem: number | null
}

/**
 * Timeline component for event display
 */
export class Timeline extends BaseComponent {
  private items: HTMLElement[] = []

  protected getDefaultConfig(): TimelineConfig {
    return {
      orientation: 'vertical',
      alternating: false,
      linePosition: 'start',
    }
  }

  protected getInitialState(): TimelineState {
    return {
      activeItem: null,
    }
  }

  protected setupAria(): void {
    const config = this.config as TimelineConfig
    this.element.setAttribute('role', 'list')
    this.element.setAttribute('aria-label', 'Timeline')
    this.element.dataset.orientation = config.orientation
    this.element.dataset.alternating = String(config.alternating)
    this.element.dataset.linePosition = config.linePosition

    this.items = Array.from(this.queryAll('[data-coral-timeline-item]'))
    this.items.forEach((item, index) => {
      item.setAttribute('role', 'listitem')
      item.dataset.index = String(index)
      if (config.alternating) {
        item.dataset.side = index % 2 === 0 ? 'left' : 'right'
      }
    })
  }

  protected bindEvents(): void {
    this.items.forEach((item, index) => {
      const handleClick = () => {
        this.setActiveItem(index)
      }
      this.addEventListener(item, 'click', handleClick)
    })
  }

  protected override render(): void {
    const state = this.state as TimelineState

    this.items.forEach((item, index) => {
      item.dataset.active = String(index === state.activeItem)
    })
  }

  setActiveItem(index: number | null): void {
    this.setState({ activeItem: index })
    this.dispatch('item-select', { index })
  }

  getActiveItem(): number | null {
    return (this.state as TimelineState).activeItem
  }
}

export const createTimeline = createComponentFactory(Timeline)
export default Timeline
