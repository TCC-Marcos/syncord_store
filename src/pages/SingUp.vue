<template>
  <div class="container">
    <div class="row justify-center" style=" width: 100%;">
      <div class="col-7 q-pa-md q-mx-lg-lg form-singUp">
        <div class="q-ml-sm q-mb-md text-center text-h5">Criar Conta</div>
        <div class="row q-mb-sm justify-around">
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="nome" label="Nome*"/>
          <q-input class="q-px-sm" style="width: 50%;" mask="###.###.###-##" outlined v-model="cpf" label="CPF*"/>
        </div>
        <div class="row q-mb-sm justify-around">
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="dtNascimento" label="Data de nascimento"/>
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="genero" label="Gênero"/>
        </div>
        <div class="row q-mb-sm justify-around">
          <q-input class="q-px-sm" style="width: 50%;" mask="(##)#####-####" outlined v-model="telefone" label="Telefone"/>
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="email" label="E-mail"/>
        </div>
        <div class="row q-mb-sm justify-around">
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="password" label="Senha"/>
          <q-input class="q-px-sm" style="width: 50%;" outlined v-model="passwordConfirmar" label="Confirmar senha"/>
        </div>
        <div class="text-center q-mt-md">já tenho uma conta <router-link class="singIn" :to="{ name: 'singIn' }">entrar</router-link></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.container
  display: flex
  justify-content: center
  align-items: center
  height: 80vh
.form-singUp
  background-color: #F2F2F2
  border-radius: 0.5em
.singIn
  color: inherit
  &:hover
    color: #57B7F2
</style>
