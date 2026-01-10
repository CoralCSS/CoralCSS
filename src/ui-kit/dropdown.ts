/**
 * Dropdown/Menu Component Styles
 * @module ui-kit/dropdown
 */

import { cx, type Radius } from './index'

export type DropdownPlacement = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end'

export interface DropdownOptions {
  radius?: Radius
  width?: 'auto' | 'sm' | 'md' | 'lg' | 'trigger'
}

const radiusStyles: Record<Radius, string> = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-2xl',
}

const widthStyles = {
  auto: 'w-auto min-w-[12rem]',
  sm: 'w-48',
  md: 'w-56',
  lg: 'w-64',
  trigger: 'w-full',
}

/**
 * Dropdown menu container
 */
export function dropdown(options: DropdownOptions = {}): string {
  const { radius = 'xl', width = 'auto' } = options
  return cx(
    'bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700',
    'py-1 z-50',
    'animate-in fade-in-0 zoom-in-95 duration-150',
    radiusStyles[radius],
    widthStyles[width]
  )
}

/**
 * Dropdown menu item
 */
export function dropdownItem(options: { active?: boolean; disabled?: boolean; destructive?: boolean } = {}): string {
  const { active = false, disabled = false, destructive = false } = options
  return cx(
    'flex items-center gap-3 px-4 py-2 text-sm transition-colors cursor-pointer',
    destructive
      ? 'text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10'
      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700',
    active && (destructive ? 'bg-red-50 dark:bg-red-500/10' : 'bg-slate-50 dark:bg-slate-700'),
    disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
  )
}

/**
 * Dropdown item icon
 */
export function dropdownItemIcon(): string {
  return 'text-slate-400 flex-shrink-0'
}

/**
 * Dropdown item shortcut (keyboard hint)
 */
export function dropdownItemShortcut(): string {
  return 'ml-auto text-xs text-slate-400 dark:text-slate-500'
}

/**
 * Dropdown divider
 */
export function dropdownDivider(): string {
  return 'my-1 border-t border-slate-200 dark:border-slate-700'
}

/**
 * Dropdown group label
 */
export function dropdownLabel(): string {
  return 'px-4 py-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider'
}

/**
 * Dropdown with checkbox item
 */
export function dropdownCheckItem(options: { checked?: boolean } = {}): string {
  const { checked = false } = options
  return cx(
    dropdownItem(),
    checked && 'bg-coral-50 dark:bg-coral-500/10 text-coral-700 dark:text-coral-400'
  )
}

/**
 * Dropdown checkbox indicator
 */
export function dropdownCheckIndicator(checked: boolean = false): string {
  return cx(
    'w-4 h-4 border-2 rounded flex items-center justify-center flex-shrink-0',
    checked
      ? 'bg-coral-500 border-coral-500 text-white'
      : 'border-slate-300 dark:border-slate-600'
  )
}

/**
 * Dropdown with radio item
 */
export function dropdownRadioItem(options: { selected?: boolean } = {}): string {
  const { selected = false } = options
  return cx(
    dropdownItem(),
    selected && 'bg-coral-50 dark:bg-coral-500/10 text-coral-700 dark:text-coral-400'
  )
}

/**
 * Dropdown radio indicator
 */
export function dropdownRadioIndicator(selected: boolean = false): string {
  return cx(
    'w-4 h-4 border-2 rounded-full flex items-center justify-center flex-shrink-0',
    selected
      ? 'border-coral-500'
      : 'border-slate-300 dark:border-slate-600',
    selected && 'after:w-2 after:h-2 after:rounded-full after:bg-coral-500'
  )
}

/**
 * Dropdown submenu trigger
 */
export function dropdownSubmenuTrigger(): string {
  return cx(
    dropdownItem(),
    'justify-between'
  )
}

/**
 * Dropdown submenu
 */
export function dropdownSubmenu(): string {
  return dropdown()
}

/**
 * Context menu (right-click menu)
 */
export function contextMenu(options: DropdownOptions = {}): string {
  return cx(dropdown(options), 'fixed')
}

/**
 * Command menu (command palette style)
 */
export function commandMenu(): string {
  return cx(
    'w-full max-w-lg bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden'
  )
}

/**
 * Command menu input
 */
export function commandMenuInput(): string {
  return cx(
    'w-full px-4 py-4 text-base bg-transparent border-b border-slate-200 dark:border-slate-700',
    'text-slate-900 dark:text-white placeholder-slate-400',
    'focus:outline-none'
  )
}

/**
 * Command menu list
 */
export function commandMenuList(): string {
  return 'max-h-80 overflow-y-auto py-2'
}

/**
 * Command menu group
 */
export function commandMenuGroup(): string {
  return 'px-2 py-1'
}

/**
 * Command menu group heading
 */
export function commandMenuGroupHeading(): string {
  return 'px-2 py-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400'
}

/**
 * Command menu item
 */
export function commandMenuItem(options: { active?: boolean } = {}): string {
  const { active = false } = options
  return cx(
    'flex items-center gap-3 px-3 py-2 text-sm rounded-lg cursor-pointer',
    'text-slate-700 dark:text-slate-300',
    active && 'bg-coral-50 dark:bg-coral-500/10 text-coral-700 dark:text-coral-400'
  )
}

/**
 * Command menu footer
 */
export function commandMenuFooter(): string {
  return 'px-4 py-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-4 text-xs text-slate-500'
}
