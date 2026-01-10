/**
 * CoralCSS Vue Bindings
 *
 * Vue 3 integration for CoralCSS - provides composables, directives, and plugin.
 * @module vue
 */

export { CoralPlugin, createCoralPlugin } from './plugin'
export { useCoral, useCoralCSS, useClasses, useResponsive, provideCoralInstance } from './composables'
export { vCoral } from './directives'
export { cn, cx, cva } from './utils'
export type { CoralPluginOptions } from './plugin'
export type { VariantProps } from './utils'
