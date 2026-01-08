import { useState, useRef, useEffect } from 'react'

// Component categories
const componentCategories = [
  {
    name: 'Overlays',
    components: ['Dialog', 'Drawer', 'Popover', 'Tooltip', 'Toast', 'ImageGallery'],
  },
  {
    name: 'Navigation',
    components: ['Menu', 'Tabs', 'Breadcrumb', 'Pagination', 'Stepper', 'Tree'],
  },
  {
    name: 'Forms',
    components: ['Select', 'Switch', 'Slider', 'NumberInput', 'PinInput', 'RangeSlider', 'ColorPicker', 'DatePicker', 'FileUpload'],
  },
  {
    name: 'Data Display',
    components: ['Accordion', 'Avatar', 'Progress', 'Skeleton', 'Rating', 'Timeline', 'Stat', 'DataTable', 'Code', 'Chip'],
  },
  {
    name: 'Feedback',
    components: ['Alert', 'Toast', 'Spinner', 'EmptyState'],
  },
  {
    name: 'Advanced',
    components: ['Command', 'Carousel', 'ContextMenu', 'Dropdown', 'Marquee', 'Kbd'],
  },
]

function Components() {
  const [activeCategory, setActiveCategory] = useState('all')

  return (
    <div className="min-h-screen">
      {/* Hero - Professional gradient background */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-primary/5" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-accent rounded-full blur-3xl" />
        </div>

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-primary/20 text-primary text-sm font-medium mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              60+ Headless Components
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight">
              Build Beautiful UIs
              <br />
              <span className="gradient-text">Your Way</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-2xl mx-auto">
              Fully accessible, unstyled components that give you complete control.
              Zero dependencies, works with any framework.
            </p>

            {/* Feature badges */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(var(--success))' }}></span>
                <span className="text-sm font-medium text-foreground">ARIA Compliant</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(var(--info))' }}></span>
                <span className="text-sm font-medium text-foreground">Keyboard Navigation</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span className="text-sm font-medium text-foreground">Focus Management</span>
              </div>
              <div className="group flex items-center gap-2 px-4 py-2 bg-card rounded-xl border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'hsl(var(--warning))' }}></span>
                <span className="text-sm font-medium text-foreground">Zero Dependencies</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter - Sticky */}
      <section className="sticky top-20 z-30 bg-background/80 backdrop-blur-lg border-b border-border py-3 mb-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === 'all'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
              }`}
            >
              All Components
            </button>
            {componentCategories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat.name
                    ? 'bg-primary text-primary-foreground shadow-md'
                    : 'bg-muted text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Components Grid */}
      <section className="container pb-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <DialogDemo />
          <DrawerDemo />
          <PopoverDemo />
          <TooltipDemo />
          <ToastDemo />
          <MenuDemo />
          <TabsDemo />
          <BreadcrumbDemo />
          <PaginationDemo />
          <SelectDemo />
          <SwitchDemo />
          <SliderDemo />
          <AccordionDemo />
          <AvatarDemo />
          <ProgressDemo />
          <SkeletonDemo />
          <AlertDemo />
          <CommandDemo />
          <CarouselDemo />
          <ContextMenuDemo />
          <DropdownDemo />
          {/* Batch 3 Components */}
          <RatingDemo />
          <StepperDemo />
          <ChipDemo />
          <TimelineDemo />
          <StatDemo />
          <KbdDemo />
          <CodeDemo />
          <EmptyStateDemo />
          <SpinnerDemo />
          <TreeDemo />
          <NumberInputDemo />
          <PinInputDemo />
          <FileUploadDemo />
          <ColorPickerDemo />
          <DatePickerDemo />
          <MarqueeDemo />
          <ImageGalleryDemo />
          <RangeSliderDemo />
          <DataTableDemo />
        </div>
      </section>

      {/* Usage Section */}
      <section className="py-20 section-dark mt-16">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Get Started in <span className="gradient-text">Minutes</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                Simple API, powerful results. Use with any framework.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Step 1 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative bg-card/90 backdrop-blur rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">1</div>
                    <h3 className="text-lg font-semibold text-foreground">Import Components</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground overflow-x-auto border border-border/50">
{`import { Dialog, createDialog }
  from '@coralcss/core/components'

// Or initialize from HTML
import { initComponents }
  from '@coralcss/core/components'
initComponents()`}
                  </pre>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition duration-500" />
                <div className="relative bg-card/90 backdrop-blur rounded-2xl p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-sm">2</div>
                    <h3 className="text-lg font-semibold text-foreground">Add Data Attributes</h3>
                  </div>
                  <pre className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground overflow-x-auto border border-border/50">
{`<div data-coral-dialog>
  <div data-coral-dialog-backdrop />
  <div data-coral-dialog-content>
    <h2>Dialog Title</h2>
    <button data-coral-dialog-close>
      Close
    </button>
  </div>
</div>`}
                  </pre>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center mt-10">
              <a href="/docs" className="btn btn-primary px-8 py-3 text-lg animate-pulse-glow">
                Read Full Documentation
                <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// Component Demos
function ComponentCard({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  return (
    <div className="group relative bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg hover:border-primary/30 transition-all duration-300">
      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

      {/* Header */}
      <div className="p-4 border-b border-border">
        <h3 className="text-base font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>

      {/* Preview area - clean */}
      <div className="p-6 bg-muted/30 min-h-[160px] flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}

function DialogDemo() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentCard title="Dialog" description="Modal dialog with focus trap and backdrop">
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Open Dialog
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-xl p-6 max-w-md w-full mx-4 shadow-xl animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Dialog Title</h2>
            <p className="text-muted-foreground mb-6">This is a fully accessible dialog with keyboard navigation and focus trap.</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setOpen(false)} className="btn btn-secondary">Cancel</button>
              <button onClick={() => setOpen(false)} className="btn btn-primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </ComponentCard>
  )
}

function DrawerDemo() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentCard title="Drawer / Sheet" description="Side panel with multiple placements">
      <button onClick={() => setOpen(true)} className="btn btn-primary">
        Open Drawer
      </button>
      {open && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-80 bg-card shadow-xl animate-slide-in-right">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Drawer</h2>
                <button onClick={() => setOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <p className="text-muted-foreground">Drawer content with smooth animations and multiple placement options.</p>
            </div>
          </div>
        </div>
      )}
    </ComponentCard>
  )
}

function PopoverDemo() {
  const [open, setOpen] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  return (
    <ComponentCard title="Popover" description="Floating content with anchor positioning">
      <div className="relative">
        <button ref={buttonRef} onClick={() => setOpen(!open)} className="btn btn-primary">
          Toggle Popover
        </button>
        {open && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-card rounded-lg shadow-xl border p-4 w-64 animate-fade-in z-10">
            <h4 className="font-semibold mb-2">Popover Content</h4>
            <p className="text-sm text-muted-foreground">Uses CSS anchor positioning for smart placement.</p>
          </div>
        )}
      </div>
    </ComponentCard>
  )
}

function TooltipDemo() {
  const [show, setShow] = useState(false)
  return (
    <ComponentCard title="Tooltip" description="Informational tooltip on hover/focus">
      <div className="relative">
        <button
          onMouseEnter={() => setShow(true)}
          onMouseLeave={() => setShow(false)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
          className="btn btn-secondary"
        >
          Hover me
        </button>
        {show && (
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-secondary text-foreground text-sm rounded-lg whitespace-nowrap animate-fade-in">
            Helpful tooltip text
            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-secondary" />
          </div>
        )}
      </div>
    </ComponentCard>
  )
}

function ToastDemo() {
  const [toasts, setToasts] = useState<{ id: number; message: string; type: string }[]>([])
  const addToast = (type: string) => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message: `${type} toast message`, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000)
  }
  return (
    <ComponentCard title="Toast" description="Non-blocking notifications">
      <div className="flex gap-2">
        <button onClick={() => addToast('Success')} className="btn btn-primary text-sm">Success</button>
        <button onClick={() => addToast('Error')} className="btn btn-secondary text-sm">Error</button>
      </div>
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-50">
        {toasts.map(toast => (
          <div
            key={toast.id}
            className="px-4 py-3 rounded-lg shadow-lg animate-slide-in-right text-white"
            style={{ backgroundColor: toast.type === 'Success' ? 'hsl(var(--success))' : 'hsl(var(--destructive))' }}
          >
            {toast.message}
          </div>
        ))}
      </div>
    </ComponentCard>
  )
}

function MenuDemo() {
  return (
    <ComponentCard title="Menu" description="Navigation menu with keyboard support">
      <nav className="bg-card rounded-lg shadow border p-2 w-48">
        <button className="w-full text-left px-3 py-2 rounded hover:bg-muted text-foreground">Dashboard</button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-muted text-foreground">Projects</button>
        <button className="w-full text-left px-3 py-2 rounded hover:bg-muted text-foreground">Settings</button>
        <div className="border-t my-2" />
        <button className="w-full text-left px-3 py-2 rounded hover:bg-destructive/10 text-destructive">Logout</button>
      </nav>
    </ComponentCard>
  )
}

function TabsDemo() {
  const [activeTab, setActiveTab] = useState(0)
  const tabs = ['Overview', 'Features', 'Reviews']
  return (
    <ComponentCard title="Tabs" description="Tabbed interface with ARIA support">
      <div className="w-full">
        <div className="flex border-b">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              onClick={() => setActiveTab(i)}
              className={`px-4 py-2 border-b-2 font-medium transition-colors ${
                activeTab === i
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="p-4 text-muted-foreground">
          Content for {tabs[activeTab]} tab
        </div>
      </div>
    </ComponentCard>
  )
}

function BreadcrumbDemo() {
  return (
    <ComponentCard title="Breadcrumb" description="Navigation breadcrumbs with collapse">
      <nav className="flex items-center gap-2 text-sm">
        <a href="#" className="text-primary hover:underline">Home</a>
        <span className="text-muted-foreground">/</span>
        <a href="#" className="text-primary hover:underline">Products</a>
        <span className="text-muted-foreground">/</span>
        <a href="#" className="text-primary hover:underline">Category</a>
        <span className="text-muted-foreground">/</span>
        <span className="text-foreground font-medium">Current Page</span>
      </nav>
    </ComponentCard>
  )
}

function PaginationDemo() {
  const [page, setPage] = useState(1)
  return (
    <ComponentCard title="Pagination" description="Page navigation with keyboard support">
      <div className="flex items-center gap-1">
        <button onClick={() => setPage(Math.max(1, page - 1))} className="p-2 rounded hover:bg-muted" disabled={page === 1}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        {[1, 2, 3, 4, 5].map(p => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`w-10 h-10 rounded font-medium ${
              page === p ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            {p}
          </button>
        ))}
        <button onClick={() => setPage(Math.min(5, page + 1))} className="p-2 rounded hover:bg-muted" disabled={page === 5}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </ComponentCard>
  )
}

function SelectDemo() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState('')
  const options = ['React', 'Vue', 'Angular', 'Svelte']
  return (
    <ComponentCard title="Select / Combobox" description="Custom select with search">
      <div className="relative w-48">
        <button onClick={() => setOpen(!open)} className="w-full px-4 py-2 bg-card border rounded-lg text-left flex justify-between items-center">
          {selected || 'Select framework'}
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-card border rounded-lg shadow-lg z-10">
            {options.map(opt => (
              <button
                key={opt}
                onClick={() => { setSelected(opt); setOpen(false) }}
                className={`w-full text-left px-4 py-2 hover:bg-muted ${selected === opt ? 'bg-primary/10 text-primary' : ''}`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    </ComponentCard>
  )
}

function SwitchDemo() {
  const [enabled, setEnabled] = useState(false)
  return (
    <ComponentCard title="Switch / Toggle" description="Accessible toggle switch">
      <div className="flex items-center gap-3">
        <button
          role="switch"
          aria-checked={enabled}
          onClick={() => setEnabled(!enabled)}
          className={`relative w-14 h-8 rounded-full transition-colors ${
            enabled ? 'bg-primary' : 'bg-muted'
          }`}
        >
          <span className={`absolute top-1 w-6 h-6 bg-card rounded-full shadow transition-transform ${
            enabled ? 'translate-x-7' : 'translate-x-1'
          }`} />
        </button>
        <span className="text-foreground">{enabled ? 'Enabled' : 'Disabled'}</span>
      </div>
    </ComponentCard>
  )
}

function SliderDemo() {
  const [value, setValue] = useState(50)
  return (
    <ComponentCard title="Slider" description="Range slider with keyboard support">
      <div className="w-full max-w-xs">
        <input
          type="range"
          min="0"
          max="100"
          value={value}
          onChange={e => setValue(Number(e.target.value))}
          className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
        />
        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
          <span>0</span>
          <span className="font-medium text-primary">{value}</span>
          <span>100</span>
        </div>
      </div>
    </ComponentCard>
  )
}

function AccordionDemo() {
  const [open, setOpen] = useState<number | null>(0)
  const items = [
    { title: 'What is CoralCSS?', content: 'A modern CSS framework with headless components.' },
    { title: 'Is it free?', content: 'Yes, CoralCSS is open source and free to use.' },
    { title: 'How do I install it?', content: 'npm install @coralcss/core' },
  ]
  return (
    <ComponentCard title="Accordion" description="Expandable content sections">
      <div className="w-full space-y-2">
        {items.map((item, i) => (
          <div key={i} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-4 py-3 text-left font-medium flex justify-between items-center hover:bg-muted"
            >
              {item.title}
              <svg className={`w-5 h-5 transition-transform ${open === i ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-4 py-3 bg-muted text-muted-foreground text-sm">
                {item.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </ComponentCard>
  )
}

function AvatarDemo() {
  return (
    <ComponentCard title="Avatar" description="User avatar with fallback">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
          JD
        </div>
        <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: 'hsl(var(--info))' }}>
          AK
        </div>
        <div className="relative">
          <div className="w-12 h-12 rounded-full flex items-center justify-center text-white font-medium" style={{ backgroundColor: 'hsl(var(--success))' }}>
            M
          </div>
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background" style={{ backgroundColor: 'hsl(var(--success))' }} />
        </div>
      </div>
    </ComponentCard>
  )
}

function ProgressDemo() {
  const [progress, setProgress] = useState(65)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => p >= 100 ? 0 : p + 5)
    }, 500)
    return () => clearInterval(interval)
  }, [])
  return (
    <ComponentCard title="Progress" description="Progress bar with indeterminate state">
      <div className="w-full max-w-xs space-y-4">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full animate-progress-indeterminate" />
        </div>
      </div>
    </ComponentCard>
  )
}

function SkeletonDemo() {
  return (
    <ComponentCard title="Skeleton" description="Loading placeholder">
      <div className="w-full max-w-xs space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-muted animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
            <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
          </div>
        </div>
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
      </div>
    </ComponentCard>
  )
}

function AlertDemo() {
  const [visible, setVisible] = useState(true)
  return (
    <ComponentCard title="Alert" description="Dismissible alert banners">
      {visible ? (
        <div className="flex items-start gap-3 p-4 rounded-lg max-w-xs border" style={{ backgroundColor: 'hsl(var(--info) / 0.1)', borderColor: 'hsl(var(--info) / 0.3)' }}>
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'hsl(var(--info))' }} fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <div className="flex-1">
            <p className="font-medium" style={{ color: 'hsl(var(--info))' }}>Information</p>
            <p className="text-sm text-muted-foreground">This is an informational alert.</p>
          </div>
          <button onClick={() => setVisible(false)} className="hover:opacity-70" style={{ color: 'hsl(var(--info))' }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ) : (
        <button onClick={() => setVisible(true)} className="btn btn-secondary text-sm">Show Alert</button>
      )}
    </ComponentCard>
  )
}

function CommandDemo() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentCard title="Command Palette" description="Cmd+K style search interface">
      <button onClick={() => setOpen(true)} className="btn btn-secondary flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search...
        <kbd className="px-2 py-0.5 text-xs bg-muted rounded">⌘K</kbd>
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-card rounded-xl w-full max-w-lg mx-4 shadow-2xl animate-fade-in overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input type="text" placeholder="Search commands..." className="flex-1 outline-none text-lg" autoFocus />
              <kbd className="px-2 py-1 text-xs bg-muted rounded">ESC</kbd>
            </div>
            <div className="p-2 max-h-80 overflow-y-auto">
              <div className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase">Actions</div>
              {['New File', 'Open Project', 'Search Files', 'Toggle Dark Mode'].map(cmd => (
                <button key={cmd} className="w-full px-3 py-2 text-left rounded hover:bg-muted flex items-center gap-3">
                  <span className="text-foreground">{cmd}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </ComponentCard>
  )
}

function CarouselDemo() {
  const [current, setCurrent] = useState(0)
  const slides = ['Slide 1', 'Slide 2', 'Slide 3']
  return (
    <ComponentCard title="Carousel" description="Touch-enabled image carousel">
      <div className="w-full max-w-xs">
        <div className="relative bg-muted rounded-lg h-32 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium">
            {slides[current]}
          </div>
        </div>
        <div className="flex justify-center gap-2 mt-3">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className={`w-2 h-2 rounded-full transition-colors ${
                current === i ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </ComponentCard>
  )
}

function ContextMenuDemo() {
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null)
  return (
    <ComponentCard title="Context Menu" description="Right-click menu">
      <div
        className="w-48 h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground text-sm cursor-context-menu"
        onContextMenu={(e) => {
          e.preventDefault()
          setMenuPos({ x: e.clientX, y: e.clientY })
        }}
      >
        Right-click here
      </div>
      {menuPos && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setMenuPos(null)} />
          <div
            className="fixed z-50 bg-card rounded-lg shadow-xl border py-1 min-w-[160px] animate-fade-in"
            style={{ left: menuPos.x, top: menuPos.y }}
          >
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Cut</button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Copy</button>
            <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Paste</button>
            <div className="border-t my-1" />
            <button className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-destructive/10">Delete</button>
          </div>
        </>
      )}
    </ComponentCard>
  )
}

function DropdownDemo() {
  const [open, setOpen] = useState(false)
  return (
    <ComponentCard title="Dropdown" description="Dropdown menu with positioning">
      <div className="relative">
        <button onClick={() => setOpen(!open)} className="btn btn-secondary flex items-center gap-2">
          Options
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
            <div className="absolute top-full right-0 mt-1 bg-card rounded-lg shadow-xl border py-1 min-w-[160px] z-20 animate-fade-in">
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Edit</button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Duplicate</button>
              <button className="w-full px-4 py-2 text-left text-sm hover:bg-muted">Archive</button>
            </div>
          </>
        )}
      </div>
    </ComponentCard>
  )
}

// Batch 3 Component Demos

function RatingDemo() {
  const [rating, setRating] = useState(3)
  return (
    <ComponentCard title="Rating" description="Star rating with half-star support">
      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl transition-colors ${
                star <= rating ? 'text-warning' : 'text-muted-foreground'
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{rating} of 5 stars</span>
      </div>
    </ComponentCard>
  )
}

function StepperDemo() {
  const [step] = useState(2)
  const steps = ['Account', 'Profile', 'Review', 'Complete']
  return (
    <ComponentCard title="Stepper" description="Multi-step progress indicator">
      <div className="w-full max-w-xs">
        <div className="flex items-center justify-between">
          {steps.map((s, i) => (
            <div key={s} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  i < step ? 'bg-primary text-primary-foreground' : i === step ? 'bg-primary/10 text-primary border-2 border-primary' : 'bg-muted text-muted-foreground'
                }`}
              >
                {i < step ? '✓' : i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className={`w-8 h-1 mx-1 ${i < step ? 'bg-primary' : 'bg-muted'}`} />
              )}
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-muted-foreground mt-3">{steps[step]}</p>
      </div>
    </ComponentCard>
  )
}

function ChipDemo() {
  const [chips, setChips] = useState(['React', 'TypeScript', 'CoralCSS'])
  return (
    <ComponentCard title="Chip" description="Compact elements for tags/filters">
      <div className="flex flex-wrap gap-2">
        {chips.map((chip) => (
          <span
            key={chip}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
          >
            {chip}
            <button
              onClick={() => setChips(chips.filter(c => c !== chip))}
              className="hover:opacity-70"
            >
              ×
            </button>
          </span>
        ))}
        {chips.length === 0 && (
          <button
            onClick={() => setChips(['React', 'TypeScript', 'CoralCSS'])}
            className="text-sm text-primary hover:underline"
          >
            Reset chips
          </button>
        )}
      </div>
    </ComponentCard>
  )
}

function TimelineDemo() {
  const events = [
    { title: 'Project Started', date: 'Jan 2024' },
    { title: 'Beta Release', date: 'Mar 2024' },
    { title: 'v1.0 Launch', date: 'Jun 2024' },
  ]
  return (
    <ComponentCard title="Timeline" description="Vertical timeline for events">
      <div className="relative pl-6 space-y-4">
        <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-border" />
        {events.map((event, i) => (
          <div key={i} className="relative">
            <div className="absolute left-[-18px] w-3 h-3 bg-primary rounded-full border-2 border-background" />
            <p className="font-medium text-foreground">{event.title}</p>
            <p className="text-sm text-muted-foreground">{event.date}</p>
          </div>
        ))}
      </div>
    </ComponentCard>
  )
}

function StatDemo() {
  return (
    <ComponentCard title="Stat" description="Statistics display with trends">
      <div className="flex gap-6">
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">12.5K</p>
          <p className="text-sm text-muted-foreground">Users</p>
          <span className="text-xs" style={{ color: 'hsl(var(--success))' }}>↑ 12%</span>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-foreground">$45K</p>
          <p className="text-sm text-muted-foreground">Revenue</p>
          <span className="text-xs" style={{ color: 'hsl(var(--success))' }}>↑ 8%</span>
        </div>
      </div>
    </ComponentCard>
  )
}

function KbdDemo() {
  return (
    <ComponentCard title="Kbd" description="Keyboard shortcut display">
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm font-mono">⌘</kbd>
          <span className="text-muted-foreground">+</span>
          <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm font-mono">K</kbd>
          <span className="text-sm text-muted-foreground ml-2">Command palette</span>
        </div>
        <div className="flex items-center gap-2">
          <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm font-mono">⌘</kbd>
          <span className="text-muted-foreground">+</span>
          <kbd className="px-2 py-1 bg-muted border border-border rounded text-sm font-mono">S</kbd>
          <span className="text-sm text-muted-foreground ml-2">Save</span>
        </div>
      </div>
    </ComponentCard>
  )
}

function CodeDemo() {
  return (
    <ComponentCard title="Code" description="Code block with line numbers">
      <pre className="bg-secondary text-secondary-foreground rounded-lg p-4 text-sm font-mono overflow-x-auto w-full max-w-xs">
        <code>{`const greeting = 'Hello!'
console.log(greeting)`}</code>
      </pre>
    </ComponentCard>
  )
}

function EmptyStateDemo() {
  return (
    <ComponentCard title="Empty State" description="Empty state display with actions">
      <div className="text-center py-4">
        <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
        </div>
        <p className="font-medium text-foreground">No items found</p>
        <p className="text-sm text-muted-foreground mb-3">Get started by creating a new item</p>
        <button className="btn btn-primary text-sm">Create Item</button>
      </div>
    </ComponentCard>
  )
}

function SpinnerDemo() {
  return (
    <ComponentCard title="Spinner" description="Loading spinner animation">
      <div className="flex gap-6">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="w-8 h-8 border-3 border-primary border-t-transparent rounded-full animate-spin" />
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    </ComponentCard>
  )
}

function TreeDemo() {
  const [expanded, setExpanded] = useState<string[]>(['src'])
  const toggle = (id: string) => {
    setExpanded(prev => prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id])
  }
  return (
    <ComponentCard title="Tree" description="Hierarchical tree view">
      <div className="text-sm w-full max-w-xs">
        <div>
          <button onClick={() => toggle('src')} className="flex items-center gap-1 hover:bg-muted w-full px-2 py-1 rounded">
            <span className="text-muted-foreground">{expanded.includes('src') ? '▼' : '▶'}</span>
            <span>📁 src</span>
          </button>
          {expanded.includes('src') && (
            <div className="ml-4">
              <button onClick={() => toggle('components')} className="flex items-center gap-1 hover:bg-muted w-full px-2 py-1 rounded">
                <span className="text-muted-foreground">{expanded.includes('components') ? '▼' : '▶'}</span>
                <span>📁 components</span>
              </button>
              {expanded.includes('components') && (
                <div className="ml-4">
                  <div className="flex items-center gap-1 px-2 py-1"><span className="text-muted-foreground">•</span> Button.tsx</div>
                  <div className="flex items-center gap-1 px-2 py-1"><span className="text-muted-foreground">•</span> Input.tsx</div>
                </div>
              )}
              <div className="flex items-center gap-1 px-2 py-1"><span className="text-muted-foreground">•</span> index.ts</div>
            </div>
          )}
        </div>
      </div>
    </ComponentCard>
  )
}

function NumberInputDemo() {
  const [value, setValue] = useState(5)
  return (
    <ComponentCard title="Number Input" description="Number input with stepper buttons">
      <div className="flex items-center border rounded-lg overflow-hidden">
        <button
          onClick={() => setValue(Math.max(0, value - 1))}
          className="px-4 py-2 bg-muted hover:bg-accent font-medium"
        >
          −
        </button>
        <span className="px-6 py-2 font-medium">{value}</span>
        <button
          onClick={() => setValue(value + 1)}
          className="px-4 py-2 bg-muted hover:bg-accent font-medium"
        >
          +
        </button>
      </div>
    </ComponentCard>
  )
}

function PinInputDemo() {
  const [pin, setPin] = useState(['', '', '', ''])
  return (
    <ComponentCard title="PIN Input" description="PIN/OTP input fields">
      <div className="flex gap-2">
        {pin.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const newPin = [...pin]
              newPin[i] = e.target.value
              setPin(newPin)
            }}
            className="w-12 h-12 text-center border border-border rounded-lg text-xl font-mono focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
          />
        ))}
      </div>
    </ComponentCard>
  )
}

function FileUploadDemo() {
  const [file, setFile] = useState<string | null>(null)
  return (
    <ComponentCard title="File Upload" description="Drag and drop file upload">
      <div
        className={`w-full max-w-xs border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
          file ? 'border-primary bg-primary/10' : 'border-border hover:border-primary'
        }`}
        onClick={() => setFile(file ? null : 'document.pdf')}
      >
        {file ? (
          <div>
            <span className="text-primary">📄 {file}</span>
            <p className="text-sm text-muted-foreground mt-1">Click to remove</p>
          </div>
        ) : (
          <div>
            <span className="text-muted-foreground text-3xl">📁</span>
            <p className="text-sm text-muted-foreground mt-2">Click to upload</p>
          </div>
        )}
      </div>
    </ComponentCard>
  )
}

function ColorPickerDemo() {
  const [color, setColor] = useState('#FF6B6B')
  const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD']
  return (
    <ComponentCard title="Color Picker" description="Color selection component">
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-16 h-16 rounded-lg shadow-inner border"
          style={{ backgroundColor: color }}
        />
        <div className="flex gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 ${color === c ? 'border-foreground' : 'border-transparent'}`}
              style={{ backgroundColor: c }}
            />
          ))}
        </div>
      </div>
    </ComponentCard>
  )
}

function DatePickerDemo() {
  const [date, setDate] = useState('2024-06-15')
  return (
    <ComponentCard title="Date Picker" description="Calendar date selection">
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="px-4 py-2 border border-border rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
      />
    </ComponentCard>
  )
}

function MarqueeDemo() {
  return (
    <ComponentCard title="Marquee" description="Scrolling content animation">
      <div className="w-full max-w-xs overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap">
          <span className="mx-4 text-muted-foreground">🚀 CoralCSS</span>
          <span className="mx-4 text-muted-foreground">⚡ Fast</span>
          <span className="mx-4 text-muted-foreground">🎨 Beautiful</span>
          <span className="mx-4 text-muted-foreground">♿ Accessible</span>
          <span className="mx-4 text-muted-foreground">🚀 CoralCSS</span>
          <span className="mx-4 text-muted-foreground">⚡ Fast</span>
        </div>
      </div>
    </ComponentCard>
  )
}

function ImageGalleryDemo() {
  const images = ['🖼️', '🎨', '📷']
  const [active, setActive] = useState(0)
  return (
    <ComponentCard title="Image Gallery" description="Gallery with lightbox support">
      <div className="flex flex-col items-center gap-4">
        <div className="text-6xl">{images[active]}</div>
        <div className="flex gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`w-12 h-12 rounded border-2 flex items-center justify-center text-2xl ${
                active === i ? 'border-primary' : 'border-border'
              }`}
            >
              {img}
            </button>
          ))}
        </div>
      </div>
    </ComponentCard>
  )
}

function RangeSliderDemo() {
  const [range] = useState({ min: 20, max: 80 })
  return (
    <ComponentCard title="Range Slider" description="Dual-handle range selection">
      <div className="w-full max-w-xs">
        <div className="relative h-2 bg-muted rounded-full">
          <div
            className="absolute h-full bg-primary rounded-full"
            style={{ left: `${range.min}%`, width: `${range.max - range.min}%` }}
          />
          <div
            className="absolute w-4 h-4 bg-card border-2 border-primary rounded-full -mt-1 cursor-pointer"
            style={{ left: `${range.min}%`, transform: 'translateX(-50%)' }}
          />
          <div
            className="absolute w-4 h-4 bg-card border-2 border-primary rounded-full -mt-1 cursor-pointer"
            style={{ left: `${range.max}%`, transform: 'translateX(-50%)' }}
          />
        </div>
        <div className="flex justify-between mt-3 text-sm text-muted-foreground">
          <span>${range.min}</span>
          <span>${range.max}</span>
        </div>
      </div>
    </ComponentCard>
  )
}

function DataTableDemo() {
  const data = [
    { name: 'John', role: 'Admin', status: 'Active' },
    { name: 'Jane', role: 'User', status: 'Active' },
    { name: 'Bob', role: 'User', status: 'Inactive' },
  ]
  return (
    <ComponentCard title="Data Table" description="Advanced table with sorting">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b">
              <th className="text-left py-2 px-3 font-medium">Name</th>
              <th className="text-left py-2 px-3 font-medium">Role</th>
              <th className="text-left py-2 px-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b last:border-0 hover:bg-muted">
                <td className="py-2 px-3">{row.name}</td>
                <td className="py-2 px-3">{row.role}</td>
                <td className="py-2 px-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    row.status === 'Active' ? 'bg-success/20 text-success' : 'bg-muted text-muted-foreground'
                  }`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ComponentCard>
  )
}

export default Components
