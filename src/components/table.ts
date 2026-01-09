/**
 * Table Component
 *
 * Accessible data table with sorting and selection.
 * @module components/table
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface TableConfig extends ComponentConfig {
  /** Enable row selection */
  selectable?: boolean
  /** Selection type */
  selectionType?: 'single' | 'multiple'
  /** Enable sorting */
  sortable?: boolean
  /** Initial sort column */
  sortColumn?: string
  /** Initial sort direction */
  sortDirection?: 'asc' | 'desc'
  /** Striped rows */
  striped?: boolean
  /** Hover effect on rows */
  hoverable?: boolean
}

export interface TableState extends ComponentState {
  selectedRows: Set<string>
  sortColumn: string | null
  sortDirection: 'asc' | 'desc'
  allSelected: boolean
}

/**
 * Table component for data display
 */
export class Table extends BaseComponent {
  private headers: HTMLElement[] = []
  private rows: HTMLElement[] = []
  private selectAllCheckbox: HTMLInputElement | null = null

  protected getDefaultConfig(): TableConfig {
    return {
      selectable: false,
      selectionType: 'multiple',
      sortable: false,
      sortDirection: 'asc',
      striped: false,
      hoverable: true,
    }
  }

  protected getInitialState(): TableState {
    const config = this.config as TableConfig
    return {
      selectedRows: new Set(),
      sortColumn: config.sortColumn ?? null,
      sortDirection: config.sortDirection ?? 'asc',
      allSelected: false,
    }
  }

  protected setupAria(): void {
    const table = this.element.querySelector('table') || this.element
    table.setAttribute('role', 'grid')

    // Get headers
    this.headers = Array.from(this.element.querySelectorAll('[data-coral-table-header]'))
    this.headers.forEach((header) => {
      header.setAttribute('role', 'columnheader')
      const config = this.config as TableConfig
      if (config.sortable && header.dataset.sortable !== 'false') {
        header.setAttribute('aria-sort', 'none')
        header.setAttribute('tabindex', '0')
      }
    })

    // Get rows
    this.rows = Array.from(this.element.querySelectorAll('[data-coral-table-row]'))
    this.rows.forEach((row) => {
      row.setAttribute('role', 'row')
      const config = this.config as TableConfig
      if (config.selectable) {
        row.setAttribute('aria-selected', 'false')
        row.setAttribute('tabindex', '0')
      }
    })

    // Select all checkbox
    this.selectAllCheckbox = this.element.querySelector('[data-coral-table-select-all]')
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.setAttribute('aria-label', 'Select all rows')
    }
  }

  protected bindEvents(): void {
    const config = this.config as TableConfig

    // Sort headers
    if (config.sortable) {
      this.headers.forEach((header) => {
        if (header.dataset.sortable === 'false') {return}

        const handleSort = () => {
          const column = header.dataset.column
          if (column) {
            this.sort(column)
          }
        }

        this.addEventListener(header, 'click', handleSort)
        this.addEventListener(header, 'keydown', (e: Event) => {
          const ke = e as KeyboardEvent
          if (ke.key === 'Enter' || ke.key === ' ') {
            e.preventDefault()
            handleSort()
          }
        })
      })
    }

    // Row selection
    if (config.selectable) {
      this.rows.forEach((row) => {
        const handleSelect = () => {
          const rowId = row.dataset.rowId
          if (rowId) {
            this.toggleRowSelection(rowId)
          }
        }

        this.addEventListener(row, 'click', handleSelect)
        this.addEventListener(row, 'keydown', (e: Event) => {
          const ke = e as KeyboardEvent
          if (ke.key === 'Enter' || ke.key === ' ') {
            e.preventDefault()
            handleSelect()
          }
        })
      })

      // Select all
      if (this.selectAllCheckbox) {
        const handleSelectAll = () => {
          if ((this.state as TableState).allSelected) {
            this.deselectAll()
          } else {
            this.selectAll()
          }
        }
        this.addEventListener(this.selectAllCheckbox, 'change', handleSelectAll)
      }
    }
  }

  protected override render(): void {
    const state = this.state as TableState
    const config = this.config as TableConfig

    // Update striped/hoverable
    this.element.dataset.striped = String(config.striped)
    this.element.dataset.hoverable = String(config.hoverable)

    // Update headers
    this.headers.forEach((header) => {
      const column = header.dataset.column
      if (column === state.sortColumn) {
        header.setAttribute('aria-sort', state.sortDirection === 'asc' ? 'ascending' : 'descending')
        header.dataset.sorted = state.sortDirection
      } else {
        header.setAttribute('aria-sort', 'none')
        delete header.dataset.sorted
      }
    })

    // Update row selection
    this.rows.forEach((row) => {
      const rowId = row.dataset.rowId
      const isSelected = rowId ? state.selectedRows.has(rowId) : false
      row.setAttribute('aria-selected', String(isSelected))
      row.dataset.selected = String(isSelected)

      // Update row checkbox if present
      const checkbox = row.querySelector('[data-coral-table-select-row]') as HTMLInputElement
      if (checkbox) {
        checkbox.checked = isSelected
      }
    })

    // Update select all checkbox
    if (this.selectAllCheckbox) {
      this.selectAllCheckbox.checked = state.allSelected
      this.selectAllCheckbox.indeterminate = state.selectedRows.size > 0 && !state.allSelected
    }
  }

  sort(column: string): void {
    const state = this.state as TableState
    let direction: 'asc' | 'desc' = 'asc'

    if (state.sortColumn === column) {
      direction = state.sortDirection === 'asc' ? 'desc' : 'asc'
    }

    this.setState({ sortColumn: column, sortDirection: direction })
    this.dispatch('sort', { column, direction })
  }

  toggleRowSelection(rowId: string): void {
    const state = this.state as TableState
    const config = this.config as TableConfig
    const newSelected = new Set(state.selectedRows)

    if (config.selectionType === 'single') {
      newSelected.clear()
      if (!state.selectedRows.has(rowId)) {
        newSelected.add(rowId)
      }
    } else {
      if (newSelected.has(rowId)) {
        newSelected.delete(rowId)
      } else {
        newSelected.add(rowId)
      }
    }

    const allSelected = newSelected.size === this.rows.length && this.rows.length > 0

    this.setState({ selectedRows: newSelected, allSelected })
    this.dispatch('selection-change', { selectedRows: Array.from(newSelected) })
  }

  selectAll(): void {
    const newSelected = new Set<string>()
    this.rows.forEach((row) => {
      const rowId = row.dataset.rowId
      if (rowId) {
        newSelected.add(rowId)
      }
    })

    this.setState({ selectedRows: newSelected, allSelected: true })
    this.dispatch('selection-change', { selectedRows: Array.from(newSelected) })
  }

  deselectAll(): void {
    this.setState({ selectedRows: new Set(), allSelected: false })
    this.dispatch('selection-change', { selectedRows: [] })
  }

  getSelectedRows(): string[] {
    return Array.from((this.state as TableState).selectedRows)
  }

  getSortState(): { column: string | null; direction: 'asc' | 'desc' } {
    const state = this.state as TableState
    return {
      column: state.sortColumn,
      direction: state.sortDirection,
    }
  }
}

export const createTable = createComponentFactory(Table)
export default Table
