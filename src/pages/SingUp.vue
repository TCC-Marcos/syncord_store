<template>
  <div class="window-height window-width flex flex-center bg-grey-2 q-pa-md">

    <q-card class="q-pa-md shadow-3 my-card" bordered>

      <q-card-section class="text-center">
        <q-avatar size="70px" color="primary" text-color="white" class="q-mb-sm shadow-2">
          <q-icon name="person_add" />
        </q-avatar>
        <div class="text-h5 text-weight-bolder text-primary">Criar Conta</div>
        <div class="text-subtitle2 text-grey-6">Preencha os dados abaixo para se cadastrar</div>
      </q-card-section>

      <q-card-section>
        <q-form class="q-gutter-md">

          <div class="row q-col-gutter-md">

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="nome" label="Nome completo *" color="primary">
                <template v-slot:prepend><q-icon name="person" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="cpf" mask="###.###.###-##" label="CPF *" color="primary">
                <template v-slot:prepend><q-icon name="badge" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="dtNascimento" mask="##/##/####" label="Data de nascimento" color="primary">
                <template v-slot:prepend><q-icon name="event" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="genero" label="Gênero" color="primary">
                <template v-slot:prepend><q-icon name="wc" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="telefone" mask="(##) #####-####" label="Telefone" color="primary">
                <template v-slot:prepend><q-icon name="phone" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input outlined v-model="email" label="E-mail *" color="primary" type="email">
                <template v-slot:prepend><q-icon name="email" color="primary" /></template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                outlined
                v-model="password"
                label="Senha *"
                :type="isPwd ? 'password' : 'text'"
                color="primary"
              >
                <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
                <template v-slot:append>
                  <q-icon :name="isPwd ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6" @click="isPwd = !isPwd" />
                </template>
              </q-input>
            </div>

            <div class="col-12 col-sm-6">
              <q-input
                outlined
                v-model="passwordConfirmar"
                label="Confirmar senha *"
                :type="isPwdConfirm ? 'password' : 'text'"
                color="primary"
              >
                <template v-slot:prepend><q-icon name="lock" color="primary" /></template>
                <template v-slot:append>
                  <q-icon :name="isPwdConfirm ? 'visibility_off' : 'visibility'" class="cursor-pointer text-grey-6" @click="isPwdConfirm = !isPwdConfirm" />
                </template>
              </q-input>
            </div>

          </div>

          <div class="q-mt-xl">
            <q-btn
              unelevated
              size="lg"
              color="primary"
              class="full-width text-weight-bold"
              label="Finalizar Cadastro"
              type="submit"
            />
          </div>

          <div class="text-center q-mt-md">
            <span class="text-grey-8">Já tem uma conta?</span>
            <q-btn
              flat
              color="primary"
              label="Entrar"
              class="q-ml-sm text-weight-bold"
              :to="{ name: 'singIn' }"
            />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Vínculos dos inputs
const nome = ref('')
const cpf = ref('')
const dtNascimento = ref('')
const genero = ref('')
const telefone = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmar = ref('')

// Controle de visibilidade das senhas
const isPwd = ref(true)
const isPwdConfirm = ref(true)
</script>

<style lang="sass" scoped>
/* O card de cadastro precisa ser um pouco mais largo que o de login para caber as duas colunas confortavelmente */
.my-card
  width: 100%
  max-width: 750px
  border-radius: 16px
  background-color: #ffffff
</style>
