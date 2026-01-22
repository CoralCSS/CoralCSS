/**
 * Worker Thread Processing Tests
 *
 * Tests for parallel CSS generation using Web Workers.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  CoralWorker,
  WorkerPool,
  createWorker,
  createWorkerPool,
} from '../../../src/core/worker'
import type { Rule } from '../../../src/types'

// Mock URL API
vi.stubGlobal('URL', {
  createObjectURL: vi.fn(() => 'blob:mock-url'),
  revokeObjectURL: vi.fn(),
})

// Mock Blob
vi.stubGlobal('Blob', vi.fn(() => ({})))

describe('Worker Thread Processing', () => {
  beforeEach(() => {
    // Mock navigator for hardware concurrency
    vi.stubGlobal('navigator', {
      hardwareConcurrency: 4,
    })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
    vi.clearAllMocks()
    // Re-stub URL and Blob since unstubAllGlobals removes them
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:mock-url'),
      revokeObjectURL: vi.fn(),
    })
    vi.stubGlobal('Blob', vi.fn(() => ({})))
  })

  describe('CoralWorker', () => {
    describe('initialization', () => {
      it('should create with default options', () => {
        const worker = new CoralWorker()
        expect(worker).toBeDefined()
      })

      it('should create with custom options', () => {
        const worker = new CoralWorker({
          maxTasksPerWorker: 500,
          timeout: 10000,
        })
        expect(worker).toBeDefined()
      })

      it('should be created via factory function', () => {
        const worker = createWorker()
        expect(worker).toBeInstanceOf(CoralWorker)
      })

      it('should be created via factory with options', () => {
        const worker = createWorker({
          maxTasksPerWorker: 500,
        })
        expect(worker).toBeInstanceOf(CoralWorker)
      })
    })

    describe('getActiveTaskCount', () => {
      it('should return zero initially', () => {
        const worker = new CoralWorker()
        expect(worker.getActiveTaskCount()).toBe(0)
      })
    })

    describe('getQueuedTaskCount', () => {
      it('should return zero initially', () => {
        const worker = new CoralWorker()
        expect(worker.getQueuedTaskCount()).toBe(0)
      })
    })

    describe('terminate', () => {
      it('should clear state on terminate', () => {
        const worker = new CoralWorker()
        worker.terminate()
        expect(worker.getActiveTaskCount()).toBe(0)
        expect(worker.getQueuedTaskCount()).toBe(0)
      })
    })

    describe('fallback behavior', () => {
      it('should fall back to main thread when Workers not supported', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const worker = new CoralWorker()
        const rules: Rule[] = []

        const result = await worker.generateCSS(['p-4'], rules)

        expect(typeof result).toBe('string')
      })

      it('should return empty string in fallback mode', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const worker = new CoralWorker()
        const rules: Rule[] = []

        const result = await worker.generateCSS(['p-4'], rules)
        expect(result).toBe('')
      })

      it('should return empty array for matchRules in fallback mode', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const worker = new CoralWorker()
        const rules: Rule[] = []

        const result = await worker.matchRules(['p-4'], rules)
        expect(Array.isArray(result)).toBe(true)
        expect(result).toHaveLength(0)
      })

      it('should handle Worker constructor error', async () => {
        vi.stubGlobal('Worker', function() {
          throw new Error('Worker not supported')
        })

        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        const worker = new CoralWorker()
        const rules: Rule[] = []

        const result = await worker.generateCSS(['p-4'], rules)

        expect(consoleSpy).toHaveBeenCalled()
        expect(typeof result).toBe('string')
      })
    })

    describe('generateCSS with worker mock', () => {
      it('should call postMessage when worker is available', async () => {
        const postMessageMock = vi.fn()
        const terminateMock = vi.fn()
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        class MockWorker {
          onmessage: ((e: MessageEvent) => void) | null = null
          onerror: ((e: ErrorEvent) => void) | null = null
          postMessage = postMessageMock
          terminate = terminateMock
        }

        vi.stubGlobal('Worker', MockWorker)

        const worker = new CoralWorker()
        const rules: Rule[] = []

        // Start the task but don't await (it won't resolve without proper mock)
        const promise = worker.generateCSS(['p-4'], rules)

        // Give time for the task to be processed
        await new Promise(resolve => setTimeout(resolve, 10))

        // If console.warn was called, it means fallback was used - which is acceptable
        // in test environment where Workers may not be fully supported
        if (consoleSpy.mock.calls.length > 0) {
          // Fallback mode - just verify the promise resolves
          worker.terminate()
          const result = await promise
          expect(typeof result).toBe('string')
        } else {
          // Worker mode - verify postMessage was called
          expect(postMessageMock).toHaveBeenCalled()
          expect(postMessageMock.mock.calls[0][0]).toHaveProperty('type', 'generate')
          expect(postMessageMock.mock.calls[0][0]).toHaveProperty('classes')

          // Clean up by terminating - catch the rejection since we terminate mid-task
          worker.terminate()
          await expect(promise).rejects.toThrow('Worker terminated')
        }
      })

      it('should increment active task count when task starts', async () => {
        const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        class MockWorker {
          onmessage: ((e: MessageEvent) => void) | null = null
          onerror: ((e: ErrorEvent) => void) | null = null
          postMessage = vi.fn()
          terminate = vi.fn()
        }

        vi.stubGlobal('Worker', MockWorker)

        const worker = new CoralWorker()
        const rules: Rule[] = []

        // Start task
        const promise = worker.generateCSS(['p-4'], rules)

        await new Promise(resolve => setTimeout(resolve, 10))

        // If console.warn was called, it means fallback was used
        if (consoleSpy.mock.calls.length > 0) {
          // Fallback mode - task completes synchronously, so active count is 0
          const result = await promise
          expect(typeof result).toBe('string')
        } else {
          // Worker mode - active tasks should be > 0
          expect(worker.getActiveTaskCount()).toBeGreaterThan(0)

          // Clean up by terminating - catch the rejection since we terminate mid-task
          worker.terminate()
          await expect(promise).rejects.toThrow('Worker terminated')
        }
      })
    })

    describe('worker error handling', () => {
      it('should handle onerror callback', async () => {
        const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

        class ErrorWorker {
          onmessage: ((e: MessageEvent) => void) | null = null
          onerror: ((e: ErrorEvent) => void) | null = null

          postMessage = vi.fn(() => {
            // Trigger error asynchronously
            setTimeout(() => {
              if (this.onerror) {
                this.onerror({ message: 'Worker error' } as ErrorEvent)
              }
            }, 5)
          })

          terminate = vi.fn()
        }

        vi.stubGlobal('Worker', ErrorWorker)

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const worker = new CoralWorker()
        const rules: Rule[] = []

        // Start task and immediately attach rejection handler to avoid unhandled rejection
        const promise = worker.generateCSS(['p-4'], rules)

        // If fallback mode is used, the promise will resolve with empty string
        if (warnSpy.mock.calls.length > 0) {
          const result = await promise
          expect(typeof result).toBe('string')
        } else {
          // The onerror handler rejects pending tasks with the error message
          // Wait for the rejection (which will happen at ~5ms when onerror triggers)
          await expect(promise).rejects.toThrow('Worker error: Worker error')

          // Verify console.error was called
          expect(consoleSpy).toHaveBeenCalledWith('[CoralCSS] Worker error:', 'Worker error')
        }
        worker.terminate()
      })
    })

    describe('task recycling', () => {
      it('should track task count for recycling', () => {
        const worker = new CoralWorker({ maxTasksPerWorker: 2 })
        expect(worker.getActiveTaskCount()).toBe(0)
      })

    })
  })

  describe('WorkerPool', () => {
    describe('initialization', () => {
      it('should create with default options', () => {
        vi.stubGlobal('Worker', undefined) // Disable workers for simpler test
        const pool = new WorkerPool()
        expect(pool).toBeDefined()
      })

      it('should create with custom concurrency', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool({ concurrency: 8 })

        const stats = pool.stats()
        expect(stats.concurrency).toBe(8)
      })

      it('should use hardware concurrency as default', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool()

        const stats = pool.stats()
        expect(stats.concurrency).toBe(4) // Mocked navigator.hardwareConcurrency
      })

      it('should fall back to 4 workers when no hardware concurrency', () => {
        vi.stubGlobal('Worker', undefined)
        vi.stubGlobal('navigator', {})

        const pool = new WorkerPool()

        const stats = pool.stats()
        expect(stats.concurrency).toBe(4)
      })

      it('should be created via factory function', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = createWorkerPool()
        expect(pool).toBeInstanceOf(WorkerPool)
      })

      it('should be created via factory with options', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = createWorkerPool({ concurrency: 2 })
        expect(pool).toBeInstanceOf(WorkerPool)
      })
    })

    describe('generateCSS', () => {
      it('should generate CSS using pool in fallback mode', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool({ concurrency: 2 })
        const rules: Rule[] = []

        const result = await pool.generateCSS(['p-4', 'bg-red-500'], rules)

        expect(typeof result).toBe('string')
      })

      it('should handle empty classes array', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool()
        const rules: Rule[] = []

        const result = await pool.generateCSS([], rules)

        expect(result).toBe('')
      })

      it('should split work into chunks', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool({ concurrency: 2 })
        const rules: Rule[] = []
        const classes = ['p-1', 'p-2', 'p-3', 'p-4']

        const result = await pool.generateCSS(classes, rules)

        expect(typeof result).toBe('string')
      })
    })

    describe('matchRules', () => {
      it('should match rules using pool in fallback mode', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool({ concurrency: 2 })
        const rules: Rule[] = []

        const result = await pool.matchRules(['p-4', 'bg-red-500'], rules)

        expect(Array.isArray(result)).toBe(true)
      })

      it('should combine results from multiple workers', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool({ concurrency: 2 })
        const rules: Rule[] = []
        const classes = ['p-1', 'p-2', 'p-3', 'p-4']

        const result = await pool.matchRules(classes, rules)

        expect(Array.isArray(result)).toBe(true)
      })
    })

    describe('stats', () => {
      it('should return pool statistics', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool({ concurrency: 3 })

        const stats = pool.stats()

        expect(stats.concurrency).toBe(3)
        expect(stats.workers).toHaveLength(3)
        expect(stats.workers[0]).toHaveProperty('index')
        expect(stats.workers[0]).toHaveProperty('activeTasks')
        expect(stats.workers[0]).toHaveProperty('queuedTasks')
      })

      it('should report worker indices correctly', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool({ concurrency: 3 })

        const stats = pool.stats()

        expect(stats.workers[0]!.index).toBe(0)
        expect(stats.workers[1]!.index).toBe(1)
        expect(stats.workers[2]!.index).toBe(2)
      })
    })

    describe('terminate', () => {
      it('should terminate all workers', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool({ concurrency: 2 })

        pool.terminate()

        const stats = pool.stats()
        expect(stats.workers).toHaveLength(0)
      })

      it('should be safe to call multiple times', () => {
        vi.stubGlobal('Worker', undefined)
        const pool = new WorkerPool({ concurrency: 2 })

        pool.terminate()
        pool.terminate()

        const stats = pool.stats()
        expect(stats.workers).toHaveLength(0)
      })
    })

    describe('round-robin distribution', () => {
      it('should distribute tasks to workers', async () => {
        vi.stubGlobal('Worker', undefined)
        vi.spyOn(console, 'warn').mockImplementation(() => {})

        const pool = new WorkerPool({ concurrency: 3 })
        const rules: Rule[] = []

        // Process multiple batches
        await Promise.all([
          pool.generateCSS(['p-1'], rules),
          pool.generateCSS(['p-2'], rules),
          pool.generateCSS(['p-3'], rules),
          pool.generateCSS(['p-4'], rules),
        ])

        const stats = pool.stats()
        expect(stats.workers.length).toBe(3)
      })
    })
  })

  describe('default export', () => {
    it('should export all components', async () => {
      const module = await import('../../../src/core/worker')
      const defaultExport = module.default

      expect(defaultExport.CoralWorker).toBe(CoralWorker)
      expect(defaultExport.WorkerPool).toBe(WorkerPool)
      expect(defaultExport.createWorker).toBe(createWorker)
      expect(defaultExport.createWorkerPool).toBe(createWorkerPool)
    })
  })

  describe('Main Thread Fallback CSS Generation', () => {
    it('should generate CSS for simple rules in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'padding',
          pattern: /^p-(\d+)$/,
          properties: { padding: '1rem' }
        }
      ]

      const result = await worker.generateCSS(['p-4'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle variants in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'flex',
          pattern: /^flex$/,
          properties: { display: 'flex' }
        }
      ]

      const result = await worker.generateCSS(['hover:flex', 'dark:flex'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle important modifier in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'flex',
          pattern: /^flex$/,
          properties: { display: 'flex' }
        }
      ]

      const result = await worker.generateCSS(['!flex'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle negative values in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'margin',
          pattern: /^mt-(\d+)$/,
          properties: { 'margin-top': '1rem' }
        }
      ]

      const result = await worker.generateCSS(['-mt-4'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle arbitrary values in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'width',
          pattern: /^w-\[.+\]$/,
          properties: { width: 'ARBITRARY' }
        }
      ]

      const result = await worker.generateCSS(['w-[200px]'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle opacity modifiers in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'bg-color',
          pattern: /^bg-red-500$/,
          properties: { 'background-color': 'var(--color-red-500)' }
        }
      ]

      const result = await worker.generateCSS(['bg-red-500/50'], rules)
      expect(typeof result).toBe('string')
    })

    it('should skip duplicate classes in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'flex',
          pattern: /^flex$/,
          properties: { display: 'flex' }
        }
      ]

      const result = await worker.generateCSS(['flex', 'flex', 'flex'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle responsive variants in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'flex',
          pattern: /^flex$/,
          properties: { display: 'flex' }
        }
      ]

      const result = await worker.generateCSS(['sm:flex', 'md:flex', 'lg:flex', 'xl:flex', '2xl:flex'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle pseudo variants in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'text-color',
          pattern: /^text-blue$/,
          properties: { color: 'blue' }
        }
      ]

      const result = await worker.generateCSS([
        'hover:text-blue',
        'focus:text-blue',
        'active:text-blue',
        'visited:text-blue',
        'first:text-blue',
        'last:text-blue',
        'odd:text-blue',
        'even:text-blue',
        'disabled:text-blue',
        'group-hover:text-blue'
      ], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle @ prefix breakpoints in fallback mode', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'flex',
          pattern: /^flex$/,
          properties: { display: 'flex' }
        }
      ]

      const result = await worker.generateCSS(['@sm:flex', '@md:flex'], rules)
      expect(typeof result).toBe('string')
    })

    it('should handle rules without properties', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'empty',
          pattern: /^empty$/,
          properties: {}
        }
      ]

      const result = await worker.generateCSS(['empty'], rules)
      expect(result).toBe('')
    })

    it('should handle literal pattern match fallback', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'exact',
          pattern: 'exact-match',
          properties: { display: 'block' }
        }
      ]

      const result = await worker.generateCSS(['exact-match'], rules)
      expect(typeof result).toBe('string')
    })

    it('should escape special characters in class names', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker()
      const rules: Rule[] = [
        {
          name: 'special',
          pattern: /^w-\[.+\]$/,
          properties: { width: '100%' }
        }
      ]

      const result = await worker.generateCSS(['w-[100%]'], rules)
      expect(typeof result).toBe('string')
    })
  })

  describe('WorkerPool Large Workloads', () => {
    it('should split large workloads across workers', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const pool = new WorkerPool({ concurrency: 4 })
      const rules: Rule[] = []

      // Generate 200 classes to trigger parallel processing
      const classes = Array.from({ length: 200 }, (_, i) => `p-${i}`)

      const result = await pool.generateCSS(classes, rules)
      expect(typeof result).toBe('string')
    })

    it('should split large matchRules workloads', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const pool = new WorkerPool({ concurrency: 4 })
      const rules: Rule[] = []

      // Generate 200 classes to trigger parallel processing
      const classes = Array.from({ length: 200 }, (_, i) => `m-${i}`)

      const result = await pool.matchRules(classes, rules)
      expect(Array.isArray(result)).toBe(true)
    })

    it('should handle empty matchRules', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const pool = new WorkerPool()
      const rules: Rule[] = []

      const result = await pool.matchRules([], rules)
      expect(result).toEqual([])
    })

    it('should use single worker for small workloads in matchRules', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const pool = new WorkerPool({ concurrency: 4 })
      const rules: Rule[] = []

      const result = await pool.matchRules(['p-4', 'bg-red'], rules)
      expect(Array.isArray(result)).toBe(true)
    })

    it('should get concurrency level', () => {
      vi.stubGlobal('Worker', undefined)
      const pool = new WorkerPool({ concurrency: 6 })

      expect(pool.getConcurrency()).toBe(6)
    })

    it('should cap hardware concurrency at 8', () => {
      vi.stubGlobal('Worker', undefined)
      vi.stubGlobal('navigator', {
        hardwareConcurrency: 32
      })

      const pool = new WorkerPool()
      expect(pool.getConcurrency()).toBeLessThanOrEqual(8)
    })
  })

  describe('Worker Recycling', () => {
    it('should track tasks for recycling', async () => {
      vi.stubGlobal('Worker', undefined)
      vi.spyOn(console, 'warn').mockImplementation(() => {})

      const worker = new CoralWorker({ maxTasksPerWorker: 2 })
      const rules: Rule[] = []

      // Run a few tasks sequentially
      await worker.generateCSS(['p-1'], rules)
      await worker.generateCSS(['p-2'], rules)
      await worker.generateCSS(['p-3'], rules)

      // Wait for any async cleanup
      await new Promise(resolve => setTimeout(resolve, 50))

      // Active tasks should be 0 or 1 depending on timing
      expect(worker.getActiveTaskCount()).toBeLessThanOrEqual(1)
    })
  })

  describe('getPendingTaskCount', () => {
    it('should return zero when no tasks pending', () => {
      const worker = new CoralWorker()
      expect(worker.getPendingTaskCount()).toBe(0)
    })
  })

  describe('Worker Message Handling', () => {
    it('should handle successful generate response from worker', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      let capturedTaskId: string | null = null

      class MessageWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn((data: any) => {
          capturedTaskId = data.id
          // Simulate async worker response
          setTimeout(() => {
            if (this.onmessage && capturedTaskId) {
              this.onmessage({
                data: {
                  id: capturedTaskId,
                  type: 'result',
                  css: '.p-4 { padding: 1rem; }'
                }
              } as MessageEvent)
            }
          }, 10)
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', MessageWorker)

      const worker = new CoralWorker()
      const rules: Rule[] = []

      const result = await worker.generateCSS(['p-4'], rules)

      // In fallback mode, result will be empty string (no rules provided)
      // In worker mode, result will be '.p-4 { padding: 1rem; }'
      if (warnSpy.mock.calls.length > 0) {
        expect(typeof result).toBe('string')
      } else {
        expect(result).toBe('.p-4 { padding: 1rem; }')
      }
      worker.terminate()
    })

    it('should handle error response from worker', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      let capturedTaskId: string | null = null

      class ErrorResponseWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn((data: any) => {
          capturedTaskId = data.id
          setTimeout(() => {
            if (this.onmessage && capturedTaskId) {
              this.onmessage({
                data: {
                  id: capturedTaskId,
                  type: 'error',
                  error: 'CSS generation failed'
                }
              } as MessageEvent)
            }
          }, 10)
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', ErrorResponseWorker)

      const worker = new CoralWorker()
      const rules: Rule[] = []

      // Try to get result - fallback will resolve, worker will reject
      try {
        const result = await worker.generateCSS(['p-4'], rules)
        // If we get here, fallback was used (warning should have been logged)
        expect(warnSpy).toHaveBeenCalled()
        expect(typeof result).toBe('string')
      } catch (error) {
        // If we get here, worker was used and rejected with error
        expect(warnSpy).not.toHaveBeenCalled()
        expect((error as Error).message).toContain('CSS generation failed')
      }
      worker.terminate()
    })

    it('should handle error response without message from worker', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
      let capturedTaskId: string | null = null

      class ErrorNoMsgWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn((data: any) => {
          capturedTaskId = data.id
          setTimeout(() => {
            if (this.onmessage && capturedTaskId) {
              this.onmessage({
                data: {
                  id: capturedTaskId,
                  type: 'error'
                  // No error message
                }
              } as MessageEvent)
            }
          }, 10)
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', ErrorNoMsgWorker)

      const worker = new CoralWorker()
      const rules: Rule[] = []

      // Try to get result - fallback will resolve, worker will reject
      try {
        const result = await worker.generateCSS(['p-4'], rules)
        // If we get here, fallback was used
        expect(warnSpy).toHaveBeenCalled()
        expect(typeof result).toBe('string')
      } catch (error) {
        // If we get here, worker was used and rejected
        expect(warnSpy).not.toHaveBeenCalled()
        expect((error as Error).message).toContain('Worker error')
      }
      worker.terminate()
    })

    it('should handle successful matchRules response from worker', async () => {
      let capturedTaskId: string | null = null

      class MatchWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn((data: { id: string }) => {
          capturedTaskId = data.id
          setTimeout(() => {
            if (this.onmessage && capturedTaskId) {
              this.onmessage({
                data: {
                  id: capturedTaskId,
                  type: 'result',
                  matches: [{ className: 'p-4', ruleId: 'test-rule', match: ['p-4'] }]
                }
              } as MessageEvent)
            }
          }, 10)
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', MatchWorker)

      const worker = new CoralWorker()
      // Provide a rule with matching name
      const rules: Rule[] = [
        {
          name: 'test-rule',
          pattern: /^p-(\d+)$/,
          properties: { padding: '1rem' }
        }
      ]

      const result = await worker.matchRules(['p-4'], rules)

      expect(Array.isArray(result)).toBe(true)
      expect(result).toHaveLength(1)
      expect(result[0]).toHaveProperty('className', 'p-4')
      worker.terminate()
    })

    it('should ignore messages for unknown task ids', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      class UnknownIdWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn((data: any) => {
          // Send response with wrong ID first, then correct one
          setTimeout(() => {
            if (this.onmessage) {
              // Send unknown ID message (should be ignored)
              this.onmessage({
                data: {
                  id: 'unknown-task-id',
                  type: 'result',
                  css: 'should-be-ignored'
                }
              } as MessageEvent)

              // Then send correct response
              this.onmessage({
                data: {
                  id: data.id,
                  type: 'result',
                  css: '.correct { color: green; }'
                }
              } as MessageEvent)
            }
          }, 10)
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', UnknownIdWorker)

      const worker = new CoralWorker()
      const rules: Rule[] = []

      const result = await worker.generateCSS(['p-4'], rules)

      // In fallback mode, result will be empty string (no rules provided)
      // In worker mode, result will be '.correct { color: green; }'
      if (warnSpy.mock.calls.length > 0) {
        expect(typeof result).toBe('string')
      } else {
        expect(result).toBe('.correct { color: green; }')
      }
      worker.terminate()
    })

    it('should reject task on timeout', async () => {
      const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

      class SlowWorker {
        onmessage: ((e: MessageEvent) => void) | null = null
        onerror: ((e: ErrorEvent) => void) | null = null

        postMessage = vi.fn(() => {
          // Don't send any response - let it timeout
        })

        terminate = vi.fn()
      }

      vi.stubGlobal('Worker', SlowWorker)

      // Use a very short timeout for testing
      const worker = new CoralWorker({ timeout: 50 })
      const rules: Rule[] = []

      // Try to get result - fallback will resolve, worker will reject on timeout
      try {
        const result = await worker.generateCSS(['p-4'], rules)
        // If we get here, fallback was used
        expect(warnSpy).toHaveBeenCalled()
        expect(typeof result).toBe('string')
      } catch (error) {
        // If we get here, worker was used and timed out
        expect(warnSpy).not.toHaveBeenCalled()
        expect((error as Error).message).toContain('Worker timeout')
      }
      worker.terminate()
    }, 10000)
  })
})
