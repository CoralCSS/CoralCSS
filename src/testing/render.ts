/**
 * CoralCSS Render Helpers
 *
 * Utilities for rendering components with CoralCSS in tests.
 * @module testing/render
 */

import { createCoral } from '../index'
import type { CoralOptions, Coral } from '../types'

/**
 * Test wrapper options
 */
export interface TestWrapperOptions extends CoralOptions {
  /** Container element for rendering */
  container?: HTMLElement
  /** Auto-inject CSS */
  autoInject?: boolean
  /** Base classes to always include */
  baseClasses?: string[]
}

/**
 * Test wrapper result
 */
export interface TestWrapper {
  /** Coral instance */
  coral: Coral
  /** Container element */
  container: HTMLElement
  /** Style element for injected CSS */
  styleElement: HTMLStyleElement
  /** Cleanup function */
  cleanup: () => void
  /** Inject CSS manually */
  injectCSS: (css: string) => void
  /** Get all injected CSS */
  getInjectedCSS: () => string
  /** Process classes and inject CSS */
  processClasses: (classes: string[]) => string
}

/**
 * Create a test wrapper with CoralCSS support
 *
 * @example
 * ```typescript
 * import { createTestWrapper } from '@coral-css/core/testing'
 *
 * describe('MyComponent', () => {
 *   let wrapper: TestWrapper
 *
 *   beforeEach(() => {
 *     wrapper = createTestWrapper({ darkMode: 'class' })
 *   })
 *
 *   afterEach(() => {
 *     wrapper.cleanup()
 *   })
 *
 *   it('should render with Coral classes', () => {
 *     const css = wrapper.processClasses(['bg-red-500', 'p-4'])
 *     expect(wrapper.getInjectedCSS()).toContain('background-color')
 *   })
 * })
 * ```
 */
export function createTestWrapper(options: TestWrapperOptions = {}): TestWrapper {
  const { container: providedContainer, autoInject = true, baseClasses = [], ...coralOptions } = options

  // Create container
  const container = providedContainer || document.createElement('div')
  container.setAttribute('data-testid', 'coral-test-wrapper')

  // Create style element
  const styleElement = document.createElement('style')
  styleElement.setAttribute('data-coral', 'test')

  // Append to document if we created the container
  if (!providedContainer && typeof document !== 'undefined') {
    document.body.appendChild(container)
    document.head.appendChild(styleElement)
  }

  // Create Coral instance
  const coral = createCoral(coralOptions)
  let injectedCSS = ''

  // Process base classes
  if (baseClasses.length > 0) {
    const css = coral.generate(baseClasses)
    if (css && autoInject) {
      injectedCSS = css
      styleElement.textContent = css
    }
  }

  const wrapper: TestWrapper = {
    coral,
    container,
    styleElement,

    cleanup() {
      if (!providedContainer) {
        container.remove()
        styleElement.remove()
      }
    },

    injectCSS(css: string) {
      injectedCSS += '\n' + css
      styleElement.textContent = injectedCSS
    },

    getInjectedCSS() {
      return injectedCSS
    },

    processClasses(classes: string[]) {
      const css = coral.generate(classes)
      if (css && autoInject) {
        wrapper.injectCSS(css)
      }
      return classes.join(' ')
    },
  }

  return wrapper
}

/**
 * Create a provider wrapper for framework-specific testing
 *
 * @example
 * ```typescript
 * // React Testing Library
 * import { render } from '@testing-library/react'
 * import { createTestProvider } from '@coral-css/core/testing'
 *
 * const wrapper = createTestProvider()
 *
 * render(<MyComponent />, { wrapper: wrapper.Provider })
 * ```
 */
export function createTestProvider(options: TestWrapperOptions = {}) {
  const wrapper = createTestWrapper(options)

  return {
    ...wrapper,
    /** Context value for providers */
    contextValue: {
      coral: wrapper.coral,
      generate: wrapper.coral.generate.bind(wrapper.coral),
      process: wrapper.processClasses.bind(wrapper),
    },
    /** Get provider props */
    getProviderProps() {
      return {
        value: this.contextValue,
      }
    },
  }
}

/**
 * Higher-order function to wrap component rendering with Coral
 *
 * @example
 * ```typescript
 * // Usage with any render function
 * const renderWithCoral = renderWithCoralFactory(
 *   (component) => render(component),
 *   { darkMode: 'class' }
 * )
 *
 * const { container } = renderWithCoral(<MyComponent />)
 * ```
 */
export function renderWithCoral<T>(
  renderFn: (element: unknown) => T,
  options: TestWrapperOptions = {}
): (element: unknown) => T & { coralWrapper: TestWrapper } {
  return (element: unknown) => {
    const wrapper = createTestWrapper(options)
    const result = renderFn(element)

    return {
      ...result,
      coralWrapper: wrapper,
    }
  }
}

/**
 * Utility to wait for CSS to be injected
 */
export async function waitForCSS(
  wrapper: TestWrapper,
  predicate: (css: string) => boolean,
  timeout = 1000
): Promise<void> {
  const startTime = Date.now()

  return new Promise((resolve, reject) => {
    const check = () => {
      if (predicate(wrapper.getInjectedCSS())) {
        resolve()
      } else if (Date.now() - startTime > timeout) {
        reject(new Error('Timeout waiting for CSS'))
      } else {
        setTimeout(check, 10)
      }
    }
    check()
  })
}

/**
 * Create isolated test environment
 */
export function createIsolatedEnvironment(options: TestWrapperOptions = {}) {
  const iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument!
  const container = iframeDoc.createElement('div')
  iframeDoc.body.appendChild(container)

  const wrapper = createTestWrapper({
    ...options,
    container,
  })

  return {
    ...wrapper,
    iframe,
    document: iframeDoc,
    cleanup() {
      wrapper.cleanup()
      iframe.remove()
    },
  }
}
