/**
 * Modal/Dialog Component Styles
 * @module ui-kit/modal
 */

import { cx, type Radius } from './index'

export type ModalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'
export type ModalPosition = 'center' | 'top' | 'bottom'

export interface ModalOptions {
  size?: ModalSize
  position?: ModalPosition
  radius?: Radius
  scrollBehavior?: 'inside' | 'outside'
}

const sizeStyles: Record<ModalSize, string> = {
  xs: 'max-w-xs',
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-xl',
  full: 'max-w-full min-h-screen m-0',
}

const positionStyles: Record<ModalPosition, string> = {
  center: 'items-center',
  top: 'items-start pt-16',
  bottom: 'items-end pb-16',
}

const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-3xl',
}

/**
 * Modal overlay/backdrop
 */
export function modalOverlay(options: { blur?: boolean } = {}): string {
  const { blur = true } = options
  return cx(
    'fixed inset-0 z-50 bg-black/50 transition-opacity',
    blur && 'backdrop-blur-sm'
  )
}

/**
 * Modal container (centers content)
 */
export function modalContainer(options: ModalOptions = {}): string {
  const { position = 'center', scrollBehavior = 'outside' } = options
  return cx(
    'fixed inset-0 z-50 flex justify-center p-4',
    positionStyles[position],
    scrollBehavior === 'outside' && 'overflow-y-auto'
  )
}

/**
 * Modal content panel
 */
export function modal(options: ModalOptions = {}): string {
  const {
    size = 'md',
    radius = '2xl',
    scrollBehavior = 'outside',
  } = options

  return cx(
    'w-full bg-white dark:bg-slate-800 shadow-2xl overflow-hidden',
    'animate-in zoom-in-95 fade-in duration-200',
    sizeStyles[size],
    size !== 'full' && radiusStyles[radius],
    scrollBehavior === 'inside' && 'max-h-[calc(100vh-8rem)] flex flex-col'
  )
}

/**
 * Modal header
 */
export function modalHeader(options: { bordered?: boolean } = {}): string {
  const { bordered = true } = options
  return cx(
    'flex items-center justify-between px-6 py-4',
    bordered && 'border-b border-slate-200 dark:border-slate-700'
  )
}

/**
 * Modal title
 */
export function modalTitle(): string {
  return 'text-lg font-semibold text-slate-900 dark:text-white'
}

/**
 * Modal close button
 */
export function modalCloseButton(): string {
  return cx(
    'p-2 -mr-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300',
    'hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors'
  )
}

/**
 * Modal body
 */
export function modalBody(options: { scrollable?: boolean; padding?: 'sm' | 'md' | 'lg' } = {}): string {
  const { scrollable = false, padding = 'md' } = options
  const paddingMap = {
    sm: 'px-4 py-3',
    md: 'px-6 py-4',
    lg: 'px-8 py-6',
  }
  return cx(
    paddingMap[padding],
    'text-slate-600 dark:text-slate-400',
    scrollable && 'overflow-y-auto flex-1'
  )
}

/**
 * Modal footer
 */
export function modalFooter(options: { bordered?: boolean; justify?: 'start' | 'center' | 'end' | 'between' } = {}): string {
  const { bordered = true, justify = 'end' } = options
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }
  return cx(
    'flex items-center gap-3 px-6 py-4',
    justifyMap[justify],
    bordered && 'border-t border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/50'
  )
}

/**
 * Confirmation modal styles
 */
export function confirmModal(): string {
  return modal({ size: 'sm' })
}

/**
 * Confirmation modal icon container
 */
export function confirmModalIcon(type: 'danger' | 'warning' | 'info' | 'success' = 'danger'): string {
  const colorMap = {
    danger: 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    warning: 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    info: 'bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    success: 'bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400',
  }
  return cx(
    'mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4',
    colorMap[type]
  )
}

/**
 * Drawer variant (slides from edge)
 */
export function drawer(position: 'left' | 'right' | 'top' | 'bottom' = 'right'): string {
  const positionStyles = {
    left: 'left-0 top-0 h-full max-w-md animate-in slide-in-from-left',
    right: 'right-0 top-0 h-full max-w-md animate-in slide-in-from-right',
    top: 'top-0 left-0 w-full max-h-[80vh] animate-in slide-in-from-top',
    bottom: 'bottom-0 left-0 w-full max-h-[80vh] animate-in slide-in-from-bottom',
  }
  return cx(
    'fixed z-50 bg-white dark:bg-slate-800 shadow-2xl overflow-hidden',
    positionStyles[position]
  )
}

/**
 * Sheet (bottom drawer mobile pattern)
 */
export function sheet(): string {
  return cx(
    'fixed bottom-0 left-0 right-0 z-50',
    'bg-white dark:bg-slate-800 rounded-t-2xl shadow-2xl',
    'animate-in slide-in-from-bottom duration-300'
  )
}

/**
 * Sheet drag handle
 */
export function sheetHandle(): string {
  return 'w-12 h-1.5 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto my-3'
}
