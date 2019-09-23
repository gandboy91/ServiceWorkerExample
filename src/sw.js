importScripts('crypto.js');

const happyCatImg =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFBQUHBgYHCQ8KCQgICRMNDgsPFhMXFxYTFRUYGyMeGBohGhUVHikfISQlJygnGB0rLismLiMmJyb/2wBDAQYHBwkICRIKChImGRUZJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJib/wAARCAAyADIDASIAAhEBAxEB/8QAGwAAAgMBAQEAAAAAAAAAAAAAAAUDBAYCAQj/xAAzEAABAwMDAgQDBgcAAAAAAAABAgMEAAURBhIhMUETIlFhFYHBFEJxkaGxByMyQ1KC0f/EABUBAQEAAAAAAAAAAAAAAAAAAAAC/8QAFxEBAQEBAAAAAAAAAAAAAAAAAAECEf/aAAwDAQACEQMRAD8A+gdby5cazsswZCo0mdMYiJeQBubC3AFKGeMhO7HvUOn5s6Dd3tNXiSqU8Gy/BmLACpLOcKCsYG9BIBx1BSfWjXfDdiWeibzFz81EfWrmqLRIubEV+3vtxbnAfS/FfdSVJB6KSoAglKkkgjPp6UDqisz8N1k5y7qeCyT91i18D5qcNHwrV6RlGrIyz6O2tJH6LFBDfkuah1CnTjch9i3xGRIuK47hbWsqyGmgpPI6KUceiR3q5oWVJk6dabmuqelQ3nYbziuq1NOKRuPuQkH51NpizyLU1Ndny25lwnSVPyH22i2k8BKUhJJwAlIHU96oaMdbRddT27eA8zdFPeET5ghxtCgrHoSVc+xoNTRRRQZOG0NQavlzZHngWJwR4jR/pVJ2guOkdykKCR6eatHcJC40fc2kLdWtLbYUeNyjgZ9qz38PlEafefKSpT1ymrWR1z9ocH0Ap9LEaa0Yq3FJUogpKchSVA5BHuCKDM3K8amtOsbdbVWt2fZpLW6RckpSlDCyraEgDnuOuc59qdXJ+6PNXA2vHiQ2zsbAG593ZuCATwkcgZx3qSTBnvNErnpfdaBUwlbW1HiAeVSwDlWDg8Yqnp+Ne12uNNnTYzF0kNpMxMZoqYUrsUhRyCBgZzzjpQcaCu17u1ibd1HavhV1Rw9G3A7c8g8E4OO1Q65iqiR0aqgo2z7QC4sp6vx+rrSvUbckeigKex2mYDavEeU448vc46vlS1Y9vYAYrmepuTBkslO5txpaVFXAwUmguMuIeZQ82oKQ4kKSR3B5FFY3RtwkHSFjJBJNvj5Pr/LTRQWdGJDAvloKU+NCubykhQz5Hj4qVfh5yP8AU1pkMIRyACvsojOKQX623CNdW9R2JtL0xLQZlw1K2CW0CSAFdAtJJ2k8HJB65BF1rp5xQZmzPhEvoqNck/Z1g+27AV+KSRQNm5cho+HMiL3D+6wkrQr5DkfgR8zVCXPmwbWTFtr760qUM7cbU7jg4PJ47Ypi1dLY8nc1cYriT3S8kj969cudtaTucuEVCR3U8kD96KzZLLZ2OojDIhtI2KUCN2XB5iTySffJpVq6V8J01c5aQFrDCkMJI8ynVeVCR65UQKjl6000wstNXRqfI7R4GZLhPptRk/nVaJDueobnGud5iG326GvxYduWoKcW52dexwMfdQCcHknOACTiyWpu32W3wCMmLGbZJ9dqQPpRTOigKjkMMSGy3IZbeQeqXEhQ/I0UUGflaY02twlWnrWonuYbZ+leRtL6aS4CnT1rBz1ENv8A5RRQP40aNFR4caO0wj/FtASP0qaiigKKKKD/2Q==';
const sadCatImg =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFBQUHBgYHCQ8KCQgICRMNDgsPFhMXFxYTFRUYGyMeGBohGhUVHikfISQlJygnGB0rLismLiMmJyb/2wBDAQYHBwkICRIKChImGRUZJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJib/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAgIDAQEAAAAAAAAAAAAAAAUEBgIDBwEI/8QAMRAAAQMDAwIEAwgDAAAAAAAAAQIDBAAFEQYSIUFREyIxYRSBkQcVFjJCcbHBRGKh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APoPWk6ZDtTDVve+HlzpjMRt7aFFvesBSgDwSE7iM9a1aduM9m5ydO3t4PTmEeNGlBIT8WwTjcQOAtJ4UBxyD1xWGtztOn1n0TeY+fmFD+SKk6ptMucIU61LZautveDkdb2QhSTwttRHO1ST9QD0oHtFVkR9cucqutjj/wCqILrmPmXR/FHwmuEjKb5ZXD2VbXE/w9Qar8qVfNQI03DmyIUWMyJNwfjLKHPNkNNJUORkhSjjnCQOtTtETpM/TcdU5zxZkdbkWQvGN7jS1NlXz25+dZaWtMu2tTpFyfZkXG4SVPyHGElKPQJQlIPOAlIH1qFolaES9SQgtO9i7uq2Z5SHEoXnHuVGgtFFFFBU47f4h1dJkyCV26xOhmO1+lcraCtw99gUEjsSo9qsFzkusNstRgkyZLgaa3cgHBJUfYAE49qQ/Z4sDTrkhed0i4THFqx1+Ic9fkAKd3FsyQw5Edb+KjO+K0FK4UcEFJx3BIz0oOeaU1Br+R9oF8tF3sUiPZrelxTM91OEP4UNmDjB3JyePSj7Q9R68gX3T7GmrBIuNvuRw8+yOGPOkeY4wPJk5PGf2OegXGRdX7VJEe3obkeEra268MLOOE5GcA+menatGnpd4FhiPzbY2iS60HFRmHwoNE87NxxkDvQS7bIfU5IhyylUiMoArSMBxJGUqx06g+4NItaxvuwo1fBTslW4Aywn/Ii586VdykZUnsR7mncBp1p2TNnKbQ/KUPIlWQhKRhKc9epJ969uwZlWubGUPEbdjuIXxxgpIoJyFJWhK0EKSoZBHUUVWNHznnNJWRxZJUqAwST1JbTRQYaJHgxLvainL0C6SE7c48ri/FSf22uD6VZG4zaFhw+ZY69qQXyFcLdePxJZo5lqW0GZ8FKglUhCSSlaCePETk8H1BxngVJturdPz1+Ci5NR5Q/NElnwHkHsULwaBvMD6mFIjlIcUQNyvRIJ5PvxWFvafYjhh5QX4XlQscFSQBgkdD0+VbkvNLGUuoUO4UDQp1pIypxAHcqFB48y28BvTkj0PakerZX3Vpm6SsblojqSxj1W4obUJx3KiB8623LVenbcrw5F2jF8/ljsr8V1R7BCcqP0pbHj3HU9zi3C5Q3LdZ4Tgeiwn+HpDo/K44P0hPqlPrnk4wBQO7JbEW+ywIB5MWM2yT32pA/qimVFAVCutut9wjlE+DGlpA4S+0lY/wCiiig5xdtPWBp9YasdubGfRMVA/qsLXp+wuvpS7ZLe4M+ioqD/AFRRQdHtFsttvYAgW+LEB9QwylvP0FMKKKAooooP/9k=\n';
const angryCat =
    'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQUFBAYFBQUHBgYHCQ8KCQgICRMNDgsPFhMXFxYTFRUYGyMeGBohGhUVHikfISQlJygnGB0rLismLiMmJyb/2wBDAQYHBwkICRIKChImGRUZJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJiYmJib/wAARCAAyADIDASIAAhEBAxEB/8QAHAAAAgMBAAMAAAAAAAAAAAAAAAUDBAYCAQcI/8QANBAAAQMDAwMBBgQGAwAAAAAAAQIDBAAFEQYSIRMxUUEUFSJhcYEIMqHBI0JDUmKRgrHR/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAP/xAAZEQEAAwEBAAAAAAAAAAAAAAAAARESE6H/2gAMAwEAAhEDEQA/APoLW8uXFszbUF9UaTNlsREPJA3NhxxKVKGeMhJVj51DYJs6DeHtN3iSqU6Gy/AmLACpDIOFJVjA3oJGcDkEHzXjXfEezKJ4TeIn6rx+9XNUWiRc2Ir9vfbi3OA+l+K+6kqSD2UlQBBKVJJBGfHigdUVmfdusnOXdTwGSf5WLXwPupw0e69XpGUasjLPh21gj9Figr31tzUmoTp5El+PboLIenLjOqbW44vPTb3J5AABWcf4+hphoeZJm6ZiqmuF2XHU5FfcPda2lqbKj9dufvUul7Q/aY0pU2UiZPmyVyJD6G+mlSjgJASScAJSkDk9qX6HdbRI1Fb96Q7Guzyy3n4glzCwceDuPP1oNTRRRQZOM0L/AKwlSpHxwLC4GIzR/KqSUhS3CPUpSpKR4JVT+c+/12ocVSEOuJUtbqxkNoGMnHqckY+/ikegFgWWZIX+Z66zVLOPX2hYGfskCnMwL9qamROm+tCFNuMFYHUQcHg+QR68d6Cpb7jvRGlM3Ji626WvpoktAfCrkDlPBGRj5GrcyQ+uS5GjvNxkMNh2RIcGdgOcADtngnJ7felzMHoW9qJarI3bYUIqfbi5Q2HHBkpSNuQkbjkn9Kisr9znWpq6XGytoVcowTMtyH0u7O+MKOArKTgjigv26ctT0ZJmMz4kxsuRZbOMLwM4OODxyCPBpXrdj3elnVsNOyVa8GTt/rxc/wARCvOBlY8FPzNM7fDQ0uJsgt2yBBbLcWKNo25GM4TwABwAPJqa/wDRk2O4xiQtDsV1KscgAoPegYpUlaQpJylQyCPUUUj0nKdd0tZnV8rXBYUon1JbTRQUdHj2dy/2pQPVh3N11KQopyh7DqT9MrUP+JrRtxUBYcWdyxyOeBSO/wBtuEe6NaisTaXpjbfRlQ1q2CWyDkAK7BaSSUk8ckHvkEXWmn3FBmdM90S+yo1yHs6wflu4V9Ukigw34iZuom7TarXZA8Gri6tt8s91YAKU59B3P2rN/h7e1TbtTytPXFD4t3sqpBQ4dyUL3JAIPz5GK94OS7LPY2LlwpLR9OqlQ/7riM7Yra2royIUZB/MeqkZ+pJopHPE3evDB9lt4ALB47EHtWe1q+qBpW5lIKn3WTHjYJ+N1z4EJx53KFdytaabZWWmLm3cJPpHt4MlwnxtRnH3xVeDBud9usa8XuKYEOGrfBtqlBS+pjHVdI43AE7UjOMkk57E2gtkNEG2xISQCmOyhofRKQP2oq1RQFRvsMSGy3IZbeQe6XEhQ/0aKKDPytMaaW4oq09a1EnuYbZ/auY2mNNJcBTp61g/KG3/AOUUUGhjRo8VHTjR2mEf2toCR/oVLRRQFFFFB//Z\n';

const urlsToPreCache = [
  '/',
  '/sw.js',
  '/index.html',
  '/main.js',
  '/style.css',
  '/crypto.js',
  '/noveo.ico',
  '/noveo.png',
  '/happyCat.png',
  '/sadCat.png',
];

/**
 * requests queue. Here we store all requests made offline
 * @type []
 */
let queue = [];
let token = '';

const apiKey = 'BnyJAR5gosdRqQkZQ3HMXoWdJWsljC6xPmu1qa56';

const NO_CACHE_METHODS = ['DELETE', 'PUT'];

const OFFLINE_TYPE = 'offline';
const ONLINE_TYPE = 'online';

const PUSH_QUEUE_REGEXP = /pushQueue$/;

const ROUTE_REGEXP = /^([\w]+\/?)+$/;

const LOGIN_REGEXP = /api\/v1\/login\/?$/;

const postRegexpsToSave = [LOGIN_REGEXP];

const STATIC_CACHE = 'staticCache';
const DYNAMIC_CACHE = 'dynamicCache';

/**
 * returns response for OPTIONS request for correct CORS-mode requests work
 * @return {Response}
 */
const getPreflightResponse = () =>
    new Response(new Blob(), {
      status: 200,
      headers: { 'Access-Control-Allow-Origin': '*' },
    });

/**
 * returns success response with { success: true } body (noveo rest api format)
 * @note Response constructor doesn't take json or object, so we use Blob
 * @return {Response}
 */
const getSuccessMockResponse = () => {
  const blob = new Blob([JSON.stringify({ success: true })], {
    type: 'application/json',
  });
  const init = { status: 200 };
  return new Response(blob, init);
};

/**
 * returns correct headers to work with noveo rest api
 * @param token
 * @return {{Authorization: string, Accept: string, 'X-Application-Key': string, 'Content-Type': string}}
 */
const buildHeadersForQueue = (token) => ({
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Application-Key': apiKey,
  'Authorization': `Bearer ${token}`,
});

/**
 * makes all subscribed clients refresh (by going to root page)
 * @return void
 */
const refreshClients = () => {
  self.clients.matchAll({ type: 'window' }).then((clients) =>
      clients.map((client) => {
        if ('navigate' in client) {
          return client.navigate('/');
        }
      })
  );
}

/**
 * fetches all requests from queue
 * @see queue
 */
const fetchQueue = () =>
    Promise.all(
        queue.map(({ url, method, body }) =>
            fetch(url, {
              method,
              headers: buildHeadersForQueue(token),
              body: body ? JSON.stringify(body) : '{}',
            })
        )
    );

/**
 * Fetch event handler. Works as a proxy for requests.
 * Saves response for request if need. Build with online-first strategy
 * all GET requests are processing in race with limiting request (1 sec)
 */
const processRequest = (event) => {
  const { request } = event;

  if (PUSH_QUEUE_REGEXP.test(request.url)) {
    return event.respondWith(buildQueueResponse(request));
  }
  if (request.method === 'POST') {
    return event.respondWith(buildPostResponse(request));
  }

  return event.respondWith(
      Promise.race([buildResponse(request), buildLimitingGetResponse()])
  );
};

const pushWarningNotification = () =>
    self.registration.showNotification('say it to me asshole!', {
      body: `What did you say?? I'll find you by IP!`,
      icon: angryCat,
      requireInteraction: true,
      actions: [{ action: 'assh', title: 'yes, I am asshole' }],
    });

const pushOnlineNotification = (queue) => {
  const queueLength = Object.keys(queue).length;
  self.registration.showNotification('Online again!', {
    body: `You're online! ${
        queueLength
            ? `You've made ${queueLength} changes in offline. Do you wanna synchronize?`
            : ''
        }`,
    icon: happyCatImg,
    requireInteraction: true,
    actions: [
      { action: 'sync', title: 'synchronize please!' },
      { action: 'fck', title: 'f*ck' },
    ],
  });
};

const pushOfflineNotification = () =>
    self.registration.showNotification('You are offline now :(', {
      body: `You're offline.. We will try to make it not so painful for u..`,
      icon: sadCatImg,
      requireInteraction: true,
      actions: [
        { action: 'fck', title: 'f*ck' },
        { action: 'ok', title: 'no problem' },
      ],
    });

const buildHeaders = (contentType) => ({ 'Content-Type': contentType });

const buildResponseFromDbRecord = ({ blob, contentType }) =>
    new Response(blob, {
      headers: buildHeaders(contentType),
    });

const buildQueueResponse = (request) => {
  if (request.method === 'OPTIONS') {
    return new Promise((resolve, reject) =>
        resolve(getPreflightResponse())
    );
  }
  return new Promise((resolve, reject) => {
    const clonedRequest = request.clone();
    clonedRequest.json().then((body) => {
      queue = body.queue;
      token = body.token;
      return fetchQueue()
          .then(() => resolve(getSuccessMockResponse()))
          .catch(() => reject(new Error('error while processing queue')));
    });
  });
};

/**
 * Builds response for POST requests with Indexed db.
 * If there's no match in Idb, works like proxy.
 * Saves response to Idb
 * @return {Promise}
 */
const buildPostResponse = (request) =>
    new Promise((resolve, reject) => {
      const clonedRequest = request.clone();
      fetch(request)
          .then((response) => {
            const clonedResponse = response.clone();
            return savePostIfNeed(clonedRequest, clonedResponse).then(() =>
                resolve(response)
            );
          })
          .catch((error) => {
            getPostIfNeed(clonedRequest).then((postCachedResponse) => {
              if (postCachedResponse) {
                return resolve(postCachedResponse);
              }
              reject(error);
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
      fetch(request)
          .then((response) => {
            if (NO_CACHE_METHODS.includes(request.method)) {
              return resolve(response);
            }
            const responseToCache = response.clone();
            caches.open(DYNAMIC_CACHE).then((cache) => {
              cache.put(request, responseToCache).then(() => {
                console.log('response is cached');
                return resolve(response);
              });
            });
          })
          .catch((error) => {
            caches.match(request).then((cachedResponse) => {
              if (cachedResponse) {
                return resolve(cachedResponse);
              }
              return reject(error);
            });
          });
    });

/**
 * For limiting in time root requests which are not redirected (like get `/login`)
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
        console.warn(err);
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
    !!url && postRegexpsToSave.some((regexp) => regexp.test(url));

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
            return cache.addAll(urlsToPreCache);
          }),
        ])
    )
);

/**
 * @important !!!
 * When service worker is registered for first time or after unregister,
 * we need to force client to work with OUR service worker.
 * it also means that client would now generate events (like FetchEvent) in our serviceWorker
 */
self.addEventListener('activate', (event) => {
  if (self.clients && self.clients.claim) {
    event.waitUntil(self.clients.claim());
  }
});

/**
 * Fetch event handler
 */
self.addEventListener('fetch', processRequest);

/**
 * listens postMessage from client
 */
self.addEventListener(
    'message',
    ({ data = {} }) => {
      switch (data.type) {
        case OFFLINE_TYPE:
          return pushOfflineNotification();
        case ONLINE_TYPE:
          queue = data.payload.queue || {};
          token = data.payload.token || '';
          return pushOnlineNotification(queue);
        default:
          return
      }
    },
    false
);

/**
 * listens notification click action
 */
self.addEventListener(
    'notificationclick',
    (event) => {
      event.notification.close();

      switch (event.action) {
        case 'sync':
          return fetchQueue().then(refreshClients());
        case 'fck':
          return pushWarningNotification();
        default:
      }
    },
    false
);
