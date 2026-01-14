/**
 * CoralCSS Design Tokens Tests
 *
 * Tests for complete design token definitions.
 */
import { describe, it, expect } from 'vitest'
import {
  coralTokens,
  primitiveTokens,
  semanticTokens,
  componentTokens,
  exportTokensJSON,
  getTokensByCategory,
  getPrimitiveTokens,
  getSemanticTokens,
  getComponentTokens,
} from '../../../src/design-system/coral-tokens'

describe('CoralCSS Design Tokens', () => {
  describe('primitiveTokens', () => {
    describe('colors', () => {
      it('should have base colors', () => {
        expect(primitiveTokens.color?.white).toBeDefined()
        expect(primitiveTokens.color?.black).toBeDefined()
        expect(primitiveTokens.color?.transparent).toBeDefined()
        expect(primitiveTokens.color?.current).toBeDefined()
      })

      it('should have coral color scale', () => {
        const coral = primitiveTokens.color?.coral as Record<string, { $value: string }>
        expect(coral).toBeDefined()
        expect(coral['50']?.$value).toBe('#fff5f3')
        expect(coral['500']?.$value).toBe('#ff6347')
        expect(coral['950']?.$value).toBe('#5c0a0a')
      })

      it('should have slate color scale', () => {
        const slate = primitiveTokens.color?.slate as Record<string, { $value: string }>
        expect(slate).toBeDefined()
        expect(slate['50']).toBeDefined()
        expect(slate['900']).toBeDefined()
      })

      it('should have status colors', () => {
        expect(primitiveTokens.color?.red).toBeDefined()
        expect(primitiveTokens.color?.green).toBeDefined()
        expect(primitiveTokens.color?.blue).toBeDefined()
        expect(primitiveTokens.color?.yellow).toBeDefined()
      })

      it('should have decorative colors', () => {
        expect(primitiveTokens.color?.purple).toBeDefined()
        expect(primitiveTokens.color?.pink).toBeDefined()
      })

      it('should have proper token structure', () => {
        const whiteToken = primitiveTokens.color?.white as { $value: string; $type: string }
        expect(whiteToken.$value).toBe('#ffffff')
        expect(whiteToken.$type).toBe('color')
      })
    })

    describe('spacing', () => {
      it('should have spacing scale', () => {
        expect(primitiveTokens.spacing).toBeDefined()
        expect(primitiveTokens.spacing?.['0']).toBeDefined()
        expect(primitiveTokens.spacing?.['1']).toBeDefined()
        expect(primitiveTokens.spacing?.['4']).toBeDefined()
        expect(primitiveTokens.spacing?.['96']).toBeDefined()
      })

      it('should have px spacing', () => {
        const pxToken = primitiveTokens.spacing?.px as { $value: string }
        expect(pxToken.$value).toBe('1px')
      })

      it('should have proper rem values', () => {
        const spacing4 = primitiveTokens.spacing?.['4'] as { $value: string }
        expect(spacing4.$value).toBe('1rem')
      })
    })

    describe('sizing', () => {
      it('should have sizing tokens', () => {
        expect(primitiveTokens.sizing).toBeDefined()
        expect(primitiveTokens.sizing?.auto).toBeDefined()
        expect(primitiveTokens.sizing?.full).toBeDefined()
        expect(primitiveTokens.sizing?.screen).toBeDefined()
      })

      it('should have fractional sizes', () => {
        expect(primitiveTokens.sizing?.['1/2']).toBeDefined()
        expect(primitiveTokens.sizing?.['1/3']).toBeDefined()
        expect(primitiveTokens.sizing?.['1/4']).toBeDefined()
      })
    })

    describe('borderRadius', () => {
      it('should have border radius scale', () => {
        expect(primitiveTokens.borderRadius).toBeDefined()
        expect(primitiveTokens.borderRadius?.none).toBeDefined()
        expect(primitiveTokens.borderRadius?.sm).toBeDefined()
        expect(primitiveTokens.borderRadius?.md).toBeDefined()
        expect(primitiveTokens.borderRadius?.lg).toBeDefined()
        expect(primitiveTokens.borderRadius?.full).toBeDefined()
      })

      it('should have proper values', () => {
        const fullRadius = primitiveTokens.borderRadius?.full as { $value: string }
        expect(fullRadius.$value).toBe('9999px')
      })
    })

    describe('borderWidth', () => {
      it('should have border width scale', () => {
        expect(primitiveTokens.borderWidth).toBeDefined()
        expect(primitiveTokens.borderWidth?.['0']).toBeDefined()
        expect(primitiveTokens.borderWidth?.DEFAULT).toBeDefined()
        expect(primitiveTokens.borderWidth?.['2']).toBeDefined()
      })
    })

    describe('typography', () => {
      it('should have font families', () => {
        expect(primitiveTokens.fontFamily).toBeDefined()
        expect(primitiveTokens.fontFamily?.sans).toBeDefined()
        expect(primitiveTokens.fontFamily?.serif).toBeDefined()
        expect(primitiveTokens.fontFamily?.mono).toBeDefined()
      })

      it('should have font sizes', () => {
        expect(primitiveTokens.fontSize).toBeDefined()
        expect(primitiveTokens.fontSize?.xs).toBeDefined()
        expect(primitiveTokens.fontSize?.base).toBeDefined()
        expect(primitiveTokens.fontSize?.['9xl']).toBeDefined()
      })

      it('should have font weights', () => {
        expect(primitiveTokens.fontWeight).toBeDefined()
        expect(primitiveTokens.fontWeight?.thin).toBeDefined()
        expect(primitiveTokens.fontWeight?.normal).toBeDefined()
        expect(primitiveTokens.fontWeight?.bold).toBeDefined()
        expect(primitiveTokens.fontWeight?.black).toBeDefined()
      })

      it('should have line heights', () => {
        expect(primitiveTokens.lineHeight).toBeDefined()
        expect(primitiveTokens.lineHeight?.none).toBeDefined()
        expect(primitiveTokens.lineHeight?.normal).toBeDefined()
        expect(primitiveTokens.lineHeight?.loose).toBeDefined()
      })

      it('should have letter spacing', () => {
        expect(primitiveTokens.letterSpacing).toBeDefined()
        expect(primitiveTokens.letterSpacing?.tighter).toBeDefined()
        expect(primitiveTokens.letterSpacing?.normal).toBeDefined()
        expect(primitiveTokens.letterSpacing?.widest).toBeDefined()
      })
    })

    describe('shadows', () => {
      it('should have shadow scale', () => {
        expect(primitiveTokens.shadow).toBeDefined()
        expect(primitiveTokens.shadow?.sm).toBeDefined()
        expect(primitiveTokens.shadow?.DEFAULT).toBeDefined()
        expect(primitiveTokens.shadow?.lg).toBeDefined()
        expect(primitiveTokens.shadow?.['2xl']).toBeDefined()
        expect(primitiveTokens.shadow?.inner).toBeDefined()
        expect(primitiveTokens.shadow?.none).toBeDefined()
      })
    })

    describe('motion', () => {
      it('should have durations', () => {
        expect(primitiveTokens.duration).toBeDefined()
        expect(primitiveTokens.duration?.['0']).toBeDefined()
        expect(primitiveTokens.duration?.['300']).toBeDefined()
        expect(primitiveTokens.duration?.['1000']).toBeDefined()
      })

      it('should have easings', () => {
        expect(primitiveTokens.easing).toBeDefined()
        expect(primitiveTokens.easing?.linear).toBeDefined()
        expect(primitiveTokens.easing?.in).toBeDefined()
        expect(primitiveTokens.easing?.out).toBeDefined()
        expect(primitiveTokens.easing?.['in-out']).toBeDefined()
      })
    })

    describe('opacity', () => {
      it('should have opacity scale', () => {
        expect(primitiveTokens.opacity).toBeDefined()
        expect(primitiveTokens.opacity?.['0']).toBeDefined()
        expect(primitiveTokens.opacity?.['50']).toBeDefined()
        expect(primitiveTokens.opacity?.['100']).toBeDefined()
      })
    })

    describe('zIndex', () => {
      it('should have z-index scale', () => {
        expect(primitiveTokens.zIndex).toBeDefined()
        expect(primitiveTokens.zIndex?.auto).toBeDefined()
        expect(primitiveTokens.zIndex?.['0']).toBeDefined()
        expect(primitiveTokens.zIndex?.['50']).toBeDefined()
      })
    })
  })

  describe('semanticTokens', () => {
    it('should have semantic token group', () => {
      expect(semanticTokens.semantic).toBeDefined()
    })

    describe('background tokens', () => {
      it('should have background tokens', () => {
        const bg = semanticTokens.semantic?.background as Record<string, { $value: string }>
        expect(bg).toBeDefined()
        expect(bg.default).toBeDefined()
        expect(bg.subtle).toBeDefined()
        expect(bg.muted).toBeDefined()
        expect(bg.inverse).toBeDefined()
      })

      it('should reference primitive tokens', () => {
        const bg = semanticTokens.semantic?.background as Record<string, { $value: string }>
        expect(bg.default.$value).toContain('{')
      })
    })

    describe('foreground tokens', () => {
      it('should have foreground tokens', () => {
        const fg = semanticTokens.semantic?.foreground as Record<string, { $value: string }>
        expect(fg).toBeDefined()
        expect(fg.default).toBeDefined()
        expect(fg.muted).toBeDefined()
        expect(fg.inverse).toBeDefined()
      })
    })

    describe('primary tokens', () => {
      it('should have primary tokens', () => {
        const primary = semanticTokens.semantic?.primary as Record<string, { $value: string }>
        expect(primary).toBeDefined()
        expect(primary.default).toBeDefined()
        expect(primary.hover).toBeDefined()
        expect(primary.active).toBeDefined()
        expect(primary.foreground).toBeDefined()
      })
    })

    describe('status tokens', () => {
      it('should have status tokens', () => {
        const status = semanticTokens.semantic?.status as Record<string, { $value: string }>
        expect(status).toBeDefined()
        expect(status.success).toBeDefined()
        expect(status.warning).toBeDefined()
        expect(status.error).toBeDefined()
        expect(status.info).toBeDefined()
      })

      it('should have subtle variants', () => {
        const status = semanticTokens.semantic?.status as Record<string, { $value: string }>
        expect(status['success-subtle']).toBeDefined()
        expect(status['warning-subtle']).toBeDefined()
        expect(status['error-subtle']).toBeDefined()
        expect(status['info-subtle']).toBeDefined()
      })
    })

    describe('border tokens', () => {
      it('should have border tokens', () => {
        const border = semanticTokens.semantic?.border as Record<string, { $value: string }>
        expect(border).toBeDefined()
        expect(border.default).toBeDefined()
        expect(border.muted).toBeDefined()
        expect(border.emphasis).toBeDefined()
      })
    })

    describe('ring tokens', () => {
      it('should have focus ring tokens', () => {
        const ring = semanticTokens.semantic?.ring as Record<string, { $value: string }>
        expect(ring).toBeDefined()
        expect(ring.default).toBeDefined()
        expect(ring.offset).toBeDefined()
      })
    })
  })

  describe('componentTokens', () => {
    it('should have component token group', () => {
      expect(componentTokens.component).toBeDefined()
    })

    describe('button tokens', () => {
      it('should have button tokens', () => {
        const button = componentTokens.component?.button as Record<string, unknown>
        expect(button).toBeDefined()
        expect(button.padding).toBeDefined()
        expect(button.borderRadius).toBeDefined()
        expect(button.fontSize).toBeDefined()
      })

      it('should have size variants', () => {
        const button = componentTokens.component?.button as Record<string, any>
        expect(button.padding?.x?.sm).toBeDefined()
        expect(button.padding?.x?.md).toBeDefined()
        expect(button.padding?.x?.lg).toBeDefined()
      })
    })

    describe('input tokens', () => {
      it('should have input tokens', () => {
        const input = componentTokens.component?.input as Record<string, unknown>
        expect(input).toBeDefined()
        expect(input.padding).toBeDefined()
        expect(input.borderRadius).toBeDefined()
        expect(input.borderWidth).toBeDefined()
      })
    })

    describe('card tokens', () => {
      it('should have card tokens', () => {
        const card = componentTokens.component?.card as Record<string, unknown>
        expect(card).toBeDefined()
        expect(card.padding).toBeDefined()
        expect(card.borderRadius).toBeDefined()
        expect(card.shadow).toBeDefined()
      })
    })

    describe('modal tokens', () => {
      it('should have modal tokens', () => {
        const modal = componentTokens.component?.modal as Record<string, unknown>
        expect(modal).toBeDefined()
        expect(modal.padding).toBeDefined()
        expect(modal.borderRadius).toBeDefined()
        expect(modal.shadow).toBeDefined()
      })
    })

    describe('avatar tokens', () => {
      it('should have avatar tokens', () => {
        const avatar = componentTokens.component?.avatar as Record<string, unknown>
        expect(avatar).toBeDefined()
        expect(avatar.size).toBeDefined()
        expect(avatar.borderRadius).toBeDefined()
      })

      it('should have size variants', () => {
        const avatar = componentTokens.component?.avatar as Record<string, any>
        expect(avatar.size?.xs).toBeDefined()
        expect(avatar.size?.md).toBeDefined()
        expect(avatar.size?.xl).toBeDefined()
      })
    })

    describe('badge tokens', () => {
      it('should have badge tokens', () => {
        const badge = componentTokens.component?.badge as Record<string, unknown>
        expect(badge).toBeDefined()
        expect(badge.padding).toBeDefined()
        expect(badge.borderRadius).toBeDefined()
        expect(badge.fontSize).toBeDefined()
      })
    })

    describe('tooltip tokens', () => {
      it('should have tooltip tokens', () => {
        const tooltip = componentTokens.component?.tooltip as Record<string, unknown>
        expect(tooltip).toBeDefined()
        expect(tooltip.padding).toBeDefined()
        expect(tooltip.borderRadius).toBeDefined()
        expect(tooltip.fontSize).toBeDefined()
      })
    })
  })

  describe('coralTokens', () => {
    it('should have metadata', () => {
      expect(coralTokens.$name).toBe('CoralCSS Design Tokens')
      expect(coralTokens.$description).toBeDefined()
      expect(coralTokens.$version).toBe('1.1.0')
    })

    it('should include primitive tokens', () => {
      expect(coralTokens.color).toBeDefined()
      expect(coralTokens.spacing).toBeDefined()
      expect(coralTokens.fontFamily).toBeDefined()
    })

    it('should include semantic tokens', () => {
      expect(coralTokens.semantic).toBeDefined()
    })

    it('should include component tokens', () => {
      expect(coralTokens.component).toBeDefined()
    })
  })

  describe('exportTokensJSON', () => {
    it('should return valid JSON string', () => {
      const json = exportTokensJSON()

      expect(typeof json).toBe('string')
      expect(() => JSON.parse(json)).not.toThrow()
    })

    it('should be formatted with indentation', () => {
      const json = exportTokensJSON()

      expect(json).toContain('\n')
      expect(json).toContain('  ')
    })

    it('should contain all tokens', () => {
      const json = exportTokensJSON()
      const parsed = JSON.parse(json)

      expect(parsed.$name).toBe('CoralCSS Design Tokens')
      expect(parsed.color).toBeDefined()
      expect(parsed.spacing).toBeDefined()
      expect(parsed.semantic).toBeDefined()
      expect(parsed.component).toBeDefined()
    })
  })

  describe('getTokensByCategory', () => {
    it('should return color tokens', () => {
      const tokens = getTokensByCategory('color')
      expect(tokens).toBeDefined()
    })

    it('should return spacing tokens', () => {
      const tokens = getTokensByCategory('spacing')
      expect(tokens).toBeDefined()
    })

    it('should return semantic tokens', () => {
      const tokens = getTokensByCategory('semantic')
      expect(tokens).toBeDefined()
    })

    it('should return component tokens', () => {
      const tokens = getTokensByCategory('component')
      expect(tokens).toBeDefined()
    })

    it('should return undefined for invalid category', () => {
      const tokens = getTokensByCategory('invalid')
      expect(tokens).toBeUndefined()
    })
  })

  describe('getPrimitiveTokens', () => {
    it('should return primitive tokens', () => {
      const tokens = getPrimitiveTokens()

      expect(tokens).toBe(primitiveTokens)
      expect(tokens.color).toBeDefined()
      expect(tokens.spacing).toBeDefined()
    })
  })

  describe('getSemanticTokens', () => {
    it('should return semantic tokens', () => {
      const tokens = getSemanticTokens()

      expect(tokens).toBe(semanticTokens)
      expect(tokens.semantic).toBeDefined()
    })
  })

  describe('getComponentTokens', () => {
    it('should return component tokens', () => {
      const tokens = getComponentTokens()

      expect(tokens).toBe(componentTokens)
      expect(tokens.component).toBeDefined()
    })
  })
})
