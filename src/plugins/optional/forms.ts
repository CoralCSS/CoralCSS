/**
 * Forms Plugin
 *
 * Comprehensive form styling utilities for CoralCSS.
 * Provides opinionated form resets and utility classes for form elements.
 * @module plugins/optional/forms
 */

import type { Plugin, Rule, PluginContext } from '../../types'

/**
 * Forms plugin configuration
 */
export interface FormsPluginConfig {
  /** Enable form reset styles */
  reset?: boolean
  /** Enable custom checkbox/radio styles */
  customControls?: boolean
  /** Enable floating labels */
  floatingLabels?: boolean
  /** Enable validation styles */
  validation?: boolean
}

const defaultConfig: FormsPluginConfig = {
  reset: true,
  customControls: true,
  floatingLabels: true,
  validation: true,
}

/**
 * Forms plugin - comprehensive form styling utilities
 */
export function formsPlugin(config: FormsPluginConfig = {}): Plugin {
  const cfg = { ...defaultConfig, ...config }

  return {
    name: 'forms',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // Form Reset Base Styles
      // ========================================
      if (cfg.reset) {
        // Form reset class - applies sensible defaults
        rules.push({
          pattern: 'form-reset',
          properties: {
            'font-family': 'inherit',
            'font-size': '100%',
            'font-weight': 'inherit',
            'line-height': 'inherit',
            'color': 'inherit',
            margin: '0',
          },
        })
      }

      // ========================================
      // Input Base Styles
      // ========================================

      // Input base utility
      rules.push({
        pattern: 'form-input',
        properties: {
          display: 'block',
          width: '100%',
          padding: '0.5rem 0.75rem',
          'font-size': '0.875rem',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          'background-color': 'hsl(var(--background))',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'hsl(var(--input))',
          'border-radius': 'var(--radius)',
          'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
        },
      })

      // Input focus state (apply with focus: variant)
      rules.push({
        pattern: 'form-input-focus',
        properties: {
          outline: 'none',
          'border-color': 'hsl(var(--ring))',
          'box-shadow': '0 0 0 2px hsl(var(--ring) / 0.2)',
        },
      })

      // Input sizes
      rules.push({
        pattern: 'form-input-xs',
        properties: {
          padding: '0.25rem 0.5rem',
          'font-size': '0.75rem',
          'line-height': '1rem',
          'border-radius': 'calc(var(--radius) - 2px)',
        },
      })
      rules.push({
        pattern: 'form-input-sm',
        properties: {
          padding: '0.375rem 0.625rem',
          'font-size': '0.8125rem',
          'line-height': '1.25rem',
          'border-radius': 'calc(var(--radius) - 1px)',
        },
      })
      rules.push({
        pattern: 'form-input-lg',
        properties: {
          padding: '0.625rem 1rem',
          'font-size': '1rem',
          'line-height': '1.75rem',
          'border-radius': 'calc(var(--radius) + 2px)',
        },
      })
      rules.push({
        pattern: 'form-input-xl',
        properties: {
          padding: '0.75rem 1.25rem',
          'font-size': '1.125rem',
          'line-height': '2rem',
          'border-radius': 'calc(var(--radius) + 4px)',
        },
      })

      // ========================================
      // Textarea Styles
      // ========================================

      rules.push({
        pattern: 'form-textarea',
        properties: {
          display: 'block',
          width: '100%',
          padding: '0.5rem 0.75rem',
          'font-size': '0.875rem',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          'background-color': 'hsl(var(--background))',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'hsl(var(--input))',
          'border-radius': 'var(--radius)',
          'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          'min-height': '80px',
          resize: 'vertical',
          transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
        },
      })

      // Textarea resize options
      rules.push({
        pattern: 'resize-none',
        properties: { resize: 'none' },
      })
      rules.push({
        pattern: 'resize-y',
        properties: { resize: 'vertical' },
      })
      rules.push({
        pattern: 'resize-x',
        properties: { resize: 'horizontal' },
      })
      rules.push({
        pattern: 'resize',
        properties: { resize: 'both' },
      })

      // ========================================
      // Select Styles
      // ========================================

      rules.push({
        pattern: 'form-select',
        properties: {
          display: 'block',
          width: '100%',
          padding: '0.5rem 2.5rem 0.5rem 0.75rem',
          'font-size': '0.875rem',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          'background-color': 'hsl(var(--background))',
          'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
          'background-position': 'right 0.5rem center',
          'background-repeat': 'no-repeat',
          'background-size': '1.5em 1.5em',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'hsl(var(--input))',
          'border-radius': 'var(--radius)',
          'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          appearance: 'none',
          cursor: 'pointer',
          transition: 'border-color 150ms ease-in-out, box-shadow 150ms ease-in-out',
        },
      })

      // Multiple select
      rules.push({
        pattern: 'form-select-multiple',
        properties: {
          'background-image': 'none',
          padding: '0.5rem 0.75rem',
        },
      })

      // ========================================
      // Checkbox & Radio Styles
      // ========================================

      if (cfg.customControls) {
        // Base checkbox
        rules.push({
          pattern: 'form-checkbox',
          properties: {
            appearance: 'none',
            padding: '0',
            'print-color-adjust': 'exact',
            display: 'inline-block',
            'vertical-align': 'middle',
            'background-origin': 'border-box',
            'user-select': 'none',
            'flex-shrink': '0',
            width: '1rem',
            height: '1rem',
            color: 'hsl(var(--primary))',
            'background-color': 'hsl(var(--background))',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'hsl(var(--input))',
            'border-radius': 'calc(var(--radius) - 4px)',
            cursor: 'pointer',
            transition: 'background-color 150ms ease-in-out, border-color 150ms ease-in-out',
          },
        })

        // Checkbox checked state (apply with checked: variant or data-checked)
        rules.push({
          pattern: 'form-checkbox-checked',
          properties: {
            'background-color': 'currentColor',
            'background-size': '100% 100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'border-color': 'transparent',
            'background-image': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e")`,
          },
        })

        // Base radio
        rules.push({
          pattern: 'form-radio',
          properties: {
            appearance: 'none',
            padding: '0',
            'print-color-adjust': 'exact',
            display: 'inline-block',
            'vertical-align': 'middle',
            'background-origin': 'border-box',
            'user-select': 'none',
            'flex-shrink': '0',
            width: '1rem',
            height: '1rem',
            color: 'hsl(var(--primary))',
            'background-color': 'hsl(var(--background))',
            'border-width': '1px',
            'border-style': 'solid',
            'border-color': 'hsl(var(--input))',
            'border-radius': '100%',
            cursor: 'pointer',
            transition: 'background-color 150ms ease-in-out, border-color 150ms ease-in-out',
          },
        })

        // Radio checked state
        rules.push({
          pattern: 'form-radio-checked',
          properties: {
            'background-color': 'currentColor',
            'background-size': '100% 100%',
            'background-position': 'center',
            'background-repeat': 'no-repeat',
            'border-color': 'transparent',
            'background-image': `url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e")`,
          },
        })

        // Checkbox/radio sizes
        rules.push({
          pattern: 'form-control-sm',
          properties: {
            width: '0.875rem',
            height: '0.875rem',
          },
        })
        rules.push({
          pattern: 'form-control-lg',
          properties: {
            width: '1.25rem',
            height: '1.25rem',
          },
        })

        // Switch toggle
        rules.push({
          pattern: 'form-switch',
          properties: {
            appearance: 'none',
            padding: '0',
            'print-color-adjust': 'exact',
            display: 'inline-block',
            'vertical-align': 'middle',
            'background-origin': 'border-box',
            'user-select': 'none',
            'flex-shrink': '0',
            width: '2.25rem',
            height: '1.25rem',
            color: 'hsl(var(--primary))',
            'background-color': 'hsl(var(--muted))',
            'background-position': 'left center',
            'background-repeat': 'no-repeat',
            'background-size': 'contain',
            'border-radius': '9999px',
            cursor: 'pointer',
            transition: 'background-color 150ms ease-in-out, background-position 150ms ease-in-out',
            'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='-4 -4 8 8'%3e%3ccircle r='3' fill='white'/%3e%3c/svg%3e")`,
          },
        })

        rules.push({
          pattern: 'form-switch-checked',
          properties: {
            'background-color': 'currentColor',
            'background-position': 'right center',
          },
        })
      }

      // ========================================
      // Label Styles
      // ========================================

      rules.push({
        pattern: 'form-label',
        properties: {
          display: 'block',
          'font-size': '0.875rem',
          'font-weight': '500',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          'margin-bottom': '0.375rem',
        },
      })

      rules.push({
        pattern: 'form-label-inline',
        properties: {
          display: 'inline-flex',
          'align-items': 'center',
          gap: '0.5rem',
          'font-size': '0.875rem',
          'font-weight': '400',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          cursor: 'pointer',
        },
      })

      // ========================================
      // Floating Labels
      // ========================================

      if (cfg.floatingLabels) {
        rules.push({
          pattern: 'form-floating',
          properties: {
            position: 'relative',
          },
        })

        rules.push({
          pattern: 'form-floating-label',
          properties: {
            position: 'absolute',
            top: '0',
            left: '0',
            padding: '0.5rem 0.75rem',
            'font-size': '0.875rem',
            'line-height': '1.5rem',
            color: 'hsl(var(--muted-foreground))',
            'pointer-events': 'none',
            'transform-origin': '0 0',
            transition: 'transform 150ms ease-in-out, color 150ms ease-in-out',
          },
        })

        // Floating label active state (apply when input has value or focus)
        rules.push({
          pattern: 'form-floating-active',
          properties: {
            transform: 'scale(0.85) translateY(-0.5rem)',
            color: 'hsl(var(--foreground))',
          },
        })
      }

      // ========================================
      // Helper Text
      // ========================================

      rules.push({
        pattern: 'form-hint',
        properties: {
          'font-size': '0.75rem',
          'line-height': '1rem',
          color: 'hsl(var(--muted-foreground))',
          'margin-top': '0.375rem',
        },
      })

      // ========================================
      // Validation States
      // ========================================

      if (cfg.validation) {
        // Error state
        rules.push({
          pattern: 'form-error',
          properties: {
            'border-color': 'hsl(var(--destructive))',
          },
        })

        rules.push({
          pattern: 'form-error-focus',
          properties: {
            outline: 'none',
            'border-color': 'hsl(var(--destructive))',
            'box-shadow': '0 0 0 2px hsl(var(--destructive) / 0.2)',
          },
        })

        rules.push({
          pattern: 'form-error-message',
          properties: {
            'font-size': '0.75rem',
            'line-height': '1rem',
            color: 'hsl(var(--destructive))',
            'margin-top': '0.375rem',
          },
        })

        // Success state
        rules.push({
          pattern: 'form-success',
          properties: {
            'border-color': 'hsl(142.1 76.2% 36.3%)',
          },
        })

        rules.push({
          pattern: 'form-success-focus',
          properties: {
            outline: 'none',
            'border-color': 'hsl(142.1 76.2% 36.3%)',
            'box-shadow': '0 0 0 2px hsl(142.1 76.2% 36.3% / 0.2)',
          },
        })

        rules.push({
          pattern: 'form-success-message',
          properties: {
            'font-size': '0.75rem',
            'line-height': '1rem',
            color: 'hsl(142.1 76.2% 36.3%)',
            'margin-top': '0.375rem',
          },
        })

        // Warning state
        rules.push({
          pattern: 'form-warning',
          properties: {
            'border-color': 'hsl(37.7 92.1% 50.2%)',
          },
        })

        rules.push({
          pattern: 'form-warning-message',
          properties: {
            'font-size': '0.75rem',
            'line-height': '1rem',
            color: 'hsl(37.7 92.1% 50.2%)',
            'margin-top': '0.375rem',
          },
        })
      }

      // ========================================
      // Disabled & Readonly States
      // ========================================

      rules.push({
        pattern: 'form-disabled',
        properties: {
          opacity: '0.5',
          cursor: 'not-allowed',
          'background-color': 'hsl(var(--muted))',
        },
      })

      rules.push({
        pattern: 'form-readonly',
        properties: {
          'background-color': 'hsl(var(--muted))',
          cursor: 'default',
        },
      })

      // ========================================
      // Placeholder Styles
      // ========================================

      rules.push({
        pattern: 'placeholder-muted',
        properties: {
          color: 'hsl(var(--muted-foreground))',
          opacity: '1',
        },
      })

      rules.push({
        pattern: 'placeholder-transparent',
        properties: {
          color: 'transparent',
        },
      })

      // Arbitrary placeholder color
      rules.push({
        pattern: /^placeholder-\[(.+)\]$/,
        handler: (match) => {
          const color = match[1]
          if (!color) return null
          return { properties: { color, opacity: '1' } }
        },
      })

      // ========================================
      // Form Layout Utilities
      // ========================================

      rules.push({
        pattern: 'form-group',
        properties: {
          'margin-bottom': '1rem',
        },
      })

      rules.push({
        pattern: 'form-inline',
        properties: {
          display: 'flex',
          'flex-wrap': 'wrap',
          'align-items': 'center',
          gap: '1rem',
        },
      })

      rules.push({
        pattern: 'form-stack',
        properties: {
          display: 'flex',
          'flex-direction': 'column',
          gap: '1rem',
        },
      })

      rules.push({
        pattern: 'form-row',
        properties: {
          display: 'flex',
          'flex-wrap': 'wrap',
          gap: '1rem',
        },
      })

      // ========================================
      // Input Group
      // ========================================

      rules.push({
        pattern: 'input-group',
        properties: {
          display: 'flex',
          'align-items': 'stretch',
        },
      })

      rules.push({
        pattern: 'input-group-text',
        properties: {
          display: 'flex',
          'align-items': 'center',
          padding: '0.5rem 0.75rem',
          'font-size': '0.875rem',
          'font-weight': '400',
          'line-height': '1.5rem',
          color: 'hsl(var(--muted-foreground))',
          'background-color': 'hsl(var(--muted))',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'hsl(var(--input))',
          'white-space': 'nowrap',
        },
      })

      rules.push({
        pattern: 'input-group-prepend',
        properties: {
          'border-top-left-radius': 'var(--radius)',
          'border-bottom-left-radius': 'var(--radius)',
          'border-right': 'none',
        },
      })

      rules.push({
        pattern: 'input-group-append',
        properties: {
          'border-top-right-radius': 'var(--radius)',
          'border-bottom-right-radius': 'var(--radius)',
          'border-left': 'none',
        },
      })

      // ========================================
      // File Input
      // ========================================

      rules.push({
        pattern: 'form-file',
        properties: {
          display: 'block',
          width: '100%',
          'font-size': '0.875rem',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
        },
      })

      rules.push({
        pattern: 'form-file-button',
        properties: {
          padding: '0.5rem 0.75rem',
          'margin-right': '0.75rem',
          'font-size': '0.875rem',
          'font-weight': '500',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
          'background-color': 'hsl(var(--muted))',
          border: 'none',
          'border-radius': 'var(--radius)',
          cursor: 'pointer',
          transition: 'background-color 150ms ease-in-out',
        },
      })

      // ========================================
      // Range Input
      // ========================================

      rules.push({
        pattern: 'form-range',
        properties: {
          width: '100%',
          height: '0.5rem',
          padding: '0',
          'background-color': 'transparent',
          appearance: 'none',
          cursor: 'pointer',
        },
      })

      rules.push({
        pattern: 'form-range-track',
        properties: {
          width: '100%',
          height: '0.5rem',
          'background-color': 'hsl(var(--muted))',
          'border-radius': '9999px',
        },
      })

      rules.push({
        pattern: 'form-range-thumb',
        properties: {
          appearance: 'none',
          width: '1rem',
          height: '1rem',
          'margin-top': '-0.25rem',
          'background-color': 'hsl(var(--primary))',
          border: '2px solid hsl(var(--background))',
          'border-radius': '9999px',
          'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.1)',
          cursor: 'pointer',
          transition: 'transform 150ms ease-in-out',
        },
      })

      // ========================================
      // Color Input
      // ========================================

      rules.push({
        pattern: 'form-color',
        properties: {
          width: '3rem',
          height: '2rem',
          padding: '0.125rem',
          'background-color': 'hsl(var(--background))',
          'border-width': '1px',
          'border-style': 'solid',
          'border-color': 'hsl(var(--input))',
          'border-radius': 'var(--radius)',
          cursor: 'pointer',
        },
      })

      // ========================================
      // Search Input
      // ========================================

      rules.push({
        pattern: 'form-search',
        properties: {
          'padding-left': '2.5rem',
          'background-image': `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280' stroke-width='2'%3e%3cpath stroke-linecap='round' stroke-linejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'/%3e%3c/svg%3e")`,
          'background-position': 'left 0.75rem center',
          'background-repeat': 'no-repeat',
          'background-size': '1rem 1rem',
        },
      })

      // ========================================
      // Fieldset & Legend
      // ========================================

      rules.push({
        pattern: 'form-fieldset',
        properties: {
          border: 'none',
          padding: '0',
          margin: '0',
        },
      })

      rules.push({
        pattern: 'form-legend',
        properties: {
          display: 'block',
          width: '100%',
          padding: '0',
          'margin-bottom': '0.75rem',
          'font-size': '0.875rem',
          'font-weight': '600',
          'line-height': '1.5rem',
          color: 'hsl(var(--foreground))',
        },
      })

      // ========================================
      // Accent Colors for Controls
      // ========================================

      const accentColors = [
        { name: 'primary', value: 'hsl(var(--primary))' },
        { name: 'secondary', value: 'hsl(var(--secondary))' },
        { name: 'destructive', value: 'hsl(var(--destructive))' },
        { name: 'accent', value: 'hsl(var(--accent))' },
      ]

      for (const { name, value } of accentColors) {
        rules.push({
          pattern: `form-accent-${name}`,
          properties: {
            'accent-color': value,
          },
        })
      }

      // Arbitrary accent color
      rules.push({
        pattern: /^accent-\[(.+)\]$/,
        handler: (match) => {
          const color = match[1]
          if (!color) return null
          return { properties: { 'accent-color': color } }
        },
      })

      // ========================================
      // Register All Rules
      // ========================================

      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default formsPlugin
