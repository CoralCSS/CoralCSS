import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

function Home() {
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const useCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0)
    useEffect(() => {
      let start = 0
      const increment = end / (duration / 16)
      const timer = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(timer)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)
      return () => clearInterval(timer)
    }, [end, duration])
    return count
  }

  const componentCount = useCounter(168)
  const coverageCount = useCounter(98)

  const codeExamples = [
    {
      title: 'Button',
      code: `<button class="px-4 py-2 bg-coral-500
  text-white rounded-lg font-medium
  hover:bg-coral-600 transition">
  Get Started
</button>`
    },
    {
      title: 'Card',
      code: `<div class="p-6 bg-white rounded-xl
  border border-gray-100 shadow-sm">
  <h3 class="font-semibold">Title</h3>
  <p class="text-gray-500 text-sm">
    Description text here
  </p>
</div>`
    },
    {
      title: 'Input',
      code: `<input type="text"
  placeholder="Search..."
  class="w-full px-4 py-2 rounded-lg
  border border-gray-200
  focus:border-coral-500
  focus:ring-2 focus:ring-coral-100" />`
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <section className="relative pt-32 pb-24 overflow-hidden">
        {/* Subtle glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, hsl(var(--primary) / 0.3) 0%, transparent 70%)' }}
        />

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            v1.0 Released
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            Build faster with
            <br />
            <span className="text-primary">CoralCSS</span>
          </h1>

          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-muted-foreground">
            A modern, zero-dependency CSS framework with JIT compilation,
            TypeScript support, and 168+ ready-to-use components.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              to="/docs"
              className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Get Started
            </Link>
            <Link
              to="/components"
              className="px-6 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground border border-border hover:bg-accent transition-all"
            >
              Components
            </Link>
          </div>

          {/* Install */}
          <div
            className="inline-flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer bg-muted border border-border hover:border-primary/30 transition-all"
            onClick={() => copyToClipboard('npm install @coral-css/core')}
          >
            <code className="text-sm text-muted-foreground">
              <span className="opacity-50">$</span> npm install @coral-css/core
            </code>
            <span className="text-xs px-2 py-0.5 rounded bg-secondary text-muted-foreground">
              {copied ? '✓' : 'Copy'}
            </span>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 border-y border-border">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '0', label: 'Dependencies' },
              { value: `${componentCount}+`, label: 'Components' },
              { value: '~10kb', label: 'Gzipped' },
              { value: `${coverageCount}%`, label: 'Coverage' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why developers love it
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need, nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '⚡', title: 'JIT Engine', desc: 'Generates only the CSS you use. Zero waste.' },
              { icon: '🔒', title: 'Type Safe', desc: 'Full TypeScript support with autocomplete.' },
              { icon: '🎨', title: 'Themeable', desc: 'CSS variables for easy customization.' },
              { icon: '📦', title: 'Zero Deps', desc: 'No runtime dependencies. Pure CSS output.' },
              { icon: '🧩', title: 'Plugins', desc: 'Extend with custom utilities easily.' },
              { icon: '♿', title: 'Accessible', desc: 'WCAG compliant components built-in.' },
            ].map((f, i) => (
              <div
                key={i}
                className="p-6 rounded-xl bg-card border border-border hover:border-primary/30 hover:-translate-y-0.5 transition-all"
              >
                <div className="text-2xl mb-3">{f.icon}</div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, intuitive syntax
            </h2>
            <p className="text-muted-foreground">Write less, build more.</p>
          </div>

          <div className="rounded-xl overflow-hidden bg-card border border-border">
            {/* Tabs */}
            <div className="flex gap-1 p-2 border-b border-border">
              {codeExamples.map((ex, i) => (
                <button
                  key={i}
                  onClick={() => setActiveTab(i)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    activeTab === i
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {ex.title}
                </button>
              ))}
            </div>

            <div className="grid lg:grid-cols-2">
              {/* Code */}
              <div className="p-6 border-r border-border bg-muted/50">
                <pre className="text-sm leading-relaxed">
                  <code className="text-muted-foreground">{codeExamples[activeTab].code}</code>
                </pre>
              </div>

              {/* Preview */}
              <div className="p-6 flex items-center justify-center min-h-[200px]">
                {activeTab === 0 && (
                  <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all">
                    Get Started
                  </button>
                )}
                {activeTab === 1 && (
                  <div className="p-6 rounded-xl bg-card border border-border max-w-xs">
                    <h3 className="font-semibold mb-1">Title</h3>
                    <p className="text-sm text-muted-foreground">Description text here</p>
                  </div>
                )}
                {activeTab === 2 && (
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-64 px-4 py-2 rounded-lg text-sm bg-background border border-input focus:border-primary focus:outline-none transition-colors"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frameworks */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm uppercase tracking-wider mb-8 text-muted-foreground">
            Works with your favorite tools
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {['React', 'Vue', 'Svelte', 'Angular', 'Next.js', 'Nuxt', 'Vite', 'Astro'].map((name, i) => (
              <span key={i} className="text-lg font-medium text-muted-foreground/60">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Components Preview */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Beautiful components
            </h2>
            <p className="text-muted-foreground">Copy, paste, customize.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Buttons */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Buttons</p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-1.5 text-sm rounded-md bg-primary text-primary-foreground">Primary</button>
                <button className="px-3 py-1.5 text-sm rounded-md bg-secondary text-secondary-foreground">Secondary</button>
                <button className="px-3 py-1.5 text-sm rounded-md border border-border text-foreground">Outline</button>
              </div>
            </div>

            {/* Badges */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Badges</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-0.5 text-xs rounded-full bg-green-500/10 text-green-600 dark:text-green-400">Success</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-red-500/10 text-red-600 dark:text-red-400">Error</span>
                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">Info</span>
              </div>
            </div>

            {/* Input */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Input</p>
              <input
                type="text"
                placeholder="Enter text..."
                className="w-full px-3 py-1.5 text-sm rounded-md bg-background border border-input focus:border-primary focus:outline-none"
              />
            </div>

            {/* Toggle */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Toggle</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-6 rounded-full relative cursor-pointer bg-primary">
                  <div className="absolute right-1 top-1 w-4 h-4 rounded-full bg-white" />
                </div>
                <span className="text-sm text-muted-foreground">Enabled</span>
              </div>
            </div>

            {/* Avatar */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Avatar</p>
              <div className="flex -space-x-2">
                {['bg-primary', 'bg-blue-500', 'bg-green-500', 'bg-purple-500'].map((c, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs text-white font-medium ${c} ring-2 ring-background`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
            </div>

            {/* Progress */}
            <div className="p-6 rounded-xl bg-card border border-border">
              <p className="text-xs uppercase tracking-wider mb-4 text-muted-foreground">Progress</p>
              <div className="h-2 rounded-full overflow-hidden bg-secondary">
                <div className="h-full rounded-full w-2/3 bg-primary" />
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
            >
              View all components
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start building today
          </h2>
          <p className="text-lg mb-8 text-muted-foreground">
            Free, open source, MIT licensed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/docs"
              className="px-6 py-3 rounded-lg font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all"
            >
              Read the docs
            </Link>
            <a
              href="https://github.com/aspect-software/CoralCSS"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-lg font-medium bg-secondary text-secondary-foreground flex items-center justify-center gap-2 hover:bg-accent transition-all"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            MIT License · Built with TypeScript
          </p>
        </div>
      </footer>
    </div>
  )
}

export default Home
