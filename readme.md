## PWA training example   

App demonstrates main PWA features. *(app-shell, Service Worker, Web Push Notifications)*  
App is build with webpack, without hash-naming to simplify caching with Service Worker

---

\* <sup>*to use in production mode you need to place sw.js in your server root folder (`build` or `static` or whatever )*  
\* \* *App is configured to work through `https://`*</sup>

#### Technologies and features  used:

- Fetch API
- SW Cache Interface
- SW Clients Interface
- IndexedDb
- Web push notifications 
- Post messages
- Redux saga FetchEvent
- Crypto.js (to make hashes from POST requests)

#### What to read about PWA:

* about PWA in general:
https://developers.google.com/web/progressive-web-apps/  
* about manifest.json:
https://developers.google.com/web/fundamentals/web-app-manifest/    
* good article about SW Caching:
https://developers.google.com/web/fundamentals/primers/service-workers/  
* Good video about SW Caching: 
https://www.youtube.com/watch?v=ksXwaWHCW6k
* MDN docs about ServiceWorker 
https://developer.mozilla.org/ru/docs/Web/API/Service_Worker_API
* Mozilla SW cockbook (best examples I've found) 
https://serviceworke.rs/
* Great (but quite complex) example of making requests queue with SW  
 https://serviceworke.rs/request-deferrer_index_doc.html 

------
* Indexed DB MDN doc https://developer.mozilla.org/ru/docs/IndexedDB  
* Article about Indexed DB for the lazy https://proglib.io/p/indexeddb-guide/
* Great Indexed DB example   
https://developer.mozilla.org/ru/docs/IndexedDB/Using_IndexedDB#Full_IndexedDB_example
* local Forage docs (handy library built on Indexed DB, Web Sql and localStorage)  
https://github.com/localForage/localForage
----
* Useful service to test, play and become acquainted with Web Push Notifications   
https://tests.peter.sh/notification-generator/

