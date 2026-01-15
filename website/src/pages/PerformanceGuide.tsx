export default function PerformanceGuide() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">
          Performance Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Optimize your CoralCSS application for maximum speed and efficiency
        </p>
      </div>

      {/* Key Metrics */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Performance Metrics</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-xl">
            <div className="text-4xl font-bold text-green-500 mb-2">5-10x</div>
            <div className="text-sm font-medium mb-1">Faster Compilation</div>
            <div className="text-xs text-muted-foreground">vs JavaScript-based tools</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-500/5 border border-blue-500/20 rounded-xl">
            <div className="text-4xl font-bold text-blue-500 mb-2">~15KB</div>
            <div className="text-sm font-medium mb-1">Runtime Size</div>
            <div className="text-xs text-muted-foreground">Core kernel gzipped</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-xl">
            <div className="text-4xl font-bold text-purple-500 mb-2">0ms</div>
            <div className="text-sm font-medium mb-1">Runtime Overhead</div>
            <div className="text-xs text-muted-foreground">Zero runtime JavaScript</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-coral/10 to-coral/5 border border-coral/20 rounded-xl">
            <div className="text-4xl font-bold text-coral mb-2">95+</div>
            <div className="text-sm font-medium mb-1">Lighthouse Score</div>
            <div className="text-xs text-muted-foreground">Typical production apps</div>
          </div>
        </div>
      </section>

      {/* Build-Time Optimization */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Build-Time Optimization</h2>

        <div className="space-y-6">
          {/* Rust Turbo Engine */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🦀</span>
              Rust-Powered Turbo Engine
            </h3>
            <p className="text-muted-foreground mb-4">
              CoralCSS uses a Rust-based compilation engine (coral-turbo) for blazing-fast CSS generation:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Native Performance:</strong> Compiled to native code for 5-10x faster builds</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Parallel Processing:</strong> Multi-threaded CSS generation and purging</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>Memory Efficient:</strong> Optimized memory usage for large projects</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span><strong>WASM Support:</strong> Falls back to WASM when native bindings unavailable</span>
              </li>
            </ul>
            <div className="mt-4 bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// Enable Turbo mode in config</div>
              <div>export default {'{'}</div>
              <div className="pl-4">turbo: true,</div>
              <div className="pl-4">parallel: true,</div>
              <div className="pl-4">cache: true</div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* CSS Purging */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🧹</span>
              Automatic CSS Purging
            </h3>
            <p className="text-muted-foreground mb-4">
              CoralCSS automatically removes unused CSS in production builds:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-red-500">Without Purging</div>
                <div className="text-2xl font-bold">2.5MB</div>
                <div className="text-xs text-muted-foreground">Full utility library</div>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-green-500">With Purging</div>
                <div className="text-2xl font-bold">~15KB</div>
                <div className="text-xs text-muted-foreground">Only used classes</div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// Purging is automatic in production</div>
              <div>export default {'{'}</div>
              <div className="pl-4">purge: {'{'}</div>
              <div className="pl-8">content: ['./src/**/*.{'{'}tsx,html{'}'}'],</div>
              <div className="pl-8">enabled: process.env.NODE_ENV === 'production'</div>
              <div className="pl-4">{'}'},</div>
              <div>{'}'}</div>
            </div>
          </div>

          {/* Minification */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">📦</span>
              Smart Minification
            </h3>
            <p className="text-muted-foreground mb-4">
              Advanced CSS minification techniques:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-coral">•</span>
                <span>Remove whitespace and comments</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">•</span>
                <span>Merge duplicate selectors and rules</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">•</span>
                <span>Shorten color values (hex, rgb, hsl)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">•</span>
                <span>Optimize @media and @layer queries</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">•</span>
                <span>Remove unused @keyframes</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Runtime Performance */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Runtime Performance</h2>

        <div className="space-y-6">
          {/* Zero Runtime */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">⚡</span>
              Zero Runtime Overhead
            </h3>
            <p className="text-muted-foreground mb-4">
              Unlike CSS-in-JS solutions, CoralCSS adds ZERO JavaScript to your bundle:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-red-500">CSS-in-JS</div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Runtime style parsing</li>
                  <li>• Dynamic style injection</li>
                  <li>• JavaScript overhead</li>
                  <li>• Slower page loads</li>
                </ul>
              </div>
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-green-500">CoralCSS</div>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Build-time generation</li>
                  <li>• Static CSS files</li>
                  <li>• No JavaScript needed</li>
                  <li>• Instant page loads</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Critical CSS */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Critical CSS Extraction
            </h3>
            <p className="text-muted-foreground mb-4">
              Automatically extract and inline critical CSS for faster first paint:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm mb-4">
              <div className="text-muted-foreground">// Enable critical CSS extraction</div>
              <div>export default {'{'}</div>
              <div className="pl-4">critical: {'{'}</div>
              <div className="pl-8">enabled: true,</div>
              <div className="pl-8">inline: true,</div>
              <div className="pl-8">minify: true</div>
              <div className="pl-4">{'}'},</div>
              <div>{'}'}</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Results in faster First Contentful Paint (FCP) and Largest Contentful Paint (LCP).
            </p>
          </div>

          {/* Caching */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">💾</span>
              Intelligent Caching
            </h3>
            <p className="text-muted-foreground mb-4">
              Multi-layer caching for faster rebuilds:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-coral">1.</span>
                <div>
                  <strong>File System Cache:</strong> Cached CSS generation results between builds
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">2.</span>
                <div>
                  <strong>Memory Cache:</strong> In-memory caching for development hot-reload
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral">3.</span>
                <div>
                  <strong>Content Hash:</strong> Smart invalidation based on content changes
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Performance Best Practices</h2>
        <div className="grid gap-4">
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Use Purging in Production</div>
              <div className="text-muted-foreground text-sm">Always enable CSS purging for production builds to minimize bundle size. CoralCSS defaults to enabled in NODE_ENV=production.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Enable Turbo Mode</div>
              <div className="text-muted-foreground text-sm">Use the Rust-based Turbo engine for fastest compilation. It's 5-10x faster than JavaScript-based tools.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Minimize Custom CSS</div>
              <div className="text-muted-foreground text-sm">Favor CoralCSS utilities over custom CSS. Utilities are optimized, cached, and automatically purged.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Use @layer Directives</div>
              <div className="text-muted-foreground text-sm">Organize your CSS with @layer base, @layer components, @layer utilities for better caching and cascade control.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-yellow/5 border border-yellow/20 rounded-lg">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold mb-1">Avoid Dynamic Class Names</div>
              <div className="text-muted-foreground text-sm">Don't construct class names dynamically (e.g., `bg-${'{'}color{'}'}` ). Use complete class names for proper purging.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-yellow/5 border border-yellow/20 rounded-lg">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold mb-1">Configure Content Paths</div>
              <div className="text-muted-foreground text-sm">Ensure your purge content paths accurately match all files using CoralCSS classes for optimal purging.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Performance Monitoring</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Track Your Metrics</h3>
          <p className="text-muted-foreground mb-4">
            Monitor these key performance indicators:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="font-semibold">Build Metrics</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Build time</li>
                <li>• CSS bundle size</li>
                <li>• Number of utility classes generated</li>
                <li>• Cache hit rate</li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="font-semibold">Runtime Metrics</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• First Contentful Paint (FCP)</li>
                <li>• Largest Contentful Paint (LCP)</li>
                <li>• Cumulative Layout Shift (CLS)</li>
                <li>• Total Blocking Time (TBT)</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <div className="p-8 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl text-center border border-coral/20">
        <h2 className="text-2xl font-bold mb-4">Ready to Optimize?</h2>
        <p className="text-muted-foreground mb-6">
          Start implementing these performance techniques in your CoralCSS project
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/docs"
            className="px-8 py-3 bg-coral text-white rounded-lg font-medium hover:bg-coral-dark transition-colors"
          >
            Read Documentation
          </a>
          <a
            href="/playground"
            className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Try Playground
          </a>
        </div>
      </div>
    </div>
  )
}
