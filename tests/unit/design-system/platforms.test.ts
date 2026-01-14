/**
 * Platform Configurations Tests
 *
 * Tests for output configurations for different platforms.
 */
import { describe, it, expect } from 'vitest'
import {
  platformConfigs,
  getAvailablePlatforms,
  getPlatformConfig,
  createPlatformConfig,
  filters,
  platformPresets,
} from '../../../src/design-system/platforms'

describe('Platform Configurations', () => {
  describe('platformConfigs', () => {
    it('should have web platform config', () => {
      expect(platformConfigs['web']).toBeDefined()
      expect(platformConfigs['web'].transformGroup).toBe('web')
      expect(platformConfigs['web'].files.length).toBeGreaterThan(0)
    })

    it('should have web-css-vars platform config', () => {
      expect(platformConfigs['web-css-vars']).toBeDefined()
    })

    it('should have web-scss platform config', () => {
      expect(platformConfigs['web-scss']).toBeDefined()
      expect(platformConfigs['web-scss'].transformGroup).toBe('scss')
    })

    it('should have web-js platform config', () => {
      expect(platformConfigs['web-js']).toBeDefined()
      expect(platformConfigs['web-js'].transformGroup).toBe('js')
    })

    it('should have web-ts platform config', () => {
      expect(platformConfigs['web-ts']).toBeDefined()
      expect(platformConfigs['web-ts'].transformGroup).toBe('ts')
    })

    it('should have ios platform config', () => {
      expect(platformConfigs['ios']).toBeDefined()
      expect(platformConfigs['ios'].transformGroup).toBe('ios')
    })

    it('should have ios-swift platform config', () => {
      expect(platformConfigs['ios-swift']).toBeDefined()
      expect(platformConfigs['ios-swift'].transformGroup).toBe('ios-swiftui')
    })

    it('should have android platform config', () => {
      expect(platformConfigs['android']).toBeDefined()
      expect(platformConfigs['android'].transformGroup).toBe('android')
    })

    it('should have android-compose platform config', () => {
      expect(platformConfigs['android-compose']).toBeDefined()
      expect(platformConfigs['android-compose'].transformGroup).toBe('compose')
    })

    it('should have react-native platform config', () => {
      expect(platformConfigs['react-native']).toBeDefined()
      expect(platformConfigs['react-native'].transformGroup).toBe('react-native')
    })

    it('should have flutter platform config', () => {
      expect(platformConfigs['flutter']).toBeDefined()
      expect(platformConfigs['flutter'].transformGroup).toBe('flutter')
    })

    it('should have figma platform config', () => {
      expect(platformConfigs['figma']).toBeDefined()
      expect(platformConfigs['figma'].transformGroup).toBe('figma')
    })

    it('should have proper file configurations', () => {
      for (const [name, config] of Object.entries(platformConfigs)) {
        expect(config.files).toBeDefined()
        expect(config.files.length).toBeGreaterThan(0)

        for (const file of config.files) {
          expect(file.destination).toBeDefined()
          expect(file.format).toBeDefined()
        }
      }
    })
  })

  describe('getAvailablePlatforms', () => {
    it('should return all available platforms', () => {
      const platforms = getAvailablePlatforms()

      expect(platforms).toBeInstanceOf(Array)
      expect(platforms.length).toBeGreaterThan(0)
      expect(platforms).toContain('web')
      expect(platforms).toContain('ios')
      expect(platforms).toContain('android')
    })

    it('should match platformConfigs keys', () => {
      const platforms = getAvailablePlatforms()
      const configKeys = Object.keys(platformConfigs)

      expect(platforms.sort()).toEqual(configKeys.sort())
    })
  })

  describe('getPlatformConfig', () => {
    it('should return config for valid platform', () => {
      const config = getPlatformConfig('web')

      expect(config).toBeDefined()
      expect(config?.transformGroup).toBe('web')
    })

    it('should return config for ios platform', () => {
      const config = getPlatformConfig('ios')

      expect(config).toBeDefined()
      expect(config?.files[0]?.destination).toContain('.swift')
    })

    it('should return undefined for invalid platform', () => {
      const config = getPlatformConfig('invalid' as any)

      expect(config).toBeUndefined()
    })
  })

  describe('createPlatformConfig', () => {
    it('should create config based on existing platform', () => {
      const config = createPlatformConfig('web', {
        buildPath: 'custom/',
      })

      expect(config.transformGroup).toBe('web')
      expect(config.buildPath).toBe('custom/')
    })

    it('should override files when provided', () => {
      const customFiles = [
        { destination: 'custom.css', format: 'css/variables' },
      ]
      const config = createPlatformConfig('web', {
        files: customFiles,
      })

      expect(config.files).toEqual(customFiles)
    })

    it('should keep base files when not overridden', () => {
      const config = createPlatformConfig('web', {
        prefix: 'custom',
      })

      expect(config.files).toEqual(platformConfigs['web'].files)
    })

    it('should throw for unknown base platform', () => {
      expect(() => {
        createPlatformConfig('invalid' as any, {})
      }).toThrow('Unknown base platform')
    })
  })

  describe('filters', () => {
    describe('isColor', () => {
      it('should return true for color tokens', () => {
        const token = { original: { $type: 'color' } }
        expect(filters.isColor(token)).toBe(true)
      })

      it('should return false for non-color tokens', () => {
        const token = { original: { $type: 'spacing' } }
        expect(filters.isColor(token)).toBe(false)
      })
    })

    describe('isDimension', () => {
      it('should return true for dimension tokens', () => {
        const dimensionTypes = ['dimension', 'spacing', 'sizing', 'borderRadius']

        for (const type of dimensionTypes) {
          const token = { original: { $type: type } }
          expect(filters.isDimension(token)).toBe(true)
        }
      })

      it('should return false for non-dimension tokens', () => {
        const token = { original: { $type: 'color' } }
        expect(filters.isDimension(token)).toBe(false)
      })
    })

    describe('isTypography', () => {
      it('should return true for typography type tokens', () => {
        const typographyTypes = ['fontFamily', 'fontWeight', 'fontStyle']

        for (const type of typographyTypes) {
          const token = { original: { $type: type }, path: ['other'] }
          expect(filters.isTypography(token)).toBe(true)
        }
      })

      it('should return true for typography path tokens', () => {
        const token = { original: { $type: 'unknown' }, path: ['typography', 'something'] }
        expect(filters.isTypography(token)).toBe(true)
      })

      it('should return false for non-typography tokens', () => {
        const token = { original: { $type: 'color' }, path: ['color', 'primary'] }
        expect(filters.isTypography(token)).toBe(false)
      })
    })

    describe('isShadow', () => {
      it('should return true for shadow tokens', () => {
        const token = { original: { $type: 'shadow' } }
        expect(filters.isShadow(token)).toBe(true)
      })

      it('should return false for non-shadow tokens', () => {
        const token = { original: { $type: 'color' } }
        expect(filters.isShadow(token)).toBe(false)
      })
    })

    describe('isMotion', () => {
      it('should return true for duration tokens', () => {
        const token = { original: { $type: 'duration' } }
        expect(filters.isMotion(token)).toBe(true)
      })

      it('should return true for cubicBezier tokens', () => {
        const token = { original: { $type: 'cubicBezier' } }
        expect(filters.isMotion(token)).toBe(true)
      })

      it('should return false for non-motion tokens', () => {
        const token = { original: { $type: 'color' } }
        expect(filters.isMotion(token)).toBe(false)
      })
    })

    describe('isSemantic', () => {
      it('should return true for reference values', () => {
        const token = { value: '{color.primary}' }
        expect(filters.isSemantic(token)).toBe(true)
      })

      it('should return true for CSS var references', () => {
        const token = { value: 'var(--color-primary)' }
        expect(filters.isSemantic(token)).toBe(true)
      })

      it('should return false for primitive values', () => {
        const token = { value: '#ff6347' }
        expect(filters.isSemantic(token)).toBe(false)
      })
    })

    describe('isPrimitive', () => {
      it('should return true for non-reference values', () => {
        const token = { value: '#ff6347' }
        expect(filters.isPrimitive(token)).toBe(true)
      })

      it('should return false for reference values', () => {
        const token = { value: '{color.primary}' }
        expect(filters.isPrimitive(token)).toBe(false)
      })

      it('should return false for CSS var values', () => {
        const token = { value: 'var(--color-primary)' }
        expect(filters.isPrimitive(token)).toBe(false)
      })
    })
  })

  describe('platformPresets', () => {
    it('should have web preset', () => {
      expect(platformPresets.web).toBeDefined()
      expect(platformPresets.web).toContain('web')
      expect(platformPresets.web).toContain('web-scss')
      expect(platformPresets.web).toContain('web-js')
      expect(platformPresets.web).toContain('web-ts')
    })

    it('should have mobile preset', () => {
      expect(platformPresets.mobile).toBeDefined()
      expect(platformPresets.mobile).toContain('ios')
      expect(platformPresets.mobile).toContain('android')
    })

    it('should have crossPlatform preset', () => {
      expect(platformPresets.crossPlatform).toBeDefined()
      expect(platformPresets.crossPlatform).toContain('web')
      expect(platformPresets.crossPlatform).toContain('ios-swift')
      expect(platformPresets.crossPlatform).toContain('android-compose')
      expect(platformPresets.crossPlatform).toContain('react-native')
    })

    it('should have design preset', () => {
      expect(platformPresets.design).toBeDefined()
      expect(platformPresets.design).toContain('figma')
      expect(platformPresets.design).toContain('web')
    })

    it('should have all preset with all platforms', () => {
      expect(platformPresets.all).toBeDefined()
      expect(platformPresets.all.length).toBe(getAvailablePlatforms().length)
    })
  })
})
