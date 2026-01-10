/**
 * Component Templates
 *
 * Common UI component patterns and building blocks.
 * @module templates/components
 */

/**
 * Alert Components
 */
export const componentAlerts = `
<!-- Info Alert -->
<div class="flex items-start gap-4 p-4 bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-xl">
  <span class="i-info-circle icon-lg text-blue-500 flex-shrink-0 mt-0.5"></span>
  <div>
    <h4 class="font-semibold text-blue-800 dark:text-blue-400">Information</h4>
    <p class="text-sm text-blue-700 dark:text-blue-300 mt-1">This is an informational message to help guide the user.</p>
  </div>
  <button class="ml-auto text-blue-500 hover:text-blue-700 dark:hover:text-blue-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>

<!-- Success Alert -->
<div class="flex items-start gap-4 p-4 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 rounded-xl">
  <span class="i-check-circle icon-lg text-green-500 flex-shrink-0 mt-0.5"></span>
  <div>
    <h4 class="font-semibold text-green-800 dark:text-green-400">Success!</h4>
    <p class="text-sm text-green-700 dark:text-green-300 mt-1">Your changes have been saved successfully.</p>
  </div>
  <button class="ml-auto text-green-500 hover:text-green-700 dark:hover:text-green-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>

<!-- Warning Alert -->
<div class="flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-500/10 border border-yellow-200 dark:border-yellow-500/30 rounded-xl">
  <span class="i-alert-triangle icon-lg text-yellow-500 flex-shrink-0 mt-0.5"></span>
  <div>
    <h4 class="font-semibold text-yellow-800 dark:text-yellow-400">Warning</h4>
    <p class="text-sm text-yellow-700 dark:text-yellow-300 mt-1">Please review the following issues before continuing.</p>
  </div>
  <button class="ml-auto text-yellow-500 hover:text-yellow-700 dark:hover:text-yellow-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>

<!-- Error Alert -->
<div class="flex items-start gap-4 p-4 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/30 rounded-xl">
  <span class="i-x-circle icon-lg text-red-500 flex-shrink-0 mt-0.5"></span>
  <div>
    <h4 class="font-semibold text-red-800 dark:text-red-400">Error</h4>
    <p class="text-sm text-red-700 dark:text-red-300 mt-1">Something went wrong. Please try again later.</p>
  </div>
  <button class="ml-auto text-red-500 hover:text-red-700 dark:hover:text-red-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>
`

/**
 * Button Components
 */
export const componentButtons = `
<!-- Primary Buttons -->
<div class="flex flex-wrap items-center gap-3">
  <button class="px-6 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
    Primary
  </button>
  <button class="px-6 py-2.5 text-sm font-medium text-coral-600 dark:text-coral-400 bg-coral-50 dark:bg-coral-500/10 rounded-xl hover:bg-coral-100 dark:hover:bg-coral-500/20 transition-colors">
    Secondary
  </button>
  <button class="px-6 py-2.5 text-sm font-medium text-coral-600 dark:text-coral-400 border border-coral-500 rounded-xl hover:bg-coral-50 dark:hover:bg-coral-500/10 transition-colors">
    Outline
  </button>
  <button class="px-6 py-2.5 text-sm font-medium text-coral-600 dark:text-coral-400 hover:bg-coral-50 dark:hover:bg-coral-500/10 rounded-xl transition-colors">
    Ghost
  </button>
</div>

<!-- Sizes -->
<div class="flex flex-wrap items-center gap-3 mt-4">
  <button class="px-3 py-1.5 text-xs font-medium text-white bg-coral-500 rounded-lg hover:bg-coral-600 transition-colors">
    Small
  </button>
  <button class="px-5 py-2 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
    Medium
  </button>
  <button class="px-6 py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
    Large
  </button>
</div>

<!-- With Icons -->
<div class="flex flex-wrap items-center gap-3 mt-4">
  <button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
    <span class="i-plus icon-sm"></span>
    Add Item
  </button>
  <button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-800 dark:bg-slate-700 rounded-xl hover:bg-slate-900 dark:hover:bg-slate-600 transition-colors">
    <span class="i-github icon-sm"></span>
    GitHub
  </button>
  <button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-600 transition-colors">
    Download
    <span class="i-download icon-sm"></span>
  </button>
</div>

<!-- States -->
<div class="flex flex-wrap items-center gap-3 mt-4">
  <button class="px-5 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl opacity-50 cursor-not-allowed" disabled>
    Disabled
  </button>
  <button class="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl">
    <span class="i-loading icon-sm animate-spin"></span>
    Loading...
  </button>
</div>

<!-- Icon Buttons -->
<div class="flex flex-wrap items-center gap-3 mt-4">
  <button class="p-2.5 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
    <span class="i-settings icon-lg"></span>
  </button>
  <button class="p-2.5 text-white bg-coral-500 hover:bg-coral-600 rounded-xl transition-colors">
    <span class="i-heart icon-lg"></span>
  </button>
  <button class="p-2.5 text-coral-500 bg-coral-50 dark:bg-coral-500/10 hover:bg-coral-100 dark:hover:bg-coral-500/20 rounded-full transition-colors">
    <span class="i-share icon-lg"></span>
  </button>
</div>

<!-- Button Group -->
<div class="inline-flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mt-4">
  <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-r border-slate-200 dark:border-slate-700">
    Left
  </button>
  <button class="px-4 py-2 text-sm font-medium text-white bg-coral-500">
    Middle
  </button>
  <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border-l border-slate-200 dark:border-slate-700">
    Right
  </button>
</div>
`

/**
 * Form Components
 */
export const componentForms = `
<form class="space-y-6 max-w-md">
  <!-- Text Input -->
  <div>
    <label for="name" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Full Name</label>
    <input type="text" id="name" placeholder="John Doe" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent transition-shadow" />
  </div>

  <!-- Email with Icon -->
  <div>
    <label for="email" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Email</label>
    <div class="relative">
      <span class="i-mail icon-sm absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></span>
      <input type="email" id="email" placeholder="you@example.com" class="w-full pl-11 pr-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
    </div>
  </div>

  <!-- Password with Toggle -->
  <div>
    <label for="password" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Password</label>
    <div class="relative">
      <input type="password" id="password" placeholder="••••••••" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent pr-12" />
      <button type="button" class="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
        <span class="i-eye icon-sm"></span>
      </button>
    </div>
    <p class="text-xs text-slate-500 mt-2">Must be at least 8 characters</p>
  </div>

  <!-- Select -->
  <div>
    <label for="country" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Country</label>
    <select id="country" class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent appearance-none bg-no-repeat bg-right" style="background-image: url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%2394a3b8%22 stroke-width=%222%22%3E%3Cpath d=%22M6 9l6 6 6-6%22/%3E%3C/svg%3E'); background-position: right 12px center;">
      <option>Select a country</option>
      <option>United States</option>
      <option>United Kingdom</option>
      <option>Canada</option>
      <option>Australia</option>
    </select>
  </div>

  <!-- Textarea -->
  <div>
    <label for="message" class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Message</label>
    <textarea id="message" rows="4" placeholder="Your message..." class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent resize-none"></textarea>
    <p class="text-xs text-slate-500 mt-2 text-right">0/500 characters</p>
  </div>

  <!-- Checkbox -->
  <div class="flex items-start gap-3">
    <input type="checkbox" id="terms" class="w-5 h-5 mt-0.5 text-coral-500 border-slate-300 dark:border-slate-600 rounded focus:ring-coral-500 bg-white dark:bg-slate-800" />
    <label for="terms" class="text-sm text-slate-600 dark:text-slate-400">
      I agree to the <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Terms of Service</a> and <a href="#" class="text-coral-600 dark:text-coral-400 hover:underline">Privacy Policy</a>
    </label>
  </div>

  <!-- Radio Group -->
  <div>
    <label class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Payment Method</label>
    <div class="space-y-3">
      <label class="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-coral-500 has-[:checked]:bg-coral-50 dark:has-[:checked]:bg-coral-500/10">
        <input type="radio" name="payment" value="card" class="w-4 h-4 text-coral-500 border-slate-300 focus:ring-coral-500" checked />
        <span class="i-credit-card icon-lg text-slate-500"></span>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Credit Card</span>
      </label>
      <label class="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 has-[:checked]:border-coral-500 has-[:checked]:bg-coral-50 dark:has-[:checked]:bg-coral-500/10">
        <input type="radio" name="payment" value="paypal" class="w-4 h-4 text-coral-500 border-slate-300 focus:ring-coral-500" />
        <span class="i-wallet icon-lg text-slate-500"></span>
        <span class="text-sm font-medium text-slate-700 dark:text-slate-300">PayPal</span>
      </label>
    </div>
  </div>

  <!-- Toggle Switch -->
  <div class="flex items-center justify-between">
    <div>
      <p class="text-sm font-medium text-slate-700 dark:text-slate-300">Email notifications</p>
      <p class="text-xs text-slate-500">Receive updates via email</p>
    </div>
    <button type="button" class="relative w-11 h-6 bg-slate-200 dark:bg-slate-700 rounded-full transition-colors peer-checked:bg-coral-500" role="switch">
      <span class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow transition-transform"></span>
    </button>
  </div>

  <!-- Submit -->
  <button type="submit" class="w-full py-3 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 focus:ring-4 focus:ring-coral-500/50 transition-all">
    Submit
  </button>
</form>
`

/**
 * Card Components
 */
export const componentCards = `
<!-- Basic Card -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Basic Card</h3>
  <p class="text-slate-600 dark:text-slate-400">This is a simple card with padding and border.</p>
</div>

<!-- Card with Shadow -->
<div class="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6">
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Shadow Card</h3>
  <p class="text-slate-600 dark:text-slate-400">This card uses shadow for elevation.</p>
</div>

<!-- Card with Header -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
  <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Card Header</h3>
  </div>
  <div class="p-6">
    <p class="text-slate-600 dark:text-slate-400">Card content goes here with separate header section.</p>
  </div>
</div>

<!-- Card with Image -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
  <img src="https://picsum.photos/400/200" alt="" class="w-full h-48 object-cover" />
  <div class="p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Image Card</h3>
    <p class="text-slate-600 dark:text-slate-400">A beautiful card with a cover image.</p>
  </div>
</div>

<!-- Interactive Card -->
<a href="#" class="block bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 hover:shadow-xl hover:border-coral-500 dark:hover:border-coral-500 transition-all group">
  <div class="w-12 h-12 bg-coral-100 dark:bg-coral-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
    <span class="i-zap icon-xl text-coral-500"></span>
  </div>
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">Interactive Card</h3>
  <p class="text-slate-600 dark:text-slate-400">Hover to see the interactive effects.</p>
</a>

<!-- Stats Card -->
<div class="bg-gradient-to-br from-coral-500 to-coral-600 rounded-2xl p-6 text-white">
  <div class="flex items-center justify-between mb-4">
    <span class="text-coral-100">Total Revenue</span>
    <span class="i-trending-up icon-lg text-coral-200"></span>
  </div>
  <p class="text-3xl font-bold">$45,231</p>
  <p class="text-sm text-coral-200 mt-1">+12.5% from last month</p>
</div>

<!-- User Card -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
  <div class="flex items-center gap-4">
    <img src="https://i.pravatar.cc/64" alt="" class="w-16 h-16 rounded-full" />
    <div>
      <h3 class="font-semibold text-slate-900 dark:text-white">Sarah Johnson</h3>
      <p class="text-sm text-slate-500">Senior Developer</p>
    </div>
  </div>
  <p class="text-slate-600 dark:text-slate-400 mt-4">Building amazing products and leading frontend teams.</p>
  <div class="flex gap-2 mt-4">
    <button class="flex-1 px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">Follow</button>
    <button class="flex-1 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Message</button>
  </div>
</div>
`

/**
 * Avatar Components
 */
export const componentAvatars = `
<!-- Sizes -->
<div class="flex items-end gap-4">
  <img src="https://i.pravatar.cc/24" alt="" class="w-6 h-6 rounded-full" />
  <img src="https://i.pravatar.cc/32" alt="" class="w-8 h-8 rounded-full" />
  <img src="https://i.pravatar.cc/40" alt="" class="w-10 h-10 rounded-full" />
  <img src="https://i.pravatar.cc/48" alt="" class="w-12 h-12 rounded-full" />
  <img src="https://i.pravatar.cc/64" alt="" class="w-16 h-16 rounded-full" />
</div>

<!-- With Status -->
<div class="flex items-center gap-4 mt-6">
  <div class="relative">
    <img src="https://i.pravatar.cc/48?u=1" alt="" class="w-12 h-12 rounded-full" />
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
  </div>
  <div class="relative">
    <img src="https://i.pravatar.cc/48?u=2" alt="" class="w-12 h-12 rounded-full" />
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-yellow-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
  </div>
  <div class="relative">
    <img src="https://i.pravatar.cc/48?u=3" alt="" class="w-12 h-12 rounded-full" />
    <span class="absolute bottom-0 right-0 w-3 h-3 bg-slate-400 border-2 border-white dark:border-slate-800 rounded-full"></span>
  </div>
</div>

<!-- Initials -->
<div class="flex items-center gap-4 mt-6">
  <div class="w-12 h-12 bg-coral-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">JD</div>
  <div class="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">AB</div>
  <div class="w-12 h-12 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">MK</div>
  <div class="w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-semibold">SC</div>
</div>

<!-- Avatar Stack -->
<div class="flex -space-x-3 mt-6">
  <img src="https://i.pravatar.cc/40?u=1" alt="" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
  <img src="https://i.pravatar.cc/40?u=2" alt="" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
  <img src="https://i.pravatar.cc/40?u=3" alt="" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
  <img src="https://i.pravatar.cc/40?u=4" alt="" class="w-10 h-10 rounded-full border-2 border-white dark:border-slate-800" />
  <div class="w-10 h-10 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-xs font-medium">+5</div>
</div>
`

/**
 * Badge Components
 */
export const componentBadges = `
<!-- Basic Badges -->
<div class="flex flex-wrap items-center gap-2">
  <span class="px-2.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">Default</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-coral-100 dark:bg-coral-500/20 text-coral-700 dark:text-coral-400 rounded-full">Primary</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">Success</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-full">Warning</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-red-100 dark:bg-red-500/20 text-red-700 dark:text-red-400 rounded-full">Error</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full">Info</span>
</div>

<!-- Solid Badges -->
<div class="flex flex-wrap items-center gap-2 mt-4">
  <span class="px-2.5 py-0.5 text-xs font-medium bg-slate-500 text-white rounded-full">Default</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-coral-500 text-white rounded-full">Primary</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-green-500 text-white rounded-full">Success</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-yellow-500 text-white rounded-full">Warning</span>
  <span class="px-2.5 py-0.5 text-xs font-medium bg-red-500 text-white rounded-full">Error</span>
</div>

<!-- Outline Badges -->
<div class="flex flex-wrap items-center gap-2 mt-4">
  <span class="px-2.5 py-0.5 text-xs font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-full">Default</span>
  <span class="px-2.5 py-0.5 text-xs font-medium border border-coral-500 text-coral-600 dark:text-coral-400 rounded-full">Primary</span>
  <span class="px-2.5 py-0.5 text-xs font-medium border border-green-500 text-green-600 dark:text-green-400 rounded-full">Success</span>
</div>

<!-- With Dot -->
<div class="flex flex-wrap items-center gap-2 mt-4">
  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
    <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
    Active
  </span>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-full">
    <span class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
    Pending
  </span>
  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full">
    <span class="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
    Inactive
  </span>
</div>

<!-- With Icon -->
<div class="flex flex-wrap items-center gap-2 mt-4">
  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-coral-100 dark:bg-coral-500/20 text-coral-700 dark:text-coral-400 rounded-full">
    <span class="i-star icon-xs"></span>
    Featured
  </span>
  <span class="inline-flex items-center gap-1 px-2.5 py-0.5 text-xs font-medium bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-400 rounded-full">
    <span class="i-check icon-xs"></span>
    Verified
  </span>
</div>

<!-- Notification Badges -->
<div class="flex items-center gap-6 mt-4">
  <button class="relative p-2">
    <span class="i-bell icon-xl text-slate-600 dark:text-slate-400"></span>
    <span class="absolute -top-1 -right-1 w-5 h-5 bg-coral-500 text-white text-xs font-bold rounded-full flex items-center justify-center">3</span>
  </button>
  <button class="relative p-2">
    <span class="i-mail icon-xl text-slate-600 dark:text-slate-400"></span>
    <span class="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">9+</span>
  </button>
</div>
`

/**
 * Modal Component
 */
export const componentModal = `
<!-- Modal Backdrop -->
<div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
  <!-- Modal Content -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 fade-in duration-200">
    <!-- Header -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
      <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Modal Title</h3>
      <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
        <span class="i-x icon-lg"></span>
      </button>
    </div>

    <!-- Body -->
    <div class="px-6 py-4">
      <p class="text-slate-600 dark:text-slate-400">
        This is a modal dialog. You can put any content here including forms, confirmations, or information.
      </p>
    </div>

    <!-- Footer -->
    <div class="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-700/50">
      <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
        Cancel
      </button>
      <button class="px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
        Confirm
      </button>
    </div>
  </div>
</div>
`

/**
 * Toast/Notification Components
 */
export const componentToasts = `
<!-- Success Toast -->
<div class="flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 max-w-sm">
  <div class="w-10 h-10 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0">
    <span class="i-check icon-lg text-green-500"></span>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-slate-900 dark:text-white">Changes saved</p>
    <p class="text-xs text-slate-500">Your profile has been updated.</p>
  </div>
  <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>

<!-- Error Toast -->
<div class="flex items-center gap-4 px-4 py-3 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-red-200 dark:border-red-500/30 max-w-sm mt-4">
  <div class="w-10 h-10 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center flex-shrink-0">
    <span class="i-x icon-lg text-red-500"></span>
  </div>
  <div class="flex-1">
    <p class="text-sm font-medium text-slate-900 dark:text-white">Error occurred</p>
    <p class="text-xs text-slate-500">Please try again later.</p>
  </div>
  <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
    <span class="i-x icon-sm"></span>
  </button>
</div>

<!-- Toast with Action -->
<div class="flex items-center gap-4 px-4 py-3 bg-slate-900 dark:bg-slate-700 rounded-xl shadow-lg max-w-sm mt-4">
  <p class="text-sm text-white flex-1">Item moved to trash.</p>
  <button class="text-sm font-medium text-coral-400 hover:text-coral-300">Undo</button>
  <button class="text-slate-400 hover:text-white">
    <span class="i-x icon-sm"></span>
  </button>
</div>
`

/**
 * Table Component
 */
export const componentTable = `
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-700/50">
          <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <input type="checkbox" class="w-4 h-4 text-coral-500 border-slate-300 rounded" />
          </th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">User</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Role</th>
          <th class="px-6 py-4 text-left text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Email</th>
          <th class="px-6 py-4 text-right text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <td class="px-6 py-4">
            <input type="checkbox" class="w-4 h-4 text-coral-500 border-slate-300 rounded" />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/40?u=1" alt="" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">John Doe</p>
                <p class="text-sm text-slate-500">@johndoe</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium bg-green-100 dark:bg-green-500/20 text-green-700 dark:text-green-400 rounded-full">
              <span class="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
              Active
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Admin</td>
          <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">john@example.com</td>
          <td class="px-6 py-4 text-right">
            <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <span class="i-more-horizontal icon-sm"></span>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
          <td class="px-6 py-4">
            <input type="checkbox" class="w-4 h-4 text-coral-500 border-slate-300 rounded" />
          </td>
          <td class="px-6 py-4">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/40?u=2" alt="" class="w-10 h-10 rounded-full" />
              <div>
                <p class="font-medium text-slate-900 dark:text-white">Jane Smith</p>
                <p class="text-sm text-slate-500">@janesmith</p>
              </div>
            </div>
          </td>
          <td class="px-6 py-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-medium bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400 rounded-full">
              <span class="w-1.5 h-1.5 bg-yellow-500 rounded-full"></span>
              Pending
            </span>
          </td>
          <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">Editor</td>
          <td class="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">jane@example.com</td>
          <td class="px-6 py-4 text-right">
            <button class="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
              <span class="i-more-horizontal icon-sm"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <!-- Pagination -->
  <div class="px-6 py-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
    <p class="text-sm text-slate-600 dark:text-slate-400">Showing 1-10 of 100 results</p>
    <div class="flex items-center gap-2">
      <button class="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50" disabled>
        <span class="i-chevron-left icon-sm"></span>
      </button>
      <button class="w-8 h-8 text-sm font-medium text-white bg-coral-500 rounded-lg">1</button>
      <button class="w-8 h-8 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">2</button>
      <button class="w-8 h-8 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">3</button>
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-800">
        <span class="i-chevron-right icon-sm"></span>
      </button>
    </div>
  </div>
</div>
`

/**
 * Tabs Component
 */
export const componentTabs = `
<!-- Basic Tabs -->
<div>
  <div class="flex border-b border-slate-200 dark:border-slate-700">
    <button class="px-6 py-3 text-sm font-medium text-coral-600 dark:text-coral-400 border-b-2 border-coral-500 -mb-px">
      Overview
    </button>
    <button class="px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      Analytics
    </button>
    <button class="px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      Settings
    </button>
    <button class="px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      Integrations
    </button>
  </div>
  <div class="p-6">
    <p class="text-slate-600 dark:text-slate-400">Tab content goes here.</p>
  </div>
</div>

<!-- Pill Tabs -->
<div class="mt-8">
  <div class="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
    <button class="px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-lg shadow">
      Overview
    </button>
    <button class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      Analytics
    </button>
    <button class="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      Settings
    </button>
  </div>
</div>

<!-- Tabs with Icons -->
<div class="mt-8">
  <div class="flex border-b border-slate-200 dark:border-slate-700">
    <button class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-coral-600 dark:text-coral-400 border-b-2 border-coral-500 -mb-px">
      <span class="i-home icon-sm"></span>
      Home
    </button>
    <button class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      <span class="i-user icon-sm"></span>
      Profile
    </button>
    <button class="flex items-center gap-2 px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
      <span class="i-settings icon-sm"></span>
      Settings
    </button>
  </div>
</div>
`

/**
 * Breadcrumb Component
 */
export const componentBreadcrumb = `
<nav class="flex items-center gap-2 text-sm">
  <a href="#" class="text-slate-500 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
    <span class="i-home icon-sm"></span>
  </a>
  <span class="i-chevron-right icon-xs text-slate-400"></span>
  <a href="#" class="text-slate-500 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
    Products
  </a>
  <span class="i-chevron-right icon-xs text-slate-400"></span>
  <a href="#" class="text-slate-500 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400 transition-colors">
    Electronics
  </a>
  <span class="i-chevron-right icon-xs text-slate-400"></span>
  <span class="text-slate-900 dark:text-white font-medium">Headphones</span>
</nav>
`

/**
 * Progress Components
 */
export const componentProgress = `
<!-- Basic Progress -->
<div class="space-y-4">
  <div>
    <div class="flex justify-between text-sm mb-2">
      <span class="text-slate-600 dark:text-slate-400">Progress</span>
      <span class="font-medium text-slate-900 dark:text-white">65%</span>
    </div>
    <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div class="h-full bg-coral-500 rounded-full" style="width: 65%"></div>
    </div>
  </div>

  <!-- Gradient Progress -->
  <div>
    <div class="flex justify-between text-sm mb-2">
      <span class="text-slate-600 dark:text-slate-400">Upload</span>
      <span class="font-medium text-slate-900 dark:text-white">80%</span>
    </div>
    <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div class="h-full bg-gradient-to-r from-coral-500 to-pink-500 rounded-full" style="width: 80%"></div>
    </div>
  </div>

  <!-- Striped Progress -->
  <div>
    <div class="flex justify-between text-sm mb-2">
      <span class="text-slate-600 dark:text-slate-400">Processing</span>
      <span class="font-medium text-slate-900 dark:text-white">45%</span>
    </div>
    <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
      <div class="h-full bg-coral-500 rounded-full bg-stripes animate-progress-stripes" style="width: 45%"></div>
    </div>
  </div>
</div>

<!-- Circular Progress -->
<div class="flex items-center gap-8 mt-6">
  <div class="relative w-20 h-20">
    <svg class="w-full h-full -rotate-90">
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="8" class="text-slate-200 dark:text-slate-700" />
      <circle cx="40" cy="40" r="36" fill="none" stroke="currentColor" stroke-width="8" stroke-linecap="round" stroke-dasharray="226" stroke-dashoffset="56" class="text-coral-500" />
    </svg>
    <div class="absolute inset-0 flex items-center justify-center">
      <span class="text-lg font-bold text-slate-900 dark:text-white">75%</span>
    </div>
  </div>
</div>
`

/**
 * Skeleton Loaders
 */
export const componentSkeletons = `
<!-- Card Skeleton -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 animate-pulse">
  <div class="h-40 bg-slate-200 dark:bg-slate-700 rounded-xl mb-4"></div>
  <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
  <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-4"></div>
  <div class="flex items-center gap-3">
    <div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
    <div class="flex-1">
      <div class="h-3 bg-slate-200 dark:bg-slate-700 rounded w-24 mb-2"></div>
      <div class="h-2 bg-slate-200 dark:bg-slate-700 rounded w-16"></div>
    </div>
  </div>
</div>

<!-- Text Skeleton -->
<div class="space-y-3 animate-pulse mt-6">
  <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full"></div>
  <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
  <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-4/6"></div>
</div>

<!-- Table Skeleton -->
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden mt-6 animate-pulse">
  <div class="px-6 py-4 bg-slate-50 dark:bg-slate-700/50">
    <div class="flex gap-6">
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-20"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-32"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-600 rounded w-24"></div>
    </div>
  </div>
  <div class="divide-y divide-slate-200 dark:divide-slate-700">
    <div class="px-6 py-4 flex items-center gap-6">
      <div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-32"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-20"></div>
    </div>
    <div class="px-6 py-4 flex items-center gap-6">
      <div class="w-10 h-10 bg-slate-200 dark:bg-slate-700 rounded-full"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-28"></div>
      <div class="h-4 bg-slate-200 dark:bg-slate-700 rounded w-24"></div>
    </div>
  </div>
</div>
`

/**
 * Empty States
 */
export const componentEmptyStates = `
<!-- No Results -->
<div class="text-center py-12">
  <div class="w-20 h-20 mx-auto mb-6 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center">
    <span class="i-search icon-[40px] text-slate-400"></span>
  </div>
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">No results found</h3>
  <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
    We couldn't find anything matching your search. Try different keywords.
  </p>
  <button class="px-6 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
    Clear Search
  </button>
</div>

<!-- Empty Inbox -->
<div class="text-center py-12 mt-8">
  <div class="w-20 h-20 mx-auto mb-6 bg-coral-100 dark:bg-coral-500/20 rounded-full flex items-center justify-center">
    <span class="i-inbox icon-[40px] text-coral-500"></span>
  </div>
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Your inbox is empty</h3>
  <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
    You're all caught up! New messages will appear here.
  </p>
</div>

<!-- Error State -->
<div class="text-center py-12 mt-8">
  <div class="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-500/20 rounded-full flex items-center justify-center">
    <span class="i-alert-triangle icon-[40px] text-red-500"></span>
  </div>
  <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-2">Something went wrong</h3>
  <p class="text-slate-600 dark:text-slate-400 mb-6 max-w-sm mx-auto">
    We encountered an error loading this content. Please try again.
  </p>
  <button class="px-6 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
    Try Again
  </button>
</div>
`

/**
 * Navigation Component
 */
export const componentNavigation = `
<nav class="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex items-center justify-between h-16">
      <!-- Logo -->
      <a href="/" class="flex items-center gap-2 text-xl font-bold text-coral-500">
        <span class="w-8 h-8 bg-gradient-to-br from-coral-400 to-coral-600 rounded-lg flex items-center justify-center text-white text-sm">C</span>
        CoralCSS
      </a>

      <!-- Nav Links -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#" class="text-sm font-medium text-coral-600 dark:text-coral-400">Home</a>
        <a href="#" class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Products</a>
        <a href="#" class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Features</a>
        <a href="#" class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">Pricing</a>
        <a href="#" class="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">About</a>
      </div>

      <!-- Actions -->
      <div class="flex items-center gap-4">
        <button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg md:hidden">
          <span class="i-menu icon-lg"></span>
        </button>
        <button class="hidden md:block px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-xl transition-colors">
          Sign in
        </button>
        <button class="hidden md:block px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
          Get Started
        </button>
      </div>
    </div>
  </div>
</nav>
`

/**
 * Dropdown Menu
 */
export const componentDropdown = `
<div class="relative inline-block">
  <!-- Trigger -->
  <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
    Options
    <span class="i-chevron-down icon-sm"></span>
  </button>

  <!-- Dropdown -->
  <div class="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl py-1 z-50">
    <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
      <span class="i-user icon-sm text-slate-400"></span>
      Profile
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
      <span class="i-settings icon-sm text-slate-400"></span>
      Settings
    </a>
    <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
      <span class="i-bell icon-sm text-slate-400"></span>
      Notifications
    </a>
    <hr class="my-1 border-slate-200 dark:border-slate-700" />
    <a href="#" class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10">
      <span class="i-logout icon-sm"></span>
      Sign out
    </a>
  </div>
</div>
`

/**
 * Tooltip Component
 */
export const componentTooltip = `
<div class="flex items-center gap-8">
  <!-- Top Tooltip -->
  <div class="relative group">
    <button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
      <span class="i-info-circle icon-lg"></span>
    </button>
    <div class="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
      Information tooltip
      <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900 dark:border-t-slate-700"></div>
    </div>
  </div>

  <!-- Right Tooltip -->
  <div class="relative group">
    <button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
      <span class="i-help-circle icon-lg"></span>
    </button>
    <div class="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 dark:bg-slate-700 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap">
      Help text
      <div class="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-slate-900 dark:border-r-slate-700"></div>
    </div>
  </div>
</div>
`
