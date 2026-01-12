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

function SidePanelPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [side, setSide] = useState<'left' | 'right'>('right')
  return (
    <>
      <div className="flex gap-2">
        <button onClick={() => { setSide('left'); setIsOpen(true) }} data-coral-button data-variant="outline">
          Open Left
        </button>
        <button onClick={() => { setSide('right'); setIsOpen(true) }} data-coral-button data-variant="primary">
          Open Right
        </button>
      </div>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className={`absolute top-0 bottom-0 w-80 bg-card border-${side === 'left' ? 'r' : 'l'} border-border shadow-xl ${side === 'left' ? 'left-0' : 'right-0'}`}>
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h3 className="font-semibold text-foreground">Side Panel</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-muted rounded">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4">
              <p className="text-muted-foreground">Panel content from the {side} side.</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SnackbarOverlayPreview() {
  const [snackbars, setSnackbars] = useState<Array<{ id: number; message: string; type: string }>>([])

  const addSnackbar = (type: string) => {
    const id = Date.now()
    const messages = { success: 'Operation successful!', error: 'Something went wrong', info: 'Update available' }
    setSnackbars(prev => [...prev, { id, message: messages[type as keyof typeof messages], type }])
    setTimeout(() => setSnackbars(prev => prev.filter(s => s.id !== id)), 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => addSnackbar('success')} data-coral-button data-variant="primary" data-size="sm">Success</button>
        <button onClick={() => addSnackbar('error')} data-coral-button data-variant="destructive" data-size="sm">Error</button>
        <button onClick={() => addSnackbar('info')} data-coral-button data-variant="outline" data-size="sm">Info</button>
      </div>
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 flex flex-col gap-2 z-50" style={{ position: 'relative', transform: 'none' }}>
        {snackbars.map(s => (
          <div key={s.id} className={`px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom ${
            s.type === 'success' ? 'bg-emerald-500 text-white' : s.type === 'error' ? 'bg-red-500 text-white' : 'bg-card border border-border'
          }`}>
            <span className="text-sm">{s.message}</span>
            <button onClick={() => setSnackbars(prev => prev.filter(x => x.id !== s.id))} className="opacity-70 hover:opacity-100">×</button>
          </div>
        ))}
      </div>
    </div>
  )
}

function ImageZoomPreview() {
  const [zoomed, setZoomed] = useState(false)
  return (
    <>
      <div
        onClick={() => setZoomed(true)}
        className="w-32 h-24 bg-gradient-to-br from-primary to-accent rounded-lg cursor-zoom-in hover:scale-105 transition-transform"
      />
      {zoomed && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center cursor-zoom-out" onClick={() => setZoomed(false)}>
          <div className="w-[80vw] h-[70vh] bg-gradient-to-br from-primary to-accent rounded-lg" />
        </div>
      )}
    </>
  )
}

function VideoOverlayPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary" className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Play Video
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center" onClick={() => setIsOpen(false)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="w-[80vw] max-w-4xl aspect-video bg-black rounded-lg flex items-center justify-center" onClick={e => e.stopPropagation()}>
            <div className="text-center text-white/50">
              <svg className="w-16 h-16 mx-auto mb-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              <p className="text-sm">Video Player</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function ConfirmDialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [result, setResult] = useState<string | null>(null)

  const handleConfirm = (confirmed: boolean) => {
    setResult(confirmed ? 'Confirmed!' : 'Cancelled')
    setIsOpen(false)
    setTimeout(() => setResult(null), 2000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Show Confirm
      </button>
      {result && <p className="text-sm text-muted-foreground">{result}</p>}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => handleConfirm(false)} />
          <div className="relative bg-card p-6 rounded-xl border border-border shadow-xl max-w-sm text-center">
            <h3 className="text-lg font-semibold text-foreground mb-2">Confirm Action</h3>
            <p className="text-muted-foreground mb-4">Are you sure you want to proceed with this action?</p>
            <div className="flex gap-2 justify-center">
              <button onClick={() => handleConfirm(false)} data-coral-button data-variant="outline">Cancel</button>
              <button onClick={() => handleConfirm(true)} data-coral-button data-variant="primary">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PromptDialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [value, setValue] = useState('')
  const [result, setResult] = useState<string | null>(null)

  const handleSubmit = () => {
    setResult(value || 'No input')
    setIsOpen(false)
    setValue('')
    setTimeout(() => setResult(null), 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Show Prompt
      </button>
      {result && <p className="text-sm text-muted-foreground">You entered: {result}</p>}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-card p-6 rounded-xl border border-border shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-2">Enter Your Name</h3>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground mb-4"
              placeholder="Type here..."
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button onClick={() => setIsOpen(false)} data-coral-button data-variant="outline">Cancel</button>
              <button onClick={handleSubmit} data-coral-button data-variant="primary">Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CookieConsentPreview() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">Show Cookie Banner</button>
  }

  return (
    <div data-coral-cookie-consent className="w-full max-w-2xl p-4 bg-card border border-border rounded-lg shadow-lg">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg">
          <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-foreground mb-1">Cookie Settings</h4>
          <p className="text-sm text-muted-foreground mb-3">
            We use cookies to improve your experience. By continuing, you agree to our cookie policy.
          </p>
          <div className="flex flex-wrap gap-2">
            <button onClick={() => setVisible(false)} data-coral-button data-variant="primary" data-size="sm">Accept All</button>
            <button onClick={() => setVisible(false)} data-coral-button data-variant="outline" data-size="sm">Reject All</button>
            <button onClick={() => setVisible(false)} data-coral-button data-variant="ghost" data-size="sm">Customize</button>
          </div>
        </div>
      </div>
    </div>
  )
}

function SpotlightPreview() {
  const [step, setStep] = useState(0)
  const steps = [
    { target: 'btn1', title: 'Welcome!', desc: 'This is the first button' },
    { target: 'btn2', title: 'Second Step', desc: 'Click here for settings' },
    { target: 'btn3', title: 'Final Step', desc: 'All done!' },
  ]

  if (step >= steps.length) {
    return <button onClick={() => setStep(0)} data-coral-button data-variant="primary">Restart Tour</button>
  }

  return (
    <div className="relative">
      <div className="flex gap-4 p-8 bg-muted/50 rounded-lg">
        <button id="btn1" data-coral-button data-variant={step === 0 ? 'primary' : 'outline'}>Home</button>
        <button id="btn2" data-coral-button data-variant={step === 1 ? 'primary' : 'outline'}>Settings</button>
        <button id="btn3" data-coral-button data-variant={step === 2 ? 'primary' : 'outline'}>Profile</button>
      </div>
      <div className="absolute top-full left-0 mt-4 p-4 bg-card border border-border rounded-lg shadow-xl w-64">
        <h4 className="font-semibold text-foreground mb-1">{steps[step].title}</h4>
        <p className="text-sm text-muted-foreground mb-3">{steps[step].desc}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">{step + 1} of {steps.length}</span>
          <button onClick={() => setStep(step + 1)} data-coral-button data-variant="primary" data-size="sm">
            {step === steps.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}

function AnnouncementPopupPreview() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">Show Announcement</button>
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50" style={{ position: 'relative' }}>
      <div className="bg-card p-6 rounded-xl border border-border shadow-2xl max-w-md text-center">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">New Feature Released!</h3>
        <p className="text-muted-foreground mb-4">We've added dark mode support. Try it out in settings!</p>
        <button onClick={() => setVisible(false)} data-coral-button data-variant="primary" className="w-full">Got it!</button>
      </div>
    </div>
  )
}

function LoadingOverlayPreview() {
  const [loading, setLoading] = useState(false)

  const startLoading = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="relative">
      <div className="p-8 bg-card border border-border rounded-lg">
        <p className="text-foreground mb-4">Content area</p>
        <button onClick={startLoading} data-coral-button data-variant="primary">Start Loading</button>
      </div>
      {loading && (
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm rounded-lg flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-muted-foreground">Loading...</span>
          </div>
        </div>
      )}
    </div>
  )
}

function MediaPreviewPreview() {
  const [preview, setPreview] = useState<{ type: string; name: string } | null>(null)
  const files = [
    { type: 'image', name: 'photo.jpg' },
    { type: 'video', name: 'movie.mp4' },
    { type: 'audio', name: 'song.mp3' },
  ]

  return (
    <>
      <div className="flex gap-2">
        {files.map(f => (
          <button key={f.name} onClick={() => setPreview(f)} className="p-3 bg-muted rounded-lg hover:bg-muted/80">
            <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {f.type === 'image' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
              {f.type === 'video' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />}
              {f.type === 'audio' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />}
            </svg>
            <span className="text-xs mt-1 block">{f.name}</span>
          </button>
        ))}
      </div>
      {preview && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center" onClick={() => setPreview(null)}>
          <button className="absolute top-4 right-4 text-white">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <div className="text-center text-white" onClick={e => e.stopPropagation()}>
            <div className="w-64 h-48 bg-muted rounded-lg mb-4 flex items-center justify-center">
              <span className="text-4xl">{preview.type === 'image' ? '🖼️' : preview.type === 'video' ? '🎬' : '🎵'}</span>
            </div>
            <p className="text-lg">{preview.name}</p>
          </div>
        </div>
      )}
    </>
  )
}

function ShareDialogPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const platforms = [
    { name: 'Twitter', color: 'bg-blue-400' },
    { name: 'Facebook', color: 'bg-blue-600' },
    { name: 'LinkedIn', color: 'bg-blue-700' },
    { name: 'Email', color: 'bg-gray-500' },
  ]

  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary" className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
        Share
      </button>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="relative bg-card p-6 rounded-xl border border-border shadow-xl w-full max-w-sm">
            <h3 className="text-lg font-semibold text-foreground mb-4">Share</h3>
            <div className="grid grid-cols-4 gap-3 mb-4">
              {platforms.map(p => (
                <button key={p.name} className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted">
                  <div className={`w-10 h-10 ${p.color} rounded-full`} />
                  <span className="text-xs text-muted-foreground">{p.name}</span>
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
              <input type="text" value="https://example.com/share" readOnly className="flex-1 bg-transparent text-sm text-foreground" />
              <button data-coral-button data-variant="primary" data-size="sm">Copy</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function SearchOverlayPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState('')

  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="outline" className="flex items-center gap-2">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Search
      </button>
      {isOpen && (
        <div className="fixed inset-0 bg-background/95 backdrop-blur z-50">
          <div className="max-w-2xl mx-auto pt-20 px-4">
            <div className="flex items-center gap-3 mb-8">
              <svg className="w-6 h-6 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search anything..."
                className="flex-1 bg-transparent text-2xl text-foreground outline-none"
                autoFocus
              />
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {query && (
              <div className="space-y-2">
                {['Search Result 1', 'Search Result 2', 'Search Result 3'].map((r, i) => (
                  <div key={i} className="p-4 bg-card border border-border rounded-lg hover:bg-muted cursor-pointer">
                    <p className="text-foreground">{r}</p>
                    <p className="text-sm text-muted-foreground">Description for {query}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function QuickActionsPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const actions = [
    { icon: 'M12 4v16m8-8H4', label: 'New' },
    { icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12', label: 'Upload' },
    { icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684', label: 'Share' },
  ]

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center transition-transform ${isOpen ? 'rotate-45' : ''}`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          {actions.map((a, i) => (
            <button
              key={i}
              className="w-12 h-12 rounded-full bg-card border border-border shadow-lg flex items-center justify-center hover:bg-muted"
              title={a.label}
            >
              <svg className="w-5 h-5 text-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
              </svg>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function ActionSheetPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const actions = [
    { label: 'Edit', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { label: 'Share', icon: 'M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684' },
    { label: 'Download', icon: 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4' },
    { label: 'Delete', icon: 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16', destructive: true },
  ]

  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Show Action Sheet
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-center" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-md mb-4 mx-4" onClick={e => e.stopPropagation()}>
            <div className="bg-card rounded-xl overflow-hidden">
              {actions.map((a, i) => (
                <button
                  key={i}
                  onClick={() => setIsOpen(false)}
                  className={`w-full p-4 flex items-center gap-3 hover:bg-muted border-b border-border last:border-0 ${
                    a.destructive ? 'text-red-500' : 'text-foreground'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={a.icon} />
                  </svg>
                  {a.label}
                </button>
              ))}
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-full mt-2 p-4 bg-card rounded-xl text-primary font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  )
}

function BottomSheetPreview() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(true)} data-coral-button data-variant="primary">
        Open Bottom Sheet
      </button>
      {isOpen && (
        <div className="fixed inset-0 z-50" onClick={() => setIsOpen(false)}>
          <div className="absolute inset-0 bg-black/50" />
          <div
            className="absolute bottom-0 left-0 right-0 bg-card rounded-t-2xl p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">Bottom Sheet</h3>
            <p className="text-muted-foreground mb-4">Swipe down or tap outside to close.</p>
            <div className="grid grid-cols-4 gap-4">
              {['📷', '📁', '📍', '👤'].map((emoji, i) => (
                <button key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center text-2xl">
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function FlyoutMenuPreview() {
  const [isOpen, setIsOpen] = useState(false)
  const items = [
    { label: 'Products', children: ['Electronics', 'Clothing', 'Books'] },
    { label: 'Services', children: ['Consulting', 'Support', 'Training'] },
  ]

  return (
    <div className="relative">
      <button
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        data-coral-button
        data-variant="primary"
      >
        Hover Menu
      </button>
      {isOpen && (
        <div
          className="absolute top-full left-0 mt-2 flex"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="bg-card border border-border rounded-lg shadow-xl p-2">
            {items.map((item, i) => (
              <div key={i} className="group relative">
                <button className="w-full px-4 py-2 text-left hover:bg-muted rounded flex items-center justify-between">
                  {item.label}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
                <div className="absolute left-full top-0 ml-2 hidden group-hover:block">
                  <div className="bg-card border border-border rounded-lg shadow-xl p-2">
                    {item.children.map((child, j) => (
                      <button key={j} className="block w-full px-4 py-2 text-left hover:bg-muted rounded whitespace-nowrap">
                        {child}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function PictureInPicturePreview() {
  const [isMinimized, setIsMinimized] = useState(false)

  return (
    <div className="relative w-full max-w-md">
      {!isMinimized ? (
        <div className="aspect-video bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
          <button
            onClick={() => setIsMinimized(true)}
            className="p-3 bg-black/50 rounded-lg text-white hover:bg-black/70"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="h-32 bg-muted rounded-lg flex items-center justify-center text-muted-foreground">
          Main content area
        </div>
      )}
      {isMinimized && (
        <div className="absolute bottom-4 right-4 w-40 aspect-video bg-gradient-to-br from-primary to-accent rounded-lg shadow-xl flex items-center justify-center cursor-pointer" onClick={() => setIsMinimized(false)}>
          <button className="p-2 bg-black/50 rounded-lg text-white text-xs">
            Expand
          </button>
        </div>
      )}
    </div>
  )
}

function InspectorPanelPreview() {
  const [selected, setSelected] = useState<string | null>(null)
  const items = ['Item A', 'Item B', 'Item C']

  return (
    <div className="flex gap-4 w-full max-w-lg">
      <div className="flex-1 p-4 bg-card border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Items</h4>
        <div className="space-y-2">
          {items.map(item => (
            <button
              key={item}
              onClick={() => setSelected(item)}
              className={`w-full p-3 rounded-lg text-left transition-colors ${
                selected === item ? 'bg-primary text-primary-foreground' : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      {selected && (
        <div className="w-48 p-4 bg-card border border-border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium text-foreground">Inspector</h4>
            <button onClick={() => setSelected(null)} className="text-muted-foreground hover:text-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-muted-foreground">Name</label>
              <p className="text-foreground">{selected}</p>
            </div>
            <div>
              <label className="text-muted-foreground">Type</label>
              <p className="text-foreground">Object</p>
            </div>
            <div>
              <label className="text-muted-foreground">Status</label>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded text-xs">Active</span>
            </div>
          </div>
        </div>
      )}
    </div>
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
  {
    id: 'side-panel',
    name: 'SidePanel',
    description: 'A panel that slides in from the left or right side.',
    usage: `<div data-coral-side-panel data-side="right" data-open>
  <div data-coral-side-panel-content>
    Panel content here
  </div>
</div>`,
    props: [
      { name: 'data-side', type: '"left" | "right"', default: '"right"', description: 'Panel side' },
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
    ],
    preview: SidePanelPreview,
  },
  {
    id: 'snackbar-overlay',
    name: 'SnackbarOverlay',
    description: 'A stacking snackbar notification system.',
    usage: `<div data-coral-snackbar-container>
  <div data-coral-snackbar data-type="success">
    Operation successful!
  </div>
</div>`,
    props: [
      { name: 'data-type', type: '"success" | "error" | "info"', default: '"info"', description: 'Snackbar type' },
      { name: 'data-duration', type: 'number', default: '3000', description: 'Auto-dismiss time' },
    ],
    preview: SnackbarOverlayPreview,
  },
  {
    id: 'image-zoom',
    name: 'ImageZoom',
    description: 'Click-to-zoom image overlay.',
    usage: `<div data-coral-image-zoom>
  <img src="..." data-coral-zoom-trigger />
</div>`,
    props: [
      { name: 'data-scale', type: 'number', default: '2', description: 'Zoom scale factor' },
    ],
    preview: ImageZoomPreview,
  },
  {
    id: 'video-overlay',
    name: 'VideoOverlay',
    description: 'A fullscreen video player overlay.',
    usage: `<div data-coral-video-overlay>
  <button data-coral-video-trigger>Play</button>
  <div data-coral-video-content>
    <video src="..." />
  </div>
</div>`,
    props: [
      { name: 'data-autoplay', type: 'boolean', default: 'false', description: 'Auto-play video' },
    ],
    preview: VideoOverlayPreview,
  },
  {
    id: 'confirm-dialog',
    name: 'ConfirmDialog',
    description: 'A simple confirmation dialog.',
    usage: `<div data-coral-confirm-dialog data-open>
  <h3>Confirm Action</h3>
  <p>Are you sure?</p>
  <button data-coral-confirm-cancel>Cancel</button>
  <button data-coral-confirm-ok>Confirm</button>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
    ],
    preview: ConfirmDialogPreview,
  },
  {
    id: 'prompt-dialog',
    name: 'PromptDialog',
    description: 'A dialog with text input for user input.',
    usage: `<div data-coral-prompt-dialog data-open>
  <h3>Enter Value</h3>
  <input data-coral-prompt-input />
  <button data-coral-prompt-submit>Submit</button>
</div>`,
    props: [
      { name: 'data-placeholder', type: 'string', default: '""', description: 'Input placeholder' },
    ],
    preview: PromptDialogPreview,
  },
  {
    id: 'cookie-consent',
    name: 'CookieConsent',
    description: 'A cookie consent banner overlay.',
    usage: `<div data-coral-cookie-consent data-visible>
  <p>We use cookies...</p>
  <button data-coral-cookie-accept>Accept</button>
  <button data-coral-cookie-reject>Reject</button>
</div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'true', description: 'Visibility state' },
      { name: 'data-position', type: '"top" | "bottom"', default: '"bottom"', description: 'Banner position' },
    ],
    preview: CookieConsentPreview,
  },
  {
    id: 'spotlight',
    name: 'Spotlight',
    description: 'A guided tour spotlight overlay for onboarding.',
    usage: `<div data-coral-spotlight data-step="1">
  <div data-coral-spotlight-target="#element" />
  <div data-coral-spotlight-content>
    <h4>Step 1</h4>
    <p>Description...</p>
  </div>
</div>`,
    props: [
      { name: 'data-step', type: 'number', default: '1', description: 'Current step' },
    ],
    preview: SpotlightPreview,
  },
  {
    id: 'announcement-popup',
    name: 'AnnouncementPopup',
    description: 'A centered announcement popup modal.',
    usage: `<div data-coral-announcement-popup data-open>
  <h3>New Feature!</h3>
  <p>Check out our latest update.</p>
  <button>Got it</button>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
    ],
    preview: AnnouncementPopupPreview,
  },
  {
    id: 'loading-overlay',
    name: 'LoadingOverlay',
    description: 'A loading spinner overlay for content areas.',
    usage: `<div data-coral-loading-overlay data-loading>
  <div data-coral-loading-spinner />
  <span>Loading...</span>
</div>`,
    props: [
      { name: 'data-loading', type: 'boolean', default: 'false', description: 'Loading state' },
      { name: 'data-blur', type: 'boolean', default: 'true', description: 'Blur backdrop' },
    ],
    preview: LoadingOverlayPreview,
  },
  {
    id: 'media-preview',
    name: 'MediaPreview',
    description: 'A media file preview overlay for images, videos, and audio.',
    usage: `<div data-coral-media-preview>
  <button data-coral-media-trigger>Preview</button>
  <div data-coral-media-content data-type="image">
    <img src="..." />
  </div>
</div>`,
    props: [
      { name: 'data-type', type: '"image" | "video" | "audio"', default: '"image"', description: 'Media type' },
    ],
    preview: MediaPreviewPreview,
  },
  {
    id: 'share-dialog',
    name: 'ShareDialog',
    description: 'A social sharing dialog overlay.',
    usage: `<div data-coral-share-dialog data-open>
  <h3>Share</h3>
  <div data-coral-share-platforms>
    <button data-coral-share-platform="twitter" />
    <button data-coral-share-platform="facebook" />
  </div>
  <input data-coral-share-link />
</div>`,
    props: [
      { name: 'data-url', type: 'string', default: '""', description: 'URL to share' },
    ],
    preview: ShareDialogPreview,
  },
  {
    id: 'search-overlay',
    name: 'SearchOverlay',
    description: 'A fullscreen search overlay with results.',
    usage: `<div data-coral-search-overlay data-open>
  <input data-coral-search-input placeholder="Search..." />
  <div data-coral-search-results>
    <div data-coral-search-result>Result 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
    ],
    preview: SearchOverlayPreview,
  },
  {
    id: 'quick-actions',
    name: 'QuickActions',
    description: 'A floating action button with expandable quick actions.',
    usage: `<div data-coral-quick-actions>
  <button data-coral-quick-action-trigger>+</button>
  <div data-coral-quick-action-menu>
    <button data-coral-quick-action>New</button>
    <button data-coral-quick-action>Upload</button>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"bottom-right" | "bottom-left"', default: '"bottom-right"', description: 'FAB position' },
    ],
    preview: QuickActionsPreview,
  },
  {
    id: 'action-sheet',
    name: 'ActionSheet',
    description: 'An iOS-style action sheet from bottom.',
    usage: `<div data-coral-action-sheet data-open>
  <button data-coral-action-item>Edit</button>
  <button data-coral-action-item>Share</button>
  <button data-coral-action-item data-destructive>Delete</button>
  <button data-coral-action-cancel>Cancel</button>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
    ],
    preview: ActionSheetPreview,
  },
  {
    id: 'bottom-sheet',
    name: 'BottomSheet',
    description: 'A draggable bottom sheet overlay.',
    usage: `<div data-coral-bottom-sheet data-open>
  <div data-coral-bottom-sheet-handle />
  <div data-coral-bottom-sheet-content>
    Content here
  </div>
</div>`,
    props: [
      { name: 'data-snap-points', type: 'number[]', default: '[0.5, 1]', description: 'Height snap points' },
    ],
    preview: BottomSheetPreview,
  },
  {
    id: 'flyout-menu',
    name: 'FlyoutMenu',
    description: 'A nested flyout menu on hover.',
    usage: `<div data-coral-flyout-menu>
  <button data-coral-flyout-trigger>Menu</button>
  <div data-coral-flyout-content>
    <button data-coral-flyout-item data-has-submenu>
      Products
      <div data-coral-flyout-submenu>
        <button>Electronics</button>
      </div>
    </button>
  </div>
</div>`,
    props: [
      { name: 'data-trigger', type: '"hover" | "click"', default: '"hover"', description: 'Open trigger' },
    ],
    preview: FlyoutMenuPreview,
  },
  {
    id: 'picture-in-picture',
    name: 'PictureInPicture',
    description: 'A picture-in-picture floating overlay.',
    usage: `<div data-coral-pip>
  <div data-coral-pip-content>Video player</div>
  <button data-coral-pip-minimize>Minimize</button>
</div>`,
    props: [
      { name: 'data-minimized', type: 'boolean', default: 'false', description: 'Minimized state' },
      { name: 'data-position', type: '"bottom-right" | "bottom-left"', default: '"bottom-right"', description: 'Mini position' },
    ],
    preview: PictureInPicturePreview,
  },
  {
    id: 'inspector-panel',
    name: 'InspectorPanel',
    description: 'A side inspector panel for item details.',
    usage: `<div data-coral-inspector-panel data-open>
  <h4>Inspector</h4>
  <div data-coral-inspector-content>
    Item details here
  </div>
</div>`,
    props: [
      { name: 'data-open', type: 'boolean', default: 'false', description: 'Open state' },
      { name: 'data-side', type: '"left" | "right"', default: '"right"', description: 'Panel side' },
    ],
    preview: InspectorPanelPreview,
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
