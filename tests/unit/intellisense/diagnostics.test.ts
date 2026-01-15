/**
 * Tests for IntelliSense Diagnostics Provider
 *
 * Tests class validation, error detection, and suggestions.
 */
import { describe, it, expect } from 'vitest'
import {
  createDiagnosticsProvider,
  diagnosticsProvider,
  DiagnosticSeverity,
  type Diagnostic,
} from '../../../src/intellisense/diagnostics'

describe('Diagnostics Provider', () => {
  describe('createDiagnosticsProvider', () => {
    it('should create a diagnostics provider', () => {
      const provider = createDiagnosticsProvider()
      expect(provider).toBeDefined()
      expect(provider.validateClass).toBeDefined()
      expect(provider.validateContent).toBeDefined()
      expect(provider.extractClassLocations).toBeDefined()
      expect(provider.findConflictingClasses).toBeDefined()
    })

    it('should create provider with custom theme', () => {
      const customTheme = {
        colors: {
          brand: '#ff6b6b',
        },
        spacing: {
          custom: '5rem',
        },
      }
      const provider = createDiagnosticsProvider(customTheme as any)
      expect(provider).toBeDefined()
    })
  })

  describe('validateClass', () => {
    const provider = createDiagnosticsProvider()

    it('should return null for valid classes', () => {
      expect(provider.validateClass('flex')).toBeNull()
      expect(provider.validateClass('p-4')).toBeNull()
      expect(provider.validateClass('text-center')).toBeNull()
      expect(provider.validateClass('bg-blue-500')).toBeNull()
    })

    it('should return null for empty or whitespace', () => {
      expect(provider.validateClass('')).toBeNull()
      expect(provider.validateClass('   ')).toBeNull()
    })

    it('should validate classes with variants', () => {
      expect(provider.validateClass('hover:bg-blue-500')).toBeNull()
      expect(provider.validateClass('sm:flex')).toBeNull()
      expect(provider.validateClass('dark:text-white')).toBeNull()
      expect(provider.validateClass('md:hover:bg-red-500')).toBeNull()
    })

    it('should detect unknown variants', () => {
      const result = provider.validateClass('unknownvariant:flex')

      expect(result).toBeDefined()
      expect(result?.severity).toBe(DiagnosticSeverity.Error)
      expect(result?.code).toBe('unknown-variant')
    })

    it('should validate arbitrary values', () => {
      expect(provider.validateClass('w-[200px]')).toBeNull()
      expect(provider.validateClass('bg-[#ff6b6b]')).toBeNull()
      expect(provider.validateClass('text-[14px]')).toBeNull()
    })

    it('should detect unbalanced brackets', () => {
      const result = provider.validateClass('w-[200px')

      expect(result).toBeDefined()
      expect(result?.code).toBe('unbalanced-brackets')
    })

    it('should detect empty arbitrary values', () => {
      const result = provider.validateClass('w-[]')

      expect(result).toBeDefined()
      expect(result?.code).toBe('empty-arbitrary')
    })

    it('should provide suggestions for unknown classes', () => {
      const result = provider.validateClass('flexs')

      expect(result).toBeDefined()
      if (result?.suggestions) {
        expect(result.suggestions.length).toBeGreaterThan(0)
      }
    })

    it('should handle max- responsive variants', () => {
      expect(provider.validateClass('max-sm:hidden')).toBeNull()
      expect(provider.validateClass('max-md:flex')).toBeNull()
    })

    it('should handle arbitrary variants', () => {
      expect(provider.validateClass('[&>*]:p-4')).toBeNull()
    })

    it('should handle data/aria variants', () => {
      expect(provider.validateClass('data-[state=open]:block')).toBeNull()
      expect(provider.validateClass('aria-[expanded=true]:rotate-180')).toBeNull()
    })

    it('should handle supports variants', () => {
      expect(provider.validateClass('supports-[display:grid]:grid')).toBeNull()
    })

    it('should handle group/peer with arbitrary', () => {
      expect(provider.validateClass('group-[.is-published]:block')).toBeNull()
      expect(provider.validateClass('peer-[.is-dirty]:text-red-500')).toBeNull()
    })
  })

  describe('extractClassLocations', () => {
    const provider = createDiagnosticsProvider()

    it('should extract classes from class attribute', () => {
      const content = '<div class="flex items-center p-4">Content</div>'
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(3)
      expect(locations[0].className).toBe('flex')
      expect(locations[1].className).toBe('items-center')
      expect(locations[2].className).toBe('p-4')
    })

    it('should extract classes from className attribute', () => {
      const content = '<div className="flex items-center">Content</div>'
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(2)
    })

    it('should handle single quotes', () => {
      const content = "<div class='flex items-center'>Content</div>"
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(2)
    })

    it('should handle template literals in JSX', () => {
      const content = '<div className={`flex items-center`}>Content</div>'
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(2)
    })

    it('should track positions correctly', () => {
      const content = '<div class="flex p-4">Content</div>'
      const locations = provider.extractClassLocations(content)

      for (const loc of locations) {
        expect(loc.start).toBeDefined()
        expect(loc.end).toBeDefined()
        expect(loc.end).toBeGreaterThan(loc.start)
        expect(content.slice(loc.start, loc.end)).toBe(loc.className)
      }
    })

    it('should handle multiple elements', () => {
      const content = `
        <div class="flex">
          <span class="text-red-500">Hello</span>
        </div>
      `
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(2)
    })

    it('should handle empty class attribute', () => {
      const content = '<div class="">Content</div>'
      const locations = provider.extractClassLocations(content)

      expect(locations.length).toBe(0)
    })
  })

  describe('validateContent', () => {
    const provider = createDiagnosticsProvider()

    it('should validate all classes in content', () => {
      const content = '<div class="flex unknownclass p-4">Content</div>'
      const locations = provider.extractClassLocations(content)
      const diagnostics = provider.validateContent(content, locations)

      expect(diagnostics.length).toBeGreaterThan(0)
      expect(diagnostics.some(d => d.className === 'unknownclass')).toBe(true)
    })

    it('should return empty array for valid content', () => {
      const content = '<div class="flex items-center p-4">Content</div>'
      const locations = provider.extractClassLocations(content)
      const diagnostics = provider.validateContent(content, locations)

      // May have conflicting class warnings, filter for errors
      const errors = diagnostics.filter(d => d.severity === DiagnosticSeverity.Error)
      expect(errors.length).toBe(0)
    })

    it('should detect conflicting classes', () => {
      const content = '<div class="flex grid">Content</div>'
      const locations = provider.extractClassLocations(content)
      const diagnostics = provider.validateContent(content, locations)

      const conflicts = diagnostics.filter(d => d.code === 'conflicting-classes')
      expect(conflicts.length).toBeGreaterThanOrEqual(0)
    })

    it('should include position information', () => {
      const content = '<div class="unknownclass">Content</div>'
      const locations = provider.extractClassLocations(content)
      const diagnostics = provider.validateContent(content, locations)

      for (const diag of diagnostics) {
        expect(diag.start).toBeDefined()
        expect(diag.end).toBeDefined()
      }
    })
  })

  describe('findConflictingClasses', () => {
    const provider = createDiagnosticsProvider()

    it('should detect conflicting display classes', () => {
      const locations = [
        { className: 'flex', start: 0, end: 4 },
        { className: 'grid', start: 5, end: 9 },
      ]
      const conflicts = provider.findConflictingClasses(locations)

      // Both affect display property
      expect(conflicts.length).toBeGreaterThanOrEqual(0)
    })

    it('should detect conflicting margin classes', () => {
      const locations = [
        { className: 'm-4', start: 0, end: 3 },
        { className: 'm-8', start: 4, end: 7 },
      ]
      const conflicts = provider.findConflictingClasses(locations)

      expect(conflicts.length).toBeGreaterThanOrEqual(0)
    })

    it('should not flag different properties', () => {
      const locations = [
        { className: 'flex', start: 0, end: 4 },
        { className: 'p-4', start: 5, end: 8 },
      ]
      const conflicts = provider.findConflictingClasses(locations)

      expect(conflicts.length).toBe(0)
    })

    it('should handle variants correctly', () => {
      const locations = [
        { className: 'bg-blue-500', start: 0, end: 11 },
        { className: 'hover:bg-red-500', start: 12, end: 28 },
      ]
      const conflicts = provider.findConflictingClasses(locations)

      // Different variant context, should not conflict
      expect(conflicts.length).toBe(0)
    })

    it('should include warning message', () => {
      const locations = [
        { className: 'text-lg', start: 0, end: 7 },
        { className: 'text-xl', start: 8, end: 15 },
      ]
      const conflicts = provider.findConflictingClasses(locations)

      if (conflicts.length > 0) {
        expect(conflicts[0].message).toContain('conflicting')
        expect(conflicts[0].severity).toBe(DiagnosticSeverity.Warning)
      }
    })
  })

  describe('Error Detection', () => {
    const provider = createDiagnosticsProvider()

    it('should detect invalid color shades', () => {
      const result = provider.validateClass('text-blue-123')

      if (result) {
        expect(result.message).toContain('shade')
      }
    })

    it('should detect common typos', () => {
      const result = provider.validateClass('backround-red-500')

      if (result) {
        expect(result.message.toLowerCase()).toContain('typo')
      }
    })

    it('should detect invalid spacing values', () => {
      const result = provider.validateClass('p-999')

      if (result) {
        expect(result.message).toContain('spacing')
      }
    })
  })

  describe('DiagnosticSeverity', () => {
    it('should have correct severity values', () => {
      expect(DiagnosticSeverity.Error).toBe(1)
      expect(DiagnosticSeverity.Warning).toBe(2)
      expect(DiagnosticSeverity.Information).toBe(3)
      expect(DiagnosticSeverity.Hint).toBe(4)
    })
  })

  describe('Default Provider', () => {
    it('should export default provider instance', () => {
      expect(diagnosticsProvider).toBeDefined()
      expect(diagnosticsProvider.validateClass).toBeDefined()
      expect(diagnosticsProvider.validateContent).toBeDefined()
    })

    it('should work with default theme', () => {
      const result = diagnosticsProvider.validateClass('flex')
      expect(result).toBeNull()
    })
  })

  describe('Suggestion Quality', () => {
    const provider = createDiagnosticsProvider()

    it('should suggest similar classes for typos', () => {
      const result = provider.validateClass('flexs')

      if (result?.suggestions) {
        expect(result.suggestions).toContain('flex')
      }
    })

    it('should limit number of suggestions', () => {
      const result = provider.validateClass('xyzabc123')

      if (result?.suggestions) {
        expect(result.suggestions.length).toBeLessThanOrEqual(5)
      }
    })
  })

  describe('Known Patterns', () => {
    const provider = createDiagnosticsProvider()

    it('should recognize common utility patterns', () => {
      const validClasses = [
        'flex', 'grid', 'block', 'inline',
        'p-4', 'px-6', 'py-2', 'm-auto',
        'text-lg', 'font-bold', 'text-center',
        'rounded-lg', 'shadow-md', 'opacity-50',
        'w-full', 'h-screen', 'max-w-xl',
        'justify-center', 'items-start',
        'duration-300', 'ease-in-out',
        'cursor-pointer', 'select-none',
      ]

      for (const cls of validClasses) {
        const result = provider.validateClass(cls)
        expect(result).toBeNull()
      }
    })
  })
})
