export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-muted px-4 py-2 rounded-full mb-6">
            <span className="text-sm font-medium">Powered by CoralCSS</span>
            <span className="bg-primary text-primary-foreground text-xs px-2 py-0.5 rounded-full">New</span>
          </div>

          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Build faster with CoralCSS + Next.js
          </h1>

          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Combine the speed of CoralCSS with the power of Next.js App Router.
            Server components, streaming, and the fastest CSS framework.
          </p>

          <div className="flex gap-4 justify-center">
            <a
              href="https://coralcss.dev/docs"
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Get Started
            </a>
            <a
              href="https://github.com/coralcss/core"
              className="px-6 py-3 bg-muted rounded-lg font-medium hover:bg-muted/80 transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why CoralCSS + Next.js?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Simple, familiar API
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            CoralCSS is 100% compatible with Tailwind classes. No learning curve.
          </p>

          <div className="bg-card rounded-xl border border-border overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-3 bg-muted border-b border-border">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm text-muted-foreground">App.tsx</span>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code>{`<div className="flex items-center gap-4 p-6 bg-card rounded-xl">
  <img
    src="/avatar.jpg"
    className="w-16 h-16 rounded-full"
  />
  <div>
    <h3 className="font-bold text-lg">John Doe</h3>
    <p className="text-muted-foreground">Developer</p>
  </div>
  <button className="ml-auto px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
    Follow
  </button>
</div>`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with CoralCSS + Next.js</p>
          <p className="mt-2">
            <a href="https://coralcss.dev" className="text-primary hover:underline">
              coralcss.dev
            </a>
          </p>
        </div>
      </footer>
    </main>
  )
}

const features = [
  {
    icon: '⚡',
    title: '6x Faster',
    description: 'CoralCSS generates CSS 6x faster than alternatives with intelligent caching.',
  },
  {
    icon: '📦',
    title: 'Zero Dependencies',
    description: 'Pure TypeScript with no runtime dependencies. Smaller bundles, faster installs.',
  },
  {
    icon: '🎨',
    title: 'Modern CSS',
    description: 'Container queries, anchor positioning, and scroll-driven animations built-in.',
  },
  {
    icon: '✨',
    title: '60+ Animations',
    description: 'Beautiful animations ready to use. Fade, slide, bounce, spring, and more.',
  },
  {
    icon: '🔧',
    title: 'Tailwind Compatible',
    description: '100% compatible with Tailwind classes. Migrate with zero breaking changes.',
  },
  {
    icon: '🌙',
    title: 'Dark Mode',
    description: 'First-class dark mode support with class or media query strategies.',
  },
]
