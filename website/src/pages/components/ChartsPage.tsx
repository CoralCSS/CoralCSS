import { ComponentPageLayout } from './ComponentPageLayout'

// Sample data for charts
const barData = [
  { label: 'Jan', value: 65 },
  { label: 'Feb', value: 45 },
  { label: 'Mar', value: 78 },
  { label: 'Apr', value: 52 },
  { label: 'May', value: 89 },
  { label: 'Jun', value: 67 },
]

const lineData = [30, 45, 35, 60, 55, 75, 65, 80, 70, 90]

const pieData = [
  { label: 'Desktop', value: 45, color: 'bg-primary' },
  { label: 'Mobile', value: 35, color: 'bg-blue-500' },
  { label: 'Tablet', value: 20, color: 'bg-emerald-500' },
]

const heatmapData = [
  [1, 3, 5, 2, 4],
  [2, 5, 3, 4, 1],
  [4, 2, 4, 5, 3],
  [3, 4, 2, 1, 5],
  [5, 1, 3, 3, 2],
]

// Preview Components
function BarChartPreview() {
  return (
    <div className="w-full max-w-md">
      <div className="flex justify-between items-end h-48 gap-4">
        {barData.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div
              className="w-full bg-primary rounded-t transition-all hover:bg-primary/80"
              style={{ height: `${item.value}%` }}
            />
            <span className="text-xs text-muted-foreground mt-2">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LineChartPreview() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 200" className="w-full h-48">
        {[0, 50, 100, 150, 200].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.1" />
        ))}
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          points={lineData.map((v, i) => `${i * 44 + 20},${200 - v * 2}`).join(' ')}
        />
        {lineData.map((v, i) => (
          <circle
            key={i}
            cx={i * 44 + 20}
            cy={200 - v * 2}
            r="4"
            fill="hsl(var(--primary))"
          />
        ))}
      </svg>
    </div>
  )
}

function PieChartPreview() {
  return (
    <div className="flex items-center justify-center gap-8">
      <svg viewBox="0 0 100 100" className="w-48 h-48">
        {(() => {
          let cumulativePercent = 0
          const colors = ['hsl(var(--primary))', '#3b82f6', '#10b981']
          return pieData.map((slice, index) => {
            const percent = slice.value
            const startX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const startY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            cumulativePercent += percent
            const endX = Math.cos(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const endY = Math.sin(2 * Math.PI * cumulativePercent / 100) * 50 + 50
            const largeArcFlag = percent > 50 ? 1 : 0
            return (
              <path
                key={index}
                d={`M 50 50 L ${startX} ${startY} A 50 50 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                fill={colors[index]}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            )
          })
        })()}
      </svg>
      <div className="space-y-2">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DonutChartPreview() {
  return (
    <div className="flex items-center justify-center gap-8">
      <div className="relative">
        <svg viewBox="0 0 100 100" className="w-48 h-48">
          {(() => {
            let cumulativePercent = 0
            const colors = ['hsl(var(--primary))', '#3b82f6', '#10b981']
            return pieData.map((slice, index) => {
              const percent = slice.value
              const startAngle = (cumulativePercent / 100) * 360
              cumulativePercent += percent
              const endAngle = (cumulativePercent / 100) * 360
              const x1 = 50 + 40 * Math.cos((startAngle - 90) * Math.PI / 180)
              const y1 = 50 + 40 * Math.sin((startAngle - 90) * Math.PI / 180)
              const x2 = 50 + 40 * Math.cos((endAngle - 90) * Math.PI / 180)
              const y2 = 50 + 40 * Math.sin((endAngle - 90) * Math.PI / 180)
              const largeArc = percent > 50 ? 1 : 0
              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={colors[index]}
                  strokeWidth="15"
                  className="hover:opacity-80 transition-opacity cursor-pointer"
                />
              )
            })
          })()}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-2xl font-bold text-foreground">100%</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>
      <div className="space-y-2">
        {pieData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${item.color}`} />
            <span className="text-sm text-muted-foreground">{item.label}</span>
            <span className="text-sm font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function AreaChartPreview() {
  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 200" className="w-full h-48">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.05" />
          </linearGradient>
        </defs>
        {[0, 50, 100, 150].map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="currentColor" strokeOpacity="0.1" />
        ))}
        <path
          d={`M20,200 L20,${200 - lineData[0] * 2} ${lineData.map((v, i) => `L${i * 44 + 20},${200 - v * 2}`).join(' ')} L${(lineData.length - 1) * 44 + 20},200 Z`}
          fill="url(#areaGradient)"
        />
        <polyline
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="2"
          points={lineData.map((v, i) => `${i * 44 + 20},${200 - v * 2}`).join(' ')}
        />
      </svg>
    </div>
  )
}

function SparklinePreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Revenue</span>
        <svg viewBox="0 0 100 30" className="w-24 h-6">
          <polyline
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
            points="0,20 15,15 30,18 45,10 60,12 75,5 100,8"
          />
        </svg>
        <span data-coral-badge data-variant="success">+12%</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-20">Users</span>
        <svg viewBox="0 0 100 30" className="w-24 h-6">
          {[20, 15, 25, 18, 22, 28, 24].map((h, i) => (
            <rect key={i} x={i * 14 + 1} y={30 - h} width="10" height={h} fill="hsl(var(--primary))" rx="1" />
          ))}
        </svg>
        <span data-coral-badge data-variant="info">+8%</span>
      </div>
    </div>
  )
}

function GaugePreview() {
  return (
    <div className="flex justify-center gap-8 flex-wrap">
      <div className="relative w-32 h-32">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <circle cx="50" cy="50" r="40" fill="none" stroke="hsl(var(--muted))" strokeWidth="8" />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray="251"
            strokeDashoffset="75"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">70%</span>
        </div>
      </div>
    </div>
  )
}

function MeterPreview() {
  return (
    <div className="w-full max-w-sm space-y-6">
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Storage Used</span>
          <span className="text-foreground font-medium">75%</span>
        </div>
        <div data-coral-progress data-value="75">
          <div data-coral-progress-bar />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">Performance Score</span>
          <span className="text-foreground font-medium">85/100</span>
        </div>
        <div data-coral-progress data-value="85" data-variant="success">
          <div data-coral-progress-bar />
        </div>
      </div>
    </div>
  )
}

function HeatmapPreview() {
  return (
    <div className="flex gap-4">
      <div className="grid gap-1">
        {heatmapData.map((row, rowIndex) => (
          <div key={rowIndex} className="flex gap-1">
            {row.map((value, colIndex) => {
              const intensity = value / 5
              return (
                <div
                  key={colIndex}
                  className="w-10 h-10 rounded flex items-center justify-center text-xs font-medium transition-transform hover:scale-110 cursor-pointer"
                  style={{
                    backgroundColor: `hsl(var(--primary) / ${intensity})`,
                    color: intensity > 0.5 ? 'hsl(var(--primary-foreground))' : 'hsl(var(--foreground))',
                  }}
                >
                  {value}
                </div>
              )
            })}
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-between text-xs text-muted-foreground">
        <span>High</span>
        <div className="w-4 h-24 bg-gradient-to-b from-primary to-primary/10 rounded" />
        <span>Low</span>
      </div>
    </div>
  )
}

function RadarChartPreview() {
  const metrics = [
    { label: 'Performance', value: 85 },
    { label: 'Quality', value: 92 },
    { label: 'Efficiency', value: 78 },
    { label: 'Speed', value: 88 },
    { label: 'Accuracy', value: 95 },
    { label: 'Reliability', value: 90 },
  ]

  return (
    <div className="w-full max-w-md flex justify-center">
      <svg viewBox="0 0 300 300" className="w-72 h-72">
        <defs>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="3" floodOpacity="0.3" />
          </filter>
        </defs>
        <g transform="translate(150, 150)">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <g key={i}>
              <line
                x1="0"
                y1="0"
                x2={100 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)}
                y2={100 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}
                stroke="currentColor"
                strokeOpacity="0.1"
              />
              {metrics.map((metric, index) => (
                <circle
                  key={index}
                  cx={(metric.value / 100) * 100 * Math.cos((index * Math.PI) / 3 - Math.PI / 2)}
                  cy={(metric.value / 100) * 100 * Math.sin((index * Math.PI) / 3 - Math.PI / 2)}
                  r="4"
                  fill="hsl(var(--primary))"
                  className="transition-all hover:r-6"
                />
              ))}
            </g>
          ))}
          <polygon
            points={metrics.map((metric, i) => `${(metric.value / 100) * 100 * Math.cos((i * Math.PI) / 3 - Math.PI / 2)},${(metric.value / 100) * 100 * Math.sin((i * Math.PI) / 3 - Math.PI / 2)}`).join(' ')}
            fill="hsl(var(--primary) / 0.2)"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            filter="url(#shadow)"
          />
        </g>
      </svg>
    </div>
  )
}

function ScatterPlotPreview() {
  const scatterData = Array.from({ length: 30 }, () => ({
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="w-full max-w-md">
      <svg viewBox="0 0 400 300" className="w-full h-64">
        <defs>
          <pattern id="grid" width="40" height="30" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeOpacity="0.1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {scatterData.map((point, index) => (
          <circle
            key={index}
            cx={(point.x / 100) * 360 + 20}
            cy={280 - (point.y / 100) * 260}
            r="5"
            fill="hsl(var(--primary))"
            className="transition-all hover:r-8"
            opacity="0.7"
          />
        ))}
      </svg>
    </div>
  )
}

function TimelineChartPreview() {
  const timelineData = [
    { date: '2024-01', label: 'Planning', value: 20, color: 'hsl(var(--primary))' },
    { date: '2024-02', label: 'Development', value: 45, color: '#3b82f6' },
    { date: '2024-03', label: 'Testing', value: 30, color: '#10b981' },
    { date: '2024-04', label: 'Launch', value: 60, color: '#f59e0b' },
  ]

  return (
    <div className="w-full max-w-2xl">
      <div className="space-y-4">
        {timelineData.map((item, index) => (
          <div key={index} className="relative">
            <div className="flex items-center gap-4">
              <div className="w-20 text-sm text-muted-foreground">{item.date}</div>
              <div className="flex-1 relative">
                <div className="h-8 rounded bg-muted overflow-hidden">
                  <div
                    className="h-full rounded transition-all duration-500 hover:w-full"
                    style={{
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
                <div className="absolute inset-0 flex items-center px-3">
                  <span className="text-xs font-medium text-primary-foreground">{item.label}</span>
                </div>
              </div>
              <div className="w-12 text-sm font-medium text-foreground text-right">{item.value}%</div>
            </div>
            {index < timelineData.length - 1 && (
              <div className="absolute left-24 top-8 w-0.5 h-4 bg-border" />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

function WaterfallChartPreview() {
  const waterfallData = [
    { label: 'Revenue', value: 120, isTotal: true },
    { label: 'Sales', value: 80, isTotal: false },
    { label: 'Support', value: -30, isTotal: false },
    { label: 'Marketing', value: -25, isTotal: false },
    { label: 'Profit', value: 145, isTotal: true },
  ]

  let runningTotal = 0

  return (
    <div className="w-full max-w-2xl">
      <svg viewBox="0 0 500 250" className="w-full h-64">
        {waterfallData.map((item, index) => {
          const prevTotal = runningTotal
          if (item.isTotal) {
            runningTotal = item.value
          } else {
            runningTotal += item.value
          }

          const barHeight = Math.abs(item.value) * 1.5
          const barY = item.isTotal || item.value > 0 ? 250 - runningTotal * 1.5 : 250 - prevTotal * 1.5
          const barX = index * 90 + 20

          return (
            <g key={index}>
              <rect
                x={barX}
                y={barY}
                width="60"
                height={barHeight}
                fill={item.isTotal ? 'hsl(var(--primary))' : item.value > 0 ? '#10b981' : '#ef4444'}
                className="transition-all hover:opacity-80"
                rx="4"
              />
              <text
                x={barX + 30}
                y={240}
                textAnchor="middle"
                className="text-xs fill-muted-foreground"
              >
                {item.label}
              </text>
              <text
                x={barX + 30}
                y={barY - 5}
                textAnchor="middle"
                className="text-xs fill-foreground font-medium"
              >
                {item.isTotal ? item.value : `$${Math.abs(item.value)}`}
              </text>
              {!item.isTotal && index > 0 && (
                <line
                  x1={barX - 30}
                  y1={250 - prevTotal * 1.5}
                  x2={barX}
                  y2={250 - prevTotal * 1.5}
                  stroke="currentColor"
                  strokeOpacity="0.2"
                  strokeDasharray="4,4"
                />
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function TreemapChartPreview() {
  const treemapData = [
    { label: 'Desktop', value: 45, color: 'hsl(var(--primary))' },
    { label: 'Mobile', value: 30, color: '#3b82f6' },
    { label: 'Tablet', value: 15, color: '#10b981' },
    { label: 'Other', value: 10, color: '#f59e0b' },
  ]

  return (
    <div className="w-full max-w-md">
      <div className="grid grid-cols-4 gap-2 h-64">
        {treemapData.map((item, index) => {
          return (
            <div
              key={index}
              className="rounded-lg flex flex-col items-center justify-center text-primary-foreground font-medium transition-all hover:scale-105 cursor-pointer"
              style={{ backgroundColor: item.color }}
            >
              <span className="text-sm">{item.label}</span>
              <span className="text-lg">{item.value}%</span>
            </div>
          )
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {treemapData.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }} />
            <span className="text-xs text-muted-foreground">{item.label}</span>
            <span className="text-xs font-medium text-foreground">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function FunnelChartPreview() {
  const funnelData = [
    { label: 'Visitors', value: 1000, color: 'hsl(var(--primary))' },
    { label: 'Sign-ups', value: 750, color: '#3b82f6' },
    { label: 'Trials', value: 500, color: '#10b981' },
    { label: 'Customers', value: 250, color: '#f59e0b' },
    { label: 'Loyal', value: 125, color: '#ef4444' },
  ]

  return (
    <div className="w-full max-w-md">
      <div className="space-y-2">
        {funnelData.map((item, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-full rounded-lg py-3 flex items-center justify-center text-primary-foreground font-medium transition-all hover:shadow-lg cursor-pointer"
              style={{ backgroundColor: item.color, clipPath: index === 0 ? 'none' : 'polygon(5% 0%, 95% 0%, 100% 100%, 0% 100%)' }}
            >
              <span className="text-sm">{item.label}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1">{item.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SankeyChartPreview() {
  const nodes = ['A', 'B', 'C', 'D', 'E']
  const links = [
    { source: 0, target: 2, value: 30 },
    { source: 0, target: 3, value: 20 },
    { source: 1, target: 2, value: 25 },
    { source: 1, target: 3, value: 15 },
    { source: 2, target: 4, value: 35 },
    { source: 3, target: 4, value: 25 },
  ]

  return (
    <div className="w-full max-w-2xl">
      <svg viewBox="0 0 400 200" className="w-full h-48">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
        </defs>
        {links.map((link, index) => {
          const sourceX = link.source * 80 + 20
          const targetX = link.target * 80 + 20
          const sourceY = 100 + (link.source % 2) * 40
          const targetY = 100 + (link.target % 2) * 40

          return (
            <path
              key={index}
              d={`M ${sourceX} ${sourceY} C ${(sourceX + targetX) / 2} ${sourceY}, ${(sourceX + targetX) / 2} ${targetY}, ${targetX} ${targetY}`}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth={link.value / 5}
              opacity="0.6"
              className="transition-all hover:opacity-100"
            />
          )
        })}
        {nodes.map((node, index) => (
          <g key={index}>
            <circle cx={index * 80 + 20} cy={100 + (index % 2) * 40} r="8" fill="hsl(var(--primary))" />
            <text x={index * 80 + 20} y={130 + (index % 2) * 40} textAnchor="middle" className="text-xs fill-muted-foreground">
              {node}
            </text>
          </g>
        ))}
      </svg>
    </div>
  )
}

function ChordDiagramPreview() {
  const matrix = [
    [10, 15, 8, 12],
    [15, 10, 20, 5],
    [8, 20, 10, 15],
    [12, 5, 15, 10],
  ]
  const labels = ['A', 'B', 'C', 'D']
  const colors = ['hsl(var(--primary))', '#3b82f6', '#10b981', '#f59e0b']

  return (
    <div className="w-full max-w-md flex justify-center">
      <svg viewBox="0 0 300 300" className="w-72 h-72">
        <g transform="translate(150, 150)">
          {labels.map((label, i) => {
            const angle = (i / labels.length) * 2 * Math.PI
            const x = 100 * Math.cos(angle)
            const y = 100 * Math.sin(angle)

            return (
              <g key={i}>
                <path
                  d={`M 0 0 L ${x} ${y} A 100 100 0 0 1 ${100 * Math.cos((i + 1) / labels.length * 2 * Math.PI)} ${100 * Math.sin((i + 1) / labels.length * 2 * Math.PI)} Z`}
                  fill={colors[i]}
                  opacity="0.3"
                  className="transition-all hover:opacity-50 cursor-pointer"
                />
                <text
                  x={110 * Math.cos(angle)}
                  y={110 * Math.sin(angle)}
                  textAnchor="middle"
                  alignmentBaseline="middle"
                  className="text-xs fill-foreground font-medium"
                >
                  {label}
                </text>
              </g>
            )
          })}
          {matrix.map((row, i) =>
            row.map((value, j) => {
              if (i >= j) return null
              const angle1 = (i / labels.length) * 2 * Math.PI
              const angle2 = (j / labels.length) * 2 * Math.PI
              const x1 = 100 * Math.cos(angle1)
              const y1 = 100 * Math.sin(angle1)
              const x2 = 100 * Math.cos(angle2)
              const y2 = 100 * Math.sin(angle2)

              return (
                <path
                  key={`${i}-${j}`}
                  d={`M ${x1} ${y1} A 100 100 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke="hsl(var(--primary))"
                  strokeWidth={value / 3}
                  opacity="0.4"
                  className="transition-all hover:opacity-70"
                />
              )
            })
          )}
        </g>
      </svg>
    </div>
  )
}

const chartComponents = [
  {
    id: 'bar-chart',
    name: 'Bar Chart',
    description: 'Vertical and horizontal bar charts for comparing values.',
    usage: `<div data-coral-chart data-type="bar">
  <div data-coral-chart-bar data-value="65" data-label="Jan" />
  <div data-coral-chart-bar data-value="45" data-label="Feb" />
  <div data-coral-chart-bar data-value="78" data-label="Mar" />
</div>`,
    props: [
      { name: 'data', type: 'DataPoint[]', default: 'required', description: 'Array of data points with label and value' },
      { name: 'orientation', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Bar orientation direction' },
      { name: 'color', type: 'string', default: '"primary"', description: 'Bar color theme' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show axis labels' },
    ],
    preview: BarChartPreview,
  },
  {
    id: 'line-chart',
    name: 'Line Chart',
    description: 'Line and area visualizations for showing trends.',
    usage: `<div data-coral-chart data-type="line">
  <svg viewBox="0 0 400 200">
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of numeric values' },
      { name: 'smooth', type: 'boolean', default: 'false', description: 'Use smooth curves' },
      { name: 'showDots', type: 'boolean', default: 'true', description: 'Show data points' },
    ],
    preview: LineChartPreview,
  },
  {
    id: 'pie-chart',
    name: 'Pie Chart',
    description: 'Circular proportion charts for showing composition.',
    usage: `<div data-coral-chart data-type="pie">
  <svg viewBox="0 0 100 100">
    <path d="..." fill="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'PieSlice[]', default: 'required', description: 'Array of slices with value and color' },
      { name: 'showLabels', type: 'boolean', default: 'true', description: 'Show slice labels' },
    ],
    preview: PieChartPreview,
  },
  {
    id: 'donut-chart',
    name: 'Donut Chart',
    description: 'Ring-style proportion charts with center space.',
    usage: `<div data-coral-chart data-type="donut">
  <svg viewBox="0 0 100 100">
    <path d="..." fill="none" stroke="..." strokeWidth="15" />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'PieSlice[]', default: 'required', description: 'Array of slices with value and color' },
      { name: 'thickness', type: 'number', default: '15', description: 'Ring thickness' },
      { name: 'centerContent', type: 'ReactNode', default: 'undefined', description: 'Center content' },
    ],
    preview: DonutChartPreview,
  },
  {
    id: 'area-chart',
    name: 'Area Chart',
    description: 'Filled area visualizations for showing volume.',
    usage: `<div data-coral-chart data-type="area">
  <svg viewBox="0 0 400 200">
    <path d="..." fill="url(#gradient)" />
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of numeric values' },
      { name: 'gradient', type: 'boolean', default: 'true', description: 'Use gradient fill' },
    ],
    preview: AreaChartPreview,
  },
  {
    id: 'sparkline',
    name: 'Sparkline',
    description: 'Compact inline charts for displaying trends.',
    usage: `<div data-coral-sparkline>
  <svg viewBox="0 0 100 30">
    <polyline points="..." fill="none" stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'number[]', default: 'required', description: 'Array of values' },
      { name: 'type', type: '"line" | "bar"', default: '"line"', description: 'Sparkline type' },
      { name: 'color', type: 'string', default: '"primary"', description: 'Sparkline color' },
    ],
    preview: SparklinePreview,
  },
  {
    id: 'gauge',
    name: 'Gauge',
    description: 'Radial progress indicators for showing completion.',
    usage: `<div data-coral-gauge data-value="70">
  <svg viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="40" />
  </svg>
</div>`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current value (0-100)' },
      { name: 'size', type: 'number', default: '120', description: 'Gauge size in pixels' },
      { name: 'thickness', type: 'number', default: '8', description: 'Arc thickness' },
    ],
    preview: GaugePreview,
  },
  {
    id: 'meter',
    name: 'Meter',
    description: 'Linear measurement displays for progress.',
    usage: `<div data-coral-progress data-value="75">
  <div data-coral-progress-bar />
</div>`,
    props: [
      { name: 'value', type: 'number', default: '0', description: 'Current value (0-100)' },
      { name: 'variant', type: '"default" | "success" | "warning" | "error"', default: '"default"', description: 'Color variant' },
      { name: 'showLabel', type: 'boolean', default: 'false', description: 'Show percentage label' },
    ],
    preview: MeterPreview,
  },
  {
    id: 'heatmap',
    name: 'Heatmap',
    description: 'Color-coded data grids for showing patterns.',
    usage: `<div data-coral-heatmap>
  <div data-coral-heatmap-cell data-value="5" />
  <div data-coral-heatmap-cell data-value="3" />
</div>`,
    props: [
      { name: 'data', type: 'number[][]', default: 'required', description: '2D array of values' },
      { name: 'colorScale', type: 'string[]', default: '["low", "high"]', description: 'Color scale' },
      { name: 'showValues', type: 'boolean', default: 'true', description: 'Show cell values' },
    ],
    preview: HeatmapPreview,
  },
  {
    id: 'radar-chart',
    name: 'Radar Chart',
    description: 'Spoke charts for displaying multi-dimensional data.',
    usage: `<div data-coral-chart data-type="radar">
  <svg viewBox="0 0 300 300">
    <polygon points="..." fill="..." stroke="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'RadarData[]', default: 'required', description: 'Array of metrics with label and value' },
      { name: 'maxValue', type: 'number', default: '100', description: 'Maximum value for scale' },
      { name: 'showGrid', type: 'boolean', default: 'true', description: 'Show grid lines' },
    ],
    preview: RadarChartPreview,
  },
  {
    id: 'scatter-plot',
    name: 'Scatter Plot',
    description: 'Dot plots for showing correlations between variables.',
    usage: `<div data-coral-chart data-type="scatter">
  <svg viewBox="0 0 400 300">
    <circle cx="..." cy="..." r="..." fill="..." />
  </svg>
</div>`,
    props: [
      { name: 'data', type: 'ScatterPoint[]', default: 'required', description: 'Array of x, y coordinates' },
      { name: 'xAxis', type: 'AxisConfig', default: '{}', description: 'X-axis configuration' },
      { name: 'yAxis', type: 'AxisConfig', default: '{}', description: 'Y-axis configuration' },
    ],
    preview: ScatterPlotPreview,
  },
  {
    id: 'timeline-chart',
    name: 'Timeline Chart',
    description: 'Chronological visualizations for project progress.',
    usage: `<div data-coral-timeline>
  <div data-coral-timeline-item data-date="2024-01" data-progress="20" />
</div>`,
    props: [
      { name: 'data', type: 'TimelineItem[]', default: 'required', description: 'Array of timeline events' },
      { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"', description: 'Timeline orientation' },
    ],
    preview: TimelineChartPreview,
  },
  {
    id: 'waterfall-chart',
    name: 'Waterfall Chart',
    description: 'Cascading charts showing cumulative effects.',
    usage: `<div data-coral-chart data-type="waterfall">
  <div data-coral-waterfall-bar data-value="120" data-label="Revenue" />
</div>`,
    props: [
      { name: 'data', type: 'WaterfallData[]', default: 'required', description: 'Array of values with labels' },
      { name: 'showTotal', type: 'boolean', default: 'true', description: 'Show total connectors' },
    ],
    preview: WaterfallChartPreview,
  },
  {
    id: 'treemap-chart',
    name: 'Treemap Chart',
    description: 'Hierarchical rectangles for displaying proportional data.',
    usage: `<div data-coral-chart data-type="treemap">
  <div data-coral-treemap-node data-value="45" data-label="Desktop" />
</div>`,
    props: [
      { name: 'data', type: 'TreemapNode[]', default: 'required', description: 'Array of hierarchical nodes' },
      { name: 'colorScale', type: 'string[]', default: 'primary', description: 'Color palette' },
    ],
    preview: TreemapChartPreview,
  },
  {
    id: 'funnel-chart',
    name: 'Funnel Chart',
    description: 'Progressive charts showing conversion through stages.',
    usage: `<div data-coral-chart data-type="funnel">
  <div data-coral-funnel-stage data-value="1000" data-label="Visitors" />
</div>`,
    props: [
      { name: 'data', type: 'FunnelStage[]', default: 'required', description: 'Array of funnel stages' },
      { name: 'direction', type: '"vertical" | "horizontal"', default: '"vertical"', description: 'Funnel direction' },
    ],
    preview: FunnelChartPreview,
  },
  {
    id: 'sankey-chart',
    name: 'Sankey Diagram',
    description: 'Flow diagrams showing material transfer between processes.',
    usage: `<div data-coral-chart data-type="sankey">
  <svg viewBox="0 0 400 200">
    <path d="..." stroke="..." strokeWidth="..." />
  </svg>
</div>`,
    props: [
      { name: 'nodes', type: 'SankeyNode[]', default: 'required', description: 'Array of node labels' },
      { name: 'links', type: 'SankeyLink[]', default: 'required', description: 'Array of connections' },
    ],
    preview: SankeyChartPreview,
  },
  {
    id: 'chord-diagram',
    name: 'Chord Diagram',
    description: 'Circular charts showing relationships between groups.',
    usage: `<div data-coral-chart data-type="chord">
  <svg viewBox="0 0 300 300">
    <path d="..." fill="..." opacity="..." />
  </svg>
</div>`,
    props: [
      { name: 'matrix', type: 'number[][]', default: 'required', description: '2D relationship matrix' },
      { name: 'labels', type: 'string[]', default: 'required', description: 'Group labels' },
    ],
    preview: ChordDiagramPreview,
  },
]

function ChartsPage() {
  return (
    <ComponentPageLayout
      categoryName="Charts"
      categoryId="charts"
      components={chartComponents}
      accessibilityFeatures={[
        'ARIA labels for data',
        'Pattern support',
        'Keyboard navigation',
        'Screen reader descriptions',
      ]}
    />
  )
}

export default ChartsPage
