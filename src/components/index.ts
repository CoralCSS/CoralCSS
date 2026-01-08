/**
 * CoralCSS Headless Components
 *
 * Framework-agnostic, accessible UI components.
 * @module components
 */

// Base
export { BaseComponent, createComponentFactory, autoInit } from './base'
import { autoInit } from './base'

// Components
export { Dialog, createDialog } from './dialog'
export type { DialogConfig, DialogState } from './dialog'

export { Dropdown, createDropdown } from './dropdown'
export type { DropdownConfig, DropdownState } from './dropdown'

export { Tabs, createTabs } from './tabs'
export type { TabsConfig, TabsState } from './tabs'

export { Accordion, createAccordion } from './accordion'
export type { AccordionConfig, AccordionState } from './accordion'

export { Tooltip, createTooltip } from './tooltip'
export type { TooltipConfig, TooltipState } from './tooltip'

export { Switch, createSwitch } from './switch'
export type { SwitchConfig, SwitchState } from './switch'

export { Toast, createToast, ToastContainer, createToastContainer } from './toast'
export type { ToastConfig, ToastState } from './toast'

/**
 * Auto-initialize all components from data attributes
 *
 * @example
 * ```typescript
 * import { initComponents } from '@coralcss/core/components'
 *
 * // Initialize all components on page load
 * document.addEventListener('DOMContentLoaded', () => {
 *   initComponents()
 * })
 * ```
 */
export function initComponents(): void {
  autoInit('[data-coral-dialog]', Dialog as never)
  autoInit('[data-coral-dropdown]', Dropdown as never)
  autoInit('[data-coral-tabs]', Tabs as never)
  autoInit('[data-coral-accordion]', Accordion as never)
  autoInit('[data-coral-tooltip]', Tooltip as never)
  autoInit('[data-coral-switch]', Switch as never)
  autoInit('[data-coral-toast]', Toast as never)
}

// Re-export component classes and factories
import { Dialog, createDialog } from './dialog'
import { Dropdown, createDropdown } from './dropdown'
import { Tabs, createTabs } from './tabs'
import { Accordion, createAccordion } from './accordion'
import { Tooltip, createTooltip } from './tooltip'
import { Switch, createSwitch } from './switch'
import { Toast, createToast, createToastContainer } from './toast'

/**
 * Component registry for easy access
 */
export const components = {
  Dialog,
  Dropdown,
  Tabs,
  Accordion,
  Tooltip,
  Switch,
  Toast,
}

/**
 * Factory functions for creating component instances
 */
export const factories = {
  createDialog,
  createDropdown,
  createTabs,
  createAccordion,
  createTooltip,
  createSwitch,
  createToast,
  createToastContainer,
}

export default components
