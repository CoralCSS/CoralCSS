import { useState } from 'react'
import { ComponentPageLayout } from './ComponentPageLayout'

// Preview Components
function ContainerQueryPreview() {
  return (
    <div className="w-full max-w-lg">
      <div className="p-4 bg-card border border-border rounded-xl" style={{ containerType: 'inline-size' }}>
        <div className="grid gap-4" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground">Card 1</h4>
            <p className="text-sm text-muted-foreground">Responsive to container</p>
          </div>
          <div className="p-4 bg-primary/10 rounded-lg">
            <h4 className="font-medium text-foreground">Card 2</h4>
            <p className="text-sm text-muted-foreground">Not viewport</p>
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-3 text-center">
        Resize the container to see cards adapt
      </p>
    </div>
  )
}

function ScrollTimelinePreview() {
  return (
    <div className="w-64 h-40 bg-card border border-border rounded-xl overflow-auto">
      <div className="p-4 space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="p-4 bg-gradient-to-r from-primary to-accent rounded-lg text-white"
            style={{
              opacity: 0.3 + (i * 0.14),
              transform: `translateX(${(i - 1) * 10}px)`,
            }}
          >
            Item {i}
          </div>
        ))}
      </div>
      <p className="sticky bottom-0 p-2 bg-card text-xs text-muted-foreground text-center">
        Scroll to animate
      </p>
    </div>
  )
}

function ViewTransitionPreview() {
  const [view, setView] = useState(1)
  return (
    <div className="w-full max-w-sm">
      <div className="aspect-video mb-4 rounded-lg overflow-hidden relative">
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            view === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-xl font-bold">
            View 1
          </div>
        </div>
        <div
          className={`absolute inset-0 transition-all duration-500 ${
            view === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-full h-full bg-gradient-to-br from-info to-success flex items-center justify-center text-white text-xl font-bold">
            View 2
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => setView(1)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          View 1
        </button>
        <button
          onClick={() => setView(2)}
          className={`flex-1 py-2 rounded-lg text-sm font-medium transition-colors ${
            view === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'
          }`}
        >
          View 2
        </button>
      </div>
    </div>
  )
}

function AnchorPositionPreview() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Anchor Element
      </button>
      {show && (
        <div className="absolute top-full left-0 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 w-48">
          <p className="text-sm text-muted-foreground">
            This element is anchored to the button above using CSS anchor positioning.
          </p>
        </div>
      )}
    </div>
  )
}

function SubGridPreview() {
  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-md">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className={`p-4 rounded-lg text-center ${
            i % 2 === 0 ? 'bg-primary/10 text-primary' : 'bg-info/10 text-info'
          }`}
        >
          <span className="text-sm font-medium">Cell {i}</span>
        </div>
      ))}
    </div>
  )
}

function HasSelectorPreview() {
  const [checked, setChecked] = useState(false)
  return (
    <label
      className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
        checked ? 'border-primary bg-primary/5' : 'border-border'
      }`}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        className="w-5 h-5 accent-primary"
      />
      <span className={`font-medium transition-colors ${checked ? 'text-primary' : 'text-foreground'}`}>
        Parent styles change when checkbox is checked
      </span>
    </label>
  )
}

function TextWrapPreview() {
  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">text-wrap: balance</span>
        <h3 className="text-lg font-semibold text-foreground" style={{ textWrap: 'balance' as never }}>
          This is a balanced heading that distributes text evenly across lines
        </h3>
      </div>
      <div>
        <span className="text-xs text-muted-foreground mb-1 block">text-wrap: pretty</span>
        <p className="text-muted-foreground" style={{ textWrap: 'pretty' as never }}>
          This paragraph uses pretty text wrapping which avoids orphans and widows for better readability.
        </p>
      </div>
    </div>
  )
}

function LightDarkPreview() {
  return (
    <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
      <div className="p-4 bg-card text-foreground rounded-lg border border-border">
        <span className="text-sm font-medium">Light Mode</span>
        <p className="text-xs text-muted-foreground">Adapts to light scheme</p>
      </div>
      <div className="p-4 bg-muted text-foreground rounded-lg border border-border">
        <span className="text-sm font-medium">Dark Mode</span>
        <p className="text-xs text-muted-foreground">Adapts to dark scheme</p>
      </div>
    </div>
  )
}

function PopoverAPIPreview() {
  const [show, setShow] = useState(false)
  return (
    <div className="relative">
      <button
        onClick={() => setShow(!show)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
      >
        Toggle Popover
      </button>
      {show && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 p-4 bg-card border border-border rounded-lg shadow-lg z-10 w-64">
          <h4 className="font-medium text-foreground mb-2">Native Popover</h4>
          <p className="text-sm text-muted-foreground mb-3">
            This uses the native Popover API with automatic light-dismiss.
          </p>
          <button
            onClick={() => setShow(false)}
            className="text-sm text-primary hover:underline"
          >
            Close
          </button>
        </div>
      )}
    </div>
  )
}

function ColorMixPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="flex gap-2 items-center">
        <div className="w-12 h-12 bg-red-500 rounded-lg" />
        <span className="text-muted-foreground">+</span>
        <div className="w-12 h-12 bg-blue-500 rounded-lg" />
        <span className="text-muted-foreground">=</span>
        <div className="w-12 h-12 bg-purple-500 rounded-lg" />
      </div>
      <div className="flex gap-2">
        {[10, 25, 50, 75, 90].map((mix) => (
          <div
            key={mix}
            className="flex-1 h-12 rounded-lg flex items-center justify-center text-xs font-medium text-white"
            style={{
              backgroundColor: `rgb(${255 - (mix * 2.55)}, ${0 + (mix * 0.5)}, ${mix * 2.55})`,
            }}
          >
            {mix}%
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        color-mix() interpolates between colors in various color spaces
      </p>
    </div>
  )
}

function WideGamutColorsPreview() {
  return (
    <div className="grid grid-cols-3 gap-3 w-full max-w-sm">
      {[
        { name: 'P3', color: 'color(display-p3 1 0 0)' },
        { name: 'REC.2020', color: 'color(rec2020 1 0 0)' },
        { name: 'OKLCH', color: 'oklch(0.7 0.15 0)' },
        { name: 'OKLAB', color: 'oklab(0.8 0.1 0)' },
        { name: 'LCH', color: 'lch(70 50 0)' },
        { name: 'LAB', color: 'lab(70 50 0)' },
      ].map((color, i) => (
        <div
          key={i}
          className="aspect-square rounded-lg flex items-end p-2 text-xs font-medium text-white"
          style={{ backgroundColor: color.color }}
        >
          {color.name}
        </div>
      ))}
    </div>
  )
}

function EntryAnimationsPreview() {
  const [items, setItems] = useState([
    { id: 1, text: 'Fade in' },
    { id: 2, text: 'Slide up' },
    { id: 3, text: 'Scale in' },
  ])

  return (
    <div className="w-full max-w-sm">
      <div className="space-y-3">
        {items.map((item, i) => (
          <div
            key={item.id}
            className="p-4 bg-card border border-border rounded-lg transition-all hover:scale-[1.02]"
            style={{
              animation: `slideIn 300ms ease-out ${i * 100}ms both`,
            }}
          >
            <span className="font-medium text-foreground">{item.text}</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setItems([...items, { id: items.length + 1, text: 'New item' }])}
        className="mt-4 w-full py-2 bg-primary text-primary-foreground rounded-lg text-sm"
      >
        Add Item
      </button>
      <style>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

function FieldSizingPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">field-sizing: content (auto)</label>
        <input
          type="text"
          value="Hello"
          className="px-3 py-2 bg-background border border-border rounded-lg"
          style={{ fieldSizing: 'content' as any }}
        />
      </div>
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">field-sizing: fixed</label>
        <input
          type="text"
          defaultValue="Fixed width input"
          className="px-3 py-2 bg-background border border-border rounded-lg w-full"
          style={{ fieldSizing: 'fixed' as any }}
        />
      </div>
    </div>
  )
}

function AdvancedSelectorsPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <p className="text-sm text-muted-foreground">
          Uses :is(), :where(), and :has() for advanced selection
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :is() - Matches any of the selectors
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :where() - Zero-specificity selector
        </p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <p className="text-sm text-muted-foreground">
          :has() - Parent state selector
        </p>
      </div>
    </div>
  )
}

function CSSNestedPreview() {
  return (
    <div className="w-full max-w-sm">
      <div className="p-4 bg-card border border-border rounded-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-bold">
            N
          </div>
          <div>
            <h4 className="font-semibold text-foreground">Nested Styles</h4>
            <p className="text-xs text-muted-foreground">CSS nesting support</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function CSSLayerPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">CSS Cascade Layers</h4>
        <p className="text-xs text-muted-foreground">@layer utility, components, base</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">Layer Order</h4>
        <p className="text-xs text-muted-foreground">Explicit layer ordering</p>
      </div>
    </div>
  )
}

function IndividualTransformPropertiesPreview() {
  const [rotated, setRotated] = useState(false)
  const [scaled, setScaled] = useState(false)

  return (
    <div className="w-full max-w-sm">
      <div className="flex gap-4 justify-center mb-4">
        <button
          onClick={() => setRotated(!rotated)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm"
        >
          {rotated ? 'Remove' : 'Add'} Rotation
        </button>
        <button
          onClick={() => setScaled(!scaled)}
          className="px-4 py-2 bg-info text-info-foreground rounded-lg text-sm"
        >
          {scaled ? 'Remove' : 'Add'} Scale
        </button>
      </div>
      <div className="flex justify-center">
        <div
          className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-bold"
          style={{
            rotate: rotated ? '45deg' : '0deg',
            scale: scaled ? '1.2' : '1',
          }}
        >
          CSS
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-4">
        Individual transform properties (rotate, scale, translate)
      </p>
    </div>
  )
}

function CssLogicPropertiesPreview() {
  return (
    <div className="space-y-4 w-full max-w-sm">
      <div className="p-4 bg-card border border-border rounded-lg">
        <h4 className="font-medium text-foreground mb-2">Logical Properties</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">inline-size:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">200px</code>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">block-size:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">100px</code>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-muted-foreground">inset-inline:</span>
            <code className="text-xs bg-muted px-2 py-1 rounded">1rem</code>
          </div>
        </div>
      </div>
    </div>
  )
}

function MediaQueryRangePreview() {
  const [width, setWidth] = useState(50)

  return (
    <div className="w-full max-w-sm">
      <div
        className="p-6 bg-card border border-border rounded-lg text-center transition-all"
        style={{ width: `${width}%`, maxWidth: '100%' }}
      >
        <p className="text-sm text-muted-foreground">
          Resize to test media query ranges
        </p>
      </div>
      <input
        type="range"
        min="20"
        max="100"
        value={width}
        onChange={(e) => setWidth(Number(e.target.value))}
        className="w-full mt-4"
      />
    </div>
  )
}

function CustomMediaQueriesPreview() {
  return (
    <div className="space-y-3 w-full max-w-sm">
      <div className="p-3 bg-card border border-border rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">@media queries</h4>
        <p className="text-xs text-muted-foreground">Custom media query ranges</p>
      </div>
      <div className="p-3 bg-muted rounded-lg">
        <h4 className="text-sm font-semibold text-foreground mb-1">@custom-media</h4>
        <p className="text-xs text-muted-foreground">Named media features</p>
      </div>
    </div>
  )
}

const modernCSSComponents = [
  {
    id: 'container-query',
    name: 'ContainerQuery',
    description: 'Components that adapt based on container size, not viewport.',
    usage: `<div data-coral-container data-name="card">
  <div data-coral-container-query="@container(min-width: 400px)">
    <!-- Styles applied when container >= 400px -->
  </div>
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'undefined', description: 'Container name for named queries' },
      { name: 'data-type', type: '"size" | "inline-size"', default: '"inline-size"', description: 'Container type' },
    ],
    preview: ContainerQueryPreview,
  },
  {
    id: 'scroll-timeline',
    name: 'ScrollTimeline',
    description: 'Scroll-driven animations that respond to scroll position.',
    usage: `<div data-coral-scroll-timeline data-axis="y">
  <div data-coral-scroll-animation>
    Animated content
  </div>
</div>`,
    props: [
      { name: 'data-axis', type: '"x" | "y"', default: '"y"', description: 'Scroll axis' },
      { name: 'data-scroller', type: 'string', default: '"nearest"', description: 'Scroll container selector' },
    ],
    preview: ScrollTimelinePreview,
  },
  {
    id: 'view-transition',
    name: 'ViewTransition',
    description: 'Smooth transitions between page states using View Transitions API.',
    usage: `<div data-coral-view-transition data-name="hero">
  <img src="..." />
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Unique transition name' },
      { name: 'data-duration', type: 'string', default: '"250ms"', description: 'Transition duration' },
    ],
    preview: ViewTransitionPreview,
  },
  {
    id: 'anchor-position',
    name: 'AnchorPosition',
    description: 'CSS anchor positioning for tooltips and popovers.',
    usage: `<button data-coral-anchor data-anchor-name="--my-anchor">
  Anchor Element
</button>
<div data-coral-anchored data-position-anchor="--my-anchor">
  Positioned content
</div>`,
    props: [
      { name: 'data-anchor-name', type: 'string', default: 'required', description: 'Anchor name for reference' },
      { name: 'data-position', type: '"top" | "bottom" | "left" | "right"', default: '"bottom"', description: 'Anchor position' },
    ],
    preview: AnchorPositionPreview,
  },
  {
    id: 'subgrid',
    name: 'SubGrid',
    description: 'Grid items that inherit parent grid tracks.',
    usage: `<div data-coral-grid data-cols="3">
  <div data-coral-subgrid data-rows>
    <!-- Inherits parent grid rows -->
  </div>
</div>`,
    props: [
      { name: 'data-rows', type: 'boolean', default: 'false', description: 'Inherit row tracks' },
      { name: 'data-cols', type: 'boolean', default: 'false', description: 'Inherit column tracks' },
    ],
    preview: SubGridPreview,
  },
  {
    id: 'has-selector',
    name: 'HasSelector',
    description: 'Parent selectors using the :has() pseudo-class.',
    usage: `<div data-coral-has-input>
  <input type="checkbox" />
  <span>Label changes when checked</span>
</div>

/* CSS */
[data-coral-has-input]:has(:checked) {
  --checked-styles...
}`,
    props: [
      { name: 'data-selector', type: 'string', default: 'required', description: 'Has selector condition' },
    ],
    preview: HasSelectorPreview,
  },
  {
    id: 'text-wrap',
    name: 'TextWrap',
    description: 'Modern text wrapping with balance and pretty options.',
    usage: `<h1 data-coral-text-wrap="balance">
  Balanced heading text that wraps evenly
</h1>

<p data-coral-text-wrap="pretty">
  Pretty text that avoids orphans and widows
</p>`,
    props: [
      { name: 'data-wrap', type: '"balance" | "pretty" | "stable"', default: '"balance"', description: 'Wrap algorithm' },
    ],
    preview: TextWrapPreview,
  },
  {
    id: 'light-dark',
    name: 'LightDark',
    description: 'Use light-dark() function for theme-aware colors.',
    usage: `<div data-coral-light-dark>
  <p style="color: light-dark(#000, #fff)">
    Adaptive text color
  </p>
</div>`,
    props: [
      { name: 'data-scheme', type: '"light" | "dark" | "auto"', default: '"auto"', description: 'Color scheme' },
    ],
    preview: LightDarkPreview,
  },
  {
    id: 'popover-api',
    name: 'PopoverAPI',
    description: 'Native popover using the Popover API.',
    usage: `<button popovertarget="my-popover">
  Toggle Popover
</button>
<div popover id="my-popover">
  Popover content
</div>`,
    props: [
      { name: 'popover', type: '"auto" | "manual"', default: '"auto"', description: 'Popover behavior' },
      { name: 'popovertarget', type: 'string', default: 'required', description: 'Target popover ID' },
    ],
    preview: PopoverAPIPreview,
  },
  {
    id: 'color-mix',
    name: 'ColorMix',
    description: 'Mix colors using color-mix() in CSS.',
    usage: `<div style="background: color-mix(in srgb, red, blue 30%)">
  Mixed color background
</div>`,
    props: [
      { name: 'data-color-space', type: 'string', default: '"srgb"', description: 'Color interpolation space' },
    ],
    preview: ColorMixPreview,
  },
  {
    id: 'wide-gamut-colors',
    name: 'WideGamutColors',
    description: 'Display-P3, REC.2020, OKLCH, and other wide color gamuts.',
    usage: `<div style="background: color(display-p3 1 0 0)">
  Wide gamut color
</div>`,
    props: [
      { name: 'data-gamut', type: '"display-p3" | "rec2020" | "oklch" | "oklab"', default: '"display-p3"', description: 'Color gamut space' },
    ],
    preview: WideGamutColorsPreview,
  },
  {
    id: 'entry-animations',
    name: 'EntryAnimations',
    description: 'View Transitions API for element entry animations.',
    usage: `<div data-coral-view-transition data-name="item">
  <div data-coral-transition-enter>
    Animated content
  </div>
</div>`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Transition name' },
      { name: 'data-duration', type: 'string', default: '"300ms"', description: 'Animation duration' },
    ],
    preview: EntryAnimationsPreview,
  },
  {
    id: 'field-sizing',
    name: 'FieldSizing',
    description: 'Auto or fixed sizing for form inputs.',
    usage: `<input type="text" style="field-sizing: content" />
<input type="text" style="field-sizing: fixed" />`,
    props: [
      { name: 'field-sizing', type: '"content" | "fixed"', default: '"content"', description: 'Input sizing strategy' },
    ],
    preview: FieldSizingPreview,
  },
  {
    id: 'advanced-selectors',
    name: 'AdvancedSelectors',
    description: ':is(), :where(), :has() for powerful selection.',
    usage: `:is(header, footer) p {
  /* Styles for paragraphs in header or footer */
}

:where(.btn) {
  /* Zero-specificity button styles */
}

:has(input:checked) {
  /* Parent styles when checkbox checked */
}`,
    props: [
      { name: 'data-selector', type: 'string', default: 'required', description: 'Advanced selector type' },
    ],
    preview: AdvancedSelectorsPreview,
  },
  {
    id: 'css-nested',
    name: 'CSSNested',
    description: 'Native CSS nesting like Sass.',
    usage: `.card {
  padding: 1rem;

  .title {
    font-size: 1.5rem;

    &:hover {
      color: blue;
    }
  }
}`,
    props: [
      { name: 'data-nesting', type: 'boolean', default: 'true', description: 'Enable CSS nesting' },
    ],
    preview: CSSNestedPreview,
  },
  {
    id: 'css-layer',
    name: 'CSSLayer',
    description: 'Cascade layers for explicit style ordering.',
    usage: `@layer base, components, utilities;

@layer base {
  body { margin: 0; }
}

@layer components {
  .btn { padding: 0.5rem; }
}`,
    props: [
      { name: 'data-layer', type: 'string', default: 'required', description: 'Layer name' },
      { name: 'data-order', type: 'number', default: 'undefined', description: 'Layer order' },
    ],
    preview: CSSLayerPreview,
  },
  {
    id: 'individual-transform',
    name: 'IndividualTransformProperties',
    description: 'Separate transform properties: rotate, scale, translate.',
    usage: `<div style="
  rotate: 45deg;
  scale: 1.2;
  translate: 10px 20px;
">
  Transformed element
</div>`,
    props: [
      { name: 'rotate', type: 'angle', default: '"0deg"', description: 'Rotation angle' },
      { name: 'scale', type: 'number', default: '1', description: 'Scale factor' },
    ],
    preview: IndividualTransformPropertiesPreview,
  },
  {
    id: 'css-logic-properties',
    name: 'CssLogicProperties',
    description: 'Logical properties for internationalization.',
    usage: `<div style="
  inline-size: 200px;
  block-size: 100px;
  inset-inline: 1rem;
  margin-block: 0.5rem;
">
  Logical properties
</div>`,
    props: [
      { name: 'data-property', type: '"inline-size" | "block-size" | "inset-inline"', default: '"inline-size"', description: 'Logical property type' },
    ],
    preview: CssLogicPropertiesPreview,
  },
  {
    id: 'media-query-range',
    name: 'MediaQueryRange',
    description: 'Range syntax for media queries.',
    usage: `@media (width >= 320px) and (width <= 768px) {
  /* Styles for mobile */
}`,
    props: [
      { name: 'data-feature', type: 'string', default: '"width"', description: 'Media feature' },
      { name: 'data-min', type: 'string', default: 'undefined', description: 'Minimum value' },
      { name: 'data-max', type: 'string', default: 'undefined', description: 'Maximum value' },
    ],
    preview: MediaQueryRangePreview,
  },
  {
    id: 'custom-media-queries',
    name: 'CustomMediaQueries',
    description: 'Named custom media queries.',
    usage: `@custom-media --small (width >= 320px);
@custom-media --large (width >= 1024px);

@media (--small) and (--large) {
  /* Styles */
}`,
    props: [
      { name: 'data-name', type: 'string', default: 'required', description: 'Custom media query name' },
      { name: 'data-query', type: 'string', default: 'required', description: 'Media query definition' },
    ],
    preview: CustomMediaQueriesPreview,
  },
]

function ModernCSSPage() {
  return (
    <ComponentPageLayout
      categoryName="Modern CSS"
      categoryId="modern-css"
      components={modernCSSComponents}
      accessibilityFeatures={[
        'Progressive enhancement',
        'Fallback support',
        'Accessibility maintained',
        'Motion preferences respected',
      ]}
    />
  )
}

export default ModernCSSPage
