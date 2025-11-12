<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated style="background-color: #0583F2; color: #F2F2F2;">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <router-link :to="{ name: 'home' }" style="text-decoration: none; color: #F2F2F2">
            Syncord Store
          </router-link>
        </q-toolbar-title>

        <div>
          <q-btn flat round color="#F2F2F2" icon="shopping_cart" :to="{ name: 'carrinho' }">
            <q-badge v-if="cart.length > 0" color="red" floating>{{ cart.length }}</q-badge>
          </q-btn>

          <!-- Login / User Dropdown -->
          <q-btn v-if="!auth.isLoggedIn" flat round color="#F2F2F2" icon="person" :to="{ name: 'singIn' }" />

          <q-btn v-else flat round color="#F2F2F2" icon="person">
            <q-menu>
              <q-list style="min-width: 150px">
                <q-item clickable v-ripple :to="{ name: 'minhaConta' }">
                  <q-item-section avatar>
                    <q-icon name="manage_accounts" />
                  </q-item-section>
                  <q-item-section>Minha Conta</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-ripple @click="doLogout">
                  <q-item-section avatar>
                    <q-icon name="logout" />
                  </q-item-section>
                  <q-item-section>Sair</q-item-section>
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
      :width="250"
      :breakpoint="500"
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
        </q-item-label>

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

<script>
import { defineComponent, ref } from 'vue'
import { useCart } from 'src/composables/UseCart'
import { useAuthStore } from 'src/stores/auth'
import { useRouter } from 'vue-router'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  { title: 'Home', caption: '', icon: 'home', route: { name: 'home' } }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const { cart } = useCart()
    const auth = useAuthStore()
    const router = useRouter()

    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    function doLogout () {
      auth.logout()
      router.push('/singIn')
    }

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      cart,
      auth,
      toggleLeftDrawer,
      doLogout
    }
  }
})
</script>
