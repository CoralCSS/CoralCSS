/**
 * CoralCSS ESLint Plugin
 *
 * ESLint rules for CoralCSS utility classes.
 * @module eslint
 */

import type { Rule } from 'eslint'
import { sortClassNames } from '../prettier'
import { createCoral } from '../index'

/**
 * Create coral instance for validation
 */
const coral = createCoral()

/**
 * Known variant names
 */
const KNOWN_VARIANTS = new Set([
  'hover', 'focus', 'focus-within', 'focus-visible', 'active', 'visited',
  'target', 'first', 'last', 'only', 'odd', 'even', 'first-of-type',
  'last-of-type', 'only-of-type', 'empty', 'disabled', 'enabled', 'checked',
  'indeterminate', 'default', 'required', 'valid', 'invalid', 'in-range',
  'out-of-range', 'placeholder-shown', 'autofill', 'read-only',
  'before', 'after', 'first-letter', 'first-line', 'marker', 'selection',
  'file', 'placeholder', 'backdrop',
  'sm', 'md', 'lg', 'xl', '2xl',
  'max-sm', 'max-md', 'max-lg', 'max-xl', 'max-2xl',
  'dark', 'light',
  'motion-safe', 'motion-reduce',
  'contrast-more', 'contrast-less',
  'portrait', 'landscape',
  'print',
  'rtl', 'ltr',
  'group-hover', 'group-focus', 'group-active', 'group-focus-within',
  'peer-hover', 'peer-focus', 'peer-checked', 'peer-invalid', 'peer-disabled',
  'open',
])

/**
 * Deprecated classes mapping (old -> new)
 */
const DEPRECATED_CLASSES: Record<string, string> = {
  'flex-grow': 'grow',
  'flex-grow-0': 'grow-0',
  'flex-shrink': 'shrink',
  'flex-shrink-0': 'shrink-0',
  'overflow-ellipsis': 'text-ellipsis',
  'overflow-clip': 'text-clip',
  'decoration-slice': 'box-decoration-slice',
  'decoration-clone': 'box-decoration-clone',
}

/**
 * Property conflict groups
 */
const PROPERTY_GROUPS: Record<string, RegExp[]> = {
  display: [/^(block|inline-block|inline|flex|inline-flex|grid|inline-grid|hidden|contents|flow-root|table)$/],
  position: [/^(static|fixed|absolute|relative|sticky)$/],
  'flex-direction': [/^flex-(row|col|row-reverse|col-reverse)$/],
  'text-align': [/^text-(left|center|right|justify|start|end)$/],
  'font-weight': [/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/],
  overflow: [/^overflow-(auto|hidden|clip|visible|scroll)$/],
  'overflow-x': [/^overflow-x-(auto|hidden|clip|visible|scroll)$/],
  'overflow-y': [/^overflow-y-(auto|hidden|clip|visible|scroll)$/],
}

/**
 * Extract class names from a value node
 */
function extractClasses(value: string): string[] {
  return value.trim().split(/\s+/).filter(Boolean)
}

/**
 * Check if a class is valid
 */
function isValidClass(className: string): boolean {
  // Skip empty
  if (!className) { return false }

  // Handle important modifier
  let cls = className
  if (cls.startsWith('!') || cls.endsWith('!')) {
    cls = cls.replace(/!/g, '')
  }

  // Handle negative prefix
  if (cls.startsWith('-')) {
    cls = cls.slice(1)
  }

  // Parse variants
  const parts = cls.split(':')
  const baseClass = parts.pop() || ''
  const variants = parts

  // Validate variants
  for (const variant of variants) {
    // Skip arbitrary variants
    if (variant.startsWith('[') && variant.endsWith(']')) { continue }
    if (variant.startsWith('data-[') || variant.startsWith('aria-[') || variant.startsWith('supports-[')) { continue }
    if (variant.startsWith('group-') || variant.startsWith('peer-')) {
      const subVariant = variant.replace(/^(group|peer)-/, '')
      if (!KNOWN_VARIANTS.has(subVariant) && !subVariant.startsWith('[')) { return false }
      continue
    }
    if (!KNOWN_VARIANTS.has(variant)) { return false }
  }

  // Arbitrary values are considered valid
  if (baseClass.includes('[') && baseClass.includes(']')) {
    return true
  }

  // Try to generate CSS
  const css = coral.generate([className])
  return !!(css && css.trim().length > 0)
}

/**
 * Get conflicting property for a class
 */
function getPropertyGroup(className: string): string | null {
  // Remove variants
  const parts = className.split(':')
  const baseClass = parts.pop() || ''
  const variantKey = parts.join(':')

  for (const [property, patterns] of Object.entries(PROPERTY_GROUPS)) {
    for (const pattern of patterns) {
      if (pattern.test(baseClass)) {
        return variantKey ? `${variantKey}:${property}` : property
      }
    }
  }

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyNode = any

/**
 * Rule: No unknown class names
 */
const noUnknownClassRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow unknown CoralCSS class names',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [],
    messages: {
      unknownClass: 'Unknown CoralCSS class: "{{className}}"',
    },
  },

  create(context) {
    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        for (const cls of classes) {
          if (!isValidClass(cls)) {
            context.report({
              node,
              messageId: 'unknownClass',
              data: { className: cls },
            })
          }
        }
      },

      TemplateLiteral(node: AnyNode) {
        // Check for template literals in className context
        const parent = node.parent
        if (parent?.type !== 'CallExpression') { return }

        const callee = parent.callee
        if (callee.type !== 'Identifier') { return }
        if (!['cn', 'cx', 'clsx', 'classnames', 'cva'].includes(callee.name)) { return }

        for (const quasi of node.quasis) {
          const classes = extractClasses(quasi.value.raw)
          for (const cls of classes) {
            if (!isValidClass(cls)) {
              context.report({
                node: quasi,
                messageId: 'unknownClass',
                data: { className: cls },
              })
            }
          }
        }
      },
    }
  },
}

/**
 * Rule: No conflicting classes
 */
const noConflictingClassesRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow conflicting CoralCSS classes',
      category: 'Possible Errors',
      recommended: true,
    },
    schema: [],
    messages: {
      conflict: 'Conflicting classes for "{{property}}": "{{class1}}" and "{{class2}}"',
    },
  },

  create(context) {
    function checkConflicts(node: AnyNode, classValue: string) {
      const classes = extractClasses(classValue)
      const propertyMap = new Map<string, string>()

      for (const cls of classes) {
        const property = getPropertyGroup(cls)
        if (property) {
          const existing = propertyMap.get(property)
          if (existing && existing !== cls) {
            context.report({
              node,
              messageId: 'conflict',
              data: {
                property,
                class1: existing,
                class2: cls,
              },
            })
          }
          propertyMap.set(property, cls)
        }
      }
    }

    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        checkConflicts(node, node.value.value)
      },
    }
  },
}

/**
 * Rule: Enforce class order
 */
const enforceClassOrderRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce consistent class name order',
      category: 'Stylistic Issues',
      recommended: false,
    },
    fixable: 'code',
    schema: [],
    messages: {
      wrongOrder: 'Classes are not in the recommended order',
    },
  },

  create(context) {
    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const original = node.value.value
        const sorted = sortClassNames(original)

        if (original !== sorted) {
          context.report({
            node,
            messageId: 'wrongOrder',
            fix(fixer) {
              return fixer.replaceText(node.value as AnyNode, `"${sorted}"`)
            },
          })
        }
      },
    }
  },
}

/**
 * Rule: No arbitrary values
 */
const noArbitraryValueRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow arbitrary values in classes',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          allow: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      noArbitrary: 'Avoid arbitrary values. Consider adding "{{value}}" to your theme.',
    },
  },

  create(context) {
    const options = context.options[0] || {}
    const allowedPrefixes = new Set((options as { allow?: string[] }).allow || [])

    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        for (const cls of classes) {
          if (cls.includes('[') && cls.includes(']')) {
            const prefix = cls.split('[')[0]
            if (prefix && !allowedPrefixes.has(prefix.replace(/-$/, ''))) {
              const valueMatch = cls.match(/\[([^\]]+)\]/)
              const value = valueMatch ? valueMatch[1] : 'unknown'
              context.report({
                node,
                messageId: 'noArbitrary',
                data: { value },
              })
            }
          }
        }
      },
    }
  },
}

/**
 * Rule: No redundant variants
 */
const noRedundantVariantRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow redundant variants',
      category: 'Best Practices',
      recommended: true,
    },
    schema: [],
    messages: {
      duplicate: 'Duplicate variant "{{variant}}" in class',
    },
  },

  create(context) {
    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        for (const cls of classes) {
          const parts = cls.split(':')
          if (parts.length < 2) { continue }

          // Check for duplicate variants
          const variants = parts.slice(0, -1)
          const seen = new Set<string>()
          for (const variant of variants) {
            if (seen.has(variant)) {
              context.report({
                node,
                messageId: 'duplicate',
                data: { variant },
              })
            }
            seen.add(variant)
          }
        }
      },
    }
  },
}

/**
 * Rule: Max class count
 */
const maxClassCountRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Limit the number of classes on an element',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [
      {
        type: 'object',
        properties: {
          max: {
            type: 'number',
            minimum: 1,
          },
        },
        additionalProperties: false,
      },
    ],
    messages: {
      tooMany: 'Too many classes ({{count}}). Consider extracting to a component. Maximum allowed is {{max}}.',
    },
  },

  create(context) {
    const options = context.options[0] || {}
    const max = (options as { max?: number }).max || 10

    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        if (classes.length > max) {
          context.report({
            node,
            messageId: 'tooMany',
            data: {
              count: String(classes.length),
              max: String(max),
            },
          })
        }
      },
    }
  },
}

/**
 * Rule: Prefer semantic color names
 */
const preferSemanticColorRule: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Prefer semantic color names over raw color values',
      category: 'Best Practices',
      recommended: false,
    },
    schema: [],
    messages: {
      preferSemantic: 'Prefer semantic color name instead of "{{color}}". Consider using theme colors.',
    },
  },

  create(context) {
    const colorPrefixes = ['text-', 'bg-', 'border-', 'ring-', 'fill-', 'stroke-']
    const hexPattern = /^#[a-fA-F0-9]{3,8}$/
    const rgbPattern = /^rgba?\(/

    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        for (const cls of classes) {
          // Check for arbitrary color values
          const match = cls.match(/\[([^\]]+)\]/)
          if (match) {
            const value = match[1]
            if (!value) { continue }
            if (hexPattern.test(value) || rgbPattern.test(value)) {
              // Check if it's a color utility
              for (const prefix of colorPrefixes) {
                if (cls.startsWith(prefix)) {
                  context.report({
                    node,
                    messageId: 'preferSemantic',
                    data: { color: value },
                  })
                  break
                }
              }
            }
          }
        }
      },
    }
  },
}

/**
 * Rule: No deprecated classes
 */
const noDeprecatedClassRule: Rule.RuleModule = {
  meta: {
    type: 'problem',
    docs: {
      description: 'Disallow deprecated class names',
      category: 'Possible Errors',
      recommended: true,
    },
    fixable: 'code',
    schema: [],
    messages: {
      deprecated: '"{{oldClass}}" is deprecated. Use "{{newClass}}" instead.',
    },
  },

  create(context) {
    return {
      JSXAttribute(node: AnyNode) {
        if (node.name.name !== 'className' && node.name.name !== 'class') {
          return
        }

        if (node.value?.type !== 'Literal' || typeof node.value.value !== 'string') {
          return
        }

        const classes = extractClasses(node.value.value)
        for (const cls of classes) {
          // Remove variants to check base class
          const parts = cls.split(':')
          const baseClass = parts.pop() || ''
          const variants = parts.join(':')

          if (DEPRECATED_CLASSES[baseClass]) {
            const newClass = variants ? `${variants}:${DEPRECATED_CLASSES[baseClass]}` : DEPRECATED_CLASSES[baseClass]
            context.report({
              node,
              messageId: 'deprecated',
              data: {
                oldClass: cls,
                newClass,
              },
              fix(fixer) {
                const oldValue = node.value as AnyNode & { value: string }
                const newValue = oldValue.value.replace(cls, newClass)
                return fixer.replaceText(node.value as AnyNode, `"${newValue}"`)
              },
            })
          }
        }
      },
    }
  },
}

/**
 * ESLint plugin for CoralCSS
 */
export const eslintPlugin = {
  meta: {
    name: '@coral-css/eslint-plugin',
    version: '1.0.0',
  },

  rules: {
    'no-unknown-class': noUnknownClassRule,
    'no-conflicting-classes': noConflictingClassesRule,
    'enforce-class-order': enforceClassOrderRule,
    'no-arbitrary-value': noArbitraryValueRule,
    'no-redundant-variant': noRedundantVariantRule,
    'max-class-count': maxClassCountRule,
    'prefer-semantic-color': preferSemanticColorRule,
    'no-deprecated-class': noDeprecatedClassRule,
  },

  configs: {
    recommended: {
      plugins: ['@coral-css'],
      rules: {
        '@coral-css/no-unknown-class': 'warn',
        '@coral-css/no-conflicting-classes': 'warn',
        '@coral-css/enforce-class-order': 'off',
        '@coral-css/no-arbitrary-value': 'off',
        '@coral-css/no-redundant-variant': 'warn',
        '@coral-css/max-class-count': 'off',
        '@coral-css/prefer-semantic-color': 'off',
        '@coral-css/no-deprecated-class': 'warn',
      },
    },
    strict: {
      plugins: ['@coral-css'],
      rules: {
        '@coral-css/no-unknown-class': 'error',
        '@coral-css/no-conflicting-classes': 'error',
        '@coral-css/enforce-class-order': 'warn',
        '@coral-css/no-arbitrary-value': 'warn',
        '@coral-css/no-redundant-variant': 'error',
        '@coral-css/max-class-count': ['warn', { max: 15 }],
        '@coral-css/prefer-semantic-color': 'warn',
        '@coral-css/no-deprecated-class': 'error',
      },
    },
  },
}

/**
 * ESLint flat config type (compatible with ESLint 8+)
 */
export interface FlatConfig {
  plugins?: Record<string, unknown>
  rules?: Record<string, unknown>
  languageOptions?: Record<string, unknown>
  files?: string[]
  ignores?: string[]
}

/**
 * Flat config helper
 */
export function createFlatConfig(options: { recommended?: boolean; strict?: boolean } = {}): FlatConfig {
  const config: FlatConfig = {
    plugins: {
      '@coral-css': eslintPlugin,
    },
    rules: {},
  }

  if (options.strict) {
    config.rules = eslintPlugin.configs.strict.rules
  } else if (options.recommended !== false) {
    config.rules = eslintPlugin.configs.recommended.rules
  }

  return config
}

export default eslintPlugin
