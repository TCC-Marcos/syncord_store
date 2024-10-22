<template>
  <div class="container">
    <div class="row justify-center" style=" width: 100%;">
      <div class="col-6 q-pa-md q-mx-lg-lg form-singUp">
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
  height: 70vh
.form-singUp
  background-color: #F2F2F2
  border-radius: 0.5em
</style>
