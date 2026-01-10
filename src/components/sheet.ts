/**
 * Sheet Component
 *
 * A slide-out panel component that appears from the edge of the screen.
 * Similar to Drawer but with more flexibility and overlay behavior.
 *
 * @module components/sheet
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Sheet side positions
 */
export type SheetSide = 'top' | 'bottom' | 'left' | 'right'

/**
 * Sheet configuration
 */
export interface SheetConfig extends ComponentConfig {
  /**
   * Side the sheet appears from
   * @default 'right'
   */
  side?: SheetSide

  /**
   * Whether the sheet is initially open
   * @default false
   */
  defaultOpen?: boolean

  /**
   * Whether clicking the overlay closes the sheet
   * @default true
   */
  closeOnOverlayClick?: boolean

  /**
   * Whether pressing Escape closes the sheet
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to show the overlay
   * @default true
   */
  overlay?: boolean

  /**
   * Whether the sheet is modal (traps focus)
   * @default true
   */
  modal?: boolean

  /**
   * Animation duration in milliseconds
   * @default 300
   */
  animationDuration?: number

  /**
   * Trigger element selector
   * @default '[data-coral-sheet-trigger]'
   */
  triggerSelector?: string

  /**
   * Content element selector
   * @default '[data-coral-sheet-content]'
   */
  contentSelector?: string

  /**
   * Overlay element selector
   * @default '[data-coral-sheet-overlay]'
   */
  overlaySelector?: string

  /**
   * Close button selector
   * @default '[data-coral-sheet-close]'
   */
  closeSelector?: string
}

/**
 * Sheet state
 */
export interface SheetState extends ComponentState {
  isOpen: boolean
  isAnimating: boolean
}

/**
 * Sheet component
 *
 * @example
 * ```html
 * <div data-coral-sheet data-side="right">
 *   <button data-coral-sheet-trigger>Open Sheet</button>
 *   <div data-coral-sheet-overlay></div>
 *   <div data-coral-sheet-content>
 *     <div data-coral-sheet-header>
 *       <h2>Sheet Title</h2>
 *       <button data-coral-sheet-close>×</button>
 *     </div>
 *     <div data-coral-sheet-body>
 *       Sheet content goes here
 *     </div>
 *     <div data-coral-sheet-footer>
 *       <button>Cancel</button>
 *       <button>Save</button>
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export class Sheet extends BaseComponent {
  protected declare config: SheetConfig
  protected declare state: SheetState

  private triggers: HTMLElement[] = []
  private content: HTMLElement | null = null
  private overlay: HTMLElement | null = null
  private closeButtons: HTMLElement[] = []
  private focusableElements: HTMLElement[] = []
  private previousActiveElement: HTMLElement | null = null

  protected getDefaultConfig(): SheetConfig {
    return {
      side: 'right',
      defaultOpen: false,
      closeOnOverlayClick: true,
      closeOnEscape: true,
      overlay: true,
      modal: true,
      animationDuration: 300,
      triggerSelector: '[data-coral-sheet-trigger]',
      contentSelector: '[data-coral-sheet-content]',
      overlaySelector: '[data-coral-sheet-overlay]',
      closeSelector: '[data-coral-sheet-close]',
    }
  }

  protected getInitialState(): SheetState {
    return {
      isOpen: this.config.defaultOpen ?? false,
      isAnimating: false,
    }
  }

  protected setupAria(): void {
    this.triggers = Array.from(this.queryAll(this.config.triggerSelector!))
    this.content = this.query(this.config.contentSelector!)
    this.overlay = this.query(this.config.overlaySelector!)
    this.closeButtons = Array.from(this.queryAll(this.config.closeSelector!))

    // Get side from data attribute if not in config
    const dataSide = this.element.dataset.side as SheetSide | undefined
    if (dataSide) {
      this.config.side = dataSide
    }

    if (!this.content) {
      return
    }

    // Set up content ID
    if (!this.content.id) {
      this.content.id = `${this.id}-content`
    }

    // Set up content ARIA
    this.content.setAttribute('role', 'dialog')
    this.content.setAttribute('aria-modal', String(this.config.modal))
    this.content.setAttribute('data-side', this.config.side!)

    // Set up triggers
    this.triggers.forEach((trigger) => {
      trigger.setAttribute('aria-haspopup', 'dialog')
      trigger.setAttribute('aria-expanded', String(this.state.isOpen))
      trigger.setAttribute('aria-controls', this.content!.id)
    })

    // Set up overlay
    if (this.overlay) {
      this.overlay.setAttribute('data-state', this.state.isOpen ? 'open' : 'closed')
    }

    // Cache focusable elements for focus trap
    this.updateFocusableElements()

    // Apply initial styles
    this.applyInitialStyles()
  }

  private applyInitialStyles(): void {
    if (!this.content || !this.overlay) {
      return
    }

    const { side, animationDuration } = this.config

    // Content styles
    this.content.style.position = 'fixed'
    this.content.style.zIndex = '51'
    this.content.style.transition = `transform ${animationDuration}ms ease-in-out`

    switch (side) {
      case 'top':
        this.content.style.top = '0'
        this.content.style.left = '0'
        this.content.style.right = '0'
        break
      case 'bottom':
        this.content.style.bottom = '0'
        this.content.style.left = '0'
        this.content.style.right = '0'
        break
      case 'left':
        this.content.style.top = '0'
        this.content.style.bottom = '0'
        this.content.style.left = '0'
        break
      case 'right':
      default:
        this.content.style.top = '0'
        this.content.style.bottom = '0'
        this.content.style.right = '0'
        break
    }

    // Overlay styles
    this.overlay.style.position = 'fixed'
    this.overlay.style.inset = '0'
    this.overlay.style.zIndex = '50'
    this.overlay.style.transition = `opacity ${animationDuration}ms ease-in-out`

    // Initial hidden state
    if (!this.state.isOpen) {
      this.content.style.display = 'none'
      this.overlay.style.display = 'none'
    }
  }

  private updateFocusableElements(): void {
    if (!this.content) {
      return
    }

    const selector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ')

    this.focusableElements = Array.from(this.content.querySelectorAll(selector))
  }

  protected bindEvents(): void {
    // Trigger clicks
    this.triggers.forEach((trigger) => {
      this.addEventListener(trigger, 'click', () => {
        this.toggle()
      })
    })

    // Close button clicks
    this.closeButtons.forEach((button) => {
      this.addEventListener(button, 'click', () => {
        this.close()
      })
    })

    // Overlay click
    if (this.overlay && this.config.closeOnOverlayClick) {
      this.addEventListener(this.overlay, 'click', () => {
        this.close()
      })
    }

    // Keyboard events
    this.addEventListener(document, 'keydown', (e: Event) => {
      this.handleKeyDown(e as KeyboardEvent)
    })
  }

  private handleKeyDown(e: KeyboardEvent): void {
    if (!this.state.isOpen) {
      return
    }

    switch (e.key) {
      case 'Escape':
        if (this.config.closeOnEscape) {
          e.preventDefault()
          this.close()
        }
        break

      case 'Tab':
        if (this.config.modal) {
          this.handleTabKey(e)
        }
        break
    }
  }

  private handleTabKey(e: KeyboardEvent): void {
    if (this.focusableElements.length === 0) {
      e.preventDefault()
      return
    }

    const firstElement = this.focusableElements[0]
    const lastElement = this.focusableElements[this.focusableElements.length - 1]
    const activeElement = document.activeElement

    if (e.shiftKey) {
      // Shift + Tab: cycle back to last element
      if (activeElement === firstElement) {
        e.preventDefault()
        lastElement?.focus()
      }
    } else {
      // Tab: cycle to first element
      if (activeElement === lastElement) {
        e.preventDefault()
        firstElement?.focus()
      }
    }
  }

  protected override render(): void {
    if (!this.content || !this.overlay) {
      return
    }

    const { isOpen } = this.state
    const { side, animationDuration } = this.config

    // Update data attributes
    this.element.setAttribute('data-state', isOpen ? 'open' : 'closed')
    this.content.setAttribute('data-state', isOpen ? 'open' : 'closed')
    this.overlay.setAttribute('data-state', isOpen ? 'open' : 'closed')

    // Update trigger aria-expanded
    this.triggers.forEach((trigger) => {
      trigger.setAttribute('aria-expanded', String(isOpen))
    })

    if (isOpen) {
      // Show overlay and content
      this.overlay.style.display = ''
      this.content.style.display = ''

      // Force reflow for animation
      void this.overlay.offsetHeight

      // Animate in
      requestAnimationFrame(() => {
        if (this.overlay) {
          this.overlay.style.opacity = '1'
        }
        if (this.content) {
          this.content.style.transform = 'translate(0, 0)'
        }
      })
    } else {
      // Animate out
      this.overlay.style.opacity = '0'

      switch (side) {
        case 'top':
          this.content.style.transform = 'translateY(-100%)'
          break
        case 'bottom':
          this.content.style.transform = 'translateY(100%)'
          break
        case 'left':
          this.content.style.transform = 'translateX(-100%)'
          break
        case 'right':
        default:
          this.content.style.transform = 'translateX(100%)'
          break
      }

      // Hide after animation
      setTimeout(() => {
        if (!this.state.isOpen) {
          this.overlay!.style.display = 'none'
          this.content!.style.display = 'none'
        }
      }, animationDuration)
    }
  }

  /**
   * Open the sheet
   */
  override open(): void {
    if (this.state.isOpen || this.state.isAnimating) {
      return
    }

    // Store previously focused element
    this.previousActiveElement = document.activeElement as HTMLElement

    this.setState({ isOpen: true, isAnimating: true })
    this.dispatch('open')

    // Focus first focusable element after animation
    setTimeout(() => {
      this.setState({ isAnimating: false })
      if (this.focusableElements.length > 0) {
        this.focusableElements[0]?.focus()
      } else {
        this.content?.focus()
      }
    }, this.config.animationDuration)

    // Lock body scroll
    document.body.style.overflow = 'hidden'
  }

  /**
   * Close the sheet
   */
  override close(): void {
    if (!this.state.isOpen || this.state.isAnimating) {
      return
    }

    this.setState({ isOpen: false, isAnimating: true })
    this.dispatch('close')

    setTimeout(() => {
      this.setState({ isAnimating: false })

      // Restore focus
      this.previousActiveElement?.focus()

      // Unlock body scroll
      document.body.style.overflow = ''
    }, this.config.animationDuration)
  }

  /**
   * Toggle the sheet
   */
  override toggle(): void {
    if (this.state.isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  /**
   * Check if sheet is open
   */
  override isOpen(): boolean {
    return this.state.isOpen
  }
}

/**
 * Create a sheet instance
 */
export const createSheet = createComponentFactory(Sheet)

export default Sheet
