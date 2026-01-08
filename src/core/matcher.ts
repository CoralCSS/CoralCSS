/**
 * Rule Matcher
 *
 * Matches utility class names against registered rules.
 * @module core/matcher
 */

import type { Rule, MatchResult } from '../types'
import { anchorPattern } from '../utils/regex'

/**
 * Compiled rule with pre-compiled RegExp
 */
interface CompiledRule extends Rule {
  compiledPattern: RegExp
}

/**
 * Rule Matcher class
 *
 * @example
 * ```typescript
 * const matcher = new Matcher()
 * matcher.addRule({
 *   name: 'padding',
 *   pattern: /^p-(\d+)$/,
 *   generate: (match, theme) => ({ padding: theme.spacing[match[1]] })
 * })
 *
 * const result = matcher.match('p-4')
 * // { rule: {...}, match: ['p-4', '4'] }
 * ```
 */
export class Matcher {
  private rules: Map<string, CompiledRule>
  private sortedRules: CompiledRule[] | null
  private matchCache: Map<string, MatchResult | null>

  constructor() {
    this.rules = new Map()
    this.sortedRules = null
    this.matchCache = new Map()
  }

  /**
   * Add a rule to the matcher
   *
   * @example
   * ```typescript
   * matcher.addRule({
   *   name: 'padding',
   *   pattern: /^p-(\d+)$/,
   *   generate: (match, theme) => ({ padding: theme.spacing[match[1]] }),
   *   priority: 10
   * })
   * ```
   */
  addRule(rule: Rule): void {
    // Compile pattern
    const compiledPattern =
      typeof rule.pattern === 'string' ? anchorPattern(rule.pattern) : anchorPattern(rule.pattern)

    const compiledRule: CompiledRule = {
      ...rule,
      compiledPattern,
      priority: rule.priority ?? 0,
      layer: rule.layer ?? 'utilities',
    }

    const ruleName = rule.name ?? this.generateRuleName(rule.pattern)
    this.rules.set(ruleName, compiledRule)
    this.invalidateCache()
  }

  /**
   * Generate a rule name from pattern
   */
  private generateRuleName(pattern: RegExp | string): string {
    if (typeof pattern === 'string') {
      return pattern
    }
    // Extract base name from regex
    return pattern.source.replace(/[\^$\\[\](){}|+*?.]/g, '').slice(0, 40) || 'anonymous'
  }

  /**
   * Add multiple rules
   */
  addRules(rules: Rule[]): void {
    for (const rule of rules) {
      this.addRule(rule)
    }
  }

  /**
   * Remove a rule by name
   */
  removeRule(name: string): boolean {
    const removed = this.rules.delete(name)
    if (removed) {
      this.invalidateCache()
    }
    return removed
  }

  /**
   * Get a rule by name
   */
  getRule(name: string): Rule | undefined {
    return this.rules.get(name)
  }

  /**
   * Check if a rule exists
   */
  hasRule(name: string): boolean {
    return this.rules.has(name)
  }

  /**
   * Get all rules
   */
  getRules(): Rule[] {
    return Array.from(this.rules.values())
  }

  /**
   * Match a utility against all rules
   *
   * @example
   * ```typescript
   * const result = matcher.match('p-4')
   * if (result) {
   *   const css = result.rule.generate(result.match, theme)
   * }
   * ```
   */
  match(utility: string): MatchResult | null {
    // Check cache first
    const cached = this.matchCache.get(utility)
    if (cached !== undefined) {
      return cached
    }

    // Get sorted rules (by priority, highest first)
    const rules = this.getSortedRules()

    // Try each rule
    for (const rule of rules) {
      const match = utility.match(rule.compiledPattern)
      if (match) {
        const result: MatchResult = { rule, match }
        this.matchCache.set(utility, result)
        return result
      }
    }

    // No match found
    this.matchCache.set(utility, null)
    return null
  }

  /**
   * Match multiple utilities
   */
  matchAll(utilities: string[]): Map<string, MatchResult | null> {
    const results = new Map<string, MatchResult | null>()
    for (const utility of utilities) {
      results.set(utility, this.match(utility))
    }
    return results
  }

  /**
   * Clear the matcher
   */
  clear(): void {
    this.rules.clear()
    this.invalidateCache()
  }

  /**
   * Get the number of rules
   */
  get size(): number {
    return this.rules.size
  }

  /**
   * Get sorted rules by priority (highest first)
   */
  private getSortedRules(): CompiledRule[] {
    if (this.sortedRules === null) {
      this.sortedRules = Array.from(this.rules.values()).sort(
        (a, b) => (b.priority ?? 0) - (a.priority ?? 0)
      )
    }
    return this.sortedRules
  }

  /**
   * Invalidate caches when rules change
   */
  private invalidateCache(): void {
    this.sortedRules = null
    this.matchCache.clear()
  }
}

/**
 * Create a new matcher instance
 *
 * @example
 * ```typescript
 * const matcher = createMatcher()
 * matcher.addRule({...})
 * ```
 */
export function createMatcher(): Matcher {
  return new Matcher()
}

// Alias for compatibility
export { Matcher as RuleMatcher }
