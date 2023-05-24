
export default {
  mode: 'universal',

  target: 'server',

  head: {
    title: 'Фирменный интернет магазин премиум одежды и инвентаря TOPSTRETCHING®',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Стильные модели спортивной одежды, качественный и надежный инвентарь, высокофункциональные аксессуары, разработанные с любовью на собственном производстве.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  cache: true,

  css: [
    {
      src: '@/assets/styles/main.sass',
      lang: 'sass'
    }
  ],

  plugins: [
    {src: '~/plugins/VuexPersist', ssr: false},
    {src: '~/plugins/phoneComponents', ssr: false}
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
  ],

  modules: [
    '@nuxtjs/bootstrap-vue',
    '@nuxtjs/axios',
    'nuxt-lazy-load',
    'nuxt-webfontloader'
  ],

  router: {
    scrollBehavior: async function(to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition;
      }

      const findEl = async (hash, x = 0) => {
        return (
          document.querySelector(hash) ||
          new Promise(resolve => {
            if (x > 50) {
              return resolve(document.querySelector("#app"));
            }
            setTimeout(() => {
              resolve(findEl(hash, ++x || 1));
            }, 100);
          })
        );
      };

      if (to.hash) {
        let el = await findEl(to.hash);
        if ("scrollBehavior" in document.documentElement.style) {
          return window.scrollTo({ top: el.offsetTop, behavior: "smooth" });
        } else {
          return window.scrollTo(0, el.offsetTop);
        }
      }

      return { x: 0, y: 0 };
    }
  },

  axios: {
    baseURL: 'https://topstretching.by/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    },
  },

  build: {},

  server: {
    port: 50500,
    host: '0.0.0.0',
    timing: false
  }
}
