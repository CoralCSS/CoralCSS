import { describe, it, expect, vi, beforeEach } from 'vitest'
import {
  coralManagerConfig,
  createStateManager,
  createPanelTabs,
  formatCSSDisplay,
  groupClassesByPrefix,
} from '../../../src/storybook/manager'
import { ADDON_ID, PANEL_ID, TOOL_ID, EVENTS } from '../../../src/storybook/addon'

describe('Storybook Manager', () => {
  describe('coralManagerConfig', () => {
    it('should return addon configuration', () => {
      const config = coralManagerConfig()

      expect(config.addonId).toBe(ADDON_ID)
      expect(config.panelId).toBe(PANEL_ID)
      expect(config.toolId).toBe(TOOL_ID)
    })

    it('should include panel configuration', () => {
      const config = coralManagerConfig({ panelTitle: 'Custom Title' })

      expect(config.panel.id).toBe(PANEL_ID)
      expect(config.panel.title).toBe('Custom Title')
      expect(config.panel.position).toBe('bottom')
    })

    it('should use default panel position', () => {
      const config = coralManagerConfig()
      expect(config.panel.position).toBe('bottom')
    })

    it('should use custom panel position', () => {
      const config = coralManagerConfig({ panelPosition: 'right' })
      expect(config.panel.position).toBe('right')
    })

    it('should enable all features by default', () => {
      const config = coralManagerConfig()

      expect(config.features.cssPanel).toBe(true)
      expect(config.features.classesPanel).toBe(true)
      expect(config.features.themePanel).toBe(true)
      expect(config.features.toolbar).toBe(true)
    })

    it('should allow disabling features', () => {
      const config = coralManagerConfig({
        showCSSPanel: false,
        showClassesPanel: false,
        showThemePanel: false,
        showToolbar: false,
      })

      expect(config.features.cssPanel).toBe(false)
      expect(config.features.classesPanel).toBe(false)
      expect(config.features.themePanel).toBe(false)
      expect(config.features.toolbar).toBe(false)
    })

    it('should have register function', () => {
      const config = coralManagerConfig()
      expect(typeof config.register).toBe('function')
    })

    it('should return api info from register', () => {
      const config = coralManagerConfig()
      const mockApi = {
        on: vi.fn(),
        emit: vi.fn(),
        getChannel: vi.fn(),
        getCurrentStoryData: vi.fn(),
        getParameters: vi.fn(),
      }

      const result = config.register(mockApi)

      expect(result.api).toBe(mockApi)
      expect(result.panelId).toBe(PANEL_ID)
      expect(result.toolId).toBe(TOOL_ID)
      expect(result.events).toBe(EVENTS)
    })

    it('should have getManifest function', () => {
      const config = coralManagerConfig()
      const manifest = config.getManifest()

      expect(manifest.name).toBe('CoralCSS')
      expect(manifest.displayName).toBe('CoralCSS')
      expect(manifest.version).toBe('1.0.0')
      expect(manifest.supports.storybook).toBe('7.x || 8.x')
    })
  })

  describe('createStateManager', () => {
    let mockApi: {
      on: ReturnType<typeof vi.fn>
      emit: ReturnType<typeof vi.fn>
      getChannel: ReturnType<typeof vi.fn>
      getCurrentStoryData: ReturnType<typeof vi.fn>
      getParameters: ReturnType<typeof vi.fn>
    }
    let channelListeners: Map<string, (data: unknown) => void>

    beforeEach(() => {
      channelListeners = new Map()

      const mockChannel = {
        on: vi.fn((event: string, handler: (data: unknown) => void) => {
          channelListeners.set(event, handler)
        }),
        emit: vi.fn(),
      }

      mockApi = {
        on: vi.fn(),
        emit: vi.fn(),
        getChannel: vi.fn(() => mockChannel),
        getCurrentStoryData: vi.fn(),
        getParameters: vi.fn(),
      }
    })

    it('should create state manager', () => {
      const manager = createStateManager(mockApi)

      expect(manager.getState).toBeDefined()
      expect(manager.setActivePanel).toBeDefined()
      expect(manager.toggleDarkMode).toBeDefined()
      expect(manager.subscribe).toBeDefined()
      expect(manager.requestState).toBeDefined()
    })

    it('should return initial state', () => {
      const manager = createStateManager(mockApi)
      const state = manager.getState()

      expect(state.activePanel).toBe('css')
      expect(state.generatedCSS).toBe('')
      expect(state.usedClasses).toEqual([])
      expect(state.theme).toEqual({})
      expect(state.darkMode).toBe(false)
    })

    it('should update activePanel', () => {
      const manager = createStateManager(mockApi)
      manager.setActivePanel('classes')

      expect(manager.getState().activePanel).toBe('classes')
    })

    it('should toggle dark mode', () => {
      const manager = createStateManager(mockApi)

      expect(manager.getState().darkMode).toBe(false)
      manager.toggleDarkMode()
      expect(manager.getState().darkMode).toBe(true)
      manager.toggleDarkMode()
      expect(manager.getState().darkMode).toBe(false)
    })

    it('should emit dark mode toggle event', () => {
      const manager = createStateManager(mockApi)
      manager.toggleDarkMode()

      const channel = mockApi.getChannel()
      expect(channel.emit).toHaveBeenCalledWith(EVENTS.DARK_MODE_TOGGLED, { enabled: true })
    })

    it('should subscribe to state changes', () => {
      const manager = createStateManager(mockApi)
      const listener = vi.fn()

      manager.subscribe(listener)
      manager.setActivePanel('theme')

      expect(listener).toHaveBeenCalledWith(expect.objectContaining({
        activePanel: 'theme',
      }))
    })

    it('should unsubscribe from state changes', () => {
      const manager = createStateManager(mockApi)
      const listener = vi.fn()

      const unsubscribe = manager.subscribe(listener)
      unsubscribe()
      manager.setActivePanel('theme')

      expect(listener).not.toHaveBeenCalled()
    })

    it('should handle CSS_GENERATED event', () => {
      const manager = createStateManager(mockApi)
      const handler = channelListeners.get(EVENTS.CSS_GENERATED)

      handler?.({ css: '.test { color: red; }' })

      expect(manager.getState().generatedCSS).toBe('.test { color: red; }')
    })

    it('should handle CLASSES_USED event', () => {
      const manager = createStateManager(mockApi)
      const handler = channelListeners.get(EVENTS.CLASSES_USED)

      handler?.({ classes: ['bg-red-500', 'p-4'] })

      expect(manager.getState().usedClasses).toEqual(['bg-red-500', 'p-4'])
    })

    it('should handle DARK_MODE_TOGGLED event', () => {
      const manager = createStateManager(mockApi)
      const handler = channelListeners.get(EVENTS.DARK_MODE_TOGGLED)

      handler?.({ enabled: true })

      expect(manager.getState().darkMode).toBe(true)
    })

    it('should handle THEME_CHANGED event', () => {
      const manager = createStateManager(mockApi)
      const handler = channelListeners.get(EVENTS.THEME_CHANGED)

      handler?.({ theme: { primary: '#ff6b6b' } })

      expect(manager.getState().theme).toEqual({ primary: '#ff6b6b' })
    })

    it('should request state from preview', () => {
      const manager = createStateManager(mockApi)
      manager.requestState()

      const channel = mockApi.getChannel()
      expect(channel.emit).toHaveBeenCalledWith(EVENTS.REQUEST_STATE, {})
    })
  })

  describe('createPanelTabs', () => {
    it('should create all tabs by default', () => {
      const tabs = createPanelTabs()

      expect(tabs.length).toBe(3)
      expect(tabs.map((t) => t.id)).toEqual(['css', 'classes', 'theme'])
    })

    it('should exclude CSS panel when disabled', () => {
      const tabs = createPanelTabs({ showCSSPanel: false })

      expect(tabs.find((t) => t.id === 'css')).toBeUndefined()
    })

    it('should exclude classes panel when disabled', () => {
      const tabs = createPanelTabs({ showClassesPanel: false })

      expect(tabs.find((t) => t.id === 'classes')).toBeUndefined()
    })

    it('should exclude theme panel when disabled', () => {
      const tabs = createPanelTabs({ showThemePanel: false })

      expect(tabs.find((t) => t.id === 'theme')).toBeUndefined()
    })

    it('should include tab titles', () => {
      const tabs = createPanelTabs()

      expect(tabs.find((t) => t.id === 'css')?.title).toBe('Generated CSS')
      expect(tabs.find((t) => t.id === 'classes')?.title).toBe('Used Classes')
      expect(tabs.find((t) => t.id === 'theme')?.title).toBe('Theme')
    })

    it('should include tab icons', () => {
      const tabs = createPanelTabs()

      expect(tabs.find((t) => t.id === 'css')?.icon).toBe('code')
      expect(tabs.find((t) => t.id === 'classes')?.icon).toBe('list')
      expect(tabs.find((t) => t.id === 'theme')?.icon).toBe('paintbrush')
    })
  })

  describe('formatCSSDisplay', () => {
    it('should format CSS with line breaks after }', () => {
      const css = '.a { color: red; } .b { color: blue; }'
      const formatted = formatCSSDisplay(css)

      expect(formatted).toContain('}\n\n')
    })

    it('should format CSS with line breaks after ;', () => {
      const css = '.a { color: red; background: blue; }'
      const formatted = formatCSSDisplay(css)

      expect(formatted).toContain(';\n')
    })

    it('should format CSS with line breaks after {', () => {
      const css = '.a { color: red; }'
      const formatted = formatCSSDisplay(css)

      expect(formatted).toContain('{\n')
    })

    it('should trim result', () => {
      const css = '  .a { color: red; }  '
      const formatted = formatCSSDisplay(css)

      expect(formatted).not.toMatch(/^\s/)
      expect(formatted).not.toMatch(/\s$/)
    })
  })

  describe('groupClassesByPrefix', () => {
    it('should group classes by prefix', () => {
      const classes = ['bg-red-500', 'bg-blue-500', 'p-4', 'text-white']
      const groups = groupClassesByPrefix(classes)

      expect(groups.bg).toEqual(['bg-red-500', 'bg-blue-500'])
      expect(groups.p).toEqual(['p-4'])
      expect(groups.text).toEqual(['text-white'])
    })

    it('should handle classes without dash', () => {
      const classes = ['block', 'flex']
      const groups = groupClassesByPrefix(classes)

      expect(groups.block).toEqual(['block'])
      expect(groups.flex).toEqual(['flex'])
    })

    it('should handle empty array', () => {
      const groups = groupClassesByPrefix([])
      expect(groups).toEqual({})
    })

    it('should handle single class', () => {
      const groups = groupClassesByPrefix(['bg-red-500'])
      expect(groups.bg).toEqual(['bg-red-500'])
    })
  })
})
