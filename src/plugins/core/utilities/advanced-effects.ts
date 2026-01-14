/**
 * Advanced Effects Plugin
 *
 * Unique CoralCSS features that go beyond Tailwind CSS 4.1+
 * - Fluid Typography (responsive clamp-based)
 * - Gradient Text
 * - Glassmorphism
 * - Neumorphism
 * - Animated Gradients
 * - Extended Aspect Ratios
 * - Physics-based Animations
 * - Advanced Visual Effects
 *
 * @module plugins/core/utilities/advanced-effects
 */

import type { Plugin, Rule, PluginContext } from '../../../types'

/**
 * Fluid typography scale using CSS clamp()
 * Automatically scales between min and max sizes based on viewport
 */
const fluidTypography: Record<string, string> = {
  'xs': 'clamp(0.75rem, 0.7rem + 0.25vw, 0.875rem)',
  'sm': 'clamp(0.875rem, 0.8rem + 0.4vw, 1rem)',
  'base': 'clamp(1rem, 0.9rem + 0.5vw, 1.125rem)',
  'lg': 'clamp(1.125rem, 1rem + 0.6vw, 1.25rem)',
  'xl': 'clamp(1.25rem, 1.1rem + 0.75vw, 1.5rem)',
  '2xl': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
  '3xl': 'clamp(1.875rem, 1.5rem + 1.9vw, 2.5rem)',
  '4xl': 'clamp(2.25rem, 1.8rem + 2.25vw, 3rem)',
  '5xl': 'clamp(3rem, 2.2rem + 4vw, 4rem)',
  '6xl': 'clamp(3.75rem, 2.5rem + 6.25vw, 5rem)',
  '7xl': 'clamp(4.5rem, 3rem + 7.5vw, 6rem)',
  '8xl': 'clamp(6rem, 4rem + 10vw, 8rem)',
  '9xl': 'clamp(8rem, 5rem + 15vw, 10rem)',
  'hero': 'clamp(3rem, 2rem + 5vw, 6rem)',
  'display': 'clamp(4rem, 2.5rem + 7.5vw, 8rem)',
  'giant': 'clamp(6rem, 3rem + 15vw, 12rem)',
}

/**
 * Fluid spacing scale
 */
const fluidSpacing: Record<string, string> = {
  'xs': 'clamp(0.25rem, 0.2rem + 0.25vw, 0.5rem)',
  'sm': 'clamp(0.5rem, 0.4rem + 0.5vw, 0.75rem)',
  'base': 'clamp(1rem, 0.8rem + 1vw, 1.5rem)',
  'md': 'clamp(1.5rem, 1.2rem + 1.5vw, 2rem)',
  'lg': 'clamp(2rem, 1.5rem + 2.5vw, 3rem)',
  'xl': 'clamp(3rem, 2rem + 5vw, 5rem)',
  '2xl': 'clamp(4rem, 2.5rem + 7.5vw, 8rem)',
  '3xl': 'clamp(6rem, 3rem + 15vw, 12rem)',
}

/**
 * Gradient presets for text
 */
const gradientPresets: Record<string, string> = {
  'primary': 'linear-gradient(135deg, var(--coral-primary, #ff6b6b) 0%, var(--coral-primary-dark, #ee5a5a) 100%)',
  'secondary': 'linear-gradient(135deg, var(--coral-secondary, #4ecdc4) 0%, var(--coral-secondary-dark, #3dbdb5) 100%)',
  'rainbow': 'linear-gradient(90deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #8f00ff)',
  'sunset': 'linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ff9ff3 100%)',
  'ocean': 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #6B8DD6 100%)',
  'forest': 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
  'fire': 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
  'purple': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'pink': 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'blue': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'neon': 'linear-gradient(90deg, #00ff87, #60efff, #ff00ff, #ff0080)',
  'gold': 'linear-gradient(135deg, #f7971e 0%, #ffd200 50%, #f7971e 100%)',
  'silver': 'linear-gradient(135deg, #bdc3c7 0%, #ecf0f1 50%, #bdc3c7 100%)',
  'bronze': 'linear-gradient(135deg, #cd7f32 0%, #daa06d 50%, #cd7f32 100%)',
  'chrome': 'linear-gradient(135deg, #333 0%, #ccc 25%, #333 50%, #ccc 75%, #333 100%)',
  'holographic': 'linear-gradient(135deg, #ff00ff, #00ffff, #ff00ff, #ffff00, #00ffff)',
  'aurora': 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 50%, #00c9ff 100%)',
  'midnight': 'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'cool': 'linear-gradient(135deg, #2193b0 0%, #6dd5ed 100%)',
  'warm': 'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
}

/**
 * Glass effect presets
 */
const glassPresets: Record<string, Record<string, string>> = {
  'default': {
    background: 'rgba(255, 255, 255, 0.1)',
    'backdrop-filter': 'blur(10px)',
    '-webkit-backdrop-filter': 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
  },
  'sm': {
    background: 'rgba(255, 255, 255, 0.05)',
    'backdrop-filter': 'blur(4px)',
    '-webkit-backdrop-filter': 'blur(4px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  'lg': {
    background: 'rgba(255, 255, 255, 0.15)',
    'backdrop-filter': 'blur(20px)',
    '-webkit-backdrop-filter': 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  'xl': {
    background: 'rgba(255, 255, 255, 0.2)',
    'backdrop-filter': 'blur(30px)',
    '-webkit-backdrop-filter': 'blur(30px)',
    border: '1px solid rgba(255, 255, 255, 0.4)',
  },
  'dark': {
    background: 'rgba(0, 0, 0, 0.3)',
    'backdrop-filter': 'blur(10px)',
    '-webkit-backdrop-filter': 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
  },
  'light': {
    background: 'rgba(255, 255, 255, 0.7)',
    'backdrop-filter': 'blur(10px)',
    '-webkit-backdrop-filter': 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  'frost': {
    background: 'rgba(255, 255, 255, 0.25)',
    'backdrop-filter': 'blur(16px) saturate(180%)',
    '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
  },
  'crystal': {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))',
    'backdrop-filter': 'blur(20px) saturate(200%)',
    '-webkit-backdrop-filter': 'blur(20px) saturate(200%)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
  },
  'morphism': {
    background: 'rgba(255, 255, 255, 0.1)',
    'backdrop-filter': 'blur(40px) saturate(150%)',
    '-webkit-backdrop-filter': 'blur(40px) saturate(150%)',
    border: '1px solid rgba(255, 255, 255, 0.125)',
    'box-shadow': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
  },
}

/**
 * Neumorphism presets
 */
const neuPresets: Record<string, Record<string, string>> = {
  'default': {
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    'box-shadow': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
  },
  'sm': {
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    'box-shadow': '3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff',
  },
  'lg': {
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    'box-shadow': '10px 10px 20px #d1d1d1, -10px -10px 20px #ffffff',
  },
  'xl': {
    background: 'linear-gradient(145deg, #e6e6e6, #ffffff)',
    'box-shadow': '15px 15px 30px #d1d1d1, -15px -15px 30px #ffffff',
  },
  'inset': {
    background: '#f0f0f0',
    'box-shadow': 'inset 5px 5px 10px #d1d1d1, inset -5px -5px 10px #ffffff',
  },
  'flat': {
    background: '#f0f0f0',
    'box-shadow': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
  },
  'concave': {
    background: 'linear-gradient(145deg, #d9d9d9, #ffffff)',
    'box-shadow': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
  },
  'convex': {
    background: 'linear-gradient(145deg, #ffffff, #d9d9d9)',
    'box-shadow': '5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff',
  },
  'pressed': {
    background: '#f0f0f0',
    'box-shadow': 'inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff',
  },
  'dark': {
    background: 'linear-gradient(145deg, #2d2d2d, #363636)',
    'box-shadow': '5px 5px 10px #1a1a1a, -5px -5px 10px #404040',
  },
  'dark-inset': {
    background: '#303030',
    'box-shadow': 'inset 5px 5px 10px #1a1a1a, inset -5px -5px 10px #404040',
  },
}

/**
 * Extended aspect ratios
 */
const extendedAspectRatios: Record<string, string> = {
  'golden': '1.618',
  'silver': '2.414',
  'cinema': '2.35',
  'ultra': '2.76',
  'imax': '1.43',
  'photo': '1.5',
  'portrait': '0.8',
  'story': '0.5625',
  'a4': '1.414',
  'letter': '1.294',
  'legal': '1.647',
  'film-35mm': '1.375',
  'anamorphic': '2.39',
  'tv': '1.333',
  'widescreen': '1.778',
  'superwide': '3.5',
  'vertical': '0.5625',
}

/**
 * Spring animation easings (approximations)
 */
const springEasings: Record<string, string> = {
  'default': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'stiff': 'cubic-bezier(0.5, 1.25, 0.75, 1.25)',
  'soft': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  'wobbly': 'cubic-bezier(0.25, 0.8, 0.25, 1.5)',
  'gentle': 'cubic-bezier(0.23, 1, 0.32, 1)',
}

/**
 * Advanced Effects Plugin
 */
export function advancedEffectsPlugin(): Plugin {
  return {
    name: 'advanced-effects',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // FLUID TYPOGRAPHY
      // ========================================

      for (const [key, value] of Object.entries(fluidTypography)) {
        rules.push({
          pattern: `text-fluid-${key}`,
          properties: { 'font-size': value },
        })
      }

      // Arbitrary fluid typography
      rules.push({
        pattern: /^text-fluid-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          // Parse: min_max or min_preferred_max
          const parts = value.split('_')
          if (parts.length === 2) {
            return {
              properties: { 'font-size': `clamp(${parts[0]}, 5vw, ${parts[1]})` },
            }
          } else if (parts.length === 3) {
            return {
              properties: { 'font-size': `clamp(${parts[0]}, ${parts[1]}, ${parts[2]})` },
            }
          }
          return null
        },
      })

      // ========================================
      // FLUID SPACING
      // ========================================

      for (const [key, value] of Object.entries(fluidSpacing)) {
        rules.push({ pattern: `p-fluid-${key}`, properties: { padding: value } })
        rules.push({ pattern: `m-fluid-${key}`, properties: { margin: value } })
        rules.push({ pattern: `gap-fluid-${key}`, properties: { gap: value } })
        rules.push({ pattern: `px-fluid-${key}`, properties: { 'padding-left': value, 'padding-right': value } })
        rules.push({ pattern: `py-fluid-${key}`, properties: { 'padding-top': value, 'padding-bottom': value } })
        rules.push({ pattern: `mx-fluid-${key}`, properties: { 'margin-left': value, 'margin-right': value } })
        rules.push({ pattern: `my-fluid-${key}`, properties: { 'margin-top': value, 'margin-bottom': value } })
      }

      // ========================================
      // GRADIENT TEXT
      // ========================================

      for (const [key, value] of Object.entries(gradientPresets)) {
        rules.push({
          pattern: `text-gradient-${key}`,
          properties: {
            'background-image': value,
            '-webkit-background-clip': 'text',
            'background-clip': 'text',
            color: 'transparent',
            '-webkit-text-fill-color': 'transparent',
          },
        })
      }

      // Arbitrary gradient text
      rules.push({
        pattern: /^text-gradient-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          // Replace underscores with spaces for readability
          const gradient = value.replace(/_/g, ' ')
          return {
            properties: {
              'background-image': gradient.includes('gradient') ? gradient : `linear-gradient(135deg, ${gradient})`,
              '-webkit-background-clip': 'text',
              'background-clip': 'text',
              color: 'transparent',
              '-webkit-text-fill-color': 'transparent',
            },
          }
        },
      })

      // Animated gradient text
      rules.push({
        pattern: 'text-gradient-animate',
        properties: {
          'background-size': '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
        },
      })

      // ========================================
      // TEXT STROKE
      // ========================================

      const strokeWidths = ['1', '2', '3', '4', '5', '6', '8']
      for (const width of strokeWidths) {
        rules.push({
          pattern: `text-stroke-${width}`,
          properties: {
            '-webkit-text-stroke-width': `${width}px`,
          },
        })
      }

      const strokeColors: Record<string, string> = {
        'white': '#ffffff',
        'black': '#000000',
        'current': 'currentColor',
        'transparent': 'transparent',
        'primary': 'var(--coral-primary, #ff6b6b)',
        'secondary': 'var(--coral-secondary, #4ecdc4)',
      }

      for (const [key, value] of Object.entries(strokeColors)) {
        rules.push({
          pattern: `text-stroke-${key}`,
          properties: {
            '-webkit-text-stroke-color': value,
          },
        })
      }

      // Combined text stroke
      rules.push({
        pattern: /^text-stroke-(\d+)-(.+)$/,
        handler: (match) => {
          const width = match[1]
          const color = match[2]
          if (!width || !color) {return null}
          const colorValue = strokeColors[color] || color
          return {
            properties: {
              '-webkit-text-stroke': `${width}px ${colorValue}`,
            },
          }
        },
      })

      // Arbitrary text stroke
      rules.push({
        pattern: /^text-stroke-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: { '-webkit-text-stroke': value.replace(/_/g, ' ') },
          }
        },
      })

      // ========================================
      // ADVANCED TEXT EFFECTS
      // ========================================

      // Glow effects
      rules.push({
        pattern: 'text-glow-sm',
        properties: { 'text-shadow': '0 0 4px currentColor' },
      })
      rules.push({
        pattern: 'text-glow',
        properties: { 'text-shadow': '0 0 8px currentColor' },
      })
      rules.push({
        pattern: 'text-glow-md',
        properties: { 'text-shadow': '0 0 12px currentColor' },
      })
      rules.push({
        pattern: 'text-glow-lg',
        properties: { 'text-shadow': '0 0 16px currentColor, 0 0 24px currentColor' },
      })
      rules.push({
        pattern: 'text-glow-xl',
        properties: { 'text-shadow': '0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor' },
      })

      // Neon text effects
      const neonColors: Record<string, string> = {
        'blue': '#00d4ff',
        'pink': '#ff00ff',
        'green': '#00ff00',
        'red': '#ff0040',
        'yellow': '#ffff00',
        'purple': '#bf00ff',
        'orange': '#ff8000',
        'cyan': '#00ffff',
        'white': '#ffffff',
      }

      for (const [key, value] of Object.entries(neonColors)) {
        rules.push({
          pattern: `text-neon-${key}`,
          properties: {
            color: value,
            'text-shadow': `0 0 5px ${value}, 0 0 10px ${value}, 0 0 20px ${value}, 0 0 40px ${value}`,
          },
        })
      }

      // 3D text effect
      rules.push({
        pattern: 'text-3d',
        properties: {
          'text-shadow': '1px 1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.18), 3px 3px 0 rgba(0,0,0,0.16), 4px 4px 0 rgba(0,0,0,0.14), 5px 5px 0 rgba(0,0,0,0.12)',
        },
      })

      rules.push({
        pattern: 'text-3d-sm',
        properties: {
          'text-shadow': '1px 1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.15)',
        },
      })

      rules.push({
        pattern: 'text-3d-lg',
        properties: {
          'text-shadow': '1px 1px 0 rgba(0,0,0,0.2), 2px 2px 0 rgba(0,0,0,0.18), 3px 3px 0 rgba(0,0,0,0.16), 4px 4px 0 rgba(0,0,0,0.14), 5px 5px 0 rgba(0,0,0,0.12), 6px 6px 0 rgba(0,0,0,0.1), 7px 7px 0 rgba(0,0,0,0.08)',
        },
      })

      // Emboss & Engrave
      rules.push({
        pattern: 'text-emboss',
        properties: {
          'text-shadow': '1px 1px 0 rgba(255,255,255,0.5), -1px -1px 0 rgba(0,0,0,0.1)',
        },
      })

      rules.push({
        pattern: 'text-engrave',
        properties: {
          'text-shadow': '-1px -1px 0 rgba(255,255,255,0.2), 1px 1px 0 rgba(0,0,0,0.25)',
        },
      })

      // Text outline
      rules.push({
        pattern: 'text-outline',
        properties: {
          'text-shadow': '-1px -1px 0 currentColor, 1px -1px 0 currentColor, -1px 1px 0 currentColor, 1px 1px 0 currentColor',
        },
      })

      rules.push({
        pattern: 'text-outline-2',
        properties: {
          'text-shadow': '-2px -2px 0 currentColor, 2px -2px 0 currentColor, -2px 2px 0 currentColor, 2px 2px 0 currentColor, -2px 0 0 currentColor, 2px 0 0 currentColor, 0 -2px 0 currentColor, 0 2px 0 currentColor',
        },
      })

      // Text mask effects
      rules.push({
        pattern: 'text-mask-fade-b',
        properties: {
          '-webkit-mask-image': 'linear-gradient(to bottom, black 50%, transparent 100%)',
          'mask-image': 'linear-gradient(to bottom, black 50%, transparent 100%)',
        },
      })

      rules.push({
        pattern: 'text-mask-fade-t',
        properties: {
          '-webkit-mask-image': 'linear-gradient(to top, black 50%, transparent 100%)',
          'mask-image': 'linear-gradient(to top, black 50%, transparent 100%)',
        },
      })

      rules.push({
        pattern: 'text-mask-fade-r',
        properties: {
          '-webkit-mask-image': 'linear-gradient(to right, black 50%, transparent 100%)',
          'mask-image': 'linear-gradient(to right, black 50%, transparent 100%)',
        },
      })

      rules.push({
        pattern: 'text-mask-fade-l',
        properties: {
          '-webkit-mask-image': 'linear-gradient(to left, black 50%, transparent 100%)',
          'mask-image': 'linear-gradient(to left, black 50%, transparent 100%)',
        },
      })

      // ========================================
      // GLASSMORPHISM
      // ========================================

      for (const [key, value] of Object.entries(glassPresets)) {
        const patternName = key === 'default' ? 'glass' : `glass-${key}`
        rules.push({
          pattern: patternName,
          properties: value,
        })
      }

      // Glass with noise texture
      rules.push({
        pattern: 'glass-noise',
        properties: {
          position: 'relative',
        },
      })

      // Glass border glow
      rules.push({
        pattern: 'glass-border-glow',
        properties: {
          'box-shadow': '0 0 20px rgba(255, 255, 255, 0.3), inset 0 0 20px rgba(255, 255, 255, 0.1)',
        },
      })

      // Colored glass
      const glassColors: Record<string, string> = {
        'primary': 'rgba(255, 107, 107, 0.2)',
        'blue': 'rgba(66, 133, 244, 0.2)',
        'green': 'rgba(52, 168, 83, 0.2)',
        'purple': 'rgba(156, 39, 176, 0.2)',
        'orange': 'rgba(255, 152, 0, 0.2)',
        'pink': 'rgba(233, 30, 99, 0.2)',
        'cyan': 'rgba(0, 188, 212, 0.2)',
      }

      for (const [key, value] of Object.entries(glassColors)) {
        rules.push({
          pattern: `glass-${key}`,
          properties: {
            background: value,
            'backdrop-filter': 'blur(10px)',
            '-webkit-backdrop-filter': 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
          },
        })
      }

      // ========================================
      // NEUMORPHISM
      // ========================================

      for (const [key, value] of Object.entries(neuPresets)) {
        const patternName = key === 'default' ? 'neu' : `neu-${key}`
        rules.push({
          pattern: patternName,
          properties: value,
        })
      }

      // Neumorphism colors
      const neuColors: Record<string, { bg: string; light: string; dark: string }> = {
        'primary': { bg: '#ff6b6b', light: '#ff8585', dark: '#cc5555' },
        'blue': { bg: '#4285f4', light: '#5c9aff', dark: '#3568c3' },
        'green': { bg: '#34a853', light: '#47c06a', dark: '#297a3f' },
        'purple': { bg: '#9c27b0', light: '#b541cc', dark: '#7a1e8c' },
        'gray': { bg: '#e0e0e0', light: '#ffffff', dark: '#bebebe' },
      }

      for (const [key, { bg, light, dark }] of Object.entries(neuColors)) {
        rules.push({
          pattern: `neu-${key}`,
          properties: {
            background: `linear-gradient(145deg, ${light}, ${bg})`,
            'box-shadow': `5px 5px 10px ${dark}, -5px -5px 10px ${light}`,
          },
        })

        rules.push({
          pattern: `neu-${key}-inset`,
          properties: {
            background: bg,
            'box-shadow': `inset 5px 5px 10px ${dark}, inset -5px -5px 10px ${light}`,
          },
        })
      }

      // ========================================
      // ANIMATED GRADIENTS
      // ========================================

      rules.push({
        pattern: 'gradient-animate',
        properties: {
          'background-size': '200% 200%',
          animation: 'gradient-shift 3s ease infinite',
        },
      })

      rules.push({
        pattern: 'gradient-animate-slow',
        properties: {
          'background-size': '200% 200%',
          animation: 'gradient-shift 6s ease infinite',
        },
      })

      rules.push({
        pattern: 'gradient-animate-fast',
        properties: {
          'background-size': '200% 200%',
          animation: 'gradient-shift 1.5s ease infinite',
        },
      })

      rules.push({
        pattern: 'gradient-shimmer',
        properties: {
          'background-size': '200% 100%',
          animation: 'shimmer 2s linear infinite',
        },
      })

      rules.push({
        pattern: 'gradient-wave',
        properties: {
          'background-size': '300% 100%',
          animation: 'wave 3s ease-in-out infinite',
        },
      })

      rules.push({
        pattern: 'gradient-pulse',
        properties: {
          animation: 'gradient-pulse 2s ease-in-out infinite',
        },
      })

      rules.push({
        pattern: 'gradient-rotate',
        properties: {
          animation: 'gradient-rotate 4s linear infinite',
        },
      })

      // Mesh gradient (simulated)
      rules.push({
        pattern: 'gradient-mesh',
        properties: {
          'background-image': 'radial-gradient(at 40% 20%, hsla(28,100%,74%,1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189,100%,56%,1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355,100%,93%,1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340,100%,76%,1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22,100%,77%,1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242,100%,70%,1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343,100%,76%,1) 0px, transparent 50%)',
        },
      })

      // ========================================
      // EXTENDED ASPECT RATIOS
      // ========================================

      for (const [key, value] of Object.entries(extendedAspectRatios)) {
        rules.push({
          pattern: `aspect-${key}`,
          properties: { 'aspect-ratio': value },
        })
      }

      // ========================================
      // SPRING ANIMATIONS
      // ========================================

      for (const [key, value] of Object.entries(springEasings)) {
        const patternName = key === 'default' ? 'ease-spring' : `ease-spring-${key}`
        rules.push({
          pattern: patternName,
          properties: { 'transition-timing-function': value },
        })
      }

      // Animation with spring easing
      rules.push({
        pattern: 'animate-spring-in',
        properties: {
          animation: 'spring-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
        },
      })

      rules.push({
        pattern: 'animate-spring-out',
        properties: {
          animation: 'spring-out 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        },
      })

      rules.push({
        pattern: 'animate-bounce-in',
        properties: {
          animation: 'bounce-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards',
        },
      })

      rules.push({
        pattern: 'animate-elastic',
        properties: {
          animation: 'elastic 1s cubic-bezier(0.25, 0.8, 0.25, 1.5) forwards',
        },
      })

      rules.push({
        pattern: 'animate-jello',
        properties: {
          animation: 'jello 1s ease-in-out',
        },
      })

      rules.push({
        pattern: 'animate-rubber-band',
        properties: {
          animation: 'rubber-band 1s ease-in-out',
        },
      })

      // ========================================
      // STAGGER ANIMATIONS
      // ========================================

      const staggerDelays = [50, 100, 150, 200, 250, 300, 400, 500]
      for (const delay of staggerDelays) {
        rules.push({
          pattern: `stagger-${delay}`,
          properties: {
            '--stagger-delay': `${delay}ms`,
          },
        })
      }

      // Stagger children utility (CSS variable based)
      for (let i = 1; i <= 20; i++) {
        rules.push({
          pattern: `stagger-child-${i}`,
          properties: {
            'animation-delay': `calc(var(--stagger-delay, 100ms) * ${i})`,
          },
        })
      }

      // ========================================
      // SKELETON LOADING
      // ========================================

      rules.push({
        pattern: 'skeleton',
        properties: {
          background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
          'background-size': '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
        },
      })

      rules.push({
        pattern: 'skeleton-dark',
        properties: {
          background: 'linear-gradient(90deg, #2a2a2a 25%, #3a3a3a 50%, #2a2a2a 75%)',
          'background-size': '200% 100%',
          animation: 'skeleton-loading 1.5s infinite',
        },
      })

      rules.push({
        pattern: 'skeleton-pulse',
        properties: {
          animation: 'skeleton-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        },
      })

      // ========================================
      // GLOW EFFECTS
      // ========================================

      const glowColors: Record<string, string> = {
        'primary': 'var(--coral-primary, #ff6b6b)',
        'blue': '#3b82f6',
        'green': '#22c55e',
        'red': '#ef4444',
        'purple': '#a855f7',
        'pink': '#ec4899',
        'orange': '#f97316',
        'yellow': '#eab308',
        'cyan': '#06b6d4',
        'white': '#ffffff',
      }

      for (const [key, value] of Object.entries(glowColors)) {
        rules.push({
          pattern: `glow-${key}`,
          properties: {
            'box-shadow': `0 0 15px ${value}, 0 0 30px ${value}`,
          },
        })

        rules.push({
          pattern: `glow-${key}-sm`,
          properties: {
            'box-shadow': `0 0 8px ${value}`,
          },
        })

        rules.push({
          pattern: `glow-${key}-lg`,
          properties: {
            'box-shadow': `0 0 20px ${value}, 0 0 40px ${value}, 0 0 60px ${value}`,
          },
        })
      }

      // Animated glow
      rules.push({
        pattern: 'glow-pulse',
        properties: {
          animation: 'glow-pulse 2s ease-in-out infinite',
        },
      })

      // ========================================
      // GRADIENTS (Extended)
      // ========================================

      // Gradient presets for backgrounds
      for (const [key, value] of Object.entries(gradientPresets)) {
        rules.push({
          pattern: `bg-gradient-${key}`,
          properties: {
            'background-image': value,
          },
        })
      }

      // ========================================
      // NOISE TEXTURE
      // ========================================

      rules.push({
        pattern: 'noise-subtle',
        properties: {
          'background-image': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          opacity: '0.03',
        },
      })

      rules.push({
        pattern: 'noise-visible',
        properties: {
          'background-image': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 400 400\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          opacity: '0.08',
        },
      })

      // ========================================
      // BLUR BACKGROUNDS
      // ========================================

      rules.push({
        pattern: 'bg-blur-xs',
        properties: { 'backdrop-filter': 'blur(2px)', '-webkit-backdrop-filter': 'blur(2px)' },
      })
      rules.push({
        pattern: 'bg-blur-sm',
        properties: { 'backdrop-filter': 'blur(4px)', '-webkit-backdrop-filter': 'blur(4px)' },
      })
      rules.push({
        pattern: 'bg-blur',
        properties: { 'backdrop-filter': 'blur(8px)', '-webkit-backdrop-filter': 'blur(8px)' },
      })
      rules.push({
        pattern: 'bg-blur-md',
        properties: { 'backdrop-filter': 'blur(12px)', '-webkit-backdrop-filter': 'blur(12px)' },
      })
      rules.push({
        pattern: 'bg-blur-lg',
        properties: { 'backdrop-filter': 'blur(16px)', '-webkit-backdrop-filter': 'blur(16px)' },
      })
      rules.push({
        pattern: 'bg-blur-xl',
        properties: { 'backdrop-filter': 'blur(24px)', '-webkit-backdrop-filter': 'blur(24px)' },
      })
      rules.push({
        pattern: 'bg-blur-2xl',
        properties: { 'backdrop-filter': 'blur(40px)', '-webkit-backdrop-filter': 'blur(40px)' },
      })
      rules.push({
        pattern: 'bg-blur-3xl',
        properties: { 'backdrop-filter': 'blur(64px)', '-webkit-backdrop-filter': 'blur(64px)' },
      })

      // Arbitrary blur
      rules.push({
        pattern: /^bg-blur-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) {return null}
          return {
            properties: {
              'backdrop-filter': `blur(${value})`,
              '-webkit-backdrop-filter': `blur(${value})`,
            },
          }
        },
      })

      // ========================================
      // FROSTED / SATURATE
      // ========================================

      rules.push({
        pattern: 'bg-frosted',
        properties: {
          'backdrop-filter': 'blur(16px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
          background: 'rgba(255, 255, 255, 0.72)',
        },
      })

      rules.push({
        pattern: 'bg-frosted-dark',
        properties: {
          'backdrop-filter': 'blur(16px) saturate(180%)',
          '-webkit-backdrop-filter': 'blur(16px) saturate(180%)',
          background: 'rgba(0, 0, 0, 0.72)',
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

export default advancedEffectsPlugin
