importScripts('crypto.js');

const urlsToPreCache = [
  '/',
  '/index.html',
  '/main.js',
  '/style.css',
  '/crypto.js',
  '/noveo.ico',
];

const LOGIN_REGEXP = /api\/v1\/login\/?$/;

const postRegexpToSave = [/api\/v1\/login\/?$/];

const STATIC_CACHE = 'staticCache';
const DYNAMIC_CACHE = 'dynamicCache';

const pushOnlineNotification = () => {
  self.registration.showNotification('Online again!', {
        body: `You're online! You've made some changes in offline. Do you wanna synchronize?`,
        icon: '/happyCat.png',
        image: '/happyCat.png',
        requireInteraction: true,
        actions: [
          { action: 'yes', title: 'sync' },
          { action: 'no', title: 'close' },
        ],
      })
};

const buildHeaders = (contentType) => ({ 'Content-Type': contentType });

const buildResponseFromDbRecord = ({ blob, contentType }) =>
    new Response(blob, {
      headers: buildHeaders(contentType),
    });

/**
 * Builds response for POST requests with Indexed db.
 * If there's no match in Idb, works like proxy.
 * Saves response to Idb
 * @return {Promise}
 */
const buildPostResponse = (request) =>
    new Promise((resolve, reject) => {
      const clonedRequest = request.clone();
      getPostIfNeed(request).then((postCachedResponse) => {
        if (postCachedResponse) {
          return resolve(postCachedResponse);
        }
        fetch(request).then((response) => {
          const clonedResponse = response.clone();
          savePostIfNeed(clonedRequest, clonedResponse).then(() =>
              resolve(response)
          );
        });
      });
    });

/**
 * Builds response for given request using cache.
 * If there's no match in cache, works like proxy.
 * Saves response to cache
 * @return {Promise}
 */
const buildResponse = (request) =>
    new Promise((resolve, reject) => {
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return resolve(cachedResponse);
        }
        fetch(request).then((response) => {
          const responseToCache = response.clone();
          caches.open(DYNAMIC_CACHE).then((cache) => {
            cache.put(request, responseToCache).then(() => {
              console.log('response is cached');
              resolve(response);
            });
          });
        });
      });
    });

/**
 * For limiting no root requests in SPA (like get `/login`)
 * Usually it's server job, but in our case.. I'm too lazy to set up server with complex config
 */
const buildLimitingGetResponse = () =>
    new Promise((resolve, reject) => setTimeout(resolve, 1000, new Response()));

/**
 * makes hash from blob
 * @param blob
 * @return {Promise}
 */
const makeBlobHash = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = (event) => {
        const { result } = event.target;
        const hash = String(CryptoJS.SHA256(result));
        console.log(hash);
        return resolve(hash);
      };
      reader.onerror = (err) => {
        console.log(err);
        return resolve('');
      };
      reader.readAsBinaryString(blob);
    });

/**
 * makes hash from request
 * @param request
 * @return {Promise}
 */
const makeRequestHash = (request) =>
    new Promise((resolve, reject) => {
      const clonedRequest = request.clone();
      const { url } = clonedRequest;
      clonedRequest.json().then((body) => {
        const hash = String(CryptoJS.SHA256(JSON.stringify(body)));
        return resolve(hash);
      });
    });

/**
 * connects to Idb and returns connection
 * @return {Promise}
 */
const getDb = () =>
    new Promise((resolve, reject) => {
      const createDb = indexedDB.open('test');
      createDb.onerror = (event) => {
        console.log('failed to open Idb');
        return reject(event);
      };
      createDb.onsuccess = (event) => {
        const db = event.target.result;
        return resolve(db);
      };
      createDb.onupgradeneeded = (event) => {
        const db = event.target.result;
        db.createObjectStore('posts', { keyPath: 'hash' });
        return resolve(db);
      };
    });

/**
 * returns object store from Idb
 * @return {Promise}
 */
const getObjectStore = () =>
    new Promise((resolve, reject) => {
      getDb()
          .then((db) => {
            const tx = db.transaction(['posts'], 'readwrite');
            return resolve(tx.objectStore('posts'));
          })
          .catch(reject);
    });

/**
 * returns post body from Idb if post url matches regexps to save
 * key in db is hash build from request body
 * @param request
 * @return {Promise}
 */
const getPostIfNeed = (request) =>
    new Promise((resolve, reject) => {
      const clonedRequest = request.clone();
      if (!isPostToSave(request.url)) {
        return resolve(null);
      }
      makeRequestHash(clonedRequest).then((hash) => {
        getObjectStore().then((store) => {
          const objectRequest = store.get(hash);
          objectRequest.onerror = (event) => {
            console.warn('error while saving');
            return resolve(null);
          };
          objectRequest.onsuccess = (event) => {
            const { result } = objectRequest;
            if (!result || result.url !== clonedRequest.url) {
              return resolve(null);
            }
            const response = buildResponseFromDbRecord(result);
            return resolve(response);
          };
        });
      });
    });

/**
 * checks if given url matches regexps to save post
 * @param url
 * @return {boolean}
 */
const isPostToSave = (url) =>
    !!url && postRegexpToSave.some((regexp) => regexp.test(url));

/**
 * saves post body if post url matches regexps to save
 * post body is saved as blob (Indexed db specific: not working reliable with stringify json)
 * @param request
 * @param response
 * @return {Promise}
 */
const savePostIfNeed = (request, response) =>
    new Promise((resolve, reject) => {
      const { url } = request;
      if (!isPostToSave(url) || !response || !(response instanceof Response)) {
        return resolve(null);
      }

      const contentType = response.headers.get('Content-Type') || '';
      makeRequestHash(request).then((hash) => {
        response
            .blob()
            .then((blob) => {
              getObjectStore().then((store) => {
                const objectRequest = store.put({ url, blob, hash, contentType });
                console.log('saving');
                objectRequest.onerror = (event) => {
                  console.warn('unable to save');
                  return resolve(null);
                };
                objectRequest.onsuccess = (event) => resolve(response);
              });
            })
            .catch(() => resolve(null));
      });
    });

/**
 * Service Worker initialization.
 * Opens cache and Indexed DB
 */
self.addEventListener('install', (event) =>
    event.waitUntil(
        Promise.all([
          getDb().then((db) =>
              console.log(`${db.name} database loaded successfully`)
          ),
          caches.open(STATIC_CACHE).then((cache) => {
            console.log('Opened cache');
            pushOnlineNotification();
            return cache.addAll(urlsToPreCache);
          }),
        ])
    )
);

/**
 * Fetch event handler
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;

  if (request.method === 'POST') {
    return event.respondWith(buildPostResponse(request));
  }

  return event.respondWith(
      Promise.race([buildResponse(request), buildLimitingGetResponse()])
  );
});
