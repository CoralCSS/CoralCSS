import { describe, it, expect } from 'vitest'
import { button, buttonGroup, iconButton } from '../../../src/ui-kit/button'

describe('UI Kit Button', () => {
  describe('button', () => {
    it('should generate base button classes', () => {
      const classes = button()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('font-medium')
      expect(classes).toContain('transition-all')
    })

    it('should apply default variant (solid)', () => {
      const classes = button()
      expect(classes).toContain('bg-coral-500')
      expect(classes).toContain('text-white')
    })

    it('should apply solid variant', () => {
      const classes = button({ variant: 'solid', color: 'red' })
      expect(classes).toContain('bg-red-500')
      expect(classes).toContain('text-white')
    })

    it('should apply soft variant', () => {
      const classes = button({ variant: 'soft', color: 'coral' })
      expect(classes).toContain('bg-coral-100')
      expect(classes).toContain('text-coral-700')
    })

    it('should apply outline variant', () => {
      const classes = button({ variant: 'outline', color: 'coral' })
      expect(classes).toContain('border-2')
      expect(classes).toContain('border-coral-500')
    })

    it('should apply ghost variant', () => {
      const classes = button({ variant: 'ghost', color: 'coral' })
      expect(classes).toContain('text-coral-600')
      expect(classes).toContain('hover:bg-coral-50')
    })

    it('should apply link variant', () => {
      const classes = button({ variant: 'link', color: 'coral' })
      expect(classes).toContain('text-coral-600')
      expect(classes).toContain('hover:underline')
    })

    it('should apply different colors', () => {
      expect(button({ color: 'red' })).toContain('bg-red-500')
      expect(button({ color: 'green' })).toContain('bg-green-500')
      expect(button({ color: 'blue' })).toContain('bg-blue-500')
      expect(button({ color: 'purple' })).toContain('bg-purple-500')
    })

    it('should apply size xs', () => {
      const classes = button({ size: 'xs' })
      expect(classes).toContain('text-xs')
      expect(classes).toContain('px-2.5')
      expect(classes).toContain('py-1')
    })

    it('should apply size sm', () => {
      const classes = button({ size: 'sm' })
      expect(classes).toContain('text-sm')
      expect(classes).toContain('px-3')
      expect(classes).toContain('py-1.5')
    })

    it('should apply size md (default)', () => {
      const classes = button({ size: 'md' })
      expect(classes).toContain('text-sm')
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-2')
    })

    it('should apply size lg', () => {
      const classes = button({ size: 'lg' })
      expect(classes).toContain('text-base')
      expect(classes).toContain('px-5')
      expect(classes).toContain('py-2.5')
    })

    it('should apply size xl', () => {
      const classes = button({ size: 'xl' })
      expect(classes).toContain('text-lg')
      expect(classes).toContain('px-6')
      expect(classes).toContain('py-3')
    })

    it('should apply radius styles', () => {
      expect(button({ radius: 'none' })).toContain('rounded-none')
      expect(button({ radius: 'sm' })).toContain('rounded-sm')
      expect(button({ radius: 'md' })).toContain('rounded-md')
      expect(button({ radius: 'lg' })).toContain('rounded-lg')
      expect(button({ radius: 'xl' })).toContain('rounded-xl')
      expect(button({ radius: '2xl' })).toContain('rounded-2xl')
      expect(button({ radius: 'full' })).toContain('rounded-full')
    })

    it('should apply full width', () => {
      const classes = button({ fullWidth: true })
      expect(classes).toContain('w-full')
    })

    it('should not apply full width by default', () => {
      const classes = button()
      expect(classes).not.toContain('w-full')
    })

    it('should apply loading state', () => {
      const classes = button({ loading: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
      expect(classes).toContain('pointer-events-none')
    })

    it('should apply disabled state', () => {
      const classes = button({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
    })

    it('should apply icon only styles', () => {
      const classes = button({ iconOnly: true, size: 'md' })
      expect(classes).toContain('p-2')
      expect(classes).not.toContain('px-4')
    })

    it('should apply icon only sizes', () => {
      expect(button({ iconOnly: true, size: 'xs' })).toContain('p-1')
      expect(button({ iconOnly: true, size: 'sm' })).toContain('p-1.5')
      expect(button({ iconOnly: true, size: 'lg' })).toContain('p-2.5')
      expect(button({ iconOnly: true, size: 'xl' })).toContain('p-3')
    })
  })

  describe('buttonGroup', () => {
    it('should create horizontal button group by default', () => {
      const classes = buttonGroup()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('flex-row')
    })

    it('should create vertical button group', () => {
      const classes = buttonGroup({ orientation: 'vertical' })
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('flex-col')
    })

    it('should apply horizontal child styling', () => {
      const classes = buttonGroup({ orientation: 'horizontal' })
      expect(classes).toContain('[&>*:first-child]:rounded-r-none')
      expect(classes).toContain('[&>*:last-child]:rounded-l-none')
    })

    it('should apply vertical child styling', () => {
      const classes = buttonGroup({ orientation: 'vertical' })
      expect(classes).toContain('[&>*:first-child]:rounded-b-none')
      expect(classes).toContain('[&>*:last-child]:rounded-t-none')
    })
  })

  describe('iconButton', () => {
    it('should create icon button with iconOnly true', () => {
      const classes = iconButton()
      expect(classes).toContain('p-2')
    })

    it('should pass through other options', () => {
      const classes = iconButton({ color: 'red', variant: 'outline' })
      expect(classes).toContain('border-red-500')
    })

    it('should apply size to icon button', () => {
      expect(iconButton({ size: 'sm' })).toContain('p-1.5')
      expect(iconButton({ size: 'lg' })).toContain('p-2.5')
    })
  })
})
