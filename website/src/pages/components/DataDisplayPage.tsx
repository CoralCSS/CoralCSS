import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components with data-coral-* attributes
function CardPreview() {
  return (
    <div className="grid md:grid-cols-2 gap-4 w-full max-w-2xl">
      <div data-coral-card data-interactive>
        <div data-coral-card-image className="h-32 bg-gradient-to-br from-primary to-accent" />
        <div data-coral-card-content>
          <h3 data-coral-card-title>Card Title</h3>
          <p data-coral-card-description>This is a description of the card content.</p>
        </div>
        <div data-coral-card-footer>
          <button data-coral-button data-variant="primary" data-size="sm">Learn More</button>
        </div>
      </div>
      <div data-coral-card data-interactive>
        <div data-coral-card-content>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <h3 data-coral-card-title>Performance</h3>
              <p className="text-xs text-muted-foreground">Optimized for speed</p>
            </div>
          </div>
          <p data-coral-card-description>
            Built with performance in mind, using modern optimization techniques.
          </p>
        </div>
      </div>
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size, i) => (
          <div key={size} data-coral-avatar data-size={size}>
            <span data-coral-avatar-fallback>
              {['JD', 'AB', 'CD', 'EF', 'GH'][i]}
            </span>
          </div>
        ))}
      </div>
      <div data-coral-avatar-group>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} data-coral-avatar data-size="md">
            <span data-coral-avatar-fallback>U{i}</span>
          </div>
        ))}
        <span data-coral-avatar-overflow>+5</span>
      </div>
    </div>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <span data-coral-badge>Default</span>
      <span data-coral-badge data-variant="success">Success</span>
      <span data-coral-badge data-variant="warning">Warning</span>
      <span data-coral-badge data-variant="error">Error</span>
      <span data-coral-badge data-variant="info">Info</span>
      <span data-coral-badge data-outline>Outline</span>
    </div>
  )
}

function TablePreview() {
  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]
  return (
    <div data-coral-table-wrapper className="w-full">
      <table data-coral-table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.email}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.role}</td>
              <td>
                <span data-coral-badge data-variant={row.status === 'Active' ? 'success' : 'default'}>
                  {row.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function AccordionPreview() {
  const [openItems, setOpenItems] = useState<number[]>([0])
  const items = [
    { title: 'What is CoralCSS?', content: 'CoralCSS is a modern, utility-first CSS framework with JIT compilation and a comprehensive component library.' },
    { title: 'How do I install it?', content: 'You can install CoralCSS via npm: npm install @coral-css/core' },
    { title: 'Is it free to use?', content: 'Yes, CoralCSS is completely free and open-source under the MIT license.' },
  ]
  return (
    <div data-coral-accordion className="w-full max-w-md">
      {items.map((item, i) => (
        <div
          key={i}
          data-coral-accordion-item
          data-open={openItems.includes(i) || undefined}
        >
          <button
            onClick={() => setOpenItems(
              openItems.includes(i)
                ? openItems.filter(x => x !== i)
                : [...openItems, i]
            )}
            data-coral-accordion-trigger
          >
            {item.title}
            <svg
              data-coral-accordion-icon
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <div data-coral-accordion-content>
            <p>{item.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

function TimelinePreview() {
  const events = [
    { title: 'Project Started', date: 'Jan 15, 2024', completed: true },
    { title: 'Design Phase', date: 'Feb 1, 2024', completed: true },
    { title: 'Development', date: 'Mar 1, 2024', active: true },
    { title: 'Launch', date: 'Apr 1, 2024' },
  ]
  return (
    <div data-coral-timeline>
      {events.map((event, i) => (
        <div
          key={i}
          data-coral-timeline-item
          data-completed={event.completed || undefined}
          data-active={event.active || undefined}
        >
          <div data-coral-timeline-marker />
          <div data-coral-timeline-content>
            <h4 data-coral-timeline-title>{event.title}</h4>
            <time data-coral-timeline-time>{event.date}</time>
          </div>
        </div>
      ))}
    </div>
  )
}

function ProgressPreview() {
  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Progress</span>
          <span className="text-muted-foreground">60%</span>
        </div>
        <div data-coral-progress data-value="60">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Upload</span>
          <span className="text-success">Complete</span>
        </div>
        <div data-coral-progress data-value="100" data-variant="success">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-2">
          <span className="text-foreground">Storage</span>
          <span className="text-warning">85%</span>
        </div>
        <div data-coral-progress data-value="85" data-variant="warning">
          <div data-coral-progress-bar />
        </div>
      </div>
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <div data-coral-skeleton data-variant="circular" style={{ width: 48, height: 48 }} />
        <div className="flex-1 space-y-2">
          <div data-coral-skeleton data-variant="text" style={{ width: '75%' }} />
          <div data-coral-skeleton data-variant="text" style={{ width: '50%' }} />
        </div>
      </div>
      <div className="space-y-2">
        <div data-coral-skeleton data-variant="text" />
        <div data-coral-skeleton data-variant="text" style={{ width: '83%' }} />
        <div data-coral-skeleton data-variant="text" style={{ width: '66%' }} />
      </div>
      <div data-coral-skeleton data-variant="rectangular" style={{ height: 128 }} />
    </div>
  )
}

function StatPreview() {
  const stats = [
    { label: 'Total Revenue', value: '$45,231', change: '+20.1%', trend: 'up' as const },
    { label: 'Active Users', value: '2,350', change: '+15.3%', trend: 'up' as const },
    { label: 'Bounce Rate', value: '24.5%', change: '-4.2%', trend: 'down' as const },
  ]
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-2xl">
      {stats.map((stat) => (
        <div key={stat.label} data-coral-stat>
          <div data-coral-stat-label>{stat.label}</div>
          <div data-coral-stat-value>{stat.value}</div>
          <div data-coral-stat-change data-trend={stat.trend}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={stat.trend === 'up' ? 'M5 10l7-7m0 0l7 7m-7-7v18' : 'M19 14l-7 7m0 0l-7-7m7 7V3'}
              />
            </svg>
            {stat.change}
          </div>
        </div>
      ))}
    </div>
  )
}

function ListPreview() {
  const items = [
    { title: 'Inbox', description: '24 unread messages', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' },
    { title: 'Drafts', description: '5 saved drafts', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z' },
    { title: 'Sent', description: 'View sent messages', icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8' },
  ]
  return (
    <ul data-coral-list data-variant="divided" className="w-full max-w-sm">
      {items.map((item) => (
        <li key={item.title} data-coral-list-item data-interactive>
          <div data-coral-list-icon>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
          </div>
          <div data-coral-list-content>
            <span data-coral-list-title>{item.title}</span>
            <span data-coral-list-description>{item.description}</span>
          </div>
          <svg className="w-5 h-5 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </li>
      ))}
    </ul>
  )
}

function CalendarPreview() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  const today = new Date()
  const firstDay = new Date(today.getFullYear(), today.getMonth(), 1).getDay()
  const daysInMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate()

  const calendarDays = []
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null)
  }
  for (let i = 1; i <= daysInMonth; i++) {
    calendarDays.push(i)
  }

  return (
    <div data-coral-calendar className="w-full max-w-sm bg-card rounded-lg border border-border p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{today.toLocaleString('default', { month: 'long', year: 'numeric' })}</h3>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-muted rounded">‹</button>
          <button className="p-1 hover:bg-muted rounded">›</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
            {day}
          </div>
        ))}
        {calendarDays.map((day, i) => (
          <button
            key={i}
            className={`aspect-square flex items-center justify-center text-sm rounded ${
              day === today.getDate()
                ? 'bg-primary text-primary-foreground'
                : 'hover:bg-muted'
            }`}
            disabled={!day}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  )
}

function CommentPreview() {
  const comments = [
    {
      id: 1,
      author: 'Jane Doe',
      avatar: 'JD',
      content: 'This is a great component library!',
      timestamp: '2 hours ago',
      likes: 12,
      replies: [
        {
          id: 2,
          author: 'John Smith',
          avatar: 'JS',
          content: 'I agree, the documentation is excellent.',
          timestamp: '1 hour ago',
          likes: 5,
        },
      ],
    },
    {
      id: 3,
      author: 'Bob Johnson',
      avatar: 'BJ',
      content: 'Very clean and intuitive design.',
      timestamp: '30 minutes ago',
      likes: 7,
      replies: [],
    },
  ]

  return (
    <div className="w-full max-w-2xl space-y-6">
      {comments.map((comment) => (
        <div key={comment.id} data-coral-comment className="bg-card rounded-lg border border-border p-4">
          <div className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {comment.avatar}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-sm">{comment.author}</span>
                <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              <div className="flex items-center gap-4 text-xs">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {comment.likes}
                </button>
                <button className="text-muted-foreground hover:text-primary">Reply</button>
              </div>
              {comment.replies.length > 0 && (
                <div className="mt-4 space-y-3 pl-4 border-l-2 border-border">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} data-coral-comment-reply className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xs">
                        {reply.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-xs">{reply.author}</span>
                          <span className="text-xs text-muted-foreground">{reply.timestamp}</span>
                        </div>
                        <p className="text-xs mb-1">{reply.content}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <button className="flex items-center gap-1 text-muted-foreground hover:text-primary">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                            {reply.likes}
                          </button>
                          <button className="text-muted-foreground hover:text-primary">Reply</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TreeViewPreview() {
  interface TreeNode {
    id: number
    name: string
    children?: TreeNode[]
  }

  const treeData: TreeNode[] = [
    {
      id: 1,
      name: 'src',
      children: [
        {
          id: 2,
          name: 'components',
          children: [
            { id: 3, name: 'Button.tsx' },
            { id: 4, name: 'Card.tsx' },
            { id: 5, name: 'Input.tsx' },
          ],
        },
        {
          id: 6,
          name: 'utils',
          children: [
            { id: 7, name: 'helpers.ts' },
            { id: 8, name: 'types.ts' },
          ],
        },
      ],
    },
    {
      id: 9,
      name: 'public',
      children: [
        { id: 10, name: 'index.html' },
        { id: 11, name: 'favicon.ico' },
      ],
    },
  ]

  return (
    <div data-coral-tree-view className="w-full max-w-sm bg-card rounded-lg border border-border p-4">
      <div className="space-y-1">
        {treeData.map((node) => (
          <div key={node.id} className="space-y-1">
            <div className="flex items-center gap-2 py-1">
              <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              <span className="text-sm">{node.name}</span>
            </div>
            {node.children && (
              <div className="ml-6 space-y-1">
                {node.children.map((child) => (
                  <div key={child.id} className="flex items-center gap-2 py-1">
                    {child.children ? (
                      <>
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                        </svg>
                        <span className="text-sm">{child.name}</span>
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <span className="text-sm text-muted-foreground">{child.name}</span>
                      </>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function RatingPreview() {
  const [rating, setRating] = useState(4)
  const maxStars = 5

  return (
    <div className="flex flex-col gap-4 w-full max-w-sm">
      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {Array.from({ length: maxStars }).map((_, i) => (
            <button
              key={i}
              onClick={() => setRating(i + 1)}
              className="transition-colors"
            >
              <svg
                className={`w-8 h-8 ${
                  i < rating ? 'text-yellow-500' : 'text-muted-foreground/30'
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </button>
          ))}
        </div>
        <span className="text-sm text-muted-foreground">{rating} out of {maxStars}</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>5 stars</span>
          <span className="text-muted-foreground">45</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '75%' }} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>4 stars</span>
          <span className="text-muted-foreground">30</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '50%' }} />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>3 stars</span>
          <span className="text-muted-foreground">10</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '16%' }} />
        </div>
      </div>
    </div>
  )
}

function DataGridPreview() {
  const columns = ['Name', 'Email', 'Role', 'Status', 'Actions']
  const rows = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'Editor', status: 'Active' },
  ]

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden w-full max-w-4xl">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-3 text-left text-xs md:text-sm font-medium text-muted-foreground">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 text-sm md:text-base">{row.name}</td>
                <td className="px-4 py-3 text-sm md:text-base text-muted-foreground">{row.email}</td>
                <td className="px-4 py-3 text-sm md:text-base">{row.role}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    row.status === 'Active'
                      ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-xs px-3 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors">
                      Edit
                    </button>
                    <button className="text-xs px-3 py-1 bg-muted hover:bg-muted/80 rounded transition-colors">
                      View
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function BreadcrumbPreview() {
  const items = [
    { label: 'Home', href: '#' },
    { label: 'Components', href: '#' },
    { label: 'Data Display', href: '#' },
    { label: 'Current', href: '#' },
  ]

  return (
    <nav className="flex items-center gap-2 text-sm md:text-base w-full max-w-2xl overflow-x-auto pb-2" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-2 flex-shrink-0">
          {i > 0 && (
            <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          )}
          {i === items.length - 1 ? (
            <span className="text-foreground font-medium">{item.label}</span>
          ) : (
            <a href={item.href} className="text-muted-foreground hover:text-foreground transition-colors">
              {item.label}
            </a>
          )}
        </div>
      ))}
    </nav>
  )
}

function ChipPreview() {
  const [selected, setSelected] = useState<string[]>(['Option 1'])

  const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']

  const toggleChip = (option: string) => {
    setSelected(prev =>
      prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option]
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option}
          onClick={() => toggleChip(option)}
          className={`px-3 py-1.5 rounded-full text-xs md:text-sm transition-all ${
            selected.includes(option)
              ? 'bg-primary text-primary-foreground shadow-sm'
              : 'bg-muted text-muted-foreground hover:bg-muted/80'
          }`}
        >
          {option}
          {selected.includes(option) && (
            <svg className="w-3 h-3 ml-1.5 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </button>
      ))}
    </div>
  )
}

function AlertPreview() {
  return (
    <div className="space-y-4 w-full max-w-2xl">
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-sm md:text-base mb-1">Success!</h4>
            <p className="text-xs md:text-sm">Your changes have been saved successfully.</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="font-semibold text-sm md:text-base mb-1">Warning</h4>
            <p className="text-xs md:text-sm">You are approaching your storage limit.</p>
          </div>
        </div>
      </div>

      <div className="bg-coral-500/10 border border-coral-500/20 text-coral-700 dark:text-coral-400 rounded-lg p-4">
        <div className="flex gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="font-semibold text-sm md:text-base mb-1">Error</h4>
            <p className="text-xs md:text-sm">Something went wrong. Please try again.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function DividerPreview() {
  return (
    <div className="space-y-6 w-full max-w-sm">
      <div className="text-sm md:text-base">
        <p className="mb-4">This is the first section of content.</p>
        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-border flex-1" />
          <span className="text-xs text-muted-foreground px-2">OR</span>
          <div className="h-px bg-border flex-1" />
        </div>
        <p>This is the second section after the divider.</p>
      </div>

      <div className="text-sm md:text-base">
        <div className="flex items-center gap-2 my-4">
          <div className="h-px bg-border flex-1" />
        </div>
        <p>Content with a simple divider line.</p>
      </div>
    </div>
  )
}

function CardGroupPreview() {
  const cards = [
    { id: 1, title: 'Card 1', description: 'First card description', icon: 'star' },
    { id: 2, title: 'Card 2', description: 'Second card description', icon: 'heart' },
    { id: 3, title: 'Card 3', description: 'Third card description', icon: 'gift' },
  ]

  const icons: Record<string, JSX.Element> = {
    star: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>,
    heart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
    gift: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z" /></svg>,
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      {cards.map((card) => (
        <div key={card.id} className="bg-card rounded-xl border border-border p-6 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
            {icons[card.icon]}
          </div>
          <h3 className="font-semibold text-base md:text-lg mb-2">{card.title}</h3>
          <p className="text-sm text-muted-foreground">{card.description}</p>
        </div>
      ))}
    </div>
  )
}

function TagCloudPreview() {
  const tags = [
    { label: 'React', weight: 10, color: 'blue' },
    { label: 'TypeScript', weight: 8, color: 'violet' },
    { label: 'CSS', weight: 6, color: 'coral' },
    { label: 'JavaScript', weight: 9, color: 'amber' },
    { label: 'Node.js', weight: 7, color: 'emerald' },
    { label: 'HTML', weight: 5, color: 'coral' },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag.label}
          className={`px-3 py-1 rounded-full text-xs md:text-sm transition-all hover:scale-105 ${
            tag.color === 'blue' ? 'bg-blue-500/20 text-blue-600 dark:text-blue-400' :
            tag.color === 'violet' ? 'bg-violet-500/20 text-violet-600 dark:text-violet-400' :
            tag.color === 'coral' ? 'bg-coral-500/20 text-coral-600 dark:text-coral-400' :
            tag.color === 'amber' ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' :
            'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
          }`}
          style={{ fontSize: `${Math.max(0.75, tag.weight / 10)}rem` }}
        >
          {tag.label}
        </span>
      ))}
    </div>
  )
}

function PaginationPreview() {
  const [currentPage, setCurrentPage] = useState(3)
  const totalPages = 10

  return (
    <nav className="flex items-center gap-1">
      <button
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {Array.from({ length: totalPages }).map((_, i) => {
        const page = i + 1
        if (
          page === 1 ||
          page === totalPages ||
          (page >= currentPage - 1 && page <= currentPage + 1)
        ) {
          return (
            <button
              key={page}
              className={`w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg text-sm transition-colors ${
                page === currentPage
                  ? 'bg-primary text-primary-foreground'
                  : 'border border-border hover:bg-muted'
              }`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          )
        } else if (
          page === currentPage - 2 ||
          page === currentPage + 2
        ) {
          return <span key={page} className="px-1 text-muted-foreground">...</span>
        }
        return null
      })}

      <button
        className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center rounded-lg border border-border hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  )
}

function TooltipPreview() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  const items = [
    { id: 1, label: 'Home', tooltip: 'Go to homepage' },
    { id: 2, label: 'Settings', tooltip: 'Manage settings' },
    { id: 3, label: 'Profile', tooltip: 'View your profile' },
  ]

  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <div
          key={item.id}
          className="relative"
          onMouseEnter={() => setHoveredId(item.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            {item.label}
          </button>
          {hoveredId === item.id && (
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-foreground text-background text-xs rounded whitespace-nowrap">
              {item.tooltip}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-foreground" />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

function ImageCardPreview() {
  const images = [
    { id: 1, title: 'Mountain View', category: 'Nature', likes: 234 },
    { id: 2, title: 'City Skyline', category: 'Urban', likes: 189 },
    { id: 3, title: 'Ocean Sunset', category: 'Seascape', likes: 312 },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      {images.map((img) => (
        <div key={img.id} className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow group">
          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative overflow-hidden">
            <svg className="w-16 h-16 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <button className="px-4 py-2 bg-background/90 rounded-lg text-sm font-medium">
                View Image
              </button>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm md:text-base">{img.title}</h3>
              <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{img.category}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs md:text-sm">{img.likes} likes</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialPreview() {
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Product Manager',
      avatar: 'SJ',
      content: 'This component library has transformed our development process. The quality and attention to detail is exceptional.',
      rating: 5,
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Frontend Developer',
      avatar: 'MC',
      content: 'Clean, modern, and highly customizable. Perfect for our design system.',
      rating: 5,
    },
  ]

  return (
    <div className="space-y-6 w-full max-w-2xl">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-card rounded-xl border border-border p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold flex-shrink-0">
              {testimonial.avatar}
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
              <p className="text-xs md:text-sm text-muted-foreground">{testimonial.role}</p>
              <div className="flex gap-0.5 mt-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
          <blockquote className="text-sm md:text-base text-foreground/90 pl-4 border-l-2 border-primary/30">
            "{testimonial.content}"
          </blockquote>
        </div>
      ))}
    </div>
  )
}

const dataDisplayComponents = [
  {
    id: 'card',
    name: 'Card',
    description: 'A flexible container component for displaying content.',
    usage: `<div data-coral-card>
  <div data-coral-card-image></div>
  <div data-coral-card-content>
    <h3 data-coral-card-title>Title</h3>
    <p data-coral-card-description>Description</p>
  </div>
  <div data-coral-card-footer>
    <button data-coral-button>Action</button>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "bordered" | "elevated"', default: '"default"', description: 'Card style variant' },
      { name: 'data-interactive', type: 'boolean', default: 'false', description: 'Enable hover effects' },
    ],
    preview: CardPreview,
  },
  {
    id: 'avatar',
    name: 'Avatar',
    description: 'A circular image component for user profiles.',
    usage: `<div data-coral-avatar data-size="md">
  <span data-coral-avatar-fallback>JD</span>
</div>`,
    props: [
      { name: 'data-size', type: '"xs" | "sm" | "md" | "lg" | "xl"', default: '"md"', description: 'Avatar size' },
      { name: 'data-status', type: '"online" | "offline" | "busy" | "away"', default: 'undefined', description: 'Status indicator' },
    ],
    preview: AvatarPreview,
  },
  {
    id: 'badge',
    name: 'Badge',
    description: 'A small label for status, count, or category.',
    usage: `<span data-coral-badge>Default</span>
<span data-coral-badge data-variant="success">Success</span>
<span data-coral-badge data-variant="warning">Warning</span>`,
    props: [
      { name: 'data-variant', type: '"default" | "success" | "warning" | "error" | "info"', default: '"default"', description: 'Badge color variant' },
      { name: 'data-outline', type: 'boolean', default: 'false', description: 'Outline style' },
    ],
    preview: BadgePreview,
  },
  {
    id: 'table',
    name: 'Table',
    description: 'A data table with sorting and selection support.',
    usage: `<table data-coral-table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
  </tbody>
</table>`,
    props: [
      { name: 'data-striped', type: 'boolean', default: 'false', description: 'Alternating row colors' },
      { name: 'data-bordered', type: 'boolean', default: 'true', description: 'Show cell borders' },
    ],
    preview: TablePreview,
  },
  {
    id: 'accordion',
    name: 'Accordion',
    description: 'A collapsible section for organizing content.',
    usage: `<div data-coral-accordion>
  <div data-coral-accordion-item data-open>
    <button data-coral-accordion-trigger>Section 1</button>
    <div data-coral-accordion-content>Content 1</div>
  </div>
</div>`,
    props: [
      { name: 'data-type', type: '"single" | "multiple"', default: '"single"', description: 'Allow one or multiple open' },
    ],
    preview: AccordionPreview,
  },
  {
    id: 'timeline',
    name: 'Timeline',
    description: 'A vertical timeline for displaying events in sequence.',
    usage: `<div data-coral-timeline>
  <div data-coral-timeline-item>
    <div data-coral-timeline-marker data-completed></div>
    <div data-coral-timeline-content>
      <h4>Event Title</h4>
      <time>Jan 15, 2024</time>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-position', type: '"left" | "right" | "alternate"', default: '"left"', description: 'Content position' },
    ],
    preview: TimelinePreview,
  },
  {
    id: 'progress',
    name: 'Progress',
    description: 'A progress bar for showing completion status.',
    usage: `<div data-coral-progress data-value="60">
  <div data-coral-progress-bar></div>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Progress value (0-100)' },
      { name: 'data-variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
    ],
    preview: ProgressPreview,
  },
  {
    id: 'skeleton',
    name: 'Skeleton',
    description: 'A placeholder for loading content.',
    usage: `<div data-coral-skeleton data-variant="text"></div>
<div data-coral-skeleton data-variant="circular"></div>
<div data-coral-skeleton data-variant="rectangular"></div>`,
    props: [
      { name: 'data-variant', type: '"text" | "circular" | "rectangular"', default: '"text"', description: 'Skeleton shape' },
    ],
    preview: SkeletonPreview,
  },
  {
    id: 'stat',
    name: 'Stat',
    description: 'A component for displaying key metrics and statistics.',
    usage: `<div data-coral-stat>
  <div data-coral-stat-label>Total Users</div>
  <div data-coral-stat-value>12,345</div>
  <div data-coral-stat-change data-trend="up">+12.5%</div>
</div>`,
    props: [
      { name: 'data-trend', type: '"up" | "down" | "neutral"', default: 'undefined', description: 'Change direction' },
    ],
    preview: StatPreview,
  },
  {
    id: 'list',
    name: 'List',
    description: 'A flexible list component with various layouts.',
    usage: `<ul data-coral-list>
  <li data-coral-list-item>
    <div data-coral-list-content>
      <span data-coral-list-title>Title</span>
      <span data-coral-list-description>Description</span>
    </div>
  </li>
</ul>`,
    props: [
      { name: 'data-variant', type: '"default" | "bordered" | "divided"', default: '"default"', description: 'List style' },
    ],
    preview: ListPreview,
  },
  {
    id: 'calendar',
    name: 'Calendar',
    description: 'An interactive calendar component for date selection.',
    usage: `<div data-coral-calendar>
  <div data-coral-calendar-header>January 2024</div>
  <div data-coral-calendar-grid>
    <div data-coral-calendar-day data-selected>1</div>
    <div data-coral-calendar-day>2</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "range"', default: '"default"', description: 'Selection mode' },
      { name: 'data-multiple', type: 'boolean', default: 'false', description: 'Allow multiple dates' },
    ],
    preview: CalendarPreview,
  },
  {
    id: 'comment',
    name: 'Comment',
    description: 'A threaded comment component with replies and reactions.',
    usage: `<div data-coral-comment>
  <div data-coral-comment-avatar>JD</div>
  <div data-coral-comment-content>
    <div data-coral-comment-header>
      <span data-coral-comment-author>John Doe</span>
      <time data-coral-comment-time>2 hours ago</time>
    </div>
    <p data-coral-comment-text>Great component!</p>
    <div data-coral-comment-actions>
      <button data-coral-comment-like>Like (12)</button>
      <button data-coral-comment-reply>Reply</button>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "minimal"', default: '"default"', description: 'Visual style' },
      { name: 'data-collapsible', type: 'boolean', default: 'false', description: 'Allow collapsing' },
    ],
    preview: CommentPreview,
  },
  {
    id: 'tree-view',
    name: 'TreeView',
    description: 'A hierarchical tree structure for displaying nested data.',
    usage: `<div data-coral-tree-view>
  <div data-coral-tree-item>
    <div data-coral-tree-content>
      <span>Parent</span>
    </div>
    <div data-coral-tree-children>
      <div data-coral-tree-item>
        <div data-coral-tree-content>Child</div>
      </div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-selectable', type: 'boolean', default: 'false', description: 'Enable selection' },
      { name: 'data-checkable', type: 'boolean', default: 'false', description: 'Show checkboxes' },
    ],
    preview: TreeViewPreview,
  },
  {
    id: 'rating',
    name: 'Rating',
    description: 'A star rating component for reviews and feedback.',
    usage: `<div data-coral-rating data-value="4" data-max="5">
  <button data-coral-rating-star data-value="1">★</button>
  <button data-coral-rating-star data-value="2">★</button>
  <button data-coral-rating-star data-value="3">★</button>
  <button data-coral-rating-star data-value="4">★</button>
  <button data-coral-rating-star data-value="5">★</button>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: '0', description: 'Selected rating' },
      { name: 'data-max', type: 'number', default: '5', description: 'Maximum stars' },
      { name: 'data-readonly', type: 'boolean', default: 'false', description: 'Disable interaction' },
    ],
    preview: RatingPreview,
  },
  {
    id: 'data-grid',
    name: 'DataGrid',
    description: 'Advanced data table with sorting, filtering, and actions.',
    usage: `<table data-coral-data-grid>
  <thead>
    <tr>
      <th>Name</th>
      <th>Email</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>John Doe</td>
      <td>john@example.com</td>
    </tr>
  </tbody>
</table>`,
    props: [
      { name: 'data-selectable', type: 'boolean', default: 'false', description: 'Enable row selection' },
      { name: 'data-sortable', type: 'boolean', default: 'true', description: 'Enable column sorting' },
    ],
    preview: DataGridPreview,
  },
  {
    id: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation trail showing hierarchy and current location.',
    usage: `<nav data-coral-breadcrumb>
  <a href="/">Home</a>
  <span>Components</span>
  <span>Breadcrumb</span>
</nav>`,
    props: [
      { name: 'data-separator', type: 'string', default: '"/"', description: 'Custom separator' },
      { name: 'data-truncate', type: 'boolean', default: 'false', description: 'Truncate long paths' },
    ],
    preview: BreadcrumbPreview,
  },
  {
    id: 'chip',
    name: 'Chip',
    description: 'Interactive pill-shaped elements for filters and selections.',
    usage: `<div data-coral-chip data-selected>Option 1</div>
<div data-coral-chip>Option 2</div>`,
    props: [
      { name: 'data-selected', type: 'boolean', default: 'false', description: 'Selected state' },
      { name: 'data-removable', type: 'boolean', default: 'false', description: 'Show remove button' },
    ],
    preview: ChipPreview,
  },
  {
    id: 'alert',
    name: 'Alert',
    description: 'Contextual alert messages for notifications and feedback.',
    usage: `<div data-coral-alert data-variant="success">
  <div data-coral-alert-icon></div>
  <div data-coral-alert-content>
    <h4>Success!</h4>
    <p>Your changes have been saved.</p>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"success" | "warning" | "error" | "info"', default: '"info"', description: 'Alert type' },
      { name: 'data-dismissible', type: 'boolean', default: 'false', description: 'Show close button' },
    ],
    preview: AlertPreview,
  },
  {
    id: 'divider',
    name: 'Divider',
    description: 'Horizontal or vertical content separator.',
    usage: `<div data-coral-divider>
  <span>OR</span>
</div>`,
    props: [
      { name: 'data-orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Divider direction' },
      { name: 'data-with-text', type: 'boolean', default: 'false', description: 'Show text in center' },
    ],
    preview: DividerPreview,
  },
  {
    id: 'card-group',
    name: 'CardGroup',
    description: 'A group of related cards with consistent styling.',
    usage: `<div data-coral-card-group>
  <div data-coral-card>
    <div data-coral-card-icon></div>
    <h3>Card Title</h3>
    <p>Card description</p>
  </div>
</div>`,
    props: [
      { name: 'data-columns', type: 'number', default: '3', description: 'Number of columns' },
      { name: 'data-gap', type: 'number', default: '4', description: 'Gap between cards' },
    ],
    preview: CardGroupPreview,
  },
  {
    id: 'tag-cloud',
    name: 'TagCloud',
    description: 'Weighted tags with varying sizes based on importance.',
    usage: `<div data-coral-tag-cloud>
  <span data-coral-tag data-weight="10">React</span>
  <span data-coral-tag data-weight="8">TypeScript</span>
</div>`,
    props: [
      { name: 'data-min-size', type: 'number', default: '0.75', description: 'Minimum font size (rem)' },
      { name: 'data-max-size', type: 'number', default: '1.5', description: 'Maximum font size (rem)' },
    ],
    preview: TagCloudPreview,
  },
  {
    id: 'pagination',
    name: 'Pagination',
    description: 'Navigate through multiple pages of content.',
    usage: `<nav data-coral-pagination>
  <button data-coral-pagination-prev></button>
  <button data-coral-page data-page="1">1</button>
  <button data-coral-page data-page="2">2</button>
  <button data-coral-pagination-next></button>
</nav>`,
    props: [
      { name: 'data-current', type: 'number', default: '1', description: 'Current page' },
      { name: 'data-total', type: 'number', default: '10', description: 'Total pages' },
    ],
    preview: PaginationPreview,
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    description: 'Hover-activated information overlay.',
    usage: `<div data-coral-tooltip>
  <button>Hover me</button>
  <div data-coral-tooltip-content>Tooltip text</div>
</div>`,
    props: [
      { name: 'data-position', type: '"top" | "bottom" | "left" | "right"', default: '"top"', description: 'Tooltip position' },
      { name: 'data-trigger', type: '"hover" | "click"', default: '"hover"', description: 'Trigger method' },
    ],
    preview: TooltipPreview,
  },
  {
    id: 'image-card',
    name: 'ImageCard',
    description: 'Card component optimized for image display with metadata.',
    usage: `<div data-coral-image-card>
  <div data-coral-image-card-image></div>
  <div data-coral-image-card-content>
    <h3>Image Title</h3>
    <p>Image description</p>
    <div data-coral-image-card-meta>Metadata</div>
  </div>
</div>`,
    props: [
      { name: 'data-ratio', type: '"16:9" | "4:3" | "1:1" | "auto"', default: '"16:9"', description: 'Image aspect ratio' },
      { name: 'data-hoverable', type: 'boolean', default: 'true', description: 'Enable hover effects' },
    ],
    preview: ImageCardPreview,
  },
  {
    id: 'testimonial',
    name: 'Testimonial',
    description: 'Customer testimonials with ratings and author information.',
    usage: `<div data-coral-testimonial>
  <div data-coral-testimonial-avatar></div>
  <div data-coral-testimonial-content>
    <blockquote>Testimonial text</blockquote>
    <div data-coral-testimonial-author>
      <span data-coral-testimonial-name>Author Name</span>
      <span data-coral-testimonial-role>Role</span>
    </div>
    <div data-coral-testimonial-rating></div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display style' },
      { name: 'data-show-rating', type: 'boolean', default: 'true', description: 'Show star rating' },
    ],
    preview: TestimonialPreview,
  },
]

function DataDisplayPage() {
  return (
    <ComponentPageLayout
      categoryName="Data Display"
      categoryId="data-display"
      components={dataDisplayComponents}
      accessibilityFeatures={[
        'Screen reader support',
        'ARIA labels',
        'Proper semantics',
        'Color contrast',
      ]}
    />
  )
}

export default DataDisplayPage
