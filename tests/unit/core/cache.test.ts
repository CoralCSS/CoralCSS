/**
 * CSS Cache Tests
 */
import { describe, it, expect, beforeEach } from 'vitest'
import { CSSCache, createCache } from '../../../src/core/cache'

describe('CSSCache', () => {
  let cache: CSSCache

  beforeEach(() => {
    cache = new CSSCache()
  })

  describe('initialization', () => {
    it('should create empty cache', () => {
      expect(cache.size).toBe(0)
    })

    it('should create cache via factory function', () => {
      const c = createCache()
      expect(c).toBeInstanceOf(CSSCache)
      expect(c.size).toBe(0)
    })

    it('should have zero hits and misses initially', () => {
      const stats = cache.stats()
      expect(stats.hits).toBe(0)
      expect(stats.misses).toBe(0)
    })
  })

  describe('set', () => {
    it('should store CSS for a class name', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      expect(cache.has('p-4')).toBe(true)
    })

    it('should overwrite existing entry', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      cache.set('p-4', '.p-4 { padding: 16px; }')
      expect(cache.get('p-4')).toBe('.p-4 { padding: 16px; }')
    })
  })

  describe('get', () => {
    it('should return cached CSS', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      expect(cache.get('p-4')).toBe('.p-4 { padding: 1rem; }')
    })

    it('should return undefined for missing entry', () => {
      expect(cache.get('missing')).toBeUndefined()
    })

    it('should increment hits on cache hit', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('p-4')
      expect(cache.stats().hits).toBe(2)
    })

    it('should increment misses on cache miss', () => {
      cache.get('missing')
      cache.get('also-missing')
      expect(cache.stats().misses).toBe(2)
    })
  })

  describe('has', () => {
    it('should return true for existing entry', () => {
      cache.set('p-4', '.p-4 {}')
      expect(cache.has('p-4')).toBe(true)
    })

    it('should return false for missing entry', () => {
      expect(cache.has('missing')).toBe(false)
    })
  })

  describe('delete', () => {
    it('should remove entry from cache', () => {
      cache.set('p-4', '.p-4 {}')
      expect(cache.has('p-4')).toBe(true)

      const result = cache.delete('p-4')
      expect(result).toBe(true)
      expect(cache.has('p-4')).toBe(false)
    })

    it('should return false when deleting non-existent entry', () => {
      const result = cache.delete('missing')
      expect(result).toBe(false)
    })
  })

  describe('clear', () => {
    it('should remove all entries', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')
      cache.set('w-full', '.w-full {}')

      cache.clear()

      expect(cache.size).toBe(0)
    })

    it('should reset hits and misses', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('missing')

      cache.clear()

      const stats = cache.stats()
      expect(stats.hits).toBe(0)
      expect(stats.misses).toBe(0)
    })
  })

  describe('stats', () => {
    it('should return correct stats', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')
      cache.get('p-4') // hit
      cache.get('missing') // miss

      const stats = cache.stats()
      expect(stats.hits).toBe(1)
      expect(stats.misses).toBe(1)
      expect(stats.size).toBe(2)
    })
  })

  describe('entries', () => {
    it('should return iterator of all entries', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const entries = Array.from(cache.entries())
      expect(entries).toHaveLength(2)
      expect(entries).toContainEqual(['p-4', '.p-4 {}'])
      expect(entries).toContainEqual(['m-4', '.m-4 {}'])
    })

    it('should return empty iterator for empty cache', () => {
      const entries = Array.from(cache.entries())
      expect(entries).toHaveLength(0)
    })
  })

  describe('keys', () => {
    it('should return iterator of all keys', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const keys = Array.from(cache.keys())
      expect(keys).toHaveLength(2)
      expect(keys).toContain('p-4')
      expect(keys).toContain('m-4')
    })
  })

  describe('values', () => {
    it('should return iterator of all values', () => {
      cache.set('p-4', '.p-4 { padding: 1rem; }')
      cache.set('m-4', '.m-4 { margin: 1rem; }')

      const values = Array.from(cache.values())
      expect(values).toHaveLength(2)
      expect(values).toContain('.p-4 { padding: 1rem; }')
      expect(values).toContain('.m-4 { margin: 1rem; }')
    })
  })

  describe('size', () => {
    it('should return number of entries', () => {
      expect(cache.size).toBe(0)

      cache.set('p-4', '.p-4 {}')
      expect(cache.size).toBe(1)

      cache.set('m-4', '.m-4 {}')
      expect(cache.size).toBe(2)

      cache.delete('p-4')
      expect(cache.size).toBe(1)
    })
  })

  describe('getMany', () => {
    it('should return map of cached values', () => {
      cache.set('p-4', '.p-4 {}')
      cache.set('m-4', '.m-4 {}')

      const result = cache.getMany(['p-4', 'm-4', 'missing'])

      expect(result.size).toBe(2)
      expect(result.get('p-4')).toBe('.p-4 {}')
      expect(result.get('m-4')).toBe('.m-4 {}')
      expect(result.has('missing')).toBe(false)
    })

    it('should update hit/miss stats', () => {
      cache.set('p-4', '.p-4 {}')
      cache.getMany(['p-4', 'missing'])

      const stats = cache.stats()
      expect(stats.hits).toBe(1)
      expect(stats.misses).toBe(1)
    })

    it('should return empty map for empty input', () => {
      const result = cache.getMany([])
      expect(result.size).toBe(0)
    })
  })

  describe('setMany', () => {
    it('should set multiple entries from Map', () => {
      const entries = new Map([
        ['p-4', '.p-4 {}'],
        ['m-4', '.m-4 {}'],
      ])

      cache.setMany(entries)

      expect(cache.get('p-4')).toBe('.p-4 {}')
      expect(cache.get('m-4')).toBe('.m-4 {}')
    })

    it('should set multiple entries from array', () => {
      const entries: Array<[string, string]> = [
        ['p-4', '.p-4 {}'],
        ['m-4', '.m-4 {}'],
      ]

      cache.setMany(entries)

      expect(cache.get('p-4')).toBe('.p-4 {}')
      expect(cache.get('m-4')).toBe('.m-4 {}')
    })
  })

  describe('getHitRate', () => {
    it('should return 0 when no operations', () => {
      expect(cache.getHitRate()).toBe(0)
    })

    it('should return correct hit rate', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4') // hit
      cache.get('missing') // miss

      expect(cache.getHitRate()).toBe(50)
    })

    it('should return 100 for all hits', () => {
      cache.set('p-4', '.p-4 {}')
      cache.get('p-4')
      cache.get('p-4')
      cache.get('p-4')

      expect(cache.getHitRate()).toBe(100)
    })

    it('should return 0 for all misses', () => {
      cache.get('missing1')
      cache.get('missing2')

      expect(cache.getHitRate()).toBe(0)
    })
  })

  describe('disabled cache', () => {
    let disabledCache: CSSCache

    beforeEach(() => {
      disabledCache = new CSSCache({ enabled: false })
    })

    it('should return undefined for get when disabled', () => {
      disabledCache.set('p-4', '.p-4 {}')
      expect(disabledCache.get('p-4')).toBeUndefined()
    })

    it('should not store values when disabled', () => {
      disabledCache.set('p-4', '.p-4 {}')
      expect(disabledCache.size).toBe(0)
    })

    it('should return false for has when disabled', () => {
      expect(disabledCache.has('p-4')).toBe(false)
    })

    it('should return empty iterator for entries when disabled', () => {
      const entries = Array.from(disabledCache.entries())
      expect(entries).toHaveLength(0)
    })

    it('should return empty iterator for keys when disabled', () => {
      const keys = Array.from(disabledCache.keys())
      expect(keys).toHaveLength(0)
    })

    it('should return empty iterator for values when disabled', () => {
      const values = Array.from(disabledCache.values())
      expect(values).toHaveLength(0)
    })
  })

  describe('TTL expiration', () => {
    let ttlCache: CSSCache

    beforeEach(() => {
      ttlCache = new CSSCache({ ttl: 50 })
    })

    it('should return undefined for expired entries on get', async () => {
      ttlCache.set('p-4', '.p-4 {}')
      expect(ttlCache.get('p-4')).toBe('.p-4 {}')

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(ttlCache.get('p-4')).toBeUndefined()
    })

    it('should return false for expired entries on has', async () => {
      ttlCache.set('p-4', '.p-4 {}')
      expect(ttlCache.has('p-4')).toBe(true)

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      expect(ttlCache.has('p-4')).toBe(false)
    })

    it('should skip expired entries in entries()', async () => {
      ttlCache.set('p-4', '.p-4 {}')
      ttlCache.set('m-4', '.m-4 {}')

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      const entries = Array.from(ttlCache.entries())
      expect(entries).toHaveLength(0)
    })

    it('should skip expired entries in keys()', async () => {
      ttlCache.set('p-4', '.p-4 {}')

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      const keys = Array.from(ttlCache.keys())
      expect(keys).toHaveLength(0)
    })

    it('should skip expired entries in values()', async () => {
      ttlCache.set('p-4', '.p-4 {}')

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      const values = Array.from(ttlCache.values())
      expect(values).toHaveLength(0)
    })
  })

  describe('cleanup', () => {
    it('should remove expired entries', async () => {
      const ttlCache = new CSSCache({ ttl: 50 })
      ttlCache.set('p-4', '.p-4 {}')
      ttlCache.set('m-4', '.m-4 {}')

      // Wait for expiration
      await new Promise(resolve => setTimeout(resolve, 100))

      const removed = ttlCache.cleanup()
      expect(removed).toBe(2)
    })

    it('should return 0 when no expired entries', () => {
      const ttlCache = new CSSCache({ ttl: 60000 })
      ttlCache.set('p-4', '.p-4 {}')

      const removed = ttlCache.cleanup()
      expect(removed).toBe(0)
    })

    it('should return 0 when TTL is Infinity', () => {
      const infiniteCache = new CSSCache({ ttl: Infinity })
      infiniteCache.set('p-4', '.p-4 {}')

      const removed = infiniteCache.cleanup()
      expect(removed).toBe(0)
    })
  })

  describe('LRU eviction', () => {
    it('should evict oldest entry when at max capacity', () => {
      const smallCache = new CSSCache({ maxSize: 3 })

      smallCache.set('a', 'css-a')
      smallCache.set('b', 'css-b')
      smallCache.set('c', 'css-c')

      // All should exist
      expect(smallCache.has('a')).toBe(true)
      expect(smallCache.has('b')).toBe(true)
      expect(smallCache.has('c')).toBe(true)

      // Add fourth item - should evict oldest (a)
      smallCache.set('d', 'css-d')

      expect(smallCache.has('a')).toBe(false)
      expect(smallCache.has('b')).toBe(true)
      expect(smallCache.has('c')).toBe(true)
      expect(smallCache.has('d')).toBe(true)
    })

    it('should update access order on get', () => {
      const smallCache = new CSSCache({ maxSize: 3 })

      smallCache.set('a', 'css-a')
      smallCache.set('b', 'css-b')
      smallCache.set('c', 'css-c')

      // Access 'a' to move it to most recent
      smallCache.get('a')

      // Add new item - should evict 'b' (now oldest)
      smallCache.set('d', 'css-d')

      expect(smallCache.has('a')).toBe(true)
      expect(smallCache.has('b')).toBe(false)
      expect(smallCache.has('c')).toBe(true)
      expect(smallCache.has('d')).toBe(true)
    })

    it('should not evict when updating existing key', () => {
      const smallCache = new CSSCache({ maxSize: 3 })

      smallCache.set('a', 'css-a')
      smallCache.set('b', 'css-b')
      smallCache.set('c', 'css-c')

      // Update existing key - should not evict
      smallCache.set('a', 'css-a-updated')

      expect(smallCache.size).toBe(3)
      expect(smallCache.get('a')).toBe('css-a-updated')
    })
  })

  describe('stats with TTL', () => {
    it('should report TTL as -1 when Infinity', () => {
      const infiniteCache = new CSSCache({ ttl: Infinity })
      const stats = infiniteCache.stats()
      expect(stats.ttl).toBe(-1)
    })

    it('should report actual TTL when set', () => {
      const ttlCache = new CSSCache({ ttl: 5000 })
      const stats = ttlCache.stats()
      expect(stats.ttl).toBe(5000)
    })

    it('should report maxSize', () => {
      const cache = new CSSCache({ maxSize: 500 })
      const stats = cache.stats()
      expect(stats.maxSize).toBe(500)
    })
  })

  describe('factory function', () => {
    it('should create cache with options', () => {
      const cache = createCache({ maxSize: 100, ttl: 5000, enabled: true })
      const stats = cache.stats()
      expect(stats.maxSize).toBe(100)
      expect(stats.ttl).toBe(5000)
    })
  })
})
