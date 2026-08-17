

/**
 * Cache Entry with TTL (Time To Live)
 */






/**
 * Advanced In-Memory Cache Service
 * Handles:
 * - TTL (Time To Live) expiration
 * - Manual cache invalidation
 * - LRU (Least Recently Used) eviction
 * - Cache statistics
 */
@Injectable({ providedIn: 'root' })
export class CacheService {constructor() { CacheService.prototype.__init.call(this);CacheService.prototype.__init2.call(this); }
   __init() {this.cache = new Map()}
    __init2() {this.MAX_CACHE_SIZE = 100} // Maximum entries to prevent memory leak

  /**
   * Get cached value if not expired
   */
  get(key) {
    const entry = this.cache.get(key) ;

    if (!entry) {
      return null;
    }

    // Check if expired (TTL = 0 means no expiration)
    if (entry.ttl > 0 && Date.now() - entry.timestamp > entry.ttl) {
      this.cache.delete(key);
      return null;
    }

    return entry.value;
  }

  /**
   * Set cache value with optional TTL
   * @param key Cache key
   * @param value Value to cache
   * @param ttl Time to live in milliseconds (0 = no expiration)
   */
  set(key, value, ttl = 0) {
    // Implement LRU eviction if cache exceeds max size
    if (this.cache.size >= this.MAX_CACHE_SIZE) {
      const firstKey = this.cache.keys().next().value;
      if (firstKey) {
        this.cache.delete(firstKey);
      }
    }

    this.cache.set(key, {
      value,
      timestamp: Date.now(),
      ttl
    });
  }

  /**
   * Check if key exists and is not expired
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Remove specific cache entry
   */
  remove(key) {
    this.cache.delete(key);
  }

  /**
   * Remove cache entries matching pattern
   * @example invalidate('product:*') removes all product caches
   */
  invalidate(pattern) {
    const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');
    const keysToDelete = [];

    this.cache.forEach((_, key) => {
      if (regex.test(key)) {
        keysToDelete.push(key);
      }
    });

    keysToDelete.forEach(key => this.cache.delete(key));
  }

  /**
   * Clear all cache
   */
  clear() {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats() {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }
}
