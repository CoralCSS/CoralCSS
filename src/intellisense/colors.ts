/**
 * CoralCSS IntelliSense Color Provider
 *
 * Provides color information and previews.
 * @module intellisense/colors
 */

import type { Theme } from '../types'
import { defaultTheme } from '../theme/default'

/**
 * Color information structure
 */
export interface ColorInfo {
  /** Color name (e.g., coral-500) */
  name: string
  /** Hex value */
  hex: string
  /** RGB values */
  rgb: { r: number; g: number; b: number }
  /** HSL values */
  hsl: { h: number; s: number; l: number }
  /** Opacity (if modified) */
  opacity?: number
  /** RGBA string */
  rgba?: string
  /** HSLA string */
  hsla?: string
}

/**
 * Color palette structure
 */
export interface ColorPalette {
  name: string
  colors: Map<string, ColorInfo>
}

/**
 * Create a color provider
 */
export function createColorProvider(theme: Theme = defaultTheme) {
  const colors = theme.colors || {}
  const colorMap = new Map<string, ColorInfo>()

  // Build color map
  for (const [name, value] of Object.entries(colors)) {
    if (typeof value === 'string') {
      const info = parseColor(name, value)
      if (info) {
        colorMap.set(name, info)
      }
    } else if (typeof value === 'object' && value !== null) {
      const colorScale = value as unknown as { [key: string]: string }
      for (const shade of Object.keys(colorScale)) {
        const shadeValue = colorScale[shade]
        if (typeof shadeValue === 'string') {
          const fullName = shade === 'DEFAULT' ? name : `${name}-${shade}`
          const info = parseColor(fullName, shadeValue)
          if (info) {
            colorMap.set(fullName, info)
          }
        }
      }
    }
  }

  /**
   * Get color information by name
   */
  function getColor(name: string): ColorInfo | null {
    // Handle opacity modifier
    const parts = name.split('/')
    const colorName = parts[0] || ''
    const opacityStr = parts[1]
    const baseInfo = colorMap.get(colorName)

    if (!baseInfo) {
      return null
    }

    if (opacityStr) {
      const opacity = parseInt(opacityStr, 10) / 100
      return {
        ...baseInfo,
        opacity,
        rgba: `rgba(${baseInfo.rgb.r}, ${baseInfo.rgb.g}, ${baseInfo.rgb.b}, ${opacity})`,
        hsla: `hsla(${baseInfo.hsl.h}, ${baseInfo.hsl.s}%, ${baseInfo.hsl.l}%, ${opacity})`,
      }
    }

    return baseInfo
  }

  /**
   * Get color from utility class
   */
  function getColorFromClass(className: string): ColorInfo | null {
    // Remove variants
    const parts = className.split(':')
    const baseClass = parts.pop() || ''

    // Color prefixes to check
    const prefixes = ['text-', 'bg-', 'border-', 'ring-', 'divide-', 'outline-', 'accent-', 'caret-', 'fill-', 'stroke-', 'decoration-', 'shadow-', 'placeholder-', 'from-', 'via-', 'to-']

    for (const prefix of prefixes) {
      if (baseClass.startsWith(prefix)) {
        const colorPart = baseClass.slice(prefix.length)
        return getColor(colorPart)
      }
    }

    return null
  }

  /**
   * Get all color palettes
   */
  function getPalettes(): ColorPalette[] {
    const palettes = new Map<string, Map<string, ColorInfo>>()

    for (const [name, info] of colorMap) {
      const parts = name.split('-')
      const lastPart = parts[parts.length - 1] || ''
      const paletteName = parts.length > 1 && /^\d+$/.test(lastPart)
        ? parts.slice(0, -1).join('-')
        : 'base'

      if (!palettes.has(paletteName)) {
        palettes.set(paletteName, new Map())
      }
      const palette = palettes.get(paletteName)
      if (palette) {
        palette.set(name, info)
      }
    }

    return Array.from(palettes.entries()).map(([name, colors]) => ({
      name,
      colors,
    }))
  }

  /**
   * Search colors by name or value
   */
  function searchColors(query: string): ColorInfo[] {
    const lowerQuery = query.toLowerCase()
    const results: ColorInfo[] = []

    for (const [name, info] of colorMap) {
      if (
        name.toLowerCase().includes(lowerQuery) ||
        info.hex.toLowerCase().includes(lowerQuery)
      ) {
        results.push(info)
      }
    }

    return results
  }

  /**
   * Get contrast ratio between two colors
   */
  function getContrastRatio(color1: string, color2: string): number {
    const info1 = getColor(color1)
    const info2 = getColor(color2)

    if (!info1 || !info2) {
      return 0
    }

    const l1 = getRelativeLuminance(info1.rgb)
    const l2 = getRelativeLuminance(info2.rgb)

    const lighter = Math.max(l1, l2)
    const darker = Math.min(l1, l2)

    return (lighter + 0.05) / (darker + 0.05)
  }

  /**
   * Check if contrast meets WCAG requirements
   */
  function meetsWCAG(color1: string, color2: string, level: 'AA' | 'AAA' = 'AA'): {
    normalText: boolean
    largeText: boolean
    ratio: number
  } {
    const ratio = getContrastRatio(color1, color2)

    if (level === 'AAA') {
      return {
        normalText: ratio >= 7,
        largeText: ratio >= 4.5,
        ratio,
      }
    }

    return {
      normalText: ratio >= 4.5,
      largeText: ratio >= 3,
      ratio,
    }
  }

  /**
   * Suggest accessible text colors for a background
   */
  function suggestTextColors(backgroundColor: string): ColorInfo[] {
    const bgInfo = getColor(backgroundColor)
    if (!bgInfo) {
      return []
    }

    const suggestions: { info: ColorInfo; ratio: number }[] = []

    for (const [name, info] of colorMap) {
      const ratio = getContrastRatio(backgroundColor, name)
      if (ratio >= 4.5) {
        suggestions.push({ info, ratio })
      }
    }

    // Sort by contrast ratio (highest first)
    suggestions.sort((a, b) => b.ratio - a.ratio)

    return suggestions.slice(0, 10).map(s => s.info)
  }

  return {
    getColor,
    getColorFromClass,
    getPalettes,
    searchColors,
    getContrastRatio,
    meetsWCAG,
    suggestTextColors,
    colorMap,
  }
}

/**
 * Parse a color value to ColorInfo
 */
function parseColor(name: string, value: string): ColorInfo | null {
  // Handle hex colors
  if (value.startsWith('#')) {
    const hex = normalizeHex(value)
    if (!hex) { return null }

    const rgb = hexToRgb(hex)
    if (!rgb) { return null }

    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    return {
      name,
      hex,
      rgb,
      hsl,
    }
  }

  // Handle rgb/rgba
  const rgbMatch = value.match(/rgba?\((\d+),?\s*(\d+),?\s*(\d+)(?:,?\s*([\d.]+))?\)/)
  if (rgbMatch && rgbMatch[1] && rgbMatch[2] && rgbMatch[3]) {
    const r = parseInt(rgbMatch[1], 10)
    const g = parseInt(rgbMatch[2], 10)
    const b = parseInt(rgbMatch[3], 10)
    const a = rgbMatch[4] ? parseFloat(rgbMatch[4]) : undefined

    const hex = rgbToHex(r, g, b)
    const hsl = rgbToHsl(r, g, b)

    return {
      name,
      hex,
      rgb: { r, g, b },
      hsl,
      opacity: a,
      rgba: a !== undefined ? `rgba(${r}, ${g}, ${b}, ${a})` : undefined,
    }
  }

  // Handle hsl/hsla
  const hslMatch = value.match(/hsla?\((\d+),?\s*([\d.]+)%?,?\s*([\d.]+)%?(?:,?\s*([\d.]+))?\)/)
  if (hslMatch && hslMatch[1] && hslMatch[2] && hslMatch[3]) {
    const h = parseInt(hslMatch[1], 10)
    const s = parseFloat(hslMatch[2])
    const l = parseFloat(hslMatch[3])
    const a = hslMatch[4] ? parseFloat(hslMatch[4]) : undefined

    const rgb = hslToRgb(h, s, l)
    const hex = rgbToHex(rgb.r, rgb.g, rgb.b)

    return {
      name,
      hex,
      rgb,
      hsl: { h, s, l },
      opacity: a,
      hsla: a !== undefined ? `hsla(${h}, ${s}%, ${l}%, ${a})` : undefined,
    }
  }

  // Handle named colors
  const namedColors: Record<string, string> = {
    transparent: '#00000000',
    black: '#000000',
    white: '#ffffff',
    current: 'currentColor',
    inherit: 'inherit',
  }

  if (namedColors[value]) {
    if (value === 'current' || value === 'inherit') {
      return null // These aren't real colors
    }
    return parseColor(name, namedColors[value])
  }

  return null
}

/**
 * Normalize hex color to 6-digit format
 */
function normalizeHex(hex: string): string | null {
  hex = hex.replace('#', '')

  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('')
  }

  if (hex.length === 8) {
    hex = hex.slice(0, 6) // Remove alpha
  }

  if (hex.length !== 6) {
    return null
  }

  return `#${hex}`
}

/**
 * Convert hex to RGB
 */
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result || !result[1] || !result[2] || !result[3]) {
    return null
  }

  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  }
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (c: number) => {
    const hex = c.toString(16)
    return hex.length === 1 ? '0' + hex : hex
  }

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

/**
 * Convert RGB to HSL
 */
function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  }
}

/**
 * Convert HSL to RGB
 */
function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  h /= 360
  s /= 100
  l /= 100

  let r: number, g: number, b: number

  if (s === 0) {
    r = g = b = l
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) { t += 1 }
      if (t > 1) { t -= 1 }
      if (t < 1 / 6) { return p + (q - p) * 6 * t }
      if (t < 1 / 2) { return q }
      if (t < 2 / 3) { return p + (q - p) * (2 / 3 - t) * 6 }
      return p
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q

    r = hue2rgb(p, q, h + 1 / 3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1 / 3)
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  }
}

/**
 * Calculate relative luminance for WCAG contrast
 */
function getRelativeLuminance(rgb: { r: number; g: number; b: number }): number {
  const convert = (c: number) => {
    c = c / 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }

  const rLinear = convert(rgb.r)
  const gLinear = convert(rgb.g)
  const bLinear = convert(rgb.b)

  return 0.2126 * rLinear + 0.7152 * gLinear + 0.0722 * bLinear
}

/**
 * Default color provider instance
 */
export const colorProvider = createColorProvider()
