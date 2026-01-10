/**
 * CoralCSS Angular Pipes
 *
 * Pipes for class name handling in Angular templates.
 * @module angular/pipe
 */

import { cn, merge } from './utils'

/**
 * CoralClass Pipe
 *
 * Combines class names conditionally in templates.
 *
 * @example
 * ```html
 * <div [class]="'base-class' | coralClass : (isActive ? 'active' : null)">Content</div>
 * <button [class]="buttonClasses | coralClass : { disabled: isDisabled }">Click</button>
 * ```
 *
 * Angular Implementation Notes:
 * This is a framework-agnostic implementation. In a real Angular app,
 * you would use Angular's @Pipe decorator:
 *
 * ```typescript
 * @Pipe({
 *   name: 'coralClass',
 *   standalone: true,
 *   pure: true
 * })
 * export class CoralClassPipe implements PipeTransform {
 *   constructor(private coral: CoralService) {}
 *
 *   transform(
 *     value: string | null | undefined,
 *     ...args: (string | boolean | null | undefined | Record<string, boolean>)[]
 *   ): string {
 *     const result = cn(value, ...args)
 *     this.coral.process(result)
 *     return result
 *   }
 * }
 * ```
 */
export class CoralClassPipe {
  /**
   * Transform class inputs into a single class string
   */
  transform(
    value: string | null | undefined,
    ...args: (string | boolean | null | undefined | Record<string, boolean | null | undefined>)[]
  ): string {
    return cn(value, ...args)
  }
}

/**
 * CoralMerge Pipe
 *
 * Merges class names with conflict resolution.
 *
 * @example
 * ```html
 * <div [class]="baseClasses | coralMerge : overrideClasses">Content</div>
 * <div [class]="'p-2 bg-red-500' | coralMerge : 'p-4'">Uses p-4</div>
 * ```
 *
 * Angular Implementation Notes:
 * ```typescript
 * @Pipe({
 *   name: 'coralMerge',
 *   standalone: true,
 *   pure: true
 * })
 * export class CoralMergePipe implements PipeTransform {
 *   constructor(private coral: CoralService) {}
 *
 *   transform(value: string | null | undefined, ...args: (string | null | undefined)[]): string {
 *     const result = merge(value, ...args)
 *     this.coral.process(result)
 *     return result
 *   }
 * }
 * ```
 */
export class CoralMergePipe {
  /**
   * Merge class inputs with conflict resolution
   */
  transform(
    value: string | null | undefined,
    ...args: (string | null | undefined)[]
  ): string {
    return merge(value, ...args)
  }
}

/**
 * Create a CoralClassPipe instance
 */
export function createCoralClassPipe(): CoralClassPipe {
  return new CoralClassPipe()
}

/**
 * Create a CoralMergePipe instance
 */
export function createCoralMergePipe(): CoralMergePipe {
  return new CoralMergePipe()
}

/**
 * Pipe metadata for Angular
 */
export const coralClassPipeMetadata = {
  name: 'coralClass',
  standalone: true,
  pure: true,
}

export const coralMergePipeMetadata = {
  name: 'coralMerge',
  standalone: true,
  pure: true,
}
