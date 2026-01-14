# 🚀 Coral Turbo

**High-performance Rust engine for CoralCSS** - Blazing fast CSS utility class processing.

## Features

- **⚡ 10-20x Faster**: Rust-powered core for maximum performance
- **🔄 Dual Bindings**: WASM (cross-platform) + NAPI-RS (native Node.js)
- **🧵 Parallel Processing**: Multi-threaded file scanning with Rayon
- **🌳 Trie-based Matching**: O(k) prefix lookup for 700+ utility patterns
- **📦 Zero-copy Parsing**: Minimal memory allocations
- **🔌 Drop-in Integration**: Works seamlessly with CoralCSS

## Installation

```bash
npm install @coral-css/turbo
```

## Quick Start

```typescript
import { createEngine, quickParse, quickExtract } from '@coral-css/turbo';

// Create an engine instance
const engine = await createEngine();

// Parse classes
const parsed = engine.parse('hover:bg-blue-500 dark:text-white');
console.log(parsed);
// [
//   { raw: 'hover:bg-blue-500', utility: 'bg', value: 'blue-500', variants: ['hover'], ... },
//   { raw: 'dark:text-white', utility: 'text', value: 'white', variants: ['dark'], ... }
// ]

// Extract from HTML
const classes = engine.extract('<div class="p-4 m-2">Hello</div>');
console.log(classes); // ['p-4', 'm-2']

// Process and generate CSS
const css = engine.process('p-4 m-2 bg-red-500');
console.log(css);
// @layer utilities {
//   .p-4 { padding: 1rem; }
//   .m-2 { margin: 0.5rem; }
//   .bg-red-500 { background-color: #ef4444; }
// }
```

## API

### Engine

```typescript
import { createEngine } from '@coral-css/turbo';

const engine = await createEngine(); // auto-selects best backend
const engine = await createEngine('native'); // force native
const engine = await createEngine('wasm'); // force WASM

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

// Quick one-off operations
const parsed = await quickParse('p-4 hover:bg-blue-500');
const classes = await quickExtract('<div class="flex items-center">');
const css = await quickProcess('p-4 m-2');

// Parallel operations (native only, WASM falls back to sequential)
const allClasses = await parallelExtract([file1, file2, file3]);
const allCss = await parallelProcess(['p-4', 'm-2', 'flex']);
```

### Direct Imports

```typescript
// WASM-only (for browser or cross-platform)
import { TurboEngine, Parser, Extractor } from '@coral-css/turbo/wasm';

// Native-only (for maximum Node.js performance)
import { TurboEngine, Parser, Extractor } from '@coral-css/turbo/native';
```

## Building from Source

### Prerequisites

- Rust 1.70+
- Node.js 18+
- wasm-pack (`cargo install wasm-pack`)

### Build Commands

```bash
# Build everything
npm run build

# Build Rust only
npm run build:rust

# Build WASM only
npm run build:wasm

# Build native module only
npm run build:napi

# Run tests
npm test

# Run benchmarks
npm run bench
```

## Architecture

```
coral-turbo/
├── crates/
│   ├── coral-turbo-core/     # Core Rust engine
│   │   ├── src/
│   │   │   ├── parser.rs     # Class name parser
│   │   │   ├── matcher.rs    # Pattern matching (Trie)
│   │   │   ├── extractor.rs  # File scanner (Rayon)
│   │   │   ├── generator.rs  # CSS output
│   │   │   ├── trie.rs       # Prefix trie
│   │   │   └── cache.rs      # LRU cache
│   │   └── Cargo.toml
│   │
│   ├── coral-turbo-wasm/     # WASM bindings
│   │   └── src/lib.rs
│   │
│   └── coral-turbo-napi/     # Node.js native bindings
│       └── src/lib.rs
│
├── src/                       # TypeScript wrapper
│   ├── index.ts              # Auto-detect backend
│   ├── wasm/index.ts         # WASM exports
│   ├── native/index.ts       # Native exports
│   └── types.ts              # TypeScript types
│
└── pkg/                       # Built WASM output
```

## Performance

| Operation | Turbo (Native) | Turbo (WASM) | JS Only |
|-----------|---------------|--------------|---------|
| Parse 1K classes | ~0.5ms | ~2ms | ~15ms |
| Extract from 100 files | ~10ms | ~50ms | ~200ms |
| Process 1K utilities | ~1ms | ~5ms | ~25ms |

## Integration with CoralCSS

Coral Turbo is designed to work seamlessly with CoralCSS:

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

## License

MIT © CoralCSS Team
