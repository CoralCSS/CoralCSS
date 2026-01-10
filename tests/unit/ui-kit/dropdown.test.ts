import { describe, it, expect } from 'vitest'
import {
  dropdown,
  dropdownItem,
  dropdownItemIcon,
  dropdownItemShortcut,
  dropdownDivider,
  dropdownLabel,
  dropdownCheckItem,
  dropdownCheckIndicator,
  dropdownRadioItem,
  dropdownRadioIndicator,
  dropdownSubmenuTrigger,
  dropdownSubmenu,
  contextMenu,
  commandMenu,
  commandMenuInput,
  commandMenuList,
  commandMenuGroup,
  commandMenuGroupHeading,
  commandMenuItem,
  commandMenuFooter,
} from '../../../src/ui-kit/dropdown'

describe('UI-Kit Dropdown', () => {
  describe('dropdown', () => {
    it('should return default dropdown styles', () => {
      const classes = dropdown()
      expect(classes).toContain('bg-white')
      expect(classes).toContain('shadow-xl')
      expect(classes).toContain('border')
      expect(classes).toContain('rounded-xl')
      expect(classes).toContain('z-50')
    })

    it('should handle different radius', () => {
      expect(dropdown({ radius: 'none' })).toContain('rounded-none')
      expect(dropdown({ radius: 'lg' })).toContain('rounded-lg')
      expect(dropdown({ radius: '2xl' })).toContain('rounded-2xl')
    })

    it('should handle different widths', () => {
      expect(dropdown({ width: 'auto' })).toContain('min-w-[12rem]')
      expect(dropdown({ width: 'sm' })).toContain('w-48')
      expect(dropdown({ width: 'md' })).toContain('w-56')
      expect(dropdown({ width: 'lg' })).toContain('w-64')
      expect(dropdown({ width: 'trigger' })).toContain('w-full')
    })
  })

  describe('dropdownItem', () => {
    it('should return default item styles', () => {
      const classes = dropdownItem()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-2')
      expect(classes).toContain('cursor-pointer')
    })

    it('should handle active state', () => {
      const classes = dropdownItem({ active: true })
      expect(classes).toContain('bg-slate-50')
    })

    it('should handle disabled state', () => {
      const classes = dropdownItem({ disabled: true })
      expect(classes).toContain('opacity-50')
      expect(classes).toContain('cursor-not-allowed')
      expect(classes).toContain('pointer-events-none')
    })

    it('should handle destructive state', () => {
      const classes = dropdownItem({ destructive: true })
      expect(classes).toContain('text-red-600')
    })

    it('should handle active destructive state', () => {
      const classes = dropdownItem({ active: true, destructive: true })
      expect(classes).toContain('bg-red-50')
    })
  })

  describe('dropdownItemIcon', () => {
    it('should return icon styles', () => {
      const classes = dropdownItemIcon()
      expect(classes).toContain('text-slate-400')
      expect(classes).toContain('flex-shrink-0')
    })
  })

  describe('dropdownItemShortcut', () => {
    it('should return shortcut styles', () => {
      const classes = dropdownItemShortcut()
      expect(classes).toContain('ml-auto')
      expect(classes).toContain('text-xs')
      expect(classes).toContain('text-slate-400')
    })
  })

  describe('dropdownDivider', () => {
    it('should return divider styles', () => {
      const classes = dropdownDivider()
      expect(classes).toContain('my-1')
      expect(classes).toContain('border-t')
    })
  })

  describe('dropdownLabel', () => {
    it('should return label styles', () => {
      const classes = dropdownLabel()
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-2')
      expect(classes).toContain('text-xs')
      expect(classes).toContain('font-semibold')
      expect(classes).toContain('uppercase')
      expect(classes).toContain('tracking-wider')
    })
  })

  describe('dropdownCheckItem', () => {
    it('should return unchecked item styles', () => {
      const classes = dropdownCheckItem()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should handle checked state', () => {
      const classes = dropdownCheckItem({ checked: true })
      expect(classes).toContain('bg-coral-50')
      expect(classes).toContain('text-coral-700')
    })
  })

  describe('dropdownCheckIndicator', () => {
    it('should return unchecked indicator styles', () => {
      const classes = dropdownCheckIndicator()
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('border-2')
      expect(classes).toContain('rounded')
      expect(classes).toContain('border-slate-300')
    })

    it('should return checked indicator styles', () => {
      const classes = dropdownCheckIndicator(true)
      expect(classes).toContain('bg-coral-500')
      expect(classes).toContain('border-coral-500')
      expect(classes).toContain('text-white')
    })
  })

  describe('dropdownRadioItem', () => {
    it('should return unselected item styles', () => {
      const classes = dropdownRadioItem()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
    })

    it('should handle selected state', () => {
      const classes = dropdownRadioItem({ selected: true })
      expect(classes).toContain('bg-coral-50')
      expect(classes).toContain('text-coral-700')
    })
  })

  describe('dropdownRadioIndicator', () => {
    it('should return unselected indicator styles', () => {
      const classes = dropdownRadioIndicator()
      expect(classes).toContain('w-4')
      expect(classes).toContain('h-4')
      expect(classes).toContain('border-2')
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('border-slate-300')
    })

    it('should return selected indicator styles', () => {
      const classes = dropdownRadioIndicator(true)
      expect(classes).toContain('border-coral-500')
      expect(classes).toContain('after:bg-coral-500')
    })
  })

  describe('dropdownSubmenuTrigger', () => {
    it('should return submenu trigger styles', () => {
      const classes = dropdownSubmenuTrigger()
      expect(classes).toContain('flex')
      expect(classes).toContain('justify-between')
    })
  })

  describe('dropdownSubmenu', () => {
    it('should return submenu styles', () => {
      const classes = dropdownSubmenu()
      expect(classes).toContain('bg-white')
      expect(classes).toContain('shadow-xl')
    })
  })

  describe('contextMenu', () => {
    it('should return context menu styles', () => {
      const classes = contextMenu()
      expect(classes).toContain('fixed')
      expect(classes).toContain('bg-white')
      expect(classes).toContain('shadow-xl')
    })
  })

  describe('commandMenu', () => {
    it('should return command menu styles', () => {
      const classes = commandMenu()
      expect(classes).toContain('w-full')
      expect(classes).toContain('max-w-lg')
      expect(classes).toContain('rounded-2xl')
      expect(classes).toContain('shadow-2xl')
      expect(classes).toContain('overflow-hidden')
    })
  })

  describe('commandMenuInput', () => {
    it('should return input styles', () => {
      const classes = commandMenuInput()
      expect(classes).toContain('w-full')
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-4')
      expect(classes).toContain('bg-transparent')
      expect(classes).toContain('border-b')
      expect(classes).toContain('focus:outline-none')
    })
  })

  describe('commandMenuList', () => {
    it('should return list styles', () => {
      const classes = commandMenuList()
      expect(classes).toContain('max-h-80')
      expect(classes).toContain('overflow-y-auto')
      expect(classes).toContain('py-2')
    })
  })

  describe('commandMenuGroup', () => {
    it('should return group styles', () => {
      const classes = commandMenuGroup()
      expect(classes).toContain('px-2')
      expect(classes).toContain('py-1')
    })
  })

  describe('commandMenuGroupHeading', () => {
    it('should return heading styles', () => {
      const classes = commandMenuGroupHeading()
      expect(classes).toContain('px-2')
      expect(classes).toContain('text-xs')
      expect(classes).toContain('font-semibold')
      expect(classes).toContain('text-slate-500')
    })
  })

  describe('commandMenuItem', () => {
    it('should return default item styles', () => {
      const classes = commandMenuItem()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('px-3')
      expect(classes).toContain('py-2')
      expect(classes).toContain('rounded-lg')
      expect(classes).toContain('cursor-pointer')
    })

    it('should handle active state', () => {
      const classes = commandMenuItem({ active: true })
      expect(classes).toContain('bg-coral-50')
      expect(classes).toContain('text-coral-700')
    })
  })

  describe('commandMenuFooter', () => {
    it('should return footer styles', () => {
      const classes = commandMenuFooter()
      expect(classes).toContain('px-4')
      expect(classes).toContain('py-3')
      expect(classes).toContain('border-t')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-4')
      expect(classes).toContain('text-xs')
    })
  })
})
