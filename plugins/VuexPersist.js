import VuexPersistence from 'vuex-persist'

export default ({ store }) => {
  window.onNuxtReady(() => {
    new VuexPersistence({
      key: 'store_ts_minsk',
      storage: window.localStorage
    }).plugin(store);
  });
}
