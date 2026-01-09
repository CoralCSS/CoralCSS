/**
 * Style Injector
 *
 * Injects generated CSS into the document.
 * @module runtime/injector
 */

/**
 * Injector configuration
 */
export interface InjectorConfig {
  /**
   * ID of the style element
   * @default 'coral-styles'
   */
  id?: string

  /**
   * Where to inject the style element
   * @default 'head'
   */
  target?: 'head' | 'body' | HTMLElement

  /**
   * Whether to prepend (first) or append (last) to target
   * @default 'append'
   */
  position?: 'prepend' | 'append'

  /**
   * Custom container element
   */
  container?: HTMLElement

  /**
   * Nonce for CSP
   */
  nonce?: string
}

/**
 * Style injector for runtime CSS injection
 */
export class StyleInjector {
  private styleElement: HTMLStyleElement | null = null
  private config: Required<Omit<InjectorConfig, 'container' | 'nonce'>> & Pick<InjectorConfig, 'container' | 'nonce'>
  private css = ''
  private cssMap = new Map<string, string>()

  constructor(config: InjectorConfig = {}) {
    this.config = {
      id: config.id ?? 'coral-styles',
      target: config.target ?? 'head',
      position: config.position ?? 'append',
      container: config.container,
      nonce: config.nonce,
    }
  }

  /**
   * Initialize the style element
   */
  init(): void {
    if (this.styleElement) {return}

    // Check for existing style element
    this.styleElement = document.getElementById(this.config.id) as HTMLStyleElement

    if (!this.styleElement) {
      this.styleElement = document.createElement('style')
      this.styleElement.id = this.config.id
      this.styleElement.setAttribute('data-coral', '')

      if (this.config.nonce) {
        this.styleElement.nonce = this.config.nonce
      }

      // Get target element
      let target: HTMLElement
      if (this.config.container) {
        target = this.config.container
      } else if (this.config.target === 'head') {
        target = document.head
      } else if (this.config.target === 'body') {
        target = document.body
      } else {
        target = this.config.target
      }

      // Insert style element
      if (this.config.position === 'prepend') {
        target.insertBefore(this.styleElement, target.firstChild)
      } else {
        target.appendChild(this.styleElement)
      }
    }
  }

  /**
   * Inject CSS
   */
  inject(css: string): void {
    if (!this.styleElement) {
      this.init()
    }

    this.css = css
    if (this.styleElement) {
      this.styleElement.textContent = css
    }
  }

  /**
   * Append CSS (add to existing)
   */
  append(css: string): void {
    if (!this.styleElement) {
      this.init()
    }

    this.css += '\n' + css
    if (this.styleElement) {
      this.styleElement.textContent = this.css
    }
  }

  /**
   * Add CSS for a specific class
   */
  addClass(className: string, css: string): void {
    if (!this.cssMap.has(className)) {
      this.cssMap.set(className, css)
      this.append(css)
    }
  }

  /**
   * Add multiple classes
   */
  addClasses(classMap: Map<string, string>): void {
    let newCss = ''

    classMap.forEach((css, className) => {
      if (!this.cssMap.has(className)) {
        this.cssMap.set(className, css)
        newCss += css + '\n'
      }
    })

    if (newCss) {
      this.append(newCss)
    }
  }

  /**
   * Remove CSS for a specific class
   */
  removeClass(className: string): void {
    if (this.cssMap.has(className)) {
      this.cssMap.delete(className)
      this.rebuild()
    }
  }

  /**
   * Clear all CSS
   */
  clear(): void {
    this.css = ''
    this.cssMap.clear()
    if (this.styleElement) {
      this.styleElement.textContent = ''
    }
  }

  /**
   * Rebuild CSS from map
   */
  private rebuild(): void {
    this.css = Array.from(this.cssMap.values()).join('\n')
    if (this.styleElement) {
      this.styleElement.textContent = this.css
    }
  }

  /**
   * Get current CSS
   */
  getCSS(): string {
    return this.css
  }

  /**
   * Get the style element
   */
  getStyleElement(): HTMLStyleElement | null {
    return this.styleElement
  }

  /**
   * Check if a class has been injected
   */
  hasClass(className: string): boolean {
    return this.cssMap.has(className)
  }

  /**
   * Get all injected class names
   */
  getClassNames(): string[] {
    return Array.from(this.cssMap.keys())
  }

  /**
   * Destroy the injector
   */
  destroy(): void {
    if (this.styleElement) {
      this.styleElement.remove()
      this.styleElement = null
    }
    this.css = ''
    this.cssMap.clear()
  }
}

/**
 * Create a style injector
 */
export function createInjector(config?: InjectorConfig): StyleInjector {
  return new StyleInjector(config)
}

export default StyleInjector
