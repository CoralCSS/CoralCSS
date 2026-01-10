/**
 * CoralCSS Storybook Theme Utilities
 *
 * Theme switching and dark mode support for Storybook.
 * @module storybook/theme
 */

import type { CoralDecoratorConfig } from './decorator'

/**
 * Theme configuration
 */
export interface ThemeConfig {
  /** Available themes */
  themes: Record<string, ThemeDefinition>
  /** Default theme name */
  defaultTheme?: string
  /** Dark mode theme name */
  darkTheme?: string
  /** CSS variable prefix */
  cssVarPrefix?: string
}

/**
 * Theme definition
 */
export interface ThemeDefinition {
  /** Theme name */
  name: string
  /** Theme display label */
  label?: string
  /** CSS class to apply */
  className?: string
  /** CSS variables to set */
  cssVars?: Record<string, string>
  /** Whether this is a dark theme */
  isDark?: boolean
  /** Background color for preview */
  background?: string
}

/**
 * Create a theme decorator for Storybook
 *
 * @example
 * ```typescript
 * const themeDecorator = createThemeDecorator({
 *   themes: {
 *     light: { name: 'light', className: '', background: '#ffffff' },
 *     dark: { name: 'dark', className: 'dark', isDark: true, background: '#1a1a2e' },
 *     ocean: { name: 'ocean', className: 'theme-ocean', background: '#0a192f' },
 *   },
 *   defaultTheme: 'light',
 * })
 *
 * export const decorators = [themeDecorator]
 * ```
 */
export function createThemeDecorator(config: ThemeConfig) {
  const { themes, defaultTheme = 'light', cssVarPrefix = '--coral' } = config

  return function themeDecorator(
    Story: () => unknown,
    context: { globals?: Record<string, unknown> }
  ) {
    const themeName = (context.globals?.theme as string) || defaultTheme
    const theme = themes[themeName]

    if (typeof document !== 'undefined' && theme) {
      const root = document.documentElement

      // Remove all theme classes
      Object.values(themes).forEach((t) => {
        if (t.className) {
          root.classList.remove(t.className)
        }
      })

      // Add current theme class
      if (theme.className) {
        root.classList.add(theme.className)
      }

      // Set CSS variables
      if (theme.cssVars) {
        Object.entries(theme.cssVars).forEach(([key, value]) => {
          const varName = key.startsWith('--') ? key : `${cssVarPrefix}-${key}`
          root.style.setProperty(varName, value)
        })
      }

      // Set dark mode attribute
      if (theme.isDark) {
        root.setAttribute('data-theme', 'dark')
        root.classList.add('dark')
      } else {
        root.setAttribute('data-theme', 'light')
        root.classList.remove('dark')
      }
    }

    return Story()
  }
}

/**
 * Create theme switcher toolbar configuration
 *
 * @example
 * ```typescript
 * export const globalTypes = {
 *   theme: withThemeSwitcher({
 *     themes: {
 *       light: { name: 'light', label: 'Light' },
 *       dark: { name: 'dark', label: 'Dark', isDark: true },
 *     },
 *   }),
 * }
 * ```
 */
export function withThemeSwitcher(config: ThemeConfig) {
  const { themes, defaultTheme = 'light' } = config

  const items = Object.entries(themes).map(([key, theme]) => ({
    value: key,
    title: theme.label || theme.name,
    icon: theme.isDark ? 'moon' : 'sun',
  }))

  return {
    name: 'Theme',
    description: 'Switch between themes',
    defaultValue: defaultTheme,
    toolbar: {
      icon: 'paintbrush',
      title: 'Theme',
      items,
      dynamicTitle: true,
    },
  }
}

/**
 * Predefined theme configurations
 */
export const presetThemes: Record<string, ThemeConfig> = {
  /**
   * Basic light/dark theme
   */
  basic: {
    themes: {
      light: {
        name: 'light',
        label: 'Light',
        className: '',
        background: '#ffffff',
        isDark: false,
      },
      dark: {
        name: 'dark',
        label: 'Dark',
        className: 'dark',
        background: '#1a1a2e',
        isDark: true,
      },
    },
    defaultTheme: 'light',
    darkTheme: 'dark',
  },

  /**
   * Coral brand themes
   */
  coral: {
    themes: {
      light: {
        name: 'light',
        label: 'Coral Light',
        className: '',
        background: '#ffffff',
        isDark: false,
        cssVars: {
          'primary': '#ff6b6b',
          'primary-dark': '#ee5a5a',
        },
      },
      dark: {
        name: 'dark',
        label: 'Coral Dark',
        className: 'dark',
        background: '#1a1a2e',
        isDark: true,
        cssVars: {
          'primary': '#ff7b7b',
          'primary-dark': '#ff6b6b',
        },
      },
      ocean: {
        name: 'ocean',
        label: 'Ocean',
        className: 'theme-ocean',
        background: '#0a192f',
        isDark: true,
        cssVars: {
          'primary': '#64ffda',
          'primary-dark': '#4fd1c5',
        },
      },
    },
    defaultTheme: 'light',
    darkTheme: 'dark',
  },
}

/**
 * Create theme-aware background decorator
 */
export function createBackgroundDecorator(config: ThemeConfig) {
  return function backgroundDecorator(
    Story: () => unknown,
    context: { globals?: Record<string, unknown> }
  ) {
    const themeName = (context.globals?.theme as string) || config.defaultTheme || 'light'
    const theme = config.themes[themeName]

    if (typeof document !== 'undefined' && theme?.background) {
      document.body.style.backgroundColor = theme.background
    }

    return Story()
  }
}

/**
 * Get current theme from context
 */
export function getCurrentTheme(
  context: { globals?: Record<string, unknown> },
  config: ThemeConfig
): ThemeDefinition | undefined {
  const themeName = (context.globals?.theme as string) || config.defaultTheme || 'light'
  return config.themes[themeName]
}

/**
 * Check if current theme is dark
 */
export function isDarkTheme(
  context: { globals?: Record<string, unknown> },
  config: ThemeConfig
): boolean {
  const theme = getCurrentTheme(context, config)
  return theme?.isDark === true
}

/**
 * Create color scheme media query handler
 */
export function createColorSchemeHandler(
  onLight: () => void,
  onDark: () => void
) {
  if (typeof window === 'undefined') {
    return { destroy: () => {} }
  }

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

  const handler = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
      onDark()
    } else {
      onLight()
    }
  }

  // Initial check
  handler(mediaQuery)

  // Listen for changes
  mediaQuery.addEventListener('change', handler)

  return {
    destroy: () => {
      mediaQuery.removeEventListener('change', handler)
    },
  }
}

/**
 * Apply theme to element
 */
export function applyThemeToElement(
  element: HTMLElement,
  theme: ThemeDefinition,
  cssVarPrefix = '--coral'
) {
  if (theme.className) {
    element.classList.add(theme.className)
  }

  if (theme.cssVars) {
    Object.entries(theme.cssVars).forEach(([key, value]) => {
      const varName = key.startsWith('--') ? key : `${cssVarPrefix}-${key}`
      element.style.setProperty(varName, value)
    })
  }

  if (theme.isDark) {
    element.setAttribute('data-theme', 'dark')
  } else {
    element.setAttribute('data-theme', 'light')
  }
}
