/**
 * Typography Plugin Tests
 */
import { describe, it, expect } from 'vitest'
import { typographyPlugin, getProseCSS, getAllProseSizesCSS } from '../../../../src/plugins/optional/typography'
import typographyDefault from '../../../../src/plugins/optional/typography'

describe('typographyPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = typographyPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = typographyPlugin()

    expect(plugin.name).toBe('typography')
  })

  it('should have version', () => {
    const plugin = typographyPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = typographyPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = typographyPlugin()
    const mockApi = { addRule: () => {}, addRules: () => {}, addVariant: () => {}, addVariants: () => {}, extendTheme: () => {} }

    expect(() => plugin.install(mockApi as never)).not.toThrow()
  })

  it('should export default', () => {
    expect(typographyDefault).toBe(typographyPlugin)
  })

  it('should accept custom className option', () => {
    const plugin = typographyPlugin({ className: 'typography' })
    const addedRules: { name?: string }[] = []
    const mockApi = {
      addRule: (rule: { name?: string }) => addedRules.push(rule),
      addRules: () => {},
      addVariant: () => {},
      addVariants: () => {},
      extendTheme: () => {},
    }

    plugin.install(mockApi as never)

    expect(addedRules.some(r => r.name === 'typography')).toBe(true)
    expect(addedRules.some(r => r.name === 'typography-sm')).toBe(true)
    expect(addedRules.some(r => r.name === 'typography-lg')).toBe(true)
  })

  it('should register all color themes', () => {
    const plugin = typographyPlugin()
    const addedRules: { name?: string }[] = []
    const mockApi = {
      addRule: (rule: { name?: string }) => addedRules.push(rule),
      addRules: () => {},
      addVariant: () => {},
      addVariants: () => {},
      extendTheme: () => {},
    }

    plugin.install(mockApi as never)

    // Check color theme rules
    expect(addedRules.some(r => r.name === 'prose')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-gray')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-slate')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-zinc')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-neutral')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-stone')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-coral')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-invert')).toBe(true)
  })

  it('should register all size variants', () => {
    const plugin = typographyPlugin()
    const addedRules: { name?: string }[] = []
    const mockApi = {
      addRule: (rule: { name?: string }) => addedRules.push(rule),
      addRules: () => {},
      addVariant: () => {},
      addVariants: () => {},
      extendTheme: () => {},
    }

    plugin.install(mockApi as never)

    expect(addedRules.some(r => r.name === 'prose-sm')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-base')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-lg')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-xl')).toBe(true)
    expect(addedRules.some(r => r.name === 'prose-2xl')).toBe(true)
  })
})

describe('getProseCSS', () => {
  it('should return CSS string with default options', () => {
    const css = getProseCSS()

    expect(typeof css).toBe('string')
    expect(css.length).toBeGreaterThan(0)
    expect(css).toContain('.prose')
    expect(css).toContain('max-width: 65ch')
    expect(css).toContain('line-height')
  })

  it('should use custom className', () => {
    const css = getProseCSS({ className: 'article' })

    expect(css).toContain('.article')
    expect(css).not.toContain('.prose {')
  })

  it('should use custom size', () => {
    const css = getProseCSS({ size: 'lg' })

    expect(css).toContain('1.125rem') // lg font-size
    expect(css).toContain('1.778') // lg line-height
  })

  it('should use custom theme', () => {
    const css = getProseCSS({ theme: 'coral' })

    expect(css).toContain('#ff6b6b') // coral link color
  })

  it('should include invert by default', () => {
    const css = getProseCSS()

    expect(css).toContain('.prose-invert')
  })

  it('should exclude invert when disabled', () => {
    const css = getProseCSS({ includeInvert: false })

    expect(css).not.toContain('.prose-invert')
  })

  it('should fall back to DEFAULT theme for invalid theme', () => {
    const css = getProseCSS({ theme: 'nonexistent' as never })

    expect(css).toContain('#374151') // DEFAULT body color
  })

  it('should generate all prose sizes', () => {
    const cssSmall = getProseCSS({ size: 'sm' })
    const cssBase = getProseCSS({ size: 'base' })
    const cssXl = getProseCSS({ size: 'xl' })
    const css2xl = getProseCSS({ size: '2xl' })

    expect(cssSmall).toContain('0.875rem')
    expect(cssBase).toContain('1rem')
    expect(cssXl).toContain('1.25rem')
    expect(css2xl).toContain('1.5rem')
  })

  it('should include all CSS selectors', () => {
    const css = getProseCSS()

    // Check various selectors are generated
    expect(css).toContain('.prose a')
    expect(css).toContain('.prose h1')
    expect(css).toContain('.prose h2')
    expect(css).toContain('.prose h3')
    expect(css).toContain('.prose h4')
    expect(css).toContain('.prose p')
    expect(css).toContain('.prose ul')
    expect(css).toContain('.prose ol')
    expect(css).toContain('.prose li')
    expect(css).toContain('.prose blockquote')
    expect(css).toContain('.prose code')
    expect(css).toContain('.prose pre')
    expect(css).toContain('.prose table')
    expect(css).toContain('.prose img')
    expect(css).toContain('.prose figure')
    expect(css).toContain('.prose figcaption')
    expect(css).toContain('.prose hr')
  })
})

describe('getAllProseSizesCSS', () => {
  it('should return CSS for all sizes', () => {
    const css = getAllProseSizesCSS()

    expect(typeof css).toBe('string')
    expect(css.length).toBeGreaterThan(0)
    expect(css).toContain('.prose-sm')
    expect(css).toContain('.prose-base')
    expect(css).toContain('.prose-lg')
    expect(css).toContain('.prose-xl')
    expect(css).toContain('.prose-2xl')
  })

  it('should use custom className', () => {
    const css = getAllProseSizesCSS('content')

    expect(css).toContain('.content-sm')
    expect(css).toContain('.content-base')
    expect(css).toContain('.content-lg')
    expect(css).toContain('.content-xl')
    expect(css).toContain('.content-2xl')
    expect(css).not.toContain('.prose-')
  })

  it('should include all size-specific properties', () => {
    const css = getAllProseSizesCSS()

    // sm uses 0.875rem, lg uses 1.125rem, 2xl uses 1.5rem
    expect(css).toContain('0.875rem')
    expect(css).toContain('1.125rem')
    expect(css).toContain('1.5rem')
  })
})
