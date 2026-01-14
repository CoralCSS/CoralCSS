//! Benchmarks for the extractor module

use coral_turbo_core::Extractor;
use criterion::{black_box, criterion_group, criterion_main, Criterion, Throughput};

fn extract_html(c: &mut Criterion) {
    let extractor = Extractor::new();
    let html = r#"<div class="p-4 m-2 bg-red-500 hover:bg-blue-500">Hello</div>"#;

    c.bench_function("extract_html_simple", |b| {
        b.iter(|| extractor.extract(black_box(html)))
    });
}

fn extract_jsx(c: &mut Criterion) {
    let extractor = Extractor::new();
    let jsx = r#"
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Click me
        </button>
    "#;

    c.bench_function("extract_jsx", |b| {
        b.iter(|| extractor.extract(black_box(jsx)))
    });
}

fn extract_clsx(c: &mut Criterion) {
    let extractor = Extractor::new();
    let code = r#"
        clsx(
            'base-class',
            isActive && 'bg-blue-500 text-white',
            isDisabled && 'opacity-50 cursor-not-allowed',
            size === 'lg' && 'p-4 text-lg',
            size === 'sm' && 'p-2 text-sm'
        )
    "#;

    c.bench_function("extract_clsx", |b| {
        b.iter(|| extractor.extract(black_box(code)))
    });
}

fn extract_large_file(c: &mut Criterion) {
    let extractor = Extractor::new();

    // Generate a realistic large component file
    let mut content = String::new();
    for i in 0..100 {
        content.push_str(&format!(
            r#"<div className="flex items-center justify-between p-{} m-{} bg-gray-{} rounded-lg shadow-md hover:shadow-lg transition-all">
                <span className="text-gray-{} font-semibold">Item {}</span>
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded">Action</button>
            </div>
            "#,
            i % 12, i % 8, (i % 9 + 1) * 100, (i % 9 + 1) * 100, i
        ));
    }

    let mut group = c.benchmark_group("extract_large");
    group.throughput(Throughput::Bytes(content.len() as u64));
    group.sample_size(50);

    group.bench_function("extract_100_components", |b| {
        b.iter(|| extractor.extract(black_box(&content)))
    });

    group.finish();
}

fn extract_parallel(c: &mut Criterion) {
    let extractor = Extractor::new();

    // Generate 10 files
    let files: Vec<String> = (0..10)
        .map(|i| {
            format!(
                r#"<div class="file-{} p-4 m-2 bg-blue-500 hover:bg-blue-600">
                    <h1 class="text-2xl font-bold">Title {}</h1>
                    <p class="text-gray-600">Content</p>
                </div>"#,
                i, i
            )
        })
        .collect();

    let files_refs: Vec<&str> = files.iter().map(|s| s.as_str()).collect();

    let mut group = c.benchmark_group("extract_parallel");
    group.throughput(Throughput::Elements(files.len() as u64));

    group.bench_function("extract_10_files_parallel", |b| {
        b.iter(|| extractor.extract_parallel(black_box(&files_refs)))
    });

    group.finish();
}

fn extract_arbitrary_values(c: &mut Criterion) {
    let extractor = Extractor::new();
    let code = r#"
        <div className="p-[2rem] m-[10px] bg-[#ff5733] text-[rgba(0,0,0,0.8)]">
            <span className="w-[calc(100%-2rem)] h-[var(--header-height)]">Test</span>
        </div>
    "#;

    c.bench_function("extract_arbitrary", |b| {
        b.iter(|| extractor.extract(black_box(code)))
    });
}

criterion_group!(
    benches,
    extract_html,
    extract_jsx,
    extract_clsx,
    extract_large_file,
    extract_parallel,
    extract_arbitrary_values,
);

criterion_main!(benches);
