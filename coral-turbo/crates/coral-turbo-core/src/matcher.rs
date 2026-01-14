//! High-performance pattern matcher for CSS utility classes
//!
//! Uses a trie-based lookup for O(k) prefix matching where k is the prefix length.
//! Falls back to regex matching for complex patterns.

use crate::trie::PrefixTrie;
use crate::types::{CSSProperty, Layer, MatchResult, ParsedClass, UtilityPattern};
use ahash::AHashMap;
use once_cell::sync::Lazy;
use regex::Regex;
use std::sync::RwLock;

/// Spacing scale values (Tailwind default)
static SPACING_SCALE: Lazy<AHashMap<&str, &str>> = Lazy::new(|| {
    let mut m = AHashMap::new();
    m.insert("0", "0px");
    m.insert("px", "1px");
    m.insert("0.5", "0.125rem");
    m.insert("1", "0.25rem");
    m.insert("1.5", "0.375rem");
    m.insert("2", "0.5rem");
    m.insert("2.5", "0.625rem");
    m.insert("3", "0.75rem");
    m.insert("3.5", "0.875rem");
    m.insert("4", "1rem");
    m.insert("5", "1.25rem");
    m.insert("6", "1.5rem");
    m.insert("7", "1.75rem");
    m.insert("8", "2rem");
    m.insert("9", "2.25rem");
    m.insert("10", "2.5rem");
    m.insert("11", "2.75rem");
    m.insert("12", "3rem");
    m.insert("14", "3.5rem");
    m.insert("16", "4rem");
    m.insert("20", "5rem");
    m.insert("24", "6rem");
    m.insert("28", "7rem");
    m.insert("32", "8rem");
    m.insert("36", "9rem");
    m.insert("40", "10rem");
    m.insert("44", "11rem");
    m.insert("48", "12rem");
    m.insert("52", "13rem");
    m.insert("56", "14rem");
    m.insert("60", "15rem");
    m.insert("64", "16rem");
    m.insert("72", "18rem");
    m.insert("80", "20rem");
    m.insert("96", "24rem");
    m.insert("auto", "auto");
    m.insert("full", "100%");
    m.insert("screen", "100vw");
    m.insert("svw", "100svw");
    m.insert("lvw", "100lvw");
    m.insert("dvw", "100dvw");
    m.insert("min", "min-content");
    m.insert("max", "max-content");
    m.insert("fit", "fit-content");
    m
});

/// Color palette (Tailwind default - subset)
static COLORS: Lazy<AHashMap<&str, &str>> = Lazy::new(|| {
    let mut m = AHashMap::new();
    // Gray scale
    m.insert("slate-50", "#f8fafc");
    m.insert("slate-100", "#f1f5f9");
    m.insert("slate-200", "#e2e8f0");
    m.insert("slate-300", "#cbd5e1");
    m.insert("slate-400", "#94a3b8");
    m.insert("slate-500", "#64748b");
    m.insert("slate-600", "#475569");
    m.insert("slate-700", "#334155");
    m.insert("slate-800", "#1e293b");
    m.insert("slate-900", "#0f172a");
    m.insert("slate-950", "#020617");
    // Basic colors
    m.insert("red-500", "#ef4444");
    m.insert("orange-500", "#f97316");
    m.insert("amber-500", "#f59e0b");
    m.insert("yellow-500", "#eab308");
    m.insert("lime-500", "#84cc16");
    m.insert("green-500", "#22c55e");
    m.insert("emerald-500", "#10b981");
    m.insert("teal-500", "#14b8a6");
    m.insert("cyan-500", "#06b6d4");
    m.insert("sky-500", "#0ea5e9");
    m.insert("blue-500", "#3b82f6");
    m.insert("indigo-500", "#6366f1");
    m.insert("violet-500", "#8b5cf6");
    m.insert("purple-500", "#a855f7");
    m.insert("fuchsia-500", "#d946ef");
    m.insert("pink-500", "#ec4899");
    m.insert("rose-500", "#f43f5e");
    // Special values
    m.insert("black", "#000000");
    m.insert("white", "#ffffff");
    m.insert("transparent", "transparent");
    m.insert("current", "currentColor");
    m.insert("inherit", "inherit");
    m
});

/// Pattern handler function type
type PatternHandler = fn(&ParsedClass, &UtilityPattern) -> Option<Vec<CSSProperty>>;

/// Internal pattern with compiled regex
struct CompiledPattern {
    pattern: UtilityPattern,
    regex: Option<Regex>,
    handler: PatternHandler,
}

/// High-performance utility pattern matcher
pub struct Matcher {
    /// Trie for fast prefix-based lookup
    prefix_trie: PrefixTrie<Vec<usize>>,

    /// All registered patterns
    patterns: Vec<CompiledPattern>,

    /// Regex cache for compiled patterns
    regex_cache: RwLock<AHashMap<String, Regex>>,
}

impl std::fmt::Debug for Matcher {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("Matcher")
            .field("pattern_count", &self.patterns.len())
            .finish()
    }
}

impl Matcher {
    /// Create a new Matcher with default utility patterns
    pub fn new() -> Self {
        let mut matcher = Self {
            prefix_trie: PrefixTrie::new(),
            patterns: Vec::new(),
            regex_cache: RwLock::new(AHashMap::new()),
        };

        // Register default patterns
        matcher.register_default_patterns();

        matcher
    }

    /// Register a new utility pattern
    pub fn register(&mut self, pattern: UtilityPattern) {
        let idx = self.patterns.len();

        // Compile regex if provided
        let regex = if !pattern.pattern.is_empty() {
            Regex::new(&pattern.pattern).ok()
        } else {
            None
        };

        // Determine handler based on pattern type
        let handler = determine_handler(&pattern);

        // Add to prefix trie
        if !pattern.prefix.is_empty() {
            let indices = self
                .prefix_trie
                .get(&pattern.prefix)
                .cloned()
                .unwrap_or_default();
            let mut new_indices = indices;
            new_indices.push(idx);
            self.prefix_trie.insert(&pattern.prefix, new_indices);
        }

        self.patterns.push(CompiledPattern {
            pattern,
            regex,
            handler,
        });
    }

    /// Match a parsed class against registered patterns
    pub fn match_class(&self, parsed: &ParsedClass) -> Option<MatchResult> {
        let utility = &parsed.utility;
        let full_class = parsed.full_utility();

        // Try trie-based prefix lookup first
        if let Some((indices, _prefix_len)) = self.prefix_trie.longest_prefix_match(&full_class) {
            for &idx in indices {
                if let Some(compiled) = self.patterns.get(idx) {
                    // Try regex match if pattern has one
                    if let Some(ref regex) = compiled.regex {
                        if !regex.is_match(&full_class) {
                            continue;
                        }
                    }

                    // Try handler
                    if let Some(properties) = (compiled.handler)(parsed, &compiled.pattern) {
                        return Some(MatchResult {
                            parsed: parsed.clone(),
                            properties,
                            pattern_name: compiled.pattern.name.clone(),
                            layer: compiled.pattern.layer,
                            sort_order: compiled.pattern.sort_order,
                        });
                    }
                }
            }
        }

        // Fallback: try all patterns with regex
        for compiled in &self.patterns {
            if let Some(ref regex) = compiled.regex {
                if regex.is_match(&full_class) {
                    if let Some(properties) = (compiled.handler)(parsed, &compiled.pattern) {
                        return Some(MatchResult {
                            parsed: parsed.clone(),
                            properties,
                            pattern_name: compiled.pattern.name.clone(),
                            layer: compiled.pattern.layer,
                            sort_order: compiled.pattern.sort_order,
                        });
                    }
                }
            }
        }

        None
    }

    /// Register default utility patterns
    fn register_default_patterns(&mut self) {
        // Spacing utilities
        self.register_spacing_utilities();

        // Display utilities
        self.register_display_utilities();

        // Flexbox utilities
        self.register_flex_utilities();

        // Typography utilities
        self.register_typography_utilities();

        // Color utilities
        self.register_color_utilities();

        // Border utilities
        self.register_border_utilities();

        // Effects utilities
        self.register_effects_utilities();
    }

    fn register_spacing_utilities(&mut self) {
        // Padding
        let padding_props = [
            ("p-", "padding", vec!["padding"]),
            ("pt-", "padding-top", vec!["padding-top"]),
            ("pr-", "padding-right", vec!["padding-right"]),
            ("pb-", "padding-bottom", vec!["padding-bottom"]),
            ("pl-", "padding-left", vec!["padding-left"]),
            ("px-", "padding-x", vec!["padding-left", "padding-right"]),
            ("py-", "padding-y", vec!["padding-top", "padding-bottom"]),
        ];

        // Pattern chars: word chars, dash, dot, brackets, hash, percent (for arbitrary values)
        const ARB_CHARS: &str = r"[\w\-\.\[\]#%]+";

        for (prefix, name, _props) in padding_props {
            self.register(
                UtilityPattern::new(name, prefix)
                    .with_css_property(name)
                    .with_pattern(&format!(r"^{}{}$", regex::escape(prefix), ARB_CHARS)),
            );
        }

        // Margin
        let margin_props = [
            ("m-", "margin", vec!["margin"]),
            ("mt-", "margin-top", vec!["margin-top"]),
            ("mr-", "margin-right", vec!["margin-right"]),
            ("mb-", "margin-bottom", vec!["margin-bottom"]),
            ("ml-", "margin-left", vec!["margin-left"]),
            ("mx-", "margin-x", vec!["margin-left", "margin-right"]),
            ("my-", "margin-y", vec!["margin-top", "margin-bottom"]),
        ];

        for (prefix, name, _props) in margin_props {
            self.register(
                UtilityPattern::new(name, prefix)
                    .with_css_property(name)
                    .with_pattern(&format!(r"^-?{}{}$", regex::escape(prefix), ARB_CHARS))
                    .with_negative(),
            );
        }

        // Gap
        self.register(
            UtilityPattern::new("gap", "gap-")
                .with_css_property("gap")
                .with_pattern(r"^gap-[\w\-\.]+$"),
        );
        self.register(
            UtilityPattern::new("gap-x", "gap-x-")
                .with_css_property("column-gap")
                .with_pattern(r"^gap-x-[\w\-\.]+$"),
        );
        self.register(
            UtilityPattern::new("gap-y", "gap-y-")
                .with_css_property("row-gap")
                .with_pattern(r"^gap-y-[\w\-\.]+$"),
        );
    }

    fn register_display_utilities(&mut self) {
        let displays = [
            ("block", "display", "block"),
            ("inline-block", "display", "inline-block"),
            ("inline", "display", "inline"),
            ("flex", "display", "flex"),
            ("inline-flex", "display", "inline-flex"),
            ("grid", "display", "grid"),
            ("inline-grid", "display", "inline-grid"),
            ("contents", "display", "contents"),
            ("hidden", "display", "none"),
        ];

        for (name, prop, value) in displays {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property(prop)
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }
    }

    fn register_flex_utilities(&mut self) {
        // Flex direction
        let directions = [
            ("flex-row", "flex-direction", "row"),
            ("flex-row-reverse", "flex-direction", "row-reverse"),
            ("flex-col", "flex-direction", "column"),
            ("flex-col-reverse", "flex-direction", "column-reverse"),
        ];

        for (name, prop, _value) in directions {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property(prop)
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }

        // Flex wrap
        let wraps = [
            ("flex-wrap", "flex-wrap", "wrap"),
            ("flex-wrap-reverse", "flex-wrap", "wrap-reverse"),
            ("flex-nowrap", "flex-wrap", "nowrap"),
        ];

        for (name, prop, _value) in wraps {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property(prop)
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }

        // Justify content
        let justifies = [
            ("justify-start", "justify-content", "flex-start"),
            ("justify-end", "justify-content", "flex-end"),
            ("justify-center", "justify-content", "center"),
            ("justify-between", "justify-content", "space-between"),
            ("justify-around", "justify-content", "space-around"),
            ("justify-evenly", "justify-content", "space-evenly"),
        ];

        for (name, prop, _value) in justifies {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property(prop)
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }

        // Align items
        let aligns = [
            ("items-start", "align-items", "flex-start"),
            ("items-end", "align-items", "flex-end"),
            ("items-center", "align-items", "center"),
            ("items-baseline", "align-items", "baseline"),
            ("items-stretch", "align-items", "stretch"),
        ];

        for (name, prop, _value) in aligns {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property(prop)
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }
    }

    fn register_typography_utilities(&mut self) {
        // Font size
        self.register(
            UtilityPattern::new("font-size", "text-")
                .with_css_property("font-size")
                .with_pattern(r"^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$"),
        );

        // Font weight
        let weights = [
            ("font-thin", "100"),
            ("font-extralight", "200"),
            ("font-light", "300"),
            ("font-normal", "400"),
            ("font-medium", "500"),
            ("font-semibold", "600"),
            ("font-bold", "700"),
            ("font-extrabold", "800"),
            ("font-black", "900"),
        ];

        for (name, _value) in weights {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property("font-weight")
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }

        // Text alignment
        let aligns = [
            ("text-left", "left"),
            ("text-center", "center"),
            ("text-right", "right"),
            ("text-justify", "justify"),
        ];

        for (name, _value) in aligns {
            self.register(
                UtilityPattern::new(name, name)
                    .with_css_property("text-align")
                    .with_pattern(&format!(r"^{}$", regex::escape(name))),
            );
        }
    }

    fn register_color_utilities(&mut self) {
        // Text color
        self.register(
            UtilityPattern::new("text-color", "text-")
                .with_css_property("color")
                .with_pattern(r"^text-[\w\-]+(-\d+)?(/\d+)?$"),
        );

        // Background color
        self.register(
            UtilityPattern::new("background-color", "bg-")
                .with_css_property("background-color")
                .with_pattern(r"^bg-[\w\-]+(-\d+)?(/\d+)?$"),
        );

        // Border color
        self.register(
            UtilityPattern::new("border-color", "border-")
                .with_css_property("border-color")
                .with_pattern(r"^border-[\w\-]+(-\d+)?(/\d+)?$"),
        );
    }

    fn register_border_utilities(&mut self) {
        // Border width
        self.register(
            UtilityPattern::new("border-width", "border-")
                .with_css_property("border-width")
                .with_pattern(r"^border(-[trbl])?(-\d+)?$"),
        );

        // Border radius
        self.register(
            UtilityPattern::new("border-radius", "rounded")
                .with_css_property("border-radius")
                .with_pattern(r"^rounded(-[trblse]+)?(-[\w]+)?$"),
        );
    }

    fn register_effects_utilities(&mut self) {
        // Opacity
        self.register(
            UtilityPattern::new("opacity", "opacity-")
                .with_css_property("opacity")
                .with_pattern(r"^opacity-\d+$"),
        );

        // Shadow
        self.register(
            UtilityPattern::new("shadow", "shadow")
                .with_css_property("box-shadow")
                .with_pattern(r"^shadow(-[\w]+)?$"),
        );
    }
}

impl Default for Matcher {
    fn default() -> Self {
        Self::new()
    }
}

/// Determine the appropriate handler for a pattern
fn determine_handler(pattern: &UtilityPattern) -> PatternHandler {
    match pattern.name.as_str() {
        name if name.starts_with("padding") || name == "padding-x" || name == "padding-y" => {
            handle_spacing
        }
        name if name.starts_with("margin") || name == "margin-x" || name == "margin-y" => {
            handle_spacing
        }
        name if name.starts_with("gap") => handle_spacing,
        "text-color" => handle_color,
        "background-color" => handle_color,
        "border-color" => handle_color,
        "opacity" => handle_opacity,
        _ => handle_static,
    }
}

/// Handle spacing utilities (padding, margin, gap)
fn handle_spacing(parsed: &ParsedClass, pattern: &UtilityPattern) -> Option<Vec<CSSProperty>> {
    // Check for arbitrary value first
    let css_value = if let Some(ref arbitrary) = parsed.arbitrary {
        arbitrary.clone()
    } else if let Some(ref value) = parsed.value {
        // Look up in spacing scale
        SPACING_SCALE.get(value.as_str()).map(|s| s.to_string())?
    } else {
        return None;
    };

    // Apply negative if needed
    let final_value = if parsed.negative && css_value != "0px" && css_value != "auto" {
        format!("-{}", css_value)
    } else {
        css_value
    };

    // Handle multi-property utilities (px, py, mx, my)
    let props = match pattern.name.as_str() {
        "padding-x" => vec![("padding-left", &final_value), ("padding-right", &final_value)],
        "padding-y" => vec![("padding-top", &final_value), ("padding-bottom", &final_value)],
        "margin-x" => vec![("margin-left", &final_value), ("margin-right", &final_value)],
        "margin-y" => vec![("margin-top", &final_value), ("margin-bottom", &final_value)],
        _ => vec![(&pattern.css_property as &str, &final_value)],
    };

    Some(
        props
            .into_iter()
            .map(|(p, v)| CSSProperty::new(p, v.clone()))
            .collect(),
    )
}

/// Handle color utilities
fn handle_color(parsed: &ParsedClass, pattern: &UtilityPattern) -> Option<Vec<CSSProperty>> {
    let value = parsed.value.as_ref()?;

    // Check for arbitrary value
    let css_value = if let Some(ref arbitrary) = parsed.arbitrary {
        arbitrary.clone()
    } else {
        // Look up in colors
        COLORS
            .get(value.as_str())
            .map(|s| s.to_string())
            .unwrap_or_else(|| {
                // Try to construct color name
                format!("var(--color-{})", value.replace('-', "-"))
            })
    };

    // Apply opacity if present
    let final_value = if let Some(opacity) = parsed.opacity {
        let alpha = opacity as f32 / 100.0;
        format!("color-mix(in srgb, {} {}%, transparent)", css_value, (alpha * 100.0) as u8)
    } else {
        css_value
    };

    Some(vec![CSSProperty::new(&pattern.css_property, final_value)])
}

/// Handle opacity utility
fn handle_opacity(parsed: &ParsedClass, pattern: &UtilityPattern) -> Option<Vec<CSSProperty>> {
    let value = parsed.value.as_ref()?;

    // Parse opacity value (0-100)
    let opacity: u8 = value.parse().ok()?;
    let css_value = format!("{}", opacity as f32 / 100.0);

    Some(vec![CSSProperty::new(&pattern.css_property, css_value)])
}

/// Handle static utilities (display, flex, etc.)
fn handle_static(parsed: &ParsedClass, pattern: &UtilityPattern) -> Option<Vec<CSSProperty>> {
    // For static utilities, the value is usually embedded in the pattern name
    let value = match pattern.name.as_str() {
        // Display
        "block" => "block",
        "inline-block" => "inline-block",
        "inline" => "inline",
        "flex" => "flex",
        "inline-flex" => "inline-flex",
        "grid" => "grid",
        "inline-grid" => "inline-grid",
        "contents" => "contents",
        "hidden" => "none",
        // Flex direction
        "flex-row" => "row",
        "flex-row-reverse" => "row-reverse",
        "flex-col" => "column",
        "flex-col-reverse" => "column-reverse",
        // Flex wrap
        "flex-wrap" => "wrap",
        "flex-wrap-reverse" => "wrap-reverse",
        "flex-nowrap" => "nowrap",
        // Justify content
        "justify-start" => "flex-start",
        "justify-end" => "flex-end",
        "justify-center" => "center",
        "justify-between" => "space-between",
        "justify-around" => "space-around",
        "justify-evenly" => "space-evenly",
        // Align items
        "items-start" => "flex-start",
        "items-end" => "flex-end",
        "items-center" => "center",
        "items-baseline" => "baseline",
        "items-stretch" => "stretch",
        // Text alignment
        "text-left" => "left",
        "text-center" => "center",
        "text-right" => "right",
        "text-justify" => "justify",
        // Font weight
        "font-thin" => "100",
        "font-extralight" => "200",
        "font-light" => "300",
        "font-normal" => "400",
        "font-medium" => "500",
        "font-semibold" => "600",
        "font-bold" => "700",
        "font-extrabold" => "800",
        "font-black" => "900",
        _ => return None,
    };

    Some(vec![CSSProperty::new(&pattern.css_property, value)])
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_spacing_match() {
        let matcher = Matcher::new();
        let parsed = ParsedClass {
            raw: "p-4".to_string(),
            utility: "p".to_string(),
            value: Some("4".to_string()),
            variants: vec![],
            opacity: None,
            arbitrary: None,
            important: false,
            negative: false,
        };

        let result = matcher.match_class(&parsed);
        assert!(result.is_some());

        let result = result.unwrap();
        assert_eq!(result.properties.len(), 1);
        assert_eq!(result.properties[0].property, "padding");
        assert_eq!(result.properties[0].value, "1rem");
    }

    #[test]
    fn test_negative_margin() {
        let matcher = Matcher::new();
        let parsed = ParsedClass {
            raw: "-m-4".to_string(),
            utility: "m".to_string(),
            value: Some("4".to_string()),
            variants: vec![],
            opacity: None,
            arbitrary: None,
            important: false,
            negative: true,
        };

        let result = matcher.match_class(&parsed);
        assert!(result.is_some());

        let result = result.unwrap();
        assert_eq!(result.properties[0].value, "-1rem");
    }

    #[test]
    fn test_arbitrary_value() {
        let matcher = Matcher::new();
        let parsed = ParsedClass {
            raw: "p-[2rem]".to_string(),
            utility: "p".to_string(),
            value: None,
            variants: vec![],
            opacity: None,
            arbitrary: Some("2rem".to_string()),
            important: false,
            negative: false,
        };

        let result = matcher.match_class(&parsed);
        assert!(result.is_some());

        let result = result.unwrap();
        assert_eq!(result.properties[0].value, "2rem");
    }
}
