import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core/index.js'
import { secret } from '$config/secret'

/**
 * Apollo Client configuration for SvelteKit server-side usage.
 */
const client = new ApolloClient({
  ssrMode: true,
  link: new HttpLink({
    uri: secret.server.GRAPHQL_URL,
  }),
  cache: new InMemoryCache(),
})

/**
 * Helper to run queries using Apollo Client
 */
export async function query<T>(q: any, variables?: Record<string, any>) {
  const { data } = await client.query<T>({
    query: q,
    variables,
  })
  return data
}

/**
 * Helper to run mutations
 */
export async function mutate<T>(m: any, variables?: Record<string, any>) {
  const { data } = await client.mutate<T>({
    mutation: m,
    variables,
  })
  return data
}

export { gql }
