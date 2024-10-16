import { ref } from 'vue'

// eslint-disable-next-line no-undef
const cart = ref([])

export const useCart = () => {
  function addCart (id) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart) {
        itemInCart.quantidade += 1
      } else {
        cart.value.push({ id: id, quantidade: 1 })
      }
    } catch (error) {
      console.error(error)
    }
  }

  function removeCart (id) {
    try {
      const itemRemover = cart.value.findIndex(o => o.id === id)
      cart.value.splice(itemRemover, 1)
    } catch (error) {
      console.error(error)
    }
  }

  function increQuant (id) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart.quantidade < itemInCart.estoque) {
        itemInCart.quantidade = +itemInCart.quantidade + 1
      }
    } catch (error) {
      console.error(error)
    }
  }

  function decreQuant (id) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart.quantidade > 1) {
        itemInCart.quantidade = -itemInCart.quantidade - 1
      }
    } catch (error) {
      console.error(error)
    }
  }

  function setQuant (id, qtde) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      itemInCart.quantidade = qtde
    } catch (error) {

    }
  }

  return {
    addCart,
    removeCart,
    cart,
    increQuant,
    decreQuant,
    setQuant
  }
}
