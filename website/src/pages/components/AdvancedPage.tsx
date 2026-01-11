import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function CommandPreview() {
  const [query, setQuery] = useState('')
  const commands = [
    { label: 'New File', shortcut: 'Ctrl+N', icon: 'M12 4v16m8-8H4' },
    { label: 'Open File', shortcut: 'Ctrl+O', icon: 'M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z' },
    { label: 'Save', shortcut: 'Ctrl+S', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4' },
    { label: 'Settings', shortcut: 'Ctrl+,', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
  ]
  return (
    <div className="w-full max-w-md bg-card border border-border rounded-xl shadow-lg overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Type a command..."
          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
        />
      </div>
      <div className="p-2">
        {commands.map((cmd) => (
          <button key={cmd.label} className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <div className="flex items-center gap-3">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cmd.icon} />
              </svg>
              <span className="text-sm">{cmd.label}</span>
            </div>
            <kbd className="px-2 py-0.5 text-xs bg-muted rounded">{cmd.shortcut}</kbd>
          </button>
        ))}
      </div>
    </div>
  )
}

function CarouselPreview() {
  const [current, setCurrent] = useState(0)
  const slides = [
    { bg: 'from-primary to-accent', label: 'Slide 1' },
    { bg: 'from-info to-success', label: 'Slide 2' },
    { bg: 'from-warning to-destructive', label: 'Slide 3' },
  ]
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className={`aspect-video rounded-lg bg-gradient-to-br ${slides[current].bg} flex items-center justify-center`}>
          <span className="text-2xl font-bold text-white">{slides[current].label}</span>
        </div>
        <button
          onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrent((current + 1) % slides.length)}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-black/70"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="flex justify-center gap-2 mt-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-colors ${
              i === current ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function MarqueePreview() {
  return (
    <div className="w-full overflow-hidden">
      <div className="flex animate-marquee gap-8">
        {['CoralCSS', 'Modern CSS', 'Utility-First', 'JIT Compilation', 'Dark Mode', 'Responsive'].map((text, i) => (
          <span key={i} className="text-lg font-medium text-foreground whitespace-nowrap">{text}</span>
        ))}
        {['CoralCSS', 'Modern CSS', 'Utility-First', 'JIT Compilation', 'Dark Mode', 'Responsive'].map((text, i) => (
          <span key={i + 6} className="text-lg font-medium text-foreground whitespace-nowrap">{text}</span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </div>
  )
}

function KbdPreview() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 text-sm bg-muted border border-border rounded font-mono shadow-sm">Ctrl</kbd>
        <span className="text-muted-foreground">+</span>
        <kbd className="px-2 py-1 text-sm bg-muted border border-border rounded font-mono shadow-sm">Shift</kbd>
        <span className="text-muted-foreground">+</span>
        <kbd className="px-2 py-1 text-sm bg-muted border border-border rounded font-mono shadow-sm">P</kbd>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-2 py-1 text-sm bg-muted border border-border rounded font-mono shadow-sm">Cmd</kbd>
        <span className="text-muted-foreground">+</span>
        <kbd className="px-2 py-1 text-sm bg-muted border border-border rounded font-mono shadow-sm">K</kbd>
      </div>
      <div className="flex items-center gap-2">
        <kbd className="px-3 py-1.5 text-base bg-muted border border-border rounded font-mono shadow-sm">Enter</kbd>
        <kbd className="px-3 py-1.5 text-base bg-muted border border-border rounded font-mono shadow-sm">Up</kbd>
        <kbd className="px-3 py-1.5 text-base bg-muted border border-border rounded font-mono shadow-sm">Down</kbd>
      </div>
    </div>
  )
}

function SpotlightPreview() {
  const [active, setActive] = useState(false)
  return (
    <div className="relative w-full max-w-sm p-8">
      {active && <div className="absolute inset-0 bg-black/50 rounded-lg" />}
      <div className={`relative z-10 p-4 bg-card border border-border rounded-lg ${active ? 'ring-4 ring-primary ring-offset-2 ring-offset-background' : ''}`}>
        <p className="text-foreground mb-4">This is the spotlight target element.</p>
        <button
          onClick={() => setActive(!active)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {active ? 'Disable' : 'Enable'} Spotlight
        </button>
      </div>
    </div>
  )
}

function TourPreview() {
  const [step, setStep] = useState(0)
  const steps = ['Welcome!', 'Click here to continue', 'Almost done...', 'Tour complete!']
  return (
    <div className="w-full max-w-sm p-6 bg-card border border-border rounded-xl shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-primary' : 'bg-muted'}`}
          />
        ))}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">Step {step + 1}</h3>
      <p className="text-muted-foreground mb-4">{steps[step]}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          disabled={step === 0}
          className="px-4 py-2 border border-border rounded-lg text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          disabled={step === steps.length - 1}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm disabled:opacity-50"
        >
          {step === steps.length - 1 ? 'Done' : 'Next'}
        </button>
      </div>
    </div>
  )
}

function HotkeysPreview() {
  const shortcuts = [
    { action: 'Open command', keys: ['Cmd', 'K'] },
    { action: 'Save file', keys: ['Cmd', 'S'] },
    { action: 'New file', keys: ['Cmd', 'N'] },
    { action: 'Search', keys: ['Cmd', 'F'] },
    { action: 'Undo', keys: ['Cmd', 'Z'] },
    { action: 'Redo', keys: ['Cmd', 'Shift', 'Z'] },
  ]
  return (
    <div className="w-full max-w-md bg-card border border-border rounded-xl p-4">
      <h3 className="font-semibold text-foreground mb-3">Keyboard Shortcuts</h3>
      <div className="grid grid-cols-2 gap-2">
        {shortcuts.map((shortcut) => (
          <div key={shortcut.action} className="flex items-center justify-between p-2 rounded hover:bg-muted">
            <span className="text-sm text-muted-foreground">{shortcut.action}</span>
            <div className="flex items-center gap-1">
              {shortcut.keys.map((key, i) => (
                <kbd key={i} className="px-1.5 py-0.5 text-xs bg-muted border border-border rounded font-mono">
                  {key}
                </kbd>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FocusTrapPreview() {
  const [active, setActive] = useState(false)
  return (
    <div className={`w-full max-w-sm p-6 bg-card border-2 rounded-xl ${active ? 'border-primary' : 'border-border'}`}>
      <h3 className="font-semibold text-foreground mb-4">Focus Trap Demo</h3>
      <div className="space-y-3">
        <input
          type="text"
          placeholder="First input"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
        />
        <input
          type="text"
          placeholder="Second input"
          className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary"
        />
        <div className="flex gap-2">
          <button
            onClick={() => setActive(!active)}
            className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
          >
            {active ? 'Deactivate' : 'Activate'} Trap
          </button>
          <button className="px-4 py-2 border border-border rounded-lg text-sm">
            Cancel
          </button>
        </div>
      </div>
      {active && (
        <p className="mt-3 text-xs text-primary">Focus is now trapped within this container!</p>
      )}
    </div>
  )
}

function OnboardingPreview() {
  const [currentStep, setCurrentStep] = useState(0)
  const steps = [
    { title: 'Welcome', description: 'Let\'s get started with your onboarding tour' },
    { title: 'Profile Setup', description: 'Configure your profile settings' },
    { title: 'Preferences', description: 'Customize your experience' },
    { title: 'Complete', description: 'You\'re all set!' },
  ]

  return (
    <div className="w-full max-w-md bg-card border border-border rounded-xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        {steps.map((_, i) => (
          <div
            key={i}
            className={`h-2 flex-1 rounded-full transition-all ${
              i <= currentStep ? 'bg-primary' : 'bg-muted'
            }`}
          />
        ))}
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">{steps[currentStep].title}</h3>
      <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="px-4 py-2 border border-border rounded-lg text-sm disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {currentStep === steps.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  )
}

function PortalPreview() {
  const [mounted, setMounted] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="p-4 bg-card border border-border rounded-lg">
        <p className="text-muted-foreground mb-4">Portal content renders in a different DOM location.</p>
        <button
          onClick={() => setMounted(!mounted)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {mounted ? 'Unmount' : 'Mount'} Portal
        </button>
      </div>
      {mounted && (
        <div className="mt-4 p-4 bg-accent rounded-lg border-2 border-dashed border-primary">
          <p className="text-foreground font-medium">Portal Content</p>
          <p className="text-xs text-muted-foreground mt-1">This is rendered via Portal</p>
        </div>
      )}
    </div>
  )
}

function ResizeObserverPreview() {
  const [size, setSize] = useState({ width: 300, height: 200 })

  return (
    <div className="w-full max-w-md">
      <div className="mb-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground">Element size: {size.width} × {size.height}px</p>
      </div>
      <div
        className="bg-card border border-border rounded-lg p-4 transition-all"
        style={{ width: size.width, height: size.height }}
      >
        <p className="text-foreground">Resize me!</p>
      </div>
      <div className="mt-4 flex gap-2">
        <button
          onClick={() => setSize({ width: size.width - 50, height: size.height })}
          className="px-3 py-1.5 bg-muted rounded text-sm"
        >
          - Width
        </button>
        <button
          onClick={() => setSize({ width: size.width + 50, height: size.height })}
          className="px-3 py-1.5 bg-muted rounded text-sm"
        >
          + Width
        </button>
        <button
          onClick={() => setSize({ width: size.width, height: size.height - 50 })}
          className="px-3 py-1.5 bg-muted rounded text-sm"
        >
          - Height
        </button>
        <button
          onClick={() => setSize({ width: size.width, height: size.height + 50 })}
          className="px-3 py-1.5 bg-muted rounded text-sm"
        >
          + Height
        </button>
      </div>
    </div>
  )
}

function IntersectionObserverPreview() {
  const [visible] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="h-32 overflow-y-auto bg-muted rounded-lg p-4">
          <div className="h-48 relative">
            <div
              className={`absolute inset-0 flex items-center justify-center rounded transition-all ${
                visible ? 'bg-primary text-primary-foreground' : 'bg-card border-2 border-dashed border-border'
              }`}
            >
              <span className="font-medium">
                {visible ? 'Element is visible!' : 'Scroll to make me visible'}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-sm">
          Status: <span className={visible ? 'text-success font-medium' : 'text-muted-foreground'}>{visible ? 'Visible' : 'Hidden'}</span>
        </p>
      </div>
    </div>
  )
}

function VirtualListPreview() {
  const items = Array.from({ length: 1000 }, (_, i) => ({ id: i, text: `Item ${i}` }))

  return (
    <div className="w-full max-w-md">
      <div className="h-64 overflow-y-auto bg-card border border-border rounded-lg">
        <div className="p-2">
          {items.slice(0, 20).map((item) => (
            <div
              key={item.id}
              className="px-3 py-2 rounded hover:bg-muted transition-colors"
            >
              <span className="text-foreground">{item.text}</span>
            </div>
          ))}
          <div className="text-center py-4">
            <span className="text-xs text-muted-foreground">
              Virtualized list (showing 1000 items)
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function ImageComparisonPreview() {
  const [position, setPosition] = useState(50)

  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary to-accent"
          style={{ clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)` }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-info to-success" />
        <div
          className="absolute top-0 bottom-0 w-1 bg-primary-foreground cursor-ew-resize"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-primary-foreground rounded-full shadow-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
            </svg>
          </div>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  )
}

function BeforeAfterSliderPreview() {
  const [position, setPosition] = useState(50)

  return (
    <div className="w-full max-w-md">
      <div className="relative aspect-video bg-muted rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex">
          <div className="flex-1 bg-gradient-to-br from-warning to-destructive flex items-center justify-center">
            <span className="text-2xl font-bold text-white">BEFORE</span>
          </div>
          <div
            className="flex-1 bg-gradient-to-br from-success to-primary flex items-center justify-center"
            style={{ clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` }}
          >
            <span className="text-2xl font-bold text-white">AFTER</span>
          </div>
        </div>
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-primary-foreground"
          style={{ left: `${position}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full shadow-lg flex items-center justify-center cursor-ew-resize"
          style={{ left: `${position}%` }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
          </svg>
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={position}
        onChange={(e) => setPosition(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  )
}

function StickyHeadroomPreview() {
  const [scrolled] = useState(false)

  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className={`bg-card border border-border rounded-lg p-4 transition-all ${scrolled ? 'shadow-lg' : ''}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold">
              L
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-foreground">Logo</h4>
              <p className="text-xs text-muted-foreground">Scroll to see headroom effect</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          Header becomes {scrolled ? 'smaller' : 'larger'} when scrolling
        </p>
      </div>
    </div>
  )
}

function GlassmorphismPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-lg blur-xl opacity-30" />
        <div className="relative bg-background/40 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-xl">
          <h3 className="text-xl font-bold text-foreground mb-2">Glassmorphism</h3>
          <p className="text-muted-foreground text-sm">
            Frosted glass effect with backdrop blur and transparency
          </p>
          <div className="mt-4 flex gap-2">
            <button className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-sm text-foreground hover:bg-white/30 transition-colors">
              Action
            </button>
            <button className="px-4 py-2 border border-white/20 rounded-lg text-sm text-foreground hover:bg-white/10 transition-colors">
              Secondary
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SplitTextPreview() {
  const text = "CoralCSS"

  return (
    <div className="w-full max-w-md flex justify-center">
      <div className="flex">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="text-5xl font-bold text-foreground transition-all hover:translate-y-[-10px] cursor-default"
            style={{
              transitionDelay: `${i * 50}ms`,
              textShadow: '0 0 20px hsl(var(--primary) / 0.5)',
            }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  )
}

const advancedComponents = [
  {
    id: 'command',
    name: 'Command',
    description: 'A command palette for keyboard-driven navigation and actions.',
    usage: `<div data-coral-command>
  <input data-coral-command-input placeholder="Type a command..." />
  <div data-coral-command-list>
    <div data-coral-command-group data-heading="Actions">
      <button data-coral-command-item>
        New File <kbd>Ctrl+N</kbd>
      </button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-placeholder', type: 'string', default: '"Type a command..."', description: 'Input placeholder' },
      { name: 'data-hotkey', type: 'string', default: '"cmd+k"', description: 'Global hotkey' },
    ],
    preview: CommandPreview,
  },
  {
    id: 'carousel',
    name: 'Carousel',
    description: 'A slideshow component for cycling through content.',
    usage: `<div data-coral-carousel>
  <div data-coral-carousel-content>
    <div data-coral-carousel-item>Slide 1</div>
    <div data-coral-carousel-item>Slide 2</div>
  </div>
  <button data-coral-carousel-prev>Previous</button>
  <button data-coral-carousel-next>Next</button>
  <div data-coral-carousel-dots></div>
</div>`,
    props: [
      { name: 'data-autoplay', type: 'boolean', default: 'false', description: 'Auto-advance slides' },
      { name: 'data-loop', type: 'boolean', default: 'true', description: 'Loop through slides' },
      { name: 'data-interval', type: 'number', default: '5000', description: 'Autoplay interval (ms)' },
    ],
    preview: CarouselPreview,
  },
  {
    id: 'marquee',
    name: 'Marquee',
    description: 'A scrolling content container for announcements.',
    usage: `<div data-coral-marquee data-speed="fast">
  <div data-coral-marquee-content>
    Scrolling content here...
  </div>
</div>`,
    props: [
      { name: 'data-speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Scroll speed' },
      { name: 'data-direction', type: '"left" | "right"', default: '"left"', description: 'Scroll direction' },
      { name: 'data-pause-on-hover', type: 'boolean', default: 'true', description: 'Pause on hover' },
    ],
    preview: MarqueePreview,
  },
  {
    id: 'kbd',
    name: 'Kbd',
    description: 'A keyboard key indicator for shortcuts.',
    usage: `<kbd data-coral-kbd>Ctrl</kbd>
<kbd data-coral-kbd>+</kbd>
<kbd data-coral-kbd>K</kbd>

<span data-coral-kbd-combo>
  <kbd>Cmd</kbd><kbd>Shift</kbd><kbd>P</kbd>
</span>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Key size' },
      { name: 'data-variant', type: '"default" | "outlined"', default: '"default"', description: 'Visual style' },
    ],
    preview: KbdPreview,
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A spotlight effect for highlighting elements.',
    usage: `<div data-coral-spotlight>
  <div data-coral-spotlight-target>
    Highlighted content
  </div>
  <div data-coral-spotlight-backdrop></div>
</div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Enable spotlight' },
      { name: 'data-padding', type: 'number', default: '8', description: 'Spotlight padding' },
    ],
    preview: SpotlightPreview,
  },
  {
    id: 'tour',
    name: 'Tour',
    description: 'A guided tour component for onboarding.',
    usage: `<div data-coral-tour>
  <div data-coral-tour-step data-target="#step1">
    <h4>Step 1</h4>
    <p>Welcome to the tour!</p>
    <button data-coral-tour-next>Next</button>
  </div>
</div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Start tour' },
      { name: 'data-step', type: 'number', default: '0', description: 'Current step index' },
    ],
    preview: TourPreview,
  },
  {
    id: 'hotkeys',
    name: 'Hotkeys',
    description: 'A component for displaying available keyboard shortcuts.',
    usage: `<div data-coral-hotkeys>
  <div data-coral-hotkeys-group data-label="Navigation">
    <div data-coral-hotkeys-item>
      <span>Go to Home</span>
      <kbd>G</kbd><kbd>H</kbd>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-columns', type: '1 | 2 | 3', default: '2', description: 'Number of columns' },
    ],
    preview: HotkeysPreview,
  },
  {
    id: 'focus-trap',
    name: 'FocusTrap',
    description: 'Traps focus within a container for accessibility.',
    usage: `<div data-coral-focus-trap data-active>
  <button>First focusable</button>
  <input type="text" />
  <button>Last focusable</button>
</div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Enable focus trap' },
      { name: 'data-return-focus', type: 'boolean', default: 'true', description: 'Return focus on deactivate' },
    ],
    preview: FocusTrapPreview,
  },
  {
    id: 'onboarding',
    name: 'Onboarding',
    description: 'Multi-step onboarding flow for new users.',
    usage: `<div data-coral-onboarding data-active>
  <div data-coral-onboarding-step data-index="0">
    <h3>Welcome</h3>
    <p>Get started with your tour</p>
    <button data-coral-onboarding-next>Next</button>
  </div>
</div>`,
    props: [
      { name: 'data-active', type: 'boolean', default: 'false', description: 'Start onboarding' },
      { name: 'data-step', type: 'number', default: '0', description: 'Current step index' },
    ],
    preview: OnboardingPreview,
  },
  {
    id: 'portal',
    name: 'Portal',
    description: 'Renders children into a different DOM subtree.',
    usage: `<div data-coral-portal data-target="#portal-root">
  <div>Content rendered elsewhere</div>
</div>`,
    props: [
      { name: 'data-target', type: 'string', default: '"body"', description: 'Portal target selector' },
      { name: 'data-portal-id', type: 'string', default: 'undefined', description: 'Unique portal ID' },
    ],
    preview: PortalPreview,
  },
  {
    id: 'resize-observer',
    name: 'ResizeObserver',
    description: 'Observes changes to element dimensions.',
    usage: `<div data-coral-resize-observer>
  <div data-coral-resize-target>
    Resize me to observe changes
  </div>
</div>`,
    props: [
      { name: 'data-on-resize', type: 'function', default: 'undefined', description: 'Resize callback' },
      { name: 'data-box', type: '"content-box" | "border-box"', default: '"content-box"', description: 'Observed box model' },
    ],
    preview: ResizeObserverPreview,
  },
  {
    id: 'intersection-observer',
    name: 'IntersectionObserver',
    description: 'Observes element visibility in viewport.',
    usage: `<div data-coral-intersection-observer data-threshold="0.5">
  <div data-coral-intersection-target>
    Visible when 50% in viewport
  </div>
</div>`,
    props: [
      { name: 'data-threshold', type: 'number | number[]', default: '0', description: 'Visibility threshold' },
      { name: 'data-root-margin', type: 'string', default: '"0px"', description: 'Root margin' },
    ],
    preview: IntersectionObserverPreview,
  },
  {
    id: 'virtual-list',
    name: 'VirtualList',
    description: 'Efficiently renders large lists.',
    usage: `<div data-coral-virtual-list data-height="400" data-item-height="50">
  <div data-coral-virtual-item>Item 1</div>
  <div data-coral-virtual-item>Item 2</div>
</div>`,
    props: [
      { name: 'data-height', type: 'number', default: '400', description: 'List height in px' },
      { name: 'data-item-height', type: 'number', default: '50', description: 'Item height in px' },
    ],
    preview: VirtualListPreview,
  },
  {
    id: 'image-comparison',
    name: 'ImageComparison',
    description: 'Side-by-side image comparison slider.',
    usage: `<div data-coral-image-comparison data-position="50">
  <div data-coral-image-comparison-before>
    <img src="before.jpg" alt="Before" />
  </div>
  <div data-coral-image-comparison-after>
    <img src="after.jpg" alt="After" />
  </div>
</div>`,
    props: [
      { name: 'data-position', type: 'number', default: '50', description: 'Initial slider position (%)' },
      { name: 'data-vertical', type: 'boolean', default: 'false', description: 'Vertical orientation' },
    ],
    preview: ImageComparisonPreview,
  },
  {
    id: 'before-after-slider',
    name: 'BeforeAfterSlider',
    description: 'Interactive before/after transformation slider.',
    usage: `<div data-coral-before-after data-position="50">
  <div data-coral-before-after-before>
    <img src="before.jpg" alt="Before" />
  </div>
  <div data-coral-before-after-after>
    <img src="after.jpg" alt="After" />
  </div>
</div>`,
    props: [
      { name: 'data-position', type: 'number', default: '50', description: 'Initial slider position (%)' },
      { name: 'data-snap', type: 'boolean', default: 'false', description: 'Snap to positions' },
    ],
    preview: BeforeAfterSliderPreview,
  },
  {
    id: 'sticky-headroom',
    name: 'StickyHeadroom',
    description: 'Shrinks header when scrolling down.',
    usage: `<div data-coral-headroom data-scroll-height="100">
  <header data-coral-headroom-target>
    Sticky header content
  </header>
</div>`,
    props: [
      { name: 'data-scroll-height', type: 'number', default: '100', description: 'Scroll threshold' },
      { name: 'data-classes', type: 'string', default: '"headroom--scrolled"', description: 'Applied class on scroll' },
    ],
    preview: StickyHeadroomPreview,
  },
  {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted glass visual effect.',
    usage: `<div data-coral-glassmorphism data-blur="10" data-opacity="0.2">
  <div class="glass-content">
    Glassmorphism content
  </div>
</div>`,
    props: [
      { name: 'data-blur', type: 'number', default: '10', description: 'Backdrop blur intensity' },
      { name: 'data-opacity', type: 'number', default: '0.2', description: 'Background opacity' },
    ],
    preview: GlassmorphismPreview,
  },
  {
    id: 'split-text',
    name: 'SplitText',
    description: 'Animated text splitting and reveal.',
    usage: `<div data-coral-split-text data-animation="slide-up">
  <span data-coral-split-text-item>C</span>
  <span data-coral-split-text-item>o</span>
  <span data-coral-split-text-item>r</span>
</div>`,
    props: [
      { name: 'data-animation', type: '"fade" | "slide-up" | "slide-left" | "rotate"', default: '"fade"', description: 'Animation type' },
      { name: 'data-stagger', type: 'number', default: '50', description: 'Stagger delay (ms)' },
    ],
    preview: SplitTextPreview,
  },
]

function AdvancedPage() {
  return (
    <ComponentPageLayout
      categoryName="Advanced"
      categoryId="advanced"
      components={advancedComponents}
      accessibilityFeatures={[
        'Full keyboard support',
        'Voice control',
        'Motion sensitivity',
        'Focus management',
      ]}
    />
  )
}

export default AdvancedPage
