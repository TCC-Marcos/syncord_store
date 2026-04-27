<template>
  <div class="bg-grey-2" style="min-height: 100vh;">
    <div class="bg-white q-pb-md shadow-1">
      <q-carousel
        animated
        v-model="slide"
        navigation
        infinite
        :autoplay="autoplay"
        arrows
        height="400px"
        transition-prev="slide-right"
        transition-next="slide-left"
        @mouseenter="autoplay = false"
        @mouseleave="autoplay = true"
      >
        <q-carousel-slide :name="1" img-src="/img/carrossel1.jpg" />
        <q-carousel-slide :name="2" img-src="/img/carrossel2.jpg" />
      </q-carousel>
    </div>

    <div class="q-pa-md q-mx-auto" style="max-width: 1400px;">

      <div class="row items-center justify-between q-mb-lg q-mt-md">
        <h4 class="text-weight-bold q-my-none text-grey-9">Nossos Produtos</h4>
        <q-input
          outlined
          dense
          bg-color="white"
          v-model="filter"
          placeholder="Buscar produtos..."
          style="width: 300px; max-width: 100%;"
        >
          <template v-slot:append>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>
      </div>

      <div class="row q-col-gutter-md">
        <div
          v-for="produto in paginatedProducts"
          :key="produto.id"
          class="col-12 col-sm-6 col-md-4 col-lg-3"
        >
          <router-link :to="{name: 'produto', params: { id: produto.id }}" class="card-link">
            <q-card class="product-card cursor-pointer flex column shadow-2" bordered>

              <q-img
                :src="produto.imagem"
                style="height: 220px; width: 100%;"
                fit="contain"
                class="bg-white"
              >
                <template v-slot:error>
                  <div class="absolute-full flex column flex-center bg-grey-3 text-grey-8">
                    <q-icon name="image_not_supported" size="2em" class="q-mb-sm" />
                    <div>Sem imagem</div>
                  </div>
                </template>
              </q-img>

              <q-separator />

              <q-card-section class="q-pt-md column flex-grow-1">
                <div class="description text-subtitle1 text-weight-medium text-grey-9 q-mb-xs">
                  {{ produto.descricao }}
                </div>

                <div class="q-mt-auto">
                  <div class="text-h6 text-primary text-weight-bolder">
                    {{ produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
                  </div>

                  <div class="q-mt-sm">
                    <q-badge color="positive" outline label="Frete Grátis" icon="local_shipping" class="q-py-xs q-px-sm" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </router-link>
        </div>
      </div>

      <div class="row justify-center q-mt-xl q-mb-md" v-if="pagesNumber > 1">
        <q-pagination
          v-model="pagination.page"
          color="primary"
          :max="pagesNumber"
          :max-pages="6"
          boundary-numbers
          direction-links
        />
      </div>

      <div v-if="paginatedProducts.length === 0" class="text-center q-py-xl text-grey-6">
        <q-icon name="sentiment_dissatisfied" size="64px" class="q-mb-md" />
        <div class="text-h6">Nenhum produto encontrado.</div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, computed, watch, onMounted } from 'vue'
import produtosService from 'src/services/produtos'

const $q = useQuasar()
const produtos = ref([])
const { list } = produtosService()

// Reactive state
const slide = ref(1)
const autoplay = ref(true)
const filter = ref('')
const pagination = ref({
  page: 1,
  rowsPerPage: 12
})

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

// Responsive items per page logic
const updateRowsPerPage = () => {
  if ($q.screen.lt.sm) {
    pagination.value.rowsPerPage = 4 // Show fewer on mobile to avoid endless scrolling
  } else if ($q.screen.lt.md) {
    pagination.value.rowsPerPage = 8
  } else if ($q.screen.lt.lg) {
    pagination.value.rowsPerPage = 12
  } else {
    pagination.value.rowsPerPage = 16
  }
}

// Watch for screen size changes to adjust pagination
watch(() => $q.screen.name, () => {
  updateRowsPerPage()
  pagination.value.page = 1 // Reset to first page on resize to avoid empty pages
}, { immediate: true }) // Run immediately on setup

// Computed property to handle both filtering and pagination locally
const filteredProducts = computed(() => {
  if (!filter.value) return produtos.value

  const searchTerm = filter.value.toLowerCase()
  return produtos.value.filter(p =>
    p.descricao.toLowerCase().includes(searchTerm)
  )
})

const pagesNumber = computed(() => {
  return Math.ceil(filteredProducts.value.length / pagination.value.rowsPerPage) || 1
})

const paginatedProducts = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage
  const end = start + pagination.value.rowsPerPage
  return filteredProducts.value.slice(start, end)
})

// Reset to page 1 when searching
watch(filter, () => {
  pagination.value.page = 1
})

</script>

<style lang="sass" scoped>
.card-link
  text-decoration: none
  color: inherit

.product-card
  height: 100%
  transition: transform 0.2s ease, box-shadow 0.2s ease
  border-radius: 12px
  background-color: white

  &:hover
    transform: translateY(-5px)
    box-shadow: 0 5px 15px rgba(0,0,0,0.1) !important

.description
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
  line-height: 1.4em
  height: 2.8em /* 1.4em * 2 lines */
</style>
