function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">CoralCSS</h3>
            <p className="text-sm">
              A modern, zero-dependency CSS framework with utility-first classes and headless components.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Resources</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="/docs" className="hover:text-coral-500 transition">Documentation</a>
              </li>
              <li>
                <a href="/examples" className="hover:text-coral-500 transition">Examples</a>
              </li>
              <li>
                <a href="https://github.com/coralcss/core" className="hover:text-coral-500 transition">GitHub</a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/@coralcss/core" className="hover:text-coral-500 transition">npm</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Community</h4>
            <ul className="flex flex-col gap-2 text-sm">
              <li>
                <a href="https://github.com/coralcss/core/discussions" className="hover:text-coral-500 transition">Discussions</a>
              </li>
              <li>
                <a href="https://github.com/coralcss/core/issues" className="hover:text-coral-500 transition">Issues</a>
              </li>
              <li>
                <a href="https://github.com/coralcss/core/blob/main/CHANGELOG.md" className="hover:text-coral-500 transition">Changelog</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 pt-8 text-center text-sm">
          <p>MIT License. Made with love for the web.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
