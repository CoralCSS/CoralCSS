/**
 * Blog Templates
 *
 * Blog post cards, article pages, and archive layouts.
 * @module templates/blog
 */

/**
 * Blog Post Card
 */
export const blogPostCard = `
<article class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300">
  <!-- Featured Image -->
  <a href="#" class="block relative aspect-video overflow-hidden">
    <img src="https://picsum.photos/600/400" alt="Blog post" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
  </a>

  <!-- Content -->
  <div class="p-6">
    <!-- Category & Date -->
    <div class="flex items-center gap-3 mb-3">
      <a href="#" class="text-xs font-semibold text-coral-600 dark:text-coral-400 uppercase tracking-wider hover:text-coral-700">Technology</a>
      <span class="text-slate-300 dark:text-slate-600">•</span>
      <time class="text-xs text-slate-500 dark:text-slate-400">Jan 15, 2026</time>
    </div>

    <!-- Title -->
    <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">
      <a href="#">Building Modern Web Applications with the Latest CSS Features</a>
    </h3>

    <!-- Excerpt -->
    <p class="text-slate-600 dark:text-slate-400 line-clamp-3 mb-4">
      Explore the cutting-edge CSS features that are revolutionizing how we build web applications. From container queries to cascade layers, discover what's possible in modern CSS.
    </p>

    <!-- Author -->
    <div class="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
      <img src="https://i.pravatar.cc/40" alt="Author" class="w-10 h-10 rounded-full" />
      <div>
        <p class="text-sm font-medium text-slate-900 dark:text-white">Sarah Johnson</p>
        <p class="text-xs text-slate-500 dark:text-slate-400">5 min read</p>
      </div>
    </div>
  </div>
</article>
`

/**
 * Blog Post Card Horizontal
 */
export const blogPostCardHorizontal = `
<article class="group flex flex-col sm:flex-row gap-6 bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 p-4 hover:shadow-lg transition-shadow">
  <!-- Image -->
  <a href="#" class="block flex-shrink-0 w-full sm:w-48 h-48 sm:h-36 rounded-xl overflow-hidden">
    <img src="https://picsum.photos/300/200" alt="Blog post" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
  </a>

  <!-- Content -->
  <div class="flex-1 min-w-0">
    <div class="flex items-center gap-3 mb-2">
      <span class="text-xs font-semibold text-coral-600 dark:text-coral-400 uppercase">Design</span>
      <span class="text-slate-300 dark:text-slate-600">•</span>
      <time class="text-xs text-slate-500 dark:text-slate-400">Jan 12, 2026</time>
    </div>

    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 line-clamp-2 group-hover:text-coral-600 transition-colors">
      <a href="#">The Ultimate Guide to UI/UX Design Principles</a>
    </h3>

    <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mb-3">
      Learn the fundamental principles that make great user interfaces and experiences.
    </p>

    <div class="flex items-center gap-2">
      <img src="https://i.pravatar.cc/32" alt="" class="w-6 h-6 rounded-full" />
      <span class="text-xs text-slate-500 dark:text-slate-400">Mike Chen • 8 min read</span>
    </div>
  </div>
</article>
`

/**
 * Blog Post Full
 */
export const blogPostFull = `
<article class="max-w-4xl mx-auto">
  <!-- Header -->
  <header class="mb-8">
    <!-- Category -->
    <a href="#" class="inline-block text-sm font-semibold text-coral-600 dark:text-coral-400 uppercase tracking-wider mb-4 hover:text-coral-700">Technology</a>

    <!-- Title -->
    <h1 class="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white leading-tight mb-6">
      Building Modern Web Applications with the Latest CSS Features
    </h1>

    <!-- Meta -->
    <div class="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
      <div class="flex items-center gap-3">
        <img src="https://i.pravatar.cc/48" alt="Author" class="w-12 h-12 rounded-full" />
        <div>
          <p class="font-medium text-slate-900 dark:text-white">Sarah Johnson</p>
          <p>Senior Developer</p>
        </div>
      </div>
      <span class="hidden sm:block text-slate-300 dark:text-slate-600">•</span>
      <time>January 15, 2026</time>
      <span class="text-slate-300 dark:text-slate-600">•</span>
      <span>5 min read</span>
    </div>
  </header>

  <!-- Featured Image -->
  <figure class="mb-10">
    <img src="https://picsum.photos/1200/600" alt="Featured" class="w-full rounded-2xl" />
    <figcaption class="mt-3 text-center text-sm text-slate-500 dark:text-slate-400">
      Photo by John Doe on Unsplash
    </figcaption>
  </figure>

  <!-- Content - Prose Styling -->
  <div class="prose prose-lg dark:prose-invert max-w-none">
    <p class="lead text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
      The web platform has evolved dramatically over the past few years, bringing us powerful new CSS features that change how we approach web development.
    </p>

    <h2>Container Queries: A Game Changer</h2>
    <p>
      Container queries allow us to style elements based on their container's size rather than the viewport. This opens up entirely new possibilities for component-based design systems.
    </p>

    <pre><code class="language-css">@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}</code></pre>

    <h2>Cascade Layers for Better Organization</h2>
    <p>
      Cascade layers give us explicit control over specificity, making it easier to manage styles in large applications and design systems.
    </p>

    <blockquote>
      <p>"Cascade layers are the most significant addition to CSS specificity management since the introduction of CSS itself."</p>
    </blockquote>

    <h3>How Layers Work</h3>
    <p>
      Layers are defined using the <code>@layer</code> at-rule. Styles in later-defined layers take precedence over earlier layers, regardless of specificity.
    </p>

    <ul>
      <li>Base styles for resets and defaults</li>
      <li>Component styles for UI elements</li>
      <li>Utility styles for quick overrides</li>
    </ul>

    <h2>Conclusion</h2>
    <p>
      Modern CSS is more powerful than ever. By embracing these new features, we can write cleaner, more maintainable styles while delivering better user experiences.
    </p>
  </div>

  <!-- Tags -->
  <div class="mt-10 pt-6 border-t border-slate-200 dark:border-slate-700">
    <div class="flex flex-wrap gap-2">
      <a href="#" class="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">CSS</a>
      <a href="#" class="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Web Development</a>
      <a href="#" class="px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Frontend</a>
    </div>
  </div>

  <!-- Author Bio -->
  <div class="mt-10 p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl">
    <div class="flex flex-col sm:flex-row gap-4">
      <img src="https://i.pravatar.cc/80" alt="Author" class="w-20 h-20 rounded-full" />
      <div>
        <h4 class="text-lg font-bold text-slate-900 dark:text-white mb-1">Sarah Johnson</h4>
        <p class="text-sm text-coral-600 dark:text-coral-400 mb-3">Senior Frontend Developer</p>
        <p class="text-slate-600 dark:text-slate-400 mb-4">
          Sarah is a passionate web developer with over 10 years of experience. She loves exploring new technologies and sharing knowledge with the community.
        </p>
        <div class="flex gap-3">
          <a href="#" class="text-slate-400 hover:text-coral-500 transition-colors">
            <span class="i-twitter icon-base"></span>
          </a>
          <a href="#" class="text-slate-400 hover:text-coral-500 transition-colors">
            <span class="i-github icon-base"></span>
          </a>
          <a href="#" class="text-slate-400 hover:text-coral-500 transition-colors">
            <span class="i-linkedin icon-base"></span>
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- Share -->
  <div class="mt-8 flex items-center justify-between">
    <span class="text-sm font-medium text-slate-700 dark:text-slate-300">Share this article</span>
    <div class="flex gap-2">
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-[#1DA1F2] rounded-lg transition-colors">
        <span class="i-twitter icon-base"></span>
      </button>
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-[#4267B2] rounded-lg transition-colors">
        <span class="i-facebook icon-base"></span>
      </button>
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:text-white hover:bg-[#0077B5] rounded-lg transition-colors">
        <span class="i-linkedin icon-base"></span>
      </button>
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
        <span class="i-link icon-base"></span>
      </button>
    </div>
  </div>
</article>
`

/**
 * Blog Archive / Listing
 */
export const blogArchive = `
<section class="py-12">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Header -->
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold text-slate-900 dark:text-white mb-4">Our Blog</h1>
      <p class="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        Insights, tutorials, and updates from our team
      </p>
    </div>

    <!-- Categories -->
    <div class="flex flex-wrap justify-center gap-2 mb-10">
      <button class="px-4 py-2 text-sm font-medium bg-coral-500 text-white rounded-full">All</button>
      <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Technology</button>
      <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Design</button>
      <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Business</button>
      <button class="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Tutorials</button>
    </div>

    <!-- Featured Post -->
    <article class="mb-12 group">
      <a href="#" class="block relative aspect-[21/9] rounded-2xl overflow-hidden mb-6">
        <img src="https://picsum.photos/1400/600" alt="Featured" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <div class="absolute bottom-0 left-0 right-0 p-8">
          <span class="inline-block px-3 py-1 text-xs font-semibold bg-coral-500 text-white rounded-full mb-4">Featured</span>
          <h2 class="text-3xl sm:text-4xl font-bold text-white mb-3 line-clamp-2">
            The Complete Guide to Building Scalable Design Systems
          </h2>
          <p class="text-slate-200 line-clamp-2 mb-4 max-w-2xl">
            Learn how to create, document, and maintain a design system that scales with your organization.
          </p>
          <div class="flex items-center gap-3 text-sm text-slate-300">
            <img src="https://i.pravatar.cc/32" alt="" class="w-8 h-8 rounded-full border-2 border-white" />
            <span>Alex Rivera</span>
            <span>•</span>
            <span>Jan 10, 2026</span>
            <span>•</span>
            <span>12 min read</span>
          </div>
        </div>
      </a>
    </article>

    <!-- Post Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <!-- Blog post cards inserted here -->
    </div>

    <!-- Pagination -->
    <nav class="mt-12 flex items-center justify-center gap-2">
      <button class="p-2 text-slate-400 hover:text-coral-500 disabled:opacity-50" disabled>
        <span class="i-chevron-left icon-base"></span>
      </button>
      <button class="w-10 h-10 text-sm font-medium bg-coral-500 text-white rounded-lg">1</button>
      <button class="w-10 h-10 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">2</button>
      <button class="w-10 h-10 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">3</button>
      <span class="px-2 text-slate-400">...</span>
      <button class="w-10 h-10 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">12</button>
      <button class="p-2 text-slate-600 dark:text-slate-400 hover:text-coral-500">
        <span class="i-chevron-right icon-base"></span>
      </button>
    </nav>
  </div>
</section>
`

/**
 * Blog Sidebar
 */
export const blogSidebar = `
<aside class="space-y-8">
  <!-- Search -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Search</h3>
    <div class="relative">
      <input type="search" placeholder="Search articles..." class="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-coral-500 focus:border-transparent" />
      <span class="i-search icon-sm absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></span>
    </div>
  </div>

  <!-- Categories -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Categories</h3>
    <ul class="space-y-3">
      <li>
        <a href="#" class="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
          <span>Technology</span>
          <span class="text-sm text-slate-400">(24)</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
          <span>Design</span>
          <span class="text-sm text-slate-400">(18)</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
          <span>Business</span>
          <span class="text-sm text-slate-400">(12)</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
          <span>Tutorials</span>
          <span class="text-sm text-slate-400">(31)</span>
        </a>
      </li>
      <li>
        <a href="#" class="flex items-center justify-between text-slate-600 dark:text-slate-400 hover:text-coral-600 dark:hover:text-coral-400">
          <span>News</span>
          <span class="text-sm text-slate-400">(8)</span>
        </a>
      </li>
    </ul>
  </div>

  <!-- Popular Posts -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Popular Posts</h3>
    <div class="space-y-4">
      <a href="#" class="flex gap-3 group">
        <img src="https://picsum.photos/80/80" alt="" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        <div>
          <h4 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">Getting Started with Container Queries</h4>
          <p class="text-xs text-slate-500 mt-1">Jan 8, 2026</p>
        </div>
      </a>
      <a href="#" class="flex gap-3 group">
        <img src="https://picsum.photos/80/81" alt="" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        <div>
          <h4 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">10 CSS Tricks Every Developer Should Know</h4>
          <p class="text-xs text-slate-500 mt-1">Jan 5, 2026</p>
        </div>
      </a>
      <a href="#" class="flex gap-3 group">
        <img src="https://picsum.photos/80/82" alt="" class="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
        <div>
          <h4 class="text-sm font-medium text-slate-900 dark:text-white line-clamp-2 group-hover:text-coral-600 dark:group-hover:text-coral-400 transition-colors">Building Accessible Components</h4>
          <p class="text-xs text-slate-500 mt-1">Jan 2, 2026</p>
        </div>
      </a>
    </div>
  </div>

  <!-- Tags -->
  <div class="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 p-6">
    <h3 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Tags</h3>
    <div class="flex flex-wrap gap-2">
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">CSS</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">JavaScript</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">React</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Vue</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">TypeScript</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Node.js</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Tailwind</a>
      <a href="#" class="px-3 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full hover:bg-coral-100 hover:text-coral-700 dark:hover:bg-coral-500/20 dark:hover:text-coral-400 transition-colors">Performance</a>
    </div>
  </div>

  <!-- Newsletter -->
  <div class="bg-gradient-to-br from-coral-500 to-coral-600 rounded-2xl p-6 text-white">
    <h3 class="text-lg font-semibold mb-2">Subscribe to Newsletter</h3>
    <p class="text-sm text-coral-100 mb-4">Get the latest articles delivered to your inbox.</p>
    <form class="space-y-3">
      <input type="email" placeholder="Your email address" class="w-full px-4 py-2.5 text-sm bg-white/20 border border-white/30 rounded-xl placeholder-coral-200 focus:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50" />
      <button type="submit" class="w-full py-2.5 text-sm font-medium bg-white text-coral-600 rounded-xl hover:bg-coral-50 transition-colors">
        Subscribe
      </button>
    </form>
  </div>
</aside>
`

/**
 * Comment Section
 */
export const blogComments = `
<section class="mt-12 pt-10 border-t border-slate-200 dark:border-slate-700">
  <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-8">Comments (12)</h3>

  <!-- Comment Form -->
  <form class="mb-10 bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-6">
    <h4 class="text-lg font-semibold text-slate-900 dark:text-white mb-4">Leave a comment</h4>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <input type="text" placeholder="Your name" class="px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500" />
      <input type="email" placeholder="Your email" class="px-4 py-2.5 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500" />
    </div>
    <textarea rows="4" placeholder="Your comment..." class="w-full px-4 py-3 text-sm bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-coral-500 resize-none mb-4"></textarea>
    <button type="submit" class="px-6 py-2.5 text-sm font-medium text-white bg-coral-500 rounded-xl hover:bg-coral-600 transition-colors">
      Post Comment
    </button>
  </form>

  <!-- Comments List -->
  <div class="space-y-6">
    <!-- Comment -->
    <div class="flex gap-4">
      <img src="https://i.pravatar.cc/48?u=1" alt="" class="w-12 h-12 rounded-full flex-shrink-0" />
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <h5 class="font-semibold text-slate-900 dark:text-white">Michael Brown</h5>
          <time class="text-xs text-slate-500">2 hours ago</time>
        </div>
        <p class="text-slate-600 dark:text-slate-400 mb-3">
          Great article! I've been looking for a comprehensive guide on modern CSS features. The section on container queries was particularly helpful.
        </p>
        <button class="text-sm text-coral-600 dark:text-coral-400 hover:text-coral-700 font-medium">Reply</button>

        <!-- Nested Reply -->
        <div class="mt-6 flex gap-4">
          <img src="https://i.pravatar.cc/48?u=author" alt="" class="w-10 h-10 rounded-full flex-shrink-0" />
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h5 class="font-semibold text-slate-900 dark:text-white">Sarah Johnson</h5>
              <span class="px-2 py-0.5 text-xs bg-coral-100 dark:bg-coral-500/20 text-coral-600 dark:text-coral-400 rounded-full">Author</span>
              <time class="text-xs text-slate-500">1 hour ago</time>
            </div>
            <p class="text-slate-600 dark:text-slate-400">
              Thanks Michael! I'm glad you found it helpful. Container queries really are a game changer for component-based development.
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Comment -->
    <div class="flex gap-4 pt-6 border-t border-slate-100 dark:border-slate-700">
      <img src="https://i.pravatar.cc/48?u=2" alt="" class="w-12 h-12 rounded-full flex-shrink-0" />
      <div class="flex-1">
        <div class="flex items-center gap-3 mb-2">
          <h5 class="font-semibold text-slate-900 dark:text-white">Emily Chen</h5>
          <time class="text-xs text-slate-500">5 hours ago</time>
        </div>
        <p class="text-slate-600 dark:text-slate-400 mb-3">
          Would love to see a follow-up article on @layer and how to structure styles in a large application. This is exactly the content I was hoping for!
        </p>
        <button class="text-sm text-coral-600 dark:text-coral-400 hover:text-coral-700 font-medium">Reply</button>
      </div>
    </div>
  </div>

  <!-- Load More -->
  <button class="mt-8 w-full py-3 text-sm font-medium text-coral-600 dark:text-coral-400 bg-coral-50 dark:bg-coral-500/10 rounded-xl hover:bg-coral-100 dark:hover:bg-coral-500/20 transition-colors">
    Load More Comments
  </button>
</section>
`
