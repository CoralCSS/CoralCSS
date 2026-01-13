/**
 * CoralCSS Playground
 *
 * Three modes:
 * 1. Class Explorer - Click to add utility classes
 * 2. Components - Write HTML with data-coral-* attributes
 * 3. AI Generate - Describe components in plain text
 */

import { useState, useCallback, useEffect, useRef } from 'react'

// ============================================
// CLASS CATEGORIES FOR EXPLORER
// ============================================
const CLASS_CATEGORIES = {
  layout: {
    name: 'Layout',
    classes: [
      { name: 'flex', desc: 'Display flex' },
      { name: 'grid', desc: 'Display grid' },
      { name: 'block', desc: 'Display block' },
      { name: 'inline-flex', desc: 'Inline flex' },
      { name: 'hidden', desc: 'Display none' },
      { name: 'items-center', desc: 'Align center' },
      { name: 'items-start', desc: 'Align start' },
      { name: 'items-end', desc: 'Align end' },
      { name: 'justify-center', desc: 'Justify center' },
      { name: 'justify-between', desc: 'Space between' },
      { name: 'justify-start', desc: 'Justify start' },
      { name: 'justify-end', desc: 'Justify end' },
      { name: 'flex-col', desc: 'Flex column' },
      { name: 'flex-row', desc: 'Flex row' },
      { name: 'flex-wrap', desc: 'Flex wrap' },
      { name: 'gap-1', desc: 'Gap 0.25rem' },
      { name: 'gap-2', desc: 'Gap 0.5rem' },
      { name: 'gap-3', desc: 'Gap 0.75rem' },
      { name: 'gap-4', desc: 'Gap 1rem' },
      { name: 'gap-6', desc: 'Gap 1.5rem' },
      { name: 'gap-8', desc: 'Gap 2rem' },
    ]
  },
  spacing: {
    name: 'Spacing',
    classes: [
      { name: 'p-1', desc: 'Padding 0.25rem' },
      { name: 'p-2', desc: 'Padding 0.5rem' },
      { name: 'p-3', desc: 'Padding 0.75rem' },
      { name: 'p-4', desc: 'Padding 1rem' },
      { name: 'p-6', desc: 'Padding 1.5rem' },
      { name: 'p-8', desc: 'Padding 2rem' },
      { name: 'px-4', desc: 'Padding X 1rem' },
      { name: 'py-2', desc: 'Padding Y 0.5rem' },
      { name: 'py-3', desc: 'Padding Y 0.75rem' },
      { name: 'm-2', desc: 'Margin 0.5rem' },
      { name: 'm-4', desc: 'Margin 1rem' },
      { name: 'mx-auto', desc: 'Center horizontal' },
      { name: 'mt-4', desc: 'Margin top 1rem' },
      { name: 'mb-4', desc: 'Margin bottom 1rem' },
    ]
  },
  sizing: {
    name: 'Sizing',
    classes: [
      { name: 'w-full', desc: 'Width 100%' },
      { name: 'w-auto', desc: 'Width auto' },
      { name: 'w-1/2', desc: 'Width 50%' },
      { name: 'w-1/3', desc: 'Width 33%' },
      { name: 'w-fit', desc: 'Width fit-content' },
      { name: 'h-full', desc: 'Height 100%' },
      { name: 'h-screen', desc: 'Height 100vh' },
      { name: 'h-auto', desc: 'Height auto' },
      { name: 'min-h-screen', desc: 'Min height 100vh' },
      { name: 'max-w-sm', desc: 'Max width 24rem' },
      { name: 'max-w-md', desc: 'Max width 28rem' },
      { name: 'max-w-lg', desc: 'Max width 32rem' },
      { name: 'max-w-xl', desc: 'Max width 36rem' },
    ]
  },
  colors: {
    name: 'Colors',
    classes: [
      { name: 'bg-white', desc: 'White bg', color: '#ffffff' },
      { name: 'bg-black', desc: 'Black bg', color: '#000000' },
      { name: 'bg-slate-100', desc: 'Slate 100', color: '#f1f5f9' },
      { name: 'bg-slate-200', desc: 'Slate 200', color: '#e2e8f0' },
      { name: 'bg-slate-800', desc: 'Slate 800', color: '#1e293b' },
      { name: 'bg-slate-900', desc: 'Slate 900', color: '#0f172a' },
      { name: 'bg-coral-500', desc: 'Coral 500', color: '#ff6b6b' },
      { name: 'bg-coral-600', desc: 'Coral 600', color: '#ee5a5a' },
      { name: 'bg-blue-500', desc: 'Blue 500', color: '#3b82f6' },
      { name: 'bg-green-500', desc: 'Green 500', color: '#22c55e' },
      { name: 'bg-red-500', desc: 'Red 500', color: '#ef4444' },
      { name: 'bg-yellow-500', desc: 'Yellow 500', color: '#eab308' },
      { name: 'bg-purple-500', desc: 'Purple 500', color: '#a855f7' },
      { name: 'text-white', desc: 'White text' },
      { name: 'text-black', desc: 'Black text' },
      { name: 'text-slate-400', desc: 'Slate 400 text' },
      { name: 'text-slate-600', desc: 'Slate 600 text' },
      { name: 'text-slate-900', desc: 'Slate 900 text' },
      { name: 'text-coral-500', desc: 'Coral text' },
    ]
  },
  typography: {
    name: 'Typography',
    classes: [
      { name: 'text-xs', desc: '12px' },
      { name: 'text-sm', desc: '14px' },
      { name: 'text-base', desc: '16px' },
      { name: 'text-lg', desc: '18px' },
      { name: 'text-xl', desc: '20px' },
      { name: 'text-2xl', desc: '24px' },
      { name: 'text-3xl', desc: '30px' },
      { name: 'text-4xl', desc: '36px' },
      { name: 'font-normal', desc: 'Weight 400' },
      { name: 'font-medium', desc: 'Weight 500' },
      { name: 'font-semibold', desc: 'Weight 600' },
      { name: 'font-bold', desc: 'Weight 700' },
      { name: 'text-center', desc: 'Center align' },
      { name: 'text-left', desc: 'Left align' },
      { name: 'text-right', desc: 'Right align' },
      { name: 'uppercase', desc: 'Uppercase' },
      { name: 'lowercase', desc: 'Lowercase' },
      { name: 'capitalize', desc: 'Capitalize' },
    ]
  },
  borders: {
    name: 'Borders',
    classes: [
      { name: 'rounded', desc: '4px radius' },
      { name: 'rounded-md', desc: '6px radius' },
      { name: 'rounded-lg', desc: '8px radius' },
      { name: 'rounded-xl', desc: '12px radius' },
      { name: 'rounded-2xl', desc: '16px radius' },
      { name: 'rounded-full', desc: 'Full radius' },
      { name: 'border', desc: '1px border' },
      { name: 'border-2', desc: '2px border' },
      { name: 'border-slate-200', desc: 'Slate border' },
      { name: 'border-slate-700', desc: 'Dark border' },
      { name: 'border-coral-500', desc: 'Coral border' },
    ]
  },
  effects: {
    name: 'Effects',
    classes: [
      { name: 'shadow-sm', desc: 'Small shadow' },
      { name: 'shadow', desc: 'Base shadow' },
      { name: 'shadow-md', desc: 'Medium shadow' },
      { name: 'shadow-lg', desc: 'Large shadow' },
      { name: 'shadow-xl', desc: 'XL shadow' },
      { name: 'shadow-2xl', desc: '2XL shadow' },
      { name: 'opacity-50', desc: '50% opacity' },
      { name: 'opacity-75', desc: '75% opacity' },
      { name: 'opacity-100', desc: 'Full opacity' },
    ]
  },
  interactive: {
    name: 'Interactive',
    classes: [
      { name: 'cursor-pointer', desc: 'Pointer cursor' },
      { name: 'cursor-not-allowed', desc: 'Not allowed' },
      { name: 'select-none', desc: 'No select' },
      { name: 'transition-all', desc: 'All transition' },
      { name: 'transition-colors', desc: 'Color transition' },
      { name: 'duration-150', desc: '150ms' },
      { name: 'duration-200', desc: '200ms' },
      { name: 'duration-300', desc: '300ms' },
      { name: 'hover:opacity-80', desc: 'Hover opacity' },
      { name: 'hover:scale-105', desc: 'Hover scale' },
      { name: 'hover:bg-coral-600', desc: 'Hover coral' },
      { name: 'active:scale-95', desc: 'Active scale' },
    ]
  },
}

type CategoryKey = keyof typeof CLASS_CATEGORIES

// ============================================
// COMPONENT TEMPLATES
// ============================================
const COMPONENT_TEMPLATES = {
  switch: {
    name: 'Switch',
    code: `<!-- CoralCSS Switch Component -->
<button data-coral-switch role="switch" aria-checked="false">
  <span data-coral-switch-thumb></span>
</button>

<!-- Checked state -->
<button data-coral-switch data-checked role="switch" aria-checked="true">
  <span data-coral-switch-thumb></span>
</button>

<!-- With label -->
<label class="flex items-center gap-3">
  <button data-coral-switch data-checked role="switch" aria-checked="true">
    <span data-coral-switch-thumb></span>
  </button>
  <span class="text-sm text-slate-300">Enable notifications</span>
</label>`,
  },
  button: {
    name: 'Button',
    code: `<!-- CoralCSS Button Variants -->
<div class="flex flex-wrap gap-3">
  <button data-coral-btn>Default</button>
  <button data-coral-btn="primary">Primary</button>
  <button data-coral-btn="secondary">Secondary</button>
  <button data-coral-btn="outline">Outline</button>
  <button data-coral-btn="ghost">Ghost</button>
  <button data-coral-btn="destructive">Destructive</button>
</div>

<!-- Sizes -->
<div class="flex items-center gap-3 mt-4">
  <button data-coral-btn="primary" data-size="sm">Small</button>
  <button data-coral-btn="primary">Medium</button>
  <button data-coral-btn="primary" data-size="lg">Large</button>
</div>

<!-- With icon -->
<button data-coral-btn="primary" class="gap-2">
  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
  </svg>
  Add Item
</button>`,
  },
  input: {
    name: 'Input',
    code: `<!-- CoralCSS Input -->
<div class="flex flex-col gap-4 w-full max-w-sm">
  <div data-coral-field>
    <label data-coral-label>Email</label>
    <input data-coral-input type="email" placeholder="you@example.com">
  </div>

  <div data-coral-field>
    <label data-coral-label>Password</label>
    <input data-coral-input type="password" placeholder="••••••••">
    <span data-coral-hint>Must be at least 8 characters</span>
  </div>

  <div data-coral-field data-error>
    <label data-coral-label>Username</label>
    <input data-coral-input value="ab">
    <span data-coral-error>Username must be at least 3 characters</span>
  </div>
</div>`,
  },
  card: {
    name: 'Card',
    code: `<!-- CoralCSS Card -->
<div data-coral-card class="max-w-sm">
  <div data-coral-card-header>
    <h3 data-coral-card-title>Card Title</h3>
    <p data-coral-card-description>Card description goes here</p>
  </div>
  <div data-coral-card-content>
    <p class="text-slate-400">
      This is the main content area of the card. You can put any content here.
    </p>
  </div>
  <div data-coral-card-footer>
    <button data-coral-btn="outline">Cancel</button>
    <button data-coral-btn="primary">Save</button>
  </div>
</div>`,
  },
  badge: {
    name: 'Badge',
    code: `<!-- CoralCSS Badge -->
<div class="flex flex-wrap gap-2">
  <span data-coral-badge>Default</span>
  <span data-coral-badge="primary">Primary</span>
  <span data-coral-badge="secondary">Secondary</span>
  <span data-coral-badge="success">Success</span>
  <span data-coral-badge="warning">Warning</span>
  <span data-coral-badge="error">Error</span>
  <span data-coral-badge="outline">Outline</span>
</div>`,
  },
  avatar: {
    name: 'Avatar',
    code: `<!-- CoralCSS Avatar -->
<div class="flex items-center gap-4">
  <!-- With initials -->
  <div data-coral-avatar>
    <span data-coral-avatar-fallback>JD</span>
  </div>

  <!-- Different sizes -->
  <div data-coral-avatar data-size="sm">
    <span data-coral-avatar-fallback>SM</span>
  </div>
  <div data-coral-avatar data-size="lg">
    <span data-coral-avatar-fallback>LG</span>
  </div>

  <!-- Avatar group -->
  <div data-coral-avatar-group>
    <div data-coral-avatar><span data-coral-avatar-fallback>A</span></div>
    <div data-coral-avatar><span data-coral-avatar-fallback>B</span></div>
    <div data-coral-avatar><span data-coral-avatar-fallback>C</span></div>
    <div data-coral-avatar><span data-coral-avatar-fallback>+3</span></div>
  </div>
</div>`,
  },
  alert: {
    name: 'Alert',
    code: `<!-- CoralCSS Alerts -->
<div class="flex flex-col gap-3 w-full max-w-md">
  <div data-coral-alert>
    <strong>Info:</strong> This is a default alert message.
  </div>

  <div data-coral-alert="success">
    <strong>Success!</strong> Your changes have been saved.
  </div>

  <div data-coral-alert="warning">
    <strong>Warning!</strong> Your session will expire soon.
  </div>

  <div data-coral-alert="error">
    <strong>Error!</strong> Something went wrong.
  </div>
</div>`,
  },
  checkbox: {
    name: 'Checkbox',
    code: `<!-- CoralCSS Checkbox -->
<div class="flex flex-col gap-3">
  <label data-coral-checkbox-label>
    <input data-coral-checkbox type="checkbox">
    <span>Accept terms and conditions</span>
  </label>

  <label data-coral-checkbox-label>
    <input data-coral-checkbox type="checkbox" checked>
    <span>Receive email notifications</span>
  </label>

  <label data-coral-checkbox-label data-disabled>
    <input data-coral-checkbox type="checkbox" disabled>
    <span>Disabled option</span>
  </label>
</div>`,
  },
}

type TemplateKey = keyof typeof COMPONENT_TEMPLATES

// ============================================
// AI GENERATION TEMPLATES (Demo)
// ============================================
const AI_PROMPTS = {
  'pricing-card': {
    prompt: 'Create a pricing card with plan name, price, features list, and CTA button',
    code: `<!-- AI Generated: Pricing Card -->
<div data-coral-card class="max-w-sm text-center">
  <div data-coral-card-header>
    <span data-coral-badge="primary" class="mb-2">Popular</span>
    <h3 data-coral-card-title class="text-2xl">Pro Plan</h3>
    <p data-coral-card-description>Perfect for growing teams</p>
  </div>
  <div data-coral-card-content>
    <div class="mb-6">
      <span class="text-4xl font-bold text-white">$29</span>
      <span class="text-slate-400">/month</span>
    </div>
    <ul class="flex flex-col gap-3 text-left text-sm text-slate-300">
      <li class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Unlimited projects
      </li>
      <li class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Priority support
      </li>
      <li class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Advanced analytics
      </li>
      <li class="flex items-center gap-2">
        <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        Custom integrations
      </li>
    </ul>
  </div>
  <div data-coral-card-footer class="justify-center">
    <button data-coral-btn="primary" data-size="lg" class="w-full">Get Started</button>
  </div>
</div>`,
  },
  'user-profile': {
    prompt: 'Create a user profile card with avatar, name, bio, and social links',
    code: `<!-- AI Generated: User Profile Card -->
<div data-coral-card class="max-w-sm">
  <div class="p-6 text-center">
    <div data-coral-avatar data-size="lg" class="mx-auto mb-4" style="width: 80px; height: 80px;">
      <span data-coral-avatar-fallback class="text-2xl">JD</span>
    </div>
    <h3 class="text-xl font-semibold text-white mb-1">John Doe</h3>
    <p class="text-sm text-slate-400 mb-4">Senior Product Designer</p>
    <p class="text-slate-300 text-sm mb-6">
      Passionate about creating beautiful user experiences.
      10+ years in design. Coffee enthusiast.
    </p>
    <div class="flex justify-center gap-3 mb-6">
      <span data-coral-badge="secondary">UI Design</span>
      <span data-coral-badge="secondary">UX Research</span>
      <span data-coral-badge="secondary">Figma</span>
    </div>
    <div class="flex justify-center gap-4">
      <button data-coral-btn="ghost" class="p-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
        </svg>
      </button>
      <button data-coral-btn="ghost" class="p-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
        </svg>
      </button>
      <button data-coral-btn="ghost" class="p-2">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>
    </div>
  </div>
  <div data-coral-card-footer class="justify-center">
    <button data-coral-btn="primary">Follow</button>
    <button data-coral-btn="outline">Message</button>
  </div>
</div>`,
  },
  'login-form': {
    prompt: 'Create a login form with email, password, remember me checkbox, and submit button',
    code: `<!-- AI Generated: Login Form -->
<div data-coral-card class="max-w-sm w-full">
  <div data-coral-card-header class="text-center">
    <div class="w-12 h-12 mx-auto mb-4 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #ff6b6b, #ee5a5a);">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
      </svg>
    </div>
    <h3 data-coral-card-title>Welcome back</h3>
    <p data-coral-card-description>Sign in to your account</p>
  </div>
  <div data-coral-card-content>
    <form class="flex flex-col gap-4">
      <div data-coral-field>
        <label data-coral-label>Email</label>
        <input data-coral-input type="email" placeholder="you@example.com">
      </div>
      <div data-coral-field>
        <label data-coral-label>Password</label>
        <input data-coral-input type="password" placeholder="••••••••">
      </div>
      <div class="flex items-center justify-between">
        <label data-coral-checkbox-label>
          <input data-coral-checkbox type="checkbox">
          <span class="text-sm">Remember me</span>
        </label>
        <a href="#" class="text-sm text-coral-500 hover:underline">Forgot password?</a>
      </div>
      <button data-coral-btn="primary" class="w-full mt-2">Sign in</button>
    </form>
  </div>
  <div class="px-6 pb-6 text-center">
    <p class="text-sm text-slate-400">
      Don't have an account?
      <a href="#" class="text-coral-500 hover:underline">Sign up</a>
    </p>
  </div>
</div>`,
  },
  'notification-toast': {
    prompt: 'Create a notification toast with icon, title, description, and close button',
    code: `<!-- AI Generated: Notification Toast -->
<div class="flex flex-col gap-3 w-full max-w-sm">
  <!-- Success Toast -->
  <div class="flex items-start gap-3 p-4 rounded-xl border border-green-500/30" style="background: rgba(34, 197, 94, 0.1);">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
      <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-medium text-white">Success!</p>
      <p class="text-sm text-slate-400">Your changes have been saved successfully.</p>
    </div>
    <button class="flex-shrink-0 p-1 text-slate-400 hover:text-white transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- Error Toast -->
  <div class="flex items-start gap-3 p-4 rounded-xl border border-red-500/30" style="background: rgba(239, 68, 68, 0.1);">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center">
      <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-medium text-white">Error occurred</p>
      <p class="text-sm text-slate-400">Something went wrong. Please try again.</p>
    </div>
    <button class="flex-shrink-0 p-1 text-slate-400 hover:text-white transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>

  <!-- Info Toast -->
  <div class="flex items-start gap-3 p-4 rounded-xl border border-blue-500/30" style="background: rgba(59, 130, 246, 0.1);">
    <div class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
      <svg class="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <div class="flex-1 min-w-0">
      <p class="font-medium text-white">New update available</p>
      <p class="text-sm text-slate-400">A new version is ready to install.</p>
    </div>
    <button class="flex-shrink-0 p-1 text-slate-400 hover:text-white transition-colors">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </button>
  </div>
</div>`,
  },
  'stat-card': {
    prompt: 'Create a statistics card with number, label, trend indicator, and icon',
    code: `<!-- AI Generated: Statistics Cards -->
<div class="grid grid-cols-1 gap-4 w-full max-w-lg">
  <!-- Revenue Card -->
  <div data-coral-card class="flex items-center gap-4 p-4">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #22c55e20, #22c55e10);">
      <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    </div>
    <div class="flex-1">
      <p class="text-sm text-slate-400">Total Revenue</p>
      <p class="text-2xl font-bold text-white">$45,231</p>
    </div>
    <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style="background: rgba(34, 197, 94, 0.1); color: #22c55e;">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      12.5%
    </div>
  </div>

  <!-- Users Card -->
  <div data-coral-card class="flex items-center gap-4 p-4">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #3b82f620, #3b82f610);">
      <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
      </svg>
    </div>
    <div class="flex-1">
      <p class="text-sm text-slate-400">Active Users</p>
      <p class="text-2xl font-bold text-white">2,350</p>
    </div>
    <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6;">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"/>
      </svg>
      8.2%
    </div>
  </div>

  <!-- Orders Card -->
  <div data-coral-card class="flex items-center gap-4 p-4">
    <div class="w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #ff6b6b20, #ff6b6b10);">
      <svg class="w-6 h-6 text-coral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
      </svg>
    </div>
    <div class="flex-1">
      <p class="text-sm text-slate-400">Total Orders</p>
      <p class="text-2xl font-bold text-white">1,247</p>
    </div>
    <div class="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium" style="background: rgba(239, 68, 68, 0.1); color: #ef4444;">
      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/>
      </svg>
      3.1%
    </div>
  </div>
</div>`,
  },
  'feature-section': {
    prompt: 'Create a feature showcase section with icon, title, and description',
    code: `<!-- AI Generated: Feature Section -->
<div class="grid grid-cols-1 gap-6 w-full max-w-2xl">
  <!-- Feature 1 -->
  <div class="flex gap-4 p-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #ff6b6b, #ee5a5a);">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-1">Lightning Fast</h4>
      <p class="text-sm text-slate-400">Optimized for speed with minimal bundle size. Your users will love the instant load times.</p>
    </div>
  </div>

  <!-- Feature 2 -->
  <div class="flex gap-4 p-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #8b5cf6, #7c3aed);">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-1">Flexible Layouts</h4>
      <p class="text-sm text-slate-400">Build any layout you can imagine with our powerful grid and flexbox utilities.</p>
    </div>
  </div>

  <!-- Feature 3 -->
  <div class="flex gap-4 p-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #06b6d4, #0891b2);">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-1">Type Safe</h4>
      <p class="text-sm text-slate-400">Full TypeScript support with excellent IntelliSense. Catch errors before they happen.</p>
    </div>
  </div>

  <!-- Feature 4 -->
  <div class="flex gap-4 p-4">
    <div class="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center" style="background: linear-gradient(135deg, #22c55e, #16a34a);">
      <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
      </svg>
    </div>
    <div>
      <h4 class="font-semibold text-white mb-1">Highly Customizable</h4>
      <p class="text-sm text-slate-400">Easily customize every aspect with CSS variables and design tokens.</p>
    </div>
  </div>
</div>`,
  },
}

type AIPromptKey = keyof typeof AI_PROMPTS

// ============================================
// CORALCSS FRAMEWORK STYLES
// ============================================
const CORAL_FRAMEWORK_CSS = `
/* CoralCSS Framework - Full Component Styles */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background: linear-gradient(145deg, #0f172a, #1e293b);
  min-height: 100vh;
  padding: 2rem;
  color: #e2e8f0;
  line-height: 1.6;
}

/* ========== UTILITY CLASSES ========== */
.flex { display: flex; }
.grid { display: grid; }
.block { display: block; }
.inline-flex { display: inline-flex; }
.hidden { display: none; }
.items-center { align-items: center; }
.items-start { align-items: flex-start; }
.items-end { align-items: flex-end; }
.justify-center { justify-content: center; }
.justify-between { justify-content: space-between; }
.justify-start { justify-content: flex-start; }
.justify-end { justify-content: flex-end; }
.flex-col { flex-direction: column; }
.flex-row { flex-direction: row; }
.flex-wrap { flex-wrap: wrap; }
.flex-shrink-0 { flex-shrink: 0; }
.flex-1 { flex: 1 1 0%; }
.min-w-0 { min-width: 0; }
.gap-1 { gap: 0.25rem; }
.gap-2 { gap: 0.5rem; }
.gap-3 { gap: 0.75rem; }
.gap-4 { gap: 1rem; }
.gap-6 { gap: 1.5rem; }
.gap-8 { gap: 2rem; }
.grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }

.p-1 { padding: 0.25rem; }
.p-2 { padding: 0.5rem; }
.p-3 { padding: 0.75rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }
.px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.pb-6 { padding-bottom: 1.5rem; }
.m-2 { margin: 0.5rem; }
.m-4 { margin: 1rem; }
.mx-auto { margin-left: auto; margin-right: auto; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-6 { margin-bottom: 1.5rem; }

.w-full { width: 100%; }
.w-auto { width: auto; }
.w-1\\/2 { width: 50%; }
.w-1\\/3 { width: 33.333%; }
.w-fit { width: fit-content; }
.w-3 { width: 0.75rem; }
.w-4 { width: 1rem; }
.w-5 { width: 1.25rem; }
.w-6 { width: 1.5rem; }
.w-8 { width: 2rem; }
.w-12 { width: 3rem; }
.h-full { height: 100%; }
.h-screen { height: 100vh; }
.h-auto { height: auto; }
.h-3 { height: 0.75rem; }
.h-4 { height: 1rem; }
.h-5 { height: 1.25rem; }
.h-6 { height: 1.5rem; }
.h-8 { height: 2rem; }
.h-12 { height: 3rem; }
.min-h-screen { min-height: 100vh; }
.max-w-sm { max-width: 24rem; }
.max-w-md { max-width: 28rem; }
.max-w-lg { max-width: 32rem; }
.max-w-xl { max-width: 36rem; }
.max-w-2xl { max-width: 42rem; }

.bg-white { background-color: #ffffff; }
.bg-black { background-color: #000000; }
.bg-slate-100 { background-color: #f1f5f9; }
.bg-slate-200 { background-color: #e2e8f0; }
.bg-slate-800 { background-color: #1e293b; }
.bg-slate-900 { background-color: #0f172a; }
.bg-coral-500 { background-color: #ff6b6b; }
.bg-coral-600 { background-color: #ee5a5a; }
.bg-blue-500 { background-color: #3b82f6; }
.bg-green-500 { background-color: #22c55e; }
.bg-red-500 { background-color: #ef4444; }
.bg-yellow-500 { background-color: #eab308; }
.bg-purple-500 { background-color: #a855f7; }
.text-white { color: #ffffff; }
.text-black { color: #000000; }
.text-slate-300 { color: #cbd5e1; }
.text-slate-400 { color: #94a3b8; }
.text-slate-600 { color: #475569; }
.text-slate-900 { color: #0f172a; }
.text-coral-500 { color: #ff6b6b; }
.text-green-500 { color: #22c55e; }
.text-blue-500 { color: #3b82f6; }
.text-red-500 { color: #ef4444; }

.text-xs { font-size: 0.75rem; }
.text-sm { font-size: 0.875rem; }
.text-base { font-size: 1rem; }
.text-lg { font-size: 1.125rem; }
.text-xl { font-size: 1.25rem; }
.text-2xl { font-size: 1.5rem; }
.text-3xl { font-size: 1.875rem; }
.text-4xl { font-size: 2.25rem; }
.font-normal { font-weight: 400; }
.font-medium { font-weight: 500; }
.font-semibold { font-weight: 600; }
.font-bold { font-weight: 700; }
.text-center { text-align: center; }
.text-left { text-align: left; }
.text-right { text-align: right; }
.uppercase { text-transform: uppercase; }
.lowercase { text-transform: lowercase; }
.capitalize { text-transform: capitalize; }

.rounded { border-radius: 0.25rem; }
.rounded-md { border-radius: 0.375rem; }
.rounded-lg { border-radius: 0.5rem; }
.rounded-xl { border-radius: 0.75rem; }
.rounded-2xl { border-radius: 1rem; }
.rounded-full { border-radius: 9999px; }
.border { border: 1px solid #334155; }
.border-2 { border-width: 2px; }
.border-slate-200 { border-color: #e2e8f0; }
.border-slate-700 { border-color: #334155; }
.border-coral-500 { border-color: #ff6b6b; }

.shadow-sm { box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
.shadow { box-shadow: 0 1px 3px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06); }
.shadow-md { box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
.shadow-lg { box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
.shadow-xl { box-shadow: 0 20px 25px rgba(0,0,0,0.1); }
.shadow-2xl { box-shadow: 0 25px 50px rgba(0,0,0,0.25); }
.opacity-50 { opacity: 0.5; }
.opacity-75 { opacity: 0.75; }
.opacity-100 { opacity: 1; }

.cursor-pointer { cursor: pointer; }
.cursor-not-allowed { cursor: not-allowed; }
.select-none { user-select: none; }
.transition-all { transition: all 0.2s ease; }
.transition-colors { transition: color 0.2s, background-color 0.2s; }
.duration-150 { transition-duration: 150ms; }
.duration-200 { transition-duration: 200ms; }
.duration-300 { transition-duration: 300ms; }
.hover\\:opacity-80:hover { opacity: 0.8; }
.hover\\:scale-105:hover { transform: scale(1.05); }
.hover\\:bg-coral-600:hover { background-color: #ee5a5a; }
.hover\\:underline:hover { text-decoration: underline; }
.active\\:scale-95:active { transform: scale(0.95); }

/* ========== COMPONENT: SWITCH ========== */
[data-coral-switch] {
  position: relative;
  display: inline-flex;
  align-items: center;
  width: 44px;
  height: 24px;
  background: #334155;
  border-radius: 9999px;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;
  padding: 2px;
}
[data-coral-switch]:hover { background: #475569; }
[data-coral-switch][data-checked] { background: #ff6b6b; }
[data-coral-switch-thumb] {
  display: block;
  width: 20px;
  height: 20px;
  background: white;
  border-radius: 9999px;
  transition: transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
[data-coral-switch][data-checked] [data-coral-switch-thumb] {
  transform: translateX(20px);
}

/* ========== COMPONENT: BUTTON ========== */
[data-coral-btn] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.625rem 1.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  background: #334155;
  color: white;
}
[data-coral-btn]:hover { background: #475569; }
[data-coral-btn="primary"] {
  background: linear-gradient(135deg, #ff6b6b, #ee5a5a);
  box-shadow: 0 4px 12px rgba(255,107,107,0.4);
}
[data-coral-btn="primary"]:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(255,107,107,0.5);
}
[data-coral-btn="secondary"] { background: #1e293b; }
[data-coral-btn="secondary"]:hover { background: #334155; }
[data-coral-btn="outline"] {
  background: transparent;
  border: 1px solid #475569;
  color: #e2e8f0;
}
[data-coral-btn="outline"]:hover { background: rgba(255,255,255,0.05); border-color: #64748b; }
[data-coral-btn="ghost"] { background: transparent; }
[data-coral-btn="ghost"]:hover { background: rgba(255,255,255,0.1); }
[data-coral-btn="destructive"] { background: #ef4444; }
[data-coral-btn="destructive"]:hover { background: #dc2626; }
[data-coral-btn][data-size="sm"] { padding: 0.375rem 0.75rem; font-size: 0.8125rem; }
[data-coral-btn][data-size="lg"] { padding: 0.875rem 1.75rem; font-size: 1rem; }

/* ========== COMPONENT: INPUT ========== */
[data-coral-field] { display: flex; flex-direction: column; gap: 0.5rem; }
[data-coral-label] { font-size: 0.875rem; font-weight: 500; color: #e2e8f0; }
[data-coral-input] {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  background: #0f172a;
  border: 1px solid #334155;
  border-radius: 0.5rem;
  color: white;
  transition: all 0.2s ease;
}
[data-coral-input]::placeholder { color: #64748b; }
[data-coral-input]:focus {
  outline: none;
  border-color: #ff6b6b;
  box-shadow: 0 0 0 3px rgba(255,107,107,0.2);
}
[data-coral-hint] { font-size: 0.75rem; color: #64748b; }
[data-coral-error] { font-size: 0.75rem; color: #ef4444; }
[data-coral-field][data-error] [data-coral-input] { border-color: #ef4444; }

/* ========== COMPONENT: CARD ========== */
[data-coral-card] {
  background: #1e293b;
  border: 1px solid #334155;
  border-radius: 0.75rem;
  overflow: hidden;
}
[data-coral-card-header] { padding: 1.5rem 1.5rem 0; }
[data-coral-card-title] { font-size: 1.125rem; font-weight: 600; color: white; margin-bottom: 0.25rem; }
[data-coral-card-description] { font-size: 0.875rem; color: #94a3b8; }
[data-coral-card-content] { padding: 1.5rem; }
[data-coral-card-footer] {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: rgba(0,0,0,0.2);
  border-top: 1px solid #334155;
}

/* ========== COMPONENT: BADGE ========== */
[data-coral-badge] {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  border-radius: 9999px;
  background: #334155;
  color: white;
}
[data-coral-badge="primary"] { background: #ff6b6b; }
[data-coral-badge="secondary"] { background: #1e293b; border: 1px solid #334155; }
[data-coral-badge="success"] { background: rgba(34,197,94,0.2); color: #22c55e; }
[data-coral-badge="warning"] { background: rgba(234,179,8,0.2); color: #eab308; }
[data-coral-badge="error"] { background: rgba(239,68,68,0.2); color: #ef4444; }
[data-coral-badge="outline"] { background: transparent; border: 1px solid #475569; }

/* ========== COMPONENT: AVATAR ========== */
[data-coral-avatar] {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 9999px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  overflow: hidden;
}
[data-coral-avatar][data-size="sm"] { width: 2rem; height: 2rem; font-size: 0.75rem; }
[data-coral-avatar][data-size="lg"] { width: 3rem; height: 3rem; font-size: 1.125rem; }
[data-coral-avatar-fallback] { font-size: 0.875rem; font-weight: 600; color: white; }
[data-coral-avatar-group] { display: flex; }
[data-coral-avatar-group] [data-coral-avatar] {
  margin-left: -0.5rem;
  border: 2px solid #1e293b;
}
[data-coral-avatar-group] [data-coral-avatar]:first-child { margin-left: 0; }

/* ========== COMPONENT: ALERT ========== */
[data-coral-alert] {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  padding: 1rem;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: rgba(51,65,85,0.5);
  border: 1px solid #475569;
}
[data-coral-alert] strong { color: white; margin-right: 0.25rem; }
[data-coral-alert="success"] { background: rgba(34,197,94,0.1); border-color: rgba(34,197,94,0.3); }
[data-coral-alert="success"] strong { color: #22c55e; }
[data-coral-alert="warning"] { background: rgba(234,179,8,0.1); border-color: rgba(234,179,8,0.3); }
[data-coral-alert="warning"] strong { color: #eab308; }
[data-coral-alert="error"] { background: rgba(239,68,68,0.1); border-color: rgba(239,68,68,0.3); }
[data-coral-alert="error"] strong { color: #ef4444; }

/* ========== COMPONENT: CHECKBOX ========== */
[data-coral-checkbox-label] {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  cursor: pointer;
  font-size: 0.875rem;
  color: #e2e8f0;
}
[data-coral-checkbox-label][data-disabled] { opacity: 0.5; cursor: not-allowed; }
[data-coral-checkbox] {
  appearance: none;
  width: 1.125rem;
  height: 1.125rem;
  border: 2px solid #475569;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: all 0.15s ease;
}
[data-coral-checkbox]:checked {
  background: #ff6b6b;
  border-color: #ff6b6b;
  background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
}
[data-coral-checkbox]:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,107,107,0.2);
}

/* Link styles */
a { color: #ff6b6b; text-decoration: none; }
a:hover { text-decoration: underline; }
`

// ============================================
// ELEMENT TYPES FOR CLASS EXPLORER
// ============================================
const ELEMENT_TYPES = [
  { id: 'button', name: 'Button', tag: 'button', content: 'Click Me' },
  { id: 'div', name: 'Box', tag: 'div', content: 'Box Content' },
  { id: 'card', name: 'Card', tag: 'div', content: 'Card Title' },
  { id: 'badge', name: 'Badge', tag: 'span', content: 'Badge' },
  { id: 'text', name: 'Text', tag: 'p', content: 'Sample text paragraph' },
]

// ============================================
// MAIN COMPONENT
// ============================================
export default function Playground() {
  // Mode: 'explorer', 'components', or 'ai'
  const [mode, setMode] = useState<'explorer' | 'components' | 'ai'>('explorer')

  // Explorer state
  const [selectedElement, setSelectedElement] = useState('button')
  const [appliedClasses, setAppliedClasses] = useState<string[]>(['bg-coral-500', 'text-white', 'px-4', 'py-2', 'rounded-lg', 'font-medium'])
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>('colors')

  // Components state
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateKey>('switch')
  const [componentCode, setComponentCode] = useState(COMPONENT_TEMPLATES.switch.code)

  // AI state
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiGeneratedCode, setAiGeneratedCode] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedAIPrompt, setSelectedAIPrompt] = useState<AIPromptKey | null>(null)
  const typingRef = useRef<number | null>(null)

  const [copied, setCopied] = useState(false)

  // Toggle class in explorer
  const toggleClass = useCallback((className: string) => {
    setAppliedClasses(prev =>
      prev.includes(className)
        ? prev.filter(c => c !== className)
        : [...prev, className]
    )
  }, [])

  // Remove class
  const removeClass = useCallback((className: string) => {
    setAppliedClasses(prev => prev.filter(c => c !== className))
  }, [])

  // Select component template
  const selectComponentTemplate = useCallback((key: TemplateKey) => {
    setSelectedTemplate(key)
    setComponentCode(COMPONENT_TEMPLATES[key].code)
  }, [])

  // Simulate AI generation with typing effect
  const generateAIComponent = useCallback((promptKey: AIPromptKey) => {
    setSelectedAIPrompt(promptKey)
    setAiPrompt(AI_PROMPTS[promptKey].prompt)
    setIsGenerating(true)
    setAiGeneratedCode('')

    const fullCode = AI_PROMPTS[promptKey].code
    let currentIndex = 0

    // Clear any existing typing animation
    if (typingRef.current) {
      clearInterval(typingRef.current)
    }

    // Typing effect - faster for better UX
    typingRef.current = window.setInterval(() => {
      if (currentIndex < fullCode.length) {
        // Add characters in chunks for smoother typing
        const chunkSize = Math.min(5, fullCode.length - currentIndex)
        setAiGeneratedCode(prev => prev + fullCode.slice(currentIndex, currentIndex + chunkSize))
        currentIndex += chunkSize
      } else {
        if (typingRef.current) {
          clearInterval(typingRef.current)
        }
        setIsGenerating(false)
      }
    }, 10)
  }, [])

  // Clean up typing animation on unmount
  useEffect(() => {
    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current)
      }
    }
  }, [])

  // Copy code
  const copyCode = useCallback(async () => {
    let codeToCopy = ''
    if (mode === 'explorer') {
      const el = ELEMENT_TYPES.find(e => e.id === selectedElement)
      codeToCopy = `<${el?.tag} class="${appliedClasses.join(' ')}">${el?.content}</${el?.tag}>`
    } else if (mode === 'components') {
      codeToCopy = componentCode
    } else {
      codeToCopy = aiGeneratedCode
    }
    await navigator.clipboard.writeText(codeToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }, [mode, selectedElement, appliedClasses, componentCode, aiGeneratedCode])

  // Preview content for AI mode
  const aiPreviewContent = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CORAL_FRAMEWORK_CSS}</style>
</head><body>${aiGeneratedCode}</body></html>`

  // Preview content for components mode
  const componentPreviewContent = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CORAL_FRAMEWORK_CSS}</style>
</head><body>${componentCode}</body></html>`

  // Preview content for explorer mode
  const element = ELEMENT_TYPES.find(e => e.id === selectedElement)
  const explorerPreviewContent = `<!DOCTYPE html>
<html><head>
<meta charset="UTF-8">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>${CORAL_FRAMEWORK_CSS}</style>
</head><body style="display:flex;align-items:center;justify-content:center;min-height:100vh;">
<${element?.tag} class="${appliedClasses.join(' ')}">${element?.content}</${element?.tag}>
</body></html>`

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', background: '#020617', overflow: 'hidden', fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* Header */}
      <header style={{ flexShrink: 0, background: '#0f172a', borderBottom: '1px solid #1e293b', padding: '0 16px', height: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '32px', height: '32px', background: 'linear-gradient(135deg, #ff6b6b, #ee5a5a)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'white', fontWeight: 'bold', fontSize: '14px' }}>C</span>
            </div>
            <span style={{ fontWeight: 'bold', color: 'white', fontSize: '16px' }}>Playground</span>
          </div>

          {/* Mode Toggle */}
          <div style={{ display: 'flex', background: '#1e293b', borderRadius: '8px', padding: '4px' }}>
            <button
              onClick={() => setMode('explorer')}
              style={{
                padding: '6px 14px', fontSize: '13px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: mode === 'explorer' ? '#ff6b6b' : 'transparent',
                color: mode === 'explorer' ? 'white' : '#94a3b8',
                fontWeight: mode === 'explorer' ? '500' : '400',
              }}
            >
              Class Explorer
            </button>
            <button
              onClick={() => setMode('components')}
              style={{
                padding: '6px 14px', fontSize: '13px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: mode === 'components' ? '#ff6b6b' : 'transparent',
                color: mode === 'components' ? 'white' : '#94a3b8',
                fontWeight: mode === 'components' ? '500' : '400',
              }}
            >
              Components
            </button>
            <button
              onClick={() => setMode('ai')}
              style={{
                padding: '6px 14px', fontSize: '13px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                background: mode === 'ai' ? 'linear-gradient(135deg, #8b5cf6, #6366f1)' : 'transparent',
                color: mode === 'ai' ? 'white' : '#94a3b8',
                fontWeight: mode === 'ai' ? '500' : '400',
              }}
            >
              AI Generate
            </button>
          </div>
        </div>

        <button
          onClick={copyCode}
          disabled={mode === 'ai' && !aiGeneratedCode}
          style={{
            padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
            border: 'none', cursor: (mode === 'ai' && !aiGeneratedCode) ? 'not-allowed' : 'pointer',
            background: copied ? '#22c55e' : '#1e293b', color: 'white',
            opacity: (mode === 'ai' && !aiGeneratedCode) ? 0.5 : 1,
          }}
        >
          {copied ? '✓ Copied!' : 'Copy Code'}
        </button>
      </header>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 0 }}>
        {/* Left Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', borderRight: '1px solid #1e293b', overflow: 'hidden' }}>
          {mode === 'explorer' ? (
            <>
              {/* Element Type Selector */}
              <div style={{ flexShrink: 0, padding: '12px 16px', borderBottom: '1px solid #1e293b', background: 'rgba(15,23,42,0.5)' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                  {ELEMENT_TYPES.map(el => (
                    <button
                      key={el.id}
                      onClick={() => setSelectedElement(el.id)}
                      style={{
                        padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer',
                        background: selectedElement === el.id ? '#334155' : 'transparent',
                        color: selectedElement === el.id ? 'white' : '#64748b',
                      }}
                    >
                      {el.name}
                    </button>
                  ))}
                </div>

                {/* Applied Classes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', minHeight: '32px' }}>
                  {appliedClasses.length === 0 ? (
                    <span style={{ color: '#475569', fontSize: '12px', fontStyle: 'italic' }}>Click classes below to add</span>
                  ) : (
                    appliedClasses.map(cls => (
                      <button
                        key={cls}
                        onClick={() => removeClass(cls)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          padding: '4px 8px', fontSize: '11px', borderRadius: '4px',
                          background: '#334155', color: '#ff6b6b', border: 'none', cursor: 'pointer',
                        }}
                      >
                        {cls}
                        <span style={{ color: '#64748b' }}>×</span>
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Category Tabs */}
              <div style={{ flexShrink: 0, display: 'flex', gap: '4px', padding: '8px 16px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
                {Object.entries(CLASS_CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedCategory(key as CategoryKey)}
                    style={{
                      padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                      background: selectedCategory === key ? '#ff6b6b' : 'transparent',
                      color: selectedCategory === key ? 'white' : '#94a3b8',
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>

              {/* Class Grid */}
              <div style={{ flex: 1, overflow: 'auto', padding: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                  {CLASS_CATEGORIES[selectedCategory].classes.map(cls => {
                    const isActive = appliedClasses.includes(cls.name)
                    return (
                      <button
                        key={cls.name}
                        onClick={() => toggleClass(cls.name)}
                        style={{
                          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
                          padding: '10px', borderRadius: '8px', border: 'none', cursor: 'pointer', textAlign: 'left',
                          background: isActive ? 'rgba(255,107,107,0.15)' : '#1e293b',
                          borderWidth: '2px', borderStyle: 'solid',
                          borderColor: isActive ? '#ff6b6b' : 'transparent',
                        }}
                      >
                        {'color' in cls && cls.color && (
                          <div style={{ width: '100%', height: '24px', borderRadius: '4px', marginBottom: '6px', background: cls.color, border: '1px solid #334155' }} />
                        )}
                        <code style={{ fontSize: '11px', color: isActive ? '#ff6b6b' : '#e2e8f0' }}>{cls.name}</code>
                        <span style={{ fontSize: '10px', color: '#64748b', marginTop: '2px' }}>{cls.desc}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </>
          ) : mode === 'components' ? (
            <>
              {/* Component Templates */}
              <div style={{ flexShrink: 0, display: 'flex', gap: '4px', padding: '8px 16px', borderBottom: '1px solid #1e293b', overflowX: 'auto' }}>
                {Object.entries(COMPONENT_TEMPLATES).map(([key, tpl]) => (
                  <button
                    key={key}
                    onClick={() => selectComponentTemplate(key as TemplateKey)}
                    style={{
                      padding: '6px 12px', fontSize: '12px', borderRadius: '6px', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap',
                      background: selectedTemplate === key ? '#ff6b6b' : 'transparent',
                      color: selectedTemplate === key ? 'white' : '#94a3b8',
                    }}
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>

              {/* Code Editor */}
              <div style={{ flex: 1, overflow: 'hidden' }}>
                <textarea
                  value={componentCode}
                  onChange={(e) => setComponentCode(e.target.value)}
                  spellCheck={false}
                  style={{
                    width: '100%', height: '100%', background: '#020617', color: '#e2e8f0',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '12px', lineHeight: '1.7', padding: '16px',
                    border: 'none', outline: 'none', resize: 'none',
                  }}
                />
              </div>
            </>
          ) : (
            <>
              {/* AI Mode */}
              <div style={{ flexShrink: 0, padding: '16px', borderBottom: '1px solid #1e293b', background: 'rgba(15,23,42,0.5)' }}>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Describe the component you want to create:
                  </label>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Create a pricing card with plan name, price, features..."
                      style={{
                        flex: 1, padding: '10px 14px', fontSize: '13px', borderRadius: '8px',
                        background: '#0f172a', border: '1px solid #334155', color: 'white',
                        outline: 'none',
                      }}
                    />
                    <button
                      disabled={isGenerating}
                      style={{
                        padding: '10px 20px', borderRadius: '8px', fontSize: '13px', fontWeight: '500',
                        border: 'none', cursor: isGenerating ? 'not-allowed' : 'pointer',
                        background: 'linear-gradient(135deg, #8b5cf6, #6366f1)',
                        color: 'white', opacity: isGenerating ? 0.7 : 1,
                      }}
                    >
                      {isGenerating ? 'Generating...' : 'Generate'}
                    </button>
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>
                    Or try these examples:
                  </label>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {Object.entries(AI_PROMPTS).map(([key, _data]) => (
                      <button
                        key={key}
                        onClick={() => generateAIComponent(key as AIPromptKey)}
                        disabled={isGenerating}
                        style={{
                          padding: '6px 12px', fontSize: '12px', borderRadius: '6px',
                          border: '1px solid #334155', cursor: isGenerating ? 'not-allowed' : 'pointer',
                          background: selectedAIPrompt === key ? 'rgba(139, 92, 246, 0.2)' : 'transparent',
                          color: selectedAIPrompt === key ? '#a78bfa' : '#94a3b8',
                          borderColor: selectedAIPrompt === key ? '#8b5cf6' : '#334155',
                        }}
                      >
                        {key.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Generated Code */}
              <div style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
                {isGenerating && (
                  <div style={{
                    position: 'absolute', top: '16px', right: '16px', zIndex: 10,
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '8px 12px', borderRadius: '6px',
                    background: 'rgba(139, 92, 246, 0.2)', color: '#a78bfa',
                    fontSize: '12px',
                  }}>
                    <div style={{
                      width: '12px', height: '12px', borderRadius: '50%',
                      border: '2px solid #a78bfa', borderTopColor: 'transparent',
                      animation: 'spin 1s linear infinite',
                    }} />
                    AI is generating...
                  </div>
                )}
                <textarea
                  value={aiGeneratedCode}
                  onChange={(e) => setAiGeneratedCode(e.target.value)}
                  placeholder="Generated code will appear here..."
                  spellCheck={false}
                  style={{
                    width: '100%', height: '100%', background: '#020617', color: '#e2e8f0',
                    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
                    fontSize: '12px', lineHeight: '1.7', padding: '16px',
                    border: 'none', outline: 'none', resize: 'none',
                  }}
                />
              </div>
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </>
          )}
        </div>

        {/* Right Panel - Preview */}
        <div style={{ display: 'flex', flexDirection: 'column', background: '#0f172a', overflow: 'hidden' }}>
          <div style={{ flexShrink: 0, padding: '8px 16px', borderBottom: '1px solid #1e293b', background: 'rgba(15,23,42,0.5)' }}>
            <span style={{ color: '#64748b', fontSize: '13px' }}>Live Preview</span>
          </div>
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <iframe
              title="Preview"
              srcDoc={mode === 'explorer' ? explorerPreviewContent : mode === 'components' ? componentPreviewContent : aiPreviewContent}
              style={{ width: '100%', height: '100%', border: 'none' }}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
