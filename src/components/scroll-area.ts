/**
 * ScrollArea Component
 *
 * Custom scrollable area with styled scrollbars.
 * @module components/scroll-area
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ScrollAreaConfig extends ComponentConfig {
  /** Scrollbar visibility */
  scrollbarVisibility?: 'auto' | 'always' | 'hover' | 'scroll'
  /** Scroll direction */
  type?: 'auto' | 'always' | 'scroll' | 'hover'
  /** Scroll orientation */
  orientation?: 'vertical' | 'horizontal' | 'both'
}

export interface ScrollAreaState extends ComponentState {
  hasVerticalScroll: boolean
  hasHorizontalScroll: boolean
  scrollTop: number
  scrollLeft: number
}

/**
 * ScrollArea component for custom scrollbars
 */
export class ScrollArea extends BaseComponent {
  private viewport: HTMLElement | null = null
  private verticalScrollbar: HTMLElement | null = null
  private horizontalScrollbar: HTMLElement | null = null
  private verticalThumb: HTMLElement | null = null
  private horizontalThumb: HTMLElement | null = null
  private isDragging = false
  private dragAxis: 'vertical' | 'horizontal' | null = null
  private dragStartPos = 0
  private dragStartScroll = 0

  protected getDefaultConfig(): ScrollAreaConfig {
    return {
      scrollbarVisibility: 'auto',
      type: 'hover',
      orientation: 'vertical',
    }
  }

  protected getInitialState(): ScrollAreaState {
    return {
      hasVerticalScroll: false,
      hasHorizontalScroll: false,
      scrollTop: 0,
      scrollLeft: 0,
    }
  }

  protected setupAria(): void {
    this.viewport = this.query('[data-coral-scroll-area-viewport]')

    if (this.viewport) {
      this.viewport.setAttribute('tabindex', '0')
      this.viewport.style.overflow = 'scroll'
    }
  }

  protected bindEvents(): void {
    this.verticalScrollbar = this.query('[data-coral-scrollbar][data-orientation="vertical"]')
    this.horizontalScrollbar = this.query('[data-coral-scrollbar][data-orientation="horizontal"]')
    this.verticalThumb = this.query('[data-coral-scrollbar-thumb][data-orientation="vertical"]')
    this.horizontalThumb = this.query('[data-coral-scrollbar-thumb][data-orientation="horizontal"]')

    if (this.viewport) {
      // Scroll event
      const handleScroll = () => {
        this.updateScrollState()
        this.updateThumbs()
      }
      this.addEventListener(this.viewport, 'scroll', handleScroll)

      // Resize observer
      const resizeObserver = new ResizeObserver(() => {
        this.updateScrollState()
        this.updateThumbs()
      })
      resizeObserver.observe(this.viewport)
    }

    // Thumb dragging
    if (this.verticalThumb) {
      this.setupThumbDrag(this.verticalThumb, 'vertical')
    }
    if (this.horizontalThumb) {
      this.setupThumbDrag(this.horizontalThumb, 'horizontal')
    }

    // Track click
    if (this.verticalScrollbar) {
      this.setupTrackClick(this.verticalScrollbar, 'vertical')
    }
    if (this.horizontalScrollbar) {
      this.setupTrackClick(this.horizontalScrollbar, 'horizontal')
    }
  }

  private setupThumbDrag(thumb: HTMLElement, axis: 'vertical' | 'horizontal'): void {
    const handleMouseDown = (e: Event) => {
      const me = e as MouseEvent
      e.preventDefault()
      this.isDragging = true
      this.dragAxis = axis
      this.dragStartPos = axis === 'vertical' ? me.clientY : me.clientX
      this.dragStartScroll = axis === 'vertical'
        ? this.viewport!.scrollTop
        : this.viewport!.scrollLeft

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging || !this.viewport) {return}

      const currentPos = this.dragAxis === 'vertical' ? e.clientY : e.clientX
      const delta = currentPos - this.dragStartPos

      const viewportSize = this.dragAxis === 'vertical'
        ? this.viewport.clientHeight
        : this.viewport.clientWidth
      const scrollSize = this.dragAxis === 'vertical'
        ? this.viewport.scrollHeight
        : this.viewport.scrollWidth

      const scrollRatio = scrollSize / viewportSize
      const scrollDelta = delta * scrollRatio

      if (this.dragAxis === 'vertical') {
        this.viewport.scrollTop = this.dragStartScroll + scrollDelta
      } else {
        this.viewport.scrollLeft = this.dragStartScroll + scrollDelta
      }
    }

    const handleMouseUp = () => {
      this.isDragging = false
      this.dragAxis = null
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    this.addEventListener(thumb, 'mousedown', handleMouseDown)
  }

  private setupTrackClick(track: HTMLElement, axis: 'vertical' | 'horizontal'): void {
    const handleClick = (e: Event) => {
      const me = e as MouseEvent
      if ((me.target as HTMLElement).hasAttribute('data-coral-scrollbar-thumb')) {return}
      if (!this.viewport) {return}

      const trackRect = track.getBoundingClientRect()
      const clickPos = axis === 'vertical'
        ? me.clientY - trackRect.top
        : me.clientX - trackRect.left
      const trackSize = axis === 'vertical' ? trackRect.height : trackRect.width
      const scrollSize = axis === 'vertical'
        ? this.viewport.scrollHeight
        : this.viewport.scrollWidth
      const viewportSize = axis === 'vertical'
        ? this.viewport.clientHeight
        : this.viewport.clientWidth

      const scrollTarget = (clickPos / trackSize) * scrollSize - viewportSize / 2

      if (axis === 'vertical') {
        this.viewport.scrollTo({ top: scrollTarget, behavior: 'smooth' })
      } else {
        this.viewport.scrollTo({ left: scrollTarget, behavior: 'smooth' })
      }
    }

    this.addEventListener(track, 'click', handleClick)
  }

  private updateScrollState(): void {
    if (!this.viewport) {return}

    const hasVerticalScroll = this.viewport.scrollHeight > this.viewport.clientHeight
    const hasHorizontalScroll = this.viewport.scrollWidth > this.viewport.clientWidth

    this.setState({
      hasVerticalScroll,
      hasHorizontalScroll,
      scrollTop: this.viewport.scrollTop,
      scrollLeft: this.viewport.scrollLeft,
    })
  }

  private updateThumbs(): void {
    if (!this.viewport) {return}

    if (this.verticalThumb && (this.state as ScrollAreaState).hasVerticalScroll) {
      const ratio = this.viewport.clientHeight / this.viewport.scrollHeight
      const thumbHeight = Math.max(ratio * 100, 10)
      const thumbTop = (this.viewport.scrollTop / (this.viewport.scrollHeight - this.viewport.clientHeight)) * (100 - thumbHeight)

      this.verticalThumb.style.height = `${thumbHeight}%`
      this.verticalThumb.style.top = `${thumbTop}%`
    }

    if (this.horizontalThumb && (this.state as ScrollAreaState).hasHorizontalScroll) {
      const ratio = this.viewport.clientWidth / this.viewport.scrollWidth
      const thumbWidth = Math.max(ratio * 100, 10)
      const thumbLeft = (this.viewport.scrollLeft / (this.viewport.scrollWidth - this.viewport.clientWidth)) * (100 - thumbWidth)

      this.horizontalThumb.style.width = `${thumbWidth}%`
      this.horizontalThumb.style.left = `${thumbLeft}%`
    }
  }

  protected override render(): void {
    const state = this.state as ScrollAreaState

    if (this.verticalScrollbar) {
      this.verticalScrollbar.dataset.state = state.hasVerticalScroll ? 'visible' : 'hidden'
    }
    if (this.horizontalScrollbar) {
      this.horizontalScrollbar.dataset.state = state.hasHorizontalScroll ? 'visible' : 'hidden'
    }
  }

  scrollTo(options: ScrollToOptions): void {
    this.viewport?.scrollTo(options)
  }

  scrollToTop(): void {
    this.scrollTo({ top: 0, behavior: 'smooth' })
  }

  scrollToBottom(): void {
    if (this.viewport) {
      this.scrollTo({ top: this.viewport.scrollHeight, behavior: 'smooth' })
    }
  }
}

export const createScrollArea = createComponentFactory(ScrollArea)
export default ScrollArea
