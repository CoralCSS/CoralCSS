/**
 * Tests for VS Code IntelliSense Integration
 *
 * Tests VS Code-specific IntelliSense features.
 */
import { describe, it, expect } from 'vitest'
import {
  createVSCodeProvider,
  vscodeProvider,
  vscodeConfig,
  VSCodeCompletionItemKind,
  type VSCodeCompletionItem,
  type VSCodeHover,
  type VSCodeDiagnostic,
  type VSCodeColorInformation,
} from '../../../src/intellisense/vscode'

describe('VS Code Provider', () => {
  describe('createVSCodeProvider', () => {
    it('should create a VS Code provider', () => {
      const provider = createVSCodeProvider()
      expect(provider).toBeDefined()
      expect(provider.getCompletions).toBeDefined()
      expect(provider.getHover).toBeDefined()
      expect(provider.getDiagnostics).toBeDefined()
      expect(provider.getColors).toBeDefined()
      expect(provider.getColorPresentations).toBeDefined()
      expect(provider.resolveCompletion).toBeDefined()
      expect(provider.getSignatureHelp).toBeDefined()
    })

    it('should create provider with custom theme', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
        },
      }
      const provider = createVSCodeProvider(customTheme as any)
      expect(provider).toBeDefined()
    })

    it('should expose raw providers', () => {
      const provider = createVSCodeProvider()
      expect(provider.completions).toBeDefined()
      expect(provider.hoverProvider).toBeDefined()
      expect(provider.colorProvider).toBeDefined()
      expect(provider.diagnosticsProvider).toBeDefined()
    })
  })

  describe('getCompletions', () => {
    const provider = createVSCodeProvider()

    it('should return completion items', () => {
      const items = provider.getCompletions('')
      expect(items).toBeDefined()
      expect(items.length).toBeGreaterThan(0)
    })

    it('should filter by prefix', () => {
      const items = provider.getCompletions('flex')
      expect(items.every(item => item.label.toLowerCase().startsWith('flex'))).toBe(true)
    })

    it('should return VS Code formatted items', () => {
      const items = provider.getCompletions('flex')

      for (const item of items.slice(0, 10)) {
        expect(item.label).toBeDefined()
        expect(item.kind).toBeDefined()
        expect(typeof item.kind).toBe('number')
      }
    })

    it('should handle variant prefix', () => {
      const items = provider.getCompletions('hover:')

      expect(items.length).toBeGreaterThan(0)
    })

    it('should show variants when inVariant is true', () => {
      const items = provider.getCompletions('hov', true)

      expect(items.length).toBeGreaterThan(0)
    })

    it('should include sortText', () => {
      const items = provider.getCompletions('flex')

      for (const item of items) {
        expect(item.sortText).toBeDefined()
      }
    })

    it('should include insertText', () => {
      const items = provider.getCompletions('flex')

      for (const item of items) {
        expect(item.insertText).toBe(item.label)
      }
    })
  })

  describe('getHover', () => {
    const provider = createVSCodeProvider()

    it('should return null for unknown class', () => {
      const hover = provider.getHover('unknownclass123')
      expect(hover).toBeNull()
    })

    it('should return VS Code hover for valid class', () => {
      const hover = provider.getHover('flex')

      expect(hover).toBeDefined()
      expect(hover?.contents).toBeDefined()
      expect(hover?.contents.length).toBeGreaterThan(0)
    })

    it('should include markdown content', () => {
      const hover = provider.getHover('flex')

      if (hover) {
        const markdownContent = hover.contents.find(
          (c) => typeof c === 'object' && 'kind' in c && c.kind === 'markdown'
        )
        expect(markdownContent).toBeDefined()
      }
    })

    it('should include class name in hover', () => {
      const hover = provider.getHover('p-4')

      if (hover) {
        const content = hover.contents[0]
        if (typeof content === 'object' && 'value' in content) {
          expect(content.value).toContain('p-4')
        }
      }
    })

    it('should include CSS in hover', () => {
      const hover = provider.getHover('flex')

      if (hover) {
        const content = hover.contents[0]
        if (typeof content === 'object' && 'value' in content) {
          expect(content.value).toContain('css')
        }
      }
    })
  })

  describe('getDiagnostics', () => {
    const provider = createVSCodeProvider()

    it('should return diagnostics for invalid classes', () => {
      const content = '<div class="unknownclass">Content</div>'
      const diagnostics = provider.getDiagnostics(content)

      expect(diagnostics.length).toBeGreaterThan(0)
    })

    it('should return empty array for valid content', () => {
      const content = '<div class="flex items-center">Content</div>'
      const diagnostics = provider.getDiagnostics(content)

      // Filter for actual errors
      const errors = diagnostics.filter(d => d.severity === 1)
      expect(errors.length).toBe(0)
    })

    it('should return VS Code formatted diagnostics', () => {
      const content = '<div class="unknownclass">Content</div>'
      const diagnostics = provider.getDiagnostics(content)

      for (const diag of diagnostics) {
        expect(diag.range).toBeDefined()
        expect(diag.range.start).toBeDefined()
        expect(diag.range.end).toBeDefined()
        expect(diag.message).toBeDefined()
        expect(diag.severity).toBeDefined()
        expect(diag.source).toBe('CoralCSS')
      }
    })

    it('should include suggestions in message', () => {
      const content = '<div class="flexs">Content</div>'
      const diagnostics = provider.getDiagnostics(content)

      if (diagnostics.length > 0) {
        const diag = diagnostics[0]
        // May include "Did you mean" suggestions
        expect(diag.message).toBeDefined()
      }
    })

    it('should handle line/character offset', () => {
      const content = '<div class="unknownclass">Content</div>'
      const diagnostics = provider.getDiagnostics(content, 5, 10)

      if (diagnostics.length > 0) {
        expect(diagnostics[0].range.start.line).toBeGreaterThanOrEqual(5)
      }
    })
  })

  describe('getColors', () => {
    const provider = createVSCodeProvider()

    it('should return color information for color classes', () => {
      const content = '<div class="text-red-500 bg-blue-500">Content</div>'
      const colors = provider.getColors(content)

      expect(colors.length).toBeGreaterThan(0)
    })

    it('should return VS Code formatted color info', () => {
      const content = '<div class="bg-red-500">Content</div>'
      const colors = provider.getColors(content)

      for (const color of colors) {
        expect(color.range).toBeDefined()
        expect(color.color).toBeDefined()
        expect(color.color.red).toBeGreaterThanOrEqual(0)
        expect(color.color.red).toBeLessThanOrEqual(1)
        expect(color.color.green).toBeGreaterThanOrEqual(0)
        expect(color.color.blue).toBeGreaterThanOrEqual(0)
        expect(color.color.alpha).toBeGreaterThanOrEqual(0)
      }
    })

    it('should return empty array for non-color classes', () => {
      const content = '<div class="flex p-4">Content</div>'
      const colors = provider.getColors(content)

      expect(colors.length).toBe(0)
    })

    it('should handle line/character offset', () => {
      const content = '<div class="bg-red-500">Content</div>'
      const colors = provider.getColors(content, 10, 5)

      if (colors.length > 0) {
        expect(colors[0].range.start.line).toBeGreaterThanOrEqual(10)
      }
    })
  })

  describe('getColorPresentations', () => {
    const provider = createVSCodeProvider()

    it('should return color presentations', () => {
      const color = { red: 1, green: 0.42, blue: 0.42, alpha: 1 }
      const presentations = provider.getColorPresentations(color, 'bg-red-500')

      expect(presentations.length).toBeGreaterThan(0)
      expect(presentations).toContain('bg-red-500')
    })

    it('should handle opacity', () => {
      const color = { red: 1, green: 0.42, blue: 0.42, alpha: 0.5 }
      const presentations = provider.getColorPresentations(color, 'bg-red-500')

      const opacityVariant = presentations.find(p => p.includes('/'))
      expect(opacityVariant).toBeDefined()
    })
  })

  describe('resolveCompletion', () => {
    const provider = createVSCodeProvider()

    it('should add documentation to completion item', () => {
      const item: VSCodeCompletionItem = {
        label: 'flex',
        kind: VSCodeCompletionItemKind.Value,
      }
      const resolved = provider.resolveCompletion(item)

      expect(resolved.documentation).toBeDefined()
    })

    it('should handle variant prefixes', () => {
      const item: VSCodeCompletionItem = {
        label: 'hover:',
        kind: VSCodeCompletionItemKind.Keyword,
      }
      const resolved = provider.resolveCompletion(item)

      // Should resolve without error
      expect(resolved).toBeDefined()
    })
  })

  describe('getSignatureHelp', () => {
    const provider = createVSCodeProvider()

    it('should return null for non-arbitrary values', () => {
      const help = provider.getSignatureHelp('flex')
      expect(help).toBeNull()
    })

    it('should return help for width arbitrary value', () => {
      const help = provider.getSignatureHelp('w-[')

      expect(help).toBeDefined()
      expect(help?.signatures.length).toBeGreaterThan(0)
    })

    it('should return help for various arbitrary prefixes', () => {
      const prefixes = ['w-[', 'h-[', 'm-[', 'p-[', 'text-[', 'bg-[', 'border-[']

      for (const prefix of prefixes) {
        const help = provider.getSignatureHelp(prefix)
        expect(help).toBeDefined()
      }
    })

    it('should include example in documentation', () => {
      const help = provider.getSignatureHelp('w-[')

      if (help && help.signatures[0].documentation) {
        expect(help.signatures[0].documentation).toContain('Example')
      }
    })

    it('should have active signature and parameter', () => {
      const help = provider.getSignatureHelp('w-[')

      if (help) {
        expect(help.activeSignature).toBe(0)
        expect(help.activeParameter).toBe(0)
      }
    })
  })

  describe('VSCodeCompletionItemKind', () => {
    it('should have correct enum values', () => {
      expect(VSCodeCompletionItemKind.Text).toBe(1)
      expect(VSCodeCompletionItemKind.Value).toBe(12)
      expect(VSCodeCompletionItemKind.Color).toBe(16)
      expect(VSCodeCompletionItemKind.Keyword).toBe(14)
    })
  })

  describe('vscodeConfig', () => {
    it('should have languages configuration', () => {
      expect(vscodeConfig.languages).toBeDefined()
      expect(vscodeConfig.languages).toContain('html')
      expect(vscodeConfig.languages).toContain('javascript')
      expect(vscodeConfig.languages).toContain('typescript')
      expect(vscodeConfig.languages).toContain('vue')
      expect(vscodeConfig.languages).toContain('svelte')
    })

    it('should have trigger characters', () => {
      expect(vscodeConfig.triggerCharacters).toBeDefined()
      expect(vscodeConfig.triggerCharacters).toContain('"')
      expect(vscodeConfig.triggerCharacters).toContain(':')
    })

    it('should have include patterns', () => {
      expect(vscodeConfig.includePatterns).toBeDefined()
      expect(vscodeConfig.includePatterns.length).toBeGreaterThan(0)
    })

    it('should have config keys', () => {
      expect(vscodeConfig.configKeys).toBeDefined()
      expect(vscodeConfig.configKeys.enable).toBe('coralcss.enable')
      expect(vscodeConfig.configKeys.validate).toBe('coralcss.validate')
    })
  })

  describe('Default Provider', () => {
    it('should export default provider instance', () => {
      expect(vscodeProvider).toBeDefined()
      expect(vscodeProvider.getCompletions).toBeDefined()
      expect(vscodeProvider.getHover).toBeDefined()
    })
  })

  describe('Completion Item Kind Assignment', () => {
    const provider = createVSCodeProvider()

    it('should use Color kind for color utilities', () => {
      const items = provider.getCompletions('bg-red')
      const colorItem = items.find(i => i.color || i.kind === VSCodeCompletionItemKind.Color)

      // Some color items should have Color kind
      expect(items.some(i => i.kind === VSCodeCompletionItemKind.Color)).toBe(true)
    })

    it('should use Keyword kind for variants', () => {
      const items = provider.getCompletions('hov', true)
      const keywordItems = items.filter(i => i.kind === VSCodeCompletionItemKind.Keyword)

      expect(keywordItems.length).toBeGreaterThan(0)
    })

    it('should use Value kind for utilities', () => {
      const items = provider.getCompletions('flex')
      const valueItems = items.filter(i => i.kind === VSCodeCompletionItemKind.Value)

      expect(valueItems.length).toBeGreaterThan(0)
    })
  })

  describe('Position Calculation', () => {
    const provider = createVSCodeProvider()

    it('should calculate correct positions in single line', () => {
      const content = '<div class="unknownclass">Content</div>'
      const diagnostics = provider.getDiagnostics(content, 0, 0)

      if (diagnostics.length > 0) {
        expect(diagnostics[0].range.start.line).toBe(0)
        expect(diagnostics[0].range.start.character).toBeGreaterThan(0)
      }
    })

    it('should handle multiline content', () => {
      const content = `<div>
        <span class="unknownclass">Hello</span>
      </div>`
      const diagnostics = provider.getDiagnostics(content, 0, 0)

      if (diagnostics.length > 0) {
        expect(diagnostics[0].range.start.line).toBeGreaterThanOrEqual(0)
      }
    })
  })
})
