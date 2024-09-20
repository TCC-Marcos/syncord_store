<template>
  <div class="q-my-xl row justify-center q-gutter-md">
    <div class="col-xs-10 col-md-4 col-lg-4">
      <q-img src="img/1.jpg"/>
    </div>
    <div class="col-xs-11 col-md-5 col-lg-5 infoproduto">
      <div class="row q-mx-lg q-pb-lg q-mb-lg">
          <p class="q-my-xs q-pt-lg text-h5 text-weight-regular">Apple iPhone 15 256GB Preto 5G Tela 6,1" Câm. Traseira 48+12MP Frontal 12MP</p>
          <p class="q-px-sm text-caption">Cod: KL3J23</p>
      </div>
      <div class="row items-center q-pt-lg">
        <q-card flat style="background-color: #F2F2F2" class=" q-ml-md my-card">
          <q-card-section>
            <div class="col row ">
               <p class="text-subtitle1 q-mb-xs ">De:</p>
               <div class="text-subtitle1 q-mb-xs text-strike">R$ 8.239,19</div>
            </div>
            <div class="col row">
              <p class="q-mb-xs text-h5">Por: </p>
              <p class="q-px-xs q-mb-xs text-h4 text-weight-bolder" style="color: green;">R$ 7.415,27</p>
            </div>
            <div>
              <p class="text-subtitle2">À vista no PIX 10% desconto</p>
            </div>
          </q-card-section>
        </q-card>
        <div class="col row justify-center q-mr-md">
          <q-btn class="text-subtitle2 q-mb-md q-ml-lg" color="primary">
            <q-icon name="shopping_cart"/>
            Comprar
          </q-btn>
          <q-btn class="text-subtitle2 q-mb-md q-ml-lg" color="primary">
            <q-icon name="shopping_cart"/>
            <q-icon name="add"/>
          </q-btn>
        </div>
      </div>
    </div>
  </div>
  <div class="row justify-center">
    <div class="col-9 items-center">
      <div class="text-h4 q-pb-lg">Outros produtos</div>
        <q-table
          class="q-pb-lg items-center"
          grid
          flat bordered
          :card-container-class="cardContainerClass"
          title=""
          :rows="rows"
          :columns="columns"
          row-key="name"
          hide-header
          hide-bottom
          v-model:pagination="pagination"
        >
          <template v-slot:item="props">
            <div class="q-pa-xs q-ma-lg-xs col-xs-12 col-sm-6 col-md-3 col-lg-2">
              <router-link :to="{name: 'produto'}">
                <q-card flat bordered>
                  <img class="flex" :src= "`/img/${props.row.id}.jpg`">
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
    </div>
  </div>
</template>

<script>
import { useQuasar } from 'quasar'
import { ref, watch } from 'vue'

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

export default {
  setup () {
    const $q = useQuasar()

    function getItemsPerPage () {
      if ($q.screen.lt.sm) {
        return 3
      }
      if ($q.screen.lt.lg) {
        return 4
      }
      return 5
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
      rows,

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
