/**
 * CoralCSS Storybook Manager Configuration
 *
 * Configuration for Storybook manager (UI/addon panel).
 * @module storybook/manager
 */

import {
  ADDON_ID,
  PANEL_ID,
  TOOL_ID,
  EVENTS,
  type AddonState,
  type PanelType,
} from './addon'

/**
 * Manager configuration options
 */
export interface CoralManagerConfig {
  /** Enable CSS panel */
  showCSSPanel?: boolean
  /** Enable classes panel */
  showClassesPanel?: boolean
  /** Enable theme panel */
  showThemePanel?: boolean
  /** Enable toolbar */
  showToolbar?: boolean
  /** Custom panel title */
  panelTitle?: string
  /** Panel position */
  panelPosition?: 'bottom' | 'right'
}

/**
 * Create Storybook manager configuration for CoralCSS
 *
 * @example
 * ```typescript
 * // .storybook/manager.ts
 * import { addons } from '@storybook/manager-api'
 * import { coralManagerConfig } from '@coral-css/core/storybook'
 *
 * const config = coralManagerConfig({
 *   showCSSPanel: true,
 *   showToolbar: true,
 * })
 *
 * addons.register(config.addonId, config.register)
 * ```
 */
export function coralManagerConfig(options: CoralManagerConfig = {}) {
  const {
    showCSSPanel = true,
    showClassesPanel = true,
    showThemePanel = true,
    showToolbar = true,
    panelTitle = 'CoralCSS',
    panelPosition = 'bottom',
  } = options

  return {
    /**
     * Addon ID
     */
    addonId: ADDON_ID,

    /**
     * Panel ID
     */
    panelId: PANEL_ID,

    /**
     * Tool ID
     */
    toolId: TOOL_ID,

    /**
     * Panel configuration
     */
    panel: {
      id: PANEL_ID,
      title: panelTitle,
      position: panelPosition,
    },

    /**
     * Features enabled
     */
    features: {
      cssPanel: showCSSPanel,
      classesPanel: showClassesPanel,
      themePanel: showThemePanel,
      toolbar: showToolbar,
    },

    /**
     * Register function for Storybook addons API
     *
     * Use with @storybook/manager-api:
     * ```typescript
     * import { addons } from '@storybook/manager-api'
     * addons.register(config.addonId, config.register)
     * ```
     */
    register: (api: StorybookAPI) => {
      // This provides the configuration structure
      // Actual panel rendering is framework-specific
      return {
        api,
        panelId: PANEL_ID,
        toolId: TOOL_ID,
        events: EVENTS,
        features: {
          cssPanel: showCSSPanel,
          classesPanel: showClassesPanel,
          themePanel: showThemePanel,
          toolbar: showToolbar,
        },
      }
    },

    /**
     * Get addon manifest
     */
    getManifest: () => ({
      name: 'CoralCSS',
      displayName: 'CoralCSS',
      description: 'CoralCSS integration for Storybook',
      author: 'CoralCSS Team',
      version: '1.0.0',
      supports: {
        storybook: '7.x || 8.x',
      },
      entries: {
        manager: './manager',
        preview: './preview',
      },
    }),
  }
}

/**
 * Storybook API type (simplified)
 */
interface StorybookAPI {
  on: (event: string, handler: (data: unknown) => void) => void
  emit: (event: string, data: unknown) => void
  getChannel: () => {
    on: (event: string, handler: (data: unknown) => void) => void
    emit: (event: string, data: unknown) => void
  }
  getCurrentStoryData: () => unknown
  getParameters: (parameterName?: string) => unknown
}

/**
 * Create a state manager for the addon
 */
export function createStateManager(api: StorybookAPI) {
  let state: AddonState = {
    activePanel: 'css',
    generatedCSS: '',
    usedClasses: [],
    theme: {},
    darkMode: false,
  }

  const listeners = new Set<(state: AddonState) => void>()

  const channel = api.getChannel()

  // Listen for events
  channel.on(EVENTS.CSS_GENERATED, (data: unknown) => {
    const { css } = data as { css: string }
    state = { ...state, generatedCSS: css }
    notifyListeners()
  })

  channel.on(EVENTS.CLASSES_USED, (data: unknown) => {
    const { classes } = data as { classes: string[] }
    state = { ...state, usedClasses: classes }
    notifyListeners()
  })

  channel.on(EVENTS.DARK_MODE_TOGGLED, (data: unknown) => {
    const { enabled } = data as { enabled: boolean }
    state = { ...state, darkMode: enabled }
    notifyListeners()
  })

  channel.on(EVENTS.THEME_CHANGED, (data: unknown) => {
    const { theme } = data as { theme: Record<string, unknown> }
    state = { ...state, theme }
    notifyListeners()
  })

  function notifyListeners() {
    listeners.forEach((listener) => listener(state))
  }

  return {
    /**
     * Get current state
     */
    getState(): AddonState {
      return state
    },

    /**
     * Set active panel
     */
    setActivePanel(panel: PanelType): void {
      state = { ...state, activePanel: panel }
      notifyListeners()
    },

    /**
     * Toggle dark mode
     */
    toggleDarkMode(): void {
      state = { ...state, darkMode: !state.darkMode }
      channel.emit(EVENTS.DARK_MODE_TOGGLED, { enabled: state.darkMode })
      notifyListeners()
    },

    /**
     * Subscribe to state changes
     */
    subscribe(listener: (state: AddonState) => void): () => void {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },

    /**
     * Request state update from preview
     */
    requestState(): void {
      channel.emit(EVENTS.REQUEST_STATE, {})
    },
  }
}

/**
 * Create panel tabs configuration
 */
export function createPanelTabs(config: CoralManagerConfig = {}) {
  const tabs: Array<{ id: PanelType; title: string; icon: string }> = []

  if (config.showCSSPanel !== false) {
    tabs.push({ id: 'css', title: 'Generated CSS', icon: 'code' })
  }

  if (config.showClassesPanel !== false) {
    tabs.push({ id: 'classes', title: 'Used Classes', icon: 'list' })
  }

  if (config.showThemePanel !== false) {
    tabs.push({ id: 'theme', title: 'Theme', icon: 'paintbrush' })
  }

  return tabs
}

/**
 * Format CSS for display
 */
export function formatCSSDisplay(css: string): string {
  // Add line breaks after } for readability
  return css
    .replace(/}\s*/g, '}\n\n')
    .replace(/;\s*/g, ';\n  ')
    .replace(/{\s*/g, '{\n  ')
    .trim()
}

/**
 * Group classes by prefix
 */
export function groupClassesByPrefix(classes: string[]): Record<string, string[]> {
  const groups: Record<string, string[]> = {}

  for (const cls of classes) {
    const prefix = cls.split('-')[0] || 'other'
    if (!groups[prefix]) {
      groups[prefix] = []
    }
    groups[prefix].push(cls)
  }

  return groups
}
