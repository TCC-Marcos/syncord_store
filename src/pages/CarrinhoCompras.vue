<template>
  <div>
    <div class="row justify-center" v-if="$q.screen.gt.sm">
      <div class="col-10 q-pa-md">
        <q-stepper
          v-model="step"
          flat
          ref="stepper"
          color="primary"
          animated
        >
          <q-step
            :name="1"
            title="Carrinho de Compra"
            icon="person"
            :done="step > 1"
          >
            <div class="row justify-center q-gutter-md" v-if="cart.length > 0">
              <div class="col-8 produtos">
                <div class="row q-pa-md q-gutter-sm" v-for="produto in itensCarrinho" :key="produto.id">
                  <div class="col-md-2 col-lg-1" >
                    <q-img class="" :src="produto.imagem" style=""/>
                  </div>
                  <div class="col-5">
                    <div class="q-ma-sm column">
                      <strong  class="text-subtitle2 descricao">{{ produto.descricao }}</strong>
                      <p class="q-my-xs text-caption">Preço á vista no PIX {{ ((produto.preco)*desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</p>
                      <p class="q-mb-xs text-caption">Ou {{ produto.preco.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }} em 10x sem juros</p>
                    </div>
                  </div>
                  <div class="col-3">
                      <div class="row justify-center">
                        <q-btn class="" @click="decrementarQtde(produto.id)" flat icon="chevron_left"/>
                        <q-input borderless class="q-ml-sm" v-model="produto.quantidade" inputmode="numeric" mask="####" @blur="mudarQuantidade(produto.id,produto.quantidade,produto.estoque)" style="max-width: 20px;"/>
                        <q-btn class="" @click="incrementarQtde(produto.id, produto.estoque)" flat icon="chevron_right"/>
                      </div>
                      <div class="row justify-center">
                        <q-btn class="" size="10px" color="red" flat icon="delete" @click="removeProduto(produto.id)"/>
                      </div>
                      <div class="row justify-center">
                        <div class="cursor-pointer text-caption" style="color: red;" @click="removeProduto(produto.id)">Remover</div>
                      </div>
                      <div class="row justify-center">
                      </div>
                  </div>
                  <div class="col-md-1 col-lg-2" >
                    <div class="row justify-end">
                      <strong class="q-mt-sm">{{ (((produto.preco)*desconto)*produto.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-4 col-lg-3 q-px-md">
                <div class="row q-py-lg justify-around">
                  <div class="col-5">
                    <strong class="text-subtitle2">Valor dos produtos</strong>
                  </div>
                  <div class="col-3">
                    <strong class="">{{ (valorCarrinho*0.9).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</strong>
                  </div>
                </div>
                <q-separator/>
                <div class="row q-py-lg justify-around">
                  <div class="col-5">
                    <strong class="text-subtitle2">Frete</strong>
                  </div>
                  <div class="col-3">
                    <strong class="">{{ (0).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</strong>
                  </div>
                </div>
                <q-separator/>
                <div class="row justify-end q-ma-md">
                  <q-btn @click="$refs.stepper.next()" color="primary" :label="'Continue'" />
                  <q-btn @click="LimparCarrinho()" color="primary" :label="'Limpar'" />
                </div>
              </div>
            </div>
            <div v-else>
              <div class="row justify-center">
                <div class="col-9" style="background-color: #F2F2F2; border-radius: 0.5em;">
                  <div class="row justify-center q-my-lg">
                    <strong class="text-h4">Carrinho está vazio</strong>
                  </div>
                  <div class="row justify-center q-my-lg">
                    <q-btn :to="{ name: 'home'}" style="background-color: #565659; color: #F2F2F2;" icon="shopping_cart">Voltar para a loja</q-btn>
                  </div>
                </div>
              </div>
            </div>
          </q-step>

          <q-step
            :name="2"
            title="Identificação"
            icon="person"
            :done="step > 2"
          >
            An ad group contains one or more ads which target a shared set of keywords.
          </q-step>

          <q-step
            :name="3"
            title="Pagamento"
            icon="credit_card"
            :done="step > 3"
          >
            This step won't show up because it is disabled.
          </q-step>

          <q-step
            :name="4"
            title="Concluido"
            icon="check"
          >
            Try out different ad text to see what brings in the most customers, and learn how to
            enhance your ads using features like ad extensions. If you run into any problems with
            your ads, find out how to tell if they're running and how to resolve approval issues.
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <q-btn v-if="cart.length > 0 && step > 1" @click="$refs.stepper.next()" color="primary" :label="step === 4 ? 'Finish' : 'Continue'" />
              <q-btn v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Voltar" class="q-ml-sm" />
            </q-stepper-navigation>
          </template>
        </q-stepper>
      </div>
    </div>
    <div class="row" v-else>
      <!-- Criar versão de celular aqui -->
    </div>
  </div>
</template>
<script>
import { onMounted, ref } from 'vue'
import { useCart } from 'src/composables/UseCart'
import produtosService from 'src/services/produtos'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'

export default {
  setup () {
    const { cart, removeCart, increQuant, decreQuant, setQuant, clearCart } = useCart()
    const { listByIds } = produtosService()
    const authStore = useAuthStore()
    const itensCarrinho = ref([])
    const valorCarrinho = ref(0)
    const desconto = ref(0.9)

    onMounted(() => {
      getCarrinho()
      calcularPreco()
    })

    const getCarrinho = async () => {
      try {
        if (authStore.carrinhoId) {
          // Usuário logado: busca no backend
          const res = await api.get('/carrinho/me', {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`
            }
          })
          itensCarrinho.value = res.data.itens.map(i => ({
            id: i.produtoId,
            nome: i.nomeProduto,
            descricao: i.nomeProduto,
            preco: i.precoUnitario,
            quantidade: i.quantidade,
            imagem: i.imagem,
            estoque: 100 // opcional, você pode ajustar se vier do backend
          }))
          // Sincroniza cart local
          cart.value = itensCarrinho.value.map(i => ({ id: i.id, quantidade: i.quantidade }))
        } else {
          // Usuário não logado: pega do storage
          if (cart.value.length > 0) {
            const cartIds = cart.value.map(item => item.id)
            const data = await listByIds(cartIds)
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

    const removeProduto = async (id) => {
      await removeCart(id)
      await getCarrinho()
    }

    const mudarQuantidade = async (id, qtde, estoque) => {
      await setQuant(id, qtde, estoque)
      const itemInCart = itensCarrinho.value.find(o => o.id === id)
      if (!itemInCart) return
      itemInCart.quantidade = Math.min(qtde, estoque)
      calcularPreco()
    }

    const incrementarQtde = async (id, estoque) => {
      await increQuant(id, estoque)
      const itemInCart = itensCarrinho.value.find(o => o.id === id)
      if (!itemInCart) return
      itemInCart.quantidade = Math.min(itemInCart.quantidade + 1, estoque)
      calcularPreco()
    }

    const decrementarQtde = async (id) => {
      await decreQuant(id)
      const itemInCart = itensCarrinho.value.find(o => o.id === id)
      if (!itemInCart) return
      itemInCart.quantidade = Math.max(itemInCart.quantidade - 1, 1)
      calcularPreco()
    }

    const LimparCarrinho = async () => {
      await clearCart()
      await getCarrinho()
    }

    onMounted(() => {
      getCarrinho()
    })

    return {
      step: ref(1),
      desconto,
      itensCarrinho,
      valorCarrinho,
      cart,
      removeProduto,
      mudarQuantidade,
      incrementarQtde,
      decrementarQtde,
      LimparCarrinho
    }
  }
}
</script>
<style lang="sass" scoped>
.produtos
  background-color: #F2F2F2
  border-radius: 0.5em
.descricao
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2 /* Número de linhas que você quer exibir */
  overflow: hidden
  text-overflow: ellipsis
  height: 3em /* Ajuste de acordo com o número de linhas */
</style>
