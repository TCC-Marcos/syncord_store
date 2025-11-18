import { ref, computed } from 'vue'
import { api } from 'src/boot/axios'
import { useAuthStore } from 'src/stores/auth'
import produtosService from 'src/services/produtos'

const cart = ref([]) // [{id, quantidade}]
const itensCarrinho = ref([]) // [{ id, nome, preco, quantidade }]
const valorCarrinho = ref(0)
const { listByIds } = produtosService()

export function useCart () {
  const auth = useAuthStore()
  // carrinhoId sempre sincronizado com a Store
  const carrinhoId = computed(() => auth.carrinhoId)

  const getCarrinho = async () => {
    try {
      if (carrinhoId.value) {
        // 🔹 Logado: buscar carrinho do backend
        const res = await api.get('/carrinho/me')
        const backendItens = res.data.itens.map(i => ({
          id: i.produtoId,
          quantidade: i.quantidade,
          nome: i.nomeProduto,
          preco: i.precoUnitario
        }))

        // Atualiza cart local para sincronizar
        cart.value = backendItens.map(i => ({ id: i.id, quantidade: i.quantidade }))
        itensCarrinho.value = backendItens
      } else {
        // 🔹 Não logado: pegar carrinho do storage
        const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
        cart.value = storedCart

        if (cart.value.length > 0) {
          const cartIds = cart.value.map(i => i.id)
          const data = await listByIds(cartIds) // sua função que retorna os produtos
          itensCarrinho.value = data.map(item => {
            const produtoCarrinho = cart.value.find(p => p.id === item.id)
            return produtoCarrinho
              ? { ...item, quantidade: produtoCarrinho.quantidade }
              : item
          })
        } else {
          itensCarrinho.value = []
        }
      }

      calcularPreco()
    } catch (error) {
      console.error(error)
    }
  }
  const calcularPreco = () => {
    valorCarrinho.value = itensCarrinho.value.reduce((total, item) => {
      const valor = item.quantidade * item.preco
      return total + valor
    }, 0)
  }
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
          produtoId: produto.id,
          quantidade: 1
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
        data: { ProdutoId: id }
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
        ProdutoId: id,
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
        ProdutoId: id,
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
        ProdutoId: id,
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
    clearCart,
    getCarrinho
  }
}
