/**
 * Button Component Styles
 * @module ui-kit/button
 */

import { cx, type Size, type Color, type Radius } from './index'

export type ButtonVariant = 'solid' | 'soft' | 'outline' | 'ghost' | 'link'

export interface ButtonOptions {
  variant?: ButtonVariant
  color?: Color
  size?: Size
  radius?: Radius
  fullWidth?: boolean
  loading?: boolean
  disabled?: boolean
  iconOnly?: boolean
}

const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

const sizeStyles: Record<Size, string> = {
  xs: 'text-xs px-2.5 py-1 gap-1',
  sm: 'text-sm px-3 py-1.5 gap-1.5',
  md: 'text-sm px-4 py-2 gap-2',
  lg: 'text-base px-5 py-2.5 gap-2',
  xl: 'text-lg px-6 py-3 gap-2.5',
}

const iconOnlySizes: Record<Size, string> = {
  xs: 'p-1',
  sm: 'p-1.5',
  md: 'p-2',
  lg: 'p-2.5',
  xl: 'p-3',
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

const variantColors: Record<ButtonVariant, Record<Color, string>> = {
  solid: {
    coral: 'bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700 focus-visible:ring-coral-500',
    slate: 'bg-slate-800 text-white hover:bg-slate-900 active:bg-slate-950 focus-visible:ring-slate-500 dark:bg-slate-200 dark:text-slate-900 dark:hover:bg-slate-300',
    red: 'bg-red-500 text-white hover:bg-red-600 active:bg-red-700 focus-visible:ring-red-500',
    green: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700 focus-visible:ring-green-500',
    blue: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-blue-500',
    yellow: 'bg-yellow-500 text-white hover:bg-yellow-600 active:bg-yellow-700 focus-visible:ring-yellow-500',
    purple: 'bg-purple-500 text-white hover:bg-purple-600 active:bg-purple-700 focus-visible:ring-purple-500',
    pink: 'bg-pink-500 text-white hover:bg-pink-600 active:bg-pink-700 focus-visible:ring-pink-500',
    cyan: 'bg-cyan-500 text-white hover:bg-cyan-600 active:bg-cyan-700 focus-visible:ring-cyan-500',
    orange: 'bg-orange-500 text-white hover:bg-orange-600 active:bg-orange-700 focus-visible:ring-orange-500',
  },
  soft: {
    coral: 'bg-coral-100 text-coral-700 hover:bg-coral-200 active:bg-coral-300 focus-visible:ring-coral-500 dark:bg-coral-500/20 dark:text-coral-400 dark:hover:bg-coral-500/30',
    slate: 'bg-slate-100 text-slate-700 hover:bg-slate-200 active:bg-slate-300 focus-visible:ring-slate-500 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600',
    red: 'bg-red-100 text-red-700 hover:bg-red-200 active:bg-red-300 focus-visible:ring-red-500 dark:bg-red-500/20 dark:text-red-400 dark:hover:bg-red-500/30',
    green: 'bg-green-100 text-green-700 hover:bg-green-200 active:bg-green-300 focus-visible:ring-green-500 dark:bg-green-500/20 dark:text-green-400 dark:hover:bg-green-500/30',
    blue: 'bg-blue-100 text-blue-700 hover:bg-blue-200 active:bg-blue-300 focus-visible:ring-blue-500 dark:bg-blue-500/20 dark:text-blue-400 dark:hover:bg-blue-500/30',
    yellow: 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 active:bg-yellow-300 focus-visible:ring-yellow-500 dark:bg-yellow-500/20 dark:text-yellow-400 dark:hover:bg-yellow-500/30',
    purple: 'bg-purple-100 text-purple-700 hover:bg-purple-200 active:bg-purple-300 focus-visible:ring-purple-500 dark:bg-purple-500/20 dark:text-purple-400 dark:hover:bg-purple-500/30',
    pink: 'bg-pink-100 text-pink-700 hover:bg-pink-200 active:bg-pink-300 focus-visible:ring-pink-500 dark:bg-pink-500/20 dark:text-pink-400 dark:hover:bg-pink-500/30',
    cyan: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200 active:bg-cyan-300 focus-visible:ring-cyan-500 dark:bg-cyan-500/20 dark:text-cyan-400 dark:hover:bg-cyan-500/30',
    orange: 'bg-orange-100 text-orange-700 hover:bg-orange-200 active:bg-orange-300 focus-visible:ring-orange-500 dark:bg-orange-500/20 dark:text-orange-400 dark:hover:bg-orange-500/30',
  },
  outline: {
    coral: 'border-2 border-coral-500 text-coral-600 hover:bg-coral-50 active:bg-coral-100 focus-visible:ring-coral-500 dark:text-coral-400 dark:hover:bg-coral-500/10',
    slate: 'border-2 border-slate-300 text-slate-700 hover:bg-slate-50 active:bg-slate-100 focus-visible:ring-slate-500 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800',
    red: 'border-2 border-red-500 text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-500/10',
    green: 'border-2 border-green-500 text-green-600 hover:bg-green-50 active:bg-green-100 focus-visible:ring-green-500 dark:text-green-400 dark:hover:bg-green-500/10',
    blue: 'border-2 border-blue-500 text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-500/10',
    yellow: 'border-2 border-yellow-500 text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100 focus-visible:ring-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-500/10',
    purple: 'border-2 border-purple-500 text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus-visible:ring-purple-500 dark:text-purple-400 dark:hover:bg-purple-500/10',
    pink: 'border-2 border-pink-500 text-pink-600 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500 dark:text-pink-400 dark:hover:bg-pink-500/10',
    cyan: 'border-2 border-cyan-500 text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500 dark:text-cyan-400 dark:hover:bg-cyan-500/10',
    orange: 'border-2 border-orange-500 text-orange-600 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:bg-orange-500/10',
  },
  ghost: {
    coral: 'text-coral-600 hover:bg-coral-50 active:bg-coral-100 focus-visible:ring-coral-500 dark:text-coral-400 dark:hover:bg-coral-500/10',
    slate: 'text-slate-600 hover:bg-slate-100 active:bg-slate-200 focus-visible:ring-slate-500 dark:text-slate-400 dark:hover:bg-slate-800',
    red: 'text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-500 dark:text-red-400 dark:hover:bg-red-500/10',
    green: 'text-green-600 hover:bg-green-50 active:bg-green-100 focus-visible:ring-green-500 dark:text-green-400 dark:hover:bg-green-500/10',
    blue: 'text-blue-600 hover:bg-blue-50 active:bg-blue-100 focus-visible:ring-blue-500 dark:text-blue-400 dark:hover:bg-blue-500/10',
    yellow: 'text-yellow-600 hover:bg-yellow-50 active:bg-yellow-100 focus-visible:ring-yellow-500 dark:text-yellow-400 dark:hover:bg-yellow-500/10',
    purple: 'text-purple-600 hover:bg-purple-50 active:bg-purple-100 focus-visible:ring-purple-500 dark:text-purple-400 dark:hover:bg-purple-500/10',
    pink: 'text-pink-600 hover:bg-pink-50 active:bg-pink-100 focus-visible:ring-pink-500 dark:text-pink-400 dark:hover:bg-pink-500/10',
    cyan: 'text-cyan-600 hover:bg-cyan-50 active:bg-cyan-100 focus-visible:ring-cyan-500 dark:text-cyan-400 dark:hover:bg-cyan-500/10',
    orange: 'text-orange-600 hover:bg-orange-50 active:bg-orange-100 focus-visible:ring-orange-500 dark:text-orange-400 dark:hover:bg-orange-500/10',
  },
  link: {
    coral: 'text-coral-600 hover:underline focus-visible:ring-coral-500 dark:text-coral-400',
    slate: 'text-slate-600 hover:underline focus-visible:ring-slate-500 dark:text-slate-400',
    red: 'text-red-600 hover:underline focus-visible:ring-red-500 dark:text-red-400',
    green: 'text-green-600 hover:underline focus-visible:ring-green-500 dark:text-green-400',
    blue: 'text-blue-600 hover:underline focus-visible:ring-blue-500 dark:text-blue-400',
    yellow: 'text-yellow-600 hover:underline focus-visible:ring-yellow-500 dark:text-yellow-400',
    purple: 'text-purple-600 hover:underline focus-visible:ring-purple-500 dark:text-purple-400',
    pink: 'text-pink-600 hover:underline focus-visible:ring-pink-500 dark:text-pink-400',
    cyan: 'text-cyan-600 hover:underline focus-visible:ring-cyan-500 dark:text-cyan-400',
    orange: 'text-orange-600 hover:underline focus-visible:ring-orange-500 dark:text-orange-400',
  },
}

/**
 * Generate button class string
 */
export function button(options: ButtonOptions = {}): string {
  const {
    variant = 'solid',
    color = 'coral',
    size = 'md',
    radius = 'xl',
    fullWidth = false,
    loading = false,
    disabled = false,
    iconOnly = false,
  } = options

  return cx(
    baseStyles,
    iconOnly ? iconOnlySizes[size] : sizeStyles[size],
    radiusStyles[radius],
    variantColors[variant][color],
    fullWidth && 'w-full',
    (loading || disabled) && 'opacity-50 cursor-not-allowed pointer-events-none'
  )
}

/**
 * Button group container styles
 */
export function buttonGroup(options: { orientation?: 'horizontal' | 'vertical' } = {}): string {
  const { orientation = 'horizontal' } = options
  return cx(
    'inline-flex',
    orientation === 'vertical' ? 'flex-col' : 'flex-row',
    '[&>*:not(:first-child):not(:last-child)]:rounded-none',
    orientation === 'horizontal'
      ? '[&>*:first-child]:rounded-r-none [&>*:last-child]:rounded-l-none [&>*:not(:last-child)]:border-r-0'
      : '[&>*:first-child]:rounded-b-none [&>*:last-child]:rounded-t-none [&>*:not(:last-child)]:border-b-0'
  )
}

/**
 * Icon button specific styles
 */
export function iconButton(options: Omit<ButtonOptions, 'iconOnly'> = {}): string {
  return button({ ...options, iconOnly: true })
}
