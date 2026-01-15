/**
 * Component Tokens Tests
 * @module tests/unit/tokens/component
 */
import { describe, it, expect } from 'vitest'
import { buttonTokens, inputTokens, cardTokens, modalTokens, toastTokens, badgeTokens, avatarTokens, dropdownTokens, tabsTokens, tooltipTokens, progressTokens, alertTokens, componentTokens } from '../../../src/tokens/component'

describe('Component Tokens', () => {
  describe('buttonTokens', () => {
    it('should have base styles defined', () => {
      expect(buttonTokens.fontWeight).toBeDefined()
      expect(buttonTokens.borderRadius).toBeDefined()
      expect(buttonTokens.transitionDuration).toBeDefined()
    })

    it('should have size variants', () => {
      expect(buttonTokens.sizes.xs).toBeDefined()
      expect(buttonTokens.sizes.sm).toBeDefined()
      expect(buttonTokens.sizes.md).toBeDefined()
      expect(buttonTokens.sizes.lg).toBeDefined()
    })

    it('should have variant styles', () => {
      expect(buttonTokens.variants.solid).toBeDefined()
      expect(buttonTokens.variants.soft).toBeDefined()
      expect(buttonTokens.variants.outline).toBeDefined()
      expect(buttonTokens.variants.ghost).toBeDefined()
    })
  })

  describe('inputTokens', () => {
    it('should have base styles defined', () => {
      expect(inputTokens.fontSize).toBeDefined()
      expect(inputTokens.borderRadius).toBeDefined()
    })

    it('should have size variants', () => {
      expect(inputTokens.sizes.sm).toBeDefined()
      expect(inputTokens.sizes.md).toBeDefined()
      expect(inputTokens.sizes.lg).toBeDefined()
    })

    it('should have state styles', () => {
      expect(inputTokens.states.default).toBeDefined()
      expect(inputTokens.states.hover).toBeDefined()
      expect(inputTokens.states.focus).toBeDefined()
    })
  })

  describe('cardTokens', () => {
    it('should have base styles defined', () => {
      expect(cardTokens.borderRadius).toBeDefined()
      expect(cardTokens.padding).toBeDefined()
      expect(cardTokens.background).toBeDefined()
      expect(cardTokens.shadow).toBeDefined()
    })

    it('should have padding options', () => {
      expect(cardTokens.padding.sm).toBeDefined()
      expect(cardTokens.padding.md).toBeDefined()
      expect(cardTokens.padding.lg).toBeDefined()
    })

    it('should have header and footer sections', () => {
      expect(cardTokens.header).toBeDefined()
      expect(cardTokens.footer).toBeDefined()
    })
  })

  describe('modalTokens', () => {
    it('should have base styles defined', () => {
      expect(modalTokens.borderRadius).toBeDefined()
      expect(modalTokens.background).toBeDefined()
      expect(modalTokens.shadow).toBeDefined()
    })

    it('should have size variants', () => {
      expect(modalTokens.sizes.sm).toBeDefined()
      expect(modalTokens.sizes.md).toBeDefined()
      expect(modalTokens.sizes.lg).toBeDefined()
    })

    it('should have overlay configuration', () => {
      expect(modalTokens.overlay).toBeDefined()
      expect(modalTokens.overlay.background).toBeDefined()
    })

    it('should have header, body, and footer sections', () => {
      expect(modalTokens.header).toBeDefined()
      expect(modalTokens.body).toBeDefined()
      expect(modalTokens.footer).toBeDefined()
    })
  })

  describe('toastTokens', () => {
    it('should have base styles defined', () => {
      expect(toastTokens.borderRadius).toBeDefined()
      expect(toastTokens.padding).toBeDefined()
      expect(toastTokens.shadow).toBeDefined()
      expect(toastTokens.background).toBeDefined()
    })

    it('should have size configuration', () => {
      expect(toastTokens.minWidth).toBeDefined()
      expect(toastTokens.maxWidth).toBeDefined()
    })

    it('should have icon and progress sections', () => {
      expect(toastTokens.icon).toBeDefined()
      expect(toastTokens.icon.size).toBeDefined()
      expect(toastTokens.progress).toBeDefined()
      expect(toastTokens.progress.height).toBeDefined()
    })
  })

  describe('badgeTokens', () => {
    it('should have base styles defined', () => {
      expect(badgeTokens.borderRadius).toBeDefined()
      expect(badgeTokens.fontWeight).toBeDefined()
    })

    it('should have size variants', () => {
      expect(badgeTokens.sizes.sm).toBeDefined()
      expect(badgeTokens.sizes.md).toBeDefined()
      expect(badgeTokens.sizes.lg).toBeDefined()
    })

    it('should have dot configuration', () => {
      expect(badgeTokens.dot).toBeDefined()
      expect(badgeTokens.dot.size).toBeDefined()
      expect(badgeTokens.dot.marginRight).toBeDefined()
    })
  })

  describe('avatarTokens', () => {
    it('should have base styles defined', () => {
      expect(avatarTokens.borderRadius).toBeDefined()
      expect(avatarTokens.fontWeight).toBeDefined()
    })

    it('should have size variants', () => {
      expect(avatarTokens.sizes.xs).toBeDefined()
      expect(avatarTokens.sizes.sm).toBeDefined()
      expect(avatarTokens.sizes.md).toBeDefined()
      expect(avatarTokens.sizes.lg).toBeDefined()
      expect(avatarTokens.sizes.xl).toBeDefined()
      expect(avatarTokens.sizes['2xl']).toBeDefined()
    })

    it('should have status indicator configuration', () => {
      expect(avatarTokens.status).toBeDefined()
      expect(avatarTokens.status.size).toBeDefined()
      expect(avatarTokens.status.borderWidth).toBeDefined()
    })

    it('should have group configuration', () => {
      expect(avatarTokens.group).toBeDefined()
      expect(avatarTokens.group.overlap).toBeDefined()
    })
  })

  describe('dropdownTokens', () => {
    it('should have base styles defined', () => {
      expect(dropdownTokens.background).toBeDefined()
      expect(dropdownTokens.borderRadius).toBeDefined()
      expect(dropdownTokens.shadow).toBeDefined()
      expect(dropdownTokens.minWidth).toBeDefined()
    })

    it('should have item configuration', () => {
      expect(dropdownTokens.item).toBeDefined()
      expect(dropdownTokens.item.paddingX).toBeDefined()
      expect(dropdownTokens.item.hoverBackground).toBeDefined()
    })

    it('should have divider and label configuration', () => {
      expect(dropdownTokens.divider).toBeDefined()
      expect(dropdownTokens.label).toBeDefined()
    })
  })

  describe('tabsTokens', () => {
    it('should have base styles defined', () => {
      expect(tabsTokens.fontWeight).toBeDefined()
      expect(tabsTokens.transitionDuration).toBeDefined()
    })

    it('should have trigger configuration', () => {
      expect(tabsTokens.trigger).toBeDefined()
      expect(tabsTokens.trigger.paddingX).toBeDefined()
      expect(tabsTokens.trigger.color).toBeDefined()
    })

    it('should have line and pills variants', () => {
      expect(tabsTokens.line).toBeDefined()
      expect(tabsTokens.pills).toBeDefined()
    })
  })

  describe('tooltipTokens', () => {
    it('should have base styles defined', () => {
      expect(tooltipTokens.background).toBeDefined()
      expect(tooltipTokens.color).toBeDefined()
      expect(tooltipTokens.fontSize).toBeDefined()
      expect(tooltipTokens.borderRadius).toBeDefined()
    })

    it('should have arrow configuration', () => {
      expect(tooltipTokens.arrow).toBeDefined()
      expect(tooltipTokens.arrow.size).toBeDefined()
    })
  })

  describe('progressTokens', () => {
    it('should have base styles defined', () => {
      expect(progressTokens.borderRadius).toBeDefined()
      expect(progressTokens.transitionDuration).toBeDefined()
    })

    it('should have track and bar configuration', () => {
      expect(progressTokens.track).toBeDefined()
      expect(progressTokens.track.background).toBeDefined()
      expect(progressTokens.bar).toBeDefined()
      expect(progressTokens.bar.background).toBeDefined()
    })

    it('should have size variants', () => {
      expect(progressTokens.sizes.xs).toBeDefined()
      expect(progressTokens.sizes.sm).toBeDefined()
      expect(progressTokens.sizes.md).toBeDefined()
      expect(progressTokens.sizes.lg).toBeDefined()
    })
  })

  describe('alertTokens', () => {
    it('should have base styles defined', () => {
      expect(alertTokens.borderRadius).toBeDefined()
      expect(alertTokens.paddingX).toBeDefined()
      expect(alertTokens.paddingY).toBeDefined()
    })

    it('should have variant styles', () => {
      expect(alertTokens.variants.info).toBeDefined()
      expect(alertTokens.variants.success).toBeDefined()
      expect(alertTokens.variants.warning).toBeDefined()
      expect(alertTokens.variants.error).toBeDefined()
    })

    it('should have complete variant configuration', () => {
      expect(alertTokens.variants.info.background).toBeDefined()
      expect(alertTokens.variants.info.borderColor).toBeDefined()
      expect(alertTokens.variants.info.color).toBeDefined()
    })
  })

  describe('componentTokens', () => {
    it('should export all component tokens', () => {
      expect(componentTokens.button).toBe(buttonTokens)
      expect(componentTokens.input).toBe(inputTokens)
      expect(componentTokens.card).toBe(cardTokens)
      expect(componentTokens.badge).toBe(badgeTokens)
      expect(componentTokens.avatar).toBe(avatarTokens)
      expect(componentTokens.modal).toBe(modalTokens)
      expect(componentTokens.dropdown).toBe(dropdownTokens)
      expect(componentTokens.toast).toBe(toastTokens)
      expect(componentTokens.tabs).toBe(tabsTokens)
      expect(componentTokens.tooltip).toBe(tooltipTokens)
      expect(componentTokens.progress).toBe(progressTokens)
      expect(componentTokens.alert).toBe(alertTokens)
    })

    it('should have all expected components', () => {
      const expectedComponents = [
        'button', 'input', 'card', 'badge', 'avatar', 'modal',
        'dropdown', 'toast', 'tabs', 'tooltip', 'progress', 'alert'
      ]
      expectedComponents.forEach(component => {
        expect(componentTokens[component]).toBeDefined()
      })
    })
  })
})
