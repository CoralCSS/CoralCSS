import { describe, it, expect } from 'vitest'
import {
  alert,
  alertIcon,
  alertTitle,
  alertDescription,
  alertCloseButton,
  inlineAlert,
  alertActions,
  alertActionButton,
  bannerAlert,
} from '../../../src/ui-kit/alert'

describe('UI Kit Alert', () => {
  describe('alert', () => {
    it('should generate base alert classes', () => {
      const classes = alert()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-start')
      expect(classes).toContain('gap-4')
      expect(classes).toContain('transition-all')
    })

    it('should apply soft variant by default', () => {
      const classes = alert({ status: 'info' })
      expect(classes).toContain('bg-blue-50')
      expect(classes).toContain('text-blue-800')
    })

    it('should apply solid variant', () => {
      const classes = alert({ variant: 'solid', status: 'info' })
      expect(classes).toContain('bg-blue-500')
      expect(classes).toContain('text-white')
    })

    it('should apply outline variant', () => {
      const classes = alert({ variant: 'outline', status: 'info' })
      expect(classes).toContain('border')
      expect(classes).toContain('border-blue-200')
    })

    it('should apply left-accent variant', () => {
      const classes = alert({ variant: 'left-accent', status: 'info' })
      expect(classes).toContain('border-l-4')
      expect(classes).toContain('border-l-blue-500')
    })

    it('should apply info status', () => {
      const classes = alert({ status: 'info' })
      expect(classes).toContain('bg-blue-50')
    })

    it('should apply success status', () => {
      const classes = alert({ status: 'success' })
      expect(classes).toContain('bg-green-50')
    })

    it('should apply warning status', () => {
      const classes = alert({ status: 'warning' })
      expect(classes).toContain('bg-yellow-50')
    })

    it('should apply error status', () => {
      const classes = alert({ status: 'error' })
      expect(classes).toContain('bg-red-50')
    })

    it('should apply size sm', () => {
      const classes = alert({ size: 'sm' })
      expect(classes).toContain('p-3')
      expect(classes).toContain('text-sm')
    })

    it('should apply size md (default)', () => {
      const classes = alert({ size: 'md' })
      expect(classes).toContain('p-4')
    })

    it('should apply size lg', () => {
      const classes = alert({ size: 'lg' })
      expect(classes).toContain('p-5')
      expect(classes).toContain('text-base')
    })

    it('should apply radius styles', () => {
      expect(alert({ radius: 'none' })).toContain('rounded-none')
      expect(alert({ radius: 'md' })).toContain('rounded-md')
      expect(alert({ radius: 'xl' })).toContain('rounded-xl')
    })
  })

  describe('alertIcon', () => {
    it('should generate icon class for info', () => {
      const classes = alertIcon('info')
      expect(classes).toContain('i-info-circle')
      expect(classes).toContain('flex-shrink-0')
    })

    it('should generate icon class for success', () => {
      const classes = alertIcon('success')
      expect(classes).toContain('i-check-circle')
    })

    it('should generate icon class for warning', () => {
      const classes = alertIcon('warning')
      expect(classes).toContain('i-alert-triangle')
    })

    it('should generate icon class for error', () => {
      const classes = alertIcon('error')
      expect(classes).toContain('i-x-circle')
    })

    it('should default to info', () => {
      const classes = alertIcon()
      expect(classes).toContain('i-info-circle')
    })
  })

  describe('alertTitle', () => {
    it('should generate title styles', () => {
      expect(alertTitle()).toBe('font-semibold')
    })
  })

  describe('alertDescription', () => {
    it('should generate description styles', () => {
      const classes = alertDescription()
      expect(classes).toContain('mt-1')
      expect(classes).toContain('opacity-90')
    })
  })

  describe('alertCloseButton', () => {
    it('should generate close button styles', () => {
      const classes = alertCloseButton()
      expect(classes).toContain('ml-auto')
      expect(classes).toContain('p-1')
      expect(classes).toContain('rounded-lg')
      expect(classes).toContain('transition-colors')
    })

    it('should apply light hover for soft variant', () => {
      const classes = alertCloseButton({ variant: 'soft' })
      expect(classes).toContain('hover:bg-black/10')
    })

    it('should apply light hover for outline variant', () => {
      const classes = alertCloseButton({ variant: 'outline' })
      expect(classes).toContain('hover:bg-black/10')
    })

    it('should apply dark hover for solid variant', () => {
      const classes = alertCloseButton({ variant: 'solid' })
      expect(classes).toContain('hover:bg-white/20')
    })
  })

  describe('inlineAlert', () => {
    it('should extend alert with items-center', () => {
      const classes = inlineAlert()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should pass through options', () => {
      const classes = inlineAlert({ status: 'success' })
      expect(classes).toContain('bg-green-50')
    })
  })

  describe('alertActions', () => {
    it('should generate action container styles', () => {
      const classes = alertActions()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-2')
      expect(classes).toContain('mt-3')
    })
  })

  describe('alertActionButton', () => {
    it('should generate action button styles', () => {
      const classes = alertActionButton()
      expect(classes).toContain('px-3')
      expect(classes).toContain('py-1.5')
      expect(classes).toContain('text-sm')
      expect(classes).toContain('font-medium')
      expect(classes).toContain('rounded-lg')
    })

    it('should apply primary style', () => {
      const classes = alertActionButton({ primary: true, status: 'info' })
      expect(classes).toContain('bg-blue-600')
      expect(classes).toContain('text-white')
    })

    it('should apply secondary style', () => {
      const classes = alertActionButton({ primary: false, status: 'info' })
      expect(classes).toContain('text-blue-700')
      expect(classes).toContain('hover:bg-blue-100')
    })

    it('should apply error status', () => {
      const classes = alertActionButton({ primary: true, status: 'error' })
      expect(classes).toContain('bg-red-600')
    })
  })

  describe('bannerAlert', () => {
    it('should create alert with no radius', () => {
      const classes = bannerAlert()
      expect(classes).toContain('rounded-none')
    })

    it('should pass through other options', () => {
      const classes = bannerAlert({ status: 'success' })
      expect(classes).toContain('bg-green-50')
    })
  })
})
