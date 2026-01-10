/**
 * CoralCSS Testing Utilities
 *
 * Testing helpers for applications using CoralCSS.
 * @module testing
 */

export {
  createTestCoral,
  mockCoral,
  resetMockCoral,
  type MockCoral,
  type MockCoralOptions,
} from './mock'

export {
  toHaveClass,
  toHaveClasses,
  toNotHaveClass,
  toHaveVariant,
  toMatchCSS,
  toContainCSS,
  setupCoralMatchers,
  type CoralMatchers,
} from './matchers'

export {
  renderWithCoral,
  createTestWrapper,
  createTestProvider,
  type TestWrapperOptions,
} from './render'

export {
  extractGeneratedCSS,
  getComputedClasses,
  generateSnapshot,
  compareCSS,
  type CSSSnapshot,
} from './helpers'

export {
  createClassSpy,
  trackClassChanges,
  type ClassSpy,
  type ClassChangeEvent,
} from './spy'
