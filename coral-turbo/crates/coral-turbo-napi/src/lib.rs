//! Node.js native bindings for CoralCSS Turbo engine (NAPI-RS)
//!
//! This crate provides Node.js native bindings for maximum performance
//! in Node.js build tools like Vite, Webpack, etc.

use coral_turbo_core::{
    Extractor, Generator, Matcher, Parser, TurboEngine,
    ParsedClass, MatchResult, GenerateOptions, ExtractionResult,
};
use napi::bindgen_prelude::*;
use napi_derive::napi;
use std::sync::Arc;

/// Engine version
#[napi]
pub fn version() -> String {
    coral_turbo_core::VERSION.to_string()
}

/// Parsed class structure for JavaScript
#[napi(object)]
pub struct JsParsedClass {
    pub raw: String,
    pub utility: String,
    pub value: Option<String>,
    pub variants: Vec<String>,
    pub opacity: Option<u32>,
    pub arbitrary: Option<String>,
    pub important: bool,
    pub negative: bool,
}

impl From<ParsedClass> for JsParsedClass {
    fn from(p: ParsedClass) -> Self {
        Self {
            raw: p.raw,
            utility: p.utility,
            value: p.value,
            variants: p.variants,
            opacity: p.opacity.map(|o| o as u32),
            arbitrary: p.arbitrary,
            important: p.important,
            negative: p.negative,
        }
    }
}

/// CSS property structure for JavaScript
#[napi(object)]
pub struct JsCssProperty {
    pub property: String,
    pub value: String,
}

/// Match result structure for JavaScript
#[napi(object)]
pub struct JsMatchResult {
    pub parsed: JsParsedClass,
    pub properties: Vec<JsCssProperty>,
    pub pattern_name: String,
    pub layer: String,
    pub sort_order: u32,
}

impl From<MatchResult> for JsMatchResult {
    fn from(m: MatchResult) -> Self {
        Self {
            parsed: m.parsed.into(),
            properties: m.properties.into_iter().map(|p| JsCssProperty {
                property: p.property,
                value: p.value,
            }).collect(),
            pattern_name: m.pattern_name,
            layer: match m.layer {
                coral_turbo_core::Layer::Base => "base".to_string(),
                coral_turbo_core::Layer::Components => "components".to_string(),
                coral_turbo_core::Layer::Utilities => "utilities".to_string(),
            },
            sort_order: m.sort_order,
        }
    }
}

/// Extraction result structure for JavaScript
#[napi(object)]
pub struct JsExtractionResult {
    pub classes: Vec<String>,
    pub file_count: u32,
    pub time_us: u32,
}

/// Main Turbo engine for Node.js
#[napi]
pub struct NapiTurboEngine {
    engine: Arc<TurboEngine>,
}

#[napi]
impl NapiTurboEngine {
    /// Create a new TurboEngine instance
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            engine: Arc::new(TurboEngine::new()),
        }
    }

    /// Parse a class string into parsed class objects
    #[napi]
    pub fn parse(&self, class_string: String) -> Vec<JsParsedClass> {
        self.engine
            .parse(&class_string)
            .into_iter()
            .map(|p| p.into())
            .collect()
    }

    /// Parse a single class name
    #[napi]
    pub fn parse_single(&self, class_name: String) -> JsParsedClass {
        let parser = Parser::new();
        parser.parse(&class_name).into()
    }

    /// Extract class names from content
    #[napi]
    pub fn extract(&self, content: String) -> Vec<String> {
        self.engine.extract(&content)
    }

    /// Process a class string and generate CSS
    #[napi]
    pub fn process(&self, class_string: String) -> String {
        self.engine.process(&class_string)
    }

    /// Process multiple class strings in parallel
    #[napi]
    pub fn process_batch(&self, class_strings: Vec<String>) -> Vec<String> {
        let refs: Vec<&str> = class_strings.iter().map(|s| s.as_str()).collect();
        self.engine.process_batch(&refs)
    }

    /// Extract from multiple file contents in parallel
    #[napi]
    pub fn extract_from_files(&self, contents: Vec<String>) -> Vec<String> {
        let refs: Vec<&str> = contents.iter().map(|s| s.as_str()).collect();
        self.engine.extract_from_files(&refs)
    }
}

impl Default for NapiTurboEngine {
    fn default() -> Self {
        Self::new()
    }
}

/// Standalone parser for Node.js
#[napi]
pub struct NapiParser {
    parser: Parser,
}

#[napi]
impl NapiParser {
    /// Create a new Parser instance
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            parser: Parser::new(),
        }
    }

    /// Parse a single class name
    #[napi]
    pub fn parse(&self, class_name: String) -> JsParsedClass {
        self.parser.parse(&class_name).into()
    }

    /// Parse multiple classes from a whitespace-separated string
    #[napi]
    pub fn parse_all(&self, class_string: String) -> Vec<JsParsedClass> {
        self.parser
            .parse_all(&class_string)
            .into_iter()
            .map(|p| p.into())
            .collect()
    }
}

impl Default for NapiParser {
    fn default() -> Self {
        Self::new()
    }
}

/// Standalone extractor for Node.js
#[napi]
pub struct NapiExtractor {
    extractor: Extractor,
}

#[napi]
impl NapiExtractor {
    /// Create a new Extractor instance
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            extractor: Extractor::new(),
        }
    }

    /// Extract class names from content
    #[napi]
    pub fn extract(&self, content: String) -> Vec<String> {
        self.extractor.extract(&content)
    }

    /// Extract from raw class string (faster)
    #[napi]
    pub fn extract_raw(&self, raw: String) -> Vec<String> {
        self.extractor.extract_raw(&raw)
    }

    /// Extract from multiple contents in parallel
    #[napi]
    pub fn extract_parallel(&self, contents: Vec<String>) -> Vec<String> {
        let refs: Vec<&str> = contents.iter().map(|s| s.as_str()).collect();
        self.extractor.extract_parallel(&refs)
    }
}

impl Default for NapiExtractor {
    fn default() -> Self {
        Self::new()
    }
}

/// Generator options for Node.js
#[napi(object)]
pub struct JsGenerateOptions {
    pub minify: Option<bool>,
    pub source_comments: Option<bool>,
    pub sort_by_property: Option<bool>,
    pub use_layers: Option<bool>,
}

/// Standalone generator for Node.js
#[napi]
pub struct NapiGenerator {
    generator: Generator,
}

#[napi]
impl NapiGenerator {
    /// Create a new Generator with default options
    #[napi(constructor)]
    pub fn new() -> Self {
        Self {
            generator: Generator::new(),
        }
    }

    /// Create a Generator with custom options
    #[napi(factory)]
    pub fn with_options(options: JsGenerateOptions) -> Self {
        Self {
            generator: Generator::with_options(GenerateOptions {
                minify: options.minify.unwrap_or(false),
                source_comments: options.source_comments.unwrap_or(false),
                sort_by_property: options.sort_by_property.unwrap_or(true),
                use_layers: options.use_layers.unwrap_or(true),
            }),
        }
    }
}

impl Default for NapiGenerator {
    fn default() -> Self {
        Self::new()
    }
}

// Utility functions for quick operations

/// Quick parse function
#[napi]
pub fn quick_parse(class_string: String) -> Vec<JsParsedClass> {
    let parser = Parser::new();
    parser
        .parse_all(&class_string)
        .into_iter()
        .map(|p| p.into())
        .collect()
}

/// Quick extract function
#[napi]
pub fn quick_extract(content: String) -> Vec<String> {
    let extractor = Extractor::new();
    extractor.extract(&content)
}

/// Quick process function
#[napi]
pub fn quick_process(class_string: String) -> String {
    let engine = TurboEngine::new();
    engine.process(&class_string)
}

/// Parallel extract from multiple files
#[napi]
pub fn parallel_extract(contents: Vec<String>) -> Vec<String> {
    let extractor = Extractor::new();
    let refs: Vec<&str> = contents.iter().map(|s| s.as_str()).collect();
    extractor.extract_parallel(&refs)
}

/// Parallel process multiple class strings
#[napi]
pub fn parallel_process(class_strings: Vec<String>) -> Vec<String> {
    let engine = TurboEngine::new();
    let refs: Vec<&str> = class_strings.iter().map(|s| s.as_str()).collect();
    engine.process_batch(&refs)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_version() {
        assert!(!version().is_empty());
    }

    #[test]
    fn test_engine_creation() {
        let engine = NapiTurboEngine::new();
        let classes = engine.extract(r#"<div class="p-4 m-2"></div>"#.to_string());
        assert!(classes.contains(&"p-4".to_string()));
    }

    #[test]
    fn test_parser() {
        let parser = NapiParser::new();
        let result = parser.parse("hover:bg-blue-500".to_string());
        assert_eq!(result.variants, vec!["hover"]);
    }

    #[test]
    fn test_extractor() {
        let extractor = NapiExtractor::new();
        let classes = extractor.extract(r#"className="text-red-500""#.to_string());
        assert!(classes.contains(&"text-red-500".to_string()));
    }

    #[test]
    fn test_quick_functions() {
        let parsed = quick_parse("p-4 m-2".to_string());
        assert_eq!(parsed.len(), 2);

        let extracted = quick_extract(r#"class="flex items-center""#.to_string());
        assert!(extracted.len() >= 2);
    }
}
