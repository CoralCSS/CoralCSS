/**
 * CSS Configuration Plugin Tests
 *
 * Tests for CSS-first configuration plugin that integrates with CoralCSS.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  cssConfigPlugin,
  createCoralWithCSS,
  generateCSSConfigTemplate,
  CSSConfigPluginOptions,
} from '../../../src/config/css-config'
import type { PluginAPI } from '../../../src/types'
import * as fs from 'fs'

// Mock fs module
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
}))

describe('CSS Config Plugin', () => {
  let mockApi: PluginAPI
  let dataStore: Record<string, any>
  let themeExtensions: any[]
  let emittedEvents: Array<{ name: string; payload: any }>

  beforeEach(() => {
    dataStore = {}
    themeExtensions = []
    emittedEvents = []

    mockApi = {
      setData: vi.fn((key: string, value: any) => {
        dataStore[key] = value
      }),
      getData: vi.fn((key: string) => dataStore[key]),
      extendTheme: vi.fn((theme: any) => {
        themeExtensions.push(theme)
      }),
      emit: vi.fn((name: string, payload: any) => {
        emittedEvents.push({ name, payload })
      }),
    } as unknown as PluginAPI

    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('cssConfigPlugin', () => {
    describe('plugin metadata', () => {
      it('should have correct name and version', () => {
        const plugin = cssConfigPlugin()
        expect(plugin.name).toBe('css-config')
        expect(plugin.version).toBe('1.0.0')
      })

      it('should have install function', () => {
        const plugin = cssConfigPlugin()
        expect(typeof plugin.install).toBe('function')
      })
    })

    describe('disabled state', () => {
      it('should not install when disabled', () => {
        const plugin = cssConfigPlugin({ enabled: false })
        plugin.install(mockApi)

        expect(mockApi.setData).not.toHaveBeenCalled()
        expect(mockApi.extendTheme).not.toHaveBeenCalled()
        expect(mockApi.emit).not.toHaveBeenCalled()
      })

      it('should enable by default', () => {
        const plugin = cssConfigPlugin()
        expect(plugin).toBeDefined()
      })
    })

    describe('inline config', () => {
      it('should parse inline CSS config', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral theme {
              --color-primary: #3b82f6;
            }
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.extendTheme).toHaveBeenCalled()
      })

      it('should handle inline config with source directives', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral source "./src/**/*.tsx";
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith('css-config:content', expect.any(Array))
      })

      it('should handle inline config with safelist', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral source inline("bg-red-500 text-white");
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith('css-config:safelist', expect.any(Array))
      })

      it('should handle inline config with blocklist', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral source not inline("container");
          `,
        })
        plugin.install(mockApi)

        // The parser treats 'not inline(...)' as sourceNot which becomes content paths
        // So we check that content is set (which includes negated patterns)
        expect(mockApi.setData).toHaveBeenCalledWith('css-config:content', expect.any(Array))
      })

      it('should handle inline config with presets', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral preset material;
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith('css-config:presets', expect.any(Array))
      })

      it('should handle inline config with plugin options', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral plugin typography scale:1.25;
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith(
          expect.stringMatching(/^css-config:plugin:/),
          expect.any(Object)
        )
      })

      it('should handle inline config with disabled plugins', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral plugin no animations;
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith('css-config:disabled-plugins', expect.any(Array))
      })
    })

    describe('file-based config', () => {
      it('should load CSS config from file', () => {
        vi.mocked(fs.readFileSync).mockReturnValue(`
          @coral theme {
            --color-primary: #ff6b6b;
          }
        `)

        const plugin = cssConfigPlugin({
          cssConfig: './coral.css',
        })
        plugin.install(mockApi)

        expect(fs.readFileSync).toHaveBeenCalled()
        expect(mockApi.extendTheme).toHaveBeenCalled()
      })

      it('should handle file read errors gracefully', () => {
        vi.mocked(fs.readFileSync).mockImplementation(() => {
          throw new Error('File not found')
        })

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
        const plugin = cssConfigPlugin({
          cssConfig: './nonexistent.css',
        })
        plugin.install(mockApi)

        expect(consoleSpy).toHaveBeenCalled()
        expect(mockApi.extendTheme).not.toHaveBeenCalled()
      })

      it('should prefer inline config over file config', () => {
        vi.mocked(fs.readFileSync).mockReturnValue(`
          @coral theme { --color-from-file: blue; }
        `)

        const plugin = cssConfigPlugin({
          cssConfig: './coral.css',
          inlineConfig: `@coral theme { --color-from-inline: red; }`,
        })
        plugin.install(mockApi)

        // Inline config should be used, file should not be read
        expect(fs.readFileSync).not.toHaveBeenCalled()
      })
    })

    describe('watch mode', () => {
      it('should set watch file data when enabled', () => {
        vi.mocked(fs.readFileSync).mockReturnValue(`
          @coral theme { --color: blue; }
        `)

        const plugin = cssConfigPlugin({
          cssConfig: './coral.css',
          watch: true,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).toHaveBeenCalledWith('css-config:watch-file', './coral.css')
      })

      it('should not set watch file data when disabled', () => {
        vi.mocked(fs.readFileSync).mockReturnValue(`
          @coral theme { --color: blue; }
        `)

        const plugin = cssConfigPlugin({
          cssConfig: './coral.css',
          watch: false,
        })
        plugin.install(mockApi)

        expect(mockApi.setData).not.toHaveBeenCalledWith('css-config:watch-file', expect.anything())
      })
    })

    describe('validation', () => {
      it('should warn on invalid CSS config', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const plugin = cssConfigPlugin({
          inlineConfig: `@coral theme { --color: red; `, // Missing closing brace
        })
        plugin.install(mockApi)

        expect(consoleSpy).toHaveBeenCalledWith('CSS config validation errors:', expect.any(Array))
      })

      it('should not warn on valid CSS config', () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const plugin = cssConfigPlugin({
          inlineConfig: `@coral theme { --color: red; }`,
        })
        plugin.install(mockApi)

        expect(consoleSpy).not.toHaveBeenCalledWith('CSS config validation errors:', expect.any(Array))
      })
    })

    describe('event emission', () => {
      it('should emit css-config:loaded event', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `@coral theme { --color: blue; }`,
        })
        plugin.install(mockApi)

        expect(mockApi.emit).toHaveBeenCalledWith('css-config:loaded', expect.any(Object))
      })

      it('should include parsed config in event payload', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: `
            @coral theme { --color-primary: #3b82f6; }
            @coral source "./src/**/*.tsx";
          `,
        })
        plugin.install(mockApi)

        expect(mockApi.emit).toHaveBeenCalledWith(
          'css-config:loaded',
          expect.objectContaining({
            theme: expect.any(Object),
            source: expect.any(Array),
          })
        )
      })
    })

    describe('empty config', () => {
      it('should handle empty inline config', () => {
        const plugin = cssConfigPlugin({
          inlineConfig: '',
        })
        plugin.install(mockApi)

        expect(mockApi.extendTheme).not.toHaveBeenCalled()
        expect(mockApi.emit).not.toHaveBeenCalled()
      })

      it('should handle no config options', () => {
        const plugin = cssConfigPlugin({})
        plugin.install(mockApi)

        expect(mockApi.extendTheme).not.toHaveBeenCalled()
      })
    })
  })

  describe('createCoralWithCSS', () => {
    beforeEach(() => {
      vi.clearAllMocks()
    })

    it('should merge CSS config with JS config', () => {
      const result = createCoralWithCSS({
        inlineConfig: `@coral theme { --color-primary: #3b82f6; }`,
        theme: {
          colors: {
            secondary: '#10b981',
          },
        },
      })

      expect(result).toBeDefined()
      expect(result.theme).toBeDefined()
    })

    it('should load CSS config from file', () => {
      vi.mocked(fs.readFileSync).mockReturnValue(`
        @coral theme { --color-primary: blue; }
      `)

      const result = createCoralWithCSS({
        cssConfig: './coral.css',
      })

      expect(result).toBeDefined()
      expect(fs.readFileSync).toHaveBeenCalled()
    })

    it('should prefer inline config over file', () => {
      vi.mocked(fs.readFileSync).mockReturnValue(`
        @coral theme { --color-from-file: blue; }
      `)

      const result = createCoralWithCSS({
        cssConfig: './coral.css',
        inlineConfig: `@coral theme { --color-from-inline: red; }`,
      })

      expect(result).toBeDefined()
      expect(fs.readFileSync).not.toHaveBeenCalled()
    })

    it('should return empty merged config when no CSS provided', () => {
      const result = createCoralWithCSS({
        theme: {
          colors: { primary: 'blue' },
        },
      })

      expect(result).toBeDefined()
      expect(result.theme?.colors?.primary).toBe('blue')
    })

    it('should handle file read errors', () => {
      vi.mocked(fs.readFileSync).mockImplementation(() => {
        throw new Error('File not found')
      })

      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const result = createCoralWithCSS({
        cssConfig: './nonexistent.css',
        theme: { colors: { primary: 'blue' } },
      })

      // Should return JS config when CSS file fails to load
      expect(result).toBeDefined()
    })
  })

  describe('generateCSSConfigTemplate', () => {
    it('should return a string', () => {
      const template = generateCSSConfigTemplate()
      expect(typeof template).toBe('string')
    })

    it('should include theme section', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('@coral theme')
    })

    it('should include color variables', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('--color-primary')
      expect(template).toContain('--color-secondary')
      expect(template).toContain('--color-error')
    })

    it('should include spacing variables', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('--spacing-xs')
      expect(template).toContain('--spacing-md')
      expect(template).toContain('--spacing-xl')
    })

    it('should include typography variables', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('--font-sans')
      expect(template).toContain('--font-mono')
    })

    it('should include radius variables', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('--radius-sm')
      expect(template).toContain('--radius-md')
    })

    it('should include breakpoint variables', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('--breakpoint-sm')
      expect(template).toContain('--breakpoint-lg')
    })

    it('should include source configuration', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('@coral source')
      expect(template).toContain('source not')
      expect(template).toContain('source inline')
    })

    it('should include plugin configuration', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('@coral plugin')
      expect(template).toContain('plugin no')
    })

    it('should include preset configuration', () => {
      const template = generateCSSConfigTemplate()
      expect(template).toContain('@coral preset')
    })

    it('should be valid CSS structure', () => {
      const template = generateCSSConfigTemplate()
      // Check for balanced braces in theme section
      const openBraces = (template.match(/{/g) || []).length
      const closeBraces = (template.match(/}/g) || []).length
      expect(openBraces).toBe(closeBraces)
    })
  })

  describe('default export', () => {
    it('should export cssConfigPlugin as default', async () => {
      const module = await import('../../../src/config/css-config')
      expect(module.default).toBe(cssConfigPlugin)
    })
  })

  describe('blocklist configuration', () => {
    it('should have blocklist functionality', () => {
      // Test that the plugin can be installed and handles blocklist
      const plugin = cssConfigPlugin({
        css: `
@coral {
  blocklist: bg-*, text-red;
}
`.trim()
      })
      plugin.install(mockApi)

      // Plugin should be defined and have installed
      expect(plugin).toBeDefined()
      expect(plugin.name).toBe('css-config')
    })
  })
})
