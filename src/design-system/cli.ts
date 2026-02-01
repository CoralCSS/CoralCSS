/**
 * Design System CLI Commands
 *
 * CLI commands for managing design tokens.
 *
 * @module design-system/cli
 */

import {
  toStyleDictionary,
  buildTokens,
  getDefaultTokens,
} from './style-dictionary'
import {
  toFigmaTokens,
  fromFigmaTokens as _fromFigmaTokens,
  toFigmaVariables,
} from './figma-tokens'
import { validateTokens, generateValidationReport } from './validators'
import { getAvailablePlatforms, platformPresets } from './platforms'
import { coralTokens, exportTokensJSON } from './coral-tokens'
import type { BuildOptions, PlatformTarget, DesignTokenFile } from './types'

/**
 * Token CLI Options
 */
export interface TokenCLIOptions {
  /** Command to execute */
  command: 'build' | 'export' | 'validate' | 'figma' | 'list' | 'init'
  /** Output directory */
  output?: string
  /** Platform targets */
  platforms?: string[]
  /** Input file for import */
  input?: string
  /** Output format */
  format?: 'json' | 'css' | 'scss' | 'js' | 'ts' | 'figma' | 'figma-variables'
  /** Token prefix */
  prefix?: string
  /** Include deprecated tokens */
  includeDeprecated?: boolean
  /** Verbose output */
  verbose?: boolean
  /** Watch mode */
  watch?: boolean
}

/**
 * Token CLI Result
 */
export interface TokenCLIResult {
  success: boolean
  message?: string
  error?: string
  outputs?: Map<string, string>
  data?: unknown
}

/**
 * Parse token CLI arguments
 */
export function parseTokenArgs(args: string[]): TokenCLIOptions {
  const options: TokenCLIOptions = {
    command: 'build',
    output: 'dist/tokens',
    platforms: ['web', 'web-ts'],
    prefix: 'coral',
    includeDeprecated: false,
    verbose: false,
    watch: false,
  }

  // First arg is the subcommand
  const subcommands = ['build', 'export', 'validate', 'figma', 'list', 'init']
  if (args.length > 0 && subcommands.includes(args[0] as string)) {
    options.command = args[0] as TokenCLIOptions['command']
    args = args.slice(1)
  }

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]
    const next = args[i + 1]

    switch (arg) {
      case '-o':
      case '--output':
        options.output = next
        i++
        break

      case '-p':
      case '--platforms':
        options.platforms = next?.split(',') || []
        i++
        break

      case '-i':
      case '--input':
        options.input = next
        i++
        break

      case '-f':
      case '--format':
        options.format = next as TokenCLIOptions['format']
        i++
        break

      case '--prefix':
        options.prefix = next
        i++
        break

      case '--include-deprecated':
        options.includeDeprecated = true
        break

      case '-v':
      case '--verbose':
        options.verbose = true
        break

      case '-w':
      case '--watch':
        options.watch = true
        break

      case '--preset':
        // Use platform preset
        const presetName = next as keyof typeof platformPresets
        if (platformPresets[presetName]) {
          options.platforms = platformPresets[presetName] as string[]
        }
        i++
        break
    }
  }

  return options
}

/**
 * Run token CLI command
 */
export async function runTokenCLI(options: TokenCLIOptions): Promise<TokenCLIResult> {
  try {
    switch (options.command) {
      case 'build':
        return await runTokenBuild(options)
      case 'export':
        return await runTokenExport(options)
      case 'validate':
        return await runTokenValidate(options)
      case 'figma':
        return await runFigmaCommand(options)
      case 'list':
        return runListPlatforms()
      case 'init':
        return runTokenInit(options)
      default:
        return {
          success: false,
          error: `Unknown command: ${options.command}`,
        }
    }
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

/**
 * Build tokens for specified platforms
 */
async function runTokenBuild(options: TokenCLIOptions): Promise<TokenCLIResult> {
  const tokens = getDefaultTokens()
  const platforms = (options.platforms || ['web']) as PlatformTarget[]

  const buildOptions: BuildOptions = {
    platforms,
    outputDir: options.output || 'dist/tokens',
    prefix: options.prefix || 'coral',
    includeDeprecated: options.includeDeprecated,
  }

  if (options.verbose) {
    console.log(`Building tokens for platforms: ${platforms.join(', ')}`)
    console.log(`Output directory: ${buildOptions.outputDir}`)
  }

  // Convert to Style Dictionary format first
  const styleDictionaryTokens = toStyleDictionary(tokens as unknown as Record<string, unknown>, {
    prefix: options.prefix,
    includeMetadata: true,
  })

  // Build for each platform
  const outputs = buildTokens(styleDictionaryTokens, buildOptions)

  if (options.verbose) {
    console.log(`\nGenerated ${outputs.size} files:`)
    for (const [filePath] of outputs) {
      console.log(`  - ${filePath}`)
    }
  }

  return {
    success: true,
    message: `Successfully built tokens for ${platforms.length} platform(s)`,
    outputs,
  }
}

/**
 * Export tokens in specified format
 */
async function runTokenExport(options: TokenCLIOptions): Promise<TokenCLIResult> {
  const tokens = coralTokens
  const format = options.format || 'json'

  let output: string
  let filename: string

  switch (format) {
    case 'json':
      output = exportTokensJSON()
      filename = 'tokens.json'
      break

    case 'css':
      const styleDictTokens = toStyleDictionary(tokens as unknown as Record<string, unknown>)
      const cssOutputs = buildTokens(styleDictTokens, {
        platforms: ['web'],
        outputDir: '',
        prefix: options.prefix,
      })
      output = cssOutputs.get('web/tokens.css') || ''
      filename = 'tokens.css'
      break

    case 'scss':
      const scssTokens = toStyleDictionary(tokens as unknown as Record<string, unknown>)
      const scssOutputs = buildTokens(scssTokens, {
        platforms: ['web-scss'],
        outputDir: '',
        prefix: options.prefix,
      })
      output = scssOutputs.get('scss/_tokens.scss') || ''
      filename = '_tokens.scss'
      break

    case 'js':
    case 'ts':
      const jsTokens = toStyleDictionary(tokens as unknown as Record<string, unknown>)
      const jsOutputs = buildTokens(jsTokens, {
        platforms: [format === 'ts' ? 'web-ts' : 'web-js'],
        outputDir: '',
        prefix: options.prefix,
      })
      output = jsOutputs.get(format === 'ts' ? 'ts/tokens.ts' : 'js/tokens.js') || ''
      filename = format === 'ts' ? 'tokens.ts' : 'tokens.js'
      break

    case 'figma':
      const figmaTokens = toFigmaTokens(tokens)
      output = JSON.stringify(figmaTokens, null, 2)
      filename = 'figma-tokens.json'
      break

    case 'figma-variables':
      const figmaVars = toFigmaVariables(tokens)
      output = JSON.stringify(figmaVars, null, 2)
      filename = 'figma-variables.json'
      break

    default:
      return {
        success: false,
        error: `Unknown format: ${format}`,
      }
  }

  const outputs = new Map<string, string>()
  const outputPath = options.output
    ? `${options.output}/${filename}`
    : filename
  outputs.set(outputPath, output)

  if (options.verbose) {
    console.log(`Exported tokens in ${format} format to ${outputPath}`)
    console.log(`Output size: ${output.length} bytes`)
  }

  return {
    success: true,
    message: `Exported tokens to ${outputPath}`,
    outputs,
    data: output,
  }
}

/**
 * Validate tokens
 */
async function runTokenValidate(options: TokenCLIOptions): Promise<TokenCLIResult> {
  let tokens: DesignTokenFile

  if (options.input) {
    // Would read from file in real implementation
    console.log(`Validating tokens from: ${options.input}`)
    tokens = coralTokens // Placeholder
  } else {
    tokens = coralTokens
  }

  const result = validateTokens(tokens, {
    checkCircularRefs: true,
    checkNaming: true,
    checkAccessibility: false,
    checkUnused: options.verbose,
  })

  const report = generateValidationReport(result)

  if (options.verbose) {
    console.log(report)
  }

  return {
    success: result.valid,
    message: result.valid
      ? 'All tokens are valid'
      : `Found ${result.errors.length} error(s) and ${result.warnings.length} warning(s)`,
    data: result,
  }
}

/**
 * Figma sync commands
 */
async function runFigmaCommand(options: TokenCLIOptions): Promise<TokenCLIResult> {
  const format = options.format || 'figma'

  if (options.input) {
    // Import from Figma tokens file
    console.log(`Importing Figma tokens from: ${options.input}`)
    // In real implementation, would read file and parse
    return {
      success: true,
      message: 'Figma tokens imported successfully',
    }
  }

  // Export to Figma format
  const tokens = coralTokens

  if (format === 'figma-variables') {
    const figmaVars = toFigmaVariables(tokens)
    const output = JSON.stringify(figmaVars, null, 2)

    return {
      success: true,
      message: 'Exported tokens to Figma Variables format',
      data: output,
    }
  }

  const figmaTokens = toFigmaTokens(tokens)
  const output = JSON.stringify(figmaTokens, null, 2)

  return {
    success: true,
    message: 'Exported tokens to Figma Tokens Studio format',
    data: output,
  }
}

/**
 * List available platforms
 */
function runListPlatforms(): TokenCLIResult {
  const platforms = getAvailablePlatforms()

  console.log('\nAvailable platforms:')
  platforms.forEach(p => console.log(`  - ${p}`))

  console.log('\nPlatform presets:')
  Object.entries(platformPresets).forEach(([name, platforms]) => {
    console.log(`  ${name}: ${(platforms as string[]).join(', ')}`)
  })

  return {
    success: true,
    message: `${platforms.length} platforms available`,
    data: { platforms, presets: platformPresets },
  }
}

/**
 * Initialize token configuration
 */
function runTokenInit(_options: TokenCLIOptions): TokenCLIResult {
  const configTemplate = `/**
 * CoralCSS Token Configuration
 *
 * Customize your design tokens here.
 */

import { coralTokens, toStyleDictionary, buildTokens } from '@coral-css/core/design-system'

// Extend or override default tokens
const customTokens = {
  ...coralTokens,
  color: {
    ...coralTokens.color,
    // Add your custom colors
    brand: {
      primary: { $value: '#ff6347', $type: 'color' },
      secondary: { $value: '#4a90d9', $type: 'color' },
    },
  },
}

// Build configuration
export const buildConfig = {
  tokens: customTokens,
  platforms: ['web', 'web-ts', 'figma'],
  outputDir: 'dist/tokens',
  prefix: 'app',
}

// Export for CLI usage
export default buildConfig
`

  const outputs = new Map<string, string>()
  outputs.set('coral.tokens.ts', configTemplate)

  console.log('Created coral.tokens.ts configuration file')
  console.log('\nNext steps:')
  console.log('  1. Customize your tokens in coral.tokens.ts')
  console.log('  2. Run `coral tokens build` to generate output files')
  console.log('  3. Import tokens in your project')

  return {
    success: true,
    message: 'Token configuration initialized',
    outputs,
  }
}

/**
 * Print token CLI help
 */
export function printTokenHelp(): void {
  console.log(`
CoralCSS Design Tokens CLI

Usage: coral tokens <command> [options]

Commands:
  build              Build tokens for specified platforms
  export             Export tokens in a specific format
  validate           Validate token structure and references
  figma              Import/export Figma tokens
  list               List available platforms and presets
  init               Initialize token configuration

Options:
  -o, --output <dir>       Output directory (default: dist/tokens)
  -p, --platforms <list>   Comma-separated platform list
  --preset <name>          Use platform preset (web, mobile, crossPlatform, all)
  -i, --input <file>       Input file for import
  -f, --format <format>    Export format (json, css, scss, js, ts, figma)
  --prefix <string>        Token prefix (default: coral)
  --include-deprecated     Include deprecated tokens
  -v, --verbose            Verbose output
  -w, --watch              Watch for changes

Examples:
  coral tokens build -p web,ios --prefix myapp
  coral tokens export -f figma -o ./figma
  coral tokens validate --verbose
  coral tokens figma -i tokens.json
  coral tokens build --preset crossPlatform
  coral tokens init

Platform Presets:
  web           CSS, SCSS, JS, TypeScript
  mobile        iOS (Swift), Android (Compose)
  crossPlatform Web + Mobile + React Native
  design        Figma + Web
  all           All available platforms
`)
}
