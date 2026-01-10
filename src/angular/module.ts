/**
 * CoralCSS Angular Module
 *
 * Module and provider configuration for CoralCSS in Angular.
 * @module angular/module
 */

import { CoralService, createCoralService, CORAL_CONFIG, type CoralConfig } from './service'
import { CoralDirective, coralDirectiveMetadata } from './directive'
import { CoralClassPipe, CoralMergePipe, coralClassPipeMetadata, coralMergePipeMetadata } from './pipe'

/**
 * Module configuration
 */
export interface CoralModuleConfig extends CoralConfig {
  /** Whether to provide the service at root level */
  providedIn?: 'root' | 'platform' | 'any'
}

/**
 * CoralCSS Module
 *
 * Provides CoralCSS functionality to Angular applications.
 *
 * @example
 * ```typescript
 * // In your app.module.ts
 * import { CoralModule } from '@coral-css/core/angular'
 *
 * @NgModule({
 *   imports: [
 *     CoralModule.forRoot({ darkMode: 'class' })
 *   ]
 * })
 * export class AppModule {}
 * ```
 *
 * For standalone components:
 * ```typescript
 * @Component({
 *   standalone: true,
 *   imports: [CoralModule],
 *   template: '<div coralClass="bg-coral-500 p-4">Content</div>'
 * })
 * export class MyComponent {}
 * ```
 *
 * Angular Implementation Notes:
 * This is a framework-agnostic implementation. In a real Angular app:
 *
 * ```typescript
 * @NgModule({
 *   declarations: [CoralDirective, CoralClassPipe, CoralMergePipe],
 *   exports: [CoralDirective, CoralClassPipe, CoralMergePipe],
 *   providers: [CoralService]
 * })
 * export class CoralModule {
 *   static forRoot(config?: CoralModuleConfig): ModuleWithProviders<CoralModule> {
 *     return {
 *       ngModule: CoralModule,
 *       providers: [
 *         { provide: CORAL_CONFIG, useValue: config },
 *         {
 *           provide: CoralService,
 *           useFactory: (cfg: CoralConfig) => new CoralService(cfg),
 *           deps: [[new Optional(), CORAL_CONFIG]]
 *         }
 *       ]
 *     }
 *   }
 * }
 * ```
 */
export class CoralModule {
  private static config: CoralModuleConfig | undefined
  private static service: CoralService | null = null

  /**
   * Configure the module with options
   */
  static forRoot(config?: CoralModuleConfig): typeof CoralModule {
    CoralModule.config = config
    return CoralModule
  }

  /**
   * Get the service instance
   */
  static getService(): CoralService {
    if (!CoralModule.service) {
      CoralModule.service = createCoralService(CoralModule.config)
    }
    return CoralModule.service
  }

  /**
   * Get module metadata
   */
  static getMetadata() {
    return {
      declarations: [
        { ...coralDirectiveMetadata, class: CoralDirective },
        { ...coralClassPipeMetadata, class: CoralClassPipe },
        { ...coralMergePipeMetadata, class: CoralMergePipe },
      ],
      exports: ['CoralDirective', 'CoralClassPipe', 'CoralMergePipe'],
      providers: [
        { provide: CORAL_CONFIG, useValue: CoralModule.config },
        { provide: 'CoralService', useFactory: () => CoralModule.getService() },
      ],
    }
  }

  /**
   * Cleanup the module
   */
  static destroy(): void {
    if (CoralModule.service) {
      CoralModule.service.destroy()
      CoralModule.service = null
    }
  }
}

/**
 * Provider function for standalone Angular apps
 *
 * @example
 * ```typescript
 * // In main.ts
 * import { provideCoralCSS } from '@coral-css/core/angular'
 *
 * bootstrapApplication(AppComponent, {
 *   providers: [
 *     provideCoralCSS({ darkMode: 'class' })
 *   ]
 * })
 * ```
 */
export function provideCoralCSS(config?: CoralModuleConfig) {
  return {
    provide: 'CORAL_PROVIDERS',
    useValue: [
      { provide: CORAL_CONFIG, useValue: config },
      {
        provide: 'CoralService',
        useFactory: () => createCoralService(config),
      },
    ],
  }
}

/**
 * Get Angular provider configuration
 */
export function getCoralProviders(config?: CoralModuleConfig) {
  return [
    { provide: CORAL_CONFIG, useValue: config },
    {
      provide: CoralService,
      useFactory: () => createCoralService(config),
    },
  ]
}

/**
 * Feature module for lazy-loaded modules
 */
export class CoralFeatureModule {
  static forChild(): typeof CoralModule {
    return CoralModule
  }
}
