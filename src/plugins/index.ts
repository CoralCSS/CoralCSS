/**
 * CoralCSS Plugins
 *
 * All plugins for CoralCSS.
 * @module plugins
 */

// Core plugins
export * from './core'
export { corePlugins, coreUtilitiesPlugins, coreVariantsPlugins } from './core'

// Modern CSS plugin
export { modernCSSPlugin } from './core/modern'

// Individual utility plugins
export {
  spacingPlugin,
  sizingPlugin,
  colorsPlugin,
  typographyPlugin,
  layoutPlugin,
  flexboxPlugin,
  gridPlugin,
  bordersPlugin,
  effectsPlugin,
  filtersPlugin,
  transformsPlugin,
  transitionsPlugin,
  interactivityPlugin,
  backgroundsPlugin,
} from './core/utilities'

// Individual variant plugins
export {
  pseudoVariantsPlugin,
  responsiveVariantsPlugin,
  darkModeVariantsPlugin,
  modernVariantsPlugin,
} from './core/variants'

// Type exports
export type { DarkModeVariantsOptions } from './core/variants'
