/**
 * CoralCSS Test Matchers
 *
 * Custom matchers for testing CoralCSS classes.
 * @module testing/matchers
 */

/**
 * Coral matchers interface for type augmentation
 */
export interface CoralMatchers<R = unknown> {
  /** Check if element has a specific class */
  toHaveClass(className: string): R
  /** Check if element has all specified classes */
  toHaveClasses(classNames: string[]): R
  /** Check if element does not have a class */
  toNotHaveClass(className: string): R
  /** Check if element has variant applied */
  toHaveVariant(variant: string, value?: string): R
  /** Check if CSS matches expected output */
  toMatchCSS(expected: string): R
  /** Check if CSS contains expected content */
  toContainCSS(expected: string): R
}

/**
 * Check if element has a specific class
 *
 * @example
 * ```typescript
 * expect(element).toHaveClass('bg-red-500')
 * ```
 */
export function toHaveClass(
  received: Element | string,
  className: string
): { pass: boolean; message: () => string } {
  const classList = typeof received === 'string'
    ? received.split(/\s+/)
    : Array.from(received.classList)

  const pass = classList.includes(className)

  return {
    pass,
    message: () => pass
      ? `Expected element not to have class "${className}", but it does`
      : `Expected element to have class "${className}", but it has: ${classList.join(', ') || '(no classes)'}`,
  }
}

/**
 * Check if element has all specified classes
 *
 * @example
 * ```typescript
 * expect(element).toHaveClasses(['bg-red-500', 'p-4', 'rounded'])
 * ```
 */
export function toHaveClasses(
  received: Element | string,
  classNames: string[]
): { pass: boolean; message: () => string } {
  const classList = typeof received === 'string'
    ? received.split(/\s+/)
    : Array.from(received.classList)

  const missing = classNames.filter(cls => !classList.includes(cls))
  const pass = missing.length === 0

  return {
    pass,
    message: () => pass
      ? `Expected element not to have classes ${classNames.join(', ')}, but it does`
      : `Expected element to have classes ${classNames.join(', ')}, but missing: ${missing.join(', ')}`,
  }
}

/**
 * Check if element does not have a class
 *
 * @example
 * ```typescript
 * expect(element).toNotHaveClass('hidden')
 * ```
 */
export function toNotHaveClass(
  received: Element | string,
  className: string
): { pass: boolean; message: () => string } {
  const result = toHaveClass(received, className)
  return {
    pass: !result.pass,
    message: () => result.pass
      ? `Expected element not to have class "${className}", but it does`
      : `Expected element to have class "${className}", but it doesn't`,
  }
}

/**
 * Check if element has variant applied
 *
 * @example
 * ```typescript
 * expect(element).toHaveVariant('hover')
 * expect(element).toHaveVariant('hover', 'bg-red-600')
 * ```
 */
export function toHaveVariant(
  received: Element | string,
  variant: string,
  value?: string
): { pass: boolean; message: () => string } {
  const classList = typeof received === 'string'
    ? received.split(/\s+/)
    : Array.from(received.classList)

  const variantPattern = value
    ? `${variant}:${value}`
    : new RegExp(`^${variant}:`)

  const hasVariant = typeof variantPattern === 'string'
    ? classList.includes(variantPattern)
    : classList.some(cls => variantPattern.test(cls))

  const matchingClasses = classList.filter(cls =>
    typeof variantPattern === 'string'
      ? cls === variantPattern
      : variantPattern.test(cls)
  )

  return {
    pass: hasVariant,
    message: () => hasVariant
      ? `Expected element not to have variant "${variant}"${value ? `:${value}` : ''}, but found: ${matchingClasses.join(', ')}`
      : `Expected element to have variant "${variant}"${value ? `:${value}` : ''}, but it doesn't. Classes: ${classList.join(', ') || '(none)'}`,
  }
}

/**
 * Check if CSS matches expected output
 *
 * @example
 * ```typescript
 * expect(css).toMatchCSS('.bg-red-500 { background-color: #ef4444; }')
 * ```
 */
export function toMatchCSS(
  received: string,
  expected: string
): { pass: boolean; message: () => string } {
  // Normalize whitespace for comparison
  const normalizeCSS = (css: string) =>
    css.replace(/\s+/g, ' ').replace(/\s*([{};:])\s*/g, '$1').trim()

  const normalizedReceived = normalizeCSS(received)
  const normalizedExpected = normalizeCSS(expected)
  const pass = normalizedReceived === normalizedExpected

  return {
    pass,
    message: () => pass
      ? `Expected CSS not to match, but it does`
      : `Expected CSS:\n${expected}\n\nReceived:\n${received}`,
  }
}

/**
 * Check if CSS contains expected content
 *
 * @example
 * ```typescript
 * expect(css).toContainCSS('background-color: #ef4444')
 * ```
 */
export function toContainCSS(
  received: string,
  expected: string
): { pass: boolean; message: () => string } {
  const normalizeCSS = (css: string) =>
    css.replace(/\s+/g, ' ').trim()

  const normalizedReceived = normalizeCSS(received)
  const normalizedExpected = normalizeCSS(expected)
  const pass = normalizedReceived.includes(normalizedExpected)

  return {
    pass,
    message: () => pass
      ? `Expected CSS not to contain "${expected}", but it does`
      : `Expected CSS to contain:\n${expected}\n\nReceived:\n${received}`,
  }
}

/**
 * Setup Coral matchers for test frameworks
 *
 * @example
 * ```typescript
 * // In your test setup file
 * import { setupCoralMatchers } from '@coral-css/core/testing'
 *
 * // For Vitest
 * import { expect } from 'vitest'
 * setupCoralMatchers(expect)
 *
 * // For Jest
 * import { expect } from '@jest/globals'
 * setupCoralMatchers(expect)
 * ```
 */
export function setupCoralMatchers(expect: {
  extend: (matchers: Record<string, unknown>) => void
}): void {
  expect.extend({
    toHaveClass(received: Element | string, className: string) {
      return toHaveClass(received, className)
    },
    toHaveClasses(received: Element | string, classNames: string[]) {
      return toHaveClasses(received, classNames)
    },
    toNotHaveClass(received: Element | string, className: string) {
      return toNotHaveClass(received, className)
    },
    toHaveVariant(received: Element | string, variant: string, value?: string) {
      return toHaveVariant(received, variant, value)
    },
    toMatchCSS(received: string, expected: string) {
      return toMatchCSS(received, expected)
    },
    toContainCSS(received: string, expected: string) {
      return toContainCSS(received, expected)
    },
  })
}

/**
 * Extract class-related assertions from a test element
 */
export function getClassAssertions(element: Element) {
  const classList = Array.from(element.classList)

  return {
    classes: classList,
    hasClass: (className: string) => classList.includes(className),
    hasAllClasses: (classNames: string[]) => classNames.every(cls => classList.includes(cls)),
    hasAnyClass: (classNames: string[]) => classNames.some(cls => classList.includes(cls)),
    hasVariant: (variant: string) => classList.some(cls => cls.startsWith(`${variant}:`)),
    getVariantClasses: (variant: string) => classList.filter(cls => cls.startsWith(`${variant}:`)),
    getBaseClasses: () => classList.filter(cls => !cls.includes(':')),
  }
}
