/**
 * Code Component
 *
 * Code block with syntax highlighting support.
 * @module components/code
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface CodeConfig extends ComponentConfig {
  /** Programming language */
  language?: string
  /** Show line numbers */
  showLineNumbers?: boolean
  /** Starting line number */
  startLine?: number
  /** Highlight specific lines */
  highlightLines?: number[]
  /** Show copy button */
  copyable?: boolean
  /** Wrap long lines */
  wrap?: boolean
}

export interface CodeState extends ComponentState {
  copied: boolean
}

/**
 * Code component for code blocks
 */
export class Code extends BaseComponent {
  private codeEl: HTMLElement | null = null
  private copyBtn: HTMLElement | null = null
  private copiedTimeout: ReturnType<typeof setTimeout> | null = null

  protected getDefaultConfig(): CodeConfig {
    return {
      showLineNumbers: true,
      startLine: 1,
      highlightLines: [],
      copyable: true,
      wrap: false,
    }
  }

  protected getInitialState(): CodeState {
    return {
      copied: false,
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'region')
    this.element.setAttribute('aria-label', 'Code block')
  }

  protected bindEvents(): void {
    const config = this.config as CodeConfig
    this.codeEl = this.query('code') || this.query('[data-coral-code-content]')
    this.copyBtn = this.query('[data-coral-code-copy]')

    // Apply settings
    this.element.dataset.language = config.language || 'text'
    this.element.dataset.lineNumbers = String(config.showLineNumbers)
    this.element.dataset.wrap = String(config.wrap)

    // Add line numbers
    if (config.showLineNumbers && this.codeEl) {
      this.addLineNumbers()
    }

    // Copy button
    if (this.copyBtn && config.copyable) {
      const handleCopy = async () => {
        await this.copyToClipboard()
      }
      this.addEventListener(this.copyBtn, 'click', handleCopy)
    }
  }

  private addLineNumbers(): void {
    if (!this.codeEl) {return}

    const config = this.config as CodeConfig
    const lines = this.codeEl.textContent?.split('\n') || []

    const numbersContainer = document.createElement('div')
    numbersContainer.className = 'code-line-numbers'
    numbersContainer.setAttribute('aria-hidden', 'true')

    lines.forEach((_, index) => {
      const lineNum = config.startLine! + index
      const numEl = document.createElement('span')
      numEl.className = 'code-line-number'
      numEl.textContent = String(lineNum)

      if (config.highlightLines?.includes(lineNum)) {
        numEl.dataset.highlighted = ''
      }

      numbersContainer.appendChild(numEl)
    })

    this.element.insertBefore(numbersContainer, this.codeEl)

    // Highlight lines in code
    if (config.highlightLines && config.highlightLines.length > 0) {
      const linesHtml = lines.map((line, index) => {
        const lineNum = config.startLine! + index
        const isHighlighted = config.highlightLines?.includes(lineNum)
        return `<span class="code-line${isHighlighted ? ' code-line-highlighted' : ''}">${this.escapeHtml(line)}</span>`
      }).join('\n')

      this.codeEl.innerHTML = linesHtml
    }
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  protected override render(): void {
    const state = this.state as CodeState

    if (this.copyBtn) {
      this.copyBtn.dataset.copied = String(state.copied)
      this.copyBtn.setAttribute('aria-label', state.copied ? 'Copied!' : 'Copy code')
    }
  }

  async copyToClipboard(): Promise<boolean> {
    if (!this.codeEl) {return false}

    const code = this.codeEl.textContent || ''

    try {
      await navigator.clipboard.writeText(code)
      this.setState({ copied: true })
      this.dispatch('copy', { code })

      if (this.copiedTimeout) {
        clearTimeout(this.copiedTimeout)
      }

      this.copiedTimeout = setTimeout(() => {
        this.setState({ copied: false })
      }, 2000)

      return true
    } catch {
      this.dispatch('copy-error')
      return false
    }
  }

  getCode(): string {
    return this.codeEl?.textContent || ''
  }

  setCode(code: string): void {
    if (this.codeEl) {
      this.codeEl.textContent = code
    }
  }

  override destroy(): void {
    if (this.copiedTimeout) {
      clearTimeout(this.copiedTimeout)
    }
    super.destroy()
  }
}

export const createCode = createComponentFactory(Code)
export default Code
