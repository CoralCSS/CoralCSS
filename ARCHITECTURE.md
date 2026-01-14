# CoralCSS Architecture

This document provides a comprehensive overview of the CoralCSS framework architecture, including its core modules, data flow, and extension points.

## Table of Contents

- [Overview](#overview)
- [Core Architecture](#core-architecture)
- [Module Structure](#module-structure)
- [Data Flow](#data-flow)
- [Plugin System](#plugin-system)
- [Component System](#component-system)
- [Runtime System](#runtime-system)
- [Build Tools](#build-tools)
- [Performance Optimizations](#performance-optimizations)
- [Extension Points](#extension-points)

## Overview

CoralCSS is a modern, zero-dependency CSS framework featuring:

- **Utility-First CSS**: Atomic classes like `p-4`, `bg-red-500`, `hover:text-white`
- **Headless Components**: Accessible, unstyled UI components with full behavior
- **Plugin Architecture**: Extensible system for custom utilities, variants, and themes
- **Modern CSS Support**: Container queries, CSS layers, cascade layers, and more
- **Build Tools**: Vite plugin, PostCSS plugin, and CLI for production optimization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CoralCSS Framework                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐      │
│  │  Kernel  │  │  Themes  │  │ Plugins  │  │Components│  │  Build   │      │
│  │  (Core)  │  │          │  │          │  │          │  │  Tools   │      │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘      │
│       │             │             │             │             │            │
│       └─────────────┴──────┬──────┴─────────────┴─────────────┘            │
│                            │                                               │
│                     ┌──────┴──────┐                                        │
│                     │   Runtime   │                                        │
│                     │  (Browser)  │                                        │
│                     └─────────────┘                                        │
└─────────────────────────────────────────────────────────────────────────────┘
```

## Core Architecture

### Kernel (`src/kernel.ts`)

The Kernel is the central engine of CoralCSS. It orchestrates:

- **Configuration Resolution**: Merges presets, plugins, and user options
- **Plugin Management**: Registers, loads, and manages plugin lifecycle
- **CSS Generation**: Coordinates the full CSS generation pipeline
- **Event System**: Emits events for cache hits/misses, plugin registration, etc.

```typescript
const kernel = new Kernel({
  presets: [coralPreset()],
  theme: { colors: { brand: '#ff6b6b' } },
  plugins: [customPlugin]
})

const css = kernel.generate(['p-4', 'bg-brand', 'hover:text-white'])
```

### Core Modules (`src/core/`)

| Module | Purpose |
|--------|---------|
| `matcher.ts` | Matches utility class names against registered rules using optimized prefix indexing |
| `generator.ts` | Generates CSS from matched rules, applies variants, handles modifiers |
| `parser.ts` | Parses class names into components (variants, utility, modifiers) |
| `cache.ts` | LRU cache with TTL support for generated CSS |
| `extractor.ts` | Extracts class names from HTML/JSX content |
| `transformer.ts` | Transforms CSS output (minification, prefixing) |

### Generation Pipeline

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Input     │───▶│   Parser    │───▶│   Matcher   │───▶│  Generator  │
│  Classes    │    │             │    │             │    │             │
└─────────────┘    └─────────────┘    └─────────────┘    └─────────────┘
                          │                  │                  │
                          ▼                  ▼                  ▼
                   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
                   │  ParsedClass│    │ MatchResult │    │ GeneratedCSS│
                   │  - variants │    │  - rule     │    │  - selector │
                   │  - utility  │    │  - match    │    │  - props    │
                   │  - modifiers│    │             │    │  - layer    │
                   └─────────────┘    └─────────────┘    └─────────────┘
                                                               │
                                                               ▼
                                                        ┌─────────────┐
                                                        │  CSS String │
                                                        └─────────────┘
```

## Module Structure

```
src/
├── kernel.ts              # Core engine
├── index.ts               # Public API exports
├── types.ts               # TypeScript definitions
├── errors.ts              # Custom error classes
│
├── core/                  # Core processing modules
│   ├── matcher.ts         # Rule matching with prefix indexing
│   ├── generator.ts       # CSS generation
│   ├── parser.ts          # Class name parsing
│   ├── cache.ts           # LRU cache with TTL
│   ├── hybrid-cache.ts    # Memory + IndexedDB cache
│   ├── extractor.ts       # Class extraction from content
│   ├── transformer.ts     # CSS transformations
│   ├── worker.ts          # Web Worker for parallel processing
│   ├── incremental.ts     # Incremental build support
│   └── tree-shake.ts      # Dead code elimination
│
├── theme/                 # Theme system
│   ├── default.ts         # Default theme values
│   ├── colors.ts          # Color scales (tailwind-compatible)
│   ├── spacing.ts         # Spacing scale
│   ├── typography.ts      # Font families, sizes, weights
│   ├── dark.ts            # Dark mode utilities
│   └── semantic.ts        # Semantic color tokens
│
├── plugins/               # Plugin system
│   ├── core/              # Core plugins (always loaded)
│   │   ├── utilities/     # Utility plugins (spacing, colors, etc.)
│   │   └── variants/      # Variant plugins (hover, responsive, etc.)
│   └── optional/          # Optional plugins (forms, animations)
│
├── presets/               # Pre-configured plugin bundles
│   ├── coral.ts           # Default CoralCSS preset
│   ├── wind.ts            # Tailwind-compatible preset
│   ├── mini.ts            # Minimal preset
│   └── full.ts            # All plugins preset
│
├── components/            # Headless components
│   ├── base.ts            # BaseComponent class
│   ├── dialog.ts          # Modal dialog
│   ├── dropdown.ts        # Dropdown menu
│   ├── tabs.ts            # Tab navigation
│   └── ...                # 50+ components
│
├── runtime/               # Browser runtime
│   ├── observer.ts        # DOM mutation observer
│   ├── injector.ts        # Style injection
│   └── cdn.ts             # CDN/JIT mode
│
├── build/                 # Build tools
│   ├── vite.ts            # Vite plugin
│   ├── postcss.ts         # PostCSS plugin
│   └── cli.ts             # CLI commands
│
├── utils/                 # Utility functions
│   ├── string.ts          # String manipulation
│   ├── css.ts             # CSS formatting
│   ├── color.ts           # Color manipulation
│   ├── dom.ts             # DOM utilities
│   └── regex.ts           # Regex helpers
│
└── cva/                   # Class Variance Authority
    └── index.ts           # Variant-based class composition
```

## Data Flow

### 1. Class Name Parsing

The parser breaks down class names into structured components:

```
"hover:dark:bg-red-500/50!"
        │
        ▼
┌───────────────────────┐
│     ParsedClass       │
├───────────────────────┤
│ original: "hover:..."  │
│ variants: ["hover",   │
│            "dark"]    │
│ utility: "bg-red-500" │
│ opacity: "50"         │
│ important: true       │
│ negative: false       │
└───────────────────────┘
```

### 2. Rule Matching

The Matcher uses prefix indexing for O(1) rule lookup:

```typescript
// Rule registration
matcher.addRule({
  name: 'background-color',
  pattern: /^bg-([a-z]+)-(\d+)$/,
  generate: (match, theme) => ({
    backgroundColor: theme.colors[match[1]][match[2]]
  })
})

// Matching process
"bg-red-500" → prefix: "bg" → lookup indexed rules → match pattern → MatchResult
```

### 3. CSS Generation

The Generator creates CSS from match results:

```typescript
// Input
{ rule, match: ['bg-red-500', 'red', '500'] }

// Output
{
  selector: '.bg-red-500',
  properties: { backgroundColor: '#ef4444' },
  layer: 'utilities',
  priority: 0,
  variants: []
}
```

### 4. Variant Application

Variants modify selectors and wrap CSS:

```typescript
// hover variant
{ handler: (selector) => `${selector}:hover` }

// responsive variant (md:)
{ wrapper: '@media (min-width: 768px)' }

// Result for "md:hover:bg-red-500"
@media (min-width: 768px) {
  .md\:hover\:bg-red-500:hover {
    background-color: #ef4444;
  }
}
```

## Plugin System

### Plugin Structure

```typescript
interface Plugin {
  name: string
  version?: string
  dependencies?: string[]
  priority?: number

  install(api: PluginAPI): void
  onReady?(): void | Promise<void>
  onDestroy?(): void | Promise<void>
  onError?(error: Error): void
}
```

### Plugin API

Plugins receive an API object for registration:

```typescript
const myPlugin: Plugin = {
  name: 'my-plugin',
  install(api) {
    // Add utility rules
    api.addRule({
      pattern: /^my-util-(\d+)$/,
      generate: (match, theme) => ({ myProperty: match[1] })
    })

    // Add variants
    api.addVariant({
      name: 'my-variant',
      handler: (selector) => `.my-context ${selector}`
    })

    // Extend theme
    api.extendTheme({
      myColors: { primary: '#ff0000' }
    })

    // Access theme values
    const primary = api.theme('colors.primary')

    // Listen to events
    api.on('css:generated', (data) => { /* ... */ })
  }
}
```

### Built-in Plugin Categories

**Utility Plugins** (`src/plugins/core/utilities/`):
- `spacing.ts` - Padding, margin, gap
- `sizing.ts` - Width, height, min/max
- `colors.ts` - Background, text, border colors
- `typography.ts` - Font size, weight, line-height
- `layout.ts` - Display, position, z-index
- `flexbox.ts` - Flex utilities
- `grid.ts` - Grid utilities
- `effects.ts` - Shadows, opacity
- `transforms.ts` - Scale, rotate, translate
- `transitions.ts` - Transition properties

**Variant Plugins** (`src/plugins/core/variants/`):
- `pseudo.ts` - :hover, :focus, :active, etc.
- `responsive.ts` - sm:, md:, lg:, xl:, 2xl:
- `dark.ts` - Dark mode variants
- `modern.ts` - Container queries, has:, group:, peer:

## Component System

### BaseComponent Architecture

All components extend `BaseComponent` which provides:

```typescript
abstract class BaseComponent {
  readonly id: string
  readonly element: HTMLElement
  protected state: ComponentState
  protected config: ComponentConfig

  // Abstract methods (must implement)
  protected abstract getDefaultConfig(): ComponentConfig
  protected abstract getInitialState(): ComponentState
  protected abstract setupAria(): void
  protected abstract bindEvents(): void

  // Lifecycle
  protected init(): void
  protected render(): void
  destroy(): void

  // State management
  protected setState(updates: Partial<ComponentState>): void
  subscribe(listener: StateListener): () => void

  // Events
  protected dispatch(eventName: string, detail?: unknown): boolean
  protected addEventListener(target, event, handler): void

  // DOM utilities
  protected query<T>(selector: string): T | null
  protected trapFocus(element?: HTMLElement): void
  protected lockScroll(): void
}
```

### Component Lifecycle

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Constructor │────▶│    init()   │────▶│  setupAria()│
└─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐     ┌─────────────┐
                    │ bindEvents()│────▶│   Ready     │
                    └─────────────┘     └─────────────┘
                                               │
                           ┌───────────────────┼───────────────────┐
                           ▼                   ▼                   ▼
                    ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
                    │ setState()  │     │   Event     │     │  destroy()  │
                    └─────────────┘     └─────────────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │  render()   │
                    └─────────────┘
```

### Example Component Usage

```typescript
// Create dialog
const dialog = createDialog(element, {
  modal: true,
  closeOnOutsideClick: true,
  hooks: {
    onOpen: () => console.log('Dialog opened'),
    onClose: () => console.log('Dialog closed')
  }
})

// Control
dialog.open()
dialog.close()

// Subscribe to state changes
const unsubscribe = dialog.subscribe((state) => {
  console.log('State changed:', state)
})

// Cleanup
dialog.destroy()
```

## Runtime System

### DOM Observer

Watches for DOM changes and generates CSS on-the-fly:

```typescript
const observer = createObserver({
  target: document.body,
  subtree: true,
  attributes: true,
  attributeFilter: ['class']
})

observer.start()
// Automatically generates CSS when new classes are detected
```

### Style Injector

Injects generated CSS into the document:

```typescript
const injector = createInjector({
  target: 'head',  // or shadow root
  id: 'coral-styles'
})

injector.inject('.p-4 { padding: 1rem; }')
injector.update('.p-4 { padding: 1rem; }\n.m-4 { margin: 1rem; }')
```

### CDN Mode

For browser-based JIT compilation:

```html
<script src="https://unpkg.com/@coral-css/core/cdn.js"></script>
<script>
  CoralCSS.start({
    presets: ['coral'],
    theme: { colors: { brand: '#ff6b6b' } }
  })
</script>
```

## Build Tools

### Vite Plugin

```typescript
// vite.config.ts
import coral from '@coral-css/core/vite'

export default {
  plugins: [
    coral({
      content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
      presets: [coralPreset()],
      minify: true
    })
  ]
}
```

### PostCSS Plugin

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@coral-css/core/postcss')({
      content: ['./src/**/*.html'],
      presets: [require('@coral-css/core').coralPreset()]
    })
  ]
}
```

### CLI Commands

```bash
# Initialize configuration
coral init

# Analyze bundle
coral analyze --input dist/styles.css

# Optimize CSS
coral optimize --input dist/styles.css --output dist/styles.min.css
```

## Performance Optimizations

### Caching System

**LRU Cache** (`src/core/cache.ts`):
- In-memory cache with configurable max size
- TTL support for entry expiration
- Hit/miss statistics for monitoring

**Hybrid Cache** (`src/core/hybrid-cache.ts`):
- Two-tier: Memory (fast) + IndexedDB (persistent)
- Survives page reloads
- Automatic synchronization

### Matching Optimization

The Matcher uses prefix indexing for fast rule lookup:

```
Rules: bg-red-500, bg-blue-500, text-red-500, p-4, m-4

Index:
  "bg"   → [bg-red-*, bg-blue-*]
  "text" → [text-red-*]
  "p"    → [p-*]
  "m"    → [m-*]

Lookup "bg-green-500":
  1. Extract prefix "bg"
  2. Get indexed rules for "bg"
  3. Test only 2 rules instead of all 5
```

### Worker Pool

Parallel CSS generation using Web Workers:

```typescript
const pool = createWorkerPool({
  size: navigator.hardwareConcurrency,
  taskTimeout: 5000
})

// Distribute work across workers
const results = await pool.generateBatch(classes)
```

### Incremental Building

Only regenerates CSS for changed files:

```typescript
const builder = createIncrementalBuilder({
  cacheDir: '.coral-cache',
  parallel: true
})

await builder.build(changedFiles)
```

### Tree Shaking

Removes unused CSS rules:

```typescript
const shaker = createTreeShake({
  content: ['./src/**/*.tsx'],
  safelist: ['bg-red-*']
})

const optimizedCSS = shaker.shake(generatedCSS)
```

## Extension Points

### Custom Rules

```typescript
api.addRule({
  name: 'gradient-text',
  pattern: /^gradient-text-(\w+)-(\w+)$/,
  generate: ([, from, to], theme) => ({
    backgroundImage: `linear-gradient(to right, ${theme.colors[from][500]}, ${theme.colors[to][500]})`,
    backgroundClip: 'text',
    color: 'transparent'
  }),
  layer: 'utilities',
  priority: 10
})
```

### Custom Variants

```typescript
// Simple pseudo selector
api.addVariant({
  name: 'hocus',
  handler: (selector) => `${selector}:hover, ${selector}:focus`
})

// With at-rule wrapper
api.addVariant({
  name: 'print',
  wrapper: '@media print'
})

// Dynamic variant with pattern
api.addVariant({
  name: 'data',
  match: /^data-\[(.+)\]$/,
  handler: (selector, matches) => `${selector}[data-${matches[1]}]`
})
```

### Custom Components

```typescript
class MyComponent extends BaseComponent {
  protected getDefaultConfig() {
    return { option: 'default' }
  }

  protected getInitialState() {
    return { active: false }
  }

  protected setupAria() {
    this.element.setAttribute('role', 'widget')
  }

  protected bindEvents() {
    this.addEventListener(this.element, 'click', () => {
      this.setState({ active: !this.state.active })
    })
  }

  protected render() {
    this.element.dataset.active = String(this.state.active)
  }
}

export const createMyComponent = createComponentFactory(MyComponent)
```

### Theme Extension

```typescript
api.extendTheme({
  colors: {
    brand: {
      50: '#fef2f2',
      100: '#fee2e2',
      // ...
      900: '#7f1d1d'
    }
  },
  spacing: {
    '128': '32rem',
    '144': '36rem'
  },
  fontFamily: {
    display: ['Playfair Display', 'serif']
  }
})
```

## Event System

The Kernel emits events throughout the CSS generation lifecycle:

| Event | Data | Description |
|-------|------|-------------|
| `plugin:registered` | `{ plugin: string }` | Plugin was registered |
| `plugin:unregistered` | `{ plugin: string }` | Plugin was removed |
| `rule:added` | `{ rule: string, plugin: string }` | Rule was added |
| `variant:added` | `{ variant: string, plugin: string }` | Variant was added |
| `theme:extended` | `{ plugin: string }` | Theme was extended |
| `cache:hit` | `{ className: string }` | Cache hit for class |
| `cache:miss` | `{ className: string }` | Cache miss for class |
| `css:generated` | `{ classes: string[], css: string }` | CSS was generated |

```typescript
const unsubscribe = kernel.on('css:generated', ({ classes, css }) => {
  console.log(`Generated ${css.length} bytes for ${classes.length} classes`)
})
```

## Best Practices

### Performance

1. **Use presets** instead of individual plugins for common setups
2. **Enable caching** in production with appropriate TTL
3. **Use content paths** to limit class extraction scope
4. **Configure safelist** carefully to avoid bloat

### Extensibility

1. **Prefer plugins** over modifying core code
2. **Use theme extension** for custom values instead of hardcoding
3. **Follow naming conventions** for custom utilities (`prefix-value`)
4. **Set appropriate priorities** for rule ordering

### Components

1. **Extend BaseComponent** for consistent lifecycle handling
2. **Implement all abstract methods** properly
3. **Use state management** instead of direct DOM manipulation
4. **Clean up** event listeners in `destroy()`

---

For more information, see:
- [API Reference](./docs/api.md)
- [Plugin Development Guide](./docs/plugins.md)
- [Component Cookbook](./docs/components.md)
- [Migration Guide](./docs/migration.md)
