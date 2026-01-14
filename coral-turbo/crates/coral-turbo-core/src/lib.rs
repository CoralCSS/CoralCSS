//! # CoralCSS Turbo Core Engine
//!
//! High-performance CSS utility class processing engine written in Rust.
//! Blazing fast CSS utility processing for CoralCSS.
//!
//! ## Features
//!
//! - **Parser**: Ultra-fast class name parsing with variant extraction
//! - **Matcher**: Trie-based pattern matching for 700+ utility patterns
//! - **Extractor**: Parallel file scanning with rayon
//! - **Generator**: Optimized CSS string generation
//!
//! ## Performance
//!
//! This engine is designed for maximum throughput:
//! - Zero-copy parsing where possible
//! - Pre-compiled regex patterns with lazy initialization
//! - Lock-free concurrent processing
//! - Cache-friendly data structures

pub mod types;
pub mod parser;
pub mod matcher;
pub mod extractor;
pub mod generator;
pub mod trie;
pub mod cache;

pub use types::*;
pub use parser::Parser;
pub use matcher::Matcher;
pub use extractor::Extractor;
pub use generator::Generator;

/// Engine version
pub const VERSION: &str = env!("CARGO_PKG_VERSION");

/// Main entry point for the CoralCSS Turbo engine
#[derive(Debug)]
pub struct TurboEngine {
    parser: Parser,
    matcher: Matcher,
    generator: Generator,
    extractor: Extractor,
}

impl TurboEngine {
    /// Create a new TurboEngine instance with default configuration
    pub fn new() -> Self {
        Self {
            parser: Parser::new(),
            matcher: Matcher::new(),
            generator: Generator::new(),
            extractor: Extractor::new(),
        }
    }

    /// Parse a class string into individual ParsedClass structs
    #[inline]
    pub fn parse(&self, class_string: &str) -> Vec<ParsedClass> {
        self.parser.parse_all(class_string)
    }

    /// Match a parsed class against registered utility patterns
    #[inline]
    pub fn match_class(&self, parsed: &ParsedClass) -> Option<MatchResult> {
        self.matcher.match_class(parsed)
    }

    /// Generate CSS from match results
    #[inline]
    pub fn generate(&self, results: &[MatchResult]) -> String {
        self.generator.generate(results)
    }

    /// Extract class names from file content (parallel processing)
    #[inline]
    pub fn extract(&self, content: &str) -> Vec<String> {
        self.extractor.extract(content)
    }

    /// Full pipeline: parse -> match -> generate
    pub fn process(&self, class_string: &str) -> String {
        let parsed = self.parse(class_string);
        let results: Vec<MatchResult> = parsed
            .iter()
            .filter_map(|p| self.match_class(p))
            .collect();
        self.generate(&results)
    }

    /// Process multiple class strings in parallel
    pub fn process_batch(&self, class_strings: &[&str]) -> Vec<String> {
        use rayon::prelude::*;

        class_strings
            .par_iter()
            .map(|s| self.process(s))
            .collect()
    }

    /// Extract classes from multiple files in parallel
    pub fn extract_from_files(&self, contents: &[&str]) -> Vec<String> {
        self.extractor.extract_parallel(contents)
    }

    /// Register a custom utility pattern
    pub fn register_utility(&mut self, pattern: UtilityPattern) {
        self.matcher.register(pattern);
    }

    /// Register multiple utility patterns
    pub fn register_utilities(&mut self, patterns: Vec<UtilityPattern>) {
        for pattern in patterns {
            self.matcher.register(pattern);
        }
    }
}

impl Default for TurboEngine {
    fn default() -> Self {
        Self::new()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_engine_creation() {
        let engine = TurboEngine::new();
        assert_eq!(VERSION, "0.1.0");
    }

    #[test]
    fn test_parse_simple_class() {
        let engine = TurboEngine::new();
        let parsed = engine.parse("p-4 m-2 bg-red-500");
        assert_eq!(parsed.len(), 3);
    }

    #[test]
    fn test_parse_variants() {
        let engine = TurboEngine::new();
        let parsed = engine.parse("hover:bg-blue-500 dark:text-white");
        assert_eq!(parsed.len(), 2);
        assert_eq!(parsed[0].variants, vec!["hover"]);
        assert_eq!(parsed[1].variants, vec!["dark"]);
    }
}
