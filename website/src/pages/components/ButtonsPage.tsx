import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Button component data with detailed documentation
const buttonComponents = [
  {
    id: 'button',
    name: 'Button',
    description: 'A versatile button component with multiple variants, sizes, and states.',
    usage: `<button data-coral-button>Default</button>
<button data-coral-button data-variant="primary">Primary</button>
<button data-coral-button data-variant="secondary">Secondary</button>
<button data-coral-button data-variant="outline">Outline</button>
<button data-coral-button data-variant="ghost">Ghost</button>
<button data-coral-button data-variant="destructive">Destructive</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "secondary" | "outline" | "ghost" | "destructive"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Button size' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the button' },
      { name: 'data-loading', type: 'boolean', default: 'false', description: 'Show loading spinner' },
    ],
    preview: ButtonPreview,
  },
  {
    id: 'icon-button',
    name: 'IconButton',
    description: 'A button designed for icons with equal width and height.',
    usage: `<button data-coral-icon-button aria-label="Menu">
  <svg><!-- icon --></svg>
</button>

<button data-coral-icon-button data-size="lg" aria-label="Settings">
  <svg><!-- icon --></svg>
</button>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "ghost" | "outline"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'aria-label', type: 'string', default: 'required', description: 'Accessible label for screen readers' },
    ],
    preview: IconButtonPreview,
  },
  {
    id: 'button-group',
    name: 'ButtonGroup',
    description: 'Group related buttons together with connected styling.',
    usage: `<div data-coral-button-group>
  <button data-coral-button>Left</button>
  <button data-coral-button>Center</button>
  <button data-coral-button>Right</button>
</div>

<div data-coral-button-group data-orientation="vertical">
  <button data-coral-button>Top</button>
  <button data-coral-button>Bottom</button>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Group direction' },
      { name: 'data-attached', type: 'boolean', default: 'true', description: 'Remove gaps between buttons' },
    ],
    preview: ButtonGroupPreview,
  },
  {
    id: 'toggle-button',
    name: 'ToggleButton',
    description: 'A button that can be toggled on and off.',
    usage: `<button data-coral-toggle aria-pressed="false">
  Bold
</button>

<button data-coral-toggle aria-pressed="true">
  <svg><!-- icon --></svg>
  Italic
</button>`,
    props: [
      { name: 'aria-pressed', type: 'boolean', default: 'false', description: 'Whether the button is pressed' },
      { name: 'data-variant', type: '"default" | "outline"', default: '"default"', description: 'Visual style variant' },
    ],
    preview: ToggleButtonPreview,
  },
  {
    id: 'copy-button',
    name: 'CopyButton',
    description: 'A button that copies text to clipboard with visual feedback.',
    usage: `<button data-coral-button data-variant="outline">
  <svg><!-- copy icon --></svg>
  Copy
</button>`,
    props: [
      { name: 'data-value', type: 'string', default: 'required', description: 'Text to copy to clipboard' },
      { name: 'data-success-duration', type: 'number', default: '2000', description: 'How long to show success state (ms)' },
    ],
    preview: CopyButtonPreview,
  },
  {
    id: 'split-button',
    name: 'SplitButton',
    description: 'A button with a dropdown for additional actions.',
    usage: `<div data-coral-split-button>
  <button data-coral-split-button-main>
    Save
  </button>
  <button data-coral-split-button-trigger aria-label="More options">
    <svg><!-- chevron icon --></svg>
  </button>
  <div data-coral-split-button-menu>
    <button data-coral-split-button-item>Save as Draft</button>
    <button data-coral-split-button-item>Save & Publish</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"primary" | "secondary" | "outline"', default: '"primary"', description: 'Visual style variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: SplitButtonPreview,
  },
  {
    id: 'floating-button',
    name: 'FloatingButton',
    description: 'A floating action button (FAB) for primary actions.',
    usage: `<button data-coral-fab data-position="bottom-right">
  <svg><!-- plus icon --></svg>
</button>

<button data-coral-fab data-size="lg" data-extended>
  <svg><!-- icon --></svg>
  <span>New Item</span>
</button>`,
    props: [
      { name: 'data-position', type: '"bottom-right" | "bottom-left" | "top-right" | "top-left"', default: '"bottom-right"', description: 'Fixed position on screen' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
      { name: 'data-extended', type: 'boolean', default: 'false', description: 'Show text label' },
    ],
    preview: FloatingButtonPreview,
  },
  {
    id: 'like-button',
    name: 'LikeButton',
    description: 'An animated like/heart button with counter.',
    usage: `<button data-coral-like-button>
  <svg data-coral-like-icon><!-- heart icon --></svg>
  <span data-coral-like-count>42</span>
</button>`,
    props: [
      { name: 'data-liked', type: 'boolean', default: 'false', description: 'Whether the item is liked' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Enable animation on click' },
    ],
    preview: LikeButtonPreview,
  },
  {
    id: 'share-button',
    name: 'ShareButton',
    description: 'A button for sharing content via native share API or custom menu.',
    usage: `<button data-coral-button data-variant="outline"
  data-title="Check this out"
  data-url="https://example.com">
  Share
</button>`,
    props: [
      { name: 'data-title', type: 'string', default: '""', description: 'Share title' },
      { name: 'data-text', type: 'string', default: '""', description: 'Share text/description' },
      { name: 'data-url', type: 'string', default: 'current URL', description: 'URL to share' },
    ],
    preview: ShareButtonPreview,
  },
  {
    id: 'button-with-progress',
    name: 'ButtonWithProgress',
    description: 'A button with an integrated progress indicator for long-running actions.',
    usage: `<button data-coral-button data-progress data-progress-value="65">
  Upload File
</button>`,
    props: [
      { name: 'data-progress', type: 'boolean', default: 'false', description: 'Show progress bar' },
      { name: 'data-progress-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
    ],
    preview: ButtonWithProgressPreview,
  },
  {
    id: 'button-with-badge',
    name: 'ButtonWithBadge',
    description: 'A button with a notification badge counter.',
    usage: `<button data-coral-button data-variant="primary">
  Messages
  <span data-coral-badge data-count="5">5</span>
</button>`,
    props: [
      { name: 'data-count', type: 'number', default: '0', description: 'Badge count number' },
      { name: 'data-badge-variant', type: '"default" | "destructive" | "success"', default: '"default"', description: 'Badge style variant' },
    ],
    preview: ButtonWithBadgePreview,
  },
  {
    id: 'button-with-icon-badge',
    name: 'ButtonWithIconBadge',
    description: 'An icon button with a notification badge overlay.',
    usage: `<button data-coral-icon-button aria-label="Notifications">
  <svg><!-- bell icon --></svg>
  <span data-coral-badge data-count="3"></span>
</button>`,
    props: [
      { name: 'data-count', type: 'number', default: '0', description: 'Badge count number' },
      { name: 'data-dot', type: 'boolean', default: 'false', description: 'Show as dot only' },
    ],
    preview: ButtonWithIconBadgePreview,
  },
  {
    id: 'social-button',
    name: 'SocialButton',
    description: 'Pre-styled buttons for social media authentication and sharing.',
    usage: `<button data-coral-social-button data-provider="google">
  Continue with Google
</button>

<button data-coral-social-button data-provider="github">
  <svg><!-- github icon --></svg>
  GitHub
</button>`,
    props: [
      { name: 'data-provider', type: '"google" | "github" | "twitter" | "facebook" | "discord"', default: '"google"', description: 'Social provider' },
      { name: 'data-variant', type: '"filled" | "outline" | "minimal"', default: '"filled"', description: 'Button style' },
    ],
    preview: SocialButtonPreview,
  },
  {
    id: 'button-with-dropdown',
    name: 'ButtonWithDropdown',
    description: 'A button with an integrated dropdown menu.',
    usage: `<div data-coral-dropdown>
  <button data-coral-button data-variant="primary">
    Options
    <svg><!-- chevron --></svg>
  </button>
  <div data-coral-dropdown-menu>
    <button data-coral-dropdown-item>Profile</button>
    <button data-coral-dropdown-item>Settings</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "primary" | "outline"', default: '"default"', description: 'Button variant' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Button size' },
    ],
    preview: ButtonWithDropdownPreview,
  },
]

function ButtonsPage() {
  return (
    <ComponentPageLayout
      categoryName="Buttons"
      categoryId="buttons"
      components={buttonComponents}
      accessibilityFeatures={[
        'Full keyboard support',
        'Focus visible states',
        'Screen reader announced',
        'ARIA roles & states',
        'Touch-friendly targets',
        'Disabled state handling',
        'Badge notifications',
        'Progress indicators',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button data-coral-button data-variant="primary">Primary</button>
      <button data-coral-button data-variant="secondary">Secondary</button>
      <button data-coral-button data-variant="outline">Outline</button>
      <button data-coral-button data-variant="ghost">Ghost</button>
      <button data-coral-button data-variant="destructive">Destructive</button>
      <button data-coral-button data-variant="primary" disabled>Disabled</button>
    </div>
  )
}

function IconButtonPreview() {
  return (
    <div className="flex items-center gap-4">
      <button data-coral-icon-button data-variant="primary" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="outline" aria-label="Search">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="ghost" aria-label="Settings">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </button>
      <button data-coral-icon-button data-variant="destructive" data-size="lg" aria-label="Delete">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  )
}

function ButtonGroupPreview() {
  const [active, setActive] = useState(0)
  return (
    <div className="space-y-6">
      <div data-coral-button-group>
        {['Left', 'Center', 'Right'].map((label, i) => (
          <button
            key={label}
            onClick={() => setActive(i)}
            data-coral-button
            data-variant={i === active ? 'primary' : 'outline'}
          >
            {label}
          </button>
        ))}
      </div>
      <div data-coral-button-group data-orientation="vertical">
        {['Top', 'Middle', 'Bottom'].map((label) => (
          <button key={label} data-coral-button data-variant="outline">
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

function ToggleButtonPreview() {
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(true)
  const [underline, setUnderline] = useState(false)
  return (
    <div data-coral-button-group>
      <button
        onClick={() => setBold(!bold)}
        data-coral-toggle
        data-pressed={bold || undefined}
        aria-pressed={bold}
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => setItalic(!italic)}
        data-coral-toggle
        data-pressed={italic || undefined}
        aria-pressed={italic}
      >
        <em>I</em>
      </button>
      <button
        onClick={() => setUnderline(!underline)}
        data-coral-toggle
        data-pressed={underline || undefined}
        aria-pressed={underline}
      >
        <span style={{ textDecoration: 'underline' }}>U</span>
      </button>
    </div>
  )
}

function CopyButtonPreview() {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard?.writeText('npm install @coral-css/core')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button
      onClick={handleCopy}
      data-coral-button
      data-variant="outline"
      data-copied={copied || undefined}
    >
      {copied ? (
        <>
          <svg className="w-4 h-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Copied!</span>
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          <span>Copy Code</span>
        </>
      )}
    </button>
  )
}

function SplitButtonPreview() {
  const [open, setOpen] = useState(false)
  return (
    <div data-coral-dropdown className="relative inline-flex">
      <div data-coral-button-group>
        <button data-coral-button data-variant="primary">Save</button>
        <button
          onClick={() => setOpen(!open)}
          data-coral-button
          data-variant="primary"
          aria-label="More options"
          style={{ borderLeft: '1px solid rgba(255,255,255,0.2)' }}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      {open && (
        <div data-coral-dropdown-content data-open className="absolute top-full left-0 mt-1">
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save as Draft</button>
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Publish</button>
          <div data-coral-dropdown-separator />
          <button data-coral-dropdown-item onClick={() => setOpen(false)}>Save & Export</button>
        </div>
      )}
    </div>
  )
}

function FloatingButtonPreview() {
  return (
    <div className="relative w-64 h-32 bg-muted/30 rounded-xl border-2 border-dashed border-border">
      <button
        data-coral-fab
        className="absolute bottom-4 right-4"
        aria-label="Add new item"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function LikeButtonPreview() {
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(42)
  return (
    <button
      onClick={() => {
        setLiked(!liked)
        setCount(liked ? count - 1 : count + 1)
      }}
      data-coral-like-button
      data-liked={liked || undefined}
    >
      <svg
        className={`w-5 h-5 transition-transform ${liked ? 'scale-110' : ''}`}
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="font-medium">{count}</span>
    </button>
  )
}

function ShareButtonPreview() {
  const [shared, setShared] = useState(false)
  return (
    <button
      onClick={() => {
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }}
      data-coral-button
      data-variant="outline"
    >
      {shared ? (
        <>
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-success">Shared!</span>
        </>
      ) : (
        <>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          <span>Share</span>
        </>
      )}
    </button>
  )
}

function ButtonWithProgressPreview() {
  const [progress, setProgress] = useState(0)
  const [uploading, setUploading] = useState(false)

  const startUpload = () => {
    setUploading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval)
          setUploading(false)
          return 100
        }
        return p + 10
      })
    }, 200)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={startUpload}
        disabled={uploading}
        data-coral-button
        data-variant="primary"
        data-progress={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload File'}
        {uploading && (
          <div
            className="absolute bottom-0 left-0 h-1 bg-primary-foreground/30 rounded-full transition-all"
            style={{ width: '100%' }}
          >
            <div
              className="h-full bg-primary-foreground rounded-full transition-all duration-200"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </button>
      {uploading && <div className="text-sm text-muted-foreground">{progress}% complete</div>}
    </div>
  )
}

function ButtonWithBadgePreview() {
  const [messages, setMessages] = useState(5)

  return (
    <div className="flex items-center gap-4">
      <button
        data-coral-button
        data-variant="primary"
        onClick={() => setMessages((m) => Math.max(0, m - 1))}
      >
        Messages
        <span
          data-coral-badge
          data-count={messages}
          className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-destructive text-destructive-foreground rounded-full min-w-[1.25rem] h-5"
        >
          {messages}
        </span>
      </button>
      <button
        data-coral-button
        data-variant="outline"
        onClick={() => setMessages((m) => m + 1)}
      >
        Notifications
        <span
          data-coral-badge
          data-count={messages}
          data-badge-variant="success"
          className="inline-flex items-center justify-center px-2 py-0.5 text-xs font-medium bg-success text-success-foreground rounded-full min-w-[1.25rem] h-5"
        >
          {messages}
        </span>
      </button>
    </div>
  )
}

function ButtonWithIconBadgePreview() {
  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Notifications">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-medium">
          3
        </span>
      </div>
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Messages">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-success"></span>
      </div>
      <div className="relative">
        <button data-coral-icon-button data-variant="outline" aria-label="Cart">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </button>
        <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-medium">
          7
        </span>
      </div>
    </div>
  )
}

function SocialButtonPreview() {
  return (
    <div className="flex flex-col gap-3">
      <button
        data-coral-social-button
        data-provider="google"
        data-variant="filled"
        className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Continue with Google
      </button>
      <button
        data-coral-social-button
        data-provider="github"
        data-variant="filled"
        className="flex items-center justify-center gap-3 px-4 py-2 rounded-lg border border-border bg-card text-card-foreground hover:bg-accent transition-colors"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
        Continue with GitHub
      </button>
    </div>
  )
}

function ButtonWithDropdownPreview() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen(!open)}
        data-coral-button
        data-variant="primary"
        className="flex items-center gap-2"
      >
        Options
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-1 min-w-[10rem] bg-card border border-border rounded-lg shadow-lg py-1 z-10">
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors"
          >
            Profile Settings
          </button>
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-card-foreground hover:bg-accent transition-colors"
          >
            Account Preferences
          </button>
          <div className="border-t border-border my-1" />
          <button
            onClick={() => setOpen(false)}
            className="w-full text-left px-4 py-2 text-sm text-destructive hover:bg-accent transition-colors"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default ButtonsPage
