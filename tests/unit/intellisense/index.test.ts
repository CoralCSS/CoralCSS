/**
 * Tests for IntelliSense Module Index
 *
 * Tests module exports and integration.
 */
import { describe, it, expect } from 'vitest'
import * as intellisense from '../../../src/intellisense'

describe('IntelliSense Module', () => {
  describe('Module Exports', () => {
    it('should export completion functions', () => {
      expect(intellisense.generateCompletions).toBeDefined()
      expect(intellisense.generateVariantCompletions).toBeDefined()
      expect(intellisense.filterCompletions).toBeDefined()
      expect(intellisense.getCompletionsByCategory).toBeDefined()
    })

    it('should export hover provider', () => {
      expect(intellisense.createHoverProvider).toBeDefined()
      expect(intellisense.hoverProvider).toBeDefined()
    })

    it('should export color provider', () => {
      expect(intellisense.createColorProvider).toBeDefined()
      expect(intellisense.colorProvider).toBeDefined()
    })

    it('should export diagnostics provider', () => {
      expect(intellisense.createDiagnosticsProvider).toBeDefined()
      expect(intellisense.diagnosticsProvider).toBeDefined()
      expect(intellisense.DiagnosticSeverity).toBeDefined()
    })

    it('should export VS Code integration', () => {
      expect(intellisense.createVSCodeProvider).toBeDefined()
      expect(intellisense.vscodeProvider).toBeDefined()
      expect(intellisense.vscodeConfig).toBeDefined()
      expect(intellisense.VSCodeCompletionItemKind).toBeDefined()
    })
  })

  describe('Integration', () => {
    it('should provide completions for utility classes', () => {
      const completions = intellisense.generateCompletions()
      expect(completions.length).toBeGreaterThan(0)
    })

    it('should provide hover info for utility classes', () => {
      const info = intellisense.hoverProvider.getHoverInfo('flex')
      expect(info).toBeDefined()
      expect(info?.css).toBeDefined()
    })

    it('should provide color info for color classes', () => {
      const provider = intellisense.colorProvider
      // Test with default theme colors
      const palettes = provider.getPalettes()
      expect(palettes).toBeDefined()
    })

    it('should validate utility classes', () => {
      const provider = intellisense.diagnosticsProvider
      const valid = provider.validateClass('flex')
      const invalid = provider.validateClass('unknownclass123')

      expect(valid).toBeNull()
      expect(invalid).toBeDefined()
    })

    it('should provide VS Code formatted data', () => {
      const provider = intellisense.vscodeProvider
      const completions = provider.getCompletions('flex')
      const hover = provider.getHover('flex')

      expect(completions.length).toBeGreaterThan(0)
      expect(hover).toBeDefined()
    })
  })

  describe('Cross-Provider Integration', () => {
    it('should have consistent class support across providers', () => {
      const testClasses = ['flex', 'p-4', 'text-lg', 'bg-blue-500']

      for (const cls of testClasses) {
        // Hover should work
        const hoverInfo = intellisense.hoverProvider.getHoverInfo(cls)
        expect(hoverInfo).toBeDefined()

        // Validation should pass
        const diagnostic = intellisense.diagnosticsProvider.validateClass(cls)
        expect(diagnostic).toBeNull()

        // VS Code hover should work
        const vscodeHover = intellisense.vscodeProvider.getHover(cls)
        expect(vscodeHover).toBeDefined()
      }
    })

    it('should handle variants consistently', () => {
      const variantClasses = ['hover:bg-blue-500', 'sm:flex', 'dark:text-white']

      for (const cls of variantClasses) {
        const hoverInfo = intellisense.hoverProvider.getHoverInfo(cls)
        expect(hoverInfo).toBeDefined()

        const diagnostic = intellisense.diagnosticsProvider.validateClass(cls)
        expect(diagnostic).toBeNull()
      }
    })

    it('should detect invalid classes consistently', () => {
      const invalidClass = 'unknownclass123'

      const diagnostic = intellisense.diagnosticsProvider.validateClass(invalidClass)
      expect(diagnostic).toBeDefined()
      expect(diagnostic?.severity).toBe(intellisense.DiagnosticSeverity.Error)
    })
  })

  describe('Type Exports', () => {
    it('should export CompletionItem type', () => {
      const completions = intellisense.generateCompletions()
      const item = completions[0]

      // TypeScript should allow this if types are exported correctly
      expect(item.label).toBeDefined()
      expect(item.category).toBeDefined()
      expect(item.css).toBeDefined()
    })

    it('should export HoverInfo type', () => {
      const info = intellisense.hoverProvider.getHoverInfo('flex')

      if (info) {
        expect(info.className).toBeDefined()
        expect(info.css).toBeDefined()
      }
    })

    it('should export ColorInfo type', () => {
      const customProvider = intellisense.createColorProvider({
        colors: { brand: '#ff6b6b' },
      } as any)

      const colorInfo = customProvider.getColor('brand')

      if (colorInfo) {
        expect(colorInfo.name).toBeDefined()
        expect(colorInfo.hex).toBeDefined()
        expect(colorInfo.rgb).toBeDefined()
      }
    })

    it('should export Diagnostic type', () => {
      const diagnostic = intellisense.diagnosticsProvider.validateClass('unknownclass')

      if (diagnostic) {
        expect(diagnostic.className).toBeDefined()
        expect(diagnostic.message).toBeDefined()
        expect(diagnostic.severity).toBeDefined()
      }
    })

    it('should export VSCode types', () => {
      const completions = intellisense.vscodeProvider.getCompletions('flex')

      if (completions.length > 0) {
        const item = completions[0]
        expect(item.label).toBeDefined()
        expect(item.kind).toBeDefined()
      }
    })
  })

  describe('DiagnosticSeverity Enum', () => {
    it('should have Error severity', () => {
      expect(intellisense.DiagnosticSeverity.Error).toBe(1)
    })

    it('should have Warning severity', () => {
      expect(intellisense.DiagnosticSeverity.Warning).toBe(2)
    })

    it('should have Information severity', () => {
      expect(intellisense.DiagnosticSeverity.Information).toBe(3)
    })

    it('should have Hint severity', () => {
      expect(intellisense.DiagnosticSeverity.Hint).toBe(4)
    })
  })

  describe('VSCodeCompletionItemKind Enum', () => {
    it('should have common completion kinds', () => {
      expect(intellisense.VSCodeCompletionItemKind.Text).toBe(1)
      expect(intellisense.VSCodeCompletionItemKind.Value).toBe(12)
      expect(intellisense.VSCodeCompletionItemKind.Color).toBe(16)
      expect(intellisense.VSCodeCompletionItemKind.Keyword).toBe(14)
    })
  })

  describe('Default Instances', () => {
    it('should have working default hover provider', () => {
      expect(intellisense.hoverProvider.getHoverInfo('flex')).toBeDefined()
    })

    it('should have working default color provider', () => {
      expect(intellisense.colorProvider.getPalettes()).toBeDefined()
    })

    it('should have working default diagnostics provider', () => {
      expect(intellisense.diagnosticsProvider.validateClass('flex')).toBeNull()
    })

    it('should have working default VS Code provider', () => {
      expect(intellisense.vscodeProvider.getCompletions('').length).toBeGreaterThan(0)
    })
  })

  describe('Factory Functions', () => {
    it('should create custom hover provider', () => {
      const customTheme = { colors: { brand: '#ff6b6b' } }
      const provider = intellisense.createHoverProvider(customTheme as any)
      expect(provider).toBeDefined()
      expect(provider.getHoverInfo).toBeDefined()
    })

    it('should create custom color provider', () => {
      const customTheme = { colors: { brand: '#ff6b6b' } }
      const provider = intellisense.createColorProvider(customTheme as any)
      expect(provider).toBeDefined()
      expect(provider.getColor('brand')).toBeDefined()
    })

    it('should create custom diagnostics provider', () => {
      const customTheme = { spacing: { custom: '5rem' } }
      const provider = intellisense.createDiagnosticsProvider(customTheme as any)
      expect(provider).toBeDefined()
    })

    it('should create custom VS Code provider', () => {
      const customTheme = { colors: { brand: '#ff6b6b' } }
      const provider = intellisense.createVSCodeProvider(customTheme as any)
      expect(provider).toBeDefined()
      expect(provider.getCompletions).toBeDefined()
    })
  })

  describe('vscodeConfig', () => {
    it('should export VS Code configuration', () => {
      expect(intellisense.vscodeConfig).toBeDefined()
      expect(intellisense.vscodeConfig.languages).toBeDefined()
      expect(intellisense.vscodeConfig.triggerCharacters).toBeDefined()
      expect(intellisense.vscodeConfig.includePatterns).toBeDefined()
      expect(intellisense.vscodeConfig.configKeys).toBeDefined()
    })

    it('should include common file types', () => {
      const { languages } = intellisense.vscodeConfig
      expect(languages).toContain('html')
      expect(languages).toContain('javascript')
      expect(languages).toContain('typescript')
      expect(languages).toContain('javascriptreact')
      expect(languages).toContain('typescriptreact')
      expect(languages).toContain('vue')
      expect(languages).toContain('svelte')
    })
  })

  describe('End-to-End Workflow', () => {
    it('should support full IntelliSense workflow', () => {
      // 1. User types in editor
      const prefix = 'flex'

      // 2. Get completions
      const completions = intellisense.filterCompletions(
        intellisense.generateCompletions(),
        prefix
      )
      expect(completions.length).toBeGreaterThan(0)

      // 3. User selects completion
      const selectedClass = 'flex'

      // 4. Get hover info on hover
      const hoverInfo = intellisense.hoverProvider.getHoverInfo(selectedClass)
      expect(hoverInfo).toBeDefined()

      // 5. Validate content
      const content = `<div class="${selectedClass} items-center">`
      const locations = intellisense.diagnosticsProvider.extractClassLocations(content)
      const diagnostics = intellisense.diagnosticsProvider.validateContent(content, locations)

      // Should have no errors for valid classes
      const errors = diagnostics.filter(
        d => d.severity === intellisense.DiagnosticSeverity.Error
      )
      expect(errors.length).toBe(0)
    })

    it('should detect and report errors', () => {
      const content = '<div class="unknownclass flex">'
      const locations = intellisense.diagnosticsProvider.extractClassLocations(content)
      const diagnostics = intellisense.diagnosticsProvider.validateContent(content, locations)

      expect(diagnostics.length).toBeGreaterThan(0)
    })
  })
})
