/**
 * Stat Component
 *
 * Statistics display with trend indicators.
 * @module components/stat
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface StatConfig extends ComponentConfig {
  /** Format number */
  formatNumber?: boolean
  /** Prefix */
  prefix?: string
  /** Suffix */
  suffix?: string
  /** Decimal places */
  decimals?: number
  /** Animate on mount */
  animate?: boolean
  /** Animation duration (ms) */
  animationDuration?: number
}

export interface StatState extends ComponentState {
  value: number
  previousValue: number | null
  trend: 'up' | 'down' | 'neutral'
  trendValue: number | null
}

/**
 * Stat component for statistics display
 */
export class Stat extends BaseComponent {
  private valueEl: HTMLElement | null = null
  private trendEl: HTMLElement | null = null
  private animationFrame: number | null = null

  protected getDefaultConfig(): StatConfig {
    return {
      formatNumber: true,
      decimals: 0,
      animate: false,
      animationDuration: 1000,
    }
  }

  protected getInitialState(): StatState {
    return {
      value: 0,
      previousValue: null,
      trend: 'neutral',
      trendValue: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'status')
    this.element.setAttribute('aria-live', 'polite')
  }

  protected bindEvents(): void {
    this.valueEl = this.query('[data-coral-stat-value]')
    this.trendEl = this.query('[data-coral-stat-trend]')

    // Parse initial value
    if (this.valueEl) {
      const text = this.valueEl.textContent?.replace(/[^0-9.-]/g, '') || '0'
      const value = parseFloat(text)
      this.setState({ value })
    }

    // Parse trend
    if (this.trendEl) {
      const text = this.trendEl.textContent?.replace(/[^0-9.-]/g, '') || '0'
      const trendValue = parseFloat(text)
      const trend = trendValue > 0 ? 'up' : trendValue < 0 ? 'down' : 'neutral'
      this.setState({ trendValue, trend })
    }

    this.render()
  }

  protected override render(): void {
    const state = this.state as StatState
    const config = this.config as StatConfig

    if (this.valueEl) {
      let displayValue = state.value

      if (config.formatNumber) {
        const formatted = new Intl.NumberFormat(undefined, {
          minimumFractionDigits: config.decimals,
          maximumFractionDigits: config.decimals,
        }).format(displayValue)

        this.valueEl.textContent = `${config.prefix || ''}${formatted}${config.suffix || ''}`
      }
    }

    if (this.trendEl) {
      this.trendEl.dataset.trend = state.trend
    }

    this.element.dataset.trend = state.trend
  }

  setValue(value: number, animate = false): void {
    const config = this.config as StatConfig
    const state = this.state as StatState
    const prevValue = state.value

    if (animate || config.animate) {
      this.animateValue(prevValue, value)
    } else {
      this.setState({
        value,
        previousValue: prevValue,
        trend: value > prevValue ? 'up' : value < prevValue ? 'down' : 'neutral',
      })
    }

    this.dispatch('change', { value, previousValue: prevValue })
  }

  private animateValue(from: number, to: number): void {
    const config = this.config as StatConfig
    const duration = config.animationDuration!
    const startTime = performance.now()

    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentValue = from + (to - from) * eased

      this.setState({
        value: currentValue,
        previousValue: from,
        trend: to > from ? 'up' : to < from ? 'down' : 'neutral',
      })

      if (progress < 1) {
        this.animationFrame = requestAnimationFrame(animate)
      } else {
        this.setState({ value: to })
      }
    }

    this.animationFrame = requestAnimationFrame(animate)
  }

  getValue(): number {
    return (this.state as StatState).value
  }

  getTrend(): 'up' | 'down' | 'neutral' {
    return (this.state as StatState).trend
  }

  override destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    super.destroy()
  }
}

export const createStat = createComponentFactory(Stat)
export default Stat
