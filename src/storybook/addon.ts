/**
 * CoralCSS Storybook Addon
 *
 * Addon configuration for Storybook UI integration.
 * @module storybook/addon
 */

/**
 * Addon identifiers
 */
export const ADDON_ID = 'coral-css'
export const PANEL_ID = `${ADDON_ID}/panel`
export const TOOL_ID = `${ADDON_ID}/tool`
export const PARAM_KEY = 'coralCSS'

/**
 * Addon panel types
 */
export type PanelType = 'css' | 'classes' | 'theme'

/**
 * Addon state
 */
export interface AddonState {
  /** Currently active panel */
  activePanel: PanelType
  /** Generated CSS content */
  generatedCSS: string
  /** List of used classes */
  usedClasses: string[]
  /** Current theme values */
  theme: Record<string, unknown>
  /** Dark mode enabled */
  darkMode: boolean
}

/**
 * Addon parameters
 */
export interface CoralCSSParameters {
  /** Disable the addon for this story */
  disable?: boolean
  /** Override theme for this story */
  theme?: Record<string, unknown>
  /** Override dark mode for this story */
  darkMode?: boolean
  /** Classes to highlight in the panel */
  highlightClasses?: string[]
}

/**
 * Create addon registration object
 *
 * This provides the configuration needed for Storybook's addon system.
 * Use this with Storybook's @storybook/addons API.
 *
 * @example
 * ```typescript
 * // .storybook/manager.ts
 * import { addons } from '@storybook/manager-api'
 * import { CoralCSSAddon } from '@coral-css/core/storybook'
 *
 * addons.register(CoralCSSAddon.id, CoralCSSAddon.register)
 * ```
 */
export const CoralCSSAddon = {
  id: ADDON_ID,

  /**
   * Register function for Storybook addons API
   */
  register: () => {
    return {
      id: ADDON_ID,
      title: 'CoralCSS',
    }
  },

  /**
   * Get panel configuration
   */
  getPanel: () => ({
    id: PANEL_ID,
    title: 'CoralCSS',
    render: () => null, // Framework-specific render
  }),

  /**
   * Get tool configuration
   */
  getTool: () => ({
    id: TOOL_ID,
    title: 'Theme',
    render: () => null, // Framework-specific render
  }),

  /**
   * Default parameters
   */
  defaultParameters: {
    disable: false,
    darkMode: false,
    highlightClasses: [],
  } as CoralCSSParameters,
}

/**
 * Create a panel content generator
 *
 * @example
 * ```typescript
 * const panelContent = createPanelContent({
 *   css: '.bg-red-500 { background-color: #ef4444; }',
 *   classes: ['bg-red-500', 'p-4', 'rounded'],
 *   theme: defaultTheme,
 * })
 *
 * console.log(panelContent.getHTML()) // Panel HTML
 * ```
 */
export function createPanelContent(options: {
  css: string
  classes: string[]
  theme?: Record<string, unknown>
  darkMode?: boolean
}) {
  const { css, classes, theme = {}, darkMode = false } = options

  return {
    /**
     * Get CSS panel content
     */
    getCSSContent(): string {
      return css
    },

    /**
     * Get classes panel content
     */
    getClassesContent(): { name: string; count: number }[] {
      const counts = new Map<string, number>()
      for (const cls of classes) {
        counts.set(cls, (counts.get(cls) || 0) + 1)
      }
      return Array.from(counts.entries())
        .map(([name, count]) => ({ name, count }))
        .sort((a, b) => b.count - a.count)
    },

    /**
     * Get theme panel content
     */
    getThemeContent(): Record<string, unknown> {
      return theme
    },

    /**
     * Get simple HTML representation (for non-React panels)
     */
    getHTML(): string {
      const cssPreview = css
        ? `<pre style="white-space: pre-wrap; font-size: 12px; font-family: monospace;">${escapeHTML(css)}</pre>`
        : '<p>No CSS generated</p>'

      const classesPreview = classes.length > 0
        ? `<ul>${classes.map((c) => `<li><code>${escapeHTML(c)}</code></li>`).join('')}</ul>`
        : '<p>No classes used</p>'

      return `
        <div style="padding: 16px;">
          <h3>Generated CSS</h3>
          ${cssPreview}
          <h3>Used Classes (${classes.length})</h3>
          ${classesPreview}
          <h3>Dark Mode</h3>
          <p>${darkMode ? 'Enabled' : 'Disabled'}</p>
        </div>
      `
    },
  }
}

/**
 * Escape HTML special characters
 */
function escapeHTML(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

/**
 * Create toolbar items configuration
 */
export function createToolbarItems(options: {
  onDarkModeToggle?: (enabled: boolean) => void
  onThemeChange?: (theme: string) => void
  themes?: string[]
}) {
  const { themes = ['light', 'dark'] } = options

  return {
    darkModeToggle: {
      id: 'coral-dark-mode',
      title: 'Dark Mode',
      type: 'button' as const,
      onClick: options.onDarkModeToggle,
    },
    themeSelector: {
      id: 'coral-theme',
      title: 'Theme',
      type: 'select' as const,
      options: themes.map((t) => ({ value: t, label: t })),
      onChange: options.onThemeChange,
    },
  }
}

/**
 * Event channel names for Storybook communication
 */
export const EVENTS = {
  /** CSS was generated */
  CSS_GENERATED: `${ADDON_ID}/css-generated`,
  /** Classes were used */
  CLASSES_USED: `${ADDON_ID}/classes-used`,
  /** Dark mode toggled */
  DARK_MODE_TOGGLED: `${ADDON_ID}/dark-mode-toggled`,
  /** Theme changed */
  THEME_CHANGED: `${ADDON_ID}/theme-changed`,
  /** Request current state */
  REQUEST_STATE: `${ADDON_ID}/request-state`,
  /** State update */
  STATE_UPDATE: `${ADDON_ID}/state-update`,
}

/**
 * Emit event helper
 */
export function createEventEmitter(channel: {
  emit: (event: string, data: unknown) => void
}) {
  return {
    emitCSSGenerated(css: string) {
      channel.emit(EVENTS.CSS_GENERATED, { css })
    },
    emitClassesUsed(classes: string[]) {
      channel.emit(EVENTS.CLASSES_USED, { classes })
    },
    emitDarkModeToggled(enabled: boolean) {
      channel.emit(EVENTS.DARK_MODE_TOGGLED, { enabled })
    },
    emitThemeChanged(theme: Record<string, unknown>) {
      channel.emit(EVENTS.THEME_CHANGED, { theme })
    },
    emitStateUpdate(state: Partial<AddonState>) {
      channel.emit(EVENTS.STATE_UPDATE, state)
    },
  }
}
