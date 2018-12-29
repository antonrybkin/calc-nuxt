const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
  },
  // For GH Pages:
  // router: {
  //   base: '/calc-nuxt/'
  // },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: ['~/assets/style/calc.scss'],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [],
  isStatic: true,

  api: {
    baseURL:
      process.env.NODE_ENV === 'production'
        ? 'http://localhost:3000'
        : 'http://localhost:3000'
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/proxy',
    // Doc: https://github.com/nuxt-community/axios-module#usage
    [
      '@nuxtjs/axios',
      {
        baseURL: 'http://localhost:3000/'
      }
    ]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true
    // See https://github.com/nuxt-community/axios-module#options
  },
  proxy: {
    '/rest/calculator': 'https://calculator-625a.restdb.io/rest/calculator'
  },
  manifest: {
    background_color: '#1939f6',
    theme_color: '#191b1d'
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
