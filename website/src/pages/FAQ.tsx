import { useState } from 'react'

interface FAQItem {
  question: string
  answer: string
  category: 'general' | 'technical' | 'migration' | 'performance'
}

const faqs: FAQItem[] = [
  {
    category: 'general',
    question: 'What is CoralCSS?',
    answer: 'CoralCSS is a modern, zero-runtime CSS framework that combines utility-first classes with headless components. It\'s designed for maximum performance and developer experience.'
  },
  {
    category: 'general',
    question: 'How is CoralCSS different from Tailwind CSS?',
    answer: 'CoralCSS extends Tailwind\'s utility-first philosophy with 60+ exclusive utility plugins, 78 headless components, Rust-powered compilation via coral-turbo, advanced modern CSS features (View Transitions, Anchor Positioning, Container Queries), and comprehensive TypeScript support with IntelliSense.'
  },
  {
    category: 'general',
    question: 'Is CoralCSS production-ready?',
    answer: 'Yes! CoralCSS v1.1.0 has comprehensive test coverage with 10,936+ passing tests, extensive documentation, and is actively maintained. It powers production applications with excellent performance characteristics.'
  },
  {
    category: 'technical',
    question: 'Does CoralCSS support dark mode?',
    answer: 'Yes! CoralCSS has built-in dark mode support with the `dark:` variant. You can use `dark:bg-background dark:text-foreground` and other dark mode utilities out of the box.'
  },
  {
    category: 'technical',
    question: 'Can I use CoralCSS with my existing CSS?',
    answer: 'Absolutely! CoralCSS is designed to work alongside your existing CSS. You can gradually migrate or use it for new components while keeping your current styles.'
  },
  {
    category: 'technical',
    question: 'What build tools does CoralCSS support?',
    answer: 'CoralCSS supports all major build tools including Vite, Webpack, esbuild, Rollup, Parcel, and framework-specific tools like Next.js, Nuxt, SvelteKit, Astro, Qwik, and Remix.'
  },
  {
    category: 'technical',
    question: 'Does CoralCSS have TypeScript support?',
    answer: 'Yes! CoralCSS has comprehensive TypeScript support with full type definitions, IntelliSense for completions, hover information, diagnostics, and color previews in VS Code and other editors.'
  },
  {
    category: 'migration',
    question: 'How do I migrate from Tailwind CSS?',
    answer: 'CoralCSS includes migration tools that can analyze your Tailwind config and classes, providing automated conversion. Most Tailwind classes work as-is in CoralCSS. See the Migration Guide for details.'
  },
  {
    category: 'migration',
    question: 'Are all Tailwind classes compatible?',
    answer: 'Most Tailwind classes are compatible. CoralCSS implements all core Tailwind utilities plus 60+ exclusive plugins. Some custom Tailwind plugins may need adaptation. Use our migration analyzer for detailed compatibility reports.'
  },
  {
    category: 'performance',
    question: 'How fast is CoralCSS?',
    answer: 'CoralCSS uses the Rust-powered coral-turbo engine for compilation, offering 5-10x faster CSS generation than traditional tools. It includes automatic purging, minification, and tree-shaking for optimal bundle sizes.'
  },
  {
    category: 'performance',
    question: 'What is the bundle size?',
    answer: 'The CoralCSS runtime is zero-dependency and tiny (~15KB gzipped for the core kernel). Generated CSS is optimized and purged automatically. Your final CSS size depends only on the utilities you actually use.'
  },
  {
    category: 'performance',
    question: 'Does CoralCSS affect page load times?',
    answer: 'No! CoralCSS has zero runtime - all CSS is generated at build time. The framework itself adds no JavaScript to your bundle, resulting in faster page loads and better Core Web Vitals.'
  },
  {
    category: 'technical',
    question: 'What are headless components?',
    answer: 'Headless components in CoralCSS provide the logic and accessibility features without enforcing styles. You get full control over appearance while benefiting from built-in ARIA attributes, keyboard navigation, and focus management.'
  },
  {
    category: 'technical',
    question: 'Can I customize the theme?',
    answer: 'Yes! CoralCSS uses a flexible theme system. You can customize colors, spacing, typography, breakpoints, and more through the config. The website includes a live theme customizer to preview changes in real-time.'
  },
  {
    category: 'technical',
    question: 'How do I add custom utilities?',
    answer: 'You can create custom plugins using the CoralCSS plugin API. Plugins can add utilities, variants, components, or modify the theme. See the documentation for plugin development examples.'
  },
  {
    category: 'general',
    question: 'Does CoralCSS work with React/Vue/Svelte?',
    answer: 'Yes! CoralCSS is framework-agnostic and works with React, Vue, Svelte, Angular, and any other framework. We provide framework-specific integrations for React hooks, Vue directives, and Svelte stores.'
  },
  {
    category: 'technical',
    question: 'What modern CSS features does CoralCSS support?',
    answer: 'CoralCSS supports View Transitions API, Anchor Positioning, Container Queries (@container), :has() selector, Cascade Layers (@layer), CSS Nesting, and other cutting-edge CSS features with utility classes.'
  },
  {
    category: 'performance',
    question: 'How does purging work?',
    answer: 'CoralCSS automatically removes unused CSS during production builds by scanning your source files for class names. This results in minimal CSS bundles with only the utilities you actually use.'
  },
  {
    category: 'general',
    question: 'Is there a VS Code extension?',
    answer: 'Yes! CoralCSS IntelliSense provides autocomplete, hover previews, diagnostics with suggestions, color decorators, and signature help for all utilities and variants in VS Code.'
  },
  {
    category: 'general',
    question: 'Where can I get help?',
    answer: 'Check the documentation, browse examples, try the interactive playground, or review the comprehensive test suite (10,936 tests). For issues, visit the GitHub repository.'
  }
]

const categories = {
  general: { title: 'General', icon: '📚' },
  technical: { title: 'Technical', icon: '⚙️' },
  migration: { title: 'Migration', icon: '🔄' },
  performance: { title: 'Performance', icon: '⚡' }
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory
    const matchesSearch = !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const toggleItem = (index: number) => {
    const newExpanded = new Set(expandedItems)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedItems(newExpanded)
  }

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-muted-foreground">
          Everything you need to know about CoralCSS
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-6 py-4 rounded-xl border-2 border-border bg-card text-foreground focus:border-coral focus:outline-none transition-colors"
        />
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3 mb-12">
        <button
          onClick={() => setActiveCategory('all')}
          className={`px-6 py-3 rounded-lg font-medium transition-all ${
            activeCategory === 'all'
              ? 'bg-coral text-white shadow-lg scale-105'
              : 'bg-card text-foreground hover:bg-muted border border-border'
          }`}
        >
          All Questions
        </button>
        {Object.entries(categories).map(([key, { title, icon }]) => (
          <button
            key={key}
            onClick={() => setActiveCategory(key)}
            className={`px-6 py-3 rounded-lg font-medium transition-all ${
              activeCategory === key
                ? 'bg-coral text-white shadow-lg scale-105'
                : 'bg-card text-foreground hover:bg-muted border border-border'
            }`}
          >
            {icon} {title}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFAQs.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No questions found matching your search.
          </div>
        ) : (
          filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <button
                onClick={() => toggleItem(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-2xl">{categories[faq.category].icon}</span>
                  <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
                </div>
                <svg
                  className={`w-6 h-6 text-muted-foreground transition-transform ${
                    expandedItems.has(index) ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {expandedItems.has(index) && (
                <div className="px-6 pb-6 pt-2">
                  <div className="pl-12 text-muted-foreground leading-relaxed">{faq.answer}</div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Call to Action */}
      <div className="mt-16 p-8 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl text-center border border-coral/20">
        <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
        <p className="text-muted-foreground mb-6">
          Check out our comprehensive documentation or explore the interactive playground
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/docs"
            className="px-8 py-3 bg-coral text-white rounded-lg font-medium hover:bg-coral-dark transition-colors"
          >
            View Documentation
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
