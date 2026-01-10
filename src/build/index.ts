/**
 * CoralCSS Build Tools
 *
 * Build-time integrations for CoralCSS.
 * @module build
 */

// Vite
export { coralVitePlugin } from './vite'
export type { VitePluginOptions } from './vite'

// PostCSS
export { coralPostCSSPlugin } from './postcss'
export type { PostCSSPluginOptions } from './postcss'

// Webpack
export { CoralWebpackPlugin, coralWebpackPlugin, coralLoader } from './webpack'
export type { WebpackPluginOptions, CoralLoaderOptions } from './webpack'

// Rollup
export { coralRollupPlugin, createCSSInjector } from './rollup'
export type { RollupPluginOptions } from './rollup'

// esbuild
export { coralEsbuildPlugin, createCSSLoader } from './esbuild'
export type { EsbuildPluginOptions } from './esbuild'

// Next.js
export {
  withCoral,
  withCoralApp,
  withCoralPages,
  withCoralTurbopack,
  createCoralHandler,
  generateCoralStyles,
} from './nextjs'
export type { NextJSPluginOptions, CoralStylesProps } from './nextjs'

// Astro
export {
  coralAstroIntegration,
  generateStyleTag,
  viewTransitionStyles,
} from './astro'
export type { AstroIntegrationOptions } from './astro'

// Parcel
export {
  coralParcelPlugin,
  createCoralTransformer,
  createCoralResolver,
  createCoralNamer,
  CoralParcelTransformer,
  createDevInjector,
} from './parcel'
export type {
  ParcelPluginOptions,
  ParcelTransformer,
  ParcelResolver,
  ParcelNamer,
} from './parcel'

// Nuxt
export {
  coralNuxtModule,
  defineCoralModule,
  createNuxtPlugin,
  useCoralComposables,
  nuxtPluginContent,
  nuxtAppConfigTypes,
} from './nuxt'
export type {
  NuxtModuleOptions,
  NuxtModule,
  NuxtContext,
  NuxtPlugin,
} from './nuxt'

// SvelteKit
export {
  coralSvelteKit,
  coralPreprocessor,
  createCoralHandle,
  darkModeStore,
  classAction,
  svelteKitTypes,
} from './sveltekit'
export type {
  SvelteKitPluginOptions,
  SveltePreprocessor,
  SvelteKitHandle,
} from './sveltekit'

// Remix
export {
  coralRemix,
  createDarkModeUtils,
  getClientHintsHeaders,
  coralLinks,
  useDarkModeHook as remixUseDarkModeHook,
  darkModeAction as remixDarkModeAction,
} from './remix'
export type {
  RemixPluginOptions,
  DarkModeUtils,
  CoralRemixContext,
  WithDarkMode,
} from './remix'

// Qwik
export {
  coralQwik,
  createQwikDarkModeUtils,
  getInitialDarkModeClass,
  darkModeContext,
  darkModeProvider,
  useDarkModeHook as qwikUseDarkModeHook,
  darkModeAction as qwikDarkModeAction,
  qwikClassUtils,
} from './qwik'
export type {
  QwikPluginOptions,
  QwikDarkModeUtils,
  CoralQwikContext,
} from './qwik'

// CLI
export { cli, run, parseArgs } from './cli'
export type { CLIOptions, CLIResult } from './cli'

// Default exports for convenience
import { coralVitePlugin } from './vite'
import { coralPostCSSPlugin } from './postcss'
import { CoralWebpackPlugin, coralWebpackPlugin } from './webpack'
import { coralRollupPlugin } from './rollup'
import { coralEsbuildPlugin } from './esbuild'
import { withCoral } from './nextjs'
import { coralAstroIntegration } from './astro'
import { coralParcelPlugin } from './parcel'
import { coralNuxtModule } from './nuxt'
import { coralSvelteKit } from './sveltekit'
import { coralRemix } from './remix'
import { coralQwik } from './qwik'

export default {
  vite: coralVitePlugin,
  postcss: coralPostCSSPlugin,
  webpack: coralWebpackPlugin,
  WebpackPlugin: CoralWebpackPlugin,
  rollup: coralRollupPlugin,
  esbuild: coralEsbuildPlugin,
  next: withCoral,
  astro: coralAstroIntegration,
  parcel: coralParcelPlugin,
  nuxt: coralNuxtModule,
  sveltekit: coralSvelteKit,
  remix: coralRemix,
  qwik: coralQwik,
}
