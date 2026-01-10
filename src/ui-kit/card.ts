/**
 * Card Component Styles
 * @module ui-kit/card
 */

import { cx, type Radius } from './index'

export type CardVariant = 'elevated' | 'outlined' | 'filled' | 'ghost'

export interface CardOptions {
  variant?: CardVariant
  radius?: Radius
  padding?: 'none' | 'sm' | 'md' | 'lg'
  interactive?: boolean
  selected?: boolean
}

const baseStyles = 'bg-white dark:bg-slate-800 overflow-hidden transition-all duration-200'

const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
}

const paddingStyles = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const variantStyles: Record<CardVariant, string> = {
  elevated: 'shadow-lg hover:shadow-xl',
  outlined: 'border border-slate-200 dark:border-slate-700',
  filled: 'bg-slate-50 dark:bg-slate-800/50',
  ghost: '',
}

/**
 * Generate card class string
 */
export function card(options: CardOptions = {}): string {
  const {
    variant = 'outlined',
    radius = '2xl',
    padding = 'md',
    interactive = false,
    selected = false,
  } = options

  return cx(
    baseStyles,
    radiusStyles[radius],
    paddingStyles[padding],
    variantStyles[variant],
    interactive && 'cursor-pointer hover:border-coral-500 dark:hover:border-coral-500 hover:shadow-lg',
    selected && 'border-coral-500 dark:border-coral-500 ring-2 ring-coral-500/20'
  )
}

/**
 * Card header styles
 */
export function cardHeader(options: { divider?: boolean } = {}): string {
  const { divider = true } = options
  return cx(
    'px-6 py-4',
    divider && 'border-b border-slate-200 dark:border-slate-700'
  )
}

/**
 * Card title styles
 */
export function cardTitle(): string {
  return 'text-lg font-semibold text-slate-900 dark:text-white'
}

/**
 * Card description styles
 */
export function cardDescription(): string {
  return 'text-sm text-slate-500 dark:text-slate-400 mt-1'
}

/**
 * Card body/content styles
 */
export function cardBody(options: { padding?: 'sm' | 'md' | 'lg' } = {}): string {
  const { padding = 'md' } = options
  const paddings = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  }
  return paddings[padding]
}

/**
 * Card footer styles
 */
export function cardFooter(options: { divider?: boolean; justify?: 'start' | 'center' | 'end' | 'between' } = {}): string {
  const { divider = true, justify = 'end' } = options
  const justifyMap = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
  }
  return cx(
    'px-6 py-4 flex items-center gap-3',
    justifyMap[justify],
    divider && 'border-t border-slate-200 dark:border-slate-700',
    'bg-slate-50 dark:bg-slate-700/50'
  )
}

/**
 * Card media/image styles
 */
export function cardMedia(options: { aspect?: 'square' | 'video' | 'wide' | 'auto'; position?: 'top' | 'bottom' } = {}): string {
  const { aspect = 'video', position = 'top' } = options
  const aspectMap = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
    auto: '',
  }
  return cx(
    'w-full object-cover',
    aspectMap[aspect],
    position === 'top' ? '' : 'order-last'
  )
}

/**
 * Stat card - specialized for KPIs
 */
export function statCard(options: { trend?: 'up' | 'down' | 'neutral'; color?: string } = {}): string {
  const { trend, color } = options
  return cx(
    card({ variant: 'outlined', padding: 'md' }),
    trend === 'up' && 'border-l-4 border-l-green-500',
    trend === 'down' && 'border-l-4 border-l-red-500',
    color && `border-l-4 border-l-${color}-500`
  )
}

/**
 * Feature card with icon
 */
export function featureCard(): string {
  return cx(
    card({ variant: 'outlined', interactive: true }),
    'group'
  )
}

/**
 * Feature card icon container
 */
export function featureCardIcon(color: string = 'coral'): string {
  return cx(
    'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
    'group-hover:scale-110 transition-transform',
    `bg-${color}-100 dark:bg-${color}-500/20`
  )
}
