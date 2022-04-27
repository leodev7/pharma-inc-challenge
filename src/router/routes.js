
const routes = [
  {
    path: '/',
    name: 'r_home',
    component: () => import('pages/IndexPage.vue'),
    children: [
      { path: 'user/:pacientId', name: 'r_pacient_view', props: true, component: () => import('components/ModalPacientView.vue') }
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
