//! Core types for the CoralCSS Turbo engine

use serde::{Deserialize, Serialize};
use std::collections::HashMap;

/// Represents a parsed CSS class name with all its components
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ParsedClass {
    /// Original raw class string
    pub raw: String,

    /// Base utility name (e.g., "p", "bg", "text")
    pub utility: String,

    /// Utility value (e.g., "4", "red-500", "center")
    pub value: Option<String>,

    /// Variants applied (e.g., ["hover", "dark", "md"])
    pub variants: Vec<String>,

    /// Opacity modifier (e.g., 50 for "/50")
    pub opacity: Option<u8>,

    /// Arbitrary value in brackets (e.g., "2rem" from "[2rem]")
    pub arbitrary: Option<String>,

    /// Whether the class has important modifier (!)
    pub important: bool,

    /// Negative prefix (-)
    pub negative: bool,
}

impl ParsedClass {
    /// Create a new empty ParsedClass
    pub fn new(raw: impl Into<String>) -> Self {
        Self {
            raw: raw.into(),
            utility: String::new(),
            value: None,
            variants: Vec::new(),
            opacity: None,
            arbitrary: None,
            important: false,
            negative: false,
        }
    }

    /// Check if this class has any variants
    #[inline]
    pub fn has_variants(&self) -> bool {
        !self.variants.is_empty()
    }

    /// Check if this class has an arbitrary value
    #[inline]
    pub fn has_arbitrary(&self) -> bool {
        self.arbitrary.is_some()
    }

    /// Get the full utility string (utility + value)
    pub fn full_utility(&self) -> String {
        // Include arbitrary value with brackets if present
        if let Some(ref arb) = self.arbitrary {
            match &self.value {
                Some(v) => format!("{}-{}-[{}]", self.utility, v, arb),
                None => format!("{}-[{}]", self.utility, arb),
            }
        } else {
            match &self.value {
                Some(v) => format!("{}-{}", self.utility, v),
                None => self.utility.clone(),
            }
        }
    }
}

/// Result of matching a class against utility patterns
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct MatchResult {
    /// The parsed class that was matched
    pub parsed: ParsedClass,

    /// CSS properties to generate
    pub properties: Vec<CSSProperty>,

    /// Pattern that matched
    pub pattern_name: String,

    /// Layer this utility belongs to (base, components, utilities)
    pub layer: Layer,

    /// Sort order for CSS output
    pub sort_order: u32,
}

/// A single CSS property-value pair
#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct CSSProperty {
    pub property: String,
    pub value: String,
}

impl CSSProperty {
    pub fn new(property: impl Into<String>, value: impl Into<String>) -> Self {
        Self {
            property: property.into(),
            value: value.into(),
        }
    }
}

/// CSS layer for proper cascade ordering
#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Serialize, Deserialize)]
pub enum Layer {
    Base = 0,
    Components = 1,
    Utilities = 2,
}

impl Default for Layer {
    fn default() -> Self {
        Layer::Utilities
    }
}

/// Utility pattern definition for the matcher
#[derive(Debug, Clone)]
pub struct UtilityPattern {
    /// Pattern name (e.g., "padding", "background-color")
    pub name: String,

    /// Regex pattern to match class names
    pub pattern: String,

    /// Prefix for trie-based lookup (e.g., "p-", "bg-")
    pub prefix: String,

    /// Handler function ID
    pub handler_id: u32,

    /// CSS property to generate
    pub css_property: String,

    /// Layer this pattern belongs to
    pub layer: Layer,

    /// Sort order
    pub sort_order: u32,

    /// Value mappings (e.g., "4" -> "1rem", "full" -> "100%")
    pub values: HashMap<String, String>,

    /// Whether this pattern supports negative values
    pub supports_negative: bool,

    /// Whether this pattern supports arbitrary values
    pub supports_arbitrary: bool,
}

impl UtilityPattern {
    pub fn new(name: impl Into<String>, prefix: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            pattern: String::new(),
            prefix: prefix.into(),
            handler_id: 0,
            css_property: String::new(),
            layer: Layer::Utilities,
            sort_order: 0,
            values: HashMap::new(),
            supports_negative: false,
            supports_arbitrary: true,
        }
    }

    pub fn with_pattern(mut self, pattern: impl Into<String>) -> Self {
        self.pattern = pattern.into();
        self
    }

    pub fn with_css_property(mut self, prop: impl Into<String>) -> Self {
        self.css_property = prop.into();
        self
    }

    pub fn with_values(mut self, values: HashMap<String, String>) -> Self {
        self.values = values;
        self
    }

    pub fn with_negative(mut self) -> Self {
        self.supports_negative = true;
        self
    }
}

/// Variant definition
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Variant {
    /// Variant name (e.g., "hover", "dark", "md")
    pub name: String,

    /// CSS selector or media query
    pub selector: VariantSelector,

    /// Sort order for variant application
    pub order: u32,
}

/// How a variant transforms the selector
#[derive(Debug, Clone, Serialize, Deserialize)]
pub enum VariantSelector {
    /// Pseudo-class (e.g., ":hover", ":focus")
    Pseudo(String),

    /// Pseudo-element (e.g., "::before", "::after")
    PseudoElement(String),

    /// Media query (e.g., "@media (min-width: 768px)")
    Media(String),

    /// Attribute selector (e.g., "[data-theme='dark']")
    Attribute(String),

    /// Parent selector (e.g., ".dark &")
    Parent(String),

    /// Container query
    Container(String),
}

/// Configuration for the engine
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct EngineConfig {
    /// Enable caching
    pub cache_enabled: bool,

    /// Maximum cache size
    pub cache_size: usize,

    /// Number of worker threads for parallel processing
    pub thread_count: usize,

    /// Custom prefix (e.g., "tw-")
    pub prefix: Option<String>,

    /// Important modifier
    pub important: bool,
}

impl Default for EngineConfig {
    fn default() -> Self {
        Self {
            cache_enabled: true,
            cache_size: 10000,
            thread_count: num_cpus(),
            prefix: None,
            important: false,
        }
    }
}

/// Get the number of CPUs for parallel processing
fn num_cpus() -> usize {
    std::thread::available_parallelism()
        .map(|p| p.get())
        .unwrap_or(4)
}

/// Extraction result from file scanning
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ExtractionResult {
    /// Unique class names found
    pub classes: Vec<String>,

    /// Number of files scanned
    pub file_count: usize,

    /// Processing time in microseconds
    pub time_us: u64,
}

/// CSS generation options
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct GenerateOptions {
    /// Minify output
    pub minify: bool,

    /// Add source comments
    pub source_comments: bool,

    /// Sort utilities by property
    pub sort_by_property: bool,

    /// Use CSS layers
    pub use_layers: bool,
}

impl Default for GenerateOptions {
    fn default() -> Self {
        Self {
            minify: false,
            source_comments: false,
            sort_by_property: true,
            use_layers: true,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_parsed_class_new() {
        let pc = ParsedClass::new("p-4");
        assert_eq!(pc.raw, "p-4");
        assert_eq!(pc.utility, "");
        assert!(!pc.important);
        assert!(!pc.negative);
    }

    #[test]
    fn test_parsed_class_has_variants() {
        let mut pc = ParsedClass::new("hover:p-4");
        assert!(!pc.has_variants());

        pc.variants = vec!["hover".to_string()];
        assert!(pc.has_variants());
    }

    #[test]
    fn test_parsed_class_has_arbitrary() {
        let mut pc = ParsedClass::new("p-[2rem]");
        assert!(!pc.has_arbitrary());

        pc.arbitrary = Some("2rem".to_string());
        assert!(pc.has_arbitrary());
    }

    #[test]
    fn test_parsed_class_full_utility() {
        // Simple utility
        let mut pc = ParsedClass::new("p-4");
        pc.utility = "p".to_string();
        pc.value = Some("4".to_string());
        assert_eq!(pc.full_utility(), "p-4");

        // Utility without value
        let mut pc2 = ParsedClass::new("flex");
        pc2.utility = "flex".to_string();
        assert_eq!(pc2.full_utility(), "flex");

        // With arbitrary value
        let mut pc3 = ParsedClass::new("p-[2rem]");
        pc3.utility = "p".to_string();
        pc3.arbitrary = Some("2rem".to_string());
        assert_eq!(pc3.full_utility(), "p-[2rem]");

        // With value and arbitrary
        let mut pc4 = ParsedClass::new("bg-red-[#ff0000]");
        pc4.utility = "bg".to_string();
        pc4.value = Some("red".to_string());
        pc4.arbitrary = Some("#ff0000".to_string());
        assert_eq!(pc4.full_utility(), "bg-red-[#ff0000]");
    }

    #[test]
    fn test_css_property_new() {
        let prop = CSSProperty::new("padding", "1rem");
        assert_eq!(prop.property, "padding");
        assert_eq!(prop.value, "1rem");
    }

    #[test]
    fn test_layer_default() {
        let layer = Layer::default();
        assert_eq!(layer, Layer::Utilities);
    }

    #[test]
    fn test_layer_ordering() {
        assert!(Layer::Base < Layer::Components);
        assert!(Layer::Components < Layer::Utilities);
    }

    #[test]
    fn test_utility_pattern_builder() {
        let pattern = UtilityPattern::new("padding", "p-")
            .with_pattern(r"^p-\d+$")
            .with_css_property("padding")
            .with_negative();

        assert_eq!(pattern.name, "padding");
        assert_eq!(pattern.prefix, "p-");
        assert_eq!(pattern.pattern, r"^p-\d+$");
        assert_eq!(pattern.css_property, "padding");
        assert!(pattern.supports_negative);
        assert!(pattern.supports_arbitrary);
    }

    #[test]
    fn test_utility_pattern_with_values() {
        let mut values = HashMap::new();
        values.insert("4".to_string(), "1rem".to_string());
        values.insert("8".to_string(), "2rem".to_string());

        let pattern = UtilityPattern::new("padding", "p-")
            .with_values(values);

        assert_eq!(pattern.values.get("4"), Some(&"1rem".to_string()));
        assert_eq!(pattern.values.get("8"), Some(&"2rem".to_string()));
    }

    #[test]
    fn test_engine_config_default() {
        let config = EngineConfig::default();
        assert!(config.cache_enabled);
        assert_eq!(config.cache_size, 10000);
        assert!(config.thread_count > 0);
        assert!(config.prefix.is_none());
        assert!(!config.important);
    }

    #[test]
    fn test_generate_options_default() {
        let opts = GenerateOptions::default();
        assert!(!opts.minify);
        assert!(!opts.source_comments);
        assert!(opts.sort_by_property);
        assert!(opts.use_layers);
    }

    #[test]
    fn test_variant_selector_variants() {
        let pseudo = VariantSelector::Pseudo(":hover".to_string());
        let media = VariantSelector::Media("@media (min-width: 768px)".to_string());
        let attr = VariantSelector::Attribute("[data-theme='dark']".to_string());

        // Just verify they can be created
        match pseudo {
            VariantSelector::Pseudo(s) => assert_eq!(s, ":hover"),
            _ => panic!("Expected Pseudo variant"),
        }

        match media {
            VariantSelector::Media(s) => assert!(s.contains("768px")),
            _ => panic!("Expected Media variant"),
        }

        match attr {
            VariantSelector::Attribute(s) => assert!(s.contains("dark")),
            _ => panic!("Expected Attribute variant"),
        }
    }

    #[test]
    fn test_extraction_result() {
        let result = ExtractionResult {
            classes: vec!["p-4".to_string(), "m-2".to_string()],
            file_count: 5,
            time_us: 1000,
        };

        assert_eq!(result.classes.len(), 2);
        assert_eq!(result.file_count, 5);
        assert_eq!(result.time_us, 1000);
    }

    #[test]
    fn test_match_result() {
        let parsed = ParsedClass::new("p-4");
        let result = MatchResult {
            parsed,
            properties: vec![CSSProperty::new("padding", "1rem")],
            pattern_name: "padding".to_string(),
            layer: Layer::Utilities,
            sort_order: 0,
        };

        assert_eq!(result.pattern_name, "padding");
        assert_eq!(result.layer, Layer::Utilities);
        assert_eq!(result.properties.len(), 1);
    }
}
