<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated style="background-color: #0583F2; color: #F2F2F2;">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <router-link :to="{ name: 'home' }" style="text-decoration: none; color: #F2F2F2">Syncord Store</router-link>
        </q-toolbar-title>

        <div>
          <q-btn flat round color="#F2F2F2" icon="shopping_cart" :to="{ name: 'carrinho'}">
            <q-badge v-if="cart.length > 0" color="red" floating>{{ cart.length }}</q-badge>
          </q-btn>
          <q-btn flat round color="#F2F2F2" icon="person" :to="{ name: 'singIn'}"/>
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
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Home',
    caption: '',
    icon: 'home',
    route: { name: 'home' }
  }
]

const { cart } = useCart()

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      cart,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
