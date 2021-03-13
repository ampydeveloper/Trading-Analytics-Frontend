import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";
import { DEV_API, PROD_API, STAGING_API } from "./constants/keys";

export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: 'SlabStox - Online Sports Card Platform',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Buy & Sell Sports Cards Online' },
      { name: 'application-name', content: 'SlabStox - Online Sports Card Platform' },
      { name: 'description', content: 'Buy & Sell Sports Cards Online', id: 'desc' }, // id to replace intead of create element
      // ...
      // Twitter
      { name: 'twitter:title', content: 'SlabStox - Online Sports Card Platform' },
      // with shorthand
      { name: 'twitter:description', content: 'Buy & Sell Sports Cards Online'},
      // ...
      // Google+ / Schema.org
      { itemprop: 'name', content: 'SlabStox - Online Sports Card Platform' },
      { itemprop: 'description', content: 'Buy & Sell Sports Cards Online' },
      // ...
      // Facebook / Open Graph
      { hid:'og:title', name: 'og:title', content: 'SlabStox - Online Sports Card Platform' },
      { hid:'og:description', name: 'og:description', content: 'Buy & Sell Sports Cards Online' },
      { hid:'og:type', name: 'og:type', content: 'website' },
      { hid:'og:image', name: 'og:image', content: 'https://www.slabstox.com/wp-content/uploads/2020/06/logo-3.png' },

    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/slabstox.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//fonts.googleapis.com/css?family=Roboto%3Aregular%2C300%2C700%2C900&#038;ver=5.4.2' },
      { rel: 'stylesheet', type: 'text/css', href: '/CocogoosePro-Italic/CocogoosePro-Italic.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/CocogoosePro-SemiLightItalic/CocogoosePro-SemiLightItalic.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/CocogoosePro-LightItalic/CocogoosePro-LightItalic.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/CocogoosePro-Regular/CocogoosePro-Regular.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/NexaBold/NexaBold.css' },
      { rel: 'stylesheet', type: 'text/css', href: '/NexaLight/NexaLight.css' },
      { rel: 'stylesheet', type: 'text/css', href: '//stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css' },
    ],
    // script: [
    //   { type: 'text/javascript', src: 'https://epnt.ebay.com/static/epn-smart-tools.js'}, 
    //   { type: 'text/javascript', src: '/affiliate-code.js'}, 
    // ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: {
    color: '#77D762',
    height: '0px'
  },
  /*
  ** Global CSS
  */
  css: [
    '~/css/pretty-checkbox.min.css',
    '~/css/main.css'
  ],
  /*
  ** router 
  */
  router: {
    middleware: [
    ]
  },
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    "~/plugins/mixins/user",
    { src: '~/plugins/axios.js', ssr: false },
    { src: '~/plugins/localStorage.js', ssr: false },
    { src: '~/plugins/vue-apexchart.js', ssr: false },
    { src: '~/plugins/fb-sdk.js', ssr: false },
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',

    '@nuxtjs/auth',

    '@nuxtjs/toast',

    '@nuxtjs/moment',

    [
      'nuxt-fontawesome', {
        imports: [
          {
            set: '@fortawesome/free-solid-svg-icons',
            icons: ['fas']
          },
          {
            set: '@fortawesome/free-brands-svg-icons',
            icons: ['fab']
          }
        ]
      }
    ],

    '@nuxtjs/style-resources',
  ],

  toast: {
    position: 'top-right',
    duration: 5000,
  },

  env: {
    baseUrl: (process.env.NODE_ENV == 'production') ? STAGING_API : DEV_API
  },

  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    baseURL: (process.env.NODE_ENV == 'production') ? STAGING_API : DEV_API,
    progress: true,
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'auth/login', method: 'post', propertyName: 'token' },
          logout: { url: 'auth/logout?q=logout', method: 'get' },
          user: { url: 'auth/getUser', method: 'get', propertyName: 'user' },
        },
        tokenRequired: true,
        tokenType: 'bearer',
      }
    },
    redirect: {
      login: '/',
      home: '/dashboard',
    },
    cookie: {
      options: {
        secure: false,
      }
    },
    watchLoggedIn: true
  },


  /*
  ** Build configuration
  */
  build: {
    transpile: ["vee-validate/dist/rules"],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
    splitChunks: {
      layouts: true
    }
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['vue-apexchart'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      const vueLoader = config.module.rules.find(
        rule => rule.loader === "vue-loader"
      );
      vueLoader.options.transformToRequire = {
        img: "src",
        image: "xlink:href",
        "b-img": "src",
        "b-img-lazy": ["src", "blank-src"],
        "b-card": "img-src",
        "b-card-img": "img-src",
        "b-carousel-slide": "img-src",
        "b-embed": "src"
      };
    }
  },

  styleResources: {
    scss: [
      '~/assets/scss/variables.scss',
    ]
  }
}
