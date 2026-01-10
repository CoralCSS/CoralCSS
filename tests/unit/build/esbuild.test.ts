import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { coralEsbuildPlugin, createCSSLoader } from '../../../src/build/esbuild'
import { promises as fs } from 'fs'
import path from 'path'

// Mock fs module
vi.mock('fs', () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
  },
}))

describe('Build esbuild', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })
  describe('coralEsbuildPlugin', () => {
    it('should create a plugin with name', () => {
      const plugin = coralEsbuildPlugin()
      expect(plugin.name).toBe('coral-esbuild')
    })

    it('should accept custom options', () => {
      const plugin = coralEsbuildPlugin({
        include: [/\.tsx$/],
        exclude: [/node_modules/],
        minify: false,
        darkMode: 'media',
        outFile: 'dist/coral.css',
        base: '/* base */\n',
        watch: true,
      })
      expect(plugin.name).toBe('coral-esbuild')
    })

    it('should have setup method', () => {
      const plugin = coralEsbuildPlugin()
      expect(typeof plugin.setup).toBe('function')
    })

    it('should register resolvers and loaders in setup', () => {
      const plugin = coralEsbuildPlugin()

      const mockOnResolve = vi.fn()
      const mockOnLoad = vi.fn()
      const mockOnEnd = vi.fn()

      const mockBuild = {
        onResolve: mockOnResolve,
        onLoad: mockOnLoad,
        onEnd: mockOnEnd,
      }

      plugin.setup(mockBuild as never)

      expect(mockOnResolve).toHaveBeenCalledTimes(2)
      expect(mockOnLoad).toHaveBeenCalledTimes(2)
      expect(mockOnEnd).toHaveBeenCalledTimes(1)
    })

    it('should resolve virtual:coral.css', () => {
      const plugin = coralEsbuildPlugin()

      let virtualResolveHandler: ((args: { path: string }) => { path: string; namespace: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('virtual:coral.css')) {
            virtualResolveHandler = handler
          }
        }),
        onLoad: vi.fn(),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      expect(virtualResolveHandler).toBeDefined()
      const result = virtualResolveHandler!({ path: 'virtual:coral.css' })
      expect(result).toEqual({
        path: 'virtual:coral.css',
        namespace: 'coral-css',
      })
    })

    it('should resolve coral.css', () => {
      const plugin = coralEsbuildPlugin()

      let coralResolveHandler: ((args: { path: string }) => { path: string; namespace: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('coral\\.css')) {
            coralResolveHandler = handler
          }
        }),
        onLoad: vi.fn(),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      expect(coralResolveHandler).toBeDefined()
      const result = coralResolveHandler!({ path: 'coral.css' })
      expect(result).toEqual({
        path: 'virtual:coral.css',
        namespace: 'coral-css',
      })
    })

    it('should load virtual CSS module', () => {
      const plugin = coralEsbuildPlugin()

      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      expect(virtualLoadHandler).toBeDefined()
      const result = virtualLoadHandler!()
      expect(result.loader).toBe('css')
      expect(typeof result.contents).toBe('string')
    })
  })

  describe('createCSSLoader', () => {
    it('should return loader code', () => {
      const loader = createCSSLoader()
      expect(typeof loader).toBe('string')
    })

    it('should include injectCSS function', () => {
      const loader = createCSSLoader()
      expect(loader).toContain('export function injectCSS')
    })

    it('should include updateCSS function', () => {
      const loader = createCSSLoader()
      expect(loader).toContain('export function updateCSS')
    })

    it('should check for document', () => {
      const loader = createCSSLoader()
      expect(loader).toContain("typeof document !== 'undefined'")
    })

    it('should create style element', () => {
      const loader = createCSSLoader()
      expect(loader).toContain("document.createElement('style')")
    })

    it('should set data-coral attribute', () => {
      const loader = createCSSLoader()
      expect(loader).toContain("setAttribute('data-coral'")
    })

    it('should append to head', () => {
      const loader = createCSSLoader()
      expect(loader).toContain('document.head.appendChild')
    })

    it('should query existing style for update', () => {
      const loader = createCSSLoader()
      expect(loader).toContain("querySelector('style[data-coral]')")
    })
  })

  describe('source file loading', () => {
    it('should extract classes from source files', async () => {
      const plugin = coralEsbuildPlugin({
        include: [/\.tsx$/],
        exclude: [/node_modules/],
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      // Mock file read
      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="bg-red-500 p-4">Test</div>')

      // Process source file
      const result = await sourceLoadHandler!({ path: '/src/App.tsx' })
      expect(result).toBeNull()

      // Check that CSS is generated
      const cssResult = virtualLoadHandler!()
      expect(cssResult.loader).toBe('css')
    })

    it('should skip excluded files', async () => {
      const plugin = coralEsbuildPlugin({
        include: [/\.tsx$/],
        exclude: [/node_modules/],
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      // Should skip node_modules
      const result = await sourceLoadHandler!({ path: '/node_modules/package/index.tsx' })
      expect(result).toBeNull()
    })

    it('should skip files not matching include pattern', async () => {
      const plugin = coralEsbuildPlugin({
        include: [/\.tsx$/],
        exclude: [],
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      // Should skip non-tsx file (won't match /\.tsx$/)
      const result = await sourceLoadHandler!({ path: '/src/App.js' })
      expect(result).toBeNull()
    })

    it('should handle file read errors gracefully', async () => {
      const plugin = coralEsbuildPlugin({
        include: [/\.tsx$/],
        exclude: [],
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      // Mock file read error
      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockRejectedValue(new Error('File not found'))

      // Should return null on error
      const result = await sourceLoadHandler!({ path: '/src/App.tsx' })
      expect(result).toBeNull()
    })
  })

  describe('onEnd handler', () => {
    it('should write CSS file when outFile is specified', async () => {
      const plugin = coralEsbuildPlugin({
        outFile: 'dist/coral.css',
        minify: true,
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let endHandler: (() => Promise<void>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn((handler) => {
          endHandler = handler
        }),
      }

      plugin.setup(mockBuild as never)

      // Mock file operations
      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      const mockWriteFile = fs.writeFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="bg-blue-500">Test</div>')
      mockWriteFile.mockResolvedValue(undefined)

      // First, process a file to add classes
      await sourceLoadHandler!({ path: '/src/App.tsx' })

      // Then call onEnd
      await endHandler!()

      // Check that file was written
      expect(mockWriteFile).toHaveBeenCalledWith(
        'dist/coral.css',
        expect.any(String),
        'utf-8'
      )
    })

    it('should not write file when no outFile is specified', async () => {
      const plugin = coralEsbuildPlugin()

      let endHandler: (() => Promise<void>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn(),
        onEnd: vi.fn((handler) => {
          endHandler = handler
        }),
      }

      plugin.setup(mockBuild as never)

      const mockWriteFile = fs.writeFile as unknown as ReturnType<typeof vi.fn>

      await endHandler!()

      // Should not write file
      expect(mockWriteFile).not.toHaveBeenCalled()
    })

    it('should prepend base CSS when specified', async () => {
      const baseCSS = '/* Custom base */'
      const plugin = coralEsbuildPlugin({
        outFile: 'dist/coral.css',
        base: baseCSS,
      })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let endHandler: (() => Promise<void>) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.filter.toString().includes('jsx')) {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn((handler) => {
          endHandler = handler
        }),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      const mockWriteFile = fs.writeFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="p-4">Test</div>')
      mockWriteFile.mockResolvedValue(undefined)

      await sourceLoadHandler!({ path: '/src/App.tsx' })
      await endHandler!()

      // Verify base CSS is included
      expect(mockWriteFile).toHaveBeenCalledWith(
        'dist/coral.css',
        expect.stringContaining(baseCSS),
        'utf-8'
      )
    })
  })

  describe('class extraction patterns', () => {
    it('should extract classes from class attribute', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div class="flex items-center gap-4">Test</div>')

      await sourceLoadHandler!({ path: '/src/test.html' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from className attribute', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="text-xl font-bold">Test</div>')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from template literals', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('className={`bg-green-500 ${active ? "text-white" : ""}`}')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from cn/clsx/cva functions', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue(`
        cn('px-4 py-2')
        clsx('rounded-lg shadow-md')
        cva('btn-primary')
        classnames('hover:bg-blue-500')
      `)

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from @apply directive', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue(`
        .btn {
          @apply px-4 py-2 rounded;
        }
      `)

      await sourceLoadHandler!({ path: '/src/styles.css' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from tw tagged template', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('tw`bg-purple-500 text-white`')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should extract classes from css tagged template with @apply', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('css`@apply flex items-center gap-2`')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should handle css tagged template without @apply', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      // css`` without @apply - should still be parsed but not extract classes
      mockReadFile.mockResolvedValue('css`color: red; background: blue;`')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.loader).toBe('css')
    })

    it('should handle css tagged template with multiple @apply directives', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      // Multiple @apply in css``
      mockReadFile.mockResolvedValue('css`@apply flex; @apply items-center justify-center;`')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })

    it('should handle tw template with dynamic values', async () => {
      const plugin = coralEsbuildPlugin()

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      // tw`` with dynamic interpolation - should extract static parts only
      mockReadFile.mockResolvedValue('tw`bg-${color} text-white hover:opacity-80`')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })
  })

  describe('CSS minification', () => {
    it('should minify CSS when minify option is true', async () => {
      const plugin = coralEsbuildPlugin({ minify: true })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="m-4">Test</div>')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      // Minified CSS should not have extra whitespace
      expect(result.contents).toBeDefined()
    })

    it('should not minify CSS when minify option is false', async () => {
      const plugin = coralEsbuildPlugin({ minify: false })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="p-4">Test</div>')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toBeDefined()
    })
  })

  describe('virtual module loading with base CSS', () => {
    it('should prepend base CSS to virtual module', async () => {
      const baseCSS = '/* Base styles */'
      const plugin = coralEsbuildPlugin({ base: baseCSS })

      let sourceLoadHandler: ((args: { path: string }) => Promise<null>) | undefined
      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          } else {
            sourceLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const mockReadFile = fs.readFile as unknown as ReturnType<typeof vi.fn>
      mockReadFile.mockResolvedValue('<div className="mt-8">Test</div>')

      await sourceLoadHandler!({ path: '/src/App.tsx' })

      const result = virtualLoadHandler!()
      expect(result.contents).toContain(baseCSS)
    })

    it('should return empty base when no classes extracted', () => {
      const plugin = coralEsbuildPlugin()

      let virtualLoadHandler: (() => { contents: string; loader: string }) | undefined

      const mockBuild = {
        onResolve: vi.fn(),
        onLoad: vi.fn((opts, handler) => {
          if (opts.namespace === 'coral-css') {
            virtualLoadHandler = handler
          }
        }),
        onEnd: vi.fn(),
      }

      plugin.setup(mockBuild as never)

      const result = virtualLoadHandler!()
      expect(result.loader).toBe('css')
      expect(result.contents).toBe('')
    })
  })
})
