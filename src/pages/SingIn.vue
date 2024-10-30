<template>
  <div class="container">
    <div class="row justify-center form-row">
      <div class="col-3 q-pa-md q-mx-lg-lg form-login">
        <strong class="q-ml-xs text-h5">Acesse sua conta</strong>
        <q-input class="q-mt-md" outlined v-model="user" label="Usuário"/>
        <q-input class="q-mt-md" outlined v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'"  >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="cursor-pointer q-ma-xs text-weight-light">Esqueceu a senha?</div>
        <q-btn class="q-mt-lg" style="width: 100%; background-color: #0597F2; color: #F2F2F2">Entrar</q-btn>
        <div class="row q-my-xs justify-center">
          <router-link :to="{ name: 'singUp' }" class="text-subtitle1 text-weight-light singUp">
            Criar conta
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup () {
    return {
      isPwd: ref(true)
    }
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center
  height: 80vh
.form-login
  background-color: #F2F2F2
  border-radius: 0.5em
.form-row
  width: 100%
  @media (min-width: 1920px)
    width: 80%
.singUp
  color: inherit
  text-decoration: none
  &:hover
    color: #57B7F2
</style>
