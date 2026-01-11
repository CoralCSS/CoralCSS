import { describe, it, expect } from 'vitest'
import {
  withCoral,
  withCoralApp,
  withCoralPages,
  withCoralTurbopack,
  createCoralHandler,
  generateCoralStyles,
} from '../../../src/build/nextjs'

describe('Build Next.js', () => {
  describe('withCoral', () => {
    it('should be a function', () => {
      expect(typeof withCoral).toBe('function')
    })

    it('should return a function', () => {
      const result = withCoral()
      expect(typeof result).toBe('function')
    })

    it('should accept options', () => {
      const result = withCoral({
        content: ['./src/**/*.tsx'],
        darkMode: 'media',
        minify: false,
        output: 'custom.css',
        safelist: ['p-4', 'mt-2'],
      })
      expect(typeof result).toBe('function')
    })

    it('should return config with webpack function', () => {
      const withCoralConfig = withCoral()
      const config = withCoralConfig({})

      expect(typeof config.webpack).toBe('function')
    })

    it('should preserve existing config', () => {
      const withCoralConfig = withCoral()
      const config = withCoralConfig({
        reactStrictMode: true,
        swcMinify: true,
      })

      expect(config.reactStrictMode).toBe(true)
      expect(config.swcMinify).toBe(true)
    })

    it('should have webpack function in config', () => {
      const withCoralConfig = withCoral()
      const config = withCoralConfig({})

      expect(typeof config.webpack).toBe('function')
    })
  })

  describe('withCoralApp', () => {
    it('should be a function', () => {
      expect(typeof withCoralApp).toBe('function')
    })

    it('should return a function', () => {
      const result = withCoralApp()
      expect(typeof result).toBe('function')
    })

    it('should include app directory in content', () => {
      const withCoralAppConfig = withCoralApp()
      const config = withCoralAppConfig({})

      expect(typeof config.webpack).toBe('function')
    })

    it('should accept custom options', () => {
      const result = withCoralApp({
        darkMode: 'media',
        content: ['./custom/**/*.tsx'],
      })
      expect(typeof result).toBe('function')
    })
  })

  describe('withCoralPages', () => {
    it('should be a function', () => {
      expect(typeof withCoralPages).toBe('function')
    })

    it('should return a function', () => {
      const result = withCoralPages()
      expect(typeof result).toBe('function')
    })

    it('should include pages directory in content', () => {
      const withCoralPagesConfig = withCoralPages()
      const config = withCoralPagesConfig({})

      expect(typeof config.webpack).toBe('function')
    })
  })

  describe('withCoralTurbopack', () => {
    it('should be a function', () => {
      expect(typeof withCoralTurbopack).toBe('function')
    })

    it('should return a function', () => {
      const result = withCoralTurbopack()
      expect(typeof result).toBe('function')
    })

    it('should configure experimental turbo rules', () => {
      const withCoralTurboConfig = withCoralTurbopack()
      const config = withCoralTurboConfig({})

      expect(config.experimental).toBeDefined()
      expect(config.experimental!.turbo).toBeDefined()
    })

    it('should set environment variables', () => {
      const withCoralTurboConfig = withCoralTurbopack({
        darkMode: 'media',
      })
      const config = withCoralTurboConfig({})

      expect(config.env?.CORAL_DARK_MODE).toBe('media')
      expect(config.env?.CORAL_CONTENT).toBeDefined()
    })
  })

  describe('createCoralHandler', () => {
    it('should be a function', () => {
      expect(typeof createCoralHandler).toBe('function')
    })

    it('should return an async function', () => {
      const handler = createCoralHandler()
      expect(typeof handler).toBe('function')
    })

    it('should accept options', () => {
      const handler = createCoralHandler({
        darkMode: 'media',
        safelist: ['p-4', 'mt-2'],
      })
      expect(typeof handler).toBe('function')
    })

    it('should handle GET request with query params', async () => {
      const handler = createCoralHandler()
      const request = new Request('http://localhost/api/coral?classes=p-4,mt-2', {
        method: 'GET',
      })

      const response = await handler(request)
      expect(response.headers.get('Content-Type')).toBe('text/css')
    })

    it('should handle POST request with body', async () => {
      const handler = createCoralHandler()
      const request = new Request('http://localhost/api/coral', {
        method: 'POST',
        body: JSON.stringify({ classes: ['p-4', 'mt-2'] }),
      })

      const response = await handler(request)
      expect(response.headers.get('Content-Type')).toBe('text/css')
    })

    it('should include safelist classes', async () => {
      const handler = createCoralHandler({
        safelist: ['bg-coral-500'],
      })
      const request = new Request('http://localhost/api/coral', {
        method: 'GET',
      })

      const response = await handler(request)
      expect(response.status).toBe(200)
    })

    it('should set cache headers', async () => {
      const handler = createCoralHandler()
      const request = new Request('http://localhost/api/coral?classes=p-4', {
        method: 'GET',
      })

      const response = await handler(request)
      expect(response.headers.get('Cache-Control')).toContain('max-age')
    })
  })

  describe('generateCoralStyles', () => {
    it('should be an async function', () => {
      expect(typeof generateCoralStyles).toBe('function')
    })

    it('should generate style tag', async () => {
      const result = await generateCoralStyles({
        classes: ['p-4', 'mt-2'],
      })

      expect(result).toContain('<style')
      expect(result).toContain('data-coral')
      expect(result).toContain('</style>')
    })

    it('should accept dark mode option', async () => {
      const result = await generateCoralStyles({
        classes: ['p-4'],
        darkMode: 'media',
      })

      expect(result).toContain('<style')
    })

    it('should include additional CSS', async () => {
      const result = await generateCoralStyles({
        classes: ['p-4'],
        additionalCSS: '\n.custom { color: red; }',
      })

      expect(result).toContain('.custom')
    })
  })
})
