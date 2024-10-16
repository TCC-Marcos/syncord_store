<template>
  <div>
  <div class="q-my-xl row justify-center q-gutter-md">
    <div class="col-xs-10 col-md-4 col-lg-3">
      <q-img :src="`/img/${produtoDestaque.id}.jpg`" />
    </div>
    <div class="col-xs-11 col-md-5 col-lg-5 infoproduto">
      <div class="nomeproduto">
        <div class="row q-mx-lg">
          <p class="q-my-xs q-pt-lg text-h5 text-weight-regular">{{ produtoDestaque.descricao }}</p>
        </div>
        <div class="row q-mx-lg q-pb-lg q-mb-lg">
          <p class="q-my-xs text-caption">Cod: {{ produtoDestaque.cod_produto }}</p>
        </div>
      </div>
      <div class="row justify-between items-center q-pt-lg q-mt-lg">
        <q-card flat class="q-ml-md my-card" style="background-color: #F2F2F2">
          <q-card-section>
            <div class="row">
              <p class="text-subtitle1 q-mb-xs">De: </p>
              <div class="text-subtitle1 q-mb-xs text-strike">{{ precoOriginal }}</div>
            </div>
            <div class="row">
              <p class="q-mb-xs text-h5">Por: </p>
              <p class="q-px-xs q-mb-xs text-h4 text-weight-bolder text-green">{{ precoDesconto }}</p>
            </div>
            <p class="text-subtitle2">À vista no PIX 10% desconto</p>
          </q-card-section>
        </q-card>
        <div class="col-auto q-mr-md">
          <q-btn class="text-subtitle2 q-mb-md q-ml-lg" :to="{ name: 'carrinho' }" color="primary">
            <q-icon name="shopping_cart" />
            Comprar
          </q-btn>
          <q-btn class="text-subtitle2 q-mb-md q-mx-md" @click="addCart(produtoDestaque)" color="primary">
            <q-icon name="add_shopping_cart" />
          </q-btn>
        </div>
      </div>
    </div>
  </div>

    <div class="row justify-center">
      <div class="col-9 items-center">
        <div class="text-h4 q-pb-lg">Outros produtos</div>
          <q-table
            class="q-pb-lg q-justify-center"
            grid
            flat bordered
            :card-container-class="cardContainerClass"
            title=""
            :rows="produtos"
            :columns="columns"
            row-key="name"
            hide-header
            hide-bottom
            v-model:pagination="pagination"
          >
            <template v-slot:item="props">
              <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                <router-link :to="{ name: 'produto', params: {id: props.row.id} }">
                  <q-card flat bordered class="q-mx-md q-my-md">
                    <q-img class="flex" :src= "`/img/${props.row.id}.jpg`"/>
                    <q-card-section class="">
                      <br>
                      <strong class="description">{{ props.row.descricao }}</strong>
                      <h6 class="q-my-md">{{ props.row.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}</h6>
                      <p>Frete gratis</p>
                    </q-card-section>
                  </q-card>
                </router-link>
              </div>
            </template>
          </q-table>
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, watch, onMounted, computed } from 'vue'
import produtosService from 'src/services/produtos'
import { useRoute } from 'vue-router'
import { useCart } from 'src/composables/UseCart'

export default {
  setup () {
    const $q = useQuasar()
    const produtos = ref([])
    const produtoDestaque = ref([])
    const { list, listById } = produtosService()
    const { addCart } = useCart()
    const route = useRoute()
    const id = route.params.id

    const precoOriginal = computed(() => {
      return produtoDestaque.value.preco ? produtoDestaque.value.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''
    })

    const precoDesconto = computed(() => {
      return produtoDestaque.value.preco ? (produtoDestaque.value.preco * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) : ''
    })

    onMounted(() => {
      getProduto(id)
      getProdutos()
    })

    watch(() => route.params.id, (newId) => {
      getProduto(newId)
    })

    const getProdutos = async () => {
      try {
        const data = await list()
        produtos.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const getProduto = async (produtoId = id) => {
      try {
        const data = await listById(produtoId)
        produtoDestaque.value = data
      } catch (error) {
        console.error(error)
      }
    }

    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 3
      }
      if ($q.screen.lt.lg) {
        return 4
      }
      return 4
    }

    const filter = ref('')
    const pagination = ref({
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })
    return {
      produtos,
      produtoDestaque,
      precoDesconto,
      precoOriginal,
      addCart,

      filter,
      pagination,
      slide: ref(1),
      autoplay: ref(true)
    }
  }
}
</script>

<style lang="sass" scoped>
.infoproduto
  background-color: #F2F2F2
  border-radius: 1em
.my-card
  width: 50%
  max-width: 500px
.nomeproduto
  height: 30%
a
  text-decoration: none
  color: black
.description
    display: -webkit-box
    -webkit-box-orient: vertical
    -webkit-line-clamp: 2 /* Número de linhas que você quer exibir */
    overflow: hidden
    text-overflow: ellipsis
    height: 3em /* Ajuste de acordo com o número de linhas */
</style>
