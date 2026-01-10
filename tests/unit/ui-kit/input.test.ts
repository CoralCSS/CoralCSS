import { describe, it, expect } from 'vitest'
import {
  input,
  inputWrapper,
  inputIcon,
  inputLabel,
  inputHelper,
  textarea,
  select,
  checkbox,
  radio,
  switchTrack,
  switchThumb,
} from '../../../src/ui-kit/input'

describe('UI Kit Input', () => {
  describe('input', () => {
    it('should generate base input classes', () => {
      const classes = input()
      expect(classes).toContain('transition-all')
      expect(classes).toContain('focus:outline-none')
      expect(classes).toContain('text-slate-900')
    })

    it('should apply default variant', () => {
      const classes = input({ variant: 'default' })
      expect(classes).toContain('bg-white')
      expect(classes).toContain('border')
      expect(classes).toContain('border-slate-200')
    })

    it('should apply filled variant', () => {
      const classes = input({ variant: 'filled' })
      expect(classes).toContain('bg-slate-100')
      expect(classes).toContain('border-2')
      expect(classes).toContain('border-transparent')
    })

    it('should apply flushed variant', () => {
      const classes = input({ variant: 'flushed' })
      expect(classes).toContain('bg-transparent')
      expect(classes).toContain('border-b-2')
      expect(classes).toContain('rounded-none')
    })

    it('should apply error state', () => {
      const classes = input({ error: true })
      expect(classes).toContain('border-red-500')
    })

    it('should apply error state with filled variant', () => {
      const classes = input({ variant: 'filled', error: true })
      expect(classes).toContain('bg-red-50')
    })

    it('should apply size xs', () => {
      const classes = input({ size: 'xs' })
      expect(classes).toContain('text-xs')
      expect(classes).toContain('px-2.5')
      expect(classes).toContain('py-1.5')
    })

    it('should apply size md (default)', () => {
      const classes = input({ size: 'md' })
      expect(classes).toContain('text-sm')
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-2.5')
    })

    it('should apply size lg', () => {
      const classes = input({ size: 'lg' })
      expect(classes).toContain('text-base')
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-3')
    })

    it('should apply radius styles', () => {
      expect(input({ radius: 'none' })).toContain('rounded-none')
      expect(input({ radius: 'md' })).toContain('rounded-md')
      expect(input({ radius: 'full' })).toContain('rounded-full')
    })

    it('should not apply radius for flushed variant', () => {
      const classes = input({ variant: 'flushed', radius: 'full' })
      expect(classes).not.toContain('rounded-full')
    })

    it('should apply full width by default', () => {
      const classes = input()
      expect(classes).toContain('w-full')
    })

    it('should not apply full width when disabled', () => {
      const classes = input({ fullWidth: false })
      expect(classes).not.toContain('w-full')
    })

    it('should apply disabled state', () => {
      const classes = input({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
    })
  })

  describe('inputWrapper', () => {
    it('should generate relative wrapper', () => {
      const classes = inputWrapper()
      expect(classes).toContain('relative')
    })

    it('should apply left icon padding', () => {
      const classes = inputWrapper({ hasLeftIcon: true })
      expect(classes).toContain('[&>input]:pl-10')
    })

    it('should apply right icon padding', () => {
      const classes = inputWrapper({ hasRightIcon: true })
      expect(classes).toContain('[&>input]:pr-10')
    })

    it('should apply both icon paddings', () => {
      const classes = inputWrapper({ hasLeftIcon: true, hasRightIcon: true })
      expect(classes).toContain('[&>input]:pl-10')
      expect(classes).toContain('[&>input]:pr-10')
    })
  })

  describe('inputIcon', () => {
    it('should apply left icon styles', () => {
      const classes = inputIcon('left')
      expect(classes).toContain('absolute')
      expect(classes).toContain('top-1/2')
      expect(classes).toContain('left-3')
    })

    it('should apply right icon styles', () => {
      const classes = inputIcon('right')
      expect(classes).toContain('absolute')
      expect(classes).toContain('right-3')
    })

    it('should default to left', () => {
      const classes = inputIcon()
      expect(classes).toContain('left-3')
    })
  })

  describe('inputLabel', () => {
    it('should generate label styles', () => {
      const classes = inputLabel()
      expect(classes).toContain('block')
      expect(classes).toContain('text-sm')
      expect(classes).toContain('font-medium')
      expect(classes).toContain('mb-2')
    })

    it('should apply required indicator', () => {
      const classes = inputLabel({ required: true })
      expect(classes).toContain("after:content-['*']")
      expect(classes).toContain('after:text-red-500')
    })

    it('should apply error state', () => {
      const classes = inputLabel({ error: true })
      expect(classes).toContain('text-red-600')
    })

    it('should not apply error by default', () => {
      const classes = inputLabel()
      expect(classes).toContain('text-slate-700')
    })
  })

  describe('inputHelper', () => {
    it('should generate helper text styles', () => {
      const classes = inputHelper()
      expect(classes).toContain('text-xs')
      expect(classes).toContain('mt-1.5')
      expect(classes).toContain('text-slate-500')
    })

    it('should apply error state', () => {
      const classes = inputHelper(true)
      expect(classes).toContain('text-red-600')
    })
  })

  describe('textarea', () => {
    it('should extend input styles', () => {
      const classes = textarea()
      expect(classes).toContain('transition-all')
      expect(classes).toContain('min-h-[100px]')
    })

    it('should apply resize vertical by default', () => {
      const classes = textarea()
      expect(classes).toContain('resize-y')
    })

    it('should apply resize none', () => {
      const classes = textarea({ resize: 'none' })
      expect(classes).toContain('resize-none')
    })

    it('should apply resize horizontal', () => {
      const classes = textarea({ resize: 'horizontal' })
      expect(classes).toContain('resize-x')
    })

    it('should apply resize both', () => {
      const classes = textarea({ resize: 'both' })
      expect(classes).toContain('resize')
    })

    it('should pass through input options', () => {
      const classes = textarea({ error: true })
      expect(classes).toContain('border-red-500')
    })
  })

  describe('select', () => {
    it('should extend input styles', () => {
      const classes = select()
      expect(classes).toContain('transition-all')
    })

    it('should apply appearance-none', () => {
      const classes = select()
      expect(classes).toContain('appearance-none')
      expect(classes).toContain('cursor-pointer')
    })

    it('should apply custom arrow styling', () => {
      const classes = select()
      expect(classes).toContain('bg-no-repeat')
      expect(classes).toContain('pr-10')
    })

    it('should pass through input options', () => {
      const classes = select({ error: true })
      expect(classes).toContain('border-red-500')
    })
  })

  describe('checkbox', () => {
    it('should generate checkbox styles', () => {
      const classes = checkbox()
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('rounded')
      expect(classes).toContain('border-2')
      expect(classes).toContain('cursor-pointer')
    })

    it('should apply error state', () => {
      const classes = checkbox({ error: true })
      expect(classes).toContain('border-red-500')
      expect(classes).toContain('text-red-500')
    })

    it('should apply disabled state', () => {
      const classes = checkbox({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
    })
  })

  describe('radio', () => {
    it('should generate radio styles', () => {
      const classes = radio()
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('border-2')
      expect(classes).toContain('cursor-pointer')
    })

    it('should apply error state', () => {
      const classes = radio({ error: true })
      expect(classes).toContain('border-red-500')
    })

    it('should apply disabled state', () => {
      const classes = radio({ disabled: true })
      expect(classes).toContain('opacity-50')
    })
  })

  describe('switchTrack', () => {
    it('should generate track styles', () => {
      const classes = switchTrack()
      expect(classes).toContain('relative')
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('cursor-pointer')
    })

    it('should apply checked state', () => {
      const classes = switchTrack({ checked: true })
      expect(classes).toContain('bg-coral-500')
    })

    it('should apply unchecked state', () => {
      const classes = switchTrack({ checked: false })
      expect(classes).toContain('bg-slate-200')
    })

    it('should apply disabled state', () => {
      const classes = switchTrack({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
    })

    it('should apply size sm', () => {
      const classes = switchTrack({ size: 'sm' })
      expect(classes).toContain('w-8')
      expect(classes).toContain('h-4')
    })

    it('should apply size md', () => {
      const classes = switchTrack({ size: 'md' })
      expect(classes).toContain('w-11')
      expect(classes).toContain('h-6')
    })

    it('should apply size lg', () => {
      const classes = switchTrack({ size: 'lg' })
      expect(classes).toContain('w-14')
      expect(classes).toContain('h-7')
    })
  })

  describe('switchThumb', () => {
    it('should generate thumb styles', () => {
      const classes = switchThumb()
      expect(classes).toContain('inline-block')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('bg-white')
      expect(classes).toContain('shadow')
      expect(classes).toContain('transition-transform')
    })

    it('should apply checked translate', () => {
      const classes = switchThumb({ checked: true, size: 'md' })
      expect(classes).toContain('translate-x-5')
    })

    it('should apply unchecked translate', () => {
      const classes = switchThumb({ checked: false, size: 'md' })
      expect(classes).toContain('translate-x-1')
    })

    it('should apply size sm', () => {
      const classes = switchThumb({ size: 'sm' })
      expect(classes).toContain('w-3')
      expect(classes).toContain('h-3')
    })

    it('should apply size lg', () => {
      const classes = switchThumb({ size: 'lg' })
      expect(classes).toContain('w-5')
      expect(classes).toContain('h-5')
    })
  })
})
