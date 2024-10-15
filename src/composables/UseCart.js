import { ref } from 'vue'

// eslint-disable-next-line no-undef
const cart = ref([])

export const useCart = () => {
  function addCart (produto) {
    const itemInCart = cart.value.find(o => o.id === produto.id)
    if (itemInCart) {
      itemInCart.quantidade += 1
    } else {
      cart.value.push({ ...produto, quantidade: 1 })
    }
  }

  function removeCart () {}

  return {
    addCart,
    removeCart,
    cart
  }
}
