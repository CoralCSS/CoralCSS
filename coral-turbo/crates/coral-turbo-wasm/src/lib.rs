//! WASM bindings for CoralCSS Turbo engine
//!
//! This crate provides WebAssembly bindings for the Turbo engine,
//! allowing it to be used in both Node.js and browser environments.

use coral_turbo_core::{
    Extractor, Generator, Matcher, Parser, TurboEngine,
    ParsedClass, MatchResult, GenerateOptions,
};
use serde_wasm_bindgen;
use wasm_bindgen::prelude::*;

// Use wee_alloc as the global allocator for smaller WASM size
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

/// Initialize panic hook for better error messages in development
#[wasm_bindgen(start)]
pub fn init() {
    #[cfg(feature = "console_error_panic_hook")]
    console_error_panic_hook::set_once();
}

/// Get the engine version
#[wasm_bindgen]
pub fn version() -> String {
    coral_turbo_core::VERSION.to_string()
}

/// Main WASM interface for the Turbo engine
#[wasm_bindgen]
pub struct WasmTurboEngine {
    engine: TurboEngine,
}

#[wasm_bindgen]
impl WasmTurboEngine {
    /// Create a new TurboEngine instance
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            engine: TurboEngine::new(),
        }
    }

    /// Parse a class string and return JSON array of parsed classes
    #[wasm_bindgen]
    pub fn parse(&self, class_string: &str) -> JsValue {
        let parsed = self.engine.parse(class_string);
        serde_wasm_bindgen::to_value(&parsed).unwrap_or(JsValue::NULL)
    }

    /// Parse a single class name
    #[wasm_bindgen(js_name = "parseSingle")]
    pub fn parse_single(&self, class_name: &str) -> JsValue {
        let parser = Parser::new();
        let parsed = parser.parse(class_name);
        serde_wasm_bindgen::to_value(&parsed).unwrap_or(JsValue::NULL)
    }

    /// Extract class names from content
    #[wasm_bindgen]
    pub fn extract(&self, content: &str) -> Vec<String> {
        self.engine.extract(content)
    }

    /// Process a class string and generate CSS
    #[wasm_bindgen]
    pub fn process(&self, class_string: &str) -> String {
        self.engine.process(class_string)
    }

    /// Process multiple class strings
    #[wasm_bindgen(js_name = "processBatch")]
    pub fn process_batch(&self, class_strings: Vec<String>) -> Vec<String> {
        let refs: Vec<&str> = class_strings.iter().map(|s| s.as_str()).collect();
        self.engine.process_batch(&refs)
    }
}

impl Default for WasmTurboEngine {
    fn default() -> Self {
        Self::new()
    }
}

/// Standalone parser for quick class parsing
#[wasm_bindgen]
pub struct WasmParser {
    parser: Parser,
}

#[wasm_bindgen]
impl WasmParser {
    /// Create a new Parser instance
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            parser: Parser::new(),
        }
    }

    /// Parse a single class name
    #[wasm_bindgen]
    pub fn parse(&self, class_name: &str) -> JsValue {
        let parsed = self.parser.parse(class_name);
        serde_wasm_bindgen::to_value(&parsed).unwrap_or(JsValue::NULL)
    }

    /// Parse multiple classes from a whitespace-separated string
    #[wasm_bindgen(js_name = "parseAll")]
    pub fn parse_all(&self, class_string: &str) -> JsValue {
        let parsed = self.parser.parse_all(class_string);
        serde_wasm_bindgen::to_value(&parsed).unwrap_or(JsValue::NULL)
    }
}

impl Default for WasmParser {
    fn default() -> Self {
        Self::new()
    }
}

/// Standalone extractor for file content scanning
#[wasm_bindgen]
pub struct WasmExtractor {
    extractor: Extractor,
}

#[wasm_bindgen]
impl WasmExtractor {
    /// Create a new Extractor instance
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            extractor: Extractor::new(),
        }
    }

    /// Extract class names from content
    #[wasm_bindgen]
    pub fn extract(&self, content: &str) -> Vec<String> {
        self.extractor.extract(content)
    }

    /// Extract from raw class string (faster, assumes no HTML)
    #[wasm_bindgen(js_name = "extractRaw")]
    pub fn extract_raw(&self, raw: &str) -> Vec<String> {
        self.extractor.extract_raw(raw)
    }
}

impl Default for WasmExtractor {
    fn default() -> Self {
        Self::new()
    }
}

/// Standalone generator for CSS output
#[wasm_bindgen]
pub struct WasmGenerator {
    generator: Generator,
}

#[wasm_bindgen]
impl WasmGenerator {
    /// Create a new Generator with default options
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        Self {
            generator: Generator::new(),
        }
    }

    /// Create a Generator with custom options
    #[wasm_bindgen(js_name = "withOptions")]
    pub fn with_options(minify: bool, use_layers: bool) -> Self {
        Self {
            generator: Generator::with_options(GenerateOptions {
                minify,
                use_layers,
                ..Default::default()
            }),
        }
    }

    /// Generate CSS from match results (as JSON)
    #[wasm_bindgen]
    pub fn generate(&self, results_json: &str) -> String {
        match serde_json::from_str::<Vec<MatchResult>>(results_json) {
            Ok(results) => self.generator.generate(&results),
            Err(_) => String::new(),
        }
    }
}

impl Default for WasmGenerator {
    fn default() -> Self {
        Self::new()
    }
}

// Utility functions

/// Quick parse function for simple use cases
#[wasm_bindgen(js_name = "quickParse")]
pub fn quick_parse(class_string: &str) -> JsValue {
    let parser = Parser::new();
    let parsed = parser.parse_all(class_string);
    serde_wasm_bindgen::to_value(&parsed).unwrap_or(JsValue::NULL)
}

/// Quick extract function for simple use cases
#[wasm_bindgen(js_name = "quickExtract")]
pub fn quick_extract(content: &str) -> Vec<String> {
    let extractor = Extractor::new();
    extractor.extract(content)
}

/// Quick process function for simple use cases
#[wasm_bindgen(js_name = "quickProcess")]
pub fn quick_process(class_string: &str) -> String {
    let engine = TurboEngine::new();
    engine.process(class_string)
}

#[cfg(test)]
mod tests {
    use super::*;
    use wasm_bindgen_test::*;

    #[wasm_bindgen_test]
    fn test_version() {
        assert!(!version().is_empty());
    }

    #[wasm_bindgen_test]
    fn test_engine_creation() {
        let engine = WasmTurboEngine::new();
        let classes = engine.extract(r#"<div class="p-4 m-2"></div>"#);
        assert!(classes.contains(&"p-4".to_string()));
    }

    #[wasm_bindgen_test]
    fn test_parser() {
        let parser = WasmParser::new();
        let result = parser.parse("hover:bg-blue-500");
        assert!(!result.is_null());
    }

    #[wasm_bindgen_test]
    fn test_extractor() {
        let extractor = WasmExtractor::new();
        let classes = extractor.extract(r#"className="text-red-500""#);
        assert!(classes.contains(&"text-red-500".to_string()));
    }
}
