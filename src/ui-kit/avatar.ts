/**
 * Avatar Component Styles
 * @module ui-kit/avatar
 */

import { cx, type Color } from './index'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type AvatarVariant = 'circular' | 'rounded' | 'square'

export interface AvatarOptions {
  size?: AvatarSize
  variant?: AvatarVariant
  bordered?: boolean
  status?: 'online' | 'offline' | 'away' | 'busy'
}

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-16 h-16 text-lg',
  '2xl': 'w-20 h-20 text-xl',
}

const variantStyles: Record<AvatarVariant, string> = {
  circular: 'rounded-full',
  rounded: 'rounded-xl',
  square: 'rounded-none',
}

const statusColors: Record<string, string> = {
  online: 'bg-green-500',
  offline: 'bg-slate-400',
  away: 'bg-yellow-500',
  busy: 'bg-red-500',
}

const statusSizes: Record<AvatarSize, string> = {
  xs: 'w-1.5 h-1.5',
  sm: 'w-2 h-2',
  md: 'w-2.5 h-2.5',
  lg: 'w-3 h-3',
  xl: 'w-3.5 h-3.5',
  '2xl': 'w-4 h-4',
}

/**
 * Generate avatar container class string
 */
export function avatar(options: AvatarOptions = {}): string {
  const {
    size = 'md',
    variant = 'circular',
    bordered = false,
  } = options

  return cx(
    'relative inline-flex items-center justify-center overflow-hidden flex-shrink-0',
    sizeStyles[size],
    variantStyles[variant],
    bordered && 'ring-2 ring-white dark:ring-slate-800'
  )
}

/**
 * Avatar image styles
 */
export function avatarImage(): string {
  return 'w-full h-full object-cover'
}

/**
 * Avatar fallback (initials) styles
 */
export function avatarFallback(color: Color = 'coral'): string {
  return cx(
    'w-full h-full flex items-center justify-center font-semibold uppercase',
    `bg-${color}-500 text-white`
  )
}

/**
 * Avatar status indicator
 */
export function avatarStatus(options: { status: 'online' | 'offline' | 'away' | 'busy'; size?: AvatarSize } = { status: 'online' }): string {
  const { status, size = 'md' } = options
  return cx(
    'absolute bottom-0 right-0 rounded-full border-2 border-white dark:border-slate-800',
    statusSizes[size],
    statusColors[status]
  )
}

/**
 * Avatar group container
 */
export function avatarGroup(options: { spacing?: 'tight' | 'normal' | 'loose' } = {}): string {
  const { spacing = 'normal' } = options
  const spacingMap = {
    tight: '-space-x-4',
    normal: '-space-x-3',
    loose: '-space-x-2',
  }
  return cx('flex items-center', spacingMap[spacing])
}

/**
 * Avatar count (for overflow in groups)
 */
export function avatarCount(options: AvatarOptions = {}): string {
  const { size = 'md', variant = 'circular' } = options
  return cx(
    avatar({ size, variant }),
    'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium'
  )
}

/**
 * Avatar with badge (notification)
 */
export function avatarBadge(options: { position?: 'top-right' | 'bottom-right'; color?: Color } = {}): string {
  const { position = 'top-right', color = 'red' } = options
  const positionMap = {
    'top-right': 'top-0 right-0',
    'bottom-right': 'bottom-0 right-0',
  }
  return cx(
    'absolute flex items-center justify-center w-4 h-4 text-[10px] font-bold rounded-full',
    positionMap[position],
    `bg-${color}-500 text-white`
  )
}

/**
 * Generate initials from name
 */
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(part => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

/**
 * Color from name (consistent color per name)
 */
export function colorFromName(name: string): Color {
  const colors: Color[] = ['coral', 'blue', 'green', 'purple', 'pink', 'cyan', 'orange', 'yellow']
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
  return colors[hash % colors.length] ?? 'coral'
}
