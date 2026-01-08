/**
 * Spacing Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { spacingPlugin } from '../../../src/plugins/core/utilities/spacing'

describe('spacingPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(spacingPlugin())
  })

  describe('padding', () => {
    it('should generate p-0', () => {
      const css = coral.generate(['p-0'])
      expect(css).toContain('padding: 0px')
    })

    it('should generate p-4', () => {
      const css = coral.generate(['p-4'])
      expect(css).toContain('padding: 1rem')
    })

    it('should generate px-4', () => {
      const css = coral.generate(['px-4'])
      expect(css).toContain('padding-left: 1rem')
      expect(css).toContain('padding-right: 1rem')
    })

    it('should generate py-4', () => {
      const css = coral.generate(['py-4'])
      expect(css).toContain('padding-top: 1rem')
      expect(css).toContain('padding-bottom: 1rem')
    })

    it('should generate pt-4', () => {
      const css = coral.generate(['pt-4'])
      expect(css).toContain('padding-top: 1rem')
    })

    it('should generate arbitrary padding', () => {
      const css = coral.generate(['p-[20px]'])
      expect(css).toContain('padding: 20px')
    })
  })

  describe('margin', () => {
    it('should generate m-0', () => {
      const css = coral.generate(['m-0'])
      expect(css).toContain('margin: 0px')
    })

    it('should generate m-4', () => {
      const css = coral.generate(['m-4'])
      expect(css).toContain('margin: 1rem')
    })

    it('should generate mx-auto', () => {
      const css = coral.generate(['mx-auto'])
      expect(css).toContain('margin-left: auto')
      expect(css).toContain('margin-right: auto')
    })

    it('should generate negative margin', () => {
      const css = coral.generate(['-mt-4'])
      expect(css).toContain('margin-top: -1rem')
    })

    it('should generate arbitrary margin', () => {
      const css = coral.generate(['m-[30px]'])
      expect(css).toContain('margin: 30px')
    })
  })

  describe('gap', () => {
    it('should generate gap-4', () => {
      const css = coral.generate(['gap-4'])
      expect(css).toContain('gap: 1rem')
    })

    it('should generate gap-x-4', () => {
      const css = coral.generate(['gap-x-4'])
      expect(css).toContain('column-gap: 1rem')
    })

    it('should generate gap-y-4', () => {
      const css = coral.generate(['gap-y-4'])
      expect(css).toContain('row-gap: 1rem')
    })
  })

  describe('space between', () => {
    it('should generate space-x-4', () => {
      const css = coral.generate(['space-x-4'])
      expect(css).toContain('margin-left: 1rem')
    })

    it('should generate space-y-4', () => {
      const css = coral.generate(['space-y-4'])
      expect(css).toContain('margin-top: 1rem')
    })
  })
})
