//! Real-world usage example for coral-turbo-core
//!
//! This example demonstrates how Coral Turbo would be used
//! in a real build process to scan source files and generate CSS.
//!
//! Run with: cargo run --example real_world --release

use coral_turbo_core::{
    Parser, Matcher, Extractor, Generator, GenerateOptions, TurboEngine,
};
use std::collections::HashSet;
use std::time::Instant;

fn main() {
    println!("=== CoralCSS Turbo Engine - Real World Example ===\n");

    // Simulate a real project structure with various file types
    let source_files = generate_mock_project();

    println!("Project structure:");
    println!("  - {} React components (TSX)", source_files.iter().filter(|(_, t)| *t == "tsx").count());
    println!("  - {} TypeScript files", source_files.iter().filter(|(_, t)| *t == "ts").count());
    println!("  - {} HTML templates", source_files.iter().filter(|(_, t)| *t == "html").count());
    println!();

    // Initialize engine components
    let extractor = Extractor::new();
    let parser = Parser::new();
    let matcher = Matcher::new();
    let generator = Generator::with_options(GenerateOptions {
        minify: false,
        source_comments: false,
        sort_by_property: true,
        use_layers: true,
    });

    let total_start = Instant::now();

    // Step 1: Extract all classes from source files
    println!("Step 1: Extracting classes from source files...");
    let extract_start = Instant::now();

    let contents: Vec<&str> = source_files.iter().map(|(c, _)| c.as_str()).collect();
    let all_classes = extractor.extract_parallel(&contents);

    // Deduplicate
    let unique_classes: HashSet<_> = all_classes.into_iter().collect();

    let extract_time = extract_start.elapsed();
    println!("  Extracted {} unique classes in {:?}", unique_classes.len(), extract_time);

    // Step 2: Parse and match all classes
    println!("\nStep 2: Parsing and matching classes...");
    let match_start = Instant::now();

    let mut match_results = Vec::new();
    let mut unmatched = Vec::new();

    for class in &unique_classes {
        let parsed = parser.parse(class);
        if let Some(result) = matcher.match_class(&parsed) {
            match_results.push(result);
        } else {
            unmatched.push(class.clone());
        }
    }

    let match_time = match_start.elapsed();
    println!("  Matched {} classes, {} unmatched in {:?}",
             match_results.len(), unmatched.len(), match_time);

    if !unmatched.is_empty() && unmatched.len() <= 10 {
        println!("  Unmatched classes: {:?}", unmatched);
    }

    // Step 3: Generate CSS
    println!("\nStep 3: Generating CSS output...");
    let gen_start = Instant::now();

    let css = generator.generate(&match_results);

    let gen_time = gen_start.elapsed();
    println!("  Generated {} bytes of CSS in {:?}", css.len(), gen_time);

    let total_time = total_start.elapsed();

    // Output summary
    println!("\n=== BUILD SUMMARY ===");
    println!("Total time: {:?}", total_time);
    println!("  - Extraction: {:?}", extract_time);
    println!("  - Parsing/Matching: {:?}", match_time);
    println!("  - Generation: {:?}", gen_time);
    println!();
    println!("Files processed: {}", source_files.len());
    println!("Unique classes: {}", unique_classes.len());
    println!("CSS rules generated: {}", match_results.len());
    println!("Output size: {} bytes ({:.1} KB)", css.len(), css.len() as f64 / 1024.0);

    // Show sample of generated CSS
    println!("\n=== SAMPLE OUTPUT (first 30 lines) ===");
    for (i, line) in css.lines().take(30).enumerate() {
        println!("{:3}: {}", i + 1, line);
    }
    if css.lines().count() > 30 {
        println!("... ({} more lines)", css.lines().count() - 30);
    }

    // Demonstrate minified output
    println!("\n=== MINIFIED OUTPUT ===");
    let minified_generator = Generator::with_options(GenerateOptions {
        minify: true,
        source_comments: false,
        sort_by_property: false,
        use_layers: true,
    });
    let minified = minified_generator.generate(&match_results);
    println!("Minified size: {} bytes ({}% reduction)",
             minified.len(),
             (100.0 - (minified.len() as f64 / css.len() as f64 * 100.0)) as i32);

    // Demonstrate TurboEngine all-in-one API
    println!("\n=== TURBO ENGINE (All-in-One) ===");
    let engine = TurboEngine::new();

    let quick_input = "flex items-center justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg";
    let quick_css = engine.process(quick_input);
    println!("Quick process '{}...':", &quick_input[..40]);
    println!("{}", quick_css);
}

/// Generate mock project files to simulate a real-world scenario
fn generate_mock_project() -> Vec<(String, &'static str)> {
    let mut files = Vec::new();

    // React components (TSX)
    for i in 0..20 {
        files.push((generate_react_component(i), "tsx"));
    }

    // TypeScript utilities
    for i in 0..5 {
        files.push((generate_ts_utility(i), "ts"));
    }

    // HTML templates
    for i in 0..3 {
        files.push((generate_html_template(i), "html"));
    }

    files
}

fn generate_react_component(index: usize) -> String {
    let variants = ["sm", "md", "lg", "xl"];
    let colors = ["blue", "red", "green", "gray", "purple", "indigo"];
    let shades = [100, 200, 300, 400, 500, 600, 700, 800, 900];

    let p_val = (index % 8) + 2;
    let m_val = index % 8;
    let color1 = colors[index % colors.len()];
    let shade1 = shades[(index * 2) % shades.len()];
    let rounded = variants[index % variants.len()];
    let shadow = variants[index % variants.len()];
    let text_size = variants[(index + 1) % variants.len()];
    let color2 = colors[(index + 1) % colors.len()];
    let grid_variant = variants[index % variants.len()];

    format!(
        r##"
import React from 'react';
import clsx from 'clsx';

interface Props {{
    variant?: 'sm' | 'md' | 'lg';
    isActive?: boolean;
}}

export const Component{idx}: React.FC<Props> = ({{ variant = 'md', isActive }}) => {{
    return (
        <div className="flex flex-col gap-4 p-{p} m-{m} bg-{c1}-{s1} rounded-{r} shadow-{sh}">
            <header className="flex items-center justify-between px-4 py-2 border-b border-gray-200">
                <h2 className="text-{ts} font-bold text-gray-900">Title {idx}</h2>
                <button className="px-4 py-2 rounded-md transition-all bg-{c1}-500 hover:bg-{c1}-600 text-white">
                    Action
                </button>
            </header>
            <main className="flex-1 p-4">
                <p className="text-gray-600 leading-relaxed">
                    Content for component {idx}
                </p>
                <div className="mt-4 grid grid-cols-2 {gv}:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded shadow-sm hover:shadow-md">Item 1</div>
                    <div className="p-4 bg-white rounded shadow-sm hover:shadow-md">Item 2</div>
                    <div className="p-4 bg-white rounded shadow-sm hover:shadow-md">Item 3</div>
                </div>
            </main>
            <footer className="flex justify-end gap-2 px-4 py-3 bg-gray-50 rounded-b-{r}">
                <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-900">
                    Cancel
                </button>
                <button className="px-3 py-1.5 text-sm bg-{c2}-500 text-white rounded hover:bg-{c2}-600">
                    Save
                </button>
            </footer>
        </div>
    );
}};
"##,
        idx = index,
        p = p_val,
        m = m_val,
        c1 = color1,
        s1 = shade1,
        r = rounded,
        sh = shadow,
        ts = text_size,
        c2 = color2,
        gv = grid_variant
    )
}

fn generate_ts_utility(index: usize) -> String {
    format!(
        r#"
// Utility file {idx}
import clsx from 'clsx';

export const buttonStyles = {{
    base: 'inline-flex items-center justify-center rounded-md font-medium transition-colors',
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-300',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 focus:ring-2 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300',
    sizes: {{
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
    }},
}};

export const cardStyles = clsx(
    'flex flex-col',
    'bg-white rounded-lg shadow-md',
    'border border-gray-200',
    'overflow-hidden'
);

export const inputStyles = {{
    base: 'block w-full rounded-md border-gray-300 shadow-sm',
    focus: 'focus:border-blue-500 focus:ring-blue-500',
    error: 'border-red-500 focus:border-red-500 focus:ring-red-500',
}};
"#,
        idx = index
    )
}

fn generate_html_template(index: usize) -> String {
    format!(
        r#"
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Template {idx}</title>
</head>
<body class="min-h-screen bg-gray-100">
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16">
                <div class="flex-shrink-0">
                    <span class="text-xl font-bold text-blue-600">Logo</span>
                </div>
                <div class="hidden md:flex items-center gap-6">
                    <a class="text-gray-600 hover:text-gray-900">Home</a>
                    <a class="text-gray-600 hover:text-gray-900">About</a>
                    <a class="text-gray-600 hover:text-gray-900">Contact</a>
                </div>
            </div>
        </div>
    </nav>

    <main class="pt-20 pb-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <section class="bg-white rounded-xl shadow-lg p-8 mb-8">
                <h1 class="text-3xl font-bold text-gray-900 mb-4">Welcome to Template {idx}</h1>
                <p class="text-gray-600 text-lg leading-relaxed mb-6">
                    This is a sample HTML template demonstrating various Tailwind CSS classes.
                </p>
                <div class="flex flex-wrap gap-4">
                    <button class="px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600">
                        Primary Button
                    </button>
                    <button class="px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50">
                        Secondary Button
                    </button>
                </div>
            </section>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg">
                    <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-blue-600 text-xl">1</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature One</h3>
                    <p class="text-gray-600">Description of the first feature.</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg">
                    <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-green-600 text-xl">2</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature Two</h3>
                    <p class="text-gray-600">Description of the second feature.</p>
                </div>
                <div class="bg-white rounded-lg shadow p-6 hover:shadow-lg">
                    <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                        <span class="text-purple-600 text-xl">3</span>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-900 mb-2">Feature Three</h3>
                    <p class="text-gray-600">Description of the third feature.</p>
                </div>
            </div>
        </div>
    </main>

    <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-center text-gray-400">2024 CoralCSS. All rights reserved.</p>
        </div>
    </footer>
</body>
</html>
"#,
        idx = index
    )
}
