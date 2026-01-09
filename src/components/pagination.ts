/**
 * Pagination Component
 *
 * Accessible pagination component.
 * @module components/pagination
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Pagination configuration
 */
export interface PaginationConfig extends ComponentConfig {
  /**
   * Current page (1-indexed)
   * @default 1
   */
  currentPage?: number

  /**
   * Total number of pages
   * @default 1
   */
  totalPages?: number

  /**
   * Total number of items (alternative to totalPages)
   */
  totalItems?: number

  /**
   * Items per page (used with totalItems)
   * @default 10
   */
  itemsPerPage?: number

  /**
   * Number of page buttons to show
   * @default 5
   */
  siblingCount?: number

  /**
   * Show first/last buttons
   * @default true
   */
  showFirstLast?: boolean

  /**
   * Show prev/next buttons
   * @default true
   */
  showPrevNext?: boolean

  /**
   * Show page numbers
   * @default true
   */
  showNumbers?: boolean

  /**
   * Labels for buttons
   */
  labels?: {
    first?: string
    previous?: string
    next?: string
    last?: string
    page?: string
  }

  /**
   * List element selector
   * @default '[data-coral-pagination-list]'
   */
  listSelector?: string

  /**
   * Page button selector
   * @default '[data-coral-pagination-page]'
   */
  pageSelector?: string

  /**
   * Previous button selector
   * @default '[data-coral-pagination-prev]'
   */
  prevSelector?: string

  /**
   * Next button selector
   * @default '[data-coral-pagination-next]'
   */
  nextSelector?: string

  /**
   * First button selector
   * @default '[data-coral-pagination-first]'
   */
  firstSelector?: string

  /**
   * Last button selector
   * @default '[data-coral-pagination-last]'
   */
  lastSelector?: string
}

/**
 * Pagination state
 */
export interface PaginationState extends ComponentState {
  currentPage: number
  totalPages: number
  pages: (number | 'ellipsis')[]
}

/**
 * Pagination component
 *
 * @example
 * ```html
 * <nav data-coral-pagination aria-label="Pagination">
 *   <ul data-coral-pagination-list>
 *     <li><button data-coral-pagination-first>&laquo;</button></li>
 *     <li><button data-coral-pagination-prev>&lsaquo;</button></li>
 *     <li><button data-coral-pagination-page data-page="1">1</button></li>
 *     <li><button data-coral-pagination-page data-page="2">2</button></li>
 *     <li><button data-coral-pagination-page data-page="3">3</button></li>
 *     <li><button data-coral-pagination-next>&rsaquo;</button></li>
 *     <li><button data-coral-pagination-last>&raquo;</button></li>
 *   </ul>
 * </nav>
 * ```
 */
export class Pagination extends BaseComponent {
  protected declare config: PaginationConfig
  protected declare state: PaginationState

  private list: HTMLElement | null = null
  private prevBtn: HTMLElement | null = null
  private nextBtn: HTMLElement | null = null
  private firstBtn: HTMLElement | null = null
  private lastBtn: HTMLElement | null = null
  private pageButtons: HTMLElement[] = []

  protected getDefaultConfig(): PaginationConfig {
    return {
      currentPage: 1,
      totalPages: 1,
      itemsPerPage: 10,
      siblingCount: 1,
      showFirstLast: true,
      showPrevNext: true,
      showNumbers: true,
      labels: {
        first: 'First',
        previous: 'Previous',
        next: 'Next',
        last: 'Last',
        page: 'Page',
      },
      listSelector: '[data-coral-pagination-list]',
      pageSelector: '[data-coral-pagination-page]',
      prevSelector: '[data-coral-pagination-prev]',
      nextSelector: '[data-coral-pagination-next]',
      firstSelector: '[data-coral-pagination-first]',
      lastSelector: '[data-coral-pagination-last]',
    }
  }

  protected getInitialState(): PaginationState {
    let totalPages = this.config.totalPages ?? 1

    // Calculate from totalItems if provided
    if (this.config.totalItems) {
      totalPages = Math.ceil(this.config.totalItems / (this.config.itemsPerPage ?? 10))
    }

    const currentPage = Math.max(1, Math.min(this.config.currentPage ?? 1, totalPages))

    return {
      currentPage,
      totalPages,
      pages: this.calculatePages(currentPage, totalPages),
    }
  }

  protected setupAria(): void {
    this.list = this.query(this.config.listSelector!)
    this.prevBtn = this.query(this.config.prevSelector!)
    this.nextBtn = this.query(this.config.nextSelector!)
    this.firstBtn = this.query(this.config.firstSelector!)
    this.lastBtn = this.query(this.config.lastSelector!)
    this.pageButtons = Array.from(this.queryAll(this.config.pageSelector!))

    // Set up nav ARIA
    if (this.element.tagName === 'NAV') {
      if (!this.element.getAttribute('aria-label')) {
        this.element.setAttribute('aria-label', 'Pagination')
      }
    } else {
      this.element.setAttribute('role', 'navigation')
      this.element.setAttribute('aria-label', 'Pagination')
    }

    // Set up list ARIA
    if (this.list) {
      this.list.setAttribute('role', 'list')
    }

    // Set up navigation buttons
    if (this.firstBtn) {
      this.firstBtn.setAttribute('aria-label', this.config.labels?.first ?? 'First')
    }
    if (this.prevBtn) {
      this.prevBtn.setAttribute('aria-label', this.config.labels?.previous ?? 'Previous')
    }
    if (this.nextBtn) {
      this.nextBtn.setAttribute('aria-label', this.config.labels?.next ?? 'Next')
    }
    if (this.lastBtn) {
      this.lastBtn.setAttribute('aria-label', this.config.labels?.last ?? 'Last')
    }

    // Initial render
    this.render()
  }

  protected bindEvents(): void {
    // First button
    if (this.firstBtn) {
      this.addEventListener(this.firstBtn, 'click', () => this.goToPage(1))
    }

    // Previous button
    if (this.prevBtn) {
      this.addEventListener(this.prevBtn, 'click', () => this.previous())
    }

    // Next button
    if (this.nextBtn) {
      this.addEventListener(this.nextBtn, 'click', () => this.next())
    }

    // Last button
    if (this.lastBtn) {
      this.addEventListener(this.lastBtn, 'click', () => this.goToPage(this.state.totalPages))
    }

    // Page buttons
    this.pageButtons.forEach((btn) => {
      this.addEventListener(btn, 'click', () => {
        const page = parseInt(btn.dataset.page ?? '1', 10)
        this.goToPage(page)
      })
    })

    // Keyboard navigation
    this.addEventListener(this.element, 'keydown', (e: Event) => {
      const keyEvent = e as KeyboardEvent
      switch (keyEvent.key) {
        case 'ArrowLeft':
          e.preventDefault()
          this.previous()
          break
        case 'ArrowRight':
          e.preventDefault()
          this.next()
          break
        case 'Home':
          e.preventDefault()
          this.goToPage(1)
          break
        case 'End':
          e.preventDefault()
          this.goToPage(this.state.totalPages)
          break
      }
    })
  }

  private calculatePages(currentPage: number, totalPages: number): (number | 'ellipsis')[] {
    const siblingCount = this.config.siblingCount ?? 1
    const pages: (number | 'ellipsis')[] = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const leftSibling = Math.max(2, currentPage - siblingCount)
    const rightSibling = Math.min(totalPages - 1, currentPage + siblingCount)

    // Add left ellipsis if needed
    if (leftSibling > 2) {
      pages.push('ellipsis')
    }

    // Add pages in range
    for (let i = leftSibling; i <= rightSibling; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i)
      }
    }

    // Add right ellipsis if needed
    if (rightSibling < totalPages - 1) {
      pages.push('ellipsis')
    }

    // Always show last page if more than 1 page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  protected override render(): void {
    const { currentPage, totalPages } = this.state

    // Update navigation button states
    if (this.firstBtn) {
      this.firstBtn.toggleAttribute('disabled', currentPage === 1)
      this.firstBtn.setAttribute('aria-disabled', String(currentPage === 1))
    }
    if (this.prevBtn) {
      this.prevBtn.toggleAttribute('disabled', currentPage === 1)
      this.prevBtn.setAttribute('aria-disabled', String(currentPage === 1))
    }
    if (this.nextBtn) {
      this.nextBtn.toggleAttribute('disabled', currentPage === totalPages)
      this.nextBtn.setAttribute('aria-disabled', String(currentPage === totalPages))
    }
    if (this.lastBtn) {
      this.lastBtn.toggleAttribute('disabled', currentPage === totalPages)
      this.lastBtn.setAttribute('aria-disabled', String(currentPage === totalPages))
    }

    // Update page buttons
    this.pageButtons.forEach((btn) => {
      const page = parseInt(btn.dataset.page ?? '1', 10)
      const isCurrent = page === currentPage

      btn.toggleAttribute('data-current', isCurrent)
      btn.setAttribute('aria-current', isCurrent ? 'page' : 'false')
      btn.setAttribute('aria-label', `${this.config.labels?.page} ${page}`)
    })
  }

  /**
   * Go to a specific page
   */
  goToPage(page: number): void {
    const { totalPages } = this.state
    const newPage = Math.max(1, Math.min(page, totalPages))

    if (newPage === this.state.currentPage) {return}

    const prevPage = this.state.currentPage
    this.setState({
      currentPage: newPage,
      pages: this.calculatePages(newPage, totalPages),
    })

    this.dispatch('change', { page: newPage, previousPage: prevPage })
  }

  /**
   * Go to next page
   */
  next(): void {
    if (this.state.currentPage < this.state.totalPages) {
      this.goToPage(this.state.currentPage + 1)
    }
  }

  /**
   * Go to previous page
   */
  previous(): void {
    if (this.state.currentPage > 1) {
      this.goToPage(this.state.currentPage - 1)
    }
  }

  /**
   * Go to first page
   */
  first(): void {
    this.goToPage(1)
  }

  /**
   * Go to last page
   */
  last(): void {
    this.goToPage(this.state.totalPages)
  }

  /**
   * Get current page
   */
  getCurrentPage(): number {
    return this.state.currentPage
  }

  /**
   * Get total pages
   */
  getTotalPages(): number {
    return this.state.totalPages
  }

  /**
   * Update total pages
   */
  setTotalPages(totalPages: number): void {
    const newTotal = Math.max(1, totalPages)
    const newCurrent = Math.min(this.state.currentPage, newTotal)

    this.setState({
      totalPages: newTotal,
      currentPage: newCurrent,
      pages: this.calculatePages(newCurrent, newTotal),
    })
  }

  /**
   * Update total items
   */
  setTotalItems(totalItems: number): void {
    const itemsPerPage = this.config.itemsPerPage ?? 10
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    this.setTotalPages(totalPages)
  }

  /**
   * Check if can go to previous page
   */
  canGoPrevious(): boolean {
    return this.state.currentPage > 1
  }

  /**
   * Check if can go to next page
   */
  canGoNext(): boolean {
    return this.state.currentPage < this.state.totalPages
  }
}

/**
 * Create a pagination instance
 */
export const createPagination = createComponentFactory(Pagination)

export default Pagination
