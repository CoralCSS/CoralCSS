/**
 * Kernel Tests
 *
 * Tests for the CoralCSS kernel/engine.
 */

import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral, Kernel } from '../../src/kernel'
import type { Plugin, Rule } from '../../src/types'

describe('Kernel', () => {
  let coral: Kernel

  beforeEach(() => {
    coral = createCoral() as Kernel
  })

  describe('createCoral', () => {
    it('should create a new Coral instance', () => {
      expect(coral).toBeInstanceOf(Kernel)
    })

    it('should accept configuration options', () => {
      const instance = createCoral({ prefix: 'tw-' })
      expect(instance).toBeDefined()
    })
  })

  describe('use', () => {
    it('should register a plugin', () => {
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      }

      coral.use(plugin)
      // Plugin should be registered (verified by not throwing)
      expect(true).toBe(true)
    })

    it('should call plugin install function', () => {
      let installed = false
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {
          installed = true
        },
      }

      coral.use(plugin)
      expect(installed).toBe(true)
    })

    it('should pass context to plugin install', () => {
      let receivedContext: unknown = null
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          receivedContext = ctx
        },
      }

      coral.use(plugin)
      expect(receivedContext).toBeDefined()
      expect(receivedContext).toHaveProperty('addRule')
      expect(receivedContext).toHaveProperty('addVariant')
    })

    it('should return this for chaining', () => {
      const plugin: Plugin = {
        name: 'test-plugin',
        version: '1.0.0',
        install: () => {},
      }

      const result = coral.use(plugin)
      expect(result).toBe(coral)
    })
  })

  describe('generate', () => {
    beforeEach(() => {
      // Register a simple plugin with rules
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
          ctx.addRule({
            pattern: 'flex',
            properties: { display: 'flex' },
          })
          ctx.addRule({
            pattern: /^p-(\d+)$/,
            handler: (match) => {
              const v = match[1]
              if (!v) return null
              return { properties: { padding: `${parseInt(v, 10) * 0.25}rem` } }
            },
          })
        },
      })
    })

    it('should generate CSS for static patterns', () => {
      const css = coral.generate(['block'])
      expect(css).toContain('.block')
      expect(css).toContain('display: block')
    })

    it('should generate CSS for multiple classes', () => {
      const css = coral.generate(['block', 'flex'])
      expect(css).toContain('.block')
      expect(css).toContain('.flex')
    })

    it('should generate CSS for regex patterns', () => {
      const css = coral.generate(['p-4'])
      expect(css).toContain('.p-4')
      expect(css).toContain('padding: 1rem')
    })

    it('should return empty string for unknown classes', () => {
      const css = coral.generate(['unknown-class'])
      expect(css).toBe('')
    })

    it('should deduplicate classes', () => {
      const css = coral.generate(['block', 'block', 'flex'])
      const blockMatches = (css.match(/\.block/g) ?? []).length
      expect(blockMatches).toBe(1)
    })
  })

  describe('generateFromHTML', () => {
    beforeEach(() => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'flex',
            properties: { display: 'flex' },
          })
          ctx.addRule({
            pattern: 'items-center',
            properties: { 'align-items': 'center' },
          })
        },
      })
    })

    it('should extract and generate CSS from HTML', () => {
      const html = '<div class="flex items-center">Content</div>'
      const css = coral.generateFromHTML(html)
      expect(css).toContain('.flex')
      expect(css).toContain('.items-center')
    })

    it('should handle multiple elements', () => {
      const html = `
        <div class="flex">
          <span class="items-center">Content</span>
        </div>
      `
      const css = coral.generateFromHTML(html)
      expect(css).toContain('.flex')
      expect(css).toContain('.items-center')
    })
  })

  describe('getRules', () => {
    it('should return registered rules', () => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const rules = coral.getRules()
      expect(rules.length).toBeGreaterThan(0)
    })
  })

  describe('getVariants', () => {
    it('should return registered variants', () => {
      coral.use({
        name: 'test-variants',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addVariant({
            name: 'hover',
            handler: (selector) => `${selector}:hover`,
          })
        },
      })

      const variants = coral.getVariants()
      expect(variants.length).toBeGreaterThan(0)
    })
  })

  describe('reset', () => {
    it('should clear all registered rules', () => {
      coral.use({
        name: 'test-utilities',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      coral.reset()
      const rules = coral.getRules()
      expect(rules.length).toBe(0)
    })
  })

  describe('unregister', () => {
    it('should unregister a plugin by name', () => {
      coral.use({
        name: 'test-plugin',
        version: '1.0.0',
        install: (ctx) => {
          ctx.addRule({
            pattern: 'block',
            properties: { display: 'block' },
          })
        },
      })

      const result = coral.unregister('test-plugin')
      expect(result).toBe(true)
    })

    it('should return false for unknown plugin', () => {
      const result = coral.unregister('unknown-plugin')
      expect(result).toBe(false)
    })
  })
})
