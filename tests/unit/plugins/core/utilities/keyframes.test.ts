/**
 * Tests for Keyframes Plugin
 *
 * Tests CSS keyframe animations for CoralCSS advanced effects.
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { keyframesPlugin, keyframesCSS } from '../../../../../src/plugins/core/utilities/keyframes'
import type { Coral } from '../../../../../src/types'

describe('Keyframes Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(keyframesPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = keyframesPlugin()
      expect(plugin.name).toBe('keyframes')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Keyframes CSS Export', () => {
    it('should export keyframesCSS', () => {
      expect(keyframesCSS).toBeDefined()
      expect(typeof keyframesCSS).toBe('string')
    })

    it('should contain @keyframes declarations', () => {
      expect(keyframesCSS).toContain('@keyframes')
    })
  })

  describe('Gradient Animations', () => {
    const gradientKeyframes = [
      'gradient-shift',
      'shimmer',
      'wave',
      'gradient-pulse',
      'gradient-rotate'
    ]

    for (const keyframe of gradientKeyframes) {
      it(`should include @keyframes ${keyframe}`, () => {
        expect(keyframesCSS).toContain(`@keyframes ${keyframe}`)
      })
    }

    it('should animate background-position for gradient-shift', () => {
      expect(keyframesCSS).toContain('background-position')
    })
  })

  describe('Spring Animations', () => {
    const springKeyframes = [
      'spring-in',
      'spring-out',
      'bounce-in',
      'elastic',
      'jello',
      'rubber-band'
    ]

    for (const keyframe of springKeyframes) {
      it(`should include @keyframes ${keyframe}`, () => {
        expect(keyframesCSS).toContain(`@keyframes ${keyframe}`)
      })
    }

    it('should use transform scale for spring animations', () => {
      expect(keyframesCSS).toContain('transform')
      expect(keyframesCSS).toContain('scale')
    })
  })

  describe('Skeleton Loading', () => {
    it('should include skeleton-loading keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes skeleton-loading')
    })

    it('should include skeleton-pulse keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes skeleton-pulse')
    })

    it('should animate opacity for skeleton-pulse', () => {
      expect(keyframesCSS).toContain('opacity')
    })
  })

  describe('Glow Animation', () => {
    it('should include glow-pulse keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes glow-pulse')
    })

    it('should use box-shadow for glow effect', () => {
      expect(keyframesCSS).toContain('box-shadow')
    })
  })

  describe('Float Animations', () => {
    it('should include float keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes float')
    })

    it('should include float-slow keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes float-slow')
    })

    it('should use translateY for float effect', () => {
      expect(keyframesCSS).toContain('translateY')
    })
  })

  describe('Pulse Animations', () => {
    it('should include pulse-ring keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes pulse-ring')
    })

    it('should include pulse-dot keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes pulse-dot')
    })
  })

  describe('Wiggle Animation', () => {
    it('should include wiggle keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes wiggle')
    })

    it('should use rotate for wiggle effect', () => {
      expect(keyframesCSS).toContain('rotate')
    })
  })

  describe('Shake Animation', () => {
    it('should include shake keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes shake')
    })

    it('should use translateX for shake effect', () => {
      expect(keyframesCSS).toContain('translateX')
    })
  })

  describe('Swing Animation', () => {
    it('should include swing keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes swing')
    })

    it('should use rotate3d for swing effect', () => {
      expect(keyframesCSS).toContain('rotate3d')
    })
  })

  describe('Heartbeat Animation', () => {
    it('should include heartbeat keyframes', () => {
      expect(keyframesCSS).toContain('@keyframes heartbeat')
    })
  })

  describe('Animation Utilities', () => {
    // Test only utilities that are actually exposed by the plugin
    it('should generate animate-float utility', () => {
      const css = coral.generate(['animate-float'])
      expect(css).toContain('animation')
      expect(css).toContain('float')
    })

    it('should generate animate-pulse-ring utility', () => {
      const css = coral.generate(['animate-pulse-ring'])
      expect(css).toContain('animation')
    })

    it('should generate animate-wiggle utility', () => {
      const css = coral.generate(['animate-wiggle'])
      expect(css).toContain('animation')
      expect(css).toContain('wiggle')
    })

    it('should generate animate-shake utility', () => {
      const css = coral.generate(['animate-shake'])
      expect(css).toContain('animation')
      expect(css).toContain('shake')
    })

    it('should generate animate-swing utility', () => {
      const css = coral.generate(['animate-swing'])
      expect(css).toContain('animation')
      expect(css).toContain('swing')
    })

    it('should generate animate-heartbeat utility', () => {
      const css = coral.generate(['animate-heartbeat'])
      expect(css).toContain('animation')
      expect(css).toContain('heartbeat')
    })

    it('should generate animate-tada utility', () => {
      const css = coral.generate(['animate-tada'])
      expect(css).toContain('animation')
    })

    it('should generate animate-pop utility', () => {
      const css = coral.generate(['animate-pop'])
      expect(css).toContain('animation')
    })
  })

  describe('Animation Iteration Utilities', () => {
    it('should generate animate-once', () => {
      const css = coral.generate(['animate-once'])
      expect(css).toContain('animation-iteration-count')
      expect(css).toContain('1')
    })

    it('should generate animate-infinite', () => {
      const css = coral.generate(['animate-infinite'])
      expect(css).toContain('animation-iteration-count')
      expect(css).toContain('infinite')
    })

    it('should generate animate-twice', () => {
      const css = coral.generate(['animate-twice'])
      expect(css).toContain('animation-iteration-count')
      expect(css).toContain('2')
    })
  })

  describe('Animation Direction Utilities', () => {
    const directions = ['normal', 'reverse', 'alternate', 'alternate-reverse']

    for (const direction of directions) {
      it(`should generate animate-${direction}`, () => {
        const css = coral.generate([`animate-${direction}`])
        expect(css).toContain('animation-direction')
      })
    }
  })

  describe('Animation Fill Mode Utilities', () => {
    const fillModes = ['none', 'forwards', 'backwards', 'both']

    for (const fillMode of fillModes) {
      it(`should generate animate-fill-${fillMode}`, () => {
        const css = coral.generate([`animate-fill-${fillMode}`])
        expect(css).toContain('animation-fill-mode')
      })
    }
  })

  describe('Animation Play State Utilities', () => {
    it('should generate animate-running', () => {
      const css = coral.generate(['animate-running'])
      expect(css).toContain('animation-play-state')
      expect(css).toContain('running')
    })

    it('should generate animate-paused', () => {
      const css = coral.generate(['animate-paused'])
      expect(css).toContain('animation-play-state')
      expect(css).toContain('paused')
    })
  })

  describe('Keyframe Percentage Coverage', () => {
    it('should have 0% keyframe states', () => {
      expect(keyframesCSS).toContain('0%')
    })

    it('should have 50% keyframe states', () => {
      expect(keyframesCSS).toContain('50%')
    })

    it('should have 100% keyframe states', () => {
      expect(keyframesCSS).toContain('100%')
    })
  })
})
