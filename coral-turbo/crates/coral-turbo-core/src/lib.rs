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
        let _engine = TurboEngine::new();
        assert_eq!(VERSION, "1.0.0");
    }

    #[test]
    fn test_engine_default() {
        let engine = TurboEngine::default();
        // Should work the same as new()
        let parsed = engine.parse("p-4");
        assert_eq!(parsed.len(), 1);
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

    #[test]
    fn test_match_class() {
        let engine = TurboEngine::new();
        let parsed = engine.parse("p-4");
        let result = engine.match_class(&parsed[0]);

        assert!(result.is_some());
        let result = result.unwrap();
        assert_eq!(result.properties[0].property, "padding");
    }

    #[test]
    fn test_generate() {
        let engine = TurboEngine::new();
        let parsed = engine.parse("p-4");
        let results: Vec<MatchResult> = parsed
            .iter()
            .filter_map(|p| engine.match_class(p))
            .collect();

        let css = engine.generate(&results);
        assert!(css.contains(".p-4"));
        assert!(css.contains("padding"));
    }

    #[test]
    fn test_extract() {
        let engine = TurboEngine::new();
        let html = r#"<div class="p-4 m-2 flex">"#;
        let classes = engine.extract(html);

        assert!(classes.contains(&"p-4".to_string()));
        assert!(classes.contains(&"m-2".to_string()));
        assert!(classes.contains(&"flex".to_string()));
    }

    #[test]
    fn test_process_pipeline() {
        let engine = TurboEngine::new();
        let css = engine.process("p-4 m-2");

        assert!(css.contains(".p-4"));
        assert!(css.contains(".m-2"));
        assert!(css.contains("@layer utilities"));
    }

    #[test]
    fn test_process_batch() {
        let engine = TurboEngine::new();
        let results = engine.process_batch(&["p-4", "m-2", "flex"]);

        assert_eq!(results.len(), 3);
        assert!(results[0].contains(".p-4"));
        assert!(results[1].contains(".m-2"));
        assert!(results[2].contains(".flex"));
    }

    #[test]
    fn test_extract_from_files() {
        let engine = TurboEngine::new();
        let files = [
            r#"<div class="p-4 m-2">"#,
            r#"<div class="flex items-center">"#,
        ];

        let classes = engine.extract_from_files(&files);
        assert!(classes.contains(&"p-4".to_string()));
        assert!(classes.contains(&"flex".to_string()));
    }

    #[test]
    fn test_register_utility() {
        let mut engine = TurboEngine::new();

        let pattern = UtilityPattern::new("custom-spacing", "cs-")
            .with_pattern(r"^cs-\d+$")
            .with_css_property("custom-spacing");

        engine.register_utility(pattern);
        // Registration should not panic
    }

    #[test]
    fn test_register_utilities() {
        let mut engine = TurboEngine::new();

        let patterns = vec![
            UtilityPattern::new("custom1", "c1-")
                .with_pattern(r"^c1-\d+$"),
            UtilityPattern::new("custom2", "c2-")
                .with_pattern(r"^c2-\d+$"),
        ];

        engine.register_utilities(patterns);
        // Registration should not panic
    }

    #[test]
    fn test_process_empty_string() {
        let engine = TurboEngine::new();
        let css = engine.process("");

        // Should return empty or minimal output
        assert!(css.is_empty() || css.contains("@layer"));
    }

    #[test]
    fn test_process_with_important() {
        let engine = TurboEngine::new();
        let css = engine.process("!p-4");

        // CSS should be generated for important class
        assert!(!css.is_empty());
    }

    #[test]
    fn test_process_with_negative() {
        let engine = TurboEngine::new();
        let css = engine.process("-m-4");

        // CSS should be generated for negative class
        assert!(css.contains("-1rem") || css.contains("margin"));
    }

    #[test]
    fn test_process_complex_classes() {
        let engine = TurboEngine::new();
        let css = engine.process("dark:hover:bg-blue-500 md:flex lg:hidden");

        // Should handle complex variant combinations
        assert!(!css.is_empty());
    }
}
