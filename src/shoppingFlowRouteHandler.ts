import transform from './transform'
import { CACHE_PAGES } from './cache'
import { RouteHandler } from '@layer0/core/router/Router'

const handler: RouteHandler = async ({
  cache,
  removeUpstreamResponseHeader,
  setResponseHeader,
  updateResponseHeader,
  proxy,
}) => {
  cache(CACHE_PAGES)
  removeUpstreamResponseHeader('set-cookie') // The presence of a set-cookie header would prevent the response from being cached, so ensure set-cookie headers are removed.

  // convert absolute redirects to origin to relative so that the user isn't transferred to the origin.
  // NOTE: make sure this exactly matches the origin host in layer0.config.js!
  setResponseHeader('cache-control', 'public, max-age=86400') // change the cache headers to be cachable

  // ENTER YOUR WEBSITE DOMAIN NAME //
  updateResponseHeader('location', /https:\/\/www\.lushusa\.com\//gi, '/')

  proxy('origin', { transformResponse: transform }) // Origin pages transformations
}

export default handler
