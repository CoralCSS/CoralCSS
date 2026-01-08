function Docs() {
  return (
    <div className="pt-28 pb-12">
      <div className="container max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Documentation</h1>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Installation</h2>
          <pre>{`npm install @coralcss/core
# or
pnpm add @coralcss/core
# or
yarn add @coralcss/core`}</pre>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Quick Start</h2>

          <h3 className="text-xl font-semibold text-foreground mb-2 mt-6">Vite Plugin</h3>
          <pre>{`// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coralcss/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
    }),
  ],
})`}</pre>

          <h3 className="text-xl font-semibold text-foreground mb-2 mt-6">CDN Usage</h3>
          <pre>{`<script src="https://unpkg.com/@coralcss/core/dist/cdn.iife.js"></script>
<script>
  const coral = window.CoralCSS.getCoralCDN()
</script>`}</pre>

          <h3 className="text-xl font-semibold text-foreground mb-2 mt-6">Programmatic Usage</h3>
          <pre>{`import { createCoral, coralPreset } from '@coralcss/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
console.log(css)`}</pre>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Utility Classes</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Layout</h3>
              <pre className="text-sm">{`flex, grid, block, inline, hidden
items-center, justify-between, gap-4
container, mx-auto, px-4`}</pre>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Spacing</h3>
              <pre className="text-sm">{`p-{0-96}, m-{0-96}, gap-{0-96}
px-4, py-2, mt-4, mb-8
-mt-4, -ml-2 (negative)`}</pre>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Sizing</h3>
              <pre className="text-sm">{`w-{0-96}, h-{0-96}, size-{0-96}
w-full, w-screen, w-1/2, w-auto
min-w-0, max-w-lg, min-h-screen`}</pre>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Typography</h3>
              <pre className="text-sm">{`text-xs to text-9xl
font-sans, font-serif, font-mono
font-normal, font-medium, font-bold`}</pre>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Colors</h3>
              <pre className="text-sm">{`bg-{color}-{shade}
text-{color}-{shade}
border-{color}-{shade}
bg-coral-500/50 (opacity)`}</pre>
            </div>

            <div className="p-4 rounded-lg bg-card border border-border">
              <h3 className="text-lg font-semibold text-foreground mb-2">Effects</h3>
              <pre className="text-sm">{`shadow-{sm|md|lg|xl|2xl}
opacity-{0-100}
blur-{sm|md|lg|xl}`}</pre>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Variants</h2>
          <pre>{`<!-- Pseudo-classes -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2">

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Dark mode -->
<div class="bg-white dark:bg-slate-900">

<!-- Group variants -->
<div class="group">
  <span class="group-hover:text-coral-500">Hover parent</span>
</div>

<!-- Variant Groups (unique!) -->
<div class="hover:(bg-coral-500 text-white scale-105)">`}</pre>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Headless Components</h2>
          <pre>{`import {
  createDialog,
  createDropdown,
  createTabs,
  createAccordion,
  createTooltip,
  createSwitch,
  createToast
} from '@coralcss/core/components'

// Dialog
const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  trapFocus: true,
})
dialog.open()
dialog.close()

// Dropdown
const dropdown = createDropdown('#my-dropdown')
dropdown.element.addEventListener('coral:dropdown:select', (e) => {
  console.log('Selected:', e.detail.item)
})

// Tabs
const tabs = createTabs('#my-tabs', { defaultTab: 0 })
tabs.selectTab(1)`}</pre>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-4">Presets</h2>
          <pre>{`import {
  coralPreset,  // Default with modern CSS
  windPreset,   // Tailwind-compatible
  miniPreset,   // Minimal utilities only
  fullPreset    // Everything included
} from '@coralcss/core'

const coral = createCoral()
coralPreset({ darkMode: 'class' }).forEach(p => coral.use(p))`}</pre>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-foreground mb-4">TypeScript</h2>
          <pre>{`import type {
  Coral,
  Plugin,
  Rule,
  Variant,
  Theme,
  ComponentConfig,
} from '@coralcss/core'`}</pre>
        </section>
      </div>
    </div>
  )
}

export default Docs
