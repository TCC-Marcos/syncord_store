<template>
  <div class="bg-grey-2 q-pb-xl" style="min-height: 100vh;">
    <div class="q-pa-md q-mx-auto" style="max-width: 1200px;">

      <q-stepper
        v-model="step"
        ref="stepper"
        color="primary"
        animated
        flat
        class="bg-transparent"
        header-class="bg-white shadow-1 rounded-borders q-mb-md"
      >
        <q-step :name="1" title="Carrinho" icon="shopping_cart" :done="step > 1">
          <div v-if="itensCarrinho.length > 0" class="row q-col-gutter-md">

            <div class="col-12 col-md-8">
              <q-card flat bordered class="q-pa-md bg-white rounded-borders">
                <div class="text-h6 q-mb-md text-grey-9">Produtos no Carrinho</div>
                <q-separator class="q-mb-md" />

                <div v-for="produto in itensCarrinho" :key="produto.id" class="row items-center q-mb-md q-pb-md" style="border-bottom: 1px solid #eee;">

                  <div class="col-3 col-sm-2 q-pr-md">
                    <q-img :src="produto.imagem" ratio="1" fit="contain" class="rounded-borders bg-grey-1" />
                  </div>

                  <div class="col-9 col-sm-4 column justify-center q-pr-sm">
                    <div class="text-subtitle1 text-weight-medium text-grey-9 ellipsis-2-lines" style="line-height: 1.2;">
                      {{ produto.descricao }}
                    </div>
                    <div class="text-caption text-grey-6 q-mt-xs">Vendindo e entregue por Syncord</div>
                  </div>

                  <div class="col-6 col-sm-3 flex flex-center q-mt-sm q-mt-sm-none">
                    <div class="row items-center bg-grey-2 rounded-borders">
                      <q-btn flat dense icon="remove" color="grey-8" @click="decrementarQtde(produto.id)" :disable="produto.quantidade <= 1" />
                      <div class="q-px-md text-weight-bold">{{ produto.quantidade }}</div>
                      <q-btn flat dense icon="add" color="grey-8" @click="incrementarQtde(produto.id, produto.estoque)" />
                    </div>
                  </div>

                  <div class="col-6 col-sm-3 column items-end justify-center q-mt-sm q-mt-sm-none">
                    <div class="text-subtitle1 text-weight-bold text-primary">
                      {{ (((produto.preco)*desconto)*produto.quantidade).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                    </div>
                    <q-btn flat dense color="negative" icon="delete" size="sm" label="Remover" class="q-mt-xs" @click="removeProduto(produto.id)" />
                  </div>
                </div>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="bg-white rounded-borders q-pa-md sticky-summary">
                <div class="text-h6 q-mb-md text-grey-9">Resumo do Pedido</div>
                <q-separator class="q-mb-md" />

                <div class="row justify-between q-mb-sm text-grey-8">
                  <span>Subtotal ({{ itensCarrinho.length }} itens)</span>
                  <span>{{ valorCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</span>
                </div>

                <div class="row justify-between q-mb-sm text-positive">
                  <span>Desconto PIX (10%)</span>
                  <span>- {{ (valorCarrinho * 0.1).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}</span>
                </div>

                <div class="row justify-between q-mb-md text-grey-8">
                  <span>Frete</span>
                  <span class="text-positive">Grátis</span>
                </div>

                <q-separator class="q-mb-md" />

                <div class="row justify-between items-center q-mb-lg">
                  <span class="text-h6 text-weight-bold text-grey-9">Total</span>
                  <span class="text-h5 text-weight-bolder text-primary">
                    {{ (valorCarrinho * desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                  </span>
                </div>

                <q-btn
                  unelevated
                  color="primary"
                  size="lg"
                  class="full-width text-weight-bold q-mb-sm"
                  label="Continuar para Entrega"
                  @click="$refs.stepper.next()"
                />
                <q-btn
                  flat
                  color="grey-7"
                  class="full-width"
                  label="Limpar Carrinho"
                  @click="LimparCarrinho"
                />
              </q-card>
            </div>
          </div>

          <div v-else class="text-center q-py-xl bg-white rounded-borders shadow-1">
            <q-icon name="production_quantity_limits" size="100px" color="grey-4" />
            <div class="text-h5 text-grey-8 q-mt-md q-mb-lg">Seu carrinho está vazio</div>
            <q-btn unelevated color="primary" size="lg" icon="storefront" label="Voltar para a loja" :to="{ name: 'home'}" />
          </div>
        </q-step>

        <q-step :name="2" title="Entrega" icon="local_shipping" :done="step > 2">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <q-card flat bordered class="q-pa-md bg-white rounded-borders">
                <div class="text-h6 q-mb-md text-grey-9">Endereço de Entrega</div>

                <q-form class="row q-col-gutter-sm">
                  <div class="col-12 col-sm-4">
                    <q-input outlined v-model="endereco.cep" label="CEP *" mask="#####-###" color="primary" />
                  </div>
                  <div class="col-12 col-sm-8">
                    <q-input outlined v-model="endereco.rua" label="Rua / Avenida *" color="primary" />
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-input outlined v-model="endereco.numero" label="Número *" color="primary" />
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-input outlined v-model="endereco.complemento" label="Complemento" color="primary" />
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-input outlined v-model="endereco.bairro" label="Bairro *" color="primary" />
                  </div>
                  <div class="col-12 col-sm-8">
                    <q-input outlined v-model="endereco.cidade" label="Cidade *" color="primary" />
                  </div>
                  <div class="col-12 col-sm-4">
                    <q-select outlined v-model="endereco.estado" :options="estados" label="Estado *" color="primary" />
                  </div>
                </q-form>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="bg-white rounded-borders q-pa-md">
                <div class="row justify-between items-center q-mb-md">
                  <span class="text-h6 text-weight-bold text-grey-9">Total</span>
                  <span class="text-h5 text-weight-bolder text-primary">
                    {{ (valorCarrinho * desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                  </span>
                </div>
                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-btn outline color="primary" class="full-width" label="Voltar" @click="$refs.stepper.previous()" />
                  </div>
                  <div class="col-6">
                    <q-btn unelevated color="primary" class="full-width text-weight-bold" label="Ir p/ Pagamento" @click="$refs.stepper.next()" />
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </q-step>

        <q-step :name="3" title="Pagamento" icon="credit_card" :done="step > 3">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-md-8">
              <q-card flat bordered class="bg-white rounded-borders">
                <q-tabs
                  v-model="formaPagamento"
                  dense
                  class="text-grey-7 bg-grey-1"
                  active-color="primary"
                  indicator-color="primary"
                  align="justify"
                >
                  <q-tab name="pix" icon="pix" label="PIX (-10%)" />
                  <q-tab name="cartao" icon="credit_card" label="Cartão de Crédito" />
                  <q-tab name="boleto" icon="receipt" label="Boleto" />
                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="formaPagamento" animated class="q-pa-md">

                  <q-tab-panel name="pix">
                    <div class="text-center q-py-md">
                      <q-icon name="qr_code_2" size="100px" color="grey-8" />
                      <div class="text-h6 q-mt-md">Pagamento via PIX</div>
                      <p class="text-grey-7">O código QR será gerado na próxima tela após finalizar o pedido.</p>
                      <div class="text-h5 text-weight-bold text-positive q-mt-md">
                        Total: {{ (valorCarrinho * desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                      </div>
                    </div>
                  </q-tab-panel>

                  <q-tab-panel name="cartao">
                    <q-form class="row q-col-gutter-sm">
                      <div class="col-12">
                        <q-input outlined v-model="cartao.numero" label="Número do Cartão" mask="#### #### #### ####" color="primary">
                          <template v-slot:prepend><q-icon name="credit_card" /></template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-input outlined v-model="cartao.nome" label="Nome impresso no cartão" color="primary" />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="cartao.validade" label="Validade (MM/AA)" mask="##/##" color="primary" />
                      </div>
                      <div class="col-6">
                        <q-input outlined v-model="cartao.cvv" label="CVV" mask="###" color="primary">
                          <template v-slot:append><q-icon name="help_outline" size="xs" color="grey" /></template>
                        </q-input>
                      </div>
                      <div class="col-12">
                        <q-select outlined v-model="cartao.parcelas" :options="opcoesParcelamento" label="Parcelamento" color="primary" />
                      </div>
                    </q-form>
                  </q-tab-panel>

                  <q-tab-panel name="boleto">
                     <div class="text-center q-py-md">
                      <q-icon name="description" size="80px" color="grey-8" />
                      <div class="text-h6 q-mt-md">Boleto Bancário</div>
                      <p class="text-grey-7">O boleto será gerado e enviado para o seu e-mail após a confirmação.</p>
                      <p class="text-caption text-negative">Atenção: A confirmação de pagamento pode levar até 3 dias úteis.</p>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card flat bordered class="bg-white rounded-borders q-pa-md">
                <div class="row justify-between items-center q-mb-md">
                  <span class="text-h6 text-weight-bold text-grey-9">Total Final</span>
                  <span class="text-h5 text-weight-bolder text-primary">
                    {{ formaPagamento === 'pix' ? (valorCarrinho * desconto).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) : valorCarrinho.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'}) }}
                  </span>
                </div>
                <div class="row q-col-gutter-sm">
                  <div class="col-6">
                    <q-btn outline color="primary" class="full-width" label="Voltar" @click="$refs.stepper.previous()" />
                  </div>
                  <div class="col-6">
                    <q-btn unelevated color="positive" icon="check_circle" class="full-width text-weight-bold" label="Finalizar" @click="finalizarCompra" />
                  </div>
                </div>
              </q-card>
            </div>
          </div>
        </q-step>

        <q-step :name="4" title="Concluído" icon="check" class="text-center q-py-xl">
          <q-icon name="check_circle" color="positive" size="120px" />
          <h4 class="text-weight-bold text-grey-9 q-mt-md q-mb-sm">Compra Realizada!</h4>
          <p class="text-h6 text-grey-7 q-mb-xl">Seu pedido <strong>#SYNC{{ Math.floor(Math.random() * 100000) }}</strong> foi processado com sucesso.</p>

          <div class="row justify-center q-gutter-md">
            <q-btn outline color="primary" size="lg" label="Meus Pedidos" />
            <q-btn unelevated color="primary" size="lg" label="Voltar para a Loja" :to="{ name: 'home' }" />
          </div>
        </q-step>

        <template v-slot:navigation>
          <div style="display: none;"></div>
        </template>

      </q-stepper>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { useCart } from 'src/composables/UseCart'
import produtosService from 'src/services/produtos'
import { useAuthStore } from 'src/stores/auth'
import { api } from 'src/boot/axios'

// --- CARRINHO LOGIC ---
const { cart, removeCart, increQuant, decreQuant, clearCart } = useCart()
const { listByIds } = produtosService()
const authStore = useAuthStore()

const step = ref(1)
const stepper = ref(null)
const itensCarrinho = ref([])
const valorCarrinho = ref(0)
const desconto = ref(0.9)

// --- NOVOS DADOS: ENDEREÇO E PAGAMENTO ---
const endereco = ref({
  cep: '', rua: '', numero: '', complemento: '', bairro: '', cidade: '', estado: null
})
const estados = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']

const formaPagamento = ref('pix')
const cartao = ref({
  numero: '', nome: '', validade: '', cvv: '', parcelas: null
})

// Simula opções de parcelamento baseadas no valor do carrinho
const opcoesParcelamento = computed(() => {
  const opções = []
  for (let i = 1; i <= 10; i++) {
    const valorParcela = valorCarrinho.value / i
    opções.push({
      label: `${i}x de ${valorParcela.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} sem juros`,
      value: i
    })
  }
  return opções
})

// --- MÉTODOS ORIGINAIS ---
const getCarrinho = async () => {
  try {
    if (authStore.carrinhoId) {
      const res = await api.get('/carrinho/me', {
        headers: { Authorization: `Bearer ${authStore.accessToken}` }
      })
      itensCarrinho.value = res.data.itens.map(i => ({
        id: i.produtoId, nome: i.nomeProduto, descricao: i.nomeProduto, preco: i.precoUnitario, quantidade: i.quantidade, imagem: i.imagem, estoque: 100
      }))
      cart.value = itensCarrinho.value.map(i => ({ id: i.id, quantidade: i.quantidade }))
    } else {
      if (cart.value.length > 0) {
        const cartIds = cart.value.map(item => item.id)
        const data = await listByIds(cartIds)
        itensCarrinho.value = data.map(item => {
          const produtoCarrinho = cart.value.find(p => p.id === item.id)
          return produtoCarrinho ? { ...item, quantidade: produtoCarrinho.quantidade } : item
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
  valorCarrinho.value = itensCarrinho.value.reduce((total, item) => total + (item.quantidade * item.preco), 0)
}

const removeProduto = async (id) => {
  await removeCart(id)
  await getCarrinho()
}

const incrementarQtde = async (id, estoque) => {
  await increQuant(id, estoque)
  const item = itensCarrinho.value.find(o => o.id === id)
  if (item) {
    item.quantidade = Math.min(item.quantidade + 1, estoque)
    calcularPreco()
  }
}

const decrementarQtde = async (id) => {
  await decreQuant(id)
  const item = itensCarrinho.value.find(o => o.id === id)
  if (item) {
    item.quantidade = Math.max(item.quantidade - 1, 1)
    calcularPreco()
  }
}

const LimparCarrinho = async () => {
  await clearCart()
  await getCarrinho()
}

// --- NOVO MÉTODO: FINALIZAR COMPRA ---
const finalizarCompra = async () => {
  // Aqui você enviaria os dados (itens, endereco, pagamento) para a sua API de pedidos
  // Simulando sucesso e avançando para a última tela
  await clearCart() // Limpa o carrinho após comprar
  step.value = 4
}

onMounted(() => {
  getCarrinho()
})
</script>

<style lang="sass" scoped>
.sticky-summary
  position: sticky
  top: 20px /* Ajuste para o resumo acompanhar a tela ao rolar no PC */

.ellipsis-2-lines
  display: -webkit-box
  -webkit-box-orient: vertical
  -webkit-line-clamp: 2
  overflow: hidden
  text-overflow: ellipsis
</style>
