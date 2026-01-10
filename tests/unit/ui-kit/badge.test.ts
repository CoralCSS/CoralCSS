import { describe, it, expect } from 'vitest'
import {
  badge,
  badgeDot,
  notificationBadge,
  statusBadge,
  tagBadge,
  tagRemoveButton,
} from '../../../src/ui-kit/badge'

describe('UI Kit Badge', () => {
  describe('badge', () => {
    it('should generate base badge classes', () => {
      const classes = badge()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('font-medium')
    })

    it('should apply soft variant by default', () => {
      const classes = badge({ color: 'coral' })
      expect(classes).toContain('bg-coral-100')
      expect(classes).toContain('text-coral-700')
    })

    it('should apply solid variant', () => {
      const classes = badge({ variant: 'solid', color: 'coral' })
      expect(classes).toContain('bg-coral-500')
      expect(classes).toContain('text-white')
    })

    it('should apply outline variant', () => {
      const classes = badge({ variant: 'outline', color: 'coral' })
      expect(classes).toContain('border')
      expect(classes).toContain('border-coral-500')
    })

    it('should apply dot variant', () => {
      const classes = badge({ variant: 'dot', color: 'green' })
      expect(classes).toContain('bg-slate-100')
      expect(classes).toContain('text-slate-700')
    })

    it('should apply different colors', () => {
      expect(badge({ variant: 'solid', color: 'red' })).toContain('bg-red-500')
      expect(badge({ variant: 'solid', color: 'green' })).toContain('bg-green-500')
      expect(badge({ variant: 'solid', color: 'blue' })).toContain('bg-blue-500')
      expect(badge({ variant: 'solid', color: 'purple' })).toContain('bg-purple-500')
    })

    it('should apply size xs', () => {
      const classes = badge({ size: 'xs' })
      expect(classes).toContain('text-[10px]')
      expect(classes).toContain('px-1.5')
      expect(classes).toContain('py-0.5')
    })

    it('should apply size sm (default)', () => {
      const classes = badge({ size: 'sm' })
      expect(classes).toContain('text-xs')
      expect(classes).toContain('px-2')
    })

    it('should apply size md', () => {
      const classes = badge({ size: 'md' })
      expect(classes).toContain('text-sm')
      expect(classes).toContain('px-2.5')
      expect(classes).toContain('py-1')
    })

    it('should apply rounded by default', () => {
      const classes = badge()
      expect(classes).toContain('rounded-full')
    })

    it('should apply square when not rounded', () => {
      const classes = badge({ rounded: false })
      expect(classes).toContain('rounded-md')
      expect(classes).not.toContain('rounded-full')
    })
  })

  describe('badgeDot', () => {
    it('should generate dot styles', () => {
      const classes = badgeDot()
      expect(classes).toContain('w-1.5')
      expect(classes).toContain('h-1.5')
      expect(classes).toContain('rounded-full')
    })

    it('should apply green color by default', () => {
      const classes = badgeDot()
      expect(classes).toContain('bg-green-500')
    })

    it('should apply different colors', () => {
      expect(badgeDot('red')).toContain('bg-red-500')
      expect(badgeDot('blue')).toContain('bg-blue-500')
      expect(badgeDot('coral')).toContain('bg-coral-500')
    })
  })

  describe('notificationBadge', () => {
    it('should generate notification badge styles', () => {
      const classes = notificationBadge()
      expect(classes).toContain('absolute')
      expect(classes).toContain('-top-1')
      expect(classes).toContain('-right-1')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('font-bold')
      expect(classes).toContain('rounded-full')
    })

    it('should apply size sm (default)', () => {
      const classes = notificationBadge({ size: 'sm' })
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('text-[10px]')
    })

    it('should apply size md', () => {
      const classes = notificationBadge({ size: 'md' })
      expect(classes).toContain('w-5')
      expect(classes).toContain('h-5')
      expect(classes).toContain('text-xs')
    })

    it('should apply red color by default', () => {
      const classes = notificationBadge()
      expect(classes).toContain('bg-red-500')
    })

    it('should apply custom color', () => {
      const classes = notificationBadge({ color: 'blue' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('statusBadge', () => {
    it('should create online status', () => {
      const classes = statusBadge('online')
      expect(classes).toContain('bg-slate-100')
    })

    it('should create offline status', () => {
      const classes = statusBadge('offline')
      expect(classes).toContain('bg-slate-100')
    })

    it('should create away status', () => {
      const classes = statusBadge('away')
      expect(classes).toContain('bg-slate-100')
    })

    it('should create busy status', () => {
      const classes = statusBadge('busy')
      expect(classes).toContain('bg-slate-100')
    })
  })

  describe('tagBadge', () => {
    it('should extend badge with extra padding', () => {
      const classes = tagBadge()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('pr-1')
    })

    it('should pass through options', () => {
      const classes = tagBadge({ variant: 'solid', color: 'blue' })
      expect(classes).toContain('bg-blue-500')
    })
  })

  describe('tagRemoveButton', () => {
    it('should generate remove button styles', () => {
      const classes = tagRemoveButton()
      expect(classes).toContain('ml-1')
      expect(classes).toContain('p-0.5')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('hover:bg-black/10')
      expect(classes).toContain('focus:outline-none')
      expect(classes).toContain('focus:ring-1')
    })
  })
})
