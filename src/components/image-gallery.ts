/**
 * ImageGallery Component
 *
 * Image gallery with lightbox support.
 * @module components/image-gallery
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ImageGalleryConfig extends ComponentConfig {
  /** Columns (grid) */
  columns?: number
  /** Gap between images */
  gap?: number
  /** Enable lightbox */
  lightbox?: boolean
  /** Show thumbnails in lightbox */
  thumbnails?: boolean
  /** Keyboard navigation */
  keyboard?: boolean
  /** Loop through images */
  loop?: boolean
}

export interface ImageGalleryState extends ComponentState {
  images: { src: string; alt?: string; caption?: string }[]
  currentIndex: number
  lightboxOpen: boolean
}

/**
 * ImageGallery component with lightbox
 */
export class ImageGallery extends BaseComponent {
  private lightboxEl: HTMLElement | null = null
  private thumbnailsEl: HTMLElement | null = null

  protected getDefaultConfig(): ImageGalleryConfig {
    return {
      columns: 3,
      gap: 8,
      lightbox: true,
      thumbnails: true,
      keyboard: true,
      loop: true,
    }
  }

  protected getInitialState(): ImageGalleryState {
    return {
      images: [],
      currentIndex: 0,
      lightboxOpen: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-label', 'Image gallery')
  }

  protected bindEvents(): void {
    const config = this.config as ImageGalleryConfig

    // Parse images from DOM
    const imgElements = this.queryAll('img, [data-coral-gallery-image]')
    const images = Array.from(imgElements).map((el) => ({
      src: (el as HTMLImageElement).src || (el as HTMLElement).dataset.src || '',
      alt: (el as HTMLImageElement).alt || (el as HTMLElement).dataset.alt,
      caption: (el as HTMLElement).dataset.caption,
    }))
    this.setState({ images })

    // Apply grid styles
    this.element.style.display = 'grid'
    this.element.style.gridTemplateColumns = `repeat(${config.columns}, 1fr)`
    this.element.style.gap = `${config.gap}px`

    // Click handlers
    if (config.lightbox) {
      imgElements.forEach((img, index) => {
        const handleClick = () => {
          this.openLightbox(index)
        }
        this.addEventListener(img, 'click', handleClick)
        ;(img as HTMLElement).style.cursor = 'pointer'
      })
    }

    // Keyboard navigation
    if (config.keyboard) {
      const handleKeydown = (e: Event) => {
        const ke = e as KeyboardEvent
        const state = this.state as ImageGalleryState

        if (!state.lightboxOpen) return

        if (ke.key === 'ArrowLeft' || ke.key === 'ArrowUp') {
          e.preventDefault()
          this.prev()
        } else if (ke.key === 'ArrowRight' || ke.key === 'ArrowDown') {
          e.preventDefault()
          this.next()
        } else if (ke.key === 'Escape') {
          this.closeLightbox()
        }
      }
      document.addEventListener('keydown', handleKeydown)
    }
  }

  private createLightbox(): void {
    if (this.lightboxEl) return

    const config = this.config as ImageGalleryConfig

    this.lightboxEl = document.createElement('div')
    this.lightboxEl.className = 'gallery-lightbox'
    this.lightboxEl.innerHTML = `
      <div class="gallery-lightbox-overlay" data-coral-gallery-close></div>
      <div class="gallery-lightbox-content">
        <button class="gallery-lightbox-close" data-coral-gallery-close aria-label="Close">×</button>
        <button class="gallery-lightbox-prev" data-coral-gallery-prev aria-label="Previous">‹</button>
        <img class="gallery-lightbox-image" />
        <button class="gallery-lightbox-next" data-coral-gallery-next aria-label="Next">›</button>
        <div class="gallery-lightbox-caption"></div>
        ${config.thumbnails ? '<div class="gallery-lightbox-thumbnails" data-coral-gallery-thumbnails></div>' : ''}
      </div>
    `

    document.body.appendChild(this.lightboxEl)

    // Bind lightbox events
    this.lightboxEl.querySelectorAll('[data-coral-gallery-close]').forEach((el) => {
      el.addEventListener('click', () => this.closeLightbox())
    })

    this.lightboxEl.querySelector('[data-coral-gallery-prev]')?.addEventListener('click', () => this.prev())
    this.lightboxEl.querySelector('[data-coral-gallery-next]')?.addEventListener('click', () => this.next())

    // Thumbnails
    if (config.thumbnails) {
      this.thumbnailsEl = this.lightboxEl.querySelector('[data-coral-gallery-thumbnails]')
      this.renderThumbnails()
    }
  }

  private renderThumbnails(): void {
    if (!this.thumbnailsEl) return

    const state = this.state as ImageGalleryState
    this.thumbnailsEl.innerHTML = ''

    state.images.forEach((image, index) => {
      const thumb = document.createElement('img')
      thumb.src = image.src
      thumb.alt = image.alt || ''
      thumb.className = 'gallery-lightbox-thumbnail'
      thumb.dataset.index = String(index)

      if (index === state.currentIndex) {
        thumb.dataset.active = ''
      }

      thumb.addEventListener('click', () => {
        this.goTo(index)
      })

      this.thumbnailsEl!.appendChild(thumb)
    })
  }

  private updateLightbox(): void {
    if (!this.lightboxEl) return

    const state = this.state as ImageGalleryState
    const currentImage = state.images[state.currentIndex]

    if (!currentImage) return

    const img = this.lightboxEl.querySelector('.gallery-lightbox-image') as HTMLImageElement
    const caption = this.lightboxEl.querySelector('.gallery-lightbox-caption')

    if (img) {
      img.src = currentImage.src
      img.alt = currentImage.alt || ''
    }

    if (caption) {
      caption.textContent = currentImage.caption || '';
      (caption as HTMLElement).style.display = currentImage.caption ? '' : 'none'
    }

    // Update thumbnails
    if (this.thumbnailsEl) {
      const thumbs = this.thumbnailsEl.querySelectorAll('.gallery-lightbox-thumbnail')
      thumbs.forEach((thumb, index) => {
        if (index === state.currentIndex) {
          (thumb as HTMLElement).dataset.active = ''
        } else {
          delete (thumb as HTMLElement).dataset.active
        }
      })
    }
  }

  protected override render(): void {
    const state = this.state as ImageGalleryState

    if (this.lightboxEl) {
      this.lightboxEl.dataset.open = String(state.lightboxOpen)
      if (state.lightboxOpen) {
        this.updateLightbox()
      }
    }
  }

  openLightbox(index: number): void {
    this.createLightbox()
    this.setState({
      currentIndex: index,
      lightboxOpen: true,
    })
    this.lockScroll()
    this.dispatch('lightbox-open', { index })
  }

  closeLightbox(): void {
    this.setState({ lightboxOpen: false })
    this.unlockScroll()
    this.dispatch('lightbox-close')
  }

  next(): void {
    const config = this.config as ImageGalleryConfig
    const state = this.state as ImageGalleryState
    let nextIndex = state.currentIndex + 1

    if (nextIndex >= state.images.length) {
      nextIndex = config.loop ? 0 : state.images.length - 1
    }

    this.goTo(nextIndex)
  }

  prev(): void {
    const config = this.config as ImageGalleryConfig
    const state = this.state as ImageGalleryState
    let prevIndex = state.currentIndex - 1

    if (prevIndex < 0) {
      prevIndex = config.loop ? state.images.length - 1 : 0
    }

    this.goTo(prevIndex)
  }

  goTo(index: number): void {
    const state = this.state as ImageGalleryState
    if (index >= 0 && index < state.images.length) {
      this.setState({ currentIndex: index })
      this.dispatch('change', { index })
    }
  }

  override destroy(): void {
    if (this.lightboxEl) {
      this.lightboxEl.remove()
    }
    super.destroy()
  }
}

export const createImageGallery = createComponentFactory(ImageGallery)
export default ImageGallery
