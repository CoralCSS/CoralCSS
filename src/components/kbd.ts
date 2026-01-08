/**
 * Kbd Component
 *
 * Keyboard shortcut display.
 * @module components/kbd
 */

import type { ComponentConfig, ComponentState } from '../types'
import { BaseComponent, createComponentFactory } from './base'

export interface KbdConfig extends ComponentConfig {
  /** Size */
  size?: 'sm' | 'md' | 'lg'
  /** Variant */
  variant?: 'default' | 'outline' | 'subtle'
}

export interface KbdState extends ComponentState {
  keys: string[]
}

/**
 * Kbd component for keyboard shortcuts
 */
export class Kbd extends BaseComponent {
  protected getDefaultConfig(): KbdConfig {
    return {
      size: 'md',
      variant: 'default',
    }
  }

  protected getInitialState(): KbdState {
    return {
      keys: [],
    }
  }

  protected setupAria(): void {
    this.element.setAttribute('role', 'text')
  }

  protected bindEvents(): void {
    // Parse keys from content
    const text = this.element.textContent || ''
    const keys = text.split(/\s*\+\s*/).filter(Boolean)
    this.setState({ keys })
    this.render()
  }

  protected override render(): void {
    const state = this.state as KbdState
    const config = this.config as KbdConfig

    this.element.dataset.size = config.size
    this.element.dataset.variant = config.variant

    // Render keys with separators
    if (state.keys.length > 0) {
      this.element.innerHTML = ''

      state.keys.forEach((key, index) => {
        const keyEl = document.createElement('kbd')
        keyEl.className = 'kbd-key'
        keyEl.textContent = this.formatKey(key)
        this.element.appendChild(keyEl)

        if (index < state.keys.length - 1) {
          const sep = document.createElement('span')
          sep.className = 'kbd-separator'
          sep.textContent = '+'
          this.element.appendChild(sep)
        }
      })
    }
  }

  private formatKey(key: string): string {
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0

    const keyMap: Record<string, string> = {
      cmd: isMac ? '⌘' : 'Ctrl',
      command: isMac ? '⌘' : 'Ctrl',
      ctrl: isMac ? '⌃' : 'Ctrl',
      control: isMac ? '⌃' : 'Ctrl',
      alt: isMac ? '⌥' : 'Alt',
      option: isMac ? '⌥' : 'Alt',
      shift: isMac ? '⇧' : 'Shift',
      enter: '↵',
      return: '↵',
      tab: '⇥',
      delete: '⌫',
      backspace: '⌫',
      escape: 'Esc',
      esc: 'Esc',
      space: '␣',
      up: '↑',
      down: '↓',
      left: '←',
      right: '→',
    }

    const lower = key.toLowerCase()
    return keyMap[lower] || key.toUpperCase()
  }

  setKeys(keys: string[]): void {
    this.setState({ keys })
  }
}

export const createKbd = createComponentFactory(Kbd)
export default Kbd
