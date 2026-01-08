/**
 * DataTable Component
 *
 * Advanced data table with virtual scrolling, filtering, and pagination.
 * @module components/data-table
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface DataTableColumn {
  key: string
  header: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  align?: 'left' | 'center' | 'right'
  render?: (value: unknown, row: Record<string, unknown>) => string
}

export interface DataTableConfig extends ComponentConfig {
  /** Column definitions */
  columns?: DataTableColumn[]
  /** Page size */
  pageSize?: number
  /** Show pagination */
  pagination?: boolean
  /** Allow sorting */
  sortable?: boolean
  /** Allow filtering */
  filterable?: boolean
  /** Allow row selection */
  selectable?: boolean
  /** Selection type */
  selectionType?: 'single' | 'multiple'
  /** Striped rows */
  striped?: boolean
  /** Show borders */
  bordered?: boolean
  /** Compact mode */
  compact?: boolean
}

export interface DataTableState extends ComponentState {
  data: Record<string, unknown>[]
  filteredData: Record<string, unknown>[]
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  currentPage: number
  selectedRows: Set<number>
  filters: Record<string, string>
}

/**
 * DataTable component for advanced data display
 */
export class DataTable extends BaseComponent {
  private tableEl: HTMLElement | null = null
  private headerEl: HTMLElement | null = null
  private bodyEl: HTMLElement | null = null
  private paginationEl: HTMLElement | null = null
  private filterInputs: Map<string, HTMLInputElement> = new Map()

  protected getDefaultConfig(): DataTableConfig {
    return {
      columns: [],
      pageSize: 10,
      pagination: true,
      sortable: true,
      filterable: false,
      selectable: false,
      selectionType: 'multiple',
      striped: true,
      bordered: false,
      compact: false,
    }
  }

  protected getInitialState(): DataTableState {
    return {
      data: [],
      filteredData: [],
      sortColumn: null,
      sortDirection: 'asc',
      currentPage: 1,
      selectedRows: new Set(),
      filters: {},
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-label', 'Data table')
  }

  protected bindEvents(): void {
    this.tableEl = this.query('[data-coral-data-table-container]') || this.element
    this.headerEl = this.query('[data-coral-data-table-header]')
    this.bodyEl = this.query('[data-coral-data-table-body]')
    this.paginationEl = this.query('[data-coral-data-table-pagination]')

    // Parse data from table if exists
    const existingRows = this.queryAll('tbody tr')
    if (existingRows.length > 0) {
      const columns = (this.config as DataTableConfig).columns || []
      const data = Array.from(existingRows).map((row) => {
        const cells = row.querySelectorAll('td')
        const rowData: Record<string, unknown> = {}
        columns.forEach((col, index) => {
          rowData[col.key] = cells[index]?.textContent?.trim() || ''
        })
        return rowData
      })
      this.setData(data)
    }

    this.render()
  }

  protected override render(): void {
    const config = this.config as DataTableConfig
    const state = this.state as DataTableState

    this.element.dataset.striped = String(config.striped)
    this.element.dataset.bordered = String(config.bordered)
    this.element.dataset.compact = String(config.compact)

    this.renderTable()

    if (config.pagination) {
      this.renderPagination()
    }
  }

  private renderTable(): void {
    if (!this.tableEl) return

    const config = this.config as DataTableConfig
    const state = this.state as DataTableState
    const columns = config.columns || []

    // Calculate paginated data
    const startIndex = (state.currentPage - 1) * config.pageSize!
    const paginatedData = state.filteredData.slice(startIndex, startIndex + config.pageSize!)

    let html = '<table class="data-table">'

    // Header
    html += '<thead><tr>'
    if (config.selectable) {
      html += `<th class="data-table-select-col">
        <input type="checkbox" data-action="select-all" ${this.isAllSelected() ? 'checked' : ''} />
      </th>`
    }
    columns.forEach((col) => {
      const isSorted = state.sortColumn === col.key
      const sortIcon = isSorted ? (state.sortDirection === 'asc' ? ' ↑' : ' ↓') : ''
      const sortable = config.sortable && col.sortable !== false
      html += `<th
        style="width: ${col.width || 'auto'}; text-align: ${col.align || 'left'}"
        ${sortable ? `data-action="sort" data-column="${col.key}"` : ''}
        class="${sortable ? 'sortable' : ''} ${isSorted ? 'sorted' : ''}"
      >${col.header}${sortIcon}</th>`
    })
    html += '</tr>'

    // Filters
    if (config.filterable) {
      html += '<tr class="data-table-filters">'
      if (config.selectable) {
        html += '<th></th>'
      }
      columns.forEach((col) => {
        if (col.filterable !== false) {
          html += `<th><input type="text" placeholder="Filter..." data-filter="${col.key}" value="${state.filters[col.key] || ''}" /></th>`
        } else {
          html += '<th></th>'
        }
      })
      html += '</tr>'
    }
    html += '</thead>'

    // Body
    html += '<tbody>'
    if (paginatedData.length === 0) {
      html += `<tr><td colspan="${columns.length + (config.selectable ? 1 : 0)}" class="data-table-empty">No data available</td></tr>`
    } else {
      paginatedData.forEach((row, index) => {
        const rowIndex = startIndex + index
        const isSelected = state.selectedRows.has(rowIndex)
        html += `<tr data-row-index="${rowIndex}" class="${isSelected ? 'selected' : ''}">`
        if (config.selectable) {
          html += `<td class="data-table-select-col">
            <input type="checkbox" data-action="select-row" data-row-index="${rowIndex}" ${isSelected ? 'checked' : ''} />
          </td>`
        }
        columns.forEach((col) => {
          const value = row[col.key]
          const rendered = col.render ? col.render(value, row) : String(value ?? '')
          html += `<td style="text-align: ${col.align || 'left'}">${rendered}</td>`
        })
        html += '</tr>'
      })
    }
    html += '</tbody></table>'

    this.tableEl.innerHTML = html

    // Bind events
    this.bindTableEvents()
  }

  private bindTableEvents(): void {
    const config = this.config as DataTableConfig

    // Sort
    const sortHeaders = this.tableEl?.querySelectorAll('[data-action="sort"]')
    sortHeaders?.forEach((header) => {
      header.addEventListener('click', () => {
        const column = (header as HTMLElement).dataset.column
        if (column) {
          this.sort(column)
        }
      })
    })

    // Filters
    const filterInputs = this.tableEl?.querySelectorAll('[data-filter]')
    filterInputs?.forEach((input) => {
      const key = (input as HTMLElement).dataset.filter!
      this.filterInputs.set(key, input as HTMLInputElement)

      input.addEventListener('input', () => {
        this.setFilter(key, (input as HTMLInputElement).value)
      })
    })

    // Selection
    if (config.selectable) {
      const selectAll = this.tableEl?.querySelector('[data-action="select-all"]')
      selectAll?.addEventListener('change', () => {
        if ((selectAll as HTMLInputElement).checked) {
          this.selectAll()
        } else {
          this.deselectAll()
        }
      })

      const rowCheckboxes = this.tableEl?.querySelectorAll('[data-action="select-row"]')
      rowCheckboxes?.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
          const rowIndex = parseInt((checkbox as HTMLElement).dataset.rowIndex!)
          this.toggleRowSelection(rowIndex)
        })
      })
    }
  }

  private renderPagination(): void {
    if (!this.paginationEl) {
      this.paginationEl = document.createElement('div')
      this.paginationEl.className = 'data-table-pagination'
      this.element.appendChild(this.paginationEl)
    }

    const config = this.config as DataTableConfig
    const state = this.state as DataTableState
    const totalPages = Math.ceil(state.filteredData.length / config.pageSize!)
    const startItem = (state.currentPage - 1) * config.pageSize! + 1
    const endItem = Math.min(state.currentPage * config.pageSize!, state.filteredData.length)

    let html = `
      <span class="data-table-info">
        Showing ${state.filteredData.length === 0 ? 0 : startItem} to ${endItem} of ${state.filteredData.length} entries
      </span>
      <div class="data-table-page-controls">
        <button data-action="first-page" ${state.currentPage === 1 ? 'disabled' : ''}>«</button>
        <button data-action="prev-page" ${state.currentPage === 1 ? 'disabled' : ''}>‹</button>
        <span class="data-table-page-info">Page ${state.currentPage} of ${totalPages || 1}</span>
        <button data-action="next-page" ${state.currentPage >= totalPages ? 'disabled' : ''}>›</button>
        <button data-action="last-page" ${state.currentPage >= totalPages ? 'disabled' : ''}>»</button>
      </div>
    `

    this.paginationEl.innerHTML = html

    // Bind pagination events
    this.paginationEl.querySelector('[data-action="first-page"]')?.addEventListener('click', () => this.goToPage(1))
    this.paginationEl.querySelector('[data-action="prev-page"]')?.addEventListener('click', () => this.prevPage())
    this.paginationEl.querySelector('[data-action="next-page"]')?.addEventListener('click', () => this.nextPage())
    this.paginationEl.querySelector('[data-action="last-page"]')?.addEventListener('click', () => this.goToPage(totalPages))
  }

  private isAllSelected(): boolean {
    const state = this.state as DataTableState
    return state.filteredData.length > 0 && state.selectedRows.size === state.filteredData.length
  }

  setData(data: Record<string, unknown>[]): void {
    this.setState({
      data,
      filteredData: data,
      currentPage: 1,
      selectedRows: new Set(),
    })
    this.applyFiltersAndSort()
  }

  private applyFiltersAndSort(): void {
    const config = this.config as DataTableConfig
    const state = this.state as DataTableState
    let filtered = [...state.data]

    // Apply filters
    Object.entries(state.filters).forEach(([key, value]) => {
      if (value) {
        filtered = filtered.filter((row) => {
          const cellValue = String(row[key] ?? '').toLowerCase()
          return cellValue.includes(value.toLowerCase())
        })
      }
    })

    // Apply sort
    if (state.sortColumn) {
      filtered.sort((a, b) => {
        const aVal = a[state.sortColumn!]
        const bVal = b[state.sortColumn!]
        let comparison = 0

        if (aVal === null || aVal === undefined) comparison = 1
        else if (bVal === null || bVal === undefined) comparison = -1
        else if (typeof aVal === 'number' && typeof bVal === 'number') {
          comparison = aVal - bVal
        } else {
          comparison = String(aVal).localeCompare(String(bVal))
        }

        return state.sortDirection === 'desc' ? -comparison : comparison
      })
    }

    this.setState({ filteredData: filtered })
  }

  sort(column: string): void {
    const state = this.state as DataTableState
    const newDirection = state.sortColumn === column && state.sortDirection === 'asc' ? 'desc' : 'asc'

    this.setState({
      sortColumn: column,
      sortDirection: newDirection,
    })
    this.applyFiltersAndSort()
    this.dispatch('sort', { column, direction: newDirection })
  }

  setFilter(column: string, value: string): void {
    const state = this.state as DataTableState
    const newFilters = { ...state.filters, [column]: value }

    this.setState({
      filters: newFilters,
      currentPage: 1,
    })
    this.applyFiltersAndSort()
    this.dispatch('filter', { column, value, filters: newFilters })
  }

  goToPage(page: number): void {
    const config = this.config as DataTableConfig
    const state = this.state as DataTableState
    const totalPages = Math.ceil(state.filteredData.length / config.pageSize!)

    if (page >= 1 && page <= totalPages) {
      this.setState({ currentPage: page })
      this.dispatch('page-change', { page })
    }
  }

  nextPage(): void {
    this.goToPage((this.state as DataTableState).currentPage + 1)
  }

  prevPage(): void {
    this.goToPage((this.state as DataTableState).currentPage - 1)
  }

  toggleRowSelection(rowIndex: number): void {
    const config = this.config as DataTableConfig
    const state = this.state as DataTableState
    const newSelected = new Set(state.selectedRows)

    if (config.selectionType === 'single') {
      newSelected.clear()
      if (!state.selectedRows.has(rowIndex)) {
        newSelected.add(rowIndex)
      }
    } else {
      if (newSelected.has(rowIndex)) {
        newSelected.delete(rowIndex)
      } else {
        newSelected.add(rowIndex)
      }
    }

    this.setState({ selectedRows: newSelected })
    this.dispatch('selection-change', { selectedRows: Array.from(newSelected) })
  }

  selectAll(): void {
    const state = this.state as DataTableState
    const newSelected = new Set<number>()
    state.filteredData.forEach((_, index) => newSelected.add(index))
    this.setState({ selectedRows: newSelected })
    this.dispatch('selection-change', { selectedRows: Array.from(newSelected) })
  }

  deselectAll(): void {
    this.setState({ selectedRows: new Set() })
    this.dispatch('selection-change', { selectedRows: [] })
  }

  getSelectedRows(): Record<string, unknown>[] {
    const state = this.state as DataTableState
    return Array.from(state.selectedRows).map((index) => state.filteredData[index]!)
  }

  getData(): Record<string, unknown>[] {
    return [...(this.state as DataTableState).data]
  }

  getFilteredData(): Record<string, unknown>[] {
    return [...(this.state as DataTableState).filteredData]
  }
}

export const createDataTable = createComponentFactory(DataTable)
export default DataTable
