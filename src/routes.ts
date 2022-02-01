import { CACHE_ASSETS } from './cache'
import { Router } from '@layer0/core/router'
import shoppingFlowRouteHandler from './shoppingFlowRouteHandler'

export default new Router()

  //* prerendering
  .prerender([
    // HTML pages
    { path: '/' },
    { path: '/categories/mens' },
    { path: '/categories/mens/shirts' },
    { path: '/categories/mens/pants' },
    { path: '/categories/womens' },
    { path: '/categories/womens/shirts' },
    { path: '/categories/womens/pants' },

    // API responses
    { path: '/api/index.json' },
    { path: '/api/categories/mens.json' },
    { path: '/api/categories/mens/shirts.json' },
    { path: '/api/categories/mens/pants.json' },
    { path: '/api/categories/womens.json' },
    { path: '/api/categories/womens/shirts.json' },
    { path: '/api/categories/womens/pants.json' },
  ])
  // Home page
  .match('/', shoppingFlowRouteHandler)
  .match('/home', shoppingFlowRouteHandler)

  // PLP pages
  .match('/new/:path*', shoppingFlowRouteHandler)

  //* PDP pages
  .get('/bath/:path*', shoppingFlowRouteHandler)
  .get('/shower/:path*', shoppingFlowRouteHandler)
  .get('/bath-shower/:path*', shoppingFlowRouteHandler)
  .get('/hair/:path*', shoppingFlowRouteHandler)
  .get('/face/:path*', shoppingFlowRouteHandler)
  .get('/body/:path*', shoppingFlowRouteHandler)
  .get('/gifts/:path*', shoppingFlowRouteHandler)
  .get('/shop-by-price/:path*', shoppingFlowRouteHandler)
  .get('/by-recipient/:path*', shoppingFlowRouteHandler)
  .get('/by-occasion/:path*', shoppingFlowRouteHandler)
  .get('/extras/:path*', shoppingFlowRouteHandler)
  .get('/fragrances/:path*', shoppingFlowRouteHandler)
  .get('/collections/:path*', shoppingFlowRouteHandler)
  .get('/products/:path*', shoppingFlowRouteHandler)

  // Example route for cacheable assets
  .match('/images/:path*', ({ cache, proxy }) => {
    cache(CACHE_ASSETS)
    return proxy('origin')
  })
  //* adding cache for static images
  .get('/dw/image/v2/:path*', shoppingFlowRouteHandler)

  // Layer0: Service Worker and Browser.js
  .match('/service-worker.js', ({ serviceWorker }) =>
    serviceWorker('dist/service-worker.js')
  )
  .match('/main.js', ({ serveStatic, cache }) => {
    cache(CACHE_ASSETS)
    return serveStatic('dist/browser.js')
  })

  // Fallback route for all other requests
  .fallback(({ proxy }) => {
    proxy('origin')
  })
