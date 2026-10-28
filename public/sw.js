// ==========================================================================
// SERVICE WORKER - BÍBLIA SAGRADA CATÓLICA (OFFLINE FIRST PWA)
// ==========================================================================

const CACHE_NAME = 'biblia-catolica-v8';

// Recursos vitais para o funcionamento offline imediato
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.svg',
  '/icon-512.png',
  '/data/biblia.json',
  '/vendor/fonts/fonts.css',
  '/vendor/fontawesome/css/all.min.css',
  '/vendor/fontawesome/webfonts/fa-solid-900.woff2',
  '/vendor/fontawesome/webfonts/fa-regular-400.woff2',
  '/vendor/fontawesome/webfonts/fa-brands-400.woff2'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(async cache => {
      console.log('[PWA SW] Pré-carregando shell e base da Bíblia Católica...');
      // Carrega cada recurso individualmente para tolerar eventuais falhas sem abortar o cache inteiro
      for (const asset of PRECACHE_ASSETS) {
        try {
          await cache.add(asset);
        } catch (err) {
          console.warn('[PWA SW] Aviso ao pré-carregar recurso:', asset, err);
        }
      }
      console.log('[PWA SW] Pré-cache concluído com sucesso!');
    })
  );
});

// Ativação e limpeza de versões antigas do cache
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            console.log('[PWA SW] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Interceptação de requisições de rede
self.addEventListener('fetch', event => {
  const req = event.request;
  const url = new URL(req.url);

  // 1. Ignora métodos que não sejam GET
  if (req.method !== 'GET') return;

  // 2. Transmissões de áudio ao vivo, Firebase e Analytics NUNCA são cacheados
  if (
    url.pathname.includes('/stream') ||
    url.hostname.includes('firebase') ||
    url.hostname.includes('googletagmanager.com') ||
    url.hostname.includes('google-analytics.com') ||
    url.hostname.includes('radio') ||
    url.hostname.includes('podcast') ||
    url.protocol.startsWith('chrome-extension')
  ) {
    return;
  }

  // 3. Bíblia Completa e Fontes: Estratégia CACHE-FIRST
  // Garante que o arquivo de 6MB e as fontes abram instantaneamente sem gastar dados nem bater na rede
  if (
    url.pathname.endsWith('/biblia.json') ||
    url.pathname.includes('/vendor/') ||
    url.pathname.includes('/assets/aparicoes/') ||
    url.pathname.includes('/assets/social/')
  ) {
    event.respondWith(
      caches.match(req).then(cached => {
        if (cached) return cached;
        return fetch(req).then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, clone));
          }
          return response;
        });
      })
    );
    return;
  }

  // 4. Navegação principal de páginas (HTML): NETWORK-FIRST com FALLBACK para o CACHE
  if (req.mode === 'navigate') {
    event.respondWith(
      fetch(req)
        .then(response => {
          if (response && response.status === 200) {
            const clone = response.clone();
            caches.open(CACHE_NAME).then(c => c.put(req, clone));
          }
          return response;
        })
        .catch(() => {
          return caches.match('/index.html').then(cachedHtml => {
            return cachedHtml || caches.match('/');
          });
        })
    );
    return;
  }

  // 5. Recursos gerados pelo Vite (assets/*.js, assets/*.css): NETWORK-FIRST com cache fallback
  if (url.pathname.includes('/assets/index-') || url.pathname.includes('/assets/web-')) {
    event.respondWith(
      fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return networkResponse;
      }).catch(() => caches.match(req))
    );
    return;
  }

  // 6. Demais recursos estáticos: STALE-WHILE-REVALIDATE
  event.respondWith(
    caches.match(req).then(cached => {
      const fetchPromise = fetch(req).then(networkResponse => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then(c => c.put(req, clone));
        }
        return networkResponse;
      }).catch(err => {
        // Se a rede falhar e tínhamos no cache, tá tudo bem
        return cached;
      });

      return cached || fetchPromise;
    })
  );
});
