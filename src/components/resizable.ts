/**
 * Resizable Component
 *
 * Panels with resizable dividers.
 * @module components/resizable
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ResizableConfig extends ComponentConfig {
  /** Direction of resize */
  direction?: 'horizontal' | 'vertical'
  /** Minimum panel size (pixels or percent) */
  minSize?: number
  /** Maximum panel size (pixels or percent) */
  maxSize?: number
  /** Default sizes (array of percentages) */
  defaultSizes?: number[]
  /** Keyboard step size (percent) */
  keyboardStep?: number
}

export interface ResizableState extends ComponentState {
  sizes: number[]
  isDragging: boolean
  activeHandle: number
}

/**
 * Resizable component for split panels
 */
export class Resizable extends BaseComponent {
  private panels: HTMLElement[] = []
  private handles: HTMLElement[] = []
  private startPos = 0
  private startSizes: number[] = []

  protected getDefaultConfig(): ResizableConfig {
    return {
      direction: 'horizontal',
      minSize: 10,
      maxSize: 90,
      keyboardStep: 5,
    }
  }

  protected getInitialState(): ResizableState {
    const config = this.config as ResizableConfig
    const panels = Array.from(this.element.querySelectorAll('[data-coral-resizable-panel]'))
    const defaultSizes = config.defaultSizes || panels.map(() => 100 / panels.length)

    return {
      sizes: defaultSizes,
      isDragging: false,
      activeHandle: -1,
    }
  }

  protected setupAria(): void {
    this.panels = Array.from(this.queryAll('[data-coral-resizable-panel]'))
    this.handles = Array.from(this.queryAll('[data-coral-resizable-handle]'))

    const config = this.config as ResizableConfig

    this.element.setAttribute('role', 'group')
    this.element.dataset.direction = config.direction

    this.panels.forEach((panel, index) => {
      panel.setAttribute('role', 'region')
      panel.setAttribute('aria-label', `Panel ${index + 1}`)
    })

    this.handles.forEach((handle, index) => {
      handle.setAttribute('role', 'separator')
      handle.setAttribute('aria-orientation', config.direction === 'horizontal' ? 'vertical' : 'horizontal')
      handle.setAttribute('aria-valuenow', String((this.state as ResizableState).sizes[index] || 50))
      handle.setAttribute('aria-valuemin', String(config.minSize))
      handle.setAttribute('aria-valuemax', String(config.maxSize))
      handle.setAttribute('tabindex', '0')
      handle.setAttribute('aria-label', `Resize handle between panel ${index + 1} and ${index + 2}`)
    })
  }

  protected bindEvents(): void {
    this.handles.forEach((handle, index) => {
      // Mouse drag
      const handleMouseDown = (e: Event) => {
        e.preventDefault()
        this.startDrag(index, (e as MouseEvent).clientX, (e as MouseEvent).clientY)
      }
      this.addEventListener(handle, 'mousedown', handleMouseDown)

      // Touch drag
      const handleTouchStart = (e: Event) => {
        const te = e as TouchEvent
        const touch = te.touches[0]
        if (touch) {
          this.startDrag(index, touch.clientX, touch.clientY)
        }
      }
      this.addEventListener(handle, 'touchstart', handleTouchStart)

      // Keyboard
      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        const config = this.config as ResizableConfig
        const step = config.keyboardStep!
        const state = this.state as ResizableState

        let delta = 0

        if (config.direction === 'horizontal') {
          if (ke.key === 'ArrowLeft') delta = -step
          if (ke.key === 'ArrowRight') delta = step
        } else {
          if (ke.key === 'ArrowUp') delta = -step
          if (ke.key === 'ArrowDown') delta = step
        }

        if (ke.key === 'Home') {
          delta = config.minSize! - state.sizes[index]!
        }
        if (ke.key === 'End') {
          delta = config.maxSize! - state.sizes[index]!
        }

        if (delta !== 0) {
          e.preventDefault()
          this.resize(index, delta)
        }
      }
      this.addEventListener(handle, 'keydown', handleKeydown)

      // Double click to reset
      const handleDoubleClick = () => {
        this.resetSizes()
      }
      this.addEventListener(handle, 'dblclick', handleDoubleClick)
    })

    // Global mouse/touch move and up
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const state = this.state as ResizableState
      if (!state.isDragging) return

      const config = this.config as ResizableConfig
      let currentPos: number

      if (e instanceof MouseEvent) {
        currentPos = config.direction === 'horizontal' ? e.clientX : e.clientY
      } else {
        const touch = e.touches[0]
        if (!touch) return
        currentPos = config.direction === 'horizontal' ? touch.clientX : touch.clientY
      }

      const containerRect = this.element.getBoundingClientRect()
      const containerSize = config.direction === 'horizontal' ? containerRect.width : containerRect.height
      const delta = ((currentPos - this.startPos) / containerSize) * 100

      this.applyDelta(state.activeHandle, delta)
    }

    const handleUp = () => {
      const state = this.state as ResizableState
      if (state.isDragging) {
        this.endDrag()
      }
    }

    document.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('touchend', handleUp)

    // Apply initial sizes
    this.applySizes()
  }

  private startDrag(handleIndex: number, x: number, y: number): void {
    const config = this.config as ResizableConfig
    this.startPos = config.direction === 'horizontal' ? x : y
    this.startSizes = [...(this.state as ResizableState).sizes]

    this.setState({
      isDragging: true,
      activeHandle: handleIndex,
    })

    this.handles[handleIndex]?.setAttribute('data-dragging', '')
    document.body.style.cursor = config.direction === 'horizontal' ? 'col-resize' : 'row-resize'
    document.body.style.userSelect = 'none'
  }

  private applyDelta(handleIndex: number, delta: number): void {
    const config = this.config as ResizableConfig
    const newSizes = [...this.startSizes]

    // Adjust panels on either side of handle
    const leftSize = (this.startSizes[handleIndex] ?? 50) + delta
    const rightSize = (this.startSizes[handleIndex + 1] ?? 50) - delta

    // Apply constraints
    const minSize = config.minSize!
    const maxSize = config.maxSize!

    if (leftSize >= minSize && leftSize <= maxSize && rightSize >= minSize && rightSize <= maxSize) {
      newSizes[handleIndex] = leftSize
      newSizes[handleIndex + 1] = rightSize

      this.setState({ sizes: newSizes })
      this.applySizes()
    }
  }

  private endDrag(): void {
    const state = this.state as ResizableState

    this.handles[state.activeHandle]?.removeAttribute('data-dragging')
    document.body.style.cursor = ''
    document.body.style.userSelect = ''

    this.setState({
      isDragging: false,
      activeHandle: -1,
    })

    this.dispatch('resize', { sizes: state.sizes })
  }

  private resize(handleIndex: number, delta: number): void {
    this.startSizes = [...(this.state as ResizableState).sizes]
    this.applyDelta(handleIndex, delta)
    this.dispatch('resize', { sizes: (this.state as ResizableState).sizes })
  }

  private applySizes(): void {
    const state = this.state as ResizableState
    const config = this.config as ResizableConfig

    this.panels.forEach((panel, index) => {
      const size = state.sizes[index] ?? 50
      if (config.direction === 'horizontal') {
        panel.style.width = `${size}%`
      } else {
        panel.style.height = `${size}%`
      }
    })

    // Update ARIA
    this.handles.forEach((handle, index) => {
      handle.setAttribute('aria-valuenow', String(state.sizes[index] ?? 50))
    })
  }

  protected override render(): void {
    this.applySizes()
  }

  resetSizes(): void {
    const defaultSizes = (this.config as ResizableConfig).defaultSizes ||
      this.panels.map(() => 100 / this.panels.length)
    this.setState({ sizes: defaultSizes })
    this.dispatch('resize', { sizes: defaultSizes })
  }

  setSizes(sizes: number[]): void {
    this.setState({ sizes })
    this.dispatch('resize', { sizes })
  }

  getSizes(): number[] {
    return [...(this.state as ResizableState).sizes]
  }
}

export const createResizable = createComponentFactory(Resizable)
export default Resizable
