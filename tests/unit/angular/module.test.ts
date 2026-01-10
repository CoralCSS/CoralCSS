/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  CoralModule,
  provideCoralCSS,
  getCoralProviders,
  CoralFeatureModule,
} from '../../../src/angular/module'
import { CoralService, CORAL_CONFIG } from '../../../src/angular/service'

describe('Angular Module', () => {
  beforeEach(() => {
    // Reset module state
    CoralModule.destroy()
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  afterEach(() => {
    CoralModule.destroy()
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  describe('CoralModule', () => {
    it('should have forRoot static method', () => {
      expect(CoralModule.forRoot).toBeDefined()
      expect(typeof CoralModule.forRoot).toBe('function')
    })

    it('should return module class from forRoot', () => {
      const result = CoralModule.forRoot()
      expect(result).toBe(CoralModule)
    })

    it('should accept config in forRoot', () => {
      const result = CoralModule.forRoot({ darkMode: 'class' })
      expect(result).toBe(CoralModule)
    })

    it('should get service instance', () => {
      CoralModule.forRoot()
      const service = CoralModule.getService()
      expect(service).toBeInstanceOf(CoralService)
    })

    it('should return same service instance on multiple calls', () => {
      CoralModule.forRoot()
      const service1 = CoralModule.getService()
      const service2 = CoralModule.getService()
      expect(service1).toBe(service2)
    })

    it('should get module metadata', () => {
      CoralModule.forRoot()
      const metadata = CoralModule.getMetadata()

      expect(metadata).toBeDefined()
      expect(metadata.declarations).toBeDefined()
      expect(metadata.exports).toBeDefined()
      expect(metadata.providers).toBeDefined()
    })

    it('should include directive in declarations', () => {
      CoralModule.forRoot()
      const metadata = CoralModule.getMetadata()

      const hasDirective = metadata.declarations.some(
        (d: { class: { name: string } }) => d.class.name === 'CoralDirective'
      )
      expect(hasDirective).toBe(true)
    })

    it('should include pipes in declarations', () => {
      CoralModule.forRoot()
      const metadata = CoralModule.getMetadata()

      const hasClassPipe = metadata.declarations.some(
        (d: { class: { name: string } }) => d.class.name === 'CoralClassPipe'
      )
      const hasMergePipe = metadata.declarations.some(
        (d: { class: { name: string } }) => d.class.name === 'CoralMergePipe'
      )

      expect(hasClassPipe).toBe(true)
      expect(hasMergePipe).toBe(true)
    })

    it('should include config provider', () => {
      CoralModule.forRoot({ darkMode: 'class' })
      const metadata = CoralModule.getMetadata()

      const configProvider = metadata.providers.find(
        (p: { provide: string }) => p.provide === CORAL_CONFIG
      )
      expect(configProvider).toBeDefined()
      expect(configProvider.useValue).toEqual({ darkMode: 'class' })
    })

    it('should destroy service', () => {
      CoralModule.forRoot()
      const service = CoralModule.getService()
      expect(service).toBeInstanceOf(CoralService)

      CoralModule.destroy()

      // Should create new service after destroy
      const newService = CoralModule.getService()
      expect(newService).not.toBe(service)
    })
  })

  describe('provideCoralCSS', () => {
    it('should return provider configuration', () => {
      const result = provideCoralCSS()

      expect(result).toBeDefined()
      expect(result.provide).toBe('CORAL_PROVIDERS')
    })

    it('should include config in providers', () => {
      const result = provideCoralCSS({ darkMode: 'class' })

      expect(result.useValue).toBeDefined()
      expect(Array.isArray(result.useValue)).toBe(true)
    })

    it('should include CORAL_CONFIG provider', () => {
      const result = provideCoralCSS({ darkMode: 'class' })

      const configProvider = result.useValue.find(
        (p: { provide: string }) => p.provide === CORAL_CONFIG
      )
      expect(configProvider).toBeDefined()
      expect(configProvider.useValue).toEqual({ darkMode: 'class' })
    })

    it('should include service factory', () => {
      const result = provideCoralCSS()

      const serviceProvider = result.useValue.find(
        (p: { provide: string }) => p.provide === 'CoralService'
      )
      expect(serviceProvider).toBeDefined()
      expect(serviceProvider.useFactory).toBeDefined()
    })

    it('should create service from factory', () => {
      const result = provideCoralCSS({ darkMode: 'class' })

      const serviceProvider = result.useValue.find(
        (p: { provide: string }) => p.provide === 'CoralService'
      )
      const service = serviceProvider.useFactory()
      expect(service).toBeInstanceOf(CoralService)
    })
  })

  describe('getCoralProviders', () => {
    it('should return array of providers', () => {
      const result = getCoralProviders()

      expect(Array.isArray(result)).toBe(true)
      expect(result.length).toBe(2)
    })

    it('should include CORAL_CONFIG provider', () => {
      const result = getCoralProviders({ darkMode: 'media' })

      const configProvider = result.find(
        (p: { provide: string }) => p.provide === CORAL_CONFIG
      )
      expect(configProvider).toBeDefined()
      expect(configProvider.useValue).toEqual({ darkMode: 'media' })
    })

    it('should include CoralService provider', () => {
      const result = getCoralProviders()

      const serviceProvider = result.find(
        (p: { provide: unknown }) => p.provide === CoralService
      )
      expect(serviceProvider).toBeDefined()
      expect(serviceProvider.useFactory).toBeDefined()
    })

    it('should create service instance from factory', () => {
      const result = getCoralProviders({ darkMode: 'class' })

      const serviceProvider = result.find(
        (p: { provide: unknown }) => p.provide === CoralService
      )
      const service = serviceProvider.useFactory()
      expect(service).toBeInstanceOf(CoralService)
      expect(service.getInstance().config.darkMode).toBe('class')
    })
  })

  describe('CoralFeatureModule', () => {
    it('should have forChild static method', () => {
      expect(CoralFeatureModule.forChild).toBeDefined()
      expect(typeof CoralFeatureModule.forChild).toBe('function')
    })

    it('should return CoralModule from forChild', () => {
      const result = CoralFeatureModule.forChild()
      expect(result).toBe(CoralModule)
    })
  })
})
