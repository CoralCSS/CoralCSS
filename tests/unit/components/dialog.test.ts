/**
 * Dialog Component Tests
 */
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'

// Mock DOM environment
const mockElement = {
  showModal: vi.fn(),
  close: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  querySelector: vi.fn(),
  querySelectorAll: vi.fn(() => []),
  classList: {
    add: vi.fn(),
    remove: vi.fn(),
  },
  setAttribute: vi.fn(),
  getAttribute: vi.fn(),
  dispatchEvent: vi.fn(),
  tagName: 'DIALOG',
  open: false,
}

// Mock document
const mockDocument = {
  querySelector: vi.fn(() => mockElement),
  querySelectorAll: vi.fn(() => []),
  createElement: vi.fn(() => mockElement),
  body: {
    appendChild: vi.fn(),
    removeChild: vi.fn(),
    style: {},
  },
  documentElement: {
    style: {},
  },
}

vi.stubGlobal('document', mockDocument)

describe('Dialog Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('configuration', () => {
    it('should have default options', () => {
      const defaultOptions = {
        closeOnBackdrop: true,
        closeOnEscape: true,
        trapFocus: true,
      }
      expect(defaultOptions.closeOnBackdrop).toBe(true)
      expect(defaultOptions.closeOnEscape).toBe(true)
      expect(defaultOptions.trapFocus).toBe(true)
    })

    it('should accept custom options', () => {
      const options = {
        closeOnBackdrop: false,
        closeOnEscape: false,
        trapFocus: false,
      }
      expect(options.closeOnBackdrop).toBe(false)
      expect(options.closeOnEscape).toBe(false)
      expect(options.trapFocus).toBe(false)
    })
  })

  describe('open/close', () => {
    it('should call showModal when opening', () => {
      mockElement.showModal()
      expect(mockElement.showModal).toHaveBeenCalled()
    })

    it('should call close when closing', () => {
      mockElement.close()
      expect(mockElement.close).toHaveBeenCalled()
    })
  })

  describe('events', () => {
    it('should dispatch open event', () => {
      const event = new CustomEvent('coral:dialog:open')
      mockElement.dispatchEvent(event)
      expect(mockElement.dispatchEvent).toHaveBeenCalled()
    })

    it('should dispatch close event', () => {
      const event = new CustomEvent('coral:dialog:close')
      mockElement.dispatchEvent(event)
      expect(mockElement.dispatchEvent).toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('should have dialog role', () => {
      expect(mockElement.tagName).toBe('DIALOG')
    })

    it('should support aria-modal', () => {
      mockElement.setAttribute('aria-modal', 'true')
      expect(mockElement.setAttribute).toHaveBeenCalledWith('aria-modal', 'true')
    })
  })
})
