import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function DialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Dialog
      </button>
      {isOpen && (
        <div data-coral-dialog-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-dialog-content role="dialog" aria-modal="true">
            <h2 data-coral-dialog-title>Dialog Title</h2>
            <p data-coral-dialog-description>
              This is a dialog description. You can put any content here.
            </p>
            <div data-coral-dialog-footer>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="outline"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="primary"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function DrawerPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Drawer
      </button>
      {isOpen && (
        <div data-coral-drawer-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-drawer-content data-position="right" data-open>
            <div data-coral-drawer-header>
              <h2 data-coral-drawer-title>Drawer</h2>
              <button onClick={() => setIsOpen(false)} data-coral-icon-button data-variant="ghost" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div data-coral-drawer-body>
              <p className="text-muted-foreground">
                Drawer content goes here. Use it for navigation, forms, or additional options.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function PopoverPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div data-coral-popover className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-coral-button
        data-variant="primary"
      >
        Toggle Popover
      </button>
      {isOpen && (
        <div data-coral-popover-content data-side="bottom" data-open>
          <h3 className="font-medium text-foreground mb-2">Popover Title</h3>
          <p className="text-sm text-muted-foreground">
            This is a popover. It can contain any content and automatically positions itself.
          </p>
        </div>
      )}
    </div>
  )
}

function TooltipPreview() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null)
  return (
    <div className="flex gap-4">
      {['Top', 'Right', 'Bottom', 'Left'].map((side) => (
        <div key={side} data-coral-tooltip className="relative">
          <button
            onMouseEnter={() => setActiveTooltip(side)}
            onMouseLeave={() => setActiveTooltip(null)}
            data-coral-button
            data-variant="outline"
          >
            {side}
          </button>
          {activeTooltip === side && (
            <div
              data-coral-tooltip-content
              data-side={side.toLowerCase()}
              data-open
            >
              Tooltip on {side.toLowerCase()}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function DropdownPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div data-coral-dropdown className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        data-coral-button
        data-variant="outline"
      >
        Options
        <svg className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div data-coral-dropdown-content data-open>
          <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
          <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Duplicate
          </button>
          <div data-coral-dropdown-separator />
          <button data-coral-dropdown-item data-destructive onClick={() => setIsOpen(false)}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            Delete
          </button>
        </div>
      )}
    </div>
  )
}

function ContextMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    setPosition({ x: e.clientX, y: e.clientY })
    setIsOpen(true)
  }

  return (
    <>
      <div
        onContextMenu={handleContextMenu}
        data-coral-card
        data-variant="outline"
        className="w-64 h-32 flex items-center justify-center cursor-context-menu"
        style={{ borderStyle: 'dashed' }}
      >
        <span className="text-muted-foreground">Right-click here</span>
      </div>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div
            data-coral-context-menu-content
            data-open
            style={{ position: 'fixed', left: position.x, top: position.y }}
          >
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Cut</button>
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Copy</button>
            <button data-coral-dropdown-item onClick={() => setIsOpen(false)}>Paste</button>
            <div data-coral-dropdown-separator />
            <button data-coral-dropdown-item data-destructive onClick={() => setIsOpen(false)}>Delete</button>
          </div>
        </>
      )}
    </>
  )
}

function SheetPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        data-coral-button
        data-variant="primary"
      >
        Open Sheet
      </button>
      {isOpen && (
        <div data-coral-sheet-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-sheet-content data-open>
            <div data-coral-sheet-handle />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-2">Sheet Title</h2>
              <p className="text-muted-foreground mb-6">
                This is a mobile-friendly sheet that slides up from the bottom.
              </p>
              <button
                onClick={() => setIsOpen(false)}
                data-coral-button
                data-variant="primary"
                className="w-full"
              >
                Close Sheet
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function LightboxPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="w-32 h-24 bg-gradient-to-br from-primary to-accent rounded-lg cursor-pointer hover:scale-105 transition-transform"
      />
      {isOpen && (
        <div data-coral-lightbox-backdrop data-open onClick={() => setIsOpen(false)}>
          <button data-coral-lightbox-close aria-label="Close">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button data-coral-lightbox-nav data-prev aria-label="Previous">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="w-96 h-64 bg-gradient-to-br from-primary to-accent rounded-lg" onClick={(e) => e.stopPropagation()} />
          <button data-coral-lightbox-nav data-next aria-label="Next">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}

function AlertDialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="destructive">
        Delete Item
      </button>
      {isOpen && (
        <div data-coral-dialog-backdrop data-open onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}>
          <div data-coral-dialog-content role="alertdialog" aria-modal="true" className="max-w-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center">
                <svg className="w-5 h-5 text-error" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-foreground">Are you sure?</h2>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsOpen(false)} data-coral-button data-variant="outline">Cancel</button>
              <button onClick={() => setIsOpen(false)} data-coral-button data-variant="destructive">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function HoverCardPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className="flex items-center gap-2 text-primary hover:underline"
      >
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">JD</div>
        @johndoe
      </button>
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-64 p-4 bg-card rounded-xl border border-border shadow-xl z-50">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-lg font-medium text-primary">JD</div>
            <div>
              <div className="font-semibold text-foreground">John Doe</div>
              <div className="text-sm text-muted-foreground">@johndoe</div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground mb-3">Full-stack developer. Building cool stuff with React and TypeScript.</p>
          <div className="flex gap-4 text-sm">
            <span><strong className="text-foreground">1.2k</strong> <span className="text-muted-foreground">followers</span></span>
            <span><strong className="text-foreground">500</strong> <span className="text-muted-foreground">following</span></span>
          </div>
        </div>
      )}
    </div>
  )
}

function ImageGalleryPreview() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const images = [
    { color: 'from-primary to-accent' },
    { color: 'from-info to-primary' },
    { color: 'from-success to-info' },
    { color: 'from-warning to-success' },
  ]
  return (
    <>
      <div className="grid grid-cols-2 gap-2 w-64">
        {images.map((img, i) => (
          <div
            key={i}
            onClick={() => setSelectedIndex(i)}
            className={`h-24 bg-gradient-to-br ${img.color} rounded-lg cursor-pointer hover:scale-105 transition-transform`}
          />
        ))}
      </div>
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            onClick={() => setSelectedIndex(null)}
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <button
            className="absolute left-4 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + images.length) % images.length); }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className={`w-96 h-64 bg-gradient-to-br ${images[selectedIndex].color} rounded-lg`} onClick={(e) => e.stopPropagation()} />
          <button
            className="absolute right-4 text-white/80 hover:text-white"
            onClick={(e) => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length); }}
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <div className="absolute bottom-4 flex gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setSelectedIndex(i); }}
                className={`w-2 h-2 rounded-full ${i === selectedIndex ? 'bg-white' : 'bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

function BackdropPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Show Backdrop
      </button>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >
          <div className="p-6 bg-card rounded-xl border border-border text-center" onClick={(e) => e.stopPropagation()}>
            <p className="text-foreground mb-4">Click outside to close</p>
            <button onClick={() => setIsOpen(false)} data-coral-button data-variant="primary">Close</button>
          </div>
        </div>
      )}
    </>
  )
}

function NotificationCenterPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const notifications = [
    { id: 1, title: 'New message', desc: 'You have a new message from John', time: '2m ago', unread: true },
    { id: 2, title: 'Order shipped', desc: 'Your order #1234 has been shipped', time: '1h ago', unread: true },
    { id: 3, title: 'Welcome!', desc: 'Thanks for signing up', time: '2d ago', unread: false },
  ]
  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg hover:bg-muted"
      >
        <svg className="w-6 h-6 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        <span className="absolute top-1 right-1 w-2 h-2 bg-error rounded-full" />
      </button>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card rounded-xl border border-border shadow-xl z-50">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold text-foreground">Notifications</h3>
            <button className="text-sm text-primary">Mark all read</button>
          </div>
          <div className="max-h-80 overflow-auto">
            {notifications.map((n) => (
              <div key={n.id} className={`p-4 border-b border-border hover:bg-muted/50 cursor-pointer ${n.unread ? 'bg-primary/5' : ''}`}>
                <div className="flex items-start gap-3">
                  {n.unread && <div className="w-2 h-2 mt-2 bg-primary rounded-full flex-shrink-0" />}
                  <div className={n.unread ? '' : 'ml-5'}>
                    <p className="text-sm font-medium text-foreground">{n.title}</p>
                    <p className="text-sm text-muted-foreground">{n.desc}</p>
                    <p className="text-xs text-muted-foreground mt-1">{n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="p-3 text-center">
            <button className="text-sm text-primary hover:underline">View all notifications</button>
          </div>
        </div>
      )}
    </div>
  )
}

function ModalStackPreview() {
  const [modals, setModals] = useState<number[]>([])
  const openModal = () => setModals([...modals, modals.length + 1])
  const closeModal = () => setModals(modals.slice(0, -1))
  return (
    <>
      <button onClick={openModal} data-coral-button data-variant="primary">
        Open Modal
      </button>
      {modals.map((level, index) => (
        <div
          key={level}
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 50 + index }}
        >
          <div className="absolute inset-0 bg-black/50" onClick={closeModal} />
          <div
            className="relative p-6 bg-card rounded-xl border border-border shadow-xl"
            style={{ transform: `translate(${index * 20}px, ${index * 20}px)` }}
          >
            <h3 className="text-lg font-semibold text-foreground mb-2">Modal Level {level}</h3>
            <p className="text-muted-foreground mb-4">This is a stacked modal.</p>
            <div className="flex gap-2">
              <button onClick={closeModal} data-coral-button data-variant="outline">Close</button>
              <button onClick={openModal} data-coral-button data-variant="primary">Open Another</button>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

function CommandPalettePreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')
  const commands = [
    { icon: 'M12 4v16m8-8H4', label: 'Create new file', shortcut: 'Ctrl+N' },
    { icon: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z', label: 'Search', shortcut: 'Ctrl+K' },
    { icon: '10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35', label: 'Settings', shortcut: 'Ctrl+,' },
  ].filter(c => c.label.toLowerCase().includes(query.toLowerCase()))
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="outline">
        <kbd className="text-xs bg-muted px-1.5 py-0.5 rounded mr-2">Ctrl+K</kbd>
        Search...
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-start justify-center pt-20 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative w-full max-w-lg bg-card rounded-xl border border-border shadow-2xl overflow-hidden">
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type a command..."
                className="flex-1 bg-transparent outline-none text-foreground"
                autoFocus
              />
              <kbd className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">Esc</kbd>
            </div>
            <div className="max-h-64 overflow-auto p-2">
              {commands.map((cmd) => (
                <button
                  key={cmd.label}
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted text-left"
                >
                  <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cmd.icon} />
                  </svg>
                  <span className="flex-1 text-foreground">{cmd.label}</span>
                  <kbd className="text-xs bg-muted px-1.5 py-0.5 rounded text-muted-foreground">{cmd.shortcut}</kbd>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FullscreenModalPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Open Fullscreen
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-background z-50 overflow-auto">
          <div className="sticky top-0 flex items-center justify-between p-4 border-b border-border bg-card">
            <h2 className="text-lg font-semibold text-foreground">Fullscreen Modal</h2>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg">
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-4">Full Screen Content</h1>
            <p className="text-muted-foreground mb-4">This modal takes up the entire screen, perfect for complex forms or immersive content.</p>
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-32 bg-muted rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SlideoverPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Open Slideover
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-96 bg-card border-l border-border shadow-xl animate-in slide-in-from-right">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground">Slideover Panel</h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <p className="text-muted-foreground mb-4">This is a slideover panel that slides in from the right side of the screen.</p>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">Section 1</h4>
                  <p className="text-sm text-muted-foreground">Content goes here</p>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <h4 className="font-medium text-foreground mb-1">Section 2</h4>
                  <p className="text-sm text-muted-foreground">More content here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

const overlayComponents = [
  {
    id: 'dialog',
    name: 'Dialog',
    description: 'A modal dialog component with backdrop and focus trapping.',
    usage: `<div data-coral-dialog>
  <button data-coral-dialog-trigger>Open Dialog</button>
  <div data-coral-dialog-backdrop>
    <div data-coral-dialog-content role="dialog" aria-modal="true">
      <h2 data-coral-dialog-title>Dialog Title</h2>
      <p data-coral-dialog-description>Dialog content here...</p>
      <button data-coral-dialog-close>Close</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Control open state' },
      { name: 'data-modal', type: 'boolean', default: 'true', description: 'Enable modal behavior' },
      { name: 'data-close-on-escape', type: 'boolean', default: 'true', description: 'Close on Escape key' },
      { name: 'data-close-on-backdrop', type: 'boolean', default: 'true', description: 'Close on backdrop click' },
    ],
    preview: DialogPreview,
  },
  {
    id: 'drawer',
    name: 'Drawer',
    description: 'A sliding panel that emerges from the edge of the screen.',
    usage: `<div data-coral-drawer data-position="right">
  <button data-coral-drawer-trigger>Open Drawer</button>
  <div data-coral-drawer-backdrop>
    <div data-coral-drawer-content>
      <h2>Drawer Content</h2>
      <button data-coral-drawer-close>Close</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"left" | "right" | "top" | "bottom"', default: '"right"', description: 'Slide-in position' },
      { name: 'data-size', type: '"sm" | "md" | "lg" | "full"', default: '"md"', description: 'Drawer width/height' },
    ],
    preview: DrawerPreview,
  },
  {
    id: 'popover',
    name: 'Popover',
    description: 'A floating panel anchored to a trigger element.',
    usage: `<div data-coral-popover>
  <button data-coral-popover-trigger>Open Popover</button>
  <div data-coral-popover-content data-side="bottom">
    <p>Popover content here</p>
  </div>
</div>`,
    props: [
      { name: 'data-side', type: '"top" | "right" | "bottom" | "left"', default: '"bottom"', description: 'Preferred placement' },
      { name: 'data-align', type: '"start" | "center" | "end"', default: '"center"', description: 'Alignment on the side' },
    ],
    preview: PopoverPreview,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'A brief informational popup on hover or focus.',
    usage: `<div data-coral-tooltip>
  <button data-coral-tooltip-trigger>Hover me</button>
  <div data-coral-tooltip-content data-side="top">
    Tooltip text here
  </div>
</div>`,
    props: [
      { name: 'data-side', type: '"top" | "right" | "bottom" | "left"', default: '"top"', description: 'Tooltip position' },
      { name: 'data-delay', type: 'number', default: '200', description: 'Show delay in ms' },
    ],
    preview: TooltipPreview,
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'A dropdown menu with keyboard navigation.',
    usage: `<div data-coral-dropdown>
  <button data-coral-dropdown-trigger>
    Options
    <svg><!-- chevron icon --></svg>
  </button>
  <div data-coral-dropdown-content>
    <button data-coral-dropdown-item>Edit</button>
    <button data-coral-dropdown-item>Delete</button>
    <div data-coral-dropdown-separator></div>
    <button data-coral-dropdown-item>Settings</button>
  </div>
</div>`,
    props: [
      { name: 'data-align', type: '"start" | "center" | "end"', default: '"start"', description: 'Menu alignment' },
      { name: 'data-side', type: '"top" | "bottom"', default: '"bottom"', description: 'Open direction' },
    ],
    preview: DropdownPreview,
  },
  {
    id: 'context-menu',
    name: 'ContextMenu',
    description: 'A right-click context menu with nested submenus.',
    usage: `<div data-coral-context-menu>
  <div data-coral-context-menu-trigger>
    Right click this area
  </div>
  <div data-coral-context-menu-content>
    <button data-coral-context-menu-item>Cut</button>
    <button data-coral-context-menu-item>Copy</button>
    <button data-coral-context-menu-item>Paste</button>
  </div>
</div>`,
    props: [
      { name: 'data-disabled', type: 'boolean', default: 'false', description: 'Disable context menu' },
    ],
    preview: ContextMenuPreview,
  },
  {
    id: 'sheet',
    name: 'Sheet',
    description: 'A modal sheet that slides up from the bottom (mobile-friendly).',
    usage: `<div data-coral-sheet>
  <button data-coral-sheet-trigger>Open Sheet</button>
  <div data-coral-sheet-backdrop>
    <div data-coral-sheet-content>
      <div data-coral-sheet-handle></div>
      <h2>Sheet Content</h2>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-snap-points', type: 'number[]', default: '[0.5, 1]', description: 'Height snap points' },
      { name: 'data-draggable', type: 'boolean', default: 'true', description: 'Enable drag to resize' },
    ],
    preview: SheetPreview,
  },
  {
    id: 'lightbox',
    name: 'Lightbox',
    description: 'A fullscreen image/media viewer with navigation.',
    usage: `<div data-coral-lightbox>
  <img data-coral-lightbox-trigger src="..." alt="..." />
  <div data-coral-lightbox-backdrop>
    <img data-coral-lightbox-content src="..." alt="..." />
    <button data-coral-lightbox-prev>Prev</button>
    <button data-coral-lightbox-next>Next</button>
    <button data-coral-lightbox-close>Close</button>
  </div>
</div>`,
    props: [
      { name: 'data-zoom', type: 'boolean', default: 'true', description: 'Enable zoom on click' },
      { name: 'data-loop', type: 'boolean', default: 'true', description: 'Loop through images' },
    ],
    preview: LightboxPreview,
  },
  {
    id: 'alert-dialog',
    name: 'AlertDialog',
    description: 'A confirmation dialog for destructive or irreversible actions.',
    usage: `<div data-coral-alert-dialog>
  <button data-coral-alert-dialog-trigger>Delete</button>
  <div data-coral-alert-dialog-content role="alertdialog">
    <h2>Are you sure?</h2>
    <p>This action cannot be undone.</p>
    <div data-coral-alert-dialog-actions>
      <button data-coral-alert-dialog-cancel>Cancel</button>
      <button data-coral-alert-dialog-confirm>Delete</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"warning" | "destructive"', default: '"destructive"', description: 'Alert style' },
    ],
    preview: AlertDialogPreview,
  },
  {
    id: 'hover-card',
    name: 'HoverCard',
    description: 'A card that appears on hover to show additional information.',
    usage: `<div data-coral-hover-card>
  <a data-coral-hover-card-trigger href="#">@username</a>
  <div data-coral-hover-card-content>
    <div>User profile card content</div>
  </div>
</div>`,
    props: [
      { name: 'data-delay', type: 'number', default: '200', description: 'Open delay in ms' },
      { name: 'data-side', type: '"top" | "bottom"', default: '"bottom"', description: 'Card position' },
    ],
    preview: HoverCardPreview,
  },
  {
    id: 'image-gallery',
    name: 'ImageGallery',
    description: 'A fullscreen image gallery with thumbnail navigation.',
    usage: `<div data-coral-image-gallery>
  <div data-coral-gallery-grid>
    <img data-coral-gallery-item src="..." />
  </div>
  <div data-coral-gallery-lightbox>
    <img data-coral-gallery-image />
    <div data-coral-gallery-thumbnails />
  </div>
</div>`,
    props: [
      { name: 'data-columns', type: '2 | 3 | 4', default: '3', description: 'Grid columns' },
      { name: 'data-gap', type: 'number', default: '4', description: 'Grid gap' },
    ],
    preview: ImageGalleryPreview,
  },
  {
    id: 'backdrop',
    name: 'Backdrop',
    description: 'A standalone backdrop/overlay component with blur effect.',
    usage: `<div data-coral-backdrop data-open>
  <div data-coral-backdrop-content>
    Content above backdrop
  </div>
</div>`,
    props: [
      { name: 'data-blur', type: 'boolean', default: 'true', description: 'Enable blur effect' },
      { name: 'data-opacity', type: 'number', default: '50', description: 'Backdrop opacity' },
    ],
    preview: BackdropPreview,
  },
  {
    id: 'notification-center',
    name: 'NotificationCenter',
    description: 'A notification dropdown with grouped notifications.',
    usage: `<div data-coral-notification-center>
  <button data-coral-notification-trigger>
    <span data-coral-notification-badge>3</span>
  </button>
  <div data-coral-notification-list>
    <div data-coral-notification-item data-unread>...</div>
  </div>
</div>`,
    props: [
      { name: 'data-max-items', type: 'number', default: '10', description: 'Max visible items' },
    ],
    preview: NotificationCenterPreview,
  },
  {
    id: 'modal-stack',
    name: 'ModalStack',
    description: 'Support for stacking multiple modals on top of each other.',
    usage: `<div data-coral-modal-stack>
  <div data-coral-modal data-level="1">First modal</div>
  <div data-coral-modal data-level="2">Second modal</div>
</div>`,
    props: [
      { name: 'data-max-stack', type: 'number', default: '3', description: 'Maximum stack depth' },
    ],
    preview: ModalStackPreview,
  },
  {
    id: 'command-palette',
    name: 'CommandPalette',
    description: 'A searchable command palette with keyboard shortcuts.',
    usage: `<div data-coral-command-palette>
  <input data-coral-command-input placeholder="Search..." />
  <div data-coral-command-list>
    <button data-coral-command-item>
      <span>Command</span>
      <kbd>Ctrl+K</kbd>
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-hotkey', type: 'string', default: '"ctrl+k"', description: 'Trigger hotkey' },
    ],
    preview: CommandPalettePreview,
  },
  {
    id: 'fullscreen-modal',
    name: 'FullscreenModal',
    description: 'A modal that takes up the entire viewport.',
    usage: `<div data-coral-fullscreen-modal>
  <button data-coral-fullscreen-modal-trigger>Open</button>
  <div data-coral-fullscreen-modal-content>
    Full screen content here
  </div>
</div>`,
    props: [
      { name: 'data-scroll', type: 'boolean', default: 'true', description: 'Allow scrolling' },
    ],
    preview: FullscreenModalPreview,
  },
  {
    id: 'slideover',
    name: 'Slideover',
    description: 'A panel that slides in from the side of the screen.',
    usage: `<div data-coral-slideover data-position="right">
  <button data-coral-slideover-trigger>Open</button>
  <div data-coral-slideover-content>
    Slideover panel content
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"left" | "right"', default: '"right"', description: 'Slide from side' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Panel width' },
    ],
    preview: SlideoverPreview,
  },
]

function OverlaysPage() {
  return (
    <ComponentPageLayout
      categoryName="Overlays"
      categoryId="overlays"
      components={overlayComponents}
      accessibilityFeatures={[
        'Focus trapping',
        'ARIA modal support',
        'Escape key close',
        'Backdrop click handling',
      ]}
    />
  )
}

export default OverlaysPage
