import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import '@varlet/touch-emulator'
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

import GraphQL from './graphql'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('@/views/ChatView.vue'),
    },
  ],
})

createApp(App).use(router).use(VueVirtualScroller).use(GraphQL).mount('#app')
