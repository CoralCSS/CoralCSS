/**
 * Slider Component
 *
 * Accessible range slider component.
 * @module components/slider
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Slider configuration
 */
export interface SliderConfig extends ComponentConfig {
  /**
   * Minimum value
   * @default 0
   */
  min?: number

  /**
   * Maximum value
   * @default 100
   */
  max?: number

  /**
   * Step increment
   * @default 1
   */
  step?: number

  /**
   * Default/initial value
   * @default 0
   */
  defaultValue?: number | [number, number]

  /**
   * Enable range mode (two thumbs)
   * @default false
   */
  range?: boolean

  /**
   * Orientation
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'

  /**
   * Disable the slider
   * @default false
   */
  disabled?: boolean

  /**
   * Show tick marks
   * @default false
   */
  showTicks?: boolean

  /**
   * Show value tooltip
   * @default false
   */
  showTooltip?: boolean

  /**
   * Custom value formatter
   */
  formatValue?: (value: number) => string

  /**
   * Track element selector
   * @default '[data-coral-slider-track]'
   */
  trackSelector?: string

  /**
   * Thumb element selector
   * @default '[data-coral-slider-thumb]'
   */
  thumbSelector?: string

  /**
   * Fill element selector
   * @default '[data-coral-slider-fill]'
   */
  fillSelector?: string
}

/**
 * Slider state
 */
export interface SliderState extends ComponentState {
  value: number | [number, number]
  isDragging: boolean
  activeThumb: 'start' | 'end' | null
}

/**
 * Slider component
 *
 * @example
 * ```html
 * <!-- Single value slider -->
 * <div data-coral-slider data-min="0" data-max="100">
 *   <div data-coral-slider-track>
 *     <div data-coral-slider-fill></div>
 *     <div data-coral-slider-thumb></div>
 *   </div>
 * </div>
 *
 * <!-- Range slider -->
 * <div data-coral-slider data-range="true">
 *   <div data-coral-slider-track>
 *     <div data-coral-slider-fill></div>
 *     <div data-coral-slider-thumb data-thumb="start"></div>
 *     <div data-coral-slider-thumb data-thumb="end"></div>
 *   </div>
 * </div>
 * ```
 */
export class Slider extends BaseComponent {
  protected declare config: SliderConfig
  protected declare state: SliderState

  private track: HTMLElement | null = null
  private fill: HTMLElement | null = null
  private thumbs: HTMLElement[] = []

  protected getDefaultConfig(): SliderConfig {
    return {
      min: 0,
      max: 100,
      step: 1,
      defaultValue: 0,
      range: false,
      orientation: 'horizontal',
      disabled: false,
      showTicks: false,
      showTooltip: false,
      trackSelector: '[data-coral-slider-track]',
      thumbSelector: '[data-coral-slider-thumb]',
      fillSelector: '[data-coral-slider-fill]',
    }
  }

  protected getInitialState(): SliderState {
    const { defaultValue, range, min } = this.config
    let value: number | [number, number]

    if (range) {
      value = Array.isArray(defaultValue)
        ? defaultValue
        : [min ?? 0, defaultValue ?? min ?? 0]
    } else {
      value = Array.isArray(defaultValue)
        ? defaultValue[0]
        : defaultValue ?? min ?? 0
    }

    return {
      value,
      isDragging: false,
      activeThumb: null,
    }
  }

  protected setupAria(): void {
    this.track = this.query(this.config.trackSelector!)
    this.fill = this.query(this.config.fillSelector!)
    this.thumbs = Array.from(this.queryAll(this.config.thumbSelector!))

    // Set up slider ARIA
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Slider')

    if (this.config.orientation === 'vertical') {
      this.element.setAttribute('aria-orientation', 'vertical')
    }

    // Set up thumb ARIA
    this.thumbs.forEach((thumb, index) => {
      thumb.setAttribute('role', 'slider')
      thumb.setAttribute('tabindex', this.config.disabled ? '-1' : '0')
      thumb.setAttribute('aria-valuemin', String(this.config.min))
      thumb.setAttribute('aria-valuemax', String(this.config.max))

      const value = this.getThumbValue(index)
      thumb.setAttribute('aria-valuenow', String(value))
      thumb.setAttribute('aria-valuetext', this.formatValue(value))

      if (this.config.disabled) {
        thumb.setAttribute('aria-disabled', 'true')
      }

      // Label for range sliders
      if (this.config.range) {
        thumb.setAttribute('aria-label', index === 0 ? 'Minimum' : 'Maximum')
      }
    })

    // Initial render
    this.updateVisuals()
  }

  protected bindEvents(): void {
    // Thumb interactions
    this.thumbs.forEach((thumb, index) => {
      // Mouse events
      this.addEventListener(thumb, 'mousedown', (e: Event) => {
        if (!this.config.disabled) {
          this.startDrag(e as MouseEvent, index)
        }
      })

      // Touch events
      this.addEventListener(thumb, 'touchstart', (e: Event) => {
        if (!this.config.disabled) {
          this.startDrag(e as TouchEvent, index)
        }
      })

      // Keyboard events
      this.addEventListener(thumb, 'keydown', (e: Event) => {
        if (!this.config.disabled) {
          this.handleKeyDown(e as KeyboardEvent, index)
        }
      })
    })

    // Track click
    if (this.track) {
      this.addEventListener(this.track, 'click', (e: Event) => {
        if (!this.config.disabled) {
          this.handleTrackClick(e as MouseEvent)
        }
      })
    }
  }

  private startDrag(e: MouseEvent | TouchEvent, thumbIndex: number): void {
    e.preventDefault()

    const thumbType = this.config.range
      ? (thumbIndex === 0 ? 'start' : 'end')
      : 'end'

    this.setState({
      isDragging: true,
      activeThumb: thumbType,
    })

    this.thumbs[thumbIndex]?.setAttribute('data-dragging', '')

    // Add document-level listeners
    const handleMove = (e: MouseEvent | TouchEvent) => this.handleDrag(e, thumbIndex)
    const handleEnd = () => {
      this.setState({ isDragging: false, activeThumb: null })
      this.thumbs[thumbIndex]?.removeAttribute('data-dragging')
      document.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseup', handleEnd)
      document.removeEventListener('touchmove', handleMove)
      document.removeEventListener('touchend', handleEnd)
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleEnd)
  }

  private handleDrag(e: MouseEvent | TouchEvent, thumbIndex: number): void {
    const value = this.getValueFromEvent(e)
    this.setThumbValue(thumbIndex, value)
  }

  private handleTrackClick(e: MouseEvent): void {
    const value = this.getValueFromEvent(e)

    if (this.config.range && Array.isArray(this.state.value)) {
      // Find closest thumb
      const [start, end] = this.state.value
      const distToStart = Math.abs(value - start)
      const distToEnd = Math.abs(value - end)
      const thumbIndex = distToStart < distToEnd ? 0 : 1
      this.setThumbValue(thumbIndex, value)
    } else {
      this.setThumbValue(0, value)
    }
  }

  private handleKeyDown(e: KeyboardEvent, thumbIndex: number): void {
    const { min, max, step } = this.config
    const currentValue = this.getThumbValue(thumbIndex)
    let newValue = currentValue

    const isVertical = this.config.orientation === 'vertical'
    const bigStep = (step ?? 1) * 10

    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowUp':
        e.preventDefault()
        newValue = isVertical
          ? (e.key === 'ArrowUp' ? currentValue + (step ?? 1) : currentValue)
          : (e.key === 'ArrowRight' ? currentValue + (step ?? 1) : currentValue)
        if (e.key === 'ArrowRight' && !isVertical) newValue = currentValue + (step ?? 1)
        if (e.key === 'ArrowUp' && isVertical) newValue = currentValue + (step ?? 1)
        break

      case 'ArrowLeft':
      case 'ArrowDown':
        e.preventDefault()
        if (e.key === 'ArrowLeft' && !isVertical) newValue = currentValue - (step ?? 1)
        if (e.key === 'ArrowDown' && isVertical) newValue = currentValue - (step ?? 1)
        break

      case 'PageUp':
        e.preventDefault()
        newValue = currentValue + bigStep
        break

      case 'PageDown':
        e.preventDefault()
        newValue = currentValue - bigStep
        break

      case 'Home':
        e.preventDefault()
        newValue = min ?? 0
        break

      case 'End':
        e.preventDefault()
        newValue = max ?? 100
        break

      default:
        return
    }

    this.setThumbValue(thumbIndex, newValue)
  }

  private getValueFromEvent(e: MouseEvent | TouchEvent): number {
    if (!this.track) return this.config.min ?? 0

    const rect = this.track.getBoundingClientRect()
    const isVertical = this.config.orientation === 'vertical'

    let clientPos: number
    if ('touches' in e && e.touches[0]) {
      clientPos = isVertical ? e.touches[0].clientY : e.touches[0].clientX
    } else if ('clientX' in e) {
      clientPos = isVertical ? e.clientY : e.clientX
    } else {
      return this.config.min ?? 0
    }

    let percent: number
    if (isVertical) {
      percent = 1 - (clientPos - rect.top) / rect.height
    } else {
      percent = (clientPos - rect.left) / rect.width
    }

    percent = Math.max(0, Math.min(1, percent))

    const { min, max, step } = this.config
    const minVal = min ?? 0
    const maxVal = max ?? 100
    const stepVal = step ?? 1

    let value = minVal + percent * (maxVal - minVal)
    value = Math.round(value / stepVal) * stepVal
    value = Math.max(minVal, Math.min(maxVal, value))

    return value
  }

  private getThumbValue(thumbIndex: number): number {
    const { value } = this.state
    if (Array.isArray(value)) {
      return value[thumbIndex] ?? 0
    }
    return value
  }

  private setThumbValue(thumbIndex: number, newValue: number): void {
    const { min, max } = this.config
    const minVal = min ?? 0
    const maxVal = max ?? 100

    // Clamp value
    newValue = Math.max(minVal, Math.min(maxVal, newValue))

    let newStateValue: number | [number, number]

    if (this.config.range && Array.isArray(this.state.value)) {
      const [start, end] = this.state.value
      if (thumbIndex === 0) {
        // Start thumb can't exceed end thumb
        newStateValue = [Math.min(newValue, end), end]
      } else {
        // End thumb can't go below start thumb
        newStateValue = [start, Math.max(newValue, start)]
      }
    } else {
      newStateValue = newValue
    }

    this.setState({ value: newStateValue })

    // Update ARIA
    const thumb = this.thumbs[thumbIndex]
    if (thumb) {
      const val = Array.isArray(newStateValue) ? (newStateValue[thumbIndex] ?? 0) : newStateValue
      thumb.setAttribute('aria-valuenow', String(val))
      thumb.setAttribute('aria-valuetext', this.formatValue(val))
    }

    // Update visuals
    this.updateVisuals()

    // Dispatch change event
    this.dispatch('change', { value: newStateValue })
  }

  private updateVisuals(): void {
    if (!this.track) return

    const { min, max, orientation } = this.config
    const minVal = min ?? 0
    const maxVal = max ?? 100
    const range = maxVal - minVal
    const isVertical = orientation === 'vertical'

    if (this.config.range && Array.isArray(this.state.value)) {
      const [start, end] = this.state.value
      const startPercent = ((start - minVal) / range) * 100
      const endPercent = ((end - minVal) / range) * 100

      // Position thumbs
      if (this.thumbs[0]) {
        if (isVertical) {
          this.thumbs[0].style.bottom = `${startPercent}%`
          this.thumbs[0].style.left = '50%'
        } else {
          this.thumbs[0].style.left = `${startPercent}%`
          this.thumbs[0].style.top = '50%'
        }
      }
      if (this.thumbs[1]) {
        if (isVertical) {
          this.thumbs[1].style.bottom = `${endPercent}%`
          this.thumbs[1].style.left = '50%'
        } else {
          this.thumbs[1].style.left = `${endPercent}%`
          this.thumbs[1].style.top = '50%'
        }
      }

      // Update fill
      if (this.fill) {
        if (isVertical) {
          this.fill.style.bottom = `${startPercent}%`
          this.fill.style.height = `${endPercent - startPercent}%`
        } else {
          this.fill.style.left = `${startPercent}%`
          this.fill.style.width = `${endPercent - startPercent}%`
        }
      }
    } else {
      const value = Array.isArray(this.state.value) ? this.state.value[0] : this.state.value
      const percent = ((value - minVal) / range) * 100

      // Position thumb
      if (this.thumbs[0]) {
        if (isVertical) {
          this.thumbs[0].style.bottom = `${percent}%`
          this.thumbs[0].style.left = '50%'
        } else {
          this.thumbs[0].style.left = `${percent}%`
          this.thumbs[0].style.top = '50%'
        }
      }

      // Update fill
      if (this.fill) {
        if (isVertical) {
          this.fill.style.height = `${percent}%`
        } else {
          this.fill.style.width = `${percent}%`
        }
      }
    }
  }

  private formatValue(value: number): string {
    if (this.config.formatValue) {
      return this.config.formatValue(value)
    }
    return String(value)
  }

  /**
   * Get current value
   */
  getValue(): number | [number, number] {
    return this.state.value
  }

  /**
   * Set value programmatically
   */
  setValue(value: number | [number, number]): void {
    if (this.config.range && !Array.isArray(value)) {
      value = [this.config.min ?? 0, value]
    } else if (!this.config.range && Array.isArray(value)) {
      value = value[1]
    }

    this.setState({ value })
    this.updateVisuals()

    // Update ARIA
    this.thumbs.forEach((thumb, index) => {
      const val = Array.isArray(this.state.value) ? (this.state.value[index] ?? 0) : this.state.value
      thumb.setAttribute('aria-valuenow', String(val))
      thumb.setAttribute('aria-valuetext', this.formatValue(val))
    })
  }

  /**
   * Enable the slider
   */
  enable(): void {
    this.config.disabled = false
    this.element.removeAttribute('data-disabled')
    this.thumbs.forEach((thumb) => {
      thumb.setAttribute('tabindex', '0')
      thumb.removeAttribute('aria-disabled')
    })
  }

  /**
   * Disable the slider
   */
  disable(): void {
    this.config.disabled = true
    this.element.setAttribute('data-disabled', '')
    this.thumbs.forEach((thumb) => {
      thumb.setAttribute('tabindex', '-1')
      thumb.setAttribute('aria-disabled', 'true')
    })
  }
}

/**
 * Create a slider instance
 */
export const createSlider = createComponentFactory(Slider)

export default Slider
