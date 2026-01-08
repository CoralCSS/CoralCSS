/**
 * CoralCSS Error Classes
 *
 * Custom error classes for better error handling and debugging.
 * @module errors
 */

/**
 * Error codes for CoralCSS errors
 */
export enum ErrorCode {
  /** Invalid configuration provided */
  INVALID_CONFIG = 'INVALID_CONFIG',
  /** Plugin not found */
  PLUGIN_NOT_FOUND = 'PLUGIN_NOT_FOUND',
  /** Plugin dependency not satisfied */
  PLUGIN_DEPENDENCY = 'PLUGIN_DEPENDENCY',
  /** Invalid rule definition */
  INVALID_RULE = 'INVALID_RULE',
  /** Invalid variant definition */
  INVALID_VARIANT = 'INVALID_VARIANT',
  /** Theme error */
  THEME_ERROR = 'THEME_ERROR',
  /** Parse error */
  PARSE_ERROR = 'PARSE_ERROR',
  /** Component error */
  COMPONENT_ERROR = 'COMPONENT_ERROR',
  /** Runtime error */
  RUNTIME_ERROR = 'RUNTIME_ERROR',
  /** Cache error */
  CACHE_ERROR = 'CACHE_ERROR',
  /** Build error */
  BUILD_ERROR = 'BUILD_ERROR',
}

/**
 * Context object for errors
 */
export interface ErrorContext {
  [key: string]: unknown
}

/**
 * Base error class for all CoralCSS errors
 *
 * @example
 * ```typescript
 * throw new CoralError(
 *   'Invalid plugin configuration',
 *   ErrorCode.INVALID_CONFIG,
 *   { plugin: 'my-plugin' }
 * )
 * ```
 */
export class CoralError extends Error {
  /** Error code for programmatic handling */
  public readonly code: ErrorCode
  /** Additional context about the error */
  public readonly context: ErrorContext

  constructor(message: string, code: ErrorCode, context: ErrorContext = {}) {
    super(message)
    this.name = 'CoralError'
    this.code = code
    this.context = context

    // Maintains proper stack trace for where error was thrown (V8 engines)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CoralError)
    }
  }

  /**
   * Convert error to JSON for logging/serialization
   */
  toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      code: this.code,
      context: this.context,
      stack: this.stack,
    }
  }
}

/**
 * Error thrown when configuration is invalid
 */
export class ConfigError extends CoralError {
  constructor(message: string, context: ErrorContext = {}) {
    super(message, ErrorCode.INVALID_CONFIG, context)
    this.name = 'ConfigError'
  }
}

/**
 * Error thrown when a plugin is not found
 */
export class PluginNotFoundError extends CoralError {
  constructor(pluginName: string, context: ErrorContext = {}) {
    super(`Plugin "${pluginName}" not found`, ErrorCode.PLUGIN_NOT_FOUND, {
      pluginName,
      ...context,
    })
    this.name = 'PluginNotFoundError'
  }
}

/**
 * Error thrown when plugin dependencies are not satisfied
 */
export class PluginDependencyError extends CoralError {
  constructor(pluginName: string, missingDependency: string, context: ErrorContext = {}) {
    super(
      `Plugin "${pluginName}" requires "${missingDependency}" to be installed first`,
      ErrorCode.PLUGIN_DEPENDENCY,
      { pluginName, missingDependency, ...context }
    )
    this.name = 'PluginDependencyError'
  }
}

/**
 * Error thrown when a rule definition is invalid
 */
export class InvalidRuleError extends CoralError {
  constructor(ruleName: string, reason: string, context: ErrorContext = {}) {
    super(`Invalid rule "${ruleName}": ${reason}`, ErrorCode.INVALID_RULE, {
      ruleName,
      reason,
      ...context,
    })
    this.name = 'InvalidRuleError'
  }
}

/**
 * Error thrown when a variant definition is invalid
 */
export class InvalidVariantError extends CoralError {
  constructor(variantName: string, reason: string, context: ErrorContext = {}) {
    super(`Invalid variant "${variantName}": ${reason}`, ErrorCode.INVALID_VARIANT, {
      variantName,
      reason,
      ...context,
    })
    this.name = 'InvalidVariantError'
  }
}

/**
 * Error thrown when theme operations fail
 */
export class ThemeError extends CoralError {
  constructor(message: string, context: ErrorContext = {}) {
    super(message, ErrorCode.THEME_ERROR, context)
    this.name = 'ThemeError'
  }
}

/**
 * Error thrown when parsing fails
 */
export class ParseError extends CoralError {
  constructor(input: string, reason: string, context: ErrorContext = {}) {
    super(`Failed to parse "${input}": ${reason}`, ErrorCode.PARSE_ERROR, {
      input,
      reason,
      ...context,
    })
    this.name = 'ParseError'
  }
}

/**
 * Error thrown when component operations fail
 */
export class ComponentError extends CoralError {
  constructor(componentName: string, message: string, context: ErrorContext = {}) {
    super(`Component "${componentName}": ${message}`, ErrorCode.COMPONENT_ERROR, {
      componentName,
      ...context,
    })
    this.name = 'ComponentError'
  }
}

/**
 * Error thrown during runtime operations
 */
export class RuntimeError extends CoralError {
  constructor(message: string, context: ErrorContext = {}) {
    super(message, ErrorCode.RUNTIME_ERROR, context)
    this.name = 'RuntimeError'
  }
}

/**
 * Error thrown during build operations
 */
export class BuildError extends CoralError {
  constructor(message: string, context: ErrorContext = {}) {
    super(message, ErrorCode.BUILD_ERROR, context)
    this.name = 'BuildError'
  }
}

/**
 * Error thrown when rules conflict
 */
export class RuleConflictError extends CoralError {
  constructor(ruleName1: string, ruleName2: string, context: ErrorContext = {}) {
    super(
      `Rule conflict between "${ruleName1}" and "${ruleName2}"`,
      ErrorCode.INVALID_RULE,
      { ruleName1, ruleName2, ...context }
    )
    this.name = 'RuleConflictError'
  }
}

/**
 * Error thrown when a value is invalid
 */
export class InvalidValueError extends CoralError {
  constructor(valueName: string, reason: string, context: ErrorContext = {}) {
    super(`Invalid value "${valueName}": ${reason}`, ErrorCode.INVALID_CONFIG, {
      valueName,
      reason,
      ...context,
    })
    this.name = 'InvalidValueError'
  }
}

/**
 * Error thrown during CSS generation
 */
export class GenerationError extends CoralError {
  constructor(message: string, context: ErrorContext = {}) {
    super(message, ErrorCode.RUNTIME_ERROR, context)
    this.name = 'GenerationError'
  }
}

// =============================================================================
// Error Factory Functions
// =============================================================================

/**
 * Create an error for invalid configuration
 *
 * @example
 * ```typescript
 * throw createConfigError('darkMode must be one of: class, media, selector, auto', {
 *   received: 'invalid'
 * })
 * ```
 */
export function createConfigError(message: string, context?: ErrorContext): ConfigError {
  return new ConfigError(message, context)
}

/**
 * Create an error for missing plugin
 */
export function createPluginNotFoundError(
  pluginName: string,
  context?: ErrorContext
): PluginNotFoundError {
  return new PluginNotFoundError(pluginName, context)
}

/**
 * Create an error for unsatisfied plugin dependency
 */
export function createPluginDependencyError(
  pluginName: string,
  missingDependency: string,
  context?: ErrorContext
): PluginDependencyError {
  return new PluginDependencyError(pluginName, missingDependency, context)
}

/**
 * Create an error for invalid rule
 */
export function createInvalidRuleError(
  ruleName: string,
  reason: string,
  context?: ErrorContext
): InvalidRuleError {
  return new InvalidRuleError(ruleName, reason, context)
}

/**
 * Create an error for invalid variant
 */
export function createInvalidVariantError(
  variantName: string,
  reason: string,
  context?: ErrorContext
): InvalidVariantError {
  return new InvalidVariantError(variantName, reason, context)
}

/**
 * Create a theme error
 */
export function createThemeError(message: string, context?: ErrorContext): ThemeError {
  return new ThemeError(message, context)
}

/**
 * Create a parse error
 */
export function createParseError(input: string, reason: string, context?: ErrorContext): ParseError {
  return new ParseError(input, reason, context)
}

/**
 * Create a component error
 */
export function createComponentError(
  componentName: string,
  message: string,
  context?: ErrorContext
): ComponentError {
  return new ComponentError(componentName, message, context)
}

/**
 * Create a runtime error
 */
export function createRuntimeError(message: string, context?: ErrorContext): RuntimeError {
  return new RuntimeError(message, context)
}

/**
 * Create a build error
 */
export function createBuildError(message: string, context?: ErrorContext): BuildError {
  return new BuildError(message, context)
}

/**
 * Create a generation error
 */
export function createGenerationError(message: string, context?: ErrorContext): GenerationError {
  return new GenerationError(message, context)
}

/**
 * Generic error factory
 */
export function createError(code: ErrorCode, message: string, context?: ErrorContext): CoralError {
  return new CoralError(message, code, context)
}

// =============================================================================
// Type Guards
// =============================================================================

/**
 * Check if an error is a CoralError
 */
export function isCoralError(error: unknown): error is CoralError {
  return error instanceof CoralError
}

/**
 * Check if an error has a specific error code
 */
export function hasErrorCode(error: unknown, code: ErrorCode): boolean {
  return isCoralError(error) && error.code === code
}
