import { gql, query } from '$lib/graphql/client'
import type { PageServerLoad } from './$types'

// Example query using gql tag
const GET_DATA = gql`
  query GetAppInfo {
    hello
    ping
    user(id: "1") {
      id
      username
      email
    }
  }
`

export const load: PageServerLoad = async () => {
  try {
    // Use the Apollo Client wrapper
    const data = await query<{ hello: string; user: any }>(GET_DATA)

    if (!data) {
      throw new Error('No data received from GraphQL server')
    }

    return {
      user: data.user,
      hello: data.hello,
      message: 'Data fetched using Apollo Client from Apollo Server!',
    }
  } catch (error) {
    console.error('Apollo Fetch Error:', error)
    return {
      error: 'Failed to fetch data',
      message: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
