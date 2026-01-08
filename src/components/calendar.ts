/**
 * Calendar Component
 *
 * Date picker calendar with range selection support.
 * @module components/calendar
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface CalendarConfig extends ComponentConfig {
  /** Selection mode */
  mode?: 'single' | 'range' | 'multiple'
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Disabled dates */
  disabledDates?: Date[]
  /** First day of week (0 = Sunday) */
  firstDayOfWeek?: number
  /** Show week numbers */
  showWeekNumbers?: boolean
  /** Number of months to show */
  numberOfMonths?: number
  /** Initial selected date(s) */
  defaultValue?: Date | Date[]
}

export interface CalendarState extends ComponentState {
  viewDate: Date
  selectedDates: Date[]
  focusedDate: Date
  rangeStart: Date | null
  rangeEnd: Date | null
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/**
 * Calendar component for date selection
 */
export class Calendar extends BaseComponent {
  private grid: HTMLElement | null = null
  private header: HTMLElement | null = null
  private prevBtn: HTMLElement | null = null
  private nextBtn: HTMLElement | null = null
  private monthLabel: HTMLElement | null = null

  protected getDefaultConfig(): CalendarConfig {
    return {
      mode: 'single',
      firstDayOfWeek: 0,
      showWeekNumbers: false,
      numberOfMonths: 1,
    }
  }

  protected getInitialState(): CalendarState {
    const config = this.config as CalendarConfig
    const today = new Date()
    let selectedDates: Date[] = []

    if (config.defaultValue) {
      selectedDates = Array.isArray(config.defaultValue) ? config.defaultValue : [config.defaultValue]
    }

    return {
      viewDate: selectedDates[0] || today,
      selectedDates,
      focusedDate: selectedDates[0] || today,
      rangeStart: null,
      rangeEnd: null,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'application')
    this.element.setAttribute('aria-label', 'Calendar')

    this.grid = this.query('[data-coral-calendar-grid]')
    this.header = this.query('[data-coral-calendar-header]')
    this.prevBtn = this.query('[data-coral-calendar-prev]')
    this.nextBtn = this.query('[data-coral-calendar-next]')
    this.monthLabel = this.query('[data-coral-calendar-month]')

    if (this.grid) {
      this.grid.setAttribute('role', 'grid')
      this.grid.setAttribute('aria-label', 'Calendar dates')
    }

    if (this.prevBtn) {
      this.prevBtn.setAttribute('aria-label', 'Previous month')
    }

    if (this.nextBtn) {
      this.nextBtn.setAttribute('aria-label', 'Next month')
    }
  }

  protected bindEvents(): void {
    // Navigation
    if (this.prevBtn) {
      const handlePrev = () => this.previousMonth()
      this.addEventListener(this.prevBtn, 'click', handlePrev)
    }

    if (this.nextBtn) {
      const handleNext = () => this.nextMonth()
      this.addEventListener(this.nextBtn, 'click', handleNext)
    }

    // Keyboard navigation
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      const state = this.state as CalendarState
      let newDate = new Date(state.focusedDate)

      switch (ke.key) {
        case 'ArrowLeft':
          e.preventDefault()
          newDate.setDate(newDate.getDate() - 1)
          break
        case 'ArrowRight':
          e.preventDefault()
          newDate.setDate(newDate.getDate() + 1)
          break
        case 'ArrowUp':
          e.preventDefault()
          newDate.setDate(newDate.getDate() - 7)
          break
        case 'ArrowDown':
          e.preventDefault()
          newDate.setDate(newDate.getDate() + 7)
          break
        case 'Home':
          e.preventDefault()
          newDate.setDate(1)
          break
        case 'End':
          e.preventDefault()
          newDate = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0)
          break
        case 'PageUp':
          e.preventDefault()
          if (ke.shiftKey) {
            newDate.setFullYear(newDate.getFullYear() - 1)
          } else {
            newDate.setMonth(newDate.getMonth() - 1)
          }
          break
        case 'PageDown':
          e.preventDefault()
          if (ke.shiftKey) {
            newDate.setFullYear(newDate.getFullYear() + 1)
          } else {
            newDate.setMonth(newDate.getMonth() + 1)
          }
          break
        case 'Enter':
        case ' ':
          e.preventDefault()
          this.selectDate(state.focusedDate)
          return
        default:
          return
      }

      this.focusDate(newDate)
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)

    // Initial render
    this.renderCalendar()
  }

  protected override render(): void {
    this.renderCalendar()
  }

  private renderCalendar(): void {
    const state = this.state as CalendarState
    const config = this.config as CalendarConfig

    // Update month label
    if (this.monthLabel) {
      this.monthLabel.textContent = `${MONTHS[state.viewDate.getMonth()]} ${state.viewDate.getFullYear()}`
    }

    // Build calendar grid
    if (this.grid) {
      this.grid.innerHTML = ''

      // Day headers
      const headerRow = document.createElement('div')
      headerRow.setAttribute('role', 'row')
      headerRow.className = 'calendar-header-row'

      for (let i = 0; i < 7; i++) {
        const dayIndex = (config.firstDayOfWeek! + i) % 7
        const header = document.createElement('div')
        header.setAttribute('role', 'columnheader')
        header.setAttribute('aria-label', DAYS[dayIndex] ?? '')
        header.textContent = DAYS[dayIndex]!.slice(0, 2)
        header.className = 'calendar-day-header'
        headerRow.appendChild(header)
      }
      this.grid.appendChild(headerRow)

      // Calendar days
      const firstDay = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth(), 1)
      const lastDay = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 0)
      const startOffset = (firstDay.getDay() - config.firstDayOfWeek! + 7) % 7

      let week = document.createElement('div')
      week.setAttribute('role', 'row')
      week.className = 'calendar-week'

      // Empty cells for days before first of month
      for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div')
        empty.className = 'calendar-day calendar-day-empty'
        week.appendChild(empty)
      }

      // Actual days
      for (let day = 1; day <= lastDay.getDate(); day++) {
        const date = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth(), day)
        const dayCell = document.createElement('button')
        dayCell.setAttribute('role', 'gridcell')
        dayCell.setAttribute('tabindex', this.isSameDay(date, state.focusedDate) ? '0' : '-1')
        dayCell.textContent = String(day)
        dayCell.className = 'calendar-day'
        dayCell.dataset.date = date.toISOString()

        // Check if selected
        if (this.isSelected(date)) {
          dayCell.setAttribute('aria-selected', 'true')
          dayCell.dataset.selected = ''
        }

        // Check if today
        if (this.isSameDay(date, new Date())) {
          dayCell.dataset.today = ''
        }

        // Check if disabled
        if (this.isDisabled(date)) {
          dayCell.setAttribute('aria-disabled', 'true')
          dayCell.disabled = true
          dayCell.dataset.disabled = ''
        }

        // Check if in range
        if (config.mode === 'range' && state.rangeStart && state.rangeEnd) {
          if (date > state.rangeStart && date < state.rangeEnd) {
            dayCell.dataset.inRange = ''
          }
          if (this.isSameDay(date, state.rangeStart)) {
            dayCell.dataset.rangeStart = ''
          }
          if (this.isSameDay(date, state.rangeEnd)) {
            dayCell.dataset.rangeEnd = ''
          }
        }

        // Click handler
        dayCell.addEventListener('click', () => {
          if (!this.isDisabled(date)) {
            this.selectDate(date)
          }
        })

        week.appendChild(dayCell)

        // Start new week
        if ((startOffset + day) % 7 === 0 && day < lastDay.getDate()) {
          this.grid!.appendChild(week)
          week = document.createElement('div')
          week.setAttribute('role', 'row')
          week.className = 'calendar-week'
        }
      }

      // Fill remaining cells
      const remaining = 7 - week.children.length
      for (let i = 0; i < remaining && remaining < 7; i++) {
        const empty = document.createElement('div')
        empty.className = 'calendar-day calendar-day-empty'
        week.appendChild(empty)
      }
      if (week.children.length > 0) {
        this.grid.appendChild(week)
      }
    }
  }

  private isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  }

  private isSelected(date: Date): boolean {
    const state = this.state as CalendarState
    return state.selectedDates.some(d => this.isSameDay(d, date))
  }

  private isDisabled(date: Date): boolean {
    const config = this.config as CalendarConfig

    if (config.minDate && date < config.minDate) return true
    if (config.maxDate && date > config.maxDate) return true
    if (config.disabledDates?.some(d => this.isSameDay(d, date))) return true

    return false
  }

  selectDate(date: Date): void {
    const config = this.config as CalendarConfig
    const state = this.state as CalendarState
    let newSelected: Date[]
    let rangeStart = state.rangeStart
    let rangeEnd = state.rangeEnd

    switch (config.mode) {
      case 'single':
        newSelected = [date]
        break
      case 'multiple':
        if (this.isSelected(date)) {
          newSelected = state.selectedDates.filter(d => !this.isSameDay(d, date))
        } else {
          newSelected = [...state.selectedDates, date]
        }
        break
      case 'range':
        if (!rangeStart || (rangeStart && rangeEnd)) {
          rangeStart = date
          rangeEnd = null
          newSelected = [date]
        } else {
          if (date < rangeStart) {
            rangeEnd = rangeStart
            rangeStart = date
          } else {
            rangeEnd = date
          }
          newSelected = [rangeStart, rangeEnd]
        }
        break
      default:
        newSelected = [date]
    }

    this.setState({
      selectedDates: newSelected,
      rangeStart,
      rangeEnd,
      focusedDate: date,
    })

    this.dispatch('select', {
      date,
      dates: newSelected,
      range: config.mode === 'range' ? { start: rangeStart, end: rangeEnd } : null,
    })
  }

  focusDate(date: Date): void {
    const state = this.state as CalendarState

    // Update view if date is in different month
    if (date.getMonth() !== state.viewDate.getMonth() ||
        date.getFullYear() !== state.viewDate.getFullYear()) {
      this.setState({
        viewDate: date,
        focusedDate: date,
      })
    } else {
      this.setState({ focusedDate: date })
    }

    // Focus the cell
    const cell = this.grid?.querySelector(`[data-date="${date.toISOString()}"]`) as HTMLElement
    cell?.focus()
  }

  previousMonth(): void {
    const state = this.state as CalendarState
    const newDate = new Date(state.viewDate)
    newDate.setMonth(newDate.getMonth() - 1)
    this.setState({ viewDate: newDate })
  }

  nextMonth(): void {
    const state = this.state as CalendarState
    const newDate = new Date(state.viewDate)
    newDate.setMonth(newDate.getMonth() + 1)
    this.setState({ viewDate: newDate })
  }

  goToDate(date: Date): void {
    this.setState({
      viewDate: date,
      focusedDate: date,
    })
  }

  getValue(): Date | Date[] | null {
    const config = this.config as CalendarConfig
    const state = this.state as CalendarState

    if (config.mode === 'single') {
      return state.selectedDates[0] || null
    }
    return state.selectedDates
  }

  setValue(value: Date | Date[]): void {
    const dates = Array.isArray(value) ? value : [value]
    this.setState({
      selectedDates: dates,
      viewDate: dates[0] || new Date(),
      focusedDate: dates[0] || new Date(),
    })
  }

  clear(): void {
    this.setState({
      selectedDates: [],
      rangeStart: null,
      rangeEnd: null,
    })
  }
}

export const createCalendar = createComponentFactory(Calendar)
export default Calendar
