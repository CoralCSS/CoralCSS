/**
 * E-commerce Templates
 *
 * Product cards, cart, checkout components.
 * @module templates/ecommerce
 */

/**
 * Product Card
 */
export const ecommerceProductCard = `
<div class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
  <!-- Image -->
  <div class="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-700">
    <img src="https://picsum.photos/400/400" alt="Product" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

    <!-- Quick Actions -->
    <div class="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
      <button class="p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-coral-500 hover:text-white transition-colors">
        <span class="i-heart icon-sm"></span>
      </button>
      <button class="p-2 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:bg-coral-500 hover:text-white transition-colors">
        <span class="i-eye icon-sm"></span>
      </button>
    </div>

    <!-- Badge -->
    <span class="absolute top-4 left-4 px-3 py-1 text-xs font-semibold bg-coral-500 text-white rounded-full">New</span>
  </div>

  <!-- Content -->
  <div class="p-5">
    <p class="text-xs text-coral-600 dark:text-coral-400 font-medium uppercase tracking-wider mb-1">Electronics</p>
    <h3 class="font-semibold text-slate-900 dark:text-white mb-2 line-clamp-1">Wireless Bluetooth Headphones</h3>

    <!-- Rating -->
    <div class="flex items-center gap-1 mb-3">
      <span class="i-star icon-xs text-yellow-500"></span>
      <span class="i-star icon-xs text-yellow-500"></span>
      <span class="i-star icon-xs text-yellow-500"></span>
      <span class="i-star icon-xs text-yellow-500"></span>
      <span class="i-star icon-xs text-slate-300 dark:text-slate-600"></span>
      <span class="text-xs text-slate-500 dark:text-slate-400 ml-1">(128)</span>
    </div>

    <!-- Price & Action -->
    <div class="flex items-center justify-between">
      <div>
        <span class="text-lg font-bold text-slate-900 dark:text-white">$99.00</span>
        <span class="text-sm text-slate-500 line-through ml-2">$149.00</span>
      </div>
      <button class="p-2.5 bg-coral-500 text-white rounded-xl hover:bg-coral-600 transition-colors">
        <span class="i-plus icon-sm"></span>
      </button>
    </div>
  </div>
</div>
`

/**
 * Product Grid
 */
export const ecommerceProductGrid = `
<section class="py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-900 dark:text-white">Featured Products</h2>
        <p class="mt-1 text-slate-600 dark:text-slate-400">Discover our best-selling items</p>
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-3">
        <select class="px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-coral-500">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Clothing</option>
          <option>Home</option>
        </select>
        <select class="px-4 py-2 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-coral-500">
          <option>Sort by: Featured</option>
          <option>Price: Low to High</option>
          <option>Price: High to Low</option>
          <option>Newest</option>
        </select>
      </div>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Products inserted here -->
    </div>
  </div>
</section>
`

/**
 * Shopping Cart
 */
export const ecommerceCart = `
<div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden">
  <!-- Header -->
  <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Shopping Cart (3)</h3>
  </div>

  <!-- Cart Items -->
  <div class="divide-y divide-slate-200 dark:divide-slate-700">
    <!-- Item 1 -->
    <div class="p-6 flex gap-4">
      <img src="https://picsum.photos/100/100" alt="" class="w-20 h-20 rounded-xl object-cover bg-slate-100" />
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-slate-900 dark:text-white truncate">Wireless Bluetooth Headphones</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Color: Black</p>
        <div class="flex items-center gap-3 mt-3">
          <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
            <button class="px-3 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
            <span class="px-3 py-1 text-sm font-medium">2</span>
            <button class="px-3 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
          </div>
          <button class="text-red-500 hover:text-red-600 text-sm">Remove</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-semibold text-slate-900 dark:text-white">$198.00</p>
        <p class="text-sm text-slate-500 line-through">$298.00</p>
      </div>
    </div>

    <!-- Item 2 -->
    <div class="p-6 flex gap-4">
      <img src="https://picsum.photos/100/101" alt="" class="w-20 h-20 rounded-xl object-cover bg-slate-100" />
      <div class="flex-1 min-w-0">
        <h4 class="font-medium text-slate-900 dark:text-white truncate">Smart Watch Series 5</h4>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">Size: 44mm</p>
        <div class="flex items-center gap-3 mt-3">
          <div class="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
            <button class="px-3 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">-</button>
            <span class="px-3 py-1 text-sm font-medium">1</span>
            <button class="px-3 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700">+</button>
          </div>
          <button class="text-red-500 hover:text-red-600 text-sm">Remove</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-semibold text-slate-900 dark:text-white">$399.00</p>
      </div>
    </div>
  </div>

  <!-- Summary -->
  <div class="p-6 bg-slate-50 dark:bg-slate-700/50">
    <div class="space-y-3">
      <div class="flex justify-between text-sm">
        <span class="text-slate-600 dark:text-slate-400">Subtotal</span>
        <span class="font-medium text-slate-900 dark:text-white">$597.00</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-slate-600 dark:text-slate-400">Shipping</span>
        <span class="font-medium text-green-600">Free</span>
      </div>
      <div class="flex justify-between text-sm">
        <span class="text-slate-600 dark:text-slate-400">Discount</span>
        <span class="font-medium text-coral-600">-$100.00</span>
      </div>
      <div class="pt-3 border-t border-slate-200 dark:border-slate-600 flex justify-between">
        <span class="font-semibold text-slate-900 dark:text-white">Total</span>
        <span class="font-bold text-xl text-slate-900 dark:text-white">$497.00</span>
      </div>
    </div>

    <!-- Promo Code -->
    <div class="mt-6 flex gap-2">
      <input type="text" placeholder="Promo code" class="flex-1 px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500" />
      <button class="px-4 py-2.5 text-sm font-medium text-coral-600 bg-coral-50 dark:bg-coral-500/10 rounded-xl hover:bg-coral-100 dark:hover:bg-coral-500/20 transition-colors">Apply</button>
    </div>

    <!-- Checkout Button -->
    <button class="mt-6 w-full py-3.5 px-4 text-base font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors flex items-center justify-center gap-2">
      Proceed to Checkout
      <span class="i-arrow-right icon-sm"></span>
    </button>
  </div>
</div>
`
