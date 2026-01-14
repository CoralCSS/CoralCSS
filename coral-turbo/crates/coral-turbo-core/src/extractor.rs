//! Parallel file content extractor for CSS class names
//!
//! Scans file contents for CSS class names using optimized regex patterns
//! and parallel processing with rayon.

use once_cell::sync::Lazy;
use rayon::prelude::*;
use regex::Regex;
use rustc_hash::FxHashSet;

/// Regex patterns for extracting class names from various contexts
static CLASS_PATTERNS: Lazy<Vec<Regex>> = Lazy::new(|| {
    vec![
        // HTML class attribute: class="..."
        Regex::new(r#"class\s*=\s*["']([^"']+)["']"#).unwrap(),
        // JSX className: className="..." or className={'...'}
        Regex::new(r#"className\s*=\s*["']([^"']+)["']"#).unwrap(),
        Regex::new(r#"className\s*=\s*\{["'`]([^"'`]+)["'`]\}"#).unwrap(),
        // Vue :class binding
        Regex::new(r#":class\s*=\s*["']([^"']+)["']"#).unwrap(),
        // Svelte class directive: class:name={condition}
        Regex::new(r#"class:([a-zA-Z0-9_\-:]+)"#).unwrap(),
        // Template literals in JS/TS: `${...}` containing class names
        Regex::new(r#"`([^`]*(?:hover:|dark:|md:|lg:|xl:|sm:|focus:|active:|group-|peer-)[^`]*)`"#).unwrap(),
        // clsx/classnames/cn function calls
        Regex::new(r#"(?:clsx|classnames|cn|twMerge|cva)\s*\(\s*["'`]([^"'`]+)["'`]"#).unwrap(),
        // Object keys in clsx: { 'class-name': condition }
        Regex::new(r#"['"]([a-zA-Z0-9_\-:\/\[\]]+)['"]:\s*(?:true|false|\w+)"#).unwrap(),
    ]
});

/// Pattern for splitting class strings into individual classes
static CLASS_SPLITTER: Lazy<Regex> = Lazy::new(|| {
    Regex::new(r"[\s,]+").unwrap()
});

/// Pattern for validating individual class names
static CLASS_VALIDATOR: Lazy<Regex> = Lazy::new(|| {
    // Valid class: starts with letter, !, or - and contains valid chars
    // Allow # for colors, % for percentages, and other chars common in arbitrary values
    Regex::new(r"^[!-]?[a-zA-Z][a-zA-Z0-9_\-:/\[\]\.#,()%+*&']+$").unwrap()
});

/// High-performance class name extractor
#[derive(Debug, Clone)]
pub struct Extractor {
    /// Minimum class name length to consider
    min_length: usize,

    /// Maximum class name length to consider
    max_length: usize,
}

impl Default for Extractor {
    fn default() -> Self {
        Self::new()
    }
}

impl Extractor {
    /// Create a new Extractor with default settings
    pub fn new() -> Self {
        Self {
            min_length: 1,
            max_length: 200,
        }
    }

    /// Create an Extractor with custom length limits
    pub fn with_limits(min_length: usize, max_length: usize) -> Self {
        Self {
            min_length,
            max_length,
        }
    }

    /// Extract class names from a single content string
    pub fn extract(&self, content: &str) -> Vec<String> {
        let mut classes = FxHashSet::default();

        // Try each pattern
        for pattern in CLASS_PATTERNS.iter() {
            for captures in pattern.captures_iter(content) {
                if let Some(matched) = captures.get(1) {
                    self.extract_from_match(matched.as_str(), &mut classes);
                }
            }
        }

        // Convert to sorted vector
        let mut result: Vec<String> = classes.into_iter().collect();
        result.sort_unstable();
        result
    }

    /// Extract class names from multiple content strings in parallel
    pub fn extract_parallel(&self, contents: &[&str]) -> Vec<String> {
        // Process all contents in parallel
        let all_classes: Vec<FxHashSet<String>> = contents
            .par_iter()
            .map(|content| {
                let mut classes = FxHashSet::default();
                for pattern in CLASS_PATTERNS.iter() {
                    for captures in pattern.captures_iter(content) {
                        if let Some(matched) = captures.get(1) {
                            self.extract_from_match(matched.as_str(), &mut classes);
                        }
                    }
                }
                classes
            })
            .collect();

        // Merge all results
        let mut merged = FxHashSet::default();
        for set in all_classes {
            merged.extend(set);
        }

        // Convert to sorted vector
        let mut result: Vec<String> = merged.into_iter().collect();
        result.sort_unstable();
        result
    }

    /// Extract class names directly from raw strings (for performance)
    /// Assumes the string contains only class names separated by whitespace
    pub fn extract_raw(&self, raw: &str) -> Vec<String> {
        let mut classes = FxHashSet::default();
        self.extract_from_match(raw, &mut classes);
        classes.into_iter().collect()
    }

    /// Extract individual classes from a matched string
    fn extract_from_match(&self, matched: &str, classes: &mut FxHashSet<String>) {
        // Split by whitespace and commas
        for class in CLASS_SPLITTER.split(matched) {
            let class = class.trim();

            // Length validation
            if class.len() < self.min_length || class.len() > self.max_length {
                continue;
            }

            // Validate class name format
            if self.is_valid_class(class) {
                classes.insert(class.to_string());
            }
        }
    }

    /// Check if a string is a valid CSS class name
    #[inline]
    fn is_valid_class(&self, class: &str) -> bool {
        // Quick length check
        if class.is_empty() {
            return false;
        }

        // Check first character
        let first = class.as_bytes()[0];
        if !matches!(first, b'a'..=b'z' | b'A'..=b'Z' | b'!' | b'-' | b'@') {
            return false;
        }

        // Use regex for complete validation
        CLASS_VALIDATOR.is_match(class)
    }
}

/// Extract classes from HTML-like content quickly
/// Optimized for build tools that process many files
pub fn extract_fast(content: &str) -> Vec<String> {
    let extractor = Extractor::new();
    extractor.extract(content)
}

/// Extract classes from multiple files in parallel
/// Returns deduplicated, sorted list of all class names
pub fn extract_parallel(contents: &[&str]) -> Vec<String> {
    let extractor = Extractor::new();
    extractor.extract_parallel(contents)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_extract_html_class() {
        let extractor = Extractor::new();
        let content = r#"<div class="p-4 m-2 bg-red-500">Hello</div>"#;
        let classes = extractor.extract(content);

        assert!(classes.contains(&"p-4".to_string()));
        assert!(classes.contains(&"m-2".to_string()));
        assert!(classes.contains(&"bg-red-500".to_string()));
    }

    #[test]
    fn test_extract_jsx_classname() {
        let extractor = Extractor::new();
        let content = r#"<Button className="hover:bg-blue-500 dark:text-white" />"#;
        let classes = extractor.extract(content);

        assert!(classes.contains(&"hover:bg-blue-500".to_string()));
        assert!(classes.contains(&"dark:text-white".to_string()));
    }

    #[test]
    fn test_extract_variants() {
        let extractor = Extractor::new();
        let content = r#"class="hover:bg-blue-500 dark:md:text-lg focus:ring-2""#;
        let classes = extractor.extract(content);

        assert!(classes.contains(&"hover:bg-blue-500".to_string()));
        assert!(classes.contains(&"dark:md:text-lg".to_string()));
        assert!(classes.contains(&"focus:ring-2".to_string()));
    }

    #[test]
    fn test_extract_arbitrary() {
        let extractor = Extractor::new();
        let content = r#"class="p-[2rem] bg-[#ff0000] grid-cols-[1fr_2fr]""#;
        let classes = extractor.extract(content);

        assert!(classes.contains(&"p-[2rem]".to_string()));
        assert!(classes.contains(&"bg-[#ff0000]".to_string()));
    }

    #[test]
    fn test_extract_parallel() {
        let contents = vec![
            r#"<div class="p-4 m-2">A</div>"#,
            r#"<div class="bg-red-500 text-white">B</div>"#,
            r#"<div class="p-4 flex items-center">C</div>"#,
        ];

        let classes = extract_parallel(&contents);

        // p-4 should appear only once (deduplicated)
        assert_eq!(classes.iter().filter(|c| *c == "p-4").count(), 1);
        assert!(classes.contains(&"bg-red-500".to_string()));
        assert!(classes.contains(&"flex".to_string()));
    }

    #[test]
    fn test_extract_clsx() {
        let extractor = Extractor::new();
        let content = r#"clsx("bg-white", { "text-red-500": isError })"#;
        let classes = extractor.extract(content);

        assert!(classes.contains(&"bg-white".to_string()));
        assert!(classes.contains(&"text-red-500".to_string()));
    }

    #[test]
    fn test_deduplicate() {
        let extractor = Extractor::new();
        let content = r#"class="p-4 m-2 p-4 m-2 p-4""#;
        let classes = extractor.extract(content);

        // Should only have unique classes
        assert_eq!(classes.len(), 2);
    }
}
