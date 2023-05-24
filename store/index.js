import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = () => new Vuex.Store({
  state: {
    cart: []
  },
  getters: {
    cart(state){
      return state.cart
    }
  },
  mutations: {
    setCart (state, newCart) {
      state.cart = newCart
    }
  },
  actions: {
    setNewCart({ commit, state }, newCart){
      commit('setCart', newCart);
    }
  },
});

export default store
