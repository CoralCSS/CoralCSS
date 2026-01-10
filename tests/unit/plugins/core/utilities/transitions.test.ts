/**
 * Tests for Transitions Utilities Plugin
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { createCoral } from '../../../../../src/kernel'
import { transitionsPlugin, springKeyframes } from '../../../../../src/plugins/core/utilities/transitions'
import type { Coral } from '../../../../../src/types'

describe('Transitions Utilities Plugin', () => {
  let coral: Coral

  beforeEach(() => {
    coral = createCoral()
    coral.use(transitionsPlugin())
  })

  describe('Plugin Registration', () => {
    it('should register the plugin', () => {
      expect(coral).toBeDefined()
    })

    it('should have correct plugin metadata', () => {
      const plugin = transitionsPlugin()
      expect(plugin.name).toBe('transitions')
      expect(plugin.version).toBe('1.0.0')
    })
  })

  describe('Spring Keyframes Export', () => {
    it('should export springKeyframes object', () => {
      expect(springKeyframes).toBeDefined()
      expect(typeof springKeyframes).toBe('object')
    })

    it('should contain spring-pop keyframes', () => {
      expect(springKeyframes['spring-pop']).toContain('@keyframes')
      expect(springKeyframes['spring-pop']).toContain('coral-spring-pop')
    })

    it('should contain spring-slide animations', () => {
      expect(springKeyframes['spring-slide-up']).toContain('@keyframes')
      expect(springKeyframes['spring-slide-down']).toContain('@keyframes')
      expect(springKeyframes['spring-slide-left']).toContain('@keyframes')
      expect(springKeyframes['spring-slide-right']).toContain('@keyframes')
    })

    it('should contain spring-bounce keyframes', () => {
      expect(springKeyframes['spring-bounce']).toContain('@keyframes')
    })

    it('should contain spring-scale keyframes', () => {
      expect(springKeyframes['spring-scale']).toContain('@keyframes')
    })

    it('should contain spring-rotate keyframes', () => {
      expect(springKeyframes['spring-rotate']).toContain('@keyframes')
    })

    it('should contain elastic keyframes', () => {
      expect(springKeyframes['elastic']).toContain('@keyframes')
    })

    it('should contain jello keyframes', () => {
      expect(springKeyframes['jello']).toContain('@keyframes')
    })

    it('should contain rubber keyframes', () => {
      expect(springKeyframes['rubber']).toContain('@keyframes')
    })

    it('should contain wobble keyframes', () => {
      expect(springKeyframes['wobble']).toContain('@keyframes')
    })

    it('should contain headshake keyframes', () => {
      expect(springKeyframes['headshake']).toContain('@keyframes')
    })

    it('should contain swing keyframes', () => {
      expect(springKeyframes['swing']).toContain('@keyframes')
    })
  })

  describe('Transition Property', () => {
    it('should generate transition-none', () => {
      const css = coral.generate(['transition-none'])
      expect(css).toContain('transition-property')
      expect(css).toContain('none')
    })

    it('should generate transition-all', () => {
      const css = coral.generate(['transition-all'])
      expect(css).toContain('transition-property')
      expect(css).toContain('all')
    })

    it('should generate transition (default)', () => {
      const css = coral.generate(['transition'])
      expect(css).toContain('transition-property')
    })

    it('should generate transition-colors', () => {
      const css = coral.generate(['transition-colors'])
      expect(css).toContain('transition-property')
    })

    it('should generate transition-opacity', () => {
      const css = coral.generate(['transition-opacity'])
      expect(css).toContain('transition-property')
      expect(css).toContain('opacity')
    })

    it('should generate transition-shadow', () => {
      const css = coral.generate(['transition-shadow'])
      expect(css).toContain('transition-property')
      expect(css).toContain('shadow')
    })

    it('should generate transition-transform', () => {
      const css = coral.generate(['transition-transform'])
      expect(css).toContain('transition-property')
      expect(css).toContain('transform')
    })
  })

  describe('Transition Duration', () => {
    it('should generate duration-0', () => {
      const css = coral.generate(['duration-0'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('0')
    })

    it('should generate duration-75', () => {
      const css = coral.generate(['duration-75'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('75ms')
    })

    it('should generate duration-100', () => {
      const css = coral.generate(['duration-100'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('100ms')
    })

    it('should generate duration-150', () => {
      const css = coral.generate(['duration-150'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('150ms')
    })

    it('should generate duration-200', () => {
      const css = coral.generate(['duration-200'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('200ms')
    })

    it('should generate duration-300', () => {
      const css = coral.generate(['duration-300'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('300ms')
    })

    it('should generate duration-500', () => {
      const css = coral.generate(['duration-500'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('500ms')
    })

    it('should generate duration-700', () => {
      const css = coral.generate(['duration-700'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('700ms')
    })

    it('should generate duration-1000', () => {
      const css = coral.generate(['duration-1000'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('1000ms')
    })

    it('should generate duration arbitrary value', () => {
      const css = coral.generate(['duration-[400ms]'])
      expect(css).toContain('transition-duration')
      expect(css).toContain('400ms')
    })
  })

  describe('Transition Timing Function', () => {
    it('should generate ease-linear', () => {
      const css = coral.generate(['ease-linear'])
      expect(css).toContain('transition-timing-function')
      expect(css).toContain('linear')
    })

    it('should generate ease-in', () => {
      const css = coral.generate(['ease-in'])
      expect(css).toContain('transition-timing-function')
    })

    it('should generate ease-out', () => {
      const css = coral.generate(['ease-out'])
      expect(css).toContain('transition-timing-function')
    })

    it('should generate ease-in-out', () => {
      const css = coral.generate(['ease-in-out'])
      expect(css).toContain('transition-timing-function')
    })

    it('should generate ease arbitrary value', () => {
      const css = coral.generate(['ease-[cubic-bezier(0.4,0,0.2,1)]'])
      expect(css).toContain('transition-timing-function')
      expect(css).toContain('cubic-bezier')
    })
  })

  describe('Transition Delay', () => {
    it('should generate delay-0', () => {
      const css = coral.generate(['delay-0'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('0')
    })

    it('should generate delay-75', () => {
      const css = coral.generate(['delay-75'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('75ms')
    })

    it('should generate delay-100', () => {
      const css = coral.generate(['delay-100'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('100ms')
    })

    it('should generate delay-150', () => {
      const css = coral.generate(['delay-150'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('150ms')
    })

    it('should generate delay-200', () => {
      const css = coral.generate(['delay-200'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('200ms')
    })

    it('should generate delay-300', () => {
      const css = coral.generate(['delay-300'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('300ms')
    })

    it('should generate delay-500', () => {
      const css = coral.generate(['delay-500'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('500ms')
    })

    it('should generate delay-700', () => {
      const css = coral.generate(['delay-700'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('700ms')
    })

    it('should generate delay-1000', () => {
      const css = coral.generate(['delay-1000'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('1000ms')
    })

    it('should generate delay arbitrary value', () => {
      const css = coral.generate(['delay-[250ms]'])
      expect(css).toContain('transition-delay')
      expect(css).toContain('250ms')
    })
  })

  describe('Animation', () => {
    it('should generate animate-none', () => {
      const css = coral.generate(['animate-none'])
      expect(css).toContain('animation')
      expect(css).toContain('none')
    })

    it('should generate animate-spin', () => {
      const css = coral.generate(['animate-spin'])
      expect(css).toContain('animation')
    })

    it('should generate animate-ping', () => {
      const css = coral.generate(['animate-ping'])
      expect(css).toContain('animation')
    })

    it('should generate animate-pulse', () => {
      const css = coral.generate(['animate-pulse'])
      expect(css).toContain('animation')
    })

    it('should generate animate-bounce', () => {
      const css = coral.generate(['animate-bounce'])
      expect(css).toContain('animation')
    })
  })

  describe('Animation Timeline', () => {
    it('should generate animation-timeline-scroll', () => {
      const css = coral.generate(['animation-timeline-scroll'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll()')
    })

    it('should generate animation-timeline-scroll-x', () => {
      const css = coral.generate(['animation-timeline-scroll-x'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll(x)')
    })

    it('should generate animation-timeline-scroll-y', () => {
      const css = coral.generate(['animation-timeline-scroll-y'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('scroll(y)')
    })

    it('should generate animation-timeline-view', () => {
      const css = coral.generate(['animation-timeline-view'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view()')
    })

    it('should generate animation-timeline-view-x', () => {
      const css = coral.generate(['animation-timeline-view-x'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view(x)')
    })

    it('should generate animation-timeline-view-y', () => {
      const css = coral.generate(['animation-timeline-view-y'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('view(y)')
    })

    it('should generate animation-timeline-auto', () => {
      const css = coral.generate(['animation-timeline-auto'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('auto')
    })

    it('should generate animation-timeline-none', () => {
      const css = coral.generate(['animation-timeline-none'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('none')
    })

    it('should generate animation-timeline arbitrary value', () => {
      const css = coral.generate(['animation-timeline-[--my-timeline]'])
      expect(css).toContain('animation-timeline')
      expect(css).toContain('--my-timeline')
    })
  })

  describe('Animation Range', () => {
    it('should generate animation-range-cover', () => {
      const css = coral.generate(['animation-range-cover'])
      expect(css).toContain('animation-range')
      expect(css).toContain('cover')
    })

    it('should generate animation-range-contain', () => {
      const css = coral.generate(['animation-range-contain'])
      expect(css).toContain('animation-range')
      expect(css).toContain('contain')
    })

    it('should generate animation-range-entry', () => {
      const css = coral.generate(['animation-range-entry'])
      expect(css).toContain('animation-range')
      expect(css).toContain('entry')
    })

    it('should generate animation-range-exit', () => {
      const css = coral.generate(['animation-range-exit'])
      expect(css).toContain('animation-range')
      expect(css).toContain('exit')
    })

    it('should generate animation-range-entry-crossing', () => {
      const css = coral.generate(['animation-range-entry-crossing'])
      expect(css).toContain('animation-range')
      expect(css).toContain('entry-crossing')
    })

    it('should generate animation-range-exit-crossing', () => {
      const css = coral.generate(['animation-range-exit-crossing'])
      expect(css).toContain('animation-range')
      expect(css).toContain('exit-crossing')
    })

    it('should generate animation-range arbitrary value', () => {
      const css = coral.generate(['animation-range-[entry_0%_exit_100%]'])
      expect(css).toContain('animation-range')
    })
  })

  describe('Timeline Scope', () => {
    it('should generate timeline-scope arbitrary value', () => {
      const css = coral.generate(['timeline-scope-[my-scope]'])
      expect(css).toContain('timeline-scope')
      expect(css).toContain('--my-scope')
    })
  })

  describe('View Timeline', () => {
    it('should generate view-timeline arbitrary value', () => {
      const css = coral.generate(['view-timeline-[my-view]'])
      expect(css).toContain('view-timeline-name')
      expect(css).toContain('--my-view')
    })
  })

  describe('Scroll Timeline', () => {
    it('should generate scroll-timeline arbitrary value', () => {
      const css = coral.generate(['scroll-timeline-[my-scroll]'])
      expect(css).toContain('scroll-timeline-name')
      expect(css).toContain('--my-scroll')
    })
  })

  describe('Animation Composition', () => {
    it('should generate animation-composition-replace', () => {
      const css = coral.generate(['animation-composition-replace'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('replace')
    })

    it('should generate animation-composition-add', () => {
      const css = coral.generate(['animation-composition-add'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('add')
    })

    it('should generate animation-composition-accumulate', () => {
      const css = coral.generate(['animation-composition-accumulate'])
      expect(css).toContain('animation-composition')
      expect(css).toContain('accumulate')
    })
  })

  describe('Default Export', () => {
    it('should export default function', async () => {
      const { default: defaultExport } = await import(
        '../../../../../src/plugins/core/utilities/transitions'
      )
      expect(defaultExport).toBe(transitionsPlugin)
    })
  })
})
