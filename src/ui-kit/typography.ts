/**
 * Typography Component Styles
 * @module ui-kit/typography
 */

import { cx } from './index'

export type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
export type TextWeight = 'thin' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'

export interface TextOptions {
  size?: TextSize
  weight?: TextWeight
  align?: TextAlign
  muted?: boolean
  truncate?: boolean | number
  gradient?: boolean
}

const sizeStyles: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
}

const weightStyles: Record<TextWeight, string> = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
  extrabold: 'font-extrabold',
}

const alignStyles: Record<TextAlign, string> = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right',
  justify: 'text-justify',
}

const headingSizes: Record<HeadingLevel, string> = {
  h1: 'text-4xl sm:text-5xl font-bold',
  h2: 'text-3xl sm:text-4xl font-bold',
  h3: 'text-2xl sm:text-3xl font-semibold',
  h4: 'text-xl sm:text-2xl font-semibold',
  h5: 'text-lg sm:text-xl font-semibold',
  h6: 'text-base sm:text-lg font-semibold',
}

/**
 * Heading styles
 */
export function heading(level: HeadingLevel = 'h1', options: Omit<TextOptions, 'size' | 'weight'> = {}): string {
  const { align, muted = false, truncate = false, gradient = false } = options
  return cx(
    headingSizes[level],
    'leading-tight tracking-tight',
    muted ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white',
    align && alignStyles[align],
    truncate === true && 'truncate',
    typeof truncate === 'number' && `line-clamp-${truncate}`,
    gradient && 'bg-gradient-to-r from-coral-500 to-pink-500 bg-clip-text text-transparent'
  )
}

/**
 * Text/paragraph styles
 */
export function text(options: TextOptions = {}): string {
  const {
    size = 'base',
    weight = 'normal',
    align,
    muted = false,
    truncate = false,
    gradient = false,
  } = options

  return cx(
    sizeStyles[size],
    weightStyles[weight],
    muted ? 'text-slate-600 dark:text-slate-400' : 'text-slate-900 dark:text-white',
    align && alignStyles[align],
    truncate === true && 'truncate',
    typeof truncate === 'number' && `line-clamp-${truncate}`,
    gradient && 'bg-gradient-to-r from-coral-500 to-pink-500 bg-clip-text text-transparent'
  )
}

/**
 * Label text (for forms, etc.)
 */
export function label(options: { required?: boolean; disabled?: boolean } = {}): string {
  const { required = false, disabled = false } = options
  return cx(
    'block text-sm font-medium text-slate-700 dark:text-slate-300',
    required && "after:content-['*'] after:ml-0.5 after:text-red-500",
    disabled && 'opacity-50'
  )
}

/**
 * Helper/description text
 */
export function helperText(options: { error?: boolean } = {}): string {
  const { error = false } = options
  return cx(
    'text-sm',
    error ? 'text-red-600 dark:text-red-400' : 'text-slate-500 dark:text-slate-400'
  )
}

/**
 * Link styles
 */
export function link(options: { variant?: 'default' | 'subtle' | 'underline'; external?: boolean } = {}): string {
  const { variant = 'default', external = false } = options
  const variants = {
    default: 'text-coral-600 dark:text-coral-400 hover:text-coral-700 dark:hover:text-coral-300',
    subtle: 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white',
    underline: 'text-coral-600 dark:text-coral-400 underline underline-offset-2 hover:text-coral-700',
  }
  return cx(
    'transition-colors',
    variants[variant],
    external && 'inline-flex items-center gap-1'
  )
}

/**
 * Code/monospace text
 */
export function code(options: { block?: boolean } = {}): string {
  const { block = false } = options
  return cx(
    'font-mono text-sm',
    block
      ? 'block p-4 bg-slate-100 dark:bg-slate-800 rounded-xl overflow-x-auto'
      : 'px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded text-coral-600 dark:text-coral-400'
  )
}

/**
 * Keyboard shortcut display
 */
export function kbd(): string {
  return cx(
    'inline-flex items-center justify-center px-2 py-1 text-xs font-medium',
    'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700',
    'rounded shadow-sm min-w-[1.5rem]'
  )
}

/**
 * Blockquote styles
 */
export function blockquote(): string {
  return cx(
    'pl-4 border-l-4 border-coral-500 italic',
    'text-slate-600 dark:text-slate-400'
  )
}

/**
 * Lead/intro paragraph
 */
export function lead(): string {
  return 'text-xl text-slate-600 dark:text-slate-400 leading-relaxed'
}

/**
 * Small/fine print text
 */
export function small(): string {
  return 'text-xs text-slate-500 dark:text-slate-400'
}

/**
 * Highlight/mark text
 */
export function highlight(color: string = 'yellow'): string {
  return `bg-${color}-200 dark:bg-${color}-500/30 px-1 rounded`
}

/**
 * Strikethrough text
 */
export function strikethrough(): string {
  return 'line-through text-slate-500'
}

/**
 * List styles
 */
export function list(options: { variant?: 'disc' | 'decimal' | 'none'; spacing?: 'tight' | 'normal' | 'loose' } = {}): string {
  const { variant = 'disc', spacing = 'normal' } = options
  const variantStyles = {
    disc: 'list-disc list-inside',
    decimal: 'list-decimal list-inside',
    none: 'list-none',
  }
  const spacingStyles = {
    tight: 'space-y-1',
    normal: 'space-y-2',
    loose: 'space-y-3',
  }
  return cx(variantStyles[variant], spacingStyles[spacing])
}

/**
 * List item
 */
export function listItem(): string {
  return 'text-slate-700 dark:text-slate-300'
}

/**
 * Prose container (for rich text/markdown content)
 */
export function prose(options: { size?: 'sm' | 'base' | 'lg' } = {}): string {
  const { size = 'base' } = options
  const sizeMap = {
    sm: 'prose-sm',
    base: 'prose',
    lg: 'prose-lg',
  }
  return cx(
    sizeMap[size],
    'prose-slate dark:prose-invert',
    'prose-headings:font-bold prose-headings:tracking-tight',
    'prose-a:text-coral-600 dark:prose-a:text-coral-400',
    'prose-code:text-coral-600 dark:prose-code:text-coral-400',
    'prose-pre:bg-slate-100 dark:prose-pre:bg-slate-800',
    'max-w-none'
  )
}
