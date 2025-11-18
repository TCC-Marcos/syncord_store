import { defineStore } from 'pinia'
import { useCart } from 'src/composables/UseCart'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('accessToken'),
    refreshToken: localStorage.getItem('refreshToken'),
    user: null,
    carrinhoId: localStorage.getItem('carrinhoId') || null
  }),

  getters: {
    isLoggedIn: (state) => !!state.accessToken
  },

  actions: {
    login (accessToken, refreshToken, user = null, carrinhoId) {
      this.accessToken = accessToken
      this.refreshToken = refreshToken
      this.user = user
      this.carrinhoId = carrinhoId

      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('refreshToken', refreshToken)

      if (carrinhoId) {
        localStorage.setItem('carrinhoId', carrinhoId)
      }
    },

    logout () {
      this.accessToken = null
      this.refreshToken = null
      this.user = null
      this.carrinhoId = null

      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('carrinhoId')

      const { clearCart } = useCart()
      clearCart()
    }
  }
})
