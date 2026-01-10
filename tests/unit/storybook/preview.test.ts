/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, afterEach } from 'vitest'
import {
  coralPreviewConfig,
  createDecorators,
  createParameters,
  createStory,
  getCoralParameters,
  isCoralDisabled,
} from '../../../src/storybook/preview'
import { PARAM_KEY } from '../../../src/storybook/addon'
import { resetDecorator } from '../../../src/storybook/decorator'

describe('Storybook Preview', () => {
  afterEach(() => {
    resetDecorator()
  })

  describe('coralPreviewConfig', () => {
    it('should return decorators array', () => {
      const config = coralPreviewConfig()
      expect(config.decorators).toBeDefined()
      expect(Array.isArray(config.decorators)).toBe(true)
      expect(config.decorators.length).toBe(1)
    })

    it('should return parameters object', () => {
      const config = coralPreviewConfig()
      expect(config.parameters).toBeDefined()
      expect(config.parameters[PARAM_KEY]).toBeDefined()
    })

    it('should include backgrounds parameter', () => {
      const config = coralPreviewConfig()
      expect(config.parameters.backgrounds).toBeDefined()
      expect(config.parameters.backgrounds.default).toBe('light')
      expect(config.parameters.backgrounds.values.length).toBe(3)
    })

    it('should include docs parameter', () => {
      const config = coralPreviewConfig()
      expect(config.parameters.docs).toBeDefined()
      expect(config.parameters.docs.source.language).toBe('html')
    })

    it('should return globalTypes when enableDarkMode is true', () => {
      const config = coralPreviewConfig({ enableDarkMode: true })
      expect(config.globalTypes.theme).toBeDefined()
      expect(config.globalTypes.darkMode).toBeDefined()
    })

    it('should not return globalTypes when enableDarkMode is false', () => {
      const config = coralPreviewConfig({ enableDarkMode: false })
      expect(config.globalTypes.theme).toBeUndefined()
      expect(config.globalTypes.darkMode).toBeUndefined()
    })

    it('should merge custom globalTypes', () => {
      const config = coralPreviewConfig({
        globalTypes: {
          customType: {
            name: 'Custom',
            defaultValue: 'test',
          },
        },
      })
      expect(config.globalTypes.customType).toBeDefined()
    })

    it('should return initialGlobals', () => {
      const config = coralPreviewConfig()
      expect(config.initialGlobals.theme).toBe('light')
      expect(config.initialGlobals.darkMode).toBe(false)
    })

    it('should merge custom initialGlobals', () => {
      const config = coralPreviewConfig({
        initialGlobals: { custom: 'value' },
      })
      expect(config.initialGlobals.custom).toBe('value')
    })

    it('should merge default parameters', () => {
      const config = coralPreviewConfig({
        defaultParameters: { disable: true },
      })
      expect(config.parameters[PARAM_KEY].disable).toBe(true)
    })

    it('should pass coral options to decorator', () => {
      const config = coralPreviewConfig({ darkMode: 'class' })
      expect(config.decorators.length).toBe(1)
    })
  })

  describe('createDecorators', () => {
    it('should return array with coral decorator', () => {
      const decorators = createDecorators()
      expect(decorators.length).toBe(1)
      expect(typeof decorators[0]).toBe('function')
    })

    it('should include additional decorators', () => {
      const customDecorator = () => null
      const decorators = createDecorators({}, [customDecorator])

      expect(decorators.length).toBe(2)
      expect(decorators[1]).toBe(customDecorator)
    })

    it('should pass config to coral decorator', () => {
      const decorators = createDecorators({ darkMode: 'class' })
      expect(decorators.length).toBe(1)
    })
  })

  describe('createParameters', () => {
    it('should return parameters with coral key', () => {
      const params = createParameters()
      expect(params[PARAM_KEY]).toBeDefined()
    })

    it('should include coral parameters', () => {
      const params = createParameters({ disable: true })
      expect(params[PARAM_KEY].disable).toBe(true)
    })

    it('should include additional parameters', () => {
      const params = createParameters({}, { custom: 'value' })
      expect(params.custom).toBe('value')
    })
  })

  describe('createStory', () => {
    it('should create story with render function', () => {
      const render = () => '<div>Test</div>'
      const story = createStory({ render })

      expect(story.render).toBe(render)
    })

    it('should include args', () => {
      const story = createStory({
        render: () => null,
        args: { variant: 'primary' },
      })

      expect(story.args.variant).toBe('primary')
    })

    it('should include coralCSS parameters', () => {
      const story = createStory({
        render: () => null,
        coralCSS: { highlightClasses: ['bg-red-500'] },
      })

      expect(story.parameters[PARAM_KEY].highlightClasses).toEqual(['bg-red-500'])
    })

    it('should merge additional parameters', () => {
      const story = createStory({
        render: () => null,
        parameters: { custom: 'value' },
      })

      expect(story.parameters.custom).toBe('value')
    })

    it('should have default empty args', () => {
      const story = createStory({ render: () => null })
      expect(story.args).toEqual({})
    })
  })

  describe('getCoralParameters', () => {
    it('should return coral parameters from context', () => {
      const context = {
        parameters: {
          [PARAM_KEY]: { disable: true, highlightClasses: ['test'] },
        },
      }

      const params = getCoralParameters(context)
      expect(params.disable).toBe(true)
      expect(params.highlightClasses).toEqual(['test'])
    })

    it('should return empty object when no parameters', () => {
      const context = { parameters: {} }
      const params = getCoralParameters(context)
      expect(params).toEqual({})
    })

    it('should return empty object when parameters is undefined', () => {
      const context = {}
      const params = getCoralParameters(context)
      expect(params).toEqual({})
    })
  })

  describe('isCoralDisabled', () => {
    it('should return true when disable is true', () => {
      const context = {
        parameters: {
          [PARAM_KEY]: { disable: true },
        },
      }

      expect(isCoralDisabled(context)).toBe(true)
    })

    it('should return false when disable is false', () => {
      const context = {
        parameters: {
          [PARAM_KEY]: { disable: false },
        },
      }

      expect(isCoralDisabled(context)).toBe(false)
    })

    it('should return false when disable is not set', () => {
      const context = {
        parameters: {
          [PARAM_KEY]: {},
        },
      }

      expect(isCoralDisabled(context)).toBe(false)
    })

    it('should return false when no parameters', () => {
      const context = { parameters: {} }
      expect(isCoralDisabled(context)).toBe(false)
    })
  })
})
