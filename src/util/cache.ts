import type LruCache from "lru-cache";

export type CachedResponse = { __cached: true };
export type CacheResponse = CachedResponse | { data: any; etag: string };

export const isCached = (obj: CacheResponse): obj is CachedResponse =>
  obj && "__cached" in obj;

export interface CacheObject {
  etag: string;
  data: any;
}

export type Cache = LruCache<string, CacheObject>;
