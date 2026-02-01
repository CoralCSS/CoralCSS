/**
 * CoralCSS VS Code IntelliSense Integration
 *
 * Provides VS Code-specific IntelliSense features.
 * @module intellisense/vscode
 */

import type { Theme } from '../types'
import { defaultTheme } from '../theme/default'
import { generateCompletions, generateVariantCompletions, filterCompletions, type CompletionItem } from './completions'
import { createHoverProvider, type HoverInfo } from './hover'
import { createColorProvider, type ColorInfo } from './colors'
import { createDiagnosticsProvider, type Diagnostic, DiagnosticSeverity as _DiagnosticSeverity } from './diagnostics'

/**
 * VS Code completion item kind mapping
 */
export enum VSCodeCompletionItemKind {
  Text = 1,
  Method = 2,
  Function = 3,
  Constructor = 4,
  Field = 5,
  Variable = 6,
  Class = 7,
  Interface = 8,
  Module = 9,
  Property = 10,
  Unit = 11,
  Value = 12,
  Enum = 13,
  Keyword = 14,
  Snippet = 15,
  Color = 16,
  File = 17,
  Reference = 18,
  Folder = 19,
  EnumMember = 20,
  Constant = 21,
  Struct = 22,
  Event = 23,
  Operator = 24,
  TypeParameter = 25,
}

/**
 * VS Code completion item structure
 */
export interface VSCodeCompletionItem {
  label: string
  kind: VSCodeCompletionItemKind
  detail?: string
  documentation?: string | { kind: 'markdown'; value: string }
  insertText?: string
  sortText?: string
  filterText?: string
  preselect?: boolean
  commitCharacters?: string[]
  additionalTextEdits?: Array<{
    range: { start: { line: number; character: number }; end: { line: number; character: number } }
    newText: string
  }>
  command?: {
    title: string
    command: string
    arguments?: unknown[]
  }
}

/**
 * VS Code hover structure
 */
export interface VSCodeHover {
  contents: Array<string | { language: string; value: string } | { kind: 'markdown'; value: string }>
  range?: {
    start: { line: number; character: number }
    end: { line: number; character: number }
  }
}

/**
 * VS Code diagnostic structure
 */
export interface VSCodeDiagnostic {
  range: {
    start: { line: number; character: number }
    end: { line: number; character: number }
  }
  message: string
  severity: 1 | 2 | 3 | 4 // Error, Warning, Information, Hint
  source: string
  code?: string | number
  relatedInformation?: Array<{
    location: {
      uri: string
      range: {
        start: { line: number; character: number }
        end: { line: number; character: number }
      }
    }
    message: string
  }>
}

/**
 * VS Code color information structure
 */
export interface VSCodeColorInformation {
  range: {
    start: { line: number; character: number }
    end: { line: number; character: number }
  }
  color: {
    red: number
    green: number
    blue: number
    alpha: number
  }
}

/**
 * Create VS Code IntelliSense provider
 */
export function createVSCodeProvider(theme: Theme = defaultTheme) {
  // Initialize providers
  const completions = generateCompletions(theme)
  const variantCompletions = generateVariantCompletions()
  const allCompletions = [...completions, ...variantCompletions]
  const hoverProvider = createHoverProvider(theme)
  const colorProvider = createColorProvider(theme)
  const diagnosticsProvider = createDiagnosticsProvider(theme)

  /**
   * Get completion items for VS Code
   */
  function getCompletions(prefix: string, inVariant = false): VSCodeCompletionItem[] {
    // If we're after a variant, filter appropriately
    let items: CompletionItem[]

    if (prefix.includes(':')) {
      // Already has variant, filter by base class
      const parts = prefix.split(':')
      const basePrefix = parts.pop() || ''
      items = filterCompletions(completions, basePrefix)
    } else if (inVariant) {
      // In variant context, show variants
      items = filterCompletions(variantCompletions, prefix)
    } else {
      // Show all
      items = filterCompletions(allCompletions, prefix)
    }

    return items.map((item, index) => toVSCodeCompletion(item, index))
  }

  /**
   * Get hover information for VS Code
   */
  function getHover(className: string): VSCodeHover | null {
    const info = hoverProvider.getHoverInfo(className)
    if (!info) {
      return null
    }

    return toVSCodeHover(info)
  }

  /**
   * Get diagnostics for VS Code
   */
  function getDiagnostics(content: string, line = 0, character = 0): VSCodeDiagnostic[] {
    const locations = diagnosticsProvider.extractClassLocations(content)
    const diagnostics = diagnosticsProvider.validateContent(content, locations)

    return diagnostics.map(diag => toVSCodeDiagnostic(diag, content, line, character))
  }

  /**
   * Get color information for VS Code
   */
  function getColors(content: string, line = 0, character = 0): VSCodeColorInformation[] {
    const locations = diagnosticsProvider.extractClassLocations(content)
    const colors: VSCodeColorInformation[] = []

    for (const loc of locations) {
      const colorInfo = colorProvider.getColorFromClass(loc.className)
      if (colorInfo) {
        colors.push(toVSCodeColor(colorInfo, loc, content, line, character))
      }
    }

    return colors
  }

  /**
   * Get color presentations (for color picker)
   */
  function getColorPresentations(color: { red: number; green: number; blue: number; alpha: number }, className: string): string[] {
    const presentations: string[] = []

    // Current class as-is
    presentations.push(className)

    // With different opacity
    if (color.alpha < 1) {
      const opacity = Math.round(color.alpha * 100)
      const baseParts = className.split('/')
      const baseClass = baseParts[0]
      presentations.push(`${baseClass}/${opacity}`)
    }

    return presentations
  }

  /**
   * Resolve completion item (add documentation)
   */
  function resolveCompletion(item: VSCodeCompletionItem): VSCodeCompletionItem {
    // If item has a label that's a utility class, get full hover info
    const info = hoverProvider.getHoverInfo(item.label.replace(/:$/, ''))
    if (info) {
      item.documentation = {
        kind: 'markdown',
        value: formatHoverMarkdown(info),
      }
    }

    return item
  }

  /**
   * Get signature help (for arbitrary values)
   */
  function getSignatureHelp(className: string): {
    signatures: Array<{
      label: string
      documentation?: string
      parameters?: Array<{ label: string; documentation?: string }>
    }>
    activeSignature: number
    activeParameter: number
  } | null {
    // Check if we're in an arbitrary value context
    const arbitraryMatch = className.match(/^(\w+)-\[([^\]]*)?$/)
    if (!arbitraryMatch || !arbitraryMatch[1]) {
      return null
    }

    const prefix = arbitraryMatch[1]
    const _value = arbitraryMatch[2] || ''

    // Provide hints based on prefix
    const hints: Record<string, { label: string; doc: string; example: string }> = {
      'w': { label: 'w-[<length>]', doc: 'Custom width', example: 'w-[250px]' },
      'h': { label: 'h-[<length>]', doc: 'Custom height', example: 'h-[100vh]' },
      'm': { label: 'm-[<length>]', doc: 'Custom margin', example: 'm-[1.5rem]' },
      'p': { label: 'p-[<length>]', doc: 'Custom padding', example: 'p-[10px]' },
      'text': { label: 'text-[<size>|<color>]', doc: 'Custom font size or color', example: 'text-[14px] or text-[#ff6b6b]' },
      'bg': { label: 'bg-[<color>|<url>]', doc: 'Custom background color or image', example: 'bg-[#ff6b6b] or bg-[url(...)]' },
      'border': { label: 'border-[<width>|<color>]', doc: 'Custom border', example: 'border-[3px] or border-[#ccc]' },
      'rounded': { label: 'rounded-[<radius>]', doc: 'Custom border radius', example: 'rounded-[20px]' },
      'grid-cols': { label: 'grid-cols-[<template>]', doc: 'Custom grid columns', example: 'grid-cols-[1fr_2fr_1fr]' },
      'grid-rows': { label: 'grid-rows-[<template>]', doc: 'Custom grid rows', example: 'grid-rows-[auto_1fr_auto]' },
      'gap': { label: 'gap-[<length>]', doc: 'Custom gap', example: 'gap-[2rem]' },
      'translate-x': { label: 'translate-x-[<length>]', doc: 'Custom X translation', example: 'translate-x-[50%]' },
      'translate-y': { label: 'translate-y-[<length>]', doc: 'Custom Y translation', example: 'translate-y-[-20px]' },
      'rotate': { label: 'rotate-[<angle>]', doc: 'Custom rotation', example: 'rotate-[17deg]' },
      'scale': { label: 'scale-[<ratio>]', doc: 'Custom scale', example: 'scale-[1.15]' },
      'z': { label: 'z-[<number>]', doc: 'Custom z-index', example: 'z-[9999]' },
      'shadow': { label: 'shadow-[<shadow>]', doc: 'Custom box shadow', example: 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]' },
    }

    const hint = hints[prefix]
    if (!hint) {
      return null
    }

    const paramMatch = hint.label.match(/<[^>]+>/)
    const paramLabel = paramMatch ? paramMatch[0] : '<value>'

    return {
      signatures: [{
        label: hint.label,
        documentation: `${hint.doc}\n\nExample: \`${hint.example}\``,
        parameters: [{
          label: paramLabel,
          documentation: hint.doc,
        }],
      }],
      activeSignature: 0,
      activeParameter: 0,
    }
  }

  return {
    getCompletions,
    getHover,
    getDiagnostics,
    getColors,
    getColorPresentations,
    resolveCompletion,
    getSignatureHelp,
    // Export raw providers for advanced use
    completions: allCompletions,
    hoverProvider,
    colorProvider,
    diagnosticsProvider,
  }
}

/**
 * Convert completion item to VS Code format
 */
function toVSCodeCompletion(item: CompletionItem, index: number): VSCodeCompletionItem {
  const kind = item.color
    ? VSCodeCompletionItemKind.Color
    : item.category === 'variants'
      ? VSCodeCompletionItemKind.Keyword
      : VSCodeCompletionItemKind.Value

  return {
    label: item.label,
    kind,
    detail: item.css,
    documentation: item.description ? {
      kind: 'markdown',
      value: item.description + (item.color ? `\n\n**Color:** ${item.color}` : ''),
    } : undefined,
    insertText: item.label,
    sortText: String((item.sortOrder ?? 100) + index).padStart(5, '0'),
    filterText: item.label,
  }
}

/**
 * Convert hover info to VS Code format
 */
function toVSCodeHover(info: HoverInfo): VSCodeHover {
  return {
    contents: [
      { kind: 'markdown', value: formatHoverMarkdown(info) },
    ],
  }
}

/**
 * Format hover info as markdown
 */
function formatHoverMarkdown(info: HoverInfo): string {
  const parts: string[] = []

  // Class name header
  parts.push(`**\`${info.className}\`**`)

  // Description
  if (info.description) {
    parts.push(`\n${info.description}`)
  }

  // Variants
  if (info.variants && info.variants.length > 0) {
    parts.push(`\n*Variants:* ${info.variants.map(v => `\`${v}\``).join(', ')}`)
  }

  // Color preview
  if (info.color) {
    parts.push(`\n**Color:** ${info.color}`)
  }

  // CSS
  if (info.css) {
    parts.push(`\n\`\`\`css\n${info.css}\n\`\`\``)
  }

  return parts.join('')
}

/**
 * Convert diagnostic to VS Code format
 */
function toVSCodeDiagnostic(
  diag: Diagnostic,
  content: string,
  baseLine: number,
  baseCharacter: number
): VSCodeDiagnostic {
  // Calculate line/character from offset
  const { line, character } = offsetToPosition(content, diag.start, baseLine, baseCharacter)
  const endPos = offsetToPosition(content, diag.end, baseLine, baseCharacter)

  return {
    range: {
      start: { line, character },
      end: { line: endPos.line, character: endPos.character },
    },
    message: diag.message + (diag.suggestions && diag.suggestions.length > 0
      ? `\n\nDid you mean: ${diag.suggestions.slice(0, 3).join(', ')}?`
      : ''),
    severity: diag.severity as 1 | 2 | 3 | 4,
    source: 'CoralCSS',
    code: diag.code,
  }
}

/**
 * Convert color info to VS Code format
 */
function toVSCodeColor(
  colorInfo: ColorInfo,
  loc: { start: number; end: number },
  content: string,
  baseLine: number,
  baseCharacter: number
): VSCodeColorInformation {
  const start = offsetToPosition(content, loc.start, baseLine, baseCharacter)
  const end = offsetToPosition(content, loc.end, baseLine, baseCharacter)

  return {
    range: {
      start,
      end,
    },
    color: {
      red: colorInfo.rgb.r / 255,
      green: colorInfo.rgb.g / 255,
      blue: colorInfo.rgb.b / 255,
      alpha: colorInfo.opacity ?? 1,
    },
  }
}

/**
 * Convert offset to line/character position
 */
function offsetToPosition(
  content: string,
  offset: number,
  baseLine: number,
  baseCharacter: number
): { line: number; character: number } {
  const lines = content.slice(0, offset).split('\n')
  const line = baseLine + lines.length - 1
  const character = lines.length === 1
    ? baseCharacter + offset
    : (lines[lines.length - 1] || '').length

  return { line, character }
}

/**
 * Export configuration for VS Code extension
 */
export const vscodeConfig = {
  // Languages to activate on
  languages: [
    'html',
    'javascript',
    'javascriptreact',
    'typescript',
    'typescriptreact',
    'vue',
    'svelte',
    'astro',
    'php',
    'blade',
    'erb',
    'ejs',
    'handlebars',
    'markdown',
  ],

  // Trigger characters for completions
  triggerCharacters: ['"', "'", '`', ' ', ':'],

  // File patterns to include
  includePatterns: [
    '**/*.html',
    '**/*.jsx',
    '**/*.tsx',
    '**/*.vue',
    '**/*.svelte',
    '**/*.astro',
    '**/*.php',
    '**/*.blade.php',
    '**/*.erb',
    '**/*.ejs',
    '**/*.hbs',
  ],

  // Configuration keys
  configKeys: {
    enable: 'coralcss.enable',
    colorDecorators: 'coralcss.colorDecorators',
    suggestions: 'coralcss.suggestions',
    validate: 'coralcss.validate',
    lint: 'coralcss.lint',
    hoverPreview: 'coralcss.hoverPreview',
    emmetCompletions: 'coralcss.emmetCompletions',
  },
}

/**
 * Default VS Code provider instance
 */
export const vscodeProvider = createVSCodeProvider()
