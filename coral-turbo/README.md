# Coral Turbo v1.0.0

**High-performance Rust engine for CoralCSS** - Blazing fast CSS utility class processing.

[![npm version](https://img.shields.io/npm/v/@coral-css/turbo.svg)](https://www.npmjs.com/package/@coral-css/turbo)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

- **10,000+ classes/ms**: Ultra-fast parsing powered by Rust
- **Dual Bindings**: WASM (cross-platform) + NAPI-RS (native Node.js)
- **Parallel Processing**: Multi-threaded file scanning with Rayon (281 KB/ms)
- **Trie-based Matching**: O(k) prefix lookup for 700+ utility patterns
- **Zero-copy Parsing**: Minimal memory allocations
- **95 Tests**: Comprehensive test coverage (82 unit + 13 integration)

## Performance Benchmarks

Tested on real-world scenarios (release mode):

| Operation | Speed | Comparison |
|-----------|-------|------------|
| Parser (simple classes) | **10,000 class/ms** | - |
| Parser (complex w/ variants) | **2,000 class/ms** | - |
| Extractor (single file) | **14.1 KB/ms** | - |
| Extractor (parallel, 10 files) | **281 KB/ms** | - |
| Matcher | **2,400 match/ms** | - |
| Generator | **333 gen/ms** | - |
| Full Pipeline | **67 pipeline/ms** | - |

**Real-world test**: 28 files, 139 unique classes processed in **5.8ms**

## Installation

```bash
npm install @coral-css/turbo
```

## Quick Start

```typescript
import { createEngine, quickParse, quickExtract } from '@coral-css/turbo';

// Create an engine instance (auto-selects best backend)
const engine = await createEngine();

// Parse classes
const parsed = engine.parse('hover:bg-blue-500 dark:text-white');
// [
//   { raw: 'hover:bg-blue-500', utility: 'bg', value: 'blue-500', variants: ['hover'], ... },
//   { raw: 'dark:text-white', utility: 'text', value: 'white', variants: ['dark'], ... }
// ]

// Extract from HTML/JSX
const classes = engine.extract('<div class="p-4 m-2">Hello</div>');
// ['p-4', 'm-2']

// Full pipeline: parse -> match -> generate CSS
const css = engine.process('p-4 m-2 bg-red-500');
// @layer utilities {
//   .p-4 { padding: 1rem; }
//   .m-2 { margin: 0.5rem; }
//   .bg-red-500 { background-color: #ef4444; }
// }
```

## API Reference

### TurboEngine

```typescript
import { createEngine } from '@coral-css/turbo';

// Auto-select best available backend
const engine = await createEngine();

// Force specific backend
const native = await createEngine('native');  // Node.js native (fastest)
const wasm = await createEngine('wasm');      // WASM (cross-platform)

// Methods
engine.parse(classString: string): ParsedClass[]
engine.parseSingle(className: string): ParsedClass
engine.extract(content: string): string[]
engine.process(classString: string): string
engine.processBatch(classStrings: string[]): string[]
engine.extractFromFiles(contents: string[]): string[]
```

### Quick Functions

```typescript
import { quickParse, quickExtract, quickProcess } from '@coral-css/turbo';

// One-off operations (no engine initialization needed)
const parsed = await quickParse('p-4 hover:bg-blue-500');
const classes = await quickExtract('<div class="flex items-center">');
const css = await quickProcess('p-4 m-2');
```

### Direct Imports

```typescript
// WASM-only (browser or cross-platform)
import { TurboEngine, Parser, Extractor, Generator } from '@coral-css/turbo/wasm';

// Native-only (maximum Node.js performance)
import { TurboEngine, Parser, Extractor, Generator } from '@coral-css/turbo/native';
```

### Types

```typescript
interface ParsedClass {
  raw: string;           // Original class string
  utility: string;       // Base utility (e.g., "p", "bg", "text")
  value?: string;        // Value (e.g., "4", "red-500")
  variants: string[];    // Variants (e.g., ["hover", "dark"])
  opacity?: number;      // Opacity modifier (e.g., 50 for "/50")
  arbitrary?: string;    // Arbitrary value (e.g., "2rem" from "[2rem]")
  important: boolean;    // Has ! modifier
  negative: boolean;     // Has - prefix
}

interface GenerateOptions {
  minify?: boolean;           // Minify output (default: false)
  sourceComments?: boolean;   // Add source comments (default: false)
  sortByProperty?: boolean;   // Sort by CSS property (default: true)
  useLayers?: boolean;        // Use @layer (default: true)
}
```

## Supported Patterns

The engine supports comprehensive Tailwind CSS patterns:

- **Spacing**: `p-4`, `m-2`, `px-4`, `py-2`, `pt-4`, `gap-4`
- **Colors**: `bg-red-500`, `text-blue-600`, `border-gray-200`
- **Layout**: `flex`, `grid`, `block`, `hidden`, `items-center`, `justify-between`
- **Sizing**: `w-full`, `h-screen`, `max-w-lg`, `min-h-0`
- **Typography**: `text-xl`, `font-bold`, `leading-tight`
- **Effects**: `shadow-md`, `opacity-50`, `blur-sm`
- **Variants**: `hover:`, `focus:`, `dark:`, `md:`, `lg:`
- **Modifiers**: `!important`, `-negative`, `/opacity`
- **Arbitrary**: `p-[2rem]`, `bg-[#ff5733]`, `w-[calc(100%-2rem)]`

## Building from Source

### Prerequisites

- Rust 1.70+ with `wasm32-unknown-unknown` target
- Node.js 18+
- wasm-pack (`cargo install wasm-pack`)

### Build Commands

```bash
# Build everything
npm run build

# Build Rust only
npm run build:rust

# Build WASM module
npm run build:wasm

# Build native Node.js module
npm run build:napi

# Build TypeScript
npm run build:ts

# Run tests
npm test

# Run benchmarks
npm run bench

# Clean build artifacts
npm run clean
```

## Architecture

```
coral-turbo/
├── crates/
│   ├── coral-turbo-core/       # Core Rust engine
│   │   ├── src/
│   │   │   ├── parser.rs       # Ultra-fast class name parser
│   │   │   ├── matcher.rs      # Trie-based pattern matching
│   │   │   ├── extractor.rs    # Parallel file scanner (Rayon)
│   │   │   ├── generator.rs    # CSS output generator
│   │   │   ├── trie.rs         # Prefix trie data structure
│   │   │   ├── cache.rs        # LRU cache
│   │   │   └── types.rs        # Core type definitions
│   │   ├── benches/            # Criterion benchmarks
│   │   ├── examples/           # Usage examples
│   │   └── tests/              # Integration tests
│   │
│   ├── coral-turbo-wasm/       # WASM bindings (wasm-bindgen)
│   │
│   └── coral-turbo-napi/       # Node.js native bindings (NAPI-RS)
│
├── src/                        # TypeScript wrapper
│   ├── index.ts                # Auto-detect backend
│   ├── wasm/index.ts           # WASM exports
│   ├── native/index.ts         # Native exports
│   └── types.ts                # TypeScript types
│
└── pkg/                        # Built WASM output
```

## Integration with CoralCSS

```typescript
// In your CoralCSS config
import { createEngine } from '@coral-css/turbo';

export default {
  turbo: true, // Enable Turbo engine
  // ... other config
};
```

Or manually:

```typescript
import { CoralCSS } from 'coralcss';
import { createEngine } from '@coral-css/turbo';

const turbo = await createEngine();
const coral = new CoralCSS({
  turboEngine: turbo,
});
```

## Running Examples

```bash
# Basic usage example
cargo run --example basic_usage -p coral-turbo-core

# Performance demonstration
cargo run --example performance_demo -p coral-turbo-core --release

# Real-world scenario
cargo run --example real_world -p coral-turbo-core --release
```

## Changelog

### v1.0.0 (2025-01-14)

- Initial stable release
- Parser: Full Tailwind CSS syntax support
- Matcher: 700+ utility patterns with Trie-based O(k) lookup
- Extractor: Parallel file scanning with Rayon
- Generator: CSS layers, minification, variant wrapping
- 53 tests (40 unit + 13 integration)
- 4 benchmark suites (parser, matcher, extractor, generator)
- 3 working examples

## License

MIT © CoralCSS Team

## Links

- [CoralCSS](https://coralcss.com)
- [GitHub](https://github.com/coralcss/coralcss)
- [npm](https://www.npmjs.com/package/@coral-css/turbo)
