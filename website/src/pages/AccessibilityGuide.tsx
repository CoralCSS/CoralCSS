export default function AccessibilityGuide() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      {/* Header */}
      <div className="mb-12">
        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-coral to-purple bg-clip-text text-transparent">
          Accessibility Guide
        </h1>
        <p className="text-xl text-muted-foreground">
          Build inclusive web experiences with CoralCSS accessibility features
        </p>
      </div>

      {/* Why Accessibility */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Why Accessibility Matters</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl mb-3">♿</div>
            <h3 className="text-xl font-semibold mb-2">Inclusive Design</h3>
            <p className="text-muted-foreground text-sm">
              15% of the world's population has some form of disability. Accessible design ensures everyone can use your application.
            </p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl mb-3">⚖️</div>
            <h3 className="text-xl font-semibold mb-2">Legal Compliance</h3>
            <p className="text-muted-foreground text-sm">
              WCAG 2.1, ADA, Section 508, and other regulations require accessible web content for many organizations.
            </p>
          </div>
          <div className="p-6 bg-card border border-border rounded-xl">
            <div className="text-3xl mb-3">🎯</div>
            <h3 className="text-xl font-semibold mb-2">Better UX</h3>
            <p className="text-muted-foreground text-sm">
              Accessibility improvements benefit all users through clearer interfaces, better keyboard navigation, and improved usability.
            </p>
          </div>
        </div>
      </section>

      {/* Built-in Features */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Built-in Accessibility Features</h2>

        <div className="space-y-6">
          {/* Color Contrast */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🎨</span>
              WCAG-Compliant Color System
            </h3>
            <p className="text-muted-foreground mb-4">
              CoralCSS's color palette is designed with WCAG 2.1 AA and AAA contrast ratios in mind:
            </p>
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-green-500">✓ Good Contrast</div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gray-900 text-white px-3 py-2 rounded text-sm">Dark text on white</div>
                  <span className="text-xs text-muted-foreground">21:1 ratio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-blue-600 text-white px-3 py-2 rounded text-sm">White on blue-600</div>
                  <span className="text-xs text-muted-foreground">8.6:1 ratio</span>
                </div>
              </div>
              <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-lg">
                <div className="text-sm font-semibold mb-2 text-red-500">✗ Poor Contrast</div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-gray-300 text-gray-400 px-3 py-2 rounded text-sm">Gray on gray</div>
                  <span className="text-xs text-muted-foreground">2.1:1 ratio</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-300 text-yellow-400 px-3 py-2 rounded text-sm">Low contrast</div>
                  <span className="text-xs text-muted-foreground">1.4:1 ratio</span>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// IntelliSense shows WCAG contrast ratios</div>
              <div>import {'{'} getContrastRatio, meetsWCAG {'}'} from '@coral-css/core/intellisense'</div>
              <div className="mt-2">const ratio = getContrastRatio('#000', '#fff')</div>
              <div>const passes = meetsWCAG(ratio, 'AA', 'normal') // true</div>
            </div>
          </div>

          {/* Focus Management */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">⌨️</span>
              Focus Management
            </h3>
            <p className="text-muted-foreground mb-4">
              Comprehensive focus utilities for keyboard navigation:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">•</span>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">focus:ring</code>
                  <span className="text-muted-foreground ml-2">- Visible focus indicators</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">•</span>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">focus-visible:outline</code>
                  <span className="text-muted-foreground ml-2">- Show focus only for keyboard users</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">•</span>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">focus-within:bg-muted</code>
                  <span className="text-muted-foreground ml-2">- Style parent when child has focus</span>
                </div>
              </li>
            </ul>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// Accessible button with focus styles</div>
              <div>&lt;button className="</div>
              <div className="pl-4">bg-coral text-white px-4 py-2 rounded</div>
              <div className="pl-4">focus:ring-4 focus:ring-coral/20</div>
              <div className="pl-4">focus-visible:outline-2 focus-visible:outline-coral</div>
              <div className="pl-4">transition-all</div>
              <div>"&gt;</div>
              <div className="pl-4">Click Me</div>
              <div>&lt;/button&gt;</div>
            </div>
          </div>

          {/* Screen Reader Support */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🔊</span>
              Screen Reader Utilities
            </h3>
            <p className="text-muted-foreground mb-4">
              Utilities for screen reader visibility:
            </p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">•</span>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">sr-only</code>
                  <span className="text-muted-foreground ml-2">- Visually hidden but available to screen readers</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-coral mt-1">•</span>
                <div>
                  <code className="bg-muted px-2 py-1 rounded text-sm">not-sr-only</code>
                  <span className="text-muted-foreground ml-2">- Make sr-only content visible</span>
                </div>
              </li>
            </ul>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// Skip navigation link</div>
              <div>&lt;a href="#main" className="sr-only focus:not-sr-only"&gt;</div>
              <div className="pl-4">Skip to main content</div>
              <div>&lt;/a&gt;</div>
            </div>
          </div>

          {/* ARIA Support */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🏷️</span>
              ARIA State Variants
            </h3>
            <p className="text-muted-foreground mb-4">
              CoralCSS includes 30+ ARIA state variants for dynamic styling based on accessibility attributes:
            </p>
            <div className="grid md:grid-cols-2 gap-3 mb-4 text-sm">
              <div className="bg-background p-3 rounded">
                <code>aria-checked:</code>
                <span className="text-muted-foreground ml-2">checked state</span>
              </div>
              <div className="bg-background p-3 rounded">
                <code>aria-disabled:</code>
                <span className="text-muted-foreground ml-2">disabled state</span>
              </div>
              <div className="bg-background p-3 rounded">
                <code>aria-expanded:</code>
                <span className="text-muted-foreground ml-2">expanded state</span>
              </div>
              <div className="bg-background p-3 rounded">
                <code>aria-selected:</code>
                <span className="text-muted-foreground ml-2">selected state</span>
              </div>
              <div className="bg-background p-3 rounded">
                <code>aria-pressed:</code>
                <span className="text-muted-foreground ml-2">pressed state</span>
              </div>
              <div className="bg-background p-3 rounded">
                <code>aria-invalid:</code>
                <span className="text-muted-foreground ml-2">validation error</span>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 font-mono text-sm">
              <div className="text-muted-foreground">// Toggle button with ARIA states</div>
              <div>&lt;button</div>
              <div className="pl-4">aria-pressed="false"</div>
              <div className="pl-4">className="</div>
              <div className="pl-8">bg-muted text-foreground</div>
              <div className="pl-8">aria-pressed:bg-coral aria-pressed:text-white</div>
              <div className="pl-4">"</div>
              <div>&gt;</div>
              <div className="pl-4">Toggle</div>
              <div>&lt;/button&gt;</div>
            </div>
          </div>

          {/* Headless Components */}
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="text-2xl font-semibold mb-4 flex items-center gap-3">
              <span className="text-3xl">🧩</span>
              Accessible Headless Components
            </h3>
            <p className="text-muted-foreground mb-4">
              All 78 CoralCSS components include built-in accessibility features:
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Proper ARIA attributes (aria-label, aria-describedby, role, etc.)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Full keyboard navigation support (Tab, Enter, Space, Arrow keys)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Focus management and trap for modals/dialogs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Screen reader announcements for dynamic content</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-500 mt-1">✓</span>
                <span>Semantic HTML structure</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Accessibility Best Practices</h2>
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Use Semantic HTML</div>
              <div className="text-muted-foreground text-sm">Use proper HTML elements (&lt;button&gt;, &lt;nav&gt;, &lt;main&gt;, &lt;article&gt;) instead of styled &lt;div&gt; elements. Headless components use semantic HTML by default.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Provide Text Alternatives</div>
              <div className="text-muted-foreground text-sm">Always include alt text for images, aria-label for icon buttons, and proper labels for form inputs. Use sr-only class for visually hidden labels.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Ensure Keyboard Navigation</div>
              <div className="text-muted-foreground text-sm">All interactive elements must be keyboard accessible. Test with Tab, Enter, Space, and Arrow keys. Use focus-visible: utilities for keyboard-only focus indicators.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Test Color Contrast</div>
              <div className="text-muted-foreground text-sm">Use CoralCSS IntelliSense to check WCAG contrast ratios. Aim for AA (4.5:1 for text, 3:1 for large text) or AAA (7:1 for text, 4.5:1 for large text).</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-green/5 border border-green/20 rounded-lg">
            <div className="text-2xl">✅</div>
            <div>
              <div className="font-semibold mb-1">Use ARIA Attributes Correctly</div>
              <div className="text-muted-foreground text-sm">ARIA should enhance, not replace, semantic HTML. Use aria-hidden for decorative elements, aria-live for dynamic content, and proper roles for custom widgets.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-yellow/5 border border-yellow/20 rounded-lg">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold mb-1">Don't Rely on Color Alone</div>
              <div className="text-muted-foreground text-sm">Use icons, patterns, or text in addition to color to convey information. For example, use both red color AND an error icon for form validation.</div>
            </div>
          </div>
          <div className="flex gap-4 p-4 bg-yellow/5 border border-yellow/20 rounded-lg">
            <div className="text-2xl">⚠️</div>
            <div>
              <div className="font-semibold mb-1">Avoid Motion for Critical Content</div>
              <div className="text-muted-foreground text-sm">Respect prefers-reduced-motion for users with vestibular disorders. Use motion: and motion-reduce: variants to provide alternatives.</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testing */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Accessibility Testing</h2>
        <div className="bg-card border border-border rounded-xl p-6">
          <h3 className="text-xl font-semibold mb-4">Testing Tools</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div>
              <div className="font-semibold mb-2">Automated Testing</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lighthouse (Chrome DevTools)</li>
                <li>• axe DevTools browser extension</li>
                <li>• WAVE browser extension</li>
                <li>• Pa11y command-line tool</li>
              </ul>
            </div>
            <div>
              <div className="font-semibold mb-2">Manual Testing</div>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Keyboard navigation testing</li>
                <li>• Screen reader testing (NVDA, JAWS, VoiceOver)</li>
                <li>• High contrast mode testing</li>
                <li>• Zoom/magnification testing (200%+)</li>
              </ul>
            </div>
          </div>
          <div className="bg-background rounded-lg p-4 font-mono text-sm">
            <div className="text-muted-foreground"># Run accessibility audit</div>
            <div>npx lighthouse https://yoursite.com --only-categories=accessibility</div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6 text-foreground">Additional Resources</h2>
        <div className="grid gap-4">
          <a href="https://www.w3.org/WAI/WCAG21/quickref/" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-lg hover:border-coral transition-colors">
            <div className="font-semibold mb-1">WCAG 2.1 Quick Reference</div>
            <div className="text-sm text-muted-foreground">Official W3C guidelines for web accessibility</div>
          </a>
          <a href="https://www.a11yproject.com/" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-lg hover:border-coral transition-colors">
            <div className="font-semibold mb-1">The A11Y Project</div>
            <div className="text-sm text-muted-foreground">Community-driven accessibility resource</div>
          </a>
          <a href="https://webaim.org/" target="_blank" rel="noopener noreferrer" className="p-4 bg-card border border-border rounded-lg hover:border-coral transition-colors">
            <div className="font-semibold mb-1">WebAIM</div>
            <div className="text-sm text-muted-foreground">Web accessibility articles and training</div>
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <div className="p-8 bg-gradient-to-r from-coral/10 to-purple/10 rounded-2xl text-center border border-coral/20">
        <h2 className="text-2xl font-bold mb-4">Build Accessible Applications</h2>
        <p className="text-muted-foreground mb-6">
          Use CoralCSS's accessibility features to create inclusive web experiences
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/components"
            className="px-8 py-3 bg-coral text-white rounded-lg font-medium hover:bg-coral-dark transition-colors"
          >
            View Components
          </a>
          <a
            href="/docs"
            className="px-8 py-3 bg-card border border-border text-foreground rounded-lg font-medium hover:bg-muted transition-colors"
          >
            Documentation
          </a>
        </div>
      </div>
    </div>
  )
}
