/**
 * CoralCSS Vue Plugin
 *
 * Vue 3 plugin for CoralCSS integration.
 * @module vue/plugin
 */

import type { App, InjectionKey, Plugin } from 'vue'
import { Coral, createCoral } from '../index'
import type { CoralOptions } from '../types'

/**
 * Coral plugin options
 */
export interface CoralPluginOptions extends CoralOptions {
  /** Auto-inject generated CSS into document */
  autoInject?: boolean
}

/**
 * Coral injection key for provide/inject
 */
export const CoralKey: InjectionKey<Coral> = Symbol('coral')

/**
 * CSS injection key for provide/inject
 */
export const CoralCSSKey: InjectionKey<Set<string>> = Symbol('coral-css')

/**
 * Create a Coral Vue plugin
 *
 * @example
 * ```ts
 * import { createApp } from 'vue'
 * import { createCoralPlugin } from '@coral-css/core/vue'
 *
 * const app = createApp(App)
 * app.use(createCoralPlugin({
 *   darkMode: 'class',
 *   autoInject: true,
 * }))
 * ```
 */
export function createCoralPlugin(options: CoralPluginOptions = {}): Plugin {
  const { autoInject = true, ...coralOptions } = options

  return {
    install(app: App) {
      // Create Coral instance
      const coral = createCoral(coralOptions)
      const injectedCSS = new Set<string>()

      // Provide instance
      app.provide(CoralKey, coral)
      app.provide(CoralCSSKey, injectedCSS)

      // Setup style injection
      if (autoInject && typeof document !== 'undefined') {
        const style = document.createElement('style')
        style.id = 'coral-css-vue'
        style.setAttribute('data-coral', 'vue')
        document.head.appendChild(style)

        // Create injection function
        const injectCSS = (classNames: string | string[]) => {
          const classes = Array.isArray(classNames) ? classNames : classNames.split(/\s+/)
          const css = coral.generate(classes)

          if (css && !injectedCSS.has(css)) {
            injectedCSS.add(css)
            style.textContent = Array.from(injectedCSS).join('\n')
          }

          return classes.join(' ')
        }

        // Add global property
        app.config.globalProperties.$coral = coral
        app.config.globalProperties.$coralCSS = injectCSS
      }

      // Add global directive
      app.directive('coral', {
        mounted(el, binding) {
          if (binding.value) {
            const classes = Array.isArray(binding.value) ? binding.value : [binding.value]
            const css = coral.generate(classes)

            if (css && !injectedCSS.has(css)) {
              injectedCSS.add(css)
              const style = document.getElementById('coral-css-vue')
              if (style) {
                style.textContent = Array.from(injectedCSS).join('\n')
              }
            }

            el.classList.add(...classes.join(' ').split(/\s+/))
          }
        },
        updated(el, binding) {
          if (binding.oldValue !== binding.value) {
            // Remove old classes
            if (binding.oldValue) {
              const oldClasses = Array.isArray(binding.oldValue) ? binding.oldValue : [binding.oldValue]
              el.classList.remove(...oldClasses.join(' ').split(/\s+/))
            }

            // Add new classes
            if (binding.value) {
              const classes = Array.isArray(binding.value) ? binding.value : [binding.value]
              const css = coral.generate(classes)

              if (css && !injectedCSS.has(css)) {
                injectedCSS.add(css)
                const style = document.getElementById('coral-css-vue')
                if (style) {
                  style.textContent = Array.from(injectedCSS).join('\n')
                }
              }

              el.classList.add(...classes.join(' ').split(/\s+/))
            }
          }
        },
      })
    },
  }
}

/**
 * Default Coral Vue plugin
 */
export const CoralPlugin = createCoralPlugin()

export default CoralPlugin
