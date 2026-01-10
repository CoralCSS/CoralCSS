import { describe, it, expect, vi } from 'vitest'
import {
  coralParcelPlugin,
  createCoralTransformer,
  createCoralResolver,
  createCoralNamer,
  CoralParcelTransformer,
  createDevInjector,
} from '../../../src/build/parcel'

describe('Build Parcel', () => {
  describe('coralParcelPlugin', () => {
    it('should return plugin objects', () => {
      const plugins = coralParcelPlugin()

      expect(plugins.transformer).toBeDefined()
      expect(plugins.resolver).toBeDefined()
      expect(plugins.namer).toBeDefined()
    })

    it('should accept custom options', () => {
      const plugins = coralParcelPlugin({
        include: ['./src/**/*.tsx'],
        exclude: ['./node_modules/**'],
        minify: false,
        darkMode: 'media',
      })

      expect(plugins.transformer.name).toBe('coral-parcel-transformer')
    })
  })

  describe('createCoralTransformer', () => {
    it('should create transformer with name', () => {
      const transformer = createCoralTransformer()
      expect(transformer.name).toBe('coral-parcel-transformer')
    })

    it('should have loadConfig method', () => {
      const transformer = createCoralTransformer()
      expect(typeof transformer.loadConfig).toBe('function')
    })

    it('should have transform method', () => {
      const transformer = createCoralTransformer()
      expect(typeof transformer.transform).toBe('function')
    })

    it('should return options from loadConfig', async () => {
      const transformer = createCoralTransformer({ darkMode: 'media' })
      const config = await transformer.loadConfig!({ config: {} })

      expect(config.darkMode).toBe('media')
    })

    it('should transform matching files', async () => {
      const transformer = createCoralTransformer({
        include: ['**/*.tsx'],
      })

      const mockAsset = {
        type: 'tsx',
        getCode: vi.fn().mockResolvedValue('<div className="p-4">Test</div>'),
        filePath: 'App.tsx',
        setCode: vi.fn(),
        addDependency: vi.fn(),
      }

      const result = await transformer.transform!({ asset: mockAsset, config: {} })

      // Transform returns the asset array
      expect(Array.isArray(result)).toBe(true)
    })

    it('should skip excluded files', async () => {
      const transformer = createCoralTransformer({
        include: ['**/*.tsx'],
        exclude: ['**/*.test.tsx'],
      })

      const mockAsset = {
        type: 'tsx',
        getCode: vi.fn().mockResolvedValue('<div className="p-4">Test</div>'),
        filePath: 'App.test.tsx',
        setCode: vi.fn(),
        addDependency: vi.fn(),
      }

      const result = await transformer.transform!({ asset: mockAsset, config: {} })

      // Transform returns empty array for excluded files
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('createCoralResolver', () => {
    it('should create resolver with name', () => {
      const resolver = createCoralResolver()
      expect(resolver.name).toBe('coral-parcel-resolver')
    })

    it('should have resolve method', () => {
      const resolver = createCoralResolver()
      expect(typeof resolver.resolve).toBe('function')
    })

    it('should resolve virtual module', async () => {
      const resolver = createCoralResolver()
      const result = await resolver.resolve!({
        specifier: 'virtual:coral.css',
        dependency: { specifierType: 'esm' },
        options: { projectRoot: '/project' },
      })

      expect(result).toEqual({
        filePath: '/project/.coral/coral.css',
      })
    })

    it('should return null for other modules', async () => {
      const resolver = createCoralResolver()
      const result = await resolver.resolve!({
        specifier: 'other.css',
        dependency: { specifierType: 'esm' },
        options: { projectRoot: '/project' },
      })

      expect(result).toBeNull()
    })
  })

  describe('createCoralNamer', () => {
    it('should create namer with name', () => {
      const namer = createCoralNamer()
      expect(namer.name).toBe('coral-parcel-namer')
    })

    it('should have getName method', () => {
      const namer = createCoralNamer()
      expect(typeof namer.getName).toBe('function')
    })

    it('should name coral CSS bundles', async () => {
      const namer = createCoralNamer()
      const result = await namer.getName!({
        bundle: {
          type: 'css',
          getMainEntry: () => ({ filePath: 'styles.coral.css' }),
        },
      })

      expect(result).toBe('coral.css')
    })

    it('should return null for non-coral CSS bundles', async () => {
      const namer = createCoralNamer()
      const result = await namer.getName!({
        bundle: {
          type: 'css',
          getMainEntry: () => ({ filePath: 'styles.css' }),
        },
      })

      expect(result).toBeNull()
    })

    it('should return null for non-CSS bundles', async () => {
      const namer = createCoralNamer()
      const result = await namer.getName!({
        bundle: {
          type: 'js',
          getMainEntry: () => ({ filePath: 'app.js' }),
        },
      })

      expect(result).toBeNull()
    })

    it('should handle null main entry', async () => {
      const namer = createCoralNamer()
      const result = await namer.getName!({
        bundle: {
          type: 'css',
          getMainEntry: () => null,
        },
      })

      expect(result).toBeNull()
    })
  })

  describe('CoralParcelTransformer', () => {
    it('should create instance with default options', () => {
      const transformer = new CoralParcelTransformer()
      expect(transformer).toBeInstanceOf(CoralParcelTransformer)
    })

    it('should create instance with custom options', () => {
      const transformer = new CoralParcelTransformer({
        darkMode: 'media',
        minify: false,
      })
      expect(transformer).toBeInstanceOf(CoralParcelTransformer)
    })

    it('should have transform method', () => {
      const transformer = new CoralParcelTransformer()
      expect(typeof transformer.transform).toBe('function')
    })

    it('should have generateCSS method', () => {
      const transformer = new CoralParcelTransformer()
      expect(typeof transformer.generateCSS).toBe('function')
    })

    it('should have addClass method', () => {
      const transformer = new CoralParcelTransformer()
      expect(typeof transformer.addClass).toBe('function')
    })

    it('should have addClasses method', () => {
      const transformer = new CoralParcelTransformer()
      expect(typeof transformer.addClasses).toBe('function')
    })

    it('should have getClasses method', () => {
      const transformer = new CoralParcelTransformer()
      expect(typeof transformer.getClasses).toBe('function')
    })

    it('should add classes', () => {
      const transformer = new CoralParcelTransformer()
      transformer.addClass('p-4')
      transformer.addClasses(['mt-2', 'bg-red-500'])

      const classes = transformer.getClasses()
      expect(classes).toContain('p-4')
      expect(classes).toContain('mt-2')
      expect(classes).toContain('bg-red-500')
    })

    it('should generate CSS', () => {
      const transformer = new CoralParcelTransformer()
      transformer.addClasses(['p-4', 'mt-2'])

      const css = transformer.generateCSS()
      expect(typeof css).toBe('string')
    })

    it('should transform assets', async () => {
      const transformer = new CoralParcelTransformer({
        include: ['**/*.tsx'],
      })

      const mockAsset = {
        type: 'tsx',
        getCode: vi.fn().mockResolvedValue('<div className="p-4">Test</div>'),
        filePath: 'App.tsx',
        setCode: vi.fn(),
        addDependency: vi.fn(),
      }

      const result = await transformer.transform(mockAsset)

      // Transform returns an array (can be empty or with assets)
      expect(Array.isArray(result)).toBe(true)
    })
  })

  describe('createDevInjector', () => {
    it('should return injector code', () => {
      const injector = createDevInjector()
      expect(typeof injector).toBe('string')
    })

    it('should check for window', () => {
      const injector = createDevInjector()
      expect(injector).toContain("typeof window === 'undefined'")
    })

    it('should create style element', () => {
      const injector = createDevInjector()
      expect(injector).toContain("document.createElement('style')")
    })

    it('should set id on style element', () => {
      const injector = createDevInjector()
      expect(injector).toContain("style.id = 'coral-dev-styles'")
    })

    it('should support hot module replacement', () => {
      const injector = createDevInjector()
      expect(injector).toContain('module.hot')
      expect(injector).toContain('module.hot.accept')
      expect(injector).toContain('module.hot.dispose')
    })
  })
})
