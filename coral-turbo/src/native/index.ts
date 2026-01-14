/**
 * Native Node.js bindings for CoralCSS Turbo engine (NAPI-RS)
 *
 * Use this for maximum performance in Node.js build tools
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

// Native module will be loaded dynamically based on platform
let nativeModule: any = null;

/**
 * Load the native module for the current platform
 */
function loadNative(): any {
  if (nativeModule) return nativeModule;

  try {
    // Try to load the native module
    // The .node file will be in the package root after build
    nativeModule = require('../../coral-turbo.node');
  } catch (e1) {
    try {
      // Try platform-specific path
      const platform = process.platform;
      const arch = process.arch;
      nativeModule = require(`../../coral-turbo.${platform}-${arch}.node`);
    } catch (e2) {
      throw new Error(
        `Failed to load native module. Run \`npm run build:napi\` first.\n` +
          `Platform: ${process.platform}, Arch: ${process.arch}`
      );
    }
  }

  return nativeModule;
}

/**
 * Check if native module is available
 */
export function isAvailable(): boolean {
  try {
    loadNative();
    return true;
  } catch {
    return false;
  }
}

/**
 * Get the engine version
 */
export function version(): string {
  return loadNative().version();
}

/**
 * Native Turbo engine
 */
export class TurboEngine implements ITurboEngine {
  private engine: any;

  constructor() {
    const native = loadNative();
    this.engine = new native.NapiTurboEngine();
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
    return this.engine.extractFromFiles(contents);
  }
}

/**
 * Native Parser
 */
export class Parser implements IParser {
  private parser: any;

  constructor() {
    const native = loadNative();
    this.parser = new native.NapiParser();
  }

  parse(className: string): ParsedClass {
    return this.parser.parse(className);
  }

  parseAll(classString: string): ParsedClass[] {
    return this.parser.parseAll(classString);
  }
}

/**
 * Native Extractor
 */
export class Extractor implements IExtractor {
  private extractor: any;

  constructor() {
    const native = loadNative();
    this.extractor = new native.NapiExtractor();
  }

  extract(content: string): string[] {
    return this.extractor.extract(content);
  }

  extractRaw(raw: string): string[] {
    return this.extractor.extractRaw(raw);
  }

  extractParallel(contents: string[]): string[] {
    return this.extractor.extractParallel(contents);
  }
}

/**
 * Native Generator
 */
export class Generator implements IGenerator {
  private generator: any;

  constructor(options?: GenerateOptions) {
    const native = loadNative();
    if (options) {
      this.generator = native.NapiGenerator.withOptions({
        minify: options.minify,
        sourceComments: options.sourceComments,
        sortByProperty: options.sortByProperty,
        useLayers: options.useLayers,
      });
    } else {
      this.generator = new native.NapiGenerator();
    }
  }

  generate(results: MatchResult[]): string {
    return this.generator.generate(JSON.stringify(results));
  }
}

// Quick functions (synchronous for native)

/**
 * Quick parse function
 */
export function quickParse(classString: string): ParsedClass[] {
  return loadNative().quickParse(classString);
}

/**
 * Quick extract function
 */
export function quickExtract(content: string): string[] {
  return loadNative().quickExtract(content);
}

/**
 * Quick process function
 */
export function quickProcess(classString: string): string {
  return loadNative().quickProcess(classString);
}

/**
 * Parallel extract from multiple files
 */
export function parallelExtract(contents: string[]): string[] {
  return loadNative().parallelExtract(contents);
}

/**
 * Parallel process multiple class strings
 */
export function parallelProcess(classStrings: string[]): string[] {
  return loadNative().parallelProcess(classStrings);
}

export * from '../types';
