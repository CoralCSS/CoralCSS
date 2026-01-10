/**
 * Token Reference Utilities
 *
 * Utilities for creating and checking token references.
 * Separated to avoid circular import issues.
 *
 * @module tokens/ref
 */

/**
 * Token reference utility - creates a reference to another token
 */
export function ref(path: string): { $ref: string } {
  return { $ref: path }
}

/**
 * Check if a value is a token reference
 */
export function isRef(value: unknown): value is { $ref: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    '$ref' in value &&
    typeof (value as { $ref: unknown }).$ref === 'string'
  )
}
