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

  describe('OKLCH/OKLAB Wide Gamut Colors', () => {
    it('should generate bg-oklch arbitrary', () => {
      const css = coral.generate(['bg-oklch-[0.5_0.2_180]'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklch(')
    })

    it('should generate text-oklch arbitrary', () => {
      const css = coral.generate(['text-oklch-[0.7_0.15_250]'])
      expect(css).toContain('color')
      expect(css).toContain('oklch(')
    })

    it('should generate border-oklch arbitrary', () => {
      const css = coral.generate(['border-oklch-[0.6_0.2_300]'])
      expect(css).toContain('border-color')
      expect(css).toContain('oklch(')
    })

    it('should generate ring-oklch arbitrary', () => {
      const css = coral.generate(['ring-oklch-[0.5_0.3_120]'])
      expect(css).toContain('--coral-ring-color')
      expect(css).toContain('oklch(')
    })

    it('should generate outline-oklch arbitrary', () => {
      const css = coral.generate(['outline-oklch-[0.7_0.2_60]'])
      expect(css).toContain('outline-color')
      expect(css).toContain('oklch(')
    })

    it('should generate shadow-oklch arbitrary', () => {
      const css = coral.generate(['shadow-oklch-[0.3_0.1_200]'])
      expect(css).toContain('--coral-shadow-color')
      expect(css).toContain('oklch(')
    })

    it('should generate accent-oklch arbitrary', () => {
      const css = coral.generate(['accent-oklch-[0.6_0.25_150]'])
      expect(css).toContain('accent-color')
      expect(css).toContain('oklch(')
    })

    it('should generate caret-oklch arbitrary', () => {
      const css = coral.generate(['caret-oklch-[0.8_0.1_90]'])
      expect(css).toContain('caret-color')
      expect(css).toContain('oklch(')
    })

    it('should generate fill-oklch arbitrary', () => {
      const css = coral.generate(['fill-oklch-[0.5_0.2_330]'])
      expect(css).toContain('fill')
      expect(css).toContain('oklch(')
    })

    it('should generate stroke-oklch arbitrary', () => {
      const css = coral.generate(['stroke-oklch-[0.6_0.15_45]'])
      expect(css).toContain('stroke')
      expect(css).toContain('oklch(')
    })

    it('should generate bg-oklab arbitrary', () => {
      const css = coral.generate(['bg-oklab-[0.5_0.1_-0.1]'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklab(')
    })

    it('should generate text-oklab arbitrary', () => {
      const css = coral.generate(['text-oklab-[0.7_-0.05_0.1]'])
      expect(css).toContain('color')
      expect(css).toContain('oklab(')
    })

    it('should generate border-oklab arbitrary', () => {
      const css = coral.generate(['border-oklab-[0.6_0.0_0.15]'])
      expect(css).toContain('border-color')
      expect(css).toContain('oklab(')
    })
  })

  describe('Color Mix Support', () => {
    it('should generate bg-mix arbitrary', () => {
      const css = coral.generate(['bg-mix-[in_oklch,_red_50%,_blue]'])
      expect(css).toContain('background-color')
      expect(css).toContain('color-mix(')
    })

    it('should generate text-mix arbitrary', () => {
      const css = coral.generate(['text-mix-[in_srgb,_white_25%,_black]'])
      expect(css).toContain('color')
      expect(css).toContain('color-mix(')
    })

    it('should generate border-mix arbitrary', () => {
      const css = coral.generate(['border-mix-[in_lch,_green_70%,_blue]'])
      expect(css).toContain('border-color')
      expect(css).toContain('color-mix(')
    })
  })

  describe('Wide Gamut Predefined Colors', () => {
    it('should generate bg-vivid-red', () => {
      const css = coral.generate(['bg-vivid-red'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklch(')
    })

    it('should generate text-vivid-blue', () => {
      const css = coral.generate(['text-vivid-blue'])
      expect(css).toContain('color')
      expect(css).toContain('oklch(')
    })

    it('should generate border-vivid-green', () => {
      const css = coral.generate(['border-vivid-green'])
      expect(css).toContain('border-color')
      expect(css).toContain('oklch(')
    })

    it('should generate ring-vivid-purple', () => {
      const css = coral.generate(['ring-vivid-purple'])
      expect(css).toContain('--coral-ring-color')
      expect(css).toContain('oklch(')
    })

    it('should generate vivid color variants', () => {
      const css = coral.generate(['bg-vivid-red-light', 'bg-vivid-red-dark'])
      expect(css).toContain('oklch(')
    })
  })

  describe('Gradient Interpolation', () => {
    it('should generate interpolate-oklch', () => {
      const css = coral.generate(['interpolate-oklch'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('oklch')
    })

    it('should generate interpolate-oklab', () => {
      const css = coral.generate(['interpolate-oklab'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('oklab')
    })

    it('should generate interpolate-srgb', () => {
      const css = coral.generate(['interpolate-srgb'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('srgb')
    })

    it('should generate interpolate-hsl', () => {
      const css = coral.generate(['interpolate-hsl'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('hsl')
    })

    it('should generate interpolate-hwb', () => {
      const css = coral.generate(['interpolate-hwb'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('hwb')
    })

    it('should generate interpolate-lch', () => {
      const css = coral.generate(['interpolate-lch'])
      expect(css).toContain('--coral-gradient-interpolation')
      expect(css).toContain('lch')
    })
  })

  describe('Hue Interpolation', () => {
    it('should generate hue-shorter', () => {
      const css = coral.generate(['hue-shorter'])
      expect(css).toContain('--coral-hue-interpolation')
      expect(css).toContain('shorter')
    })

    it('should generate hue-longer', () => {
      const css = coral.generate(['hue-longer'])
      expect(css).toContain('--coral-hue-interpolation')
      expect(css).toContain('longer')
    })

    it('should generate hue-increasing', () => {
      const css = coral.generate(['hue-increasing'])
      expect(css).toContain('--coral-hue-interpolation')
      expect(css).toContain('increasing')
    })

    it('should generate hue-decreasing', () => {
      const css = coral.generate(['hue-decreasing'])
      expect(css).toContain('--coral-hue-interpolation')
      expect(css).toContain('decreasing')
    })
  })

  describe('Relative Color Syntax', () => {
    it('should generate bg-from arbitrary', () => {
      const css = coral.generate(['bg-from-[red_l_c_h]'])
      expect(css).toContain('background-color')
      expect(css).toContain('oklch(from')
    })

    it('should generate text-from arbitrary', () => {
      const css = coral.generate(['text-from-[var(--color)_l_c_h]'])
      expect(css).toContain('color')
      expect(css).toContain('oklch(from')
    })
  })

  describe('Arbitrary Opacity', () => {
    it('should generate opacity arbitrary', () => {
      const css = coral.generate(['opacity-[0.33]'])
      expect(css).toContain('opacity')
      expect(css).toContain('0.33')
    })

    it('should generate opacity-[.75]', () => {
      const css = coral.generate(['opacity-[.75]'])
      expect(css).toContain('opacity')
      expect(css).toContain('.75')
    })
  })

  describe('Border Side Colors', () => {
    it('should generate border-r-coral-500', () => {
      const css = coral.generate(['border-r-coral-500'])
      expect(css).toContain('border-right-color')
    })

    it('should generate border-b-coral-500', () => {
      const css = coral.generate(['border-b-coral-500'])
      expect(css).toContain('border-bottom-color')
    })

    it('should generate border-l-coral-500', () => {
      const css = coral.generate(['border-l-coral-500'])
      expect(css).toContain('border-left-color')
    })

    it('should generate border-x-coral-500', () => {
      const css = coral.generate(['border-x-coral-500'])
      expect(css).toContain('border-inline-color')
    })

    it('should generate border-y-coral-500', () => {
      const css = coral.generate(['border-y-coral-500'])
      expect(css).toContain('border-block-color')
    })
  })

  describe('Text Opacity Modifier', () => {
    it('should generate text-coral-500/50', () => {
      const css = coral.generate(['text-coral-500/50'])
      expect(css).toContain('color')
      expect(css).toContain('0.5')
    })
  })

  describe('Border Opacity Modifier', () => {
    it('should generate border-coral-500/50', () => {
      const css = coral.generate(['border-coral-500/50'])
      expect(css).toContain('border-color')
      expect(css).toContain('0.5')
    })
  })

  describe('Outline Opacity Modifier', () => {
    it('should generate outline-coral-500/50', () => {
      const css = coral.generate(['outline-coral-500/50'])
      expect(css).toContain('outline-color')
      expect(css).toContain('0.5')
    })
  })

  describe('Light-Dark Color Utilities', () => {
    it('should generate bg-light-dark arbitrary', () => {
      const css = coral.generate(['bg-light-dark-[white,black]'])
      expect(css).toContain('background-color')
      expect(css).toContain('light-dark(')
    })

    it('should generate text-light-dark arbitrary', () => {
      const css = coral.generate(['text-light-dark-[black,white]'])
      expect(css).toContain('color')
      expect(css).toContain('light-dark(')
    })

    it('should generate border-light-dark arbitrary', () => {
      const css = coral.generate(['border-light-dark-[gray,darkgray]'])
      expect(css).toContain('border-color')
      expect(css).toContain('light-dark(')
    })

    it('should generate shadow-light-dark arbitrary', () => {
      const css = coral.generate(['shadow-light-dark-[#000,#fff]'])
      expect(css).toContain('--coral-shadow-color')
      expect(css).toContain('light-dark(')
    })

    it('should generate ring-light-dark arbitrary', () => {
      const css = coral.generate(['ring-light-dark-[blue,lightblue]'])
      expect(css).toContain('--coral-ring-color')
      expect(css).toContain('light-dark(')
    })

    it('should generate bg-adaptive', () => {
      const css = coral.generate(['bg-adaptive'])
      expect(css).toContain('background-color')
      expect(css).toContain('light-dark(white, black)')
    })

    it('should generate text-adaptive', () => {
      const css = coral.generate(['text-adaptive'])
      expect(css).toContain('color')
      expect(css).toContain('light-dark(black, white)')
    })

    it('should generate border-adaptive', () => {
      const css = coral.generate(['border-adaptive'])
      expect(css).toContain('border-color')
      expect(css).toContain('light-dark(')
    })
  })

  describe('Conic Gradients', () => {
    it('should generate bg-conic', () => {
      const css = coral.generate(['bg-conic'])
      expect(css).toContain('background-image')
      expect(css).toContain('conic-gradient(')
    })

    it('should generate bg-conic-from-0', () => {
      const css = coral.generate(['bg-conic-from-0'])
      expect(css).toContain('conic-gradient(from 0deg')
    })

    it('should generate bg-conic-from-45', () => {
      const css = coral.generate(['bg-conic-from-45'])
      expect(css).toContain('conic-gradient(from 45deg')
    })

    it('should generate bg-conic-from-90', () => {
      const css = coral.generate(['bg-conic-from-90'])
      expect(css).toContain('conic-gradient(from 90deg')
    })

    it('should generate bg-conic-from-135', () => {
      const css = coral.generate(['bg-conic-from-135'])
      expect(css).toContain('conic-gradient(from 135deg')
    })

    it('should generate bg-conic-from-180', () => {
      const css = coral.generate(['bg-conic-from-180'])
      expect(css).toContain('conic-gradient(from 180deg')
    })

    it('should generate bg-conic arbitrary', () => {
      const css = coral.generate(['bg-conic-[from_45deg,_red,_blue]'])
      expect(css).toContain('conic-gradient(')
    })
  })

  describe('Repeating Gradients', () => {
    it('should generate bg-repeating-linear', () => {
      const css = coral.generate(['bg-repeating-linear'])
      expect(css).toContain('repeating-linear-gradient(')
    })

    it('should generate bg-repeating-radial', () => {
      const css = coral.generate(['bg-repeating-radial'])
      expect(css).toContain('repeating-radial-gradient(')
    })

    it('should generate bg-repeating-conic', () => {
      const css = coral.generate(['bg-repeating-conic'])
      expect(css).toContain('repeating-conic-gradient(')
    })

    it('should generate bg-repeating-linear arbitrary', () => {
      const css = coral.generate(['bg-repeating-linear-[45deg,_red_0px,_blue_20px]'])
      expect(css).toContain('repeating-linear-gradient(')
    })

    it('should generate bg-repeating-radial arbitrary', () => {
      const css = coral.generate(['bg-repeating-radial-[circle,_red_0px,_blue_20px]'])
      expect(css).toContain('repeating-radial-gradient(')
    })

    it('should generate bg-repeating-conic arbitrary', () => {
      const css = coral.generate(['bg-repeating-conic-[from_0deg,_red_0deg,_blue_30deg]'])
      expect(css).toContain('repeating-conic-gradient(')
    })
  })

  describe('Gradient Angle', () => {
    it('should generate gradient-angle arbitrary', () => {
      const css = coral.generate(['gradient-angle-[45deg]'])
      expect(css).toContain('--coral-gradient-angle')
      expect(css).toContain('45deg')
    })

    it('should generate gradient-angle with turn', () => {
      const css = coral.generate(['gradient-angle-[0.25turn]'])
      expect(css).toContain('--coral-gradient-angle')
      expect(css).toContain('0.25turn')
    })
  })

  describe('Mesh Gradient', () => {
    it('should generate bg-mesh', () => {
      const css = coral.generate(['bg-mesh'])
      expect(css).toContain('background-image')
      expect(css).toContain('radial-gradient(')
    })
  })

  describe('CSS Math Functions', () => {
    it('should generate calc arbitrary', () => {
      const css = coral.generate(['calc-[100%_-_20px]'])
      expect(css).toContain('--coral-calc')
      expect(css).toContain('calc(')
    })

    it('should generate min arbitrary', () => {
      const css = coral.generate(['min-[100%,_500px]'])
      expect(css).toContain('--coral-min')
      expect(css).toContain('min(')
    })

    it('should generate max arbitrary', () => {
      const css = coral.generate(['max-[100%,_500px]'])
      expect(css).toContain('--coral-max')
      expect(css).toContain('max(')
    })

    it('should generate clamp arbitrary', () => {
      const css = coral.generate(['clamp-[200px,_50%,_800px]'])
      expect(css).toContain('--coral-clamp')
      expect(css).toContain('clamp(')
    })

    it('should generate sin arbitrary', () => {
      const css = coral.generate(['sin-[45deg]'])
      expect(css).toContain('--coral-sin')
      expect(css).toContain('sin(')
    })

    it('should generate cos arbitrary', () => {
      const css = coral.generate(['cos-[90deg]'])
      expect(css).toContain('--coral-cos')
      expect(css).toContain('cos(')
    })

    it('should generate tan arbitrary', () => {
      const css = coral.generate(['tan-[30deg]'])
      expect(css).toContain('--coral-tan')
      expect(css).toContain('tan(')
    })

    it('should generate asin arbitrary', () => {
      const css = coral.generate(['asin-[0.5]'])
      expect(css).toContain('--coral-asin')
      expect(css).toContain('asin(')
    })

    it('should generate acos arbitrary', () => {
      const css = coral.generate(['acos-[0.5]'])
      expect(css).toContain('--coral-acos')
      expect(css).toContain('acos(')
    })

    it('should generate atan arbitrary', () => {
      const css = coral.generate(['atan-[1]'])
      expect(css).toContain('--coral-atan')
      expect(css).toContain('atan(')
    })

    it('should generate atan2 arbitrary', () => {
      const css = coral.generate(['atan2-[1,_1]'])
      expect(css).toContain('--coral-atan2')
      expect(css).toContain('atan2(')
    })

    it('should generate pow arbitrary', () => {
      const css = coral.generate(['pow-[2,_3]'])
      expect(css).toContain('--coral-pow')
      expect(css).toContain('pow(')
    })

    it('should generate sqrt arbitrary', () => {
      const css = coral.generate(['sqrt-[16]'])
      expect(css).toContain('--coral-sqrt')
      expect(css).toContain('sqrt(')
    })

    it('should generate hypot arbitrary', () => {
      const css = coral.generate(['hypot-[3,_4]'])
      expect(css).toContain('--coral-hypot')
      expect(css).toContain('hypot(')
    })

    it('should generate log arbitrary', () => {
      const css = coral.generate(['log-[10]'])
      expect(css).toContain('--coral-log')
      expect(css).toContain('log(')
    })

    it('should generate exp arbitrary', () => {
      const css = coral.generate(['exp-[2]'])
      expect(css).toContain('--coral-exp')
      expect(css).toContain('exp(')
    })

    it('should generate abs arbitrary', () => {
      const css = coral.generate(['abs-[-10px]'])
      expect(css).toContain('--coral-abs')
      expect(css).toContain('abs(')
    })

    it('should generate sign arbitrary', () => {
      const css = coral.generate(['sign-[-5]'])
      expect(css).toContain('--coral-sign')
      expect(css).toContain('sign(')
    })

    it('should generate round arbitrary', () => {
      const css = coral.generate(['round-[nearest,_5.5]'])
      expect(css).toContain('--coral-round')
      expect(css).toContain('round(')
    })

    it('should generate mod arbitrary', () => {
      const css = coral.generate(['mod-[10,_3]'])
      expect(css).toContain('--coral-mod')
      expect(css).toContain('mod(')
    })

    it('should generate rem arbitrary', () => {
      const css = coral.generate(['rem-[10,_3]'])
      expect(css).toContain('--coral-rem')
      expect(css).toContain('rem(')
    })
  })

  describe('Gradient Presets', () => {
    it('should generate bg-gradient-sunset', () => {
      const css = coral.generate(['bg-gradient-sunset'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('#f97316')
    })

    it('should generate bg-gradient-ocean', () => {
      const css = coral.generate(['bg-gradient-ocean'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-forest', () => {
      const css = coral.generate(['bg-gradient-forest'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-aurora', () => {
      const css = coral.generate(['bg-gradient-aurora'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-fire', () => {
      const css = coral.generate(['bg-gradient-fire'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-midnight', () => {
      const css = coral.generate(['bg-gradient-midnight'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-rose', () => {
      const css = coral.generate(['bg-gradient-rose'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-gold', () => {
      const css = coral.generate(['bg-gradient-gold'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-silver', () => {
      const css = coral.generate(['bg-gradient-silver'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-neon', () => {
      const css = coral.generate(['bg-gradient-neon'])
      expect(css).toContain('linear-gradient(')
    })

    it('should generate bg-gradient-animated', () => {
      const css = coral.generate(['bg-gradient-animated'])
      expect(css).toContain('background-size')
      expect(css).toContain('animation')
    })
  })

  describe('Background Patterns', () => {
    it('should generate bg-stripes', () => {
      const css = coral.generate(['bg-stripes'])
      expect(css).toContain('repeating-linear-gradient(')
    })

    it('should generate bg-stripes-horizontal', () => {
      const css = coral.generate(['bg-stripes-horizontal'])
      expect(css).toContain('repeating-linear-gradient(0deg')
    })

    it('should generate bg-stripes-vertical', () => {
      const css = coral.generate(['bg-stripes-vertical'])
      expect(css).toContain('repeating-linear-gradient(90deg')
    })

    it('should generate bg-stripes-reverse', () => {
      const css = coral.generate(['bg-stripes-reverse'])
      expect(css).toContain('repeating-linear-gradient(-45deg')
    })

    it('should generate bg-stripes-sm', () => {
      const css = coral.generate(['bg-stripes-sm'])
      expect(css).toContain('--coral-stripe-size')
      expect(css).toContain('5px')
    })

    it('should generate bg-stripes-md', () => {
      const css = coral.generate(['bg-stripes-md'])
      expect(css).toContain('--coral-stripe-size')
      expect(css).toContain('10px')
    })

    it('should generate bg-stripes-lg', () => {
      const css = coral.generate(['bg-stripes-lg'])
      expect(css).toContain('--coral-stripe-size')
      expect(css).toContain('20px')
    })

    it('should generate bg-stripes-xl', () => {
      const css = coral.generate(['bg-stripes-xl'])
      expect(css).toContain('--coral-stripe-size')
      expect(css).toContain('40px')
    })

    it('should generate bg-stripes arbitrary', () => {
      const css = coral.generate(['bg-stripes-[15px]'])
      expect(css).toContain('--coral-stripe-size')
      expect(css).toContain('15px')
    })

    it('should generate bg-dots', () => {
      const css = coral.generate(['bg-dots'])
      expect(css).toContain('radial-gradient(')
      expect(css).toContain('background-size')
    })

    it('should generate bg-dots-sm', () => {
      const css = coral.generate(['bg-dots-sm'])
      expect(css).toContain('8px 8px')
    })

    it('should generate bg-dots-lg', () => {
      const css = coral.generate(['bg-dots-lg'])
      expect(css).toContain('24px 24px')
    })

    it('should generate bg-dots-xl', () => {
      const css = coral.generate(['bg-dots-xl'])
      expect(css).toContain('32px 32px')
    })

    it('should generate bg-dots arbitrary', () => {
      const css = coral.generate(['bg-dots-[2px,_20px]'])
      expect(css).toContain('radial-gradient(')
      expect(css).toContain('_20px _20px')
    })

    it('should generate bg-grid', () => {
      const css = coral.generate(['bg-grid'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('20px 20px')
    })

    it('should generate bg-grid-sm', () => {
      const css = coral.generate(['bg-grid-sm'])
      expect(css).toContain('10px 10px')
    })

    it('should generate bg-grid-lg', () => {
      const css = coral.generate(['bg-grid-lg'])
      expect(css).toContain('40px 40px')
    })

    it('should generate bg-grid-xl', () => {
      const css = coral.generate(['bg-grid-xl'])
      expect(css).toContain('80px 80px')
    })

    it('should generate bg-grid arbitrary', () => {
      const css = coral.generate(['bg-grid-[50px]'])
      expect(css).toContain('50px 50px')
    })

    it('should generate bg-checkerboard', () => {
      const css = coral.generate(['bg-checkerboard'])
      expect(css).toContain('repeating-conic-gradient(')
    })

    it('should generate bg-checkerboard-sm', () => {
      const css = coral.generate(['bg-checkerboard-sm'])
      expect(css).toContain('10px 10px')
    })

    it('should generate bg-checkerboard-lg', () => {
      const css = coral.generate(['bg-checkerboard-lg'])
      expect(css).toContain('40px 40px')
    })

    it('should generate bg-cross-hatch', () => {
      const css = coral.generate(['bg-cross-hatch'])
      expect(css).toContain('repeating-linear-gradient(45deg')
      expect(css).toContain('repeating-linear-gradient(-45deg')
    })

    it('should generate bg-zigzag', () => {
      const css = coral.generate(['bg-zigzag'])
      expect(css).toContain('linear-gradient(135deg')
      expect(css).toContain('background-position')
    })

    it('should generate bg-triangles', () => {
      const css = coral.generate(['bg-triangles'])
      expect(css).toContain('linear-gradient(45deg')
    })

    it('should generate bg-herringbone', () => {
      const css = coral.generate(['bg-herringbone'])
      expect(css).toContain('linear-gradient(45deg')
      expect(css).toContain('linear-gradient(135deg')
    })

    it('should generate bg-diamonds', () => {
      const css = coral.generate(['bg-diamonds'])
      expect(css).toContain('linear-gradient(45deg')
      expect(css).toContain('linear-gradient(-45deg')
    })

    it('should generate bg-waves', () => {
      const css = coral.generate(['bg-waves'])
      expect(css).toContain('radial-gradient(ellipse')
    })

    it('should generate bg-noise', () => {
      const css = coral.generate(['bg-noise'])
      expect(css).toContain("url(")
      expect(css).toContain('feTurbulence')
    })

    it('should generate bg-paper', () => {
      const css = coral.generate(['bg-paper'])
      expect(css).toContain("url(")
    })

    it('should generate bg-isometric', () => {
      const css = coral.generate(['bg-isometric'])
      expect(css).toContain('linear-gradient(30deg')
    })

    it('should generate bg-carbon', () => {
      const css = coral.generate(['bg-carbon'])
      expect(css).toContain('background-color')
      expect(css).toContain('#131313')
    })

    it('should generate bg-blueprint', () => {
      const css = coral.generate(['bg-blueprint'])
      expect(css).toContain('background-color')
      expect(css).toContain('#0a4b8c')
    })

    it('should generate bg-honeycomb', () => {
      const css = coral.generate(['bg-honeycomb'])
      expect(css).toContain('radial-gradient(circle')
    })

    it('should generate bg-brick', () => {
      const css = coral.generate(['bg-brick'])
      expect(css).toContain('linear-gradient(335deg')
    })
  })

  describe('Pattern Opacity', () => {
    it('should generate pattern-opacity-50', () => {
      const css = coral.generate(['pattern-opacity-50'])
      expect(css).toContain('--coral-pattern-opacity')
      expect(css).toContain('0.5')
    })

    it('should generate pattern-opacity-75', () => {
      const css = coral.generate(['pattern-opacity-75'])
      expect(css).toContain('--coral-pattern-opacity')
      expect(css).toContain('0.75')
    })
  })

  describe('Pattern Colors', () => {
    it('should generate pattern-coral-500', () => {
      const css = coral.generate(['pattern-coral-500'])
      expect(css).toContain('color')
      expect(css).toContain('#ff6b6b')
    })

    it('should generate pattern-blue-700', () => {
      const css = coral.generate(['pattern-blue-700'])
      expect(css).toContain('color')
    })
  })

  describe('Simple Color Gradient Stops', () => {
    it('should generate from-white', () => {
      const css = coral.generate(['from-white'])
      expect(css).toContain('--coral-gradient-from')
    })

    it('should generate from-black', () => {
      const css = coral.generate(['from-black'])
      expect(css).toContain('--coral-gradient-from')
    })

    it('should generate from-transparent', () => {
      const css = coral.generate(['from-transparent'])
      expect(css).toContain('--coral-gradient-from')
    })

    it('should generate via-white', () => {
      const css = coral.generate(['via-white'])
      expect(css).toContain('--coral-gradient-via')
    })

    it('should generate via-black', () => {
      const css = coral.generate(['via-black'])
      expect(css).toContain('--coral-gradient-via')
    })

    it('should generate to-white', () => {
      const css = coral.generate(['to-white'])
      expect(css).toContain('--coral-gradient-to')
    })

    it('should generate to-black', () => {
      const css = coral.generate(['to-black'])
      expect(css).toContain('--coral-gradient-to')
    })
  })

  describe('Text Gradient Utilities', () => {
    it('should generate text-gradient', () => {
      const css = coral.generate(['text-gradient'])
      expect(css).toContain('background-image')
      expect(css).toContain('background-clip')
      expect(css).toContain('webkit-text-fill-color')
    })

    it('should generate text-gradient-radial', () => {
      const css = coral.generate(['text-gradient-radial'])
      expect(css).toContain('radial-gradient(')
      expect(css).toContain('background-clip')
    })

    it('should generate text-gradient-conic', () => {
      const css = coral.generate(['text-gradient-conic'])
      expect(css).toContain('conic-gradient(')
      expect(css).toContain('background-clip')
    })
  })

  describe('Border Gradient Utilities', () => {
    it('should generate border-gradient', () => {
      const css = coral.generate(['border-gradient'])
      expect(css).toContain('border-image')
      expect(css).toContain('linear-gradient(')
    })

    it('should generate border-gradient-radial', () => {
      const css = coral.generate(['border-gradient-radial'])
      expect(css).toContain('border-image')
      expect(css).toContain('radial-gradient(')
    })

    it('should generate border-gradient-conic', () => {
      const css = coral.generate(['border-gradient-conic'])
      expect(css).toContain('border-image')
      expect(css).toContain('conic-gradient(')
    })
  })

  describe('Vivid Gradient Presets', () => {
    it('should generate bg-gradient-vivid-sunset', () => {
      const css = coral.generate(['bg-gradient-vivid-sunset'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-ocean', () => {
      const css = coral.generate(['bg-gradient-vivid-ocean'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-aurora', () => {
      const css = coral.generate(['bg-gradient-vivid-aurora'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-vivid-neon', () => {
      const css = coral.generate(['bg-gradient-vivid-neon'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow', () => {
      const css = coral.generate(['bg-gradient-rainbow'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })

    it('should generate bg-gradient-rainbow-vivid', () => {
      const css = coral.generate(['bg-gradient-rainbow-vivid'])
      expect(css).toContain('linear-gradient(')
      expect(css).toContain('oklch')
    })
  })

  describe('All Vivid Color Variants', () => {
    const vividColors = [
      'vivid-orange', 'vivid-orange-light', 'vivid-orange-dark',
      'vivid-yellow', 'vivid-yellow-light', 'vivid-yellow-dark',
      'vivid-green-light', 'vivid-green-dark',
      'vivid-cyan', 'vivid-cyan-light', 'vivid-cyan-dark',
      'vivid-blue-light', 'vivid-blue-dark',
      'vivid-purple-light', 'vivid-purple-dark',
      'vivid-magenta', 'vivid-magenta-light', 'vivid-magenta-dark',
      'vivid-pink', 'vivid-pink-light', 'vivid-pink-dark'
    ]

    vividColors.forEach((color) => {
      it(`should generate bg-${color}`, () => {
        const css = coral.generate([`bg-${color}`])
        expect(css).toContain('background-color')
        expect(css).toContain('oklch(')
      })

      it(`should generate text-${color}`, () => {
        const css = coral.generate([`text-${color}`])
        expect(css).toContain('color')
        expect(css).toContain('oklch(')
      })

      it(`should generate border-${color}`, () => {
        const css = coral.generate([`border-${color}`])
        expect(css).toContain('border-color')
        expect(css).toContain('oklch(')
      })

      it(`should generate ring-${color}`, () => {
        const css = coral.generate([`ring-${color}`])
        expect(css).toContain('--coral-ring-color')
        expect(css).toContain('oklch(')
      })
    })
  })

  describe('Arbitrary Value Edge Cases', () => {
    it('should return null for bg-oklch with empty value', () => {
      const css = coral.generate(['bg-oklch-[]'])
      // Should not generate anything for empty value
      expect(css).not.toContain('oklch()')
    })

    it('should return null for text-oklch with empty value', () => {
      const css = coral.generate(['text-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for border-oklch with empty value', () => {
      const css = coral.generate(['border-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for ring-oklch with empty value', () => {
      const css = coral.generate(['ring-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for outline-oklch with empty value', () => {
      const css = coral.generate(['outline-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for shadow-oklch with empty value', () => {
      const css = coral.generate(['shadow-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for accent-oklch with empty value', () => {
      const css = coral.generate(['accent-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for caret-oklch with empty value', () => {
      const css = coral.generate(['caret-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for fill-oklch with empty value', () => {
      const css = coral.generate(['fill-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for stroke-oklch with empty value', () => {
      const css = coral.generate(['stroke-oklch-[]'])
      expect(css).not.toContain('oklch()')
    })

    it('should return null for bg-oklab with empty value', () => {
      const css = coral.generate(['bg-oklab-[]'])
      expect(css).not.toContain('oklab()')
    })

    it('should return null for text-oklab with empty value', () => {
      const css = coral.generate(['text-oklab-[]'])
      expect(css).not.toContain('oklab()')
    })

    it('should return null for border-oklab with empty value', () => {
      const css = coral.generate(['border-oklab-[]'])
      expect(css).not.toContain('oklab()')
    })

    it('should return null for bg-mix with empty value', () => {
      const css = coral.generate(['bg-mix-[]'])
      expect(css).not.toContain('color-mix()')
    })

    it('should return null for text-mix with empty value', () => {
      const css = coral.generate(['text-mix-[]'])
      expect(css).not.toContain('color-mix()')
    })

    it('should return null for border-mix with empty value', () => {
      const css = coral.generate(['border-mix-[]'])
      expect(css).not.toContain('color-mix()')
    })
  })

  describe('More Gradient Opacity Tests', () => {
    it('should generate via-red-500/25', () => {
      const css = coral.generate(['via-red-500/25'])
      expect(css).toContain('--coral-gradient-via')
      // Opacity is handled by the plugin
      expect(css).toContain('via-red-500')
    })

    it('should generate to-blue-500/75', () => {
      const css = coral.generate(['to-blue-500/75'])
      expect(css).toContain('--coral-gradient-to')
      // Opacity is handled by the plugin
      expect(css).toContain('to-blue-500')
    })

    it('should generate from-green-500/100', () => {
      const css = coral.generate(['from-green-500/100'])
      expect(css).toContain('--coral-gradient-from')
      expect(css).toContain('--coral-gradient-stops')
    })

    it('should test empty value edge cases for light-dark', () => {
      const css = coral.generate(['bg-light-dark-[]'])
      expect(css).not.toContain('light-dark()')
    })

    it('should test empty value for text-light-dark', () => {
      const css = coral.generate(['text-light-dark-[]'])
      expect(css).not.toContain('light-dark()')
    })

    it('should test empty value for border-light-dark', () => {
      const css = coral.generate(['border-light-dark-[]'])
      expect(css).not.toContain('light-dark()')
    })

    it('should test empty value for shadow-light-dark', () => {
      const css = coral.generate(['shadow-light-dark-[]'])
      expect(css).not.toContain('light-dark()')
    })

    it('should test empty value for ring-light-dark', () => {
      const css = coral.generate(['ring-light-dark-[]'])
      expect(css).not.toContain('light-dark()')
    })

    it('should test empty value for bg-from', () => {
      const css = coral.generate(['bg-from-[]'])
      expect(css).not.toContain('oklch(from )')
    })

    it('should test empty value for text-from', () => {
      const css = coral.generate(['text-from-[]'])
      expect(css).not.toContain('oklch(from )')
    })

    it('should test empty value for bg-conic arbitrary', () => {
      const css = coral.generate(['bg-conic-[]'])
      expect(css).not.toContain('conic-gradient()')
    })

    it('should test empty value for bg-repeating-linear arbitrary', () => {
      const css = coral.generate(['bg-repeating-linear-[]'])
      expect(css).not.toContain('repeating-linear-gradient()')
    })

    it('should test empty value for bg-repeating-radial arbitrary', () => {
      const css = coral.generate(['bg-repeating-radial-[]'])
      expect(css).not.toContain('repeating-radial-gradient()')
    })

    it('should test empty value for bg-repeating-conic arbitrary', () => {
      const css = coral.generate(['bg-repeating-conic-[]'])
      expect(css).not.toContain('repeating-conic-gradient()')
    })

    it('should test empty value for gradient-angle arbitrary', () => {
      const css = coral.generate(['gradient-angle-[]'])
      expect(css).not.toContain('--coral-gradient-angle:')
    })

    it('should test empty value for calc arbitrary', () => {
      const css = coral.generate(['calc-[]'])
      expect(css).not.toContain('calc()')
    })

    it('should test empty value for min arbitrary', () => {
      const css = coral.generate(['min-[]'])
      expect(css).not.toContain('min()')
    })

    it('should test empty value for max arbitrary', () => {
      const css = coral.generate(['max-[]'])
      expect(css).not.toContain('max()')
    })

    it('should test empty value for clamp arbitrary', () => {
      const css = coral.generate(['clamp-[]'])
      expect(css).not.toContain('clamp()')
    })

    it('should test empty value for sin arbitrary', () => {
      const css = coral.generate(['sin-[]'])
      expect(css).not.toContain('sin()')
    })

    it('should test empty value for cos arbitrary', () => {
      const css = coral.generate(['cos-[]'])
      expect(css).not.toContain('cos()')
    })

    it('should test empty value for tan arbitrary', () => {
      const css = coral.generate(['tan-[]'])
      expect(css).not.toContain('tan()')
    })

    it('should test empty value for asin arbitrary', () => {
      const css = coral.generate(['asin-[]'])
      expect(css).not.toContain('asin()')
    })

    it('should test empty value for acos arbitrary', () => {
      const css = coral.generate(['acos-[]'])
      expect(css).not.toContain('acos()')
    })

    it('should test empty value for atan arbitrary', () => {
      const css = coral.generate(['atan-[]'])
      expect(css).not.toContain('atan()')
    })

    it('should test empty value for atan2 arbitrary', () => {
      const css = coral.generate(['atan2-[]'])
      expect(css).not.toContain('atan2()')
    })

    it('should test empty value for pow arbitrary', () => {
      const css = coral.generate(['pow-[]'])
      expect(css).not.toContain('pow()')
    })

    it('should test empty value for sqrt arbitrary', () => {
      const css = coral.generate(['sqrt-[]'])
      expect(css).not.toContain('sqrt()')
    })

    it('should test empty value for hypot arbitrary', () => {
      const css = coral.generate(['hypot-[]'])
      expect(css).not.toContain('hypot()')
    })

    it('should test empty value for log arbitrary', () => {
      const css = coral.generate(['log-[]'])
      expect(css).not.toContain('log()')
    })

    it('should test empty value for exp arbitrary', () => {
      const css = coral.generate(['exp-[]'])
      expect(css).not.toContain('exp()')
    })

    it('should test empty value for abs arbitrary', () => {
      const css = coral.generate(['abs-[]'])
      expect(css).not.toContain('abs()')
    })

    it('should test empty value for sign arbitrary', () => {
      const css = coral.generate(['sign-[]'])
      expect(css).not.toContain('sign()')
    })

    it('should test empty value for round arbitrary', () => {
      const css = coral.generate(['round-[]'])
      expect(css).not.toContain('round()')
    })

    it('should test empty value for mod arbitrary', () => {
      const css = coral.generate(['mod-[]'])
      expect(css).not.toContain('mod()')
    })

    it('should test empty value for rem arbitrary', () => {
      const css = coral.generate(['rem-[]'])
      expect(css).not.toContain('rem()')
    })

    it('should test empty value for pattern-opacity', () => {
      const css = coral.generate(['pattern-opacity-'])
      // Invalid pattern should not generate output
      expect(css.length).toBeLessThan(100)
    })

    it('should test empty value for bg-stripes arbitrary', () => {
      const css = coral.generate(['bg-stripes-[]'])
      expect(css).not.toContain('--coral-stripe-size:')
    })

    it('should test empty value for bg-dots arbitrary', () => {
      const css = coral.generate(['bg-dots-[]'])
      // Should not generate malformed CSS
      expect(css).not.toContain('radial-gradient(currentColor , transparent )')
    })

    it('should test empty value for bg-grid arbitrary', () => {
      const css = coral.generate(['bg-grid-[]'])
      expect(css).not.toContain('background-size:  ')
    })

    it('should test bg-dots with single value', () => {
      const css = coral.generate(['bg-dots-[3px]'])
      expect(css).toContain('radial-gradient(')
      expect(css).toContain('3px')
    })
  })
})
