<template>
  <q-page class="q-pa-md bg-grey-2">
    <div class="column q-gutter-y-lg">

      <div>
        <h1 class="text-h4 text-weight-bold text-primary q-mb-md">
          Meus Pedidos
        </h1>
      </div>

      <q-card
        v-for="pedido in pedidos"
        :key="pedido.id"
        class="my-card shadow-1"
        style="border-radius: 4px;"
      >
        <q-card-section class="row items-center justify-between q-pa-md bg-white">
          <div class="text-subtitle1 text-grey-9">
            <span class="text-weight-bold">Pedido:</span> {{ pedido.id }}
              <div class="text-caption">
                {{ new Date(pedido.criadoEm).toLocaleDateString('pt-BR') }}
              </div>
          </div>

          <div class="row q-gutter-sm">
            <q-btn
              color="primary"
              icon="shopping_cart"
              label="GERENCIAR PEDIDO"
              unelevated
              class="text-weight-bold"
              padding="4px 16px"
              size="sm"
            />
            <q-btn
              color="primary "
              outline
              label="VER DETALHES"
              icon-right="chevron_right"
              class="text-weight-bold bg-white"
              padding="4px 16px"
              size="sm"
            />
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section class="q-pa-md q-py-sm bg-white">
          <div class="text-weight-bold text-green-7 text-subtitle2">
            {{ statusPedido(pedido.status) }}
          </div>

          <div class="text-subtitle2 text-weight-bold q-mt-sm">
            Total:
            {{
              pedido.valorTotal.toLocaleString(
                'pt-BR',
                {
                  style: 'currency',
                  currency: 'BRL'
                }
              )
            }}
          </div>
        </q-card-section>

        <q-separator />

        <q-card-section
          v-for="item in pedido.itens"
          :key="item.produtoId"
          class="q-pa-md bg-white"
        >
          <div class="row q-col-gutter-md items-center">

            <div class="col-auto">
              <q-img
                :src="item.imagem"
                style="width: 80px; height: 80px"
                fit="contain"
              />
            </div>

            <div class="col">
              <div class="text-body2 text-weight-medium">
                {{ item.nome }}
              </div>

              <div class="text-caption text-grey-7">
                Quantidade: {{ item.quantidade }}
              </div>

              <div class="text-caption text-primary">
                {{
                  item.precoUnitario.toLocaleString(
                    'pt-BR',
                    {
                      style: 'currency',
                      currency: 'BRL'
                    }
                  )
                }}
              </div>
            </div>

          </div>
        </q-card-section>
      </q-card>

    </div>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import pedidosService from 'src/services/pedidos'

const { listByUserId } = pedidosService()

// Array simulando o retorno da sua API no C#
const pedidos = ref([])

const statusPedido = (status) => {
  switch (status) {
    case 0: return 'Aguardando pagamento'
    case 1: return 'Pago'
    case 2: return 'Enviado'
    case 3: return 'Entregue'
    default: return status
  }
}

onMounted(async () => {
  try {
    const data = await listByUserId()
    console.log('Pedidos carregados:', data)
    pedidos.value = data
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped>
/* Classe para fazer o texto de "Ver comprovante" ficar sublinhado no hover */
.hover-underline:hover span {
  color: #ff5722; /* Laranja (deep-orange) no hover opcional */
  transition: color 0.2s;
}

/* Deixa a borda do card leve e parecida com a imagem */
.my-card {
  border: 1px solid #e0e0e0;
}
</style>
