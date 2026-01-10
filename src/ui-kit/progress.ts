/**
 * Progress Component Styles
 * @module ui-kit/progress
 */

import { cx, type Color, type Radius } from './index'

export type ProgressVariant = 'default' | 'striped' | 'gradient'

export interface ProgressOptions {
  variant?: ProgressVariant
  color?: Color
  size?: 'xs' | 'sm' | 'md' | 'lg'
  radius?: Radius
  animated?: boolean
}

const sizeStyles = {
  xs: 'h-1',
  sm: 'h-2',
  md: 'h-3',
  lg: 'h-4',
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

const colorStyles: Record<Color, string> = {
  coral: 'bg-coral-500',
  slate: 'bg-slate-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  blue: 'bg-blue-500',
  yellow: 'bg-yellow-500',
  purple: 'bg-purple-500',
  pink: 'bg-pink-500',
  cyan: 'bg-cyan-500',
  orange: 'bg-orange-500',
}

const gradientStyles: Record<Color, string> = {
  coral: 'bg-gradient-to-r from-coral-500 to-pink-500',
  slate: 'bg-gradient-to-r from-slate-500 to-slate-400',
  red: 'bg-gradient-to-r from-red-500 to-orange-500',
  green: 'bg-gradient-to-r from-green-500 to-emerald-400',
  blue: 'bg-gradient-to-r from-blue-500 to-cyan-400',
  yellow: 'bg-gradient-to-r from-yellow-500 to-orange-400',
  purple: 'bg-gradient-to-r from-purple-500 to-pink-500',
  pink: 'bg-gradient-to-r from-pink-500 to-rose-400',
  cyan: 'bg-gradient-to-r from-cyan-500 to-blue-400',
  orange: 'bg-gradient-to-r from-orange-500 to-yellow-400',
}

/**
 * Progress track (background)
 */
export function progressTrack(options: Pick<ProgressOptions, 'size' | 'radius'> = {}): string {
  const { size = 'md', radius = 'full' } = options
  return cx(
    'w-full bg-slate-200 dark:bg-slate-700 overflow-hidden',
    sizeStyles[size],
    radiusStyles[radius]
  )
}

/**
 * Progress bar (fill)
 */
export function progressBar(options: ProgressOptions = {}): string {
  const {
    variant = 'default',
    color = 'coral',
    size = 'md',
    radius = 'full',
    animated = false,
  } = options

  const variantStyles = {
    default: colorStyles[color],
    striped: cx(colorStyles[color], 'bg-stripes'),
    gradient: gradientStyles[color],
  }

  return cx(
    'h-full transition-all duration-500 ease-out',
    radiusStyles[radius],
    variantStyles[variant],
    animated && variant === 'striped' && 'animate-progress-stripes'
  )
}

/**
 * Progress label container
 */
export function progressLabel(): string {
  return 'flex justify-between text-sm mb-2'
}

/**
 * Progress label text
 */
export function progressLabelText(): string {
  return 'text-slate-600 dark:text-slate-400'
}

/**
 * Progress value text
 */
export function progressValue(): string {
  return 'font-medium text-slate-900 dark:text-white'
}

/**
 * Circular progress container
 */
export function circularProgress(options: { size?: 'sm' | 'md' | 'lg' | 'xl' } = {}): string {
  const { size = 'md' } = options
  const sizeMap = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20',
    xl: 'w-24 h-24',
  }
  return cx('relative', sizeMap[size])
}

/**
 * Circular progress SVG
 */
export function circularProgressSvg(): string {
  return 'w-full h-full -rotate-90'
}

/**
 * Circular progress track circle
 */
export function circularProgressTrack(): string {
  return 'text-slate-200 dark:text-slate-700'
}

/**
 * Circular progress indicator circle
 */
export function circularProgressIndicator(color: Color = 'coral'): string {
  return cx('transition-all duration-500 ease-out', `text-${color}-500`)
}

/**
 * Circular progress label
 */
export function circularProgressLabel(): string {
  return 'absolute inset-0 flex items-center justify-center text-sm font-bold text-slate-900 dark:text-white'
}

/**
 * Indeterminate progress animation
 */
export function indeterminateProgress(options: Pick<ProgressOptions, 'color' | 'size' | 'radius'> = {}): string {
  const { color = 'coral', size = 'md', radius = 'full' } = options
  return cx(
    progressBar({ color, size, radius }),
    'animate-indeterminate'
  )
}

/**
 * Step progress container
 */
export function stepProgress(): string {
  return 'flex items-center gap-2'
}

/**
 * Step progress step
 */
export function stepProgressStep(options: { status?: 'complete' | 'current' | 'upcoming'; color?: Color } = {}): string {
  const { status = 'upcoming', color = 'coral' } = options
  const statusStyles = {
    complete: `bg-${color}-500 text-white`,
    current: `border-2 border-${color}-500 text-${color}-600 dark:text-${color}-400`,
    upcoming: 'bg-slate-200 dark:bg-slate-700 text-slate-500',
  }
  return cx(
    'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0',
    statusStyles[status]
  )
}

/**
 * Step progress connector
 */
export function stepProgressConnector(options: { complete?: boolean; color?: Color } = {}): string {
  const { complete = false, color = 'coral' } = options
  return cx(
    'flex-1 h-1 rounded-full',
    complete ? `bg-${color}-500` : 'bg-slate-200 dark:bg-slate-700'
  )
}

/**
 * Multi-segment progress
 */
export function multiProgress(): string {
  return 'flex w-full h-2 rounded-full overflow-hidden gap-0.5'
}

/**
 * Multi-segment progress segment
 */
export function multiProgressSegment(color: Color = 'coral'): string {
  return cx('h-full first:rounded-l-full last:rounded-r-full', colorStyles[color])
}
