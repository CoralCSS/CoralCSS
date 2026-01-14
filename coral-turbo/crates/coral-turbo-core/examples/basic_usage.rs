//! Basic usage example for coral-turbo-core
//!
//! Run with: cargo run --example basic_usage

use coral_turbo_core::{Parser, Matcher, Extractor, Generator, TurboEngine};

fn main() {
    println!("=== CoralCSS Turbo Engine - Basic Usage ===\n");

    // 1. Parser Example
    println!("1. PARSER - Parse utility classes");
    println!("--------------------------------");
    let parser = Parser::new();

    let classes = [
        "p-4",
        "hover:bg-blue-500",
        "dark:md:text-white",
        "!-translate-x-4",
        "bg-red-500/50",
        "w-[calc(100%-2rem)]",
    ];

    for class in &classes {
        let parsed = parser.parse(class);
        println!("  {} =>", class);
        println!("    utility: {}", parsed.utility);
        if let Some(ref value) = parsed.value {
            println!("    value: {}", value);
        }
        if !parsed.variants.is_empty() {
            println!("    variants: {:?}", parsed.variants);
        }
        if let Some(ref arbitrary) = parsed.arbitrary {
            println!("    arbitrary: {}", arbitrary);
        }
        if parsed.important {
            println!("    important: true");
        }
        if parsed.negative {
            println!("    negative: true");
        }
        if let Some(opacity) = parsed.opacity {
            println!("    opacity: {}", opacity);
        }
        println!();
    }

    // 2. Extractor Example
    println!("2. EXTRACTOR - Extract classes from HTML/JSX");
    println!("--------------------------------------------");
    let extractor = Extractor::new();

    let html = r#"
        <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-gray-900">Hello</h1>
            <button className={clsx('px-4 py-2 bg-blue-500 hover:bg-blue-600', isActive && 'ring-2')}>
                Click me
            </button>
        </div>
    "#;

    let extracted = extractor.extract(html);
    println!("  Extracted {} classes:", extracted.len());
    for class in &extracted {
        println!("    - {}", class);
    }
    println!();

    // 3. Matcher Example
    println!("3. MATCHER - Match classes to CSS properties");
    println!("--------------------------------------------");
    let matcher = Matcher::new();

    let test_classes = ["p-4", "bg-red-500", "flex", "-m-2", "w-[200px]"];
    for class in &test_classes {
        let parsed = parser.parse(class);
        if let Some(result) = matcher.match_class(&parsed) {
            println!("  {} =>", class);
            for prop in &result.properties {
                println!("    {}: {}", prop.property, prop.value);
            }
        } else {
            println!("  {} => (no match)", class);
        }
    }
    println!();

    // 4. Generator Example
    println!("4. GENERATOR - Generate CSS output");
    println!("-----------------------------------");
    let generator = Generator::new();

    let mut results = Vec::new();
    for class in &["p-4", "m-2", "bg-blue-500", "flex", "items-center"] {
        let parsed = parser.parse(class);
        if let Some(result) = matcher.match_class(&parsed) {
            results.push(result);
        }
    }

    let css = generator.generate(&results);
    println!("  Generated CSS:\n");
    for line in css.lines() {
        println!("    {}", line);
    }
    println!();

    // 5. Full Engine Example
    println!("5. TURBO ENGINE - All-in-one processing");
    println!("---------------------------------------");
    let engine = TurboEngine::new();

    let input = "p-4 m-2 hover:bg-blue-500 dark:text-white flex items-center";
    println!("  Input: {}", input);

    let parsed_all = engine.parse(input);
    println!("  Parsed {} classes", parsed_all.len());

    let css = engine.process(input);
    println!("  Generated CSS ({} chars):\n", css.len());
    for line in css.lines().take(10) {
        println!("    {}", line);
    }
    if css.lines().count() > 10 {
        println!("    ... ({} more lines)", css.lines().count() - 10);
    }

    println!("\n=== Done! ===");
}
