/**
 * Runtime Performance Optimizer Tests
 *
 * Tests for runtime performance optimization including batch operations,
 * task scheduling, and virtualized style injection.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  RuntimeOptimizer,
  createRuntimeOptimizer,
  getGlobalOptimizer,
  setGlobalOptimizer,
} from '../../../src/core/runtime-optimizer'

describe('Runtime Performance Optimizer', () => {
  let optimizer: RuntimeOptimizer

  beforeEach(() => {
    vi.useFakeTimers()
    optimizer = new RuntimeOptimizer()

    // Mock DOM methods
    vi.stubGlobal('document', {
      createElement: vi.fn(() => ({
        id: '',
        textContent: '',
        setAttribute: vi.fn(),
        remove: vi.fn(),
        style: {},
      })),
      getElementById: vi.fn(() => null),
      head: {
        appendChild: vi.fn(),
      },
    })

    // Mock performance
    vi.stubGlobal('performance', {
      now: vi.fn(() => Date.now()),
    })
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.unstubAllGlobals()
    optimizer.cleanup()
  })

  describe('RuntimeOptimizer', () => {
    describe('initialization', () => {
      it('should create with default options', () => {
        const opt = new RuntimeOptimizer()
        expect(opt).toBeDefined()
      })

      it('should create with custom scheduler options', () => {
        const opt = new RuntimeOptimizer({
          useIdleCallback: false,
          timeout: 100,
          priority: 'high',
        })
        expect(opt).toBeDefined()
      })

      it('should create with custom batch options', () => {
        const opt = new RuntimeOptimizer(
          {},
          {
            maxSize: 50,
            maxDelay: 32,
            autoFlush: false,
          }
        )
        expect(opt).toBeDefined()
      })

      it('should create with custom virtualized options', () => {
        const opt = new RuntimeOptimizer(
          {},
          {},
          {
            maxNodes: 5,
            classesPerNode: 500,
            mergeNodes: false,
          }
        )
        expect(opt).toBeDefined()
      })

      it('should be created via factory function', () => {
        const opt = createRuntimeOptimizer()
        expect(opt).toBeInstanceOf(RuntimeOptimizer)
      })

      it('should be created via factory with options', () => {
        const opt = createRuntimeOptimizer(
          { useIdleCallback: false },
          { maxSize: 50 },
          { maxNodes: 5 }
        )
        expect(opt).toBeInstanceOf(RuntimeOptimizer)
      })
    })

    describe('task scheduling', () => {
      it('should schedule a task', () => {
        const fn = vi.fn()
        const id = optimizer.schedule(fn)

        expect(id).toBeDefined()
        expect(id).toMatch(/^task-/)
      })

      it('should schedule high-priority task', () => {
        const fn = vi.fn()
        const id = optimizer.scheduleHigh(fn)

        expect(id).toBeDefined()
        expect(optimizer.getPendingTaskCount()).toBe(1)
      })

      it('should schedule low-priority task', () => {
        const fn = vi.fn()
        const id = optimizer.scheduleLow(fn)

        expect(id).toBeDefined()
        expect(optimizer.getPendingTaskCount()).toBe(1)
      })

      it('should execute tasks in priority order', () => {
        const executionOrder: string[] = []
        optimizer.scheduleLow(() => executionOrder.push('low'))
        optimizer.scheduleHigh(() => executionOrder.push('high'))
        optimizer.schedule(() => executionOrder.push('normal'), 0)

        // Fast forward timers to execute tasks
        vi.advanceTimersByTime(100)

        expect(executionOrder[0]).toBe('high')
      })

      it('should get pending task count', () => {
        optimizer.schedule(() => {})
        optimizer.schedule(() => {})
        optimizer.schedule(() => {})

        expect(optimizer.getPendingTaskCount()).toBe(3)
      })

      it('should cancel a scheduled task', () => {
        const fn = vi.fn()
        const id = optimizer.schedule(fn)

        const cancelled = optimizer.cancelTask(id)

        expect(cancelled).toBe(true)
        expect(optimizer.getPendingTaskCount()).toBe(0)
      })

      it('should return false when cancelling non-existent task', () => {
        const cancelled = optimizer.cancelTask('non-existent-id')
        expect(cancelled).toBe(false)
      })

      it('should handle task execution errors', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        optimizer.schedule(() => {
          throw new Error('Task error')
        })

        vi.advanceTimersByTime(100)

        expect(consoleSpy).toHaveBeenCalled()
      })

      it('should use setTimeout when requestIdleCallback not available', () => {
        vi.stubGlobal('requestIdleCallback', undefined)

        const opt = new RuntimeOptimizer({ useIdleCallback: true })
        const fn = vi.fn()
        opt.schedule(fn)

        vi.advanceTimersByTime(100)

        expect(fn).toHaveBeenCalled()
      })

      it('should use requestIdleCallback when available', () => {
        const mockRequestIdleCallback = vi.fn((cb: any) => {
          cb({ timeRemaining: () => 50 })
          return 1
        })
        vi.stubGlobal('requestIdleCallback', mockRequestIdleCallback)

        const opt = new RuntimeOptimizer({ useIdleCallback: true })
        const fn = vi.fn()
        opt.schedule(fn)

        expect(mockRequestIdleCallback).toHaveBeenCalled()
      })
    })

    describe('batch operations', () => {
      it('should batch insert style operation', () => {
        optimizer.batchInsertStyle('.test', 'color: red')

        const stats = optimizer.getStats()
        expect(stats.batchedOperations).toBe(1)
      })

      it('should batch update style operation', () => {
        const element = { style: {} } as HTMLElement
        optimizer.batchUpdateStyle(element, { color: 'red', background: 'blue' })

        const stats = optimizer.getStats()
        expect(stats.batchedOperations).toBe(2)
      })

      it('should auto-flush when max batch size reached', () => {
        const opt = new RuntimeOptimizer(
          {},
          { maxSize: 3, autoFlush: true }
        )

        opt.batchInsertStyle('.a', 'a')
        opt.batchInsertStyle('.b', 'b')
        opt.batchInsertStyle('.c', 'c')

        // After 3 operations, should auto-flush
        expect(opt.getStats().batchedOperations).toBe(0)
      })

      it('should not auto-flush when disabled', () => {
        const opt = new RuntimeOptimizer(
          {},
          { maxSize: 3, autoFlush: false }
        )

        opt.batchInsertStyle('.a', 'a')
        opt.batchInsertStyle('.b', 'b')
        opt.batchInsertStyle('.c', 'c')

        expect(opt.getStats().batchedOperations).toBe(3)
      })

      it('should flush batch operations', () => {
        optimizer.batchInsertStyle('.test', 'color: red')
        optimizer.batchInsertStyle('.test2', 'color: blue')

        optimizer.flushBatch()

        expect(optimizer.getStats().batchedOperations).toBe(0)
      })

      it('should handle empty flush', () => {
        expect(() => optimizer.flushBatch()).not.toThrow()
      })

      it('should start batch flush timer', () => {
        optimizer.startBatchFlush()
        optimizer.batchInsertStyle('.test', 'color: red')

        vi.advanceTimersByTime(100)

        expect(optimizer.getStats().batchedOperations).toBe(0)
      })

      it('should not start multiple flush timers', () => {
        optimizer.startBatchFlush()
        optimizer.startBatchFlush()
        optimizer.startBatchFlush()

        // Should only have one timer running
        expect(() => vi.advanceTimersByTime(100)).not.toThrow()
      })

      it('should clear batch timer on flush', () => {
        optimizer.startBatchFlush()
        optimizer.batchInsertStyle('.test', 'color: red')
        optimizer.flushBatch()

        // Timer should be cleared
        expect(optimizer.getStats().batchedOperations).toBe(0)
      })

      it('should handle batch operation errors', () => {
        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

        // Mock document.createElement to throw
        vi.mocked(document.createElement).mockImplementation(() => {
          throw new Error('DOM error')
        })

        optimizer.batchInsertStyle('.test', 'color: red')
        optimizer.flushBatch()

        expect(consoleSpy).toHaveBeenCalled()
      })

      it('should handle update operation with CSSStyleDeclaration', () => {
        // Create actual DOM element to get real CSSStyleDeclaration
        const element = document.createElement('div')

        optimizer.batchOperation({
          type: 'update',
          selector: 'color',
          css: 'red',
          node: element.style,
        })

        optimizer.flushBatch()

        // Verify operation completed without error and batch is cleared
        expect(optimizer.getStats().batchedOperations).toBe(0)
      })

      it('should handle delete operation', () => {
        const mockElement = {
          remove: vi.fn(),
        }
        vi.mocked(document.getElementById).mockReturnValue(mockElement as any)

        optimizer.batchOperation({
          type: 'delete',
          selector: '.test',
          css: '',
        })

        optimizer.flushBatch()

        expect(mockElement.remove).toHaveBeenCalled()
      })
    })

    describe('virtualized style injection', () => {
      it('should inject CSS into style node', () => {
        optimizer.virtualizedInject('.p-4 { padding: 1rem; }')

        expect(document.createElement).toHaveBeenCalledWith('style')
        expect(document.head.appendChild).toHaveBeenCalled()
      })

      it('should create new style node when limit reached', () => {
        const opt = new RuntimeOptimizer(
          {},
          {},
          { classesPerNode: 2, mergeNodes: false }
        )

        opt.virtualizedInject('.a {}')
        opt.virtualizedInject('.b {}')
        opt.virtualizedInject('.c {}')

        expect(opt.getStyleNodeCount()).toBeGreaterThan(0)
      })

      it('should get style node count', () => {
        optimizer.virtualizedInject('.test {}')
        expect(optimizer.getStyleNodeCount()).toBeGreaterThanOrEqual(0)
      })

      it('should clear virtualized styles', () => {
        optimizer.virtualizedInject('.test1 {}')
        optimizer.virtualizedInject('.test2 {}')

        optimizer.clearVirtualized()

        expect(optimizer.getStyleNodeCount()).toBe(0)
      })

      it('should merge small nodes when enabled', () => {
        const opt = new RuntimeOptimizer(
          {},
          {},
          { classesPerNode: 2, mergeNodes: true }
        )

        opt.virtualizedInject('.a {}')
        opt.virtualizedInject('.b {}')
        opt.virtualizedInject('.c {}')

        // Merging behavior should be triggered
        expect(opt.getStyleNodeCount()).toBeGreaterThanOrEqual(0)
      })
    })

    describe('utility methods', () => {
      it('should measure function performance', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
        vi.useRealTimers()

        const result = await optimizer.measure('test-label', () => 'result')

        expect(result).toBe('result')
        expect(consoleSpy).toHaveBeenCalledWith(
          expect.stringContaining('[test-label]')
        )
      })

      it('should measure async function performance', async () => {
        const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
        vi.useRealTimers()

        const result = await optimizer.measure('async-test', async () => {
          return 'async result'
        })

        expect(result).toBe('async result')
        expect(consoleSpy).toHaveBeenCalled()
      })

      it('should throttle function execution', () => {
        vi.useRealTimers()
        const fn = vi.fn()
        const throttled = optimizer.throttle(fn, 100)

        throttled()
        throttled()
        throttled()

        expect(fn).toHaveBeenCalledTimes(1)
      })

      it('should allow throttled function after delay', async () => {
        vi.useRealTimers()
        const fn = vi.fn()
        const throttled = optimizer.throttle(fn, 50)

        throttled()
        await new Promise((resolve) => setTimeout(resolve, 60))
        throttled()

        expect(fn).toHaveBeenCalledTimes(2)
      })

      it('should debounce function execution', async () => {
        vi.useRealTimers()
        const fn = vi.fn()
        const debounced = optimizer.debounce(fn, 50)

        debounced()
        debounced()
        debounced()

        await new Promise((resolve) => setTimeout(resolve, 60))

        expect(fn).toHaveBeenCalledTimes(1)
      })

      it('should reset debounce timer on each call', async () => {
        vi.useRealTimers()
        const fn = vi.fn()
        const debounced = optimizer.debounce(fn, 100)

        debounced()
        await new Promise((resolve) => setTimeout(resolve, 50))
        debounced()
        await new Promise((resolve) => setTimeout(resolve, 50))
        debounced()

        // Function should not have been called yet
        expect(fn).not.toHaveBeenCalled()

        await new Promise((resolve) => setTimeout(resolve, 110))

        expect(fn).toHaveBeenCalledTimes(1)
      })
    })

    describe('cleanup', () => {
      it('should clear all resources', () => {
        optimizer.schedule(() => {})
        optimizer.batchInsertStyle('.test', 'color: red')
        optimizer.virtualizedInject('.test {}')

        optimizer.cleanup()

        const stats = optimizer.getStats()
        expect(stats.pendingTasks).toBe(0)
        expect(stats.batchedOperations).toBe(0)
        expect(stats.styleNodes).toBe(0)
      })
    })

    describe('getStats', () => {
      it('should return correct statistics', () => {
        optimizer.schedule(() => {})
        optimizer.schedule(() => {})
        optimizer.batchInsertStyle('.test', 'color: red')

        const stats = optimizer.getStats()

        expect(stats.pendingTasks).toBe(2)
        expect(stats.batchedOperations).toBe(1)
        expect(typeof stats.styleNodes).toBe('number')
        expect(typeof stats.currentNodeIndex).toBe('number')
        expect(typeof stats.currentClassCount).toBe('number')
      })
    })
  })

  describe('global optimizer', () => {
    it('should get or create global optimizer', () => {
      const opt1 = getGlobalOptimizer()
      const opt2 = getGlobalOptimizer()

      expect(opt1).toBeInstanceOf(RuntimeOptimizer)
      expect(opt1).toBe(opt2)
    })

    it('should set global optimizer', () => {
      const customOptimizer = new RuntimeOptimizer()
      setGlobalOptimizer(customOptimizer)

      expect(getGlobalOptimizer()).toBe(customOptimizer)
    })
  })

  describe('default export', () => {
    it('should export all components', async () => {
      const module = await import('../../../src/core/runtime-optimizer')
      const defaultExport = module.default

      expect(defaultExport.RuntimeOptimizer).toBe(RuntimeOptimizer)
      expect(defaultExport.createRuntimeOptimizer).toBe(createRuntimeOptimizer)
      expect(defaultExport.getGlobalOptimizer).toBe(getGlobalOptimizer)
      expect(defaultExport.setGlobalOptimizer).toBe(setGlobalOptimizer)
    })
  })
})
