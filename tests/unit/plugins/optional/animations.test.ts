/**
 * Animations Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../src/kernel'
import { animationsPlugin, getAnimationKeyframes, generateAnimationCSS, generateStartingStyleCSS } from '../../../../src/plugins/optional/animations'
import animationsDefault from '../../../../src/plugins/optional/animations'

describe('animationsPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(animationsPlugin())
  })

  it('should return a plugin object', () => {
    const plugin = animationsPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = animationsPlugin()

    expect(plugin.name).toBe('animations')
  })

  it('should have version', () => {
    const plugin = animationsPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = animationsPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = animationsPlugin()
    const mockApi = { addRule: () => {}, addRules: () => {}, addVariant: () => {}, addVariants: () => {}, extendTheme: () => {} }

    expect(() => plugin.install(mockApi as never)).not.toThrow()
  })

  it('should export default', () => {
    expect(animationsDefault).toBe(animationsPlugin)
  })

  describe('Animation Utilities', () => {
    it('should generate animate-bounce', () => {
      const css = coral.generate(['animate-bounce'])
      expect(css).toContain('animation')
      expect(css).toContain('bounce')
    })

    it('should generate animate-pulse', () => {
      const css = coral.generate(['animate-pulse'])
      expect(css).toContain('animation')
      expect(css).toContain('pulse')
    })

    it('should generate animate-spin', () => {
      const css = coral.generate(['animate-spin'])
      expect(css).toContain('animation')
      expect(css).toContain('spin')
    })

    it('should generate animate-ping', () => {
      const css = coral.generate(['animate-ping'])
      expect(css).toContain('animation')
      expect(css).toContain('ping')
    })

    it('should generate animate-fade-in', () => {
      const css = coral.generate(['animate-fade-in'])
      expect(css).toContain('animation')
      expect(css).toContain('fadeIn')
    })

    it('should generate animate-slide-in-up', () => {
      const css = coral.generate(['animate-slide-in-up'])
      expect(css).toContain('animation')
      expect(css).toContain('slideInUp')
    })

    it('should generate animate-scale-in', () => {
      const css = coral.generate(['animate-scale-in'])
      expect(css).toContain('animation')
      expect(css).toContain('scaleIn')
    })

    it('should generate animate-zoom-in', () => {
      const css = coral.generate(['animate-zoom-in'])
      expect(css).toContain('animation')
      expect(css).toContain('zoomIn')
    })

    it('should generate animate-none', () => {
      const css = coral.generate(['animate-none'])
      expect(css).toContain('animation')
      expect(css).toContain('none')
    })
  })

  describe('Starting Style Utilities', () => {
    it('should generate starting', () => {
      const css = coral.generate(['starting'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('--starting-scale')
      expect(css).toContain('transition')
    })

    it('should generate starting-opacity-0', () => {
      const css = coral.generate(['starting-opacity-0'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0')
    })

    it('should generate starting-opacity-50', () => {
      const css = coral.generate(['starting-opacity-50'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0.5')
    })

    it('should generate starting-opacity-100', () => {
      const css = coral.generate(['starting-opacity-100'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('1')
    })

    it('should generate starting-scale-0', () => {
      const css = coral.generate(['starting-scale-0'])
      expect(css).toContain('--starting-scale')
      expect(css).toContain('0')
    })

    it('should generate starting-scale-50', () => {
      const css = coral.generate(['starting-scale-50'])
      expect(css).toContain('--starting-scale')
      expect(css).toContain('0.5')
    })

    it('should generate starting-duration-1000', () => {
      const css = coral.generate(['starting-duration-1000'])
      expect(css).toContain('--starting-duration')
      expect(css).toContain('1000ms')
    })

    it('should generate starting-ease-in', () => {
      const css = coral.generate(['starting-ease-in'])
      expect(css).toContain('--starting-easing')
      expect(css).toContain('cubic-bezier(0.4, 0, 1, 1)')
    })

    it('should generate starting-translate-x-8', () => {
      const css = coral.generate(['starting-translate-x-8'])
      expect(css).toContain('--starting-translate-x')
      expect(css).toContain('2rem')
    })

    it('should generate starting-translate-y-4', () => {
      const css = coral.generate(['starting-translate-y-4'])
      expect(css).toContain('--starting-translate-y')
      expect(css).toContain('1rem')
    })

    it('should generate starting-fade', () => {
      const css = coral.generate(['starting-fade'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0')
    })

    it('should generate starting-scale', () => {
      const css = coral.generate(['starting-scale'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0')
    })

    it('should generate starting-slide-down', () => {
      const css = coral.generate(['starting-slide-down'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0')
    })

    it('should generate starting-slide-up', () => {
      const css = coral.generate(['starting-slide-up'])
      expect(css).toContain('--starting-opacity')
      expect(css).toContain('0')
    })
  })

  describe('Exported Functions', () => {
    it('should export getAnimationKeyframes', () => {
      const keyframes = getAnimationKeyframes()
      expect(typeof keyframes).toBe('string')
      expect(keyframes).toContain('@keyframes')
      expect(keyframes).toContain('bounce')
    })

    it('should export getAnimationKeyframes with custom keyframes', () => {
      const customKeyframes = {
        customAnim: `@keyframes customAnim { from { opacity: 0; } to { opacity: 1; } }`
      }
      const keyframes = getAnimationKeyframes({ customKeyframes })
      expect(keyframes).toContain('customAnim')
      expect(keyframes).toContain('@keyframes')
    })

    it('should export generateAnimationCSS', () => {
      const css = generateAnimationCSS()
      expect(typeof css).toBe('string')
      expect(css).toContain('@keyframes')
    })

    it('should export generateStartingStyleCSS', () => {
      const css = generateStartingStyleCSS()
      expect(typeof css).toBe('string')
      expect(css).toContain('@starting-style')
      expect(css).toContain('.starting')
    })

    it('should export generateStartingStyleCSS with starting-fade', () => {
      const css = generateStartingStyleCSS()
      expect(css).toContain('.starting-fade')
      expect(css).toContain('opacity: 0')
    })

    it('should export generateStartingStyleCSS with starting-scale', () => {
      const css = generateStartingStyleCSS()
      expect(css).toContain('.starting-scale')
      expect(css).toContain('transform')
    })
  })
})
