/**
 * Tabs Component Styles
 * @module ui-kit/tabs
 */

import { cx } from './index'

export type TabsVariant = 'line' | 'enclosed' | 'pills' | 'soft-rounded' | 'solid-rounded'
export type TabsSize = 'sm' | 'md' | 'lg'
export type TabsOrientation = 'horizontal' | 'vertical'

export interface TabsOptions {
  variant?: TabsVariant
  size?: TabsSize
  orientation?: TabsOrientation
  fitted?: boolean
}

const sizeStyles: Record<TabsSize, string> = {
  sm: 'text-sm',
  md: 'text-sm',
  lg: 'text-base',
}

const tabSizeStyles: Record<TabsSize, string> = {
  sm: 'px-3 py-1.5',
  md: 'px-4 py-2',
  lg: 'px-5 py-2.5',
}

/**
 * Tab list container
 */
export function tabList(options: TabsOptions = {}): string {
  const { variant = 'line', orientation = 'horizontal', fitted = false } = options

  const baseStyles = {
    line: orientation === 'horizontal'
      ? 'flex border-b border-slate-200 dark:border-slate-700'
      : 'flex flex-col border-r border-slate-200 dark:border-slate-700',
    enclosed: orientation === 'horizontal'
      ? 'flex border-b border-slate-200 dark:border-slate-700'
      : 'flex flex-col border-r border-slate-200 dark:border-slate-700',
    pills: orientation === 'horizontal' ? 'flex gap-2' : 'flex flex-col gap-2',
    'soft-rounded': orientation === 'horizontal'
      ? 'inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl'
      : 'inline-flex flex-col p-1 bg-slate-100 dark:bg-slate-800 rounded-xl',
    'solid-rounded': orientation === 'horizontal'
      ? 'inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl'
      : 'inline-flex flex-col p-1 bg-slate-100 dark:bg-slate-800 rounded-xl',
  }

  return cx(
    baseStyles[variant],
    fitted && orientation === 'horizontal' && 'w-full',
    fitted && '[&>*]:flex-1'
  )
}

/**
 * Individual tab trigger
 */
export function tab(options: TabsOptions & { active?: boolean; disabled?: boolean } = {}): string {
  const { variant = 'line', size = 'md', active = false, disabled = false } = options

  const baseStyles = cx(
    'inline-flex items-center justify-center gap-2 font-medium transition-all',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-coral-500 focus-visible:ring-offset-2',
    sizeStyles[size],
    tabSizeStyles[size]
  )

  const variantStyles = {
    line: cx(
      '-mb-px border-b-2',
      active
        ? 'border-coral-500 text-coral-600 dark:text-coral-400'
        : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:border-slate-300 dark:hover:border-slate-600'
    ),
    enclosed: cx(
      'border border-transparent -mb-px rounded-t-lg',
      active
        ? 'border-slate-200 dark:border-slate-700 border-b-white dark:border-b-slate-800 bg-white dark:bg-slate-800 text-coral-600 dark:text-coral-400'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    ),
    pills: cx(
      'rounded-lg',
      active
        ? 'bg-coral-500 text-white shadow'
        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
    ),
    'soft-rounded': cx(
      'rounded-lg',
      active
        ? 'bg-white dark:bg-slate-700 text-coral-600 dark:text-coral-400 shadow'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    ),
    'solid-rounded': cx(
      'rounded-lg',
      active
        ? 'bg-coral-500 text-white shadow'
        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
    ),
  }

  return cx(
    baseStyles,
    variantStyles[variant],
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
  )
}

/**
 * Tab panel container
 */
export function tabPanels(): string {
  return ''
}

/**
 * Individual tab panel
 */
export function tabPanel(options: { padding?: 'none' | 'sm' | 'md' | 'lg' } = {}): string {
  const { padding = 'md' } = options
  const paddingStyles = {
    none: '',
    sm: 'py-3',
    md: 'py-4',
    lg: 'py-6',
  }
  return cx(
    'focus:outline-none',
    paddingStyles[padding]
  )
}

/**
 * Tab with icon
 */
export function tabIcon(): string {
  return 'w-4 h-4'
}

/**
 * Tab badge/count
 */
export function tabBadge(active?: boolean): string {
  return cx(
    'ml-1.5 px-1.5 py-0.5 text-xs font-medium rounded-full',
    active
      ? 'bg-coral-100 text-coral-700 dark:bg-coral-500/20 dark:text-coral-400'
      : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'
  )
}

/**
 * Vertical tabs layout
 */
export function verticalTabsContainer(): string {
  return 'flex gap-6'
}

/**
 * Scrollable tabs wrapper
 */
export function scrollableTabs(): string {
  return cx(
    'relative overflow-x-auto scrollbar-hide',
    '[&::-webkit-scrollbar]:hidden',
    '[-ms-overflow-style:none]',
    '[scrollbar-width:none]'
  )
}

/**
 * Tab scroll button
 */
export function tabScrollButton(direction: 'left' | 'right'): string {
  return cx(
    'absolute top-0 bottom-0 z-10 flex items-center',
    'bg-gradient-to-r from-white dark:from-slate-900 to-transparent',
    direction === 'left' ? 'left-0 pr-4' : 'right-0 pl-4 bg-gradient-to-l'
  )
}
