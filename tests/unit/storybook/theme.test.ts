/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import {
  createThemeDecorator,
  withThemeSwitcher,
  presetThemes,
  createBackgroundDecorator,
  getCurrentTheme,
  isDarkTheme,
  createColorSchemeHandler,
  applyThemeToElement,
  type ThemeConfig,
} from '../../../src/storybook/theme'

describe('Storybook Theme', () => {
  const mockThemeConfig: ThemeConfig = {
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
        cssVars: {
          primary: '#ff6b6b',
        },
      },
      custom: {
        name: 'custom',
        label: 'Custom',
        className: 'theme-custom',
        isDark: false,
        cssVars: {
          '--custom-var': 'blue',
        },
      },
    },
    defaultTheme: 'light',
  }

  beforeEach(() => {
    document.documentElement.className = ''
    document.documentElement.style.cssText = ''
    document.documentElement.removeAttribute('data-theme')
  })

  describe('createThemeDecorator', () => {
    it('should create a decorator function', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      expect(typeof decorator).toBe('function')
    })

    it('should return story result', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      const Story = () => '<div>Test</div>'
      const result = decorator(Story, { globals: {} })
      expect(result).toBe('<div>Test</div>')
    })

    it('should apply theme class', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'dark' } })

      expect(document.documentElement.classList.contains('dark')).toBe(true)
    })

    it('should remove other theme classes', () => {
      document.documentElement.classList.add('dark', 'theme-custom')

      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'light' } })

      expect(document.documentElement.classList.contains('dark')).toBe(false)
      expect(document.documentElement.classList.contains('theme-custom')).toBe(false)
    })

    it('should set CSS variables', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'dark' } })

      expect(document.documentElement.style.getPropertyValue('--coral-primary')).toBe('#ff6b6b')
    })

    it('should handle CSS variables with -- prefix', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'custom' } })

      expect(document.documentElement.style.getPropertyValue('--custom-var')).toBe('blue')
    })

    it('should set data-theme attribute for dark theme', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'dark' } })

      expect(document.documentElement.getAttribute('data-theme')).toBe('dark')
    })

    it('should set data-theme attribute for light theme', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'light' } })

      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('should use default theme when no global set', () => {
      const decorator = createThemeDecorator(mockThemeConfig)
      decorator(() => null, { globals: {} })

      expect(document.documentElement.getAttribute('data-theme')).toBe('light')
    })

    it('should use custom cssVarPrefix', () => {
      const config: ThemeConfig = {
        themes: {
          dark: {
            name: 'dark',
            cssVars: { color: 'red' },
            isDark: true,
          },
        },
        cssVarPrefix: '--app',
      }

      const decorator = createThemeDecorator(config)
      decorator(() => null, { globals: { theme: 'dark' } })

      expect(document.documentElement.style.getPropertyValue('--app-color')).toBe('red')
    })
  })

  describe('withThemeSwitcher', () => {
    it('should create global type config', () => {
      const config = withThemeSwitcher(mockThemeConfig)

      expect(config.name).toBe('Theme')
      expect(config.description).toBe('Switch between themes')
      expect(config.defaultValue).toBe('light')
    })

    it('should create toolbar config', () => {
      const config = withThemeSwitcher(mockThemeConfig)

      expect(config.toolbar.icon).toBe('paintbrush')
      expect(config.toolbar.dynamicTitle).toBe(true)
    })

    it('should create items from themes', () => {
      const config = withThemeSwitcher(mockThemeConfig)

      expect(config.toolbar.items).toContainEqual({
        value: 'light',
        title: 'Light',
        icon: 'sun',
      })
      expect(config.toolbar.items).toContainEqual({
        value: 'dark',
        title: 'Dark',
        icon: 'moon',
      })
    })

    it('should use theme name as fallback label', () => {
      const config: ThemeConfig = {
        themes: {
          test: { name: 'test', isDark: false },
        },
      }

      const result = withThemeSwitcher(config)
      expect(result.toolbar.items[0].title).toBe('test')
    })
  })

  describe('presetThemes', () => {
    it('should have basic theme preset', () => {
      expect(presetThemes.basic).toBeDefined()
      expect(presetThemes.basic.themes.light).toBeDefined()
      expect(presetThemes.basic.themes.dark).toBeDefined()
    })

    it('should have coral theme preset', () => {
      expect(presetThemes.coral).toBeDefined()
      expect(presetThemes.coral.themes.light).toBeDefined()
      expect(presetThemes.coral.themes.dark).toBeDefined()
      expect(presetThemes.coral.themes.ocean).toBeDefined()
    })

    it('should have correct dark theme settings', () => {
      expect(presetThemes.basic.themes.dark.isDark).toBe(true)
      expect(presetThemes.basic.themes.dark.className).toBe('dark')
    })

    it('should have CSS variables in coral preset', () => {
      expect(presetThemes.coral.themes.light.cssVars).toBeDefined()
      expect(presetThemes.coral.themes.dark.cssVars).toBeDefined()
    })
  })

  describe('createBackgroundDecorator', () => {
    it('should create a decorator function', () => {
      const decorator = createBackgroundDecorator(mockThemeConfig)
      expect(typeof decorator).toBe('function')
    })

    it('should return story result', () => {
      const decorator = createBackgroundDecorator(mockThemeConfig)
      const Story = () => '<div>Test</div>'
      const result = decorator(Story, { globals: {} })
      expect(result).toBe('<div>Test</div>')
    })

    it('should set background color', () => {
      const decorator = createBackgroundDecorator(mockThemeConfig)
      decorator(() => null, { globals: { theme: 'dark' } })

      expect(document.body.style.backgroundColor).toBe('rgb(26, 26, 46)')
    })

    it('should use default theme when no global set', () => {
      const decorator = createBackgroundDecorator(mockThemeConfig)
      decorator(() => null, { globals: {} })

      expect(document.body.style.backgroundColor).toBe('rgb(255, 255, 255)')
    })
  })

  describe('getCurrentTheme', () => {
    it('should return current theme from context', () => {
      const theme = getCurrentTheme({ globals: { theme: 'dark' } }, mockThemeConfig)
      expect(theme?.name).toBe('dark')
    })

    it('should return default theme when no global', () => {
      const theme = getCurrentTheme({ globals: {} }, mockThemeConfig)
      expect(theme?.name).toBe('light')
    })

    it('should return undefined for unknown theme', () => {
      const theme = getCurrentTheme({ globals: { theme: 'unknown' } }, mockThemeConfig)
      expect(theme).toBeUndefined()
    })
  })

  describe('isDarkTheme', () => {
    it('should return true for dark theme', () => {
      expect(isDarkTheme({ globals: { theme: 'dark' } }, mockThemeConfig)).toBe(true)
    })

    it('should return false for light theme', () => {
      expect(isDarkTheme({ globals: { theme: 'light' } }, mockThemeConfig)).toBe(false)
    })

    it('should return false for theme without isDark', () => {
      const config: ThemeConfig = {
        themes: {
          test: { name: 'test' },
        },
      }
      expect(isDarkTheme({ globals: { theme: 'test' } }, config)).toBe(false)
    })
  })

  describe('createColorSchemeHandler', () => {
    it('should return destroy function', () => {
      // Mock matchMedia
      const originalMatchMedia = window.matchMedia
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const handler = createColorSchemeHandler(() => {}, () => {})
      expect(handler.destroy).toBeDefined()
      handler.destroy()

      window.matchMedia = originalMatchMedia
    })

    it('should call appropriate handler based on media query', () => {
      const onLight = vi.fn()
      const onDark = vi.fn()

      // Mock matchMedia
      const originalMatchMedia = window.matchMedia
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === '(prefers-color-scheme: dark)',
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const handler = createColorSchemeHandler(onLight, onDark)

      expect(onDark).toHaveBeenCalled()

      handler.destroy()
      window.matchMedia = originalMatchMedia
    })

    it('should call onLight when prefers-color-scheme is light', () => {
      const onLight = vi.fn()
      const onDark = vi.fn()

      const originalMatchMedia = window.matchMedia
      window.matchMedia = vi.fn().mockImplementation(() => ({
        matches: false,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))

      const handler = createColorSchemeHandler(onLight, onDark)

      expect(onLight).toHaveBeenCalled()
      expect(onDark).not.toHaveBeenCalled()

      handler.destroy()
      window.matchMedia = originalMatchMedia
    })
  })

  describe('applyThemeToElement', () => {
    let element: HTMLElement

    beforeEach(() => {
      element = document.createElement('div')
    })

    it('should add theme className', () => {
      applyThemeToElement(element, { name: 'dark', className: 'dark', isDark: true })
      expect(element.classList.contains('dark')).toBe(true)
    })

    it('should set CSS variables', () => {
      applyThemeToElement(element, {
        name: 'dark',
        cssVars: { primary: 'red' },
        isDark: true,
      })
      expect(element.style.getPropertyValue('--coral-primary')).toBe('red')
    })

    it('should use custom cssVarPrefix', () => {
      applyThemeToElement(
        element,
        { name: 'dark', cssVars: { color: 'blue' }, isDark: true },
        '--app'
      )
      expect(element.style.getPropertyValue('--app-color')).toBe('blue')
    })

    it('should set data-theme attribute', () => {
      applyThemeToElement(element, { name: 'dark', isDark: true })
      expect(element.getAttribute('data-theme')).toBe('dark')
    })

    it('should set data-theme to light for non-dark themes', () => {
      applyThemeToElement(element, { name: 'light', isDark: false })
      expect(element.getAttribute('data-theme')).toBe('light')
    })

    it('should handle themes without className', () => {
      applyThemeToElement(element, { name: 'test', isDark: false })
      expect(element.getAttribute('data-theme')).toBe('light')
    })
  })
})
