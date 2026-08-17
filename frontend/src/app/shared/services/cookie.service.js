

/**
 * Cookie Options
 */









/**
 * Cookie Service
 * Handles:
 * - Reading/writing cookies
 * - Cookie expiration
 * - Secure cookie attributes
 * - CSRF token management
 * - Session tracking
 */
@Injectable({ providedIn: 'root' })
export class CookieService {
  /**
   * Set a cookie
   */
  set(name, value, options) {
    try {
      let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

      if (options) {
        // Set expiration
        if (options.expires) {
          let expires = '';
          if (typeof options.expires === 'number') {
            // Convert days to date
            const date = new Date();
            date.setDate(date.getDate() + options.expires);
            expires = date.toUTCString();
          } else {
            expires = options.expires.toUTCString();
          }
          cookieString += `; expires=${expires}`;
        }

        if (options.path) {
          cookieString += `; path=${options.path}`;
        }

        if (options.domain) {
          cookieString += `; domain=${options.domain}`;
        }

        if (options.secure) {
          cookieString += '; secure';
        }

        if (options.sameSite) {
          cookieString += `; SameSite=${options.sameSite}`;
        }
      }

      document.cookie = cookieString;
    } catch (error) {
      console.error(`Error setting cookie ${name}:`, error);
    }
  }

  /**
   * Get cookie value by name
   */
  get(name) {
    try {
      const nameEQ = encodeURIComponent(name) + '=';
      const cookies = document.cookie.split(';');

      for (const cookie of cookies) {
        const trimmed = cookie.trim();
        if (trimmed.startsWith(nameEQ)) {
          return decodeURIComponent(trimmed.substring(nameEQ.length));
        }
      }

      return null;
    } catch (error) {
      console.error(`Error getting cookie ${name}:`, error);
      return null;
    }
  }

  /**
   * Check if cookie exists
   */
  has(name) {
    return this.get(name) !== null;
  }

  /**
   * Delete a cookie
   */
  delete(name, path = '/', domain) {
    try {
      const options = {
        expires: new Date(0),
        path
      };

      if (domain) {
        options.domain = domain;
      }

      this.set(name, '', options);
    } catch (error) {
      console.error(`Error deleting cookie ${name}:`, error);
    }
  }

  /**
   * Get all cookies
   */
  getAll() {
    try {
      const cookies = {};
      const cookiePairs = document.cookie.split(';');

      for (const pair of cookiePairs) {
        const [name, value] = pair.trim().split('=');
        if (name) {
          cookies[decodeURIComponent(name)] = decodeURIComponent(value || '');
        }
      }

      return cookies;
    } catch (error) {
      console.error('Error getting all cookies:', error);
      return {};
    }
  }

  /**
   * Clear all cookies
   */
  clearAll(path = '/') {
    try {
      const cookies = this.getAll();
      for (const name of Object.keys(cookies)) {
        this.delete(name, path);
      }
    } catch (error) {
      console.error('Error clearing cookies:', error);
    }
  }

  /**
   * Set CSRF token (for form submission protection)
   */
  setCSRFToken(token, name = '_csrf') {
    this.set(name, token, {
      httpOnly: false, // JavaScript accessible
      secure: true,
      sameSite: 'Lax',
      path: '/'
    });
  }

  /**
   * Get CSRF token
   */
  getCSRFToken(name = '_csrf') {
    return this.get(name);
  }

  /**
   * Set session cookie (deleted when browser closes)
   */
  setSessionCookie(name, value) {
    this.set(name, value, {
      path: '/',
      sameSite: 'Lax'
      // No expires = session cookie
    });
  }

  /**
   * Set secure session ID cookie
   */
  setSessionID(sessionId, cookieName = 'SESSIONID') {
    this.set(cookieName, sessionId, {
      secure: true, // HTTPS only
      httpOnly: false, // Note: Real implementation should use true with server-side access
      sameSite: 'Strict',
      path: '/'
    });
  }
}
