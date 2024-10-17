import { ref } from 'vue'

// eslint-disable-next-line no-undef
const cart = ref([])

export const useCart = () => {
  function addCart (id, estoque) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart) {
        if (itemInCart.quantidade < estoque) {
          itemInCart.quantidade += 1
        }
      } else {
        if (estoque > 0) {
          cart.value.push({ id, quantidade: 1 })
        }
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

  function increQuant (id, estoque) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart.quantidade < estoque) {
        itemInCart.quantidade = Number(itemInCart.quantidade) + 1
      }
    } catch (error) {
      console.error(error)
    }
  }

  function decreQuant (id) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (itemInCart.quantidade > 1) {
        itemInCart.quantidade = Number(itemInCart.quantidade) - 1
      }
    } catch (error) {
      console.error(error)
    }
  }

  function setQuant (id, qtde, estoque) {
    try {
      const itemInCart = cart.value.find(o => o.id === id)
      if (qtde <= estoque) {
        itemInCart.quantidade = Number(qtde)
      } else {
        itemInCart.quantidade = Number(estoque)
      }
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
