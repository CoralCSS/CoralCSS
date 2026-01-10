/**
 * Alert Component Styles
 * @module ui-kit/alert
 */

import { cx, type Radius } from './index'

export type AlertVariant = 'solid' | 'soft' | 'outline' | 'left-accent'
export type AlertStatus = 'info' | 'success' | 'warning' | 'error'

export interface AlertOptions {
  variant?: AlertVariant
  status?: AlertStatus
  radius?: Radius
  size?: 'sm' | 'md' | 'lg'
}

const baseStyles = 'flex items-start gap-4 transition-all duration-200'

const sizeStyles = {
  sm: 'p-3 text-sm',
  md: 'p-4 text-sm',
  lg: 'p-5 text-base',
}

const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

const statusColors = {
  info: {
    solid: 'bg-blue-500 text-white',
    soft: 'bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
    outline: 'border border-blue-200 text-blue-800 dark:border-blue-500/30 dark:text-blue-400',
    'left-accent': 'border-l-4 border-l-blue-500 bg-blue-50 text-blue-800 dark:bg-blue-500/10 dark:text-blue-400',
  },
  success: {
    solid: 'bg-green-500 text-white',
    soft: 'bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-400',
    outline: 'border border-green-200 text-green-800 dark:border-green-500/30 dark:text-green-400',
    'left-accent': 'border-l-4 border-l-green-500 bg-green-50 text-green-800 dark:bg-green-500/10 dark:text-green-400',
  },
  warning: {
    solid: 'bg-yellow-500 text-white',
    soft: 'bg-yellow-50 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400',
    outline: 'border border-yellow-200 text-yellow-800 dark:border-yellow-500/30 dark:text-yellow-400',
    'left-accent': 'border-l-4 border-l-yellow-500 bg-yellow-50 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400',
  },
  error: {
    solid: 'bg-red-500 text-white',
    soft: 'bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-400',
    outline: 'border border-red-200 text-red-800 dark:border-red-500/30 dark:text-red-400',
    'left-accent': 'border-l-4 border-l-red-500 bg-red-50 text-red-800 dark:bg-red-500/10 dark:text-red-400',
  },
}

const statusIcons = {
  info: 'i-info-circle',
  success: 'i-check-circle',
  warning: 'i-alert-triangle',
  error: 'i-x-circle',
}

/**
 * Generate alert class string
 */
export function alert(options: AlertOptions = {}): string {
  const {
    variant = 'soft',
    status = 'info',
    radius = 'xl',
    size = 'md',
  } = options

  return cx(
    baseStyles,
    sizeStyles[size],
    radiusStyles[radius],
    statusColors[status][variant]
  )
}

/**
 * Get the appropriate icon class for a status
 */
export function alertIcon(status: AlertStatus = 'info'): string {
  return cx(statusIcons[status], 'icon-lg flex-shrink-0 mt-0.5')
}

/**
 * Alert title styles
 */
export function alertTitle(): string {
  return 'font-semibold'
}

/**
 * Alert description styles
 */
export function alertDescription(): string {
  return 'mt-1 opacity-90'
}

/**
 * Alert close button styles
 */
export function alertCloseButton(options: { variant?: AlertVariant; status?: AlertStatus } = {}): string {
  const { variant = 'soft', status = 'info' } = options
  const isLight = variant === 'soft' || variant === 'outline' || variant === 'left-accent'
  return cx(
    'ml-auto -mr-1 -mt-1 p-1 rounded-lg transition-colors',
    isLight
      ? 'hover:bg-black/10 dark:hover:bg-white/10'
      : 'hover:bg-white/20'
  )
}

/**
 * Inline alert (single line)
 */
export function inlineAlert(options: AlertOptions = {}): string {
  return cx(alert(options), 'items-center')
}

/**
 * Alert with action buttons
 */
export function alertActions(): string {
  return 'flex items-center gap-2 mt-3'
}

/**
 * Alert action button
 */
export function alertActionButton(options: { primary?: boolean; status?: AlertStatus } = {}): string {
  const { primary = false, status = 'info' } = options
  const colorMap = {
    info: primary ? 'bg-blue-600 text-white hover:bg-blue-700' : 'text-blue-700 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-blue-500/20',
    success: primary ? 'bg-green-600 text-white hover:bg-green-700' : 'text-green-700 hover:bg-green-100 dark:text-green-400 dark:hover:bg-green-500/20',
    warning: primary ? 'bg-yellow-600 text-white hover:bg-yellow-700' : 'text-yellow-700 hover:bg-yellow-100 dark:text-yellow-400 dark:hover:bg-yellow-500/20',
    error: primary ? 'bg-red-600 text-white hover:bg-red-700' : 'text-red-700 hover:bg-red-100 dark:text-red-400 dark:hover:bg-red-500/20',
  }
  return cx(
    'px-3 py-1.5 text-sm font-medium rounded-lg transition-colors',
    colorMap[status]
  )
}

/**
 * Banner alert (full width, no radius)
 */
export function bannerAlert(options: Omit<AlertOptions, 'radius'> = {}): string {
  return alert({ ...options, radius: 'none' })
}
