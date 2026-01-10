/**
 * Input Component Styles
 * @module ui-kit/input
 */

import { cx, type Size, type Radius } from './index'

export type InputVariant = 'default' | 'filled' | 'flushed'

export interface InputOptions {
  variant?: InputVariant
  size?: Size
  radius?: Radius
  error?: boolean
  disabled?: boolean
  fullWidth?: boolean
}

const baseStyles = 'transition-all duration-200 focus:outline-none text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500'

const sizeStyles: Record<Size, string> = {
  xs: 'text-xs px-2.5 py-1.5',
  sm: 'text-sm px-3 py-2',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-4 py-3',
  xl: 'text-lg px-5 py-3.5',
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

const variantStyles: Record<InputVariant, { default: string; error: string }> = {
  default: {
    default: 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:border-coral-500 focus:ring-2 focus:ring-coral-500/20',
    error: 'bg-white dark:bg-slate-800 border border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20',
  },
  filled: {
    default: 'bg-slate-100 dark:bg-slate-700 border-2 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-coral-500',
    error: 'bg-red-50 dark:bg-red-500/10 border-2 border-transparent focus:bg-white dark:focus:bg-slate-800 focus:border-red-500',
  },
  flushed: {
    default: 'bg-transparent border-b-2 border-slate-200 dark:border-slate-700 rounded-none px-0 focus:border-coral-500',
    error: 'bg-transparent border-b-2 border-red-500 rounded-none px-0 focus:border-red-500',
  },
}

/**
 * Generate input class string
 */
export function input(options: InputOptions = {}): string {
  const {
    variant = 'default',
    size = 'md',
    radius = 'xl',
    error = false,
    disabled = false,
    fullWidth = true,
  } = options

  const variantStyle = error ? variantStyles[variant].error : variantStyles[variant].default

  return cx(
    baseStyles,
    sizeStyles[size],
    variant !== 'flushed' && radiusStyles[radius],
    variantStyle,
    fullWidth && 'w-full',
    disabled && 'opacity-50 cursor-not-allowed'
  )
}

/**
 * Input wrapper with icon support
 */
export function inputWrapper(options: { hasLeftIcon?: boolean; hasRightIcon?: boolean } = {}): string {
  const { hasLeftIcon = false, hasRightIcon = false } = options
  return cx(
    'relative',
    hasLeftIcon && '[&>input]:pl-10',
    hasRightIcon && '[&>input]:pr-10'
  )
}

/**
 * Input icon styles
 */
export function inputIcon(position: 'left' | 'right' = 'left'): string {
  return cx(
    'absolute top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none',
    position === 'left' ? 'left-3' : 'right-3'
  )
}

/**
 * Input label styles
 */
export function inputLabel(options: { required?: boolean; error?: boolean } = {}): string {
  const { required = false, error = false } = options
  return cx(
    'block text-sm font-medium mb-2',
    error ? 'text-red-600 dark:text-red-400' : 'text-slate-700 dark:text-slate-300',
    required && "after:content-['*'] after:ml-0.5 after:text-red-500"
  )
}

/**
 * Input helper text styles
 */
export function inputHelper(error?: boolean): string {
  return cx(
    'text-xs mt-1.5',
    error ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'
  )
}

/**
 * Textarea styles (extends input)
 */
export function textarea(options: InputOptions & { resize?: 'none' | 'vertical' | 'horizontal' | 'both' } = {}): string {
  const { resize = 'vertical', ...inputOptions } = options
  const resizeStyles = {
    none: 'resize-none',
    vertical: 'resize-y',
    horizontal: 'resize-x',
    both: 'resize',
  }
  return cx(input(inputOptions), resizeStyles[resize], 'min-h-[100px]')
}

/**
 * Select styles
 */
export function select(options: InputOptions = {}): string {
  return cx(
    input(options),
    'appearance-none cursor-pointer',
    'bg-[length:20px] bg-no-repeat bg-[position:right_12px_center]',
    "bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E')]",
    'pr-10'
  )
}

/**
 * Checkbox styles
 */
export function checkbox(options: { error?: boolean; disabled?: boolean } = {}): string {
  const { error = false, disabled = false } = options
  return cx(
    'w-4 h-4 rounded border-2 transition-colors cursor-pointer',
    'focus:ring-2 focus:ring-offset-2',
    error
      ? 'border-red-500 text-red-500 focus:ring-red-500'
      : 'border-slate-300 dark:border-slate-600 text-coral-500 focus:ring-coral-500',
    disabled && 'opacity-50 cursor-not-allowed'
  )
}

/**
 * Radio styles
 */
export function radio(options: { error?: boolean; disabled?: boolean } = {}): string {
  const { error = false, disabled = false } = options
  return cx(
    'w-4 h-4 border-2 transition-colors cursor-pointer',
    'focus:ring-2 focus:ring-offset-2',
    error
      ? 'border-red-500 text-red-500 focus:ring-red-500'
      : 'border-slate-300 dark:border-slate-600 text-coral-500 focus:ring-coral-500',
    disabled && 'opacity-50 cursor-not-allowed'
  )
}

/**
 * Switch/Toggle styles
 */
export function switchTrack(options: { checked?: boolean; disabled?: boolean; size?: 'sm' | 'md' | 'lg' } = {}): string {
  const { checked = false, disabled = false, size = 'md' } = options
  const sizeMap = {
    sm: 'w-8 h-4',
    md: 'w-11 h-6',
    lg: 'w-14 h-7',
  }
  return cx(
    'relative inline-flex items-center rounded-full transition-colors cursor-pointer',
    sizeMap[size],
    checked ? 'bg-coral-500' : 'bg-slate-200 dark:bg-slate-700',
    disabled && 'opacity-50 cursor-not-allowed'
  )
}

export function switchThumb(options: { checked?: boolean; size?: 'sm' | 'md' | 'lg' } = {}): string {
  const { checked = false, size = 'md' } = options
  const sizeMap = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }
  const translateMap = {
    sm: checked ? 'translate-x-4' : 'translate-x-0.5',
    md: checked ? 'translate-x-5' : 'translate-x-1',
    lg: checked ? 'translate-x-7' : 'translate-x-1',
  }
  return cx(
    'inline-block rounded-full bg-white shadow transition-transform',
    sizeMap[size],
    translateMap[size]
  )
}
