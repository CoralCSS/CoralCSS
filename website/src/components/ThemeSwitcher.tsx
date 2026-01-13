import { useState, useEffect } from 'react'

const themes = [
  { id: 'coral', name: 'Coral', color: '#ff7f50', class: 'theme-coral' },
  { id: 'slate', name: 'Slate', color: '#64748b', class: 'theme-slate' },
  { id: 'rose', name: 'Rose', color: '#e11d48', class: 'theme-rose' },
  { id: 'emerald', name: 'Emerald', color: '#10b981', class: 'theme-emerald' },
  { id: 'violet', name: 'Violet', color: '#8b5cf6', class: 'theme-violet' },
  { id: 'amber', name: 'Amber', color: '#f59e0b', class: 'theme-amber' },
  { id: 'ocean', name: 'Ocean', color: '#0ea5e9', class: 'theme-ocean' },
  { id: 'crimson', name: 'Crimson', color: '#ef4444', class: 'theme-crimson' },
  { id: 'teal', name: 'Teal', color: '#14b8a6', class: 'theme-teal' },
  { id: 'indigo', name: 'Indigo', color: '#6366f1', class: 'theme-indigo' },
  { id: 'lime', name: 'Lime', color: '#84cc16', class: 'theme-lime' },
  { id: 'fuchsia', name: 'Fuchsia', color: '#e879f9', class: 'theme-fuchsia' },
]

export function ThemeSwitcher() {
  // Initialize from localStorage to prevent flash of default theme
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('color-theme') || 'coral'
  })

  useEffect(() => {
    const saved = localStorage.getItem('color-theme')
    if (saved) {
      setActiveTheme(saved)
    }
  }, [])

  useEffect(() => {
    // Remove all theme classes
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.class)
    })
    // Add the active theme class
    const theme = themes.find(t => t.id === activeTheme)
    if (theme && theme.id !== 'coral') {
      document.documentElement.classList.add(theme.class)
    }
    localStorage.setItem('color-theme', activeTheme)
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('local-storage-updated', { detail: { key: 'color-theme', value: activeTheme } }))
  }, [activeTheme])

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setActiveTheme(theme.id)}
          className={`
            relative w-10 h-10 rounded-full transition-all duration-200
            ring-2 ring-offset-2 ring-offset-background
            ${activeTheme === theme.id
              ? 'ring-primary scale-110'
              : 'ring-transparent hover:ring-muted-foreground/30 hover:scale-105'
            }
          `}
          style={{ backgroundColor: theme.color }}
          title={theme.name}
        >
          {activeTheme === theme.id && (
            <span className="absolute inset-0 flex items-center justify-center">
              <svg className="w-5 h-5 text-white drop-shadow-md" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          <span className="sr-only">{theme.name}</span>
        </button>
      ))}
    </div>
  )
}

export function ThemePalette() {
  // Initialize from localStorage to prevent flash of default theme
  const [activeTheme, setActiveTheme] = useState(() => {
    return localStorage.getItem('color-theme') || 'coral'
  })

  useEffect(() => {
    const saved = localStorage.getItem('color-theme')
    if (saved) {
      setActiveTheme(saved)
    }

    const handleStorageChange = () => {
      const saved = localStorage.getItem('color-theme')
      if (saved) setActiveTheme(saved)
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  useEffect(() => {
    themes.forEach(theme => {
      document.documentElement.classList.remove(theme.class)
    })
    const theme = themes.find(t => t.id === activeTheme)
    if (theme && theme.id !== 'coral') {
      document.documentElement.classList.add(theme.class)
    }
    localStorage.setItem('color-theme', activeTheme)
    // Dispatch custom event for other components
    window.dispatchEvent(new CustomEvent('local-storage-updated', { detail: { key: 'color-theme', value: activeTheme } }))
  }, [activeTheme])

  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 max-w-4xl mx-auto">
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setActiveTheme(theme.id)}
          className={`
            group relative flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200
            border
            ${activeTheme === theme.id
              ? 'border-primary bg-primary/10 shadow-md'
              : 'border-border bg-card hover:border-primary/50'
            }
          `}
          title={theme.name}
        >
          <div
            className="w-10 h-10 rounded-lg transition-transform group-hover:scale-110"
            style={{
              background: `linear-gradient(135deg, ${theme.color} 0%, ${adjustColor(theme.color, -20)} 100%)`
            }}
          />
          <span className="text-xs font-medium text-foreground text-center">{theme.name}</span>
          {activeTheme === theme.id && (
            <div className="absolute top-2 right-2">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
        </button>
      ))}
    </div>
  )
}

// Helper to darken a hex color
function adjustColor(hex: string, percent: number): string {
  const num = parseInt(hex.replace('#', ''), 16)
  const r = Math.max(0, Math.min(255, (num >> 16) + percent))
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + percent))
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + percent))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

export default ThemeSwitcher
