/**
 * Avatar Component
 *
 * User avatar with image, initials fallback, and status indicator.
 * @module components/avatar
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Avatar size options
 */
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

/**
 * Avatar status options
 */
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy' | 'none'

/**
 * Avatar configuration
 */
export interface AvatarConfig extends ComponentConfig {
  /**
   * Image source URL
   */
  src?: string

  /**
   * Alt text for image
   */
  alt?: string

  /**
   * Name for generating initials
   */
  name?: string

  /**
   * Avatar size
   * @default 'md'
   */
  size?: AvatarSize

  /**
   * Status indicator
   * @default 'none'
   */
  status?: AvatarStatus

  /**
   * Whether to show as rounded square
   * @default false
   */
  squared?: boolean

  /**
   * Fallback background color (for initials)
   */
  fallbackColor?: string

  /**
   * Image element selector
   * @default '[data-coral-avatar-image]'
   */
  imageSelector?: string

  /**
   * Fallback element selector
   * @default '[data-coral-avatar-fallback]'
   */
  fallbackSelector?: string

  /**
   * Status element selector
   * @default '[data-coral-avatar-status]'
   */
  statusSelector?: string
}

/**
 * Avatar state
 */
export interface AvatarState extends ComponentState {
  imageLoaded: boolean
  imageError: boolean
}

/**
 * Avatar component
 *
 * @example
 * ```html
 * <!-- With image -->
 * <div data-coral-avatar data-src="/avatar.jpg" data-alt="John Doe">
 *   <img data-coral-avatar-image />
 *   <span data-coral-avatar-fallback>JD</span>
 *   <span data-coral-avatar-status></span>
 * </div>
 *
 * <!-- Initials only -->
 * <div data-coral-avatar data-name="John Doe">
 *   <span data-coral-avatar-fallback></span>
 * </div>
 * ```
 */
export class Avatar extends BaseComponent {
  protected declare config: AvatarConfig
  protected declare state: AvatarState

  private image: HTMLImageElement | null = null
  private fallback: HTMLElement | null = null
  private statusEl: HTMLElement | null = null

  protected getDefaultConfig(): AvatarConfig {
    return {
      size: 'md',
      status: 'none',
      squared: false,
      imageSelector: '[data-coral-avatar-image]',
      fallbackSelector: '[data-coral-avatar-fallback]',
      statusSelector: '[data-coral-avatar-status]',
    }
  }

  protected getInitialState(): AvatarState {
    return {
      imageLoaded: false,
      imageError: false,
    }
  }

  protected setupAria(): void {
    this.image = this.query(this.config.imageSelector!) as HTMLImageElement
    this.fallback = this.query(this.config.fallbackSelector!)
    this.statusEl = this.query(this.config.statusSelector!)

    // Set up avatar ARIA
    this.element.setAttribute('role', 'img')
    this.element.setAttribute('aria-label', this.config.alt ?? this.config.name ?? 'Avatar')

    // Set data attributes for styling
    this.element.setAttribute('data-size', this.config.size ?? 'md')
    if (this.config.squared) {
      this.element.setAttribute('data-squared', '')
    }

    // Initialize image or fallback
    if (this.config.src && this.image) {
      this.loadImage()
    } else {
      this.showFallback()
    }

    // Set up status
    if (this.config.status && this.config.status !== 'none' && this.statusEl) {
      this.statusEl.setAttribute('data-status', this.config.status)
      this.statusEl.setAttribute('aria-label', `Status: ${this.config.status}`)
    }
  }

  protected bindEvents(): void {
    // Image load events are bound in loadImage()
  }

  private loadImage(): void {
    if (!this.image || !this.config.src) {return}

    // Hide fallback initially
    if (this.fallback) {
      this.fallback.style.display = 'none'
    }

    // Set up image
    this.image.src = this.config.src
    this.image.alt = this.config.alt ?? ''

    // Handle load
    this.addEventListener(this.image, 'load', () => {
      this.setState({ imageLoaded: true, imageError: false })
      this.image!.style.display = ''
      if (this.fallback) {
        this.fallback.style.display = 'none'
      }
      this.dispatch('load')
    })

    // Handle error
    this.addEventListener(this.image, 'error', () => {
      this.setState({ imageLoaded: false, imageError: true })
      this.showFallback()
      this.dispatch('error')
    })
  }

  private showFallback(): void {
    if (this.image) {
      this.image.style.display = 'none'
    }

    if (this.fallback) {
      this.fallback.style.display = ''

      // Generate initials if name provided
      if (this.config.name && !this.fallback.textContent?.trim()) {
        this.fallback.textContent = this.getInitials(this.config.name)
      }

      // Set fallback color
      if (this.config.fallbackColor) {
        this.fallback.style.backgroundColor = this.config.fallbackColor
      } else if (this.config.name) {
        // Generate color from name
        this.fallback.style.backgroundColor = this.generateColor(this.config.name)
      }
    }
  }

  private getInitials(name: string): string {
    const parts = name.trim().split(/\s+/)
    if (parts.length === 0 || !parts[0]) {
      return '?'
    }
    if (parts.length === 1) {
      return parts[0].substring(0, 2).toUpperCase()
    }
    const first = parts[0]?.[0] ?? ''
    const last = parts[parts.length - 1]?.[0] ?? ''
    return (first + last).toUpperCase()
  }

  private generateColor(name: string): string {
    // Generate a consistent color from the name
    let hash = 0
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash)
    }

    const colors = [
      '#f87171', // red
      '#fb923c', // orange
      '#fbbf24', // amber
      '#a3e635', // lime
      '#34d399', // emerald
      '#22d3ee', // cyan
      '#60a5fa', // blue
      '#a78bfa', // violet
      '#f472b6', // pink
    ]

    return colors[Math.abs(hash) % colors.length] ?? '#6b7280'
  }

  /**
   * Update image source
   */
  setSrc(src: string): void {
    this.config.src = src
    this.setState({ imageLoaded: false, imageError: false })
    this.loadImage()
  }

  /**
   * Update name (for initials)
   */
  setName(name: string): void {
    this.config.name = name
    this.element.setAttribute('aria-label', name)

    if (this.fallback && (this.state.imageError || !this.config.src)) {
      this.fallback.textContent = this.getInitials(name)
      this.fallback.style.backgroundColor = this.generateColor(name)
    }
  }

  /**
   * Update status
   */
  setStatus(status: AvatarStatus): void {
    this.config.status = status

    if (this.statusEl) {
      if (status === 'none') {
        this.statusEl.style.display = 'none'
        this.statusEl.removeAttribute('data-status')
      } else {
        this.statusEl.style.display = ''
        this.statusEl.setAttribute('data-status', status)
        this.statusEl.setAttribute('aria-label', `Status: ${status}`)
      }
    }
  }

  /**
   * Update size
   */
  setSize(size: AvatarSize): void {
    this.config.size = size
    this.element.setAttribute('data-size', size)
  }
}

/**
 * Create an avatar instance
 */
export const createAvatar = createComponentFactory(Avatar)

export default Avatar
