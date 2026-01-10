/**
 * Tests for CSS Cascade Layers Plugin
 */

import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  layersPlugin,
  generateLayerDeclaration,
  generateBaseResetLayer,
  generateBaseLayer,
  generateLayerSystem,
} from '../../../src/plugins/core/utilities/layers'
import type { PluginContext, Rule, Variant } from '../../../src/types'

describe('Layers Plugin', () => {
  describe('layersPlugin', () => {
    let mockContext: PluginContext
    let addedRules: Rule[]
    let addedVariants: Variant[]

    beforeEach(() => {
      addedRules = []
      addedVariants = []
      mockContext = {
        addRule: vi.fn((rule: Rule) => {
          addedRules.push(rule)
        }),
        addVariant: vi.fn((variant: Variant) => {
          addedVariants.push(variant)
        }),
        extendTheme: vi.fn(),
        addUtility: vi.fn(),
        addComponent: vi.fn(),
        addBase: vi.fn(),
        theme: vi.fn(),
        config: vi.fn(),
        e: vi.fn((x: string) => x),
      } as unknown as PluginContext
    })

    it('should create plugin with default config', () => {
      const plugin = layersPlugin()
      expect(plugin.name).toBe('layers')
      expect(plugin.version).toBe('1.0.0')
    })

    it('should install rules for default layers', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      // Should add layer declaration rule
      expect(addedRules.some(r => r.name === '@layer-declaration')).toBe(true)

      // Should add rules for each default layer
      expect(addedRules.some(r => r.name === 'in-layer-reset')).toBe(true)
      expect(addedRules.some(r => r.name === 'in-layer-base')).toBe(true)
      expect(addedRules.some(r => r.name === 'in-layer-components')).toBe(true)
      expect(addedRules.some(r => r.name === 'in-layer-utilities')).toBe(true)
      expect(addedRules.some(r => r.name === 'in-layer-variants')).toBe(true)
      expect(addedRules.some(r => r.name === 'in-layer-overrides')).toBe(true)

      // Should add arbitrary layer rule
      expect(addedRules.some(r => r.name === 'in-layer-arb')).toBe(true)
    })

    it('should install variants for layers', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      expect(addedVariants.some(v => v.name === 'layer-base')).toBe(true)
      expect(addedVariants.some(v => v.name === 'layer-components')).toBe(true)
      expect(addedVariants.some(v => v.name === 'layer-utilities')).toBe(true)
      expect(addedVariants.some(v => v.name === 'layer-overrides')).toBe(true)
      expect(addedVariants.some(v => v.name === 'layer')).toBe(true)
    })

    it('should use custom layer order', () => {
      const customOrder = ['base', 'components', 'utilities']
      const plugin = layersPlugin({ order: customOrder })
      plugin.install(mockContext)

      const declarationRule = addedRules.find(r => r.name === '@layer-declaration')
      expect(declarationRule?.properties?.['--coral-layers']).toBe('base, components, utilities')
    })

    it('should handle arbitrary layer assignment', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      const arbRule = addedRules.find(r => r.name === 'in-layer-arb')
      expect(arbRule).toBeDefined()
      expect(arbRule?.pattern).toBeInstanceOf(RegExp)

      // Test handler
      if (arbRule?.handler) {
        const match = 'in-layer-[custom]'.match(arbRule.pattern as RegExp)
        if (match) {
          const result = arbRule.handler(match)
          expect(result?.properties?.['--coral-current-layer']).toBe('custom')
        }
      }
    })

    it('should return null for invalid arbitrary layer', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      const arbRule = addedRules.find(r => r.name === 'in-layer-arb')
      if (arbRule?.handler) {
        // Empty match
        const result = arbRule.handler(['in-layer-[]', ''])
        expect(result).toBeNull()
      }
    })

    it('should have correct layer variant handlers', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      const baseVariant = addedVariants.find(v => v.name === 'layer-base')
      expect(baseVariant?.wrapper).toBe('@layer base')
      expect(baseVariant?.handler?.('.test')).toBe('.test')

      const componentsVariant = addedVariants.find(v => v.name === 'layer-components')
      expect(componentsVariant?.wrapper).toBe('@layer components')

      const utilitiesVariant = addedVariants.find(v => v.name === 'layer-utilities')
      expect(utilitiesVariant?.wrapper).toBe('@layer utilities')

      const overridesVariant = addedVariants.find(v => v.name === 'layer-overrides')
      expect(overridesVariant?.wrapper).toBe('@layer overrides')
    })

    it('should handle arbitrary layer variant', () => {
      const plugin = layersPlugin()
      plugin.install(mockContext)

      const layerVariant = addedVariants.find(v => v.name === 'layer')
      expect(layerVariant).toBeDefined()
      expect(layerVariant?.match).toBeInstanceOf(RegExp)

      // Test handler
      if (layerVariant?.handler) {
        const result = layerVariant.handler('.test', ['layer-[custom]', 'custom'])
        expect(result).toBe('.test')
      }

      // Test wrapper function
      if (typeof layerVariant?.wrapper === 'function') {
        const wrapped = layerVariant.wrapper('.test { color: red; }')
        expect(wrapped).toContain('@layer')
      }
    })
  })

  describe('generateLayerDeclaration', () => {
    it('should generate default layer declaration', () => {
      const result = generateLayerDeclaration()
      expect(result).toBe('@layer reset, base, components, utilities, variants, overrides;')
    })

    it('should generate custom layer declaration', () => {
      const result = generateLayerDeclaration(['base', 'utilities'])
      expect(result).toBe('@layer base, utilities;')
    })

    it('should handle single layer', () => {
      const result = generateLayerDeclaration(['base'])
      expect(result).toBe('@layer base;')
    })

    it('should handle empty array', () => {
      const result = generateLayerDeclaration([])
      expect(result).toBe('@layer ;')
    })
  })

  describe('generateBaseResetLayer', () => {
    it('should generate reset layer CSS', () => {
      const result = generateBaseResetLayer()

      expect(result).toContain('@layer reset')
      expect(result).toContain('box-sizing: border-box')
      expect(result).toContain('margin: 0')
      expect(result).toContain('padding: 0')
      expect(result).toContain('line-height: 1.5')
      expect(result).toContain('-webkit-text-size-adjust: 100%')
      expect(result).toContain('tab-size: 4')
      expect(result).toContain('font-family: system-ui')
      expect(result).toContain('display: block')
      expect(result).toContain('max-width: 100%')
      expect(result).toContain('font: inherit')
      expect(result).toContain('overflow-wrap: break-word')
    })
  })

  describe('generateBaseLayer', () => {
    it('should generate base layer CSS', () => {
      const result = generateBaseLayer()

      expect(result).toContain('@layer base')
      expect(result).toContain(':root')
      expect(result).toContain('--coral-font-sans')
      expect(result).toContain('--coral-font-serif')
      expect(result).toContain('--coral-font-mono')
      expect(result).toContain('color-scheme: light dark')
      expect(result).toContain('--coral-color-foreground')
      expect(result).toContain('--coral-color-background')
      expect(result).toContain('::selection')
      expect(result).toContain(':focus-visible')
      expect(result).toContain('outline: 2px solid')
    })
  })

  describe('generateLayerSystem', () => {
    it('should generate full layer system with defaults', () => {
      const result = generateLayerSystem()

      expect(result).toContain('@layer reset, base, components, utilities, variants, overrides;')
      expect(result).toContain('@layer reset')
      expect(result).toContain('@layer base')
      expect(result).toContain('box-sizing: border-box')
      expect(result).toContain(':root')
    })

    it('should exclude reset layer when specified', () => {
      const result = generateLayerSystem({ includeReset: false })

      expect(result).toContain('@layer reset, base')
      expect(result).not.toContain('box-sizing: border-box')
      expect(result).toContain('@layer base')
    })

    it('should exclude base layer when specified', () => {
      const result = generateLayerSystem({ includeBase: false })

      expect(result).toContain('@layer reset')
      expect(result).toContain('box-sizing: border-box')
      expect(result).not.toContain(':root')
    })

    it('should exclude both reset and base', () => {
      const result = generateLayerSystem({ includeReset: false, includeBase: false })

      expect(result).toContain('@layer reset, base')
      expect(result).not.toContain('box-sizing: border-box')
      expect(result).not.toContain(':root')
    })

    it('should use custom layers', () => {
      const result = generateLayerSystem({
        layers: ['foundation', 'components', 'utilities'],
      })

      expect(result).toContain('@layer foundation, components, utilities;')
    })

    it('should handle empty options', () => {
      const result = generateLayerSystem({})

      expect(result).toContain('@layer reset, base')
      expect(result).toContain('@layer reset')
      expect(result).toContain('@layer base')
    })
  })

  describe('default export', () => {
    it('should export layersPlugin as default', async () => {
      const defaultExport = await import('../../../src/plugins/core/utilities/layers')
      expect(defaultExport.default).toBe(layersPlugin)
    })
  })
})
