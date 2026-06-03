<template>
  <q-page class="q-pa-xl bg-grey-2">

    <div class="text-subtitle2 text-weight-bold text-grey-9 q-mb-md">
      Central Minha Conta
    </div>

    <q-card class="q-mb-xl shadow-1" style="border-radius: 8px;">
      <q-card-section class="row items-center justify-between q-pa-md">

        <div class="row items-center q-gutter-lg">

          <div class="column">
            <div class="text-h6 text-weight-bolder text-grey-10">
              Bem-vindo, MARCOS CORDEIRO PIRES
            </div>
            <div class="row items-center text-grey-7 q-gutter-sm q-mt-xs text-body2">
              <q-icon name="mail" color="primary" size="1.2em" />
              <span>marcosccpiress15@gmail.com</span>
            </div>
          </div>
        </div>

        <q-btn
          color="primary"
          icon="edit"
          label="EDITAR DADOS"
          unelevated
          class="text-weight-bold"
          padding="8px 16px"
        />
      </q-card-section>
    </q-card>

    <div class="row items-center q-gutter-sm q-mb-md">
      <div class="text-h6 text-weight-bolder text-grey-9">
        ATALHOS
      </div>
    </div>

    <div class="row q-col-gutter-md">

      <div class="col-12 col-md-4">
        <q-card class="shadow-1 cursor-pointer q-hoverable" v-ripple style="border-radius: 8px;" @click="$router.push('/meusPedidos')">
          <q-card-section class="row items-center q-gutter-md q-pa-lg">
            <q-icon name="shopping_basket" color="primary" size="2em" />
            <div class="text-subtitle1 text-weight-bold text-grey-9">
              MEUS PEDIDOS
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="shadow-1 cursor-pointer q-hoverable" v-ripple style="border-radius: 8px;" @click="$router.push('/meusDados')">
          <q-card-section class="row items-center q-gutter-md q-pa-lg">
            <q-icon name="person" color="primary" size="2em" />
            <div class="text-subtitle1 text-weight-bold text-grey-9">
              MEUS DADOS
            </div>
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-4">
        <q-card class="shadow-1 cursor-pointer q-hoverable" v-ripple style="border-radius: 8px;" @click="$router.push('/meusEnderecos')">
          <q-card-section class="row items-center q-gutter-md q-pa-lg">
            <q-icon name="location_on" color="primary" size="2em" />
            <div class="text-subtitle1 text-weight-bold text-grey-9">
              ENDEREÇO
            </div>
          </q-card-section>
        </q-card>
      </div>
      <!-- <q-btn
        label="Conectar Discord"
        color="primary"
        @click="conectarDiscord"
      /> -->

    </div>
  </q-page>
</template>

<script setup>
// const conectarDiscord = () => {
//   const clientId = 'SEU_CLIENT_ID'

//   const redirectUri =
//     encodeURIComponent(
//       'https://localhost:7017/auth/discord/callback'
//     )

//   window.location.href =
//       'https://discord.com/api/oauth2/authorize' +
//       `?client_id=${clientId}` +
//       `&redirect_uri=${redirectUri}` +
//       '&response_type=code' +
//       '&scope=identify'
// }
// Aqui você pode adicionar reatividade com ref/reactive
// para buscar o Nome, Email e Foto do usuário via API.
</script>

<style scoped>
/* Adicionando um pequeno efeito de hover nos atalhos para melhorar a UX */
.q-hoverable:hover {
  background-color: #fcfcfc;
  transform: translateY(-2px);
  transition: all 0.2s ease-in-out;
}
</style>
