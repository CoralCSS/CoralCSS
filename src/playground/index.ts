/**
 * CoralCSS Playground
 *
 * Interactive playground for trying CoralCSS utilities.
 * Provides live preview, code generation, and class suggestions.
 *
 * Security Note: This component renders user-provided HTML for preview purposes.
 * In production environments, consider sanitizing HTML input with DOMPurify.
 *
 * @module playground
 */

// ============================================================================
// Constants
// ============================================================================

/**
 * Playground theme constants
 * Centralized styling values for consistency
 */
const PLAYGROUND_STYLES = {
  // Layout
  panelGap: '16px',
  panelMinHeight: '500px',
  borderRadius: '16px',
  padding: '24px',

  // Input/textarea
  inputPadding: '12px',
  inputBorderRadius: '8px',
  inputFontSize: '14px',
  inputMarginBottom: '8px',

  // Small text
  smallFontSize: '11px',
  smallButtonPadding: '4px 8px',
  smallBorderRadius: '4px',

  // Labels
  labelMarginBottom: '8px',
  labelFontWeight: '600',

  // Preview area
  previewPadding: '24px',
  previewPatternSize: '20px',

  // Code area
  codeFontSize: '12px',
  codePadding: '12px',

  // Category items
  categoryMarginBottom: '12px',
  categoryItemMarginBottom: '6px',
  buttonGap: '4px',
} as const

/**
 * Color palette for light/dark themes
 */
const PLAYGROUND_COLORS = {
  light: {
    bg: '#f8fafc',
    bgAlt: '#ffffff',
    bgAlt2: '#f1f5f9',
    border: '#e2e8f0',
    borderAlt: '#f8fafc',
    text: '#1e293b',
    textMuted: '#94a3b8',
    textMuted2: '#6c7086',
    accent: '#3b82f6',
    accentBright: '#89b4fa',
  },
  dark: {
    bg: '#1e1e2e',
    bgAlt: '#313244',
    bgAlt2: '#45475a',
    border: '#45475a',
    borderAlt: '#313244',
    text: '#cdd6f4',
    textMuted: '#89b4fa',
    textMuted2: '#6c7086',
    accent: '#89b4fa',
    accentBright: '#3b82f6',
  },
} as const

/**
 * Get color for current theme
 */
function getThemeColor(colorKey: keyof typeof PLAYGROUND_COLORS.light, isDark: boolean): string {
  return PLAYGROUND_COLORS[isDark ? 'dark' : 'light'][colorKey]
}

// ============================================================================
// Types
// ============================================================================

export interface PlaygroundConfig {
  /** Container element or selector */
  container: HTMLElement | string
  /** Initial HTML content */
  initialHTML?: string
  /** Initial classes */
  initialClasses?: string
  /** Show class suggestions */
  showSuggestions?: boolean
  /** Dark mode */
  darkMode?: boolean
  /** Enable live preview */
  livePreview?: boolean
  /** Callback when classes change */
  onChange?: (classes: string, html: string) => void
}

export interface ClassSuggestion {
  className: string
  category: string
  description: string
}

// ============================================================================
// Class Suggestions Data
// ============================================================================

const CLASS_SUGGESTIONS: ClassSuggestion[] = [
  // Layout
  { className: 'flex', category: 'Layout', description: 'Display: flex' },
  { className: 'grid', category: 'Layout', description: 'Display: grid' },
  { className: 'items-center', category: 'Layout', description: 'Align items: center' },
  { className: 'justify-center', category: 'Layout', description: 'Justify content: center' },
  { className: 'justify-between', category: 'Layout', description: 'Space between' },
  { className: 'flex-col', category: 'Layout', description: 'Flex direction: column' },

  // Spacing
  { className: 'p-4', category: 'Spacing', description: 'Padding: 1rem' },
  { className: 'p-6', category: 'Spacing', description: 'Padding: 1.5rem' },
  { className: 'px-4', category: 'Spacing', description: 'Padding horizontal' },
  { className: 'm-4', category: 'Spacing', description: 'Margin: 1rem' },
  { className: 'mx-auto', category: 'Spacing', description: 'Center horizontally' },
  { className: 'gap-4', category: 'Spacing', description: 'Gap: 1rem' },

  // Sizing
  { className: 'w-full', category: 'Sizing', description: 'Width: 100%' },
  { className: 'w-1/2', category: 'Sizing', description: 'Width: 50%' },
  { className: 'h-screen', category: 'Sizing', description: 'Height: 100vh' },
  { className: 'max-w-md', category: 'Sizing', description: 'Max width: 28rem' },

  // Typography
  { className: 'text-lg', category: 'Typography', description: 'Large text' },
  { className: 'text-xl', category: 'Typography', description: 'XL text' },
  { className: 'text-2xl', category: 'Typography', description: '2XL text' },
  { className: 'font-bold', category: 'Typography', description: 'Bold text' },
  { className: 'text-center', category: 'Typography', description: 'Center text' },

  // Fluid Typography
  { className: 'text-fluid-base', category: 'Fluid', description: 'Fluid base text' },
  { className: 'text-fluid-lg', category: 'Fluid', description: 'Fluid large text' },
  { className: 'text-fluid-hero', category: 'Fluid', description: 'Fluid hero text' },

  // Gradient Text
  { className: 'text-gradient-rainbow', category: 'Effects', description: 'Rainbow gradient' },
  { className: 'text-gradient-sunset', category: 'Effects', description: 'Sunset gradient' },
  { className: 'text-gradient-ocean', category: 'Effects', description: 'Ocean gradient' },

  // Neon Text
  { className: 'text-neon-blue', category: 'Effects', description: 'Neon blue glow' },
  { className: 'text-neon-pink', category: 'Effects', description: 'Neon pink glow' },

  // Colors
  { className: 'text-white', category: 'Colors', description: 'White text' },
  { className: 'text-gray-900', category: 'Colors', description: 'Dark gray text' },
  { className: 'bg-white', category: 'Colors', description: 'White background' },
  { className: 'bg-blue-500', category: 'Colors', description: 'Blue background' },

  // Borders
  { className: 'border', category: 'Borders', description: '1px border' },
  { className: 'rounded', category: 'Borders', description: 'Rounded corners' },
  { className: 'rounded-lg', category: 'Borders', description: 'Large radius' },
  { className: 'rounded-xl', category: 'Borders', description: 'XL radius' },
  { className: 'rounded-full', category: 'Borders', description: 'Full circle' },

  // Shadows
  { className: 'shadow', category: 'Effects', description: 'Box shadow' },
  { className: 'shadow-lg', category: 'Effects', description: 'Large shadow' },
  { className: 'shadow-xl', category: 'Effects', description: 'XL shadow' },

  // Glassmorphism
  { className: 'glass', category: 'Glass', description: 'Glass effect' },
  { className: 'glass-frost', category: 'Glass', description: 'Frosted glass' },
  { className: 'glass-dark', category: 'Glass', description: 'Dark glass' },

  // Neumorphism
  { className: 'neu', category: 'Neu', description: 'Soft UI' },
  { className: 'neu-inset', category: 'Neu', description: 'Pressed effect' },
  { className: 'neu-convex', category: 'Neu', description: 'Convex effect' },

  // Animations
  { className: 'animate-bounce', category: 'Animations', description: 'Bounce' },
  { className: 'animate-pulse', category: 'Animations', description: 'Pulse' },
  { className: 'animate-spin', category: 'Animations', description: 'Spin' },
  { className: 'animate-spring-in', category: 'Animations', description: 'Spring in' },
  { className: 'animate-float', category: 'Animations', description: 'Float' },
  { className: 'animate-wiggle', category: 'Animations', description: 'Wiggle' },

  // Transitions
  { className: 'transition', category: 'Transitions', description: 'All transitions' },
  { className: 'duration-300', category: 'Transitions', description: '300ms' },
  { className: 'ease-spring', category: 'Transitions', description: 'Spring easing' },

  // Hover
  { className: 'hover:bg-blue-600', category: 'States', description: 'Hover blue' },
  { className: 'hover:scale-105', category: 'States', description: 'Hover scale' },

  // Aspect ratios
  { className: 'aspect-video', category: 'Layout', description: '16:9 ratio' },
  { className: 'aspect-golden', category: 'Layout', description: 'Golden ratio' },

  // Logical properties
  { className: 'ps-4', category: 'Logical', description: 'Padding start' },
  { className: 'pe-4', category: 'Logical', description: 'Padding end' },

  // Interactive
  { className: 'cursor-pointer', category: 'Interactive', description: 'Pointer cursor' },
  { className: 'select-none', category: 'Interactive', description: 'No select' },
]

// ============================================================================
// Utility Functions
// ============================================================================

function escapeHtml(text: string): string {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}

// ============================================================================
// Playground Class
// ============================================================================

export class CoralPlayground {
  private container: HTMLElement
  private config: Required<PlaygroundConfig>
  private currentClasses: string[] = []
  private previewElement: HTMLElement | null = null
  private classInput: HTMLInputElement | null = null
  private htmlInput: HTMLTextAreaElement | null = null
  private suggestionsPanel: HTMLElement | null = null
  private codeOutput: HTMLElement | null = null

  constructor(config: PlaygroundConfig) {
    const container = typeof config.container === 'string'
      ? document.querySelector(config.container)
      : config.container

    if (!container) {
      throw new Error('Playground container not found')
    }

    this.container = container as HTMLElement
    this.config = {
      container: this.container,
      initialHTML: config.initialHTML ?? '<div class="preview-box">Preview</div>',
      initialClasses: config.initialClasses ?? 'p-4 bg-white rounded-lg shadow',
      showSuggestions: config.showSuggestions ?? true,
      darkMode: config.darkMode ?? false,
      livePreview: config.livePreview ?? true,
      onChange: config.onChange ?? (() => {}),
    }

    this.currentClasses = this.config.initialClasses.split(' ').filter(Boolean)
    this.init()
  }

  private init(): void {
    this.render()
    this.bindEvents()
  }

  private render(): void {
    const isDark = this.config.darkMode

    // Clear container
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }

    // Create main wrapper
    const wrapper = document.createElement('div')
    wrapper.className = 'coral-playground'
    wrapper.style.cssText = `
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: ${PLAYGROUND_STYLES.panelGap};
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: ${getThemeColor('bg', isDark)};
      padding: ${PLAYGROUND_STYLES.padding};
      border-radius: ${PLAYGROUND_STYLES.borderRadius};
      min-height: ${PLAYGROUND_STYLES.panelMinHeight};
    `

    // Build left panel (controls)
    const controlsPanel = this.buildControlsPanel(isDark)

    // Build right panel (preview)
    const previewPanel = this.buildPreviewPanel(isDark)

    wrapper.appendChild(controlsPanel)
    wrapper.appendChild(previewPanel)
    this.container.appendChild(wrapper)

    // Initial update
    this.updatePreview()
  }

  private buildControlsPanel(isDark: boolean): HTMLElement {
    const panel = document.createElement('div')
    panel.style.cssText = `display: flex; flex-direction: column; gap: ${PLAYGROUND_STYLES.panelGap};`

    // Classes section
    const classesLabel = document.createElement('label')
    classesLabel.style.cssText = `display: block; margin-bottom: ${PLAYGROUND_STYLES.labelMarginBottom}; font-weight: ${PLAYGROUND_STYLES.labelFontWeight}; color: ${getThemeColor('text', isDark)};`
    classesLabel.textContent = 'Classes'

    this.classInput = document.createElement('input')
    this.classInput.type = 'text'
    this.classInput.value = this.currentClasses.join(' ')
    this.classInput.placeholder = 'Enter CSS classes...'
    this.classInput.style.cssText = `
      width: 100%;
      padding: ${PLAYGROUND_STYLES.inputPadding};
      border: 1px solid ${getThemeColor('border', isDark)};
      border-radius: ${PLAYGROUND_STYLES.inputBorderRadius};
      font-family: 'Fira Code', monospace;
      font-size: ${PLAYGROUND_STYLES.inputFontSize};
      background: ${getThemeColor('bgAlt', isDark)};
      color: ${getThemeColor('text', isDark)};
      outline: none;
      box-sizing: border-box;
    `

    const classesSection = document.createElement('div')
    classesSection.appendChild(classesLabel)
    classesSection.appendChild(this.classInput)

    // HTML section
    const htmlLabel = document.createElement('label')
    htmlLabel.style.cssText = `display: block; margin-bottom: 8px; font-weight: 600; color: ${isDark ? '#cdd6f4' : '#1e293b'};`
    htmlLabel.textContent = 'HTML'

    this.htmlInput = document.createElement('textarea')
    this.htmlInput.value = this.config.initialHTML
    this.htmlInput.rows = 6
    this.htmlInput.style.cssText = `
      width: 100%;
      padding: ${PLAYGROUND_STYLES.inputPadding};
      border: 1px solid ${getThemeColor('border', isDark)};
      border-radius: ${PLAYGROUND_STYLES.inputBorderRadius};
      font-family: 'Fira Code', monospace;
      font-size: 13px;
      background: ${getThemeColor('bgAlt', isDark)};
      color: ${getThemeColor('text', isDark)};
      outline: none;
      resize: vertical;
      box-sizing: border-box;
    `

    const htmlSection = document.createElement('div')
    htmlSection.appendChild(htmlLabel)
    htmlSection.appendChild(this.htmlInput)

    panel.appendChild(classesSection)
    panel.appendChild(htmlSection)

    // Suggestions
    if (this.config.showSuggestions) {
      const suggestLabel = document.createElement('label')
      suggestLabel.style.cssText = `font-weight: ${PLAYGROUND_STYLES.labelFontWeight}; color: ${getThemeColor('text', isDark)};`
      suggestLabel.textContent = 'Quick Add'

      this.suggestionsPanel = document.createElement('div')
      this.suggestionsPanel.style.cssText = `
        flex: 1;
        overflow-y: auto;
        border: 1px solid ${getThemeColor('border', isDark)};
        border-radius: ${PLAYGROUND_STYLES.inputBorderRadius};
        background: ${getThemeColor('bgAlt', isDark)};
        padding: ${PLAYGROUND_STYLES.inputPadding};
      `
      this.renderSuggestions(isDark)

      panel.appendChild(suggestLabel)
      panel.appendChild(this.suggestionsPanel)
    }

    return panel
  }

  private buildPreviewPanel(isDark: boolean): HTMLElement {
    const panel = document.createElement('div')
    panel.style.cssText = `display: flex; flex-direction: column; gap: ${PLAYGROUND_STYLES.panelGap};`

    // Preview label
    const previewLabel = document.createElement('label')
    previewLabel.style.cssText = `font-weight: ${PLAYGROUND_STYLES.labelFontWeight}; color: ${getThemeColor('text', isDark)};`
    previewLabel.textContent = 'Preview'

    // Preview container
    const previewContainer = document.createElement('div')
    previewContainer.style.cssText = `
      flex: 1;
      border: 1px solid ${getThemeColor('border', isDark)};
      border-radius: ${PLAYGROUND_STYLES.inputBorderRadius};
      background: ${getThemeColor('borderAlt', isDark)};
      padding: ${PLAYGROUND_STYLES.previewPadding};
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: auto;
      background-image: linear-gradient(45deg, ${getThemeColor('bgAlt2', isDark)} 25%, transparent 25%),
                        linear-gradient(-45deg, ${getThemeColor('bgAlt2', isDark)} 25%, transparent 25%),
                        linear-gradient(45deg, transparent 75%, ${getThemeColor('bgAlt2', isDark)} 75%),
                        linear-gradient(-45deg, transparent 75%, ${getThemeColor('bgAlt2', isDark)} 75%);
      background-size: ${PLAYGROUND_STYLES.previewPatternSize} ${PLAYGROUND_STYLES.previewPatternSize};
      background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
    `

    this.previewElement = document.createElement('div')
    this.previewElement.id = 'coral-playground-preview'
    previewContainer.appendChild(this.previewElement)

    // Code output label
    const codeLabel = document.createElement('label')
    codeLabel.style.cssText = `font-weight: ${PLAYGROUND_STYLES.labelFontWeight}; color: ${getThemeColor('text', isDark)}; display: block; margin-bottom: ${PLAYGROUND_STYLES.labelMarginBottom};`
    codeLabel.textContent = 'Generated Code'

    // Code output
    this.codeOutput = document.createElement('pre')
    this.codeOutput.id = 'coral-playground-code'
    this.codeOutput.style.cssText = `
      padding: ${PLAYGROUND_STYLES.codePadding};
      border-radius: ${PLAYGROUND_STYLES.inputBorderRadius};
      background: ${getThemeColor('bg', isDark)};
      font-family: 'Fira Code', monospace;
      font-size: ${PLAYGROUND_STYLES.codeFontSize};
      color: ${getThemeColor('accentBright', isDark)};
      overflow-x: auto;
      margin: 0;
      white-space: pre-wrap;
      word-break: break-all;
    `

    const codeSection = document.createElement('div')
    codeSection.appendChild(codeLabel)
    codeSection.appendChild(this.codeOutput)

    panel.appendChild(previewLabel)
    panel.appendChild(previewContainer)
    panel.appendChild(codeSection)

    return panel
  }

  private renderSuggestions(isDark: boolean): void {
    if (!this.suggestionsPanel) {return}

    // Group by category
    const categories = new Map<string, ClassSuggestion[]>()
    for (const suggestion of CLASS_SUGGESTIONS) {
      if (!categories.has(suggestion.category)) {
        categories.set(suggestion.category, [])
      }
      categories.get(suggestion.category)!.push(suggestion)
    }

    // Clear panel
    while (this.suggestionsPanel.firstChild) {
      this.suggestionsPanel.removeChild(this.suggestionsPanel.firstChild)
    }

    categories.forEach((suggestions, category) => {
      const categoryDiv = document.createElement('div')
      categoryDiv.style.cssText = `margin-bottom: ${PLAYGROUND_STYLES.categoryMarginBottom};`

      const categoryTitle = document.createElement('div')
      categoryTitle.style.cssText = `
        font-size: ${PLAYGROUND_STYLES.smallFontSize};
        font-weight: ${PLAYGROUND_STYLES.labelFontWeight};
        text-transform: uppercase;
        color: ${getThemeColor('textMuted2', isDark)};
        margin-bottom: ${PLAYGROUND_STYLES.categoryItemMarginBottom};
      `
      categoryTitle.textContent = category

      const buttonsDiv = document.createElement('div')
      buttonsDiv.style.cssText = `display: flex; flex-wrap: wrap; gap: ${PLAYGROUND_STYLES.buttonGap};`

      suggestions.slice(0, 6).forEach(s => {
        const btn = document.createElement('button')
        btn.textContent = s.className
        btn.title = s.description
        btn.style.cssText = `
          padding: ${PLAYGROUND_STYLES.smallButtonPadding};
          font-size: ${PLAYGROUND_STYLES.smallFontSize};
          font-family: 'Fira Code', monospace;
          border: 1px solid ${getThemeColor('border', isDark)};
          border-radius: ${PLAYGROUND_STYLES.smallBorderRadius};
          background: ${getThemeColor('borderAlt', isDark)};
          color: ${getThemeColor('accentBright', isDark)};
          cursor: pointer;
          transition: all 0.15s ease;
        `
        btn.addEventListener('mouseenter', () => {
          btn.style.background = getThemeColor('border', isDark)
        })
        btn.addEventListener('mouseleave', () => {
          btn.style.background = getThemeColor('borderAlt', isDark)
        })
        btn.addEventListener('click', () => this.addClass(s.className))
        buttonsDiv.appendChild(btn)
      })

      categoryDiv.appendChild(categoryTitle)
      categoryDiv.appendChild(buttonsDiv)
      this.suggestionsPanel!.appendChild(categoryDiv)
    })
  }

  private bindEvents(): void {
    this.classInput?.addEventListener('input', () => {
      this.currentClasses = (this.classInput?.value || '').split(' ').filter(Boolean)
      if (this.config.livePreview) {
        this.updatePreview()
      }
    })

    this.htmlInput?.addEventListener('input', () => {
      if (this.config.livePreview) {
        this.updatePreview()
      }
    })
  }

  private updatePreview(): void {
    if (!this.previewElement) {return}

    const html = this.htmlInput?.value || ''
    const classes = this.currentClasses.join(' ')

    // Clear preview element
    while (this.previewElement.firstChild) {
      this.previewElement.removeChild(this.previewElement.firstChild)
    }

    // Create a wrapper for the preview content
    // Note: This renders user HTML for preview - in production, sanitize with DOMPurify
    const previewWrapper = document.createElement('div')
    previewWrapper.className = classes

    // Parse and append the HTML content
    const template = document.createElement('template')
    template.innerHTML = html.trim()
    previewWrapper.appendChild(template.content.cloneNode(true))

    this.previewElement.appendChild(previewWrapper)

    // Update code output
    if (this.codeOutput) {
      const escapedHtml = escapeHtml(html)
      this.codeOutput.textContent = `<div class="${classes}">\n  ${html}\n</div>`
    }

    // Trigger callback
    this.config.onChange(classes, html)
  }

  /**
   * Add a class to the current list
   */
  addClass(className: string): void {
    if (!this.currentClasses.includes(className)) {
      this.currentClasses.push(className)
      if (this.classInput) {
        this.classInput.value = this.currentClasses.join(' ')
      }
      this.updatePreview()
    }
  }

  /**
   * Remove a class from the current list
   */
  removeClass(className: string): void {
    this.currentClasses = this.currentClasses.filter(c => c !== className)
    if (this.classInput) {
      this.classInput.value = this.currentClasses.join(' ')
    }
    this.updatePreview()
  }

  /**
   * Set the classes
   */
  setClasses(classes: string): void {
    this.currentClasses = classes.split(' ').filter(Boolean)
    if (this.classInput) {
      this.classInput.value = this.currentClasses.join(' ')
    }
    this.updatePreview()
  }

  /**
   * Get the current classes
   */
  getClasses(): string[] {
    return [...this.currentClasses]
  }

  /**
   * Set the HTML content
   */
  setHTML(html: string): void {
    if (this.htmlInput) {
      this.htmlInput.value = html
    }
    this.updatePreview()
  }

  /**
   * Get the current HTML
   */
  getHTML(): string {
    return this.htmlInput?.value || ''
  }

  /**
   * Destroy the playground
   */
  destroy(): void {
    while (this.container.firstChild) {
      this.container.removeChild(this.container.firstChild)
    }
  }
}

// ============================================================================
// Factory Function
// ============================================================================

/**
 * Create a CoralCSS Playground
 */
export function createPlayground(config: PlaygroundConfig): CoralPlayground {
  return new CoralPlayground(config)
}

export default CoralPlayground
