/**
 * CoralCSS Storybook Integration
 *
 * Storybook addon and decorators for CoralCSS.
 * @module storybook
 */

export { withCoralCSS, type CoralDecoratorConfig } from './decorator'
export { CoralCSSAddon, ADDON_ID, PANEL_ID, TOOL_ID } from './addon'
export { coralPreviewConfig, type CoralPreviewConfig } from './preview'
export { coralManagerConfig, type CoralManagerConfig } from './manager'
export { createThemeDecorator, withThemeSwitcher } from './theme'
export {
  createStoryDoc,
  generateClassDoc,
  createPropsTable,
  type StoryDocConfig,
} from './docs'
