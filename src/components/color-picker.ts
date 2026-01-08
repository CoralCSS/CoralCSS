/**
 * ColorPicker Component
 *
 * Color selection with various formats.
 * @module components/color-picker
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface ColorPickerConfig extends ComponentConfig {
  /** Default color */
  defaultValue?: string
  /** Color format */
  format?: 'hex' | 'rgb' | 'hsl'
  /** Show alpha slider */
  showAlpha?: boolean
  /** Predefined swatches */
  swatches?: string[]
  /** Disabled state */
  disabled?: boolean
}

export interface ColorPickerState extends ComponentState {
  color: string
  hue: number
  saturation: number
  lightness: number
  alpha: number
  isOpen: boolean
  disabled: boolean
}

/**
 * ColorPicker component for color selection
 */
export class ColorPicker extends BaseComponent {
  private trigger: HTMLElement | null = null
  private panel: HTMLElement | null = null
  private hueSlider: HTMLElement | null = null
  private saturationPanel: HTMLElement | null = null
  private alphaSlider: HTMLElement | null = null
  private preview: HTMLElement | null = null
  private input: HTMLInputElement | null = null

  protected getDefaultConfig(): ColorPickerConfig {
    return {
      defaultValue: '#ff7f50',
      format: 'hex',
      showAlpha: false,
      disabled: false,
    }
  }

  protected getInitialState(): ColorPickerState {
    const config = this.config as ColorPickerConfig
    const hsl = this.hexToHsl(config.defaultValue || '#ff7f50')
    return {
      color: config.defaultValue || '#ff7f50',
      hue: hsl.h,
      saturation: hsl.s,
      lightness: hsl.l,
      alpha: 1,
      isOpen: false,
      disabled: config.disabled ?? false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'group')
    this.element.setAttribute('aria-label', 'Color picker')
  }

  protected bindEvents(): void {
    this.trigger = this.query('[data-coral-color-picker-trigger]')
    this.panel = this.query('[data-coral-color-picker-panel]')
    this.hueSlider = this.query('[data-coral-color-picker-hue]')
    this.saturationPanel = this.query('[data-coral-color-picker-saturation]')
    this.alphaSlider = this.query('[data-coral-color-picker-alpha]')
    this.preview = this.query('[data-coral-color-picker-preview]')
    this.input = this.query('input')

    // Trigger
    if (this.trigger) {
      const handleClick = () => {
        if (!(this.state as ColorPickerState).disabled) {
          this.toggle()
        }
      }
      this.addEventListener(this.trigger, 'click', handleClick)
    }

    // Input
    if (this.input) {
      const handleInput = () => {
        const value = this.input!.value
        if (this.isValidColor(value)) {
          this.setColor(value)
        }
      }
      this.addEventListener(this.input, 'input', handleInput)
    }

    // Hue slider
    if (this.hueSlider) {
      this.setupSlider(this.hueSlider, 'hue')
    }

    // Saturation panel
    if (this.saturationPanel) {
      this.setupSaturationPanel()
    }

    // Alpha slider
    if (this.alphaSlider) {
      this.setupSlider(this.alphaSlider, 'alpha')
    }

    // Swatches
    const swatches = this.queryAll('[data-coral-color-picker-swatch]')
    swatches.forEach((swatch) => {
      const handleClick = () => {
        const color = (swatch as HTMLElement).dataset.color
        if (color) {
          this.setColor(color)
        }
      }
      this.addEventListener(swatch, 'click', handleClick)
    })

    // Close on outside click
    const handleOutsideClick = (e: Event) => {
      if (!(this.state as ColorPickerState).isOpen) return
      if (!this.element.contains(e.target as Node)) {
        this.close()
      }
    }
    document.addEventListener('click', handleOutsideClick)
  }

  private setupSlider(slider: HTMLElement, type: 'hue' | 'alpha'): void {
    let isDragging = false

    const updateValue = (e: MouseEvent | TouchEvent) => {
      const rect = slider.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
      const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))

      if (type === 'hue') {
        this.setState({ hue: percent * 360 })
      } else {
        this.setState({ alpha: percent })
      }
      this.updateColor()
    }

    const handleStart = (e: Event) => {
      isDragging = true
      updateValue(e as MouseEvent | TouchEvent)
    }

    const handleMove = (e: Event) => {
      if (isDragging) {
        updateValue(e as MouseEvent | TouchEvent)
      }
    }

    const handleEnd = () => {
      isDragging = false
    }

    this.addEventListener(slider, 'mousedown', handleStart)
    this.addEventListener(slider, 'touchstart', handleStart)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchend', handleEnd)
  }

  private setupSaturationPanel(): void {
    if (!this.saturationPanel) return

    let isDragging = false

    const updateValue = (e: MouseEvent | TouchEvent) => {
      const rect = this.saturationPanel!.getBoundingClientRect()
      const clientX = 'touches' in e ? e.touches[0]!.clientX : e.clientX
      const clientY = 'touches' in e ? e.touches[0]!.clientY : e.clientY

      const saturation = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100))
      const lightness = Math.max(0, Math.min(100, 100 - ((clientY - rect.top) / rect.height) * 100))

      this.setState({ saturation, lightness })
      this.updateColor()
    }

    const handleStart = (e: Event) => {
      isDragging = true
      updateValue(e as MouseEvent | TouchEvent)
    }

    const handleMove = (e: Event) => {
      if (isDragging) {
        updateValue(e as MouseEvent | TouchEvent)
      }
    }

    const handleEnd = () => {
      isDragging = false
    }

    this.addEventListener(this.saturationPanel, 'mousedown', handleStart)
    this.addEventListener(this.saturationPanel, 'touchstart', handleStart)
    document.addEventListener('mousemove', handleMove)
    document.addEventListener('touchmove', handleMove)
    document.addEventListener('mouseup', handleEnd)
    document.addEventListener('touchend', handleEnd)
  }

  private updateColor(): void {
    const state = this.state as ColorPickerState
    const config = this.config as ColorPickerConfig

    const hsl = { h: state.hue, s: state.saturation, l: state.lightness }
    let color: string

    switch (config.format) {
      case 'rgb':
        const rgb = this.hslToRgb(hsl)
        color = config.showAlpha
          ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${state.alpha})`
          : `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        break
      case 'hsl':
        color = config.showAlpha
          ? `hsla(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%, ${state.alpha})`
          : `hsl(${Math.round(hsl.h)}, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%)`
        break
      default:
        color = this.hslToHex(hsl)
    }

    this.setState({ color })
    this.dispatch('change', { color })
  }

  private hexToHsl(hex: string): { h: number; s: number; l: number } {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    if (!result) return { h: 0, s: 100, l: 50 }

    const r = parseInt(result[1]!, 16) / 255
    const g = parseInt(result[2]!, 16) / 255
    const b = parseInt(result[3]!, 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  private hslToHex(hsl: { h: number; s: number; l: number }): string {
    const rgb = this.hslToRgb(hsl)
    return `#${[rgb.r, rgb.g, rgb.b].map(x => x.toString(16).padStart(2, '0')).join('')}`
  }

  private hslToRgb(hsl: { h: number; s: number; l: number }): { r: number; g: number; b: number } {
    const h = hsl.h / 360
    const s = hsl.s / 100
    const l = hsl.l / 100

    let r, g, b

    if (s === 0) {
      r = g = b = l
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q
      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255),
    }
  }

  private isValidColor(color: string): boolean {
    const s = new Option().style
    s.color = color
    return s.color !== ''
  }

  protected override render(): void {
    const state = this.state as ColorPickerState

    this.element.dataset.open = String(state.isOpen)
    this.element.dataset.disabled = String(state.disabled)

    if (this.panel) {
      this.panel.hidden = !state.isOpen
    }

    if (this.preview) {
      this.preview.style.backgroundColor = state.color
    }

    if (this.input) {
      this.input.value = state.color
    }
  }

  override open(): void {
    if ((this.state as ColorPickerState).disabled) return
    this.setState({ isOpen: true })
    this.dispatch('open')
  }

  override close(): void {
    this.setState({ isOpen: false })
    this.dispatch('close')
  }

  override toggle(): void {
    if ((this.state as ColorPickerState).isOpen) {
      this.close()
    } else {
      this.open()
    }
  }

  setColor(color: string): void {
    const hsl = this.hexToHsl(color)
    this.setState({
      color,
      hue: hsl.h,
      saturation: hsl.s,
      lightness: hsl.l,
    })
    this.dispatch('change', { color })
  }

  getColor(): string {
    return (this.state as ColorPickerState).color
  }

  setDisabled(disabled: boolean): void {
    this.setState({ disabled })
    if (disabled) this.close()
  }
}

export const createColorPicker = createComponentFactory(ColorPicker)
export default ColorPicker
