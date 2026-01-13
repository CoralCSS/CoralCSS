/**
 * CoralCSS Configuration System
 *
 * CSS-first and JavaScript configuration for CoralCSS.
 *
 * @module config
 */

export { parseCSSConfig, mergeConfigs, extractCoralDirectives, validateCSSConfig, type ParsedCSSConfig } from './css-parser'
export { cssConfigPlugin, createCoralWithCSS, generateCSSConfigTemplate, type CSSConfigPluginOptions } from './css-config'
// Tailwind 4.1+ Compatible CSS Theme Parser
export {
  parseCSSTheme,
  generateCSSTheme,
  validateCSSTheme,
  getThemeValue,
  mergeCSSThemes,
  createCSSThemePreset,
} from './css-theme-parser'
