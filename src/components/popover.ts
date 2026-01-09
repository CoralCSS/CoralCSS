/**
 * Popover Component
 *
 * Accessible popover component with anchor positioning support.
 * @module components/popover
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Popover placement options
 */
export type PopoverPlacement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'

/**
 * Popover trigger types
 */
export type PopoverTrigger = 'click' | 'hover' | 'focus' | 'manual'

/**
 * Popover configuration
 */
export interface PopoverConfig extends ComponentConfig {
  /**
   * Placement relative to trigger
   * @default 'bottom'
   */
  placement?: PopoverPlacement

  /**
   * Trigger type
   * @default 'click'
   */
  trigger?: PopoverTrigger

  /**
   * Delay before showing (ms, for hover trigger)
   * @default 0
   */
  showDelay?: number

  /**
   * Delay before hiding (ms, for hover trigger)
   * @default 0
   */
  hideDelay?: number

  /**
   * Offset from trigger element (px)
   * @default 8
   */
  offset?: number

  /**
   * Whether to close on click outside
   * @default true
   */
  closeOnClickOutside?: boolean

  /**
   * Whether to close on escape key
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to use CSS anchor positioning
   * @default true
   */
  useAnchorPositioning?: boolean

  /**
   * Trigger element selector
   * @default '[data-coral-popover-trigger]'
   */
  triggerSelector?: string

  /**
   * Content element selector
   * @default '[data-coral-popover-content]'
   */
  contentSelector?: string

  /**
   * Arrow element selector
   * @default '[data-coral-popover-arrow]'
   */
  arrowSelector?: string
}

/**
 * Popover state
 */
export interface PopoverState extends ComponentState {
  isOpen: boolean
  placement: PopoverPlacement
}

/**
 * Popover component
 *
 * @example
 * ```html
 * <div data-coral-popover>
 *   <button data-coral-popover-trigger>Open Popover</button>
 *   <div data-coral-popover-content>
 *     <div data-coral-popover-arrow></div>
 *     <p>Popover content here...</p>
 *   </div>
 * </div>
 * ```
 */
export class Popover extends BaseComponent {
  protected declare config: PopoverConfig
  protected declare state: PopoverState

  private trigger: HTMLElement | null = null
  private content: HTMLElement | null = null
  private arrow: HTMLElement | null = null
  private showTimeout: ReturnType<typeof setTimeout> | null = null
  private hideTimeout: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): PopoverConfig {
    return {
      placement: 'bottom',
      trigger: 'click',
      showDelay: 0,
      hideDelay: 0,
      offset: 8,
      closeOnClickOutside: true,
      closeOnEscape: true,
      useAnchorPositioning: true,
      triggerSelector: '[data-coral-popover-trigger]',
      contentSelector: '[data-coral-popover-content]',
      arrowSelector: '[data-coral-popover-arrow]',
    }
  }

  protected getInitialState(): PopoverState {
    return {
      isOpen: false,
      placement: this.config.placement ?? 'bottom',
    }
  }

  protected setupAria(): void {
    this.trigger = this.query(this.config.triggerSelector!)
    this.content = this.query(this.config.contentSelector!)
    this.arrow = this.query(this.config.arrowSelector!)

    if (!this.trigger || !this.content) {return}

    // Set up trigger ARIA
    if (!this.content.id) {
      this.content.id = `${this.id}-content`
    }
    this.trigger.setAttribute('aria-haspopup', 'dialog')
    this.trigger.setAttribute('aria-expanded', 'false')
    this.trigger.setAttribute('aria-controls', this.content.id)

    // Set up content ARIA
    this.content.setAttribute('role', 'dialog')
    this.content.setAttribute('aria-hidden', 'true')

    // Initial visibility
    this.content.style.display = 'none'
  }

  protected bindEvents(): void {
    if (!this.trigger || !this.content) {return}

    const triggerType = this.config.trigger

    if (triggerType === 'click') {
      this.addEventListener(this.trigger, 'click', () => this.toggle())
    } else if (triggerType === 'hover') {
      this.addEventListener(this.trigger, 'mouseenter', () => this.scheduleShow())
      this.addEventListener(this.trigger, 'mouseleave', () => this.scheduleHide())
      this.addEventListener(this.content, 'mouseenter', () => this.cancelHide())
      this.addEventListener(this.content, 'mouseleave', () => this.scheduleHide())
    } else if (triggerType === 'focus') {
      this.addEventListener(this.trigger, 'focus', () => this.open())
      this.addEventListener(this.trigger, 'blur', () => this.close())
    }

    // Click outside
    if (this.config.closeOnClickOutside) {
      this.addEventListener(document, 'click', (e: Event) => {
        if (
          this.state.isOpen &&
          !this.element.contains(e.target as Node)
        ) {
          this.close()
        }
      })
    }

    // Escape key
    if (this.config.closeOnEscape) {
      this.addEventListener(document, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === 'Escape' && this.state.isOpen) {
          this.close()
          this.trigger?.focus()
        }
      })
    }
  }

  private scheduleShow(): void {
    this.cancelHide()
    if (this.config.showDelay) {
      this.showTimeout = setTimeout(() => this.open(), this.config.showDelay)
    } else {
      this.open()
    }
  }

  private scheduleHide(): void {
    this.cancelShow()
    if (this.config.hideDelay) {
      this.hideTimeout = setTimeout(() => this.close(), this.config.hideDelay)
    } else {
      this.close()
    }
  }

  private cancelShow(): void {
    if (this.showTimeout) {
      clearTimeout(this.showTimeout)
      this.showTimeout = null
    }
  }

  private cancelHide(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout)
      this.hideTimeout = null
    }
  }

  protected override render(): void {
    if (!this.trigger || !this.content) {return}

    if (this.state.isOpen) {
      this.content.style.display = ''
      this.content.removeAttribute('hidden')
      this.content.setAttribute('aria-hidden', 'false')
      this.content.setAttribute('data-open', '')
      this.trigger.setAttribute('aria-expanded', 'true')
      this.trigger.setAttribute('data-open', '')

      // Position the popover
      this.position()
    } else {
      this.content.style.display = 'none'
      this.content.setAttribute('hidden', '')
      this.content.setAttribute('aria-hidden', 'true')
      this.content.removeAttribute('data-open')
      this.trigger.setAttribute('aria-expanded', 'false')
      this.trigger.removeAttribute('data-open')
    }
  }

  /**
   * Position the popover relative to trigger
   */
  private position(): void {
    if (!this.trigger || !this.content) {return}

    // Use CSS anchor positioning if available and enabled
    if (this.config.useAnchorPositioning && CSS.supports('anchor-name', '--trigger')) {
      this.positionWithAnchor()
      return
    }

    // Fallback to JavaScript positioning
    this.positionWithJS()
  }

  private positionWithAnchor(): void {
    if (!this.trigger || !this.content) {return}

    const anchorName = `--popover-${this.id}`
    this.trigger.style.setProperty('anchor-name', anchorName)
    this.content.style.setProperty('position-anchor', anchorName)

    // Set position area based on placement
    const placementMap: Record<PopoverPlacement, string> = {
      'top': 'top center',
      'top-start': 'top left',
      'top-end': 'top right',
      'bottom': 'bottom center',
      'bottom-start': 'bottom left',
      'bottom-end': 'bottom right',
      'left': 'center left',
      'left-start': 'top left',
      'left-end': 'bottom left',
      'right': 'center right',
      'right-start': 'top right',
      'right-end': 'bottom right',
    }

    this.content.style.setProperty('position-area', placementMap[this.state.placement])
  }

  private positionWithJS(): void {
    if (!this.trigger || !this.content) {return}

    const triggerRect = this.trigger.getBoundingClientRect()
    const contentRect = this.content.getBoundingClientRect()
    const offset = this.config.offset ?? 8

    let top = 0
    let left = 0

    const placement = this.state.placement

    // Calculate position based on placement
    if (placement.startsWith('top')) {
      top = triggerRect.top - contentRect.height - offset
    } else if (placement.startsWith('bottom')) {
      top = triggerRect.bottom + offset
    } else if (placement.startsWith('left')) {
      left = triggerRect.left - contentRect.width - offset
    } else if (placement.startsWith('right')) {
      left = triggerRect.right + offset
    }

    // Horizontal alignment for top/bottom
    if (placement.startsWith('top') || placement.startsWith('bottom')) {
      if (placement.endsWith('-start')) {
        left = triggerRect.left
      } else if (placement.endsWith('-end')) {
        left = triggerRect.right - contentRect.width
      } else {
        left = triggerRect.left + (triggerRect.width - contentRect.width) / 2
      }
    }

    // Vertical alignment for left/right
    if (placement.startsWith('left') || placement.startsWith('right')) {
      if (placement.endsWith('-start')) {
        top = triggerRect.top
      } else if (placement.endsWith('-end')) {
        top = triggerRect.bottom - contentRect.height
      } else {
        top = triggerRect.top + (triggerRect.height - contentRect.height) / 2
      }
    }

    // Apply position
    this.content.style.position = 'fixed'
    this.content.style.top = `${top}px`
    this.content.style.left = `${left}px`

    // Position arrow if present
    this.positionArrow(triggerRect)
  }

  private positionArrow(triggerRect: DOMRect): void {
    if (!this.arrow || !this.content) {return}

    const placement = this.state.placement
    const contentRect = this.content.getBoundingClientRect()

    // Reset arrow position
    this.arrow.style.removeProperty('top')
    this.arrow.style.removeProperty('bottom')
    this.arrow.style.removeProperty('left')
    this.arrow.style.removeProperty('right')

    if (placement.startsWith('top')) {
      this.arrow.style.bottom = '-4px'
      this.arrow.style.left = `${triggerRect.left - contentRect.left + triggerRect.width / 2 - 4}px`
    } else if (placement.startsWith('bottom')) {
      this.arrow.style.top = '-4px'
      this.arrow.style.left = `${triggerRect.left - contentRect.left + triggerRect.width / 2 - 4}px`
    } else if (placement.startsWith('left')) {
      this.arrow.style.right = '-4px'
      this.arrow.style.top = `${triggerRect.top - contentRect.top + triggerRect.height / 2 - 4}px`
    } else if (placement.startsWith('right')) {
      this.arrow.style.left = '-4px'
      this.arrow.style.top = `${triggerRect.top - contentRect.top + triggerRect.height / 2 - 4}px`
    }
  }

  /**
   * Set placement
   */
  setPlacement(placement: PopoverPlacement): void {
    this.setState({ placement })
    this.content?.setAttribute('data-placement', placement)
  }

  override destroy(): void {
    this.cancelShow()
    this.cancelHide()
    super.destroy()
  }
}

/**
 * Create a popover instance
 */
export const createPopover = createComponentFactory(Popover)

export default Popover
