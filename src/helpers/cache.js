import md5 from 'js-md5';

/**
 * singleton for caching
 * usage: import {cache} from " ... helpers/Cache";
 * cache.set('someValue', 123)
 * cache.get('someValue')
 */
class Cache {
    constructor(maxSize = 100) {
        if (Cache.hasOwnProperty('instance')) {
            return Cache.instance
        }
        this.queue = []
        this.maxSize = maxSize
        Object.defineProperty(Cache, 'instance',{
            value: this,
            enumerable: false,
            writable: false,
            configurable: false
        });
    }

    set = (name, val) => {
        this.manageSize(name)
        this.queue.push(name)
        this[name] = val
    }

    get = name => this[name]

    manageSize = () => {
        if (this.queue.length > this.maxSize) {
            delete this[this.queue.shift()]
        }
    }
}

export const cache = new Cache();

/**
 * higher order function for caching
 * @param fnToCache
 */
export const withCache = fnToCache => (...args) => {
    const key = md5(JSON.stringify(args));
    const resultFromCache = cache.get(key);
    return resultFromCache
        ? Promise.resolve(resultFromCache)
        : fnToCache
            .call(null, ...args)
            .then(result => {
                cache.set(key, result);
                return Promise.resolve(result);
            })
}