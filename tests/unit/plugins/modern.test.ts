/**
 * Modern CSS Features Plugin Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../src/kernel'
import { modernCSSPlugin } from '../../../src/plugins/core/modern'

describe('modernCSSPlugin', () => {
  let coral: ReturnType<typeof createCoral>

  beforeEach(() => {
    coral = createCoral()
    coral.use(modernCSSPlugin())
  })

  describe('Anchor Positioning', () => {
    it('should generate anchor-name arbitrary', () => {
      const css = coral.generate(['anchor-name-[myAnchor]'])
      expect(css).toContain('anchor-name')
      expect(css).toContain('--myAnchor')
    })

    it('should generate position-anchor arbitrary', () => {
      const css = coral.generate(['position-anchor-[myAnchor]'])
      expect(css).toContain('position-anchor')
      expect(css).toContain('--myAnchor')
    })

    it('should generate position-area utilities', () => {
      const areas = ['top', 'bottom', 'left', 'right', 'center']
      areas.forEach((area) => {
        const css = coral.generate([`position-area-${area}`])
        expect(css).toContain('position-area')
        expect(css).toContain(area)
      })
    })

    it('should generate position-area-top-left', () => {
      const css = coral.generate(['position-area-top-left'])
      expect(css).toContain('position-area')
      expect(css).toContain('top left')
    })

    it('should generate position-area-top-right', () => {
      const css = coral.generate(['position-area-top-right'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area-bottom-left', () => {
      const css = coral.generate(['position-area-bottom-left'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area-bottom-right', () => {
      const css = coral.generate(['position-area-bottom-right'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area span utilities', () => {
      const spanAreas = [
        'top-span-left', 'top-span-right', 'bottom-span-left', 'bottom-span-right',
        'left-span-top', 'left-span-bottom', 'right-span-top', 'right-span-bottom'
      ]
      spanAreas.forEach((area) => {
        const css = coral.generate([`position-area-${area}`])
        expect(css).toContain('position-area')
      })
    })

    it('should generate position-area-span-all', () => {
      const css = coral.generate(['position-area-span-all'])
      expect(css).toContain('position-area')
    })

    it('should generate position-area arbitrary', () => {
      const css = coral.generate(['position-area-[top_center]'])
      expect(css).toContain('position-area')
    })

    it('should return null for position-area with empty value', () => {
      const css = coral.generate(['position-area-[]'])
      expect(css).not.toContain('position-area: ')
    })

    it('should generate anchor-default', () => {
      const css = coral.generate(['anchor-default'])
      expect(css).toContain('position-anchor')
      expect(css).toContain('auto')
    })
  })

  describe('Scroll-Driven Animations', () => {
    it('should generate animation-timeline-scroll', () => {
      const css = coral.generate(['animation-timeline-scroll'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll()')
    })

    it('should generate animation-timeline-view', () => {
      const css = coral.generate(['animation-timeline-view'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view()')
    })

    it('should generate animation-timeline-scroll arbitrary', () => {
      const css = coral.generate(['animation-timeline-scroll-[block_nearest]'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll(')
    })

    it('should generate animation-timeline-view arbitrary', () => {
      const css = coral.generate(['animation-timeline-view-[block_auto]'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view(')
    })

    it('should generate animation-range utilities', () => {
      const ranges = ['contain', 'cover', 'entry', 'exit', 'entry-crossing', 'exit-crossing']
      ranges.forEach((range) => {
        const css = coral.generate([`animation-range-${range}`])
        expect(css).toContain('animation-range')
      })
    })

    it('should generate animation-range arbitrary', () => {
      const css = coral.generate(['animation-range-[entry_0%_exit_100%]'])
      expect(css).toContain('animation-range')
    })

    it('should return null for animation-range with empty value', () => {
      const css = coral.generate(['animation-range-[]'])
      expect(css).not.toContain('animation-range: ')
    })

    it('should generate scroll-timeline-name arbitrary', () => {
      const css = coral.generate(['scroll-timeline-name-[myTimeline]'])
      expect(css).toContain('scroll-timeline-name')
      expect(css).toContain('--myTimeline')
    })

    it('should generate scroll-timeline axis utilities', () => {
      const axes = ['x', 'y', 'block', 'inline']
      axes.forEach((axis) => {
        const css = coral.generate([`scroll-timeline-${axis}`])
        expect(css).toContain('scroll-timeline-axis')
      })
    })

    it('should generate view-timeline-name arbitrary', () => {
      const css = coral.generate(['view-timeline-name-[myViewTimeline]'])
      expect(css).toContain('view-timeline-name')
      expect(css).toContain('--myViewTimeline')
    })

    it('should generate view-timeline axis utilities', () => {
      const axes = ['x', 'y', 'block', 'inline']
      axes.forEach((axis) => {
        const css = coral.generate([`view-timeline-${axis}`])
        expect(css).toContain('view-timeline-axis')
      })
    })

    it('should generate view-timeline-inset arbitrary', () => {
      const css = coral.generate(['view-timeline-inset-[10%_20%]'])
      expect(css).toContain('view-timeline-inset')
    })

    it('should return null for view-timeline-inset with empty value', () => {
      const css = coral.generate(['view-timeline-inset-[]'])
      expect(css).not.toContain('view-timeline-inset: ')
    })
  })

  describe('View Transitions', () => {
    it('should generate view-transition-name arbitrary', () => {
      const css = coral.generate(['view-transition-name-[hero-image]'])
      expect(css).toContain('view-transition-name')
    })

    it('should return null for view-transition-name with empty value', () => {
      const css = coral.generate(['view-transition-name-[]'])
      expect(css).not.toContain('view-transition-name: ')
    })

    it('should generate view-transition-name-none', () => {
      const css = coral.generate(['view-transition-name-none'])
      expect(css).toContain('view-transition-name')
      expect(css).toContain('none')
    })

    it('should generate view-transition-class arbitrary', () => {
      const css = coral.generate(['view-transition-class-[card]'])
      expect(css).toContain('view-transition-class')
    })

    it('should return null for view-transition-class with empty value', () => {
      const css = coral.generate(['view-transition-class-[]'])
      expect(css).not.toContain('view-transition-class: ')
    })
  })

  describe('Container Queries', () => {
    it('should generate container-type utilities', () => {
      const types = ['normal', 'size', 'inline-size']
      types.forEach((type) => {
        const css = coral.generate([`container-type-${type}`])
        expect(css).toContain('container-type')
      })
    })

    it('should generate @container shorthand', () => {
      const css = coral.generate(['@container'])
      expect(css).toContain('container-type')
      expect(css).toContain('inline-size')
    })

    it('should generate container-name arbitrary', () => {
      const css = coral.generate(['container-name-[sidebar]'])
      expect(css).toContain('container-name')
    })

    it('should return null for container-name with empty value', () => {
      const css = coral.generate(['container-name-[]'])
      expect(css).not.toContain('container-name: ')
    })

    it('should generate container arbitrary', () => {
      const css = coral.generate(['container-[sidebar_/_inline-size]'])
      expect(css).toContain('container')
    })

    it('should return null for container with empty value', () => {
      const css = coral.generate(['container-[]'])
      expect(css).not.toContain('container: ')
    })
  })

  describe('Subgrid', () => {
    it('should generate grid-cols-subgrid', () => {
      const css = coral.generate(['grid-cols-subgrid'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('subgrid')
    })

    it('should generate grid-rows-subgrid', () => {
      const css = coral.generate(['grid-rows-subgrid'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('subgrid')
    })
  })

  describe('Color Functions', () => {
    it('should generate color-mix arbitrary', () => {
      const css = coral.generate(['color-mix-[in_oklch,_red,_blue]'])
      expect(css).toContain('color')
      expect(css).toContain('color-mix(')
    })

    it('should generate bg-from arbitrary', () => {
      const css = coral.generate(['bg-from-[red_l_c_h]'])
      expect(css).toContain('background-color')
      expect(css).toContain('from')
    })
  })

  describe('Text Wrap', () => {
    it('should generate text-wrap-balance', () => {
      const css = coral.generate(['text-wrap-balance'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('balance')
    })

    it('should generate text-wrap-pretty', () => {
      const css = coral.generate(['text-wrap-pretty'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('pretty')
    })

    it('should generate text-wrap-stable', () => {
      const css = coral.generate(['text-wrap-stable'])
      expect(css).toContain('text-wrap')
      expect(css).toContain('stable')
    })
  })

  describe('Field Sizing', () => {
    it('should generate field-sizing-content', () => {
      const css = coral.generate(['field-sizing-content'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('content')
    })

    it('should generate field-sizing-fixed', () => {
      const css = coral.generate(['field-sizing-fixed'])
      expect(css).toContain('field-sizing')
      expect(css).toContain('fixed')
    })
  })

  describe('Popover', () => {
    it('should generate popover-auto', () => {
      const css = coral.generate(['popover-auto'])
      expect(css).toContain('popover')
      expect(css).toContain('auto')
    })

    it('should generate popover-manual', () => {
      const css = coral.generate(['popover-manual'])
      expect(css).toContain('popover')
      expect(css).toContain('manual')
    })
  })

  describe('Masonry Layout', () => {
    it('should generate grid-template-rows-masonry', () => {
      const css = coral.generate(['grid-template-rows-masonry'])
      expect(css).toContain('grid-template-rows')
      expect(css).toContain('masonry')
    })

    it('should generate grid-template-cols-masonry', () => {
      const css = coral.generate(['grid-template-cols-masonry'])
      expect(css).toContain('grid-template-columns')
      expect(css).toContain('masonry')
    })
  })

  describe('CSS Math Functions', () => {
    it('should generate round arbitrary', () => {
      const css = coral.generate(['round-[nearest,_5.5]'])
      expect(css).toContain('--coral-round')
      expect(css).toContain('round(')
    })

    it('should generate clamp arbitrary', () => {
      const css = coral.generate(['clamp-[100px,_50%,_500px]'])
      expect(css).toContain('--coral-clamp')
      expect(css).toContain('clamp(')
    })
  })

  describe('Container Style Queries', () => {
    it('should generate @style arbitrary', () => {
      const css = coral.generate(['@style-[--variant:_primary]'])
      expect(css).toContain('--coral-style-query')
    })

    it('should return null for @style with empty value', () => {
      const css = coral.generate(['@style-[]'])
      expect(css).not.toContain('--coral-style-query: ')
    })
  })

  describe('CSS Nesting', () => {
    it('should generate nest utility', () => {
      const css = coral.generate(['nest'])
      expect(css).toContain('--coral-nesting')
      expect(css).toContain('enabled')
    })
  })

  describe('CSS Scope', () => {
    it('should generate scope-start arbitrary', () => {
      const css = coral.generate(['scope-start-[.card]'])
      expect(css).toContain('--coral-scope-start')
    })

    it('should return null for scope-start with empty value', () => {
      const css = coral.generate(['scope-start-[]'])
      expect(css).not.toContain('--coral-scope-start: ')
    })

    it('should generate scope-end arbitrary', () => {
      const css = coral.generate(['scope-end-[.footer]'])
      expect(css).toContain('--coral-scope-end')
    })

    it('should return null for scope-end with empty value', () => {
      const css = coral.generate(['scope-end-[]'])
      expect(css).not.toContain('--coral-scope-end: ')
    })
  })

  describe('CSS Layers', () => {
    it('should generate layer utilities', () => {
      const layers = ['base', 'components', 'utilities', 'reset']
      layers.forEach((layer) => {
        const css = coral.generate([`layer-${layer}`])
        expect(css).toContain('--coral-layer')
        expect(css).toContain(layer)
      })
    })
  })

  describe('Reading Flow', () => {
    it('should generate reading-flow utilities', () => {
      const flows = ['normal', 'grid-rows', 'grid-columns', 'grid-order', 'flex-visual', 'flex-flow']
      flows.forEach((flow) => {
        const css = coral.generate([`reading-flow-${flow}`])
        expect(css).toContain('reading-flow')
      })
    })
  })

  describe('Text Box Trim', () => {
    it('should generate text-box-trim utilities', () => {
      const trims = ['none', 'start', 'end', 'both']
      trims.forEach((trim) => {
        const css = coral.generate([`text-box-trim-${trim}`])
        expect(css).toContain('text-box-trim')
        expect(css).toContain(trim)
      })
    })

    it('should generate text-box-edge utilities', () => {
      const edges = ['leading', 'text', 'cap', 'ex', 'ideographic', 'ideographic-ink']
      edges.forEach((edge) => {
        const css = coral.generate([`text-box-edge-${edge}`])
        expect(css).toContain('text-box-edge')
      })
    })
  })

  describe('Math Styles', () => {
    it('should generate math-style-normal', () => {
      const css = coral.generate(['math-style-normal'])
      expect(css).toContain('math-style')
      expect(css).toContain('normal')
    })

    it('should generate math-style-compact', () => {
      const css = coral.generate(['math-style-compact'])
      expect(css).toContain('math-style')
      expect(css).toContain('compact')
    })
  })

  describe('Display Contents', () => {
    it('should generate display-contents', () => {
      const css = coral.generate(['display-contents'])
      expect(css).toContain('display')
      expect(css).toContain('contents')
    })
  })

  describe('@starting-style Support', () => {
    it('should generate starting-opacity-0', () => {
      const css = coral.generate(['starting-opacity-0'])
      expect(css).toContain('--coral-starting-opacity')
      expect(css).toContain('opacity')
    })

    it('should generate starting-scale utilities', () => {
      const scales = ['0', '75', '95']
      scales.forEach((scale) => {
        const css = coral.generate([`starting-scale-${scale}`])
        expect(css).toContain('--coral-starting-scale')
        expect(css).toContain('transform')
      })
    })

    it('should generate starting-translate-y-4', () => {
      const css = coral.generate(['starting-translate-y-4'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('1rem')
    })

    it('should generate starting-translate-y-full', () => {
      const css = coral.generate(['starting-translate-y-full'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('100%')
    })

    it('should generate starting--translate-y-full', () => {
      const css = coral.generate(['starting--translate-y-full'])
      expect(css).toContain('--coral-starting-translate-y')
      expect(css).toContain('-100%')
    })

    it('should generate starting-opacity arbitrary', () => {
      const css = coral.generate(['starting-opacity-[0.5]'])
      expect(css).toContain('--coral-starting-opacity')
    })

    it('should return null for starting-opacity with empty value', () => {
      const css = coral.generate(['starting-opacity-[]'])
      expect(css).not.toContain('--coral-starting-opacity: ')
    })

    it('should generate starting-scale arbitrary', () => {
      const css = coral.generate(['starting-scale-[0.9]'])
      expect(css).toContain('--coral-starting-scale')
    })

    it('should return null for starting-scale with empty value', () => {
      const css = coral.generate(['starting-scale-[]'])
      expect(css).not.toContain('--coral-starting-scale: ')
    })

    it('should generate starting-translate arbitrary', () => {
      const css = coral.generate(['starting-translate-[10px,_20px]'])
      expect(css).toContain('--coral-starting-translate')
    })

    it('should return null for starting-translate with empty value', () => {
      const css = coral.generate(['starting-translate-[]'])
      expect(css).not.toContain('--coral-starting-translate: ')
    })
  })

  describe('Transition Behavior', () => {
    it('should generate transition-discrete', () => {
      const css = coral.generate(['transition-discrete'])
      expect(css).toContain('transition-behavior')
      expect(css).toContain('allow-discrete')
    })

    it('should generate transition-normal', () => {
      const css = coral.generate(['transition-normal'])
      expect(css).toContain('transition-behavior')
      expect(css).toContain('normal')
    })
  })

  describe('Overlay Property', () => {
    it('should generate overlay-auto', () => {
      const css = coral.generate(['overlay-auto'])
      expect(css).toContain('overlay')
      expect(css).toContain('auto')
    })

    it('should generate overlay-none', () => {
      const css = coral.generate(['overlay-none'])
      expect(css).toContain('overlay')
      expect(css).toContain('none')
    })
  })

  describe('Color-Mix Utilities', () => {
    it('should generate mix-white percentages', () => {
      const percentages = ['10', '25', '50', '75', '90']
      percentages.forEach((pct) => {
        const css = coral.generate([`mix-white-${pct}`])
        expect(css).toContain('--coral-color-mix')
        expect(css).toContain('color-mix(')
        expect(css).toContain('white')
      })
    })

    it('should generate mix-black percentages', () => {
      const percentages = ['10', '25', '50', '75', '90']
      percentages.forEach((pct) => {
        const css = coral.generate([`mix-black-${pct}`])
        expect(css).toContain('--coral-color-mix')
        expect(css).toContain('color-mix(')
        expect(css).toContain('black')
      })
    })

    it('should generate all mix-white/black percentages', () => {
      const percentages = ['20', '30', '40', '60', '70', '80']
      percentages.forEach((pct) => {
        const cssWhite = coral.generate([`mix-white-${pct}`])
        expect(cssWhite).toContain('--coral-color-mix')
        const cssBlack = coral.generate([`mix-black-${pct}`])
        expect(cssBlack).toContain('--coral-color-mix')
      })
    })

    it('should generate mix-space utilities', () => {
      const spaces = ['srgb', 'srgb-linear', 'lab', 'oklab', 'lch', 'oklch', 'hsl', 'hwb']
      spaces.forEach((space) => {
        const css = coral.generate([`mix-space-${space}`])
        expect(css).toContain('--coral-mix-space')
        expect(css).toContain(space)
      })
    })

    it('should generate bg-mix arbitrary', () => {
      const css = coral.generate(['bg-mix-[red_50%,_blue]'])
      expect(css).toContain('background-color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for bg-mix with empty value', () => {
      const css = coral.generate(['bg-mix-[]'])
      expect(css).not.toContain('background-color: color-mix(')
    })

    it('should generate text-mix arbitrary', () => {
      const css = coral.generate(['text-mix-[red_50%,_blue]'])
      expect(css).toContain('color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for text-mix with empty value', () => {
      const css = coral.generate(['text-mix-[]'])
      expect(css).not.toContain('color: color-mix(')
    })

    it('should generate border-mix arbitrary', () => {
      const css = coral.generate(['border-mix-[red_50%,_blue]'])
      expect(css).toContain('border-color')
      expect(css).toContain('color-mix(')
    })

    it('should return null for border-mix with empty value', () => {
      const css = coral.generate(['border-mix-[]'])
      expect(css).not.toContain('border-color: color-mix(')
    })
  })

  describe('Light-Dark Function', () => {
    it('should generate bg-light-dark arbitrary', () => {
      const css = coral.generate(['bg-light-dark-[white,black]'])
      expect(css).toContain('background-color')
      expect(css).toContain('light-dark(')
    })

    it('should return null for bg-light-dark with empty value', () => {
      const css = coral.generate(['bg-light-dark-[]'])
      expect(css).not.toContain('background-color: light-dark(')
    })

    it('should generate text-light-dark arbitrary', () => {
      const css = coral.generate(['text-light-dark-[black,white]'])
      expect(css).toContain('color')
      expect(css).toContain('light-dark(')
    })

    it('should return null for text-light-dark with empty value', () => {
      const css = coral.generate(['text-light-dark-[]'])
      expect(css).not.toContain('color: light-dark(')
    })
  })

  describe('Relative Colors', () => {
    it('should generate bg-relative arbitrary', () => {
      const css = coral.generate(['bg-relative-[oklch(from_red_l_c_h)]'])
      expect(css).toContain('background-color')
    })

    it('should return null for bg-relative with empty value', () => {
      const css = coral.generate(['bg-relative-[]'])
      expect(css).not.toContain('background-color: ')
    })
  })

  describe('CSS @property Support', () => {
    it('should generate property-number', () => {
      const css = coral.generate(['property-number'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<number>')
    })

    it('should generate property-percentage', () => {
      const css = coral.generate(['property-percentage'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<percentage>')
    })

    it('should generate property-length', () => {
      const css = coral.generate(['property-length'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<length>')
    })

    it('should generate property-color', () => {
      const css = coral.generate(['property-color'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<color>')
    })

    it('should generate property-angle', () => {
      const css = coral.generate(['property-angle'])
      expect(css).toContain('--coral-property-syntax')
      expect(css).toContain('<angle>')
    })

    it('should generate property-inherit', () => {
      const css = coral.generate(['property-inherit'])
      expect(css).toContain('--coral-property-inherits')
      expect(css).toContain('true')
    })

    it('should generate property-no-inherit', () => {
      const css = coral.generate(['property-no-inherit'])
      expect(css).toContain('--coral-property-inherits')
      expect(css).toContain('false')
    })
  })

  describe('Interpolate Size', () => {
    it('should generate interpolate-size-allow-keywords', () => {
      const css = coral.generate(['interpolate-size-allow-keywords'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('allow-keywords')
    })

    it('should generate interpolate-size-numeric-only', () => {
      const css = coral.generate(['interpolate-size-numeric-only'])
      expect(css).toContain('interpolate-size')
      expect(css).toContain('numeric-only')
    })
  })

  describe('Calc-Size', () => {
    it('should generate h-calc-size-auto', () => {
      const css = coral.generate(['h-calc-size-auto'])
      expect(css).toContain('height')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate w-calc-size-auto', () => {
      const css = coral.generate(['w-calc-size-auto'])
      expect(css).toContain('width')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate max-h-calc-size-auto', () => {
      const css = coral.generate(['max-h-calc-size-auto'])
      expect(css).toContain('max-height')
      expect(css).toContain('calc-size(auto)')
    })

    it('should generate max-w-calc-size-auto', () => {
      const css = coral.generate(['max-w-calc-size-auto'])
      expect(css).toContain('max-width')
      expect(css).toContain('calc-size(auto)')
    })
  })

  describe('Inert Attribute', () => {
    it('should generate inert utility', () => {
      const css = coral.generate(['inert'])
      expect(css).toContain('pointer-events')
      expect(css).toContain('none')
      expect(css).toContain('user-select')
      expect(css).toContain('opacity')
    })
  })
})
