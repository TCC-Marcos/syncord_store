<template>
  <q-page class="q-pa-md bg-grey-2">

    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5 text-weight-bold">
        Meus Endereços
      </div>

      <q-btn
        color="primary"
        icon="add"
        label="Novo Endereço"
        @click="abrirNovoEndereco"
      />
    </div>

    <div v-if="enderecos.length" class="row q-col-gutter-md">
      <div
        v-for="endereco in enderecos"
        :key="endereco.id"
        class="col-12 col-md-6"
      >
        <q-card flat bordered>

          <q-card-section>
            <div class="row justify-between items-start">

              <div>
                <div class="text-h6">
                  {{ endereco.titulo }}
                </div>

                <div>
                  {{ endereco.rua }}, {{ endereco.numero }}
                </div>

                <div v-if="endereco.complemento">
                  {{ endereco.complemento }}
                </div>

                <div>
                  {{ endereco.bairro }}
                </div>

                <div>
                  {{ endereco.cidade }} - {{ endereco.estado }}
                </div>

                <div>
                  CEP: {{ endereco.cep }}
                </div>
              </div>

              <div>
                <q-btn
                  flat
                  round
                  icon="edit"
                  color="primary"
                  @click="editarEndereco(endereco)"
                />

                <q-btn
                  flat
                  round
                  icon="delete"
                  color="negative"
                  @click="excluirEndereco(endereco.id)"
                />
              </div>

            </div>
          </q-card-section>

        </q-card>
      </div>
    </div>

    <q-card
      v-else
      flat
      bordered
      class="text-center q-pa-xl"
    >
      <q-icon
        name="location_off"
        size="80px"
        color="grey-5"
      />

      <div class="text-h6 q-mt-md">
        Nenhum endereço cadastrado
      </div>

      <q-btn
        class="q-mt-md"
        color="primary"
        icon="add"
        label="Cadastrar endereço"
        @click="abrirNovoEndereco"
      />
    </q-card>

    <!-- Dialog -->
    <q-dialog v-model="dialogEndereco">
      <q-card style="width: 700px; max-width: 95vw">

        <q-card-section>
          <div class="text-h6">
            {{ editando ? 'Editar Endereço' : 'Novo Endereço' }}
          </div>
        </q-card-section>

        <q-card-section>

          <div class="row q-col-gutter-sm">

            <div class="col-12">
              <q-input
                outlined
                v-model="form.titulo"
                label="Título"
              />
            </div>

            <div class="col-4">
              <q-input
                outlined
                v-model="form.cep"
                label="CEP"
                mask="#####-###"
              />
            </div>

            <div class="col-8">
              <q-input
                outlined
                v-model="form.rua"
                label="Rua"
              />
            </div>

            <div class="col-4">
              <q-input
                outlined
                v-model="form.numero"
                label="Número"
              />
            </div>

            <div class="col-8">
              <q-input
                outlined
                v-model="form.complemento"
                label="Complemento"
              />
            </div>

            <div class="col-12">
              <q-input
                outlined
                v-model="form.bairro"
                label="Bairro"
              />
            </div>

            <div class="col-8">
              <q-input
                outlined
                v-model="form.cidade"
                label="Cidade"
              />
            </div>

            <div class="col-4">
              <q-input
                outlined
                v-model="form.estado"
                label="Estado"
              />
            </div>

          </div>

        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancelar"
            v-close-popup
          />

          <q-btn
            color="primary"
            label="Salvar"
            @click="salvarEndereco"
          />
        </q-card-actions>

      </q-card>
    </q-dialog>

  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import enderecosService from 'src/services/enderecos'

const {
  listByUserId,
  post,
  update,
  remove
} = enderecosService()

const enderecos = ref([])

const dialogEndereco = ref(false)

const editando = ref(false)

const enderecoId = ref(null)

const form = ref({
  titulo: '',
  cep: '',
  rua: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  estado: '',
  id: null
})

const limparFormulario = () => {
  enderecoId.value = null

  form.value = {
    titulo: '',
    cep: '',
    rua: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    id: null
  }
}

const carregarEnderecos = async () => {
  try {
    enderecos.value = await listByUserId()
  } catch (error) {
    console.error(error)
  }
}

const abrirNovoEndereco = () => {
  editando.value = false
  limparFormulario()
  dialogEndereco.value = true
}

const editarEndereco = (endereco) => {
  editando.value = true
  enderecoId.value = endereco.id

  form.value = {
    id: endereco.id,
    titulo: endereco.titulo,
    cep: endereco.cep,
    rua: endereco.rua,
    numero: endereco.numero,
    complemento: endereco.complemento,
    bairro: endereco.bairro,
    cidade: endereco.cidade,
    estado: endereco.estado
  }

  dialogEndereco.value = true
}

const salvarEndereco = async () => {
  console.log('FORM:', JSON.stringify(form.value))
  try {
    if (editando.value) {
      await update(form.value)
    } else {
      await post(form.value)
    }

    dialogEndereco.value = false

    await carregarEnderecos()
  } catch (error) {
    console.error(error)
  }
}

const excluirEndereco = async (id) => {
  try {
    await remove({ id })

    await carregarEnderecos()
  } catch (error) {
    console.error(error)
  }
}

onMounted(async () => {
  await carregarEnderecos()
})
</script>
