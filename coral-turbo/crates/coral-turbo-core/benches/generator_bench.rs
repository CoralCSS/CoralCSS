//! Benchmarks for the generator module

use coral_turbo_core::{Generator, GenerateOptions, Layer, MatchResult, ParsedClass, CSSProperty};
use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

fn create_match_result(raw: &str, utility: &str, value: Option<&str>, properties: Vec<(&str, &str)>) -> MatchResult {
    MatchResult {
        parsed: ParsedClass {
            raw: raw.to_string(),
            utility: utility.to_string(),
            value: value.map(|s| s.to_string()),
            variants: vec![],
            opacity: None,
            arbitrary: None,
            important: false,
            negative: false,
        },
        properties: properties
            .into_iter()
            .map(|(p, v)| CSSProperty {
                property: p.to_string(),
                value: v.to_string(),
            })
            .collect(),
        pattern_name: format!("{}-{}", utility, value.unwrap_or("default")),
        layer: Layer::Utilities,
        sort_order: 0,
    }
}

fn generate_simple(c: &mut Criterion) {
    let generator = Generator::new();
    let results = vec![
        create_match_result("p-4", "p", Some("4"), vec![("padding", "1rem")]),
    ];

    c.bench_function("generate_simple", |b| {
        b.iter(|| generator.generate(black_box(&results)))
    });
}

fn generate_multiple(c: &mut Criterion) {
    let generator = Generator::new();
    let results = vec![
        create_match_result("p-4", "p", Some("4"), vec![("padding", "1rem")]),
        create_match_result("m-2", "m", Some("2"), vec![("margin", "0.5rem")]),
        create_match_result("bg-red-500", "bg", Some("red-500"), vec![("background-color", "#ef4444")]),
        create_match_result("text-white", "text", Some("white"), vec![("color", "#ffffff")]),
        create_match_result("flex", "flex", None, vec![("display", "flex")]),
        create_match_result("items-center", "items", Some("center"), vec![("align-items", "center")]),
        create_match_result("justify-between", "justify", Some("between"), vec![("justify-content", "space-between")]),
        create_match_result("rounded-lg", "rounded", Some("lg"), vec![("border-radius", "0.5rem")]),
    ];

    let mut group = c.benchmark_group("generate_multiple");
    group.throughput(Throughput::Elements(results.len() as u64));

    group.bench_function("generate_8_rules", |b| {
        b.iter(|| generator.generate(black_box(&results)))
    });

    group.finish();
}

fn generate_with_variants(c: &mut Criterion) {
    let generator = Generator::new();

    let mut hover_result = create_match_result("hover:bg-blue-500", "bg", Some("blue-500"), vec![("background-color", "#3b82f6")]);
    hover_result.parsed.variants = vec!["hover".to_string()];

    let mut dark_result = create_match_result("dark:text-white", "text", Some("white"), vec![("color", "#ffffff")]);
    dark_result.parsed.variants = vec!["dark".to_string()];

    let mut complex_result = create_match_result("dark:md:hover:bg-blue-500", "bg", Some("blue-500"), vec![("background-color", "#3b82f6")]);
    complex_result.parsed.variants = vec!["dark".to_string(), "md".to_string(), "hover".to_string()];

    let results = vec![hover_result, dark_result, complex_result];

    c.bench_function("generate_with_variants", |b| {
        b.iter(|| generator.generate(black_box(&results)))
    });
}

fn generate_minified(c: &mut Criterion) {
    let generator = Generator::with_options(GenerateOptions {
        minify: true,
        source_comments: false,
        sort_by_property: false,
        use_layers: true,
    });

    let results: Vec<MatchResult> = (0..50)
        .map(|i| create_match_result(
            &format!("p-{}", i),
            "p",
            Some(&i.to_string()),
            vec![("padding", &format!("{}rem", i as f32 * 0.25))]
        ))
        .collect();

    let mut group = c.benchmark_group("generate_minified");
    group.throughput(Throughput::Elements(results.len() as u64));

    group.bench_function("generate_50_minified", |b| {
        b.iter(|| generator.generate(black_box(&results)))
    });

    group.finish();
}

fn generate_large(c: &mut Criterion) {
    let generator = Generator::new();

    // Generate 1000 match results
    let results: Vec<MatchResult> = (0..1000)
        .map(|i| {
            let utilities = ["p", "m", "w", "h", "gap", "text", "bg", "border"];
            let utility = utilities[i % utilities.len()];
            create_match_result(
                &format!("{}-{}", utility, i),
                utility,
                Some(&i.to_string()),
                vec![("property", &format!("value-{}", i))]
            )
        })
        .collect();

    let mut group = c.benchmark_group("generate_large");
    group.throughput(Throughput::Elements(results.len() as u64));
    group.sample_size(50);

    group.bench_function("generate_1000_rules", |b| {
        b.iter(|| generator.generate(black_box(&results)))
    });

    group.finish();
}

criterion_group!(
    benches,
    generate_simple,
    generate_multiple,
    generate_with_variants,
    generate_minified,
    generate_large,
);

criterion_main!(benches);
