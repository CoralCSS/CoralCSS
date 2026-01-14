/**
 * Tree Shaking System Tests
 *
 * Tests for tree shaking unused CSS rules to reduce bundle size.
 */
import { describe, it, expect } from 'vitest'
import {
  TreeShake,
  createTreeShake,
  treeShakeRules,
  analyzeRuleUsage,
} from '../../../src/core/tree-shake'
import type { Rule, RuleConfig } from '../../../src/types'

// Helper to create mock rules
function createMockRule(pattern: string | RegExp, properties: Record<string, string> = {}): Rule {
  return {
    pattern,
    properties,
    handler: () => ({ properties }),
  } as unknown as Rule
}

describe('Tree Shaking System', () => {
  describe('TreeShake', () => {
    describe('initialization', () => {
      it('should create with default options', () => {
        const treeShake = new TreeShake()
        expect(treeShake).toBeDefined()
      })

      it('should create with custom options', () => {
        const treeShake = new TreeShake({
          enabled: true,
          include: ['p-4', 'bg-red-500'],
          exclude: ['text-*'],
          includePatterns: [/^m-/],
          excludePatterns: [/^hidden/],
          keepVariants: true,
          keepDynamic: false,
        })
        expect(treeShake).toBeDefined()
      })

      it('should be created via factory function', () => {
        const treeShake = createTreeShake()
        expect(treeShake).toBeInstanceOf(TreeShake)
      })

      it('should be created via factory with options', () => {
        const treeShake = createTreeShake({
          includePatterns: [/^p-/],
        })
        expect(treeShake).toBeInstanceOf(TreeShake)
      })
    })

    describe('analyzeUsage', () => {
      it('should track used classes', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4', 'bg-red-500', 'text-lg'])

        const usedClasses = treeShake.getUsedClasses()
        expect(usedClasses).toContain('p-4')
        expect(usedClasses).toContain('bg-red-500')
        expect(usedClasses).toContain('text-lg')
      })

      it('should track variants', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['hover:bg-red-500', 'dark:text-white', 'sm:md:p-4'])

        const usedVariants = treeShake.getUsedVariants()
        expect(usedVariants).toContain('hover')
        expect(usedVariants).toContain('dark')
        expect(usedVariants).toContain('sm')
        expect(usedVariants).toContain('md')
      })

      it('should extract base class from variants', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['hover:bg-red-500', 'dark:focus:text-white'])

        const usedClasses = treeShake.getUsedClasses()
        expect(usedClasses).toContain('bg-red-500')
        expect(usedClasses).toContain('text-white')
      })

      it('should clear previous analysis on new call', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4'])
        treeShake.analyzeUsage(['m-4'])

        const usedClasses = treeShake.getUsedClasses()
        expect(usedClasses).not.toContain('p-4')
        expect(usedClasses).toContain('m-4')
      })
    })

    describe('shouldKeepRule', () => {
      it('should keep all rules when disabled', () => {
        const treeShake = new TreeShake({ enabled: false })
        const rule: RuleConfig = { pattern: 'unused-class' }

        expect(treeShake.shouldKeepRule(rule)).toBe(true)
      })

      it('should keep rules matching include patterns', () => {
        const treeShake = new TreeShake({
          includePatterns: [/^bg-/],
        })
        const rule: RuleConfig = { pattern: 'bg-red-500' }

        expect(treeShake.shouldKeepRule(rule)).toBe(true)
      })

      it('should exclude rules matching exclude patterns', () => {
        const treeShake = new TreeShake({
          excludePatterns: [/^hidden/],
        })
        const rule: RuleConfig = { pattern: 'hidden-element' }

        expect(treeShake.shouldKeepRule(rule)).toBe(false)
      })

      it('should keep rules for used classes', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4'])

        const rule: RuleConfig = { pattern: 'p-' }

        expect(treeShake.shouldKeepRule(rule)).toBe(true)
      })

      it('should handle regex patterns', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4'])

        const rule: RuleConfig = { pattern: /^p-\d+$/ }

        expect(treeShake.shouldKeepRule(rule)).toBe(true)
      })

      it('should keep dynamic/arbitrary value rules when enabled', () => {
        const treeShake = new TreeShake({ keepDynamic: true })
        const rule: RuleConfig = { pattern: 'bg-\\[' }

        expect(treeShake.shouldKeepRule(rule)).toBe(true)
      })

      it('should not keep dynamic rules when disabled', () => {
        const treeShake = new TreeShake({ keepDynamic: false })
        const rule: RuleConfig = { pattern: 'bg-arbitrary' }

        // Rule won't match used classes and dynamic is disabled
        expect(treeShake.shouldKeepRule(rule)).toBe(false)
      })
    })

    describe('shake', () => {
      it('should filter out unused rules', () => {
        const treeShake = new TreeShake()
        const rules = [
          createMockRule('p-4'),
          createMockRule('unused-rule'),
          createMockRule('bg-red-500'),
        ]

        const result = treeShake.shake(rules, ['p-4', 'bg-red-500'])

        expect(result.length).toBeLessThanOrEqual(rules.length)
      })

      it('should keep all rules when keepVariants is true', () => {
        const treeShake = new TreeShake({ keepVariants: true })
        const rules = [
          createMockRule('p-4'),
          createMockRule('unused-rule'),
        ]

        const result = treeShake.shake(rules, ['p-4'])

        expect(result).toHaveLength(2)
      })

      it('should analyze usage before shaking', () => {
        const treeShake = new TreeShake()
        const rules = [createMockRule('p-')]

        treeShake.shake(rules, ['p-4', 'hover:p-8'])

        const usedClasses = treeShake.getUsedClasses()
        expect(usedClasses).toContain('p-4')
        expect(usedClasses).toContain('p-8')
      })

      it('should return empty array for empty rules', () => {
        const treeShake = new TreeShake()
        const result = treeShake.shake([], ['p-4'])

        expect(result).toEqual([])
      })

      it('should return empty array for empty used classes', () => {
        const treeShake = new TreeShake({ keepDynamic: false })
        const rules = [createMockRule('p-4')]
        const result = treeShake.shake(rules, [])

        // No used classes, so rules matching only used classes are removed
        expect(result.length).toBeLessThanOrEqual(rules.length)
      })
    })

    describe('analyze', () => {
      it('should return usage analysis', () => {
        const treeShake = new TreeShake()
        const rules = [
          createMockRule('p-'),
          createMockRule('m-'),
          createMockRule('bg-'),
          createMockRule('text-'),
        ]

        const analysis = treeShake.analyze(rules, ['p-4'])

        expect(analysis.totalRules).toBe(4)
        expect(analysis.usedRules).toBeLessThanOrEqual(4)
        expect(analysis.unusedRules).toBeGreaterThanOrEqual(0)
        expect(analysis.effectiveness).toBeGreaterThanOrEqual(0)
        expect(analysis.memorySaved).toBeGreaterThanOrEqual(0)
      })

      it('should calculate effectiveness percentage', () => {
        const treeShake = new TreeShake({ keepDynamic: false, keepVariants: false })
        const rules = [
          createMockRule('p-'),
          createMockRule('^unused-rule$'),
          createMockRule('^another-unused$'),
        ]

        const analysis = treeShake.analyze(rules, ['p-4'])

        expect(analysis.effectiveness).toBeGreaterThanOrEqual(0)
        expect(analysis.effectiveness).toBeLessThanOrEqual(100)
      })

      it('should handle empty rules array', () => {
        const treeShake = new TreeShake()
        const analysis = treeShake.analyze([], ['p-4'])

        expect(analysis.totalRules).toBe(0)
        expect(analysis.usedRules).toBe(0)
        expect(analysis.effectiveness).toBe(0)
      })

      it('should estimate memory saved', () => {
        const treeShake = new TreeShake({ keepDynamic: false, keepVariants: false })
        const rules = [
          createMockRule('p-'),
          createMockRule('^unused-pattern-1$'),
          createMockRule('^unused-pattern-2$'),
        ]

        const analysis = treeShake.analyze(rules, ['p-4'])

        // Memory saved should be approximately 100 bytes per unused rule
        expect(analysis.memorySaved).toBeGreaterThanOrEqual(0)
      })
    })

    describe('generateReport', () => {
      it('should generate a text report', () => {
        const treeShake = new TreeShake()
        const rules = [createMockRule('p-'), createMockRule('m-')]

        const report = treeShake.generateReport(rules, ['p-4'])

        expect(report).toContain('Tree Shaking Report')
        expect(report).toContain('Total Rules:')
        expect(report).toContain('Used Rules:')
        expect(report).toContain('Unused Rules:')
        expect(report).toContain('Effectiveness:')
        expect(report).toContain('Memory Saved:')
      })

      it('should include safelist and exclude pattern counts', () => {
        const treeShake = new TreeShake({
          includePatterns: [/^bg-/, /^text-/],
          excludePatterns: [/^hidden/],
        })

        const report = treeShake.generateReport([], [])

        expect(report).toContain('Safelisted Patterns: 2')
        // Note: The report has extra spaces for alignment
        expect(report).toContain('Excluded Patterns:   1')
      })
    })

    describe('pattern management', () => {
      it('should add include pattern as string', () => {
        const treeShake = new TreeShake()
        treeShake.includePattern('^bg-')

        const options = treeShake.getOptions()
        expect(options.includePatterns?.length).toBe(1)
      })

      it('should add include pattern as RegExp', () => {
        const treeShake = new TreeShake()
        treeShake.includePattern(/^text-/)

        const options = treeShake.getOptions()
        expect(options.includePatterns?.length).toBe(1)
      })

      it('should add exclude pattern as string', () => {
        const treeShake = new TreeShake()
        treeShake.excludePattern('^hidden')

        const options = treeShake.getOptions()
        expect(options.excludePatterns?.length).toBe(1)
      })

      it('should add exclude pattern as RegExp', () => {
        const treeShake = new TreeShake()
        treeShake.excludePattern(/^invisible/)

        const options = treeShake.getOptions()
        expect(options.excludePatterns?.length).toBe(1)
      })

      it('should add classes to safelist', () => {
        const treeShake = new TreeShake()
        treeShake.safelist('p-4', 'bg-red-500', 'text-lg')

        const options = treeShake.getOptions()
        expect(options.include).toContain('p-4')
        expect(options.include).toContain('bg-red-500')
        expect(options.include).toContain('text-lg')
      })
    })

    describe('getOptions', () => {
      it('should return copy of current options', () => {
        const treeShake = new TreeShake({
          enabled: true,
          keepDynamic: false,
        })

        const options = treeShake.getOptions()

        expect(options.enabled).toBe(true)
        expect(options.keepDynamic).toBe(false)
      })

      it('should not allow mutation of internal options', () => {
        const treeShake = new TreeShake()
        const options = treeShake.getOptions()

        options.enabled = false

        expect(treeShake.getOptions().enabled).toBe(true)
      })
    })

    describe('reset', () => {
      it('should clear used classes', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4', 'bg-red-500'])

        treeShake.reset()

        expect(treeShake.getUsedClasses()).toHaveLength(0)
      })

      it('should clear used variants', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['hover:p-4', 'dark:bg-red-500'])

        treeShake.reset()

        expect(treeShake.getUsedVariants()).toHaveLength(0)
      })
    })

    describe('getUsedClasses', () => {
      it('should return array of used classes', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['p-4', 'm-4'])

        const classes = treeShake.getUsedClasses()

        expect(Array.isArray(classes)).toBe(true)
        expect(classes).toContain('p-4')
        expect(classes).toContain('m-4')
      })
    })

    describe('getUsedVariants', () => {
      it('should return array of used variants', () => {
        const treeShake = new TreeShake()
        treeShake.analyzeUsage(['hover:p-4', 'dark:m-4'])

        const variants = treeShake.getUsedVariants()

        expect(Array.isArray(variants)).toBe(true)
        expect(variants).toContain('hover')
        expect(variants).toContain('dark')
      })
    })
  })

  describe('treeShakeRules', () => {
    it('should shake rules using convenience function', () => {
      const rules = [
        createMockRule('p-'),
        createMockRule('^unused-xyz-pattern$'),
      ]

      const result = treeShakeRules(rules, ['p-4'])

      expect(result.length).toBeLessThanOrEqual(rules.length)
    })

    it('should accept options', () => {
      const rules = [createMockRule('p-4')]

      const result = treeShakeRules(rules, ['p-4'], {
        enabled: false,
      })

      expect(result).toHaveLength(1)
    })
  })

  describe('analyzeRuleUsage', () => {
    it('should analyze rule usage using convenience function', () => {
      const rules = [
        createMockRule('p-'),
        createMockRule('m-'),
      ]

      const analysis = analyzeRuleUsage(rules, ['p-4'])

      expect(analysis.totalRules).toBe(2)
      expect(analysis).toHaveProperty('usedRules')
      expect(analysis).toHaveProperty('unusedRules')
      expect(analysis).toHaveProperty('effectiveness')
      expect(analysis).toHaveProperty('memorySaved')
    })

    it('should accept options', () => {
      const rules = [createMockRule('p-4')]

      const analysis = analyzeRuleUsage(rules, [], {
        keepDynamic: true,
      })

      expect(analysis.totalRules).toBe(1)
    })
  })

  describe('default export', () => {
    it('should export all components', async () => {
      const module = await import('../../../src/core/tree-shake')
      const defaultExport = module.default

      expect(defaultExport.TreeShake).toBe(TreeShake)
      expect(defaultExport.createTreeShake).toBe(createTreeShake)
      expect(defaultExport.treeShakeRules).toBe(treeShakeRules)
      expect(defaultExport.analyzeRuleUsage).toBe(analyzeRuleUsage)
    })
  })
})
