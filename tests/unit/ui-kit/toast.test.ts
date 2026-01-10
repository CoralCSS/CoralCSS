import { describe, it, expect } from 'vitest'
import {
  toast,
  toastIcon,
  toastIconContainer,
  toastContent,
  toastTitle,
  toastDescription,
  toastCloseButton,
  toastAction,
  toastViewport,
  toastProgress,
  toastProgressTrack,
  snackbar,
  snackbarAction,
} from '../../../src/ui-kit/toast'

describe('UI-Kit Toast', () => {
  describe('toast', () => {
    it('should return default toast styles', () => {
      const classes = toast()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('shadow-lg')
      expect(classes).toContain('rounded-xl')
    })

    it('should handle different variants', () => {
      expect(toast({ variant: 'solid', status: 'info' })).toContain('bg-blue-500')
      expect(toast({ variant: 'soft', status: 'info' })).toContain('bg-white')
      expect(toast({ variant: 'minimal' })).toContain('bg-slate-900')
    })

    it('should handle different statuses', () => {
      expect(toast({ variant: 'solid', status: 'success' })).toContain('bg-green-500')
      expect(toast({ variant: 'solid', status: 'warning' })).toContain('bg-yellow-500')
      expect(toast({ variant: 'solid', status: 'error' })).toContain('bg-red-500')
      expect(toast({ variant: 'solid', status: 'loading' })).toContain('bg-slate-700')
    })

    it('should handle different sizes', () => {
      expect(toast({ size: 'sm' })).toContain('px-3')
      expect(toast({ size: 'md' })).toContain('px-4')
    })

    it('should handle different radius', () => {
      expect(toast({ radius: 'none' })).toContain('rounded-none')
      expect(toast({ radius: 'lg' })).toContain('rounded-lg')
      expect(toast({ radius: '2xl' })).toContain('rounded-2xl')
    })
  })

  describe('toastIcon', () => {
    it('should return default icon styles', () => {
      const classes = toastIcon()
      expect(classes).toContain('flex-shrink-0')
      expect(classes).toContain('text-blue-500')
    })

    it('should handle different statuses', () => {
      expect(toastIcon('info')).toContain('text-blue-500')
      expect(toastIcon('success')).toContain('text-green-500')
      expect(toastIcon('warning')).toContain('text-yellow-500')
      expect(toastIcon('error')).toContain('text-red-500')
      expect(toastIcon('loading')).toContain('text-slate-500')
    })

    it('should handle solid variant', () => {
      expect(toastIcon('info', 'solid')).toContain('text-white')
      expect(toastIcon('success', 'solid')).toContain('text-white')
    })
  })

  describe('toastIconContainer', () => {
    it('should return default container styles', () => {
      const classes = toastIconContainer()
      expect(classes).toContain('w-10')
      expect(classes).toContain('h-10')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
    })

    it('should handle different statuses', () => {
      expect(toastIconContainer('info')).toContain('bg-blue-100')
      expect(toastIconContainer('success')).toContain('bg-green-100')
      expect(toastIconContainer('warning')).toContain('bg-yellow-100')
      expect(toastIconContainer('error')).toContain('bg-red-100')
      expect(toastIconContainer('loading')).toContain('bg-slate-100')
    })
  })

  describe('toastContent', () => {
    it('should return content styles', () => {
      const classes = toastContent()
      expect(classes).toContain('flex-1')
      expect(classes).toContain('min-w-0')
    })
  })

  describe('toastTitle', () => {
    it('should return title styles', () => {
      const classes = toastTitle()
      expect(classes).toContain('font-medium')
      expect(classes).toContain('text-slate-900')
    })

    it('should handle solid variant', () => {
      const classes = toastTitle('solid')
      expect(classes).toContain('font-medium')
      expect(classes).not.toContain('text-slate-900')
    })
  })

  describe('toastDescription', () => {
    it('should return description styles', () => {
      const classes = toastDescription()
      expect(classes).toContain('text-sm')
      expect(classes).toContain('text-slate-500')
    })

    it('should handle solid variant', () => {
      const classes = toastDescription('solid')
      expect(classes).toContain('opacity-90')
    })
  })

  describe('toastCloseButton', () => {
    it('should return close button styles', () => {
      const classes = toastCloseButton()
      expect(classes).toContain('flex-shrink-0')
      expect(classes).toContain('p-1')
      expect(classes).toContain('rounded-lg')
      expect(classes).toContain('transition-colors')
    })

    it('should handle solid variant', () => {
      const classes = toastCloseButton('solid')
      expect(classes).toContain('hover:bg-white/20')
    })
  })

  describe('toastAction', () => {
    it('should return action button styles', () => {
      const classes = toastAction()
      expect(classes).toContain('flex-shrink-0')
      expect(classes).toContain('text-sm')
      expect(classes).toContain('font-medium')
      expect(classes).toContain('text-coral-600')
    })

    it('should handle solid variant', () => {
      const classes = toastAction('solid')
      expect(classes).toContain('text-white/90')
    })
  })

  describe('toastViewport', () => {
    it('should return default viewport styles', () => {
      const classes = toastViewport()
      expect(classes).toContain('fixed')
      expect(classes).toContain('z-50')
      expect(classes).toContain('flex')
      expect(classes).toContain('flex-col')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('top-4')
      expect(classes).toContain('right-4')
    })

    it('should handle different positions', () => {
      expect(toastViewport('top')).toContain('top-4')
      expect(toastViewport('top')).toContain('left-1/2')
      expect(toastViewport('top-left')).toContain('top-4')
      expect(toastViewport('top-left')).toContain('left-4')
      expect(toastViewport('bottom')).toContain('bottom-4')
      expect(toastViewport('bottom-right')).toContain('bottom-4')
      expect(toastViewport('bottom-right')).toContain('right-4')
      expect(toastViewport('bottom-left')).toContain('bottom-4')
      expect(toastViewport('bottom-left')).toContain('left-4')
    })
  })

  describe('toastProgress', () => {
    it('should return default progress styles', () => {
      const classes = toastProgress()
      expect(classes).toContain('h-1')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('bg-blue-500')
    })

    it('should handle different statuses', () => {
      expect(toastProgress({ status: 'success' })).toContain('bg-green-500')
      expect(toastProgress({ status: 'warning' })).toContain('bg-yellow-500')
      expect(toastProgress({ status: 'error' })).toContain('bg-red-500')
    })

    it('should handle solid variant', () => {
      const classes = toastProgress({ variant: 'solid' })
      expect(classes).toContain('bg-white/30')
    })
  })

  describe('toastProgressTrack', () => {
    it('should return progress track styles', () => {
      const classes = toastProgressTrack()
      expect(classes).toContain('absolute')
      expect(classes).toContain('bottom-0')
      expect(classes).toContain('left-0')
      expect(classes).toContain('right-0')
      expect(classes).toContain('h-1')
      expect(classes).toContain('overflow-hidden')
    })

    it('should handle solid variant', () => {
      const classes = toastProgressTrack('solid')
      expect(classes).toContain('bg-white/10')
    })
  })

  describe('snackbar', () => {
    it('should return snackbar styles', () => {
      const classes = snackbar()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('bg-slate-900')
      expect(classes).toContain('text-white')
      expect(classes).toContain('rounded-xl')
    })
  })

  describe('snackbarAction', () => {
    it('should return snackbar action styles', () => {
      const classes = snackbarAction()
      expect(classes).toContain('text-coral-400')
      expect(classes).toContain('font-medium')
      expect(classes).toContain('transition-colors')
    })
  })
})
