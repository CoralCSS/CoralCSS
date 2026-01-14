//! Benchmarks for the parser module

use coral_turbo_core::Parser;
use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

fn simple_class(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_simple", |b| {
        b.iter(|| parser.parse(black_box("p-4")))
    });
}

fn class_with_variant(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_variant", |b| {
        b.iter(|| parser.parse(black_box("hover:bg-blue-500")))
    });
}

fn class_with_multiple_variants(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_multiple_variants", |b| {
        b.iter(|| parser.parse(black_box("dark:md:hover:bg-blue-500")))
    });
}

fn class_with_arbitrary(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_arbitrary", |b| {
        b.iter(|| parser.parse(black_box("p-[2rem]")))
    });
}

fn class_with_opacity(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_opacity", |b| {
        b.iter(|| parser.parse(black_box("bg-red-500/50")))
    });
}

fn complex_class(c: &mut Criterion) {
    let parser = Parser::new();

    c.bench_function("parse_complex", |b| {
        b.iter(|| parser.parse(black_box("dark:hover:!-translate-x-[2rem]/50")))
    });
}

fn parse_all_benchmark(c: &mut Criterion) {
    let parser = Parser::new();
    let input = "p-4 m-2 bg-red-500 hover:bg-blue-500 dark:text-white flex items-center justify-between gap-4 rounded-lg shadow-md";

    let mut group = c.benchmark_group("parse_all");
    group.throughput(Throughput::Elements(input.split_whitespace().count() as u64));

    group.bench_function("parse_all_10_classes", |b| {
        b.iter(|| parser.parse_all(black_box(input)))
    });

    group.finish();
}

fn parse_all_large(c: &mut Criterion) {
    let parser = Parser::new();

    // Generate 1000 class names
    let classes: Vec<String> = (0..1000)
        .map(|i| format!("class-{}", i))
        .collect();
    let input = classes.join(" ");

    let mut group = c.benchmark_group("parse_all_large");
    group.throughput(Throughput::Elements(1000));
    group.sample_size(50);

    group.bench_function("parse_1000_classes", |b| {
        b.iter(|| parser.parse_all(black_box(&input)))
    });

    group.finish();
}

criterion_group!(
    benches,
    simple_class,
    class_with_variant,
    class_with_multiple_variants,
    class_with_arbitrary,
    class_with_opacity,
    complex_class,
    parse_all_benchmark,
    parse_all_large,
);

criterion_main!(benches);
