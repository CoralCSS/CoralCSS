import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="border border-slate-200 bg-white">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <defs>
              <linearGradient id="coral-logo" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff7f50" />
                <stop offset="100%" stopColor="#ff6347" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="14" fill="url(#coral-logo)" />
            <text x="16" y="21" fontFamily="system-ui" fontSize="14" fontWeight="bold" fill="white" textAnchor="middle">C</text>
          </svg>
          <span className="text-xl font-bold text-slate-900">CoralCSS</span>
        </Link>

        <nav className="hidden sm:flex items-center gap-6">
          <Link to="/docs" className="text-slate-600 hover:text-coral-500 transition">
            Documentation
          </Link>
          <Link to="/examples" className="text-slate-600 hover:text-coral-500 transition">
            Examples
          </Link>
          <a
            href="https://github.com/coralcss/core"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 hover:text-coral-500 transition"
          >
            GitHub
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/coralcss/core"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary text-sm"
          >
            Get Started
          </a>
        </div>
      </div>
    </header>
  )
}

export default Header
