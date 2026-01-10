/**
 * Colors Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { colorsPlugin } from '../../../src/plugins/core/utilities/colors'

describe('colorsPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(colorsPlugin())
  })

  describe('background colors', () => {
    it('should generate bg-white', () => {
      const css = coral.generate(['bg-white'])
      expect(css).toContain('background-color')
      expect(css).toContain('#ffffff')
    })

    it('should generate bg-black', () => {
      const css = coral.generate(['bg-black'])
      expect(css).toContain('background-color')
      expect(css).toContain('#000000')
    })

    it('should generate bg-coral-500', () => {
      const css = coral.generate(['bg-coral-500'])
      expect(css).toContain('background-color')
    })

    it('should generate bg with opacity', () => {
      const css = coral.generate(['bg-coral-500/50'])
      expect(css).toContain('background-color')
      expect(css).toContain('rgb(')
      expect(css).toContain('0.5')
    })

    it('should generate arbitrary bg color', () => {
      const css = coral.generate(['bg-[#ff5733]'])
      expect(css).toContain('background-color: #ff5733')
    })
  })

  describe('text colors', () => {
    it('should generate text-white', () => {
      const css = coral.generate(['text-white'])
      expect(css).toContain('color')
      expect(css).toContain('#ffffff')
    })

    it('should generate text-slate-900', () => {
      const css = coral.generate(['text-slate-900'])
      expect(css).toContain('color')
    })

    it('should generate arbitrary text color', () => {
      const css = coral.generate(['text-[#333]'])
      expect(css).toContain('color: #333')
    })
  })

  describe('border colors', () => {
    it('should generate border-coral-500', () => {
      const css = coral.generate(['border-coral-500'])
      expect(css).toContain('border-color')
    })

    it('should generate border-t-coral-500', () => {
      const css = coral.generate(['border-t-coral-500'])
      expect(css).toContain('border-top-color')
    })

    it('should generate arbitrary border color', () => {
      const css = coral.generate(['border-[red]'])
      expect(css).toContain('border-color: red')
    })
  })

  describe('ring colors', () => {
    it('should generate ring-coral-500', () => {
      const css = coral.generate(['ring-coral-500'])
      expect(css).toContain('--coral-ring-color')
    })
  })

  describe('opacity', () => {
    it('should generate opacity-50', () => {
      const css = coral.generate(['opacity-50'])
      expect(css).toContain('opacity')
      expect(css).toContain('0.5')
    })

    it('should generate opacity-0', () => {
      const css = coral.generate(['opacity-0'])
      expect(css).toContain('opacity')
      expect(css).toContain('0')
    })

    it('should generate opacity-100', () => {
      const css = coral.generate(['opacity-100'])
      expect(css).toContain('opacity')
      expect(css).toContain('1')
    })
  })

  describe('fill and stroke', () => {
    it('should generate fill-coral-500', () => {
      const css = coral.generate(['fill-coral-500'])
      expect(css).toContain('fill')
    })

    it('should generate fill-none', () => {
      const css = coral.generate(['fill-none'])
      expect(css).toContain('fill: none')
    })

    it('should generate stroke-coral-500', () => {
      const css = coral.generate(['stroke-coral-500'])
      expect(css).toContain('stroke')
    })

    it('should generate stroke-none', () => {
      const css = coral.generate(['stroke-none'])
      expect(css).toContain('stroke: none')
    })
  })

  describe('gradient colors', () => {
    it('should generate from-coral-500', () => {
      const css = coral.generate(['from-coral-500'])
      expect(css).toContain('--coral-gradient-from')
    })

    it('should generate from-coral-500/50 with opacity', () => {
      const css = coral.generate(['from-coral-500/50'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('--coral-gradient-stops')
    })

    it('should generate via-coral-500', () => {
      const css = coral.generate(['via-coral-500'])
      expect(css).toContain('--coral-gradient-via')
    })

    it('should generate via-coral-500/50 with opacity', () => {
      const css = coral.generate(['via-coral-500/50'])
      expect(css).toContain('--coral-gradient-via')
      expect(css).toContain('--coral-gradient-stops')
    })

    it('should generate to-coral-500', () => {
      const css = coral.generate(['to-coral-500'])
      expect(css).toContain('--coral-gradient-to')
    })

    it('should generate to-coral-500/50 with opacity', () => {
      const css = coral.generate(['to-coral-500/50'])
      expect(css).toContain('--coral-gradient-to')
    })

    it('should generate gradient with multiple stops', () => {
      const css = coral.generate(['from-red-500', 'via-yellow-500', 'to-green-500'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('--coral-gradient-via')
      expect(css).toContain('--coral-gradient-to')
    })

    it('should generate gradient with all color shades', () => {
      const css = coral.generate(['from-blue-100', 'from-blue-200', 'from-blue-500', 'from-blue-900'])
      expect(css).toContain('from-blue-100')
      expect(css).toContain('from-blue-200')
      expect(css).toContain('from-blue-500')
      expect(css).toContain('from-blue-900')
    })
  })

  describe('placeholder colors', () => {
    it('should generate placeholder-coral-500', () => {
      const css = coral.generate(['placeholder-coral-500'])
      expect(css).toContain('color')
      expect(css).toContain('#ff6b6b')
    })
  })

  describe('caret colors', () => {
    it('should generate caret-coral-500', () => {
      const css = coral.generate(['caret-coral-500'])
      expect(css).toContain('caret-color')
    })
  })

  describe('accent colors', () => {
    it('should generate accent-coral-500', () => {
      const css = coral.generate(['accent-coral-500'])
      expect(css).toContain('accent-color')
    })
  })

  describe('divide colors', () => {
    it('should generate divide-coral-500', () => {
      const css = coral.generate(['divide-coral-500'])
      expect(css).toContain('border-color')
    })
  })

  describe('outline colors', () => {
    it('should generate outline-coral-500', () => {
      const css = coral.generate(['outline-coral-500'])
      expect(css).toContain('outline-color')
    })
  })

  describe('shadow colors', () => {
    it('should generate shadow-coral-500', () => {
      const css = coral.generate(['shadow-coral-500'])
      expect(css).toContain('--coral-shadow-color')
    })
  })

  describe('decoration colors', () => {
    it('should generate decoration-coral-500', () => {
      const css = coral.generate(['decoration-coral-500'])
      expect(css).toContain('text-decoration-color')
    })
  })
})
