import { useState } from 'react'
import { Link } from 'react-router-dom'

interface ComponentData {
  id: string
  name: string
  description: string
  usage?: string
  outputCode?: string
  props?: Array<{
    name: string
    type: string
    default: string
    description: string
  }>
  preview: React.ComponentType
}

interface ComponentPageLayoutProps {
  categoryName: string
  categoryId?: string
  components: ComponentData[]
  accessibilityFeatures?: string[]
}

export function ComponentPageLayout({
  categoryName,
  components,
  accessibilityFeatures = [
    'Keyboard Navigation',
    'Focus Management',
    'Screen Reader Support',
  ]
}: ComponentPageLayoutProps) {
  const [activeComponent, setActiveComponent] = useState(components[0].id)
  const [codeView, setCodeView] = useState<'preview' | 'usage' | 'output'>('preview')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const currentComponent = components.find(c => c.id === activeComponent)!
  const currentIndex = components.findIndex(c => c.id === activeComponent)
  const prevComponent = currentIndex > 0 ? components[currentIndex - 1] : null
  const nextComponent = currentIndex < components.length - 1 ? components[currentIndex + 1] : null

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border bg-linear-to-r from-muted/50 to-muted/30">
        <div className="container py-6 lg:py-8">
          {/* Breadcrumb */}
          <nav data-coral-breadcrumb className="mb-4">
            <Link to="/components" data-coral-breadcrumb-item className="hover:text-primary">
              Components
            </Link>
            <span data-coral-breadcrumb-separator>/</span>
            <span data-coral-breadcrumb-item data-active>{categoryName}</span>
          </nav>

          {/* Title with mobile menu button */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-1">
                {categoryName}
              </h1>
              <p className="text-muted-foreground text-sm md:text-base">
                {components.length} components available
              </p>
            </div>
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg bg-muted hover:bg-accent transition-colors"
              aria-label="Toggle component menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-background border-r border-border overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-background">
              <span className="font-semibold text-foreground">Components</span>
              <button onClick={() => setSidebarOpen(false)} className="p-1 rounded hover:bg-muted">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-2 space-y-1">
              {components.map((comp) => (
                <button
                  key={comp.id}
                  onClick={() => { setActiveComponent(comp.id); setSidebarOpen(false) }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeComponent === comp.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {comp.name}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-border">
              <Link to="/components" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                All Components
              </Link>
            </div>
          </aside>
        </div>
      )}

      {/* Layout with Sidebar */}
      <div className="container py-6 lg:py-8">
        <div className="flex gap-8">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-56 xl:w-64 shrink-0">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-2">
              <nav className="space-y-1">
                {components.map((comp) => (
                  <button
                    key={comp.id}
                    onClick={() => setActiveComponent(comp.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeComponent === comp.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    {comp.name}
                  </button>
                ))}
              </nav>
              <div className="pt-4 mt-4 border-t border-border">
                <Link to="/components" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  All Components
                </Link>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
          {/* Component Header with Navigation */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {currentComponent.name}
                </h2>
                <p className="text-lg text-muted-foreground">
                  {currentComponent.description}
                </p>
              </div>
              {/* Prev/Next Navigation */}
              <div className="flex items-center gap-1 shrink-0">
                <button
                  onClick={() => prevComponent && setActiveComponent(prevComponent.id)}
                  disabled={!prevComponent}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title={prevComponent ? `Previous: ${prevComponent.name}` : 'No previous component'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <span className="text-xs text-muted-foreground px-2 tabular-nums">
                  {currentIndex + 1}/{components.length}
                </span>
                <button
                  onClick={() => nextComponent && setActiveComponent(nextComponent.id)}
                  disabled={!nextComponent}
                  className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title={nextComponent ? `Next: ${nextComponent.name}` : 'No next component'}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Preview</h3>
              {/* View Toggle */}
              <div className="flex items-center gap-1 p-1 bg-muted rounded-lg">
                <button
                  onClick={() => setCodeView('preview')}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    codeView === 'preview'
                      ? 'bg-background text-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Preview
                </button>
                {currentComponent.usage && (
                  <button
                    onClick={() => setCodeView('usage')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      codeView === 'usage'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Usage
                  </button>
                )}
                {currentComponent.outputCode && (
                  <button
                    onClick={() => setCodeView('output')}
                    className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                      codeView === 'output'
                        ? 'bg-background text-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Output
                  </button>
                )}
              </div>
            </div>

            <div className="rounded-xl border border-border overflow-hidden">
              {codeView === 'usage' && currentComponent.usage ? (
                <div className="relative">
                  <div className="absolute top-2 right-2 px-2 py-1 bg-primary/10 text-primary text-xs rounded font-medium">
                    Semantic HTML
                  </div>
                  <div className="p-6 bg-muted/50">
                    <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto text-muted-foreground">
                      {currentComponent.usage}
                    </pre>
                  </div>
                </div>
              ) : codeView === 'output' && currentComponent.outputCode ? (
                <div className="relative">
                  <div className="absolute top-2 right-2 px-2 py-1 bg-success/10 text-success text-xs rounded font-medium">
                    Rendered Output
                  </div>
                  <div className="p-6 bg-muted/50">
                    <pre className="text-sm font-mono whitespace-pre-wrap overflow-x-auto text-muted-foreground">
                      {currentComponent.outputCode}
                    </pre>
                  </div>
                </div>
              ) : (
                <div
                  className="relative p-8 md:p-12 min-h-[300px] flex items-center justify-center bg-linear-to-br from-muted/30 via-background to-muted/20"
                >
                  {/* Subtle grid pattern */}
                  <div
                    className="absolute inset-0 opacity-50 pointer-events-none"
                    style={{
                      backgroundImage: `
                        linear-gradient(to right, hsl(var(--border) / 0.3) 1px, transparent 1px),
                        linear-gradient(to bottom, hsl(var(--border) / 0.3) 1px, transparent 1px)
                      `,
                      backgroundSize: '32px 32px'
                    }}
                  />
                  {/* Glow effect */}
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `
                        radial-gradient(ellipse at 30% 0%, hsl(var(--primary) / 0.1) 0%, transparent 50%),
                        radial-gradient(ellipse at 70% 100%, hsl(var(--accent) / 0.08) 0%, transparent 50%)
                      `
                    }}
                  />
                  <div className="relative z-10">
                    <currentComponent.preview />
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Props Section */}
          {currentComponent.props && currentComponent.props.length > 0 && (
            <section className="mb-10">
              <h3 className="text-lg font-semibold text-foreground mb-4">Props</h3>
              <div className="rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-4 font-medium text-foreground">Prop</th>
                        <th className="text-left p-4 font-medium text-foreground">Type</th>
                        <th className="text-left p-4 font-medium text-foreground">Default</th>
                        <th className="text-left p-4 font-medium text-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {currentComponent.props.map((prop) => (
                        <tr key={prop.name} className="hover:bg-muted/30 transition-colors">
                          <td className="p-4">
                            <code className="px-2 py-1 bg-muted rounded text-xs font-medium text-primary">
                              {prop.name}
                            </code>
                          </td>
                          <td className="p-4">
                            <code className="text-muted-foreground text-xs">{prop.type}</code>
                          </td>
                          <td className="p-4">
                            <code className="text-muted-foreground text-xs">{prop.default}</code>
                          </td>
                          <td className="p-4 text-muted-foreground">{prop.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          )}

          {/* Accessibility Section */}
          <section className="mb-10">
            <h3 className="text-lg font-semibold text-foreground mb-4">Accessibility</h3>
            <div data-coral-card className="p-6">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessibilityFeatures.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-success/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-foreground">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Mobile: Quick nav to components */}
          <div className="lg:hidden pt-8 border-t border-border">
            <Link
              to="/components"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Browse All Components
            </Link>
          </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default ComponentPageLayout
