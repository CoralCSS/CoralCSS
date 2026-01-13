/**
 * Core Variants Plugins
 *
 * All core variant plugins for CoralCSS.
 * @module plugins/core/variants
 */

export { pseudoVariantsPlugin } from './pseudo'
export { responsiveVariantsPlugin } from './responsive'
export { darkModeVariantsPlugin } from './dark'
export type { DarkModeVariantsOptions } from './dark'
export { modernVariantsPlugin } from './modern'
export { stateVariantsPlugin } from './state'
// Tailwind 4.1+ Compatible Variants
export { pointerVariantsPlugin } from './pointer'

import type { Plugin } from '../../../types'

import { pseudoVariantsPlugin } from './pseudo'
import { responsiveVariantsPlugin } from './responsive'
import { darkModeVariantsPlugin } from './dark'
import { modernVariantsPlugin } from './modern'
import { stateVariantsPlugin } from './state'
// Tailwind 4.1+ Compatible Variants
import { pointerVariantsPlugin } from './pointer'

/**
 * Get all core variant plugins
 */
export function coreVariantsPlugins(): Plugin[] {
  return [
    pseudoVariantsPlugin(),
    responsiveVariantsPlugin(),
    darkModeVariantsPlugin(),
    modernVariantsPlugin(),
    stateVariantsPlugin(),
    // Tailwind 4.1+ Compatible Variants
    pointerVariantsPlugin(),
  ]
}

export default coreVariantsPlugins
