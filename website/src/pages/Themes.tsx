import { ThemePalette } from '../components/ThemeSwitcher'

export function Themes() {
  return (
    <div className="pt-28 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Theme <span className="text-primary">Palettes</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose from 12 beautiful color themes. Each palette is carefully crafted with
            light and dark mode variants.
          </p>
        </div>

        {/* Theme Switcher */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Select a Theme
          </h2>
          <ThemePalette />
        </div>

        {/* Preview Section */}
        <div className="space-y-12">
          <h2 className="text-2xl font-semibold text-foreground mb-6 text-center">
            Live Preview
          </h2>

          {/* Buttons Preview */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Buttons</h3>
            <div className="flex flex-wrap gap-4">
              <button className="btn btn-primary">Primary Button</button>
              <button className="btn btn-secondary">Secondary</button>
              <button className="btn btn-outline">Outline</button>
              <button className="btn btn-ghost">Ghost</button>
              <button className="btn btn-destructive">Destructive</button>
            </div>
          </div>

          {/* Cards Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Fast & Light</h3>
              <p className="text-muted-foreground">Zero dependencies and minimal bundle size for lightning-fast performance.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Themeable</h3>
              <p className="text-muted-foreground">12 color palettes with light and dark mode. Customize to match your brand.</p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border shadow-sm">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Accessible</h3>
              <p className="text-muted-foreground">WCAG compliant colors with proper contrast ratios for all users.</p>
            </div>
          </div>

          {/* Badges Preview */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Badges & Tags</h3>
            <div className="flex flex-wrap gap-3">
              <span className="badge badge-primary">Primary</span>
              <span className="badge badge-secondary">Secondary</span>
              <span className="badge badge-success">Success</span>
              <span className="badge badge-warning">Warning</span>
              <span className="badge badge-destructive">Error</span>
              <span className="badge badge-outline">Outline</span>
            </div>
          </div>

          {/* Form Elements Preview */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Form Elements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Input Field
                </label>
                <input
                  type="text"
                  placeholder="Enter your email..."
                  className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Select
                </label>
                <select className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
              </div>
            </div>
          </div>

          {/* Color Palette Preview */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Color Palette</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div>
                <div className="h-16 rounded-lg bg-primary mb-2" />
                <span className="text-sm text-muted-foreground">Primary</span>
              </div>
              <div>
                <div className="h-16 rounded-lg bg-secondary mb-2" />
                <span className="text-sm text-muted-foreground">Secondary</span>
              </div>
              <div>
                <div className="h-16 rounded-lg bg-muted mb-2" />
                <span className="text-sm text-muted-foreground">Muted</span>
              </div>
              <div>
                <div className="h-16 rounded-lg bg-accent mb-2" />
                <span className="text-sm text-muted-foreground">Accent</span>
              </div>
              <div>
                <div className="h-16 rounded-lg bg-destructive mb-2" />
                <span className="text-sm text-muted-foreground">Destructive</span>
              </div>
            </div>
          </div>

          {/* Progress Bars */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Progress</h3>
            <div className="space-y-4">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 rounded-full transition-all duration-500" />
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/2 rounded-full transition-all duration-500" />
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-1/4 rounded-full transition-all duration-500" />
              </div>
            </div>
          </div>

          {/* Alerts */}
          <div className="p-8 rounded-xl bg-card border border-border">
            <h3 className="text-lg font-medium text-foreground mb-6">Alerts</h3>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 text-primary">
                <strong>Info:</strong> This is an informational alert using the primary color.
              </div>
              <div className="p-4 rounded-lg text-success" style={{ backgroundColor: 'hsl(var(--success) / 0.1)', borderColor: 'hsl(var(--success) / 0.2)', borderWidth: '1px', borderStyle: 'solid' }}>
                <strong>Success:</strong> Your changes have been saved successfully!
              </div>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
                <strong>Error:</strong> Something went wrong. Please try again.
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Build Beautiful Interfaces
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Every theme is designed with accessibility in mind and works perfectly
            with all CoralCSS components.
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/docs"
              className="btn btn-primary"
            >
              Get Started
            </a>
            <a
              href="/components"
              className="btn btn-outline"
            >
              View Components
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Themes
