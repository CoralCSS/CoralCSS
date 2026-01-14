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
