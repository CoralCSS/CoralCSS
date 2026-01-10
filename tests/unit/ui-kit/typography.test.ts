import { describe, it, expect } from 'vitest'
import {
  heading,
  text,
  label,
  helperText,
  link,
  code,
  kbd,
  blockquote,
  lead,
  small,
  highlight,
  strikethrough,
  list,
  listItem,
  prose,
} from '../../../src/ui-kit/typography'

describe('UI-Kit Typography', () => {
  describe('heading', () => {
    it('should return h1 styles by default', () => {
      const classes = heading()
      expect(classes).toContain('text-4xl')
      expect(classes).toContain('font-bold')
      expect(classes).toContain('text-slate-900')
    })

    it('should handle different heading levels', () => {
      expect(heading('h1')).toContain('text-4xl')
      expect(heading('h2')).toContain('text-3xl')
      expect(heading('h3')).toContain('text-2xl')
      expect(heading('h4')).toContain('text-xl')
      expect(heading('h5')).toContain('text-lg')
      expect(heading('h6')).toContain('text-base')
    })

    it('should handle muted option', () => {
      const classes = heading('h1', { muted: true })
      expect(classes).toContain('text-slate-600')
    })

    it('should handle truncate option', () => {
      expect(heading('h1', { truncate: true })).toContain('truncate')
      expect(heading('h1', { truncate: 2 })).toContain('line-clamp-2')
    })

    it('should handle gradient option', () => {
      const classes = heading('h1', { gradient: true })
      expect(classes).toContain('bg-gradient-to-r')
      expect(classes).toContain('bg-clip-text')
      expect(classes).toContain('text-transparent')
    })

    it('should handle align option', () => {
      expect(heading('h1', { align: 'center' })).toContain('text-center')
      expect(heading('h1', { align: 'right' })).toContain('text-right')
    })
  })

  describe('text', () => {
    it('should return default text styles', () => {
      const classes = text()
      expect(classes).toContain('text-base')
      expect(classes).toContain('font-normal')
      expect(classes).toContain('text-slate-900')
    })

    it('should handle different sizes', () => {
      expect(text({ size: 'xs' })).toContain('text-xs')
      expect(text({ size: 'sm' })).toContain('text-sm')
      expect(text({ size: 'lg' })).toContain('text-lg')
      expect(text({ size: '2xl' })).toContain('text-2xl')
    })

    it('should handle different weights', () => {
      expect(text({ weight: 'thin' })).toContain('font-thin')
      expect(text({ weight: 'bold' })).toContain('font-bold')
      expect(text({ weight: 'semibold' })).toContain('font-semibold')
    })

    it('should handle muted option', () => {
      const classes = text({ muted: true })
      expect(classes).toContain('text-slate-600')
    })

    it('should handle truncate option', () => {
      expect(text({ truncate: true })).toContain('truncate')
      expect(text({ truncate: 3 })).toContain('line-clamp-3')
    })

    it('should handle gradient option', () => {
      const classes = text({ gradient: true })
      expect(classes).toContain('bg-gradient-to-r')
    })

    it('should handle align option', () => {
      expect(text({ align: 'left' })).toContain('text-left')
      expect(text({ align: 'justify' })).toContain('text-justify')
    })
  })

  describe('label', () => {
    it('should return default label styles', () => {
      const classes = label()
      expect(classes).toContain('block')
      expect(classes).toContain('text-sm')
      expect(classes).toContain('font-medium')
    })

    it('should handle required option', () => {
      const classes = label({ required: true })
      expect(classes).toContain("after:content-['*']")
      expect(classes).toContain('after:text-red-500')
    })

    it('should handle disabled option', () => {
      const classes = label({ disabled: true })
      expect(classes).toContain('opacity-50')
    })
  })

  describe('helperText', () => {
    it('should return default helper text styles', () => {
      const classes = helperText()
      expect(classes).toContain('text-sm')
      expect(classes).toContain('text-slate-500')
    })

    it('should handle error option', () => {
      const classes = helperText({ error: true })
      expect(classes).toContain('text-red-600')
    })
  })

  describe('link', () => {
    it('should return default link styles', () => {
      const classes = link()
      expect(classes).toContain('transition-colors')
      expect(classes).toContain('text-coral-600')
    })

    it('should handle different variants', () => {
      expect(link({ variant: 'default' })).toContain('text-coral-600')
      expect(link({ variant: 'subtle' })).toContain('text-slate-600')
      expect(link({ variant: 'underline' })).toContain('underline')
    })

    it('should handle external option', () => {
      const classes = link({ external: true })
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
    })
  })

  describe('code', () => {
    it('should return inline code styles', () => {
      const classes = code()
      expect(classes).toContain('font-mono')
      expect(classes).toContain('text-sm')
      expect(classes).toContain('px-1.5')
      expect(classes).toContain('rounded')
    })

    it('should return block code styles', () => {
      const classes = code({ block: true })
      expect(classes).toContain('block')
      expect(classes).toContain('p-4')
      expect(classes).toContain('rounded-xl')
      expect(classes).toContain('overflow-x-auto')
    })
  })

  describe('kbd', () => {
    it('should return keyboard styles', () => {
      const classes = kbd()
      expect(classes).toContain('inline-flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('border')
      expect(classes).toContain('rounded')
      expect(classes).toContain('shadow-sm')
    })
  })

  describe('blockquote', () => {
    it('should return blockquote styles', () => {
      const classes = blockquote()
      expect(classes).toContain('pl-4')
      expect(classes).toContain('border-l-4')
      expect(classes).toContain('border-coral-500')
      expect(classes).toContain('italic')
    })
  })

  describe('lead', () => {
    it('should return lead paragraph styles', () => {
      const classes = lead()
      expect(classes).toContain('text-xl')
      expect(classes).toContain('leading-relaxed')
    })
  })

  describe('small', () => {
    it('should return small text styles', () => {
      const classes = small()
      expect(classes).toContain('text-xs')
      expect(classes).toContain('text-slate-500')
    })
  })

  describe('highlight', () => {
    it('should return default highlight styles', () => {
      const classes = highlight()
      expect(classes).toContain('bg-yellow-200')
      expect(classes).toContain('px-1')
      expect(classes).toContain('rounded')
    })

    it('should handle different colors', () => {
      const classes = highlight('blue')
      expect(classes).toContain('bg-blue-200')
    })
  })

  describe('strikethrough', () => {
    it('should return strikethrough styles', () => {
      const classes = strikethrough()
      expect(classes).toContain('line-through')
      expect(classes).toContain('text-slate-500')
    })
  })

  describe('list', () => {
    it('should return default list styles', () => {
      const classes = list()
      expect(classes).toContain('list-disc')
      expect(classes).toContain('list-inside')
      expect(classes).toContain('space-y-2')
    })

    it('should handle different variants', () => {
      expect(list({ variant: 'disc' })).toContain('list-disc')
      expect(list({ variant: 'decimal' })).toContain('list-decimal')
      expect(list({ variant: 'none' })).toContain('list-none')
    })

    it('should handle different spacing', () => {
      expect(list({ spacing: 'tight' })).toContain('space-y-1')
      expect(list({ spacing: 'normal' })).toContain('space-y-2')
      expect(list({ spacing: 'loose' })).toContain('space-y-3')
    })
  })

  describe('listItem', () => {
    it('should return list item styles', () => {
      const classes = listItem()
      expect(classes).toContain('text-slate-700')
    })
  })

  describe('prose', () => {
    it('should return default prose styles', () => {
      const classes = prose()
      expect(classes).toContain('prose')
      expect(classes).toContain('prose-slate')
      expect(classes).toContain('max-w-none')
    })

    it('should handle different sizes', () => {
      expect(prose({ size: 'sm' })).toContain('prose-sm')
      expect(prose({ size: 'base' })).toContain('prose')
      expect(prose({ size: 'lg' })).toContain('prose-lg')
    })
  })
})
