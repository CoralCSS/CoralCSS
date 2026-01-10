/**
 * CoralCSS Preact Bindings
 *
 * Preact integration for CoralCSS - provides hooks, context, and components.
 * @module preact
 */

export { CoralProvider, useCoralContext, type CoralProviderProps, type CoralContextValue } from './provider'
export { useCoral, useCoralCSS, useClasses, useInjectCSS, useResponsive } from './hooks'
export { styled, createStyled, type StyledOptions } from './styled'
export { cn, cx, merge, cva, type VariantProps } from './utils'
