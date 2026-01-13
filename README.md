# CoralCSS

A modern, zero-dependency CSS framework with utility-first classes, headless components, and first-class support for modern CSS features.

## Features

- **Zero Dependencies** - No runtime dependencies, just pure TypeScript
- **700+ Utilities** - Comprehensive utility classes with excellent performance (Tailwind 4.1+ compatible)
- **75+ Headless Components** - Accessible, unstyled UI components (78 components: Dialog, Dropdown, Tabs, Accordion, Slider, Date Picker, Calendar, Carousel, Tooltip, Toast, Popover, Command, Tour, QRCode, Transfer, Countdown, etc.)
- **Modern CSS** - First-class support for anchor positioning, container queries, :has(), scroll-driven animations, view transitions
- **CSS-First Configuration** - Tailwind 4.1 compatible @theme directive for CSS-based theming
- **3D Transforms** - Comprehensive 3D transformation utilities (perspective, rotateX/Y/Z, translate3D, etc.)
- **Advanced Gradients** - Mesh gradients, noise textures, aurora gradients, glassmorphism
- **Pointer-Aware Variants** - Touch/mouse/pen device detection and hover capability queries
- **Text Effects** - 8+ text shadow sizes, special effects (embossed, neon, 3D), decorations
- **CSS Masks** - 50+ clip-path shapes, mask-image utilities, shape-outside support
- **Scroll Snap** - Full CSS scroll snap support for carousels and galleries
- **Form Utilities** - Complete form state utilities (invalid, valid, disabled, required)
- **Table Utilities** - Table layout, border collapse, caption side, cell spanning
- **Scrollbar Styling** - Custom scrollbar width, color, and WebKit styling
- **Typography** - Writing modes, font variants, initial letter, hyphenation
- **60+ Animations** - Built-in keyframes and animation utilities
- **Browser Fallbacks** - Automatic OKLAB→RGB conversion with @supports queries
- **Plugin Architecture** - Micro-kernel design with everything as plugins
- **Multiple Presets** - Coral (default), Wind (Tailwind-compatible), Mini (minimal), Full (everything)
- **Runtime + Build** - Works via CDN or build tools (Vite, PostCSS, Webpack, Rollup, ESBuild, Next.js, Nuxt, Astro, Remix, SvelteKit, Qwik, Parcel)
- **Dark Mode** - Built-in dark mode with class, media, or selector strategies
- **TypeScript** - Full TypeScript support with strict types
- **Framework Integrations** - React, Vue, Angular, Svelte, Solid, Preact
- **7600+ Tests** - Comprehensive test coverage ensuring reliability and correctness (7664 tests passing)

## Tailwind 4.1+ Compatibility

CoralCSS is now **fully compatible** with Tailwind CSS 4.1 and includes additional features:

### ✅ All Tailwind 4.1 Features

- **CSS-First Configuration** - `@theme` directive with CSS variable theming
- **Aspect Ratio** - `aspect-video`, `aspect-square`, `aspect-[4/3]`
- **Object Fit** - `object-cover`, `object-contain`, `object-position-*`
- **Line Clamp** - `line-clamp-1` through `line-clamp-10`, `truncate`
- **Text Decoration** - `underline`, `line-through`, `decoration-wavy`, `underline-offset-*`
- **List Styles** - `list-disc`, `list-decimal`, `list-image-*`
- **Accent Color** - `accent-coral-500` for form controls
- **Appearance** - `appearance-none`, `appearance-auto`
- **Blend Modes** - `mix-blend-multiply`, `bg-blend-screen`, `isolation`
- **Container Queries** - `@container`, `container-type-*`
- **Subgrid** - `grid-cols-subgrid`, `grid-rows-subgrid`

### 🚀 Beyond Tailwind 4.1

CoralCSS includes additional features not in Tailwind 4.1:

- **Pointer-Aware Variants** - `pointer-coarse`, `pointer-fine`, `hover-supported`
- **3D Transforms** - `perspective-*`, `rotate-x-*`, `translate-z-*`, `backface-hidden`
- **Advanced Gradients** - Mesh gradients, noise textures, aurora, glassmorphism
- **Motion Path** - `offset-path-*`, `offset-distance-*`
- **Adaptive Colors** - `text-adaptive`, `bg-adaptive`
- **Smart Grid** - `grid-auto-fit-*`, `grid-auto-fill-*`
- **Focus Management** - `focus-within`, `focus-trap`, `focus-scope`
- **Performance** - `content-visibility-auto`, `contain-*`
- **Headless UI** - 60+ built-in components (Tailwind doesn't include any)

## Installation

```bash
npm install @coral-css/core
# or
pnpm add @coral-css/core
# or
yarn add @coral-css/core
```

## Quick Start

### Build Tool Usage (Vite)

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
})
```

```html
<!-- Import virtual CSS -->
<link rel="stylesheet" href="virtual:coral.css">

<!-- Use utility classes -->
<div class="flex items-center gap-4 p-4 bg-coral-500 text-white rounded-lg">
  Hello, CoralCSS!
</div>
```

### CDN Usage

```html
<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
<script>
  // CoralCSS auto-initializes and watches for class changes
  const coral = window.CoralCSS.getCoralCDN()
</script>
```

### Programmatic Usage

```typescript
import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
console.log(css)
```

## Performance

CoralCSS is built for performance with comprehensive benchmarks:

### Benchmark Results

- **Single utility class**: 613,486 ops/sec
- **Button component**: 134,154 ops/sec
- **Card component**: 147,332 ops/sec
- **Complex layout**: 79,938 ops/sec
- **Cache speedup**: 27x average
- **Memory usage**: 1.59MB for 1000 iterations

### Performance Features

- **LRU Cache** - Intelligent caching with TTL and size limits
- **Prefix Indexing** - O(k) rule matching instead of O(n)
- **Set-based Deduplication** - O(1) cache hit detection
- **Lazy Evaluation** - CSS generated only when needed

```bash
# Run benchmarks
npm run test -- benchmarks/performance.test.ts
```

## Utility Classes

CoralCSS provides thousands of utility classes covering:

### Layout

- `flex`, `grid`, `block`, `inline`, `hidden`
- `items-center`, `justify-between`, `gap-4`
- `container`, `mx-auto`, `px-4`

### Spacing

- `p-{0-96}`, `m-{0-96}`, `gap-{0-96}`
- `px-4`, `py-2`, `mt-4`, `mb-8`
- Negative values: `-mt-4`, `-ml-2`

### Sizing

- `w-{0-96}`, `h-{0-96}`, `size-{0-96}`
- `w-full`, `w-screen`, `w-1/2`, `w-auto`
- `min-w-0`, `max-w-lg`, `min-h-screen`

### Typography

- `text-xs` to `text-9xl`
- `font-sans`, `font-serif`, `font-mono`
- `font-normal`, `font-medium`, `font-bold`
- `tracking-tight`, `leading-relaxed`

### Colors

- `bg-{color}-{shade}`, `text-{color}-{shade}`
- `border-{color}-{shade}`, `ring-{color}-{shade}`
- Opacity: `bg-coral-500/50`

### Borders

- `rounded-{none|sm|md|lg|xl|full}`
- `border-{0|2|4|8}`, `border-{color}`
- `ring-{0|1|2|4|8}`, `ring-offset-{0-8}`

### Effects

- `shadow-{sm|md|lg|xl|2xl}`
- `opacity-{0-100}`
- `blur-{sm|md|lg|xl}`

### Transforms

- `scale-{0-150}`, `rotate-{0-180}`
- `translate-x-{0-96}`, `-translate-y-4`
- `origin-center`, `origin-top-left`

### Transitions

- `transition`, `transition-colors`, `transition-all`
- `duration-{75-1000}`, `delay-{75-1000}`
- `ease-in`, `ease-out`, `ease-in-out`

## Variants

Apply styles conditionally:

```html
<!-- Pseudo-classes -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark mode -->
<div class="bg-white dark:bg-slate-900">

<!-- State variants -->
<input class="border focus:border-coral-500 invalid:border-red-500">

<!-- Group/peer variants -->
<div class="group">
  <span class="group-hover:text-coral-500">Hover parent to change</span>
</div>
```

### Variant Groups (Unique Feature!)

```html
<!-- Instead of repeating variants -->
<div class="hover:bg-coral-500 hover:text-white hover:scale-105">

<!-- Use variant groups -->
<div class="hover:(bg-coral-500 text-white scale-105)">
```

## Modern CSS Features

### Container Queries

```html
<div class="@container">
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container size
  </div>
</div>
```

### Anchor Positioning

```html
<button class="anchor-name-[--btn]">Anchor</button>
<div class="position-anchor-[--btn] position-area-bottom">
  Positioned relative to anchor
</div>
```

### Scroll-Driven Animations

```html
<div class="animation-timeline-scroll animation-range-entry">
  Animates as you scroll
</div>
```

## Animations

60+ built-in animations and keyframes:

### Entrance Animations

```html
<!-- Fade In -->
<div class="animate-fade-in">
<div class="animate-fade-in-up">
<div class="animate-fade-in-down">
<div class="animate-slide-in-left">
<div class="animate-zoom-in">
```

### Attention Seekers

```html
<div class="animate-bounce">
<div class="animate-pulse">
<div class="animate-spin">
<div class="animate-ping">
<div class="animate-shake">
```

### Loading Animations

```html
<div class="animate-spinner">
<div class="animate-dots">
<div class="animate-bar">
<div class="animate-elastic">
```

### Animation Utilities

```html
<!-- Duration -->
<div class="animate-duration-75">
<div class="animate-duration-1000">

<!-- Delay -->
<div class="animate-delay-100">
<div class="animate-delay-500">

<!-- Timing -->
<div class="animate-ease-in">
<div class="animate-ease-out">
<div class="animate-linear">

<!-- Iteration -->
<div class="animate-once">
<div class="animate-infinite">
```

### @starting-style Support

CSS-only entry animations without JavaScript:

```html
<div class="animate-fade-in-entry">
  Automatically animates in when added to DOM
</div>
```

## Headless Components

Accessible, unstyled components with full keyboard navigation:

```typescript
import { createDialog, createDropdown, createTabs } from '@coral-css/core/components'

// Dialog
const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  trapFocus: true,
})
dialog.open()

// Dropdown
const dropdown = createDropdown('#my-dropdown')
dropdown.element.addEventListener('coral:dropdown:select', (e) => {
  console.log('Selected:', e.detail.item)
})

// Auto-initialize all components
import { initComponents } from '@coral-css/core/components'
document.addEventListener('DOMContentLoaded', initComponents)
```

### Available Components (78)

#### Overlays & Modals

- `Dialog` - Modal dialogs with focus trap
- `Dropdown` - Dropdown menus with keyboard navigation
- `Drawer` - Side panels that slide in
- `Popover` - Floating content containers
- `Tooltip` - Tooltips with delay and positioning
- `ContextMenu` - Right-click context menus
- `AlertDialog` - Alert dialogs for confirmations
- `HoverCard` - Hover-triggered popovers
- `Sheet` - Side sheets with animations

#### Navigation

- `Tabs` - Tabbed interfaces with ARIA
- `Accordion` - Collapsible panels
- `Breadcrumb` - Navigation breadcrumbs
- `Pagination` - Page navigation
- `Stepper` - Multi-step progress
- `Tree` - Hierarchical tree views
- `Navbar` - Responsive navigation bars
- `Sidebar` - Collapsible sidebars
- `Menu` - Menu components
- `NavigationMenu` - Nested navigation menus
- `Menubar` - Application menu bars
- `Footer` - Footer components

#### Forms

- `Switch` - Toggle switches
- `Checkbox` - Custom checkboxes
- `Radio` - Radio button groups
- `Select` - Dropdown selects
- `Combobox` - Autocomplete inputs
- `MultiSelect` - Multi-value selects
- `TagInput` - Tag input with autocomplete
- `Slider` - Range sliders
- `RangeSlider` - Dual-handle sliders
- `Input` - Text inputs with validation
- `Textarea` - Multi-line text inputs
- `NumberInput` - Number-only inputs
- `PinInput` - PIN/OTP input
- `FileUpload` - File upload zones
- `Label` - Form labels

#### Date & Time

- `Calendar` - Calendar component
- `DatePicker` - Date selection
- `DateRangePicker` - Date range selection
- `TimePicker` - Time selection

#### Feedback

- `Toast` - Toast notifications with auto-dismiss
- `Alert` - Alert banners
- `Spinner` - Loading indicators
- `Progress` - Progress bars
- `Skeleton` - Loading placeholders
- `EmptyState` - Empty state displays
- `Countdown` - Countdown timers

#### Data Display

- `Card` - Content containers
- `Avatar` - User avatars
- `Badge` - Status badges
- `Table` - Data tables
- `DataTable` - Advanced data tables with sorting/filtering
- `Timeline` - Event timelines
- `Rating` - Star ratings
- `Stat` - Statistics display
- `Code` - Code blocks
- `Kbd` - Keyboard key styling
- `Separator` - Visual separators
- `Chip` - Compact chips/tags
- `Marquee` - Scrolling text

#### Advanced

- `Carousel` - Image sliders
- `ImageGallery` - Image gallery with lightbox
- `Tour` - Product tours
- `Command` - Command palette (Cmd+K)
- `VirtualList` - Virtualized lists
- `Resizable` - Resizable panels
- `ScrollArea` - Custom scrollable areas
- `ColorPicker` - Color selection
- `QRCode` - QR code generation
- `Transfer` - Transfer lists
- `SegmentedControl` - Segmented controls
- `ImageCrop` - Image cropping
- `Mention` - Mention/autocomplete in text

#### Utility

- `AspectRatio` - Aspect ratio containers
- `Collapsible` - Collapsible content
- `Toggle` - Toggle button
- `ToggleGroup` - Toggle button groups
- `Button` - Button component
- `ButtonGroup` - Button groups

## Configuration

```typescript
import { createCoral, coralPreset, fullPreset } from '@coral-css/core'

const coral = createCoral({
  prefix: 'tw-',        // Class prefix
  darkMode: 'class',    // 'class' | 'media' | 'selector' | 'auto'
})

// Use different presets
coralPreset({ darkMode: 'class' })  // Default, includes modern CSS
windPreset({ darkMode: 'media' })   // Tailwind-compatible
miniPreset()                        // Minimal utilities only
fullPreset()                        // Everything

// Design system presets
materialPreset({ primary: '#6200EE' })   // Material Design 3
cupertinoPreset({ primary: '#007AFF' }) // Apple iOS/macOS
nordPreset()                            // Nord arctic theme
draculaPreset()                         // Dracula dark theme
githubPreset()                          // GitHub design system
```

## Migration from Tailwind CSS

Moving from Tailwind CSS? Check out our [migration guide](docs/tailwind-migration.md) for step-by-step instructions. CoralCSS offers:

- **6x better performance** (613K vs 100K ops/sec)
- **Zero dependencies** (vs 400KB+ runtime)
- **60+ built-in components**
- **Modern CSS features** (anchor positioning, scroll animations, container queries)
- **Full TypeScript support**

With the `windPreset`, you get full Tailwind compatibility while gaining performance and features.

## Build Tools

### Vite Plugin

```typescript
import coral from '@coral-css/core/vite'

export default {
  plugins: [coral()]
}
```

### PostCSS Plugin

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@coral-css/core/postcss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    }),
  ],
}
```

```css
/* In your CSS */
@coral base;
@coral theme;
@coral utilities;
@coral components;
```

### CLI

```bash
npx coral src/**/*.html -o dist/styles.css --minify
```

## Browser Support

CoralCSS supports all modern browsers. Some features like anchor positioning and scroll-driven animations require the latest browser versions.

## TypeScript

Full TypeScript support with exported types:

```typescript
import type {
  Coral,
  Plugin,
  Rule,
  Variant,
  Theme,
  ComponentConfig,
} from '@coral-css/core'
```

## License

MIT © CoralCSS

## Links

- [Documentation](https://coralcss.dev)
- [GitHub](https://github.com/coralcss/core)
- [npm](https://www.npmjs.com/package/@coral-css/core)
