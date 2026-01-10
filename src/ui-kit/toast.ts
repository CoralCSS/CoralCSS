/**
 * Toast/Notification Component Styles
 * @module ui-kit/toast
 */

import { cx, type Radius } from './index'

export type ToastVariant = 'solid' | 'soft' | 'minimal'
export type ToastStatus = 'info' | 'success' | 'warning' | 'error' | 'loading'
export type ToastPosition = 'top' | 'top-right' | 'top-left' | 'bottom' | 'bottom-right' | 'bottom-left'

export interface ToastOptions {
  variant?: ToastVariant
  status?: ToastStatus
  radius?: Radius
  size?: 'sm' | 'md'
}

const sizeStyles = {
  sm: 'px-3 py-2 text-sm max-w-sm',
  md: 'px-4 py-3 text-sm max-w-md',
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
    soft: 'bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-500/30',
    minimal: 'bg-slate-900 text-white dark:bg-slate-700',
  },
  success: {
    solid: 'bg-green-500 text-white',
    soft: 'bg-white dark:bg-slate-800 border border-green-200 dark:border-green-500/30',
    minimal: 'bg-slate-900 text-white dark:bg-slate-700',
  },
  warning: {
    solid: 'bg-yellow-500 text-white',
    soft: 'bg-white dark:bg-slate-800 border border-yellow-200 dark:border-yellow-500/30',
    minimal: 'bg-slate-900 text-white dark:bg-slate-700',
  },
  error: {
    solid: 'bg-red-500 text-white',
    soft: 'bg-white dark:bg-slate-800 border border-red-200 dark:border-red-500/30',
    minimal: 'bg-slate-900 text-white dark:bg-slate-700',
  },
  loading: {
    solid: 'bg-slate-700 text-white',
    soft: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    minimal: 'bg-slate-900 text-white dark:bg-slate-700',
  },
}

const statusIcons = {
  info: 'i-info-circle',
  success: 'i-check-circle',
  warning: 'i-alert-triangle',
  error: 'i-x-circle',
  loading: 'i-loading animate-spin',
}

/**
 * Toast container
 */
export function toast(options: ToastOptions = {}): string {
  const {
    variant = 'soft',
    status = 'info',
    radius = 'xl',
    size = 'md',
  } = options

  return cx(
    'flex items-center gap-3 shadow-lg',
    'animate-in slide-in-from-top-full fade-in duration-300',
    sizeStyles[size],
    radiusStyles[radius],
    statusColors[status][variant]
  )
}

/**
 * Get the appropriate icon class for a status
 */
export function toastIcon(status: ToastStatus = 'info', variant: ToastVariant = 'soft'): string {
  const colorMap = {
    info: variant === 'solid' ? 'text-white' : 'text-blue-500',
    success: variant === 'solid' ? 'text-white' : 'text-green-500',
    warning: variant === 'solid' ? 'text-white' : 'text-yellow-500',
    error: variant === 'solid' ? 'text-white' : 'text-red-500',
    loading: variant === 'solid' ? 'text-white' : 'text-slate-500',
  }
  return cx(statusIcons[status], 'icon-lg flex-shrink-0', colorMap[status])
}

/**
 * Toast icon container (for soft variant)
 */
export function toastIconContainer(status: ToastStatus = 'info'): string {
  const bgMap = {
    info: 'bg-blue-100 dark:bg-blue-500/20',
    success: 'bg-green-100 dark:bg-green-500/20',
    warning: 'bg-yellow-100 dark:bg-yellow-500/20',
    error: 'bg-red-100 dark:bg-red-500/20',
    loading: 'bg-slate-100 dark:bg-slate-700',
  }
  return cx('w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0', bgMap[status])
}

/**
 * Toast content wrapper
 */
export function toastContent(): string {
  return 'flex-1 min-w-0'
}

/**
 * Toast title
 */
export function toastTitle(variant: ToastVariant = 'soft'): string {
  return cx(
    'font-medium',
    variant === 'soft' ? 'text-slate-900 dark:text-white' : ''
  )
}

/**
 * Toast description
 */
export function toastDescription(variant: ToastVariant = 'soft'): string {
  return cx(
    'text-sm',
    variant === 'soft' ? 'text-slate-500 dark:text-slate-400' : 'opacity-90'
  )
}

/**
 * Toast close button
 */
export function toastCloseButton(variant: ToastVariant = 'soft'): string {
  return cx(
    'flex-shrink-0 p-1 rounded-lg transition-colors',
    variant === 'solid'
      ? 'hover:bg-white/20'
      : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
  )
}

/**
 * Toast action button
 */
export function toastAction(variant: ToastVariant = 'soft'): string {
  return cx(
    'flex-shrink-0 text-sm font-medium transition-colors',
    variant === 'solid'
      ? 'text-white/90 hover:text-white'
      : 'text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300'
  )
}

/**
 * Toast viewport/container (for positioning)
 */
export function toastViewport(position: ToastPosition = 'top-right'): string {
  const positionStyles = {
    'top': 'top-4 left-1/2 -translate-x-1/2',
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom': 'bottom-4 left-1/2 -translate-x-1/2',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  }
  return cx(
    'fixed z-50 flex flex-col gap-3',
    positionStyles[position]
  )
}

/**
 * Toast progress bar
 */
export function toastProgress(options: { status?: ToastStatus; variant?: ToastVariant } = {}): string {
  const { status = 'info', variant = 'soft' } = options
  const colorMap = {
    info: variant === 'solid' ? 'bg-white/30' : 'bg-blue-500',
    success: variant === 'solid' ? 'bg-white/30' : 'bg-green-500',
    warning: variant === 'solid' ? 'bg-white/30' : 'bg-yellow-500',
    error: variant === 'solid' ? 'bg-white/30' : 'bg-red-500',
    loading: variant === 'solid' ? 'bg-white/30' : 'bg-slate-500',
  }
  return cx('h-1 rounded-full', colorMap[status])
}

/**
 * Toast progress track
 */
export function toastProgressTrack(variant: ToastVariant = 'soft'): string {
  return cx(
    'absolute bottom-0 left-0 right-0 h-1 overflow-hidden rounded-b-xl',
    variant === 'solid' ? 'bg-white/10' : 'bg-slate-100 dark:bg-slate-700'
  )
}

/**
 * Snackbar variant (simpler, bottom-centered)
 */
export function snackbar(): string {
  return cx(
    'flex items-center gap-3 px-4 py-3 text-sm',
    'bg-slate-900 text-white dark:bg-slate-700 rounded-xl shadow-lg',
    'animate-in slide-in-from-bottom-full fade-in duration-300'
  )
}

/**
 * Snackbar action
 */
export function snackbarAction(): string {
  return 'text-coral-400 hover:text-coral-300 font-medium transition-colors'
}
