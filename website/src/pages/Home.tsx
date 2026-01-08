function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 bg-slate-50">
        <div className="container text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate-900 tracking-tight leading-tight mb-6">
            The Modern CSS Framework
            <br />
            <span className="gradient-text">Built for the Future</span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Zero dependencies. Utility-first classes. Headless components. First-class support for
            anchor positioning, container queries, :has(), scroll-driven animations, and view transitions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/docs" className="btn btn-primary px-6 py-2">
              Get Started
            </a>
            <a
              href="https://github.com/coralcss/core"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline px-6 py-2"
            >
              View on GitHub
            </a>
          </div>
          <div className="mt-8">
            <code className="inline-code text-slate-700">npm install @coralcss/core</code>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Everything You Need
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              title="Zero Dependencies"
              description="Pure TypeScript with no runtime dependencies. Just the CSS you need."
              icon="0"
            />
            <FeatureCard
              title="Utility-First"
              description="Thousands of utility classes for rapid UI development."
              icon="U"
            />
            <FeatureCard
              title="Modern CSS"
              description="Anchor positioning, container queries, :has(), and more."
              icon="M"
            />
            <FeatureCard
              title="Headless Components"
              description="Accessible, unstyled UI components with full keyboard support."
              icon="H"
            />
            <FeatureCard
              title="Plugin Architecture"
              description="Micro-kernel design with everything as plugins."
              icon="P"
            />
            <FeatureCard
              title="Multiple Presets"
              description="Coral, Wind (Tailwind-compatible), Mini, and Full presets."
              icon="4"
            />
            <FeatureCard
              title="Runtime + Build"
              description="Works via CDN or build tools like Vite and PostCSS."
              icon="R"
            />
            <FeatureCard
              title="TypeScript"
              description="Full TypeScript support with strict types throughout."
              icon="T"
            />
          </div>
        </div>
      </section>

      {/* Code Example Section */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Simple and Intuitive
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
            Use familiar utility classes with powerful new features like variant groups.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">Utility Classes</h3>
              <pre>{`<div class="flex items-center gap-4 p-4
     bg-coral-500 text-white rounded-lg">
  Hello, CoralCSS!
</div>`}</pre>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4 text-slate-800">Variant Groups</h3>
              <pre>{`<!-- Instead of repeating variants -->
<div class="hover:bg-coral-500 hover:text-white
     hover:scale-105">

<!-- Use variant groups -->
<div class="hover:(bg-coral-500 text-white scale-105)">`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* Modern CSS Section */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
            Modern CSS Features
          </h2>
          <p className="text-center text-slate-600 mb-8 max-w-3xl mx-auto">
            First-class support for the latest CSS features that make web development easier.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card">
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Container Queries</h3>
              <pre className="text-sm">{`<div class="@container">
  <div class="@sm:flex @md:grid">
    Responds to container
  </div>
</div>`}</pre>
            </div>
            <div className="feature-card">
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Anchor Positioning</h3>
              <pre className="text-sm">{`<button class="anchor-name-[--btn]">
  Anchor
</button>
<div class="position-anchor-[--btn]
     position-area-bottom">
  Tooltip
</div>`}</pre>
            </div>
            <div className="feature-card">
              <h3 className="text-lg font-semibold mb-2 text-slate-800">Scroll Animations</h3>
              <pre className="text-sm">{`<div class="animation-timeline-scroll
     animation-range-entry">
  Animates as you scroll
</div>`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-lg mb-8 opacity-90">
            Install CoralCSS and start building beautiful interfaces today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/docs" className="btn bg-white text-coral-600 hover:bg-slate-100 px-6 py-2">
              Read the Docs
            </a>
            <a href="/examples" className="btn bg-transparent border border-white text-white hover:bg-white/10 px-6 py-2">
              View Examples
            </a>
          </div>
        </div>
      </section>
    </>
  )
}

function FeatureCard({ title, description, icon }: { title: string; description: string; icon: string }) {
  return (
    <div className="feature-card">
      <div className="w-10 h-10 rounded-lg gradient-bg text-white flex items-center justify-center font-bold mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm">{description}</p>
    </div>
  )
}

export default Home
