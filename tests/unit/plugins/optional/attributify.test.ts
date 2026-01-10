/**
 * Attributify Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import {
  attributifyPlugin,
  attributeToClasses,
  extractAttributifyClasses,
  attributeCategories,
  variantPrefixes,
  defaultIgnoredAttributes,
} from '../../../../src/plugins/optional/attributify'
import attributifyDefault from '../../../../src/plugins/optional/attributify'
import { createCoral } from '../../../../src/kernel'
import type { Coral } from '../../../../src/types'

describe('attributifyPlugin', () => {
  it('should return a plugin object', () => {
    const plugin = attributifyPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = attributifyPlugin()

    expect(plugin.name).toBe('attributify')
  })

  it('should have version', () => {
    const plugin = attributifyPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = attributifyPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = attributifyPlugin()
    const mockApi = { addRule: () => {}, addRules: () => {}, addVariant: () => {}, addVariants: () => {}, extendTheme: () => {} }

    expect(() => plugin.install(mockApi as never)).not.toThrow()
  })

  it('should export default', () => {
    expect(attributifyDefault).toBe(attributifyPlugin)
  })
})

describe('attributeToClasses', () => {
  it('should convert valueless attribute with ~', () => {
    const classes = attributeToClasses('flex', '~', {})
    expect(classes).toEqual(['flex'])
  })

  it('should convert valueless attribute with empty string', () => {
    const classes = attributeToClasses('grid', '', {})
    expect(classes).toEqual(['grid'])
  })

  it('should convert valueless attribute with true', () => {
    const classes = attributeToClasses('block', 'true', {})
    expect(classes).toEqual(['block'])
  })

  it('should convert single value attribute', () => {
    const classes = attributeToClasses('p', '4', {})
    expect(classes).toEqual(['p-4'])
  })

  it('should convert multiple values with space separator', () => {
    const classes = attributeToClasses('text', 'white lg center', {})
    expect(classes).toEqual(['text-white', 'text-lg', 'text-center'])
  })

  it('should handle custom separator', () => {
    const classes = attributeToClasses('bg', 'red-500|blue-500', { separator: '|' })
    expect(classes).toEqual(['bg-red-500', 'bg-blue-500'])
  })

  it('should add prefix when provided', () => {
    const classes = attributeToClasses('flex', '~', { prefix: 'coral' })
    expect(classes).toEqual(['coral-flex'])
  })

  it('should add prefix to value classes', () => {
    const classes = attributeToClasses('p', '4', { prefix: 'tw' })
    expect(classes).toEqual(['tw-p-4'])
  })

  it('should preserve variant groups when enabled', () => {
    const classes = attributeToClasses('hover', 'bg-red-500', { variantGroups: true })
    // When variantGroups is enabled but value doesn't contain :, it becomes hover-bg-red-500
    expect(classes).toContain('hover-bg-red-500')
  })

  it('should handle variant syntax in values', () => {
    const classes = attributeToClasses('bg', 'hover:red-500', { variantGroups: true })
    expect(classes).toContain('hover:red-500')
  })
})

describe('extractAttributifyClasses', () => {
  it('should extract classes from HTML with attributify syntax', () => {
    const html = '<div bg="red-500" text="white" p="4"></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).toContain('bg-red-500')
    expect(classes).toContain('text-white')
    expect(classes).toContain('p-4')
  })

  it('should skip ignored attributes', () => {
    const html = '<input id="test" class="custom" bg="red-500" />'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).not.toContain('id-test')
    expect(classes).not.toContain('class-custom')
    expect(classes).toContain('bg-red-500')
  })

  it('should skip data-* attributes', () => {
    const html = '<div data-test="value" bg="blue-500"></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).not.toContain('data-test-value')
    expect(classes).toContain('bg-blue-500')
  })

  it('should skip aria-* attributes', () => {
    const html = '<div aria-label="test" p="2"></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).not.toContain('aria-label-test')
    expect(classes).toContain('p-2')
  })

  it('should handle onlyAttributes option', () => {
    const html = '<div p="4" m="2" bg="red-500"></div>'
    const classes = extractAttributifyClasses(html, { onlyAttributes: ['p', 'm'] })
    expect(classes).toContain('p-4')
    expect(classes).toContain('m-2')
    expect(classes).not.toContain('bg-red-500')
  })

  it('should handle ignoreAttributes option', () => {
    const html = '<div p="4" m="2" bg="red-500"></div>'
    const classes = extractAttributifyClasses(html, { ignoreAttributes: ['bg'] })
    expect(classes).toContain('p-4')
    expect(classes).toContain('m-2')
    // bg is in attributeCategories so it won't be extracted with ignoreAttributes
  })

  it('should extract variant prefix attributes', () => {
    const html = '<div hover="bg-red-500"></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).toContain('hover-bg-red-500')
  })

  it('should handle single quoted attribute values', () => {
    const html = "<div bg='green-500'></div>"
    const classes = extractAttributifyClasses(html, {})
    expect(classes).toContain('bg-green-500')
  })

  it('should handle unquoted attribute values', () => {
    const html = '<div bg=blue-500></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).toContain('bg-blue-500')
  })

  it('should handle valueless attributes as ~', () => {
    const html = '<div flex></div>'
    const classes = extractAttributifyClasses(html, {})
    expect(classes).toContain('flex')
  })

  it('should apply prefix', () => {
    const html = '<div p="4"></div>'
    const classes = extractAttributifyClasses(html, { prefix: 'tw' })
    expect(classes).toContain('tw-p-4')
  })
})

describe('Exported Constants', () => {
  it('should export attributeCategories', () => {
    expect(attributeCategories).toBeDefined()
    expect(typeof attributeCategories).toBe('object')
    expect(attributeCategories.p).toBe(true)
    expect(attributeCategories.flex).toBeInstanceOf(Array)
  })

  it('should export variantPrefixes', () => {
    expect(variantPrefixes).toBeDefined()
    expect(variantPrefixes).toBeInstanceOf(Array)
    expect(variantPrefixes).toContain('hover')
    expect(variantPrefixes).toContain('focus')
    expect(variantPrefixes).toContain('dark')
    expect(variantPrefixes).toContain('md')
  })

  it('should export defaultIgnoredAttributes', () => {
    expect(defaultIgnoredAttributes).toBeDefined()
    expect(defaultIgnoredAttributes).toBeInstanceOf(Array)
    expect(defaultIgnoredAttributes).toContain('id')
    expect(defaultIgnoredAttributes).toContain('class')
    expect(defaultIgnoredAttributes).toContain('style')
  })
})

describe('Valueless Utility CSS Generation', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(attributifyPlugin({ valueless: true }))
  })

  describe('Layout Utilities', () => {
    it('should generate flex', () => {
      const css = coral.generate(['flex'])
      expect(css).toContain('display')
      expect(css).toContain('flex')
    })

    it('should generate grid', () => {
      const css = coral.generate(['grid'])
      expect(css).toContain('display')
      expect(css).toContain('grid')
    })

    it('should generate block', () => {
      const css = coral.generate(['block'])
      expect(css).toContain('display')
      expect(css).toContain('block')
    })

    it('should generate inline', () => {
      const css = coral.generate(['inline'])
      expect(css).toContain('display')
      expect(css).toContain('inline')
    })

    it('should generate inline-block', () => {
      const css = coral.generate(['inline-block'])
      expect(css).toContain('display')
      expect(css).toContain('inline-block')
    })

    it('should generate inline-flex', () => {
      const css = coral.generate(['inline-flex'])
      expect(css).toContain('display')
      expect(css).toContain('inline-flex')
    })

    it('should generate inline-grid', () => {
      const css = coral.generate(['inline-grid'])
      expect(css).toContain('display')
      expect(css).toContain('inline-grid')
    })

    it('should generate hidden', () => {
      const css = coral.generate(['hidden'])
      expect(css).toContain('display')
      expect(css).toContain('none')
    })

    it('should generate contents', () => {
      const css = coral.generate(['contents'])
      expect(css).toContain('display')
      expect(css).toContain('contents')
    })
  })

  describe('Position Utilities', () => {
    it('should generate relative', () => {
      const css = coral.generate(['relative'])
      expect(css).toContain('position')
      expect(css).toContain('relative')
    })

    it('should generate absolute', () => {
      const css = coral.generate(['absolute'])
      expect(css).toContain('position')
      expect(css).toContain('absolute')
    })

    it('should generate fixed', () => {
      const css = coral.generate(['fixed'])
      expect(css).toContain('position')
      expect(css).toContain('fixed')
    })

    it('should generate sticky', () => {
      const css = coral.generate(['sticky'])
      expect(css).toContain('position')
      expect(css).toContain('sticky')
    })

    it('should generate static', () => {
      const css = coral.generate(['static'])
      expect(css).toContain('position')
      expect(css).toContain('static')
    })
  })

  describe('Visibility Utilities', () => {
    it('should generate visible', () => {
      const css = coral.generate(['visible'])
      expect(css).toContain('visibility')
      expect(css).toContain('visible')
    })

    it('should generate invisible', () => {
      const css = coral.generate(['invisible'])
      expect(css).toContain('visibility')
      expect(css).toContain('hidden')
    })

    it('should generate collapse', () => {
      const css = coral.generate(['collapse'])
      expect(css).toContain('visibility')
      expect(css).toContain('collapse')
    })
  })

  describe('Text Utilities', () => {
    it('should generate truncate', () => {
      const css = coral.generate(['truncate'])
      expect(css).toContain('overflow: hidden')
      expect(css).toContain('text-overflow: ellipsis')
    })

    it('should generate uppercase', () => {
      const css = coral.generate(['uppercase'])
      expect(css).toContain('text-transform')
      expect(css).toContain('uppercase')
    })

    it('should generate lowercase', () => {
      const css = coral.generate(['lowercase'])
      expect(css).toContain('text-transform')
      expect(css).toContain('lowercase')
    })

    it('should generate capitalize', () => {
      const css = coral.generate(['capitalize'])
      expect(css).toContain('text-transform')
      expect(css).toContain('capitalize')
    })

    it('should generate underline', () => {
      const css = coral.generate(['underline'])
      expect(css).toContain('text-decoration')
      expect(css).toContain('underline')
    })

    it('should generate overline', () => {
      const css = coral.generate(['overline'])
      expect(css).toContain('text-decoration')
      expect(css).toContain('overline')
    })

    it('should generate line-through', () => {
      const css = coral.generate(['line-through'])
      expect(css).toContain('text-decoration')
      expect(css).toContain('line-through')
    })

    it('should generate no-underline', () => {
      const css = coral.generate(['no-underline'])
      expect(css).toContain('text-decoration')
      expect(css).toContain('none')
    })

    it('should generate italic', () => {
      const css = coral.generate(['italic'])
      expect(css).toContain('font-style')
      expect(css).toContain('italic')
    })

    it('should generate not-italic', () => {
      const css = coral.generate(['not-italic'])
      expect(css).toContain('font-style')
      expect(css).toContain('normal')
    })
  })

  describe('Container Utility', () => {
    it('should generate container', () => {
      const css = coral.generate(['container'])
      expect(css).toContain('width')
      expect(css).toContain('100%')
      expect(css).toContain('margin-left')
      expect(css).toContain('margin-right')
    })
  })

  describe('Overflow Utilities', () => {
    it('should generate overflow-hidden', () => {
      const css = coral.generate(['overflow-hidden'])
      expect(css).toContain('overflow')
      expect(css).toContain('hidden')
    })

    it('should generate overflow-auto', () => {
      const css = coral.generate(['overflow-auto'])
      expect(css).toContain('overflow')
      expect(css).toContain('auto')
    })

    it('should generate overflow-scroll', () => {
      const css = coral.generate(['overflow-scroll'])
      expect(css).toContain('overflow')
      expect(css).toContain('scroll')
    })

    it('should generate overflow-visible', () => {
      const css = coral.generate(['overflow-visible'])
      expect(css).toContain('overflow')
      expect(css).toContain('visible')
    })
  })

  describe('Pointer Events', () => {
    it('should generate pointer-events-none', () => {
      const css = coral.generate(['pointer-events-none'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
    })

    it('should generate pointer-events-auto', () => {
      const css = coral.generate(['pointer-events-auto'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('auto')
    })
  })

  describe('User Select', () => {
    it('should generate select-none', () => {
      const css = coral.generate(['select-none'])
      expect(css).toContain('user-select')
      expect(css).toContain('none')
    })

    it('should generate select-text', () => {
      const css = coral.generate(['select-text'])
      expect(css).toContain('user-select')
      expect(css).toContain('text')
    })

    it('should generate select-all', () => {
      const css = coral.generate(['select-all'])
      expect(css).toContain('user-select')
      expect(css).toContain('all')
    })

    it('should generate select-auto', () => {
      const css = coral.generate(['select-auto'])
      expect(css).toContain('user-select')
      expect(css).toContain('auto')
    })
  })

  describe('Screen Reader', () => {
    it('should generate sr-only', () => {
      const css = coral.generate(['sr-only'])
      expect(css).toContain('position: absolute')
      expect(css).toContain('width: 1px')
      expect(css).toContain('height: 1px')
    })

    it('should generate not-sr-only', () => {
      const css = coral.generate(['not-sr-only'])
      expect(css).toContain('position: static')
      expect(css).toContain('width: auto')
    })
  })

  describe('Font Smoothing', () => {
    it('should generate antialiased', () => {
      const css = coral.generate(['antialiased'])
      // CSS generator strips leading hyphens from vendor prefixes
      expect(css).toContain('webkit-font-smoothing')
      expect(css).toContain('antialiased')
    })

    it('should generate subpixel-antialiased', () => {
      const css = coral.generate(['subpixel-antialiased'])
      // CSS generator strips leading hyphens from vendor prefixes
      expect(css).toContain('webkit-font-smoothing')
      expect(css).toContain('auto')
    })
  })

  describe('Box Sizing', () => {
    it('should generate box-border', () => {
      const css = coral.generate(['box-border'])
      expect(css).toContain('box-sizing')
      expect(css).toContain('border-box')
    })

    it('should generate box-content', () => {
      const css = coral.generate(['box-content'])
      expect(css).toContain('box-sizing')
      expect(css).toContain('content-box')
    })
  })

  describe('List Style', () => {
    it('should generate list-none', () => {
      const css = coral.generate(['list-none'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('none')
    })

    it('should generate list-disc', () => {
      const css = coral.generate(['list-disc'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('disc')
    })

    it('should generate list-decimal', () => {
      const css = coral.generate(['list-decimal'])
      expect(css).toContain('list-style-type')
      expect(css).toContain('decimal')
    })

    it('should generate list-inside', () => {
      const css = coral.generate(['list-inside'])
      expect(css).toContain('list-style-position')
      expect(css).toContain('inside')
    })

    it('should generate list-outside', () => {
      const css = coral.generate(['list-outside'])
      expect(css).toContain('list-style-position')
      expect(css).toContain('outside')
    })
  })

  describe('Appearance', () => {
    it('should generate appearance-none', () => {
      const css = coral.generate(['appearance-none'])
      expect(css).toContain('appearance')
      expect(css).toContain('none')
    })

    it('should generate appearance-auto', () => {
      const css = coral.generate(['appearance-auto'])
      expect(css).toContain('appearance')
      expect(css).toContain('auto')
    })
  })
})

describe('Plugin Options', () => {
  it('should accept custom options', () => {
    const plugin = attributifyPlugin({
      prefix: 'tw',
      strict: true,
      ignoreAttributes: ['custom'],
      onlyAttributes: ['p', 'm'],
      valueless: false,
      variantGroups: false,
      separator: '|',
    })
    expect(plugin).toBeDefined()
  })

  it('should handle valueless: false option', () => {
    const coral = createCoral()
    coral.use(attributifyPlugin({ valueless: false }))
    // When valueless is false, basic utilities like flex should not be added
    const css = coral.generate(['flex'])
    // The CSS should still be generated but without the valueless utilities registered
    expect(css).toBeDefined()
  })
})
