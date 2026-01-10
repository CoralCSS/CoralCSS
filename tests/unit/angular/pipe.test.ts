import { describe, it, expect } from 'vitest'
import {
  CoralClassPipe,
  CoralMergePipe,
  createCoralClassPipe,
  createCoralMergePipe,
  coralClassPipeMetadata,
  coralMergePipeMetadata,
} from '../../../src/angular/pipe'

describe('Angular Pipes', () => {
  describe('CoralClassPipe', () => {
    it('should create a pipe instance', () => {
      const pipe = new CoralClassPipe()
      expect(pipe).toBeDefined()
    })

    it('should transform single value', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform('foo')).toBe('foo')
    })

    it('should combine string args', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform('foo', 'bar', 'baz')).toBe('foo bar baz')
    })

    it('should handle null value', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform(null, 'bar')).toBe('bar')
    })

    it('should handle undefined value', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform(undefined, 'bar')).toBe('bar')
    })

    it('should handle falsy args', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform('foo', null, 'bar', undefined, false)).toBe('foo bar')
    })

    it('should handle object args', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform('base', { active: true, disabled: false })).toBe('base active')
    })

    it('should handle conditional expressions', () => {
      const pipe = new CoralClassPipe()
      const isActive = true
      const isDisabled = false
      expect(pipe.transform('btn', isActive && 'active', isDisabled && 'disabled')).toBe('btn active')
    })

    it('should handle empty args', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform('foo')).toBe('foo')
    })

    it('should handle all null/undefined', () => {
      const pipe = new CoralClassPipe()
      expect(pipe.transform(null)).toBe('')
      expect(pipe.transform(undefined)).toBe('')
    })
  })

  describe('CoralMergePipe', () => {
    it('should create a pipe instance', () => {
      const pipe = new CoralMergePipe()
      expect(pipe).toBeDefined()
    })

    it('should transform single value', () => {
      const pipe = new CoralMergePipe()
      expect(pipe.transform('foo')).toBe('foo')
    })

    it('should merge classes with conflict resolution', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('p-2', 'p-4')
      expect(result).toContain('p-4')
      expect(result).not.toContain('p-2')
    })

    it('should handle null value', () => {
      const pipe = new CoralMergePipe()
      expect(pipe.transform(null, 'bar')).toBe('bar')
    })

    it('should handle undefined value', () => {
      const pipe = new CoralMergePipe()
      expect(pipe.transform(undefined, 'bar')).toBe('bar')
    })

    it('should handle same color conflicts', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('bg-red-500', 'bg-red-600')
      expect(result).toBe('bg-red-600')
    })

    it('should keep different color utilities', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('bg-red-500', 'bg-blue-500')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('bg-blue-500')
    })

    it('should keep non-conflicting classes', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('bg-red-500 p-2', 'text-white')
      expect(result).toContain('bg-red-500')
      expect(result).toContain('text-white')
    })

    it('should handle same color variant conflicts', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('hover:bg-red-500', 'hover:bg-red-600')
      expect(result).toBe('hover:bg-red-600')
    })

    it('should keep different color variants', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('hover:bg-red-500', 'hover:bg-blue-500')
      expect(result).toContain('hover:bg-red-500')
      expect(result).toContain('hover:bg-blue-500')
    })

    it('should handle empty string', () => {
      const pipe = new CoralMergePipe()
      expect(pipe.transform('')).toBe('')
    })

    it('should handle multiple args', () => {
      const pipe = new CoralMergePipe()
      const result = pipe.transform('p-2', 'p-4', 'p-6')
      expect(result).toBe('p-6')
    })
  })

  describe('createCoralClassPipe', () => {
    it('should create a CoralClassPipe instance', () => {
      const pipe = createCoralClassPipe()
      expect(pipe).toBeInstanceOf(CoralClassPipe)
    })
  })

  describe('createCoralMergePipe', () => {
    it('should create a CoralMergePipe instance', () => {
      const pipe = createCoralMergePipe()
      expect(pipe).toBeInstanceOf(CoralMergePipe)
    })
  })

  describe('coralClassPipeMetadata', () => {
    it('should have correct name', () => {
      expect(coralClassPipeMetadata.name).toBe('coralClass')
    })

    it('should be standalone', () => {
      expect(coralClassPipeMetadata.standalone).toBe(true)
    })

    it('should be pure', () => {
      expect(coralClassPipeMetadata.pure).toBe(true)
    })
  })

  describe('coralMergePipeMetadata', () => {
    it('should have correct name', () => {
      expect(coralMergePipeMetadata.name).toBe('coralMerge')
    })

    it('should be standalone', () => {
      expect(coralMergePipeMetadata.standalone).toBe(true)
    })

    it('should be pure', () => {
      expect(coralMergePipeMetadata.pure).toBe(true)
    })
  })
})
