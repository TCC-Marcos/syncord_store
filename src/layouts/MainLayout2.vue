<template>
  <q-layout view="hHh Lpr lff">

    <q-header elevated class="bg-primary text-white">
      <q-toolbar class="q-py-sm q-px-md">

        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" class="q-mr-sm" />

        <q-toolbar-title>
          <router-link :to="{ name: 'home' }" class="row items-center logo-link">
            <q-icon name="storefront" size="md" class="q-mr-sm" />
            <span class="text-weight-bold text-h5 gt-xs">Syncord Store</span>
            <span class="text-weight-bold text-h6 lt-sm">Syncord</span> </router-link>
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">

          <q-btn flat dense no-caps :to="{ name: 'carrinho' }" class="q-px-sm">

            <div class="relative-position row items-center">
              <q-icon name="shopping_cart" size="sm" />
            </div>

            <span class="q-ml-sm text-weight-medium gt-xs">Carrinho</span>
          </q-btn>

          <q-separator vertical dark class="q-mx-sm gt-xs" opacity="0.3" />

          <q-btn v-if="!auth.isLoggedIn" flat dense no-caps :to="{ name: 'singIn' }" class="q-px-sm">
            <q-icon name="account_circle" size="sm" />
            <div class="column items-start q-ml-sm gt-xs" style="line-height: 1.2;">
              <span class="text-caption text-weight-light">Olá, faça seu login</span>
              <span class="text-weight-bold">Minha Conta</span>
            </div>
          </q-btn>

          <q-btn v-else flat dense no-caps class="q-px-sm">
            <q-icon name="account_circle" size="sm" />
            <div class="column items-start q-ml-sm gt-xs" style="line-height: 1.2;">
              <span class="text-caption text-weight-light">Bem-vindo(a)</span>
              <span class="text-weight-bold">Meu Perfil</span>
            </div>

            <q-menu transition-show="jump-down" transition-hide="jump-up" :offset="[0, 8]">
              <q-list style="min-width: 200px" class="q-py-sm">

                <q-item clickable v-ripple :to="{ name: 'minhaConta' }">
                  <q-item-section avatar>
                    <q-avatar color="primary" text-color="white" icon="manage_accounts" size="md" />
                  </q-item-section>
                  <q-item-section class="text-weight-medium text-grey-9">Minha Conta</q-item-section>
                </q-item>

                <q-item clickable v-ripple :to="{ name: 'meusPedidos' }">
                  <q-item-section avatar>
                    <q-avatar color="grey-2" text-color="primary" icon="shopping_bag" size="md" />
                  </q-item-section>
                  <q-item-section class="text-weight-medium text-grey-9">Meus Pedidos</q-item-section>
                </q-item>

                <q-separator class="q-my-sm" />

                <q-item clickable v-ripple @click="doLogout">
                  <q-item-section avatar>
                    <q-avatar color="red-1" text-color="negative" icon="logout" size="md" />
                  </q-item-section>
                  <q-item-section class="text-weight-medium text-negative">Sair</q-item-section>
                </q-item>

              </q-list>
            </q-menu>
          </q-btn>

        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      overlay
      :width="280"
      :breakpoint="800"
      bordered
      class="bg-white"
    >
      <div class="bg-primary q-pa-md text-white">
        <div class="text-weight-bold text-h6">Navegação</div>
      </div>
      <q-list class="q-mt-sm">
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
// import { useCart } from 'src/composables/UseCart'
import { useAuthStore } from 'src/stores/auth'
import EssentialLink from 'components/EssentialLink.vue'

// Estado da Loja e Autenticação
// const { cart } = useCart()
const auth = useAuthStore()
const router = useRouter()

// Estado do Menu Lateral
const leftDrawerOpen = ref(false)
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

// Configuração dos Links (Pode adicionar mais itens aqui)
const essentialLinks = [
  { title: 'Home', caption: 'Página inicial da loja', icon: 'home', route: { name: 'home' } }
]

// Função de Logout
const doLogout = () => {
  auth.logout()
  router.push('/singIn')
}
</script>

<style lang="sass" scoped>
.logo-link
  text-decoration: none
  color: white
  transition: opacity 0.2s ease
  &:hover
    opacity: 0.8
</style>
