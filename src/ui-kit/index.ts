/**
 * CoralCSS UI Kit
 *
 * Pre-built, theme-aware component styles with variants.
 * Each component exports a function that returns class strings.
 *
 * @module ui-kit
 */

export * from './button'
export * from './input'
export * from './card'
export * from './badge'
export * from './avatar'
export * from './alert'
export * from './modal'
export * from './dropdown'
export * from './tabs'
export * from './toast'
export * from './typography'
export * from './progress'
export * from './skeleton'

/**
 * Common types for all UI Kit components
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type Variant = 'solid' | 'soft' | 'outline' | 'ghost'
export type Color = 'coral' | 'slate' | 'red' | 'green' | 'blue' | 'yellow' | 'purple' | 'pink' | 'cyan' | 'orange'
export type Radius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'

/**
 * Helper to merge class strings
 */
export function cx(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

/**
 * Helper to create component variants
 */
export function createVariants<T extends Record<string, Record<string, string>>>(
  base: string,
  variants: T,
  defaults?: Partial<{ [K in keyof T]: keyof T[K] }>
) {
  return (options?: Partial<{ [K in keyof T]: keyof T[K] }>) => {
    const merged = { ...defaults, ...options }
    const variantClasses = Object.entries(merged)
      .map(([key, value]) => variants[key]?.[value as string])
      .filter(Boolean)
      .join(' ')
    return cx(base, variantClasses)
  }
}

/**
 * Component style registry for discovery
 */
export interface ComponentStyle {
  name: string
  description: string
  variants: string[]
  sizes: string[]
}

export const uiKitRegistry: Record<string, ComponentStyle> = {
  button: {
    name: 'Button',
    description: 'Interactive button with multiple variants',
    variants: ['solid', 'soft', 'outline', 'ghost'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl'],
  },
  input: {
    name: 'Input',
    description: 'Form input field',
    variants: ['default', 'filled', 'flushed'],
    sizes: ['sm', 'md', 'lg'],
  },
  card: {
    name: 'Card',
    description: 'Content container',
    variants: ['elevated', 'outlined', 'filled'],
    sizes: ['sm', 'md', 'lg'],
  },
  badge: {
    name: 'Badge',
    description: 'Status label',
    variants: ['solid', 'soft', 'outline', 'dot'],
    sizes: ['xs', 'sm', 'md'],
  },
  avatar: {
    name: 'Avatar',
    description: 'User representation',
    variants: ['circular', 'rounded', 'square'],
    sizes: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
  },
  alert: {
    name: 'Alert',
    description: 'Contextual feedback message',
    variants: ['solid', 'soft', 'outline', 'left-accent'],
    sizes: ['sm', 'md', 'lg'],
  },
  modal: {
    name: 'Modal',
    description: 'Dialog overlay',
    variants: ['centered', 'top', 'drawer'],
    sizes: ['sm', 'md', 'lg', 'xl', 'full'],
  },
  toast: {
    name: 'Toast',
    description: 'Notification message',
    variants: ['solid', 'soft', 'minimal'],
    sizes: ['sm', 'md'],
  },
}
