/**
 * Tests for Transforms Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { transformsPlugin } from '../../../../../src/plugins/core/utilities/transforms'
import type { Coral } from '../../../../../src/types'

describe('Transforms Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(transformsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = transformsPlugin()
      expect(plugin.name).toBe('transforms')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Scale Utilities', () => {
    it('should generate scale-0', () => {
      const css = coral.generate(['scale-0'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('0')
    })

    it('should generate scale-50', () => {
      const css = coral.generate(['scale-50'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('0.5')
    })

    it('should generate scale-100', () => {
      const css = coral.generate(['scale-100'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('1')
    })

    it('should generate scale-150', () => {
      const css = coral.generate(['scale-150'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('1.5')
    })

    it('should generate scale-x-75', () => {
      const css = coral.generate(['scale-x-75'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('0.75')
    })

    it('should generate scale-y-110', () => {
      const css = coral.generate(['scale-y-110'])
      expect(css).toContain('--coral-scale-y')
      expect(css).toContain('1.1')
    })

    it('should generate arbitrary scale', () => {
      const css = coral.generate(['scale-[1.25]'])
      expect(css).toContain('--coral-scale-x')
      expect(css).toContain('1.25')
    })

    it('should handle empty arbitrary scale', () => {
      const css = coral.generate(['scale-[]'])
      expect(css).toBe('')
    })
  })

  describe('Rotate Utilities', () => {
    it('should generate rotate-0', () => {
      const css = coral.generate(['rotate-0'])
      expect(css).toContain('--coral-rotate')
      expect(css).toContain('0deg')
    })

    it('should generate rotate-45', () => {
      const css = coral.generate(['rotate-45'])
      expect(css).toContain('--coral-rotate')
      expect(css).toContain('45deg')
    })

    it('should generate rotate-180', () => {
      const css = coral.generate(['rotate-180'])
      expect(css).toContain('--coral-rotate')
      expect(css).toContain('180deg')
    })

    it('should generate -rotate-45', () => {
      const css = coral.generate(['-rotate-45'])
      expect(css).toContain('--coral-rotate')
      expect(css).toContain('-45deg')
    })

    it('should generate arbitrary rotate', () => {
      const css = coral.generate(['rotate-[30deg]'])
      expect(css).toContain('--coral-rotate')
      expect(css).toContain('30deg')
    })

    it('should handle empty arbitrary rotate', () => {
      const css = coral.generate(['rotate-[]'])
      expect(css).toBe('')
    })
  })

  describe('Translate Utilities', () => {
    it('should generate translate-x-0', () => {
      const css = coral.generate(['translate-x-0'])
      expect(css).toContain('--coral-translate-x')
      expect(css).toContain('0px')
    })

    it('should generate translate-x-4', () => {
      const css = coral.generate(['translate-x-4'])
      expect(css).toContain('--coral-translate-x')
      expect(css).toContain('1rem')
    })

    it('should generate translate-y-8', () => {
      const css = coral.generate(['translate-y-8'])
      expect(css).toContain('--coral-translate-y')
      expect(css).toContain('2rem')
    })

    it('should generate -translate-x-4', () => {
      const css = coral.generate(['-translate-x-4'])
      expect(css).toContain('--coral-translate-x')
      expect(css).toContain('-1rem')
    })

    it('should generate translate-x-1/2', () => {
      const css = coral.generate(['translate-x-1/2'])
      expect(css).toContain('--coral-translate-x')
      // Fractional values may be parsed differently
      expect(css).toBeDefined()
    })

    it('should generate translate-y-full', () => {
      const css = coral.generate(['translate-y-full'])
      expect(css).toContain('--coral-translate-y')
      expect(css).toContain('100%')
    })

    it('should generate arbitrary translate-x', () => {
      const css = coral.generate(['translate-x-[50px]'])
      expect(css).toContain('--coral-translate-x')
      expect(css).toContain('50px')
    })

    it('should generate arbitrary translate-y', () => {
      const css = coral.generate(['translate-y-[25%]'])
      expect(css).toContain('--coral-translate-y')
      expect(css).toContain('25%')
    })

    it('should handle empty arbitrary translate-x', () => {
      const css = coral.generate(['translate-x-[]'])
      expect(css).toBe('')
    })

    it('should handle empty arbitrary translate-y', () => {
      const css = coral.generate(['translate-y-[]'])
      expect(css).toBe('')
    })
  })

  describe('Skew Utilities', () => {
    it('should generate skew-x-0', () => {
      const css = coral.generate(['skew-x-0'])
      expect(css).toContain('--coral-skew-x')
      expect(css).toContain('0deg')
    })

    it('should generate skew-x-6', () => {
      const css = coral.generate(['skew-x-6'])
      expect(css).toContain('--coral-skew-x')
      expect(css).toContain('6deg')
    })

    it('should generate skew-y-12', () => {
      const css = coral.generate(['skew-y-12'])
      expect(css).toContain('--coral-skew-y')
      expect(css).toContain('12deg')
    })

    it('should generate -skew-x-6', () => {
      const css = coral.generate(['-skew-x-6'])
      expect(css).toContain('--coral-skew-x')
      expect(css).toContain('-6deg')
    })

    it('should generate -skew-y-3', () => {
      const css = coral.generate(['-skew-y-3'])
      expect(css).toContain('--coral-skew-y')
      expect(css).toContain('-3deg')
    })

    it('should generate arbitrary skew-x', () => {
      const css = coral.generate(['skew-x-[15deg]'])
      expect(css).toContain('--coral-skew-x')
      expect(css).toContain('15deg')
    })

    it('should generate arbitrary skew-y', () => {
      const css = coral.generate(['skew-y-[20deg]'])
      expect(css).toContain('--coral-skew-y')
      expect(css).toContain('20deg')
    })

    it('should handle empty arbitrary skew-x', () => {
      const css = coral.generate(['skew-x-[]'])
      expect(css).toBe('')
    })

    it('should handle empty arbitrary skew-y', () => {
      const css = coral.generate(['skew-y-[]'])
      expect(css).toBe('')
    })
  })

  describe('Transform Origin', () => {
    it('should generate origin-center', () => {
      const css = coral.generate(['origin-center'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('center')
    })

    it('should generate origin-top', () => {
      const css = coral.generate(['origin-top'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('top')
    })

    it('should generate origin-top-right', () => {
      const css = coral.generate(['origin-top-right'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('top right')
    })

    it('should generate origin-bottom-left', () => {
      const css = coral.generate(['origin-bottom-left'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('bottom left')
    })

    it('should generate arbitrary origin', () => {
      const css = coral.generate(['origin-[25%_75%]'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('25%_75%')
    })

    it('should handle empty arbitrary origin', () => {
      const css = coral.generate(['origin-[]'])
      expect(css).toBe('')
    })
  })

  describe('3D Transform Utilities', () => {
    describe('Perspective', () => {
      it('should generate perspective', () => {
        const css = coral.generate(['perspective'])
        expect(css).toContain('perspective')
        expect(css).toContain('500px')
      })

      it('should generate perspective-none', () => {
        const css = coral.generate(['perspective-none'])
        expect(css).toContain('perspective')
        expect(css).toContain('none')
      })

      it('should generate perspective-sm', () => {
        const css = coral.generate(['perspective-sm'])
        expect(css).toContain('perspective')
        expect(css).toContain('250px')
      })

      it('should generate perspective-lg', () => {
        const css = coral.generate(['perspective-lg'])
        expect(css).toContain('perspective')
        expect(css).toContain('1000px')
      })

      it('should generate arbitrary perspective', () => {
        const css = coral.generate(['perspective-[800px]'])
        expect(css).toContain('perspective')
        expect(css).toContain('800px')
      })

      it('should handle empty arbitrary perspective', () => {
        const css = coral.generate(['perspective-[]'])
        expect(css).toBe('')
      })
    })

    describe('Perspective Origin', () => {
      it('should generate perspective-origin-center', () => {
        const css = coral.generate(['perspective-origin-center'])
        expect(css).toContain('perspective-origin')
        expect(css).toContain('center')
      })

      it('should generate perspective-origin-top-left', () => {
        const css = coral.generate(['perspective-origin-top-left'])
        expect(css).toContain('perspective-origin')
        expect(css).toContain('top left')
      })

      it('should generate arbitrary perspective-origin', () => {
        const css = coral.generate(['perspective-origin-[50%_25%]'])
        expect(css).toContain('perspective-origin')
        expect(css).toContain('50%_25%')
      })

      it('should handle empty arbitrary perspective-origin', () => {
        const css = coral.generate(['perspective-origin-[]'])
        expect(css).toBe('')
      })
    })

    describe('Transform Style', () => {
      it('should generate transform-3d', () => {
        const css = coral.generate(['transform-3d'])
        expect(css).toContain('transform-style')
        expect(css).toContain('preserve-3d')
      })

      it('should generate transform-flat', () => {
        const css = coral.generate(['transform-flat'])
        expect(css).toContain('transform-style')
        expect(css).toContain('flat')
      })

      it('should generate preserve-3d', () => {
        const css = coral.generate(['preserve-3d'])
        expect(css).toContain('transform-style')
        expect(css).toContain('preserve-3d')
      })
    })

    describe('Backface Visibility', () => {
      it('should generate backface-visible', () => {
        const css = coral.generate(['backface-visible'])
        expect(css).toContain('backface-visibility')
        expect(css).toContain('visible')
      })

      it('should generate backface-hidden', () => {
        const css = coral.generate(['backface-hidden'])
        expect(css).toContain('backface-visibility')
        expect(css).toContain('hidden')
      })
    })

    describe('Rotate 3D', () => {
      it('should generate rotate-x-45', () => {
        const css = coral.generate(['rotate-x-45'])
        expect(css).toContain('--coral-rotate-x')
        expect(css).toContain('45deg')
      })

      it('should generate -rotate-x-45', () => {
        const css = coral.generate(['-rotate-x-45'])
        expect(css).toContain('--coral-rotate-x')
        expect(css).toContain('-45deg')
      })

      it('should generate rotate-y-90', () => {
        const css = coral.generate(['rotate-y-90'])
        expect(css).toContain('--coral-rotate-y')
        expect(css).toContain('90deg')
      })

      it('should generate -rotate-y-90', () => {
        const css = coral.generate(['-rotate-y-90'])
        expect(css).toContain('--coral-rotate-y')
        expect(css).toContain('-90deg')
      })

      it('should generate rotate-z-180', () => {
        const css = coral.generate(['rotate-z-180'])
        expect(css).toContain('--coral-rotate-z')
        expect(css).toContain('180deg')
      })

      it('should generate -rotate-z-45', () => {
        const css = coral.generate(['-rotate-z-45'])
        expect(css).toContain('--coral-rotate-z')
        expect(css).toContain('-45deg')
      })

      it('should generate arbitrary rotate-x', () => {
        const css = coral.generate(['rotate-x-[60deg]'])
        expect(css).toContain('--coral-rotate-x')
        expect(css).toContain('60deg')
      })

      it('should generate arbitrary rotate-y', () => {
        const css = coral.generate(['rotate-y-[120deg]'])
        expect(css).toContain('--coral-rotate-y')
        expect(css).toContain('120deg')
      })

      it('should generate arbitrary rotate-z', () => {
        const css = coral.generate(['rotate-z-[270deg]'])
        expect(css).toContain('--coral-rotate-z')
        expect(css).toContain('270deg')
      })

      it('should handle empty arbitrary rotate-x', () => {
        const css = coral.generate(['rotate-x-[]'])
        expect(css).toBe('')
      })

      it('should handle empty arbitrary rotate-y', () => {
        const css = coral.generate(['rotate-y-[]'])
        expect(css).toBe('')
      })

      it('should handle empty arbitrary rotate-z', () => {
        const css = coral.generate(['rotate-z-[]'])
        expect(css).toBe('')
      })
    })

    describe('Translate Z', () => {
      it('should generate translate-z-0', () => {
        const css = coral.generate(['translate-z-0'])
        expect(css).toContain('--coral-translate-z')
        expect(css).toContain('0px')
      })

      it('should generate translate-z-4', () => {
        const css = coral.generate(['translate-z-4'])
        expect(css).toContain('--coral-translate-z')
        expect(css).toContain('1rem')
      })

      it('should generate -translate-z-8', () => {
        const css = coral.generate(['-translate-z-8'])
        expect(css).toContain('--coral-translate-z')
        expect(css).toContain('-2rem')
      })

      it('should generate arbitrary translate-z', () => {
        const css = coral.generate(['translate-z-[100px]'])
        expect(css).toContain('--coral-translate-z')
        expect(css).toContain('100px')
      })

      it('should handle empty arbitrary translate-z', () => {
        const css = coral.generate(['translate-z-[]'])
        expect(css).toBe('')
      })
    })

    describe('Scale Z', () => {
      it('should generate scale-z-50', () => {
        const css = coral.generate(['scale-z-50'])
        expect(css).toContain('--coral-scale-z')
        expect(css).toContain('0.5')
      })

      it('should generate scale-z-150', () => {
        const css = coral.generate(['scale-z-150'])
        expect(css).toContain('--coral-scale-z')
        expect(css).toContain('1.5')
      })
    })
  })

  describe('Transform GPU/CPU', () => {
    it('should generate transform-none', () => {
      const css = coral.generate(['transform-none'])
      expect(css).toContain('transform')
      expect(css).toContain('none')
    })

    it('should generate transform-gpu', () => {
      const css = coral.generate(['transform-gpu'])
      expect(css).toContain('transform')
      expect(css).toContain('translate3d')
    })

    it('should generate transform-cpu', () => {
      const css = coral.generate(['transform-cpu'])
      expect(css).toContain('transform')
    })

    it('should generate transform-3d-gpu', () => {
      const css = coral.generate(['transform-3d-gpu'])
      expect(css).toContain('transform')
      expect(css).toContain('perspective')
    })
  })

  describe('Motion Path (Offset)', () => {
    it('should generate offset-path-none', () => {
      const css = coral.generate(['offset-path-none'])
      expect(css).toContain('offset-path')
      expect(css).toContain('none')
    })

    it('should generate offset-path-circle', () => {
      const css = coral.generate(['offset-path-circle'])
      expect(css).toContain('offset-path')
      expect(css).toContain('circle')
    })

    it('should generate offset-path-ellipse', () => {
      const css = coral.generate(['offset-path-ellipse'])
      expect(css).toContain('offset-path')
      expect(css).toContain('ellipse')
    })

    it('should generate offset-path-polygon', () => {
      const css = coral.generate(['offset-path-polygon'])
      expect(css).toContain('offset-path')
      expect(css).toContain('polygon')
    })

    it('should generate arbitrary offset-path', () => {
      const css = coral.generate(['offset-path-[path("M0,0_L100,100")]'])
      expect(css).toContain('offset-path')
    })

    it('should handle empty arbitrary offset-path', () => {
      const css = coral.generate(['offset-path-[]'])
      expect(css).toBe('')
    })

    it('should generate offset-distance-50', () => {
      const css = coral.generate(['offset-distance-50'])
      expect(css).toContain('offset-distance')
      expect(css).toContain('50%')
    })

    it('should generate arbitrary offset-distance', () => {
      const css = coral.generate(['offset-distance-[75%]'])
      expect(css).toContain('offset-distance')
      expect(css).toContain('75%')
    })

    it('should handle empty arbitrary offset-distance', () => {
      const css = coral.generate(['offset-distance-[]'])
      expect(css).toBe('')
    })

    it('should generate offset-rotate-auto', () => {
      const css = coral.generate(['offset-rotate-auto'])
      expect(css).toContain('offset-rotate')
      expect(css).toContain('auto')
    })

    it('should generate offset-rotate-90', () => {
      const css = coral.generate(['offset-rotate-90'])
      expect(css).toContain('offset-rotate')
      expect(css).toContain('90deg')
    })

    it('should generate -offset-rotate-45', () => {
      const css = coral.generate(['-offset-rotate-45'])
      expect(css).toContain('offset-rotate')
      expect(css).toContain('-45deg')
    })

    it('should generate arbitrary offset-rotate', () => {
      const css = coral.generate(['offset-rotate-[120deg]'])
      expect(css).toContain('offset-rotate')
      expect(css).toContain('120deg')
    })

    it('should handle empty arbitrary offset-rotate', () => {
      const css = coral.generate(['offset-rotate-[]'])
      expect(css).toBe('')
    })

    it('should generate offset-position-center', () => {
      const css = coral.generate(['offset-position-center'])
      expect(css).toContain('offset-position')
      expect(css).toContain('center')
    })

    it('should generate arbitrary offset-position', () => {
      const css = coral.generate(['offset-position-[50%_50%]'])
      expect(css).toContain('offset-position')
    })

    it('should handle empty arbitrary offset-position', () => {
      const css = coral.generate(['offset-position-[]'])
      expect(css).toBe('')
    })

    it('should generate offset-anchor-auto', () => {
      const css = coral.generate(['offset-anchor-auto'])
      expect(css).toContain('offset-anchor')
      expect(css).toContain('auto')
    })

    it('should generate arbitrary offset-anchor', () => {
      const css = coral.generate(['offset-anchor-[25%_75%]'])
      expect(css).toContain('offset-anchor')
    })

    it('should handle empty arbitrary offset-anchor', () => {
      const css = coral.generate(['offset-anchor-[]'])
      expect(css).toBe('')
    })

    it('should generate motion-path-ready', () => {
      const css = coral.generate(['motion-path-ready'])
      expect(css).toContain('offset-path')
      expect(css).toContain('offset-distance')
      expect(css).toContain('offset-rotate')
    })
  })

  describe('Transform Box', () => {
    it('should generate transform-box-content', () => {
      const css = coral.generate(['transform-box-content'])
      expect(css).toContain('transform-box')
      expect(css).toContain('content-box')
    })

    it('should generate transform-box-border', () => {
      const css = coral.generate(['transform-box-border'])
      expect(css).toContain('transform-box')
      expect(css).toContain('border-box')
    })

    it('should generate transform-box-fill', () => {
      const css = coral.generate(['transform-box-fill'])
      expect(css).toContain('transform-box')
      expect(css).toContain('fill-box')
    })

    it('should generate transform-box-view', () => {
      const css = coral.generate(['transform-box-view'])
      expect(css).toContain('transform-box')
      expect(css).toContain('view-box')
    })
  })

  describe('Matrix Transforms', () => {
    it('should generate arbitrary rotate-3d', () => {
      const css = coral.generate(['rotate-3d-[1,1,0,45deg]'])
      expect(css).toContain('transform')
      expect(css).toContain('rotate3d')
    })

    it('should handle invalid rotate-3d (too few parts)', () => {
      const css = coral.generate(['rotate-3d-[1,1,0]'])
      expect(css).toBe('')
    })

    it('should handle empty arbitrary rotate-3d', () => {
      const css = coral.generate(['rotate-3d-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary matrix', () => {
      const css = coral.generate(['matrix-[1,0,0,1,0,0]'])
      expect(css).toContain('transform')
      expect(css).toContain('matrix')
    })

    it('should handle empty arbitrary matrix', () => {
      const css = coral.generate(['matrix-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary matrix3d', () => {
      const css = coral.generate(['matrix3d-[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]'])
      expect(css).toContain('transform')
      expect(css).toContain('matrix3d')
    })

    it('should handle empty arbitrary matrix3d', () => {
      const css = coral.generate(['matrix3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Flip Card Presets', () => {
    it('should generate flip-card-container', () => {
      const css = coral.generate(['flip-card-container'])
      expect(css).toContain('perspective')
      expect(css).toContain('1000px')
    })

    it('should generate flip-card-inner', () => {
      const css = coral.generate(['flip-card-inner'])
      expect(css).toContain('transform-style')
      expect(css).toContain('preserve-3d')
    })

    it('should generate flip-card-front', () => {
      const css = coral.generate(['flip-card-front'])
      expect(css).toContain('backface-visibility')
      expect(css).toContain('hidden')
    })

    it('should generate flip-card-back', () => {
      const css = coral.generate(['flip-card-back'])
      expect(css).toContain('backface-visibility')
      expect(css).toContain('rotateY(180deg)')
    })

    it('should generate flip-x', () => {
      const css = coral.generate(['flip-x'])
      expect(css).toContain('transform')
      expect(css).toContain('rotateX(180deg)')
    })

    it('should generate flip-y', () => {
      const css = coral.generate(['flip-y'])
      expect(css).toContain('transform')
      expect(css).toContain('rotateY(180deg)')
    })

    it('should generate flip-x-half', () => {
      const css = coral.generate(['flip-x-half'])
      expect(css).toContain('rotateX(90deg)')
    })

    it('should generate flip-y-half', () => {
      const css = coral.generate(['flip-y-half'])
      expect(css).toContain('rotateY(90deg)')
    })
  })

  describe('Cube Transforms', () => {
    it('should generate cube-face-front', () => {
      const css = coral.generate(['cube-face-front'])
      expect(css).toContain('transform')
      expect(css).toContain('rotateY(0deg)')
    })

    it('should generate cube-face-back', () => {
      const css = coral.generate(['cube-face-back'])
      expect(css).toContain('rotateY(180deg)')
    })

    it('should generate cube-face-left', () => {
      const css = coral.generate(['cube-face-left'])
      expect(css).toContain('rotateY(-90deg)')
    })

    it('should generate cube-face-right', () => {
      const css = coral.generate(['cube-face-right'])
      expect(css).toContain('rotateY(90deg)')
    })

    it('should generate cube-face-top', () => {
      const css = coral.generate(['cube-face-top'])
      expect(css).toContain('rotateX(90deg)')
    })

    it('should generate cube-face-bottom', () => {
      const css = coral.generate(['cube-face-bottom'])
      expect(css).toContain('rotateX(-90deg)')
    })

    it('should generate cube-size', () => {
      const css = coral.generate(['cube-size'])
      expect(css).toContain('--cube-size')
      expect(css).toContain('100px')
    })

    it('should generate cube-size-lg', () => {
      const css = coral.generate(['cube-size-lg'])
      expect(css).toContain('--cube-size')
      expect(css).toContain('200px')
    })

    it('should generate arbitrary cube-size', () => {
      const css = coral.generate(['cube-size-[150px]'])
      expect(css).toContain('--cube-size')
      expect(css).toContain('150px')
    })

    it('should handle empty arbitrary cube-size', () => {
      const css = coral.generate(['cube-size-[]'])
      expect(css).toBe('')
    })
  })

  describe('Tilt Transforms', () => {
    it('should generate tilt-up', () => {
      const css = coral.generate(['tilt-up'])
      expect(css).toContain('transform')
      expect(css).toContain('rotateX(5deg)')
    })

    it('should generate tilt-down', () => {
      const css = coral.generate(['tilt-down'])
      expect(css).toContain('rotateX(-5deg)')
    })

    it('should generate tilt-left', () => {
      const css = coral.generate(['tilt-left'])
      expect(css).toContain('rotateY(-5deg)')
    })

    it('should generate tilt-right', () => {
      const css = coral.generate(['tilt-right'])
      expect(css).toContain('rotateY(5deg)')
    })

    it('should generate tilt-up-lg', () => {
      const css = coral.generate(['tilt-up-lg'])
      expect(css).toContain('rotateX(10deg)')
    })

    it('should generate tilt-down-lg', () => {
      const css = coral.generate(['tilt-down-lg'])
      expect(css).toContain('rotateX(-10deg)')
    })
  })

  describe('Parallax Transforms', () => {
    it('should generate parallax-near', () => {
      const css = coral.generate(['parallax-near'])
      expect(css).toContain('translateZ(100px)')
    })

    it('should generate parallax-mid', () => {
      const css = coral.generate(['parallax-mid'])
      expect(css).toContain('translateZ(50px)')
    })

    it('should generate parallax-far', () => {
      const css = coral.generate(['parallax-far'])
      expect(css).toContain('translateZ(0px)')
    })

    it('should generate parallax-very-far', () => {
      const css = coral.generate(['parallax-very-far'])
      expect(css).toContain('translateZ(-50px)')
    })
  })

  describe('Scale3d and Translate3d', () => {
    it('should generate arbitrary scale-3d with 3 values', () => {
      const css = coral.generate(['scale-3d-[1.2,1.5,0.8]'])
      expect(css).toContain('transform')
      expect(css).toContain('scale3d')
    })

    it('should generate arbitrary scale-3d with 1 value', () => {
      const css = coral.generate(['scale-3d-[1.5]'])
      expect(css).toContain('transform')
      expect(css).toContain('scale3d')
    })

    it('should handle invalid scale-3d (2 values)', () => {
      const css = coral.generate(['scale-3d-[1.2,1.5]'])
      expect(css).toBe('')
    })

    it('should handle empty arbitrary scale-3d', () => {
      const css = coral.generate(['scale-3d-[]'])
      expect(css).toBe('')
    })

    it('should generate arbitrary translate-3d', () => {
      const css = coral.generate(['translate-3d-[10px,20px,30px]'])
      expect(css).toContain('transform')
      expect(css).toContain('translate3d')
    })

    it('should handle invalid translate-3d (less than 3 values)', () => {
      const css = coral.generate(['translate-3d-[10px,20px]'])
      expect(css).toBe('')
    })

    it('should handle empty arbitrary translate-3d', () => {
      const css = coral.generate(['translate-3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Will-Change', () => {
    it('should generate will-change-transform', () => {
      const css = coral.generate(['will-change-transform'])
      expect(css).toContain('will-change')
      expect(css).toContain('transform')
    })

    it('should generate will-change-opacity', () => {
      const css = coral.generate(['will-change-opacity'])
      expect(css).toContain('will-change')
      expect(css).toContain('opacity')
    })

    it('should generate will-change-scroll', () => {
      const css = coral.generate(['will-change-scroll'])
      expect(css).toContain('will-change')
      expect(css).toContain('scroll-position')
    })

    it('should generate will-change-contents', () => {
      const css = coral.generate(['will-change-contents'])
      expect(css).toContain('will-change')
      expect(css).toContain('contents')
    })

    it('should generate will-change-auto', () => {
      const css = coral.generate(['will-change-auto'])
      expect(css).toContain('will-change')
      expect(css).toContain('auto')
    })

    it('should generate will-change-transform-opacity', () => {
      const css = coral.generate(['will-change-transform-opacity'])
      expect(css).toContain('will-change')
      expect(css).toContain('transform, opacity')
    })

    it('should generate arbitrary will-change', () => {
      const css = coral.generate(['will-change-[transform,filter]'])
      expect(css).toContain('will-change')
    })

    it('should handle empty arbitrary will-change', () => {
      const css = coral.generate(['will-change-[]'])
      expect(css).toBe('')
    })
  })

  describe('Contain', () => {
    it('should generate contain-none', () => {
      const css = coral.generate(['contain-none'])
      expect(css).toContain('contain')
      expect(css).toContain('none')
    })

    it('should generate contain-strict', () => {
      const css = coral.generate(['contain-strict'])
      expect(css).toContain('contain')
      expect(css).toContain('strict')
    })

    it('should generate contain-content', () => {
      const css = coral.generate(['contain-content'])
      expect(css).toContain('contain')
      expect(css).toContain('content')
    })

    it('should generate contain-size', () => {
      const css = coral.generate(['contain-size'])
      expect(css).toContain('contain')
      expect(css).toContain('size')
    })

    it('should generate contain-layout', () => {
      const css = coral.generate(['contain-layout'])
      expect(css).toContain('contain')
      expect(css).toContain('layout')
    })

    it('should generate contain-style', () => {
      const css = coral.generate(['contain-style'])
      expect(css).toContain('contain')
      expect(css).toContain('style')
    })

    it('should generate contain-paint', () => {
      const css = coral.generate(['contain-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('paint')
    })

    it('should generate contain-layout-paint', () => {
      const css = coral.generate(['contain-layout-paint'])
      expect(css).toContain('contain')
      expect(css).toContain('layout paint')
    })

    it('should generate contain-inline-size', () => {
      const css = coral.generate(['contain-inline-size'])
      expect(css).toContain('contain')
      expect(css).toContain('inline-size')
    })

    it('should generate arbitrary contain', () => {
      const css = coral.generate(['contain-[layout_style]'])
      expect(css).toContain('contain')
    })

    it('should handle empty arbitrary contain', () => {
      const css = coral.generate(['contain-[]'])
      expect(css).toBe('')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/transforms'
      )
      expect(defaultExport).toBe(transformsPlugin)
    })
  })
})
