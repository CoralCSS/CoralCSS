/**
 * Semantic Tokens Tests
 *
 * Tests for semantic design tokens including colors, typography, spacing,
 * shadows, radii, z-index, durations, and easings.
 *
 * @module tests/unit/tokens/semantic
 */

import { describe, it, expect } from 'vitest'
import {
  lightSemanticColors,
  darkSemanticColors,
  semanticTypography,
  semanticSpacing,
  semanticShadows,
  semanticRadii,
  semanticZIndex,
  semanticDurations,
  semanticEasings,
  lightSemanticTokens,
  darkSemanticTokens,
} from '../../../src/tokens/semantic'

describe('Semantic Tokens', () => {
  describe('lightSemanticColors', () => {
    it('should have background colors defined', () => {
      expect(lightSemanticColors.background).toBeDefined()
      expect(lightSemanticColors.background.default).toBe('#ffffff')
      expect(lightSemanticColors.background.subtle).toBe('#f8fafc')
      expect(lightSemanticColors.background.muted).toBe('#f1f5f9')
      expect(lightSemanticColors.background.emphasized).toBe('#e2e8f0')
      expect(lightSemanticColors.background.inverse).toBe('#0f172a')
      expect(lightSemanticColors.background.overlay).toBe('rgba(0, 0, 0, 0.5)')
    })

    it('should have foreground colors defined', () => {
      expect(lightSemanticColors.foreground).toBeDefined()
      expect(lightSemanticColors.foreground.default).toBe('#0f172a')
      expect(lightSemanticColors.foreground.muted).toBe('#475569')
      expect(lightSemanticColors.foreground.subtle).toBe('#64748b')
      expect(lightSemanticColors.foreground.disabled).toBe('#94a3b8')
      expect(lightSemanticColors.foreground.inverse).toBe('#ffffff')
      expect(lightSemanticColors.foreground.onAccent).toBe('#ffffff')
    })

    it('should have border colors defined', () => {
      expect(lightSemanticColors.border).toBeDefined()
      expect(lightSemanticColors.border.default).toBe('#e2e8f0')
      expect(lightSemanticColors.border.muted).toBe('#f1f5f9')
      expect(lightSemanticColors.border.emphasis).toBe('#cbd5e1')
      expect(lightSemanticColors.border.focus).toBe('#ff6b6b')
    })

    it('should have accent colors defined', () => {
      expect(lightSemanticColors.accent).toBeDefined()
      expect(lightSemanticColors.accent.default).toBe('#ff6b6b')
      expect(lightSemanticColors.accent.emphasis).toBe('#ff4757')
      expect(lightSemanticColors.accent.muted).toBe('#ffc9bf')
      expect(lightSemanticColors.accent.subtle).toBe('#fff5f3')
      expect(lightSemanticColors.accent.foreground).toBe('#ffffff')
    })

    it('should have status colors defined', () => {
      expect(lightSemanticColors.status).toBeDefined()
      expect(lightSemanticColors.status.success).toBe('#22c55e')
      expect(lightSemanticColors.status.successSubtle).toBe('#f0fdf4')
      expect(lightSemanticColors.status.successMuted).toBe('#dcfce7')
      expect(lightSemanticColors.status.successForeground).toBe('#166534')
      expect(lightSemanticColors.status.warning).toBe('#eab308')
      expect(lightSemanticColors.status.warningSubtle).toBe('#fefce8')
      expect(lightSemanticColors.status.error).toBe('#ef4444')
      expect(lightSemanticColors.status.info).toBe('#3b82f6')
    })

    it('should have interactive colors defined', () => {
      expect(lightSemanticColors.interactive).toBeDefined()
      expect(lightSemanticColors.interactive.hover).toBe('rgba(0, 0, 0, 0.04)')
      expect(lightSemanticColors.interactive.active).toBe('rgba(0, 0, 0, 0.08)')
      expect(lightSemanticColors.interactive.selected).toBe('#fff5f3')
      expect(lightSemanticColors.interactive.disabled).toBe('#f1f5f9')
    })
  })

  describe('darkSemanticColors', () => {
    it('should have background colors defined', () => {
      expect(darkSemanticColors.background).toBeDefined()
      expect(darkSemanticColors.background.default).toBe('#0f172a')
      expect(darkSemanticColors.background.subtle).toBe('#1e293b')
      expect(darkSemanticColors.background.muted).toBe('#334155')
      expect(darkSemanticColors.background.emphasized).toBe('#475569')
      expect(darkSemanticColors.background.inverse).toBe('#ffffff')
      expect(darkSemanticColors.background.overlay).toBe('rgba(0, 0, 0, 0.75)')
    })

    it('should have foreground colors defined', () => {
      expect(darkSemanticColors.foreground).toBeDefined()
      expect(darkSemanticColors.foreground.default).toBe('#f8fafc')
      expect(darkSemanticColors.foreground.muted).toBe('#cbd5e1')
      expect(darkSemanticColors.foreground.subtle).toBe('#94a3b8')
      expect(darkSemanticColors.foreground.disabled).toBe('#64748b')
      expect(darkSemanticColors.foreground.inverse).toBe('#0f172a')
      expect(darkSemanticColors.foreground.onAccent).toBe('#ffffff')
    })

    it('should have border colors defined', () => {
      expect(darkSemanticColors.border).toBeDefined()
      expect(darkSemanticColors.border.default).toBe('#334155')
      expect(darkSemanticColors.border.muted).toBe('#1e293b')
      expect(darkSemanticColors.border.emphasis).toBe('#475569')
      expect(darkSemanticColors.border.focus).toBe('#ff6b6b')
    })

    it('should have accent colors defined', () => {
      expect(darkSemanticColors.accent).toBeDefined()
      expect(darkSemanticColors.accent.default).toBe('#ff6b6b')
      expect(darkSemanticColors.accent.emphasis).toBe('#ff7a63')
      expect(darkSemanticColors.accent.muted).toBe('#5c0a0a')
      expect(darkSemanticColors.accent.subtle).toBe('rgba(255, 107, 107, 0.1)')
      expect(darkSemanticColors.accent.foreground).toBe('#ffffff')
    })

    it('should have status colors defined', () => {
      expect(darkSemanticColors.status).toBeDefined()
      expect(darkSemanticColors.status.success).toBe('#22c55e')
      expect(darkSemanticColors.status.successSubtle).toBe('rgba(34, 197, 94, 0.1)')
      expect(darkSemanticColors.status.warning).toBe('#eab308')
      expect(darkSemanticColors.status.error).toBe('#ef4444')
      expect(darkSemanticColors.status.info).toBe('#3b82f6')
    })

    it('should have interactive colors defined', () => {
      expect(darkSemanticColors.interactive).toBeDefined()
      expect(darkSemanticColors.interactive.hover).toBe('rgba(255, 255, 255, 0.04)')
      expect(darkSemanticColors.interactive.active).toBe('rgba(255, 255, 255, 0.08)')
      expect(darkSemanticColors.interactive.selected).toBe('rgba(255, 107, 107, 0.1)')
      expect(darkSemanticColors.interactive.disabled).toBe('#1e293b')
    })
  })

  describe('semanticTypography', () => {
    it('should have font family tokens defined', () => {
      expect(semanticTypography.fontFamily).toBeDefined()
      expect(semanticTypography.fontFamily.body).toBeDefined()
      expect(semanticTypography.fontFamily.heading).toBeDefined()
      expect(semanticTypography.fontFamily.mono).toBeDefined()
    })

    it('should have display font sizes defined', () => {
      expect(semanticTypography.fontSize).toBeDefined()
      expect(semanticTypography.fontSize['display-2xl']).toBeDefined()
      expect(semanticTypography.fontSize['display-xl']).toBeDefined()
      expect(semanticTypography.fontSize['display-lg']).toBeDefined()
      expect(semanticTypography.fontSize['display-md']).toBeDefined()
      expect(semanticTypography.fontSize['display-sm']).toBeDefined()
      expect(semanticTypography.fontSize['display-xs']).toBeDefined()
    })

    it('should have heading font sizes defined', () => {
      expect(semanticTypography.fontSize['heading-xl']).toBeDefined()
      expect(semanticTypography.fontSize['heading-lg']).toBeDefined()
      expect(semanticTypography.fontSize['heading-md']).toBeDefined()
      expect(semanticTypography.fontSize['heading-sm']).toBeDefined()
      expect(semanticTypography.fontSize['heading-xs']).toBeDefined()
    })

    it('should have body font sizes defined', () => {
      expect(semanticTypography.fontSize['body-xl']).toBeDefined()
      expect(semanticTypography.fontSize['body-lg']).toBeDefined()
      expect(semanticTypography.fontSize['body-md']).toBeDefined()
      expect(semanticTypography.fontSize['body-sm']).toBeDefined()
      expect(semanticTypography.fontSize['body-xs']).toBeDefined()
    })

    it('should have label font sizes defined', () => {
      expect(semanticTypography.fontSize['label-lg']).toBeDefined()
      expect(semanticTypography.fontSize['label-md']).toBeDefined()
      expect(semanticTypography.fontSize['label-sm']).toBeDefined()
    })

    it('should have font weights defined', () => {
      expect(semanticTypography.fontWeight).toBeDefined()
      expect(semanticTypography.fontWeight.regular).toBe(400)
      expect(semanticTypography.fontWeight.medium).toBe(500)
      expect(semanticTypography.fontWeight.semibold).toBe(600)
      expect(semanticTypography.fontWeight.bold).toBe(700)
    })

    it('should have line heights defined', () => {
      expect(semanticTypography.lineHeight).toBeDefined()
      expect(semanticTypography.lineHeight.tight).toBe('1.25')
      expect(semanticTypography.lineHeight.normal).toBe('1.5')
      expect(semanticTypography.lineHeight.relaxed).toBe('1.75')
    })

    it('should have letter spacing defined', () => {
      expect(semanticTypography.letterSpacing).toBeDefined()
      expect(semanticTypography.letterSpacing.tight).toBe('-0.02em')
      expect(semanticTypography.letterSpacing.normal).toBe('0')
      expect(semanticTypography.letterSpacing.wide).toBe('0.025em')
    })
  })

  describe('semanticSpacing', () => {
    it('should have page spacing tokens defined', () => {
      expect(semanticSpacing['page-x']).toBe('1rem')
      expect(semanticSpacing['page-x-sm']).toBe('1.5rem')
      expect(semanticSpacing['page-x-lg']).toBe('2rem')
    })

    it('should have section spacing tokens defined', () => {
      expect(semanticSpacing['section-y']).toBe('4rem')
      expect(semanticSpacing['section-y-lg']).toBe('6rem')
    })

    it('should have component padding tokens defined', () => {
      expect(semanticSpacing['component-padding-xs']).toBe('0.5rem')
      expect(semanticSpacing['component-padding-sm']).toBe('0.75rem')
      expect(semanticSpacing['component-padding-md']).toBe('1rem')
      expect(semanticSpacing['component-padding-lg']).toBe('1.5rem')
      expect(semanticSpacing['component-padding-xl']).toBe('2rem')
    })

    it('should have gap tokens defined', () => {
      expect(semanticSpacing['gap-xs']).toBe('0.25rem')
      expect(semanticSpacing['gap-sm']).toBe('0.5rem')
      expect(semanticSpacing['gap-md']).toBe('1rem')
      expect(semanticSpacing['gap-lg']).toBe('1.5rem')
      expect(semanticSpacing['gap-xl']).toBe('2rem')
    })

    it('should have stack spacing tokens defined', () => {
      expect(semanticSpacing['stack-xs']).toBe('0.25rem')
      expect(semanticSpacing['stack-sm']).toBe('0.5rem')
      expect(semanticSpacing['stack-md']).toBe('0.75rem')
      expect(semanticSpacing['stack-lg']).toBe('1rem')
      expect(semanticSpacing['stack-xl']).toBe('1.5rem')
    })

    it('should have inline spacing tokens defined', () => {
      expect(semanticSpacing['inline-xs']).toBe('0.25rem')
      expect(semanticSpacing['inline-sm']).toBe('0.5rem')
      expect(semanticSpacing['inline-md']).toBe('0.75rem')
      expect(semanticSpacing['inline-lg']).toBe('1rem')
      expect(semanticSpacing['inline-xl']).toBe('1.5rem')
    })
  })

  describe('semanticShadows', () => {
    it('should have elevation shadows defined', () => {
      expect(semanticShadows['elevation-1']).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)')
      expect(semanticShadows['elevation-2']).toBeDefined()
      expect(semanticShadows['elevation-3']).toBeDefined()
      expect(semanticShadows['elevation-4']).toBeDefined()
      expect(semanticShadows['elevation-5']).toBeDefined()
    })

    it('should have component shadows defined', () => {
      expect(semanticShadows['card']).toBeDefined()
      expect(semanticShadows['card-hover']).toBeDefined()
      expect(semanticShadows['dropdown']).toBeDefined()
      expect(semanticShadows['modal']).toBe('0 25px 50px -12px rgb(0 0 0 / 0.25)')
      expect(semanticShadows['tooltip']).toBeDefined()
      expect(semanticShadows['button']).toBe('0 1px 2px 0 rgb(0 0 0 / 0.05)')
    })

    it('should have focus ring shadows defined', () => {
      expect(semanticShadows['focus-ring']).toBe('0 0 0 2px var(--color-accent-default)')
      expect(semanticShadows['focus-ring-offset']).toBeDefined()
    })
  })

  describe('semanticRadii', () => {
    it('should have base radii defined', () => {
      expect(semanticRadii.none).toBe('0')
      expect(semanticRadii.sm).toBe('0.25rem')
      expect(semanticRadii.md).toBe('0.375rem')
      expect(semanticRadii.lg).toBe('0.5rem')
      expect(semanticRadii.xl).toBe('0.75rem')
      expect(semanticRadii['2xl']).toBe('1rem')
      expect(semanticRadii['3xl']).toBe('1.5rem')
      expect(semanticRadii.full).toBe('9999px')
    })

    it('should have component radii defined', () => {
      expect(semanticRadii.button).toBe('0.75rem')
      expect(semanticRadii.input).toBe('0.75rem')
      expect(semanticRadii.card).toBe('1rem')
      expect(semanticRadii.modal).toBe('1rem')
      expect(semanticRadii.badge).toBe('9999px')
      expect(semanticRadii.avatar).toBe('9999px')
    })
  })

  describe('semanticZIndex', () => {
    it('should have z-index values defined', () => {
      expect(semanticZIndex.hide).toBe(-1)
      expect(semanticZIndex.base).toBe(0)
      expect(semanticZIndex.dropdown).toBe(1000)
      expect(semanticZIndex.sticky).toBe(1100)
      expect(semanticZIndex.fixed).toBe(1200)
      expect(semanticZIndex.drawer).toBe(1300)
      expect(semanticZIndex['modal-backdrop']).toBe(1400)
      expect(semanticZIndex.modal).toBe(1500)
      expect(semanticZIndex.popover).toBe(1600)
      expect(semanticZIndex.tooltip).toBe(1700)
      expect(semanticZIndex.toast).toBe(1800)
      expect(semanticZIndex.max).toBe(9999)
    })

    it('should have correct z-index ordering', () => {
      expect(semanticZIndex.dropdown).toBeLessThan(semanticZIndex.modal)
      expect(semanticZIndex.modal).toBeLessThan(semanticZIndex.tooltip)
      expect(semanticZIndex.tooltip).toBeLessThan(semanticZIndex.toast)
    })
  })

  describe('semanticDurations', () => {
    it('should have duration values defined', () => {
      expect(semanticDurations.instant).toBe('0ms')
      expect(semanticDurations.fast).toBe('100ms')
      expect(semanticDurations.normal).toBe('200ms')
      expect(semanticDurations.slow).toBe('300ms')
      expect(semanticDurations.slower).toBe('500ms')
      expect(semanticDurations.slowest).toBe('1000ms')
    })

    it('should have component durations defined', () => {
      expect(semanticDurations.button).toBe('150ms')
      expect(semanticDurations.input).toBe('150ms')
      expect(semanticDurations.modal).toBe('200ms')
      expect(semanticDurations.drawer).toBe('300ms')
      expect(semanticDurations.tooltip).toBe('150ms')
      expect(semanticDurations.toast).toBe('300ms')
    })
  })

  describe('semanticEasings', () => {
    it('should have easing values defined', () => {
      expect(semanticEasings.default).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
      expect(semanticEasings.in).toBe('cubic-bezier(0.4, 0, 1, 1)')
      expect(semanticEasings.out).toBe('cubic-bezier(0, 0, 0.2, 1)')
      expect(semanticEasings['in-out']).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
      expect(semanticEasings.bounce).toBe('cubic-bezier(0.68, -0.55, 0.265, 1.55)')
      expect(semanticEasings.spring).toBe('cubic-bezier(0.175, 0.885, 0.32, 1.275)')
    })

    it('should have component easings defined', () => {
      expect(semanticEasings.button).toBe('cubic-bezier(0.4, 0, 0.2, 1)')
      expect(semanticEasings.modal).toBe('cubic-bezier(0.16, 1, 0.3, 1)')
      expect(semanticEasings.drawer).toBe('cubic-bezier(0.16, 1, 0.3, 1)')
    })
  })

  describe('lightSemanticTokens', () => {
    it('should combine all light theme tokens', () => {
      expect(lightSemanticTokens.colors).toBe(lightSemanticColors)
      expect(lightSemanticTokens.typography).toBe(semanticTypography)
      expect(lightSemanticTokens.spacing).toBe(semanticSpacing)
      expect(lightSemanticTokens.shadows).toBe(semanticShadows)
      expect(lightSemanticTokens.radii).toBe(semanticRadii)
      expect(lightSemanticTokens.zIndex).toBe(semanticZIndex)
      expect(lightSemanticTokens.durations).toBe(semanticDurations)
      expect(lightSemanticTokens.easings).toBe(semanticEasings)
    })

    it('should have all token categories', () => {
      expect(Object.keys(lightSemanticTokens)).toEqual([
        'colors',
        'typography',
        'spacing',
        'shadows',
        'radii',
        'zIndex',
        'durations',
        'easings',
      ])
    })
  })

  describe('darkSemanticTokens', () => {
    it('should combine all dark theme tokens', () => {
      expect(darkSemanticTokens.colors).toBe(darkSemanticColors)
      expect(darkSemanticTokens.typography).toBe(semanticTypography)
      expect(darkSemanticTokens.spacing).toBe(semanticSpacing)
      expect(darkSemanticTokens.shadows).toBe(semanticShadows)
      expect(darkSemanticTokens.radii).toBe(semanticRadii)
      expect(darkSemanticTokens.zIndex).toBe(semanticZIndex)
      expect(darkSemanticTokens.durations).toBe(semanticDurations)
      expect(darkSemanticTokens.easings).toBe(semanticEasings)
    })

    it('should have all token categories', () => {
      expect(Object.keys(darkSemanticTokens)).toEqual([
        'colors',
        'typography',
        'spacing',
        'shadows',
        'radii',
        'zIndex',
        'durations',
        'easings',
      ])
    })

    it('should share typography with light theme', () => {
      expect(darkSemanticTokens.typography).toBe(lightSemanticTokens.typography)
    })

    it('should share spacing with light theme', () => {
      expect(darkSemanticTokens.spacing).toBe(lightSemanticTokens.spacing)
    })
  })

  describe('Default Export', () => {
    it('should export all semantic tokens', async () => {
      const module = await import('../../../src/tokens/semantic')
      expect(module.lightSemanticColors).toBeDefined()
      expect(module.darkSemanticColors).toBeDefined()
      expect(module.semanticTypography).toBeDefined()
      expect(module.semanticSpacing).toBeDefined()
      expect(module.semanticShadows).toBeDefined()
      expect(module.semanticRadii).toBeDefined()
      expect(module.semanticZIndex).toBeDefined()
      expect(module.semanticDurations).toBeDefined()
      expect(module.semanticEasings).toBeDefined()
      expect(module.lightSemanticTokens).toBeDefined()
      expect(module.darkSemanticTokens).toBeDefined()
    })
  })
})
