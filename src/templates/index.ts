/**
 * CoralCSS Templates
 *
 * Ready-to-use HTML templates for common page layouts.
 * Each template uses CoralCSS utility classes and can be customized.
 *
 * @module templates
 */

// Export all templates
export * from './dashboard'
export * from './landing'
export * from './ecommerce'
export * from './blog'
export * from './auth'
export * from './components'

// Template metadata for discovery
export interface TemplateMetadata {
  name: string
  description: string
  category: 'layout' | 'page' | 'component' | 'section'
  preview?: string
}

export const templateRegistry: Record<string, TemplateMetadata> = {
  // Dashboard templates
  'dashboard-layout': {
    name: 'Dashboard Layout',
    description: 'Full dashboard with sidebar, header, and main content area',
    category: 'layout',
  },
  'dashboard-sidebar': {
    name: 'Dashboard Sidebar',
    description: 'Collapsible sidebar navigation',
    category: 'component',
  },
  'dashboard-header': {
    name: 'Dashboard Header',
    description: 'Top navigation bar with search and user menu',
    category: 'component',
  },
  'dashboard-cards': {
    name: 'Stat Cards',
    description: 'Statistics and KPI display cards',
    category: 'component',
  },

  // Landing page templates
  'landing-hero': {
    name: 'Hero Section',
    description: 'Eye-catching hero with headline, subtext, and CTA',
    category: 'section',
  },
  'landing-features': {
    name: 'Features Section',
    description: 'Grid of feature cards with icons',
    category: 'section',
  },
  'landing-pricing': {
    name: 'Pricing Section',
    description: 'Pricing table with plan comparison',
    category: 'section',
  },
  'landing-testimonials': {
    name: 'Testimonials Section',
    description: 'Customer testimonials carousel',
    category: 'section',
  },
  'landing-cta': {
    name: 'CTA Section',
    description: 'Call-to-action with email signup',
    category: 'section',
  },
  'landing-footer': {
    name: 'Footer',
    description: 'Multi-column footer with links',
    category: 'component',
  },

  // E-commerce templates
  'ecommerce-product-card': {
    name: 'Product Card',
    description: 'Product display card with image, price, and actions',
    category: 'component',
  },
  'ecommerce-product-grid': {
    name: 'Product Grid',
    description: 'Responsive product listing grid',
    category: 'section',
  },
  'ecommerce-cart': {
    name: 'Shopping Cart',
    description: 'Cart with items, quantities, and total',
    category: 'component',
  },
  'ecommerce-checkout': {
    name: 'Checkout Form',
    description: 'Multi-step checkout process',
    category: 'page',
  },

  // Blog templates
  'blog-post-card': {
    name: 'Blog Post Card',
    description: 'Blog post preview card',
    category: 'component',
  },
  'blog-post-full': {
    name: 'Blog Post Page',
    description: 'Full blog post with prose styling',
    category: 'page',
  },
  'blog-archive': {
    name: 'Blog Archive',
    description: 'Blog listing page with categories',
    category: 'page',
  },

  // Auth templates
  'auth-login': {
    name: 'Login Form',
    description: 'Login form with social options',
    category: 'component',
  },
  'auth-register': {
    name: 'Register Form',
    description: 'Registration form with validation',
    category: 'component',
  },
  'auth-forgot-password': {
    name: 'Forgot Password',
    description: 'Password reset request form',
    category: 'component',
  },
  'auth-reset-password': {
    name: 'Reset Password',
    description: 'Set new password form',
    category: 'component',
  },
  'auth-verify-email': {
    name: 'Email Verification',
    description: 'OTP verification form',
    category: 'component',
  },
  'auth-two-factor': {
    name: 'Two-Factor Auth',
    description: '2FA code input form',
    category: 'component',
  },
  'auth-split-screen': {
    name: 'Split Screen Auth',
    description: 'Auth layout with branding panel',
    category: 'layout',
  },

  // Blog extras
  'blog-post-horizontal': {
    name: 'Horizontal Post Card',
    description: 'Blog card with side image',
    category: 'component',
  },
  'blog-sidebar': {
    name: 'Blog Sidebar',
    description: 'Sidebar with search, categories, popular posts',
    category: 'component',
  },
  'blog-comments': {
    name: 'Comments Section',
    description: 'Comment form and list with replies',
    category: 'section',
  },

  // UI Components
  'component-alerts': {
    name: 'Alerts',
    description: 'Info, success, warning, error alerts',
    category: 'component',
  },
  'component-buttons': {
    name: 'Buttons',
    description: 'Button styles, sizes, and states',
    category: 'component',
  },
  'component-forms': {
    name: 'Form Elements',
    description: 'Inputs, selects, checkboxes, radios, toggles',
    category: 'component',
  },
  'component-cards': {
    name: 'Cards',
    description: 'Various card styles and layouts',
    category: 'component',
  },
  'component-avatars': {
    name: 'Avatars',
    description: 'Avatar sizes, status, initials, stacks',
    category: 'component',
  },
  'component-badges': {
    name: 'Badges',
    description: 'Labels, tags, and status badges',
    category: 'component',
  },
  'component-modal': {
    name: 'Modal Dialog',
    description: 'Modal with header, body, footer',
    category: 'component',
  },
  'component-toasts': {
    name: 'Toast Notifications',
    description: 'Toast messages and snackbars',
    category: 'component',
  },
  'component-table': {
    name: 'Data Table',
    description: 'Table with sorting and pagination',
    category: 'component',
  },
  'component-tabs': {
    name: 'Tabs',
    description: 'Tab navigation styles',
    category: 'component',
  },
  'component-breadcrumb': {
    name: 'Breadcrumb',
    description: 'Navigation breadcrumbs',
    category: 'component',
  },
  'component-progress': {
    name: 'Progress Bars',
    description: 'Linear and circular progress',
    category: 'component',
  },
  'component-skeletons': {
    name: 'Skeleton Loaders',
    description: 'Loading placeholders',
    category: 'component',
  },
  'component-empty-states': {
    name: 'Empty States',
    description: 'No results, empty inbox, error states',
    category: 'component',
  },
  'component-navigation': {
    name: 'Navigation Bar',
    description: 'Top navigation with logo and links',
    category: 'component',
  },
  'component-dropdown': {
    name: 'Dropdown Menu',
    description: 'Dropdown with icons and actions',
    category: 'component',
  },
  'component-tooltip': {
    name: 'Tooltips',
    description: 'Hover tooltips in various positions',
    category: 'component',
  },
}
