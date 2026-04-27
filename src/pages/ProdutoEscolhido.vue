<template>
  <div class="bg-white q-pb-xl" style="min-height: 100vh;">
    <div class="q-pa-md q-mx-auto" style="max-width: 1300px;">

      <div v-if="!produtoDestaque.id" class="row q-col-gutter-xl justify-center q-mt-md">
        <div class="col-12 col-md-5"><q-skeleton height="400px" square /></div>
        <div class="col-12 col-md-7"><q-skeleton type="text" class="text-h3" /><q-skeleton type="text" class="text-h6 w-50" /></div>
      </div>

      <div v-else class="row q-col-gutter-xl justify-center q-mt-md q-mb-xl">

        <div class="col-12 col-md-5 col-lg-5 flex flex-center">
          <div class="thumbnail-main-container full-width">

            <div class="thumbnail-container q-gutter-sm">
              <q-img
                v-for="(imagem, index) in listaImagens"
                :key="index"
                :src="imagem"
                class="thumbnail cursor-pointer"
                :class="{ 'thumbnail--active': selectedImage === imagem }"
                @click="selectedImage = imagem"
                ratio="1"
              />
            </div>

            <q-card flat bordered class="col q-pa-md main-image-card" style="border-radius: 12px;">
              <q-img
                :src="selectedImage"
                style="max-height: 450px; width: 100%;"
                fit="contain"
              >
                <template v-slot:error>
                  <div class="absolute-full flex flex-center bg-grey-2 text-grey-8">Sem imagem</div>
                </template>
              </q-img>
            </q-card>
          </div>
        </div>

        <div class="col-12 col-md-7 col-lg-6 column justify-between">

          <div>
            <h1 class="text-h4 text-weight-bold q-my-none text-grey-9 lh-tight">
              {{ produtoDestaque.descricao }}
            </h1>
            <div class="q-mt-sm text-grey-6 text-subtitle2">
              Código: {{ produtoDestaque.id }} | Em estoque: {{ produtoDestaque.estoque }}
            </div>
          </div>

          <q-card flat bordered class="q-mt-lg bg-grey-1 q-pa-md" style="border-radius: 12px;">
            <div class="row items-center q-mb-sm">
              <span class="text-subtitle1 text-grey-7 q-mr-sm">De:</span>
              <span class="text-subtitle1 text-strike text-grey-6">{{ precoOriginal }}</span>
            </div>

            <div class="row items-baseline q-mb-xs">
              <span class="text-h6 text-grey-8 q-mr-sm">Por:</span>
              <span class="text-h3 text-weight-bolder text-positive">{{ precoDesconto }}</span>
            </div>

            <div class="text-subtitle1 text-weight-medium text-positive q-mb-md">
              <q-icon name="pix" size="sm" class="q-mr-xs" />
              À vista no PIX com 10% de desconto
            </div>

            <div class="text-subtitle2 text-grey-8">
              <q-icon name="credit_card" size="sm" class="q-mr-xs" />
              Ou até <strong>{{ parcelas }}x</strong> de <strong>{{ valorParcela }}</strong> sem juros
            </div>
          </q-card>

          <div class="q-mt-xl" v-if="produtoDestaque.estoque > 0">
            <div class="row q-gutter-md">
              <q-btn
                unelevated
                size="lg"
                color="primary"
                class="col text-weight-bold"
                icon="shopping_bag"
                label="Comprar Agora"
                @click="comprarDireto(produtoDestaque)"
              />
              <q-btn
                outline
                size="lg"
                color="primary"
                icon="add_shopping_cart"
                tooltip="Adicionar ao Carrinho"
                @click="adicionarAoCarrinho(produtoDestaque)"
              />
            </div>
          </div>

          <div v-else class="q-mt-xl bg-red-1 q-pa-md rounded-borders text-center border-red">
            <q-icon name="warning" color="negative" size="md" class="q-mb-sm" />
            <div class="text-h6 text-negative text-weight-bold">Produto Esgotado</div>
            <div class="text-red-8">Infelizmente este produto está sem estoque no momento.</div>
          </div>
        </div>
      </div>

      <q-separator class="q-my-xl" />

      <div>
        <div class="text-h5 text-weight-bold q-mb-lg text-grey-9">Você também pode gostar</div>

        <div class="row q-col-gutter-md">
          <div
            v-for="produto in produtosExibidos"
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
      </div>

    </div>
  </div>
</template>

<script setup>
import { useQuasar } from 'quasar'
import { ref, watch, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import produtosService from 'src/services/produtos'
import { useCart } from 'src/composables/UseCart'

const $q = useQuasar()
const route = useRoute()
const router = useRouter()
const { list, listById } = produtosService()
const { addCart } = useCart()

// Inicia como objeto vazio para evitar erros de renderização
const produtoDestaque = ref({})
const produtos = ref([])
const selectedImage = ref(null) // URL da imagem selecionada

onMounted(() => {
  getProduto(route.params.id)
  getProdutos()
})

// Assiste à mudança na URL para recarregar o produto se o usuário clicar num card de "Outros Produtos"
watch(() => route.params.id, (newId) => {
  if (newId) {
    produtoDestaque.value = {} // Limpa para mostrar o esqueleto de carregamento
    getProduto(newId)
    window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola a página para o topo
  }
})

const getProduto = async (produtoId) => {
  try {
    const data = await listById(produtoId)
    produtoDestaque.value = data
    // Define a imagem principal como a imagem inicial selecionada
    selectedImage.value = data.imagem
  } catch (error) {
    console.error(error)
    $q.notify({ type: 'negative', message: 'Erro ao carregar o produto.' })
  }
}

const getProdutos = async () => {
  try {
    const data = await list()
    produtos.value = data
  } catch (error) {
    console.error(error)
  }
}

// Lógica do Carrinho
const adicionarAoCarrinho = async (produto) => {
  try {
    const mensagem = await addCart(produto)
    $q.notify({ type: mensagem.type, message: mensagem.message })
  } catch (error) {
    console.error(error)
  }
}

const comprarDireto = async (produto) => {
  await adicionarAoCarrinho(produto)
  router.push({ name: 'carrinho' }) // Vai direto pro carrinho
}

// Propriedades Computadas para Preços e Parcelas
const precoOriginal = computed(() => {
  return produtoDestaque.value.preco
    ? produtoDestaque.value.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : ''
})

const precoDesconto = computed(() => {
  return produtoDestaque.value.preco
    ? (produtoDestaque.value.preco * 0.9).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : ''
})

const parcelas = computed(() => {
  return produtoDestaque.value.preco
    ? Math.min(Math.floor(produtoDestaque.value.preco / 55), 12)
    : 1
})

const valorParcela = computed(() => {
  if (!produtoDestaque.value.preco) return ''
  return parcelas.value === 0
    ? produtoDestaque.value.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    : (produtoDestaque.value.preco / parcelas.value).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
})

// Lógica para repetir a imagem principal como placeholders
const listaImagens = computed(() => {
  if (!produtoDestaque.value.imagem) return []
  // Retorna um array com a imagem principal repetida 4 vezes
  return [
    produtoDestaque.value.imagem,
    produtoDestaque.value.imagem,
    produtoDestaque.value.imagem,
    produtoDestaque.value.imagem
  ]
})

// Controla quantos "Outros Produtos" aparecem com base no tamanho da tela
const itensPorTela = computed(() => {
  if ($q.screen.lt.sm) return 2
  if ($q.screen.lt.md) return 3
  return 4
})

const produtosExibidos = computed(() => {
  return produtos.value
    .filter(p => p.id !== produtoDestaque.value.id)
    .slice(0, itensPorTela.value)
})

</script>

<style lang="sass" scoped>
.lh-tight
  line-height: 1.2

.border-red
  border: 1px solid #ffcdd2

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
  height: 2.8em

/* Estilos Específicos para os Thumbnails */
.thumbnail-main-container
  display: flex
  flex-direction: column
  @media (min-width: 600px)
    flex-direction: row // Fica do lado em telas maiores

.thumbnail-container
  display: flex
  flex-direction: row
  margin-bottom: 1em
  @media (min-width: 600px)
    flex-direction: column // Fica empilhado em telas maiores
    margin-bottom: 0
    margin-right: 1em

.thumbnail
  width: 60px
  height: 60px
  border-radius: 8px
  border: 2px solid #e0e0e0
  transition: border-color 0.2s ease
  background-color: white

  &--active
    border-color: var(--q-primary) // Usa a cor primária para destacar
</style>
