/**
 * Self-unregistering service worker.
 *
 * A previous build of this site registered a service worker. That SW is no
 * longer used, but browsers that already installed it will keep fetching this
 * URL to check for updates. Without the file, they get a 404 and the old SW
 * may persist indefinitely.
 *
 * This stub immediately activates and unregisters itself, clearing the entry
 * from every client's SW registry on the next visit.
 */
self.addEventListener('install', () => {
  // Skip the waiting phase so this SW activates right away.
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    self.registration.unregister().then(() => {
      // Tell all open tabs to reload so they are no longer controlled.
      return self.clients.matchAll({ type: 'window' });
    }).then((clients) => {
      clients.forEach((client) => {
        if (client.url && 'navigate' in client) {
          client.navigate(client.url);
        }
      });
    })
  );
});
