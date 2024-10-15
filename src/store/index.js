import { createStore } from 'vuex'

export default createStore({
  state: {
    cart: []// Estado inicial do carrinho
  },
  mutations: {
    ADD_TO_CART (state, product) {
      const item = state.cart.find(item => item.id === product.id)
      if (item) {
        item.quantity++
      } else {
        state.cart.push({ ...product, quantity: 1 })
      }
    },
    REMOVE_FROM_CART (state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId)
    },
    CLEAR_CART (state) {
      state.cart = []
    }
  },
  actions: {
    addToCart ({ commit }, product) {
      commit('ADD_TO_CART', product)
    },
    removeFromCart ({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId)
    },
    clearCart ({ commit }) {
      commit('CLEAR_CART')
    }
  },
  getters: {
    cartItems (state) {
      return state.cart
    },
    cartTotal (state) {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  }
})
