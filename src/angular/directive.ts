/**
 * CoralCSS Angular Directive
 *
 * Directive for applying CoralCSS classes to elements.
 * @module angular/directive
 */

import { cn } from './utils'
import type { CoralService } from './service'

/**
 * Directive input type
 */
export type CoralClassInput = string | string[] | Record<string, boolean | null | undefined> | null | undefined

/**
 * CoralCSS Directive
 *
 * Applies CoralCSS classes to elements with automatic CSS generation.
 *
 * @example
 * ```html
 * <div coralClass="bg-coral-500 p-4 rounded">Content</div>
 * <div [coralClass]="['bg-coral-500', isActive && 'ring-2']">Content</div>
 * <div [coralClass]="{ 'bg-coral-500': true, 'ring-2': isActive }">Content</div>
 * ```
 *
 * Angular Implementation Notes:
 * This is a framework-agnostic implementation. In a real Angular app,
 * you would use Angular's @Directive decorator:
 *
 * ```typescript
 * @Directive({
 *   selector: '[coralClass]',
 *   standalone: true
 * })
 * export class CoralDirective implements OnChanges {
 *   @Input('coralClass') coralClass: CoralClassInput = ''
 *
 *   constructor(
 *     private el: ElementRef,
 *     private coral: CoralService
 *   ) {}
 *
 *   ngOnChanges() {
 *     this.updateClasses()
 *   }
 *
 *   private updateClasses() {
 *     const className = this.resolveClasses(this.coralClass)
 *     this.coral.process(className)
 *     this.el.nativeElement.className = className
 *   }
 * }
 * ```
 */
export class CoralDirective {
  private element: HTMLElement
  private coralService: CoralService
  private _coralClass: CoralClassInput = ''

  constructor(element: HTMLElement, coralService: CoralService) {
    this.element = element
    this.coralService = coralService
  }

  /**
   * Set coral class input
   */
  set coralClass(value: CoralClassInput) {
    this._coralClass = value
    this.updateClasses()
  }

  /**
   * Get coral class input
   */
  get coralClass(): CoralClassInput {
    return this._coralClass
  }

  /**
   * Update element classes
   */
  private updateClasses(): void {
    const className = this.resolveClasses(this._coralClass)
    this.coralService.process(className)
    this.element.className = className
  }

  /**
   * Resolve class input to string
   */
  private resolveClasses(input: CoralClassInput): string {
    if (!input) {
      return ''
    }

    if (typeof input === 'string') {
      return input
    }

    if (Array.isArray(input)) {
      return cn(...input)
    }

    return cn(input)
  }

  /**
   * Manually trigger class update
   */
  update(): void {
    this.updateClasses()
  }

  /**
   * Cleanup
   */
  destroy(): void {
    this.element.className = ''
  }
}

/**
 * Create a CoralDirective instance
 */
export function createCoralDirective(element: HTMLElement, coralService: CoralService): CoralDirective {
  return new CoralDirective(element, coralService)
}

/**
 * Directive metadata for Angular
 * Use this when creating the actual Angular directive
 */
export const coralDirectiveMetadata = {
  selector: '[coralClass]',
  standalone: true,
  inputs: ['coralClass'],
}
