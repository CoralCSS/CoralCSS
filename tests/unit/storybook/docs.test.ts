import { describe, it, expect } from 'vitest'
import {
  createStoryDoc,
  generateClassDoc,
  createPropsTable,
  createExamplesMarkdown,
  generateComponentDoc,
  type StoryDocConfig,
  type PropDoc,
  type ExampleDoc,
} from '../../../src/storybook/docs'

describe('Storybook Docs', () => {
  describe('createStoryDoc', () => {
    const baseConfig: StoryDocConfig = {
      name: 'Button',
      description: 'A button component',
      classes: ['bg-coral-500', 'px-4', 'py-2'],
    }

    it('should create story doc with title', () => {
      const doc = createStoryDoc(baseConfig)
      expect(doc.title).toBe('Button')
    })

    it('should include docs parameters', () => {
      const doc = createStoryDoc(baseConfig)
      expect(doc.parameters.docs.description.component).toBe('A button component')
      expect(doc.parameters.docs.source.language).toBe('html')
    })

    it('should include coralCSS parameters', () => {
      const doc = createStoryDoc(baseConfig)
      expect(doc.parameters.coralCSS.classes).toContain('bg-coral-500')
    })

    it('should include variants', () => {
      const doc = createStoryDoc({
        ...baseConfig,
        variants: {
          primary: ['bg-coral-500', 'text-white'],
          secondary: ['bg-gray-200'],
        },
      })

      expect(doc.parameters.coralCSS.variants.primary).toEqual(['bg-coral-500', 'text-white'])
    })

    it('should create argTypes from props', () => {
      const doc = createStoryDoc({
        ...baseConfig,
        props: [
          { name: 'variant', type: 'string', defaultValue: 'primary' },
          { name: 'size', type: 'string', options: ['sm', 'md', 'lg'] },
        ],
      })

      expect(doc.argTypes.variant).toBeDefined()
      expect(doc.argTypes.size).toBeDefined()
      expect((doc.argTypes.size as Record<string, unknown>).options).toEqual(['sm', 'md', 'lg'])
    })

    it('should create default args', () => {
      const doc = createStoryDoc({
        ...baseConfig,
        props: [
          { name: 'variant', type: 'string', defaultValue: 'primary' },
        ],
      })

      expect(doc.args.variant).toBe('primary')
    })

    it('should include autodocs tag', () => {
      const doc = createStoryDoc(baseConfig)
      expect(doc.tags).toContain('autodocs')
    })

    it('should include __coralDoc metadata', () => {
      const doc = createStoryDoc({
        ...baseConfig,
        examples: [{ title: 'Basic', code: '<button>Click</button>' }],
        related: ['Input', 'Link'],
      })

      expect(doc.__coralDoc.name).toBe('Button')
      expect(doc.__coralDoc.examples.length).toBe(1)
      expect(doc.__coralDoc.related).toContain('Input')
    })

    it('should generate CSS for all classes', () => {
      const doc = createStoryDoc(baseConfig)
      expect(typeof doc.parameters.coralCSS.generatedCSS).toBe('string')
    })
  })

  describe('generateClassDoc', () => {
    it('should return classes', () => {
      const doc = generateClassDoc(['bg-red-500', 'p-4'])
      expect(doc.classes).toEqual(['bg-red-500', 'p-4'])
    })

    it('should generate CSS', () => {
      const doc = generateClassDoc(['bg-red-500'])
      expect(typeof doc.css).toBe('string')
    })

    it('should parse class breakdown', () => {
      const doc = generateClassDoc(['hover:bg-red-500'])
      expect(doc.breakdown[0].variants).toContain('hover')
      // utility is bg-red, value is 500 (after last dash with numeric value)
      expect(doc.breakdown[0].utility).toBe('bg-red')
      expect(doc.breakdown[0].value).toBe('500')
    })

    it('should detect arbitrary values', () => {
      const doc = generateClassDoc(['p-[17px]'])
      expect(doc.breakdown[0].isArbitrary).toBe(true)
      expect(doc.breakdown[0].value).toBe('17px')
    })

    it('should detect negative values', () => {
      const doc = generateClassDoc(['-mt-4'])
      expect(doc.breakdown[0].isNegative).toBe(true)
    })

    it('should return formatted CSS', () => {
      const doc = generateClassDoc(['bg-red-500'])
      expect(typeof doc.formatted).toBe('string')
    })

    it('should accept coral options', () => {
      const doc = generateClassDoc(['bg-red-500'], { darkMode: 'class' })
      expect(doc.classes).toEqual(['bg-red-500'])
    })

    it('should handle multiple variants', () => {
      const doc = generateClassDoc(['dark:hover:bg-red-500'])
      expect(doc.breakdown[0].variants).toContain('dark')
      expect(doc.breakdown[0].variants).toContain('hover')
    })

    it('should extract value from class name', () => {
      const doc = generateClassDoc(['p-4'])
      expect(doc.breakdown[0].value).toBe('4')
    })

    it('should handle special values', () => {
      const doc = generateClassDoc(['w-full'])
      expect(doc.breakdown[0].value).toBe('full')
    })
  })

  describe('createPropsTable', () => {
    it('should return message for empty props', () => {
      const table = createPropsTable([])
      expect(table).toBe('No props defined.')
    })

    it('should create markdown table header', () => {
      const props: PropDoc[] = [
        { name: 'variant', type: 'string', defaultValue: 'primary' },
      ]
      const table = createPropsTable(props)

      expect(table).toContain('| Name | Type | Default | Required | Description |')
      expect(table).toContain('|------|------|---------|----------|-------------|')
    })

    it('should include prop rows', () => {
      const props: PropDoc[] = [
        { name: 'variant', type: 'string', defaultValue: 'primary', description: 'Button variant' },
      ]
      const table = createPropsTable(props)

      expect(table).toContain('variant')
      expect(table).toContain('`string`')
      expect(table).toContain('`primary`')
      expect(table).toContain('Button variant')
    })

    it('should mark required props', () => {
      const props: PropDoc[] = [
        { name: 'variant', type: 'string', required: true },
      ]
      const table = createPropsTable(props)

      expect(table).toContain('Yes')
    })

    it('should handle missing default value', () => {
      const props: PropDoc[] = [
        { name: 'variant', type: 'string' },
      ]
      const table = createPropsTable(props)

      expect(table).toMatch(/\| variant \| `string` \| - \| No \|/)
    })

    it('should handle missing description', () => {
      const props: PropDoc[] = [
        { name: 'variant', type: 'string' },
      ]
      const table = createPropsTable(props)

      expect(table).toContain('| - |')
    })
  })

  describe('createExamplesMarkdown', () => {
    it('should return empty string for no examples', () => {
      const markdown = createExamplesMarkdown([])
      expect(markdown).toBe('')
    })

    it('should create markdown for examples', () => {
      const examples: ExampleDoc[] = [
        { title: 'Basic Usage', code: '<button>Click</button>' },
      ]
      const markdown = createExamplesMarkdown(examples)

      expect(markdown).toContain('### Basic Usage')
      expect(markdown).toContain('```html')
      expect(markdown).toContain('<button>Click</button>')
      expect(markdown).toContain('```')
    })

    it('should include description', () => {
      const examples: ExampleDoc[] = [
        {
          title: 'Basic',
          description: 'A basic example',
          code: '<button>Click</button>',
        },
      ]
      const markdown = createExamplesMarkdown(examples)

      expect(markdown).toContain('A basic example')
    })

    it('should use custom language', () => {
      const examples: ExampleDoc[] = [
        { title: 'JSX Example', code: '<Button />', language: 'jsx' },
      ]
      const markdown = createExamplesMarkdown(examples)

      expect(markdown).toContain('```jsx')
    })

    it('should handle multiple examples', () => {
      const examples: ExampleDoc[] = [
        { title: 'Example 1', code: 'code1' },
        { title: 'Example 2', code: 'code2' },
      ]
      const markdown = createExamplesMarkdown(examples)

      expect(markdown).toContain('### Example 1')
      expect(markdown).toContain('### Example 2')
    })
  })

  describe('generateComponentDoc', () => {
    it('should generate component documentation', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        description: 'A button component',
        classes: ['bg-coral-500', 'px-4'],
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('# Button')
      expect(doc).toContain('A button component')
    })

    it('should include classes section', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['bg-coral-500', 'px-4'],
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('## Classes')
      expect(doc).toContain('bg-coral-500 px-4')
    })

    it('should include variants section', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['btn'],
        variants: {
          primary: ['bg-coral-500'],
          secondary: ['bg-gray-200'],
        },
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('## Variants')
      expect(doc).toContain('### primary')
      expect(doc).toContain('bg-coral-500')
    })

    it('should include props section', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['btn'],
        props: [
          { name: 'variant', type: 'string', defaultValue: 'primary' },
        ],
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('## Props')
      expect(doc).toContain('variant')
    })

    it('should include examples section', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['btn'],
        examples: [
          { title: 'Basic', code: '<button>Click</button>' },
        ],
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('## Examples')
      expect(doc).toContain('### Basic')
    })

    it('should include related section', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['btn'],
        related: ['Input', 'Link'],
      }
      const doc = generateComponentDoc(config)

      expect(doc).toContain('## Related Components')
      expect(doc).toContain('- Input')
      expect(doc).toContain('- Link')
    })

    it('should omit empty sections', () => {
      const config: StoryDocConfig = {
        name: 'Button',
        classes: ['btn'],
      }
      const doc = generateComponentDoc(config)

      expect(doc).not.toContain('## Variants')
      expect(doc).not.toContain('## Props')
      expect(doc).not.toContain('## Examples')
      expect(doc).not.toContain('## Related')
    })
  })
})
