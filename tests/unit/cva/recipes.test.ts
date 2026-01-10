/**
 * Recipes Tests
 */
import { describe, it, expect } from 'vitest'
import {
  defineRecipe,
  defineSlotRecipe,
  createStyled,
  recipes,
  slotRecipes,
} from '../../../src/cva/recipes'

describe('defineRecipe', () => {
  it('should create a recipe with metadata', () => {
    const button = defineRecipe({
      name: 'button',
      description: 'A button component',
      jsx: ['Button'],
      base: 'px-4 py-2',
      variants: {
        size: {
          sm: 'text-sm',
          lg: 'text-lg',
        },
      },
      defaultVariants: {
        size: 'sm',
      },
    })

    expect(button.recipeName).toBe('button')
    expect(button.description).toBe('A button component')
    expect(button.jsx).toEqual(['Button'])
    expect(button.config.name).toBe('button')
  })

  it('should generate classes', () => {
    const button = defineRecipe({
      base: 'btn',
      variants: {
        variant: {
          primary: 'btn-primary',
          secondary: 'btn-secondary',
        },
      },
      defaultVariants: {
        variant: 'primary',
      },
    })

    expect(button()).toContain('btn')
    expect(button()).toContain('btn-primary')
    expect(button({ variant: 'secondary' })).toContain('btn-secondary')
  })
})

describe('defineSlotRecipe', () => {
  it('should create a slot recipe with base classes', () => {
    const card = defineSlotRecipe({
      name: 'card',
      slots: {
        root: 'card',
        header: 'card-header',
        body: 'card-body',
      },
    })

    const styles = card()
    expect(styles.root).toBe('card')
    expect(styles.header).toBe('card-header')
    expect(styles.body).toBe('card-body')
  })

  it('should expose slot names', () => {
    const card = defineSlotRecipe({
      slots: {
        root: '',
        header: '',
        body: '',
      },
    })

    expect(card.slots).toEqual(['root', 'header', 'body'])
  })

  it('should apply variant classes to slots', () => {
    const card = defineSlotRecipe({
      slots: {
        root: 'card',
        header: 'header',
      },
      variants: {
        size: {
          sm: {
            root: 'card-sm',
            header: 'header-sm',
          },
          lg: {
            root: 'card-lg',
            header: 'header-lg',
          },
        },
      },
    })

    const styles = card({ size: 'lg' })
    expect(styles.root).toContain('card-lg')
    expect(styles.header).toContain('header-lg')
  })

  it('should apply default variants', () => {
    const card = defineSlotRecipe({
      slots: {
        root: 'card',
      },
      variants: {
        size: {
          sm: { root: 'card-sm' },
          md: { root: 'card-md' },
        },
      },
      defaultVariants: {
        size: 'md',
      },
    })

    const styles = card()
    expect(styles.root).toContain('card-md')
    expect(card.defaultVariants).toEqual({ size: 'md' })
  })

  it('should apply compound variants', () => {
    const button = defineSlotRecipe({
      slots: {
        root: 'btn',
        icon: 'icon',
      },
      variants: {
        size: {
          sm: { root: 'btn-sm', icon: 'icon-sm' },
          lg: { root: 'btn-lg', icon: 'icon-lg' },
        },
        variant: {
          primary: { root: 'btn-primary', icon: '' },
          secondary: { root: 'btn-secondary', icon: '' },
        },
      },
      compoundVariants: [
        {
          size: 'lg',
          variant: 'primary',
          css: {
            root: 'compound-class',
            icon: 'compound-icon',
          },
        },
      ],
    })

    const styles = button({ size: 'lg', variant: 'primary' })
    expect(styles.root).toContain('compound-class')
    expect(styles.icon).toContain('compound-icon')
  })

  it('should not apply compound variants when conditions do not match', () => {
    const button = defineSlotRecipe({
      slots: {
        root: 'btn',
      },
      variants: {
        size: {
          sm: { root: 'btn-sm' },
          lg: { root: 'btn-lg' },
        },
        variant: {
          primary: { root: 'btn-primary' },
        },
      },
      compoundVariants: [
        {
          size: 'lg',
          variant: 'primary',
          css: { root: 'compound' },
        },
      ],
    })

    const styles = button({ size: 'sm', variant: 'primary' })
    expect(styles.root).not.toContain('compound')
  })

  it('should handle compound variants with array values', () => {
    const button = defineSlotRecipe({
      slots: {
        root: 'btn',
      },
      variants: {
        size: {
          sm: { root: 'btn-sm' },
          md: { root: 'btn-md' },
          lg: { root: 'btn-lg' },
        },
      },
      compoundVariants: [
        {
          size: ['sm', 'md'],
          css: { root: 'small-or-medium' },
        },
      ],
    })

    expect(button({ size: 'sm' }).root).toContain('small-or-medium')
    expect(button({ size: 'md' }).root).toContain('small-or-medium')
    expect(button({ size: 'lg' }).root).not.toContain('small-or-medium')
  })

  it('should expose variants and config', () => {
    const card = defineSlotRecipe({
      name: 'card',
      slots: {
        root: '',
      },
      variants: {
        size: {
          sm: { root: 'sm' },
        },
      },
    })

    expect(card.variants).toBeDefined()
    expect(card.config.name).toBe('card')
  })

  it('should handle missing slot classes in variants', () => {
    const card = defineSlotRecipe({
      slots: {
        root: 'card',
        header: 'header',
      },
      variants: {
        size: {
          sm: {
            root: 'card-sm',
            // header is intentionally missing
          },
        },
      },
    })

    const styles = card({ size: 'sm' })
    expect(styles.root).toContain('card-sm')
    expect(styles.header).toBe('header') // Should keep base class
  })

  it('should handle undefined variant value', () => {
    const card = defineSlotRecipe({
      slots: {
        root: 'card',
      },
      variants: {
        size: {
          sm: { root: 'card-sm' },
        },
      },
    })

    const styles = card({ size: undefined })
    expect(styles.root).toBe('card')
  })

  it('should handle null variant value', () => {
    const card = defineSlotRecipe({
      slots: {
        root: 'card',
      },
      variants: {
        size: {
          sm: { root: 'card-sm' },
        },
      },
    })

    const styles = card({ size: null as unknown as 'sm' })
    expect(styles.root).toBe('card')
  })
})

describe('createStyled', () => {
  it('should create a styled component factory', () => {
    const buttonRecipe = defineRecipe({
      base: 'btn',
      variants: {
        size: {
          sm: 'btn-sm',
          lg: 'btn-lg',
        },
      },
    })

    const styled = createStyled(buttonRecipe)
    const Button = styled('button')

    expect(Button.element).toBe('button')
    expect(Button.recipe).toBe(buttonRecipe)
    expect(Button.getClassName()).toContain('btn')
    expect(Button.getClassName({ size: 'lg' })).toContain('btn-lg')
  })

  it('should work with different elements', () => {
    const linkRecipe = defineRecipe({
      base: 'link',
    })

    const styled = createStyled(linkRecipe)
    const Anchor = styled('a')
    const Span = styled('span')

    expect(Anchor.element).toBe('a')
    expect(Span.element).toBe('span')
  })
})

describe('pre-built recipes', () => {
  it('should have button recipe', () => {
    expect(recipes.button).toBeDefined()
    expect(recipes.button.recipeName).toBe('button')
    expect(recipes.button()).toBeDefined()
  })

  it('should have badge recipe', () => {
    expect(recipes.badge).toBeDefined()
    expect(recipes.badge.recipeName).toBe('badge')
  })

  it('should have card recipe', () => {
    expect(recipes.card).toBeDefined()
    expect(recipes.card.recipeName).toBe('card')
  })

  it('should have input recipe', () => {
    expect(recipes.input).toBeDefined()
    expect(recipes.input.recipeName).toBe('input')
  })

  it('should apply button variants correctly', () => {
    const buttonClass = recipes.button({ variant: 'outline', size: 'lg' })
    expect(buttonClass).toContain('border')
    expect(buttonClass).toContain('h-11')
  })
})

describe('pre-built slot recipes', () => {
  it('should have card slot recipe', () => {
    expect(slotRecipes.card).toBeDefined()
    expect(slotRecipes.card.config.name).toBe('card')
    expect(slotRecipes.card.slots).toContain('root')
    expect(slotRecipes.card.slots).toContain('header')
    expect(slotRecipes.card.slots).toContain('body')
    expect(slotRecipes.card.slots).toContain('footer')
  })

  it('should have modal slot recipe', () => {
    expect(slotRecipes.modal).toBeDefined()
    expect(slotRecipes.modal.config.name).toBe('modal')
    expect(slotRecipes.modal.slots).toContain('overlay')
    expect(slotRecipes.modal.slots).toContain('content')
  })

  it('should apply card slot recipe variants', () => {
    const styles = slotRecipes.card({ size: 'lg' })
    expect(styles.header).toContain('px-8')
    expect(styles.body).toContain('px-8')
  })

  it('should apply modal slot recipe variants', () => {
    const styles = slotRecipes.modal({ size: 'xl' })
    expect(styles.content).toContain('max-w-xl')
  })
})
