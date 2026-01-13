/**
 * Tests for Scroll Snap Utilities Plugin
 */
import { describe, it, expect } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { scrollSnapPlugin } from '../../../../../src/plugins/core/utilities/scroll-snap'

describe('Scroll Snap Utilities Plugin', () => {
  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = scrollSnapPlugin()
      expect(plugin.name).toBe('scroll-snap')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Scroll Snap Type', () => {
    it('should generate snap-none', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-none'])
      expect(css).toContain('scroll-snap-type: none')
    })

    it('should generate snap-x with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-x'])
      expect(css).toContain('scroll-snap-type: x var(--scroll-snap-strictness, mandatory)')
    })

    it('should generate snap-y with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-y'])
      expect(css).toContain('scroll-snap-type: y var(--scroll-snap-strictness, mandatory)')
    })

    it('should generate snap-both with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-both'])
      expect(css).toContain('scroll-snap-type: both var(--scroll-snap-strictness, mandatory)')
    })

    it('should generate snap-mandatory with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-mandatory'])
      expect(css).toContain('--scroll-snap-strictness: mandatory')
    })

    it('should generate snap-proximity with CSS variable', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-proximity'])
      expect(css).toContain('--scroll-snap-strictness: proximity')
    })
  })

  describe('Scroll Snap Align', () => {
    it('should generate snap-start', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-start'])
      expect(css).toContain('scroll-snap-align: start')
    })

    it('should generate snap-end', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-end'])
      expect(css).toContain('scroll-snap-align: end')
    })

    it('should generate snap-center', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-center'])
      expect(css).toContain('scroll-snap-align: center')
    })

    it('should generate snap-align-none', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-align-none'])
      expect(css).toContain('scroll-snap-align: none')
    })
  })

  describe('Scroll Snap Stop', () => {
    it('should generate snap-normal', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-normal'])
      expect(css).toContain('scroll-snap-stop: normal')
    })

    it('should generate snap-always', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-always'])
      expect(css).toContain('scroll-snap-stop: always')
    })
  })

  describe('Scroll Padding', () => {
    it('should generate snap-p-0', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-0'])
      expect(css).toContain('scroll-padding: 0')
    })

    it('should generate snap-p-1', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-1'])
      expect(css).toContain('scroll-padding-inline: 0.25rem')
    })

    it('should generate snap-p-2', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-2'])
      expect(css).toContain('scroll-padding-inline: 0.5rem')
    })

    it('should generate snap-p-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-4'])
      expect(css).toContain('scroll-padding-inline: 1rem')
    })

    it('should generate snap-p-6', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-6'])
      expect(css).toContain('scroll-padding-inline: 1.5rem')
    })

    it('should generate snap-p-8', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-8'])
      expect(css).toContain('scroll-padding-inline: 2rem')
    })

    it('should generate snap-p-12', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-12'])
      expect(css).toContain('scroll-padding-inline: 3rem')
    })

    it('should note snap-px-4 is not implemented (use snap-p-4 instead)', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-px-4'])
      // snap-px is not implemented, only snap-p-N for inline padding
      expect(css).toBe('')
    })

    it('should generate snap-py-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-py-4'])
      expect(css).toContain('scroll-padding-block: 1rem')
    })

    it('should note snap-pt-4 is not implemented', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-pt-4'])
      // snap-pt is not implemented
      expect(css).toBe('')
    })

    it('should note snap-pr-4 is not implemented', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-pr-4'])
      // snap-pr is not implemented
      expect(css).toBe('')
    })

    it('should note snap-pb-4 is not implemented', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-pb-4'])
      // snap-pb is not implemented
      expect(css).toBe('')
    })

    it('should note snap-pl-4 is not implemented', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-pl-4'])
      // snap-pl is not implemented
      expect(css).toBe('')
    })
  })

  describe('Scroll Margin', () => {
    it('should generate snap-m-0', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-m-0'])
      expect(css).toContain('scroll-margin: 0')
    })

    it('should generate snap-m-1', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-m-1'])
      expect(css).toContain('scroll-margin: 0.25rem')
    })

    it('should generate snap-m-2', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-m-2'])
      expect(css).toContain('scroll-margin: 0.5rem')
    })

    it('should generate snap-m-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-m-4'])
      expect(css).toContain('scroll-margin: 1rem')
    })

    it('should generate snap-mx-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-mx-4'])
      expect(css).toContain('scroll-margin-inline: 1rem')
    })

    it('should generate snap-my-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-my-4'])
      expect(css).toContain('scroll-margin-block: 1rem')
    })

    it('should generate snap-mt-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-mt-4'])
      expect(css).toContain('scroll-margin-top: 1rem')
    })

    it('should generate snap-mr-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-mr-4'])
      expect(css).toContain('scroll-margin-right: 1rem')
    })

    it('should generate snap-mb-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-mb-4'])
      expect(css).toContain('scroll-margin-bottom: 1rem')
    })

    it('should generate snap-ml-4', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-ml-4'])
      expect(css).toContain('scroll-margin-left: 1rem')
    })
  })

  describe('Common Use Cases', () => {
    it('should generate horizontal scroll snap container', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-x', 'snap-mandatory'])
      expect(css).toContain('scroll-snap-type: x var(--scroll-snap-strictness, mandatory)')
      expect(css).toContain('--scroll-snap-strictness: mandatory')
    })

    it('should generate vertical scroll snap container', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-y', 'snap-proximity'])
      expect(css).toContain('scroll-snap-type: y var(--scroll-snap-strictness, mandatory)')
      expect(css).toContain('--scroll-snap-strictness: proximity')
    })

    it('should generate carousel with padding', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-x', 'snap-mandatory', 'snap-p-4'])
      expect(css).toContain('scroll-snap-type: x var(--scroll-snap-strictness, mandatory)')
      expect(css).toContain('--scroll-snap-strictness: mandatory')
      expect(css).toContain('scroll-padding-inline: 1rem')
    })

    it('should generate snap points for children', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-center'])
      expect(css).toContain('scroll-snap-align: center')
    })

    it('should generate scroll snap stop', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-always'])
      expect(css).toContain('scroll-snap-stop: always')
    })
  })

  describe('Responsive Design', () => {
    it('should note responsive variants require responsive plugin', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-x', 'snap-center'])
      expect(css).toContain('scroll-snap-type')
      expect(css).toContain('scroll-snap-align')
    })
  })

  describe('Arbitrary Values', () => {
    it('should generate arbitrary scroll snap type', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-[x_mandatory]'])
      expect(css).toContain('scroll-snap-type: x mandatory')
    })

    it('should generate arbitrary scroll snap align', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-align-[start]'])
      expect(css).toContain('scroll-snap-align: start')
    })

    it('should generate arbitrary scroll padding', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-p-[20px]'])
      expect(css).toContain('scroll-padding: 20px')
    })

    it('should generate arbitrary scroll margin', () => {
      const coral = createCoral({ plugins: [scrollSnapPlugin()] })
      const css = coral.generate(['snap-m-[15px]'])
      expect(css).toContain('scroll-margin: 15px')
    })
  })
})
