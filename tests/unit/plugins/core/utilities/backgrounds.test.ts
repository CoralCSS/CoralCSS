/**
 * Backgrounds Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { backgroundsPlugin } from '../../../../../src/plugins/core/utilities/backgrounds'

describe('backgroundsPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(backgroundsPlugin())
  })

  describe('background attachment', () => {
    it('should generate bg-fixed', () => {
      const css = coral.generate(['bg-fixed'])
      expect(css).toContain('background-attachment: fixed')
    })

    it('should generate bg-local', () => {
      const css = coral.generate(['bg-local'])
      expect(css).toContain('background-attachment: local')
    })

    it('should generate bg-scroll', () => {
      const css = coral.generate(['bg-scroll'])
      expect(css).toContain('background-attachment: scroll')
    })
  })

  describe('background clip', () => {
    it('should generate bg-clip-border', () => {
      const css = coral.generate(['bg-clip-border'])
      expect(css).toContain('background-clip: border-box')
    })

    it('should generate bg-clip-padding', () => {
      const css = coral.generate(['bg-clip-padding'])
      expect(css).toContain('background-clip: padding-box')
    })

    it('should generate bg-clip-content', () => {
      const css = coral.generate(['bg-clip-content'])
      expect(css).toContain('background-clip: content-box')
    })

    it('should generate bg-clip-text', () => {
      const css = coral.generate(['bg-clip-text'])
      expect(css).toContain('background-clip: text')
    })
  })

  describe('background origin', () => {
    it('should generate bg-origin-border', () => {
      const css = coral.generate(['bg-origin-border'])
      expect(css).toContain('background-origin: border-box')
    })

    it('should generate bg-origin-padding', () => {
      const css = coral.generate(['bg-origin-padding'])
      expect(css).toContain('background-origin: padding-box')
    })

    it('should generate bg-origin-content', () => {
      const css = coral.generate(['bg-origin-content'])
      expect(css).toContain('background-origin: content-box')
    })
  })

  describe('background position', () => {
    it('should generate bg-bottom', () => {
      const css = coral.generate(['bg-bottom'])
      expect(css).toContain('background-position: bottom')
    })

    it('should generate bg-center', () => {
      const css = coral.generate(['bg-center'])
      expect(css).toContain('background-position: center')
    })

    it('should generate bg-left', () => {
      const css = coral.generate(['bg-left'])
      expect(css).toContain('background-position: left')
    })

    it('should generate bg-left-bottom', () => {
      const css = coral.generate(['bg-left-bottom'])
      expect(css).toContain('background-position: left bottom')
    })

    it('should generate bg-right-top', () => {
      const css = coral.generate(['bg-right-top'])
      expect(css).toContain('background-position: right top')
    })
  })

  describe('background repeat', () => {
    it('should generate bg-repeat', () => {
      const css = coral.generate(['bg-repeat'])
      expect(css).toContain('background-repeat: repeat')
    })

    it('should generate bg-no-repeat', () => {
      const css = coral.generate(['bg-no-repeat'])
      expect(css).toContain('background-repeat: no-repeat')
    })

    it('should generate bg-repeat-x', () => {
      const css = coral.generate(['bg-repeat-x'])
      expect(css).toContain('background-repeat: repeat-x')
    })

    it('should generate bg-repeat-y', () => {
      const css = coral.generate(['bg-repeat-y'])
      expect(css).toContain('background-repeat: repeat-y')
    })
  })

  describe('background size', () => {
    it('should generate bg-auto', () => {
      const css = coral.generate(['bg-auto'])
      expect(css).toContain('background-size: auto')
    })

    it('should generate bg-cover', () => {
      const css = coral.generate(['bg-cover'])
      expect(css).toContain('background-size: cover')
    })

    it('should generate bg-contain', () => {
      const css = coral.generate(['bg-contain'])
      expect(css).toContain('background-size: contain')
    })
  })

  describe('background image', () => {
    it('should generate bg-none', () => {
      const css = coral.generate(['bg-none'])
      expect(css).toContain('background-image: none')
    })
  })

  describe('linear gradients', () => {
    it('should generate bg-gradient-to-t', () => {
      const css = coral.generate(['bg-gradient-to-t'])
      expect(css).toContain('linear-gradient(to top')
    })

    it('should generate bg-gradient-to-r', () => {
      const css = coral.generate(['bg-gradient-to-r'])
      expect(css).toContain('linear-gradient(to right')
    })

    it('should generate bg-gradient-to-b', () => {
      const css = coral.generate(['bg-gradient-to-b'])
      expect(css).toContain('linear-gradient(to bottom')
    })

    it('should generate bg-gradient-to-l', () => {
      const css = coral.generate(['bg-gradient-to-l'])
      expect(css).toContain('linear-gradient(to left')
    })

    it('should generate diagonal gradients', () => {
      const css = coral.generate(['bg-gradient-to-tr', 'bg-gradient-to-br', 'bg-gradient-to-bl', 'bg-gradient-to-tl'])
      expect(css).toContain('to top right')
      expect(css).toContain('to bottom right')
      expect(css).toContain('to bottom left')
      expect(css).toContain('to top left')
    })
  })

  describe('radial gradients', () => {
    it('should generate bg-gradient-radial', () => {
      const css = coral.generate(['bg-gradient-radial'])
      expect(css).toContain('radial-gradient')
    })

    it('should generate bg-radial-circle', () => {
      const css = coral.generate(['bg-radial-circle'])
      expect(css).toContain('radial-gradient(circle')
    })

    it('should generate bg-radial-ellipse', () => {
      const css = coral.generate(['bg-radial-ellipse'])
      expect(css).toContain('radial-gradient(ellipse')
    })

    it('should generate radial sizes', () => {
      const css = coral.generate(['bg-radial-closest-side', 'bg-radial-farthest-corner'])
      expect(css).toContain('closest-side')
      expect(css).toContain('farthest-corner')
    })

    it('should generate radial positions', () => {
      const css = coral.generate(['bg-radial-at-center', 'bg-radial-at-top', 'bg-radial-at-bottom-right'])
      expect(css).toContain('at center')
      expect(css).toContain('at top')
      expect(css).toContain('at bottom right')
    })
  })

  describe('conic gradients', () => {
    it('should generate bg-gradient-conic', () => {
      const css = coral.generate(['bg-gradient-conic'])
      expect(css).toContain('conic-gradient')
    })

    it('should generate conic from angles', () => {
      const css = coral.generate(['bg-conic-from-0', 'bg-conic-from-90', 'bg-conic-from-180'])
      expect(css).toContain('from 0deg')
      expect(css).toContain('from 90deg')
      expect(css).toContain('from 180deg')
    })

    it('should generate conic at positions', () => {
      const css = coral.generate(['bg-conic-at-center', 'bg-conic-at-top', 'bg-conic-at-bottom-left'])
      expect(css).toContain('at center')
      expect(css).toContain('at top')
      expect(css).toContain('at bottom left')
    })
  })

  describe('gradient stop positions', () => {
    it('should generate from positions', () => {
      const css = coral.generate(['from-0%', 'from-50%', 'from-100%'])
      expect(css).toContain('--coral-gradient-from-position: 0%')
      expect(css).toContain('--coral-gradient-from-position: 50%')
      expect(css).toContain('--coral-gradient-from-position: 100%')
    })

    it('should generate via positions', () => {
      const css = coral.generate(['via-25%', 'via-50%', 'via-75%'])
      expect(css).toContain('--coral-gradient-via-position: 25%')
      expect(css).toContain('--coral-gradient-via-position: 50%')
      expect(css).toContain('--coral-gradient-via-position: 75%')
    })

    it('should generate to positions', () => {
      const css = coral.generate(['to-0%', 'to-50%', 'to-100%'])
      expect(css).toContain('--coral-gradient-to-position: 0%')
      expect(css).toContain('--coral-gradient-to-position: 50%')
      expect(css).toContain('--coral-gradient-to-position: 100%')
    })
  })

  describe('arbitrary gradients', () => {
    it('should generate arbitrary from color', () => {
      const css = coral.generate(['from-[#ff0000]'])
      expect(css).toContain('--coral-gradient-from: #ff0000')
    })

    it('should generate arbitrary via color', () => {
      const css = coral.generate(['via-[#00ff00]'])
      expect(css).toContain('--coral-gradient-stops')
      expect(css).toContain('#00ff00')
    })

    it('should generate arbitrary to color', () => {
      const css = coral.generate(['to-[#0000ff]'])
      expect(css).toContain('--coral-gradient-to: #0000ff')
    })
  })
})
