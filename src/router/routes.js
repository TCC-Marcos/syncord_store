const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout2.vue'),
    children: [
      { path: '', name: 'home', component: () => import('pages/IndexPage.vue') },
      { path: 'produto/:id?', name: 'produto', component: () => import('pages/ProdutoEscolhido.vue') },
      { path: 'carrinho', name: 'carrinho', component: () => import('pages/CarrinhoCompras.vue') },
      { path: 'singIn', name: 'singIn', component: () => import('pages/SingIn.vue') },
      { path: 'singUp', name: 'singUp', component: () => import('pages/SingUp.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
