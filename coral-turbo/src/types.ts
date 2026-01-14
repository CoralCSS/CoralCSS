/**
 * Core types for CoralCSS Turbo engine
 */

/**
 * Represents a parsed CSS class name with all its components
 */
export interface ParsedClass {
  /** Original raw class string */
  raw: string;

  /** Base utility name (e.g., "p", "bg", "text") */
  utility: string;

  /** Utility value (e.g., "4", "red-500", "center") */
  value?: string;

  /** Variants applied (e.g., ["hover", "dark", "md"]) */
  variants: string[];

  /** Opacity modifier (e.g., 50 for "/50") */
  opacity?: number;

  /** Arbitrary value in brackets (e.g., "2rem" from "[2rem]") */
  arbitrary?: string;

  /** Whether the class has important modifier (!) */
  important: boolean;

  /** Negative prefix (-) */
  negative: boolean;
}

/**
 * CSS property-value pair
 */
export interface CSSProperty {
  property: string;
  value: string;
}

/**
 * Result of matching a class against utility patterns
 */
export interface MatchResult {
  /** The parsed class that was matched */
  parsed: ParsedClass;

  /** CSS properties to generate */
  properties: CSSProperty[];

  /** Pattern that matched */
  patternName: string;

  /** Layer this utility belongs to */
  layer: 'base' | 'components' | 'utilities';

  /** Sort order for CSS output */
  sortOrder: number;
}

/**
 * CSS generation options
 */
export interface GenerateOptions {
  /** Minify output */
  minify?: boolean;

  /** Add source comments */
  sourceComments?: boolean;

  /** Sort utilities by property */
  sortByProperty?: boolean;

  /** Use CSS layers */
  useLayers?: boolean;
}

/**
 * Extraction result from file scanning
 */
export interface ExtractionResult {
  /** Unique class names found */
  classes: string[];

  /** Number of files scanned */
  fileCount: number;

  /** Processing time in microseconds */
  timeUs: number;
}

/**
 * Engine configuration
 */
export interface EngineConfig {
  /** Enable caching */
  cacheEnabled?: boolean;

  /** Maximum cache size */
  cacheSize?: number;

  /** Custom prefix (e.g., "tw-") */
  prefix?: string;

  /** Important modifier */
  important?: boolean;
}

/**
 * Turbo engine interface
 */
export interface TurboEngine {
  /** Parse a class string into parsed class objects */
  parse(classString: string): ParsedClass[];

  /** Parse a single class name */
  parseSingle(className: string): ParsedClass;

  /** Extract class names from content */
  extract(content: string): string[];

  /** Process a class string and generate CSS */
  process(classString: string): string;

  /** Process multiple class strings */
  processBatch(classStrings: string[]): string[];

  /** Extract from multiple file contents */
  extractFromFiles(contents: string[]): string[];
}

/**
 * Parser interface
 */
export interface Parser {
  /** Parse a single class name */
  parse(className: string): ParsedClass;

  /** Parse multiple classes from a whitespace-separated string */
  parseAll(classString: string): ParsedClass[];
}

/**
 * Extractor interface
 */
export interface Extractor {
  /** Extract class names from content */
  extract(content: string): string[];

  /** Extract from raw class string (faster) */
  extractRaw(raw: string): string[];

  /** Extract from multiple contents in parallel */
  extractParallel(contents: string[]): string[];
}

/**
 * Generator interface
 */
export interface Generator {
  /** Generate CSS from match results */
  generate(results: MatchResult[]): string;
}
