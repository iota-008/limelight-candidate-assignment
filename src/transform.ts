import cheerio from 'cheerio'
import Request from '@layer0/core/router/Request'
import Response from '@layer0/core/router/Response'

export default function transform(response: Response, request: Request) {
  if (response.body) {
    const $ = cheerio.load(response.body)

    // Those 2 scripts are added using server side transformation just for Proof of Concept purposes.
    // For production those 2 scripts should be included in original website base code.
    $('head').append(`
      <script src="/__layer0__/cache-manifest.js" defer="defer"></script>
      <script src="/main.js" defer="defer"></script>
    `)

    // Relativizing all links
    $('a').map((i, el) => {
      const oldHref = $(el).attr('href') || ''
      const newHref = oldHref.replace('https://www.lushusa.com/', '/')
      $(el).attr('href', newHref)
    })

    // PLP relativizing image SRCs
    $('img.component-image.position-absolute.promotion-impression-img')
      .first()
      .map((i, el) => {
        const oldSrc = $(el).attr('src')?.trim() || ''
        const newSrc = oldSrc.replace('https://www.lushusa.com/', '/')
        $(el).attr('src', newSrc)
      })
    $('.plp-banner-top-inner img.plp-banner-top-image')
      .first()
      .map((i, el) => {
        const oldSrc = $(el).attr('src')?.trim() || ''
        const newSrc = oldSrc.replace('https://www.lushusa.com/', '/')
        $(el).attr('src', newSrc)
      })
    $('.search-results .product-tile-image.lazyload').map((i, el) => {
      const dataSrc = $(el).attr('data-src') || ''
      const newUrl = dataSrc?.replace('https://www.lushusa.com/', '/')
      $(el).attr('src', newUrl).attr('data-src', newUrl)
    })

    // PDP

    response.body = $.html()
  }
}
