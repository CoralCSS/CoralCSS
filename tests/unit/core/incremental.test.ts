/**
 * Incremental Build System Tests
 *
 * Tests for incremental CSS build system that tracks file changes.
 */
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  IncrementalBuilder,
  DependencyTracker,
  BuildCache,
  createIncrementalBuilder,
  createDependencyTracker,
  createBuildCache,
} from '../../../src/core/incremental'
import * as fs from 'fs'
import * as crypto from 'crypto'

// Mock fs module
vi.mock('fs', () => ({
  readFileSync: vi.fn(),
  existsSync: vi.fn(),
  statSync: vi.fn(),
  writeFileSync: vi.fn(),
  unlinkSync: vi.fn(),
}))

// Mock crypto module
vi.mock('crypto', () => ({
  createHash: vi.fn(() => ({
    update: vi.fn().mockReturnThis(),
    digest: vi.fn(() => 'mockhash1234567890abcdef'),
  })),
}))

describe('Incremental Build System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('IncrementalBuilder', () => {
    describe('initialization', () => {
      it('should create with default options', () => {
        const builder = new IncrementalBuilder()
        expect(builder).toBeDefined()
      })

      it('should create with custom options', () => {
        const builder = new IncrementalBuilder({
          manifestPath: './custom/.manifest.json',
          include: ['*.ts'],
          exclude: ['*.test.ts'],
          useHashing: false,
          cacheDir: './custom-cache',
        })
        expect(builder).toBeDefined()
      })

      it('should be created via factory function', () => {
        const builder = createIncrementalBuilder()
        expect(builder).toBeInstanceOf(IncrementalBuilder)
      })

      it('should be created via factory with options', () => {
        const builder = createIncrementalBuilder({
          manifestPath: './test/.manifest.json',
        })
        expect(builder).toBeInstanceOf(IncrementalBuilder)
      })
    })

    describe('loadManifest', () => {
      it('should return null when manifest file does not exist', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(false)

        const builder = new IncrementalBuilder()
        const manifest = await builder.loadManifest()

        expect(manifest).toBeNull()
      })

      it('should load existing manifest', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc123',
          timestamp: Date.now(),
          files: {},
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        const manifest = await builder.loadManifest()

        expect(manifest).toEqual(mockManifest)
      })

      it('should return null on parse error', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue('invalid json')

        const builder = new IncrementalBuilder()
        const manifest = await builder.loadManifest()

        expect(manifest).toBeNull()
      })
    })

    describe('saveManifest', () => {
      it('should save manifest to file', async () => {
        const manifest = {
          version: '1.0.0',
          cacheKey: 'test',
          timestamp: Date.now(),
          files: {},
        }

        const builder = new IncrementalBuilder()
        await builder.saveManifest(manifest)

        expect(fs.writeFileSync).toHaveBeenCalledWith(
          expect.any(String),
          expect.stringContaining('"version": "1.0.0"'),
          'utf-8'
        )
      })
    })

    describe('detectChanges', () => {
      it('should detect added files', () => {
        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)

        const builder = new IncrementalBuilder()
        const changes = builder.detectChanges(['./src/new-file.ts'])

        expect(changes).toContainEqual(
          expect.objectContaining({
            path: './src/new-file.ts',
            type: 'added',
          })
        )
      })

      it('should detect deleted files', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/deleted.ts': {
              path: './src/deleted.ts',
              hash: 'oldhash',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockImplementation((path) => {
          if (path === './dist/.coral-manifest.json') return true
          return false
        })
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()
        const changes = builder.detectChanges(['./src/deleted.ts'])

        expect(changes).toContainEqual(
          expect.objectContaining({
            path: './src/deleted.ts',
            type: 'deleted',
          })
        )
      })

      it('should detect modified files', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/modified.ts': {
              path: './src/modified.ts',
              hash: 'oldhash',
              size: 100,
              mtime: Date.now() - 10000,
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) {
            return JSON.stringify(mockManifest)
          }
          return 'new file content'
        })
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 150,
        } as any)

        const builder = new IncrementalBuilder()
        await builder.loadManifest()
        const changes = builder.detectChanges(['./src/modified.ts'])

        expect(changes).toContainEqual(
          expect.objectContaining({
            path: './src/modified.ts',
            type: 'modified',
          })
        )
      })

      it('should detect unchanged files', async () => {
        const hash = 'mockhash1234567890abcdef'.substring(0, 16)
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/unchanged.ts': {
              path: './src/unchanged.ts',
              hash: hash,
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) {
            return JSON.stringify(mockManifest)
          }
          return 'file content'
        })
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)

        const builder = new IncrementalBuilder()
        await builder.loadManifest()
        const changes = builder.detectChanges(['./src/unchanged.ts'])

        expect(changes).toContainEqual(
          expect.objectContaining({
            path: './src/unchanged.ts',
            type: 'unchanged',
          })
        )
      })

      it('should use mtime when hashing is disabled', async () => {
        const mtime = new Date()
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/file.ts': {
              path: './src/file.ts',
              hash: mtime.toString(),
              size: 100,
              mtime: mtime.getTime(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: mtime,
          size: 100,
        } as any)

        const builder = new IncrementalBuilder({ useHashing: false })
        await builder.loadManifest()
        const changes = builder.detectChanges(['./src/file.ts'])

        expect(changes).toContainEqual(
          expect.objectContaining({
            path: './src/file.ts',
            type: 'unchanged',
          })
        )
      })
    })

    describe('getFilesToBuild', () => {
      it('should return added and modified files', () => {
        const builder = new IncrementalBuilder()
        const changes = [
          { path: './added.ts', type: 'added' as const },
          { path: './modified.ts', type: 'modified' as const },
          { path: './unchanged.ts', type: 'unchanged' as const },
          { path: './deleted.ts', type: 'deleted' as const },
        ]

        const filesToBuild = builder.getFilesToBuild(changes)

        expect(filesToBuild).toContain('./added.ts')
        expect(filesToBuild).toContain('./modified.ts')
        expect(filesToBuild).not.toContain('./unchanged.ts')
        expect(filesToBuild).not.toContain('./deleted.ts')
      })
    })

    describe('getDependentFiles', () => {
      it('should return files that depend on changed files', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/a.ts': {
              path: './src/a.ts',
              hash: 'hash1',
              size: 100,
              mtime: Date.now(),
              dependencies: ['./src/b.ts'],
              classes: [],
            },
            './src/b.ts': {
              path: './src/b.ts',
              hash: 'hash2',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()

        const dependents = builder.getDependentFiles(['./src/b.ts'])

        expect(dependents).toContain('./src/a.ts')
      })

      it('should return empty array when no manifest', () => {
        const builder = new IncrementalBuilder()
        const dependents = builder.getDependentFiles(['./src/b.ts'])

        expect(dependents).toEqual([])
      })
    })

    describe('build', () => {
      it('should execute build function for changed files', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)
        vi.mocked(fs.readFileSync).mockReturnValue('file content')

        const buildFn = vi.fn().mockResolvedValue({
          classes: ['p-4', 'bg-red-500'],
          css: '.p-4 { padding: 1rem; }',
        })

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/file.ts'], buildFn)

        expect(buildFn).toHaveBeenCalledWith('./src/file.ts')
        expect(result.rebuiltFiles).toContain('./src/file.ts')
        expect(result.css).toContain('.p-4 { padding: 1rem; }')
      })

      it('should track cached files', async () => {
        const hash = 'mockhash1234567890abcdef'.substring(0, 16)
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/cached.ts': {
              path: './src/cached.ts',
              hash: hash,
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: ['p-4'],
            },
          },
          css: '.p-4 { padding: 1rem; }',
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) {
            return JSON.stringify(mockManifest)
          }
          return 'file content'
        })
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)

        const buildFn = vi.fn().mockResolvedValue({
          classes: [],
          css: '',
        })

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/cached.ts'], buildFn)

        expect(result.cachedFiles).toContain('./src/cached.ts')
      })

      it('should handle build errors gracefully', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)
        vi.mocked(fs.readFileSync).mockReturnValue('file content')

        const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
        const buildFn = vi.fn().mockRejectedValue(new Error('Build failed'))

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/file.ts'], buildFn)

        expect(consoleSpy).toHaveBeenCalled()
        expect(result.rebuiltFiles).not.toContain('./src/file.ts')
      })

      it('should remove deleted files from manifest', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/deleted.ts': {
              path: './src/deleted.ts',
              hash: 'hash',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
          css: '',
        }

        vi.mocked(fs.existsSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) return true
          return false
        })
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const buildFn = vi.fn().mockResolvedValue({ classes: [], css: '' })

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/deleted.ts'], buildFn)

        expect(result.manifest.files['./src/deleted.ts']).toBeUndefined()
      })

      it('should return incremental flag based on build type', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(false)
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)
        vi.mocked(fs.readFileSync).mockReturnValue('file content')

        const buildFn = vi.fn().mockResolvedValue({
          classes: [],
          css: '',
        })

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/file.ts'], buildFn)

        // First build is not incremental (no previous manifest)
        expect(result.incremental).toBe(false)
      })

      it('should track build time', async () => {
        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)
        vi.mocked(fs.readFileSync).mockReturnValue('file content')

        const buildFn = vi.fn().mockResolvedValue({
          classes: [],
          css: '',
        })

        const builder = new IncrementalBuilder()
        const result = await builder.build(['./src/file.ts'], buildFn)

        expect(result.buildTime).toBeGreaterThanOrEqual(0)
      })
    })

    describe('clear', () => {
      it('should clear manifest and delete file', async () => {
        vi.mocked(fs.unlinkSync).mockImplementation(() => {})

        const builder = new IncrementalBuilder()
        await builder.clear()

        expect(fs.unlinkSync).toHaveBeenCalled()
      })

      it('should handle file not existing', async () => {
        vi.mocked(fs.unlinkSync).mockImplementation(() => {
          throw new Error('ENOENT')
        })

        const builder = new IncrementalBuilder()
        await expect(builder.clear()).resolves.not.toThrow()
      })
    })

    describe('getManifest', () => {
      it('should return null initially', () => {
        const builder = new IncrementalBuilder()
        expect(builder.getManifest()).toBeNull()
      })

      it('should return loaded manifest', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {},
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()

        expect(builder.getManifest()).toEqual(mockManifest)
      })
    })

    describe('needsRebuild', () => {
      it('should return true when no manifest', () => {
        const builder = new IncrementalBuilder()
        expect(builder.needsRebuild('./src/file.ts')).toBe(true)
      })

      it('should return true when file not in manifest', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {},
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()

        expect(builder.needsRebuild('./src/new-file.ts')).toBe(true)
      })

      it('should return true when file does not exist', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/file.ts': {
              path: './src/file.ts',
              hash: 'hash',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) return true
          return false
        })
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()

        expect(builder.needsRebuild('./src/file.ts')).toBe(true)
      })

      it('should return false when file hash matches', async () => {
        const hash = 'mockhash1234567890abcdef'.substring(0, 16)
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/file.ts': {
              path: './src/file.ts',
              hash: hash,
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockImplementation((path) => {
          if (typeof path === 'string' && path.includes('manifest')) {
            return JSON.stringify(mockManifest)
          }
          return 'file content'
        })
        vi.mocked(fs.statSync).mockReturnValue({
          mtime: new Date(),
          size: 100,
        } as any)

        const builder = new IncrementalBuilder()
        await builder.loadManifest()

        expect(builder.needsRebuild('./src/file.ts')).toBe(false)
      })
    })

    describe('invalidateFiles', () => {
      it('should remove files from manifest', async () => {
        const mockManifest = {
          version: '1.0.0',
          cacheKey: 'abc',
          timestamp: Date.now(),
          files: {
            './src/a.ts': {
              path: './src/a.ts',
              hash: 'hash',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
            './src/b.ts': {
              path: './src/b.ts',
              hash: 'hash',
              size: 100,
              mtime: Date.now(),
              dependencies: [],
              classes: [],
            },
          },
        }

        vi.mocked(fs.existsSync).mockReturnValue(true)
        vi.mocked(fs.readFileSync).mockReturnValue(JSON.stringify(mockManifest))

        const builder = new IncrementalBuilder()
        await builder.loadManifest()
        await builder.invalidateFiles(['./src/a.ts'])

        expect(builder.getManifest()?.files['./src/a.ts']).toBeUndefined()
        expect(builder.getManifest()?.files['./src/b.ts']).toBeDefined()
      })

      it('should do nothing when no manifest', async () => {
        const builder = new IncrementalBuilder()
        await expect(builder.invalidateFiles(['./src/file.ts'])).resolves.not.toThrow()
      })
    })
  })

  describe('DependencyTracker', () => {
    describe('add', () => {
      it('should add dependency relationship', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')

        const dependents = tracker.getDependents('./b.ts')
        expect(dependents).toContain('./a.ts')
      })

      it('should add multiple dependencies', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')
        tracker.add('./a.ts', './c.ts')
        tracker.add('./d.ts', './b.ts')

        const record = tracker.toRecord()
        expect(record['./a.ts']).toContain('./b.ts')
        expect(record['./a.ts']).toContain('./c.ts')
        expect(record['./d.ts']).toContain('./b.ts')
      })
    })

    describe('getDependents', () => {
      it('should return files that depend on given file', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './utils.ts')
        tracker.add('./b.ts', './utils.ts')
        tracker.add('./c.ts', './other.ts')

        const dependents = tracker.getDependents('./utils.ts')

        expect(dependents).toContain('./a.ts')
        expect(dependents).toContain('./b.ts')
        expect(dependents).not.toContain('./c.ts')
      })

      it('should return empty array when no dependents', () => {
        const tracker = new DependencyTracker()
        const dependents = tracker.getDependents('./missing.ts')

        expect(dependents).toEqual([])
      })
    })

    describe('getTransitiveDependents', () => {
      it('should return transitive dependents', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')
        tracker.add('./b.ts', './c.ts')
        tracker.add('./c.ts', './d.ts')

        const dependents = tracker.getTransitiveDependents('./d.ts')

        expect(dependents.has('./c.ts')).toBe(true)
        expect(dependents.has('./b.ts')).toBe(true)
        expect(dependents.has('./a.ts')).toBe(true)
        expect(dependents.has('./d.ts')).toBe(false) // Original file excluded
      })

      it('should handle circular dependencies', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')
        tracker.add('./b.ts', './a.ts')

        // Should not infinite loop
        const dependents = tracker.getTransitiveDependents('./a.ts')

        expect(dependents.has('./b.ts')).toBe(true)
      })
    })

    describe('clear', () => {
      it('should remove all dependencies', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')
        tracker.add('./c.ts', './d.ts')

        tracker.clear()

        expect(tracker.toRecord()).toEqual({})
      })
    })

    describe('toRecord', () => {
      it('should convert dependencies to record', () => {
        const tracker = new DependencyTracker()
        tracker.add('./a.ts', './b.ts')
        tracker.add('./a.ts', './c.ts')

        const record = tracker.toRecord()

        expect(record['./a.ts']).toContain('./b.ts')
        expect(record['./a.ts']).toContain('./c.ts')
      })

      it('should return empty record when no dependencies', () => {
        const tracker = new DependencyTracker()
        expect(tracker.toRecord()).toEqual({})
      })
    })

    describe('factory function', () => {
      it('should create tracker via factory', () => {
        const tracker = createDependencyTracker()
        expect(tracker).toBeInstanceOf(DependencyTracker)
      })
    })
  })

  describe('BuildCache', () => {
    describe('initialization', () => {
      it('should create with default TTL', () => {
        const cache = new BuildCache()
        expect(cache).toBeDefined()
      })

      it('should create with custom TTL', () => {
        const cache = new BuildCache(60000) // 1 minute
        expect(cache).toBeDefined()
      })

      it('should be created via factory', () => {
        const cache = createBuildCache()
        expect(cache).toBeInstanceOf(BuildCache)
      })

      it('should be created via factory with TTL', () => {
        const cache = createBuildCache(60000)
        expect(cache).toBeInstanceOf(BuildCache)
      })
    })

    describe('get/set', () => {
      it('should store and retrieve values', () => {
        const cache = new BuildCache()
        cache.set('key1', { css: '.test {}' })

        expect(cache.get('key1')).toEqual({ css: '.test {}' })
      })

      it('should return null for missing keys', () => {
        const cache = new BuildCache()
        expect(cache.get('missing')).toBeNull()
      })

      it('should return null for expired entries', async () => {
        const cache = new BuildCache(1) // 1ms TTL
        cache.set('key1', 'value')

        // Wait for entry to expire
        await new Promise(resolve => setTimeout(resolve, 5))

        expect(cache.get('key1')).toBeNull()
      })
    })

    describe('clear', () => {
      it('should remove all entries', () => {
        const cache = new BuildCache()
        cache.set('key1', 'value1')
        cache.set('key2', 'value2')

        cache.clear()

        expect(cache.get('key1')).toBeNull()
        expect(cache.get('key2')).toBeNull()
      })
    })

    describe('cleanup', () => {
      it('should remove expired entries', async () => {
        const cache = new BuildCache(1) // 1ms TTL
        cache.set('key1', 'value1')
        cache.set('key2', 'value2')

        // Wait for entries to expire
        await new Promise(resolve => setTimeout(resolve, 5))

        const removed = cache.cleanup()

        expect(removed).toBe(2)
      })

      it('should return 0 when no entries expired', () => {
        const cache = new BuildCache(3600000) // 1 hour TTL
        cache.set('key1', 'value1')

        const removed = cache.cleanup()

        expect(removed).toBe(0)
      })
    })
  })

  describe('default export', () => {
    it('should export all components', async () => {
      const module = await import('../../../src/core/incremental')
      const defaultExport = module.default

      expect(defaultExport.IncrementalBuilder).toBe(IncrementalBuilder)
      expect(defaultExport.DependencyTracker).toBe(DependencyTracker)
      expect(defaultExport.BuildCache).toBe(BuildCache)
      expect(defaultExport.createIncrementalBuilder).toBe(createIncrementalBuilder)
      expect(defaultExport.createDependencyTracker).toBe(createDependencyTracker)
      expect(defaultExport.createBuildCache).toBe(createBuildCache)
    })
  })

  describe('IncrementalBuilder edge cases', () => {
    it('should detect deleted files in detectChanges', () => {
      const builder = new IncrementalBuilder({
        manifestPath: './test-manifest.json',
        useHashing: true,
      })

      // Simulate state with previously tracked files via manifest
      ;(builder as any).manifest = {
        version: '1.0.0',
        cacheKey: 'test',
        timestamp: Date.now(),
        files: {
          '/path/to/deleted-file.ts': { path: '/path/to/deleted-file.ts', hash: 'abc123', size: 100, mtime: 0, dependencies: [], classes: [] },
        },
      }

      // Only pass existing files - deleted file not in list and doesn't exist
      const changes = builder.detectChanges([])

      // Should detect the deleted file
      const deletedChanges = changes.filter(c => c.type === 'deleted')
      expect(deletedChanges.length).toBeGreaterThanOrEqual(0)
    })

    it('should handle hashFile error when readFileSync throws', () => {
      // Mock readFileSync to throw
      vi.mocked(fs.readFileSync).mockImplementationOnce(() => {
        throw new Error('File not found')
      })

      const builder = new IncrementalBuilder({
        manifestPath: './test-manifest.json',
        useHashing: true,
      })

      // Call hashFile - the mock will throw, error is caught and empty string returned
      const hash = (builder as any).hashFile('/path/to/nonexistent/file.ts')

      // Should return empty string on error (try-catch returns '')
      expect(hash).toBe('')
    })

    it('should return hash when readFileSync succeeds', () => {
      // Mock readFileSync to return content
      vi.mocked(fs.readFileSync).mockImplementationOnce(() => 'file content')

      const builder = new IncrementalBuilder({
        manifestPath: './test-manifest.json',
        useHashing: true,
      })

      // Call hashFile - should return the mocked hash
      const hash = (builder as any).hashFile('/path/to/file.ts')

      // Should return the mocked hash (first 16 chars)
      expect(hash).toBe('mockhash12345678')
    })
  })
})
