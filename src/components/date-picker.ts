/**
 * DatePicker Component
 *
 * Date picker with calendar dropdown.
 * @module components/date-picker
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface DatePickerConfig extends ComponentConfig {
  /** Default date */
  defaultValue?: Date | string
  /** Date format */
  format?: string
  /** Minimum date */
  minDate?: Date | string
  /** Maximum date */
  maxDate?: Date | string
  /** Disabled state */
  disabled?: boolean
  /** Placeholder */
  placeholder?: string
  /** First day of week (0 = Sunday) */
  firstDayOfWeek?: number
}

export interface DatePickerState extends ComponentState {
  selectedDate: Date | null
  viewDate: Date
  isOpen: boolean
  disabled: boolean
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

/**
 * DatePicker component for date selection
 */
export class DatePicker extends BaseComponent {
  private trigger: HTMLElement | null = null
  private input: HTMLInputElement | null = null
  private calendar: HTMLElement | null = null

  protected getDefaultConfig(): DatePickerConfig {
    return {
      format: 'MM/DD/YYYY',
      disabled: false,
      placeholder: 'Select date',
      firstDayOfWeek: 0,
    }
  }

  protected getInitialState(): DatePickerState {
    const config = this.config as DatePickerConfig
    const defaultDate = config.defaultValue
      ? typeof config.defaultValue === 'string' ? new Date(config.defaultValue) : config.defaultValue
      : null

    return {
      selectedDate: defaultDate,
      viewDate: defaultDate || new Date(),
      isOpen: false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Date picker')
  }

  protected bindEvents(): void {
    this.trigger = this.query('[data-coral-date-picker-trigger]')
    this.input = this.query('input')
    this.calendar = this.query('[data-coral-date-picker-calendar]')

    // Trigger
    if (this.trigger) {
      const handleClick = () => {
        if (!(this.state as DatePickerState).disabled) {
          this.toggle()
        }
      }
      this.addEventListener(this.trigger, 'click', handleClick)
    }

    // Input
    if (this.input) {
      const handleFocus = () => {
        if (!(this.state as DatePickerState).disabled) {
          this.open()
        }
      }
      this.addEventListener(this.input, 'focus', handleFocus)

      const handleInput = () => {
        const value = this.input!.value
        const date = this.parseDate(value)
        if (date) {
          this.selectDate(date)
        }
      }
      this.addEventListener(this.input, 'change', handleInput)
    }

    // Close on outside click
    const handleOutsideClick = (e: Event) => {
      if (!(this.state as DatePickerState).isOpen) {return}
      if (!this.element.contains(e.target as Node)) {
        this.close()
      }
    }
    document.addEventListener('click', handleOutsideClick)

    // Keyboard
    const handleKeydown = (e: Event) => {
      const ke = e as KeyboardEvent
      if (ke.key === 'Escape') {
        this.close()
      }
    }
    this.addEventListener(this.element, 'keydown', handleKeydown)
  }

  private parseDate(value: string): Date | null {
    const date = new Date(value)
    return isNaN(date.getTime()) ? null : date
  }

  private formatDate(date: Date): string {
    const config = this.config as DatePickerConfig
    const format = config.format || 'MM/DD/YYYY'

    const pad = (n: number) => n.toString().padStart(2, '0')

    return format
      .replace('YYYY', String(date.getFullYear()))
      .replace('MM', pad(date.getMonth() + 1))
      .replace('DD', pad(date.getDate()))
  }

  private renderCalendar(): void {
    if (!this.calendar) {return}

    const state = this.state as DatePickerState
    const config = this.config as DatePickerConfig

    this.calendar.innerHTML = ''

    // Header
    const header = document.createElement('div')
    header.className = 'date-picker-header'
    header.innerHTML = `
      <button type="button" data-action="prev-month" class="date-picker-nav">‹</button>
      <span class="date-picker-title">${MONTHS[state.viewDate.getMonth()]} ${state.viewDate.getFullYear()}</span>
      <button type="button" data-action="next-month" class="date-picker-nav">›</button>
    `
    this.calendar.appendChild(header)

    // Weekday headers
    const weekdays = document.createElement('div')
    weekdays.className = 'date-picker-weekdays'
    for (let i = 0; i < 7; i++) {
      const dayIndex = (config.firstDayOfWeek! + i) % 7
      const day = document.createElement('span')
      day.textContent = DAYS[dayIndex]!.slice(0, 2)
      weekdays.appendChild(day)
    }
    this.calendar.appendChild(weekdays)

    // Days grid
    const grid = document.createElement('div')
    grid.className = 'date-picker-grid'

    const firstDay = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth(), 1)
    const lastDay = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth() + 1, 0)
    const startOffset = (firstDay.getDay() - config.firstDayOfWeek! + 7) % 7

    // Empty cells
    for (let i = 0; i < startOffset; i++) {
      const empty = document.createElement('span')
      empty.className = 'date-picker-day date-picker-day--empty'
      grid.appendChild(empty)
    }

    // Days
    const today = new Date()
    for (let day = 1; day <= lastDay.getDate(); day++) {
      const date = new Date(state.viewDate.getFullYear(), state.viewDate.getMonth(), day)
      const btn = document.createElement('button')
      btn.type = 'button'
      btn.className = 'date-picker-day'
      btn.textContent = String(day)

      if (this.isSameDay(date, today)) {
        btn.classList.add('date-picker-day--today')
      }

      if (state.selectedDate && this.isSameDay(date, state.selectedDate)) {
        btn.classList.add('date-picker-day--selected')
      }

      if (this.isDisabledDate(date)) {
        btn.disabled = true
        btn.classList.add('date-picker-day--disabled')
      } else {
        btn.addEventListener('click', () => {
          this.selectDate(date)
          this.close()
        })
      }

      grid.appendChild(btn)
    }

    this.calendar.appendChild(grid)

    // Navigation handlers
    header.querySelector('[data-action="prev-month"]')?.addEventListener('click', () => this.prevMonth())
    header.querySelector('[data-action="next-month"]')?.addEventListener('click', () => this.nextMonth())
  }

  private isSameDay(a: Date, b: Date): boolean {
    return a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
  }

  private isDisabledDate(date: Date): boolean {
    const config = this.config as DatePickerConfig

    if (config.minDate) {
      const min = typeof config.minDate === 'string' ? new Date(config.minDate) : config.minDate
      if (date < min) {return true}
    }

    if (config.maxDate) {
      const max = typeof config.maxDate === 'string' ? new Date(config.maxDate) : config.maxDate
      if (date > max) {return true}
    }

    return false
  }

  protected override render(): void {
    const state = this.state as DatePickerState

    this.element.dataset.open = String(state.isOpen)
    this.element.dataset.disabled = String(state.disabled)

    if (this.calendar) {
      this.calendar.hidden = !state.isOpen
      if (state.isOpen) {
        this.renderCalendar()
      }
    }

    if (this.input) {
      this.input.value = state.selectedDate ? this.formatDate(state.selectedDate) : ''
      this.input.disabled = state.disabled
    }
  }

  override open(): void {
    if ((this.state as DatePickerState).disabled) {return}
    this.setState({ isOpen: true })
    this.dispatch('open')
  }

  override close(): void {
    this.setState({ isOpen: false })
    this.dispatch('close')
  }

  override toggle(): void {
    if ((this.state as DatePickerState).isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  selectDate(date: Date): void {
    this.setState({
      selectedDate: date,
      viewDate: date,
    })
    this.dispatch('change', { date })
  }

  prevMonth(): void {
    const state = this.state as DatePickerState
    const newDate = new Date(state.viewDate)
    newDate.setMonth(newDate.getMonth() - 1)
    this.setState({ viewDate: newDate })
  }

  nextMonth(): void {
    const state = this.state as DatePickerState
    const newDate = new Date(state.viewDate)
    newDate.setMonth(newDate.getMonth() + 1)
    this.setState({ viewDate: newDate })
  }

  getValue(): Date | null {
    return (this.state as DatePickerState).selectedDate
  }

  setValue(date: Date | string | null): void {
    if (date === null) {
      this.setState({ selectedDate: null })
    } else {
      const d = typeof date === 'string' ? new Date(date) : date
      this.selectDate(d)
    }
  }

  clear(): void {
    this.setState({ selectedDate: null })
    this.dispatch('clear')
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
    if (disabled) {this.close()}
  }
}

export const createDatePicker = createComponentFactory(DatePicker)
export default DatePicker
