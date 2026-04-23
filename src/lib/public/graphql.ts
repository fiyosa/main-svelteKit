import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client/core/index.js'
import { browser } from '$app/environment'

/**
 * Apollo Client configuration that works for both SSR and CSR.
 */
// Define the URL synchronously to avoid errors
let graphqlUrl = '/graphql'

// On the server, dynamically fetch the absolute URL from secrets
if (!browser) {
  try {
    const { secret } = await import('$config/secret')
    graphqlUrl = secret.server.GRAPHQL_URL
  } catch (e) {
    console.error('Failed to load server secret:', e)
  }
}

export const client = new ApolloClient({
  ssrMode: !browser,
  link: new HttpLink({ uri: graphqlUrl }),
  cache: new InMemoryCache(),
})

/**
 * Helper to run queries using Apollo Client
 */
export async function query<T>(q: any, variables?: Record<string, any>) {
  const { data } = await client.query<T>({
    query: q,
    variables,
    // Add fetchPolicy if needed
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
