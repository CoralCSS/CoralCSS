# CoralCSS - Modern CSS Framework

## Package Identity

| Field | Value |
|-------|-------|
| **NPM Package** | `coralcss` |
| **GitHub Organization** | `https://github.com/coralcss` |
| **GitHub Repository** | `https://github.com/coralcss/coralcss` |
| **Documentation Site** | `https://coralcss.com` |
| **License** | MIT |
| **Author** | Ersin Koç (ersinkoc) |

> **NO social media, Discord, email, or external links allowed. Only GitHub and coralcss.com.**

---

## Package Description

**One-line:** A modern, zero-dependency CSS framework with utility classes, headless components, and first-class support for cutting-edge CSS features.

CoralCSS is a next-generation CSS framework that goes beyond Tailwind CSS. It provides utility-first classes, a powerful theming system, headless UI components, and native support for modern CSS features like anchor positioning, container queries, :has() selector, @scope, scroll-driven animations, and view transitions. CoralCSS works both at build-time (Vite/PostCSS) and runtime (CDN), giving developers maximum flexibility.

---

## NON-NEGOTIABLE RULES

These rules are **ABSOLUTE** and must be followed without exception.

### 1. ZERO RUNTIME DEPENDENCIES

```json
{
  "dependencies": {}  // MUST BE EMPTY - NO EXCEPTIONS
}
```

- Implement EVERYTHING from scratch
- No PostCSS, no Lightning CSS, no external parsers - nothing
- Write your own CSS parser, generator, utilities
- If you think you need a dependency, you don't
- This is a HARD requirement - zero tolerance

**Allowed devDependencies only:**
```json
{
  "devDependencies": {
    "typescript": "^5.7.0",
    "vitest": "^2.1.0",
    "@vitest/coverage-v8": "^2.1.0",
    "tsup": "^8.3.0",
    "@types/node": "^22.0.0",
    "prettier": "^3.4.0",
    "eslint": "^9.0.0",
    "playwright": "^1.49.0"
  }
}
```

### 2. 100% TEST COVERAGE

- Every line of code must be tested
- Every branch must be tested
- Every function must be tested
- **All tests must pass** (100% success rate)
- Use Vitest for unit/integration tests
- Use Playwright for browser/runtime tests
- Coverage thresholds enforced in config

### 3. MICRO-KERNEL ARCHITECTURE

All functionality MUST use plugin-based architecture:

```
┌─────────────────────────────────────────────────────────┐
│                      User Code                           │
│  import { createCoral } from 'coralcss'                  │
├─────────────────────────────────────────────────────────┤
│                   Plugin Registry                        │
│     use() · register() · unregister() · list()          │
├────────────┬────────────┬────────────┬──────────────────┤
│   CORE     │   CORE     │  OPTIONAL  │    COMMUNITY     │
│  Plugins   │  Plugins   │  Plugins   │    Plugins       │
├────────────┴────────────┴────────────┴──────────────────┤
│                    Micro Kernel                          │
│  Rule Engine · CSS Generator · Variant System            │
│  Runtime Injector · Build Extractor · Cache              │
└─────────────────────────────────────────────────────────┘
```

**Kernel responsibilities (minimal):**
- Plugin registration and lifecycle
- Rule matching and CSS generation
- Variant processing
- Theme/token management
- Cache management

### 4. DEVELOPMENT WORKFLOW

Create these documents **FIRST**, before any code:

1. **SPECIFICATION.md** - Complete package specification
2. **IMPLEMENTATION.md** - Architecture and design decisions  
3. **TASKS.md** - Ordered task list with dependencies

Only after all three documents are complete, implement code following TASKS.md sequentially.

### 5. TYPESCRIPT STRICT MODE

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noEmit": true,
    "declaration": true,
    "declarationMap": true,
    "moduleResolution": "bundler",
    "target": "ES2022",
    "module": "ESNext",
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "isolatedModules": true
  }
}
```

### 6. LLM-NATIVE DESIGN

Package must be designed for both humans AND AI assistants:

- **llms.txt** file in root (< 2000 tokens)
- **Predictable API** naming (`create`, `use`, `get`, `set`, `remove`)
- **Rich JSDoc** with @example on every public API
- **20+ examples** organized by category
- **README** optimized for LLM consumption

### 7. NO EXTERNAL LINKS

- ✅ GitHub repository URL (github.com/coralcss/coralcss)
- ✅ Website (coralcss.com)
- ✅ npm package URL
- ❌ Social media (Twitter, LinkedIn, etc.)
- ❌ Discord/Slack links
- ❌ Email addresses
- ❌ Donation/sponsor links

---

## CORE ARCHITECTURE

### Kernel Design

The kernel is the heart of CoralCSS. It must be minimal and only handle:

```typescript
/**
 * CoralCSS Kernel - Minimal core that manages plugins and generates CSS.
 * 
 * @example
 * ```typescript
 * import { createCoral, presetCoral } from 'coralcss'
 * 
 * const coral = createCoral({
 *   presets: [presetCoral()]
 * })
 * 
 * const css = coral.generate(['p-4', 'bg-coral-500'])
 * ```
 */
export interface Kernel {
  /** Current configuration */
  readonly config: ResolvedConfig
  
  /** Registered plugins */
  readonly plugins: ReadonlyMap<string, Plugin>
  
  /** Register a plugin */
  use(plugin: Plugin): this
  
  /** Unregister a plugin by name */
  unregister(name: string): boolean
  
  /** Generate CSS from class names */
  generate(classes: string[]): string
  
  /** Generate CSS from HTML content */
  generateFromHTML(html: string): string
  
  /** Get all registered rules */
  getRules(): Rule[]
  
  /** Get all registered variants */
  getVariants(): Variant[]
  
  /** Reset the kernel state */
  reset(): void
}
```

### Plugin Interface

```typescript
/**
 * Plugin interface for extending CoralCSS functionality.
 * 
 * @typeParam TContext - Shared context type between plugins
 * 
 * @example
 * ```typescript
 * const myPlugin: Plugin = {
 *   name: 'my-plugin',
 *   version: '1.0.0',
 *   install(kernel) {
 *     kernel.addRule({
 *       pattern: /^custom-(\d+)$/,
 *       generate: (match) => ({ padding: `${match[1]}px` })
 *     })
 *   }
 * }
 * ```
 */
export interface Plugin {
  /** Unique plugin identifier (kebab-case) */
  name: string
  
  /** Semantic version (e.g., "1.0.0") */
  version: string
  
  /** Other plugins this plugin depends on */
  dependencies?: string[]
  
  /** Plugin priority (higher = runs first) */
  priority?: number
  
  /**
   * Called when plugin is registered.
   * @param kernel - The kernel instance with plugin API
   */
  install: (kernel: PluginAPI) => void
  
  /**
   * Called after all plugins are installed.
   */
  onReady?: () => void | Promise<void>
  
  /**
   * Called when plugin is unregistered.
   */
  onDestroy?: () => void | Promise<void>
  
  /**
   * Called on error in this plugin.
   * @param error - The error that occurred
   */
  onError?: (error: Error) => void
}

/**
 * API available to plugins during installation.
 */
export interface PluginAPI {
  /** Add a utility rule */
  addRule(rule: Rule): void
  
  /** Add multiple utility rules */
  addRules(rules: Rule[]): void
  
  /** Add a variant */
  addVariant(variant: Variant): void
  
  /** Add multiple variants */
  addVariants(variants: Variant[]): void
  
  /** Extend the theme */
  extendTheme(theme: DeepPartial<Theme>): void
  
  /** Add a component */
  addComponent(component: Component): void
  
  /** Get current theme value */
  theme<T = unknown>(path: string, fallback?: T): T
  
  /** Subscribe to kernel events */
  on(event: KernelEvent, handler: EventHandler): () => void
}
```

### Rule Interface

```typescript
/**
 * A rule defines how a class name is matched and converted to CSS.
 * 
 * @example
 * ```typescript
 * // Static rule
 * const paddingRule: Rule = {
 *   name: 'padding',
 *   pattern: /^p-(\d+)$/,
 *   generate: (match, theme) => ({
 *     padding: theme.spacing(match[1])
 *   })
 * }
 * 
 * // Dynamic rule with variants
 * const bgColorRule: Rule = {
 *   name: 'background-color',
 *   pattern: /^bg-([a-z]+)-(\d+)$/,
 *   generate: (match, theme) => ({
 *     backgroundColor: theme.colors[match[1]][match[2]]
 *   })
 * }
 * ```
 */
export interface Rule {
  /** Rule identifier */
  name: string
  
  /** Pattern to match class names */
  pattern: RegExp | string
  
  /** Generate CSS properties from match */
  generate: (match: RegExpMatchArray, theme: Theme) => CSSProperties | null
  
  /** Layer for this rule (default: utilities) */
  layer?: 'base' | 'components' | 'utilities'
  
  /** Rule priority (higher = more specific) */
  priority?: number
  
  /** Autocomplete suggestions */
  autocomplete?: string[] | ((theme: Theme) => string[])
}
```

### Variant Interface

```typescript
/**
 * A variant modifies how a utility is applied (e.g., hover, dark, responsive).
 * 
 * @example
 * ```typescript
 * const hoverVariant: Variant = {
 *   name: 'hover',
 *   match: /^hover:/,
 *   transform: (selector) => `${selector}:hover`
 * }
 * 
 * const darkVariant: Variant = {
 *   name: 'dark',
 *   match: /^dark:/,
 *   transform: (selector) => `.dark ${selector}`,
 *   // Or media query mode:
 *   // transform: (selector) => `@media (prefers-color-scheme: dark) { ${selector} }`
 * }
 * ```
 */
export interface Variant {
  /** Variant identifier */
  name: string
  
  /** Pattern to match variant prefix */
  match: RegExp | string
  
  /** Transform selector or wrap in at-rule */
  transform: (selector: string, css: string) => string
  
  /** Variant priority for ordering */
  priority?: number
  
  /** Whether this variant can be combined with others */
  combinable?: boolean
}
```

---

## CORE FEATURES

### 1. Utility Classes System

Complete utility class system covering all CSS properties:

#### Spacing
```typescript
// Pattern: {property}{side?}-{value}
// p-4, px-2, py-8, pt-1, pb-0, pl-auto, pr-px
// m-4, mx-auto, my-2, mt-0, mb-4, ml-8, mr-auto
// gap-4, gap-x-2, gap-y-8

const spacingScale = {
  '0': '0px',
  'px': '1px',
  '0.5': '0.125rem',
  '1': '0.25rem',
  '1.5': '0.375rem',
  '2': '0.5rem',
  '2.5': '0.625rem',
  '3': '0.75rem',
  '3.5': '0.875rem',
  '4': '1rem',
  '5': '1.25rem',
  '6': '1.5rem',
  '7': '1.75rem',
  '8': '2rem',
  '9': '2.25rem',
  '10': '2.5rem',
  '11': '2.75rem',
  '12': '3rem',
  '14': '3.5rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '28': '7rem',
  '32': '8rem',
  '36': '9rem',
  '40': '10rem',
  '44': '11rem',
  '48': '12rem',
  '52': '13rem',
  '56': '14rem',
  '60': '15rem',
  '64': '16rem',
  '72': '18rem',
  '80': '20rem',
  '96': '24rem',
}
```

#### Sizing
```typescript
// w-{value}, h-{value}, size-{value}
// min-w-{value}, max-w-{value}, min-h-{value}, max-h-{value}

const sizingScale = {
  ...spacingScale,
  'auto': 'auto',
  '1/2': '50%',
  '1/3': '33.333333%',
  '2/3': '66.666667%',
  '1/4': '25%',
  '2/4': '50%',
  '3/4': '75%',
  '1/5': '20%',
  '2/5': '40%',
  '3/5': '60%',
  '4/5': '80%',
  '1/6': '16.666667%',
  '5/6': '83.333333%',
  'full': '100%',
  'screen': '100vw', // or 100vh for height
  'svw': '100svw',
  'lvw': '100lvw',
  'dvw': '100dvw',
  'min': 'min-content',
  'max': 'max-content',
  'fit': 'fit-content',
}
```

#### Colors
```typescript
// bg-{color}-{shade}, text-{color}-{shade}, border-{color}-{shade}
// ring-{color}-{shade}, shadow-{color}-{shade}, accent-{color}-{shade}
// fill-{color}-{shade}, stroke-{color}-{shade}
// placeholder-{color}-{shade}, caret-{color}-{shade}

const colors = {
  // Coral brand colors
  coral: {
    50: '#fff5f5',
    100: '#ffe3e3',
    200: '#ffc9c9',
    300: '#ffa8a8',
    400: '#ff8787',
    500: '#ff6b6b',  // Primary
    600: '#fa5252',
    700: '#f03e3e',
    800: '#e03131',
    900: '#c92a2a',
    950: '#a51d1d',
  },
  
  // Neutral palette
  slate: { /* 50-950 */ },
  gray: { /* 50-950 */ },
  zinc: { /* 50-950 */ },
  neutral: { /* 50-950 */ },
  stone: { /* 50-950 */ },
  
  // Colors
  red: { /* 50-950 */ },
  orange: { /* 50-950 */ },
  amber: { /* 50-950 */ },
  yellow: { /* 50-950 */ },
  lime: { /* 50-950 */ },
  green: { /* 50-950 */ },
  emerald: { /* 50-950 */ },
  teal: { /* 50-950 */ },
  cyan: { /* 50-950 */ },
  sky: { /* 50-950 */ },
  blue: { /* 50-950 */ },
  indigo: { /* 50-950 */ },
  violet: { /* 50-950 */ },
  purple: { /* 50-950 */ },
  fuchsia: { /* 50-950 */ },
  pink: { /* 50-950 */ },
  rose: { /* 50-950 */ },
  
  // Semantic
  inherit: 'inherit',
  current: 'currentColor',
  transparent: 'transparent',
  black: '#000000',
  white: '#ffffff',
}
```

#### Typography
```typescript
// Font family: font-sans, font-serif, font-mono
// Font size: text-xs, text-sm, text-base, text-lg, text-xl, text-2xl...text-9xl
// Font weight: font-thin, font-light, font-normal, font-medium, font-semibold, font-bold, font-extrabold, font-black
// Line height: leading-none, leading-tight, leading-snug, leading-normal, leading-relaxed, leading-loose, leading-{number}
// Letter spacing: tracking-tighter, tracking-tight, tracking-normal, tracking-wide, tracking-wider, tracking-widest
// Text align: text-left, text-center, text-right, text-justify, text-start, text-end
// Text decoration: underline, overline, line-through, no-underline
// Text transform: uppercase, lowercase, capitalize, normal-case
// Text overflow: truncate, text-ellipsis, text-clip
// Text wrap: text-wrap, text-nowrap, text-balance, text-pretty
// Whitespace: whitespace-normal, whitespace-nowrap, whitespace-pre, whitespace-pre-line, whitespace-pre-wrap, whitespace-break-spaces
// Word break: break-normal, break-words, break-all, break-keep
// Hyphens: hyphens-none, hyphens-manual, hyphens-auto
```

#### Layout
```typescript
// Display: block, inline-block, inline, flex, inline-flex, grid, inline-grid, contents, flow-root, hidden
// Position: static, fixed, absolute, relative, sticky
// Inset: inset-{value}, inset-x-{value}, inset-y-{value}, top-{value}, right-{value}, bottom-{value}, left-{value}
// Z-index: z-0, z-10, z-20, z-30, z-40, z-50, z-auto, z-{any-number}
// Float: float-start, float-end, float-right, float-left, float-none
// Clear: clear-start, clear-end, clear-left, clear-right, clear-both, clear-none
// Isolation: isolate, isolation-auto
// Object fit: object-contain, object-cover, object-fill, object-none, object-scale-down
// Object position: object-bottom, object-center, object-left, object-left-bottom, ...
// Overflow: overflow-auto, overflow-hidden, overflow-clip, overflow-visible, overflow-scroll, overflow-x-*, overflow-y-*
// Overscroll: overscroll-auto, overscroll-contain, overscroll-none, overscroll-x-*, overscroll-y-*
// Visibility: visible, invisible, collapse
```

#### Flexbox
```typescript
// Flex direction: flex-row, flex-row-reverse, flex-col, flex-col-reverse
// Flex wrap: flex-wrap, flex-wrap-reverse, flex-nowrap
// Flex: flex-1, flex-auto, flex-initial, flex-none
// Flex grow: grow, grow-0
// Flex shrink: shrink, shrink-0
// Order: order-{number}, order-first, order-last, order-none
// Justify content: justify-normal, justify-start, justify-end, justify-center, justify-between, justify-around, justify-evenly, justify-stretch
// Justify items: justify-items-start, justify-items-end, justify-items-center, justify-items-stretch
// Justify self: justify-self-auto, justify-self-start, justify-self-end, justify-self-center, justify-self-stretch
// Align content: content-normal, content-center, content-start, content-end, content-between, content-around, content-evenly, content-baseline, content-stretch
// Align items: items-start, items-end, items-center, items-baseline, items-stretch
// Align self: self-auto, self-start, self-end, self-center, self-stretch, self-baseline
// Place content: place-content-center, place-content-start, place-content-end, place-content-between, place-content-around, place-content-evenly, place-content-baseline, place-content-stretch
// Place items: place-items-start, place-items-end, place-items-center, place-items-baseline, place-items-stretch
// Place self: place-self-auto, place-self-start, place-self-end, place-self-center, place-self-stretch
```

#### Grid
```typescript
// Grid template columns: grid-cols-{1-12}, grid-cols-none, grid-cols-subgrid
// Grid column span: col-auto, col-span-{1-12}, col-span-full, col-start-{1-13}, col-end-{1-13}
// Grid template rows: grid-rows-{1-12}, grid-rows-none, grid-rows-subgrid
// Grid row span: row-auto, row-span-{1-12}, row-span-full, row-start-{1-13}, row-end-{1-13}
// Grid auto flow: grid-flow-row, grid-flow-col, grid-flow-dense, grid-flow-row-dense, grid-flow-col-dense
// Grid auto columns: auto-cols-auto, auto-cols-min, auto-cols-max, auto-cols-fr
// Grid auto rows: auto-rows-auto, auto-rows-min, auto-rows-max, auto-rows-fr
```

#### Borders
```typescript
// Border width: border, border-0, border-2, border-4, border-8, border-{side}-{width}
// Border style: border-solid, border-dashed, border-dotted, border-double, border-hidden, border-none
// Border color: border-{color}-{shade}
// Border radius: rounded-none, rounded-sm, rounded, rounded-md, rounded-lg, rounded-xl, rounded-2xl, rounded-3xl, rounded-full
// Border radius sides: rounded-t-*, rounded-r-*, rounded-b-*, rounded-l-*, rounded-tl-*, rounded-tr-*, rounded-br-*, rounded-bl-*
// Border radius logical: rounded-s-*, rounded-e-*, rounded-ss-*, rounded-se-*, rounded-es-*, rounded-ee-*
// Divide: divide-x, divide-y, divide-x-reverse, divide-y-reverse, divide-{color}-{shade}, divide-solid, divide-dashed, divide-dotted, divide-double, divide-none
// Outline: outline-none, outline, outline-dashed, outline-dotted, outline-double, outline-{width}, outline-offset-{width}, outline-{color}-{shade}
// Ring: ring, ring-0, ring-1, ring-2, ring-4, ring-8, ring-inset, ring-{color}-{shade}, ring-offset-{width}, ring-offset-{color}-{shade}
```

#### Effects
```typescript
// Box shadow: shadow-sm, shadow, shadow-md, shadow-lg, shadow-xl, shadow-2xl, shadow-inner, shadow-none
// Box shadow color: shadow-{color}-{shade}
// Opacity: opacity-{0-100}
// Mix blend mode: mix-blend-normal, mix-blend-multiply, mix-blend-screen, mix-blend-overlay, mix-blend-darken, mix-blend-lighten, mix-blend-color-dodge, mix-blend-color-burn, mix-blend-hard-light, mix-blend-soft-light, mix-blend-difference, mix-blend-exclusion, mix-blend-hue, mix-blend-saturation, mix-blend-color, mix-blend-luminosity, mix-blend-plus-darker, mix-blend-plus-lighter
// Background blend mode: bg-blend-*
```

#### Filters
```typescript
// Blur: blur-none, blur-sm, blur, blur-md, blur-lg, blur-xl, blur-2xl, blur-3xl
// Brightness: brightness-{0-200}
// Contrast: contrast-{0-200}
// Drop shadow: drop-shadow-sm, drop-shadow, drop-shadow-md, drop-shadow-lg, drop-shadow-xl, drop-shadow-2xl, drop-shadow-none
// Grayscale: grayscale-0, grayscale
// Hue rotate: hue-rotate-{0-180}, -hue-rotate-{0-180}
// Invert: invert-0, invert
// Saturate: saturate-{0-200}
// Sepia: sepia-0, sepia
// Backdrop filter: backdrop-blur-*, backdrop-brightness-*, backdrop-contrast-*, backdrop-grayscale-*, backdrop-hue-rotate-*, backdrop-invert-*, backdrop-opacity-*, backdrop-saturate-*, backdrop-sepia-*
```

#### Transforms
```typescript
// Scale: scale-{0-200}, scale-x-*, scale-y-*
// Rotate: rotate-{0-360}, -rotate-{0-360}
// Translate: translate-x-{value}, translate-y-{value}, -translate-x-*, -translate-y-*
// Skew: skew-x-{0-12}, skew-y-{0-12}, -skew-x-*, -skew-y-*
// Transform origin: origin-center, origin-top, origin-top-right, origin-right, origin-bottom-right, origin-bottom, origin-bottom-left, origin-left, origin-top-left
```

#### Transitions & Animation
```typescript
// Transition property: transition-none, transition-all, transition, transition-colors, transition-opacity, transition-shadow, transition-transform
// Transition duration: duration-{0-1000}
// Transition timing function: ease-linear, ease-in, ease-out, ease-in-out
// Transition delay: delay-{0-1000}
// Animation: animate-none, animate-spin, animate-ping, animate-pulse, animate-bounce
// Will change: will-change-auto, will-change-scroll, will-change-contents, will-change-transform
```

#### Interactivity
```typescript
// Accent color: accent-{color}-{shade}, accent-auto
// Appearance: appearance-none, appearance-auto
// Cursor: cursor-auto, cursor-default, cursor-pointer, cursor-wait, cursor-text, cursor-move, cursor-help, cursor-not-allowed, cursor-none, cursor-context-menu, cursor-progress, cursor-cell, cursor-crosshair, cursor-vertical-text, cursor-alias, cursor-copy, cursor-no-drop, cursor-grab, cursor-grabbing, cursor-all-scroll, cursor-col-resize, cursor-row-resize, cursor-n-resize, cursor-e-resize, cursor-s-resize, cursor-w-resize, cursor-ne-resize, cursor-nw-resize, cursor-se-resize, cursor-sw-resize, cursor-ew-resize, cursor-ns-resize, cursor-nesw-resize, cursor-nwse-resize, cursor-zoom-in, cursor-zoom-out
// Caret color: caret-{color}-{shade}
// Pointer events: pointer-events-none, pointer-events-auto
// Resize: resize-none, resize-y, resize-x, resize
// Scroll behavior: scroll-auto, scroll-smooth
// Scroll margin: scroll-m-{value}, scroll-mx-*, scroll-my-*, scroll-mt-*, scroll-mr-*, scroll-mb-*, scroll-ml-*, scroll-ms-*, scroll-me-*
// Scroll padding: scroll-p-{value}, scroll-px-*, scroll-py-*, scroll-pt-*, scroll-pr-*, scroll-pb-*, scroll-pl-*, scroll-ps-*, scroll-pe-*
// Scroll snap align: snap-start, snap-end, snap-center, snap-align-none
// Scroll snap stop: snap-normal, snap-always
// Scroll snap type: snap-none, snap-x, snap-y, snap-both, snap-mandatory, snap-proximity
// Touch action: touch-auto, touch-none, touch-pan-x, touch-pan-left, touch-pan-right, touch-pan-y, touch-pan-up, touch-pan-down, touch-pinch-zoom, touch-manipulation
// User select: select-none, select-text, select-all, select-auto
```

### 2. Variant System

#### State Variants
```typescript
// Pseudo-class variants
'hover'       // :hover
'focus'       // :focus
'focus-within'// :focus-within
'focus-visible' // :focus-visible
'active'      // :active
'visited'     // :visited
'target'      // :target
'first'       // :first-child
'last'        // :last-child
'only'        // :only-child
'odd'         // :odd
'even'        // :even
'first-of-type' // :first-of-type
'last-of-type'  // :last-of-type
'only-of-type'  // :only-of-type
'empty'       // :empty
'disabled'    // :disabled
'enabled'     // :enabled
'checked'     // :checked
'indeterminate' // :indeterminate
'default'     // :default
'required'    // :required
'valid'       // :valid
'invalid'     // :invalid
'in-range'    // :in-range
'out-of-range'  // :out-of-range
'placeholder-shown' // :placeholder-shown
'autofill'    // :autofill
'read-only'   // :read-only
```

#### Pseudo-element Variants
```typescript
'before'      // ::before
'after'       // ::after
'first-letter'// ::first-letter
'first-line'  // ::first-line
'marker'      // ::marker
'selection'   // ::selection
'file'        // ::file-selector-button
'backdrop'    // ::backdrop
'placeholder' // ::placeholder
```

#### Responsive Variants
```typescript
// Mobile-first breakpoints
'sm'  // @media (min-width: 640px)
'md'  // @media (min-width: 768px)
'lg'  // @media (min-width: 1024px)
'xl'  // @media (min-width: 1280px)
'2xl' // @media (min-width: 1536px)

// Max-width variants
'max-sm'  // @media (max-width: 639px)
'max-md'  // @media (max-width: 767px)
'max-lg'  // @media (max-width: 1023px)
'max-xl'  // @media (max-width: 1279px)
'max-2xl' // @media (max-width: 1535px)

// Range variants
'sm-md'   // @media (min-width: 640px) and (max-width: 767px)
'md-lg'   // @media (min-width: 768px) and (max-width: 1023px)
// etc.
```

#### Theme Variants
```typescript
'dark'        // .dark & or @media (prefers-color-scheme: dark)
'light'       // .light & or @media (prefers-color-scheme: light)
```

#### Motion Variants
```typescript
'motion-safe'   // @media (prefers-reduced-motion: no-preference)
'motion-reduce' // @media (prefers-reduced-motion: reduce)
```

#### Print Variant
```typescript
'print'       // @media print
```

#### Container Query Variants
```typescript
'@sm'   // @container (min-width: 20rem)
'@md'   // @container (min-width: 28rem)
'@lg'   // @container (min-width: 32rem)
'@xl'   // @container (min-width: 36rem)
'@2xl'  // @container (min-width: 42rem)
'@3xl'  // @container (min-width: 48rem)
'@4xl'  // @container (min-width: 56rem)
'@5xl'  // @container (min-width: 64rem)
'@6xl'  // @container (min-width: 72rem)
'@7xl'  // @container (min-width: 80rem)
```

#### RTL/LTR Variants
```typescript
'rtl'   // [dir="rtl"] &
'ltr'   // [dir="ltr"] &
```

#### Group & Peer Variants
```typescript
'group-hover'   // .group:hover &
'group-focus'   // .group:focus &
'group-active'  // .group:active &
// ... all state variants

'peer-hover'    // .peer:hover ~ &
'peer-focus'    // .peer:focus ~ &
'peer-checked'  // .peer:checked ~ &
// ... all state variants
```

#### Aria Variants
```typescript
'aria-checked'    // &[aria-checked="true"]
'aria-disabled'   // &[aria-disabled="true"]
'aria-expanded'   // &[aria-expanded="true"]
'aria-hidden'     // &[aria-hidden="true"]
'aria-pressed'    // &[aria-pressed="true"]
'aria-readonly'   // &[aria-readonly="true"]
'aria-required'   // &[aria-required="true"]
'aria-selected'   // &[aria-selected="true"]
```

#### Data Attribute Variants
```typescript
'data-[state=open]'   // &[data-state="open"]
'data-[active]'       // &[data-active]
// Dynamic pattern matching
```

### 3. Modern CSS Utilities (FIRST-CLASS SUPPORT)

This is where CoralCSS truly differentiates from Tailwind. Full, first-class support for modern CSS features.

#### Anchor Positioning
```typescript
// Anchor definition
'anchor-[name]'        // anchor-name: --name;
'anchor-none'          // anchor-name: none;

// Anchor positioning
'anchored-[name]'      // position-anchor: --name;

// Position area (simplified anchor positioning)
'anchor-top'           // position-area: top;
'anchor-top-left'      // position-area: top left;
'anchor-top-right'     // position-area: top right;
'anchor-bottom'        // position-area: bottom;
'anchor-bottom-left'   // position-area: bottom left;
'anchor-bottom-right'  // position-area: bottom right;
'anchor-left'          // position-area: left;
'anchor-right'         // position-area: right;
'anchor-center'        // position-area: center;

// Anchor functions in arbitrary values
'top-[anchor(top)]'
'left-[anchor(center)]'
'bottom-[anchor(--tooltip,bottom)]'

// Anchor size
'w-[anchor-size(width)]'
'h-[anchor-size(height)]'

// Position fallback
'position-try-[flip-block]'
'position-try-[flip-inline]'
'position-try-[flip-block,flip-inline]'
```

#### Container Queries
```typescript
// Container definition
'@container'           // container-type: inline-size;
'@container/[name]'    // container-type: inline-size; container-name: name;
'@container-normal'    // container-type: normal;

// Container query variants (already listed above)
// @sm, @md, @lg, @xl, @2xl, @3xl, @4xl, @5xl, @6xl, @7xl

// Named container queries
'@[sidebar]/sm'        // @container sidebar (min-width: 20rem)

// Container query units
'w-[50cqw]'            // width: 50cqw;
'h-[100cqh]'           // height: 100cqh;
'text-[5cqi]'          // font-size: 5cqi;
```

#### :has() Selector
```typescript
// Has variant
'has-[img]'            // &:has(img)
'has-[>img]'           // &:has(> img)
'has-[:checked]'       // &:has(:checked)
'has-[input:focus]'    // &:has(input:focus)

// Group has
'group-has-[img]'      // .group:has(img) &
'peer-has-[:checked]'  // .peer:has(:checked) ~ &
```

#### @scope
```typescript
// Scope definition
'@scope'               // Creates scoped context
'scope-[.card]'        // @scope (.card) { & { ... } }
'scope-to-[.content]'  // @scope (.card) to (.content) { & { ... } }
```

#### Scroll-Driven Animations
```typescript
// View timeline
'view-timeline-[name]'        // view-timeline-name: --name;
'view-timeline-x'             // view-timeline-axis: x;
'view-timeline-y'             // view-timeline-axis: y;
'view-timeline-block'         // view-timeline-axis: block;
'view-timeline-inline'        // view-timeline-axis: inline;

// Scroll timeline
'scroll-timeline-[name]'      // scroll-timeline-name: --name;
'scroll-timeline-root'        // scroll-timeline-axis: root;
'scroll-timeline-nearest'     // scroll-timeline: nearest;
'scroll-timeline-self'        // scroll-timeline: self;

// Animation timeline
'animate-scroll'              // animation-timeline: scroll();
'animate-view'                // animation-timeline: view();
'animate-timeline-[name]'     // animation-timeline: --name;

// Animation range
'animate-range-cover'         // animation-range: cover;
'animate-range-contain'       // animation-range: contain;
'animate-range-entry'         // animation-range: entry;
'animate-range-exit'          // animation-range: exit;
'animate-range-[entry_25%]'   // animation-range: entry 25%;

// Preset scroll animations
'scroll-fade-in'              // Fade in on scroll into view
'scroll-fade-out'             // Fade out on scroll out of view
'scroll-slide-up'             // Slide up on scroll
'scroll-slide-down'           // Slide down on scroll
'scroll-scale-in'             // Scale up on scroll into view
'scroll-reveal'               // Combined reveal effect
```

#### View Transitions
```typescript
// View transition name
'view-transition-[name]'      // view-transition-name: name;
'view-transition-none'        // view-transition-name: none;

// View transition class
'view-transition-old'         // ::view-transition-old(*)
'view-transition-new'         // ::view-transition-new(*)

// View transition group
'view-transition-group-[name]'  // view-transition-group: name;
'view-transition-group-nearest' // view-transition-group: nearest;
'view-transition-group-contain' // view-transition-group: contain;

// Preset transitions
'vt-fade'                     // View transition with fade
'vt-slide-left'               // Slide from left
'vt-slide-right'              // Slide from right
'vt-slide-up'                 // Slide from top
'vt-slide-down'               // Slide from bottom
'vt-scale'                    // Scale transition
```

#### CSS Nesting (Output format)
```typescript
// CoralCSS generates properly nested CSS:
.card {
  background: white;
  
  & .title {
    font-size: 1.5rem;
  }
  
  &:hover {
    background: #f5f5f5;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
}
```

#### Logical Properties
```typescript
// Margin logical
'ms-{value}'           // margin-inline-start
'me-{value}'           // margin-inline-end
'mbs-{value}'          // margin-block-start
'mbe-{value}'          // margin-block-end

// Padding logical
'ps-{value}'           // padding-inline-start
'pe-{value}'           // padding-inline-end
'pbs-{value}'          // padding-block-start
'pbe-{value}'          // padding-block-end

// Inset logical
'inset-inline-{value}'
'inset-block-{value}'
'start-{value}'        // inset-inline-start
'end-{value}'          // inset-inline-end

// Border logical
'border-s-{value}'     // border-inline-start
'border-e-{value}'     // border-inline-end
'border-bs-{value}'    // border-block-start
'border-be-{value}'    // border-block-end

// Border radius logical
'rounded-ss-{value}'   // border-start-start-radius
'rounded-se-{value}'   // border-start-end-radius
'rounded-es-{value}'   // border-end-start-radius
'rounded-ee-{value}'   // border-end-end-radius

// Size logical
'inline-size-{value}'
'block-size-{value}'
'min-inline-size-{value}'
'max-inline-size-{value}'
'min-block-size-{value}'
'max-block-size-{value}'
```

#### Subgrid
```typescript
'grid-cols-subgrid'    // grid-template-columns: subgrid;
'grid-rows-subgrid'    // grid-template-rows: subgrid;
```

#### Color Functions
```typescript
// color-mix
'bg-[color-mix(in_oklch,red,blue)]'
'text-[color-mix(in_srgb,var(--primary)_70%,white)]'

// light-dark
'bg-[light-dark(white,#1a1a1a)]'
'text-[light-dark(#333,#eee)]'

// oklch colors
'bg-[oklch(70%_0.15_250)]'
'text-[oklch(40%_0.2_30)]'

// Relative color syntax
'bg-[from_var(--primary)_oklch(calc(l+10%)_c_h)]'
```

#### Popover API Utilities
```typescript
'popover'              // popover attribute styling base
'popover-open'         // &:popover-open
'popover-manual'       // For manual popovers
```

### 4. Variant Groups (Unique to CoralCSS)

Tailwind doesn't have this - group multiple utilities under one variant:

```html
<!-- Instead of this (Tailwind) -->
<div class="hover:bg-red-500 hover:text-white hover:scale-105 hover:shadow-lg">

<!-- Write this (CoralCSS) -->
<div class="hover:(bg-red-500 text-white scale-105 shadow-lg)">
```

Implementation:
```typescript
// Pattern: variant:(utility1 utility2 utility3)
// Expands to: variant:utility1 variant:utility2 variant:utility3

// Multiple variants can be grouped
<div class="dark:hover:(bg-gray-800 text-white)">
<div class="sm:lg:(grid-cols-2 gap-4)">
<div class="focus-within:has-[:invalid]:(border-red-500 ring-red-500)">
```

### 5. Attributify Mode (Unique to CoralCSS)

Alternative syntax using HTML attributes:

```html
<!-- Traditional class syntax -->
<button class="bg-coral-500 hover:bg-coral-600 text-white px-4 py-2 rounded-lg shadow-md">
  Click me
</button>

<!-- Attributify mode -->
<button
  bg="coral-500 hover:coral-600"
  text="white"
  p="x-4 y-2"
  rounded="lg"
  shadow="md"
>
  Click me
</button>
```

Supported attribute groups:
```typescript
const attributifyGroups = {
  // Spacing
  p: 'padding',
  m: 'margin',
  
  // Sizing
  w: 'width',
  h: 'height',
  size: 'width/height',
  
  // Colors
  bg: 'background',
  text: 'text/color',
  border: 'border',
  ring: 'ring',
  shadow: 'shadow',
  
  // Typography
  font: 'font',
  leading: 'line-height',
  tracking: 'letter-spacing',
  
  // Layout
  flex: 'flex',
  grid: 'grid',
  gap: 'gap',
  
  // Position
  pos: 'position',
  inset: 'inset',
  z: 'z-index',
  
  // Effects
  opacity: 'opacity',
  blur: 'blur',
  
  // Borders
  rounded: 'border-radius',
  
  // Transitions
  transition: 'transition',
  duration: 'duration',
  ease: 'timing-function',
  delay: 'delay',
  
  // Transforms
  scale: 'scale',
  rotate: 'rotate',
  translate: 'translate',
}
```

### 6. Theming System

```typescript
/**
 * Create a custom theme for CoralCSS.
 * 
 * @example
 * ```typescript
 * const coral = createCoral({
 *   theme: {
 *     colors: {
 *       brand: {
 *         50: '#fff5f5',
 *         500: '#ff6b6b',
 *         900: '#c92a2a',
 *       }
 *     },
 *     spacing: {
 *       'header': '4rem',
 *       'sidebar': '16rem',
 *     },
 *     fonts: {
 *       display: ['Cal Sans', 'sans-serif'],
 *     }
 *   }
 * })
 * ```
 */
export interface Theme {
  colors: ColorScale
  spacing: SpacingScale
  sizing: SizingScale
  fonts: FontFamilies
  fontSizes: FontSizeScale
  fontWeights: FontWeightScale
  lineHeights: LineHeightScale
  letterSpacing: LetterSpacingScale
  borderRadius: BorderRadiusScale
  borderWidth: BorderWidthScale
  boxShadow: BoxShadowScale
  opacity: OpacityScale
  zIndex: ZIndexScale
  transitionDuration: DurationScale
  transitionTimingFunction: EasingScale
  animation: AnimationScale
  screens: ScreensConfig
  containers: ContainerConfig
}

// CSS Variables output
:root {
  /* Colors */
  --coral-50: #fff5f5;
  --coral-500: #ff6b6b;
  --coral-900: #c92a2a;
  
  /* Spacing */
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-4: 1rem;
  
  /* Fonts */
  --font-sans: ui-sans-serif, system-ui, sans-serif;
  --font-serif: ui-serif, Georgia, serif;
  --font-mono: ui-monospace, monospace;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  
  /* And more... */
}

// Dark mode
.dark {
  --coral-50: #1a0505;
  --coral-500: #ff8585;
  --coral-900: #ffb3b3;
  /* Inverted color scales for dark mode */
}
```

### 7. Dark Mode

Multiple dark mode strategies:

```typescript
const coral = createCoral({
  darkMode: 'class',      // .dark class on html/body
  // OR
  darkMode: 'media',      // prefers-color-scheme media query
  // OR
  darkMode: 'selector',   // Custom selector
  darkModeSelector: '[data-theme="dark"]',
})

// Auto dark mode - automatically inverts color scales
const coral = createCoral({
  darkMode: 'auto',       // Generates both class and media query
})
```

---

## HEADLESS COMPONENTS

CoralCSS includes framework-agnostic headless components. These provide:
- Accessibility (ARIA attributes, keyboard navigation)
- State management
- Focus management
- No default styling (bring your own classes)

### Component Architecture

```typescript
/**
 * Base component interface for all headless components.
 */
export interface HeadlessComponent<TElement extends HTMLElement> {
  /** Unique component instance ID */
  readonly id: string
  
  /** Root element reference */
  readonly element: TElement | null
  
  /** Component state */
  readonly state: ComponentState
  
  /** Mount component to DOM */
  mount(container: HTMLElement | string): void
  
  /** Unmount and cleanup */
  unmount(): void
  
  /** Update component props */
  update(props: Partial<ComponentProps>): void
  
  /** Subscribe to state changes */
  subscribe(listener: StateListener): () => void
  
  /** Destroy component instance */
  destroy(): void
}
```

### Dialog Component

```typescript
/**
 * Accessible modal dialog component.
 * 
 * Features:
 * - Focus trap
 * - Escape key closes
 * - Click outside closes (optional)
 * - Scroll lock on body
 * - ARIA attributes
 * - Nested dialogs support
 * 
 * @example
 * ```typescript
 * import { Dialog } from 'coralcss/components'
 * 
 * const dialog = Dialog.create({
 *   id: 'my-dialog',
 *   closeOnEscape: true,
 *   closeOnOutsideClick: true,
 *   onOpen: () => console.log('opened'),
 *   onClose: () => console.log('closed'),
 * })
 * 
 * // Open programmatically
 * dialog.open()
 * 
 * // Close programmatically
 * dialog.close()
 * ```
 * 
 * @example HTML usage
 * ```html
 * <button data-coral-dialog-trigger="my-dialog">Open Dialog</button>
 * 
 * <div data-coral-dialog="my-dialog" class="hidden">
 *   <div data-coral-dialog-backdrop class="fixed inset-0 bg-black/50"></div>
 *   <div data-coral-dialog-content class="fixed inset-4 bg-white rounded-lg p-6">
 *     <h2 data-coral-dialog-title>Dialog Title</h2>
 *     <p data-coral-dialog-description>Dialog content here</p>
 *     <button data-coral-dialog-close>Close</button>
 *   </div>
 * </div>
 * ```
 */
export interface DialogComponent extends HeadlessComponent<HTMLDivElement> {
  open(): void
  close(): void
  toggle(): void
  readonly isOpen: boolean
}

export interface DialogProps {
  id: string
  closeOnEscape?: boolean
  closeOnOutsideClick?: boolean
  initialOpen?: boolean
  modal?: boolean
  onOpen?: () => void
  onClose?: () => void
}
```

### Dropdown Component

```typescript
/**
 * Accessible dropdown menu with anchor positioning.
 * 
 * Features:
 * - Anchor positioning (uses CSS anchor API with fallback)
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Focus management
 * - Typeahead search
 * - Submenus support
 * - ARIA attributes
 * 
 * @example
 * ```html
 * <div data-coral-dropdown="user-menu">
 *   <button data-coral-dropdown-trigger class="btn">
 *     Menu
 *   </button>
 *   <div data-coral-dropdown-content class="bg-white shadow-lg rounded-lg">
 *     <button data-coral-dropdown-item>Profile</button>
 *     <button data-coral-dropdown-item>Settings</button>
 *     <hr data-coral-dropdown-separator />
 *     <button data-coral-dropdown-item>Logout</button>
 *   </div>
 * </div>
 * ```
 */
export interface DropdownComponent extends HeadlessComponent<HTMLDivElement> {
  open(): void
  close(): void
  toggle(): void
  focusItem(index: number): void
  readonly isOpen: boolean
  readonly activeIndex: number
}

export interface DropdownProps {
  id: string
  placement?: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
  offset?: number
  closeOnSelect?: boolean
  closeOnOutsideClick?: boolean
  loop?: boolean
  onOpen?: () => void
  onClose?: () => void
  onSelect?: (item: HTMLElement) => void
}
```

### Tabs Component

```typescript
/**
 * Accessible tabs component.
 * 
 * Features:
 * - Automatic/manual activation modes
 * - Keyboard navigation
 * - Vertical/horizontal orientation
 * - ARIA attributes
 * - Tab panel lazy rendering support
 * 
 * @example
 * ```html
 * <div data-coral-tabs="settings">
 *   <div data-coral-tabs-list role="tablist" class="flex gap-2">
 *     <button data-coral-tab="general" class="tab">General</button>
 *     <button data-coral-tab="security" class="tab">Security</button>
 *     <button data-coral-tab="notifications" class="tab">Notifications</button>
 *   </div>
 *   <div data-coral-tab-panel="general" class="panel">
 *     General settings content
 *   </div>
 *   <div data-coral-tab-panel="security" class="panel hidden">
 *     Security settings content
 *   </div>
 *   <div data-coral-tab-panel="notifications" class="panel hidden">
 *     Notifications settings content
 *   </div>
 * </div>
 * ```
 */
export interface TabsComponent extends HeadlessComponent<HTMLDivElement> {
  selectTab(id: string): void
  readonly activeTab: string
  readonly tabs: string[]
}

export interface TabsProps {
  id: string
  defaultTab?: string
  orientation?: 'horizontal' | 'vertical'
  activationMode?: 'automatic' | 'manual'
  loop?: boolean
  onChange?: (tabId: string) => void
}
```

### Accordion Component

```typescript
/**
 * Accessible accordion component.
 * 
 * @example
 * ```html
 * <div data-coral-accordion="faq">
 *   <div data-coral-accordion-item="q1">
 *     <button data-coral-accordion-trigger class="w-full text-left">
 *       What is CoralCSS?
 *     </button>
 *     <div data-coral-accordion-content class="overflow-hidden">
 *       CoralCSS is a modern CSS framework...
 *     </div>
 *   </div>
 *   <div data-coral-accordion-item="q2">
 *     <button data-coral-accordion-trigger>
 *       How do I install it?
 *     </button>
 *     <div data-coral-accordion-content>
 *       npm install coralcss
 *     </div>
 *   </div>
 * </div>
 * ```
 */
export interface AccordionComponent extends HeadlessComponent<HTMLDivElement> {
  expand(itemId: string): void
  collapse(itemId: string): void
  toggle(itemId: string): void
  expandAll(): void
  collapseAll(): void
  readonly expandedItems: string[]
}

export interface AccordionProps {
  id: string
  type?: 'single' | 'multiple'
  collapsible?: boolean
  defaultExpanded?: string | string[]
  onChange?: (expandedItems: string[]) => void
}
```

### Tooltip Component

```typescript
/**
 * Accessible tooltip with anchor positioning.
 * 
 * @example
 * ```html
 * <button 
 *   data-coral-tooltip-trigger="help"
 *   aria-describedby="help-tooltip"
 * >
 *   Help
 * </button>
 * <div 
 *   data-coral-tooltip="help" 
 *   id="help-tooltip"
 *   role="tooltip"
 *   class="bg-gray-900 text-white px-2 py-1 rounded text-sm"
 * >
 *   Click for more information
 * </div>
 * ```
 */
export interface TooltipComponent extends HeadlessComponent<HTMLDivElement> {
  show(): void
  hide(): void
  readonly isVisible: boolean
}

export interface TooltipProps {
  id: string
  placement?: Placement
  offset?: number
  delay?: number
  hideDelay?: number
}
```

### Popover Component

```typescript
/**
 * Accessible popover with anchor positioning.
 * 
 * Uses native Popover API when available with CSS anchor positioning.
 */
export interface PopoverComponent extends HeadlessComponent<HTMLDivElement> {
  show(): void
  hide(): void
  toggle(): void
  readonly isOpen: boolean
}

export interface PopoverProps {
  id: string
  placement?: Placement
  offset?: number
  closeOnOutsideClick?: boolean
  closeOnEscape?: boolean
  modal?: boolean
}
```

### Toast Component

```typescript
/**
 * Toast notification system.
 * 
 * @example
 * ```typescript
 * import { toast } from 'coralcss/components'
 * 
 * // Show success toast
 * toast.success('Profile updated!')
 * 
 * // Show error toast
 * toast.error('Something went wrong')
 * 
 * // Show with options
 * toast.show({
 *   message: 'Custom toast',
 *   type: 'info',
 *   duration: 5000,
 *   position: 'top-right',
 * })
 * ```
 */
export interface ToastSystem {
  show(options: ToastOptions): string
  success(message: string, options?: Partial<ToastOptions>): string
  error(message: string, options?: Partial<ToastOptions>): string
  warning(message: string, options?: Partial<ToastOptions>): string
  info(message: string, options?: Partial<ToastOptions>): string
  dismiss(id: string): void
  dismissAll(): void
}

export interface ToastOptions {
  message: string
  type?: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'
  dismissible?: boolean
  onDismiss?: () => void
}
```

### Switch Component

```typescript
/**
 * Accessible toggle switch.
 */
export interface SwitchComponent extends HeadlessComponent<HTMLButtonElement> {
  toggle(): void
  check(): void
  uncheck(): void
  readonly isChecked: boolean
}
```

### Select Component

```typescript
/**
 * Accessible custom select dropdown.
 */
export interface SelectComponent extends HeadlessComponent<HTMLDivElement> {
  open(): void
  close(): void
  select(value: string): void
  readonly isOpen: boolean
  readonly value: string
  readonly selectedOption: HTMLElement | null
}
```

### Combobox Component

```typescript
/**
 * Accessible combobox with autocomplete.
 */
export interface ComboboxComponent extends HeadlessComponent<HTMLDivElement> {
  open(): void
  close(): void
  select(value: string): void
  filter(query: string): void
  readonly isOpen: boolean
  readonly value: string
  readonly query: string
}
```

---

## PLUGIN SYSTEM

### Core Plugins

```typescript
// @core/utilities - All utility classes
// @core/variants - All variant processors
// @core/modern - Modern CSS features
// @core/theming - Theme system
```

### Optional Plugins

```typescript
/**
 * Icons plugin - Iconify integration.
 * 
 * @example
 * ```typescript
 * import { createCoral } from 'coralcss'
 * import { iconsPlugin } from 'coralcss/plugins/icons'
 * 
 * const coral = createCoral({
 *   plugins: [
 *     iconsPlugin({
 *       collections: ['lucide', 'heroicons', 'mdi'],
 *       scale: 1.2,
 *     })
 *   ]
 * })
 * ```
 * 
 * @example Usage
 * ```html
 * <span class="i-lucide-home"></span>
 * <span class="i-heroicons-user w-6 h-6"></span>
 * ```
 */
export interface IconsPluginOptions {
  collections?: string[]
  scale?: number
  extraProperties?: Record<string, string>
}

/**
 * Typography plugin - Prose styling.
 * 
 * @example
 * ```html
 * <article class="prose prose-lg dark:prose-invert">
 *   <h1>Article Title</h1>
 *   <p>Content goes here...</p>
 * </article>
 * ```
 */
export interface TypographyPluginOptions {
  className?: string
  modifiers?: string[]
}

/**
 * Forms plugin - Form element styling.
 */
export interface FormsPluginOptions {
  strategy?: 'base' | 'class'
}

/**
 * Animations plugin - Extended animation library.
 * 
 * @example
 * ```html
 * <div class="animate-fade-in">Fades in</div>
 * <div class="animate-slide-up">Slides up</div>
 * <div class="animate-bounce-in">Bounces in</div>
 * <div class="animate-shake">Shakes</div>
 * ```
 */
export interface AnimationsPluginOptions {
  prefix?: string
}

/**
 * Attributify plugin - Attribute-based class syntax.
 */
export interface AttributifyPluginOptions {
  prefix?: string
  strict?: boolean
  ignoreAttributes?: string[]
}

/**
 * Components plugin - Headless component classes.
 */
export interface ComponentsPluginOptions {
  prefix?: string
}
```

### Preset System

```typescript
/**
 * Preset Coral - Default recommended preset.
 * Includes all core utilities, variants, and modern CSS features.
 */
export function presetCoral(options?: PresetCoralOptions): Preset

/**
 * Preset Wind - Tailwind CSS compatible preset.
 * Drop-in replacement for Tailwind projects.
 */
export function presetWind(options?: PresetWindOptions): Preset

/**
 * Preset Mini - Minimal utilities only.
 * Smallest bundle size for simple projects.
 */
export function presetMini(options?: PresetMiniOptions): Preset

/**
 * Preset Full - Everything included.
 * All utilities, all plugins, all features.
 */
export function presetFull(options?: PresetFullOptions): Preset
```

---

## TECHNICAL REQUIREMENTS

| Requirement | Value |
|-------------|-------|
| Runtime | Universal (Node.js + Browser) |
| Module Format | ESM + CJS |
| Node.js Version | >= 18 |
| TypeScript Version | >= 5.0 |
| Bundle Size (core) | < 8KB gzipped |
| Bundle Size (with plugins) | < 20KB gzipped |

### Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |
| iOS Safari | 15+ |
| Android Chrome | 90+ |

Graceful degradation for older browsers with automatic feature detection.

---

## INTEGRATION MODES

### 1. Runtime Mode (CDN)

```html
<!-- Add to <head> -->
<script src="https://cdn.coralcss.com/coral.min.js"></script>

<!-- Use immediately -->
<div class="p-4 bg-coral-500 text-white rounded-lg">
  Hello CoralCSS!
</div>

<!-- With config -->
<script>
  Coral.configure({
    theme: {
      colors: {
        brand: '#FF6B6B'
      }
    }
  })
</script>
```

### 2. Vite Plugin

```typescript
// vite.config.ts
import coral from 'coralcss/vite'

export default {
  plugins: [
    coral({
      // Options
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
      presets: [presetCoral()],
      theme: {
        // Custom theme
      }
    })
  ]
}
```

### 3. PostCSS Plugin

```javascript
// postcss.config.js
module.exports = {
  plugins: {
    'coralcss/postcss': {
      content: ['./src/**/*.html'],
    }
  }
}
```

### 4. CLI

```bash
# Scan and generate CSS
npx coralcss build --input ./src --output ./dist/coral.css

# Watch mode
npx coralcss watch --input ./src --output ./dist/coral.css

# Generate config file
npx coralcss init
```

### 5. Programmatic API

```typescript
import { createCoral, presetCoral } from 'coralcss'

const coral = createCoral({
  presets: [presetCoral()],
})

// Generate CSS from class names
const css = coral.generate(['p-4', 'bg-coral-500', 'hover:bg-coral-600'])

// Generate from HTML
const cssFromHtml = coral.generateFromHTML(`
  <div class="flex items-center gap-4">
    <button class="btn bg-coral-500">Click</button>
  </div>
`)
```

---

## PROJECT STRUCTURE

```
coralcss/
├── .github/
│   └── workflows/
│       └── deploy.yml              # Website deploy only
├── src/
│   ├── index.ts                    # Main entry, public exports
│   ├── kernel.ts                   # Micro kernel core
│   ├── types.ts                    # Type definitions
│   ├── errors.ts                   # Custom error classes
│   ├── core/
│   │   ├── generator.ts            # CSS generation engine
│   │   ├── parser.ts               # Class name parser
│   │   ├── matcher.ts              # Rule pattern matching
│   │   ├── transformer.ts          # CSS transformation
│   │   ├── cache.ts                # CSS caching
│   │   └── extractor.ts            # Class extraction from content
│   ├── runtime/
│   │   ├── index.ts                # Runtime mode entry
│   │   ├── observer.ts             # MutationObserver for runtime
│   │   ├── injector.ts             # Style injection
│   │   └── cdn.ts                  # CDN bundle
│   ├── build/
│   │   ├── vite.ts                 # Vite plugin
│   │   ├── postcss.ts              # PostCSS plugin
│   │   └── cli.ts                  # CLI tool
│   ├── plugins/
│   │   ├── index.ts                # Plugin exports
│   │   ├── core/
│   │   │   ├── utilities.ts        # Core utility rules
│   │   │   ├── variants.ts         # Core variant processors
│   │   │   ├── modern.ts           # Modern CSS features
│   │   │   └── theming.ts          # Theme system
│   │   └── optional/
│   │       ├── icons.ts            # Icons plugin
│   │       ├── typography.ts       # Typography plugin
│   │       ├── forms.ts            # Forms plugin
│   │       ├── animations.ts       # Animations plugin
│   │       ├── attributify.ts      # Attributify mode
│   │       └── components.ts       # Component utilities
│   ├── presets/
│   │   ├── index.ts                # Preset exports
│   │   ├── coral.ts                # Default preset
│   │   ├── wind.ts                 # Tailwind-compatible preset
│   │   ├── mini.ts                 # Minimal preset
│   │   └── full.ts                 # Full preset
│   ├── components/
│   │   ├── index.ts                # Component exports
│   │   ├── base.ts                 # Base component class
│   │   ├── dialog.ts               # Dialog component
│   │   ├── dropdown.ts             # Dropdown component
│   │   ├── tabs.ts                 # Tabs component
│   │   ├── accordion.ts            # Accordion component
│   │   ├── tooltip.ts              # Tooltip component
│   │   ├── popover.ts              # Popover component
│   │   ├── toast.ts                # Toast component
│   │   ├── switch.ts               # Switch component
│   │   ├── select.ts               # Select component
│   │   ├── combobox.ts             # Combobox component
│   │   ├── menu.ts                 # Menu component
│   │   ├── slider.ts               # Slider component
│   │   ├── progress.ts             # Progress component
│   │   ├── avatar.ts               # Avatar utilities
│   │   ├── badge.ts                # Badge utilities
│   │   └── sheet.ts                # Sheet/drawer component
│   ├── theme/
│   │   ├── index.ts                # Theme exports
│   │   ├── default.ts              # Default theme values
│   │   ├── colors.ts               # Color palettes
│   │   ├── spacing.ts              # Spacing scale
│   │   ├── typography.ts           # Typography scale
│   │   └── dark.ts                 # Dark mode utilities
│   └── utils/
│       ├── index.ts                # Utility exports
│       ├── css.ts                  # CSS utilities
│       ├── color.ts                # Color utilities
│       ├── string.ts               # String utilities
│       ├── dom.ts                  # DOM utilities (runtime)
│       └── regex.ts                # Regex utilities
├── tests/
│   ├── unit/
│   │   ├── kernel.test.ts
│   │   ├── generator.test.ts
│   │   ├── parser.test.ts
│   │   ├── plugins/
│   │   │   ├── utilities.test.ts
│   │   │   ├── variants.test.ts
│   │   │   └── modern.test.ts
│   │   └── components/
│   │       ├── dialog.test.ts
│   │       ├── dropdown.test.ts
│   │       └── ...
│   ├── integration/
│   │   ├── vite.test.ts
│   │   ├── postcss.test.ts
│   │   └── cli.test.ts
│   ├── e2e/
│   │   ├── runtime.test.ts
│   │   └── components.test.ts
│   └── fixtures/
│       ├── html/
│       ├── expected/
│       └── themes/
├── examples/
│   ├── 01-basic/
│   │   ├── cdn-usage/
│   │   ├── vite-project/
│   │   └── postcss-project/
│   ├── 02-utilities/
│   │   ├── spacing/
│   │   ├── colors/
│   │   ├── typography/
│   │   └── layout/
│   ├── 03-variants/
│   │   ├── responsive/
│   │   ├── states/
│   │   ├── dark-mode/
│   │   └── container-queries/
│   ├── 04-modern-css/
│   │   ├── anchor-positioning/
│   │   ├── has-selector/
│   │   ├── scroll-driven/
│   │   └── view-transitions/
│   ├── 05-components/
│   │   ├── dialog/
│   │   ├── dropdown/
│   │   ├── tabs/
│   │   └── toast/
│   ├── 06-theming/
│   │   ├── custom-theme/
│   │   ├── dark-mode/
│   │   └── multiple-themes/
│   ├── 07-plugins/
│   │   ├── icons/
│   │   ├── typography/
│   │   └── attributify/
│   ├── 08-integrations/
│   │   ├── react/
│   │   ├── vue/
│   │   ├── svelte/
│   │   └── astro/
│   └── 09-real-world/
│       ├── landing-page/
│       ├── dashboard/
│       └── e-commerce/
├── website/                        # React + Vite docs site
│   ├── public/
│   │   ├── CNAME                   # coralcss.com
│   │   └── llms.txt                # Copied from root
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── index.tsx           # Home
│   │   │   ├── docs/
│   │   │   │   ├── getting-started.tsx
│   │   │   │   ├── utilities/
│   │   │   │   ├── variants/
│   │   │   │   ├── modern-css/
│   │   │   │   ├── components/
│   │   │   │   ├── theming/
│   │   │   │   └── plugins/
│   │   │   └── examples/
│   │   └── styles/
│   ├── package.json
│   └── vite.config.ts
├── llms.txt                        # LLM-optimized reference
├── SPECIFICATION.md                # Package spec
├── IMPLEMENTATION.md               # Architecture design
├── TASKS.md                        # Task breakdown
├── README.md                       # Human + LLM optimized
├── CHANGELOG.md
├── LICENSE
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vitest.config.ts
└── .gitignore
```

---

## CONFIG FILES

### tsup.config.ts

```typescript
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
    clean: true,
    treeshake: true,
    minify: false,
    external: ['vite', 'postcss'],
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
  },
])
```

### vitest.config.ts

```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: ['tests/**/*.test.ts'],
    exclude: ['tests/e2e/**'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        'website/',
        'examples/',
        '*.config.*',
        'src/runtime/cdn.ts',
      ],
      thresholds: {
        lines: 100,
        functions: 100,
        branches: 100,
        statements: 100,
      },
    },
  },
})
```

### package.json

```json
{
  "name": "coralcss",
  "version": "1.0.0",
  "description": "A modern, zero-dependency CSS framework with utility classes, headless components, and first-class support for cutting-edge CSS features.",
  "type": "module",
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/index.js"
      },
      "require": {
        "types": "./dist/index.d.cts",
        "default": "./dist/index.cjs"
      }
    },
    "./runtime": {
      "import": {
        "types": "./dist/runtime.d.ts",
        "default": "./dist/runtime.js"
      },
      "require": {
        "types": "./dist/runtime.d.cts",
        "default": "./dist/runtime.cjs"
      }
    },
    "./vite": {
      "import": {
        "types": "./dist/vite.d.ts",
        "default": "./dist/vite.js"
      },
      "require": {
        "types": "./dist/vite.d.cts",
        "default": "./dist/vite.cjs"
      }
    },
    "./postcss": {
      "import": {
        "types": "./dist/postcss.d.ts",
        "default": "./dist/postcss.js"
      },
      "require": {
        "types": "./dist/postcss.d.cts",
        "default": "./dist/postcss.cjs"
      }
    },
    "./plugins": {
      "import": {
        "types": "./dist/plugins/index.d.ts",
        "default": "./dist/plugins/index.js"
      },
      "require": {
        "types": "./dist/plugins/index.d.cts",
        "default": "./dist/plugins/index.cjs"
      }
    },
    "./plugins/*": {
      "import": {
        "types": "./dist/plugins/*.d.ts",
        "default": "./dist/plugins/*.js"
      },
      "require": {
        "types": "./dist/plugins/*.d.cts",
        "default": "./dist/plugins/*.cjs"
      }
    },
    "./presets": {
      "import": {
        "types": "./dist/presets/index.d.ts",
        "default": "./dist/presets/index.js"
      },
      "require": {
        "types": "./dist/presets/index.d.cts",
        "default": "./dist/presets/index.cjs"
      }
    },
    "./presets/*": {
      "import": {
        "types": "./dist/presets/*.d.ts",
        "default": "./dist/presets/*.js"
      },
      "require": {
        "types": "./dist/presets/*.d.cts",
        "default": "./dist/presets/*.cjs"
      }
    },
    "./components": {
      "import": {
        "types": "./dist/components/index.d.ts",
        "default": "./dist/components/index.js"
      },
      "require": {
        "types": "./dist/components/index.d.cts",
        "default": "./dist/components/index.cjs"
      }
    }
  },
  "bin": {
    "coralcss": "./dist/cli.js"
  },
  "files": [
    "dist"
  ],
  "sideEffects": false,
  "scripts": {
    "build": "tsup",
    "test": "vitest run",
    "test:watch": "vitest",
    "test:coverage": "vitest run --coverage",
    "test:e2e": "playwright test",
    "lint": "eslint src/",
    "format": "prettier --write .",
    "typecheck": "tsc --noEmit",
    "prepublishOnly": "npm run build && npm run test:coverage"
  },
  "keywords": [
    "css",
    "css-framework",
    "utility-css",
    "atomic-css",
    "tailwind-alternative",
    "css-utilities",
    "headless-ui",
    "headless-components",
    "design-system",
    "theming",
    "dark-mode",
    "responsive",
    "container-queries",
    "anchor-positioning",
    "modern-css"
  ],
  "author": "Ersin Koç",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/coralcss/coralcss.git"
  },
  "bugs": {
    "url": "https://github.com/coralcss/coralcss/issues"
  },
  "homepage": "https://coralcss.com",
  "engines": {
    "node": ">=18"
  },
  "devDependencies": {
    "@types/node": "^22.0.0",
    "@vitest/coverage-v8": "^2.1.0",
    "eslint": "^9.0.0",
    "playwright": "^1.49.0",
    "prettier": "^3.4.0",
    "tsup": "^8.3.0",
    "typescript": "^5.7.0",
    "vitest": "^2.1.0"
  },
  "peerDependencies": {
    "vite": ">=5.0.0",
    "postcss": ">=8.0.0"
  },
  "peerDependenciesMeta": {
    "vite": {
      "optional": true
    },
    "postcss": {
      "optional": true
    }
  }
}
```

---

## GITHUB ACTIONS

```yaml
# .github/workflows/deploy.yml
name: Deploy Website

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:coverage
      
      - name: Build package
        run: npm run build
      
      - name: Build website
        working-directory: ./website
        run: |
          npm ci
          npm run build
      
      - name: Setup Pages
        uses: actions/configure-pages@v4
      
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: './website/dist'
  
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## LLM-NATIVE REQUIREMENTS

### llms.txt File (< 2000 tokens)

```markdown
# CoralCSS

> Modern, zero-dependency CSS framework with utility classes, headless components, and first-class modern CSS support.

## Install

```bash
npm install coralcss
```

## Quick Start

```typescript
import { createCoral, presetCoral } from 'coralcss'

const coral = createCoral({
  presets: [presetCoral()]
})
```

## CDN Usage

```html
<script src="https://cdn.coralcss.com/coral.min.js"></script>
<div class="p-4 bg-coral-500 text-white rounded-lg">Hello!</div>
```

## Core Features

### Utilities
- Spacing: `p-4`, `m-2`, `gap-4`
- Colors: `bg-coral-500`, `text-white`
- Typography: `text-lg`, `font-bold`
- Layout: `flex`, `grid`, `grid-cols-3`
- Effects: `shadow-lg`, `rounded-xl`

### Variants
- State: `hover:`, `focus:`, `active:`
- Responsive: `sm:`, `md:`, `lg:`, `xl:`
- Dark mode: `dark:`
- Container: `@sm:`, `@lg:`

### Variant Groups (Unique!)
```html
<div class="hover:(bg-red-500 text-white scale-105)">
```

### Modern CSS
- Anchor: `anchor-[tooltip]`, `anchored-[tooltip]`
- Container: `@container`, `@sm:grid-cols-2`
- :has(): `has-[img]:border-2`
- Scroll: `scroll-animate-[fade-in]`

### Components
```typescript
import { Dialog, Dropdown, Tabs } from 'coralcss/components'
```

## API

### createCoral(options)
Creates CoralCSS instance.

### coral.generate(classes)
Generates CSS from class array.

### coral.use(plugin)
Registers a plugin.

## Presets

- `presetCoral()` - Default (recommended)
- `presetWind()` - Tailwind-compatible
- `presetMini()` - Minimal
- `presetFull()` - Everything

## Plugins

- `iconsPlugin` - Iconify icons
- `typographyPlugin` - Prose styling
- `formsPlugin` - Form elements
- `animationsPlugin` - Extended animations
- `attributifyPlugin` - Attribute mode

## Links

- Docs: https://coralcss.com
- GitHub: https://github.com/coralcss/coralcss
```

---

## IMPLEMENTATION CHECKLIST

### Before Starting
- [ ] Create SPECIFICATION.md with complete spec
- [ ] Create IMPLEMENTATION.md with architecture
- [ ] Create TASKS.md with ordered task list
- [ ] All three documents reviewed and complete

### Core Implementation
- [ ] Implement micro kernel
- [ ] Implement plugin system
- [ ] Implement rule engine
- [ ] Implement variant processor
- [ ] Implement CSS generator
- [ ] Implement class extractor
- [ ] Implement theme system

### Plugins Implementation
- [ ] Core utilities plugin (all CSS properties)
- [ ] Core variants plugin (all variants)
- [ ] Modern CSS plugin (anchor, container, :has, scroll-driven, view-transitions)
- [ ] Theming plugin
- [ ] Icons plugin
- [ ] Typography plugin
- [ ] Forms plugin
- [ ] Animations plugin
- [ ] Attributify plugin

### Presets Implementation
- [ ] preset-coral (default)
- [ ] preset-wind (Tailwind-compatible)
- [ ] preset-mini (minimal)
- [ ] preset-full (everything)

### Components Implementation
- [ ] Base component class
- [ ] Dialog
- [ ] Dropdown
- [ ] Tabs
- [ ] Accordion
- [ ] Tooltip
- [ ] Popover
- [ ] Toast
- [ ] Switch
- [ ] Select
- [ ] Combobox
- [ ] Menu
- [ ] Slider
- [ ] Progress
- [ ] Avatar
- [ ] Badge
- [ ] Sheet

### Integration Implementation
- [ ] Runtime mode (CDN)
- [ ] Vite plugin
- [ ] PostCSS plugin
- [ ] CLI tool

### Testing
- [ ] Unit tests for kernel
- [ ] Unit tests for all plugins
- [ ] Unit tests for all components
- [ ] Integration tests for Vite
- [ ] Integration tests for PostCSS
- [ ] Integration tests for CLI
- [ ] E2E tests for runtime
- [ ] E2E tests for components
- [ ] 100% coverage achieved

### Documentation
- [ ] README.md complete
- [ ] llms.txt created
- [ ] All JSDoc with @example
- [ ] 20+ examples created
- [ ] CHANGELOG.md started

### Website
- [ ] Home page
- [ ] Getting started guide
- [ ] Utilities documentation
- [ ] Variants documentation
- [ ] Modern CSS documentation
- [ ] Components documentation
- [ ] Theming documentation
- [ ] Plugins documentation
- [ ] Examples page
- [ ] Dark/light theme toggle
- [ ] Mobile responsive
- [ ] CNAME for coralcss.com

### Final
- [ ] `npm run build` succeeds
- [ ] `npm run test:coverage` shows 100%
- [ ] All E2E tests pass
- [ ] Website builds
- [ ] All examples work
- [ ] Bundle size within budget

---

## BEGIN IMPLEMENTATION

Start by creating **SPECIFICATION.md** with the complete package specification based on everything above.

Then create **IMPLEMENTATION.md** with architecture decisions.

Then create **TASKS.md** with ordered, numbered tasks.

Only after all three documents are complete, begin implementing code by following TASKS.md sequentially.

**Remember:**
- This package will be published to npm as `coralcss`
- It must be production-ready
- Zero runtime dependencies
- 100% test coverage
- Professionally documented
- LLM-native design
- Beautiful documentation website at coralcss.com
- It should be the BEST CSS framework available
