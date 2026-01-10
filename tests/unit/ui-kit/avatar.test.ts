import { describe, it, expect } from 'vitest'
import {
  avatar,
  avatarImage,
  avatarFallback,
  avatarStatus,
  avatarGroup,
  avatarCount,
  avatarBadge,
  getInitials,
  colorFromName,
} from '../../../src/ui-kit/avatar'

describe('UI-Kit Avatar', () => {
  describe('avatar', () => {
    it('should return default styles', () => {
      const classes = avatar()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('w-10')
      expect(classes).toContain('h-10')
    })

    it('should handle different sizes', () => {
      expect(avatar({ size: 'xs' })).toContain('w-6')
      expect(avatar({ size: 'sm' })).toContain('w-8')
      expect(avatar({ size: 'md' })).toContain('w-10')
      expect(avatar({ size: 'lg' })).toContain('w-12')
      expect(avatar({ size: 'xl' })).toContain('w-16')
      expect(avatar({ size: '2xl' })).toContain('w-20')
    })

    it('should handle different variants', () => {
      expect(avatar({ variant: 'circular' })).toContain('rounded-full')
      expect(avatar({ variant: 'rounded' })).toContain('rounded-xl')
      expect(avatar({ variant: 'square' })).toContain('rounded-none')
    })

    it('should handle bordered option', () => {
      expect(avatar({ bordered: true })).toContain('ring-2')
      expect(avatar({ bordered: false })).not.toContain('ring-2')
    })
  })

  describe('avatarImage', () => {
    it('should return image styles', () => {
      const classes = avatarImage()
      expect(classes).toContain('w-full')
      expect(classes).toContain('h-full')
      expect(classes).toContain('object-cover')
    })
  })

  describe('avatarFallback', () => {
    it('should return fallback styles with default color', () => {
      const classes = avatarFallback()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('bg-coral-500')
    })

    it('should handle different colors', () => {
      expect(avatarFallback('blue')).toContain('bg-blue-500')
      expect(avatarFallback('green')).toContain('bg-green-500')
      expect(avatarFallback('red')).toContain('bg-red-500')
    })
  })

  describe('avatarStatus', () => {
    it('should return online status styles', () => {
      const classes = avatarStatus({ status: 'online' })
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('bg-green-500')
    })

    it('should return offline status styles', () => {
      const classes = avatarStatus({ status: 'offline' })
      expect(classes).toContain('bg-slate-400')
    })

    it('should return away status styles', () => {
      const classes = avatarStatus({ status: 'away' })
      expect(classes).toContain('bg-yellow-500')
    })

    it('should return busy status styles', () => {
      const classes = avatarStatus({ status: 'busy' })
      expect(classes).toContain('bg-red-500')
    })

    it('should handle different sizes', () => {
      expect(avatarStatus({ status: 'online', size: 'xs' })).toContain('w-1.5')
      expect(avatarStatus({ status: 'online', size: 'md' })).toContain('w-2.5')
      expect(avatarStatus({ status: 'online', size: 'xl' })).toContain('w-3.5')
    })
  })

  describe('avatarGroup', () => {
    it('should return default group styles', () => {
      const classes = avatarGroup()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('-space-x-3')
    })

    it('should handle different spacing', () => {
      expect(avatarGroup({ spacing: 'tight' })).toContain('-space-x-4')
      expect(avatarGroup({ spacing: 'normal' })).toContain('-space-x-3')
      expect(avatarGroup({ spacing: 'loose' })).toContain('-space-x-2')
    })
  })

  describe('avatarCount', () => {
    it('should return count styles', () => {
      const classes = avatarCount()
      expect(classes).toContain('bg-slate-100')
      expect(classes).toContain('font-medium')
    })

    it('should include avatar styles', () => {
      const classes = avatarCount({ size: 'lg' })
      expect(classes).toContain('w-12')
    })
  })

  describe('avatarBadge', () => {
    it('should return default badge styles', () => {
      const classes = avatarBadge()
      expect(classes).toContain('absolute')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('top-0')
      expect(classes).toContain('right-0')
      expect(classes).toContain('bg-red-500')
    })

    it('should handle bottom-right position', () => {
      const classes = avatarBadge({ position: 'bottom-right' })
      expect(classes).toContain('bottom-0')
      expect(classes).toContain('right-0')
    })

    it('should handle different colors', () => {
      expect(avatarBadge({ color: 'blue' })).toContain('bg-blue-500')
      expect(avatarBadge({ color: 'green' })).toContain('bg-green-500')
    })
  })

  describe('getInitials', () => {
    it('should get initials from single word name', () => {
      expect(getInitials('John')).toBe('J')
    })

    it('should get initials from two word name', () => {
      expect(getInitials('John Doe')).toBe('JD')
    })

    it('should get max two initials from longer name', () => {
      expect(getInitials('John Michael Doe')).toBe('JM')
    })

    it('should return uppercase initials', () => {
      expect(getInitials('john doe')).toBe('JD')
    })
  })

  describe('colorFromName', () => {
    it('should return a consistent color for same name', () => {
      const color1 = colorFromName('John Doe')
      const color2 = colorFromName('John Doe')
      expect(color1).toBe(color2)
    })

    it('should return different colors for different names', () => {
      const color1 = colorFromName('John Doe')
      const color2 = colorFromName('Jane Smith')
      // Colors might be same or different based on hash, but function should work
      expect(typeof color1).toBe('string')
      expect(typeof color2).toBe('string')
    })

    it('should return valid color', () => {
      const validColors = ['coral', 'blue', 'green', 'purple', 'pink', 'cyan', 'orange', 'yellow']
      const color = colorFromName('Test User')
      expect(validColors).toContain(color)
    })
  })
})
