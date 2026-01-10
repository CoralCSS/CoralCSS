/**
 * CoralCSS Class Spy Utilities
 *
 * Tools for tracking and spying on class changes in tests.
 * @module testing/spy
 */

/**
 * Class change event
 */
export interface ClassChangeEvent {
  /** Type of change */
  type: 'add' | 'remove' | 'toggle'
  /** Class name that changed */
  className: string
  /** Element that was modified */
  element: Element
  /** Timestamp of the change */
  timestamp: number
  /** Previous class list */
  previousClasses: string[]
  /** Current class list */
  currentClasses: string[]
}

/**
 * Class spy interface
 */
export interface ClassSpy {
  /** All recorded events */
  events: ClassChangeEvent[]
  /** Get events for a specific class */
  getEventsForClass: (className: string) => ClassChangeEvent[]
  /** Get events for a specific element */
  getEventsForElement: (element: Element) => ClassChangeEvent[]
  /** Check if a class was added */
  wasAdded: (className: string) => boolean
  /** Check if a class was removed */
  wasRemoved: (className: string) => boolean
  /** Get the number of times a class was toggled */
  getToggleCount: (className: string) => number
  /** Clear all recorded events */
  clear: () => void
  /** Stop spying and cleanup */
  destroy: () => void
}

/**
 * Class change tracker interface
 */
export interface ClassChangeTracker {
  /** Start tracking changes */
  start: () => void
  /** Stop tracking changes */
  stop: () => void
  /** Get all tracked changes */
  getChanges: () => ClassChangeEvent[]
  /** Check if tracking is active */
  isActive: () => boolean
  /** Destroy the tracker */
  destroy: () => void
}

/**
 * Create a spy for tracking class changes on elements
 *
 * @example
 * ```typescript
 * const spy = createClassSpy(element)
 *
 * // Make some changes
 * element.classList.add('bg-red-500')
 * element.classList.remove('bg-blue-500')
 *
 * // Check what happened
 * expect(spy.wasAdded('bg-red-500')).toBe(true)
 * expect(spy.wasRemoved('bg-blue-500')).toBe(true)
 *
 * // Cleanup
 * spy.destroy()
 * ```
 */
export function createClassSpy(element: Element): ClassSpy {
  const events: ClassChangeEvent[] = []
  let observer: MutationObserver | null = null
  let previousClasses = Array.from(element.classList)

  // Setup mutation observer
  if (typeof MutationObserver !== 'undefined') {
    observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
          const currentClasses = Array.from(element.classList)

          // Find added classes
          for (const cls of currentClasses) {
            if (!previousClasses.includes(cls)) {
              events.push({
                type: 'add',
                className: cls,
                element,
                timestamp: Date.now(),
                previousClasses: [...previousClasses],
                currentClasses: [...currentClasses],
              })
            }
          }

          // Find removed classes
          for (const cls of previousClasses) {
            if (!currentClasses.includes(cls)) {
              events.push({
                type: 'remove',
                className: cls,
                element,
                timestamp: Date.now(),
                previousClasses: [...previousClasses],
                currentClasses: [...currentClasses],
              })
            }
          }

          previousClasses = currentClasses
        }
      }
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  return {
    events,

    getEventsForClass(className: string): ClassChangeEvent[] {
      return events.filter((e) => e.className === className)
    },

    getEventsForElement(el: Element): ClassChangeEvent[] {
      return events.filter((e) => e.element === el)
    },

    wasAdded(className: string): boolean {
      return events.some((e) => e.type === 'add' && e.className === className)
    },

    wasRemoved(className: string): boolean {
      return events.some((e) => e.type === 'remove' && e.className === className)
    },

    getToggleCount(className: string): number {
      return events.filter((e) => e.className === className).length
    },

    clear(): void {
      events.length = 0
      previousClasses = Array.from(element.classList)
    },

    destroy(): void {
      if (observer) {
        observer.disconnect()
        observer = null
      }
    },
  }
}

/**
 * Track class changes across multiple elements
 *
 * @example
 * ```typescript
 * const tracker = trackClassChanges(document.body)
 * tracker.start()
 *
 * // Make changes to any element
 * someElement.classList.add('p-4')
 *
 * // Get all changes
 * const changes = tracker.getChanges()
 *
 * tracker.destroy()
 * ```
 */
export function trackClassChanges(
  root: Element | Document = typeof document !== 'undefined' ? document : null!
): ClassChangeTracker {
  const changes: ClassChangeEvent[] = []
  let observer: MutationObserver | null = null
  let isActive = false

  // Map to track previous classes for each element
  const previousClassesMap = new WeakMap<Element, string[]>()

  const handleMutation = (mutations: MutationRecord[]) => {
    for (const mutation of mutations) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const element = mutation.target as Element
        const currentClasses = Array.from(element.classList)
        const previousClasses = previousClassesMap.get(element) || []

        // Find added classes
        for (const cls of currentClasses) {
          if (!previousClasses.includes(cls)) {
            changes.push({
              type: 'add',
              className: cls,
              element,
              timestamp: Date.now(),
              previousClasses: [...previousClasses],
              currentClasses: [...currentClasses],
            })
          }
        }

        // Find removed classes
        for (const cls of previousClasses) {
          if (!currentClasses.includes(cls)) {
            changes.push({
              type: 'remove',
              className: cls,
              element,
              timestamp: Date.now(),
              previousClasses: [...previousClasses],
              currentClasses: [...currentClasses],
            })
          }
        }

        previousClassesMap.set(element, currentClasses)
      }
    }
  }

  return {
    start(): void {
      if (isActive || typeof MutationObserver === 'undefined' || !root) {
        return
      }

      observer = new MutationObserver(handleMutation)
      observer.observe(root, {
        attributes: true,
        attributeFilter: ['class'],
        subtree: true,
      })
      isActive = true
    },

    stop(): void {
      if (observer) {
        observer.disconnect()
      }
      isActive = false
    },

    getChanges(): ClassChangeEvent[] {
      return [...changes]
    },

    isActive(): boolean {
      return isActive
    },

    destroy(): void {
      this.stop()
      changes.length = 0
      observer = null
    },
  }
}

/**
 * Create a spy that intercepts classList methods
 *
 * @example
 * ```typescript
 * const spy = createClassListSpy(element)
 *
 * element.classList.add('test')
 *
 * expect(spy.addCalls).toContain('test')
 *
 * spy.restore()
 * ```
 */
export function createClassListSpy(element: Element) {
  const addCalls: string[][] = []
  const removeCalls: string[][] = []
  const toggleCalls: Array<{ token: string; force?: boolean }> = []
  const replaceCalls: Array<{ oldToken: string; newToken: string }> = []

  const originalAdd = element.classList.add.bind(element.classList)
  const originalRemove = element.classList.remove.bind(element.classList)
  const originalToggle = element.classList.toggle.bind(element.classList)
  const originalReplace = element.classList.replace.bind(element.classList)

  element.classList.add = (...tokens: string[]) => {
    addCalls.push(tokens)
    return originalAdd(...tokens)
  }

  element.classList.remove = (...tokens: string[]) => {
    removeCalls.push(tokens)
    return originalRemove(...tokens)
  }

  element.classList.toggle = (token: string, force?: boolean) => {
    toggleCalls.push({ token, force })
    return originalToggle(token, force)
  }

  element.classList.replace = (oldToken: string, newToken: string) => {
    replaceCalls.push({ oldToken, newToken })
    return originalReplace(oldToken, newToken)
  }

  return {
    addCalls,
    removeCalls,
    toggleCalls,
    replaceCalls,

    /** Get all tokens that were added */
    getAddedTokens(): string[] {
      return addCalls.flat()
    },

    /** Get all tokens that were removed */
    getRemovedTokens(): string[] {
      return removeCalls.flat()
    },

    /** Check if add was called with a specific token */
    wasAddCalled(token: string): boolean {
      return addCalls.some((tokens) => tokens.includes(token))
    },

    /** Check if remove was called with a specific token */
    wasRemoveCalled(token: string): boolean {
      return removeCalls.some((tokens) => tokens.includes(token))
    },

    /** Clear all recorded calls */
    clear(): void {
      addCalls.length = 0
      removeCalls.length = 0
      toggleCalls.length = 0
      replaceCalls.length = 0
    },

    /** Restore original methods */
    restore(): void {
      element.classList.add = originalAdd
      element.classList.remove = originalRemove
      element.classList.toggle = originalToggle
      element.classList.replace = originalReplace
    },
  }
}

/**
 * Utility to wait for a class to be added to an element
 */
export async function waitForClass(
  element: Element,
  className: string,
  timeout = 1000
): Promise<boolean> {
  if (element.classList.contains(className)) {
    return true
  }

  return new Promise((resolve) => {
    const startTime = Date.now()

    if (typeof MutationObserver === 'undefined') {
      resolve(false)
      return
    }

    const observer = new MutationObserver(() => {
      if (element.classList.contains(className)) {
        observer.disconnect()
        resolve(true)
      } else if (Date.now() - startTime > timeout) {
        observer.disconnect()
        resolve(false)
      }
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['class'],
    })

    // Also set a timeout in case the class is never added
    setTimeout(() => {
      observer.disconnect()
      resolve(element.classList.contains(className))
    }, timeout)
  })
}

/**
 * Utility to wait for a class to be removed from an element
 */
export async function waitForClassRemoval(
  element: Element,
  className: string,
  timeout = 1000
): Promise<boolean> {
  if (!element.classList.contains(className)) {
    return true
  }

  return new Promise((resolve) => {
    const startTime = Date.now()

    if (typeof MutationObserver === 'undefined') {
      resolve(false)
      return
    }

    const observer = new MutationObserver(() => {
      if (!element.classList.contains(className)) {
        observer.disconnect()
        resolve(true)
      } else if (Date.now() - startTime > timeout) {
        observer.disconnect()
        resolve(false)
      }
    })

    observer.observe(element, {
      attributes: true,
      attributeFilter: ['class'],
    })

    setTimeout(() => {
      observer.disconnect()
      resolve(!element.classList.contains(className))
    }, timeout)
  })
}
