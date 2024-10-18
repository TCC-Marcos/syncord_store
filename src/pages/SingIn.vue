<template>
  <div class="container">
    <div class="row justify-center" style=" width: 100%;">
      <div class="col-3 q-pa-md form-login">
        <q-input outlined v-model="user" label="Usuário"/>
        <q-input class="q-mt-md" outlined v-model="password" label="Senha" :type="isPwd ? 'password' : 'text'"  >
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>
        <div class="q-ma-xs">Esqueceu a senha?</div>
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
  height: 50vh
.form-login
  background-color: #F2F2F2
  border-radius: 0.5em
</style>
