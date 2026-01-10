/**
 * CoralCSS Solid.js Bindings
 *
 * Solid.js integration for CoralCSS - provides primitives, context, and utilities.
 * @module solid
 */

export { CoralProvider, useCoralContext, type CoralProviderProps, type CoralContextValue } from './provider'
export { useCoral, useCoralCSS, useClasses, useInjectCSS, useResponsive } from './primitives'
export { styled, createStyled, type StyledOptions } from './styled'
export { cn, cx, merge, cva, type VariantProps } from './utils'
