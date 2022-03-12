import colors from "vuetify/es5/util/colors";

export default {
  ssr: false,
  target: "static",

  // Global page headers: https://go.nuxtjs.dev/config-head
  env: {
    SOCKET_URL: process.env.SOCKET_URL,
    APP_URL: process.env.APP_URL,
    APP_TITLE: process.env.APP_TITLE,
    APP_DESCRIPTION: process.env.APP_DESCRIPTION,
    APP_IMAGE: process.env.APP_IMAGE,
  },
  server: {
    port: 3001,
  },
  head: {
    titleTemplate: `${process.env.APP_TITLE}`,
    title: process.env.APP_TITLE,
    htmlAttrs: {
      lang: "pt-br",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.APP_DESCRIPTION,
      },
      { name: "format-detection", content: "telephone=no" },
      { name: "theme-color", content: "#263238" },

      {
        hid: "twitter:title",
        name: "twitter:title",
        content: process.env.APP_TITLE,
      },
      {
        hid: "twitter:description",
        name: "twitter:description",
        content: process.env.APP_DESCRIPTION,
      },
      {
        hid: "twitter:image",
        name: "twitter:image",
        content: process.env.APP_IMAGE,
      },
      {
        hid: "twitter:image:alt",
        name: "twitter:image:alt",
        content: process.env.APP_TITLE,
      },
      {
        hid: "og:title",
        property: "og:title",
        content: process.env.APP_TITLE,
      },
      {
        hid: "og:description",
        property: "og:description",
        content: process.env.APP_DESCRIPTION,
      },
      {
        hid: "og:image",
        property: "og:image",
        content: process.env.APP_IMAGE,
      },
      {
        hid: "og:image:secure_url",
        property: "og:image:secure_url",
        content: process.env.APP_IMAGE,
      },
      {
        hid: "og:image:alt",
        property: "og:image:alt",
        content: process.env.APP_TITLE,
      },
      {
        hid: "og:url",
        property: "og:url",
        content: process.env.APP_URL,
      },
      {
        hid: "og:type",
        property: "og:type",
        content: "website",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      { rel: "canonical", href: process.env.APP_URL },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/pwa-update.js", mode: "client" },
    { src: "~/plugins/currentUrl.js" },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://go.nuxtjs.dev/pwa
    "@nuxtjs/pwa",
    "nuxt-socket-io",
  ],

  io: {
    sockets: [
      // Required
      {
        // At least one entry is required
        name: "chat",
        url: process.env.SOCKET_URL,
        default: true,
      },
    ],
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: "/",
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: process.env.APP_TITLE,
      short_name: process.env.APP_TITLE,
      lang: "pt-br",
    },
    meta: {
      mobileAppIOS: true,
      name: process.env.APP_TITLE,
      author: "Cledson Medeiros",
      description: process.env.APP_DESCRIPTION,
      lang: "pt-br",
      nativeUI: true,
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
