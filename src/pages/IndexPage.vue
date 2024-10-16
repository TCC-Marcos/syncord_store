<template>
  <div>
    <div>
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="/img/carrossel1.jpg" />
        <q-carousel-slide :name="2" img-src="/img/carrossel2.jpg" />
      </q-carousel>
    </div>
    <div class="produtos q-pa-md">
      <q-table
        class="q-px-md-lg q-mx-md-lg q-px-xs-xs q-mx-xs-xs"
        grid
        flat bordered
        :card-container-class="cardContainerClass"
        title=""
        :rows="produtos"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        v-model:pagination="pagination"
        hide-pagination
      >
        <template v-slot:top-right>
          <q-input style="background-color: white;" class="q-px-md" borderless dense debounce="300" v-model="filter" placeholder="Buscar">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
        <template v-slot:item="props">
          <div class="q-pa-xs col-xs-12 col-sm-6 col-md-3 col-lg-2">
            <router-link :to="{name: 'produto', params: { id: props.row.id }}">
              <q-card flat bordered class="">
                <q-img class="flex" :src= "`img/${props.row.id}.jpg`"/>
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
      <div class="row justify-center q-mt-md">
        <q-pagination
          v-model="pagination.page"
          color="grey-8"
          :max="pagesNumber"
          size="sm"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import produtosService from 'src/services/produtos'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const $q = useQuasar()
    const produtos = ref([])
    const { list } = produtosService()

    onMounted(() => {
      getProdutos()
    })

    const getProdutos = async () => {
      try {
        const data = await list()
        produtos.value = data
      } catch (error) {
        console.error(error)
      }
    }

    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 5
      }
      if ($q.screen.lt.lg) {
        return 8
      }
      return 12
    }

    const filter = ref('')
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: getItemsPerPage()
    })

    watch(() => $q.screen.name, () => {
      pagination.value.rowsPerPage = getItemsPerPage()
    })
    return {
      produtos,

      filter,
      pagination,
      slide: ref(1),
      autoplay: ref(true),
      pagesNumber: computed(() => Math.ceil(produtos.value.length / pagination.value.rowsPerPage))
    }
  }
})
</script>

<style lang="sass" scoped>
.produtos
  background-color: #F2F2F2
.my-card
  width: 100%
  max-width: 250px
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
