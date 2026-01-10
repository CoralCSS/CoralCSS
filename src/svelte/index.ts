/**
 * CoralCSS Svelte Bindings
 *
 * Svelte integration for CoralCSS - provides stores, actions, and utilities.
 * @module svelte
 */

export { createCoralStore, coralStore, getCoralContext, setCoralContext } from './store'
export { coral, coralHover, coralFocus } from './actions'
export { cn, cx, cva } from './utils'
export type { CoralStore, CoralStoreOptions } from './store'
export type { VariantProps } from './utils'
