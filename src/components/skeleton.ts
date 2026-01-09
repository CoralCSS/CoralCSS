/**
 * Skeleton Component
 *
 * Accessible loading skeleton/placeholder component.
 * @module components/skeleton
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Skeleton variant
 */
export type SkeletonVariant = 'text' | 'circular' | 'rectangular' | 'rounded'

/**
 * Skeleton animation
 */
export type SkeletonAnimation = 'pulse' | 'wave' | 'none'

/**
 * Skeleton configuration
 */
export interface SkeletonConfig extends ComponentConfig {
  /**
   * Skeleton variant
   * @default 'text'
   */
  variant?: SkeletonVariant

  /**
   * Animation type
   * @default 'pulse'
   */
  animation?: SkeletonAnimation

  /**
   * Width (CSS value)
   */
  width?: string

  /**
   * Height (CSS value)
   */
  height?: string

  /**
   * Number of lines (for text variant)
   * @default 1
   */
  lines?: number

  /**
   * Whether skeleton is loading
   * @default true
   */
  loading?: boolean

  /**
   * Content to show when not loading
   */
  children?: HTMLElement | null
}

/**
 * Skeleton state
 */
export interface SkeletonState extends ComponentState {
  loading: boolean
}

/**
 * Skeleton component
 *
 * @example
 * ```html
 * <!-- Text skeleton -->
 * <div data-coral-skeleton data-variant="text" data-lines="3"></div>
 *
 * <!-- Circular skeleton (avatar) -->
 * <div data-coral-skeleton data-variant="circular" style="width: 48px; height: 48px;"></div>
 *
 * <!-- Card skeleton -->
 * <div data-coral-skeleton-group>
 *   <div data-coral-skeleton data-variant="rectangular" style="height: 200px;"></div>
 *   <div data-coral-skeleton data-variant="text" style="width: 80%;"></div>
 *   <div data-coral-skeleton data-variant="text" style="width: 60%;"></div>
 * </div>
 * ```
 */
export class Skeleton extends BaseComponent {
  protected declare config: SkeletonConfig
  protected declare state: SkeletonState

  private originalContent: HTMLElement | null = null

  protected getDefaultConfig(): SkeletonConfig {
    return {
      variant: 'text',
      animation: 'pulse',
      lines: 1,
      loading: true,
    }
  }

  protected getInitialState(): SkeletonState {
    return {
      loading: this.config.loading ?? true,
    }
  }

  protected setupAria(): void {
    // Read configuration from data attributes
    const variant = this.element.dataset.variant as SkeletonVariant
    const animation = this.element.dataset.animation as SkeletonAnimation
    const lines = this.element.dataset.lines

    if (variant) {this.config.variant = variant}
    if (animation) {this.config.animation = animation}
    if (lines) {this.config.lines = parseInt(lines, 10)}

    // Store original content
    if (this.element.children.length > 0) {
      this.originalContent = document.createElement('div')
      while (this.element.firstChild) {
        this.originalContent.appendChild(this.element.firstChild)
      }
    }

    // Set ARIA attributes
    this.element.setAttribute('role', 'status')
    this.element.setAttribute('aria-busy', 'true')
    this.element.setAttribute('aria-live', 'polite')
    this.element.setAttribute('aria-label', 'Loading...')

    // Set variant attribute
    this.element.setAttribute('data-variant', this.config.variant ?? 'text')
    this.element.setAttribute('data-animation', this.config.animation ?? 'pulse')

    // Apply dimensions
    if (this.config.width) {
      this.element.style.width = this.config.width
    }
    if (this.config.height) {
      this.element.style.height = this.config.height
    }

    // Create skeleton content
    this.createSkeletonContent()
  }

  protected bindEvents(): void {
    // Skeleton is mostly static, no events needed
  }

  private createSkeletonContent(): void {
    const { variant, lines } = this.config

    // Clear existing content
    this.element.innerHTML = ''

    if (variant === 'text' && lines && lines > 1) {
      // Create multiple lines
      for (let i = 0; i < lines; i++) {
        const line = document.createElement('div')
        line.setAttribute('data-coral-skeleton-line', '')

        // Last line is usually shorter
        if (i === lines - 1) {
          line.style.width = '60%'
        }

        this.element.appendChild(line)
      }
    }
  }

  protected override render(): void {
    const { loading } = this.state

    if (loading) {
      this.element.setAttribute('data-loading', '')
      this.element.setAttribute('aria-busy', 'true')
      this.element.removeAttribute('aria-hidden')

      // Show skeleton content
      if (this.element.children.length === 0) {
        this.createSkeletonContent()
      }
    } else {
      this.element.removeAttribute('data-loading')
      this.element.setAttribute('aria-busy', 'false')
      this.element.setAttribute('aria-hidden', 'true')

      // Restore original content
      if (this.originalContent) {
        this.element.innerHTML = ''
        while (this.originalContent.firstChild) {
          this.element.appendChild(this.originalContent.firstChild)
        }
      }
    }
  }

  /**
   * Show skeleton (start loading)
   */
  show(): void {
    this.setState({ loading: true })
    this.dispatch('show')
  }

  /**
   * Hide skeleton (stop loading)
   */
  hide(): void {
    this.setState({ loading: false })
    this.dispatch('hide')
  }

  /**
   * Check if currently loading
   */
  isLoading(): boolean {
    return this.state.loading
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.setState({ loading })
    this.dispatch('change', { loading })
  }
}

/**
 * Skeleton Group - manages multiple skeletons together
 */
export interface SkeletonGroupConfig extends ComponentConfig {
  /**
   * Whether group is loading
   * @default true
   */
  loading?: boolean

  /**
   * Skeleton item selector
   * @default '[data-coral-skeleton]'
   */
  skeletonSelector?: string

  /**
   * Stagger animation delay (ms)
   * @default 0
   */
  staggerDelay?: number
}

export interface SkeletonGroupState extends ComponentState {
  loading: boolean
}

/**
 * Skeleton group component
 *
 * @example
 * ```html
 * <div data-coral-skeleton-group>
 *   <div data-coral-skeleton data-variant="circular"></div>
 *   <div data-coral-skeleton data-variant="text"></div>
 *   <div data-coral-skeleton data-variant="text"></div>
 * </div>
 * ```
 */
export class SkeletonGroup extends BaseComponent {
  protected declare config: SkeletonGroupConfig
  protected declare state: SkeletonGroupState

  private skeletons: Skeleton[] = []

  protected getDefaultConfig(): SkeletonGroupConfig {
    return {
      loading: true,
      skeletonSelector: '[data-coral-skeleton]',
      staggerDelay: 0,
    }
  }

  protected getInitialState(): SkeletonGroupState {
    return {
      loading: this.config.loading ?? true,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'status')
    this.element.setAttribute('aria-busy', String(this.state.loading))
    this.element.setAttribute('aria-live', 'polite')

    // Initialize child skeletons
    const skeletonElements = this.queryAll(this.config.skeletonSelector!)
    skeletonElements.forEach((el, index) => {
      const skeleton = new Skeleton(el as HTMLElement, {
        loading: this.state.loading,
      })

      // Apply stagger delay
      if (this.config.staggerDelay && this.config.staggerDelay > 0) {
        ;(el as HTMLElement).style.animationDelay = `${index * this.config.staggerDelay}ms`
      }

      this.skeletons.push(skeleton)
    })
  }

  protected bindEvents(): void {
    // No events needed
  }

  protected override render(): void {
    const { loading } = this.state

    this.element.setAttribute('aria-busy', String(loading))

    if (loading) {
      this.element.setAttribute('data-loading', '')
    } else {
      this.element.removeAttribute('data-loading')
    }
  }

  /**
   * Show all skeletons
   */
  show(): void {
    this.setState({ loading: true })
    this.skeletons.forEach((skeleton) => skeleton.show())
    this.dispatch('show')
  }

  /**
   * Hide all skeletons
   */
  hide(): void {
    this.setState({ loading: false })
    this.skeletons.forEach((skeleton) => skeleton.hide())
    this.dispatch('hide')
  }

  /**
   * Check if currently loading
   */
  isLoading(): boolean {
    return this.state.loading
  }

  /**
   * Set loading state
   */
  setLoading(loading: boolean): void {
    this.setState({ loading })
    this.skeletons.forEach((skeleton) => skeleton.setLoading(loading))
    this.dispatch('change', { loading })
  }

  /**
   * Get all skeleton instances
   */
  getSkeletons(): Skeleton[] {
    return [...this.skeletons]
  }

  override destroy(): void {
    this.skeletons.forEach((skeleton) => skeleton.destroy())
    this.skeletons = []
    super.destroy()
  }
}

/**
 * Create a skeleton instance
 */
export const createSkeleton = createComponentFactory(Skeleton)

/**
 * Create a skeleton group instance
 */
export const createSkeletonGroup = createComponentFactory(SkeletonGroup)

export default Skeleton
