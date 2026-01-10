import { useState, useEffect, useCallback, useRef } from 'react'

const DEFAULT_HTML = `<div class="min-h-screen bg-gradient-to-br from-coral-50 to-coral-100 dark:from-slate-900 dark:to-slate-800 p-8">
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <div class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
        Welcome to <span class="text-coral-500">CoralCSS</span>
      </h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        A modern, zero-dependency utility-first CSS framework with JIT compilation
      </p>
    </div>

    <!-- Card Grid -->
    <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Card 1 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200 dark:border-slate-700">
        <div class="w-12 h-12 bg-coral-100 dark:bg-coral-500/20 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-coral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Lightning Fast</h3>
        <p class="text-slate-600 dark:text-slate-400">JIT compilation generates only the CSS you use</p>
      </div>

      <!-- Card 2 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200 dark:border-slate-700">
        <div class="w-12 h-12 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">Zero Dependencies</h3>
        <p class="text-slate-600 dark:text-slate-400">No PostCSS required, works anywhere</p>
      </div>

      <!-- Card 3 -->
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow p-6 border border-slate-200 dark:border-slate-700">
        <div class="w-12 h-12 bg-violet-100 dark:bg-violet-500/20 rounded-xl flex items-center justify-center mb-4">
          <svg class="w-6 h-6 text-violet-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-slate-900 dark:text-white mb-2">65+ Components</h3>
        <p class="text-slate-600 dark:text-slate-400">Accessible headless UI components included</p>
      </div>
    </div>

    <!-- Button Examples -->
    <div class="mt-12 flex flex-wrap gap-4 justify-center">
      <button class="px-6 py-3 bg-coral-500 hover:bg-coral-600 text-white font-medium rounded-xl transition-colors">
        Primary Button
      </button>
      <button class="px-6 py-3 bg-transparent border-2 border-coral-500 text-coral-500 hover:bg-coral-50 dark:hover:bg-coral-500/10 font-medium rounded-xl transition-colors">
        Outline Button
      </button>
      <button class="px-6 py-3 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-900 dark:text-white font-medium rounded-xl transition-colors">
        Secondary Button
      </button>
    </div>
  </div>
</div>`

const TEMPLATES = {
  default: DEFAULT_HTML,
  landing: `<div class="min-h-screen bg-white dark:bg-slate-900">
  <!-- Navigation -->
  <nav class="fixed w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 z-50">
    <div class="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
      <div class="text-xl font-bold text-coral-500">CoralCSS</div>
      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-coral-500 transition-colors">Features</a>
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-coral-500 transition-colors">Docs</a>
        <a href="#" class="text-slate-600 dark:text-slate-400 hover:text-coral-500 transition-colors">Pricing</a>
        <button class="px-4 py-2 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors">Get Started</button>
      </div>
    </div>
  </nav>

  <!-- Hero -->
  <section class="pt-32 pb-20 px-4">
    <div class="max-w-4xl mx-auto text-center">
      <span class="inline-block px-3 py-1 bg-coral-100 dark:bg-coral-500/20 text-coral-600 dark:text-coral-400 text-sm font-medium rounded-full mb-4">
        Now in v1.0
      </span>
      <h1 class="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6">
        Build beautiful UIs<br />in record time
      </h1>
      <p class="text-xl text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
        The modern CSS framework that helps you build stunning interfaces without leaving your HTML.
      </p>
      <div class="flex flex-wrap gap-4 justify-center">
        <button class="px-8 py-4 bg-coral-500 text-white font-medium rounded-xl hover:bg-coral-600 transition-colors shadow-lg shadow-coral-500/25">
          Start Building
        </button>
        <button class="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          View Docs
        </button>
      </div>
    </div>
  </section>
</div>`,
  dashboard: `<div class="min-h-screen bg-slate-100 dark:bg-slate-900">
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 min-h-screen bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 p-4">
      <div class="text-xl font-bold text-coral-500 mb-8">Dashboard</div>
      <nav class="space-y-2">
        <a href="#" class="flex items-center gap-3 px-4 py-2 bg-coral-50 dark:bg-coral-500/10 text-coral-600 dark:text-coral-400 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
          Home
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
          Analytics
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          Users
        </a>
        <a href="#" class="flex items-center gap-3 px-4 py-2 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg">
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          Settings
        </a>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Total Revenue</div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white">$45,231</div>
          <div class="text-sm text-emerald-500 mt-2">+12.5% from last month</div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Active Users</div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white">2,350</div>
          <div class="text-sm text-emerald-500 mt-2">+8.2% from last month</div>
        </div>
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
          <div class="text-sm text-slate-500 dark:text-slate-400 mb-1">Conversion</div>
          <div class="text-3xl font-bold text-slate-900 dark:text-white">3.24%</div>
          <div class="text-sm text-red-500 mt-2">-0.5% from last month</div>
        </div>
      </div>
    </main>
  </div>
</div>`,
  card: `<div class="min-h-screen bg-slate-100 dark:bg-slate-900 p-8 flex items-center justify-center">
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-xl overflow-hidden max-w-md w-full">
    <div class="aspect-video bg-gradient-to-br from-coral-400 to-coral-600 flex items-center justify-center">
      <span class="text-white text-6xl font-bold">C</span>
    </div>
    <div class="p-6">
      <div class="flex items-center gap-2 mb-3">
        <span class="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-medium rounded-full">New</span>
        <span class="px-2.5 py-0.5 bg-coral-100 dark:bg-coral-500/20 text-coral-600 dark:text-coral-400 text-xs font-medium rounded-full">Featured</span>
      </div>
      <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">CoralCSS Framework</h2>
      <p class="text-slate-600 dark:text-slate-400 mb-6">A modern utility-first CSS framework with zero dependencies and powerful JIT compilation.</p>
      <div class="flex gap-3">
        <button class="flex-1 px-4 py-2.5 bg-coral-500 text-white font-medium rounded-xl hover:bg-coral-600 transition-colors">Get Started</button>
        <button class="px-4 py-2.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 font-medium rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Docs</button>
      </div>
    </div>
  </div>
</div>`,
}

type TemplateKey = keyof typeof TEMPLATES

function Playground() {
  const [html, setHtml] = useState(DEFAULT_HTML)
  const [showCode, setShowCode] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [copied, setCopied] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const updatePreview = useCallback(() => {
    if (!iframeRef.current) return

    const doc = iframeRef.current.contentDocument
    if (!doc) return

    const darkClass = isDarkMode ? 'dark' : ''

    doc.open()
    doc.write(`
      <!DOCTYPE html>
      <html class="${darkClass}">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <script src="https://unpkg.com/@coral-css/core@latest/dist/coral.min.global.js"><\/script>
          <style>
            :root {
              color-scheme: ${isDarkMode ? 'dark' : 'light'};
            }
            * { margin: 0; padding: 0; box-sizing: border-box; }
            html { font-family: system-ui, -apple-system, sans-serif; }
          </style>
        </head>
        <body class="bg-slate-50 dark:bg-slate-900">
          ${html}
        </body>
      </html>
    `)
    doc.close()
  }, [html, isDarkMode])

  useEffect(() => {
    updatePreview()
  }, [updatePreview])

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(html)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const shareCode = () => {
    const encoded = btoa(encodeURIComponent(html))
    const url = `${window.location.origin}/playground?code=${encoded}`
    navigator.clipboard.writeText(url)
    alert('Share URL copied to clipboard!')
  }

  const loadTemplate = (template: TemplateKey) => {
    setHtml(TEMPLATES[template])
  }

  // Load code from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get('code')
    if (code) {
      try {
        setHtml(decodeURIComponent(atob(code)))
      } catch (err) {
        console.error('Failed to decode code:', err)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-900">
      {/* Toolbar */}
      <div className="sticky top-16 z-40 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="max-w-full mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-slate-900 dark:text-white">Playground</h1>

            {/* Templates dropdown */}
            <div className="relative">
              <select
                onChange={(e) => loadTemplate(e.target.value as TemplateKey)}
                className="pl-3 pr-8 py-1.5 bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-coral-500 appearance-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="landing">Landing Page</option>
                <option value="dashboard">Dashboard</option>
                <option value="card">Card</option>
              </select>
              <svg className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Toggle code/preview */}
            <button
              onClick={() => setShowCode(!showCode)}
              className={`px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                showCode
                  ? 'bg-coral-100 dark:bg-coral-500/20 text-coral-600 dark:text-coral-400'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
              }`}
            >
              {showCode ? 'Hide Code' : 'Show Code'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDarkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>

            {/* Copy button */}
            <button
              onClick={copyToClipboard}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              title="Copy HTML"
            >
              {copied ? (
                <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              )}
            </button>

            {/* Share button */}
            <button
              onClick={shareCode}
              className="px-3 py-1.5 bg-coral-500 text-white rounded-lg hover:bg-coral-600 transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 128px)' }}>
        {/* Code editor */}
        {showCode && (
          <div className="w-full lg:w-1/2 border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-700 flex flex-col">
            <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              HTML
            </div>
            <textarea
              ref={textareaRef}
              value={html}
              onChange={(e) => setHtml(e.target.value)}
              className="flex-1 w-full p-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-mono text-sm resize-none focus:outline-none"
              spellCheck={false}
              placeholder="Enter your HTML with CoralCSS classes..."
            />
          </div>
        )}

        {/* Preview */}
        <div className={`flex-1 ${showCode ? 'lg:w-1/2' : 'w-full'} flex flex-col bg-white dark:bg-slate-800`}>
          <div className="px-4 py-2 bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700 text-sm text-slate-500 dark:text-slate-400 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
            {isDarkMode && <span className="text-xs bg-slate-700 px-2 py-0.5 rounded">Dark Mode</span>}
          </div>
          <iframe
            ref={iframeRef}
            className="flex-1 w-full border-0"
            title="Preview"
            sandbox="allow-scripts"
          />
        </div>
      </div>
    </div>
  )
}

export default Playground
