import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Dashboard Component Previews
function StatsCardPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Total Revenue</span>
          <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-foreground">$45,231</div>
        <div className="text-sm text-emerald-500 mt-1">+12.5% from last month</div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Active Users</span>
          <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-foreground">2,350</div>
        <div className="text-sm text-blue-500 mt-1">+8.2% from last month</div>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border shadow-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Conversion Rate</span>
          <svg className="w-5 h-5 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <div className="text-2xl font-bold text-foreground">3.24%</div>
        <div className="text-sm text-violet-500 mt-1">-0.5% from last month</div>
      </div>
    </div>
  )
}

function MetricCardPreview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-500/20 dark:to-coral-600/20 rounded-xl p-6 border border-coral-200 dark:border-coral-500/30">
        <div className="text-coral-600 dark:text-coral-400 text-sm font-medium mb-2">Orders</div>
        <div className="text-3xl font-bold text-coral-700 dark:text-coral-300">1,249</div>
        <div className="text-xs text-coral-600 dark:text-coral-400 mt-1">↗ 12% vs last week</div>
      </div>

      <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-500/20 dark:to-emerald-600/20 rounded-xl p-6 border border-emerald-200 dark:border-emerald-500/30">
        <div className="text-emerald-600 dark:text-emerald-400 text-sm font-medium mb-2">Revenue</div>
        <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">$89K</div>
        <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">↗ 8% vs last week</div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-500/20 dark:to-blue-600/20 rounded-xl p-6 border border-blue-200 dark:border-blue-500/30">
        <div className="text-blue-600 dark:text-blue-400 text-sm font-medium mb-2">Visitors</div>
        <div className="text-3xl font-bold text-blue-700 dark:text-blue-300">12.5K</div>
        <div className="text-xs text-blue-600 dark:text-blue-400 mt-1">↗ 15% vs last week</div>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-500/20 dark:to-amber-600/20 rounded-xl p-6 border border-amber-200 dark:border-amber-500/30">
        <div className="text-amber-600 dark:text-amber-400 text-sm font-medium mb-2">Conversion</div>
        <div className="text-3xl font-bold text-amber-700 dark:text-amber-300">4.2%</div>
        <div className="text-xs text-amber-600 dark:text-amber-400 mt-1">↘ 2% vs last week</div>
      </div>
    </div>
  )
}

function CounterPreview() {
  const [value, setValue] = useState(0)
  return (
    <div className="text-center">
      <div className="text-6xl font-bold text-primary mb-4">{value.toLocaleString()}</div>
      <div className="flex gap-2 justify-center">
        <button onClick={() => setValue(v => v - 100)} className="px-4 py-2 bg-muted rounded-lg">-100</button>
        <button onClick={() => setValue(v => v + 100)} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg">+100</button>
      </div>
    </div>
  )
}

function ProgressRingPreview() {
  return (
    <div className="flex gap-8 items-center justify-center">
      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted-foreground/20"/>
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="62.8" className="text-emerald-500"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">75%</span>
        </div>
      </div>

      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted-foreground/20"/>
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="125.6" className="text-blue-500"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">50%</span>
        </div>
      </div>

      <div className="relative w-24 h-24">
        <svg className="w-24 h-24 transform -rotate-90">
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" className="text-muted-foreground/20"/>
          <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="none" strokeDasharray="251.2" strokeDashoffset="188.4" className="text-coral-500"/>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold">25%</span>
        </div>
      </div>
    </div>
  )
}

function ActivityFeedPreview() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'purchased', item: 'Pro Subscription', time: '2 minutes ago', avatar: 'JD' },
    { id: 2, user: 'Jane Smith', action: 'signed up', item: 'Free Trial', time: '5 minutes ago', avatar: 'JS' },
    { id: 3, user: 'Bob Johnson', action: 'upgraded', item: 'Enterprise Plan', time: '1 hour ago', avatar: 'BJ' },
    { id: 4, user: 'Alice Brown', action: 'purchased', item: 'Course Bundle', time: '2 hours ago', avatar: 'AB' },
  ]

  return (
    <div className="bg-card rounded-xl border border-border p-6">
      <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
              {activity.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-muted-foreground">{activity.action}</span>
                {' '}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function KPIWidgetPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm md:text-base">Monthly Target</h3>
          <span className="text-xs px-2 py-1 bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-full">On Track</span>
        </div>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>Revenue</span>
              <span className="font-medium">$45,231 / $50,000</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full" style={{width: '90%'}}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs md:text-sm mb-1">
              <span>New Customers</span>
              <span className="font-medium">234 / 300</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{width: '78%'}}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
        <h3 className="font-semibold mb-4 text-sm md:text-base">Top Performers</h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-coral-500/20 flex items-center justify-center text-coral-600 dark:text-coral-400 text-xs md:text-sm font-medium">JD</div>
              <span className="text-xs md:text-sm">John Doe</span>
            </div>
            <span className="text-xs md:text-sm font-medium text-emerald-500">$12,450</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400 text-xs md:text-sm font-medium">JS</div>
              <span className="text-xs md:text-sm">Jane Smith</span>
            </div>
            <span className="text-xs md:text-sm font-medium text-emerald-500">$8,230</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 text-xs md:text-sm font-medium">BJ</div>
              <span className="text-xs md:text-sm">Bob Johnson</span>
            </div>
            <span className="text-xs md:text-sm font-medium text-emerald-500">$7,890</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function SalesChartPreview() {
  const [activeTab, setActiveTab] = useState('week')

  const data = {
    week: [12, 19, 15, 25, 22, 30, 28],
    month: [120, 150, 135, 170, 160, 190, 175],
    year: [1200, 1350, 1500, 1650, 1800, 1950, 2100]
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <h3 className="font-semibold text-sm md:text-base">Sales Overview</h3>
        <div className="flex gap-1 bg-muted p-1 rounded-lg w-fit">
          {['week', 'month', 'year'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded-md text-xs md:text-sm transition-colors ${
                activeTab === tab
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-end gap-1 md:gap-2 h-40">
        {data[activeTab as keyof typeof data].map((value, index) => {
          const maxValue = Math.max(...data[activeTab as keyof typeof data])
          const height = (value / maxValue) * 100
          return (
            <div
              key={index}
              className="flex-1 bg-gradient-to-t from-coral-500 to-coral-400 rounded-t-md transition-all hover:opacity-80"
              style={{ height: `${height}%` }}
              title={`$${value}k`}
            />
          )
        })}
      </div>

      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <span>Mon</span>
        <span>Tue</span>
        <span>Wed</span>
        <span>Thu</span>
        <span>Fri</span>
        <span>Sat</span>
        <span>Sun</span>
      </div>
    </div>
  )
}

function TeamOverviewPreview() {
  const team = [
    { id: 1, name: 'John Doe', role: 'Designer', avatar: 'JD', status: 'online', tasks: 8 },
    { id: 2, name: 'Jane Smith', role: 'Developer', avatar: 'JS', status: 'online', tasks: 5 },
    { id: 3, name: 'Bob Johnson', role: 'Manager', avatar: 'BJ', status: 'away', tasks: 3 },
    { id: 4, name: 'Alice Brown', role: 'Developer', avatar: 'AB', status: 'busy', tasks: 7 },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Team Overview</h3>
      <div className="space-y-4">
        {team.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm md:text-base">
                  {member.avatar}
                </div>
                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full border-2 border-background ${
                  member.status === 'online' ? 'bg-emerald-500' :
                  member.status === 'away' ? 'bg-amber-500' : 'bg-coral-500'
                }`} />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">{member.name}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm md:text-base font-medium">{member.tasks}</div>
              <div className="text-xs text-muted-foreground">tasks</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentOrdersPreview() {
  const orders = [
    { id: '#1245', customer: 'John Doe', amount: '$299', status: 'completed', date: '2 hours ago' },
    { id: '#1244', customer: 'Jane Smith', amount: '$149', status: 'pending', date: '4 hours ago' },
    { id: '#1243', customer: 'Bob Johnson', amount: '$599', status: 'processing', date: '6 hours ago' },
    { id: '#1242', customer: 'Alice Brown', amount: '$89', status: 'completed', date: '1 day ago' },
  ]

  const statusColors: Record<string, string> = {
    completed: 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400',
    pending: 'bg-amber-500/20 text-amber-600 dark:text-amber-400',
    processing: 'bg-blue-500/20 text-blue-600 dark:text-blue-400',
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Recent Orders</h3>
      <div className="space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-background flex items-center justify-center">
                <svg className="w-5 h-5 md:w-6 md:h-6 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">{order.id}</p>
                <p className="text-xs md:text-sm text-muted-foreground">{order.customer}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-sm md:text-base">{order.amount}</p>
              <div className="flex items-center gap-2 justify-end">
                <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[order.status]}`}>
                  {order.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationPanelPreview() {
  const notifications = [
    { id: 1, title: 'New order received', message: 'Order #1245 from John Doe', time: '2 min ago', type: 'order' },
    { id: 2, title: 'Payment received', message: '$299 payment confirmed', time: '5 min ago', type: 'payment' },
    { id: 3, title: 'User registered', message: 'New user signup', time: '10 min ago', type: 'user' },
    { id: 4, title: 'Server maintenance', message: 'Scheduled for tonight', time: '1 hour ago', type: 'system' },
  ]

  const icons: Record<string, JSX.Element> = {
    order: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>,
    payment: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    user: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" /></svg>,
    system: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm md:text-base">Notifications</h3>
        <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">4 new</span>
      </div>
      <div className="space-y-3">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              {icons[notification.type]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm md:text-base truncate">{notification.title}</p>
              <p className="text-xs md:text-sm text-muted-foreground truncate">{notification.message}</p>
              <p className="text-xs text-muted-foreground mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function GoalTrackerPreview() {
  const goals = [
    { id: 1, title: 'Monthly Revenue', target: 50000, current: 45231, color: 'emerald' },
    { id: 2, title: 'New Customers', target: 300, current: 234, color: 'blue' },
    { id: 3, title: 'Conversion Rate', target: 5, current: 3.24, color: 'coral' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Goal Tracker</h3>
      <div className="space-y-4 md:space-y-6">
        {goals.map((goal) => {
          const percentage = Math.min((goal.current / goal.target) * 100, 100)
          return (
            <div key={goal.id}>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">{goal.title}</span>
                <span className="text-muted-foreground">{goal.current} / {goal.target}</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full bg-${goal.color}-500 rounded-full transition-all`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0</span>
                <span className="font-medium">{percentage.toFixed(0)}%</span>
                <span>{goal.target}</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

function PerformanceMetersPreview() {
  const metrics = [
    { label: 'CPU Usage', value: 68, color: 'emerald' },
    { label: 'Memory', value: 45, color: 'blue' },
    { label: 'Storage', value: 82, color: 'amber' },
    { label: 'Network', value: 34, color: 'violet' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric) => (
        <div key={metric.label} className="bg-card rounded-xl p-4 md:p-6 border border-border text-center">
          <div className="relative w-20 h-20 md:w-24 md:h-24 mx-auto mb-3">
            <svg className="w-20 h-20 md:w-24 md:h-24 transform -rotate-90">
              <circle cx="40" cy="40" r="32" stroke="currentColor" strokeWidth="6" fill="none" className="text-muted-foreground/20"/>
              <circle
                cx="40" cy="40" r="32"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeDasharray="201.06"
                strokeDashoffset={201.06 - (201.06 * metric.value / 100)}
                className={`text-${metric.color}-500 transition-all`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg md:text-xl font-bold">{metric.value}%</span>
            </div>
          </div>
          <p className="text-xs md:text-sm font-medium text-muted-foreground">{metric.label}</p>
        </div>
      ))}
    </div>
  )
}

function RevenueBreakdownPreview() {
  const revenue = [
    { source: 'Subscriptions', amount: 24500, percentage: 54, color: 'emerald' },
    { source: 'One-time', amount: 12300, percentage: 27, color: 'blue' },
    { source: 'Add-ons', amount: 8420, percentage: 19, color: 'amber' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Revenue Breakdown</h3>
      <div className="space-y-4">
        {revenue.map((item) => (
          <div key={item.source}>
            <div className="flex justify-between text-sm mb-2">
              <span className="font-medium">{item.source}</span>
              <span className="text-muted-foreground">${item.amount.toLocaleString()}</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full bg-${item.color}-500 rounded-full transition-all`}
                style={{ width: `${item.percentage}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{item.percentage}%</span>
              <span className="font-medium">${item.amount.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function UserActivityPreview() {
  const activities = [
    { id: 1, user: 'John Doe', action: 'created a project', time: '2 minutes ago', icon: 'create' },
    { id: 2, user: 'Jane Smith', action: 'commented on task', time: '5 minutes ago', icon: 'comment' },
    { id: 3, user: 'Bob Johnson', action: 'uploaded files', time: '10 minutes ago', icon: 'upload' },
    { id: 4, user: 'Alice Brown', action: 'closed a ticket', time: '15 minutes ago', icon: 'close' },
  ]

  const icons: Record<string, JSX.Element> = {
    create: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>,
    comment: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    upload: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>,
    close: <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>,
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">User Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
              {icons[activity.icon]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>
                {' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TaskListPreview() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Review pull requests', completed: true },
    { id: 2, text: 'Update documentation', completed: false },
    { id: 3, text: 'Fix bugs in dashboard', completed: true },
    { id: 4, text: 'Write unit tests', completed: false },
    { id: 5, text: 'Deploy to production', completed: false },
  ])

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm md:text-base">Task List</h3>
        <span className="text-xs px-2 py-1 bg-muted rounded-full">{tasks.filter(t => t.completed).length}/{tasks.length}</span>
      </div>
      <div className="space-y-2">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toggleTask(task.id)}>
            <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              task.completed ? 'bg-emerald-500 border-emerald-500' : 'border-muted-foreground'
            }`}>
              {task.completed && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={`text-sm md:text-base ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
              {task.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function QuickStatsPreview() {
  const stats = [
    { label: 'Page Views', value: '24.5K', change: '+12%', icon: 'view' },
    { label: 'Unique Visitors', value: '8.2K', change: '+8%', icon: 'users' },
    { label: 'Bounce Rate', value: '32%', change: '-3%', icon: 'bounce' },
    { label: 'Avg. Session', value: '4:32', change: '+5%', icon: 'time' },
  ]

  const icons: Record<string, JSX.Element> = {
    view: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
    users: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    bounce: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>,
    time: <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card rounded-xl p-3 md:p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              {icons[stat.icon]}
            </div>
            <span className={`text-xs font-medium ${
              stat.change.startsWith('+') ? 'text-emerald-500' : 'text-coral-500'
            }`}>
              {stat.change}
            </span>
          </div>
          <p className="text-xl md:text-2xl font-bold text-foreground mb-1">{stat.value}</p>
          <p className="text-xs md:text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  )
}

function UptimeMonitorPreview() {
  const services = [
    { name: 'API Server', status: 'up', uptime: '99.99%', lastCheck: '2s ago' },
    { name: 'Database', status: 'up', uptime: '99.95%', lastCheck: '5s ago' },
    { name: 'CDN', status: 'up', uptime: '100%', lastCheck: '10s ago' },
    { name: 'Auth Service', status: 'degraded', uptime: '98.5%', lastCheck: '3s ago' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">System Status</h3>
      <div className="space-y-3">
        {services.map((service) => (
          <div key={service.name} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${
                service.status === 'up' ? 'bg-emerald-500' : 'bg-amber-500'
              }`} />
              <span className="text-sm font-medium">{service.name}</span>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium text-emerald-500">{service.uptime}</div>
              <div className="text-xs text-muted-foreground">{service.lastCheck}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function WorldMapPreview() {
  const countries = [
    { code: 'US', name: 'United States', visitors: 45, x: 70, y: 45 },
    { code: 'UK', name: 'United Kingdom', visitors: 28, x: 165, y: 35 },
    { code: 'DE', name: 'Germany', visitors: 22, x: 175, y: 40 },
    { code: 'JP', name: 'Japan', visitors: 18, x: 285, y: 45 },
    { code: 'AU', name: 'Australia', visitors: 12, x: 270, y: 100 },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Traffic by Location</h3>
      <div className="relative h-40 bg-muted/30 rounded-lg overflow-hidden">
        {countries.map((country) => (
          <div
            key={country.code}
            className="absolute w-4 h-4 bg-primary rounded-full cursor-pointer animate-pulse"
            style={{ left: country.x, top: country.y }}
            title={`${country.name}: ${country.visitors}%`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4">
        {countries.slice(0, 4).map((country) => (
          <div key={country.code} className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{country.name}</span>
            <span className="font-medium">{country.visitors}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CalendarWidgetPreview() {
  const today = new Date()
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S']

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-sm md:text-base">
          {today.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex gap-1">
          <button className="p-1 hover:bg-muted rounded">←</button>
          <button className="p-1 hover:bg-muted rounded">→</button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {days.map((day) => (
          <div key={day} className="text-xs text-muted-foreground py-1">{day}</div>
        ))}
        {Array.from({ length: 35 }, (_, i) => {
          const dayNum = i - 3
          const isToday = dayNum === today.getDate()
          return (
            <div
              key={i}
              className={`text-sm py-1 rounded ${
                isToday ? 'bg-primary text-primary-foreground' :
                dayNum > 0 && dayNum <= 31 ? 'hover:bg-muted cursor-pointer' : 'text-muted-foreground/30'
              }`}
            >
              {dayNum > 0 && dayNum <= 31 ? dayNum : ''}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function WeatherWidgetPreview() {
  return (
    <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl p-4 md:p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm opacity-80">San Francisco</p>
          <p className="text-4xl font-bold mt-1">72°F</p>
          <p className="text-sm opacity-80 mt-2">Partly Cloudy</p>
        </div>
        <svg className="w-20 h-20 opacity-80" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6.76 4.84l-1.8-1.79-1.41 1.41 1.79 1.79 1.42-1.41zM4 10.5H1v2h3v-2zm9-9.95h-2V3.5h2V.55zm7.45 3.91l-1.41-1.41-1.79 1.79 1.41 1.41 1.79-1.79zm-3.21 13.7l1.79 1.8 1.41-1.41-1.8-1.79-1.4 1.4zM20 10.5v2h3v-2h-3zm-8-5c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" />
        </svg>
      </div>
      <div className="flex justify-between mt-4 text-sm">
        <div className="text-center">
          <p className="opacity-80">Mon</p>
          <p className="font-medium">75°</p>
        </div>
        <div className="text-center">
          <p className="opacity-80">Tue</p>
          <p className="font-medium">68°</p>
        </div>
        <div className="text-center">
          <p className="opacity-80">Wed</p>
          <p className="font-medium">71°</p>
        </div>
        <div className="text-center">
          <p className="opacity-80">Thu</p>
          <p className="font-medium">73°</p>
        </div>
      </div>
    </div>
  )
}

function SpeedDialPreview() {
  const [open, setOpen] = useState(false)
  const actions = [
    { icon: '+', label: 'Add' },
    { icon: '✉', label: 'Email' },
    { icon: '📊', label: 'Report' },
  ]

  return (
    <div className="relative h-48 flex items-end justify-end">
      {open && (
        <div className="absolute bottom-16 right-0 space-y-2">
          {actions.map((action, i) => (
            <button
              key={i}
              className="w-12 h-12 bg-card border border-border rounded-full flex items-center justify-center shadow-lg hover:bg-muted transition-all"
              title={action.label}
            >
              {action.icon}
            </button>
          ))}
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg transition-transform ${open ? 'rotate-45' : ''}`}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </button>
    </div>
  )
}

function TopProductsPreview() {
  const products = [
    { name: 'Pro Subscription', sales: 1234, revenue: '$24,680', trend: '+12%' },
    { name: 'Enterprise Plan', sales: 856, revenue: '$85,600', trend: '+8%' },
    { name: 'Team License', sales: 642, revenue: '$19,260', trend: '+15%' },
    { name: 'Starter Kit', sales: 428, revenue: '$4,280', trend: '-3%' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Top Products</h3>
      <div className="space-y-3">
        {products.map((product, i) => (
          <div key={product.name} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
              {i + 1}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">{product.sales} sales</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">{product.revenue}</p>
              <p className={`text-xs ${product.trend.startsWith('+') ? 'text-emerald-500' : 'text-coral-500'}`}>
                {product.trend}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function CustomerSegmentsPreview() {
  const segments = [
    { name: 'Enterprise', count: 245, percentage: 35, color: 'bg-primary' },
    { name: 'SMB', count: 512, percentage: 40, color: 'bg-blue-500' },
    { name: 'Startup', count: 328, percentage: 25, color: 'bg-emerald-500' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Customer Segments</h3>
      <div className="flex h-4 rounded-full overflow-hidden mb-4">
        {segments.map((segment) => (
          <div key={segment.name} className={`${segment.color}`} style={{ width: `${segment.percentage}%` }} />
        ))}
      </div>
      <div className="space-y-2">
        {segments.map((segment) => (
          <div key={segment.name} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded ${segment.color}`} />
              <span className="text-sm">{segment.name}</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{segment.count}</span>
              <span className="text-xs text-muted-foreground w-8">{segment.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ServerStatusPreview() {
  const servers = [
    { name: 'prod-server-01', cpu: 45, memory: 62, status: 'healthy' },
    { name: 'prod-server-02', cpu: 78, memory: 85, status: 'warning' },
    { name: 'staging-01', cpu: 23, memory: 34, status: 'healthy' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Server Health</h3>
      <div className="space-y-4">
        {servers.map((server) => (
          <div key={server.name} className="p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{server.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                server.status === 'healthy' ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'
              }`}>
                {server.status}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">CPU:</span>
                <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                  <div className={`h-full ${server.cpu > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${server.cpu}%` }} />
                </div>
              </div>
              <div>
                <span className="text-muted-foreground">Memory:</span>
                <div className="h-1.5 bg-muted rounded-full mt-1 overflow-hidden">
                  <div className={`h-full ${server.memory > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${server.memory}%` }} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TrafficSourcesPreview() {
  const sources = [
    { name: 'Organic Search', value: 45, color: 'bg-emerald-500' },
    { name: 'Direct', value: 25, color: 'bg-blue-500' },
    { name: 'Social Media', value: 18, color: 'bg-violet-500' },
    { name: 'Referral', value: 12, color: 'bg-amber-500' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Traffic Sources</h3>
      <div className="space-y-3">
        {sources.map((source) => (
          <div key={source.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{source.name}</span>
              <span className="font-medium">{source.value}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full ${source.color} rounded-full`} style={{ width: `${source.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SessionAnalyticsPreview() {
  const hours = ['12am', '4am', '8am', '12pm', '4pm', '8pm']
  const data = [15, 8, 45, 72, 85, 62]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Sessions by Hour</h3>
      <div className="flex items-end gap-2 h-32">
        {data.map((value, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-1">
            <div className="w-full bg-primary/20 rounded-t relative overflow-hidden" style={{ height: `${value}%` }}>
              <div className="absolute inset-0 bg-primary opacity-60" />
            </div>
            <span className="text-xs text-muted-foreground">{hours[i]}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <div>
          <p className="text-muted-foreground">Peak Hour</p>
          <p className="font-medium">4:00 PM</p>
        </div>
        <div className="text-right">
          <p className="text-muted-foreground">Avg. Duration</p>
          <p className="font-medium">4m 32s</p>
        </div>
      </div>
    </div>
  )
}

function ConversionFunnelPreview() {
  const steps = [
    { name: 'Visitors', value: 10000, percentage: 100 },
    { name: 'Sign Ups', value: 3500, percentage: 35 },
    { name: 'Activated', value: 2100, percentage: 21 },
    { name: 'Paid', value: 840, percentage: 8.4 },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Conversion Funnel</h3>
      <div className="space-y-3">
        {steps.map((step, i) => (
          <div key={step.name}>
            <div className="flex justify-between text-sm mb-1">
              <span>{step.name}</span>
              <span className="font-medium">{step.value.toLocaleString()}</span>
            </div>
            <div className="h-8 bg-muted rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-primary/60 flex items-center justify-end pr-2"
                style={{ width: `${step.percentage}%` }}
              >
                <span className="text-xs text-white font-medium">{step.percentage}%</span>
              </div>
            </div>
            {i < steps.length - 1 && (
              <div className="text-center text-xs text-muted-foreground mt-1">
                ↓ {((steps[i + 1].value / step.value) * 100).toFixed(0)}% conversion
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function ProjectTimelinePreview() {
  const projects = [
    { name: 'Website Redesign', progress: 75, deadline: 'Jan 15', status: 'on-track' },
    { name: 'Mobile App v2', progress: 45, deadline: 'Feb 1', status: 'at-risk' },
    { name: 'API Integration', progress: 90, deadline: 'Jan 10', status: 'completed' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Project Timeline</h3>
      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{project.name}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                project.status === 'completed' ? 'bg-emerald-500/20 text-emerald-500' :
                project.status === 'at-risk' ? 'bg-amber-500/20 text-amber-500' :
                'bg-blue-500/20 text-blue-500'
              }`}>
                {project.status}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  project.status === 'completed' ? 'bg-emerald-500' :
                  project.status === 'at-risk' ? 'bg-amber-500' : 'bg-blue-500'
                }`}
                style={{ width: `${project.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>{project.progress}%</span>
              <span>Due: {project.deadline}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function BudgetGaugePreview() {
  const spent = 67500
  const total = 100000
  const percentage = (spent / total) * 100

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border text-center">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Budget Status</h3>
      <div className="relative w-32 h-32 mx-auto">
        <svg className="w-32 h-32 transform -rotate-90">
          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="12" fill="none" className="text-muted-foreground/20" />
          <circle
            cx="64" cy="64" r="56"
            stroke="currentColor"
            strokeWidth="12"
            fill="none"
            strokeDasharray="351.86"
            strokeDashoffset={351.86 - (351.86 * percentage / 100)}
            className={percentage > 80 ? 'text-amber-500' : 'text-emerald-500'}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold">{percentage.toFixed(0)}%</span>
          <span className="text-xs text-muted-foreground">used</span>
        </div>
      </div>
      <div className="mt-4 space-y-1">
        <p className="text-lg font-bold">${spent.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">of ${total.toLocaleString()} budget</p>
      </div>
    </div>
  )
}

function LeaderboardPreview() {
  const leaders = [
    { rank: 1, name: 'Sarah Chen', score: 9850, avatar: 'SC' },
    { rank: 2, name: 'Mike Johnson', score: 8720, avatar: 'MJ' },
    { rank: 3, name: 'Emma Wilson', score: 7890, avatar: 'EW' },
    { rank: 4, name: 'James Brown', score: 6540, avatar: 'JB' },
    { rank: 5, name: 'Lisa Park', score: 5230, avatar: 'LP' },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Top Performers</h3>
      <div className="space-y-3">
        {leaders.map((leader) => (
          <div key={leader.rank} className="flex items-center gap-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
              leader.rank === 1 ? 'bg-amber-500 text-white' :
              leader.rank === 2 ? 'bg-gray-400 text-white' :
              leader.rank === 3 ? 'bg-amber-700 text-white' :
              'bg-muted text-muted-foreground'
            }`}>
              {leader.rank}
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm">
              {leader.avatar}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{leader.name}</p>
            </div>
            <div className="text-sm font-bold text-primary">{leader.score.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function RecentSearchesPreview() {
  const searches = [
    { query: 'dashboard components', time: '2 min ago', results: 24 },
    { query: 'chart examples', time: '5 min ago', results: 18 },
    { query: 'form validation', time: '15 min ago', results: 32 },
    { query: 'modal dialog', time: '1 hour ago', results: 12 },
  ]

  return (
    <div className="bg-card rounded-xl p-4 md:p-6 border border-border">
      <h3 className="font-semibold mb-4 text-sm md:text-base">Recent Searches</h3>
      <div className="space-y-2">
        {searches.map((search, i) => (
          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
            <svg className="w-4 h-4 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <div className="flex-1">
              <p className="text-sm">{search.query}</p>
              <p className="text-xs text-muted-foreground">{search.results} results</p>
            </div>
            <span className="text-xs text-muted-foreground">{search.time}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// Component data
const dashboardComponents = [
  {
    id: 'sales-chart',
    name: 'SalesChart',
    description: 'Interactive sales chart with time period selection.',
    usage: `<div data-coral-sales-chart>
  <div data-coral-chart-tab="week">Week</div>
  <div data-coral-chart-tab="month">Month</div>
  <div data-coral-chart-tab="year">Year</div>
  <div data-coral-chart-bars>
    <div data-coral-chart-bar="12" data-coral-chart-label="Mon"></div>
  </div>
</div>`,
    props: [
      { name: 'data-period', type: '"week" | "month" | "year"', default: '"week"', description: 'Time period' },
      { name: 'data-height', type: 'number', default: '160', description: 'Chart height in px' },
    ],
    preview: SalesChartPreview,
  },
  {
    id: 'team-overview',
    name: 'TeamOverview',
    description: 'Display team members with status indicators and task counts.',
    usage: `<div data-coral-team-overview>
  <div data-coral-team-member>
    <div data-coral-member-avatar>JD</div>
    <div data-coral-member-info>
      <div data-coral-member-name>John Doe</div>
      <div data-coral-member-role>Designer</div>
    </div>
    <div data-coral-member-tasks>8</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-show-status', type: 'boolean', default: 'true', description: 'Show status indicator' },
    ],
    preview: TeamOverviewPreview,
  },
  {
    id: 'recent-orders',
    name: 'RecentOrders',
    description: 'Display recent orders with status and customer information.',
    usage: `<div data-coral-recent-orders>
  <div data-coral-order>
    <div data-coral-order-id>#1245</div>
    <div data-coral-order-customer>John Doe</div>
    <div data-coral-order-amount>$299</div>
    <div data-coral-order-status="completed">completed</div>
  </div>
</div>`,
    props: [
      { name: 'data-max-items', type: 'number', default: '10', description: 'Maximum orders to show' },
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
    ],
    preview: RecentOrdersPreview,
  },
  {
    id: 'notification-panel',
    name: 'NotificationPanel',
    description: 'Panel for displaying system notifications and alerts.',
    usage: `<div data-coral-notification-panel>
  <div data-coral-notification data-type="order">
    <div data-coral-notification-title>New order received</div>
    <div data-coral-notification-message>Order #1245 from John Doe</div>
    <div data-coral-notification-time>2 min ago</div>
  </div>
</div>`,
    props: [
      { name: 'data-max-items', type: 'number', default: '10', description: 'Maximum notifications' },
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Compact mode' },
    ],
    preview: NotificationPanelPreview,
  },
  {
    id: 'goal-tracker',
    name: 'GoalTracker',
    description: 'Track progress towards goals with visual progress bars.',
    usage: `<div data-coral-goal-tracker>
  <div data-coral-goal>
    <div data-coral-goal-title>Monthly Revenue</div>
    <div data-coral-goal-current>45231</div>
    <div data-coral-goal-target>50000</div>
    <div data-coral-goal-progress data-value="90"></div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-color', type: '"emerald" | "blue" | "coral" | "amber"', default: '"emerald"', description: 'Progress color' },
    ],
    preview: GoalTrackerPreview,
  },
  {
    id: 'performance-meters',
    name: 'PerformanceMeters',
    description: 'Circular progress meters for system performance metrics.',
    usage: `<div data-coral-performance-meters>
  <div data-coral-meter data-label="CPU" data-value="68" data-max="100"></div>
</div>`,
    props: [
      { name: 'data-size', type: 'number', default: '96', description: 'Meter diameter in px' },
      { name: 'data-stroke', type: 'number', default: '6', description: 'Stroke width' },
    ],
    preview: PerformanceMetersPreview,
  },
  {
    id: 'revenue-breakdown',
    name: 'RevenueBreakdown',
    description: 'Show revenue sources with percentage breakdowns.',
    usage: `<div data-coral-revenue-breakdown>
  <div data-coral-revenue-item>
    <div data-coral-revenue-source>Subscriptions</div>
    <div data-coral-revenue-amount>24500</div>
    <div data-coral-revenue-percentage>54</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-show-chart', type: 'boolean', default: 'false', description: 'Show mini chart' },
    ],
    preview: RevenueBreakdownPreview,
  },
  {
    id: 'user-activity',
    name: 'UserActivity',
    description: 'Display user activities and action history.',
    usage: `<div data-coral-user-activity>
  <div data-coral-activity-item>
    <div data-coral-activity-icon>create</div>
    <div data-coral-activity-user>John Doe</div>
    <div data-coral-activity-action>created a project</div>
    <div data-coral-activity-time>2 minutes ago</div>
  </div>
</div>`,
    props: [
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Compact mode' },
      { name: 'data-max-items', type: 'number', default: '10', description: 'Maximum items' },
    ],
    preview: UserActivityPreview,
  },
  {
    id: 'task-list',
    name: 'TaskList',
    description: 'Interactive task list with completion toggle.',
    usage: `<div data-coral-task-list>
  <div data-coral-task data-completed="true">
    <div data-coral-task-checkbox></div>
    <div data-coral-task-text>Review pull requests</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-show-count', type: 'boolean', default: 'true', description: 'Show completion count' },
    ],
    preview: TaskListPreview,
  },
  {
    id: 'quick-stats',
    name: 'QuickStats',
    description: 'Quick overview of key metrics with change indicators.',
    usage: `<div data-coral-quick-stats>
  <div data-coral-stat>
    <div data-coral-stat-label>Page Views</div>
    <div data-coral-stat-value>24.5K</div>
    <div data-coral-stat-change="+12%">from last week</div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-trend-indicator', type: 'boolean', default: 'true', description: 'Show trend arrows' },
    ],
    preview: QuickStatsPreview,
  },
  {
    id: 'stats-card',
    name: 'StatsCard',
    description: 'Display key metrics and statistics with trend indicators.',
    usage: `<div data-coral-stats-card>
  <div data-coral-stats-card-label>Total Revenue</div>
  <div data-coral-stats-card-value>$45,231</div>
  <div data-coral-stats-card-trend="+12.5%">from last month</div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "gradient"', default: '"default"', description: 'Visual style variant' },
      { name: 'data-trend', type: '"up" | "down" | "neutral"', default: '"neutral"', description: 'Trend direction' },
    ],
    preview: StatsCardPreview,
  },
  {
    id: 'metric-card',
    name: 'MetricCard',
    description: 'Compact metric display with gradient backgrounds and trend indicators.',
    usage: `<div data-coral-metric-card>
  <div data-coral-metric-card-label>Orders</div>
  <div data-coral-metric-card-value>1,249</div>
  <div data-coral-metric-card-change="12%">vs last week</div>
</div>`,
    props: [
      { name: 'data-color', type: '"coral" | "emerald" | "blue" | "amber"', default: '"coral"', description: 'Accent color' },
      { name: 'data-trend', type: '"up" | "down" | "neutral"', default: '"neutral"', description: 'Trend direction' },
    ],
    preview: MetricCardPreview,
  },
  {
    id: 'counter',
    name: 'Counter',
    description: 'Animated numeric counter for displaying metrics and counts.',
    usage: `<div data-coral-counter data-target="1000" data-duration="2000">
  1000
</div>`,
    props: [
      { name: 'data-target', type: 'number', default: 'required', description: 'Target value to count to' },
      { name: 'data-duration', type: 'number', default: '2000', description: 'Animation duration in ms' },
      { name: 'data-prefix', type: 'string', default: '""', description: 'Prefix text' },
      { name: 'data-suffix', type: 'string', default: '""', description: 'Suffix text' },
    ],
    preview: CounterPreview,
  },
  {
    id: 'progress-ring',
    name: 'ProgressRing',
    description: 'Circular progress indicator with percentage display.',
    usage: `<div data-coral-progress-ring data-value="75" data-max="100">
  <span data-coral-progress-ring-label>75%</span>
</div>`,
    props: [
      { name: 'data-value', type: 'number', default: 'required', description: 'Current value' },
      { name: 'data-max', type: 'number', default: '100', description: 'Maximum value' },
      { name: 'data-size', type: 'number', default: '48', description: 'Ring size in px' },
      { name: 'data-stroke', type: 'number', default: '8', description: 'Ring thickness' },
    ],
    preview: ProgressRingPreview,
  },
  {
    id: 'activity-feed',
    name: 'ActivityFeed',
    description: 'Display user activities and timeline of actions.',
    usage: `<div data-coral-activity-feed>
  <div data-coral-activity-item>
    <div data-coral-activity-avatar>JD</div>
    <div data-coral-activity-content>
      <div data-coral-activity-text>John Doe purchased Pro Subscription</div>
      <div data-coral-activity-time>2 minutes ago</div>
    </div>
  </div>
</div>`,
    props: [
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Compact mode' },
      { name: 'data-max-items', type: 'number', default: '10', description: 'Maximum items to show' },
    ],
    preview: ActivityFeedPreview,
  },
  {
    id: 'kpi-widget',
    name: 'KPIWidget',
    description: 'Widget for tracking KPIs with progress bars and top performers.',
    usage: `<div data-coral-kpi-widget>
  <div data-coral-kpi-section>
    <h3 data-coral-kpi-title>Monthly Target</h3>
    <div data-coral-kpi-progress value="75" max="100"></div>
  </div>
</div>`,
    props: [
      { name: 'data-variant', type: '"default" | "compact"', default: '"default"', description: 'Display variant' },
      { name: 'data-trend', type: '"up" | "down" | "neutral"', default: '"neutral"', description: 'Overall trend' },
    ],
    preview: KPIWidgetPreview,
  },
  {
    id: 'uptime-monitor',
    name: 'UptimeMonitor',
    description: 'Display service status and uptime percentages.',
    usage: `<div data-coral-uptime-monitor>
  <div data-coral-service data-status="up">
    <div data-coral-service-name>API Server</div>
    <div data-coral-service-uptime>99.99%</div>
  </div>
</div>`,
    props: [
      { name: 'data-refresh', type: 'number', default: '5000', description: 'Auto-refresh interval (ms)' },
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Compact display mode' },
    ],
    preview: UptimeMonitorPreview,
  },
  {
    id: 'world-map',
    name: 'WorldMap',
    description: 'Geographic traffic visualization with hotspots.',
    usage: `<div data-coral-world-map>
  <div data-coral-map-marker data-country="US" data-value="45"></div>
  <div data-coral-map-marker data-country="UK" data-value="28"></div>
</div>`,
    props: [
      { name: 'data-theme', type: '"light" | "dark"', default: '"light"', description: 'Map color theme' },
      { name: 'data-show-legend', type: 'boolean', default: 'true', description: 'Show country legend' },
    ],
    preview: WorldMapPreview,
  },
  {
    id: 'calendar-widget',
    name: 'CalendarWidget',
    description: 'Mini calendar for date selection and event display.',
    usage: `<div data-coral-calendar>
  <div data-coral-calendar-header></div>
  <div data-coral-calendar-grid></div>
</div>`,
    props: [
      { name: 'data-selected', type: 'string', default: 'today', description: 'Selected date' },
      { name: 'data-events', type: 'boolean', default: 'false', description: 'Show event indicators' },
    ],
    preview: CalendarWidgetPreview,
  },
  {
    id: 'weather-widget',
    name: 'WeatherWidget',
    description: 'Weather display with forecast information.',
    usage: `<div data-coral-weather data-location="San Francisco">
  <div data-coral-weather-current></div>
  <div data-coral-weather-forecast></div>
</div>`,
    props: [
      { name: 'data-location', type: 'string', default: 'required', description: 'Location name' },
      { name: 'data-unit', type: '"celsius" | "fahrenheit"', default: '"fahrenheit"', description: 'Temperature unit' },
    ],
    preview: WeatherWidgetPreview,
  },
  {
    id: 'speed-dial',
    name: 'SpeedDial',
    description: 'Floating action button with expandable quick actions.',
    usage: `<div data-coral-speed-dial>
  <button data-coral-speed-dial-trigger>+</button>
  <div data-coral-speed-dial-actions>
    <button data-coral-speed-dial-action>Action 1</button>
  </div>
</div>`,
    props: [
      { name: 'data-direction', type: '"up" | "down" | "left" | "right"', default: '"up"', description: 'Expand direction' },
      { name: 'data-position', type: 'string', default: '"bottom-right"', description: 'Screen position' },
    ],
    preview: SpeedDialPreview,
  },
  {
    id: 'top-products',
    name: 'TopProducts',
    description: 'Display best-selling products with sales and revenue.',
    usage: `<div data-coral-top-products>
  <div data-coral-product data-rank="1">
    <div data-coral-product-name>Pro Subscription</div>
    <div data-coral-product-sales>1234</div>
    <div data-coral-product-revenue>$24,680</div>
  </div>
</div>`,
    props: [
      { name: 'data-limit', type: 'number', default: '5', description: 'Number of products to show' },
      { name: 'data-show-trend', type: 'boolean', default: 'true', description: 'Show trend indicator' },
    ],
    preview: TopProductsPreview,
  },
  {
    id: 'customer-segments',
    name: 'CustomerSegments',
    description: 'Visual breakdown of customer segments.',
    usage: `<div data-coral-customer-segments>
  <div data-coral-segment data-name="Enterprise" data-percentage="35"></div>
  <div data-coral-segment data-name="SMB" data-percentage="40"></div>
</div>`,
    props: [
      { name: 'data-show-counts', type: 'boolean', default: 'true', description: 'Show customer counts' },
      { name: 'data-chart-type', type: '"bar" | "pie"', default: '"bar"', description: 'Chart visualization' },
    ],
    preview: CustomerSegmentsPreview,
  },
  {
    id: 'server-status',
    name: 'ServerStatus',
    description: 'Server health monitoring with CPU and memory metrics.',
    usage: `<div data-coral-server-status>
  <div data-coral-server data-name="prod-01">
    <div data-coral-server-cpu>45</div>
    <div data-coral-server-memory>62</div>
  </div>
</div>`,
    props: [
      { name: 'data-refresh', type: 'number', default: '10000', description: 'Auto-refresh interval (ms)' },
      { name: 'data-threshold', type: 'number', default: '80', description: 'Warning threshold %' },
    ],
    preview: ServerStatusPreview,
  },
  {
    id: 'traffic-sources',
    name: 'TrafficSources',
    description: 'Display website traffic source breakdown.',
    usage: `<div data-coral-traffic-sources>
  <div data-coral-source data-name="Organic Search" data-value="45"></div>
  <div data-coral-source data-name="Direct" data-value="25"></div>
</div>`,
    props: [
      { name: 'data-show-percentage', type: 'boolean', default: 'true', description: 'Show percentage values' },
      { name: 'data-color-scheme', type: 'string', default: '"default"', description: 'Color scheme name' },
    ],
    preview: TrafficSourcesPreview,
  },
  {
    id: 'session-analytics',
    name: 'SessionAnalytics',
    description: 'Session distribution by hour with peak times.',
    usage: `<div data-coral-session-analytics>
  <div data-coral-session-bar data-hour="12am" data-value="15"></div>
  <div data-coral-session-bar data-hour="4am" data-value="8"></div>
</div>`,
    props: [
      { name: 'data-period', type: '"day" | "week"', default: '"day"', description: 'Time period' },
      { name: 'data-show-peak', type: 'boolean', default: 'true', description: 'Highlight peak hour' },
    ],
    preview: SessionAnalyticsPreview,
  },
  {
    id: 'conversion-funnel',
    name: 'ConversionFunnel',
    description: 'Visualize conversion steps with drop-off rates.',
    usage: `<div data-coral-conversion-funnel>
  <div data-coral-funnel-step data-name="Visitors" data-value="10000"></div>
  <div data-coral-funnel-step data-name="Sign Ups" data-value="3500"></div>
</div>`,
    props: [
      { name: 'data-show-conversion', type: 'boolean', default: 'true', description: 'Show conversion rates' },
      { name: 'data-orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Funnel direction' },
    ],
    preview: ConversionFunnelPreview,
  },
  {
    id: 'project-timeline',
    name: 'ProjectTimeline',
    description: 'Track project progress with deadlines and status.',
    usage: `<div data-coral-project-timeline>
  <div data-coral-project data-name="Website Redesign" data-progress="75">
    <div data-coral-project-deadline>Jan 15</div>
    <div data-coral-project-status>on-track</div>
  </div>
</div>`,
    props: [
      { name: 'data-show-deadline', type: 'boolean', default: 'true', description: 'Show deadline dates' },
      { name: 'data-compact', type: 'boolean', default: 'false', description: 'Compact display mode' },
    ],
    preview: ProjectTimelinePreview,
  },
  {
    id: 'budget-gauge',
    name: 'BudgetGauge',
    description: 'Circular gauge showing budget utilization.',
    usage: `<div data-coral-budget-gauge data-spent="67500" data-total="100000">
  <div data-coral-budget-label></div>
</div>`,
    props: [
      { name: 'data-spent', type: 'number', default: 'required', description: 'Amount spent' },
      { name: 'data-total', type: 'number', default: 'required', description: 'Total budget' },
      { name: 'data-warning-threshold', type: 'number', default: '80', description: 'Warning at %' },
    ],
    preview: BudgetGaugePreview,
  },
  {
    id: 'leaderboard',
    name: 'Leaderboard',
    description: 'Ranked list of top performers with scores.',
    usage: `<div data-coral-leaderboard>
  <div data-coral-leaderboard-item data-rank="1">
    <div data-coral-leader-name>Sarah Chen</div>
    <div data-coral-leader-score>9850</div>
  </div>
</div>`,
    props: [
      { name: 'data-limit', type: 'number', default: '5', description: 'Number of entries' },
      { name: 'data-show-medals', type: 'boolean', default: 'true', description: 'Show medal badges' },
    ],
    preview: LeaderboardPreview,
  },
  {
    id: 'recent-searches',
    name: 'RecentSearches',
    description: 'Display recent search queries with results count.',
    usage: `<div data-coral-recent-searches>
  <div data-coral-search-item>
    <div data-coral-search-query>dashboard components</div>
    <div data-coral-search-results>24 results</div>
  </div>
</div>`,
    props: [
      { name: 'data-limit', type: 'number', default: '10', description: 'Maximum searches to show' },
      { name: 'data-clickable', type: 'boolean', default: 'true', description: 'Make searches clickable' },
    ],
    preview: RecentSearchesPreview,
  },
]

export default function DashboardPage() {
  return (
    <ComponentPageLayout
      categoryName="Dashboard"
      categoryId="dashboard"
      components={dashboardComponents}
      accessibilityFeatures={[
        'Keyboard Navigation',
        'Focus Management',
        'Screen Reader Support',
        'ARIA Live Regions for Dynamic Updates',
      ]}
    />
  )
}
