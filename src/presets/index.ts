/**
 * CoralCSS Presets
 *
 * Pre-configured plugin bundles for different use cases.
 * @module presets
 */

export { coralPreset, coralPresetConfig } from './coral'
export type { CoralPresetOptions } from './coral'

export { windPreset } from './wind'
export type { WindPresetOptions } from './wind'

export { miniPreset } from './mini'
export type { MiniPresetOptions } from './mini'

export { fullPreset } from './full'
export type { FullPresetOptions } from './full'

// Default export
export { coralPreset as default } from './coral'
