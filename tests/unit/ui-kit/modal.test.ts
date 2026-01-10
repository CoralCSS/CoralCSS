import { describe, it, expect } from 'vitest'
import {
  modalOverlay,
  modalContainer,
  modal,
  modalHeader,
  modalTitle,
  modalCloseButton,
  modalBody,
  modalFooter,
  confirmModal,
  confirmModalIcon,
  drawer,
  sheet,
  sheetHandle,
} from '../../../src/ui-kit/modal'

describe('UI-Kit Modal', () => {
  describe('modalOverlay', () => {
    it('should return default styles with blur', () => {
      const classes = modalOverlay()
      expect(classes).toContain('fixed')
      expect(classes).toContain('inset-0')
      expect(classes).toContain('z-50')
      expect(classes).toContain('backdrop-blur-sm')
    })

    it('should disable blur when specified', () => {
      const classes = modalOverlay({ blur: false })
      expect(classes).not.toContain('backdrop-blur-sm')
    })
  })

  describe('modalContainer', () => {
    it('should return default center position', () => {
      const classes = modalContainer()
      expect(classes).toContain('items-center')
      expect(classes).toContain('flex')
    })

    it('should handle top position', () => {
      const classes = modalContainer({ position: 'top' })
      expect(classes).toContain('items-start')
      expect(classes).toContain('pt-16')
    })

    it('should handle bottom position', () => {
      const classes = modalContainer({ position: 'bottom' })
      expect(classes).toContain('items-end')
      expect(classes).toContain('pb-16')
    })

    it('should handle inside scroll behavior', () => {
      const classes = modalContainer({ scrollBehavior: 'inside' })
      expect(classes).not.toContain('overflow-y-auto')
    })

    it('should handle outside scroll behavior', () => {
      const classes = modalContainer({ scrollBehavior: 'outside' })
      expect(classes).toContain('overflow-y-auto')
    })
  })

  describe('modal', () => {
    it('should return default styles', () => {
      const classes = modal()
      expect(classes).toContain('w-full')
      expect(classes).toContain('bg-white')
      expect(classes).toContain('max-w-md')
      expect(classes).toContain('rounded-2xl')
    })

    it('should handle different sizes', () => {
      expect(modal({ size: 'xs' })).toContain('max-w-xs')
      expect(modal({ size: 'sm' })).toContain('max-w-sm')
      expect(modal({ size: 'lg' })).toContain('max-w-lg')
      expect(modal({ size: 'xl' })).toContain('max-w-xl')
      expect(modal({ size: 'full' })).toContain('max-w-full')
    })

    it('should handle full size without radius', () => {
      const classes = modal({ size: 'full' })
      expect(classes).not.toContain('rounded-2xl')
    })

    it('should handle different radius', () => {
      expect(modal({ radius: 'none' })).toContain('rounded-none')
      expect(modal({ radius: 'sm' })).toContain('rounded-sm')
      expect(modal({ radius: 'lg' })).toContain('rounded-lg')
    })

    it('should handle inside scroll behavior', () => {
      const classes = modal({ scrollBehavior: 'inside' })
      expect(classes).toContain('max-h-[calc(100vh-8rem)]')
      expect(classes).toContain('flex')
      expect(classes).toContain('flex-col')
    })
  })

  describe('modalHeader', () => {
    it('should return default styles with border', () => {
      const classes = modalHeader()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('border-b')
    })

    it('should handle no border', () => {
      const classes = modalHeader({ bordered: false })
      expect(classes).not.toContain('border-b')
    })
  })

  describe('modalTitle', () => {
    it('should return title styles', () => {
      const classes = modalTitle()
      expect(classes).toContain('text-lg')
      expect(classes).toContain('font-semibold')
    })
  })

  describe('modalCloseButton', () => {
    it('should return close button styles', () => {
      const classes = modalCloseButton()
      expect(classes).toContain('rounded-lg')
      expect(classes).toContain('transition-colors')
    })
  })

  describe('modalBody', () => {
    it('should return default styles', () => {
      const classes = modalBody()
      expect(classes).toContain('px-6')
      expect(classes).toContain('py-4')
    })

    it('should handle scrollable', () => {
      const classes = modalBody({ scrollable: true })
      expect(classes).toContain('overflow-y-auto')
      expect(classes).toContain('flex-1')
    })

    it('should handle different padding sizes', () => {
      expect(modalBody({ padding: 'sm' })).toContain('px-4')
      expect(modalBody({ padding: 'md' })).toContain('px-6')
      expect(modalBody({ padding: 'lg' })).toContain('px-8')
    })
  })

  describe('modalFooter', () => {
    it('should return default styles with border', () => {
      const classes = modalFooter()
      expect(classes).toContain('flex')
      expect(classes).toContain('border-t')
      expect(classes).toContain('justify-end')
    })

    it('should handle no border', () => {
      const classes = modalFooter({ bordered: false })
      expect(classes).not.toContain('border-t')
    })

    it('should handle different justify options', () => {
      expect(modalFooter({ justify: 'start' })).toContain('justify-start')
      expect(modalFooter({ justify: 'center' })).toContain('justify-center')
      expect(modalFooter({ justify: 'end' })).toContain('justify-end')
      expect(modalFooter({ justify: 'between' })).toContain('justify-between')
    })
  })

  describe('confirmModal', () => {
    it('should return small modal styles', () => {
      const classes = confirmModal()
      expect(classes).toContain('max-w-sm')
    })
  })

  describe('confirmModalIcon', () => {
    it('should return danger icon styles', () => {
      const classes = confirmModalIcon('danger')
      expect(classes).toContain('bg-red-100')
      expect(classes).toContain('text-red-600')
    })

    it('should return warning icon styles', () => {
      const classes = confirmModalIcon('warning')
      expect(classes).toContain('bg-yellow-100')
      expect(classes).toContain('text-yellow-600')
    })

    it('should return info icon styles', () => {
      const classes = confirmModalIcon('info')
      expect(classes).toContain('bg-blue-100')
      expect(classes).toContain('text-blue-600')
    })

    it('should return success icon styles', () => {
      const classes = confirmModalIcon('success')
      expect(classes).toContain('bg-green-100')
      expect(classes).toContain('text-green-600')
    })

    it('should default to danger', () => {
      const classes = confirmModalIcon()
      expect(classes).toContain('bg-red-100')
    })
  })

  describe('drawer', () => {
    it('should return right drawer styles by default', () => {
      const classes = drawer()
      expect(classes).toContain('right-0')
      expect(classes).toContain('slide-in-from-right')
    })

    it('should handle left drawer', () => {
      const classes = drawer('left')
      expect(classes).toContain('left-0')
      expect(classes).toContain('slide-in-from-left')
    })

    it('should handle top drawer', () => {
      const classes = drawer('top')
      expect(classes).toContain('top-0')
      expect(classes).toContain('slide-in-from-top')
    })

    it('should handle bottom drawer', () => {
      const classes = drawer('bottom')
      expect(classes).toContain('bottom-0')
      expect(classes).toContain('slide-in-from-bottom')
    })
  })

  describe('sheet', () => {
    it('should return sheet styles', () => {
      const classes = sheet()
      expect(classes).toContain('fixed')
      expect(classes).toContain('bottom-0')
      expect(classes).toContain('rounded-t-2xl')
    })
  })

  describe('sheetHandle', () => {
    it('should return handle styles', () => {
      const classes = sheetHandle()
      expect(classes).toContain('w-12')
      expect(classes).toContain('rounded-full')
    })
  })
})
