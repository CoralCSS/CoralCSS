/**
 * Tests for Presets Index
 */
import { describe, it, expect } from 'vitest'
import * as presets from '../../../src/presets/index'

describe('Presets Index', () => {
  describe('Exports', () => {
    it('should export coralPreset', () => {
      expect(presets.coralPreset).toBeDefined()
      expect(typeof presets.coralPreset).toBe('function')
    })

    it('should export coralPresetConfig', () => {
      expect(presets.coralPresetConfig).toBeDefined()
      expect(typeof presets.coralPresetConfig).toBe('function')
    })

    it('should export windPreset', () => {
      expect(presets.windPreset).toBeDefined()
      expect(typeof presets.windPreset).toBe('function')
    })

    it('should export miniPreset', () => {
      expect(presets.miniPreset).toBeDefined()
      expect(typeof presets.miniPreset).toBe('function')
    })

    it('should export fullPreset', () => {
      expect(presets.fullPreset).toBeDefined()
      expect(typeof presets.fullPreset).toBe('function')
    })

    it('should export materialPreset', () => {
      expect(presets.materialPreset).toBeDefined()
      expect(typeof presets.materialPreset).toBe('function')
    })

    it('should export materialPresetConfig', () => {
      expect(presets.materialPresetConfig).toBeDefined()
      expect(typeof presets.materialPresetConfig).toBe('function')
    })

    it('should export cupertinoPreset', () => {
      expect(presets.cupertinoPreset).toBeDefined()
      expect(typeof presets.cupertinoPreset).toBe('function')
    })

    it('should export cupertinoPresetConfig', () => {
      expect(presets.cupertinoPresetConfig).toBeDefined()
      expect(typeof presets.cupertinoPresetConfig).toBe('function')
    })

    it('should export nordPreset', () => {
      expect(presets.nordPreset).toBeDefined()
      expect(typeof presets.nordPreset).toBe('function')
    })

    it('should export nordPresetConfig', () => {
      expect(presets.nordPresetConfig).toBeDefined()
      expect(typeof presets.nordPresetConfig).toBe('function')
    })

    it('should export draculaPreset', () => {
      expect(presets.draculaPreset).toBeDefined()
      expect(typeof presets.draculaPreset).toBe('function')
    })

    it('should export draculaPresetConfig', () => {
      expect(presets.draculaPresetConfig).toBeDefined()
      expect(typeof presets.draculaPresetConfig).toBe('function')
    })

    it('should export githubPreset', () => {
      expect(presets.githubPreset).toBeDefined()
      expect(typeof presets.githubPreset).toBe('function')
    })

    it('should export githubPresetConfig', () => {
      expect(presets.githubPresetConfig).toBeDefined()
      expect(typeof presets.githubPresetConfig).toBe('function')
    })

    it('should export enhancedLightPreset', () => {
      expect(presets.enhancedLightPreset).toBeDefined()
      expect(typeof presets.enhancedLightPreset).toBe('function')
    })

    it('should export enhancedLightPresetConfig', () => {
      expect(presets.enhancedLightPresetConfig).toBeDefined()
      expect(typeof presets.enhancedLightPresetConfig).toBe('function')
    })

    it('should export catppuccinPreset', () => {
      expect(presets.catppuccinPreset).toBeDefined()
      expect(typeof presets.catppuccinPreset).toBe('function')
    })

    it('should export catppuccinPresetConfig', () => {
      expect(presets.catppuccinPresetConfig).toBeDefined()
      expect(typeof presets.catppuccinPresetConfig).toBe('function')
    })

    it('should export coralPreset as default', () => {
      expect(presets.default).toBe(presets.coralPreset)
    })
  })

  describe('All Presets Return Plugins', () => {
    it('coralPreset should return plugins array', () => {
      const plugins = presets.coralPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('windPreset should return plugins array', () => {
      const plugins = presets.windPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('miniPreset should return plugins array', () => {
      const plugins = presets.miniPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('fullPreset should return plugins array', () => {
      const plugins = presets.fullPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('materialPreset should return plugins array', () => {
      const plugins = presets.materialPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('cupertinoPreset should return plugins array', () => {
      const plugins = presets.cupertinoPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('nordPreset should return plugins array', () => {
      const plugins = presets.nordPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('draculaPreset should return plugins array', () => {
      const plugins = presets.draculaPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('githubPreset should return plugins array', () => {
      const plugins = presets.githubPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('enhancedLightPreset should return plugins array', () => {
      const plugins = presets.enhancedLightPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })

    it('catppuccinPreset should return plugins array', () => {
      const plugins = presets.catppuccinPreset()
      expect(Array.isArray(plugins)).toBe(true)
      expect(plugins.length).toBeGreaterThan(0)
    })
  })
})
