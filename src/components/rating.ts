/**
 * Rating Component
 *
 * Star rating input with half-star support.
 * @module components/rating
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface RatingConfig extends ComponentConfig {
  /** Maximum rating value */
  max?: number
  /** Default value */
  defaultValue?: number
  /** Allow half stars */
  allowHalf?: boolean
  /** Read-only mode */
  readonly?: boolean
  /** Disabled state */
  disabled?: boolean
  /** Size */
  size?: 'sm' | 'md' | 'lg'
}

export interface RatingState extends ComponentState {
  value: number
  hoverValue: number | null
  disabled: boolean
}

/**
 * Rating component for star ratings
 */
export class Rating extends BaseComponent {
  private stars: HTMLElement[] = []

  protected getDefaultConfig(): RatingConfig {
    return {
      max: 5,
      defaultValue: 0,
      allowHalf: false,
      readonly: false,
      disabled: false,
      size: 'md',
    }
  }

  protected getInitialState(): RatingState {
    const config = this.config as RatingConfig
    return {
      value: config.defaultValue ?? 0,
      hoverValue: null,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    const config = this.config as RatingConfig
    this.element.setAttribute('role', 'slider')
    this.element.setAttribute('aria-valuemin', '0')
    this.element.setAttribute('aria-valuemax', String(config.max))
    this.element.setAttribute('aria-valuenow', String(this.state.value))
    this.element.setAttribute('aria-label', 'Rating')
    this.element.setAttribute('tabindex', config.disabled || config.readonly ? '-1' : '0')
  }

  protected bindEvents(): void {
    const config = this.config as RatingConfig

    // Create stars
    this.createStars()

    if (config.readonly || config.disabled) return

    // Keyboard
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      const state = this.state as RatingState
      const step = config.allowHalf ? 0.5 : 1

      if (ke.key === 'ArrowRight' || ke.key === 'ArrowUp') {
        e.preventDefault()
        this.setValue(Math.min(config.max!, state.value + step))
      } else if (ke.key === 'ArrowLeft' || ke.key === 'ArrowDown') {
        e.preventDefault()
        this.setValue(Math.max(0, state.value - step))
      } else if (ke.key === 'Home') {
        e.preventDefault()
        this.setValue(0)
      } else if (ke.key === 'End') {
        e.preventDefault()
        this.setValue(config.max!)
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)

    // Mouse leave
    const handleMouseLeave = () => {
      this.setState({ hoverValue: null })
    }
    this.addEventListener(this.element, 'mouseleave', handleMouseLeave)
  }

  private createStars(): void {
    const config = this.config as RatingConfig
    this.element.innerHTML = ''
    this.stars = []

    for (let i = 1; i <= config.max!; i++) {
      const star = document.createElement('span')
      star.className = 'rating-star'
      star.dataset.value = String(i)

      if (!config.readonly && !config.disabled) {
        star.addEventListener('click', () => this.setValue(i))
        star.addEventListener('mouseenter', () => {
          this.setState({ hoverValue: i })
        })

        if (config.allowHalf) {
          star.addEventListener('mousemove', (e: MouseEvent) => {
            const rect = star.getBoundingClientRect()
            const isHalf = e.clientX - rect.left < rect.width / 2
            this.setState({ hoverValue: isHalf ? i - 0.5 : i })
          })
        }
      }

      this.stars.push(star)
      this.element.appendChild(star)
    }

    this.render()
  }

  protected override render(): void {
    const state = this.state as RatingState
    const config = this.config as RatingConfig
    const displayValue = state.hoverValue ?? state.value

    this.element.setAttribute('aria-valuenow', String(state.value))
    this.element.dataset.size = config.size

    this.stars.forEach((star, index) => {
      const starValue = index + 1
      star.dataset.filled = String(displayValue >= starValue)
      star.dataset.half = String(config.allowHalf && displayValue === starValue - 0.5)
      star.dataset.active = String(state.hoverValue !== null)
    })
  }

  setValue(value: number): void {
    const config = this.config as RatingConfig
    const clampedValue = Math.max(0, Math.min(config.max!, value))
    this.setState({ value: clampedValue })
    this.dispatch('change', { value: clampedValue })
  }

  getValue(): number {
    return (this.state as RatingState).value
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
    const config = this.config as RatingConfig
    this.element.setAttribute('tabindex', disabled || config.readonly ? '-1' : '0')
  }
}

export const createRating = createComponentFactory(Rating)
export default Rating
