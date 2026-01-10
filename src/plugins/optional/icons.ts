/**
 * Icons Plugin
 *
 * Comprehensive icon utilities for CoralCSS.
 * Supports inline SVG icons, icon fonts, and custom icon sets.
 * @module plugins/optional/icons
 */

import type { Plugin, Rule, PluginContext, CSSProperties } from '../../types'

/**
 * Icon collection configuration
 */
export interface IconCollection {
  /** Collection name (e.g., 'lucide', 'heroicons') */
  name: string
  /** Icon prefix (e.g., 'i-lucide-') */
  prefix: string
  /** Base URL for fetching icons (optional) */
  baseUrl?: string
  /** Custom icon definitions */
  icons?: Record<string, string>
}

/**
 * Icons plugin options
 */
export interface IconsPluginOptions {
  /** Icon size scale */
  scale?: Record<string, string>
  /** Default icon size */
  defaultSize?: string
  /** Icon collections to enable */
  collections?: IconCollection[]
  /** Custom icons */
  customIcons?: Record<string, string>
  /** Enable mask mode (uses mask-image instead of background-image) */
  mode?: 'mask' | 'background' | 'auto'
}

const defaultScale: Record<string, string> = {
  'xs': '0.75rem',
  'sm': '0.875rem',
  'base': '1rem',
  'md': '1.125rem',
  'lg': '1.25rem',
  'xl': '1.5rem',
  '2xl': '1.75rem',
  '3xl': '2rem',
  '4xl': '2.5rem',
  '5xl': '3rem',
  '6xl': '3.5rem',
  '7xl': '4rem',
  '8xl': '5rem',
  '9xl': '6rem',
  '10': '2.5rem',
  '12': '3rem',
  '16': '4rem',
  '20': '5rem',
  '24': '6rem',
  '32': '8rem',
  '48': '12rem',
  '64': '16rem',
}

// Common icon SVG paths for built-in icons
const builtInIcons: Record<string, string> = {
  // Navigation
  'arrow-up': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18"/>',
  'arrow-down': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"/>',
  'arrow-left': '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"/>',
  'arrow-right': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>',
  'chevron-up': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5"/>',
  'chevron-down': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>',
  'chevron-left': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>',
  'chevron-right': '<path stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>',

  // Actions
  'check': '<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>',
  'x': '<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>',
  'x-circle': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  'plus': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>',
  'minus': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12h-15"/>',
  'plus-circle': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  'check-circle': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',

  // UI Elements
  'menu': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"/>',
  'menu-alt': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25"/>',
  'dots-vertical': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"/>',
  'dots-horizontal': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/>',
  'search': '<path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"/>',
  'filter': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.409A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z"/>',
  'settings': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',

  // Status
  'info': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>',
  'warning': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"/>',
  'error': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"/>',
  'success': '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  'question': '<path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"/>',

  // User
  'user': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"/>',
  'users': '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"/>',
  'user-circle': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"/>',

  // Media
  'play': '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"/>',
  'pause': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5"/>',
  'stop': '<path stroke-linecap="round" stroke-linejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z"/>',
  'volume-up': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"/>',
  'volume-off': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.531V19.94a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.506-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.395C2.806 8.757 3.63 8.25 4.51 8.25H6.75z"/>',

  // File/Document
  'document': '<path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>',
  'folder': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z"/>',
  'folder-open': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776"/>',
  'download': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"/>',
  'upload': '<path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"/>',
  'trash': '<path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>',
  'pencil': '<path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>',
  'copy': '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"/>',

  // Communication
  'mail': '<path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"/>',
  'chat': '<path stroke-linecap="round" stroke-linejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z"/>',
  'phone': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"/>',
  'bell': '<path stroke-linecap="round" stroke-linejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"/>',

  // Misc
  'home': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"/>',
  'star': '<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>',
  'heart': '<path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"/>',
  'bookmark': '<path stroke-linecap="round" stroke-linejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z"/>',
  'clock': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"/>',
  'calendar': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"/>',
  'globe': '<path stroke-linecap="round" stroke-linejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"/>',
  'link': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"/>',
  'external-link': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"/>',
  'lock': '<path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
  'unlock': '<path stroke-linecap="round" stroke-linejoin="round" d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"/>',
  'eye': '<path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  'eye-off': '<path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>',
  'refresh': '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',
  'loading': '<path stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/>',

  // Social
  'share': '<path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"/>',
  'thumb-up': '<path stroke-linecap="round" stroke-linejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"/>',
  'thumb-down': '<path stroke-linecap="round" stroke-linejoin="round" d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398-.306.774-1.086 1.227-1.918 1.227h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"/>',
}

/**
 * Create SVG data URL from path
 */
function createSvgDataUrl(iconPath: string, strokeWidth: number = 1.5): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="${strokeWidth}" stroke="currentColor">${iconPath}</svg>`
  const encoded = encodeURIComponent(svg)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')
  return `url("data:image/svg+xml,${encoded}")`
}

/**
 * Icons utilities plugin
 */
export function iconsPlugin(options: IconsPluginOptions = {}): Plugin {
  const {
    scale = defaultScale,
    defaultSize = '1.25rem',
    collections = [],
    customIcons = {},
    mode = 'mask',
  } = options

  // Merge built-in icons with custom icons
  const allIcons = { ...builtInIcons, ...customIcons }

  return {
    name: 'icons',
    version: '1.0.0',

    install(ctx: PluginContext) {
      const rules: Rule[] = []

      // ========================================
      // ICON BASE STYLES
      // ========================================

      // Base icon class - sets up the icon container
      rules.push({
        pattern: 'icon',
        properties: {
          display: 'inline-block',
          width: `var(--coral-icon-size, ${defaultSize})`,
          height: `var(--coral-icon-size, ${defaultSize})`,
          'background-color': 'currentColor',
          '-webkit-mask-size': 'contain',
          'mask-size': 'contain',
          '-webkit-mask-repeat': 'no-repeat',
          'mask-repeat': 'no-repeat',
          '-webkit-mask-position': 'center',
          'mask-position': 'center',
          'vertical-align': 'middle',
          'flex-shrink': '0',
        },
      })

      // Icon using background-image mode (for colored icons)
      rules.push({
        pattern: 'icon-bg',
        properties: {
          display: 'inline-block',
          width: `var(--coral-icon-size, ${defaultSize})`,
          height: `var(--coral-icon-size, ${defaultSize})`,
          'background-size': 'contain',
          'background-repeat': 'no-repeat',
          'background-position': 'center',
          'vertical-align': 'middle',
          'flex-shrink': '0',
        },
      })

      // ========================================
      // ICON SIZE UTILITIES
      // ========================================

      for (const [key, value] of Object.entries(scale)) {
        rules.push({
          pattern: `icon-${key}`,
          properties: {
            '--coral-icon-size': value,
            width: value,
            height: value,
          },
        })
      }

      // Arbitrary icon size
      rules.push({
        pattern: /^icon-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value || value.includes('-')) { return null } // Prevent matching icon names
          return {
            properties: {
              '--coral-icon-size': value,
              width: value,
              height: value,
            },
          }
        },
      })

      // ========================================
      // BUILT-IN ICONS (i-{name})
      // ========================================

      for (const [name, path] of Object.entries(allIcons)) {
        const svgUrl = createSvgDataUrl(path)

        if (mode === 'mask' || mode === 'auto') {
          rules.push({
            pattern: `i-${name}`,
            properties: {
              display: 'inline-block',
              width: `var(--coral-icon-size, ${defaultSize})`,
              height: `var(--coral-icon-size, ${defaultSize})`,
              'background-color': 'currentColor',
              '-webkit-mask-image': svgUrl,
              'mask-image': svgUrl,
              '-webkit-mask-size': 'contain',
              'mask-size': 'contain',
              '-webkit-mask-repeat': 'no-repeat',
              'mask-repeat': 'no-repeat',
              '-webkit-mask-position': 'center',
              'mask-position': 'center',
              'vertical-align': 'middle',
              'flex-shrink': '0',
            },
          })
        }

        if (mode === 'background') {
          rules.push({
            pattern: `i-${name}`,
            properties: {
              display: 'inline-block',
              width: `var(--coral-icon-size, ${defaultSize})`,
              height: `var(--coral-icon-size, ${defaultSize})`,
              'background-image': svgUrl,
              'background-size': 'contain',
              'background-repeat': 'no-repeat',
              'background-position': 'center',
              'vertical-align': 'middle',
              'flex-shrink': '0',
            },
          })
        }
      }

      // ========================================
      // ICON COLLECTIONS
      // ========================================

      for (const collection of collections) {
        const { name: collectionName, prefix, icons = {} } = collection

        for (const [iconName, iconPath] of Object.entries(icons)) {
          const svgUrl = createSvgDataUrl(iconPath)
          const pattern = prefix ? `${prefix}${iconName}` : `i-${collectionName}-${iconName}`

          rules.push({
            pattern,
            properties: {
              display: 'inline-block',
              width: `var(--coral-icon-size, ${defaultSize})`,
              height: `var(--coral-icon-size, ${defaultSize})`,
              'background-color': 'currentColor',
              '-webkit-mask-image': svgUrl,
              'mask-image': svgUrl,
              '-webkit-mask-size': 'contain',
              'mask-size': 'contain',
              '-webkit-mask-repeat': 'no-repeat',
              'mask-repeat': 'no-repeat',
              '-webkit-mask-position': 'center',
              'mask-position': 'center',
              'vertical-align': 'middle',
              'flex-shrink': '0',
            },
          })
        }
      }

      // ========================================
      // ICON MODIFIERS
      // ========================================

      // Icon rotation
      const rotations = ['0', '45', '90', '135', '180', '225', '270', '315']
      for (const rotation of rotations) {
        rules.push({
          pattern: `icon-rotate-${rotation}`,
          properties: { transform: `rotate(${rotation}deg)` },
        })
      }

      // Flip utilities
      rules.push({
        pattern: 'icon-flip-x',
        properties: { transform: 'scaleX(-1)' },
      })
      rules.push({
        pattern: 'icon-flip-y',
        properties: { transform: 'scaleY(-1)' },
      })
      rules.push({
        pattern: 'icon-flip-both',
        properties: { transform: 'scale(-1, -1)' },
      })

      // Icon spin animation
      rules.push({
        pattern: 'icon-spin',
        properties: {
          animation: 'coral-icon-spin 1s linear infinite',
        },
      })
      rules.push({
        pattern: 'icon-spin-slow',
        properties: {
          animation: 'coral-icon-spin 2s linear infinite',
        },
      })
      rules.push({
        pattern: 'icon-spin-fast',
        properties: {
          animation: 'coral-icon-spin 0.5s linear infinite',
        },
      })

      // Icon pulse animation
      rules.push({
        pattern: 'icon-pulse',
        properties: {
          animation: 'coral-icon-pulse 2s ease-in-out infinite',
        },
      })

      // Icon bounce animation
      rules.push({
        pattern: 'icon-bounce',
        properties: {
          animation: 'coral-icon-bounce 1s ease infinite',
        },
      })

      // ========================================
      // ICON STROKE WIDTH
      // ========================================

      const strokeWidths = {
        'thin': '1',
        'light': '1.25',
        'normal': '1.5',
        'medium': '1.75',
        'bold': '2',
        'thick': '2.5',
      }
      for (const [key, value] of Object.entries(strokeWidths)) {
        rules.push({
          pattern: `icon-stroke-${key}`,
          properties: { 'stroke-width': value },
        })
      }

      // Arbitrary stroke width
      rules.push({
        pattern: /^icon-stroke-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'stroke-width': value } }
        },
      })

      // ========================================
      // SVG UTILITIES (for inline SVG icons)
      // ========================================

      // SVG fill colors
      rules.push({ pattern: 'fill-current', properties: { fill: 'currentColor' } })
      rules.push({ pattern: 'fill-none', properties: { fill: 'none' } })
      rules.push({ pattern: 'fill-inherit', properties: { fill: 'inherit' } })
      rules.push({ pattern: 'fill-transparent', properties: { fill: 'transparent' } })

      // SVG stroke colors
      rules.push({ pattern: 'stroke-current', properties: { stroke: 'currentColor' } })
      rules.push({ pattern: 'stroke-none', properties: { stroke: 'none' } })
      rules.push({ pattern: 'stroke-inherit', properties: { stroke: 'inherit' } })
      rules.push({ pattern: 'stroke-transparent', properties: { stroke: 'transparent' } })

      // SVG stroke width (direct)
      const svgStrokeWidths = ['0', '1', '2']
      for (const width of svgStrokeWidths) {
        rules.push({
          pattern: `stroke-${width}`,
          properties: { 'stroke-width': width },
        })
      }

      // Arbitrary stroke width
      rules.push({
        pattern: /^stroke-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'stroke-width': value } }
        },
      })

      // Stroke line cap
      rules.push({ pattern: 'stroke-cap-butt', properties: { 'stroke-linecap': 'butt' } })
      rules.push({ pattern: 'stroke-cap-round', properties: { 'stroke-linecap': 'round' } })
      rules.push({ pattern: 'stroke-cap-square', properties: { 'stroke-linecap': 'square' } })

      // Stroke line join
      rules.push({ pattern: 'stroke-join-miter', properties: { 'stroke-linejoin': 'miter' } })
      rules.push({ pattern: 'stroke-join-round', properties: { 'stroke-linejoin': 'round' } })
      rules.push({ pattern: 'stroke-join-bevel', properties: { 'stroke-linejoin': 'bevel' } })

      // Stroke dash array
      rules.push({ pattern: 'stroke-dash-none', properties: { 'stroke-dasharray': 'none' } })
      rules.push({ pattern: 'stroke-dash-sm', properties: { 'stroke-dasharray': '4 4' } })
      rules.push({ pattern: 'stroke-dash-md', properties: { 'stroke-dasharray': '8 8' } })
      rules.push({ pattern: 'stroke-dash-lg', properties: { 'stroke-dasharray': '16 16' } })

      // Arbitrary stroke dash
      rules.push({
        pattern: /^stroke-dash-\[(.+)\]$/,
        handler: (match) => {
          const value = match[1]
          if (!value) { return null }
          return { properties: { 'stroke-dasharray': value.replace(/_/g, ' ') } }
        },
      })

      // ========================================
      // ICON KEYFRAMES (injected once)
      // ========================================

      // Add keyframe definitions via theme extension
      ctx.extendTheme({
        keyframes: {
          'coral-icon-spin': {
            from: { transform: 'rotate(0deg)' },
            to: { transform: 'rotate(360deg)' },
          },
          'coral-icon-pulse': {
            '0%, 100%': { opacity: '1' },
            '50%': { opacity: '0.5' },
          },
          'coral-icon-bounce': {
            '0%, 100%': { transform: 'translateY(-25%)' },
            '50%': { transform: 'translateY(0)' },
          },
        },
      })

      // Register all rules
      for (const rule of rules) {
        ctx.addRule(rule)
      }
    },
  }
}

// Export icon collections for external use
export { builtInIcons, defaultScale }
export default iconsPlugin
