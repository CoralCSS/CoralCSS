/**
 * Breadcrumb Component
 *
 * Accessible breadcrumb navigation component.
 * @module components/breadcrumb
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

/**
 * Breadcrumb item
 */
export interface BreadcrumbItem {
  label: string
  href?: string
  icon?: string
  current?: boolean
}

/**
 * Breadcrumb configuration
 */
export interface BreadcrumbConfig extends ComponentConfig {
  /**
   * Breadcrumb items
   */
  items?: BreadcrumbItem[]

  /**
   * Custom separator
   * @default '/'
   */
  separator?: string

  /**
   * Maximum items to show (rest collapsed)
   * @default 0 (no limit)
   */
  maxItems?: number

  /**
   * Collapse behavior
   * @default 'middle'
   */
  collapseFrom?: 'start' | 'middle' | 'end'

  /**
   * List element selector
   * @default '[data-coral-breadcrumb-list]'
   */
  listSelector?: string

  /**
   * Item element selector
   * @default '[data-coral-breadcrumb-item]'
   */
  itemSelector?: string

  /**
   * Link element selector
   * @default '[data-coral-breadcrumb-link]'
   */
  linkSelector?: string

  /**
   * Separator element selector
   * @default '[data-coral-breadcrumb-separator]'
   */
  separatorSelector?: string
}

/**
 * Breadcrumb state
 */
export interface BreadcrumbState extends ComponentState {
  collapsed: boolean
  visibleItems: BreadcrumbItem[]
}

/**
 * Breadcrumb component
 *
 * @example
 * ```html
 * <nav data-coral-breadcrumb aria-label="Breadcrumb">
 *   <ol data-coral-breadcrumb-list>
 *     <li data-coral-breadcrumb-item>
 *       <a data-coral-breadcrumb-link href="/">Home</a>
 *       <span data-coral-breadcrumb-separator>/</span>
 *     </li>
 *     <li data-coral-breadcrumb-item>
 *       <a data-coral-breadcrumb-link href="/products">Products</a>
 *       <span data-coral-breadcrumb-separator>/</span>
 *     </li>
 *     <li data-coral-breadcrumb-item data-current="true">
 *       <span data-coral-breadcrumb-link aria-current="page">Details</span>
 *     </li>
 *   </ol>
 * </nav>
 * ```
 */
export class Breadcrumb extends BaseComponent {
  protected declare config: BreadcrumbConfig
  protected declare state: BreadcrumbState

  private list: HTMLElement | null = null
  private items: HTMLElement[] = []

  protected getDefaultConfig(): BreadcrumbConfig {
    return {
      items: [],
      separator: '/',
      maxItems: 0,
      collapseFrom: 'middle',
      listSelector: '[data-coral-breadcrumb-list]',
      itemSelector: '[data-coral-breadcrumb-item]',
      linkSelector: '[data-coral-breadcrumb-link]',
      separatorSelector: '[data-coral-breadcrumb-separator]',
    }
  }

  protected getInitialState(): BreadcrumbState {
    return {
      collapsed: false,
      visibleItems: this.config.items ?? [],
    }
  }

  protected setupAria(): void {
    this.list = this.query(this.config.listSelector!)
    this.items = Array.from(this.queryAll(this.config.itemSelector!))

    // Set up nav ARIA
    if (this.element.tagName === 'NAV') {
      if (!this.element.getAttribute('aria-label')) {
        this.element.setAttribute('aria-label', 'Breadcrumb')
      }
    } else {
      this.element.setAttribute('role', 'navigation')
      this.element.setAttribute('aria-label', 'Breadcrumb')
    }

    // Set up list ARIA
    if (this.list) {
      this.list.setAttribute('role', 'list')
    }

    // Build items from DOM if not in config
    if (!this.config.items?.length && this.items.length) {
      this.config.items = this.items.map((item) => {
        const link = item.querySelector(this.config.linkSelector!) as HTMLElement
        return {
          label: link?.textContent?.trim() ?? '',
          href: link?.getAttribute('href') ?? undefined,
          current: item.hasAttribute('data-current'),
        }
      })
      this.state.visibleItems = this.config.items
    }

    // Set up items ARIA
    this.items.forEach((item, index) => {
      item.setAttribute('role', 'listitem')

      const link = item.querySelector(this.config.linkSelector!) as HTMLElement
      const isLast = index === this.items.length - 1

      if (link) {
        if (isLast || item.hasAttribute('data-current')) {
          link.setAttribute('aria-current', 'page')
          link.removeAttribute('href')
        }
      }
    })

    // Apply collapse if needed
    this.applyCollapse()
  }

  protected bindEvents(): void {
    // Breadcrumb is mostly static, but we can handle collapse expansion
    const ellipsis = this.query('[data-coral-breadcrumb-ellipsis]')
    if (ellipsis) {
      this.addEventListener(ellipsis, 'click', () => {
        this.expand()
      })
    }
  }

  private applyCollapse(): void {
    const { maxItems, collapseFrom } = this.config
    const items = this.config.items ?? []

    if (!maxItems || items.length <= maxItems) {
      this.setState({ collapsed: false, visibleItems: items })
      return
    }

    this.setState({ collapsed: true })

    let visibleItems: BreadcrumbItem[]
    const ellipsisItem: BreadcrumbItem = { label: '...', current: false }

    switch (collapseFrom) {
      case 'start':
        visibleItems = [ellipsisItem, ...items.slice(-(maxItems - 1))]
        break

      case 'end':
        visibleItems = [...items.slice(0, maxItems - 1), ellipsisItem]
        break

      case 'middle':
      default:
        const startCount = Math.ceil((maxItems - 1) / 2)
        const endCount = maxItems - 1 - startCount
        visibleItems = [
          ...items.slice(0, startCount),
          ellipsisItem,
          ...items.slice(-endCount),
        ]
        break
    }

    this.setState({ visibleItems })

    // Update DOM visibility
    this.items.forEach((item, index) => {
      const isVisible = this.isItemVisible(index, maxItems, collapseFrom!, items.length)
      item.style.display = isVisible ? '' : 'none'
    })

    // Insert ellipsis element if not exists
    this.insertEllipsis()
  }

  private isItemVisible(
    index: number,
    maxItems: number,
    collapseFrom: 'start' | 'middle' | 'end',
    totalItems: number
  ): boolean {
    switch (collapseFrom) {
      case 'start':
        return index >= totalItems - (maxItems - 1)

      case 'end':
        return index < maxItems - 1

      case 'middle':
      default:
        const startCount = Math.ceil((maxItems - 1) / 2)
        const endCount = maxItems - 1 - startCount
        return index < startCount || index >= totalItems - endCount
    }
  }

  private insertEllipsis(): void {
    if (!this.list || !this.state.collapsed) {return}

    // Check if ellipsis already exists
    let ellipsis = this.query('[data-coral-breadcrumb-ellipsis]')
    if (ellipsis) {return}

    // Create ellipsis element
    ellipsis = document.createElement('li')
    ellipsis.setAttribute('data-coral-breadcrumb-ellipsis', '')
    ellipsis.setAttribute('role', 'listitem')
    ellipsis.innerHTML = `
      <button type="button" aria-label="Show hidden items">
        <span>...</span>
      </button>
      <span data-coral-breadcrumb-separator>${this.config.separator}</span>
    `

    // Insert at appropriate position
    const { collapseFrom, maxItems } = this.config
    const visibleItems = this.items.filter((item) => item.style.display !== 'none')

    if (collapseFrom === 'start') {
      const firstVisible = visibleItems[0]
      if (firstVisible) {
        this.list.insertBefore(ellipsis, firstVisible)
      }
    } else if (collapseFrom === 'end') {
      const lastVisible = visibleItems[visibleItems.length - 1]
      if (lastVisible?.nextSibling) {
        this.list.insertBefore(ellipsis, lastVisible.nextSibling)
      } else if (lastVisible) {
        this.list.appendChild(ellipsis)
      }
    } else {
      // Middle
      const startCount = Math.ceil((maxItems! - 1) / 2)
      const afterItem = visibleItems[startCount - 1]
      if (afterItem?.nextSibling) {
        this.list.insertBefore(ellipsis, afterItem.nextSibling)
      }
    }

    // Bind click to expand
    const button = ellipsis.querySelector('button')
    if (button) {
      this.addEventListener(button, 'click', () => this.expand())
    }
  }

  /**
   * Expand collapsed items
   */
  expand(): void {
    if (!this.state.collapsed) {return}

    this.setState({ collapsed: false, visibleItems: this.config.items ?? [] })

    // Show all items
    this.items.forEach((item) => {
      item.style.display = ''
    })

    // Remove ellipsis
    const ellipsis = this.query('[data-coral-breadcrumb-ellipsis]')
    ellipsis?.remove()

    this.dispatch('expand')
  }

  /**
   * Collapse items
   */
  collapse(): void {
    this.applyCollapse()
    this.dispatch('collapse')
  }

  /**
   * Get current (last) item
   */
  getCurrent(): BreadcrumbItem | undefined {
    const items = this.config.items ?? []
    return items[items.length - 1]
  }

  /**
   * Update items programmatically
   */
  setItems(items: BreadcrumbItem[]): void {
    this.config.items = items
    this.setState({ visibleItems: items })
    this.applyCollapse()
    this.dispatch('change', { items })
  }

  /**
   * Add an item
   */
  addItem(item: BreadcrumbItem): void {
    const items = [...(this.config.items ?? []), item]

    // Update previous last item
    if (items.length > 1) {
      const prevItem = items[items.length - 2]
      if (prevItem) {
        prevItem.current = false
      }
    }
    item.current = true

    this.setItems(items)
  }

  /**
   * Remove the last item (go back)
   */
  removeItem(): BreadcrumbItem | undefined {
    const items = [...(this.config.items ?? [])]
    const removed = items.pop()

    if (items.length > 0) {
      const lastItem = items[items.length - 1]
      if (lastItem) {
        lastItem.current = true
      }
    }

    this.setItems(items)
    return removed
  }
}

/**
 * Create a breadcrumb instance
 */
export const createBreadcrumb = createComponentFactory(Breadcrumb)

export default Breadcrumb
