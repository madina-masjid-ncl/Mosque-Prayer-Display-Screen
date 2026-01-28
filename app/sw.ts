/// <reference no-default-lib="true" />
/// <reference lib="esnext" />
/// <reference lib="webworker" />
import { defaultCache } from "@serwist/turbopack/worker"
import {
  CacheFirst,
  NetworkFirst,
  PrecacheEntry,
  RuntimeCaching,
  SerwistGlobalConfig,
  StaleWhileRevalidate,
} from "serwist"
import { Serwist } from "serwist"

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined
  }
}

declare const self: ServiceWorkerGlobalScope

const runtimeCaching: RuntimeCaching[] = [
  // pages / navigations (HTML documents)
  {
    matcher: ({ request }) => request.mode === "navigate",
    handler: new NetworkFirst({
      cacheName: "pages",
      networkTimeoutSeconds: 3,
      // expiration: {
      //   maxEntries: 60,
      //   maxAgeSeconds: 7 * 24 * 60 * 60, // 7 days
      // },
    }),
  },

  // Next.js static assets
  {
    matcher: ({ url }) => url.pathname.startsWith("/_next/static/"),
    handler: new StaleWhileRevalidate({
      cacheName: "next-static",
      // expiration: {
      //   maxEntries: 200,
      //   maxAgeSeconds: 30 * 24 * 60 * 60,
      // },
    }),
  },

  // your API/data (GET only)
  {
    matcher: ({ url, request }) =>
      request.method === "GET" && url.pathname.startsWith("/api/"),
    handler: new NetworkFirst({
      cacheName: "api",
      networkTimeoutSeconds: 3,
      // expiration: {
      //   maxEntries: 200,
      //   maxAgeSeconds: 24 * 60 * 60,
      // },
    }),
  },
]

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  precacheOptions: {
    cleanupOutdatedCaches: true,
    ignoreURLParametersMatching: [/.*/],
  },
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: runtimeCaching,
  fallbacks: {
    entries: [
      // {
      //   url: "/offline",
      //   matcher({ request }) {
      //     return request.destination === "document"
      //   },
      // },
    ],
  },
})

const urlsToCache = ["/"] as const

self.addEventListener("install", (event) => {
  event.waitUntil(
    Promise.all(
      urlsToCache.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        })
        return request
      }),
    ),
  )
})

serwist.addEventListeners()
