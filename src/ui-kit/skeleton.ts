/**
 * Skeleton/Loading Placeholder Component Styles
 * @module ui-kit/skeleton
 */

import { cx, type Radius } from './index'

export type SkeletonVariant = 'pulse' | 'wave' | 'none'

export interface SkeletonOptions {
  variant?: SkeletonVariant
  radius?: Radius
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

const variantStyles: Record<SkeletonVariant, string> = {
  pulse: 'animate-pulse',
  wave: 'animate-shimmer bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 dark:from-slate-700 dark:via-slate-600 dark:to-slate-700 bg-[length:200%_100%]',
  none: '',
}

/**
 * Base skeleton element
 */
export function skeleton(options: SkeletonOptions = {}): string {
  const { variant = 'pulse', radius = 'lg' } = options
  return cx(
    'bg-slate-200 dark:bg-slate-700',
    radiusStyles[radius],
    variantStyles[variant]
  )
}

/**
 * Text skeleton (single line)
 */
export function skeletonText(options: SkeletonOptions & { width?: 'full' | '3/4' | '2/3' | '1/2' | '1/3' | '1/4' } = {}): string {
  const { width = 'full', ...rest } = options
  const widthMap = {
    full: 'w-full',
    '3/4': 'w-3/4',
    '2/3': 'w-2/3',
    '1/2': 'w-1/2',
    '1/3': 'w-1/3',
    '1/4': 'w-1/4',
  }
  return cx(skeleton(rest), 'h-4', widthMap[width])
}

/**
 * Heading skeleton
 */
export function skeletonHeading(options: SkeletonOptions & { level?: 'h1' | 'h2' | 'h3' | 'h4' } = {}): string {
  const { level = 'h2', ...rest } = options
  const sizeMap = {
    h1: 'h-10',
    h2: 'h-8',
    h3: 'h-6',
    h4: 'h-5',
  }
  return cx(skeleton(rest), sizeMap[level], 'w-2/3')
}

/**
 * Avatar skeleton
 */
export function skeletonAvatar(options: SkeletonOptions & { size?: 'sm' | 'md' | 'lg' | 'xl' } = {}): string {
  const { size = 'md', ...rest } = options
  const sizeMap = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }
  return cx(skeleton({ ...rest, radius: 'full' }), sizeMap[size])
}

/**
 * Image/thumbnail skeleton
 */
export function skeletonImage(options: SkeletonOptions & { aspect?: 'square' | 'video' | 'wide' } = {}): string {
  const { aspect = 'video', ...rest } = options
  const aspectMap = {
    square: 'aspect-square',
    video: 'aspect-video',
    wide: 'aspect-[21/9]',
  }
  return cx(skeleton(rest), 'w-full', aspectMap[aspect])
}

/**
 * Button skeleton
 */
export function skeletonButton(options: SkeletonOptions & { size?: 'sm' | 'md' | 'lg' } = {}): string {
  const { size = 'md', ...rest } = options
  const sizeMap = {
    sm: 'h-8 w-20',
    md: 'h-10 w-24',
    lg: 'h-12 w-28',
  }
  return cx(skeleton({ ...rest, radius: 'xl' }), sizeMap[size])
}

/**
 * Card skeleton
 */
export function skeletonCard(options: SkeletonOptions = {}): string {
  return cx(
    'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6',
    radiusStyles[options.radius || '2xl'],
    variantStyles[options.variant || 'pulse']
  )
}

/**
 * Paragraph skeleton (multiple lines)
 */
export function skeletonParagraph(): string {
  return 'space-y-3'
}

/**
 * Table row skeleton
 */
export function skeletonTableRow(): string {
  return 'flex items-center gap-4 py-4 border-b border-slate-200 dark:border-slate-700'
}

/**
 * Table cell skeleton
 */
export function skeletonTableCell(options: SkeletonOptions & { width?: string } = {}): string {
  const { width = 'w-24', ...rest } = options
  return cx(skeleton(rest), 'h-4', width)
}

/**
 * List item skeleton
 */
export function skeletonListItem(options: SkeletonOptions = {}): string {
  return cx(
    'flex items-center gap-4 p-4',
    variantStyles[options.variant || 'pulse']
  )
}

/**
 * Inline skeleton (for inline text)
 */
export function skeletonInline(options: SkeletonOptions & { width?: string } = {}): string {
  const { width = 'w-20', ...rest } = options
  return cx(skeleton(rest), 'h-4 inline-block align-middle', width)
}

/**
 * Circle skeleton
 */
export function skeletonCircle(options: SkeletonOptions & { size?: number | string } = {}): string {
  const { size = 40, ...rest } = options
  const sizeStyle = typeof size === 'number' ? { width: `${size}px`, height: `${size}px` } : {}
  const sizeClass = typeof size === 'string' ? size : ''
  return cx(skeleton({ ...rest, radius: 'full' }), sizeClass)
}

/**
 * Badge skeleton
 */
export function skeletonBadge(options: SkeletonOptions = {}): string {
  return cx(skeleton({ ...options, radius: 'full' }), 'h-5 w-16')
}

/**
 * Input skeleton
 */
export function skeletonInput(options: SkeletonOptions = {}): string {
  return cx(skeleton({ ...options, radius: 'xl' }), 'h-10 w-full')
}

/**
 * Compose multiple skeleton patterns
 */
export const skeletonPatterns = {
  /**
   * User profile skeleton
   */
  userProfile: (variant: SkeletonVariant = 'pulse') => ({
    container: cx(variantStyles[variant], 'flex items-center gap-4'),
    avatar: skeletonAvatar({ variant, size: 'lg' }),
    name: skeletonText({ variant, width: '3/4' }),
    subtitle: skeletonText({ variant, width: '1/2' }),
  }),

  /**
   * Blog post card skeleton
   */
  blogCard: (variant: SkeletonVariant = 'pulse') => ({
    container: skeletonCard({ variant }),
    image: skeletonImage({ variant }),
    title: skeletonHeading({ variant, level: 'h3' }),
    text: skeletonText({ variant }),
    meta: skeletonText({ variant, width: '1/3' }),
  }),

  /**
   * Product card skeleton
   */
  productCard: (variant: SkeletonVariant = 'pulse') => ({
    container: skeletonCard({ variant }),
    image: skeletonImage({ variant, aspect: 'square' }),
    title: skeletonText({ variant, width: '3/4' }),
    price: skeletonText({ variant, width: '1/4' }),
    button: skeletonButton({ variant }),
  }),

  /**
   * Comment skeleton
   */
  comment: (variant: SkeletonVariant = 'pulse') => ({
    container: cx(variantStyles[variant], 'flex gap-4'),
    avatar: skeletonAvatar({ variant }),
    content: skeletonParagraph(),
    line1: skeletonText({ variant }),
    line2: skeletonText({ variant, width: '2/3' }),
  }),
}
