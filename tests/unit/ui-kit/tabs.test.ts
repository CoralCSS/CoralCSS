import { describe, it, expect } from 'vitest'
import {
  tabList,
  tab,
  tabPanels,
  tabPanel,
  tabIcon,
  tabBadge,
  verticalTabsContainer,
  scrollableTabs,
  tabScrollButton,
} from '../../../src/ui-kit/tabs'

describe('UI-Kit Tabs', () => {
  describe('tabList', () => {
    it('should return default tab list styles', () => {
      const classes = tabList()
      expect(classes).toContain('flex')
      expect(classes).toContain('border-b')
    })

    it('should handle different variants', () => {
      expect(tabList({ variant: 'line' })).toContain('border-b')
      expect(tabList({ variant: 'enclosed' })).toContain('border-b')
      expect(tabList({ variant: 'pills' })).toContain('gap-2')
      expect(tabList({ variant: 'soft-rounded' })).toContain('bg-slate-100')
      expect(tabList({ variant: 'solid-rounded' })).toContain('bg-slate-100')
    })

    it('should handle vertical orientation', () => {
      const classes = tabList({ orientation: 'vertical' })
      expect(classes).toContain('flex-col')
      expect(classes).toContain('border-r')
    })

    it('should handle fitted option', () => {
      const classes = tabList({ fitted: true })
      expect(classes).toContain('w-full')
      expect(classes).toContain('[&>*]:flex-1')
    })

    it('should handle vertical with pills variant', () => {
      const classes = tabList({ variant: 'pills', orientation: 'vertical' })
      expect(classes).toContain('flex-col')
      expect(classes).toContain('gap-2')
    })
  })

  describe('tab', () => {
    it('should return default tab styles', () => {
      const classes = tab()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('font-medium')
    })

    it('should handle active state', () => {
      const activeClasses = tab({ active: true })
      expect(activeClasses).toContain('border-coral-500')
      expect(activeClasses).toContain('text-coral-600')
    })

    it('should handle inactive state', () => {
      const inactiveClasses = tab({ active: false })
      expect(inactiveClasses).toContain('border-transparent')
      expect(inactiveClasses).toContain('text-slate-600')
    })

    it('should handle disabled state', () => {
      const classes = tab({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
      expect(classes).toContain('pointer-events-none')
    })

    it('should handle different sizes', () => {
      expect(tab({ size: 'sm' })).toContain('px-3')
      expect(tab({ size: 'md' })).toContain('px-4')
      expect(tab({ size: 'lg' })).toContain('px-5')
    })

    it('should handle different variants', () => {
      expect(tab({ variant: 'pills', active: true })).toContain('bg-coral-500')
      expect(tab({ variant: 'enclosed', active: true })).toContain('border-slate-200')
      expect(tab({ variant: 'soft-rounded', active: true })).toContain('bg-white')
      expect(tab({ variant: 'solid-rounded', active: true })).toContain('bg-coral-500')
    })
  })

  describe('tabPanels', () => {
    it('should return empty string', () => {
      const classes = tabPanels()
      expect(classes).toBe('')
    })
  })

  describe('tabPanel', () => {
    it('should return default tab panel styles', () => {
      const classes = tabPanel()
      expect(classes).toContain('focus:outline-none')
      expect(classes).toContain('py-4')
    })

    it('should handle different padding', () => {
      expect(tabPanel({ padding: 'none' })).not.toContain('py-')
      expect(tabPanel({ padding: 'sm' })).toContain('py-3')
      expect(tabPanel({ padding: 'md' })).toContain('py-4')
      expect(tabPanel({ padding: 'lg' })).toContain('py-6')
    })
  })

  describe('tabIcon', () => {
    it('should return icon styles', () => {
      const classes = tabIcon()
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
    })
  })

  describe('tabBadge', () => {
    it('should return inactive badge styles', () => {
      const classes = tabBadge()
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('text-xs')
      expect(classes).toContain('bg-slate-100')
    })

    it('should return active badge styles', () => {
      const classes = tabBadge(true)
      expect(classes).toContain('bg-coral-100')
      expect(classes).toContain('text-coral-700')
    })
  })

  describe('verticalTabsContainer', () => {
    it('should return container styles', () => {
      const classes = verticalTabsContainer()
      expect(classes).toContain('flex')
      expect(classes).toContain('gap-6')
    })
  })

  describe('scrollableTabs', () => {
    it('should return scrollable tabs styles', () => {
      const classes = scrollableTabs()
      expect(classes).toContain('overflow-x-auto')
      expect(classes).toContain('scrollbar-hide')
    })
  })

  describe('tabScrollButton', () => {
    it('should return left scroll button styles', () => {
      const classes = tabScrollButton('left')
      expect(classes).toContain('absolute')
      expect(classes).toContain('left-0')
      expect(classes).toContain('pr-4')
    })

    it('should return right scroll button styles', () => {
      const classes = tabScrollButton('right')
      expect(classes).toContain('absolute')
      expect(classes).toContain('right-0')
      expect(classes).toContain('pl-4')
      expect(classes).toContain('bg-gradient-to-l')
    })
  })
})
