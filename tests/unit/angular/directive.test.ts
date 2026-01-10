/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { CoralDirective, createCoralDirective, coralDirectiveMetadata } from '../../../src/angular/directive'
import { CoralService } from '../../../src/angular/service'

describe('Angular Directive', () => {
  let element: HTMLDivElement
  let service: CoralService

  beforeEach(() => {
    element = document.createElement('div')
    document.body.appendChild(element)
    service = new CoralService({ autoInject: false })
  })

  afterEach(() => {
    element.remove()
    service.destroy()
    document.querySelectorAll('style[data-coral]').forEach((el) => el.remove())
  })

  describe('CoralDirective', () => {
    it('should create a directive instance', () => {
      const directive = new CoralDirective(element, service)
      expect(directive).toBeDefined()
    })

    it('should apply string classes', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = 'bg-red-500 p-4'

      expect(element.classList.contains('bg-red-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should apply array classes', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = ['bg-blue-500', 'p-2']

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('p-2')).toBe(true)
    })

    it('should apply object classes', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = { 'bg-green-500': true, 'bg-yellow-500': false }

      expect(element.classList.contains('bg-green-500')).toBe(true)
      expect(element.classList.contains('bg-yellow-500')).toBe(false)
    })

    it('should handle null value', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = null

      expect(element.className).toBe('')
    })

    it('should handle undefined value', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = undefined

      expect(element.className).toBe('')
    })

    it('should update classes when changed', () => {
      const directive = new CoralDirective(element, service)

      directive.coralClass = 'bg-red-500'
      expect(element.classList.contains('bg-red-500')).toBe(true)

      directive.coralClass = 'bg-blue-500'
      expect(element.classList.contains('bg-blue-500')).toBe(true)
    })

    it('should get coralClass value', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = 'test-class'

      expect(directive.coralClass).toBe('test-class')
    })

    it('should manually update with update method', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = 'bg-red-500'

      // Set class internally without triggering setter
      ;(directive as unknown as { _coralClass: string })._coralClass = 'bg-blue-500 p-4'
      directive.update()

      expect(element.classList.contains('bg-blue-500')).toBe(true)
      expect(element.classList.contains('p-4')).toBe(true)
    })

    it('should clear classes on destroy', () => {
      const directive = new CoralDirective(element, service)
      directive.coralClass = 'bg-red-500 p-4'

      expect(element.className).not.toBe('')

      directive.destroy()

      expect(element.className).toBe('')
    })

    it('should handle array with conditional values', () => {
      const directive = new CoralDirective(element, service)
      const isActive = true
      const isDisabled = false

      directive.coralClass = ['btn', isActive && 'active', isDisabled && 'disabled'].filter(Boolean) as string[]

      expect(element.classList.contains('btn')).toBe(true)
      expect(element.classList.contains('active')).toBe(true)
      expect(element.classList.contains('disabled')).toBe(false)
    })
  })

  describe('createCoralDirective', () => {
    it('should create a directive instance', () => {
      const directive = createCoralDirective(element, service)
      expect(directive).toBeInstanceOf(CoralDirective)
    })

    it('should apply classes', () => {
      const directive = createCoralDirective(element, service)
      directive.coralClass = 'test-class'

      expect(element.classList.contains('test-class')).toBe(true)
    })
  })

  describe('coralDirectiveMetadata', () => {
    it('should have correct selector', () => {
      expect(coralDirectiveMetadata.selector).toBe('[coralClass]')
    })

    it('should be standalone', () => {
      expect(coralDirectiveMetadata.standalone).toBe(true)
    })

    it('should have coralClass input', () => {
      expect(coralDirectiveMetadata.inputs).toContain('coralClass')
    })
  })
})
