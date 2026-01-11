import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

const feedbackComponents = [
  {
    id: 'loader',
    name: 'Loader',
    description: 'Animated loading indicator with multiple styles.',
    usage: `<div data-coral-loader data-variant="spinner"></div>
<div data-coral-loader data-variant="dots"></div>
<div data-coral-loader data-variant="pulse"></div>`,
    props: [
      { name: 'data-variant', type: '"spinner" | "dots" | "pulse" | "bars"', default: '"spinner"', description: 'Loader animation style' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Loader size' },
    ],
    preview: LoaderPreview,
  },
  {
    id: 'watermark',
    name: 'Watermark',
    description: 'Text overlay for images and content.',
    usage: `<div data-coral-watermark data-text="DRAFT">
  <img src="document.jpg" />
</div>`,
    props: [
      { name: 'data-text', type: 'string', default: '"DRAFT"', description: 'Watermark text' },
      { name: 'data-opacity', type: 'number', default: '0.15', description: 'Opacity level' },
    ],
    preview: WatermarkPreview,
  },
  {
    id: 'backdrop',
    name: 'Backdrop',
    description: 'Semi-transparent overlay for modals and popovers.',
    usage: `<div data-coral-backdrop data-visible></div>`,
    props: [
      { name: 'data-visible', type: 'boolean', default: 'false', description: 'Show/hide backdrop' },
      { name: 'data-blur', type: 'boolean', default: 'true', description: 'Enable blur effect' },
    ],
    preview: BackdropPreview,
  },
  {
    id: 'announcement-bar',
    name: 'AnnouncementBar',
    description: 'Top announcement bar with dismiss functionality.',
    usage: `<div data-coral-announcement-bar data-variant="info">
  <p data-coral-announcement-bar-content>New features available!</p>
  <button data-coral-announcement-bar-action>Learn More</button>
  <button data-coral-announcement-bar-close>×</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "warning" | "success" | "error"', default: '"info"', description: 'Announcement type' },
      { name: 'data-sticky', type: 'boolean', default: 'true', description: 'Stick to top' },
    ],
    preview: AnnouncementBarPreview,
  },
  {
    id: 'pulse',
    name: 'Pulse',
    description: 'Pulsing animation for emphasis.',
    usage: `<div data-coral-pulse data-color="primary"></div>`,
    props: [
      { name: 'data-color', type: '"primary" | "success" | "warning" | "error"', default: '"primary"', description: 'Pulse color' },
      { name: 'data-speed', type: '"slow" | "normal" | "fast"', default: '"normal"', description: 'Animation speed' },
    ],
    preview: PulsePreview,
  },
  {
    id: 'dot-pagination',
    name: 'DotPagination',
    description: 'Dot indicators for carousel or slideshow navigation.',
    usage: `<div data-coral-dot-pagination>
  <button data-coral-dot data-active></button>
  <button data-coral-dot></button>
  <button data-coral-dot></button>
</div>`,
    props: [
      { name: 'data-total', type: 'number', default: '3', description: 'Total dots' },
      { name: 'data-current', type: 'number', default: '0', description: 'Current active dot' },
    ],
    preview: DotPaginationPreview,
  },
  {
    id: 'progress-steps',
    name: 'ProgressSteps',
    description: 'Step-by-step progress indicator.',
    usage: `<div data-coral-progress-steps>
  <div data-coral-step data-completed>1</div>
  <div data-coral-step data-active>2</div>
  <div data-coral-step>3</div>
</div>`,
    props: [
      { name: 'data-current', type: 'number', default: '0', description: 'Current step' },
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display style' },
    ],
    preview: ProgressStepsPreview,
  },
  {
    id: 'loading-dots',
    name: 'LoadingDots',
    description: 'Animated loading dots.',
    usage: `<div data-coral-loading-dots></div>`,
    props: [
      { name: 'data-color', type: '"primary" | "secondary" | "muted"', default: '"primary"', description: 'Dot color' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Dot size' },
    ],
    preview: LoadingDotsPreview,
  },
  {
    id: 'shimmer',
    name: 'Shimmer',
    description: 'Shimmer loading effect for content.',
    usage: `<div data-coral-shimmer data-width="200">
  <div data-coral-shimmer-line></div>
  <div data-coral-shimmer-line></div>
</div>`,
    props: [
      { name: 'data-speed', type: 'number', default: '1500', description: 'Animation speed (ms)' },
      { name: 'data-variant', type: '"light" | "dark"', default: '"light"', description: 'Shimmer theme' },
    ],
    preview: ShimmerPreview,
  },
  {
    id: 'callout',
    name: 'Callout',
    description: 'Highlighted callout box with icon and description.',
    usage: `<div data-coral-callout data-variant="info">
  <div data-coral-callout-icon></div>
  <div data-coral-callout-content>
    <h4>Pro Tip</h4>
    <p>Use keyboard shortcuts to speed up your workflow.</p>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error" | "tip"', default: '"info"', description: 'Callout style' },
      { name: 'data-collapsible', type: 'boolean', default: 'false', description: 'Make collapsible' },
    ],
    preview: CalloutPreview,
  },
  {
    id: 'guide-tip',
    name: 'GuideTip',
    description: 'Tooltip with guide/lightbulb icon for helpful tips.',
    usage: `<div data-coral-guide-tip data-position="top">
  <div data-coral-guide-tip-trigger>
    <svg class="icon-lightbulb"></svg>
  </div>
  <div data-coral-guide-tip-content>
    Tip: Use Ctrl+K to open the command palette
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Tooltip position' },
      { name: 'data-variant', type: '"tip" | "info" | "warning"', default: '"tip"', description: 'Tip type' },
    ],
    preview: GuideTipPreview,
  },
  {
    id: 'highlight-box',
    name: 'HighlightBox',
    description: 'Box with colored border and icon for highlighting content.',
    usage: `<div data-coral-highlight-box data-variant="info">
  <div data-coral-highlight-box-icon></div>
  <div data-coral-highlight-box-content>
    <h4>Important Note</h4>
    <p>Your subscription will renew in 3 days.</p>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Box style' },
      { name: 'data-border-width', type: 'number', default: '2', description: 'Border width' },
    ],
    preview: HighlightBoxPreview,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'A component for displaying important messages and notifications.',
    usage: `<div data-coral-alert data-variant="info">
  <svg data-coral-alert-icon>...</svg>
  <div data-coral-alert-content>
    <h4 data-coral-alert-title>Info</h4>
    <p data-coral-alert-description>This is an informational message.</p>
  </div>
  <button data-coral-alert-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Alert type/color' },
      { name: 'data-dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
    ],
    preview: AlertPreview,
  },
  {
    id: 'toast',
    name: 'Toast',
    description: 'A brief notification that appears temporarily.',
    usage: `<div data-coral-toast-container data-position="bottom-right">
  <div data-coral-toast data-variant="success">
    <svg data-coral-toast-icon>...</svg>
    <div data-coral-toast-content>
      <span data-coral-toast-title>Success!</span>
      <span data-coral-toast-description>Your changes have been saved.</span>
    </div>
    <button data-coral-toast-close>...</button>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"', default: '"bottom-right"', description: 'Toast position' },
      { name: 'data-duration', type: 'number', default: '5000', description: 'Auto-dismiss duration (ms)' },
    ],
    preview: ToastPreview,
  },
  {
    id: 'notification',
    name: 'Notification',
    description: 'A notification component with avatar, title, and actions.',
    usage: `<div data-coral-notification>
  <img data-coral-notification-avatar src="..." />
  <div data-coral-notification-content>
    <span data-coral-notification-title>New message</span>
    <span data-coral-notification-description>John sent you a message.</span>
    <time data-coral-notification-time>2 min ago</time>
  </div>
  <button data-coral-notification-action>View</button>
</div>`,
    props: [
      { name: 'data-read', type: 'boolean', default: 'false', description: 'Mark as read' },
      { name: 'data-interactive', type: 'boolean', default: 'true', description: 'Enable hover effects' },
    ],
    preview: NotificationPreview,
  },
  {
    id: 'banner',
    name: 'Banner',
    description: 'A full-width banner for announcements and promotions.',
    usage: `<div data-coral-banner data-variant="info">
  <p data-coral-banner-content>
    New feature available! Check out our latest update.
  </p>
  <button data-coral-banner-action>Learn More</button>
  <button data-coral-banner-close>...</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "warning" | "error" | "promo"', default: '"info"', description: 'Banner style' },
      { name: 'data-sticky', type: 'boolean', default: 'false', description: 'Stick to top of page' },
    ],
    preview: BannerPreview,
  },
  {
    id: 'spinner',
    name: 'Spinner',
    description: 'A loading spinner for indicating progress.',
    usage: `<div data-coral-spinner></div>
<div data-coral-spinner data-size="lg"></div>
<div data-coral-spinner data-variant="dots"></div>`,
    props: [
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Spinner size' },
      { name: 'data-variant', type: '"default" | "dots" | "bars" | "ring"', default: '"default"', description: 'Spinner style' },
    ],
    preview: SpinnerPreview,
  },
  {
    id: 'progress-ring',
    name: 'ProgressRing',
    description: 'A circular progress indicator.',
    usage: `<div data-coral-progress-ring data-value="75">
  <svg>
    <circle data-coral-progress-ring-track />
    <circle data-coral-progress-ring-progress />
  </svg>
  <span data-coral-progress-ring-label>75%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      { name: 'data-size', type: 'number', default: '64', description: 'Ring diameter in pixels' },
      { name: 'data-stroke-width', type: 'number', default: '4', description: 'Ring thickness' },
    ],
    preview: ProgressRingPreview,
  },
  {
    id: 'empty-state',
    name: 'EmptyState',
    description: 'A placeholder for empty content states.',
    usage: `<div data-coral-empty-state>
  <svg data-coral-empty-state-icon>...</svg>
  <h3 data-coral-empty-state-title>No results found</h3>
  <p data-coral-empty-state-description>
    Try adjusting your search or filters.
  </p>
  <button data-coral-empty-state-action>Clear Filters</button>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Layout variant' },
    ],
    preview: EmptyStatePreview,
  },
  {
    id: 'status-indicator',
    name: 'StatusIndicator',
    description: 'A small indicator dot for showing status.',
    usage: `<span data-coral-status data-status="online">Online</span>
<span data-coral-status data-status="offline">Offline</span>
<span data-coral-status data-status="busy">Busy</span>
<span data-coral-status data-status="away">Away</span>`,
    props: [
      { name: 'data-status', type: '"online" | "offline" | "busy" | "away"', default: '"offline"', description: 'Status type' },
      { name: 'data-pulse', type: 'boolean', default: 'false', description: 'Enable pulse animation' },
    ],
    preview: StatusIndicatorPreview,
  },
  {
    id: 'snackbar',
    name: 'Snackbar',
    description: 'A transient message bar at the bottom of the screen for quick feedback.',
    usage: `<div data-coral-snackbar data-position="bottom-center">
  <span data-coral-snackbar-message>Message sent successfully</span>
  <button data-coral-snackbar-action>Undo</button>
</div>`,
    props: [
      { name: 'data-position', type: '"bottom-left" | "bottom-center" | "bottom-right"', default: '"bottom-center"', description: 'Snackbar position' },
      { name: 'data-duration', type: 'number', default: '4000', description: 'Auto-dismiss duration (ms)' },
    ],
    preview: SnackbarPreview,
  },
  {
    id: 'progress-bar',
    name: 'ProgressBar',
    description: 'A linear progress indicator for showing task completion.',
    usage: `<div data-coral-progress data-value="65" data-max="100">
  <div data-coral-progress-track></div>
  <div data-coral-progress-fill></div>
  <span data-coral-progress-label>65%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Current progress value' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'data-size', type: '"sm" | "md" | "lg"', default: '"md"', description: 'Progress bar size' },
    ],
    preview: ProgressBarPreview,
  },
  {
    id: 'skeleton-loader',
    name: 'SkeletonLoader',
    description: 'A placeholder component for loading states.',
    usage: `<div data-coral-skeleton data-variant="text">
  <div data-coral-skeleton-line></div>
  <div data-coral-skeleton-line></div>
</div>

<div data-coral-skeleton data-variant="card">
  <div data-coral-skeleton-avatar></div>
  <div data-coral-skeleton-content>
    <div data-coral-skeleton-line></div>
    <div data-coral-skeleton-line></div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"text" | "card" | "avatar" | "button"', default: '"text"', description: 'Skeleton shape' },
      { name: 'data-animate', type: 'boolean', default: 'true', description: 'Enable shimmer animation' },
    ],
    preview: SkeletonLoaderPreview,
  },
  {
    id: 'inline-message',
    name: 'InlineMessage',
    description: 'A compact inline message for form validation and small notifications.',
    usage: `<div data-coral-inline-message data-variant="warning">
  <svg data-coral-inline-message-icon>...</svg>
  <span data-coral-inline-message-text>Please check your email address</span>
</div>`,
    props: [
      { name: 'data-variant', type: '"info" | "success" | "warning" | "error"', default: '"info"', description: 'Message type' },
      { name: 'data-size', type: '"sm" | "md"', default: '"md"', description: 'Message size' },
    ],
    preview: InlineMessagePreview,
  },
]

function FeedbackPage() {
  return (
    <ComponentPageLayout
      categoryName="Feedback"
      categoryId="feedback"
      components={feedbackComponents}
      accessibilityFeatures={[
        'ARIA live regions',
        'Role announcements',
        'Keyboard dismissible',
        'Color + icon status',
        'Focus management',
        'Screen reader support',
        'Progress indicators',
        'Skeleton loading states',
      ]}
    />
  )
}

// Preview Components with data-coral-* attributes
function AlertPreview() {
  return (
    <div className="w-full max-w-md space-y-4">
      <div data-coral-alert data-variant="info">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Information</h4>
          <p data-coral-alert-description>This is an informational alert message.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="success">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Success</h4>
          <p data-coral-alert-description>Your changes have been saved successfully.</p>
        </div>
      </div>
      <div data-coral-alert data-variant="error">
        <svg data-coral-alert-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div data-coral-alert-content>
          <h4 data-coral-alert-title>Error</h4>
          <p data-coral-alert-description>Something went wrong. Please try again.</p>
        </div>
      </div>
    </div>
  )
}

function ToastPreview() {
  const [toasts, setToasts] = useState<string[]>([])

  const addToast = (type: string) => {
    const id = Date.now().toString()
    setToasts([...toasts, type + '-' + id])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t !== type + '-' + id))
    }, 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => addToast('success')} data-coral-button data-variant="primary">
          Success Toast
        </button>
        <button onClick={() => addToast('error')} data-coral-button data-variant="destructive">
          Error Toast
        </button>
      </div>
      <div data-coral-toast-container data-position="bottom-right">
        {toasts.map((toast) => (
          <div key={toast} data-coral-toast data-variant={toast.startsWith('success') ? 'success' : 'error'} data-open>
            <svg data-coral-toast-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {toast.startsWith('success') ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              )}
            </svg>
            <div data-coral-toast-content>
              <span data-coral-toast-title>{toast.startsWith('success') ? 'Success!' : 'Error!'}</span>
              <span data-coral-toast-description>
                {toast.startsWith('success') ? 'Changes saved.' : 'Something went wrong.'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationPreview() {
  return (
    <div className="w-full max-w-sm space-y-2">
      {[
        { name: 'John Doe', message: 'Sent you a message', time: '2 min ago', unread: true },
        { name: 'Jane Smith', message: 'Liked your post', time: '1 hour ago', unread: true },
        { name: 'Bob Wilson', message: 'Commented on your photo', time: '3 hours ago', unread: false },
      ].map((notification, i) => (
        <div key={i} data-coral-notification data-unread={notification.unread || undefined}>
          <div data-coral-avatar data-size="md">
            {notification.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div data-coral-notification-content>
            <div className="flex items-center gap-2">
              <span data-coral-notification-title>{notification.name}</span>
              {notification.unread && <span data-coral-notification-badge />}
            </div>
            <p data-coral-notification-description>{notification.message}</p>
            <time data-coral-notification-time>{notification.time}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

function BannerPreview() {
  const [visible, setVisible] = useState(true)
  return visible ? (
    <div data-coral-banner data-variant="info" className="w-full max-w-2xl">
      <svg data-coral-banner-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <p data-coral-banner-content>
        New feature! Check out our latest update with improved performance.
      </p>
      <button data-coral-button data-variant="primary" data-size="sm">Learn More</button>
      <button onClick={() => setVisible(false)} data-coral-icon-button data-variant="ghost" aria-label="Dismiss">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  ) : (
    <button onClick={() => setVisible(true)} data-coral-button data-variant="outline">
      Show Banner
    </button>
  )
}

function SpinnerPreview() {
  return (
    <div className="flex items-center gap-8">
      <div data-coral-spinner data-size="sm" />
      <div data-coral-spinner data-size="md" />
      <div data-coral-spinner data-size="lg" />
      <div data-coral-spinner data-variant="dots" />
    </div>
  )
}

function ProgressRingPreview() {
  const [value, setValue] = useState(75)
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference

  return (
    <div className="flex items-center gap-8">
      <div data-coral-progress-ring style={{ width: 96, height: 96 }}>
        <svg className="w-24 h-24 transform -rotate-90">
          <circle data-coral-progress-ring-track cx="48" cy="48" r={radius} strokeWidth="8" fill="none" />
          <circle
            data-coral-progress-ring-progress
            cx="48"
            cy="48"
            r={radius}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.3s' }}
          />
        </svg>
        <span data-coral-progress-ring-label>{value}%</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => setValue(parseInt(e.target.value))}
        data-coral-slider
      />
    </div>
  )
}

function EmptyStatePreview() {
  return (
    <div data-coral-empty-state className="w-full max-w-sm">
      <div data-coral-empty-state-icon>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h3 data-coral-empty-state-title>No results found</h3>
      <p data-coral-empty-state-description>
        We couldn't find any items matching your search. Try adjusting your filters.
      </p>
      <button data-coral-button data-variant="primary">Clear Filters</button>
    </div>
  )
}

function StatusIndicatorPreview() {
  return (
    <div className="flex flex-wrap gap-6">
      {[
        { status: 'online', label: 'Online' },
        { status: 'away', label: 'Away' },
        { status: 'busy', label: 'Busy' },
        { status: 'offline', label: 'Offline' },
      ].map((item) => (
        <span key={item.status} data-coral-status data-status={item.status}>
          {item.label}
        </span>
      ))}
    </div>
  )
}

function SnackbarPreview() {
  const [snackbar, setSnackbar] = useState<{ message: string; type: string } | null>(null)

  const showSnackbar = (type: string) => {
    const messages = {
      success: 'Message sent successfully!',
      error: 'Failed to send message. Please try again.',
      info: 'New update available!',
      warning: 'Your session will expire soon.',
    }
    setSnackbar({ message: messages[type as keyof typeof messages] || 'Unknown', type })
    setTimeout(() => setSnackbar(null), 3000)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-2">
        <button onClick={() => showSnackbar('success')} data-coral-button data-variant="primary" data-size="sm">
          Show Success
        </button>
        <button onClick={() => showSnackbar('error')} data-coral-button data-variant="destructive" data-size="sm">
          Show Error
        </button>
      </div>
      {snackbar && (
        <div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-3 rounded-lg bg-card border border-border shadow-lg text-card-foreground max-w-md animate-in slide-in-from-bottom-4"
          style={{ position: 'relative', left: 0, transform: 'none' }}
        >
          <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm flex-1">{snackbar.message}</span>
          <button onClick={() => setSnackbar(null)} className="text-muted-foreground hover:text-foreground">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </div>
  )
}

function ProgressBarPreview() {
  const [progress, setProgress] = useState(65)

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">Progress</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2.5">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={(e) => setProgress(parseInt(e.target.value))}
        className="w-full"
        data-coral-slider
      />
    </div>
  )
}

function SkeletonLoaderPreview() {
  return (
    <div className="space-y-4">
      <div data-coral-skeleton data-variant="text" className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse w-5/6" />
        <div className="h-4 bg-muted rounded animate-pulse w-4/6" />
      </div>
      <div data-coral-skeleton data-variant="card" className="flex gap-3 p-4">
        <div className="w-12 h-12 bg-muted rounded-full animate-pulse" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded animate-pulse w-3/4" />
          <div className="h-3 bg-muted rounded animate-pulse w-1/2" />
        </div>
      </div>
      <div data-coral-skeleton data-variant="button" className="flex gap-2">
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
        <div className="h-10 w-24 bg-muted rounded animate-pulse" />
      </div>
    </div>
  )
}

function InlineMessagePreview() {
  return (
    <div className="space-y-3 w-full max-w-md">
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span className="text-sm">Information message with helpful context</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="text-sm">Success message confirming action completed</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <span className="text-sm">Warning message about potential issues</span>
      </div>
      <div className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-500/10 text-red-700 dark:text-red-400 border border-red-500/20">
        <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
        <span className="text-sm">Error message requiring attention</span>
      </div>
    </div>
  )
}

function LoaderPreview() {
  return (
    <div className="flex flex-col gap-6 items-center">
      <div className="flex items-center gap-8">
        <div className="relative w-8 h-8">
          <div className="absolute inset-0 border-4 border-muted rounded-full"></div>
          <div className="absolute inset-0 border-4 border-t-primary rounded-full animate-spin"></div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
        <div className="flex gap-1">
          <div className="w-1 h-6 bg-primary rounded animate-pulse"></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-1 h-6 bg-primary rounded animate-pulse" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  )
}

function WatermarkPreview() {
  return (
    <div className="w-full max-w-sm">
      <div data-coral-watermark data-text="DRAFT" className="relative aspect-[4/3] bg-muted rounded-lg overflow-hidden flex items-center justify-center">
        <svg className="w-16 h-16 text-muted-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-6xl font-bold text-muted-foreground/20 rotate-12 select-none">DRAFT</span>
        </div>
      </div>
    </div>
  )
}

function BackdropPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="relative">
        <div className="bg-card border border-border rounded-lg p-8 flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">Content behind backdrop</p>
            <div className="relative">
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">Click to toggle</button>
              <div className="absolute inset-0 bg-black/50 rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function AnnouncementBarPreview() {
  const [visible, setVisible] = useState(true)

  if (!visible) {
    return (
      <button onClick={() => setVisible(true)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">
        Show Announcement
      </button>
    )
  }

  return (
    <div data-coral-announcement-bar data-variant="info" className="w-full max-w-2xl">
      <svg data-coral-announcement-bar-icon className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
      </svg>
      <p data-coral-announcement-bar-content>
        New feature: Dark mode is now available! Switch to dark theme in your settings.
      </p>
      <button data-coral-announcement-bar-action className="px-3 py-1 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded text-sm">
        Learn More
      </button>
      <button onClick={() => setVisible(false)} data-coral-announcement-bar-close className="ml-2" aria-label="Dismiss">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  )
}

function PulsePreview() {
  return (
    <div className="flex flex-wrap items-center gap-8">
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="primary" className="w-6 h-6 bg-primary rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-primary rounded-full relative z-10"></div>
      </div>
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="success" className="w-6 h-6 bg-emerald-500 rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-emerald-500 rounded-full relative z-10"></div>
      </div>
      <div className="relative flex items-center gap-4">
        <div data-coral-pulse data-color="warning" className="w-6 h-6 bg-amber-500 rounded-full animate-ping absolute"></div>
        <div className="w-6 h-6 bg-amber-500 rounded-full relative z-10"></div>
      </div>
    </div>
  )
}

function DotPaginationPreview() {
  const [current, setCurrent] = useState(0)
  const total = 5

  return (
    <div className="flex flex-col gap-4 items-center">
      <div data-coral-dot-pagination className="flex gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            data-coral-dot
            data-active={i === current || undefined}
            onClick={() => setCurrent(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === current ? 'bg-primary scale-125' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setCurrent(Math.max(0, current - 1))}
          disabled={current === 0}
          className="px-3 py-1 bg-muted rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrent(Math.min(total - 1, current + 1))}
          disabled={current === total - 1}
          className="px-3 py-1 bg-muted rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function ProgressStepsPreview() {
  const steps = ['Account', 'Profile', 'Verification', 'Complete']
  const [currentStep, setCurrentStep] = useState(1)

  return (
    <div className="w-full max-w-2xl">
      <div data-coral-progress-steps data-current={currentStep} className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          return (
            <div key={index} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  data-coral-step
                  data-completed={currentStep > stepNumber}
                  data-active={currentStep === stepNumber}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    currentStep > stepNumber
                      ? 'bg-emerald-500 text-white'
                      : currentStep === stepNumber
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {stepNumber}
                </div>
                <span className="text-xs mt-2 text-center">{step}</span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`flex-1 h-1 mx-2 transition-colors ${
                    currentStep > stepNumber ? 'bg-emerald-500' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 mt-6">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 bg-muted rounded-lg disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length, currentStep + 1))}
          disabled={currentStep === steps.length}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  )
}

function LoadingDotsPreview() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-1">
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
      <div className="flex gap-1">
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
        <div className="w-3 h-3 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
      </div>
    </div>
  )
}

function ShimmerPreview() {
  return (
    <div className="w-full max-w-md space-y-3">
      <div className="relative overflow-hidden bg-muted rounded-lg p-4">
        <div className="h-4 bg-muted-foreground/20 rounded mb-3 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
        <div className="h-4 bg-muted-foreground/20 rounded mb-3 w-3/4 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.2s',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
        <div className="h-4 bg-muted-foreground/20 rounded w-1/2 relative">
          <div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
            style={{
              animation: 'shimmer 1.5s infinite',
              animationDelay: '0.4s',
              transform: 'translateX(-100%)',
            }}
          />
        </div>
      </div>
      <style>
        {`@keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }`}
      </style>
    </div>
  )
}

function CalloutPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div data-coral-callout data-variant="info" className="p-4 border border-border rounded-lg">
        <div className="flex gap-3">
          <svg data-coral-callout-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div data-coral-callout-content className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Pro Tip</h4>
            <p className="text-sm text-muted-foreground">Use keyboard shortcuts to speed up your workflow. Press <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs">Ctrl + K</kbd> to open the command palette.</p>
          </div>
        </div>
      </div>
      <div data-coral-callout data-variant="tip" className="p-4 border border-border rounded-lg">
        <div className="flex gap-3">
          <svg data-coral-callout-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <div data-coral-callout-content className="flex-1">
            <h4 className="font-semibold text-sm mb-1">Did you know?</h4>
            <p className="text-sm text-muted-foreground">You can customize your dashboard layout by dragging and dropping widgets.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function GuideTipPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <div className="flex flex-wrap gap-4">
      {[
        { id: 1, icon: 'lightbulb', tip: 'Press Ctrl+K to open the command palette' },
        { id: 2, icon: 'info', tip: 'Your profile is 80% complete' },
        { id: 3, icon: 'warning', tip: 'You have 3 pending notifications' },
      ].map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <button className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </button>
          {hoveredId === item.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-foreground text-background text-xs rounded-lg whitespace-nowrap z-10">
              {item.tip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function HighlightBoxPreview() {
  return (
    <div className="space-y-4 w-full max-w-md">
      <div data-coral-highlight-box data-variant="info" className="p-4 border-l-4 border-blue-500 bg-blue-500/10 rounded-r-lg">
        <div className="flex gap-3">
          <svg data-coral-highlight-box-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div data-coral-highlight-box-content>
            <h4 className="font-semibold text-sm mb-1">Important Note</h4>
            <p className="text-sm text-muted-foreground">Your subscription will renew in 3 days. Update your payment method to avoid service interruption.</p>
          </div>
        </div>
      </div>
      <div data-coral-highlight-box data-variant="warning" className="p-4 border-l-4 border-amber-500 bg-amber-500/10 rounded-r-lg">
        <div className="flex gap-3">
          <svg data-coral-highlight-box-icon className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div data-coral-highlight-box-content>
            <h4 className="font-semibold text-sm mb-1">Warning</h4>
            <p className="text-sm text-muted-foreground">You are approaching your storage limit. Consider upgrading your plan.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FeedbackPage
