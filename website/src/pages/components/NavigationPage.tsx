import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function NavbarPreview() {
  return (
    <div className="w-full">
      <nav data-coral-navbar>
        <a data-coral-navbar-brand href="#">Logo</a>
        <div data-coral-navbar-links>
          <a data-coral-navbar-link href="#">Home</a>
          <a data-coral-navbar-link data-active href="#">Products</a>
          <a data-coral-navbar-link href="#">About</a>
        </div>
        <div data-coral-navbar-actions>
          <button data-coral-button data-variant="outline">Sign In</button>
          <button data-coral-button data-variant="primary">Get Started</button>
        </div>
      </nav>
    </div>
  )
}

function SidebarPreview() {
  const [activeItem, setActiveItem] = useState('dashboard')
  const items = [
    { id: 'dashboard', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { id: 'projects', label: 'Projects', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6z' },
    { id: 'team', label: 'Team', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35' },
  ]
  return (
    <aside data-coral-sidebar>
      <div data-coral-sidebar-header>
        <div className="w-8 h-8 bg-primary rounded-lg" />
        <span className="font-semibold text-foreground">Company</span>
      </div>
      <nav data-coral-sidebar-nav>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            data-coral-sidebar-link
            data-active={activeItem === item.id || undefined}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  )
}

function TabsPreview() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Overview', 'Analytics', 'Reports', 'Settings']
  return (
    <div data-coral-tabs className="w-full max-w-md">
      <div data-coral-tabs-list role="tablist">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            data-coral-tab
            data-active={activeTab === i || undefined}
            role="tab"
            aria-selected={activeTab === i}
          >
            {tab}
          </button>
        ))}
      </div>
      <div data-coral-tab-panel role="tabpanel">
        <p className="text-muted-foreground">Content for {tabs[activeTab]} tab.</p>
      </div>
    </div>
  )
}

function BreadcrumbPreview() {
  return (
    <nav data-coral-breadcrumb aria-label="Breadcrumb">
      <a data-coral-breadcrumb-item href="#">Home</a>
      <span data-coral-breadcrumb-separator>/</span>
      <a data-coral-breadcrumb-item href="#">Products</a>
      <span data-coral-breadcrumb-separator>/</span>
      <a data-coral-breadcrumb-item href="#">Electronics</a>
      <span data-coral-breadcrumb-separator>/</span>
      <span data-coral-breadcrumb-item data-active aria-current="page">Laptops</span>
    </nav>
  )
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(3)
  return (
    <nav data-coral-pagination aria-label="Pagination">
      <button
        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        data-coral-pagination-prev
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      {[1, 2, 3, 4, 5].map((page) => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          data-coral-pagination-page
          data-active={currentPage === page || undefined}
        >
          {page}
        </button>
      ))}
      <span data-coral-pagination-ellipsis>...</span>
      <button
        onClick={() => setCurrentPage(10)}
        data-coral-pagination-page
        data-active={currentPage === 10 || undefined}
      >
        10
      </button>
      <button
        onClick={() => setCurrentPage(Math.min(10, currentPage + 1))}
        disabled={currentPage === 10}
        data-coral-pagination-next
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}

function StepperPreview() {
  const steps = [
    { label: 'Account', completed: true },
    { label: 'Details', active: true },
    { label: 'Payment' },
    { label: 'Complete' },
  ]
  return (
    <div data-coral-stepper className="w-full max-w-lg">
      {steps.map((step, i) => (
        <div
          key={step.label}
          data-coral-step
          data-completed={step.completed || undefined}
          data-active={step.active || undefined}
        >
          <span data-coral-step-indicator>
            {step.completed ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : i + 1}
          </span>
          <span data-coral-step-label>{step.label}</span>
          {i < steps.length - 1 && <div data-coral-step-connector />}
        </div>
      ))}
    </div>
  )
}

function MenuPreview() {
  const [activeItem, setActiveItem] = useState('inbox')
  return (
    <nav data-coral-menu>
      {[
        { id: 'inbox', label: 'Inbox', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', badge: 12 },
        { id: 'drafts', label: 'Drafts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
        { id: 'sent', label: 'Sent', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
        { id: 'trash', label: 'Trash', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveItem(item.id)}
          data-coral-menu-item
          data-active={activeItem === item.id || undefined}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
          </svg>
          {item.label}
          {item.badge && <span data-coral-badge>{item.badge}</span>}
        </button>
      ))}
    </nav>
  )
}

function BottomNavPreview() {
  const [activeItem, setActiveItem] = useState('home')
  return (
    <div className="w-full max-w-sm">
      <nav data-coral-bottom-nav>
        {[
          { id: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
          { id: 'search', label: 'Search', icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' },
          { id: 'notifications', label: 'Alerts', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
          { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveItem(item.id)}
            data-coral-bottom-nav-item
            data-active={activeItem === item.id || undefined}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  )
}

function CommandMenuPreview() {
  const [query, setQuery] = useState('')
  return (
    <div data-coral-command-menu className="w-full max-w-md">
      <div data-coral-command-header>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          data-coral-command-input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command or search..."
        />
        <kbd data-coral-kbd>Esc</kbd>
      </div>
      <div data-coral-command-list>
        <div data-coral-command-group>
          <span data-coral-command-label>Actions</span>
          {[
            { label: 'New File', shortcut: 'Ctrl+N' },
            { label: 'New Folder', shortcut: 'Ctrl+Shift+N' },
            { label: 'Open File', shortcut: 'Ctrl+O' },
          ].map((item) => (
            <button key={item.label} data-coral-command-item>
              <span>{item.label}</span>
              <kbd data-coral-kbd>{item.shortcut}</kbd>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function DockPreview() {
  const [activeItem, setActiveItem] = useState('finder')
  const apps = [
    { id: 'finder', name: 'Finder', color: 'bg-blue-500' },
    { id: 'safari', name: 'Safari', color: 'bg-sky-500' },
    { id: 'messages', name: 'Messages', color: 'bg-green-500' },
    { id: 'music', name: 'Music', color: 'bg-red-500' },
    { id: 'photos', name: 'Photos', color: 'bg-gradient-to-br from-pink-500 to-orange-500' },
  ]
  return (
    <div className="w-full flex justify-center">
      <div data-coral-dock className="flex items-end gap-1 p-2 bg-card/80 backdrop-blur-xl rounded-2xl border border-border shadow-xl">
        {apps.map((app) => (
          <button
            key={app.id}
            onClick={() => setActiveItem(app.id)}
            className={`w-12 h-12 ${app.color} rounded-xl transition-all hover:scale-110 hover:-translate-y-1 ${activeItem === app.id ? 'scale-110 -translate-y-1' : ''}`}
            title={app.name}
          />
        ))}
        <div className="w-px h-10 bg-border mx-2" />
        <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>
    </div>
  )
}

function MegaMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="w-full">
      <nav className="flex items-center gap-6 p-4 bg-card rounded-xl border border-border">
        <span className="font-semibold text-foreground">Logo</span>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-1 text-sm text-foreground hover:text-primary transition-colors"
          >
            Products
            <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {isOpen && (
            <div className="absolute top-full left-0 mt-2 w-[500px] p-6 bg-card rounded-xl border border-border shadow-xl grid grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-foreground mb-3">Solutions</h4>
                <div className="space-y-2">
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Analytics</span>
                      <p className="text-xs text-muted-foreground">Track your metrics</p>
                    </div>
                  </a>
                  <a href="#" className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors">
                    <div className="w-10 h-10 bg-info/10 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-foreground">Security</span>
                      <p className="text-xs text-muted-foreground">Protect your data</p>
                    </div>
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-3">Resources</h4>
                <div className="space-y-2">
                  <a href="#" className="block p-2 text-sm text-foreground hover:text-primary transition-colors">Documentation</a>
                  <a href="#" className="block p-2 text-sm text-foreground hover:text-primary transition-colors">API Reference</a>
                  <a href="#" className="block p-2 text-sm text-foreground hover:text-primary transition-colors">Guides</a>
                </div>
              </div>
            </div>
          )}
        </div>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
        <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">About</a>
      </nav>
    </div>
  )
}

function TreePreview() {
  const [expanded, setExpanded] = useState<string[]>(['src'])
  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }
  return (
    <div className="w-full max-w-xs bg-card rounded-xl border border-border p-4">
      <div data-coral-tree>
        <div data-coral-tree-item>
          <button onClick={() => toggle('src')} className="flex items-center gap-2 w-full p-1 hover:bg-muted rounded">
            <svg className={`w-4 h-4 transition-transform ${expanded.includes('src') ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
            </svg>
            <span className="text-sm text-foreground">src</span>
          </button>
          {expanded.includes('src') && (
            <div className="ml-6 border-l border-border pl-2">
              <div className="flex items-center gap-2 p-1">
                <div className="w-4" />
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-foreground">index.ts</span>
              </div>
              <div className="flex items-center gap-2 p-1">
                <div className="w-4" />
                <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="text-sm text-foreground">utils.ts</span>
              </div>
              <button onClick={() => toggle('components')} className="flex items-center gap-2 w-full p-1 hover:bg-muted rounded">
                <svg className={`w-4 h-4 transition-transform ${expanded.includes('components') ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
                <svg className="w-4 h-4 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                </svg>
                <span className="text-sm text-foreground">components</span>
              </button>
              {expanded.includes('components') && (
                <div className="ml-6 border-l border-border pl-2">
                  <div className="flex items-center gap-2 p-1">
                    <div className="w-4" />
                    <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span className="text-sm text-foreground">Button.tsx</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function VerticalTabsPreview() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Profile', 'Account', 'Security', 'Notifications']
  return (
    <div className="flex gap-6 w-full max-w-lg">
      <div className="flex flex-col gap-1 w-40 border-r border-border pr-4">
        {tabs.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActiveTab(i)}
            className={`px-4 py-2 text-sm text-left rounded-lg transition-colors ${activeTab === i ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-foreground mb-2">{tabs[activeTab]}</h3>
        <p className="text-sm text-muted-foreground">Content for {tabs[activeTab]} settings goes here.</p>
      </div>
    </div>
  )
}

function AnchorLinksPreview() {
  const [activeSection, setActiveSection] = useState('intro')
  const sections = [
    { id: 'intro', label: 'Introduction' },
    { id: 'install', label: 'Installation' },
    { id: 'usage', label: 'Usage' },
    { id: 'api', label: 'API Reference' },
  ]
  return (
    <div className="flex gap-6 w-full">
      <nav className="w-48 sticky top-4">
        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">On this page</h4>
        <div className="space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`block w-full text-left px-3 py-1.5 text-sm rounded transition-colors ${activeSection === section.id ? 'text-primary bg-primary/10 border-l-2 border-primary' : 'text-muted-foreground hover:text-foreground'}`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>
      <div className="flex-1 bg-card rounded-xl border border-border p-6">
        <h2 className="text-xl font-bold text-foreground mb-2">{sections.find(s => s.id === activeSection)?.label}</h2>
        <p className="text-muted-foreground">Content for this section would appear here.</p>
      </div>
    </div>
  )
}

function LinkGroupPreview() {
  return (
    <div className="flex gap-8">
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Company</h4>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Careers</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Blog</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Press</a>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Products</h4>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Pricing</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Enterprise</a>
        </div>
      </div>
      <div>
        <h4 className="text-sm font-semibold text-foreground mb-3">Support</h4>
        <div className="space-y-2">
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Help Center</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
          <a href="#" className="block text-sm text-muted-foreground hover:text-primary transition-colors">Status</a>
        </div>
      </div>
    </div>
  )
}

function SkipLinkPreview() {
  return (
    <div className="w-full">
      <div className="relative">
        <a href="#main-content" className="absolute -top-10 left-0 px-4 py-2 bg-primary text-primary-foreground rounded focus:top-2 transition-all z-50">
          Skip to main content
        </a>
        <div className="bg-card rounded-xl border border-border p-4">
          <p className="text-sm text-muted-foreground mb-2">Press Tab to see the skip link appear</p>
          <div id="main-content" className="p-4 bg-muted rounded-lg">
            <p className="text-sm text-foreground">Main content area</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SegmentedControlPreview() {
  const [selected, setSelected] = useState('list')
  const options = [
    { id: 'grid', icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' },
    { id: 'list', icon: 'M4 6h16M4 10h16M4 14h16M4 18h16' },
    { id: 'columns', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  ]
  return (
    <div className="inline-flex p-1 bg-muted rounded-lg">
      {options.map((option) => (
        <button
          key={option.id}
          onClick={() => setSelected(option.id)}
          className={`p-2 rounded-md transition-colors ${selected === option.id ? 'bg-card shadow-sm' : 'hover:bg-card/50'}`}
        >
          <svg className={`w-5 h-5 ${selected === option.id ? 'text-foreground' : 'text-muted-foreground'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={option.icon} />
          </svg>
        </button>
      ))}
    </div>
  )
}

function FloatingNavPreview() {
  return (
    <div className="w-full flex justify-center">
      <nav className="inline-flex items-center gap-1 p-1.5 bg-card/95 backdrop-blur-xl rounded-full border border-border shadow-xl">
        <a href="#" className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-full">Home</a>
        <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">About</a>
        <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Work</a>
        <a href="#" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Contact</a>
      </nav>
    </div>
  )
}

function ProgressStepsPreview() {
  const [currentStep, setCurrentStep] = useState(2)
  const steps = ['Cart', 'Shipping', 'Payment', 'Review']
  return (
    <div className="w-full max-w-lg">
      <div className="flex items-center justify-between mb-4">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <button
              onClick={() => setCurrentStep(i)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${i < currentStep ? 'bg-success text-white' : i === currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
            >
              {i < currentStep ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : i + 1}
            </button>
            {i < steps.length - 1 && (
              <div className={`w-16 h-1 mx-2 rounded ${i < currentStep ? 'bg-success' : 'bg-muted'}`} />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <span className="text-sm text-muted-foreground">Step {currentStep + 1}: </span>
        <span className="text-sm font-medium text-foreground">{steps[currentStep]}</span>
      </div>
    </div>
  )
}

const navigationComponents = [
  {
    id: 'navbar',
    name: 'Navbar',
    description: 'A responsive navigation bar with logo, links, and actions.',
    usage: `<nav data-coral-navbar>
  <a data-coral-navbar-brand href="/">Logo</a>
  <div data-coral-navbar-links>
    <a data-coral-navbar-link href="/home">Home</a>
    <a data-coral-navbar-link href="/about">About</a>
    <a data-coral-navbar-link data-active href="/contact">Contact</a>
  </div>
  <div data-coral-navbar-actions>
    <button data-coral-button>Sign In</button>
  </div>
</nav>`,
    props: [
      { name: 'data-sticky', type: 'boolean', default: 'false', description: 'Stick to top on scroll' },
      { name: 'data-transparent', type: 'boolean', default: 'false', description: 'Transparent background' },
    ],
    preview: NavbarPreview,
  },
  {
    id: 'sidebar',
    name: 'Sidebar',
    description: 'A vertical navigation sidebar with collapsible sections.',
    usage: `<aside data-coral-sidebar>
  <div data-coral-sidebar-header>
    <img src="logo.svg" alt="Logo" />
  </div>
  <nav data-coral-sidebar-nav>
    <a data-coral-sidebar-link data-active>Dashboard</a>
    <a data-coral-sidebar-link>Projects</a>
  </nav>
</aside>`,
    props: [
      { name: 'data-collapsed', type: 'boolean', default: 'false', description: 'Collapse to icons only' },
      { name: 'data-width', type: 'string', default: '256px', description: 'Sidebar width' },
    ],
    preview: SidebarPreview,
  },
  {
    id: 'tabs',
    name: 'Tabs',
    description: 'Tabbed navigation for organizing content into sections.',
    usage: `<div data-coral-tabs>
  <div data-coral-tabs-list role="tablist">
    <button data-coral-tab data-active role="tab">Tab 1</button>
    <button data-coral-tab role="tab">Tab 2</button>
  </div>
  <div data-coral-tab-panel role="tabpanel">Content 1</div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "pills" | "underline"', default: '"default"', description: 'Tab style variant' },
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Tab layout' },
    ],
    preview: TabsPreview,
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'A breadcrumb navigation showing the current location.',
    usage: `<nav data-coral-breadcrumb>
  <a data-coral-breadcrumb-item href="/">Home</a>
  <span data-coral-breadcrumb-separator>/</span>
  <span data-coral-breadcrumb-item data-active>Current</span>
</nav>`,
    props: [
      { name: 'data-separator', type: 'string', default: '"/"', description: 'Separator character' },
    ],
    preview: BreadcrumbPreview,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Navigation for paginated content with page numbers.',
    usage: `<nav data-coral-pagination>
  <button data-coral-pagination-prev>Prev</button>
  <button data-coral-pagination-page data-active>1</button>
  <button data-coral-pagination-page>2</button>
  <button data-coral-pagination-next>Next</button>
</nav>`,
    props: [
      { name: 'data-variant', type: '"default" | "simple" | "compact"', default: '"default"', description: 'Pagination style' },
    ],
    preview: PaginationPreview,
  },
  {
    id: 'stepper',
    name: 'Stepper',
    description: 'A multi-step progress indicator for wizards and forms.',
    usage: `<div data-coral-stepper>
  <div data-coral-step data-completed>
    <span data-coral-step-indicator>1</span>
    <span data-coral-step-label>Account</span>
  </div>
  <div data-coral-step data-active>
    <span data-coral-step-indicator>2</span>
    <span data-coral-step-label>Details</span>
  </div>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Stepper layout' },
    ],
    preview: StepperPreview,
  },
  {
    id: 'menu',
    name: 'Menu',
    description: 'A vertical menu with nested items and icons.',
    usage: `<nav data-coral-menu>
  <a data-coral-menu-item data-active>Dashboard</a>
  <a data-coral-menu-item>Projects</a>
</nav>`,
    props: [
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Reduce spacing' },
    ],
    preview: MenuPreview,
  },
  {
    id: 'bottom-nav',
    name: 'BottomNav',
    description: 'Mobile-friendly bottom navigation bar.',
    usage: `<nav data-coral-bottom-nav>
  <a data-coral-bottom-nav-item data-active>
    <svg><!-- icon --></svg>
    <span>Home</span>
  </a>
</nav>`,
    props: [
      { name: 'data-labels', type: 'boolean', default: 'true', description: 'Show text labels' },
    ],
    preview: BottomNavPreview,
  },
  {
    id: 'command-menu',
    name: 'CommandMenu',
    description: 'A keyboard-first command palette for quick navigation.',
    usage: `<div data-coral-command-menu>
  <input data-coral-command-input placeholder="Search..." />
  <div data-coral-command-list>
    <button data-coral-command-item>New File</button>
  </div>
</div>`,
    props: [
      { name: 'data-hotkey', type: 'string', default: '"cmd+k"', description: 'Keyboard shortcut' },
    ],
    preview: CommandMenuPreview,
  },
  {
    id: 'dock',
    name: 'Dock',
    description: 'A macOS-style dock with hover effects and app indicators.',
    usage: `<div data-coral-dock>
  <button data-coral-dock-item data-active>
    <img src="app-icon.png" alt="App" />
  </button>
  <div data-coral-dock-separator></div>
  <button data-coral-dock-item>
    <svg><!-- icon --></svg>
  </button>
</div>`,
    props: [
      { name: 'data-position', type: '"bottom" | "left" | "right"', default: '"bottom"', description: 'Dock position' },
      { name: 'data-magnify', type: 'boolean', default: 'true', description: 'Enable magnification on hover' },
    ],
    preview: DockPreview,
  },
  {
    id: 'mega-menu',
    name: 'MegaMenu',
    description: 'A full-featured navigation menu with multi-column dropdowns.',
    usage: `<nav data-coral-mega-menu>
  <div data-coral-mega-menu-trigger>Products</div>
  <div data-coral-mega-menu-content>
    <div data-coral-mega-menu-section>
      <h4>Solutions</h4>
      <a href="#">Analytics</a>
    </div>
  </div>
</nav>`,
    props: [
      { name: 'data-trigger', type: '"click" | "hover"', default: '"hover"', description: 'Trigger method' },
      { name: 'data-full-width', type: 'boolean', default: 'false', description: 'Full viewport width' },
    ],
    preview: MegaMenuPreview,
  },
  {
    id: 'tree',
    name: 'Tree',
    description: 'A hierarchical tree view for file systems and nested data.',
    usage: `<div data-coral-tree>
  <div data-coral-tree-item data-expanded>
    <button data-coral-tree-toggle></button>
    <span>Folder</span>
    <div data-coral-tree-children>
      <div data-coral-tree-item>
        <span>File.txt</span>
      </div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-selectable', type: 'boolean', default: 'true', description: 'Enable selection' },
      { name: 'data-multi-select', type: 'boolean', default: 'false', description: 'Allow multiple selections' },
    ],
    preview: TreePreview,
  },
  {
    id: 'vertical-tabs',
    name: 'VerticalTabs',
    description: 'Vertically stacked tabs for settings and preference panels.',
    usage: `<div data-coral-vertical-tabs>
  <div data-coral-vertical-tabs-list>
    <button data-coral-vertical-tab data-active>Profile</button>
    <button data-coral-vertical-tab>Settings</button>
  </div>
  <div data-coral-vertical-tabs-content>
    Content here
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "pills"', default: '"default"', description: 'Tab style' },
    ],
    preview: VerticalTabsPreview,
  },
  {
    id: 'anchor-links',
    name: 'AnchorLinks',
    description: 'A table of contents navigation that tracks scroll position.',
    usage: `<nav data-coral-anchor-links>
  <a data-coral-anchor-link href="#intro" data-active>Introduction</a>
  <a data-coral-anchor-link href="#usage">Usage</a>
  <a data-coral-anchor-link href="#api">API</a>
</nav>`,
    props: [
      { name: 'data-offset', type: 'number', default: '80', description: 'Scroll offset in pixels' },
      { name: 'data-smooth', type: 'boolean', default: 'true', description: 'Smooth scroll behavior' },
    ],
    preview: AnchorLinksPreview,
  },
  {
    id: 'link-group',
    name: 'LinkGroup',
    description: 'Grouped navigation links for footers and sidebars.',
    usage: `<div data-coral-link-group>
  <h4 data-coral-link-group-title>Company</h4>
  <a data-coral-link-group-item href="#">About</a>
  <a data-coral-link-group-item href="#">Careers</a>
</div>`,
    props: [
      { name: 'data-direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Layout direction' },
    ],
    preview: LinkGroupPreview,
  },
  {
    id: 'skip-link',
    name: 'SkipLink',
    description: 'Accessibility skip link for keyboard users to bypass navigation.',
    usage: `<a data-coral-skip-link href="#main-content">
  Skip to main content
</a>
<main id="main-content">...</main>`,
    props: [
      { name: 'data-visible-on-focus', type: 'boolean', default: 'true', description: 'Show only on focus' },
    ],
    preview: SkipLinkPreview,
  },
  {
    id: 'segmented-control',
    name: 'SegmentedControl',
    description: 'A segmented button group for view switching and filtering.',
    usage: `<div data-coral-segmented-control>
  <button data-coral-segment data-active>Grid</button>
  <button data-coral-segment>List</button>
  <button data-coral-segment>Table</button>
</div>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Control size' },
    ],
    preview: SegmentedControlPreview,
  },
  {
    id: 'floating-nav',
    name: 'FloatingNav',
    description: 'A floating pill-style navigation bar.',
    usage: `<nav data-coral-floating-nav>
  <a data-coral-floating-nav-item data-active href="#">Home</a>
  <a data-coral-floating-nav-item href="#">About</a>
  <a data-coral-floating-nav-item href="#">Contact</a>
</nav>`,
    props: [
      { name: 'data-position', type: '"top" | "bottom"', default: '"bottom"', description: 'Fixed position' },
    ],
    preview: FloatingNavPreview,
  },
  {
    id: 'progress-steps',
    name: 'ProgressSteps',
    description: 'A checkout-style progress indicator with clickable steps.',
    usage: `<div data-coral-progress-steps>
  <div data-coral-progress-step data-completed>Cart</div>
  <div data-coral-progress-step data-active>Shipping</div>
  <div data-coral-progress-step>Payment</div>
</div>`,
    props: [
      { name: 'data-clickable', type: 'boolean', default: 'true', description: 'Allow clicking past steps' },
    ],
    preview: ProgressStepsPreview,
  },
]

function NavigationPage() {
  return (
    <ComponentPageLayout
      categoryName="Navigation"
      categoryId="navigation"
      components={navigationComponents}
      accessibilityFeatures={[
        'Focus management',
        'Keyboard navigation',
        'ARIA roles',
        'Skip links support',
      ]}
    />
  )
}

export default NavigationPage
