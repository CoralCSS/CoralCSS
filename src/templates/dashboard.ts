/**
 * Dashboard Templates
 *
 * Complete dashboard layouts and components.
 * @module templates/dashboard
 */

/**
 * Dashboard Layout - Full page structure with sidebar and header
 */
export const dashboardLayout = `
<div class="min-h-screen bg-slate-50 dark:bg-slate-900">
  <!-- Sidebar -->
  <aside class="fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 transform transition-transform duration-300 lg:translate-x-0" id="sidebar">
    <!-- Logo -->
    <div class="flex items-center h-16 px-6 border-b border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 bg-coral-500 rounded-lg flex items-center justify-center">
          <span class="text-white font-bold text-sm">C</span>
        </div>
        <span class="font-semibold text-slate-900 dark:text-white">CoralCSS</span>
      </div>
    </div>

    <!-- Navigation -->
    <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-coral-50 text-coral-600 dark:bg-coral-500/10 dark:text-coral-400">
        <span class="i-home icon-sm"></span>
        Dashboard
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
        <span class="i-users icon-sm"></span>
        Users
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
        <span class="i-folder icon-sm"></span>
        Projects
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
        <span class="i-calendar icon-sm"></span>
        Calendar
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
        <span class="i-document icon-sm"></span>
        Documents
      </a>
      <a href="#" class="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700">
        <span class="i-settings icon-sm"></span>
        Settings
      </a>
    </nav>

    <!-- User Menu -->
    <div class="p-4 border-t border-slate-200 dark:border-slate-700">
      <div class="flex items-center gap-3">
        <img src="https://i.pravatar.cc/40" alt="User" class="w-10 h-10 rounded-full" />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-slate-900 dark:text-white truncate">John Doe</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 truncate">john@example.com</p>
        </div>
        <button class="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
          <span class="i-dots-vertical icon-sm"></span>
        </button>
      </div>
    </div>
  </aside>

  <!-- Main Content -->
  <div class="lg:pl-64">
    <!-- Header -->
    <header class="sticky top-0 z-40 flex items-center h-16 px-4 sm:px-6 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
      <!-- Mobile menu button -->
      <button class="lg:hidden p-2 -ml-2 text-slate-600 dark:text-slate-400" id="menu-toggle">
        <span class="i-menu icon-md"></span>
      </button>

      <!-- Search -->
      <div class="flex-1 flex items-center max-w-md ml-4 lg:ml-0">
        <div class="relative w-full">
          <span class="i-search icon-sm absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
          <input type="search" placeholder="Search..." class="w-full pl-10 pr-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 border-0 rounded-lg focus:ring-2 focus:ring-coral-500" />
        </div>
      </div>

      <!-- Header Actions -->
      <div class="flex items-center gap-2 ml-4">
        <button class="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white relative">
          <span class="i-bell icon-md"></span>
          <span class="absolute top-1.5 right-1.5 w-2 h-2 bg-coral-500 rounded-full"></span>
        </button>
        <button class="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white">
          <span class="i-settings icon-md"></span>
        </button>
      </div>
    </header>

    <!-- Page Content -->
    <main class="p-4 sm:p-6 lg:p-8">
      <!-- Page Header -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 class="text-2xl font-bold text-slate-900 dark:text-white">Dashboard</h1>
          <p class="mt-1 text-sm text-slate-600 dark:text-slate-400">Welcome back, John! Here's what's happening.</p>
        </div>
        <button class="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-coral-500 rounded-lg hover:bg-coral-600 transition-colors">
          <span class="i-plus icon-sm"></span>
          Add New
        </button>
      </div>

      <!-- Content goes here -->
      <div id="dashboard-content">
        <!-- Insert stat cards, charts, tables, etc. -->
      </div>
    </main>
  </div>
</div>
`

/**
 * Dashboard Stat Cards - KPI display components
 */
export const dashboardStatCards = `
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
  <!-- Total Revenue -->
  <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Total Revenue</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">$45,231</p>
      </div>
      <div class="w-12 h-12 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center">
        <span class="text-green-600 dark:text-green-400 text-xl">$</span>
      </div>
    </div>
    <div class="flex items-center gap-1 mt-4 text-sm">
      <span class="text-green-600 dark:text-green-400 font-medium">+12.5%</span>
      <span class="text-slate-500 dark:text-slate-400">from last month</span>
    </div>
  </div>

  <!-- Active Users -->
  <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Active Users</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">2,420</p>
      </div>
      <div class="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center">
        <span class="i-users icon-lg text-blue-600 dark:text-blue-400"></span>
      </div>
    </div>
    <div class="flex items-center gap-1 mt-4 text-sm">
      <span class="text-green-600 dark:text-green-400 font-medium">+8.2%</span>
      <span class="text-slate-500 dark:text-slate-400">from last month</span>
    </div>
  </div>

  <!-- New Orders -->
  <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">New Orders</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">1,210</p>
      </div>
      <div class="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-full flex items-center justify-center">
        <span class="i-folder icon-lg text-purple-600 dark:text-purple-400"></span>
      </div>
    </div>
    <div class="flex items-center gap-1 mt-4 text-sm">
      <span class="text-red-600 dark:text-red-400 font-medium">-2.4%</span>
      <span class="text-slate-500 dark:text-slate-400">from last month</span>
    </div>
  </div>

  <!-- Conversion Rate -->
  <div class="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
    <div class="flex items-center justify-between">
      <div>
        <p class="text-sm font-medium text-slate-600 dark:text-slate-400">Conversion Rate</p>
        <p class="text-2xl font-bold text-slate-900 dark:text-white mt-1">3.24%</p>
      </div>
      <div class="w-12 h-12 bg-coral-100 dark:bg-coral-500/10 rounded-full flex items-center justify-center">
        <span class="i-star icon-lg text-coral-600 dark:text-coral-400"></span>
      </div>
    </div>
    <div class="flex items-center gap-1 mt-4 text-sm">
      <span class="text-green-600 dark:text-green-400 font-medium">+4.1%</span>
      <span class="text-slate-500 dark:text-slate-400">from last month</span>
    </div>
  </div>
</div>
`

/**
 * Dashboard Data Table
 */
export const dashboardTable = `
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
  <!-- Table Header -->
  <div class="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Recent Orders</h3>
    <a href="#" class="text-sm text-coral-600 hover:text-coral-700 dark:text-coral-400 dark:hover:text-coral-300 font-medium">View All</a>
  </div>

  <!-- Table -->
  <div class="overflow-x-auto">
    <table class="w-full">
      <thead>
        <tr class="bg-slate-50 dark:bg-slate-700/50">
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Order ID</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Customer</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Product</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Amount</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Status</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-700">
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#ORD-7352</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/32?u=1" alt="" class="w-8 h-8 rounded-full" />
              <span class="text-sm text-slate-700 dark:text-slate-300">Sarah Johnson</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Pro Plan</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">$99.00</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">Completed</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span class="i-dots-horizontal icon-sm"></span>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#ORD-7351</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/32?u=2" alt="" class="w-8 h-8 rounded-full" />
              <span class="text-sm text-slate-700 dark:text-slate-300">Mike Chen</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Basic Plan</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">$29.00</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-500/10 dark:text-yellow-400">Pending</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span class="i-dots-horizontal icon-sm"></span>
            </button>
          </td>
        </tr>
        <tr class="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">#ORD-7350</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <div class="flex items-center gap-3">
              <img src="https://i.pravatar.cc/32?u=3" alt="" class="w-8 h-8 rounded-full" />
              <span class="text-sm text-slate-700 dark:text-slate-300">Emily Davis</span>
            </div>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">Enterprise</td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">$299.00</td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-500/10 dark:text-green-400">Completed</span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <button class="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <span class="i-dots-horizontal icon-sm"></span>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

  <!-- Pagination -->
  <div class="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-700">
    <p class="text-sm text-slate-600 dark:text-slate-400">Showing 1 to 3 of 50 results</p>
    <div class="flex gap-1">
      <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded">Previous</button>
      <button class="px-3 py-1.5 text-sm text-white bg-coral-500 rounded">1</button>
      <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded">2</button>
      <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded">3</button>
      <button class="px-3 py-1.5 text-sm text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700 rounded">Next</button>
    </div>
  </div>
</div>
`

/**
 * Dashboard Activity Feed
 */
export const dashboardActivity = `
<div class="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
  <div class="px-6 py-4 border-b border-slate-200 dark:border-slate-700">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white">Recent Activity</h3>
  </div>
  <div class="p-6">
    <div class="flow-root">
      <ul class="-mb-8">
        <li class="relative pb-8">
          <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"></span>
          <div class="relative flex items-start gap-4">
            <div class="relative">
              <img src="https://i.pravatar.cc/40?u=4" alt="" class="w-10 h-10 rounded-full bg-slate-200" />
              <span class="absolute -bottom-0.5 -right-0.5 bg-green-500 rounded-full p-1">
                <span class="i-check icon-xs text-white"></span>
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm text-slate-900 dark:text-white"><span class="font-medium">Sarah</span> completed a task</p>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">Design system documentation</p>
              <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">2 hours ago</p>
            </div>
          </div>
        </li>
        <li class="relative pb-8">
          <span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-slate-200 dark:bg-slate-700"></span>
          <div class="relative flex items-start gap-4">
            <div class="relative">
              <img src="https://i.pravatar.cc/40?u=5" alt="" class="w-10 h-10 rounded-full bg-slate-200" />
              <span class="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-1">
                <span class="i-chat icon-xs text-white"></span>
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm text-slate-900 dark:text-white"><span class="font-medium">Mike</span> commented</p>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">"Looking great! Let's ship it."</p>
              <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">4 hours ago</p>
            </div>
          </div>
        </li>
        <li class="relative">
          <div class="relative flex items-start gap-4">
            <div class="relative">
              <img src="https://i.pravatar.cc/40?u=6" alt="" class="w-10 h-10 rounded-full bg-slate-200" />
              <span class="absolute -bottom-0.5 -right-0.5 bg-purple-500 rounded-full p-1">
                <span class="i-upload icon-xs text-white"></span>
              </span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-sm text-slate-900 dark:text-white"><span class="font-medium">Emily</span> uploaded files</p>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">3 new design assets</p>
              <p class="mt-1 text-xs text-slate-400 dark:text-slate-500">Yesterday</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
`
