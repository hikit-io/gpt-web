import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import '@varlet/touch-emulator'
import {DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Chat.vue')
        }
    ],
})

const httpLink = createHttpLink({
    uri: 'https://api.hikit.io/gpt/',
    credentials: 'include'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

createApp(App)
    .use(router)
    .use(VueVirtualScroller)
    .provide(DefaultApolloClient, apolloClient)
    .mount('#app')
