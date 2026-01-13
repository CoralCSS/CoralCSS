import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-background transition-colors">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪸</span>
            <span className="font-bold text-xl text-foreground">CoralCSS</span>
          </div>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 bg-clip-text text-transparent">
            Welcome to CoralCSS
          </h1>
          <p className="text-xl text-muted-foreground mb-8">
            The fastest, most modern CSS framework. Zero dependencies, 60+ animations,
            and full Tailwind compatibility.
          </p>

          {/* Counter Card */}
          <div className="bg-card rounded-xl shadow-lg p-8 mb-8 border border-border">
            <p className="text-muted-foreground mb-4">
              Click the button to test interactivity
            </p>
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setCount(c => c - 1)}
                className="w-12 h-12 rounded-lg bg-muted hover:bg-muted/80 transition-colors text-xl font-bold"
              >
                -
              </button>
              <span className="text-4xl font-bold w-20">{count}</span>
              <button
                onClick={() => setCount(c => c + 1)}
                className="w-12 h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-xl font-bold"
              >
                +
              </button>
            </div>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: '6x Faster', desc: 'Lightning fast compilation', icon: '⚡' },
              { title: '60+ Animations', desc: 'Built-in keyframes', icon: '✨' },
              { title: 'Modern CSS', desc: 'Container queries, anchor positioning', icon: '🎨' },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-card p-6 rounded-xl border border-border hover:shadow-lg hover:scale-105 transition-all cursor-pointer"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with CoralCSS + React + Vite</p>
          <p className="mt-2">
            <a href="https://coralcss.dev" className="text-primary hover:underline">
              coralcss.dev
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
