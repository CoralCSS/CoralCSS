/**
 * Badge Component Styles
 * @module ui-kit/badge
 */

import { cx, type Size as _Size, type Color } from './index'

export type BadgeVariant = 'solid' | 'soft' | 'outline' | 'dot'

export interface BadgeOptions {
  variant?: BadgeVariant
  color?: Color
  size?: 'xs' | 'sm' | 'md'
  rounded?: boolean
}

const baseStyles = 'inline-flex items-center font-medium'

const sizeStyles: Record<'xs' | 'sm' | 'md', string> = {
  xs: 'text-[10px] px-1.5 py-0.5 gap-1',
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
}

const variantColors: Record<BadgeVariant, Record<Color, string>> = {
  solid: {
    coral: 'bg-coral-500 text-white',
    slate: 'bg-slate-500 text-white',
    red: 'bg-red-500 text-white',
    green: 'bg-green-500 text-white',
    blue: 'bg-blue-500 text-white',
    yellow: 'bg-yellow-500 text-white',
    purple: 'bg-purple-500 text-white',
    pink: 'bg-pink-500 text-white',
    cyan: 'bg-cyan-500 text-white',
    orange: 'bg-orange-500 text-white',
  },
  soft: {
    coral: 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-400',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    red: 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400',
    green: 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400',
    blue: 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400',
    yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400',
    purple: 'bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-400',
    pink: 'bg-pink-100 text-pink-700 dark:bg-pink-500/20 dark:text-pink-400',
    cyan: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-500/20 dark:text-cyan-400',
    orange: 'bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400',
  },
  outline: {
    coral: 'border border-coral-500 text-coral-600 dark:text-coral-400',
    slate: 'border border-slate-300 text-slate-600 dark:border-slate-600 dark:text-slate-400',
    red: 'border border-red-500 text-red-600 dark:text-red-400',
    green: 'border border-green-500 text-green-600 dark:text-green-400',
    blue: 'border border-blue-500 text-blue-600 dark:text-blue-400',
    yellow: 'border border-yellow-500 text-yellow-600 dark:text-yellow-400',
    purple: 'border border-purple-500 text-purple-600 dark:text-purple-400',
    pink: 'border border-pink-500 text-pink-600 dark:text-pink-400',
    cyan: 'border border-cyan-500 text-cyan-600 dark:text-cyan-400',
    orange: 'border border-orange-500 text-orange-600 dark:text-orange-400',
  },
  dot: {
    coral: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    slate: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    red: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    green: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    blue: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    yellow: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    purple: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    pink: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    cyan: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
    orange: 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300',
  },
}

const dotColors: Record<Color, string> = {
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

/**
 * Generate badge class string
 */
export function badge(options: BadgeOptions = {}): string {
  const {
    variant = 'soft',
    color = 'coral',
    size = 'sm',
    rounded = true,
  } = options

  return cx(
    baseStyles,
    sizeStyles[size],
    variantColors[variant][color],
    rounded ? 'rounded-full' : 'rounded-md'
  )
}

/**
 * Badge dot indicator
 */
export function badgeDot(color: Color = 'green'): string {
  return cx('w-1.5 h-1.5 rounded-full', dotColors[color])
}

/**
 * Notification badge (for icons)
 */
export function notificationBadge(options: { size?: 'sm' | 'md'; color?: Color } = {}): string {
  const { size = 'sm', color = 'red' } = options
  const sizeMap = {
    sm: 'w-4 h-4 text-[10px]',
    md: 'w-5 h-5 text-xs',
  }
  return cx(
    'absolute -top-1 -right-1 flex items-center justify-center font-bold rounded-full',
    sizeMap[size],
    `bg-${color}-500 text-white`
  )
}

/**
 * Status badge with dot
 */
export function statusBadge(status: 'online' | 'offline' | 'away' | 'busy'): string {
  const statusMap: Record<typeof status, { color: Color; label: string }> = {
    online: { color: 'green', label: 'Online' },
    offline: { color: 'slate', label: 'Offline' },
    away: { color: 'yellow', label: 'Away' },
    busy: { color: 'red', label: 'Busy' },
  }
  return badge({ variant: 'dot', color: statusMap[status].color })
}

/**
 * Tag badge (removable)
 */
export function tagBadge(options: BadgeOptions = {}): string {
  return cx(badge(options), 'pr-1')
}

/**
 * Tag remove button
 */
export function tagRemoveButton(): string {
  return cx(
    'ml-1 p-0.5 rounded-full',
    'hover:bg-black/10 dark:hover:bg-white/10',
    'focus:outline-none focus:ring-1 focus:ring-current'
  )
}
