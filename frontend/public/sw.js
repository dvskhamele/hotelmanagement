const CACHE_NAME = 'hotelops-v1.0.0';
const CACHE_EXPIRATION = 60 * 60 * 1000; // 1 hour

// Files to cache during installation
const STATIC_FILES = [
  '/',
  '/offline',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json'
];

// API endpoints to cache with network-first strategy
const API_ENDPOINTS = [
  '/api/dashboard',
  '/api/requests',
  '/api/rooms',
  '/api/guests',
  '/api/staff'
];

// Extensions to cache with cache-first strategy
const STATIC_EXTENSIONS = [
  '.js',
  '.css',
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.ico',
  '.woff',
  '.woff2',
  '.ttf',
  '.eot'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static files');
        return cache.addAll(STATIC_FILES);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Message event - handle custom messages
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for requests to other domains
  if (url.origin !== location.origin) {
    return;
  }

  // Handle API requests with network-first strategy
  if (API_ENDPOINTS.some(endpoint => url.pathname.startsWith(endpoint))) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Handle static assets with cache-first strategy
  if (STATIC_EXTENSIONS.some(ext => url.pathname.endsWith(ext))) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // Handle navigation requests with network-first falling back to cache
  if (request.mode === 'navigate') {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Default to cache-first for other requests
  event.respondWith(cacheFirst(request));
});

// Network-first strategy with cache fallback
async function networkFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('[SW] Network request failed, using cache', error);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Cache-first strategy
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    // Check if cached response is still valid
    const cacheTime = cachedResponse.headers.get('sw-cache-time');
    if (cacheTime && (Date.now() - parseInt(cacheTime)) < CACHE_EXPIRATION) {
      return cachedResponse;
    }
  }
  
  try {
    const networkResponse = await fetch(request);
    
    // Cache successful responses with timestamp
    if (networkResponse.ok) {
      const responseToCache = networkResponse.clone();
      const headers = new Headers(responseToCache.headers);
      headers.append('sw-cache-time', Date.now().toString());
      const responseWithHeaders = new Response(responseToCache.body, {
        status: responseToCache.status,
        statusText: responseToCache.statusText,
        headers
      });
      cache.put(request, responseWithHeaders);
    }
    
    return networkResponse;
  } catch (error) {
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return fallback for images
    if (request.url.match(/\.(jpe?g|png|gif|svg)$/)) {
      return new Response('', { status: 404 });
    }
    
    throw error;
  }
}

// Network-first with offline fallback
async function networkFirstWithOfflineFallback(request) {
  try {
    const networkResponse = await fetch(request);
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(CACHE_NAME);
    const cachedResponse = await cache.match('/offline');
    return cachedResponse || new Response('Offline', { status: 503, statusText: 'Service Unavailable' });
  }
}

// Background sync for data updates
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-dashboard-data') {
    event.waitUntil(syncDashboardData());
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  if (!event.data) {
    return;
  }
  
  const data = event.data.json();
  const title = data.title || 'HotelOps Notification';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-72x72.png',
    data: data.url || '/',
    tag: data.tag || 'hotelops-notification'
  };
  
  event.waitUntil(self.registration.showNotification(title, options));
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll({ type: 'window' }).then((clientList) => {
      for (const client of clientList) {
        if (client.url === '/' && 'focus' in client) {
          return client.focus();
        }
      }
      
      if (clients.openWindow) {
        return clients.openWindow(event.notification.data || '/');
      }
    })
  );
});

// Periodic background sync
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'update-dashboard') {
    event.waitUntil(updateDashboardData());
  }
});

// Helper functions for background sync
async function syncDashboardData() {
  // Implementation for syncing dashboard data
  console.log('[SW] Syncing dashboard data');
  
  try {
    const response = await fetch('/api/sync/dashboard');
    const data = await response.json();
    
    if (data.success) {
      console.log('[SW] Dashboard data synced successfully');
      // Here you would typically update IndexedDB or send a message to clients
    }
  } catch (error) {
    console.error('[SW] Dashboard sync failed:', error);
  }
}

async function updateDashboardData() {
  // Implementation for updating dashboard data
  console.log('[SW] Updating dashboard data');
  
  try {
    const response = await fetch('/api/sync/dashboard');
    const data = await response.json();
    
    if (data.success) {
      console.log('[SW] Dashboard data updated successfully');
      // Here you would typically update IndexedDB or send a message to clients
    }
  } catch (error) {
    console.error('[SW] Dashboard update failed:', error);
  }
}