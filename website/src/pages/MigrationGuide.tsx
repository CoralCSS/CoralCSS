export default function MigrationGuide() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">
          Migration Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Seamlessly migrate from Tailwind CSS or other frameworks to CoralCSS
        </p>
      </div>

      {/* Quick Start */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Quick Migration Path</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">1️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Analyze</h3>
            <p className="text-muted-foreground">Run the migration analyzer to identify compatibility issues</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">2️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Transform</h3>
            <p className="text-muted-foreground">Automatically convert config and classes with our migration tools</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="w-12 h-12 bg-coral/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">3️⃣</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">Verify</h3>
            <p className="text-muted-foreground">Test your application and fine-tune as needed</p>
          </div>
        </div>
      </section>

      {/* From Tailwind CSS */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Migrating from Tailwind CSS</h2>

        <div className="space-y-8">
          {/* Step 1 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="bg-coral text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
              Install CoralCSS
            </h3>
            <div className="bg-background rounded-lg p-4 font-mono text-sm mb-4">
              <div className="text-muted-foreground"># Using npm</div>
              <div>npm install @coral-css/core</div>
              <div className="mt-2 text-muted-foreground"># Using yarn</div>
              <div>yarn add @coral-css/core</div>
              <div className="mt-2 text-muted-foreground"># Using pnpm</div>
              <div>pnpm add @coral-css/core</div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="bg-coral text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
              Analyze Your Project
            </h3>
            <p className="text-muted-foreground mb-4">
              Use the migration analyzer to scan your project:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm mb-4">
              npx coral-css migrate analyze ./src
            </div>
            <p className="text-muted-foreground">
              This will generate a detailed compatibility report showing which classes are compatible,
              which need updates, and which custom Tailwind plugins need adaptation.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="bg-coral text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
              Convert Configuration
            </h3>
            <p className="text-muted-foreground mb-4">
              Convert your Tailwind config to CoralCSS format:
            </p>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              npx coral-css migrate config tailwind.config.js
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="bg-coral text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
              Update Build Configuration
            </h3>
            <p className="text-muted-foreground mb-4">
              Replace Tailwind with CoralCSS in your build tool:
            </p>
            <div className="space-y-4">
              <div>
                <div className="text-sm font-semibold mb-2">Vite</div>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted-foreground">// vite.config.ts</div>
                  <div>import coral from '@coral-css/vite'</div>
                  <div className="mt-2">export default defineConfig({'{'}</div>
                  <div className="pl-4">plugins: [coral()]</div>
                  <div>{'}'})</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2">Next.js</div>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <div className="text-muted-foreground">// next.config.js</div>
                  <div>const coral = require('@coral-css/nextjs')</div>
                  <div className="mt-2">module.exports = coral({'{'}</div>
                  <div className="pl-4">// your Next.js config</div>
                  <div>{'}'})</div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="bg-coral text-white w-8 h-8 rounded-full flex items-center justify-center text-sm">5</span>
              Update CSS Imports
            </h3>
            <p className="text-muted-foreground mb-4">
              Replace Tailwind imports with CoralCSS:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <div className="text-sm font-semibold mb-2 text-red-500">Before (Tailwind)</div>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <div>@tailwind base;</div>
                  <div>@tailwind components;</div>
                  <div>@tailwind utilities;</div>
                </div>
              </div>
              <div>
                <div className="text-sm font-semibold mb-2 text-green-500">After (CoralCSS)</div>
                <div className="bg-background rounded-lg p-4 font-mono text-sm">
                  <div>@layer base;</div>
                  <div>@layer components;</div>
                  <div>@layer utilities;</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Class Mapping */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Class Compatibility</h2>
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Compatibility</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr>
                <td className="px-6 py-4 font-medium">Layout & Spacing</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">100% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">All classes work identically</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Typography</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">100% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Full support + additional utilities</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Colors</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">100% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Same color palette + semantic colors</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Borders & Effects</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">100% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Enhanced with advanced effects</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Responsive & Variants</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-sm">100% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">All variants + 30+ new ones</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Animations</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm">95% Compatible</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Some custom animations may need updates</td>
              </tr>
              <tr>
                <td className="px-6 py-4 font-medium">Custom Plugins</td>
                <td className="px-6 py-4">
                  <span className="px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-sm">Manual Review</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">Use plugin API to recreate functionality</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Key Differences */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Key Differences & Improvements</h2>
        <div className="grid gap-6">
          <div className="bg-card border border-coral/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-coral">⚡ Rust-Powered Performance</h3>
            <p className="text-muted-foreground">
              CoralCSS uses the coral-turbo Rust engine for 5-10x faster compilation than Tailwind's JavaScript-based PostCSS pipeline.
            </p>
          </div>
          <div className="bg-card border border-purple/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-purple">🎨 60+ Exclusive Utility Plugins</h3>
            <p className="text-muted-foreground">
              Advanced effects, gradients, keyframes, interactive utilities, and modern CSS features not available in Tailwind.
            </p>
          </div>
          <div className="bg-card border border-blue/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-blue">🧩 78 Headless Components</h3>
            <p className="text-muted-foreground">
              Pre-built accessible components with logic and ARIA attributes, fully customizable with utility classes.
            </p>
          </div>
          <div className="bg-card border border-green/20 rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-3 text-green">🔮 Modern CSS Features</h3>
            <p className="text-muted-foreground">
              First-class support for View Transitions, Anchor Positioning, Container Queries, and other cutting-edge CSS features.
            </p>
          </div>
        </div>
      </section>

      {/* Tips */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Migration Tips</h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-blue/5 border border-blue/20 rounded-lg">
            <div className="text-2xl">💡</div>
            <div>
              <div className="font-semibold mb-1">Gradual Migration</div>
              <div className="text-muted-foreground">You can run CoralCSS alongside Tailwind during migration. Start with new components and gradually migrate existing ones.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Test Thoroughly</div>
              <div className="text-muted-foreground">Use CoralCSS's comprehensive test suite as a reference. Run visual regression tests after migration to catch any style differences.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-yellow/5 border border-yellow/20 rounded-lg">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold mb-1">Review Custom Plugins</div>
              <div className="text-muted-foreground">Custom Tailwind plugins need to be adapted to CoralCSS's plugin API. The structure is similar but has enhanced TypeScript support.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-purple/5 border border-purple/20 rounded-lg">
            <div className="text-2xl">🚀</div>
            <div>
              <div className="font-semibold mb-1">Leverage New Features</div>
              <div className="text-muted-foreground">Take advantage of CoralCSS-exclusive features like View Transitions, advanced animations, and headless components to enhance your application.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Help */}
      <div className="p-8 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl text-center border border-coral/20">
        <h2 className="text-2xl font-bold mb-4">Need Migration Help?</h2>
        <p className="text-muted-foreground mb-6">
          Check our FAQ or explore the migration tools for automated assistance
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/faq"
            className="px-8 py-3 bg-coral text-white rounded-lg font-medium hover:bg-coral-dark transition-colors"
          >
            View FAQ
          </a>
          <a
            href="/docs"
            className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Full Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
