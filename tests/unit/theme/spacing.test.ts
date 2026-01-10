/**
 * Tests for Theme Spacing
 */
import { describe, it, expect } from 'vitest'
import {
  spacing,
  sizing,
  heightSizing,
  getSpacing,
  getSizing,
  negativeSpacing,
  getNegativeSpacing,
  inset,
  zIndex,
  maxWidth,
} from '../../../src/theme/spacing'

describe('Theme Spacing', () => {
  describe('spacing', () => {
    it('should have 0 value', () => {
      expect(spacing['0']).toBe('0px')
    })

    it('should have px value', () => {
      expect(spacing['px']).toBe('1px')
    })

    it('should have rem values', () => {
      expect(spacing['1']).toBe('0.25rem')
      expect(spacing['4']).toBe('1rem')
      expect(spacing['8']).toBe('2rem')
    })

    it('should have fractional values', () => {
      expect(spacing['0.5']).toBe('0.125rem')
      expect(spacing['1.5']).toBe('0.375rem')
      expect(spacing['2.5']).toBe('0.625rem')
    })

    it('should have large values', () => {
      expect(spacing['96']).toBe('24rem')
    })
  })

  describe('sizing', () => {
    it('should extend spacing', () => {
      expect(sizing['4']).toBe('1rem')
    })

    it('should have auto', () => {
      expect(sizing['auto']).toBe('auto')
    })

    it('should have percentage values', () => {
      expect(sizing['1/2']).toBe('50%')
      expect(sizing['full']).toBe('100%')
    })

    it('should have viewport values', () => {
      expect(sizing['screen']).toBe('100vw')
      expect(sizing['svw']).toBe('100svw')
      expect(sizing['lvw']).toBe('100lvw')
      expect(sizing['dvw']).toBe('100dvw')
    })

    it('should have content values', () => {
      expect(sizing['min']).toBe('min-content')
      expect(sizing['max']).toBe('max-content')
      expect(sizing['fit']).toBe('fit-content')
    })
  })

  describe('heightSizing', () => {
    it('should extend sizing', () => {
      expect(heightSizing['4']).toBe('1rem')
    })

    it('should have vh instead of vw for screen', () => {
      expect(heightSizing['screen']).toBe('100vh')
    })

    it('should have svh, lvh, dvh values', () => {
      expect(heightSizing['svh']).toBe('100svh')
      expect(heightSizing['lvh']).toBe('100lvh')
      expect(heightSizing['dvh']).toBe('100dvh')
    })
  })

  describe('getSpacing', () => {
    it('should return spacing value', () => {
      expect(getSpacing('4')).toBe('1rem')
      expect(getSpacing('px')).toBe('1px')
    })

    it('should return undefined for non-existent key', () => {
      expect(getSpacing('auto')).toBeUndefined()
    })
  })

  describe('getSizing', () => {
    it('should return sizing value', () => {
      expect(getSizing('4')).toBe('1rem')
      expect(getSizing('1/2')).toBe('50%')
      expect(getSizing('full')).toBe('100%')
    })

    it('should return undefined for non-existent key', () => {
      expect(getSizing('nonexistent')).toBeUndefined()
    })
  })

  describe('negativeSpacing', () => {
    it('should have negative values', () => {
      expect(negativeSpacing['-4']).toBe('-1rem')
      expect(negativeSpacing['-8']).toBe('-2rem')
    })

    it('should not have -0 or -px', () => {
      expect(negativeSpacing['-0']).toBeUndefined()
      expect(negativeSpacing['-px']).toBeUndefined()
    })
  })

  describe('getNegativeSpacing', () => {
    it('should return negative value for positive key', () => {
      expect(getNegativeSpacing('4')).toBe('-1rem')
      expect(getNegativeSpacing('8')).toBe('-2rem')
    })

    it('should return negative value for key with minus prefix', () => {
      expect(getNegativeSpacing('-4')).toBe('-1rem')
      expect(getNegativeSpacing('-8')).toBe('-2rem')
    })

    it('should return undefined for 0', () => {
      expect(getNegativeSpacing('0')).toBeUndefined()
    })

    it('should return undefined for non-existent key', () => {
      expect(getNegativeSpacing('nonexistent')).toBeUndefined()
    })
  })

  describe('inset', () => {
    it('should extend sizing', () => {
      expect(inset['4']).toBe('1rem')
    })

    it('should have fractional values for positioning', () => {
      expect(inset['1/2']).toBe('50%')
      expect(inset['1/3']).toBe('33.333333%')
      expect(inset['2/3']).toBe('66.666667%')
      expect(inset['1/4']).toBe('25%')
      expect(inset['3/4']).toBe('75%')
      expect(inset['full']).toBe('100%')
    })
  })

  describe('zIndex', () => {
    it('should have z-index values', () => {
      expect(zIndex['0']).toBe('0')
      expect(zIndex['10']).toBe('10')
      expect(zIndex['50']).toBe('50')
    })

    it('should have auto', () => {
      expect(zIndex['auto']).toBe('auto')
    })
  })

  describe('maxWidth', () => {
    it('should have size values', () => {
      expect(maxWidth['xs']).toBe('20rem')
      expect(maxWidth['lg']).toBe('32rem')
      expect(maxWidth['7xl']).toBe('80rem')
    })

    it('should have special values', () => {
      expect(maxWidth['none']).toBe('none')
      expect(maxWidth['full']).toBe('100%')
      expect(maxWidth['prose']).toBe('65ch')
    })

    it('should have screen breakpoint values', () => {
      expect(maxWidth['screen-sm']).toBe('640px')
      expect(maxWidth['screen-md']).toBe('768px')
      expect(maxWidth['screen-lg']).toBe('1024px')
      expect(maxWidth['screen-xl']).toBe('1280px')
      expect(maxWidth['screen-2xl']).toBe('1536px')
    })
  })
})
