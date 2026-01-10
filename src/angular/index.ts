/**
 * CoralCSS Angular Bindings
 *
 * Angular integration for CoralCSS - provides service, directive, pipe, and module.
 * @module angular
 */

export { CoralService, CORAL_CONFIG, type CoralConfig } from './service'
export { CoralDirective } from './directive'
export { CoralClassPipe, CoralMergePipe } from './pipe'
export { CoralModule, provideCoralCSS, type CoralModuleConfig } from './module'
export { cn, cx, merge, cva, type VariantProps } from './utils'
