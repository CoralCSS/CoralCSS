//! Ultra-fast CSS class name parser
//!
//! Parses utility class names into structured components:
//! - Variants (hover:, dark:, md:, etc.)
//! - Utility name and value (p-4, bg-red-500)
//! - Modifiers (opacity /50, important !, negative -)
//! - Arbitrary values ([2rem], [#ff0000])
//! - Variant groups (hover:(text-white scale-105))

use crate::types::ParsedClass;
use memchr::memchr;

/// High-performance CSS class parser
#[derive(Debug, Clone)]
pub struct Parser {
    /// Cache for parsed classes (optional, managed externally)
    _cache_enabled: bool,
}

impl Parser {
    /// Create a new Parser instance
    pub fn new() -> Self {
        Self {
            _cache_enabled: true,
        }
    }

    /// Parse a single class name into its components
    #[inline]
    pub fn parse(&self, class: &str) -> ParsedClass {
        let class = class.trim();
        if class.is_empty() {
            return ParsedClass::new("");
        }

        let mut parsed = ParsedClass::new(class);
        let bytes = class.as_bytes();
        let len = bytes.len();

        // Fast path for simple classes without special characters
        if !contains_special_char(bytes) {
            // Still check for negative prefix in fast path
            let utility_str = if bytes[0] == b'-' && bytes.len() > 1 && bytes[1].is_ascii_alphabetic() {
                parsed.negative = true;
                &class[1..]
            } else {
                class
            };
            self.parse_simple_utility(utility_str, &mut parsed);
            return parsed;
        }

        let mut pos = 0;

        // Check for important prefix (!)
        if bytes[0] == b'!' {
            parsed.important = true;
            pos = 1;
        }

        // Check for negative prefix (-)
        if pos < len && bytes[pos] == b'-' && !is_variant_start(&bytes[pos..]) {
            parsed.negative = true;
            pos += 1;
        }

        // Extract variants (everything before the last colon that's not inside brackets)
        let utility_start = self.extract_variants(&class[pos..], &mut parsed.variants);
        pos += utility_start;

        // Parse the remaining utility
        if pos < len {
            self.parse_utility(&class[pos..], &mut parsed);
        }

        parsed
    }

    /// Parse all classes in a whitespace-separated string
    pub fn parse_all(&self, class_string: &str) -> Vec<ParsedClass> {
        class_string
            .split_whitespace()
            .map(|c| self.parse(c))
            .collect()
    }

    /// Extract variants from class string, returns position after variants
    fn extract_variants(&self, input: &str, variants: &mut Vec<String>) -> usize {
        let bytes = input.as_bytes();
        let len = bytes.len();
        let mut pos = 0;
        let mut bracket_depth: u32 = 0;
        let mut last_colon = None;

        // Find all colons that are not inside brackets
        for (i, &byte) in bytes.iter().enumerate() {
            match byte {
                b'[' => bracket_depth += 1,
                b']' => bracket_depth = bracket_depth.saturating_sub(1),
                b':' if bracket_depth == 0 => {
                    // Extract variant
                    let variant = &input[pos..i];
                    if !variant.is_empty() && is_valid_variant(variant) {
                        variants.push(variant.to_string());
                        last_colon = Some(i);
                    }
                    pos = i + 1;
                }
                _ => {}
            }
        }

        match last_colon {
            Some(i) => i + 1,
            None => 0,
        }
    }

    /// Parse a simple utility without variants or modifiers
    #[inline]
    fn parse_simple_utility(&self, input: &str, parsed: &mut ParsedClass) {
        // Find the first dash that separates utility from value
        if let Some(dash_pos) = find_utility_dash(input) {
            parsed.utility = input[..dash_pos].to_string();
            parsed.value = Some(input[dash_pos + 1..].to_string());
        } else {
            parsed.utility = input.to_string();
        }
    }

    /// Parse utility with potential modifiers
    fn parse_utility(&self, input: &str, parsed: &mut ParsedClass) {
        let mut input = input;

        // Check for important prefix (!) - can appear after variants
        if input.starts_with('!') {
            parsed.important = true;
            input = &input[1..];
        }

        // Check for negative prefix (-) - can appear after ! or variants
        if input.starts_with('-') && input.len() > 1 && input.as_bytes()[1].is_ascii_alphabetic() {
            parsed.negative = true;
            input = &input[1..];
        }

        let bytes = input.as_bytes();
        let len = bytes.len();

        // Check for arbitrary value [...]
        if let Some(bracket_start) = memchr(b'[', bytes) {
            if let Some(bracket_end) = memchr(b']', &bytes[bracket_start..]) {
                let bracket_end = bracket_start + bracket_end;

                // Utility is everything before the bracket
                if bracket_start > 0 {
                    let utility_part = &input[..bracket_start];
                    self.parse_simple_utility(utility_part.trim_end_matches('-'), parsed);
                }

                // Arbitrary value is inside brackets
                parsed.arbitrary = Some(input[bracket_start + 1..bracket_end].to_string());

                // Check for opacity after bracket
                if bracket_end + 1 < len && bytes[bracket_end + 1] == b'/' {
                    if let Some(opacity) = parse_opacity(&input[bracket_end + 2..]) {
                        parsed.opacity = Some(opacity);
                    }
                }

                return;
            }
        }

        // Check for opacity modifier (/50)
        if let Some(slash_pos) = memchr(b'/', bytes) {
            let utility_part = &input[..slash_pos];
            self.parse_simple_utility(utility_part, parsed);

            if let Some(opacity) = parse_opacity(&input[slash_pos + 1..]) {
                parsed.opacity = Some(opacity);
            }
            return;
        }

        // No special modifiers
        self.parse_simple_utility(input, parsed);
    }
}

impl Default for Parser {
    fn default() -> Self {
        Self::new()
    }
}

/// Check if bytes contain any special parsing characters
#[inline]
fn contains_special_char(bytes: &[u8]) -> bool {
    bytes.iter().any(|&b| matches!(b, b':' | b'[' | b']' | b'/' | b'!' | b'(' | b')'))
}

/// Check if this could be a variant start (not a negative prefix)
/// Returns true only if this looks like a variant (has a colon before any dash)
#[inline]
fn is_variant_start(bytes: &[u8]) -> bool {
    // For it to be a variant start, there must be a colon in the string
    // e.g., "-hover:text" starts with a variant, but "-m-4" does not
    if bytes.len() <= 1 || !bytes[1].is_ascii_alphabetic() {
        return false;
    }

    // Look for a colon that comes before any dash (after the leading dash)
    for i in 2..bytes.len() {
        match bytes[i] {
            b':' => return true,  // Found variant separator
            b'-' => return false, // Found utility separator first
            _ => continue,
        }
    }
    false
}

/// Check if a string is a valid variant name
#[inline]
fn is_valid_variant(s: &str) -> bool {
    !s.is_empty() && s.chars().all(|c| c.is_ascii_alphanumeric() || c == '-' || c == '_')
}

/// Find the dash that separates utility name from value
/// Handles multi-part utilities like "bg-gradient-to-r"
#[inline]
fn find_utility_dash(input: &str) -> Option<usize> {
    let bytes = input.as_bytes();

    // Known multi-part utility prefixes (with trailing dash for value lookup)
    const MULTI_PART_PREFIX: &[&str] = &[
        "bg-gradient-to-",
        "from-", "via-", "to-",
        "border-t-", "border-r-", "border-b-", "border-l-",
        "border-x-", "border-y-",
        "rounded-t-", "rounded-r-", "rounded-b-", "rounded-l-",
        "rounded-tl-", "rounded-tr-", "rounded-bl-", "rounded-br-",
        "scroll-m-", "scroll-p-",
        "inset-x-", "inset-y-",
        "space-x-", "space-y-",
        "divide-x-", "divide-y-",
        "translate-x-", "translate-y-",
        "scale-x-", "scale-y-",
        "skew-x-", "skew-y-",
    ];

    // Known multi-part utility names (exact match, no value)
    const MULTI_PART_EXACT: &[&str] = &[
        "translate-x", "translate-y",
        "scale-x", "scale-y",
        "skew-x", "skew-y",
        "space-x", "space-y",
        "divide-x", "divide-y",
        "inset-x", "inset-y",
        "scroll-m", "scroll-p",
        "border-t", "border-r", "border-b", "border-l",
        "border-x", "border-y",
        "rounded-t", "rounded-r", "rounded-b", "rounded-l",
        "rounded-tl", "rounded-tr", "rounded-bl", "rounded-br",
    ];

    // Check for exact multi-part utility names (used with arbitrary values)
    for exact in MULTI_PART_EXACT {
        if input == *exact {
            return None; // No value separator, entire input is the utility
        }
    }

    // Check for multi-part prefixes
    for prefix in MULTI_PART_PREFIX {
        if input.starts_with(prefix) {
            return Some(prefix.len() - 1);
        }
    }

    // Otherwise, find the first dash
    memchr(b'-', bytes)
}

/// Parse opacity value from string (e.g., "50" -> 50)
#[inline]
fn parse_opacity(s: &str) -> Option<u8> {
    s.parse::<u8>().ok()
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_simple_class() {
        let parser = Parser::new();
        let parsed = parser.parse("p-4");
        assert_eq!(parsed.utility, "p");
        assert_eq!(parsed.value, Some("4".to_string()));
    }

    #[test]
    fn test_color_class() {
        let parser = Parser::new();
        let parsed = parser.parse("bg-red-500");
        assert_eq!(parsed.utility, "bg");
        assert_eq!(parsed.value, Some("red-500".to_string()));
    }

    #[test]
    fn test_variant() {
        let parser = Parser::new();
        let parsed = parser.parse("hover:bg-blue-500");
        assert_eq!(parsed.variants, vec!["hover"]);
        assert_eq!(parsed.utility, "bg");
        assert_eq!(parsed.value, Some("blue-500".to_string()));
    }

    #[test]
    fn test_multiple_variants() {
        let parser = Parser::new();
        let parsed = parser.parse("dark:hover:bg-blue-500");
        assert_eq!(parsed.variants, vec!["dark", "hover"]);
        assert_eq!(parsed.utility, "bg");
    }

    #[test]
    fn test_opacity_modifier() {
        let parser = Parser::new();
        let parsed = parser.parse("bg-black/50");
        assert_eq!(parsed.utility, "bg");
        assert_eq!(parsed.value, Some("black".to_string()));
        assert_eq!(parsed.opacity, Some(50));
    }

    #[test]
    fn test_arbitrary_value() {
        let parser = Parser::new();
        let parsed = parser.parse("p-[2rem]");
        assert_eq!(parsed.utility, "p");
        assert_eq!(parsed.arbitrary, Some("2rem".to_string()));
    }

    #[test]
    fn test_important() {
        let parser = Parser::new();
        let parsed = parser.parse("!p-4");
        assert!(parsed.important);
        assert_eq!(parsed.utility, "p");
    }

    #[test]
    fn test_negative() {
        let parser = Parser::new();
        let parsed = parser.parse("-m-4");
        assert!(parsed.negative);
        assert_eq!(parsed.utility, "m");
    }

    #[test]
    fn test_complex_class() {
        let parser = Parser::new();
        let parsed = parser.parse("dark:hover:!-translate-x-[2rem]/50");
        assert_eq!(parsed.variants, vec!["dark", "hover"]);
        assert!(parsed.important);
        assert!(parsed.negative);
        assert_eq!(parsed.utility, "translate-x");
        assert_eq!(parsed.arbitrary, Some("2rem".to_string()));
        assert_eq!(parsed.opacity, Some(50));
    }

    #[test]
    fn test_parse_all() {
        let parser = Parser::new();
        let parsed = parser.parse_all("p-4 m-2 bg-red-500");
        assert_eq!(parsed.len(), 3);
    }
}
