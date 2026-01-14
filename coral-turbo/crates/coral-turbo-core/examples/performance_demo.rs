//! Performance demonstration for coral-turbo-core
//!
//! Run with: cargo run --example performance_demo --release

use coral_turbo_core::{Parser, Matcher, Extractor, Generator, TurboEngine};
use std::time::Instant;

fn main() {
    println!("=== CoralCSS Turbo Engine - Performance Demo ===\n");
    println!("NOTE: Run with --release for accurate benchmarks!\n");

    // Generate test data
    let parser = Parser::new();
    let matcher = Matcher::new();
    let extractor = Extractor::new();
    let generator = Generator::new();
    let engine = TurboEngine::new();

    // 1. Parser Performance
    println!("1. PARSER PERFORMANCE");
    println!("---------------------");

    let simple_classes: Vec<String> = (0..10_000)
        .map(|i| format!("p-{}", i % 12))
        .collect();
    let simple_input = simple_classes.join(" ");

    let start = Instant::now();
    let parsed = parser.parse_all(&simple_input);
    let duration = start.elapsed();
    println!("  Parsed 10,000 simple classes in {:?}", duration);
    println!("  Rate: {:.0} classes/ms", 10_000.0 / duration.as_millis() as f64);
    println!("  Result count: {}\n", parsed.len());

    // Complex classes
    let complex_classes: Vec<&str> = vec![
        "hover:bg-blue-500",
        "dark:md:text-white",
        "!-translate-x-4",
        "bg-red-500/50",
        "p-[2rem]",
    ];
    let complex_input = (0..2_000)
        .map(|i| complex_classes[i % complex_classes.len()])
        .collect::<Vec<_>>()
        .join(" ");

    let start = Instant::now();
    let _parsed = parser.parse_all(&complex_input);
    let duration = start.elapsed();
    println!("  Parsed 2,000 complex classes in {:?}", duration);
    println!("  Rate: {:.0} classes/ms\n", 2_000.0 / duration.as_millis().max(1) as f64);

    // 2. Extractor Performance
    println!("2. EXTRACTOR PERFORMANCE");
    println!("------------------------");

    // Generate realistic HTML content
    let html_components: Vec<String> = (0..100)
        .map(|i| format!(
            r#"<div class="flex items-center justify-between p-{} m-{} bg-gray-{} rounded-lg shadow-md">
                <span class="text-gray-{} font-semibold">Item {}</span>
                <button class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Action</button>
            </div>"#,
            i % 12, i % 8, (i % 9 + 1) * 100, (i % 9 + 1) * 100, i
        ))
        .collect();
    let html_content = html_components.join("\n");

    println!("  HTML content size: {} KB", html_content.len() / 1024);

    let start = Instant::now();
    let extracted = extractor.extract(&html_content);
    let duration = start.elapsed();
    println!("  Extracted {} unique classes in {:?}", extracted.len(), duration);
    println!("  Rate: {:.1} KB/ms\n", (html_content.len() as f64 / 1024.0) / duration.as_millis().max(1) as f64);

    // Parallel extraction
    let files: Vec<String> = (0..10)
        .map(|_| html_content.clone())
        .collect();
    let files_refs: Vec<&str> = files.iter().map(|s| s.as_str()).collect();

    let start = Instant::now();
    let _extracted = extractor.extract_parallel(&files_refs);
    let duration = start.elapsed();
    let total_kb = (html_content.len() * 10) / 1024;
    println!("  Parallel: extracted from 10 files ({} KB) in {:?}", total_kb, duration);
    println!("  Rate: {:.1} KB/ms\n", total_kb as f64 / duration.as_millis().max(1) as f64);

    // 3. Matcher Performance
    println!("3. MATCHER PERFORMANCE");
    println!("----------------------");

    let test_classes = ["p-4", "m-2", "bg-red-500", "flex", "items-center", "hover:bg-blue-500"];
    let parsed_classes: Vec<_> = test_classes.iter()
        .map(|c| parser.parse(c))
        .collect();

    let iterations = 10_000;
    let start = Instant::now();
    for _ in 0..iterations {
        for parsed in &parsed_classes {
            let _ = matcher.match_class(parsed);
        }
    }
    let duration = start.elapsed();
    let total_matches = iterations * parsed_classes.len();
    println!("  Matched {} classes in {:?}", total_matches, duration);
    println!("  Rate: {:.0} matches/ms\n", total_matches as f64 / duration.as_millis().max(1) as f64);

    // 4. Generator Performance
    println!("4. GENERATOR PERFORMANCE");
    println!("------------------------");

    // Generate match results
    let mut results = Vec::new();
    for class in &["p-4", "m-2", "bg-red-500", "text-white", "flex", "items-center", "justify-between", "gap-4"] {
        let parsed = parser.parse(class);
        if let Some(result) = matcher.match_class(&parsed) {
            results.push(result);
        }
    }

    let iterations = 1_000;
    let start = Instant::now();
    let mut total_bytes = 0;
    for _ in 0..iterations {
        let css = generator.generate(&results);
        total_bytes += css.len();
    }
    let duration = start.elapsed();
    println!("  Generated CSS {} times in {:?}", iterations, duration);
    println!("  Total output: {} KB", total_bytes / 1024);
    println!("  Rate: {:.0} generations/ms\n", iterations as f64 / duration.as_millis().max(1) as f64);

    // 5. Full Pipeline Performance
    println!("5. FULL PIPELINE PERFORMANCE");
    println!("----------------------------");

    let input = "p-4 m-2 bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-between gap-4 rounded-lg shadow-md transition-all";

    let iterations = 1_000;
    let start = Instant::now();
    for _ in 0..iterations {
        let _ = engine.process(input);
    }
    let duration = start.elapsed();
    println!("  Full pipeline (parse + match + generate) {} times in {:?}", iterations, duration);
    println!("  Rate: {:.0} pipelines/ms\n", iterations as f64 / duration.as_millis().max(1) as f64);

    // Summary
    println!("=== SUMMARY ===");
    println!("Coral Turbo provides high-performance CSS utility processing:");
    println!("  - Trie-based O(k) prefix matching for 700+ utility patterns");
    println!("  - Parallel file extraction using Rayon");
    println!("  - Zero-copy parsing for minimal allocations");
    println!("  - LRU caching for repeated operations");
}
