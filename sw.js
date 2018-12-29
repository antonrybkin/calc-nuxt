importScripts('/calc-nuxt/_nuxt/workbox.4c4f5ca6.js')

workbox.precaching.precacheAndRoute([
  {
    "url": "/calc-nuxt/_nuxt/06b1cf91303ae2fa7cae.js",
    "revision": "5b56928588d7fc5eeb96e89960dded83"
  },
  {
    "url": "/calc-nuxt/_nuxt/4b7a65fad15befa8a0f4.js",
    "revision": "ae66c8e6625579405475af6abb21546d"
  },
  {
    "url": "/calc-nuxt/_nuxt/60e78675964e28ad200f.js",
    "revision": "0d03dc600e72d324c803e1100bec4409"
  },
  {
    "url": "/calc-nuxt/_nuxt/6a6da3834a8c98b81c6d.js",
    "revision": "80875019e2b040443418945487e06615"
  }
], {
  "cacheId": "Calc-nuxt",
  "directoryIndex": "/",
  "cleanUrls": false
})

workbox.clientsClaim()
workbox.skipWaiting()

workbox.routing.registerRoute(new RegExp('/calc-nuxt/_nuxt/.*'), workbox.strategies.cacheFirst({}), 'GET')

workbox.routing.registerRoute(new RegExp('/calc-nuxt/.*'), workbox.strategies.networkFirst({}), 'GET')
