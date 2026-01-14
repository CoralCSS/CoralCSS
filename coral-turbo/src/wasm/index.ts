/**
 * WASM bindings for CoralCSS Turbo engine
 *
 * Use this when you need cross-platform support (Node.js + browser)
 */

import type {
  ParsedClass,
  TurboEngine as ITurboEngine,
  Parser as IParser,
  Extractor as IExtractor,
  Generator as IGenerator,
  GenerateOptions,
  MatchResult,
} from '../types';

// WASM module will be loaded dynamically
let wasmModule: any = null;
let initPromise: Promise<void> | null = null;

/**
 * Initialize the WASM module
 * Call this before using any WASM functions
 */
export async function init(): Promise<void> {
  if (wasmModule) return;

  if (!initPromise) {
    initPromise = (async () => {
      try {
        // Try to load from pkg directory
        wasmModule = await import('../../pkg/wasm/coral_turbo_wasm.js');
        await wasmModule.default?.();
      } catch (e) {
        console.error('Failed to load WASM module:', e);
        throw new Error(
          'WASM module not found. Run `npm run build:wasm` first.'
        );
      }
    })();
  }

  await initPromise;
}

/**
 * Check if WASM is initialized
 */
export function isInitialized(): boolean {
  return wasmModule !== null;
}

/**
 * Get the engine version
 */
export async function version(): Promise<string> {
  await init();
  return wasmModule.version();
}

/**
 * WASM-based Turbo engine
 */
export class TurboEngine implements ITurboEngine {
  private engine: any;

  private constructor(engine: any) {
    this.engine = engine;
  }

  /**
   * Create a new TurboEngine instance
   */
  static async create(): Promise<TurboEngine> {
    await init();
    const engine = new wasmModule.WasmTurboEngine();
    return new TurboEngine(engine);
  }

  parse(classString: string): ParsedClass[] {
    return this.engine.parse(classString);
  }

  parseSingle(className: string): ParsedClass {
    return this.engine.parseSingle(className);
  }

  extract(content: string): string[] {
    return this.engine.extract(content);
  }

  process(classString: string): string {
    return this.engine.process(classString);
  }

  processBatch(classStrings: string[]): string[] {
    return this.engine.processBatch(classStrings);
  }

  extractFromFiles(contents: string[]): string[] {
    return contents.flatMap((content) => this.extract(content));
  }
}

/**
 * WASM-based Parser
 */
export class Parser implements IParser {
  private parser: any;

  private constructor(parser: any) {
    this.parser = parser;
  }

  static async create(): Promise<Parser> {
    await init();
    const parser = new wasmModule.WasmParser();
    return new Parser(parser);
  }

  parse(className: string): ParsedClass {
    return this.parser.parse(className);
  }

  parseAll(classString: string): ParsedClass[] {
    return this.parser.parseAll(classString);
  }
}

/**
 * WASM-based Extractor
 */
export class Extractor implements IExtractor {
  private extractor: any;

  private constructor(extractor: any) {
    this.extractor = extractor;
  }

  static async create(): Promise<Extractor> {
    await init();
    const extractor = new wasmModule.WasmExtractor();
    return new Extractor(extractor);
  }

  extract(content: string): string[] {
    return this.extractor.extract(content);
  }

  extractRaw(raw: string): string[] {
    return this.extractor.extractRaw(raw);
  }

  extractParallel(contents: string[]): string[] {
    // WASM doesn't have true parallelism, process sequentially
    return contents.flatMap((content) => this.extract(content));
  }
}

/**
 * WASM-based Generator
 */
export class Generator implements IGenerator {
  private generator: any;

  private constructor(generator: any) {
    this.generator = generator;
  }

  static async create(options?: GenerateOptions): Promise<Generator> {
    await init();
    const generator = options
      ? wasmModule.WasmGenerator.withOptions(
          options.minify ?? false,
          options.useLayers ?? true
        )
      : new wasmModule.WasmGenerator();
    return new Generator(generator);
  }

  generate(results: MatchResult[]): string {
    return this.generator.generate(JSON.stringify(results));
  }
}

// Quick functions

/**
 * Quick parse function
 */
export async function quickParse(classString: string): Promise<ParsedClass[]> {
  await init();
  return wasmModule.quickParse(classString);
}

/**
 * Quick extract function
 */
export async function quickExtract(content: string): Promise<string[]> {
  await init();
  return wasmModule.quickExtract(content);
}

/**
 * Quick process function
 */
export async function quickProcess(classString: string): Promise<string> {
  await init();
  return wasmModule.quickProcess(classString);
}

export * from '../types';
