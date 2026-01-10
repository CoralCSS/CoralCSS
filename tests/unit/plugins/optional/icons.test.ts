/**
 * Icons Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../src/kernel'
import { iconsPlugin, builtInIcons, defaultScale } from '../../../../src/plugins/optional/icons'
import iconsDefault from '../../../../src/plugins/optional/icons'

describe('iconsPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(iconsPlugin())
  })

  it('should return a plugin object', () => {
    const plugin = iconsPlugin()

    expect(plugin).toBeDefined()
    expect(typeof plugin).toBe('object')
  })

  it('should have correct name', () => {
    const plugin = iconsPlugin()

    expect(plugin.name).toBe('icons')
  })

  it('should have version', () => {
    const plugin = iconsPlugin()

    expect(plugin.version).toBe('1.0.0')
  })

  it('should have install function', () => {
    const plugin = iconsPlugin()

    expect(typeof plugin.install).toBe('function')
  })

  it('should not throw when install is called', () => {
    const plugin = iconsPlugin()
    const mockApi = { addRule: () => {}, addRules: () => {}, addVariant: () => {}, addVariants: () => {}, extendTheme: () => {} }

    expect(() => plugin.install(mockApi as never)).not.toThrow()
  })

  it('should export default', () => {
    expect(iconsDefault).toBe(iconsPlugin)
  })

  it('should export builtInIcons', () => {
    expect(builtInIcons).toBeDefined()
    expect(typeof builtInIcons).toBe('object')
  })

  it('should export defaultScale', () => {
    expect(defaultScale).toBeDefined()
    expect(typeof defaultScale).toBe('object')
  })

  describe('Icon Base Styles', () => {
    it('should generate icon', () => {
      const css = coral.generate(['icon'])
      expect(css).toContain('display: inline-block')
      expect(css).toContain('mask-size')
    })

    it('should generate icon-bg', () => {
      const css = coral.generate(['icon-bg'])
      expect(css).toContain('display: inline-block')
      expect(css).toContain('background-size')
    })
  })

  describe('Icon Sizes', () => {
    it('should generate icon-xs', () => {
      const css = coral.generate(['icon-xs'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('0.75rem')
    })

    it('should generate icon-sm', () => {
      const css = coral.generate(['icon-sm'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('0.875rem')
    })

    it('should generate icon-base', () => {
      const css = coral.generate(['icon-base'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('1rem')
    })

    it('should generate icon-md', () => {
      const css = coral.generate(['icon-md'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('1.125rem')
    })

    it('should generate icon-lg', () => {
      const css = coral.generate(['icon-lg'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('1.25rem')
    })

    it('should generate icon-xl', () => {
      const css = coral.generate(['icon-xl'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('1.5rem')
    })

    it('should generate icon-2xl through icon-9xl', () => {
      const sizes = ['2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl', '9xl']
      sizes.forEach((size) => {
        const css = coral.generate([`icon-${size}`])
        expect(css).toContain('--coral-icon-size')
      })
    })

    it('should generate icon-10 through icon-64', () => {
      const sizes = ['10', '12', '16', '20', '24', '32', '48', '64']
      sizes.forEach((size) => {
        const css = coral.generate([`icon-${size}`])
        expect(css).toContain('--coral-icon-size')
      })
    })

    it('should generate icon arbitrary size', () => {
      const css = coral.generate(['icon-[32px]'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('32px')
    })

    it('should return null for icon with hyphenated arbitrary value', () => {
      const css = coral.generate(['icon-[arrow-right]'])
      // This should not generate icon size because it contains hyphen (icon name pattern)
      expect(css).not.toContain('--coral-icon-size: arrow-right')
    })

    it('should return null for icon with empty value', () => {
      const css = coral.generate(['icon-[]'])
      expect(css).not.toContain('--coral-icon-size: ;')
    })
  })

  describe('Built-in Icons', () => {
    it('should generate i-arrow-up', () => {
      const css = coral.generate(['i-arrow-up'])
      expect(css).toContain('mask-image')
      expect(css).toContain('display: inline-block')
    })

    it('should generate i-check', () => {
      const css = coral.generate(['i-check'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-menu', () => {
      const css = coral.generate(['i-menu'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-search', () => {
      const css = coral.generate(['i-search'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-user', () => {
      const css = coral.generate(['i-user'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-home', () => {
      const css = coral.generate(['i-home'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-star', () => {
      const css = coral.generate(['i-star'])
      expect(css).toContain('mask-image')
    })

    it('should generate i-heart', () => {
      const css = coral.generate(['i-heart'])
      expect(css).toContain('mask-image')
    })
  })

  describe('Icon Rotation', () => {
    it('should generate icon-rotate-0', () => {
      const css = coral.generate(['icon-rotate-0'])
      expect(css).toContain('transform')
      expect(css).toContain('rotate(0deg)')
    })

    it('should generate icon-rotate-45', () => {
      const css = coral.generate(['icon-rotate-45'])
      expect(css).toContain('rotate(45deg)')
    })

    it('should generate icon-rotate-90', () => {
      const css = coral.generate(['icon-rotate-90'])
      expect(css).toContain('rotate(90deg)')
    })

    it('should generate icon-rotate-180', () => {
      const css = coral.generate(['icon-rotate-180'])
      expect(css).toContain('rotate(180deg)')
    })

    it('should generate icon-rotate-270', () => {
      const css = coral.generate(['icon-rotate-270'])
      expect(css).toContain('rotate(270deg)')
    })

    it('should generate all rotation values', () => {
      const rotations = ['135', '225', '315']
      rotations.forEach((r) => {
        const css = coral.generate([`icon-rotate-${r}`])
        expect(css).toContain(`rotate(${r}deg)`)
      })
    })
  })

  describe('Icon Flip', () => {
    it('should generate icon-flip-x', () => {
      const css = coral.generate(['icon-flip-x'])
      expect(css).toContain('transform')
      expect(css).toContain('scaleX(-1)')
    })

    it('should generate icon-flip-y', () => {
      const css = coral.generate(['icon-flip-y'])
      expect(css).toContain('scaleY(-1)')
    })

    it('should generate icon-flip-both', () => {
      const css = coral.generate(['icon-flip-both'])
      expect(css).toContain('scale(-1, -1)')
    })
  })

  describe('Icon Animations', () => {
    it('should generate icon-spin', () => {
      const css = coral.generate(['icon-spin'])
      expect(css).toContain('animation')
      expect(css).toContain('coral-icon-spin')
    })

    it('should generate icon-spin-slow', () => {
      const css = coral.generate(['icon-spin-slow'])
      expect(css).toContain('animation')
      expect(css).toContain('2s')
    })

    it('should generate icon-spin-fast', () => {
      const css = coral.generate(['icon-spin-fast'])
      expect(css).toContain('animation')
      expect(css).toContain('0.5s')
    })

    it('should generate icon-pulse', () => {
      const css = coral.generate(['icon-pulse'])
      expect(css).toContain('animation')
      expect(css).toContain('coral-icon-pulse')
    })

    it('should generate icon-bounce', () => {
      const css = coral.generate(['icon-bounce'])
      expect(css).toContain('animation')
      expect(css).toContain('coral-icon-bounce')
    })
  })

  describe('Icon Stroke Width', () => {
    it('should generate icon-stroke-thin', () => {
      const css = coral.generate(['icon-stroke-thin'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('1')
    })

    it('should generate icon-stroke-light', () => {
      const css = coral.generate(['icon-stroke-light'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('1.25')
    })

    it('should generate icon-stroke-normal', () => {
      const css = coral.generate(['icon-stroke-normal'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('1.5')
    })

    it('should generate icon-stroke-medium', () => {
      const css = coral.generate(['icon-stroke-medium'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('1.75')
    })

    it('should generate icon-stroke-bold', () => {
      const css = coral.generate(['icon-stroke-bold'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('2')
    })

    it('should generate icon-stroke-thick', () => {
      const css = coral.generate(['icon-stroke-thick'])
      expect(css).toContain('stroke-width')
      expect(css).toContain('2.5')
    })

    it('should generate icon-stroke arbitrary', () => {
      const css = coral.generate(['icon-stroke-[3]'])
      expect(css).toContain('stroke-width: 3')
    })

    it('should return null for icon-stroke with empty value', () => {
      const css = coral.generate(['icon-stroke-[]'])
      expect(css).not.toContain('stroke-width: ;')
    })
  })

  describe('SVG Utilities', () => {
    it('should generate fill-current', () => {
      const css = coral.generate(['fill-current'])
      expect(css).toContain('fill: currentColor')
    })

    it('should generate fill-none', () => {
      const css = coral.generate(['fill-none'])
      expect(css).toContain('fill: none')
    })

    it('should generate fill-inherit', () => {
      const css = coral.generate(['fill-inherit'])
      expect(css).toContain('fill: inherit')
    })

    it('should generate fill-transparent', () => {
      const css = coral.generate(['fill-transparent'])
      expect(css).toContain('fill: transparent')
    })

    it('should generate stroke-current', () => {
      const css = coral.generate(['stroke-current'])
      expect(css).toContain('stroke: currentColor')
    })

    it('should generate stroke-none', () => {
      const css = coral.generate(['stroke-none'])
      expect(css).toContain('stroke: none')
    })

    it('should generate stroke-inherit', () => {
      const css = coral.generate(['stroke-inherit'])
      expect(css).toContain('stroke: inherit')
    })

    it('should generate stroke-transparent', () => {
      const css = coral.generate(['stroke-transparent'])
      expect(css).toContain('stroke: transparent')
    })

    it('should generate stroke-0', () => {
      const css = coral.generate(['stroke-0'])
      expect(css).toContain('stroke-width: 0')
    })

    it('should generate stroke-1', () => {
      const css = coral.generate(['stroke-1'])
      expect(css).toContain('stroke-width: 1')
    })

    it('should generate stroke-2', () => {
      const css = coral.generate(['stroke-2'])
      expect(css).toContain('stroke-width: 2')
    })

    it('should generate stroke arbitrary', () => {
      const css = coral.generate(['stroke-[1.5]'])
      expect(css).toContain('stroke-width: 1.5')
    })

    it('should return null for stroke with empty value', () => {
      const css = coral.generate(['stroke-[]'])
      expect(css).not.toContain('stroke-width: ;')
    })
  })

  describe('Stroke Line Cap', () => {
    it('should generate stroke-cap-butt', () => {
      const css = coral.generate(['stroke-cap-butt'])
      expect(css).toContain('stroke-linecap: butt')
    })

    it('should generate stroke-cap-round', () => {
      const css = coral.generate(['stroke-cap-round'])
      expect(css).toContain('stroke-linecap: round')
    })

    it('should generate stroke-cap-square', () => {
      const css = coral.generate(['stroke-cap-square'])
      expect(css).toContain('stroke-linecap: square')
    })
  })

  describe('Stroke Line Join', () => {
    it('should generate stroke-join-miter', () => {
      const css = coral.generate(['stroke-join-miter'])
      expect(css).toContain('stroke-linejoin: miter')
    })

    it('should generate stroke-join-round', () => {
      const css = coral.generate(['stroke-join-round'])
      expect(css).toContain('stroke-linejoin: round')
    })

    it('should generate stroke-join-bevel', () => {
      const css = coral.generate(['stroke-join-bevel'])
      expect(css).toContain('stroke-linejoin: bevel')
    })
  })

  describe('Stroke Dash Array', () => {
    it('should generate stroke-dash-none', () => {
      const css = coral.generate(['stroke-dash-none'])
      expect(css).toContain('stroke-dasharray: none')
    })

    it('should generate stroke-dash-sm', () => {
      const css = coral.generate(['stroke-dash-sm'])
      expect(css).toContain('stroke-dasharray')
      expect(css).toContain('4 4')
    })

    it('should generate stroke-dash-md', () => {
      const css = coral.generate(['stroke-dash-md'])
      expect(css).toContain('stroke-dasharray')
      expect(css).toContain('8 8')
    })

    it('should generate stroke-dash-lg', () => {
      const css = coral.generate(['stroke-dash-lg'])
      expect(css).toContain('stroke-dasharray')
      expect(css).toContain('16 16')
    })

    it('should generate stroke-dash arbitrary', () => {
      const css = coral.generate(['stroke-dash-[10_5]'])
      expect(css).toContain('stroke-dasharray')
      expect(css).toContain('10 5')
    })

    it('should return null for stroke-dash with empty value', () => {
      const css = coral.generate(['stroke-dash-[]'])
      expect(css).not.toContain('stroke-dasharray: ;')
    })
  })

  describe('Background Mode', () => {
    let bgCoral: ReturnType<typeof createCoral>

    beforeEach(() => {
      bgCoral = createCoral()
      bgCoral.use(iconsPlugin({ mode: 'background' }))
    })

    it('should generate icons using background-image in background mode', () => {
      const css = bgCoral.generate(['i-check'])
      expect(css).toContain('background-image')
      expect(css).not.toContain('mask-image')
    })
  })

  describe('Custom Icons', () => {
    let customCoral: ReturnType<typeof createCoral>

    beforeEach(() => {
      customCoral = createCoral()
      customCoral.use(iconsPlugin({
        customIcons: {
          'custom-icon': '<path d="M0 0h24v24H0z"/>',
        },
      }))
    })

    it('should generate custom icon', () => {
      const css = customCoral.generate(['i-custom-icon'])
      expect(css).toContain('mask-image')
    })
  })

  describe('Icon Collections', () => {
    let collectionCoral: ReturnType<typeof createCoral>

    beforeEach(() => {
      collectionCoral = createCoral()
      collectionCoral.use(iconsPlugin({
        collections: [
          {
            name: 'test',
            prefix: 'i-test-',
            icons: {
              'circle': '<circle cx="12" cy="12" r="10"/>',
              'square': '<rect x="0" y="0" width="24" height="24"/>',
            },
          },
          {
            name: 'noprefix',
            prefix: '',
            icons: {
              'triangle': '<path d="M12 2L2 22h20L12 2z"/>',
            },
          },
        ],
      }))
    })

    it('should generate collection icon with prefix', () => {
      const css = collectionCoral.generate(['i-test-circle'])
      expect(css).toContain('mask-image')
    })

    it('should generate collection icon with square', () => {
      const css = collectionCoral.generate(['i-test-square'])
      expect(css).toContain('mask-image')
    })

    it('should generate collection icon without prefix', () => {
      const css = collectionCoral.generate(['i-noprefix-triangle'])
      expect(css).toContain('mask-image')
    })
  })

  describe('Custom Scale', () => {
    let scaleCoral: ReturnType<typeof createCoral>

    beforeEach(() => {
      scaleCoral = createCoral()
      scaleCoral.use(iconsPlugin({
        scale: {
          'tiny': '0.5rem',
          'huge': '10rem',
        },
      }))
    })

    it('should generate custom scale tiny', () => {
      const css = scaleCoral.generate(['icon-tiny'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('0.5rem')
    })

    it('should generate custom scale huge', () => {
      const css = scaleCoral.generate(['icon-huge'])
      expect(css).toContain('--coral-icon-size')
      expect(css).toContain('10rem')
    })
  })

  describe('Custom Default Size', () => {
    let sizeCoral: ReturnType<typeof createCoral>

    beforeEach(() => {
      sizeCoral = createCoral()
      sizeCoral.use(iconsPlugin({
        defaultSize: '2rem',
      }))
    })

    it('should use custom default size', () => {
      const css = sizeCoral.generate(['icon'])
      expect(css).toContain('2rem')
    })
  })
})
