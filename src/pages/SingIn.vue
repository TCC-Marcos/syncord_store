<template>
  <div class="window-height window-width flex flex-center bg-grey-2">

    <q-card class="q-pa-md shadow-3 my-card" bordered>

      <q-card-section class="text-center">
        <q-avatar size="80px" color="primary" text-color="white" class="q-mb-sm shadow-2">
          <q-icon name="person" />
        </q-avatar>
        <div class="text-h5 text-weight-bolder text-primary">Bem-vindo(a)</div>
        <div class="text-subtitle2 text-grey-6">Acesse sua conta para continuar</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">

          <q-input
            outlined
            v-model="email"
            label="E-mail ou Usuário"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="email" color="primary" />
            </template>
          </q-input>

          <q-input
            outlined
            v-model="senha"
            label="Senha"
            :type="isPwd ? 'password' : 'text'"
            color="primary"
          >
            <template v-slot:prepend>
              <q-icon name="lock" color="primary" />
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer text-grey-6"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>

          <div class="row justify-end">
            <a href="#" class="text-primary text-caption" style="text-decoration: none; font-weight: 500;">
              Esqueceu a senha?
            </a>
          </div>

          <div class="q-mt-lg">
            <q-btn
              unelevated
              size="lg"
              color="primary"
              class="full-width text-weight-bold"
              label="Entrar"
              type="submit"
            />
            <q-btn
              flat
              size="md"
              color="primary"
              class="full-width q-mt-sm"
              label="Criar nova conta"
              :to="{name: 'singUp'}"
            />
          </div>

        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'
import authService from 'src/services/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const email = ref('')
const senha = ref('')
const isPwd = ref(true)

const { login: loginApi } = authService()

const fazerLogin = async () => {
  try {
    const dadosLogin = {
      email: email.value,
      senha: senha.value
    }

    const res = await loginApi(dadosLogin)

    authStore.login(
      res.accessToken,
      res.refreshToken,
      null,
      res.carrinhoId
    )

    router.push({ name: 'home' })
  } catch (error) {
    console.log(error)

    const status =
      error?.response?.status ||
      error?.status ||
      error?.data?.statusCode

    if (status === 401) {
      $q.notify({
        message: 'Usuário ou senha inválidos',
        color: 'negative',
        position: 'top',
        icon: 'warning'
      })
      return
    }

    $q.notify({
      message: 'Erro ao realizar login',
      color: 'negative',
      position: 'top',
      icon: 'error'
    })
  }
}

const onSubmit = async () => {
  await fazerLogin()
}
</script>

<style lang="sass" scoped>
/* Controla o tamanho do card para ficar bonito no PC e não quebrar no celular */
.my-card
  width: 100%
  max-width: 420px
  border-radius: 16px
  background-color: #ffffff
</style>
