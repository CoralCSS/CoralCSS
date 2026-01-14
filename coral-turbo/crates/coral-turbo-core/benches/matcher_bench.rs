//! Benchmarks for the matcher module

use coral_turbo_core::{Matcher, ParsedClass};
use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

fn create_parsed_class(raw: &str, utility: &str, value: Option<&str>) -> ParsedClass {
    ParsedClass {
        raw: raw.to_string(),
        utility: utility.to_string(),
        value: value.map(|s| s.to_string()),
        variants: vec![],
        opacity: None,
        arbitrary: None,
        important: false,
        negative: false,
    }
}

fn match_simple(c: &mut Criterion) {
    let matcher = Matcher::new();
    let parsed = create_parsed_class("p-4", "p", Some("4"));

    c.bench_function("match_simple", |b| {
        b.iter(|| matcher.match_class(black_box(&parsed)))
    });
}

fn match_color(c: &mut Criterion) {
    let matcher = Matcher::new();
    let parsed = create_parsed_class("bg-red-500", "bg", Some("red-500"));

    c.bench_function("match_color", |b| {
        b.iter(|| matcher.match_class(black_box(&parsed)))
    });
}

fn match_with_variant(c: &mut Criterion) {
    let matcher = Matcher::new();
    let mut parsed = create_parsed_class("hover:bg-blue-500", "bg", Some("blue-500"));
    parsed.variants = vec!["hover".to_string()];

    c.bench_function("match_with_variant", |b| {
        b.iter(|| matcher.match_class(black_box(&parsed)))
    });
}

fn match_arbitrary(c: &mut Criterion) {
    let matcher = Matcher::new();
    let mut parsed = create_parsed_class("p-[2rem]", "p", None);
    parsed.arbitrary = Some("2rem".to_string());

    c.bench_function("match_arbitrary", |b| {
        b.iter(|| matcher.match_class(black_box(&parsed)))
    });
}

fn match_negative(c: &mut Criterion) {
    let matcher = Matcher::new();
    let mut parsed = create_parsed_class("-m-4", "m", Some("4"));
    parsed.negative = true;

    c.bench_function("match_negative", |b| {
        b.iter(|| matcher.match_class(black_box(&parsed)))
    });
}

fn match_batch(c: &mut Criterion) {
    let matcher = Matcher::new();

    let classes = vec![
        create_parsed_class("p-4", "p", Some("4")),
        create_parsed_class("m-2", "m", Some("2")),
        create_parsed_class("bg-red-500", "bg", Some("red-500")),
        create_parsed_class("flex", "flex", None),
        create_parsed_class("items-center", "items", Some("center")),
        create_parsed_class("justify-between", "justify", Some("between")),
        create_parsed_class("gap-4", "gap", Some("4")),
        create_parsed_class("rounded-lg", "rounded", Some("lg")),
    ];

    let mut group = c.benchmark_group("match_batch");
    group.throughput(Throughput::Elements(classes.len() as u64));

    group.bench_function("match_8_classes", |b| {
        b.iter(|| {
            for class in &classes {
                let _ = matcher.match_class(black_box(class));
            }
        })
    });

    group.finish();
}

criterion_group!(
    benches,
    match_simple,
    match_color,
    match_with_variant,
    match_arbitrary,
    match_negative,
    match_batch,
);

criterion_main!(benches);
