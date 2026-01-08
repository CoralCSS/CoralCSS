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
    <div className="py-12">
      <div className="container">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">Examples</h1>
        <p className="text-lg text-slate-600 mb-8">
          Learn CoralCSS through practical examples covering utilities, components, and integrations.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {examples.map((example, index) => (
            <a
              key={index}
              href={example.href}
              className="feature-card block"
            >
              <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center font-medium text-sm mb-4">
                {String(index + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">{example.title}</h3>
              <p className="text-slate-600 text-sm">{example.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Examples
