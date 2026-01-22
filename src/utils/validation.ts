/**
 * Input Validation Utilities
 *
 * Centralized input validation to prevent:
 * - XSS attacks
 * - ReDoS (Regular Expression Denial of Service)
 * - Prototype pollution
 * - Injection attacks
 *
 * @module utils/validation
 */

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean
  error?: string
}

/**
 * Validation options
 */
export interface ValidationOptions {
  /** Maximum length (default: 1000) */
  maxLength?: number
  /** Allow HTML tags (default: false) */
  allowHTML?: boolean
  /** Allow special regex characters (default: false) */
  allowRegexChars?: boolean
  /** Custom validation pattern */
  pattern?: RegExp
  /** Custom whitelist of allowed characters */
  allowedChars?: string
}

/**
 * Default validation options
 */
const DEFAULT_OPTIONS: ValidationOptions = {
  maxLength: 1000,
  allowHTML: false,
  allowRegexChars: false,
}

/**
 * Validate class name input
 *
 * Checks for:
 * - Maximum length
 * - Dangerous characters (<, >, etc.)
 * - Prototype pollution attempts
 * - Control characters
 *
 * @example
 * ```typescript
 * validateClassName('bg-red-500') // { valid: true }
 * validateClassName('<script>alert(1)</script>') // { valid: false, error: 'Contains dangerous characters' }
 * validateClassName('__proto__.polluted') // { valid: false, error: 'Prototype pollution attempt' }
 * ```
 */
export function validateClassName(input: string, options: ValidationOptions = {}): ValidationResult {
  const opts = { ...DEFAULT_OPTIONS, ...options }

  // Type check
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' }
  }

  // Length limit
  if (input.length > (opts.maxLength ?? 1000)) {
    return { valid: false, error: `Input exceeds maximum length of ${opts.maxLength}` }
  }

  // Empty string is valid (no classes)
  if (input.length === 0) {
    return { valid: true }
  }

  // Check for prototype pollution attempts
  const protoPollutionPatterns = [
    '__proto__',
    '__defineGetter__',
    '__defineSetter__',
    'constructor.prototype',
    'prototype[',
  ]

  const lowerInput = input.toLowerCase()
  for (const pattern of protoPollutionPatterns) {
    if (lowerInput.includes(pattern)) {
      return { valid: false, error: 'Prototype pollution attempt detected' }
    }
  }

  // Check for control characters (except common whitespace)
  for (let i = 0; i < input.length; i++) {
    const code = input.charCodeAt(i)
    // Allow: \t (9), \n (10), \r (13), and printable characters (32+)
    // Block: Other control characters (0-8, 11, 12, 14-31, 127)
    if (
      (code >= 0 && code <= 8) ||
      (code >= 11 && code <= 12) ||
      (code >= 14 && code <= 31) ||
      code === 127
    ) {
      return { valid: false, error: 'Contains control characters' }
    }
  }

  // Check for dangerous HTML characters if not allowed
  if (!opts.allowHTML) {
    const dangerousChars = ['<', '>']
    for (const char of dangerousChars) {
      if (input.includes(char)) {
        return { valid: false, error: 'Contains dangerous characters' }
      }
    }
  }

  // Custom pattern validation
  if (opts.pattern && !opts.pattern.test(input)) {
    return { valid: false, error: 'Does not match required pattern' }
  }

  // Custom allowed characters validation
  if (opts.allowedChars) {
    for (const char of input) {
      if (!opts.allowedChars.includes(char)) {
        return { valid: false, error: `Contains disallowed character: ${char}` }
      }
    }
  }

  return { valid: true }
}

/**
 * Validate CSS value input
 *
 * Checks for dangerous CSS patterns like:
 * - javascript: protocol
 * - expression() function
 * - -moz-binding
 * - data: URLs with non-image content
 *
 * @example
 * ```typescript
 * validateCSSValue('red') // { valid: true }
 * validateCSSValue('javascript:alert(1)') // { valid: false, error: 'Contains dangerous protocol' }
 * validateCSSValue('expression(alert(1))') // { valid: false, error: 'Contains dangerous function' }
 * ```
 */
export function validateCSSValue(input: string): ValidationResult {
  // Type check
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' }
  }

  // Length limit
  if (input.length > 10000) {
    return { valid: false, error: 'CSS value exceeds maximum length' }
  }

  const lowerInput = input.toLowerCase()

  // Check for dangerous protocols
  const dangerousProtocols = [
    'javascript:',
    'vbscript:',
    'data:text/html',
    'data:text/javascript',
    'data:text/ecmascript',
  ]

  for (const protocol of dangerousProtocols) {
    if (lowerInput.includes(protocol)) {
      return { valid: false, error: 'Contains dangerous protocol' }
    }
  }

  // Check for dangerous CSS functions
  const dangerousFunctions = [
    'expression(',
    '-moz-binding',
    'behaviour(',
    'behavior(',
  ]

  for (const func of dangerousFunctions) {
    if (lowerInput.includes(func)) {
      return { valid: false, error: 'Contains dangerous function' }
    }
  }

  // Check for @import with url (could inject external stylesheets)
  if (/@import\s/i.test(input)) {
    return { valid: false, error: 'Contains @import directive' }
  }

  return { valid: true }
}

/**
 * Validate regex pattern to prevent ReDoS
 *
 * Checks for:
 * - Nested quantifiers (catastrophic backtracking risk)
 * - Excessive length
 * - Invalid regex syntax
 *
 * @example
 * ```typescript
 * validateRegexPattern('[a-z]+') // { valid: true }
 * validateRegexPattern('(a+)+') // { valid: false, error: 'Contains nested quantifiers' }
 * validateRegexPattern('[a-z') // { valid: false, error: 'Invalid regex syntax' }
 * ```
 */
export function validateRegexPattern(pattern: string): ValidationResult {
  // Type check
  if (typeof pattern !== 'string') {
    return { valid: false, error: 'Pattern must be a string' }
  }

  // Length limit
  if (pattern.length > 5000) {
    return { valid: false, error: 'Pattern exceeds maximum length' }
  }

  // Check for nested quantifiers - ReDoS risk
  // Patterns like (a+)+, (a*)*, (a{1,3})+, etc.
  // Match: ( ... quantifier ... ) followed by quantifier
  const nestedQuantifierPattern = /\([^)]*[\*\+?\{][^)]*\)[\*\+?\{]/
  if (nestedQuantifierPattern.test(pattern)) {
    return { valid: false, error: 'Contains nested quantifiers' }
  }

  // Check for dangerous repeated patterns
  // Like ((a+)+)+, (.+)+, etc.
  const dangerousRepeat = /(\([^)]*\)|\[[^\]]*\]|\\.)[\*\+?\{]\*[\*\+?\{]/
  if (dangerousRepeat.test(pattern)) {
    return { valid: false, error: 'Contains dangerous repetition pattern' }
  }

  // Check for excessive alternation depth (a|a|a|... many times)
  const alternationCount = (pattern.match(/\|/g) || []).length
  if (alternationCount > 100) {
    return { valid: false, error: 'Contains excessive alternation' }
  }

  // Validate regex syntax
  try {
    new RegExp(pattern)
  } catch (error) {
    return {
      valid: false,
      error: `Invalid regex syntax: ${error instanceof Error ? error.message : 'Unknown error'}`,
    }
  }

  return { valid: true }
}

/**
 * Validate theme property name
 *
 * @example
 * ```typescript
 * validateThemePropertyName('colors.primary') // { valid: true }
 * validateThemePropertyName('__proto__.polluted') // { valid: false, error: 'Prototype pollution attempt' }
 * ```
 */
export function validateThemePropertyName(path: string): ValidationResult {
  // Type check
  if (typeof path !== 'string') {
    return { valid: false, error: 'Path must be a string' }
  }

  // Length limit
  if (path.length > 200) {
    return { valid: false, error: 'Path exceeds maximum length' }
  }

  // Check for prototype pollution
  const lowerPath = path.toLowerCase()
  const dangerousPatterns = [
    '__proto__',
    'constructor.prototype',
    'prototype[',
  ]

  for (const pattern of dangerousPatterns) {
    if (lowerPath.includes(pattern)) {
      return { valid: false, error: 'Prototype pollution attempt detected' }
    }
  }

  // Check for valid path format (alphanumeric, dots, dashes, underscores)
  if (!/^[a-zA-Z_][a-zA-Z0-9_.-]*$/.test(path)) {
    return { valid: false, error: 'Invalid path format' }
  }

  return { valid: true }
}

/**
 * Sanitize string input by removing dangerous characters
 *
 * @example
 * ```typescript
 * sanitizeString('<script>alert(1)</script>') // 'scriptalert1script'
 * sanitizeString('hello-world', { allow: /[\w-]/g }) // 'hello-world'
 * ```
 */
export function sanitizeString(
  input: string,
  options: { allow?: RegExp; replacement?: string } = {}
): string {
  const { allow, replacement = '' } = options

  // Default: keep only alphanumeric, whitespace, and hyphen
  if (!allow) {
    return input.replace(/[^\w\s-]/g, replacement)
  }

  // Custom pattern: use the provided regex to match allowed chars
  // and negate it to remove disallowed chars
  const src = allow.source
  // Check if pattern is already a character class [...]
  if (src.startsWith('[') && src.endsWith(']')) {
    // Pattern is [abc], negate to [^abc]
    const negated = src[0] === '^' ? src : '[^' + src.slice(1)
    return input.replace(new RegExp(negated, 'g'), replacement)
  }
  // Pattern is not a character class, wrap it
  return input.replace(new RegExp(`[^${src}]`, 'g'), replacement)
}

/**
 * Validate and sanitize CSS selector
 *
 * @example
 * ```typescript
 * validateSelector('.my-class') // { valid: true, sanitized: '.my-class' }
 * validateSelector('<img src=x onerror=alert(1)>') // { valid: false, error: 'Contains dangerous characters' }
 * ```
 */
export function validateSelector(input: string): ValidationResult & { sanitized?: string } {
  // Type check
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' }
  }

  // Length limit
  if (input.length > 500) {
    return { valid: false, error: 'Selector exceeds maximum length' }
  }

  // Check for dangerous characters (< is dangerous, > is allowed in selectors)
  if (/</.test(input)) {
    return { valid: false, error: 'Contains dangerous characters' }
  }

  // Check for javascript: protocol BEFORE format validation
  if (/javascript\s*:/i.test(input)) {
    return { valid: false, error: 'Contains dangerous protocol' }
  }

  // Basic CSS selector validation
  // Allow: alphanumeric, #, ., -, _, :, [, ], >, +, ~, space, comma, *, (, ), {, }, ", ', @, =
  // Can start with: letter, _, ., #, :, [, *, @, +, >
  if (!/^[a-zA-Z_\.#\:\[\]\*\@\+\-\>][a-zA-Z0-9_#\-\.\:\[\]\>\+\~\s\,\*\(\)\{\}\"\'\@\=]*$/.test(input)) {
    return { valid: false, error: 'Invalid selector format' }
  }

  // Check for javascript: in attribute values
  if (/javascript\s*:/i.test(input)) {
    return { valid: false, error: 'Contains dangerous protocol' }
  }

  return { valid: true, sanitized: input }
}

/**
 * Validate file path input
 *
 * Prevents path traversal attacks
 *
 * @example
 * ```typescript
 * validateFilePath('/home/user/file.txt') // { valid: true }
 * validateFilePath('../../../etc/passwd') // { valid: false, error: 'Path traversal detected' }
 * validateFilePath('C:\\Windows\\System32') // { valid: true }
 * ```
 */
export function validateFilePath(input: string): ValidationResult {
  // Type check
  if (typeof input !== 'string') {
    return { valid: false, error: 'Input must be a string' }
  }

  // Length limit
  if (input.length > 4096) {
    return { valid: false, error: 'Path exceeds maximum length' }
  }

  // Check for path traversal attempts
  const normalizedPath = input.replace(/\\/g, '/')

  // Check for multiple consecutive .. patterns that escape root (path traversal)
  // Allow single ../ (common in relative paths) but reject ../../../ (dangerous)
  if (/\.\.\/\.\.\//.test(normalizedPath) || /\.\.\/\.\.\//.test(input)) {
    return { valid: false, error: 'Path traversal detected' }
  }

  // Check for absolute paths that escape root
  // Unix: /../../../
  // Windows: ..\..\..\..
  if (/^(\/+|[A-Za-z]:)\.\./.test(normalizedPath)) {
    return { valid: false, error: 'Path traversal detected' }
  }

  // Check for null bytes
  if (input.includes('\0')) {
    return { valid: false, error: 'Contains null byte' }
  }

  return { valid: true }
}

export default {
  validateClassName,
  validateCSSValue,
  validateRegexPattern,
  validateThemePropertyName,
  sanitizeString,
  validateSelector,
  validateFilePath,
}
