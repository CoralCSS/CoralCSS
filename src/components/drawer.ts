/**
 * Drawer/Sheet Component
 *
 * Accessible side panel drawer component.
 * @module components/drawer
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Drawer placement
 */
export type DrawerPlacement = 'left' | 'right' | 'top' | 'bottom'

/**
 * Drawer configuration
 */
export interface DrawerConfig extends ComponentConfig {
  /**
   * Drawer placement
   * @default 'left'
   */
  placement?: DrawerPlacement

  /**
   * Drawer size (CSS value)
   * @default '300px'
   */
  size?: string

  /**
   * Whether clicking backdrop closes drawer
   * @default true
   */
  closeOnBackdrop?: boolean

  /**
   * Whether pressing Escape closes drawer
   * @default true
   */
  closeOnEscape?: boolean

  /**
   * Whether to trap focus within drawer
   * @default true
   */
  trapFocus?: boolean

  /**
   * Whether to lock body scroll when open
   * @default true
   */
  lockScroll?: boolean

  /**
   * Whether to show backdrop
   * @default true
   */
  showBackdrop?: boolean

  /**
   * Backdrop element selector
   * @default '[data-coral-drawer-backdrop]'
   */
  backdropSelector?: string

  /**
   * Content element selector
   * @default '[data-coral-drawer-content]'
   */
  contentSelector?: string

  /**
   * Close button selector
   * @default '[data-coral-drawer-close]'
   */
  closeSelector?: string
}

/**
 * Drawer state
 */
export interface DrawerState extends ComponentState {
  isOpen: boolean
  isAnimating: boolean
  previousActiveElement: Element | null
}

/**
 * Drawer component
 *
 * @example
 * ```html
 * <div data-coral-drawer data-placement="right">
 *   <div data-coral-drawer-backdrop></div>
 *   <div data-coral-drawer-content>
 *     <div data-coral-drawer-header>
 *       <h2>Drawer Title</h2>
 *       <button data-coral-drawer-close aria-label="Close">&times;</button>
 *     </div>
 *     <div data-coral-drawer-body>
 *       Drawer content...
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export class Drawer extends BaseComponent {
  protected declare config: DrawerConfig
  protected declare state: DrawerState

  private backdrop: HTMLElement | null = null
  private content: HTMLElement | null = null

  protected getDefaultConfig(): DrawerConfig {
    return {
      placement: 'left',
      size: '300px',
      closeOnBackdrop: true,
      closeOnEscape: true,
      trapFocus: true,
      lockScroll: true,
      showBackdrop: true,
      backdropSelector: '[data-coral-drawer-backdrop]',
      contentSelector: '[data-coral-drawer-content]',
      closeSelector: '[data-coral-drawer-close]',
    }
  }

  protected getInitialState(): DrawerState {
    return {
      isOpen: false,
      isAnimating: false,
      previousActiveElement: null,
    }
  }

  protected setupAria(): void {
    this.backdrop = this.query(this.config.backdropSelector!)
    this.content = this.query(this.config.contentSelector!)

    // Set up drawer attributes
    this.element.setAttribute('data-placement', this.config.placement ?? 'left')

    // Set up content ARIA
    if (this.content) {
      this.content.setAttribute('role', 'dialog')
      this.content.setAttribute('aria-modal', 'true')

      // Set size based on placement
      const placement = this.config.placement
      const size = this.config.size
      if (placement === 'left' || placement === 'right') {
        this.content.style.width = size ?? '300px'
      } else {
        this.content.style.height = size ?? '300px'
      }

      // Find and link title
      const title = this.content.querySelector('[data-coral-drawer-title], h1, h2, h3')
      if (title) {
        if (!title.id) {
          title.id = `${this.id}-title`
        }
        this.content.setAttribute('aria-labelledby', title.id)
      }
    }

    // Initial state
    this.element.style.display = 'none'
    this.element.setAttribute('aria-hidden', 'true')
  }

  protected bindEvents(): void {
    // Close buttons
    const closeButtons = this.queryAll(this.config.closeSelector!)
    closeButtons.forEach((btn) => {
      this.addEventListener(btn, 'click', () => this.close())
    })

    // Backdrop click
    if (this.config.closeOnBackdrop && this.backdrop) {
      this.addEventListener(this.backdrop, 'click', () => this.close())
    }

    // Escape key
    if (this.config.closeOnEscape) {
      this.addEventListener(document, 'keydown', (e: Event) => {
        const keyEvent = e as KeyboardEvent
        if (keyEvent.key === 'Escape' && this.state.isOpen) {
          this.close()
        }
      })
    }
  }

  protected override render(): void {
    if (this.state.isOpen) {
      this.element.style.display = ''
      this.element.removeAttribute('aria-hidden')
      this.element.setAttribute('data-open', '')
      this.backdrop?.setAttribute('data-open', '')
      this.content?.setAttribute('data-open', '')
    } else if (!this.state.isAnimating) {
      this.element.style.display = 'none'
      this.element.setAttribute('aria-hidden', 'true')
      this.element.removeAttribute('data-open')
      this.backdrop?.removeAttribute('data-open')
      this.content?.removeAttribute('data-open')
    }
  }

  /**
   * Open the drawer
   */
  override open(): void {
    if (this.state.isOpen || this.state.isAnimating) {return}

    // Store active element
    this.state.previousActiveElement = document.activeElement

    // Lock scroll
    if (this.config.lockScroll) {
      this.lockScroll()
    }

    // Show drawer
    this.setState({ isOpen: true, isAnimating: true })

    // Wait for animation
    requestAnimationFrame(() => {
      this.setState({ isAnimating: false })

      // Trap focus
      if (this.config.trapFocus && this.content) {
        this.trapFocus(this.content)

        // Focus first focusable element
        const firstFocusable = this.content.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
        firstFocusable?.focus()
      }
    })

    // Dispatch event
    this.hooks.onOpen?.(this.getContext())
    this.dispatch('open')
  }

  /**
   * Close the drawer
   */
  override close(): void {
    if (!this.state.isOpen || this.state.isAnimating) {return}

    this.setState({ isAnimating: true })
    this.element.setAttribute('data-closing', '')

    // Get animation duration
    const animationDuration = parseFloat(
      getComputedStyle(this.content ?? this.element).transitionDuration || '0'
    ) * 1000

    setTimeout(() => {
      // Release focus trap
      if (this.config.trapFocus && this.content) {
        this.releaseFocusTrap(this.content)
      }

      // Unlock scroll
      if (this.config.lockScroll) {
        this.unlockScroll()
      }

      this.setState({ isOpen: false, isAnimating: false })
      this.element.removeAttribute('data-closing')

      // Restore focus
      if (this.state.previousActiveElement instanceof HTMLElement) {
        this.state.previousActiveElement.focus()
      }

      // Dispatch event
      this.hooks.onClose?.(this.getContext())
      this.dispatch('close')
    }, animationDuration || 200)
  }

  /**
   * Set drawer placement
   */
  setPlacement(placement: DrawerPlacement): void {
    this.config.placement = placement
    this.element.setAttribute('data-placement', placement)

    // Update size direction
    if (this.content) {
      const size = this.config.size
      if (placement === 'left' || placement === 'right') {
        this.content.style.width = size ?? '300px'
        this.content.style.height = ''
      } else {
        this.content.style.height = size ?? '300px'
        this.content.style.width = ''
      }
    }
  }

  /**
   * Set drawer size
   */
  setSize(size: string): void {
    this.config.size = size

    if (this.content) {
      const placement = this.config.placement
      if (placement === 'left' || placement === 'right') {
        this.content.style.width = size
      } else {
        this.content.style.height = size
      }
    }
  }
}

/**
 * Create a drawer instance
 */
export const createDrawer = createComponentFactory(Drawer)

export default Drawer
