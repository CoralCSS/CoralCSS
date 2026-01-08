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

import type { Plugin } from '../../../types'

import { pseudoVariantsPlugin } from './pseudo'
import { responsiveVariantsPlugin } from './responsive'
import { darkModeVariantsPlugin } from './dark'
import { modernVariantsPlugin } from './modern'
import { stateVariantsPlugin } from './state'

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
  ]
}

export default coreVariantsPlugins
