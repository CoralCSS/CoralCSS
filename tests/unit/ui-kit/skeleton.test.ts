import { describe, it, expect } from 'vitest'
import {
  skeleton,
  skeletonText,
  skeletonHeading,
  skeletonAvatar,
  skeletonImage,
  skeletonButton,
  skeletonCard,
  skeletonParagraph,
  skeletonTableRow,
  skeletonTableCell,
  skeletonListItem,
  skeletonInline,
  skeletonCircle,
  skeletonBadge,
  skeletonInput,
  skeletonPatterns,
} from '../../../src/ui-kit/skeleton'

describe('UI-Kit Skeleton', () => {
  describe('skeleton', () => {
    it('should return default skeleton styles', () => {
      const classes = skeleton()
      expect(classes).toContain('bg-slate-200')
      expect(classes).toContain('animate-pulse')
      expect(classes).toContain('rounded-lg')
    })

    it('should handle different variants', () => {
      expect(skeleton({ variant: 'pulse' })).toContain('animate-pulse')
      expect(skeleton({ variant: 'wave' })).toContain('animate-shimmer')
      expect(skeleton({ variant: 'none' })).not.toContain('animate-pulse')
    })

    it('should handle different radius', () => {
      expect(skeleton({ radius: 'none' })).toContain('rounded-none')
      expect(skeleton({ radius: 'full' })).toContain('rounded-full')
      expect(skeleton({ radius: '2xl' })).toContain('rounded-2xl')
    })
  })

  describe('skeletonText', () => {
    it('should return text skeleton styles', () => {
      const classes = skeletonText()
      expect(classes).toContain('h-4')
      expect(classes).toContain('w-full')
    })

    it('should handle different widths', () => {
      expect(skeletonText({ width: 'full' })).toContain('w-full')
      expect(skeletonText({ width: '3/4' })).toContain('w-3/4')
      expect(skeletonText({ width: '2/3' })).toContain('w-2/3')
      expect(skeletonText({ width: '1/2' })).toContain('w-1/2')
      expect(skeletonText({ width: '1/3' })).toContain('w-1/3')
      expect(skeletonText({ width: '1/4' })).toContain('w-1/4')
    })
  })

  describe('skeletonHeading', () => {
    it('should return default heading skeleton', () => {
      const classes = skeletonHeading()
      expect(classes).toContain('h-8')
      expect(classes).toContain('w-2/3')
    })

    it('should handle different heading levels', () => {
      expect(skeletonHeading({ level: 'h1' })).toContain('h-10')
      expect(skeletonHeading({ level: 'h2' })).toContain('h-8')
      expect(skeletonHeading({ level: 'h3' })).toContain('h-6')
      expect(skeletonHeading({ level: 'h4' })).toContain('h-5')
    })
  })

  describe('skeletonAvatar', () => {
    it('should return avatar skeleton styles', () => {
      const classes = skeletonAvatar()
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('w-10')
      expect(classes).toContain('h-10')
    })

    it('should handle different sizes', () => {
      expect(skeletonAvatar({ size: 'sm' })).toContain('w-8')
      expect(skeletonAvatar({ size: 'md' })).toContain('w-10')
      expect(skeletonAvatar({ size: 'lg' })).toContain('w-12')
      expect(skeletonAvatar({ size: 'xl' })).toContain('w-16')
    })
  })

  describe('skeletonImage', () => {
    it('should return image skeleton styles', () => {
      const classes = skeletonImage()
      expect(classes).toContain('w-full')
      expect(classes).toContain('aspect-video')
    })

    it('should handle different aspects', () => {
      expect(skeletonImage({ aspect: 'square' })).toContain('aspect-square')
      expect(skeletonImage({ aspect: 'video' })).toContain('aspect-video')
      expect(skeletonImage({ aspect: 'wide' })).toContain('aspect-[21/9]')
    })
  })

  describe('skeletonButton', () => {
    it('should return button skeleton styles', () => {
      const classes = skeletonButton()
      expect(classes).toContain('rounded-xl')
      expect(classes).toContain('h-10')
      expect(classes).toContain('w-24')
    })

    it('should handle different sizes', () => {
      expect(skeletonButton({ size: 'sm' })).toContain('h-8')
      expect(skeletonButton({ size: 'md' })).toContain('h-10')
      expect(skeletonButton({ size: 'lg' })).toContain('h-12')
    })
  })

  describe('skeletonCard', () => {
    it('should return card skeleton styles', () => {
      const classes = skeletonCard()
      expect(classes).toContain('bg-white')
      expect(classes).toContain('border')
      expect(classes).toContain('p-6')
      expect(classes).toContain('rounded-2xl')
    })

    it('should handle different radius', () => {
      const classes = skeletonCard({ radius: 'lg' })
      expect(classes).toContain('rounded-lg')
    })
  })

  describe('skeletonParagraph', () => {
    it('should return paragraph skeleton styles', () => {
      const classes = skeletonParagraph()
      expect(classes).toContain('space-y-3')
    })
  })

  describe('skeletonTableRow', () => {
    it('should return table row skeleton styles', () => {
      const classes = skeletonTableRow()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-4')
      expect(classes).toContain('py-4')
      expect(classes).toContain('border-b')
    })
  })

  describe('skeletonTableCell', () => {
    it('should return table cell skeleton styles', () => {
      const classes = skeletonTableCell()
      expect(classes).toContain('h-4')
      expect(classes).toContain('w-24')
    })

    it('should handle custom width', () => {
      const classes = skeletonTableCell({ width: 'w-32' })
      expect(classes).toContain('w-32')
    })
  })

  describe('skeletonListItem', () => {
    it('should return list item skeleton styles', () => {
      const classes = skeletonListItem()
      expect(classes).toContain('flex')
      expect(classes).toContain('items-center')
      expect(classes).toContain('gap-4')
      expect(classes).toContain('p-4')
    })
  })

  describe('skeletonInline', () => {
    it('should return inline skeleton styles', () => {
      const classes = skeletonInline()
      expect(classes).toContain('h-4')
      expect(classes).toContain('inline-block')
      expect(classes).toContain('w-20')
    })

    it('should handle custom width', () => {
      const classes = skeletonInline({ width: 'w-32' })
      expect(classes).toContain('w-32')
    })
  })

  describe('skeletonCircle', () => {
    it('should return circle skeleton styles', () => {
      const classes = skeletonCircle()
      expect(classes).toContain('rounded-full')
    })

    it('should handle string size', () => {
      const classes = skeletonCircle({ size: 'w-10 h-10' })
      expect(classes).toContain('w-10')
      expect(classes).toContain('h-10')
    })
  })

  describe('skeletonBadge', () => {
    it('should return badge skeleton styles', () => {
      const classes = skeletonBadge()
      expect(classes).toContain('rounded-full')
      expect(classes).toContain('h-5')
      expect(classes).toContain('w-16')
    })
  })

  describe('skeletonInput', () => {
    it('should return input skeleton styles', () => {
      const classes = skeletonInput()
      expect(classes).toContain('rounded-xl')
      expect(classes).toContain('h-10')
      expect(classes).toContain('w-full')
    })
  })

  describe('skeletonPatterns', () => {
    it('should return user profile pattern', () => {
      const pattern = skeletonPatterns.userProfile()
      expect(pattern.container).toContain('flex')
      expect(pattern.avatar).toContain('rounded-full')
      expect(pattern.name).toContain('w-3/4')
      expect(pattern.subtitle).toContain('w-1/2')
    })

    it('should return blog card pattern', () => {
      const pattern = skeletonPatterns.blogCard()
      expect(pattern.container).toBeDefined()
      expect(pattern.image).toBeDefined()
      expect(pattern.title).toBeDefined()
      expect(pattern.text).toBeDefined()
    })

    it('should return product card pattern', () => {
      const pattern = skeletonPatterns.productCard()
      expect(pattern.container).toBeDefined()
      expect(pattern.image).toContain('aspect-square')
      expect(pattern.title).toBeDefined()
      expect(pattern.price).toBeDefined()
      expect(pattern.button).toBeDefined()
    })

    it('should return comment pattern', () => {
      const pattern = skeletonPatterns.comment()
      expect(pattern.container).toContain('flex')
      expect(pattern.avatar).toBeDefined()
      expect(pattern.content).toBeDefined()
    })

    it('should handle wave variant in patterns', () => {
      const pattern = skeletonPatterns.userProfile('wave')
      expect(pattern.container).toContain('animate-shimmer')
    })
  })
})
