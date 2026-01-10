/**
 * CoralCSS React Bindings
 *
 * React integration for CoralCSS - provides hooks, context, and components.
 * @module react
 */

export { CoralProvider, useCoralContext } from './provider'
export { useCoral, useCoralCSS, useClasses } from './hooks'
export { styled } from './styled'
export { cn, cx } from './utils'
export type { CoralProviderProps, CoralContextValue } from './provider'
export type { StyledComponent, StyledOptions } from './styled'
