/**
 * Component Design Tokens
 *
 * Component-specific tokens that provide consistent styling across
 * UI components. References semantic tokens for theming support.
 *
 * @module tokens/component
 */

import { ref } from './ref'

/**
 * Button component tokens
 */
export const buttonTokens = {
  // Base styles
  fontWeight: ref('typography.fontWeight.medium'),
  borderRadius: ref('radii.button'),
  transitionDuration: ref('durations.button'),
  transitionEasing: ref('easings.button'),

  // Sizes
  sizes: {
    xs: {
      height: '1.75rem',
      paddingX: '0.625rem',
      fontSize: ref('typography.fontSize.body-xs'),
      gap: '0.25rem',
      iconSize: '0.875rem',
    },
    sm: {
      height: '2rem',
      paddingX: '0.75rem',
      fontSize: ref('typography.fontSize.body-sm'),
      gap: '0.375rem',
      iconSize: '1rem',
    },
    md: {
      height: '2.5rem',
      paddingX: '1rem',
      fontSize: ref('typography.fontSize.body-sm'),
      gap: '0.5rem',
      iconSize: '1.125rem',
    },
    lg: {
      height: '2.75rem',
      paddingX: '1.25rem',
      fontSize: ref('typography.fontSize.body-md'),
      gap: '0.5rem',
      iconSize: '1.25rem',
    },
    xl: {
      height: '3rem',
      paddingX: '1.5rem',
      fontSize: ref('typography.fontSize.body-lg'),
      gap: '0.625rem',
      iconSize: '1.5rem',
    },
  },

  // Variants
  variants: {
    solid: {
      background: ref('colors.accent.default'),
      color: ref('colors.accent.foreground'),
      hoverBackground: ref('colors.accent.emphasis'),
    },
    soft: {
      background: ref('colors.accent.subtle'),
      color: ref('colors.accent.default'),
      hoverBackground: ref('colors.accent.muted'),
    },
    outline: {
      background: 'transparent',
      color: ref('colors.accent.default'),
      borderColor: ref('colors.accent.default'),
      borderWidth: '2px',
      hoverBackground: ref('colors.accent.subtle'),
    },
    ghost: {
      background: 'transparent',
      color: ref('colors.accent.default'),
      hoverBackground: ref('colors.accent.subtle'),
    },
  },
}

/**
 * Input component tokens
 */
export const inputTokens = {
  // Base styles
  fontFamily: ref('typography.fontFamily.body'),
  fontSize: ref('typography.fontSize.body-sm'),
  borderRadius: ref('radii.input'),
  transitionDuration: ref('durations.input'),
  transitionEasing: ref('easings.default'),

  // Sizes
  sizes: {
    sm: {
      height: '2rem',
      paddingX: '0.75rem',
      fontSize: ref('typography.fontSize.body-sm'),
    },
    md: {
      height: '2.5rem',
      paddingX: '1rem',
      fontSize: ref('typography.fontSize.body-sm'),
    },
    lg: {
      height: '3rem',
      paddingX: '1rem',
      fontSize: ref('typography.fontSize.body-md'),
    },
  },

  // States
  states: {
    default: {
      background: ref('colors.background.default'),
      borderColor: ref('colors.border.default'),
      color: ref('colors.foreground.default'),
      placeholderColor: ref('colors.foreground.subtle'),
    },
    hover: {
      borderColor: ref('colors.border.emphasis'),
    },
    focus: {
      borderColor: ref('colors.accent.default'),
      ringColor: ref('colors.accent.subtle'),
      ringWidth: '2px',
    },
    disabled: {
      background: ref('colors.interactive.disabled'),
      color: ref('colors.foreground.disabled'),
    },
    error: {
      borderColor: ref('colors.status.error'),
      ringColor: ref('colors.status.errorSubtle'),
    },
  },
}

/**
 * Card component tokens
 */
export const cardTokens = {
  background: ref('colors.background.default'),
  borderColor: ref('colors.border.default'),
  borderRadius: ref('radii.card'),
  shadow: ref('shadows.card'),
  hoverShadow: ref('shadows.card-hover'),

  // Padding options
  padding: {
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
  },

  // Header
  header: {
    paddingX: '1.5rem',
    paddingY: '1rem',
    borderColor: ref('colors.border.default'),
  },

  // Footer
  footer: {
    paddingX: '1.5rem',
    paddingY: '1rem',
    borderColor: ref('colors.border.default'),
    background: ref('colors.background.subtle'),
  },
}

/**
 * Badge component tokens
 */
export const badgeTokens = {
  fontWeight: ref('typography.fontWeight.medium'),
  borderRadius: ref('radii.badge'),

  sizes: {
    sm: {
      height: '1.25rem',
      paddingX: '0.375rem',
      fontSize: '0.625rem',
    },
    md: {
      height: '1.5rem',
      paddingX: '0.5rem',
      fontSize: '0.75rem',
    },
    lg: {
      height: '1.75rem',
      paddingX: '0.625rem',
      fontSize: '0.875rem',
    },
  },

  // Dot indicator
  dot: {
    size: '0.375rem',
    marginRight: '0.375rem',
  },
}

/**
 * Avatar component tokens
 */
export const avatarTokens = {
  borderRadius: ref('radii.avatar'),
  fontWeight: ref('typography.fontWeight.semibold'),

  sizes: {
    xs: { size: '1.5rem', fontSize: '0.625rem' },
    sm: { size: '2rem', fontSize: '0.75rem' },
    md: { size: '2.5rem', fontSize: '0.875rem' },
    lg: { size: '3rem', fontSize: '1rem' },
    xl: { size: '4rem', fontSize: '1.25rem' },
    '2xl': { size: '5rem', fontSize: '1.5rem' },
  },

  // Status indicator
  status: {
    size: '25%',
    minSize: '0.5rem',
    borderWidth: '2px',
    borderColor: ref('colors.background.default'),
  },

  // Group overlap
  group: {
    overlap: '-0.5rem',
    borderWidth: '2px',
    borderColor: ref('colors.background.default'),
  },
}

/**
 * Modal component tokens
 */
export const modalTokens = {
  background: ref('colors.background.default'),
  borderRadius: ref('radii.modal'),
  shadow: ref('shadows.modal'),
  transitionDuration: ref('durations.modal'),
  transitionEasing: ref('easings.modal'),

  // Overlay
  overlay: {
    background: ref('colors.background.overlay'),
    backdropBlur: '4px',
  },

  // Sizes
  sizes: {
    xs: '20rem',
    sm: '24rem',
    md: '28rem',
    lg: '32rem',
    xl: '36rem',
    '2xl': '42rem',
    full: '100%',
  },

  // Header
  header: {
    paddingX: '1.5rem',
    paddingY: '1rem',
    borderColor: ref('colors.border.default'),
  },

  // Body
  body: {
    paddingX: '1.5rem',
    paddingY: '1rem',
  },

  // Footer
  footer: {
    paddingX: '1.5rem',
    paddingY: '1rem',
    borderColor: ref('colors.border.default'),
    background: ref('colors.background.subtle'),
  },
}

/**
 * Dropdown component tokens
 */
export const dropdownTokens = {
  background: ref('colors.background.default'),
  borderColor: ref('colors.border.default'),
  borderRadius: ref('radii.xl'),
  shadow: ref('shadows.dropdown'),
  minWidth: '12rem',

  // Item
  item: {
    paddingX: '1rem',
    paddingY: '0.5rem',
    fontSize: ref('typography.fontSize.body-sm'),
    hoverBackground: ref('colors.interactive.hover'),
    activeBackground: ref('colors.interactive.active'),
    disabledColor: ref('colors.foreground.disabled'),
  },

  // Divider
  divider: {
    color: ref('colors.border.default'),
    marginY: '0.25rem',
  },

  // Group label
  label: {
    paddingX: '1rem',
    paddingY: '0.5rem',
    fontSize: ref('typography.fontSize.body-xs'),
    color: ref('colors.foreground.subtle'),
    fontWeight: ref('typography.fontWeight.semibold'),
  },
}

/**
 * Toast component tokens
 */
export const toastTokens = {
  background: ref('colors.background.default'),
  borderRadius: ref('radii.xl'),
  shadow: ref('shadows.elevation-4'),
  transitionDuration: ref('durations.toast'),
  transitionEasing: ref('easings.out'),

  // Sizes
  minWidth: '20rem',
  maxWidth: '24rem',
  padding: '1rem',

  // Icon container
  icon: {
    size: '2.5rem',
    borderRadius: '50%',
  },

  // Progress
  progress: {
    height: '0.25rem',
  },
}

/**
 * Tabs component tokens
 */
export const tabsTokens = {
  fontWeight: ref('typography.fontWeight.medium'),
  transitionDuration: ref('durations.fast'),

  // Tab trigger
  trigger: {
    paddingX: '1rem',
    paddingY: '0.5rem',
    fontSize: ref('typography.fontSize.body-sm'),
    color: ref('colors.foreground.muted'),
    activeColor: ref('colors.accent.default'),
    hoverColor: ref('colors.foreground.default'),
  },

  // Line variant
  line: {
    borderWidth: '2px',
    borderColor: ref('colors.border.default'),
    activeBorderColor: ref('colors.accent.default'),
  },

  // Pills variant
  pills: {
    borderRadius: ref('radii.lg'),
    activeBackground: ref('colors.accent.default'),
    activeColor: ref('colors.accent.foreground'),
  },
}

/**
 * Tooltip component tokens
 */
export const tooltipTokens = {
  background: ref('colors.foreground.default'),
  color: ref('colors.foreground.inverse'),
  fontSize: ref('typography.fontSize.body-xs'),
  fontWeight: ref('typography.fontWeight.medium'),
  borderRadius: ref('radii.lg'),
  paddingX: '0.75rem',
  paddingY: '0.375rem',
  maxWidth: '20rem',
  transitionDuration: ref('durations.tooltip'),

  // Arrow
  arrow: {
    size: '0.5rem',
  },
}

/**
 * Progress component tokens
 */
export const progressTokens = {
  borderRadius: ref('radii.full'),
  transitionDuration: ref('durations.slow'),

  // Track
  track: {
    background: ref('colors.border.default'),
  },

  // Bar
  bar: {
    background: ref('colors.accent.default'),
  },

  // Sizes
  sizes: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '0.75rem',
    lg: '1rem',
  },
}

/**
 * Alert component tokens
 */
export const alertTokens = {
  borderRadius: ref('radii.xl'),
  paddingX: '1rem',
  paddingY: '0.75rem',

  // Variants per status
  variants: {
    info: {
      background: ref('colors.status.infoSubtle'),
      borderColor: ref('colors.status.info'),
      color: ref('colors.status.infoForeground'),
      iconColor: ref('colors.status.info'),
    },
    success: {
      background: ref('colors.status.successSubtle'),
      borderColor: ref('colors.status.success'),
      color: ref('colors.status.successForeground'),
      iconColor: ref('colors.status.success'),
    },
    warning: {
      background: ref('colors.status.warningSubtle'),
      borderColor: ref('colors.status.warning'),
      color: ref('colors.status.warningForeground'),
      iconColor: ref('colors.status.warning'),
    },
    error: {
      background: ref('colors.status.errorSubtle'),
      borderColor: ref('colors.status.error'),
      color: ref('colors.status.errorForeground'),
      iconColor: ref('colors.status.error'),
    },
  },
}

/**
 * All component tokens
 */
export const componentTokens = {
  button: buttonTokens,
  input: inputTokens,
  card: cardTokens,
  badge: badgeTokens,
  avatar: avatarTokens,
  modal: modalTokens,
  dropdown: dropdownTokens,
  toast: toastTokens,
  tabs: tabsTokens,
  tooltip: tooltipTokens,
  progress: progressTokens,
  alert: alertTokens,
}
