# CoralCSS

Modern, zero-dependency CSS framework with utility-first classes and headless components.

[![npm version](https://img.shields.io/npm/v/@coral-css/core.svg)](https://www.npmjs.com/package/@coral-css/core)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Tests](https://img.shields.io/badge/tests-10,056%20passing-brightgreen.svg)]()

## What is CoralCSS?

CoralCSS is a complete CSS framework built from the ground up with modern web development in mind. It combines:

- **Utility Classes** - 700+ utility classes for rapid UI development
- **Headless Components** - 78 accessible, unstyled UI components
- **Modern CSS** - First-class support for container queries, anchor positioning, scroll-driven animations
- **High Performance** - Rust-powered Turbo engine for blazing fast builds
- **Zero Dependencies** - No runtime dependencies, just pure TypeScript
- **Plugin Architecture** - Micro-kernel design with everything as plugins

## Installation

```bash
npm install @coral-css/core
# or
pnpm add @coral-css/core
# or
yarn add @coral-css/core
```

## Quick Start

### With Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      darkMode: 'class',
      content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
    })
  ]
})
```

```html
<!-- Import virtual CSS -->
<link rel="stylesheet" href="virtual:coral.css">

<!-- Use utility classes -->
<div class="flex items-center gap-4 p-4 bg-coral-500 text-white rounded-lg shadow-md">
  Hello, CoralCSS!
</div>
```

### With PostCSS

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@coral-css/core/postcss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    }),
  ],
}
```

```css
/* In your CSS */
@coral base;
@coral theme;
@coral utilities;
@coral components;
```

### With CDN

```html
<script src="https://unpkg.com/@coral-css/core/dist/cdn.iife.js"></script>
<script>
  // CoralCSS auto-initializes and watches for class changes
  const coral = window.CoralCSS.getCoralCDN()
</script>
```

### Programmatic Usage

```typescript
import { createCoral, coralPreset } from '@coral-css/core'

const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

const css = coral.generate(['flex', 'items-center', 'p-4', 'bg-coral-500'])
console.log(css)
// Output:
// .flex { display: flex; }
// .items-center { align-items: center; }
// .p-4 { padding: 1rem; }
// .bg-coral-500 { background-color: var(--color-coral-500); }
```

## Utility Classes

CoralCSS provides a comprehensive set of utility classes covering all aspects of CSS.

### Layout

```html
<!-- Display -->
<div class="flex">           <!-- display: flex -->
<div class="grid">           <!-- display: grid -->
<div class="block">          <!-- display: block -->
<div class="inline-flex">    <!-- display: inline-flex -->
<div class="hidden">         <!-- display: none -->

<!-- Flexbox -->
<div class="flex items-center justify-between gap-4">
<div class="flex-col flex-wrap flex-1">
<div class="grow shrink-0 basis-1/2">

<!-- Grid -->
<div class="grid grid-cols-3 grid-rows-2 gap-4">
<div class="col-span-2 row-span-full">
<div class="grid-cols-subgrid">  <!-- CSS Subgrid -->

<!-- Container -->
<div class="container mx-auto px-4">
<div class="max-w-7xl mx-auto">
```

### Spacing

```html
<!-- Padding -->
<div class="p-4">      <!-- padding: 1rem -->
<div class="px-4">     <!-- padding-left & right: 1rem -->
<div class="py-2">     <!-- padding-top & bottom: 0.5rem -->
<div class="pt-4">     <!-- padding-top: 1rem -->
<div class="p-[20px]"> <!-- padding: 20px (arbitrary) -->

<!-- Margin -->
<div class="m-4">      <!-- margin: 1rem -->
<div class="mx-auto">  <!-- margin-left & right: auto -->
<div class="-mt-4">    <!-- margin-top: -1rem (negative) -->
<div class="m-[2rem]"> <!-- margin: 2rem (arbitrary) -->

<!-- Gap -->
<div class="gap-4">    <!-- gap: 1rem -->
<div class="gap-x-4">  <!-- column-gap: 1rem -->
<div class="gap-y-2">  <!-- row-gap: 0.5rem -->

<!-- Space Between -->
<div class="space-x-4">  <!-- > * + * { margin-left: 1rem } -->
<div class="space-y-2">  <!-- > * + * { margin-top: 0.5rem } -->
```

### Sizing

```html
<!-- Width -->
<div class="w-64">       <!-- width: 16rem -->
<div class="w-full">     <!-- width: 100% -->
<div class="w-screen">   <!-- width: 100vw -->
<div class="w-1/2">      <!-- width: 50% -->
<div class="w-fit">      <!-- width: fit-content -->
<div class="w-[300px]">  <!-- width: 300px -->

<!-- Height -->
<div class="h-64">       <!-- height: 16rem -->
<div class="h-full">     <!-- height: 100% -->
<div class="h-screen">   <!-- height: 100vh -->
<div class="h-dvh">      <!-- height: 100dvh (dynamic) -->

<!-- Min/Max -->
<div class="min-w-0 max-w-lg">
<div class="min-h-screen max-h-[500px]">

<!-- Aspect Ratio -->
<div class="aspect-video">   <!-- aspect-ratio: 16/9 -->
<div class="aspect-square">  <!-- aspect-ratio: 1/1 -->
<div class="aspect-[4/3]">   <!-- aspect-ratio: 4/3 -->
```

### Typography

```html
<!-- Font Size -->
<p class="text-xs">    <!-- 0.75rem -->
<p class="text-sm">    <!-- 0.875rem -->
<p class="text-base">  <!-- 1rem -->
<p class="text-lg">    <!-- 1.125rem -->
<p class="text-xl">    <!-- 1.25rem -->
<p class="text-2xl">   <!-- 1.5rem -->
<p class="text-9xl">   <!-- 8rem -->

<!-- Font Weight -->
<p class="font-thin">      <!-- 100 -->
<p class="font-normal">    <!-- 400 -->
<p class="font-medium">    <!-- 500 -->
<p class="font-semibold">  <!-- 600 -->
<p class="font-bold">      <!-- 700 -->

<!-- Font Family -->
<p class="font-sans">   <!-- system-ui, sans-serif -->
<p class="font-serif">  <!-- Georgia, serif -->
<p class="font-mono">   <!-- monospace -->

<!-- Line Height -->
<p class="leading-none">     <!-- 1 -->
<p class="leading-tight">    <!-- 1.25 -->
<p class="leading-normal">   <!-- 1.5 -->
<p class="leading-relaxed">  <!-- 1.625 -->
<p class="leading-loose">    <!-- 2 -->

<!-- Letter Spacing -->
<p class="tracking-tighter">  <!-- -0.05em -->
<p class="tracking-tight">    <!-- -0.025em -->
<p class="tracking-normal">   <!-- 0 -->
<p class="tracking-wide">     <!-- 0.025em -->

<!-- Text Alignment -->
<p class="text-left text-center text-right text-justify">

<!-- Text Transform -->
<p class="uppercase lowercase capitalize normal-case">

<!-- Text Decoration -->
<p class="underline line-through no-underline">
<p class="decoration-wavy decoration-dotted">
<p class="underline-offset-4">

<!-- Text Overflow -->
<p class="truncate">         <!-- overflow: hidden; text-overflow: ellipsis; white-space: nowrap -->
<p class="line-clamp-3">     <!-- -webkit-line-clamp: 3 -->

<!-- Whitespace -->
<p class="whitespace-nowrap whitespace-pre-wrap">

<!-- Word Break -->
<p class="break-words break-all">
```

### Colors

CoralCSS includes a comprehensive color palette with 11 shades (50-950) for each color.

```html
<!-- Background -->
<div class="bg-coral-500">
<div class="bg-blue-600">
<div class="bg-gray-100">
<div class="bg-white bg-black bg-transparent">
<div class="bg-[#ff5733]">  <!-- Arbitrary color -->

<!-- Text -->
<p class="text-coral-500">
<p class="text-gray-900">
<p class="text-white">

<!-- Border -->
<div class="border-coral-500">
<div class="border-gray-200">

<!-- Ring (focus outline) -->
<button class="ring-coral-500">

<!-- Opacity Modifier -->
<div class="bg-coral-500/50">    <!-- 50% opacity -->
<div class="text-black/75">      <!-- 75% opacity -->
<div class="border-white/10">    <!-- 10% opacity -->
```

**Available Colors:** slate, gray, zinc, neutral, stone, red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose, coral

### Borders

```html
<!-- Border Width -->
<div class="border">      <!-- 1px -->
<div class="border-2">    <!-- 2px -->
<div class="border-4">    <!-- 4px -->
<div class="border-t-2">  <!-- top only -->
<div class="border-x-2">  <!-- left & right -->

<!-- Border Radius -->
<div class="rounded-none">   <!-- 0 -->
<div class="rounded-sm">     <!-- 0.125rem -->
<div class="rounded">        <!-- 0.25rem -->
<div class="rounded-md">     <!-- 0.375rem -->
<div class="rounded-lg">     <!-- 0.5rem -->
<div class="rounded-xl">     <!-- 0.75rem -->
<div class="rounded-2xl">    <!-- 1rem -->
<div class="rounded-full">   <!-- 9999px -->
<div class="rounded-t-lg">   <!-- top corners -->
<div class="rounded-tl-lg">  <!-- top-left only -->

<!-- Border Style -->
<div class="border-solid border-dashed border-dotted border-none">

<!-- Divide (between children) -->
<div class="divide-y divide-gray-200">
<div class="divide-x-2 divide-dashed">

<!-- Outline -->
<div class="outline outline-2 outline-offset-2 outline-coral-500">

<!-- Ring -->
<button class="ring-2 ring-coral-500 ring-offset-2">
```

### Effects

```html
<!-- Box Shadow -->
<div class="shadow-sm">     <!-- small shadow -->
<div class="shadow">        <!-- default shadow -->
<div class="shadow-md">     <!-- medium shadow -->
<div class="shadow-lg">     <!-- large shadow -->
<div class="shadow-xl">     <!-- extra large -->
<div class="shadow-2xl">    <!-- 2x extra large -->
<div class="shadow-inner">  <!-- inset shadow -->
<div class="shadow-none">   <!-- no shadow -->
<div class="shadow-coral-500/50">  <!-- colored shadow -->

<!-- Opacity -->
<div class="opacity-0">     <!-- 0% -->
<div class="opacity-25">    <!-- 25% -->
<div class="opacity-50">    <!-- 50% -->
<div class="opacity-75">    <!-- 75% -->
<div class="opacity-100">   <!-- 100% -->

<!-- Mix Blend Mode -->
<div class="mix-blend-multiply">
<div class="mix-blend-screen">
<div class="mix-blend-overlay">

<!-- Background Blend Mode -->
<div class="bg-blend-multiply">

<!-- Filter -->
<div class="blur-sm blur blur-md blur-lg blur-xl">
<div class="brightness-50 brightness-100 brightness-150">
<div class="contrast-50 contrast-100 contrast-150">
<div class="grayscale grayscale-0">
<div class="saturate-50 saturate-100 saturate-200">
<div class="sepia sepia-0">
<div class="invert invert-0">
<div class="hue-rotate-90 hue-rotate-180">

<!-- Backdrop Filter -->
<div class="backdrop-blur-sm backdrop-blur-md">
<div class="backdrop-brightness-75">
<div class="backdrop-saturate-150">
```

### Transforms

```html
<!-- Scale -->
<div class="scale-50">      <!-- transform: scale(0.5) -->
<div class="scale-100">     <!-- transform: scale(1) -->
<div class="scale-150">     <!-- transform: scale(1.5) -->
<div class="scale-x-50">    <!-- transform: scaleX(0.5) -->
<div class="scale-y-150">   <!-- transform: scaleY(1.5) -->

<!-- Rotate -->
<div class="rotate-0">      <!-- transform: rotate(0deg) -->
<div class="rotate-45">     <!-- transform: rotate(45deg) -->
<div class="rotate-90">     <!-- transform: rotate(90deg) -->
<div class="rotate-180">    <!-- transform: rotate(180deg) -->
<div class="-rotate-45">    <!-- transform: rotate(-45deg) -->

<!-- Translate -->
<div class="translate-x-4">   <!-- transform: translateX(1rem) -->
<div class="translate-y-4">   <!-- transform: translateY(1rem) -->
<div class="-translate-x-4">  <!-- transform: translateX(-1rem) -->
<div class="translate-x-1/2"> <!-- transform: translateX(50%) -->

<!-- Skew -->
<div class="skew-x-6">      <!-- transform: skewX(6deg) -->
<div class="skew-y-12">     <!-- transform: skewY(12deg) -->

<!-- Transform Origin -->
<div class="origin-center">
<div class="origin-top">
<div class="origin-top-right">
<div class="origin-bottom-left">

<!-- 3D Transforms -->
<div class="perspective-500">       <!-- perspective: 500px -->
<div class="perspective-1000">      <!-- perspective: 1000px -->
<div class="rotate-x-45">           <!-- transform: rotateX(45deg) -->
<div class="rotate-y-90">           <!-- transform: rotateY(90deg) -->
<div class="rotate-z-180">          <!-- transform: rotateZ(180deg) -->
<div class="translate-z-10">        <!-- transform: translateZ(2.5rem) -->
<div class="transform-style-3d">    <!-- transform-style: preserve-3d -->
<div class="backface-hidden">       <!-- backface-visibility: hidden -->
```

### Transitions & Animations

```html
<!-- Transition Property -->
<div class="transition">           <!-- all properties -->
<div class="transition-colors">    <!-- color, background-color, border-color -->
<div class="transition-opacity">   <!-- opacity -->
<div class="transition-shadow">    <!-- box-shadow -->
<div class="transition-transform"> <!-- transform -->
<div class="transition-none">      <!-- none -->

<!-- Duration -->
<div class="duration-75">    <!-- 75ms -->
<div class="duration-100">   <!-- 100ms -->
<div class="duration-150">   <!-- 150ms -->
<div class="duration-200">   <!-- 200ms -->
<div class="duration-300">   <!-- 300ms -->
<div class="duration-500">   <!-- 500ms -->
<div class="duration-1000">  <!-- 1000ms -->

<!-- Timing Function -->
<div class="ease-linear">
<div class="ease-in">
<div class="ease-out">
<div class="ease-in-out">

<!-- Delay -->
<div class="delay-75">
<div class="delay-100">
<div class="delay-500">

<!-- Animation -->
<div class="animate-spin">       <!-- continuous rotation -->
<div class="animate-ping">       <!-- ping effect -->
<div class="animate-pulse">      <!-- pulse/fade -->
<div class="animate-bounce">     <!-- bouncing -->
<div class="animate-fade-in">    <!-- fade in -->
<div class="animate-slide-in-left">
<div class="animate-zoom-in">
<div class="animate-shake">

<!-- Animation Controls -->
<div class="animate-duration-500">
<div class="animate-delay-100">
<div class="animate-ease-out">
<div class="animate-infinite">
<div class="animate-once">
```

### Interactivity

```html
<!-- Cursor -->
<div class="cursor-pointer">
<div class="cursor-default">
<div class="cursor-wait">
<div class="cursor-text">
<div class="cursor-move">
<div class="cursor-not-allowed">
<div class="cursor-grab cursor-grabbing">

<!-- User Select -->
<div class="select-none">
<div class="select-text">
<div class="select-all">
<div class="select-auto">

<!-- Pointer Events -->
<div class="pointer-events-none">
<div class="pointer-events-auto">

<!-- Resize -->
<textarea class="resize-none">
<textarea class="resize">
<textarea class="resize-x resize-y">

<!-- Scroll Behavior -->
<div class="scroll-smooth">
<div class="scroll-auto">

<!-- Scroll Snap -->
<div class="snap-x snap-mandatory">
<div class="snap-start snap-center snap-end">
<div class="snap-always">

<!-- Touch Action -->
<div class="touch-auto touch-none touch-manipulation">

<!-- Will Change -->
<div class="will-change-auto">
<div class="will-change-scroll">
<div class="will-change-contents">
<div class="will-change-transform">
```

## Variants

Apply styles conditionally using variants:

### Pseudo-Class Variants

```html
<!-- Hover & Focus -->
<button class="bg-coral-500 hover:bg-coral-600 focus:ring-2 focus:ring-coral-500">

<!-- Active & Visited -->
<a class="text-blue-500 active:text-blue-700 visited:text-purple-500">

<!-- Focus Variants -->
<input class="focus:outline-none focus-visible:ring-2 focus-within:border-coral-500">

<!-- Disabled -->
<button class="bg-coral-500 disabled:bg-gray-300 disabled:cursor-not-allowed">

<!-- First/Last/Odd/Even -->
<li class="first:pt-0 last:pb-0 odd:bg-gray-50 even:bg-white">

<!-- Empty -->
<div class="empty:hidden">
```

### Responsive Variants

```html
<!-- Mobile-first breakpoints -->
<div class="text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl">

<!-- Breakpoints: sm(640px), md(768px), lg(1024px), xl(1280px), 2xl(1536px) -->
<div class="flex-col md:flex-row">
<div class="hidden lg:block">
<div class="w-full md:w-1/2 lg:w-1/3">
```

### Dark Mode

```html
<!-- Class-based dark mode (default) -->
<div class="bg-white dark:bg-slate-900">
<p class="text-gray-900 dark:text-white">
<button class="bg-coral-500 dark:bg-coral-400">

<!-- Media query dark mode -->
<!-- Configure: createCoral({ darkMode: 'media' }) -->
```

### State Variants

```html
<!-- Form States -->
<input class="border invalid:border-red-500 valid:border-green-500">
<input class="required:border-red-300">
<input class="read-only:bg-gray-100">
<input class="placeholder-shown:border-gray-300">

<!-- Checked/Indeterminate -->
<input type="checkbox" class="checked:bg-coral-500">
<input type="checkbox" class="indeterminate:bg-gray-300">
```

### Group & Peer Variants

```html
<!-- Group: style children based on parent state -->
<div class="group">
  <img class="group-hover:scale-105">
  <p class="group-hover:text-coral-500">
  <button class="group-focus:ring-2">
</div>

<!-- Peer: style siblings based on sibling state -->
<input class="peer" placeholder="Email">
<p class="hidden peer-invalid:block text-red-500">Invalid email</p>
```

### Variant Groups (Unique Feature)

```html
<!-- Instead of repeating variants -->
<div class="hover:bg-coral-500 hover:text-white hover:scale-105">

<!-- Use variant groups -->
<div class="hover:(bg-coral-500 text-white scale-105)">

<!-- Works with all variants -->
<div class="dark:(bg-slate-900 text-white border-slate-700)">
<div class="md:(flex-row gap-8 p-8)">
```

## Modern CSS Features

### Container Queries

```html
<!-- Define container -->
<div class="@container">
  <!-- Respond to container size -->
  <div class="@sm:flex @md:grid @lg:hidden">
    Responds to container width
  </div>
</div>

<!-- Named containers -->
<div class="@container/sidebar">
  <nav class="@sm/sidebar:flex-col">
</div>

<!-- Container types -->
<div class="container-type-inline-size">  <!-- width only -->
<div class="container-type-size">         <!-- width and height -->
```

### Anchor Positioning

```html
<!-- Define anchor -->
<button class="anchor-name-[--trigger]">Open Menu</button>

<!-- Position relative to anchor -->
<div class="position-anchor-[--trigger] position-area-bottom">
  <ul class="menu">
    <li>Item 1</li>
    <li>Item 2</li>
  </ul>
</div>

<!-- Position areas -->
<div class="position-area-top">
<div class="position-area-bottom-right">
<div class="position-area-center">
```

### Scroll-Driven Animations

```html
<!-- Animate based on scroll position -->
<div class="animation-timeline-scroll">
  <div class="animate-fade-in">
    Fades in as you scroll
  </div>
</div>

<!-- Animation range -->
<div class="animation-range-entry">     <!-- animate during entry -->
<div class="animation-range-exit">      <!-- animate during exit -->
<div class="animation-range-contain">   <!-- animate while contained -->

<!-- View timeline -->
<div class="animation-timeline-view">
```

### :has() Selector

```html
<!-- Style parent based on children -->
<div class="has-[input:focus]:ring-2">
  <input type="text">
</div>

<!-- Style based on checked state -->
<label class="has-[:checked]:bg-coral-500">
  <input type="checkbox">
  <span>Option</span>
</label>
```

### View Transitions

```html
<!-- Enable view transitions -->
<div class="view-transition-name-[hero]">
  <img src="..." class="view-transition-image">
</div>
```

## Animations

60+ built-in animations with full customization:

### Entrance Animations

```html
<div class="animate-fade-in">
<div class="animate-fade-in-up">
<div class="animate-fade-in-down">
<div class="animate-fade-in-left">
<div class="animate-fade-in-right">
<div class="animate-slide-in-up">
<div class="animate-slide-in-down">
<div class="animate-slide-in-left">
<div class="animate-slide-in-right">
<div class="animate-zoom-in">
<div class="animate-zoom-in-up">
<div class="animate-flip-in-x">
<div class="animate-flip-in-y">
<div class="animate-rotate-in">
```

### Exit Animations

```html
<div class="animate-fade-out">
<div class="animate-fade-out-up">
<div class="animate-slide-out-left">
<div class="animate-zoom-out">
```

### Attention Seekers

```html
<div class="animate-bounce">
<div class="animate-pulse">
<div class="animate-ping">
<div class="animate-spin">
<div class="animate-shake">
<div class="animate-wiggle">
<div class="animate-swing">
<div class="animate-tada">
<div class="animate-jello">
<div class="animate-heartbeat">
<div class="animate-rubber-band">
<div class="animate-flash">
```

### Loading Animations

```html
<div class="animate-spinner">
<div class="animate-dots">
<div class="animate-bars">
<div class="animate-wave">
<div class="animate-skeleton">
```

### Animation Utilities

```html
<!-- Duration -->
<div class="animate-duration-75">   <!-- 75ms -->
<div class="animate-duration-100">  <!-- 100ms -->
<div class="animate-duration-500">  <!-- 500ms -->
<div class="animate-duration-1000"> <!-- 1000ms -->

<!-- Delay -->
<div class="animate-delay-75">
<div class="animate-delay-100">
<div class="animate-delay-500">

<!-- Timing -->
<div class="animate-linear">
<div class="animate-ease-in">
<div class="animate-ease-out">
<div class="animate-ease-in-out">

<!-- Iteration -->
<div class="animate-once">       <!-- 1 -->
<div class="animate-twice">      <!-- 2 -->
<div class="animate-infinite">   <!-- infinite -->

<!-- Direction -->
<div class="animate-reverse">
<div class="animate-alternate">

<!-- Fill Mode -->
<div class="animate-fill-forwards">
<div class="animate-fill-backwards">
<div class="animate-fill-both">

<!-- Play State -->
<div class="animate-running">
<div class="animate-paused">
```

### @starting-style (Entry Animations)

CSS-only entry animations without JavaScript:

```html
<!-- Element animates in when added to DOM -->
<div class="animate-fade-in-entry">
  Automatically animates in
</div>

<!-- Dialog entry animation -->
<dialog class="animate-zoom-in-entry backdrop:animate-fade-in-entry">
```

## Headless Components

78 accessible, unstyled components with full keyboard navigation and ARIA support.

### Usage

```typescript
import {
  createDialog,
  createDropdown,
  createTabs,
  createAccordion,
  createToast,
  initComponents
} from '@coral-css/core/components'

// Initialize individual component
const dialog = createDialog('#my-dialog', {
  closeOnBackdrop: true,
  closeOnEscape: true,
  trapFocus: true,
  initialFocus: '#first-input',
})

// Open/close programmatically
dialog.open()
dialog.close()

// Listen to events
dialog.element.addEventListener('coral:dialog:open', () => {
  console.log('Dialog opened')
})

// Auto-initialize all components with data attributes
document.addEventListener('DOMContentLoaded', initComponents)
```

### Available Components

#### Overlays & Modals

| Component | Description |
|-----------|-------------|
| `Dialog` | Modal dialogs with focus trap and backdrop |
| `AlertDialog` | Confirmation dialogs with required action |
| `Drawer` | Side panels that slide in from edges |
| `Sheet` | Bottom/side sheets with drag-to-dismiss |
| `Popover` | Floating content containers |
| `Tooltip` | Tooltips with delay and positioning |
| `HoverCard` | Hover-triggered rich previews |
| `ContextMenu` | Right-click context menus |

#### Navigation

| Component | Description |
|-----------|-------------|
| `Tabs` | Tabbed interfaces with ARIA |
| `Accordion` | Collapsible content panels |
| `Breadcrumb` | Navigation breadcrumbs |
| `Pagination` | Page navigation with keyboard support |
| `Stepper` | Multi-step wizards |
| `Tree` | Hierarchical tree views |
| `Navbar` | Responsive navigation bars |
| `Sidebar` | Collapsible sidebars |
| `Menu` | Dropdown menus with submenus |
| `NavigationMenu` | Accessible navigation menus |
| `Menubar` | Application menu bars |

#### Forms

| Component | Description |
|-----------|-------------|
| `Switch` | Toggle switches |
| `Checkbox` | Custom checkboxes with indeterminate |
| `Radio` | Radio button groups |
| `Select` | Custom dropdown selects |
| `Combobox` | Autocomplete/typeahead inputs |
| `MultiSelect` | Multi-value selection |
| `TagInput` | Tag input with autocomplete |
| `Slider` | Single-value range sliders |
| `RangeSlider` | Dual-handle range sliders |
| `Input` | Enhanced text inputs |
| `Textarea` | Auto-growing text areas |
| `NumberInput` | Number inputs with stepper |
| `PinInput` | PIN/OTP code inputs |
| `FileUpload` | Drag-and-drop file uploads |

#### Date & Time

| Component | Description |
|-----------|-------------|
| `Calendar` | Full calendar component |
| `DatePicker` | Date selection with calendar |
| `DateRangePicker` | Date range selection |
| `TimePicker` | Time selection |

#### Feedback

| Component | Description |
|-----------|-------------|
| `Toast` | Toast notifications with auto-dismiss |
| `Alert` | Alert banners with variants |
| `Spinner` | Loading spinners |
| `Progress` | Progress bars |
| `Skeleton` | Loading placeholders |
| `EmptyState` | Empty state displays |
| `Countdown` | Countdown timers |

#### Data Display

| Component | Description |
|-----------|-------------|
| `Card` | Content containers |
| `Avatar` | User avatars with fallback |
| `Badge` | Status badges |
| `Table` | Basic data tables |
| `DataTable` | Advanced tables with sorting/filtering |
| `Timeline` | Event timelines |
| `Rating` | Star ratings |
| `Stat` | Statistics display |
| `Chip` | Compact chips/tags |

#### Advanced

| Component | Description |
|-----------|-------------|
| `Carousel` | Image/content carousels |
| `ImageGallery` | Gallery with lightbox |
| `Command` | Command palette (Cmd+K) |
| `Tour` | Product tours/walkthroughs |
| `VirtualList` | Virtualized long lists |
| `Resizable` | Resizable panels |
| `ScrollArea` | Custom scrollable areas |
| `ColorPicker` | Color selection |
| `QRCode` | QR code generation |
| `Transfer` | Transfer lists |
| `SegmentedControl` | Segmented controls |

### Component Example

```html
<!-- Dialog with data attributes -->
<button data-dialog-trigger="my-dialog">Open Dialog</button>

<dialog id="my-dialog" data-dialog>
  <div data-dialog-content>
    <h2>Dialog Title</h2>
    <p>Dialog content goes here.</p>
    <button data-dialog-close>Close</button>
  </div>
</dialog>

<!-- Tabs -->
<div data-tabs data-default-value="tab1">
  <div data-tabs-list>
    <button data-tabs-trigger="tab1">Tab 1</button>
    <button data-tabs-trigger="tab2">Tab 2</button>
  </div>
  <div data-tabs-content="tab1">Content 1</div>
  <div data-tabs-content="tab2">Content 2</div>
</div>

<!-- Accordion -->
<div data-accordion data-type="single">
  <div data-accordion-item="item1">
    <button data-accordion-trigger>Section 1</button>
    <div data-accordion-content>Content 1</div>
  </div>
  <div data-accordion-item="item2">
    <button data-accordion-trigger>Section 2</button>
    <div data-accordion-content>Content 2</div>
  </div>
</div>
```

## Configuration

### Basic Configuration

```typescript
import { createCoral } from '@coral-css/core'

const coral = createCoral({
  // Class prefix
  prefix: '',              // default: '' (no prefix)

  // Dark mode strategy
  darkMode: 'class',       // 'class' | 'media' | 'selector'

  // Important modifier
  important: false,        // Add !important to all utilities

  // Separator for variants
  separator: ':',          // default: ':'
})
```

### Presets

```typescript
import {
  coralPreset,   // Default - modern CSS features
  windPreset,    // Tailwind-compatible
  miniPreset,    // Minimal - core utilities only
  fullPreset,    // Everything included
} from '@coral-css/core'

// Use preset
const coral = createCoral()
coralPreset().forEach(plugin => coral.use(plugin))

// Preset with options
coralPreset({
  darkMode: 'class',
  prefix: 'c-',
})
```

### Design System Presets

```typescript
import {
  materialPreset,    // Material Design 3
  cupertinoPreset,   // Apple iOS/macOS
  nordPreset,        // Nord arctic theme
  draculaPreset,     // Dracula dark theme
  githubPreset,      // GitHub design system
} from '@coral-css/core/presets'

// Use Material Design
materialPreset({
  primary: '#6200EE',
  secondary: '#03DAC6',
}).forEach(plugin => coral.use(plugin))
```

### Custom Plugins

```typescript
import { createCoral, definePlugin } from '@coral-css/core'

const myPlugin = definePlugin({
  name: 'my-custom-plugin',

  utilities: {
    'custom-util': {
      'custom-property': 'custom-value',
    },
  },

  variants: {
    'custom-variant': (selector) => `@media (custom) { ${selector} }`,
  },

  theme: {
    colors: {
      brand: '#ff5733',
    },
  },
})

const coral = createCoral()
coral.use(myPlugin)
```

## Build Tools

### Vite

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import coral from '@coral-css/core/vite'

export default defineConfig({
  plugins: [
    coral({
      content: ['./src/**/*.{html,js,ts,jsx,tsx,vue,svelte}'],
      darkMode: 'class',
    })
  ]
})
```

### PostCSS

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@coral-css/core/postcss')({
      content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
    }),
  ],
}
```

### Webpack

```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: '@coral-css/core/webpack',
            options: {
              content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
            },
          },
        ],
      },
    ],
  },
}
```

### CLI

```bash
# Generate CSS from content files
npx coral src/**/*.html -o dist/styles.css

# With options
npx coral src/**/*.{html,jsx,tsx} \
  --output dist/styles.css \
  --minify \
  --watch

# Initialize config
npx coral init

# Analyze usage
npx coral analyze src/
```

## Framework Integrations

### React

```typescript
import { useCoralCSS, CoralProvider } from '@coral-css/core/react'

// Hook usage
function Component() {
  const { cx, css } = useCoralCSS()

  return (
    <div className={cx('flex items-center', isActive && 'bg-coral-500')}>
      {children}
    </div>
  )
}

// Provider
function App() {
  return (
    <CoralProvider config={{ darkMode: 'class' }}>
      <Component />
    </CoralProvider>
  )
}
```

### Vue

```typescript
// main.ts
import { createApp } from 'vue'
import { createCoralPlugin } from '@coral-css/core/vue'

const app = createApp(App)
app.use(createCoralPlugin({
  darkMode: 'class',
}))
```

```vue
<template>
  <div v-coral="'flex items-center p-4'">
    {{ content }}
  </div>
</template>

<script setup>
import { useCoral } from '@coral-css/core/vue'
const { cx } = useCoral()
</script>
```

### Angular

```typescript
// app.module.ts
import { NgModule } from '@angular/core'
import { CoralModule } from '@coral-css/core/angular'

@NgModule({
  imports: [
    CoralModule.forRoot({
      darkMode: 'class',
    }),
  ],
})
export class AppModule {}
```

```html
<div [coralClass]="['flex', 'items-center', isActive ? 'bg-coral-500' : '']">
  {{ content }}
</div>
```

### Svelte

```typescript
// +layout.svelte
<script>
  import { setCoralContext } from '@coral-css/core/svelte'
  setCoralContext({ darkMode: 'class' })
</script>
```

```svelte
<script>
  import { coral } from '@coral-css/core/svelte'
</script>

<div use:coral={'flex items-center p-4'}>
  {content}
</div>
```

## Coral Turbo Engine

Optional Rust-powered engine for maximum build performance.

### Installation

```bash
npm install @coral-css/turbo
```

### Usage

```typescript
import { createEngine } from '@coral-css/turbo'

// Create engine (auto-selects native vs WASM)
const turbo = await createEngine()

// Parse classes
const parsed = turbo.parse('hover:bg-blue-500 dark:text-white')
// [
//   { raw: 'hover:bg-blue-500', utility: 'bg', value: 'blue-500', variants: ['hover'] },
//   { raw: 'dark:text-white', utility: 'text', value: 'white', variants: ['dark'] }
// ]

// Extract from HTML
const classes = turbo.extract('<div class="p-4 m-2 flex">')
// ['p-4', 'm-2', 'flex']

// Generate CSS
const css = turbo.process('p-4 m-2 bg-coral-500')
// @layer utilities {
//   .p-4 { padding: 1rem; }
//   .m-2 { margin: 0.5rem; }
//   .bg-coral-500 { background-color: #f97316; }
// }
```

### Performance

| Operation | Speed |
|-----------|-------|
| Parser (simple) | 10,000 class/ms |
| Parser (complex) | 2,000 class/ms |
| Extractor (parallel) | 281 KB/ms |
| Matcher | 2,400 match/ms |
| Generator | 333 gen/ms |
| Full Pipeline | 67 pipeline/ms |

### Integration with CoralCSS

```typescript
import { createCoral } from '@coral-css/core'
import { createEngine } from '@coral-css/turbo'

const turbo = await createEngine()
const coral = createCoral({
  turboEngine: turbo,  // Use Turbo for parsing/extraction
})
```

## Architecture

CoralCSS uses a micro-kernel architecture where everything is a plugin.

```
┌──────────────────────────────────────────────────────────────┐
│                        Application                           │
├──────────────────────────────────────────────────────────────┤
│              Presets (coral, wind, mini, full)               │
├──────────────────────────────────────────────────────────────┤
│                         Plugins                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  Layout  │ │  Colors  │ │ Effects  │ │Components│        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │Typography│ │ Borders  │ │Transforms│ │Animations│        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├──────────────────────────────────────────────────────────────┤
│                          Kernel                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  Parser  │ │ Matcher  │ │Generator │ │  Cache   │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
├──────────────────────────────────────────────────────────────┤
│                   Turbo Engine (Rust)                        │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐        │
│  │  Parser  │ │ Extractor│ │ Matcher  │ │Generator │        │
│  └──────────┘ └──────────┘ └──────────┘ └──────────┘        │
└──────────────────────────────────────────────────────────────┘
```

### Key Components

- **Kernel**: Core engine that processes utilities and generates CSS
- **Parser**: Parses class strings into structured data
- **Matcher**: Matches utilities to CSS rules using prefix indexing
- **Generator**: Generates optimized CSS output
- **Cache**: LRU cache with TTL for repeated operations
- **Turbo**: Optional Rust engine for maximum performance

## Test Coverage

| Package | Tests | Status |
|---------|-------|--------|
| @coral-css/core | 9,961 | Passing |
| @coral-css/turbo | 95 | Passing |
| **Total** | **10,056** | **100%** |

### Test Categories

- Unit tests for all utilities
- Integration tests for plugins
- Component tests with JSDOM
- Performance benchmarks
- Snapshot tests for CSS output

## TypeScript

Full TypeScript support with strict types and comprehensive type definitions.

```typescript
import type {
  Coral,
  Plugin,
  Rule,
  Variant,
  Theme,
  UtilityConfig,
  ComponentConfig,
  ParsedClass,
  MatchResult,
} from '@coral-css/core'

// Type-safe plugin creation
const plugin: Plugin = {
  name: 'my-plugin',
  utilities: {
    'my-util': {
      display: 'flex',
    },
  },
}

// Type-safe configuration
const config: CoralConfig = {
  darkMode: 'class',
  prefix: 'c-',
}
```

## Browser Support

| Browser | Version |
|---------|---------|
| Chrome | 90+ |
| Firefox | 90+ |
| Safari | 15+ |
| Edge | 90+ |

### Progressive Enhancement

Some modern CSS features require latest browser versions:
- **Container Queries**: Chrome 105+, Safari 16+
- **Anchor Positioning**: Chrome 125+
- **Scroll-Driven Animations**: Chrome 115+
- **:has() Selector**: Chrome 105+, Safari 15.4+

CoralCSS automatically generates fallbacks where possible.

## License

MIT © CoralCSS

## Links

- [Documentation](https://coralcss.dev)
- [GitHub](https://github.com/nicholascostadev/coralcss)
- [npm](https://www.npmjs.com/package/@coral-css/core)
- [Discord](https://discord.gg/coralcss)
