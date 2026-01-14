/**
 * Design System CLI Tests
 *
 * Tests for CLI commands for managing design tokens.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  parseTokenArgs,
  runTokenCLI,
  printTokenHelp,
  TokenCLIOptions,
} from '../../../src/design-system/cli'

describe('Design System CLI', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {})
    vi.spyOn(console, 'error').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('parseTokenArgs', () => {
    it('should return default options with empty args', () => {
      const result = parseTokenArgs([])

      expect(result.command).toBe('build')
      expect(result.output).toBe('dist/tokens')
      expect(result.platforms).toContain('web')
      expect(result.prefix).toBe('coral')
      expect(result.includeDeprecated).toBe(false)
      expect(result.verbose).toBe(false)
      expect(result.watch).toBe(false)
    })

    it('should parse build command', () => {
      const result = parseTokenArgs(['build'])
      expect(result.command).toBe('build')
    })

    it('should parse export command', () => {
      const result = parseTokenArgs(['export'])
      expect(result.command).toBe('export')
    })

    it('should parse validate command', () => {
      const result = parseTokenArgs(['validate'])
      expect(result.command).toBe('validate')
    })

    it('should parse figma command', () => {
      const result = parseTokenArgs(['figma'])
      expect(result.command).toBe('figma')
    })

    it('should parse list command', () => {
      const result = parseTokenArgs(['list'])
      expect(result.command).toBe('list')
    })

    it('should parse init command', () => {
      const result = parseTokenArgs(['init'])
      expect(result.command).toBe('init')
    })

    it('should parse -o/--output option', () => {
      const result1 = parseTokenArgs(['-o', 'custom/path'])
      expect(result1.output).toBe('custom/path')

      const result2 = parseTokenArgs(['--output', 'another/path'])
      expect(result2.output).toBe('another/path')
    })

    it('should parse -p/--platforms option', () => {
      const result1 = parseTokenArgs(['-p', 'web,ios,android'])
      expect(result1.platforms).toEqual(['web', 'ios', 'android'])

      const result2 = parseTokenArgs(['--platforms', 'figma'])
      expect(result2.platforms).toEqual(['figma'])
    })

    it('should parse -i/--input option', () => {
      const result1 = parseTokenArgs(['-i', 'input.json'])
      expect(result1.input).toBe('input.json')

      const result2 = parseTokenArgs(['--input', 'tokens.json'])
      expect(result2.input).toBe('tokens.json')
    })

    it('should parse -f/--format option', () => {
      const result1 = parseTokenArgs(['-f', 'json'])
      expect(result1.format).toBe('json')

      const result2 = parseTokenArgs(['--format', 'css'])
      expect(result2.format).toBe('css')
    })

    it('should parse --prefix option', () => {
      const result = parseTokenArgs(['--prefix', 'myapp'])
      expect(result.prefix).toBe('myapp')
    })

    it('should parse --include-deprecated flag', () => {
      const result = parseTokenArgs(['--include-deprecated'])
      expect(result.includeDeprecated).toBe(true)
    })

    it('should parse -v/--verbose flag', () => {
      const result1 = parseTokenArgs(['-v'])
      expect(result1.verbose).toBe(true)

      const result2 = parseTokenArgs(['--verbose'])
      expect(result2.verbose).toBe(true)
    })

    it('should parse -w/--watch flag', () => {
      const result1 = parseTokenArgs(['-w'])
      expect(result1.watch).toBe(true)

      const result2 = parseTokenArgs(['--watch'])
      expect(result2.watch).toBe(true)
    })

    it('should parse --preset option', () => {
      const result = parseTokenArgs(['--preset', 'web'])
      expect(result.platforms).toContain('web')
      expect(result.platforms).toContain('web-scss')
    })

    it('should handle invalid preset gracefully', () => {
      const result = parseTokenArgs(['--preset', 'invalid'])
      // Should not change platforms for invalid preset
      expect(result.platforms).toBeDefined()
    })

    it('should parse combined options', () => {
      const result = parseTokenArgs([
        'build',
        '-o', 'output',
        '-p', 'web,ios',
        '--prefix', 'app',
        '-v',
      ])

      expect(result.command).toBe('build')
      expect(result.output).toBe('output')
      expect(result.platforms).toEqual(['web', 'ios'])
      expect(result.prefix).toBe('app')
      expect(result.verbose).toBe(true)
    })
  })

  describe('runTokenCLI', () => {
    describe('build command', () => {
      it('should run build command successfully', async () => {
        const options: TokenCLIOptions = {
          command: 'build',
          platforms: ['web'],
          output: 'dist/tokens',
          prefix: 'coral',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Successfully built tokens')
        expect(result.outputs).toBeDefined()
      })

      it('should build with verbose output', async () => {
        const options: TokenCLIOptions = {
          command: 'build',
          platforms: ['web'],
          verbose: true,
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(console.log).toHaveBeenCalled()
      })
    })

    describe('export command', () => {
      it('should export tokens as JSON', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'json',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Exported tokens')
        expect(result.data).toBeDefined()
      })

      it('should export tokens as CSS', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'css',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should export tokens as SCSS', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'scss',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should export tokens as JS', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'js',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should export tokens as TS', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'ts',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should export tokens as Figma format', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'figma',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should export tokens as Figma variables', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'figma-variables',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
      })

      it('should handle unknown format', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'unknown' as any,
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(false)
        expect(result.error).toContain('Unknown format')
      })

      it('should export with verbose output', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'json',
          verbose: true,
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(console.log).toHaveBeenCalled()
      })

      it('should use output path when provided', async () => {
        const options: TokenCLIOptions = {
          command: 'export',
          format: 'json',
          output: 'custom/output',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.outputs).toBeDefined()
        // Should contain custom path
        const paths = Array.from(result.outputs?.keys() || [])
        expect(paths[0]).toContain('custom/output')
      })
    })

    describe('validate command', () => {
      it('should validate tokens successfully', async () => {
        const options: TokenCLIOptions = {
          command: 'validate',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBeDefined()
        expect(result.data).toBeDefined()
      })

      it('should validate with verbose output', async () => {
        const options: TokenCLIOptions = {
          command: 'validate',
          verbose: true,
        }

        const result = await runTokenCLI(options)

        expect(result.data).toBeDefined()
        expect(console.log).toHaveBeenCalled()
      })

      it('should validate from input file', async () => {
        const options: TokenCLIOptions = {
          command: 'validate',
          input: 'tokens.json',
        }

        const result = await runTokenCLI(options)

        // Should handle input file (uses coralTokens as placeholder)
        expect(result.data).toBeDefined()
      })
    })

    describe('figma command', () => {
      it('should export to Figma format', async () => {
        const options: TokenCLIOptions = {
          command: 'figma',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Figma')
      })

      it('should export to Figma variables format', async () => {
        const options: TokenCLIOptions = {
          command: 'figma',
          format: 'figma-variables',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('Figma Variables')
      })

      it('should import from Figma tokens file', async () => {
        const options: TokenCLIOptions = {
          command: 'figma',
          input: 'figma-tokens.json',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('imported')
      })
    })

    describe('list command', () => {
      it('should list available platforms', async () => {
        const options: TokenCLIOptions = {
          command: 'list',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.data).toHaveProperty('platforms')
        expect(result.data).toHaveProperty('presets')
      })
    })

    describe('init command', () => {
      it('should initialize token configuration', async () => {
        const options: TokenCLIOptions = {
          command: 'init',
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(true)
        expect(result.message).toContain('initialized')
        expect(result.outputs).toBeDefined()
        expect(result.outputs?.has('coral.tokens.ts')).toBe(true)
      })
    })

    describe('error handling', () => {
      it('should handle unknown command', async () => {
        const options = {
          command: 'unknown' as any,
        }

        const result = await runTokenCLI(options)

        expect(result.success).toBe(false)
        expect(result.error).toContain('Unknown command')
      })
    })
  })

  describe('printTokenHelp', () => {
    it('should print help text', () => {
      printTokenHelp()

      expect(console.log).toHaveBeenCalled()
      const logCalls = (console.log as any).mock.calls
      const output = logCalls.map((call: any[]) => call[0]).join('\n')

      expect(output).toContain('CoralCSS Design Tokens CLI')
      expect(output).toContain('Commands')
      expect(output).toContain('Options')
      expect(output).toContain('Examples')
    })
  })
})
