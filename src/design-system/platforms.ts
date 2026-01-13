/**
 * Platform Configurations
 *
 * Output configurations for different platforms.
 *
 * @module design-system/platforms
 */

import type { PlatformConfig, PlatformTarget } from './types'

/**
 * Platform configurations for token generation
 */
export const platformConfigs: Record<PlatformTarget, PlatformConfig> = {
  /**
   * Web CSS Variables
   */
  'web': {
    transformGroup: 'web',
    buildPath: 'web/',
    files: [
      {
        destination: 'tokens.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
        },
      },
    ],
  },

  /**
   * Web CSS Variables (separate file)
   */
  'web-css-vars': {
    transformGroup: 'web',
    buildPath: 'web/',
    files: [
      {
        destination: 'variables.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
        },
      },
    ],
  },

  /**
   * Web SCSS Variables
   */
  'web-scss': {
    transformGroup: 'scss',
    buildPath: 'scss/',
    files: [
      {
        destination: '_tokens.scss',
        format: 'scss/variables',
      },
      {
        destination: '_maps.scss',
        format: 'scss/map-deep',
      },
    ],
  },

  /**
   * Web JavaScript (ES6)
   */
  'web-js': {
    transformGroup: 'js',
    buildPath: 'js/',
    files: [
      {
        destination: 'tokens.js',
        format: 'javascript/es6',
      },
      {
        destination: 'tokens.mjs',
        format: 'javascript/es6',
      },
    ],
  },

  /**
   * Web TypeScript
   */
  'web-ts': {
    transformGroup: 'ts',
    buildPath: 'ts/',
    files: [
      {
        destination: 'tokens.ts',
        format: 'javascript/es6',
        options: {
          typescript: true,
        },
      },
      {
        destination: 'tokens.d.ts',
        format: 'typescript/es6-declarations',
      },
    ],
  },

  /**
   * iOS (Swift/UIKit)
   */
  'ios': {
    transformGroup: 'ios',
    buildPath: 'ios/',
    files: [
      {
        destination: 'CoralTokens.swift',
        format: 'ios/swift',
        options: {
          className: 'CoralTokens',
        },
      },
    ],
  },

  /**
   * iOS (SwiftUI)
   */
  'ios-swift': {
    transformGroup: 'ios-swiftui',
    buildPath: 'ios-swiftui/',
    files: [
      {
        destination: 'CoralTokens+SwiftUI.swift',
        format: 'ios/swift',
        options: {
          className: 'CoralDesignTokens',
          swiftUI: true,
        },
      },
    ],
  },

  /**
   * Android (XML Resources)
   */
  'android': {
    transformGroup: 'android',
    buildPath: 'android/',
    files: [
      {
        destination: 'values/colors.xml',
        format: 'android/colors',
        filter: 'isColor',
      },
      {
        destination: 'values/dimens.xml',
        format: 'android/dimens',
        filter: 'isDimension',
      },
      {
        destination: 'values/font_dimens.xml',
        format: 'android/fontDimens',
        filter: 'isTypography',
      },
    ],
  },

  /**
   * Android (Jetpack Compose)
   */
  'android-compose': {
    transformGroup: 'compose',
    buildPath: 'compose/',
    files: [
      {
        destination: 'CoralTokens.kt',
        format: 'android/compose',
        options: {
          packageName: 'com.coralcss.tokens',
          className: 'CoralTokens',
        },
      },
      {
        destination: 'CoralColors.kt',
        format: 'android/compose',
        filter: 'isColor',
        options: {
          packageName: 'com.coralcss.tokens',
          className: 'CoralColors',
        },
      },
      {
        destination: 'CoralTypography.kt',
        format: 'android/compose',
        filter: 'isTypography',
        options: {
          packageName: 'com.coralcss.tokens',
          className: 'CoralTypography',
        },
      },
    ],
  },

  /**
   * React Native
   */
  'react-native': {
    transformGroup: 'react-native',
    buildPath: 'react-native/',
    files: [
      {
        destination: 'tokens.js',
        format: 'javascript/es6',
      },
      {
        destination: 'tokens.ts',
        format: 'javascript/es6',
        options: {
          typescript: true,
        },
      },
      {
        destination: 'StyleSheet.js',
        format: 'react-native/stylesheet',
      },
    ],
  },

  /**
   * Flutter (Dart)
   */
  'flutter': {
    transformGroup: 'flutter',
    buildPath: 'flutter/',
    files: [
      {
        destination: 'coral_tokens.dart',
        format: 'flutter/dart',
        options: {
          className: 'CoralTokens',
        },
      },
    ],
  },

  /**
   * Figma Tokens (for Tokens Studio plugin)
   */
  'figma': {
    transformGroup: 'figma',
    buildPath: 'figma/',
    files: [
      {
        destination: 'tokens.json',
        format: 'json/nested',
      },
    ],
  },
}

/**
 * Get all available platform targets
 */
export function getAvailablePlatforms(): PlatformTarget[] {
  return Object.keys(platformConfigs) as PlatformTarget[]
}

/**
 * Get platform configuration by name
 */
export function getPlatformConfig(platform: PlatformTarget): PlatformConfig | undefined {
  return platformConfigs[platform]
}

/**
 * Create custom platform configuration
 */
export function createPlatformConfig(
  base: PlatformTarget,
  overrides: Partial<PlatformConfig>
): PlatformConfig {
  const baseConfig = platformConfigs[base]
  if (!baseConfig) {
    throw new Error(`Unknown base platform: ${base}`)
  }

  return {
    ...baseConfig,
    ...overrides,
    files: overrides.files || baseConfig.files,
  }
}

/**
 * Token filters for platform-specific output
 */
export const filters = {
  /**
   * Filter for color tokens
   */
  isColor: (token: { original: { $type?: string } }) =>
    token.original.$type === 'color',

  /**
   * Filter for dimension tokens (spacing, sizing, etc.)
   */
  isDimension: (token: { original: { $type?: string } }) => {
    const type = token.original.$type
    return type === 'dimension' || type === 'spacing' || type === 'sizing' || type === 'borderRadius'
  },

  /**
   * Filter for typography tokens
   */
  isTypography: (token: { original: { $type?: string }; path: string[] }) => {
    const type = token.original.$type
    return (
      type === 'fontFamily' ||
      type === 'fontWeight' ||
      type === 'fontStyle' ||
      token.path[0] === 'typography'
    )
  },

  /**
   * Filter for shadow tokens
   */
  isShadow: (token: { original: { $type?: string } }) =>
    token.original.$type === 'shadow',

  /**
   * Filter for motion tokens (duration, easing)
   */
  isMotion: (token: { original: { $type?: string } }) => {
    const type = token.original.$type
    return type === 'duration' || type === 'cubicBezier'
  },

  /**
   * Filter for semantic tokens (references other tokens)
   */
  isSemantic: (token: { value: unknown }) => {
    const value = String(token.value)
    return value.includes('{') || value.includes('var(')
  },

  /**
   * Filter for primitive tokens (no references)
   */
  isPrimitive: (token: { value: unknown }) => {
    const value = String(token.value)
    return !value.includes('{') && !value.includes('var(')
  },
}

/**
 * Recommended platform combinations
 */
export const platformPresets = {
  /**
   * Web-only development
   */
  web: ['web', 'web-scss', 'web-js', 'web-ts'] as PlatformTarget[],

  /**
   * Mobile development (iOS + Android)
   */
  mobile: ['ios', 'ios-swift', 'android', 'android-compose'] as PlatformTarget[],

  /**
   * Cross-platform development
   */
  crossPlatform: [
    'web',
    'web-ts',
    'ios-swift',
    'android-compose',
    'react-native',
  ] as PlatformTarget[],

  /**
   * Design tooling
   */
  design: ['figma', 'web'] as PlatformTarget[],

  /**
   * Full output (all platforms)
   */
  all: getAvailablePlatforms(),
}
