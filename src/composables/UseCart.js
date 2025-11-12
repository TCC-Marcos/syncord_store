import { ref } from 'vue'
import { api } from 'src/boot/axios'

const cart = ref([]) // [{id, quantidade}]
const carrinhoId = ref(localStorage.getItem('carrinhoId') || null)

export function useCart () {
  // Salvar carrinho no localStorage
  const saveCart = () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
    if (carrinhoId.value) localStorage.setItem('carrinhoId', carrinhoId.value)
  }

  // Inicializa carrinho do localStorage
  const initCart = () => {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    cart.value = storedCart
  }

  // Adicionar produto
  const addCart = async (produto) => {
    const item = cart.value.find(p => p.id === produto.id)
    if (item) {
      if (item.quantidade < produto.estoque) item.quantidade++
      else return { type: 'negative', message: 'Quantidade máxima atingida' }
    } else {
      cart.value.push({ id: produto.id, quantidade: 1 })
    }
    saveCart()

    // Se logado, envia para API
    if (carrinhoId.value) {
      try {
        await api.post('carrinho/add-item', {
          carrinhoId: carrinhoId.value,
          produtoId: produto.Id,
          quantidade: item ? item.quantidade : 1
        })
      } catch (error) {
        console.error(error)
      }
    }
    return { type: 'positive', message: 'Produto adicionado ao carrinho!' }
  }

  const removeCart = async (id) => {
    cart.value = cart.value.filter(p => p.id !== id)
    saveCart()
    if (carrinhoId.value) {
      await api.delete('carrinho/remove-item', {
        data: { itemId: id }
      })
    }
  }

  const increQuant = async (id, estoque) => {
    const item = cart.value.find(p => p.id === id)
    if (!item) return
    if (item.quantidade >= estoque) return
    item.quantidade++
    saveCart()
    if (carrinhoId.value) {
      await api.put('carrinho/update-item', {
        itemId: id,
        quantidade: item.quantidade
      })
    }
  }

  const decreQuant = async (id) => {
    const item = cart.value.find(p => p.id === id)
    if (!item || item.quantidade <= 1) return
    item.quantidade--
    saveCart()
    if (carrinhoId.value) {
      await api.put('carrinho/update-item', {
        itemId: id,
        quantidade: item.quantidade
      })
    }
  }

  const setQuant = async (id, qtde, estoque) => {
    const item = cart.value.find(p => p.id === id)
    if (!item) return
    item.quantidade = Math.min(qtde, estoque)
    saveCart()
    if (carrinhoId.value) {
      await api.put('carrinho/update-item', {
        itemId: id,
        quantidade: item.quantidade
      })
    }
  }

  const clearCart = async () => {
    cart.value = []
    saveCart()

    // Se estiver logado, limpar carrinho no back-end
    if (carrinhoId.value) {
      try {
        await api.delete(`carrinho/${carrinhoId.value}/clear`)
        // ou outra rota da sua API que limpe todos os itens
      } catch (error) {
        console.error(error)
      }
    }
  }
  initCart()

  return {
    cart,
    addCart,
    removeCart,
    increQuant,
    decreQuant,
    setQuant,
    carrinhoId,
    clearCart
  }
}
