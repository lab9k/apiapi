module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000'
  },
  /*
  ** Headers of the page
  */
  head: {
    htmlAttrs: {
      lang: 'en-GB'
    },
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || 'API api',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#18807d' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        locales: [{ code: 'en', file: 'en.js' }],
        defaultLocale: 'en',
        strategy: 'no_prefix',
        lazy: true,
        langDir: 'locales/'
      }
    ],
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // proxy: process.env === 'production'
  },
  proxy: {
    // '/api/': process.env.NODE_ENV === 'production' ? 'https://apiapi-dev.herokuapp.com/api/' : 'http://localhost:3000/api/'
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      font: {
        family: 'Open Sans'
      }
    },
    theme: {
      themes: {
        light: {
          primary: '#005C86'
        }
      }
    },
    treeShake: true
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
      if (ctx.isDev) {
        config.devtool = '#eval-source-map'
      }
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }
    }
  },
  telemetry: false
}
