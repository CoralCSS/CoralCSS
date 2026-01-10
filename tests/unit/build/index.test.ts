import { describe, it, expect } from 'vitest'
import buildTools, {
  // Vite
  coralVitePlugin,

  // PostCSS
  coralPostCSSPlugin,

  // Webpack
  CoralWebpackPlugin,
  coralWebpackPlugin,
  coralLoader,

  // Rollup
  coralRollupPlugin,
  createCSSInjector,

  // esbuild
  coralEsbuildPlugin,
  createCSSLoader,

  // Next.js
  withCoral,
  withCoralApp,
  withCoralPages,
  withCoralTurbopack,
  createCoralHandler,
  generateCoralStyles,

  // Astro
  coralAstroIntegration,
  generateStyleTag,
  viewTransitionStyles,

  // Parcel
  coralParcelPlugin,
  createCoralTransformer,
  createCoralResolver,
  createCoralNamer,
  CoralParcelTransformer,
  createDevInjector,

  // Nuxt
  coralNuxtModule,
  defineCoralModule,
  createNuxtPlugin,
  useCoralComposables,
  nuxtPluginContent,
  nuxtAppConfigTypes,

  // SvelteKit
  coralSvelteKit,
  coralPreprocessor,
  createCoralHandle,
  darkModeStore,
  classAction,
  svelteKitTypes,

  // Remix
  coralRemix,
  createDarkModeUtils,
  getClientHintsHeaders,
  coralLinks,
  remixUseDarkModeHook,
  remixDarkModeAction,

  // Qwik
  coralQwik,
  createQwikDarkModeUtils,
  getInitialDarkModeClass,
  darkModeContext,
  darkModeProvider,
  qwikUseDarkModeHook,
  qwikDarkModeAction,
  qwikClassUtils,

  // CLI
  cli,
  run,
  parseArgs,
} from '../../../src/build'

describe('Build Index', () => {
  describe('exports', () => {
    it('should export Vite plugin', () => {
      expect(typeof coralVitePlugin).toBe('function')
    })

    it('should export PostCSS plugin', () => {
      expect(typeof coralPostCSSPlugin).toBe('function')
    })

    it('should export Webpack plugin and loader', () => {
      expect(CoralWebpackPlugin).toBeDefined()
      expect(typeof coralWebpackPlugin).toBe('function')
      expect(typeof coralLoader).toBe('function')
    })

    it('should export Rollup plugin', () => {
      expect(typeof coralRollupPlugin).toBe('function')
      expect(typeof createCSSInjector).toBe('function')
    })

    it('should export esbuild plugin', () => {
      expect(typeof coralEsbuildPlugin).toBe('function')
      expect(typeof createCSSLoader).toBe('function')
    })

    it('should export Next.js utilities', () => {
      expect(typeof withCoral).toBe('function')
      expect(typeof withCoralApp).toBe('function')
      expect(typeof withCoralPages).toBe('function')
      expect(typeof withCoralTurbopack).toBe('function')
      expect(typeof createCoralHandler).toBe('function')
      expect(typeof generateCoralStyles).toBe('function')
    })

    it('should export Astro integration', () => {
      expect(typeof coralAstroIntegration).toBe('function')
      expect(typeof generateStyleTag).toBe('function')
      expect(typeof viewTransitionStyles).toBe('string')
    })

    it('should export Parcel plugin', () => {
      expect(typeof coralParcelPlugin).toBe('function')
      expect(typeof createCoralTransformer).toBe('function')
      expect(typeof createCoralResolver).toBe('function')
      expect(typeof createCoralNamer).toBe('function')
      expect(CoralParcelTransformer).toBeDefined()
      expect(typeof createDevInjector).toBe('function')
    })

    it('should export Nuxt module', () => {
      expect(typeof coralNuxtModule).toBe('object')
      expect(typeof defineCoralModule).toBe('function')
      expect(typeof createNuxtPlugin).toBe('function')
      expect(typeof useCoralComposables).toBe('object')
      expect(typeof nuxtPluginContent).toBe('string')
      expect(typeof nuxtAppConfigTypes).toBe('string')
    })

    it('should export SvelteKit plugin', () => {
      expect(typeof coralSvelteKit).toBe('function')
      expect(typeof coralPreprocessor).toBe('function')
      expect(typeof createCoralHandle).toBe('function')
      expect(typeof darkModeStore).toBe('string')
      expect(typeof classAction).toBe('string')
      expect(typeof svelteKitTypes).toBe('string')
    })

    it('should export Remix utilities', () => {
      expect(typeof coralRemix).toBe('function')
      expect(typeof createDarkModeUtils).toBe('function')
      expect(typeof getClientHintsHeaders).toBe('function')
      expect(typeof coralLinks).toBe('function')
      expect(typeof remixUseDarkModeHook).toBe('string')
      expect(typeof remixDarkModeAction).toBe('string')
    })

    it('should export Qwik utilities', () => {
      expect(typeof coralQwik).toBe('function')
      expect(typeof createQwikDarkModeUtils).toBe('function')
      expect(typeof getInitialDarkModeClass).toBe('function')
      expect(typeof darkModeContext).toBe('string')
      expect(typeof darkModeProvider).toBe('string')
      expect(typeof qwikUseDarkModeHook).toBe('string')
      expect(typeof qwikDarkModeAction).toBe('string')
      expect(typeof qwikClassUtils).toBe('string')
    })

    it('should export CLI utilities', () => {
      expect(typeof cli).toBe('function')
      expect(typeof run).toBe('function')
      expect(typeof parseArgs).toBe('function')
    })
  })

  describe('default export', () => {
    it('should have vite property', () => {
      expect(buildTools.vite).toBe(coralVitePlugin)
    })

    it('should have postcss property', () => {
      expect(buildTools.postcss).toBe(coralPostCSSPlugin)
    })

    it('should have webpack property', () => {
      expect(buildTools.webpack).toBe(coralWebpackPlugin)
    })

    it('should have WebpackPlugin property', () => {
      expect(buildTools.WebpackPlugin).toBe(CoralWebpackPlugin)
    })

    it('should have rollup property', () => {
      expect(buildTools.rollup).toBe(coralRollupPlugin)
    })

    it('should have esbuild property', () => {
      expect(buildTools.esbuild).toBe(coralEsbuildPlugin)
    })

    it('should have next property', () => {
      expect(buildTools.next).toBe(withCoral)
    })

    it('should have astro property', () => {
      expect(buildTools.astro).toBe(coralAstroIntegration)
    })

    it('should have parcel property', () => {
      expect(buildTools.parcel).toBe(coralParcelPlugin)
    })

    it('should have nuxt property', () => {
      expect(buildTools.nuxt).toBe(coralNuxtModule)
    })

    it('should have sveltekit property', () => {
      expect(buildTools.sveltekit).toBe(coralSvelteKit)
    })

    it('should have remix property', () => {
      expect(buildTools.remix).toBe(coralRemix)
    })

    it('should have qwik property', () => {
      expect(buildTools.qwik).toBe(coralQwik)
    })
  })
})
