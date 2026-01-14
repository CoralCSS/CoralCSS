/**
 * CoralCSS Turbo Engine
 *
 * High-performance Rust engine for CSS utility class processing.
 * Automatically selects native bindings when available, falls back to WASM.
 *
 * @example
 * ```typescript
 * import { createEngine, quickParse, quickExtract } from '@coral-css/turbo';
 *
 * // Create an engine instance
 * const engine = await createEngine();
 *
 * // Parse classes
 * const parsed = engine.parse('hover:bg-blue-500 dark:text-white');
 *
 * // Extract from HTML
 * const classes = engine.extract('<div class="p-4 m-2">Hello</div>');
 *
 * // Process and generate CSS
 * const css = engine.process('p-4 m-2 bg-red-500');
 * ```
 */

import type {
  ParsedClass,
  TurboEngine,
  Parser,
  Extractor,
  Generator,
  GenerateOptions,
} from './types';

// Re-export types
export * from './types';

// Detect environment
const isNode =
  typeof process !== 'undefined' &&
  process.versions != null &&
  process.versions.node != null;

const isBrowser =
  typeof globalThis !== 'undefined' &&
  typeof (globalThis as any).window !== 'undefined';

/**
 * Backend type
 */
export type Backend = 'native' | 'wasm' | 'auto';

/**
 * Current backend being used
 */
let currentBackend: 'native' | 'wasm' | null = null;

/**
 * Native module (lazy loaded)
 */
let nativeModule: typeof import('./native') | null = null;

/**
 * WASM module (lazy loaded)
 */
let wasmModule: typeof import('./wasm') | null = null;

/**
 * Load the native module
 */
async function loadNative(): Promise<typeof import('./native')> {
  if (nativeModule) return nativeModule;

  try {
    nativeModule = await import('./native');
    if (nativeModule.isAvailable()) {
      currentBackend = 'native';
      return nativeModule;
    }
  } catch {
    // Native not available
  }

  throw new Error('Native module not available');
}

/**
 * Load the WASM module
 */
async function loadWasm(): Promise<typeof import('./wasm')> {
  if (wasmModule) return wasmModule;

  wasmModule = await import('./wasm');
  await wasmModule.init();
  currentBackend = 'wasm';
  return wasmModule;
}

/**
 * Load the best available backend
 */
async function loadBackend(
  preferred: Backend = 'auto'
): Promise<typeof import('./native') | typeof import('./wasm')> {
  if (preferred === 'native') {
    return loadNative();
  }

  if (preferred === 'wasm') {
    return loadWasm();
  }

  // Auto: try native first, then WASM
  if (isNode) {
    try {
      return await loadNative();
    } catch {
      // Fall through to WASM
    }
  }

  return loadWasm();
}

/**
 * Get the current backend type
 */
export function getBackend(): 'native' | 'wasm' | null {
  return currentBackend;
}

/**
 * Get the engine version
 */
export async function version(): Promise<string> {
  const backend = await loadBackend();
  if (currentBackend === 'native') {
    return (backend as typeof import('./native')).version();
  } else {
    return await (backend as typeof import('./wasm')).version();
  }
}

/**
 * Create a TurboEngine instance
 */
export async function createEngine(
  backend: Backend = 'auto'
): Promise<TurboEngine> {
  const mod = await loadBackend(backend);

  if (currentBackend === 'native') {
    return new (mod as typeof import('./native')).TurboEngine();
  } else {
    return await (mod as typeof import('./wasm')).TurboEngine.create();
  }
}

/**
 * Create a Parser instance
 */
export async function createParser(backend: Backend = 'auto'): Promise<Parser> {
  const mod = await loadBackend(backend);

  if (currentBackend === 'native') {
    return new (mod as typeof import('./native')).Parser();
  } else {
    return await (mod as typeof import('./wasm')).Parser.create();
  }
}

/**
 * Create an Extractor instance
 */
export async function createExtractor(
  backend: Backend = 'auto'
): Promise<Extractor> {
  const mod = await loadBackend(backend);

  if (currentBackend === 'native') {
    return new (mod as typeof import('./native')).Extractor();
  } else {
    return await (mod as typeof import('./wasm')).Extractor.create();
  }
}

/**
 * Create a Generator instance
 */
export async function createGenerator(
  options?: GenerateOptions,
  backend: Backend = 'auto'
): Promise<Generator> {
  const mod = await loadBackend(backend);

  if (currentBackend === 'native') {
    return new (mod as typeof import('./native')).Generator(options);
  } else {
    return await (mod as typeof import('./wasm')).Generator.create(options);
  }
}

// Quick functions

/**
 * Quick parse function - automatically selects best backend
 */
export async function quickParse(classString: string): Promise<ParsedClass[]> {
  const mod = await loadBackend();
  if (currentBackend === 'native') {
    return (mod as typeof import('./native')).quickParse(classString);
  } else {
    return await (mod as typeof import('./wasm')).quickParse(classString);
  }
}

/**
 * Quick extract function - automatically selects best backend
 */
export async function quickExtract(content: string): Promise<string[]> {
  const mod = await loadBackend();
  if (currentBackend === 'native') {
    return (mod as typeof import('./native')).quickExtract(content);
  } else {
    return await (mod as typeof import('./wasm')).quickExtract(content);
  }
}

/**
 * Quick process function - automatically selects best backend
 */
export async function quickProcess(classString: string): Promise<string> {
  const mod = await loadBackend();
  if (currentBackend === 'native') {
    return (mod as typeof import('./native')).quickProcess(classString);
  } else {
    return await (mod as typeof import('./wasm')).quickProcess(classString);
  }
}

/**
 * Parallel extract from multiple files (native only, WASM falls back to sequential)
 */
export async function parallelExtract(contents: string[]): Promise<string[]> {
  const mod = await loadBackend();
  if (currentBackend === 'native') {
    return (mod as typeof import('./native')).parallelExtract(contents);
  } else {
    // WASM doesn't have true parallelism
    const extractor = await (
      mod as typeof import('./wasm')
    ).Extractor.create();
    return extractor.extractParallel(contents);
  }
}

/**
 * Parallel process multiple class strings (native only)
 */
export async function parallelProcess(classStrings: string[]): Promise<string[]> {
  const mod = await loadBackend();
  if (currentBackend === 'native') {
    return (mod as typeof import('./native')).parallelProcess(classStrings);
  } else {
    const engine = await (mod as typeof import('./wasm')).TurboEngine.create();
    return engine.processBatch(classStrings);
  }
}

// Default export
export default {
  version,
  createEngine,
  createParser,
  createExtractor,
  createGenerator,
  quickParse,
  quickExtract,
  quickProcess,
  parallelExtract,
  parallelProcess,
  getBackend,
};
