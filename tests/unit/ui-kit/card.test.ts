import { describe, it, expect } from 'vitest'
import {
  card,
  cardHeader,
  cardTitle,
  cardDescription,
  cardBody,
  cardFooter,
  cardMedia,
  statCard,
  featureCard,
  featureCardIcon,
} from '../../../src/ui-kit/card'

describe('UI Kit Card', () => {
  describe('card', () => {
    it('should generate base card classes', () => {
      const classes = card()
      expect(classes).toContain('bg-white')
      expect(classes).toContain('overflow-hidden')
      expect(classes).toContain('transition-all')
    })

    it('should apply elevated variant', () => {
      const classes = card({ variant: 'elevated' })
      expect(classes).toContain('shadow-lg')
      expect(classes).toContain('hover:shadow-xl')
    })

    it('should apply outlined variant (default)', () => {
      const classes = card({ variant: 'outlined' })
      expect(classes).toContain('border')
      expect(classes).toContain('border-slate-200')
    })

    it('should apply filled variant', () => {
      const classes = card({ variant: 'filled' })
      expect(classes).toContain('bg-slate-50')
    })

    it('should apply ghost variant', () => {
      const classes = card({ variant: 'ghost' })
      expect(classes).toContain('bg-white')
    })

    it('should apply radius styles', () => {
      expect(card({ radius: 'none' })).toContain('rounded-none')
      expect(card({ radius: 'md' })).toContain('rounded-md')
      expect(card({ radius: 'lg' })).toContain('rounded-lg')
      expect(card({ radius: 'full' })).toContain('rounded-full')
    })

    it('should apply padding none', () => {
      const classes = card({ padding: 'none' })
      expect(classes).not.toContain('p-')
    })

    it('should apply padding sm', () => {
      const classes = card({ padding: 'sm' })
      expect(classes).toContain('p-4')
    })

    it('should apply padding md (default)', () => {
      const classes = card({ padding: 'md' })
      expect(classes).toContain('p-6')
    })

    it('should apply padding lg', () => {
      const classes = card({ padding: 'lg' })
      expect(classes).toContain('p-8')
    })

    it('should apply interactive state', () => {
      const classes = card({ interactive: true })
      expect(classes).toContain('cursor-pointer')
      expect(classes).toContain('hover:border-coral-500')
      expect(classes).toContain('hover:shadow-lg')
    })

    it('should not apply interactive by default', () => {
      const classes = card()
      expect(classes).not.toContain('cursor-pointer')
    })

    it('should apply selected state', () => {
      const classes = card({ selected: true })
      expect(classes).toContain('border-coral-500')
      expect(classes).toContain('ring-2')
    })
  })

  describe('cardHeader', () => {
    it('should generate header styles with divider by default', () => {
      const classes = cardHeader()
      expect(classes).toContain('px-6')
      expect(classes).toContain('py-4')
      expect(classes).toContain('border-b')
    })

    it('should not show divider when disabled', () => {
      const classes = cardHeader({ divider: false })
      expect(classes).not.toContain('border-b')
    })
  })

  describe('cardTitle', () => {
    it('should generate title styles', () => {
      const classes = cardTitle()
      expect(classes).toContain('text-lg')
      expect(classes).toContain('font-semibold')
      expect(classes).toContain('text-slate-900')
    })
  })

  describe('cardDescription', () => {
    it('should generate description styles', () => {
      const classes = cardDescription()
      expect(classes).toContain('text-sm')
      expect(classes).toContain('text-slate-500')
      expect(classes).toContain('mt-1')
    })
  })

  describe('cardBody', () => {
    it('should generate body styles with default padding', () => {
      const classes = cardBody()
      expect(classes).toContain('p-6')
    })

    it('should apply padding sm', () => {
      const classes = cardBody({ padding: 'sm' })
      expect(classes).toBe('p-4')
    })

    it('should apply padding lg', () => {
      const classes = cardBody({ padding: 'lg' })
      expect(classes).toBe('p-8')
    })
  })

  describe('cardFooter', () => {
    it('should generate footer styles with divider by default', () => {
      const classes = cardFooter()
      expect(classes).toContain('px-6')
      expect(classes).toContain('py-4')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-3')
      expect(classes).toContain('border-t')
      expect(classes).toContain('bg-slate-50')
    })

    it('should not show divider when disabled', () => {
      const classes = cardFooter({ divider: false })
      expect(classes).not.toContain('border-t')
    })

    it('should apply justify start', () => {
      const classes = cardFooter({ justify: 'start' })
      expect(classes).toContain('justify-start')
    })

    it('should apply justify center', () => {
      const classes = cardFooter({ justify: 'center' })
      expect(classes).toContain('justify-center')
    })

    it('should apply justify end (default)', () => {
      const classes = cardFooter({ justify: 'end' })
      expect(classes).toContain('justify-end')
    })

    it('should apply justify between', () => {
      const classes = cardFooter({ justify: 'between' })
      expect(classes).toContain('justify-between')
    })
  })

  describe('cardMedia', () => {
    it('should generate media styles with video aspect by default', () => {
      const classes = cardMedia()
      expect(classes).toContain('w-full')
      expect(classes).toContain('object-cover')
      expect(classes).toContain('aspect-video')
    })

    it('should apply square aspect', () => {
      const classes = cardMedia({ aspect: 'square' })
      expect(classes).toContain('aspect-square')
    })

    it('should apply wide aspect', () => {
      const classes = cardMedia({ aspect: 'wide' })
      expect(classes).toContain('aspect-[21/9]')
    })

    it('should apply auto aspect', () => {
      const classes = cardMedia({ aspect: 'auto' })
      expect(classes).not.toContain('aspect-')
    })

    it('should apply bottom position', () => {
      const classes = cardMedia({ position: 'bottom' })
      expect(classes).toContain('order-last')
    })

    it('should not apply order for top position', () => {
      const classes = cardMedia({ position: 'top' })
      expect(classes).not.toContain('order-last')
    })
  })

  describe('statCard', () => {
    it('should extend card styles', () => {
      const classes = statCard()
      expect(classes).toContain('bg-white')
      expect(classes).toContain('border')
    })

    it('should apply up trend', () => {
      const classes = statCard({ trend: 'up' })
      expect(classes).toContain('border-l-4')
      expect(classes).toContain('border-l-green-500')
    })

    it('should apply down trend', () => {
      const classes = statCard({ trend: 'down' })
      expect(classes).toContain('border-l-4')
      expect(classes).toContain('border-l-red-500')
    })

    it('should apply custom color', () => {
      const classes = statCard({ color: 'blue' })
      expect(classes).toContain('border-l-4')
      expect(classes).toContain('border-l-blue-500')
    })
  })

  describe('featureCard', () => {
    it('should extend card with interactive', () => {
      const classes = featureCard()
      expect(classes).toContain('cursor-pointer')
      expect(classes).toContain('group')
    })
  })

  describe('featureCardIcon', () => {
    it('should generate icon container styles', () => {
      const classes = featureCardIcon()
      expect(classes).toContain('w-12')
      expect(classes).toContain('h-12')
      expect(classes).toContain('rounded-xl')
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('justify-center')
      expect(classes).toContain('mb-4')
    })

    it('should apply group hover transition', () => {
      const classes = featureCardIcon()
      expect(classes).toContain('group-hover:scale-110')
      expect(classes).toContain('transition-transform')
    })

    it('should apply coral color by default', () => {
      const classes = featureCardIcon()
      expect(classes).toContain('bg-coral-100')
    })

    it('should apply custom color', () => {
      const classes = featureCardIcon('blue')
      expect(classes).toContain('bg-blue-100')
    })
  })
})
