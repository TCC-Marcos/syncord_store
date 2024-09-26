<template>
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
      :rows="rows"
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
              <q-img class="flex" :src= "`/img/${props.row.id}.jpg`"/>
              <q-card-section class="">
                <br>
                <strong class="description">{{ props.row.description }}</strong>
                <h6 class="q-my-md">R$ {{props.row.price}}</h6>
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
</template>

<script>
import { useQuasar } from 'quasar'
import { defineComponent, ref, computed, watch } from 'vue'

const deserts = [
  'Apple iPhone 15 256GB Preto 5G Tela 6,1" Câm. Traseira 48+12MP Frontal 12MP',
  'Processador AMD Ryzen 5 7600X 4.7GHz/ 5.3GHz Hexa-Core 38MB AM5 - 100-100000593WOF',
  'ROTEADOR TP-LINK AC1350 ARCHER C60',
  'Sony Play Station 5 Com 2 controles',
  'Placa de Vídeo Gigabyte NVIDIA GeForce RTX 4060 Gaming OC, 8G, 8GB, GDDR6, DLSS, Ray Tracing',
  'Kingston Memória Ram Fury Renegade Rgb 1x16gb DDR5 7200mhz Colorido',
  'Microsoft Xbox Series X 1TB Standard - Preto',
  'Controle Microsoft Xbox Carbon Black, Sem Fio, Para Xbox Series X e S, Preto',
  'Controle Microsoft Xbox Carbon Black, Sem Fio, Para Xbox Series X e S, Preto',
  'Controle Microsoft Xbox Carbon Black, Sem Fio, Para Xbox Series X e S, Preto'
]
const rows = []

let i = 1
deserts.forEach(name => {
  rows.push({ id: i++, description: name, price: 8239.19 })
})

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const $q = useQuasar()

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
      rows,

      filter,
      pagination,
      slide: ref(1),
      autoplay: ref(true),
      pagesNumber: computed(() => Math.ceil(rows.length / pagination.value.rowsPerPage))
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
