//! High-performance caching for parsed classes and match results
//!
//! Uses a concurrent LRU cache with configurable size limits.

use ahash::AHashMap;
use std::sync::RwLock;
use std::collections::VecDeque;

/// LRU cache entry with access tracking
#[derive(Debug, Clone)]
struct CacheEntry<V> {
    value: V,
    hits: u64,
}

/// Thread-safe LRU cache with configurable capacity
pub struct LruCache<K, V> {
    /// Storage for cached values
    storage: RwLock<AHashMap<K, CacheEntry<V>>>,

    /// Order of keys for LRU eviction
    order: RwLock<VecDeque<K>>,

    /// Maximum number of entries
    capacity: usize,

    /// Cache statistics
    stats: RwLock<CacheStats>,
}

/// Cache statistics
#[derive(Debug, Default, Clone)]
pub struct CacheStats {
    pub hits: u64,
    pub misses: u64,
    pub evictions: u64,
    pub insertions: u64,
}

impl CacheStats {
    /// Calculate hit rate as percentage
    pub fn hit_rate(&self) -> f64 {
        let total = self.hits + self.misses;
        if total == 0 {
            0.0
        } else {
            (self.hits as f64 / total as f64) * 100.0
        }
    }
}

impl<K, V> LruCache<K, V>
where
    K: std::hash::Hash + Eq + Clone,
    V: Clone,
{
    /// Create a new LRU cache with the given capacity
    pub fn new(capacity: usize) -> Self {
        Self {
            storage: RwLock::new(AHashMap::with_capacity(capacity)),
            order: RwLock::new(VecDeque::with_capacity(capacity)),
            capacity,
            stats: RwLock::new(CacheStats::default()),
        }
    }

    /// Get a value from the cache
    pub fn get(&self, key: &K) -> Option<V> {
        let storage = self.storage.read().unwrap();

        if let Some(entry) = storage.get(key) {
            // Update stats
            if let Ok(mut stats) = self.stats.write() {
                stats.hits += 1;
            }

            // Update LRU order (move to back)
            if let Ok(mut order) = self.order.write() {
                if let Some(pos) = order.iter().position(|k| k == key) {
                    order.remove(pos);
                    order.push_back(key.clone());
                }
            }

            Some(entry.value.clone())
        } else {
            if let Ok(mut stats) = self.stats.write() {
                stats.misses += 1;
            }
            None
        }
    }

    /// Insert a value into the cache
    pub fn insert(&self, key: K, value: V) {
        let mut storage = self.storage.write().unwrap();
        let mut order = self.order.write().unwrap();

        // Check if key already exists
        if storage.contains_key(&key) {
            // Update existing entry
            storage.insert(
                key.clone(),
                CacheEntry { value, hits: 1 },
            );

            // Move to back of LRU queue
            if let Some(pos) = order.iter().position(|k| k == &key) {
                order.remove(pos);
                order.push_back(key);
            }
        } else {
            // Evict if at capacity
            while storage.len() >= self.capacity {
                if let Some(evict_key) = order.pop_front() {
                    storage.remove(&evict_key);
                    if let Ok(mut stats) = self.stats.write() {
                        stats.evictions += 1;
                    }
                } else {
                    break;
                }
            }

            // Insert new entry
            storage.insert(key.clone(), CacheEntry { value, hits: 1 });
            order.push_back(key);

            if let Ok(mut stats) = self.stats.write() {
                stats.insertions += 1;
            }
        }
    }

    /// Remove a value from the cache
    pub fn remove(&self, key: &K) -> Option<V> {
        let mut storage = self.storage.write().unwrap();
        let mut order = self.order.write().unwrap();

        if let Some(entry) = storage.remove(key) {
            if let Some(pos) = order.iter().position(|k| k == key) {
                order.remove(pos);
            }
            Some(entry.value)
        } else {
            None
        }
    }

    /// Clear all entries from the cache
    pub fn clear(&self) {
        let mut storage = self.storage.write().unwrap();
        let mut order = self.order.write().unwrap();

        storage.clear();
        order.clear();
    }

    /// Get the number of entries in the cache
    pub fn len(&self) -> usize {
        self.storage.read().unwrap().len()
    }

    /// Check if the cache is empty
    pub fn is_empty(&self) -> bool {
        self.storage.read().unwrap().is_empty()
    }

    /// Get cache statistics
    pub fn stats(&self) -> CacheStats {
        self.stats.read().unwrap().clone()
    }

    /// Get the cache capacity
    pub fn capacity(&self) -> usize {
        self.capacity
    }

    /// Check if the cache contains a key
    pub fn contains(&self, key: &K) -> bool {
        self.storage.read().unwrap().contains_key(key)
    }
}

impl<K, V> std::fmt::Debug for LruCache<K, V>
where
    K: std::fmt::Debug + std::hash::Hash + Eq + Clone,
    V: std::fmt::Debug + Clone,
{
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        f.debug_struct("LruCache")
            .field("capacity", &self.capacity)
            .field("len", &self.len())
            .field("stats", &self.stats())
            .finish()
    }
}

/// Global cache for parsed classes
pub static PARSE_CACHE: once_cell::sync::Lazy<LruCache<String, crate::types::ParsedClass>> =
    once_cell::sync::Lazy::new(|| LruCache::new(10000));

/// Global cache for match results
pub static MATCH_CACHE: once_cell::sync::Lazy<LruCache<String, crate::types::MatchResult>> =
    once_cell::sync::Lazy::new(|| LruCache::new(10000));

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_cache_insert_get() {
        let cache: LruCache<String, i32> = LruCache::new(10);

        cache.insert("key1".to_string(), 100);
        cache.insert("key2".to_string(), 200);

        assert_eq!(cache.get(&"key1".to_string()), Some(100));
        assert_eq!(cache.get(&"key2".to_string()), Some(200));
        assert_eq!(cache.get(&"key3".to_string()), None);
    }

    #[test]
    fn test_cache_eviction() {
        let cache: LruCache<i32, i32> = LruCache::new(3);

        cache.insert(1, 100);
        cache.insert(2, 200);
        cache.insert(3, 300);
        cache.insert(4, 400); // Should evict key 1

        assert_eq!(cache.get(&1), None);
        assert_eq!(cache.get(&4), Some(400));
    }

    #[test]
    fn test_cache_lru_order() {
        let cache: LruCache<i32, i32> = LruCache::new(3);

        cache.insert(1, 100);
        cache.insert(2, 200);
        cache.insert(3, 300);

        // Access key 1 to make it most recently used
        cache.get(&1);

        // Insert new key, should evict key 2 (least recently used)
        cache.insert(4, 400);

        assert_eq!(cache.get(&1), Some(100)); // Still exists
        assert_eq!(cache.get(&2), None); // Evicted
        assert_eq!(cache.get(&3), Some(300)); // Still exists
        assert_eq!(cache.get(&4), Some(400)); // New
    }

    #[test]
    fn test_cache_stats() {
        let cache: LruCache<i32, i32> = LruCache::new(10);

        cache.insert(1, 100);
        cache.get(&1); // Hit
        cache.get(&2); // Miss

        let stats = cache.stats();
        assert_eq!(stats.hits, 1);
        assert_eq!(stats.misses, 1);
        assert_eq!(stats.insertions, 1);
    }

    #[test]
    fn test_cache_remove() {
        let cache: LruCache<i32, i32> = LruCache::new(10);

        cache.insert(1, 100);
        assert_eq!(cache.remove(&1), Some(100));
        assert_eq!(cache.get(&1), None);
    }

    #[test]
    fn test_cache_clear() {
        let cache: LruCache<i32, i32> = LruCache::new(10);

        cache.insert(1, 100);
        cache.insert(2, 200);
        cache.clear();

        assert!(cache.is_empty());
    }
}
