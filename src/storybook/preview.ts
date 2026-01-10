/**
 * CoralCSS Storybook Preview Configuration
 *
 * Configuration for Storybook preview (story rendering).
 * @module storybook/preview
 */

import { withCoralCSS, type CoralDecoratorConfig } from './decorator'
import { PARAM_KEY, type CoralCSSParameters } from './addon'

/**
 * Preview configuration options
 */
export interface CoralPreviewConfig extends CoralDecoratorConfig {
  /** Default parameters for all stories */
  defaultParameters?: CoralCSSParameters
  /** Global types for toolbar integration */
  globalTypes?: Record<string, GlobalType>
  /** Initial global values */
  initialGlobals?: Record<string, unknown>
}

/**
 * Storybook global type definition
 */
interface GlobalType {
  name?: string
  description?: string
  defaultValue?: unknown
  toolbar?: {
    icon?: string
    title?: string
    items?: Array<{ value: unknown; title: string; icon?: string }>
    dynamicTitle?: boolean
  }
}

/**
 * Create Storybook preview configuration for CoralCSS
 *
 * @example
 * ```typescript
 * // .storybook/preview.ts
 * import { coralPreviewConfig } from '@coral-css/core/storybook'
 *
 * const config = coralPreviewConfig({
 *   darkMode: 'class',
 *   enableDarkMode: true,
 * })
 *
 * export const decorators = config.decorators
 * export const parameters = config.parameters
 * export const globalTypes = config.globalTypes
 * ```
 */
export function coralPreviewConfig(options: CoralPreviewConfig = {}) {
  const {
    defaultParameters = {},
    globalTypes: customGlobalTypes = {},
    initialGlobals = {},
    ...decoratorConfig
  } = options

  // Create the decorator
  const coralDecorator = withCoralCSS(decoratorConfig)

  // Default global types for theme switching
  const defaultGlobalTypes: Record<string, GlobalType> = {
    theme: {
      name: 'Theme',
      description: 'Global theme for components',
      defaultValue: 'light',
      toolbar: {
        icon: 'paintbrush',
        title: 'Theme',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
    darkMode: {
      name: 'Dark Mode',
      description: 'Toggle dark mode',
      defaultValue: false,
      toolbar: {
        icon: 'moon',
        title: 'Dark Mode',
        items: [
          { value: false, title: 'Light Mode', icon: 'sun' },
          { value: true, title: 'Dark Mode', icon: 'moon' },
        ],
      },
    },
  }

  return {
    /**
     * Decorators array for Storybook
     */
    decorators: [coralDecorator],

    /**
     * Parameters for Storybook
     */
    parameters: {
      [PARAM_KEY]: {
        ...defaultParameters,
      },
      backgrounds: {
        default: 'light',
        values: [
          { name: 'light', value: '#ffffff' },
          { name: 'dark', value: '#1a1a2e' },
          { name: 'gray', value: '#f3f4f6' },
        ],
      },
      docs: {
        source: {
          language: 'html',
        },
      },
    },

    /**
     * Global types for toolbar
     */
    globalTypes: {
      ...(decoratorConfig.enableDarkMode ? defaultGlobalTypes : {}),
      ...customGlobalTypes,
    },

    /**
     * Initial global values
     */
    initialGlobals: {
      theme: 'light',
      darkMode: false,
      ...initialGlobals,
    },
  }
}

/**
 * Create decorators array with additional custom decorators
 *
 * @example
 * ```typescript
 * const decorators = createDecorators(
 *   { darkMode: 'class' },
 *   [myCustomDecorator]
 * )
 * ```
 */
export function createDecorators(
  config: CoralDecoratorConfig = {},
  additionalDecorators: Array<(Story: () => unknown, context: unknown) => unknown> = []
) {
  const coralDecorator = withCoralCSS(config)
  return [coralDecorator, ...additionalDecorators]
}

/**
 * Create parameters object for CoralCSS stories
 */
export function createParameters(
  coralParams: CoralCSSParameters = {},
  additionalParams: Record<string, unknown> = {}
) {
  return {
    [PARAM_KEY]: coralParams,
    ...additionalParams,
  }
}

/**
 * Create a story with CoralCSS parameters
 *
 * @example
 * ```typescript
 * export const Primary = createStory({
 *   render: () => '<button class="bg-coral-500 px-4 py-2">Click</button>',
 *   coralCSS: {
 *     highlightClasses: ['bg-coral-500'],
 *   },
 * })
 * ```
 */
export function createStory<T = unknown>(options: {
  render: () => T
  args?: Record<string, unknown>
  coralCSS?: CoralCSSParameters
  parameters?: Record<string, unknown>
}) {
  const { render, args = {}, coralCSS = {}, parameters = {} } = options

  return {
    render,
    args,
    parameters: {
      ...parameters,
      [PARAM_KEY]: coralCSS,
    },
  }
}

/**
 * Helper to extract CoralCSS parameters from story context
 */
export function getCoralParameters(
  context: { parameters?: Record<string, unknown> }
): CoralCSSParameters {
  return (context.parameters?.[PARAM_KEY] as CoralCSSParameters) || {}
}

/**
 * Check if CoralCSS is disabled for a story
 */
export function isCoralDisabled(
  context: { parameters?: Record<string, unknown> }
): boolean {
  const params = getCoralParameters(context)
  return params.disable === true
}
