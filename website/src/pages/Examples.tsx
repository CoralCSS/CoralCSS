function Examples() {
  const examples = [
    {
      title: 'Basic Utilities',
      description: 'Learn the fundamentals of CoralCSS utility classes.',
      href: '/examples/01-basic',
    },
    {
      title: 'Dark Mode',
      description: 'Implement dark mode with class, media, or selector strategies.',
      href: '/examples/02-dark-mode',
    },
    {
      title: 'Responsive Design',
      description: 'Build responsive layouts with breakpoint variants.',
      href: '/examples/03-responsive',
    },
    {
      title: 'Flexbox Layout',
      description: 'Create flexible layouts with flex utilities.',
      href: '/examples/04-flexbox',
    },
    {
      title: 'Grid Layout',
      description: 'Build complex grids with grid utilities.',
      href: '/examples/05-grid',
    },
    {
      title: 'Typography',
      description: 'Style text with typography utilities.',
      href: '/examples/06-typography',
    },
    {
      title: 'Colors & Gradients',
      description: 'Work with colors, opacity, and gradients.',
      href: '/examples/07-colors',
    },
    {
      title: 'Borders & Shadows',
      description: 'Add borders, rounded corners, and shadows.',
      href: '/examples/08-borders',
    },
    {
      title: 'Transforms',
      description: 'Apply transforms like scale, rotate, and translate.',
      href: '/examples/09-transforms',
    },
    {
      title: 'Transitions',
      description: 'Animate properties with transition utilities.',
      href: '/examples/10-transitions',
    },
    {
      title: 'Filters',
      description: 'Apply blur, brightness, and other filters.',
      href: '/examples/11-filters',
    },
    {
      title: 'Container Queries',
      description: 'Respond to container size with @container.',
      href: '/examples/12-container-queries',
    },
    {
      title: 'Anchor Positioning',
      description: 'Position elements relative to anchors.',
      href: '/examples/13-anchor-positioning',
    },
    {
      title: 'Dialog Component',
      description: 'Build accessible modal dialogs.',
      href: '/examples/14-dialog',
    },
    {
      title: 'Dropdown Component',
      description: 'Create dropdown menus with keyboard navigation.',
      href: '/examples/15-dropdown',
    },
    {
      title: 'Tabs Component',
      description: 'Build tabbed interfaces with ARIA support.',
      href: '/examples/16-tabs',
    },
    {
      title: 'Accordion Component',
      description: 'Create collapsible accordion panels.',
      href: '/examples/17-accordion',
    },
    {
      title: 'Toast Notifications',
      description: 'Show toast messages with auto-dismiss.',
      href: '/examples/18-toast',
    },
    {
      title: 'Vite Integration',
      description: 'Set up CoralCSS with Vite.',
      href: '/examples/19-vite',
    },
    {
      title: 'PostCSS Integration',
      description: 'Use CoralCSS with PostCSS.',
      href: '/examples/20-postcss',
    },
  ]

  return (
    <div className="pt-28 pb-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-foreground mb-4">Examples</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Learn CoralCSS through practical examples covering utilities, components, and integrations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example, index) => (
            <a
              key={index}
              href={example.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors flex items-center gap-2">
                {example.title}
                <svg className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </h3>
              <p className="text-muted-foreground text-sm">{example.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Examples
