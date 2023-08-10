import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createRouter, createWebHistory} from "vue-router";
import '@varlet/touch-emulator'
import {ApolloClients, DefaultApolloClient} from "@vue/apollo-composable";
import {ApolloClient, createHttpLink, from, InMemoryCache, split} from "@apollo/client/core";
import VueVirtualScroller from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import {createClient} from "graphql-ws";
import {GraphQLWsLink} from "@apollo/client/link/subscriptions";
import {getMainDefinition} from "@apollo/client/utilities";
import {onError} from "@apollo/client/link/error";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/Chat.vue')
        }
    ],
})

const errorLink = onError(({graphQLErrors, networkError, response}) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path, extensions}) => {
                 extensions = extensions as { code: number, error: { kind: number, source: string } }

                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Source: ${extensions.source}`
                )
            }
        );
    if (networkError) console.log(`[Network error]: ${networkError}`);
});


const httpLink = createHttpLink({
    uri: 'https://api.hikit.io/gpt/',
    credentials: 'include'
})

const wsLink = new GraphQLWsLink(
    createClient({
        url: "wss://api.hikit.io/gpt/ws",
    })
);

const link = from([
    errorLink,
    split(
        // split based on operation type
        ({query}) => {
            const definition = getMainDefinition(query)
            return (
                definition.kind === "OperationDefinition" &&
                definition.operation === "subscription"
            )
        },
        wsLink,
        httpLink
    )
])

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const gptClient = new ApolloClient({
    link: link,
    cache,
})

const authLink = from([
    errorLink,
    createHttpLink({
        uri: 'https://api.hikit.io/auth/',
        credentials: 'include'
    })
])

const authClient = new ApolloClient({
    link: authLink,
    cache,
})


createApp(App)
    .use(router)
    .use(VueVirtualScroller)
    .provide(ApolloClients, {
        default: gptClient,
        auth: authClient
    })
    .mount('#app')
