/**
 * CoralCSS Core
 *
 * Core modules for CSS generation.
 * @module core
 */

// Cache
export { CSSCache, createCache } from './cache'

// Parser
export {
  parse,
  parseClasses,
  expandVariantGroups,
  hasVariants,
  isNegative,
  hasArbitrary,
  extractUtility,
  extractVariants,
  combineWithVariants,
  normalizeArbitraryValue,
  parseArbitraryValue,
  createClassName,
} from './parser'

// Matcher
export { Matcher, createMatcher } from './matcher'

// Generator
export {
  Generator,
  createGenerator,
  generateNegative,
  mergeProperties,
  sortGeneratedCSS,
  dedupeGeneratedCSS,
  type GeneratorOptions,
} from './generator'

// Transformer
export {
  Transformer,
  createTransformer,
  transformToCSS,
  groupBySelector,
  mergeSameSelector,
  createPreflight,
  type TransformerOptions,
} from './transformer'

// Extractor
export {
  Extractor,
  createExtractor,
  extractFromHTML,
  extractClasses,
  type ExtractorOptions,
} from './extractor'

// Aliases for compatibility
export { Matcher as RuleMatcher } from './matcher'
export { Generator as CSSGenerator } from './generator'
export { Transformer as CSSTransformer } from './transformer'
export { Extractor as ClassExtractor } from './extractor'

// Parser class alias
export class ClassNameParser {
  parse(className: string) {
    return parse(className)
  }

  parseClasses(input: string) {
    return parseClasses(input)
  }

  expandVariantGroups(input: string) {
    return expandVariantGroups(input)
  }
}

import { parse, parseClasses, expandVariantGroups } from './parser'
