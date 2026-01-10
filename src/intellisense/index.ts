/**
 * CoralCSS IntelliSense
 *
 * IDE integration for CoralCSS - completions, hover info, diagnostics, and color previews.
 * @module intellisense
 */

// Completions
export {
  generateCompletions,
  generateVariantCompletions,
  filterCompletions,
  getCompletionsByCategory,
  type CompletionItem,
  type CompletionCategory,
} from './completions'

// Hover
export {
  createHoverProvider,
  hoverProvider,
  type HoverInfo,
} from './hover'

// Colors
export {
  createColorProvider,
  colorProvider,
  type ColorInfo,
  type ColorPalette,
} from './colors'

// Diagnostics
export {
  createDiagnosticsProvider,
  diagnosticsProvider,
  DiagnosticSeverity,
  type Diagnostic,
  type ClassLocation,
} from './diagnostics'

// VS Code Integration
export {
  createVSCodeProvider,
  vscodeProvider,
  vscodeConfig,
  VSCodeCompletionItemKind,
  type VSCodeCompletionItem,
  type VSCodeHover,
  type VSCodeDiagnostic,
  type VSCodeColorInformation,
} from './vscode'

// Re-export theme type for convenience
export type { Theme } from '../types'
