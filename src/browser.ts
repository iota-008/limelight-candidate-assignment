import install from '@layer0/prefetch/window/install'
import installDevtools from '@layer0/devtools/install'

document.addEventListener('DOMContentLoaded', function () {
  // The Layer0 Devtools is a widget that helps developers understand how their site interacts with the Layer0
  // For more details see - https://docs.layer0.co/guides/devtools
  // Comment out for easier speed measurements
  installDevtools()

  // @ts-ignore
  install({
    includeCacheMisses: true, // DISABLE THIS LINE IN PRODUCTION

    // watch: [
    //   {
    //     selector: '.child-loaded',
    //     callback: (el) => {
    //       const url = el.getAttribute('href')
    //       if (url) prefetch(url, 'fetch')
    //     },
    //   }
    // ],
  })
})
