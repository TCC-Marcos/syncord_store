import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([]) // [{ productId, name, price, qty }]

  function addItem (product) {
    const existing = items.value.find(i => i.productId === product.productId)

    if (existing) {
      existing.qty++
    } else {
      items.value.push({ ...product, qty: 1 })
    }
  }

  function removeItem (productId) {
    items.value = items.value.filter(item => item.productId !== productId)
  }

  function updateQty (productId, qty) {
    const item = items.value.find(i => i.productId === productId)
    if (item) item.qty = qty
  }

  const total = computed(() =>
    items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
  )

  return { items, addItem, removeItem, updateQty, total }
})
