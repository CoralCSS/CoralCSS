/**
 * Marquee Component
 *
 * Scrolling/sliding content animation.
 * @module components/marquee
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface MarqueeConfig extends ComponentConfig {
  /** Direction */
  direction?: 'left' | 'right' | 'up' | 'down'
  /** Speed (pixels per second) */
  speed?: number
  /** Pause on hover */
  pauseOnHover?: boolean
  /** Gap between items */
  gap?: number
}

export interface MarqueeState extends ComponentState {
  isPaused: boolean
  position: number
}

/**
 * Marquee component for scrolling content
 */
export class Marquee extends BaseComponent {
  private content: HTMLElement | null = null
  private animationFrame: number | null = null
  private lastTimestamp = 0

  protected getDefaultConfig(): MarqueeConfig {
    return {
      direction: 'left',
      speed: 50,
      pauseOnHover: true,
      gap: 40,
    }
  }

  protected getInitialState(): MarqueeState {
    return {
      isPaused: false,
      position: 0,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'marquee')
    this.element.setAttribute('aria-live', 'off')
  }

  protected bindEvents(): void {
    const config = this.config as MarqueeConfig

    this.content = this.query('[data-coral-marquee-content]') || this.element.firstElementChild as HTMLElement

    if (!this.content) {return}

    // Clone content for seamless loop
    const clone = this.content.cloneNode(true) as HTMLElement
    clone.setAttribute('aria-hidden', 'true')
    this.element.appendChild(clone)

    // Apply gap
    this.content.style.paddingRight = `${config.gap}px`
    clone.style.paddingRight = `${config.gap}px`

    // Pause on hover
    if (config.pauseOnHover) {
      const handleMouseEnter = () => {
        this.pause()
      }
      this.addEventListener(this.element, 'mouseenter', handleMouseEnter)

      const handleMouseLeave = () => {
        this.resume()
      }
      this.addEventListener(this.element, 'mouseleave', handleMouseLeave)
    }

    // Start animation
    this.start()
  }

  private start(): void {
    this.lastTimestamp = performance.now()
    this.animate()
  }

  private animate(): void {
    const config = this.config as MarqueeConfig
    const state = this.state as MarqueeState

    if (state.isPaused || !this.content) {
      this.animationFrame = requestAnimationFrame(() => this.animate())
      return
    }

    const now = performance.now()
    const delta = (now - this.lastTimestamp) / 1000
    this.lastTimestamp = now

    const contentWidth = this.content.offsetWidth
    const isHorizontal = config.direction === 'left' || config.direction === 'right'
    const isReverse = config.direction === 'right' || config.direction === 'down'

    let newPosition = state.position + config.speed! * delta * (isReverse ? -1 : 1)

    // Reset position for seamless loop
    if (isHorizontal) {
      if (newPosition >= contentWidth) {
        newPosition = 0
      } else if (newPosition <= -contentWidth) {
        newPosition = 0
      }
    }

    this.setState({ position: newPosition })

    // Apply transform
    if (isHorizontal) {
      this.element.style.transform = `translateX(${-newPosition}px)`
    } else {
      this.element.style.transform = `translateY(${-newPosition}px)`
    }

    this.animationFrame = requestAnimationFrame(() => this.animate())
  }

  protected override render(): void {
    const config = this.config as MarqueeConfig

    this.element.dataset.direction = config.direction
    this.element.dataset.paused = String((this.state as MarqueeState).isPaused)
  }

  pause(): void {
    this.setState({ isPaused: true })
    this.dispatch('pause')
  }

  resume(): void {
    this.setState({ isPaused: false })
    this.lastTimestamp = performance.now()
    this.dispatch('resume')
  }

  setSpeed(speed: number): void {
    (this.config as MarqueeConfig).speed = speed
  }

  override destroy(): void {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame)
    }
    super.destroy()
  }
}

export const createMarquee = createComponentFactory(Marquee)
export default Marquee
