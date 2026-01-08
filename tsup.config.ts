import { defineConfig } from 'tsup'

export default defineConfig([
  // Main package
  {
    entry: {
      index: 'src/index.ts',
      runtime: 'src/runtime/index.ts',
      vite: 'src/build/vite.ts',
      postcss: 'src/build/postcss.ts',
      cli: 'src/build/cli.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    clean: false,
    treeshake: true,
    minify: false,
    external: ['vite', 'postcss'],
    outDir: 'dist',
  },
  // Plugins
  {
    entry: {
      'plugins/index': 'src/plugins/index.ts',
      'plugins/icons': 'src/plugins/optional/icons.ts',
      'plugins/typography': 'src/plugins/optional/typography.ts',
      'plugins/forms': 'src/plugins/optional/forms.ts',
      'plugins/animations': 'src/plugins/optional/animations.ts',
      'plugins/attributify': 'src/plugins/optional/attributify.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    outDir: 'dist',
  },
  // Presets
  {
    entry: {
      'presets/index': 'src/presets/index.ts',
      'presets/coral': 'src/presets/coral.ts',
      'presets/wind': 'src/presets/wind.ts',
      'presets/mini': 'src/presets/mini.ts',
      'presets/full': 'src/presets/full.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    outDir: 'dist',
  },
  // Components
  {
    entry: {
      'components/index': 'src/components/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    outDir: 'dist',
  },
  // Theme
  {
    entry: {
      'theme/index': 'src/theme/index.ts',
    },
    format: ['cjs', 'esm'],
    dts: true,
    splitting: true,
    sourcemap: true,
    treeshake: true,
    outDir: 'dist',
  },
  // CDN bundle (IIFE)
  {
    entry: {
      'coral.min': 'src/runtime/cdn.ts',
    },
    format: ['iife'],
    globalName: 'Coral',
    minify: true,
    sourcemap: false,
    outDir: 'dist',
  },
])
