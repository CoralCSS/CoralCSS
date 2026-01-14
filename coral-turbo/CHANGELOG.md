# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-14

### Added

#### Core Engine
- **Parser**: Ultra-fast class name parser with full Tailwind CSS syntax support
  - Variants (hover:, dark:, md:, lg:, etc.)
  - Modifiers (!important, -negative, /opacity)
  - Arbitrary values ([2rem], [#ff5733], [calc(100%-2rem)])
  - Complex nested patterns (dark:md:hover:!-translate-x-[2rem]/50)

- **Matcher**: Trie-based pattern matching engine
  - 700+ utility patterns supported
  - O(k) prefix lookup performance (k = key length)
  - Supports all Tailwind CSS categories: spacing, colors, layout, typography, effects

- **Extractor**: High-performance content scanner
  - HTML class attribute parsing
  - JSX className support
  - clsx/classnames pattern recognition
  - Parallel file scanning with Rayon (281 KB/ms)
  - Automatic class deduplication

- **Generator**: CSS output generator
  - @layer utilities support
  - Minification mode
  - Source comments option
  - Variant wrapping (hover, dark mode, responsive)
  - Selector escaping for special characters

#### Bindings
- **WASM**: Cross-platform WebAssembly bindings via wasm-bindgen
- **NAPI-RS**: Native Node.js bindings for maximum performance

#### TypeScript
- Full TypeScript support with comprehensive type definitions
- Auto-detection of best available backend (native vs WASM)
- Async factory functions for engine creation
- Quick functions for one-off operations

### Performance

| Operation | Speed |
|-----------|-------|
| Parser (simple classes) | 10,000 class/ms |
| Parser (complex w/ variants) | 2,000 class/ms |
| Extractor (single file) | 14.1 KB/ms |
| Extractor (parallel, 10 files) | 281 KB/ms |
| Matcher | 2,400 match/ms |
| Generator | 333 gen/ms |
| Full Pipeline | 67 pipeline/ms |

Real-world test: 28 files, 139 unique classes processed in 5.8ms

### Testing

- 95 total tests (82 unit + 13 integration)
- 4 benchmark suites (parser, matcher, extractor, generator)
- 3 working examples (basic_usage, performance_demo, real_world)

### Documentation

- Comprehensive README with API reference
- Architecture documentation
- Performance benchmarks
- Usage examples

---

## Links

- [CoralCSS](https://coralcss.com)
- [GitHub](https://github.com/coralcss/coralcss)
- [npm](https://www.npmjs.com/package/@coral-css/turbo)
