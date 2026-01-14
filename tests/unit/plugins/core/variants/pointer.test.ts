/**
 * Tests for Pointer-Aware Variants Plugin
 */
import { describe, it, expect, vi } from 'vitest'
import { pointerVariantsPlugin } from '../../../../../src/plugins/core/variants/pointer'

describe('Pointer Variants Plugin', () => {
  describe('Plugin Registration', () => {
    it('should have correct plugin metadata', () => {
      const plugin = pointerVariantsPlugin()
      expect(plugin.name).toBe('pointer-variants')
      expect(plugin.version).toBe('1.0.0')
    })

    it('should have install function', () => {
      const plugin = pointerVariantsPlugin()
      expect(plugin.install).toBeDefined()
      expect(typeof plugin.install).toBe('function')
    })
  })

  describe('Variant Registration', () => {
    it('should register pointer-coarse variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const pointerCoarseCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].match === 'pointer-coarse'
      )
      expect(pointerCoarseCall).toBeDefined()
      expect(pointerCoarseCall[0].name).toBe('pointer')
    })

    it('should register pointer-fine variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const pointerFineCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].match === 'pointer-fine'
      )
      expect(pointerFineCall).toBeDefined()
      expect(pointerFineCall[0].name).toBe('pointer')
    })

    it('should register any-pointer coarse variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const coarseCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'coarse'
      )
      expect(coarseCall).toBeDefined()
    })

    it('should register any-pointer fine variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const fineCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'fine'
      )
      expect(fineCall).toBeDefined()
    })

    it('should register any-pointer none variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const noneCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'none'
      )
      expect(noneCall).toBeDefined()
    })

    it('should register hover-supported variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const hoverCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'hover-supported'
      )
      expect(hoverCall).toBeDefined()
    })

    it('should register hover-none variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const hoverNoneCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'hover-none'
      )
      expect(hoverNoneCall).toBeDefined()
    })

    it('should register any-hover variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const anyHoverCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-hover'
      )
      expect(anyHoverCall).toBeDefined()
    })

    it('should register touch-only variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const touchOnlyCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'touch' && call[0].match === 'only'
      )
      expect(touchOnlyCall).toBeDefined()
    })

    it('should register mouse-only variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const mouseOnlyCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'mouse' && call[0].match === 'only'
      )
      expect(mouseOnlyCall).toBeDefined()
    })

    it('should register touch-device variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const touchDeviceCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'touch' && call[0].match === 'device'
      )
      expect(touchDeviceCall).toBeDefined()
    })

    it('should register cursor-available variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const cursorAvailableCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'cursor' && call[0].match === 'available'
      )
      expect(cursorAvailableCall).toBeDefined()
    })

    it('should register cursor-unavailable variant', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const cursorUnavailableCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'cursor' && call[0].match === 'unavailable'
      )
      expect(cursorUnavailableCall).toBeDefined()
    })
  })

  describe('Transform Functions', () => {
    it('should transform pointer-coarse correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const pointerCoarseCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].match === 'pointer-coarse'
      )
      const result = pointerCoarseCall[0].transform('.test')
      expect(result).toContain('@media (pointer: coarse)')
      expect(result).toContain('.test')
    })

    it('should transform pointer-fine correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const pointerFineCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].match === 'pointer-fine'
      )
      const result = pointerFineCall[0].transform('.test')
      expect(result).toContain('@media (pointer: fine)')
      expect(result).toContain('.test')
    })

    it('should transform any-pointer coarse correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const coarseCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'coarse'
      )
      const result = coarseCall[0].transform('.test')
      expect(result).toContain('@media (any-pointer: coarse)')
    })

    it('should transform any-pointer fine correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const fineCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'fine'
      )
      const result = fineCall[0].transform('.test')
      expect(result).toContain('@media (any-pointer: fine)')
    })

    it('should transform any-pointer none correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const noneCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-pointer' && call[0].match === 'none'
      )
      const result = noneCall[0].transform('.test')
      expect(result).toContain('@media (any-pointer: none)')
    })

    it('should transform hover-supported correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const hoverCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'hover-supported'
      )
      const result = hoverCall[0].transform('.test')
      expect(result).toContain('@media (hover: hover)')
      expect(result).toContain(':hover')
    })

    it('should transform hover-none correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const hoverNoneCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'hover-none'
      )
      const result = hoverNoneCall[0].transform('.test')
      expect(result).toContain('@media (hover: none)')
      expect(result).toContain(':hover')
    })

    it('should transform any-hover correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const anyHoverCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'any-hover'
      )
      const result = anyHoverCall[0].transform('.test')
      expect(result).toContain('@media (any-hover: hover)')
      expect(result).toContain(':hover')
    })

    it('should transform touch-only correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const touchOnlyCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'touch' && call[0].match === 'only'
      )
      const result = touchOnlyCall[0].transform('.test')
      expect(result).toContain('@media (pointer: coarse) and (hover: none)')
    })

    it('should transform mouse-only correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const mouseOnlyCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'mouse' && call[0].match === 'only'
      )
      const result = mouseOnlyCall[0].transform('.test')
      expect(result).toContain('@media (pointer: fine) and (hover: hover)')
    })

    it('should transform touch-device correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const touchDeviceCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'touch' && call[0].match === 'device'
      )
      const result = touchDeviceCall[0].transform('.test')
      expect(result).toContain('@media (pointer: coarse)')
    })

    it('should transform cursor-available correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const cursorAvailableCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'cursor' && call[0].match === 'available'
      )
      const result = cursorAvailableCall[0].transform('.test')
      expect(result).toContain('@media (pointer: fine)')
    })

    it('should transform cursor-unavailable correctly', () => {
      const plugin = pointerVariantsPlugin()
      const mockCtx = { addVariant: vi.fn() }
      plugin.install(mockCtx as any)

      const cursorUnavailableCall = mockCtx.addVariant.mock.calls.find(
        (call) => call[0].name === 'cursor' && call[0].match === 'unavailable'
      )
      const result = cursorUnavailableCall[0].transform('.test')
      expect(result).toContain('@media (pointer: coarse)')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/variants/pointer'
      )
      expect(defaultExport).toBe(pointerVariantsPlugin)
    })
  })
})
