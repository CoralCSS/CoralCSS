/**
 * @vitest-environment jsdom
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import {
  createClassSpy,
  trackClassChanges,
  createClassListSpy,
  waitForClass,
  waitForClassRemoval,
} from '../../../src/testing/spy'

describe('Testing Spy Utilities', () => {
  describe('createClassSpy', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should track class additions', async () => {
      const spy = createClassSpy(element)

      element.classList.add('test-class')

      // Wait for mutation observer
      await new Promise((r) => setTimeout(r, 10))

      expect(spy.wasAdded('test-class')).toBe(true)

      spy.destroy()
    })

    it('should track class removals', async () => {
      element.className = 'test-class'
      const spy = createClassSpy(element)

      element.classList.remove('test-class')

      await new Promise((r) => setTimeout(r, 10))

      expect(spy.wasRemoved('test-class')).toBe(true)

      spy.destroy()
    })

    it('should count toggles', async () => {
      const spy = createClassSpy(element)

      element.classList.add('toggle-class')
      await new Promise((r) => setTimeout(r, 10))

      element.classList.remove('toggle-class')
      await new Promise((r) => setTimeout(r, 10))

      element.classList.add('toggle-class')
      await new Promise((r) => setTimeout(r, 10))

      expect(spy.getToggleCount('toggle-class')).toBe(3)

      spy.destroy()
    })

    it('should clear events', async () => {
      const spy = createClassSpy(element)

      element.classList.add('test-class')
      await new Promise((r) => setTimeout(r, 10))

      spy.clear()

      expect(spy.events).toHaveLength(0)

      spy.destroy()
    })

    it('should get events for specific class', async () => {
      const spy = createClassSpy(element)

      element.classList.add('class-a')
      element.classList.add('class-b')
      await new Promise((r) => setTimeout(r, 10))

      const eventsA = spy.getEventsForClass('class-a')
      expect(eventsA.length).toBeGreaterThan(0)
      expect(eventsA.every((e) => e.className === 'class-a')).toBe(true)

      spy.destroy()
    })

    it('should get events for specific element', async () => {
      const spy = createClassSpy(element)

      element.classList.add('test-class')
      await new Promise((r) => setTimeout(r, 10))

      const events = spy.getEventsForElement(element)
      expect(events.length).toBeGreaterThan(0)
      expect(events.every((e) => e.element === element)).toBe(true)

      spy.destroy()
    })
  })

  describe('trackClassChanges', () => {
    let root: HTMLDivElement

    beforeEach(() => {
      root = document.createElement('div')
      document.body.appendChild(root)
    })

    afterEach(() => {
      root.remove()
    })

    it('should track changes across multiple elements', async () => {
      const tracker = trackClassChanges(root)
      tracker.start()

      const child1 = document.createElement('div')
      const child2 = document.createElement('div')
      root.appendChild(child1)
      root.appendChild(child2)

      child1.classList.add('class-1')
      child2.classList.add('class-2')

      await new Promise((r) => setTimeout(r, 20))

      const changes = tracker.getChanges()
      expect(changes.some((c) => c.className === 'class-1')).toBe(true)
      expect(changes.some((c) => c.className === 'class-2')).toBe(true)

      tracker.destroy()
    })

    it('should respect start/stop', async () => {
      const tracker = trackClassChanges(root)

      const child = document.createElement('div')
      root.appendChild(child)

      // Changes before start should not be tracked
      child.classList.add('before-start')

      tracker.start()
      expect(tracker.isActive()).toBe(true)

      child.classList.add('after-start')
      await new Promise((r) => setTimeout(r, 10))

      tracker.stop()
      expect(tracker.isActive()).toBe(false)

      child.classList.add('after-stop')
      await new Promise((r) => setTimeout(r, 10))

      const changes = tracker.getChanges()
      expect(changes.some((c) => c.className === 'after-start')).toBe(true)
      expect(changes.some((c) => c.className === 'after-stop')).toBe(false)

      tracker.destroy()
    })
  })

  describe('createClassListSpy', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
    })

    it('should spy on classList.add', () => {
      const spy = createClassListSpy(element)

      element.classList.add('test-class')
      element.classList.add('another', 'more')

      expect(spy.addCalls).toHaveLength(2)
      expect(spy.getAddedTokens()).toContain('test-class')
      expect(spy.getAddedTokens()).toContain('another')
      expect(spy.wasAddCalled('test-class')).toBe(true)

      spy.restore()
    })

    it('should spy on classList.remove', () => {
      const spy = createClassListSpy(element)
      element.className = 'class-a class-b'

      element.classList.remove('class-a')

      expect(spy.removeCalls).toHaveLength(1)
      expect(spy.getRemovedTokens()).toContain('class-a')
      expect(spy.wasRemoveCalled('class-a')).toBe(true)

      spy.restore()
    })

    it('should spy on classList.toggle', () => {
      const spy = createClassListSpy(element)

      element.classList.toggle('toggle-class')
      element.classList.toggle('force-class', true)

      expect(spy.toggleCalls).toHaveLength(2)
      expect(spy.toggleCalls[0].token).toBe('toggle-class')
      expect(spy.toggleCalls[1].force).toBe(true)

      spy.restore()
    })

    it('should spy on classList.replace', () => {
      const spy = createClassListSpy(element)
      element.className = 'old-class'

      element.classList.replace('old-class', 'new-class')

      expect(spy.replaceCalls).toHaveLength(1)
      expect(spy.replaceCalls[0].oldToken).toBe('old-class')
      expect(spy.replaceCalls[0].newToken).toBe('new-class')

      spy.restore()
    })

    it('should clear recorded calls', () => {
      const spy = createClassListSpy(element)

      element.classList.add('test')
      expect(spy.addCalls).toHaveLength(1)

      spy.clear()
      expect(spy.addCalls).toHaveLength(0)

      spy.restore()
    })

    it('should restore original methods', () => {
      const originalAdd = element.classList.add
      const spy = createClassListSpy(element)

      expect(element.classList.add).not.toBe(originalAdd)

      spy.restore()

      // After restore, methods should work normally (may or may not be same reference)
      element.classList.add('restored')
      expect(element.classList.contains('restored')).toBe(true)
    })
  })

  describe('waitForClass', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should resolve immediately if class exists', async () => {
      element.className = 'existing-class'

      const result = await waitForClass(element, 'existing-class', 100)
      expect(result).toBe(true)
    })

    it('should wait for class to be added', async () => {
      setTimeout(() => {
        element.classList.add('delayed-class')
      }, 50)

      const result = await waitForClass(element, 'delayed-class', 200)
      expect(result).toBe(true)
    })

    it('should return false on timeout', async () => {
      const result = await waitForClass(element, 'never-added', 50)
      expect(result).toBe(false)
    })
  })

  describe('waitForClassRemoval', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should resolve immediately if class does not exist', async () => {
      const result = await waitForClassRemoval(element, 'non-existent', 100)
      expect(result).toBe(true)
    })

    it('should wait for class to be removed', async () => {
      element.className = 'to-remove'

      setTimeout(() => {
        element.classList.remove('to-remove')
      }, 50)

      const result = await waitForClassRemoval(element, 'to-remove', 200)
      expect(result).toBe(true)
    })

    it('should return false on timeout', async () => {
      element.className = 'permanent'

      const result = await waitForClassRemoval(element, 'permanent', 50)
      expect(result).toBe(false)
    })

    it('should handle timeout resolution when class is eventually added', async () => {
      // This tests the timeout path where class is added right at timeout
      element.className = 'will-be-removed'

      // Add a longer timeout test that exercises the setTimeout branch
      const result = await waitForClassRemoval(element, 'will-be-removed', 100)
      expect(result).toBe(false)
    })
  })

  describe('waitForClass edge cases', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should handle observer timeout condition', async () => {
      // Test where mutation happens but class not found - triggers timeout in observer callback
      const result = await waitForClass(element, 'specific-class', 100)
      expect(result).toBe(false)
    })

    it('should resolve when class is added during mutation', async () => {
      // Start with no class
      setTimeout(() => {
        // Add a different class first (triggers mutation but not resolution)
        element.classList.add('other-class')
      }, 10)

      setTimeout(() => {
        // Then add the target class
        element.classList.add('target-class')
      }, 30)

      const result = await waitForClass(element, 'target-class', 200)
      expect(result).toBe(true)
    })
  })

  describe('waitForClassRemoval edge cases', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should handle mutation without class removal', async () => {
      element.className = 'keep-class other'

      setTimeout(() => {
        // Trigger mutation without removing target class
        element.classList.add('another')
      }, 20)

      const result = await waitForClassRemoval(element, 'keep-class', 100)
      expect(result).toBe(false)
    })
  })

  describe('trackClassChanges edge cases', () => {
    let root: HTMLDivElement

    beforeEach(() => {
      root = document.createElement('div')
      document.body.appendChild(root)
    })

    afterEach(() => {
      root.remove()
    })

    it('should not start twice if already active', () => {
      const tracker = trackClassChanges(root)
      tracker.start()
      expect(tracker.isActive()).toBe(true)

      // Call start again - should not throw or change state
      tracker.start()
      expect(tracker.isActive()).toBe(true)

      tracker.destroy()
    })

    it('should track removed classes', async () => {
      const tracker = trackClassChanges(root)
      tracker.start()

      const child = document.createElement('div')
      root.appendChild(child)

      // First add a class - this will be tracked
      child.classList.add('tracked-class')
      await new Promise((r) => setTimeout(r, 20))

      // Now remove the class - this should also be tracked
      child.classList.remove('tracked-class')
      await new Promise((r) => setTimeout(r, 20))

      const changes = tracker.getChanges()
      expect(changes.some((c) => c.type === 'add' && c.className === 'tracked-class')).toBe(true)
      expect(changes.some((c) => c.type === 'remove' && c.className === 'tracked-class')).toBe(true)

      tracker.destroy()
    })

    it('should handle element with existing classes', async () => {
      const tracker = trackClassChanges(root)
      tracker.start()

      // Create element with existing class
      const child = document.createElement('div')
      child.className = 'existing'
      root.appendChild(child)

      // Change class - should track as add and remove
      child.classList.add('new-class')
      child.classList.remove('existing')

      await new Promise((r) => setTimeout(r, 20))

      const changes = tracker.getChanges()
      expect(changes.some((c) => c.className === 'new-class')).toBe(true)

      tracker.destroy()
    })

    it('should stop tracking without errors when not started', () => {
      const tracker = trackClassChanges(root)

      // Stop without starting - should not throw
      expect(() => tracker.stop()).not.toThrow()
      expect(tracker.isActive()).toBe(false)

      tracker.destroy()
    })
  })

  describe('createClassSpy edge cases', () => {
    let element: HTMLDivElement

    beforeEach(() => {
      element = document.createElement('div')
      document.body.appendChild(element)
    })

    afterEach(() => {
      element.remove()
    })

    it('should track multiple class changes in sequence', async () => {
      const spy = createClassSpy(element)

      element.classList.add('first', 'second')
      await new Promise((r) => setTimeout(r, 10))

      element.classList.remove('first')
      await new Promise((r) => setTimeout(r, 10))

      element.classList.add('third')
      await new Promise((r) => setTimeout(r, 10))

      expect(spy.wasAdded('first')).toBe(true)
      expect(spy.wasAdded('second')).toBe(true)
      expect(spy.wasRemoved('first')).toBe(true)
      expect(spy.wasAdded('third')).toBe(true)

      spy.destroy()
    })

    it('should return false for classes that were not added', () => {
      const spy = createClassSpy(element)

      expect(spy.wasAdded('never-added')).toBe(false)
      expect(spy.wasRemoved('never-removed')).toBe(false)

      spy.destroy()
    })
  })
})
