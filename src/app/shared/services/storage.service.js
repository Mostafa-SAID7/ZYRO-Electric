 function _optionalChain(ops) { let lastAccessLHS = undefined; let value = ops[0]; let i = 1; while (i < ops.length) { const op = ops[i]; const fn = ops[i + 1]; i += 2; if ((op === 'optionalAccess' || op === 'optionalCall') && value == null) { return undefined; } if (op === 'access' || op === 'optionalAccess') { lastAccessLHS = value; value = fn(value); } else if (op === 'call' || op === 'optionalCall') { value = fn((...args) => value.call(lastAccessLHS, ...args)); lastAccessLHS = undefined; } } return value; }

/**
 * Storage Type Options
 */
 











/**
 * Multi-Strategy Storage Service
 * Supports:
 * - localStorage (persistent across sessions)
 * - sessionStorage (cleared on browser close)
 * - In-memory fallback (if storage unavailable)
 * - TTL-based expiration
 * - JSON serialization with error handling
 */
@Injectable({ providedIn: 'root' })
export class StorageService {constructor() { StorageService.prototype.__init.call(this); }
   __init() {this.memoryStorage = new Map()}

  /**
   * Set value in storage with optional TTL
   */
  set(
    key,
    value,
    storageType = 'localStorage',
    ttl = 0
  ) {
    try {
      const entry = {
        value,
        timestamp: Date.now(),
        ttl,
        type: storageType
      };

      const serialized = JSON.stringify(entry);

      if (storageType === 'memory') {
        this.memoryStorage.set(key, entry);
        return true;
      }

      const storage = this.getStorage(storageType);
      if (!storage) {
        // Fallback to memory if storage unavailable
        this.memoryStorage.set(key, entry);
        return false;
      }

      storage.setItem(key, serialized);
      return true;
    } catch (error) {
      console.error(`Error storing ${key}:`, error);
      // Fallback to memory on quota exceeded or other errors
      this.memoryStorage.set(key, { value, timestamp: Date.now(), ttl, type: 'memory' });
      return false;
    }
  }

  /**
   * Get value from storage, checking expiration
   */
  get(key, storageType = 'localStorage') {
    try {
      let entry = null;

      if (storageType === 'memory') {
        entry = this.memoryStorage.get(key)  || null;
      } else {
        const storage = this.getStorage(storageType);
        if (storage) {
          const stored = storage.getItem(key);
          if (!stored) return null;

          try {
            // Try to parse as StorageEntry first (new format)
            const parsed = JSON.parse(stored);
            
            // Check if it's a StorageEntry (has value, timestamp, ttl properties)
            if (parsed && typeof parsed === 'object' && 'value' in parsed && 'timestamp' in parsed && 'ttl' in parsed) {
              entry = parsed;
            } else {
              // Legacy format - just the value itself, wrap it
              entry = {
                value: parsed,
                timestamp: Date.now(),
                ttl: 0,
                type: storageType
              };
            }
          } catch (e) {
            // If JSON parse fails, treat as plain string token
            entry = {
              value: stored ,
              timestamp: Date.now(),
              ttl: 0,
              type: storageType
            };
          }
        }
      }

      if (!entry) {
        return null;
      }

      // Check TTL expiration
      if (entry.ttl > 0 && Date.now() - entry.timestamp > entry.ttl) {
        this.remove(key, storageType);
        return null;
      }

      return entry.value;
    } catch (error) {
      console.error(`Error retrieving ${key}:`, error);
      return null;
    }
  }

  /**
   * Check if key exists and is not expired
   */
  has(key, storageType = 'localStorage') {
    return this.get(key, storageType) !== null;
  }

  /**
   * Remove specific key from storage
   */
  remove(key, storageType = 'localStorage') {
    try {
      if (storageType === 'memory') {
        this.memoryStorage.delete(key);
      } else {
        const storage = this.getStorage(storageType);
        if (storage) {
          storage.removeItem(key);
        }
      }
    } catch (error) {
      console.error(`Error removing ${key}:`, error);
    }
  }

  /**
   * Remove all items matching pattern from storage
   */
  invalidate(pattern, storageType = 'localStorage') {
    try {
      const regex = new RegExp('^' + pattern.replace('*', '.*') + '$');

      if (storageType === 'memory') {
        const keysToDelete = [];
        this.memoryStorage.forEach((_, key) => {
          if (regex.test(key)) {
            keysToDelete.push(key);
          }
        });
        keysToDelete.forEach(key => this.memoryStorage.delete(key));
      } else {
        const storage = this.getStorage(storageType);
        if (storage) {
          const keysToDelete = [];
          for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (key && regex.test(key)) {
              keysToDelete.push(key);
            }
          }
          keysToDelete.forEach(key => storage.removeItem(key));
        }
      }
    } catch (error) {
      console.error(`Error invalidating pattern ${pattern}:`, error);
    }
  }

  /**
   * Clear all storage
   */
  clear(storageType = 'localStorage') {
    try {
      if (storageType === 'memory') {
        this.memoryStorage.clear();
      } else {
        const storage = this.getStorage(storageType);
        if (storage) {
          storage.clear();
        }
      }
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  }

  /**
   * Get all keys in storage
   */
  getKeys(storageType = 'localStorage') {
    try {
      if (storageType === 'memory') {
        return Array.from(this.memoryStorage.keys());
      }

      const storage = this.getStorage(storageType);
      if (!storage) return [];

      const keys = [];
      for (let i = 0; i < storage.length; i++) {
        const key = storage.key(i);
        if (key) keys.push(key);
      }
      return keys;
    } catch (error) {
      console.error('Error getting keys:', error);
      return [];
    }
  }

  /**
   * Get storage size in bytes (rough estimate)
   */
  getSize(storageType = 'localStorage') {
    try {
      let size = 0;

      if (storageType === 'memory') {
        this.memoryStorage.forEach(entry => {
          size += JSON.stringify(entry).length;
        });
      } else {
        const storage = this.getStorage(storageType);
        if (storage) {
          for (let i = 0; i < storage.length; i++) {
            const key = storage.key(i);
            if (key) {
              size += key.length + (_optionalChain([storage, 'access', _2 => _2.getItem, 'call', _3 => _3(key), 'optionalAccess', _4 => _4.length]) || 0);
            }
          }
        }
      }

      return size;
    } catch (error) {
      console.error('Error calculating size:', error);
      return 0;
    }
  }

  /**
   * Get appropriate storage object
   */
   getStorage(storageType) {
    try {
      if (storageType === 'localStorage') {
        return localStorage;
      } else if (storageType === 'sessionStorage') {
        return sessionStorage;
      }
    } catch (error) {
      console.warn(`${storageType} not available:`, error);
    }
    return null;
  }
}
