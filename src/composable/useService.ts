import gql from 'graphql-tag'
import * as VueApolloComposable from '@vue/apollo-composable'
import * as VueCompositionApi from 'vue'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
export type ReactiveFunction<TParam> = () => TParam

export const ChatDocument = gql`
  subscription chat($msg: String!) {
    chat(message: $msg)
  }
`

/**
 * __useChatSubscription__
 *
 * To run a query within a Vue component, call `useChatSubscription` and pass it any options that fit your needs.
 * When your component renders, `useChatSubscription` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the subscription
 * @param options that will be passed into the subscription, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/subscription.html#options;
 *
 * @example
 * const { result, loading, error } = useChatSubscription({
 *   msg: // value for 'msg'
 * });
 */
export function useChatSubscription(
  variables: ChatSubscriptionVariables | VueCompositionApi.Ref<ChatSubscriptionVariables> | ReactiveFunction<ChatSubscriptionVariables>,
  options:
    | VueApolloComposable.UseSubscriptionOptions<ChatSubscription, ChatSubscriptionVariables>
    | VueCompositionApi.Ref<VueApolloComposable.UseSubscriptionOptions<ChatSubscription, ChatSubscriptionVariables>>
    | ReactiveFunction<VueApolloComposable.UseSubscriptionOptions<ChatSubscription, ChatSubscriptionVariables>> = {},
) {
  return VueApolloComposable.useSubscription<ChatSubscription, ChatSubscriptionVariables>(ChatDocument, variables, options)
}
export type ChatSubscriptionCompositionFunctionResult = VueApolloComposable.UseSubscriptionReturn<
  ChatSubscription,
  ChatSubscriptionVariables
>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
}

export type Query = {
  __typename?: 'Query'
  ping: Scalars['String']['output']
}

export type Subscription = {
  __typename?: 'Subscription'
  chat: Scalars['String']['output']
}

export type SubscriptionChatArgs = {
  message: Scalars['String']['input']
}

export type ChatSubscriptionVariables = Exact<{
  msg: Scalars['String']['input']
}>

export type ChatSubscription = { __typename?: 'Subscription'; chat: string }
