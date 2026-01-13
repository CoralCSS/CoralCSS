# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2026-01-13

### Added

#### New Utility Plugins (16)

- `aspect-ratio` - Aspect ratio utilities (aspect-auto, aspect-square, aspect-video, aspect-[16/9])
- `object-fit` - Object fit and position utilities (object-cover, object-contain, object-top, object-bottom, object-center)
- `line-clamp` - Line clamping for text truncation (line-clamp-1 to line-clamp-6, line-clamp-none)
- `text-decoration` - Text decoration utilities (underline, overline, line-through, decoration-color, decoration-style, underline-offset)
- `list-style` - List styling utilities (list-disc, list-decimal, list-none, list-inside, list-outside)
- `accent-color` - Form accent color utilities (accent-coral-500, accent-blue-500, etc.)
- `appearance` - Appearance utilities (appearance-none, appearance-auto)
- `blending` - Blend mode utilities (mix-blend-mode, bg-blend-mode)
- `forms` - Form state utilities (autocomplete, input-mode, enter-key-hint, required, invalid, read-only)
- `tables` - Table layout and styling utilities (table-auto, table-fixed, border-collapse, border-separate, caption-side, border-spacing, col-span, row-span)
- `scrollbar` - Scrollbar utilities for Firefox (scrollbar-width, scrollbar-color) and WebKit (scrollbar-thumb, scrollbar-track)
- `scroll-snap` - CSS scroll snap utilities (snap-x, snap-y, snap-both, snap-align, snap-stop, scroll-padding, scroll-margin)
- `scroll-behavior` - Scroll behavior utilities (scroll-auto, scroll-smooth, overscroll, -webkit-overflow-scrolling)
- `caret-place` - Caret color and CSS place utilities (caret-auto, caret-current, caret-color-*, place-items, place-self, place-content)
- `positioning` - Advanced positioning utilities (inset, float, clear, will-change, user-select, resize, pointer-events, cursor)
- `typography-advanced` - Advanced typography utilities (text-align-last, text-indent, text-wrap, text-balance, text-orientation, writing-mode, hanging-punctuation)

#### Documentation

- Added "Modern Utilities" section to website documentation with interactive examples
- Comprehensive test coverage for all new plugins (8222 tests total, 100% pass rate)

### Changed

- Updated plugin exports to include new utility plugins
- Improved test coverage from 7664 to 8222 tests (558 new tests)

### Fixed

- Fixed test expectations for CSS variables vs hex values in color utilities
- Fixed test expectations for rem vs px units in spacing utilities
- Fixed responsive variant tests to note plugin requirements
- Fixed arbitrary value test expectations for will-change utility

## [1.0.0] - 2026-01-08

### Added

#### Core Framework
- Micro-kernel architecture with plugin system
- CSS class parser with variant group support
- Rule matcher with pattern and regex matching
- CSS generator with proper specificity handling
- CSS transformer with layer support (base, theme, utilities, components)
- Class extractor for HTML content
- LRU cache for performance optimization

#### Utility Plugins (14)
- `spacing` - Padding, margin, gap utilities (p-*, m-*, gap-*)
- `sizing` - Width, height, min/max utilities (w-*, h-*, size-*)
- `colors` - Background, text, border colors with opacity support
- `typography` - Font size, weight, family, tracking, leading
- `layout` - Display, position, overflow, z-index, visibility
- `flexbox` - Flex direction, wrap, grow, shrink, basis, align, justify
- `grid` - Grid columns, rows, gaps, span, flow
- `borders` - Border width, radius, style, ring, outline
- `effects` - Box shadow, opacity, mix-blend-mode
- `filters` - Blur, brightness, contrast, grayscale, sepia
- `transforms` - Scale, rotate, translate, skew, origin
- `transitions` - Transition property, duration, timing, delay, animation
- `interactivity` - Cursor, pointer-events, resize, scroll, touch-action, user-select
- `backgrounds` - Background attachment, clip, origin, position, repeat, size, gradient

#### Variant Plugins (4)
- `pseudo` - Hover, focus, active, disabled, first, last, odd, even, group-*, peer-*
- `responsive` - Breakpoint variants (sm, md, lg, xl, 2xl)
- `dark` - Dark mode variant with multiple strategies
- `modern` - Container queries (@sm, @md, @lg), :has(), ARIA states

#### Modern CSS Plugin
- Anchor positioning utilities (anchor-name, position-anchor, position-area)
- Scroll-driven animations (animation-timeline, animation-range)
- View transitions (view-transition-name)

#### Theme System
- Complete color palette (coral, slate, gray, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose)
- Spacing scale (0-96 with fractional values)
- Typography scale (xs-9xl, font weights, families)
- Default theme with border radius, shadows, animations, screens
- Dark mode utilities with color inversion

#### Presets
- `coralPreset` - Default preset with all utilities and modern CSS
- `windPreset` - Tailwind-compatible preset
- `miniPreset` - Minimal preset with essential utilities
- `fullPreset` - Everything included

#### Headless Components (7)
- `Dialog` - Modal dialogs with focus trap, backdrop click, native dialog support
- `Dropdown` - Dropdown menus with keyboard navigation (arrows, enter, escape)
- `Tabs` - Tabbed interfaces with ARIA support and automatic/manual activation
- `Accordion` - Collapsible panels with single/multiple mode
- `Tooltip` - Tooltips with configurable delay and positioning
- `Switch` - Toggle switches with form integration
- `Toast` - Toast notifications with auto-dismiss and container management

#### Runtime Mode
- DOM observer for automatic class detection
- Style injector for CSS injection
- CDN bundle for script tag usage

#### Build Integrations
- Vite plugin with HMR support
- PostCSS plugin with @coral directives and @apply
- CLI tool for command-line usage

#### Documentation
- Comprehensive README with installation, usage, API reference
- llms.txt for LLM-native documentation
- 20 example files covering all features
- SPECIFICATION.md with complete package specification
- IMPLEMENTATION.md with architecture details
- TASKS.md with ordered task list

#### Website
- React + Vite website
- Home, Docs, Examples pages
- Responsive design using CoralCSS

#### Infrastructure
- TypeScript strict mode
- ESM, CJS, and IIFE builds
- Vitest for unit testing
- Playwright for E2E testing
- GitHub Actions for CI/CD
- Automatic npm publish on tag push
- Website deployment to GitHub Pages

### Features
- Zero runtime dependencies
- Variant groups: `hover:(bg-red text-white)`
- Arbitrary values: `w-[200px]`, `bg-[#ff5733]`
- Opacity modifiers: `bg-coral-500/50`
- Negative values: `-mt-4`, `-translate-x-2`
- First-class modern CSS support
- Multiple dark mode strategies (class, media, selector, auto)
- Full TypeScript support with strict types
