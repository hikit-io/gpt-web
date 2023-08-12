import {onError} from '@apollo/client/link/error'
import {Snackbar} from '@varlet/ui'
import '@varlet/ui/es/snackbar/snackbar.css'
import {ApolloClient, createHttpLink, from, InMemoryCache, split} from '@apollo/client/core'
import {GraphQLWsLink} from '@apollo/client/link/subscriptions'
import {createClient} from 'graphql-ws'
import {getMainDefinition} from '@apollo/client/utilities'
import {App} from 'vue'
import {ApolloClients} from '@vue/apollo-composable'

const debugHeader = {
    Cookie: 'HIKIT=eyJ0eXAiOiJKV1QiLCJhbGciOiJFZERTQSIsImtpZCI6Ik1DT1dCUSJ9.eyJleHAiOjE2OTI0NDI2MTcsImlzcyI6Imh0dHBzOi8vYXV0aC5oaWtpdC5pbyIsInN1YiI6Ijg0MTJiNTA5YmY0MjQ0Nzg4YzgyOTczOWU1ODU5YWU2IiwiaWF0IjoxNjkxODM3ODE3LCJqdGkiOiI0NzE3ZTQyYzNkYTA0YmNhYTZjZjZhOTRmZDY3Y2JlNCIsIm5iZiI6MTY5MTgzNzgxNywiYXVkIjoiaHR0cHM6Ly8qLmhpa2l0LmlvIn0.Xm06n2APfbE0hIRLxdg5CCUXHeCtCi96Hu8PYTxoAa5upBOB43TrYqVVXqhUJ-rL0UPRWmI-GWHOyJvCGjJFCw; HIKIT_NAME=Nekilc'
}

const errorLink = onError(({graphQLErrors, networkError}) => {
    if (graphQLErrors)
        graphQLErrors.forEach(({message, locations, path, extensions}) => {
            const extension = extensions as { code: number; error: { kind: number; source: string } }
            console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Source: ${extension.error.source}`)
            if (extension.code == 2) {
                Snackbar({
                    type: 'error',
                    content: extension.error.source,
                    onClose: () => {
                        window.location.href = `https://auth.hikit.io/?from=https://gpt.hikit.io`
                    },
                })
            }
        })
    if (networkError) console.log(`[Network error]: ${networkError}`)
})

const httpLink = createHttpLink({
    uri: 'https://api.hikit.io/gpt/',
    credentials: 'include',
})

const wsLink = new GraphQLWsLink(
    createClient({
        url: 'wss://api.hikit.io/gpt/ws',
    }),
)

const link = from([
    errorLink,
    split(
        // split based on operation type
        ({query}) => {
            const definition = getMainDefinition(query)
            return definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        },
        wsLink,
        httpLink,
    ),
])

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const gptClient = new ApolloClient({
    link: link,
    cache: cache,
})

const authLink = from([
    errorLink,
    createHttpLink({
        uri: 'https://api.hikit.io/auth/',
        credentials: 'include',
    }),
])

const authClient = new ApolloClient({
    link: authLink,
    cache: cache,
})

export const install: (app: App) => void = (app) => {
    app.provide(ApolloClients, {
        default: gptClient,
        auth: authClient,
    })
}

export default install
