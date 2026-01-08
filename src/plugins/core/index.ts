/**
 * Core Plugins
 *
 * All core plugins for CoralCSS including utilities and variants.
 * @module plugins/core
 */

// Utilities
export * from './utilities'
export { coreUtilitiesPlugins } from './utilities'

// Variants
export * from './variants'
export { coreVariantsPlugins } from './variants'

import type { Plugin } from '../../types'

import { coreUtilitiesPlugins } from './utilities'
import { coreVariantsPlugins } from './variants'

/**
 * Get all core plugins (utilities + variants)
 */
export function corePlugins(): Plugin[] {
  return [...coreUtilitiesPlugins(), ...coreVariantsPlugins()]
}

export default corePlugins
