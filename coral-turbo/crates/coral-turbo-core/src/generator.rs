//! CSS string generator
//!
//! Generates CSS output from matched utility classes.
//! Handles variant wrapping, layer organization, and output formatting.

use crate::types::{GenerateOptions, Layer, MatchResult, Variant, VariantSelector};
use std::collections::BTreeMap;

/// High-performance CSS generator
#[derive(Debug, Clone)]
pub struct Generator {
    /// Generation options
    options: GenerateOptions,

    /// Registered variants
    variants: Vec<Variant>,
}

impl Default for Generator {
    fn default() -> Self {
        Self::new()
    }
}

impl Generator {
    /// Create a new Generator with default options
    pub fn new() -> Self {
        let mut generator = Self {
            options: GenerateOptions::default(),
            variants: Vec::new(),
        };

        generator.register_default_variants();
        generator
    }

    /// Create a Generator with custom options
    pub fn with_options(options: GenerateOptions) -> Self {
        let mut generator = Self {
            options,
            variants: Vec::new(),
        };

        generator.register_default_variants();
        generator
    }

    /// Generate CSS from match results
    pub fn generate(&self, results: &[MatchResult]) -> String {
        if results.is_empty() {
            return String::new();
        }

        // Group results by layer
        let mut by_layer: BTreeMap<Layer, Vec<&MatchResult>> = BTreeMap::new();
        for result in results {
            by_layer.entry(result.layer).or_default().push(result);
        }

        let mut output = String::with_capacity(results.len() * 100);

        // Generate CSS for each layer
        if self.options.use_layers {
            for (layer, results) in by_layer {
                let layer_name = match layer {
                    Layer::Base => "base",
                    Layer::Components => "components",
                    Layer::Utilities => "utilities",
                };

                output.push_str(&format!("@layer {} {{\n", layer_name));

                for result in results {
                    let rule = self.generate_rule(result);
                    output.push_str(&rule);
                }

                output.push_str("}\n\n");
            }
        } else {
            // No layers, just output rules
            for result in results {
                let rule = self.generate_rule(result);
                output.push_str(&rule);
            }
        }

        if self.options.minify {
            self.minify(&output)
        } else {
            output
        }
    }

    /// Generate a single CSS rule from a match result
    fn generate_rule(&self, result: &MatchResult) -> String {
        let selector = self.generate_selector(&result.parsed.raw, &result.parsed.variants);
        let properties = self.generate_properties(result);

        if self.options.minify {
            format!("{}{{{}}}", selector, properties)
        } else {
            format!("{} {{\n{}}}\n", selector, properties)
        }
    }

    /// Generate CSS selector with variant wrappers
    fn generate_selector(&self, class_name: &str, variants: &[String]) -> String {
        // Escape special characters in class name for CSS selector
        let escaped = escape_css_selector(class_name);
        let base_selector = format!(".{}", escaped);

        if variants.is_empty() {
            return base_selector;
        }

        // Build selector with variants (apply in reverse order)
        let mut selector = base_selector;
        let mut media_queries = Vec::new();
        let mut container_queries = Vec::new();

        for variant_name in variants.iter().rev() {
            if let Some(variant) = self.find_variant(variant_name) {
                match &variant.selector {
                    VariantSelector::Pseudo(pseudo) => {
                        selector = format!("{}{}", selector, pseudo);
                    }
                    VariantSelector::PseudoElement(pseudo) => {
                        selector = format!("{}{}", selector, pseudo);
                    }
                    VariantSelector::Media(query) => {
                        media_queries.push(query.clone());
                    }
                    VariantSelector::Container(query) => {
                        container_queries.push(query.clone());
                    }
                    VariantSelector::Attribute(attr) => {
                        selector = format!("{}{}", attr, selector.replace('.', " ."));
                    }
                    VariantSelector::Parent(parent) => {
                        selector = format!("{} {}", parent, selector);
                    }
                }
            } else {
                // Unknown variant - treat as custom pseudo-class
                selector = format!("{}:{}", selector, variant_name);
            }
        }

        // Wrap in media queries if needed (these go around the whole rule later)
        // For now, just return the selector
        selector
    }

    /// Generate CSS property declarations
    fn generate_properties(&self, result: &MatchResult) -> String {
        let mut output = String::new();
        let important = if result.parsed.important { " !important" } else { "" };

        for prop in &result.properties {
            if self.options.minify {
                output.push_str(&format!("{}:{}{};", prop.property, prop.value, important));
            } else {
                output.push_str(&format!("  {}: {}{};\n", prop.property, prop.value, important));
            }
        }

        output
    }

    /// Find a variant by name
    fn find_variant(&self, name: &str) -> Option<&Variant> {
        self.variants.iter().find(|v| v.name == name)
    }

    /// Minify CSS output
    fn minify(&self, css: &str) -> String {
        css.lines()
            .map(|l| l.trim())
            .filter(|l| !l.is_empty())
            .collect::<Vec<_>>()
            .join("")
    }

    /// Register default variants
    fn register_default_variants(&mut self) {
        // Pseudo-class variants
        let pseudo_variants = [
            ("hover", ":hover"),
            ("focus", ":focus"),
            ("focus-visible", ":focus-visible"),
            ("focus-within", ":focus-within"),
            ("active", ":active"),
            ("visited", ":visited"),
            ("target", ":target"),
            ("first", ":first-child"),
            ("last", ":last-child"),
            ("only", ":only-child"),
            ("odd", ":nth-child(odd)"),
            ("even", ":nth-child(even)"),
            ("first-of-type", ":first-of-type"),
            ("last-of-type", ":last-of-type"),
            ("only-of-type", ":only-of-type"),
            ("empty", ":empty"),
            ("disabled", ":disabled"),
            ("enabled", ":enabled"),
            ("checked", ":checked"),
            ("indeterminate", ":indeterminate"),
            ("default", ":default"),
            ("required", ":required"),
            ("valid", ":valid"),
            ("invalid", ":invalid"),
            ("in-range", ":in-range"),
            ("out-of-range", ":out-of-range"),
            ("placeholder-shown", ":placeholder-shown"),
            ("autofill", ":autofill"),
            ("read-only", ":read-only"),
        ];

        for (name, selector) in pseudo_variants {
            self.variants.push(Variant {
                name: name.to_string(),
                selector: VariantSelector::Pseudo(selector.to_string()),
                order: 100,
            });
        }

        // Pseudo-element variants
        let pseudo_elements = [
            ("before", "::before"),
            ("after", "::after"),
            ("placeholder", "::placeholder"),
            ("file", "::file-selector-button"),
            ("marker", "::marker"),
            ("selection", "::selection"),
            ("first-line", "::first-line"),
            ("first-letter", "::first-letter"),
            ("backdrop", "::backdrop"),
        ];

        for (name, selector) in pseudo_elements {
            self.variants.push(Variant {
                name: name.to_string(),
                selector: VariantSelector::PseudoElement(selector.to_string()),
                order: 200,
            });
        }

        // Responsive variants
        let breakpoints = [
            ("sm", "@media (min-width: 640px)"),
            ("md", "@media (min-width: 768px)"),
            ("lg", "@media (min-width: 1024px)"),
            ("xl", "@media (min-width: 1280px)"),
            ("2xl", "@media (min-width: 1536px)"),
        ];

        for (name, query) in breakpoints {
            self.variants.push(Variant {
                name: name.to_string(),
                selector: VariantSelector::Media(query.to_string()),
                order: 50,
            });
        }

        // Dark mode
        self.variants.push(Variant {
            name: "dark".to_string(),
            selector: VariantSelector::Parent(".dark".to_string()),
            order: 10,
        });

        // Print
        self.variants.push(Variant {
            name: "print".to_string(),
            selector: VariantSelector::Media("@media print".to_string()),
            order: 60,
        });

        // Motion preferences
        self.variants.push(Variant {
            name: "motion-safe".to_string(),
            selector: VariantSelector::Media("@media (prefers-reduced-motion: no-preference)".to_string()),
            order: 70,
        });
        self.variants.push(Variant {
            name: "motion-reduce".to_string(),
            selector: VariantSelector::Media("@media (prefers-reduced-motion: reduce)".to_string()),
            order: 70,
        });

        // Container queries
        self.variants.push(Variant {
            name: "@container".to_string(),
            selector: VariantSelector::Container("@container".to_string()),
            order: 80,
        });
    }
}

/// Escape special characters in CSS selector
fn escape_css_selector(s: &str) -> String {
    let mut result = String::with_capacity(s.len() * 2);

    for ch in s.chars() {
        match ch {
            ':' | '[' | ']' | '(' | ')' | '/' | '!' | '@' | '#' | '$' | '%' | '^' | '&' | '*'
            | '+' | '=' | '~' | '`' | '{' | '}' | '|' | '\\' | ';' | ',' | '.' | '?' | '<' | '>' => {
                result.push('\\');
                result.push(ch);
            }
            _ => result.push(ch),
        }
    }

    result
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::types::{CSSProperty, ParsedClass};

    fn make_result(class: &str, property: &str, value: &str) -> MatchResult {
        MatchResult {
            parsed: ParsedClass {
                raw: class.to_string(),
                utility: class.to_string(),
                value: None,
                variants: vec![],
                opacity: None,
                arbitrary: None,
                important: false,
                negative: false,
            },
            properties: vec![CSSProperty::new(property, value)],
            pattern_name: "test".to_string(),
            layer: Layer::Utilities,
            sort_order: 0,
        }
    }

    #[test]
    fn test_generate_simple() {
        let generator = Generator::new();
        let results = vec![make_result("p-4", "padding", "1rem")];

        let css = generator.generate(&results);
        assert!(css.contains(".p-4"));
        assert!(css.contains("padding: 1rem"));
    }

    #[test]
    fn test_escape_selector() {
        let escaped = escape_css_selector("hover:bg-blue-500");
        assert_eq!(escaped, "hover\\:bg-blue-500");
    }

    #[test]
    fn test_generate_with_variants() {
        let generator = Generator::new();
        let mut result = make_result("hover:bg-blue-500", "background-color", "#3b82f6");
        result.parsed.variants = vec!["hover".to_string()];

        let results = vec![result];
        let css = generator.generate(&results);

        assert!(css.contains("hover\\:bg-blue-500:hover"));
    }

    #[test]
    fn test_generate_important() {
        let generator = Generator::new();
        let mut result = make_result("!p-4", "padding", "1rem");
        result.parsed.important = true;

        let results = vec![result];
        let css = generator.generate(&results);

        assert!(css.contains("!important"));
    }

    #[test]
    fn test_minify() {
        let generator = Generator::with_options(GenerateOptions {
            minify: true,
            ..Default::default()
        });

        let results = vec![make_result("p-4", "padding", "1rem")];
        let css = generator.generate(&results);

        // Minified output should not have newlines
        assert!(!css.contains("\n  "));
    }
}
