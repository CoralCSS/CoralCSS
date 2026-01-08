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
  const [activeTheme, setActiveTheme] = useState('coral')

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
  const [activeTheme, setActiveTheme] = useState('coral')

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
  }, [activeTheme])

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {themes.map(theme => (
        <button
          key={theme.id}
          onClick={() => setActiveTheme(theme.id)}
          className={`
            group relative p-4 rounded-xl transition-all duration-200
            border-2
            ${activeTheme === theme.id
              ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
              : 'border-border bg-card hover:border-primary/50 hover:bg-primary/5'
            }
          `}
        >
          <div
            className="w-full aspect-square rounded-lg mb-3 transition-transform group-hover:scale-105"
            style={{
              background: `linear-gradient(135deg, ${theme.color} 0%, ${adjustColor(theme.color, -20)} 100%)`
            }}
          />
          <div className="text-sm font-medium text-foreground">{theme.name}</div>
          {activeTheme === theme.id && (
            <div className="absolute top-2 right-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </span>
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
