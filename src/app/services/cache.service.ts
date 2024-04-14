import { Injectable, Inject } from '@angular/core';
import { CACHE_EXPIRY_TIME } from 'app/utils/cache-expire.token';

@Injectable({
    providedIn: 'root'
})
export class CacheService {
    constructor(@Inject(CACHE_EXPIRY_TIME) private expirySeconds: number) {}

    setCache(key: string, data: any) {
        const now = new Date();
        console.log(now.getTime());
        const item = {
            data: data,
            expiry: now.getTime() + this.expirySeconds * 1000 // expiry time in milliseconds
        };
        localStorage.setItem(key, JSON.stringify(item));
    }

    getCache(key: string): any {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return null;
        }
        const item = JSON.parse(itemStr);
        const now = new Date();
        const currentTime = now.getTime();
        if (currentTime > item.expiry) {
            // If data has expired, remove it from cache and return null
            localStorage.removeItem(key);
            return null;
        }
        return item.data;
    }

    removeCache(key: string): void {
        const itemStr = localStorage.getItem(key);
        if (!itemStr) {
            return;
        }

        localStorage.removeItem(key);
    }
}
