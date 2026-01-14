/**
 * Tests for 3D Transforms Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { transforms3DPlugin } from '../../../../../src/plugins/core/utilities/transforms-3d'
import type { Coral } from '../../../../../src/types'

describe('3D Transforms Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(transforms3DPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = transforms3DPlugin()
      expect(plugin.name).toBe('transforms-3d')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Perspective', () => {
    it('should generate perspective-none', () => {
      const css = coral.generate(['perspective-none'])
      expect(css).toContain('perspective')
      expect(css).toContain('none')
    })

    it('should generate perspective-100', () => {
      const css = coral.generate(['perspective-100'])
      expect(css).toContain('perspective')
      expect(css).toContain('100px')
    })

    it('should generate perspective-500', () => {
      const css = coral.generate(['perspective-500'])
      expect(css).toContain('perspective')
      expect(css).toContain('500px')
    })

    it('should generate perspective-1000', () => {
      const css = coral.generate(['perspective-1000'])
      expect(css).toContain('perspective')
      expect(css).toContain('1000px')
    })

    it('should generate perspective-2000', () => {
      const css = coral.generate(['perspective-2000'])
      expect(css).toContain('perspective')
      expect(css).toContain('2000px')
    })

    it('should generate arbitrary perspective', () => {
      const css = coral.generate(['perspective-[750px]'])
      expect(css).toContain('perspective')
      expect(css).toContain('750px')
    })

    it('should handle arbitrary perspective with underscore', () => {
      const css = coral.generate(['perspective-[var(--my_perspective)]'])
      expect(css).toContain('perspective')
      expect(css).toContain('var(--my perspective)')
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

    it('should generate perspective-origin-top', () => {
      const css = coral.generate(['perspective-origin-top'])
      expect(css).toContain('perspective-origin')
      expect(css).toContain('top')
    })

    it('should generate perspective-origin-top-right', () => {
      const css = coral.generate(['perspective-origin-top-right'])
      expect(css).toContain('perspective-origin')
      expect(css).toContain('top right')
    })

    it('should generate perspective-origin-bottom-left', () => {
      const css = coral.generate(['perspective-origin-bottom-left'])
      expect(css).toContain('perspective-origin')
      expect(css).toContain('bottom left')
    })

    it('should generate percentage perspective origin', () => {
      const css = coral.generate(['perspective-origin-50-50'])
      expect(css).toContain('perspective-origin')
      expect(css).toContain('50% 50%')
    })

    it('should generate arbitrary perspective-origin', () => {
      const css = coral.generate(['perspective-origin-[25%_75%]'])
      expect(css).toContain('perspective-origin')
      expect(css).toContain('25% 75%')
    })

    it('should handle empty arbitrary perspective-origin', () => {
      const css = coral.generate(['perspective-origin-[]'])
      expect(css).toBe('')
    })
  })

  describe('Transform Style', () => {
    it('should generate transform-style-flat', () => {
      const css = coral.generate(['transform-style-flat'])
      expect(css).toContain('transform-style')
      expect(css).toContain('flat')
    })

    it('should generate transform-style-flat-3d', () => {
      const css = coral.generate(['transform-style-flat-3d'])
      expect(css).toContain('transform-style')
      expect(css).toContain('preserve-3d')
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

  describe('Translate Z', () => {
    it('should generate translate-z-0', () => {
      const css = coral.generate(['translate-z-0'])
      expect(css).toContain('translateZ')
      expect(css).toContain('0rem')
    })

    it('should generate translate-z-px-16', () => {
      const css = coral.generate(['translate-z-px-16'])
      expect(css).toContain('translateZ')
      expect(css).toContain('16px')
    })

    it('should generate negative translate-z', () => {
      const css = coral.generate(['-translate-z-px-8'])
      expect(css).toContain('translateZ')
      expect(css).toContain('calc(-1')
    })

    it('should generate rem-based translate-z', () => {
      const css = coral.generate(['translate-z-4'])
      expect(css).toContain('translateZ')
      expect(css).toContain('4rem')
    })

    it('should generate arbitrary translate-z', () => {
      const css = coral.generate(['translate-z-[50px]'])
      expect(css).toContain('translateZ')
      expect(css).toContain('50px')
    })

    it('should handle empty arbitrary translate-z', () => {
      const css = coral.generate(['translate-z-[]'])
      expect(css).toBe('')
    })
  })

  describe('Translate 3D', () => {
    it('should generate arbitrary translate-3d', () => {
      const css = coral.generate(['translate-3d-[10px,20px,30px]'])
      expect(css).toContain('translate3d')
      expect(css).toContain('10px,20px,30px')
    })

    it('should handle underscore replacement in translate-3d', () => {
      const css = coral.generate(['translate-3d-[10px_20px_30px]'])
      expect(css).toContain('translate3d')
      expect(css).toContain('10px 20px 30px')
    })

    it('should handle empty arbitrary translate-3d', () => {
      const css = coral.generate(['translate-3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Rotate X/Y/Z', () => {
    it('should generate rotate-x-45', () => {
      const css = coral.generate(['rotate-x-45'])
      expect(css).toContain('rotateX')
      expect(css).toContain('45deg')
    })

    it('should generate -rotate-x-90', () => {
      const css = coral.generate(['-rotate-x-90'])
      expect(css).toContain('rotateX')
      expect(css).toContain('calc(-1')
    })

    it('should generate rotate-y-180', () => {
      const css = coral.generate(['rotate-y-180'])
      expect(css).toContain('rotateY')
      expect(css).toContain('180deg')
    })

    it('should generate -rotate-y-45', () => {
      const css = coral.generate(['-rotate-y-45'])
      expect(css).toContain('rotateY')
      expect(css).toContain('calc(-1')
    })

    it('should generate rotate-z-90', () => {
      const css = coral.generate(['rotate-z-90'])
      expect(css).toContain('rotateZ')
      expect(css).toContain('90deg')
    })

    it('should generate arbitrary rotate-x', () => {
      const css = coral.generate(['rotate-x-[30deg]'])
      expect(css).toContain('rotateX')
      expect(css).toContain('30deg')
    })

    it('should generate arbitrary rotate-y', () => {
      const css = coral.generate(['rotate-y-[60deg]'])
      expect(css).toContain('rotateY')
      expect(css).toContain('60deg')
    })

    it('should generate arbitrary rotate-z', () => {
      const css = coral.generate(['rotate-z-[120deg]'])
      expect(css).toContain('rotateZ')
      expect(css).toContain('120deg')
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

  describe('Scale Z', () => {
    it('should generate scale-z-0', () => {
      const css = coral.generate(['scale-z-0'])
      expect(css).toContain('scaleZ')
      expect(css).toContain('0.00')
    })

    it('should generate scale-z-50', () => {
      const css = coral.generate(['scale-z-50'])
      expect(css).toContain('scaleZ')
      expect(css).toContain('0.50')
    })

    it('should generate scale-z-100', () => {
      const css = coral.generate(['scale-z-100'])
      expect(css).toContain('scaleZ')
      expect(css).toContain('1.00')
    })

    it('should generate scale-z-150', () => {
      const css = coral.generate(['scale-z-150'])
      expect(css).toContain('scaleZ')
      expect(css).toContain('1.50')
    })

    it('should generate scale-z-200', () => {
      const css = coral.generate(['scale-z-200'])
      expect(css).toContain('scaleZ')
      expect(css).toContain('2.00')
    })
  })

  describe('Scale 3D', () => {
    it('should generate arbitrary scale-3d', () => {
      const css = coral.generate(['scale-3d-[1.5,1.5,1.5]'])
      expect(css).toContain('scale3d')
      expect(css).toContain('1.5,1.5,1.5')
    })

    it('should handle underscore replacement in scale-3d', () => {
      const css = coral.generate(['scale-3d-[1_2_3]'])
      expect(css).toContain('scale3d')
      expect(css).toContain('1 2 3')
    })

    it('should handle empty arbitrary scale-3d', () => {
      const css = coral.generate(['scale-3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Rotate 3D', () => {
    it('should generate arbitrary rotate-3d', () => {
      const css = coral.generate(['rotate-3d-[1,0,0,45deg]'])
      expect(css).toContain('rotate3d')
      expect(css).toContain('1,0,0,45deg')
    })

    it('should handle underscore replacement in rotate-3d', () => {
      const css = coral.generate(['rotate-3d-[1_1_0_45deg]'])
      expect(css).toContain('rotate3d')
      expect(css).toContain('1 1 0 45deg')
    })

    it('should handle empty arbitrary rotate-3d', () => {
      const css = coral.generate(['rotate-3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Matrix 3D', () => {
    it('should generate arbitrary matrix-3d', () => {
      const css = coral.generate(['matrix-3d-[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]'])
      expect(css).toContain('matrix3d')
      expect(css).toContain('1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1')
    })

    it('should handle underscore replacement in matrix-3d', () => {
      const css = coral.generate(['matrix-3d-[1_0_0_0_0_1_0_0_0_0_1_0_0_0_0_1]'])
      expect(css).toContain('matrix3d')
    })

    it('should handle empty arbitrary matrix-3d', () => {
      const css = coral.generate(['matrix-3d-[]'])
      expect(css).toBe('')
    })
  })

  describe('Transform Origin (3D)', () => {
    it('should generate transform-origin-center', () => {
      const css = coral.generate(['transform-origin-center'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('center')
    })

    it('should generate transform-origin-top-left', () => {
      const css = coral.generate(['transform-origin-top-left'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('top left')
    })

    it('should generate transform-origin-bottom-right', () => {
      const css = coral.generate(['transform-origin-bottom-right'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('bottom right')
    })

    it('should generate arbitrary transform-origin-z', () => {
      const css = coral.generate(['transform-origin-z-[50px]'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('center center 50px')
    })

    it('should handle underscore replacement in transform-origin-z', () => {
      const css = coral.generate(['transform-origin-z-[var(--z_offset)]'])
      expect(css).toContain('transform-origin')
      expect(css).toContain('var(--z offset)')
    })

    it('should handle empty arbitrary transform-origin-z', () => {
      const css = coral.generate(['transform-origin-z-[]'])
      expect(css).toBe('')
    })
  })

  describe('Flip Utilities', () => {
    it('should generate flip-x', () => {
      const css = coral.generate(['flip-x'])
      expect(css).toContain('rotateX(180deg)')
    })

    it('should generate flip-y', () => {
      const css = coral.generate(['flip-y'])
      expect(css).toContain('rotateY(180deg)')
    })

    it('should generate flip-z', () => {
      const css = coral.generate(['flip-z'])
      expect(css).toContain('rotateZ(180deg)')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/transforms-3d'
      )
      expect(defaultExport).toBe(transforms3DPlugin)
    })
  })
})
