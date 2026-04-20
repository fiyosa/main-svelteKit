export const typeDefs = `#graphql
  extend type Query {
    hello: String
    ping: String
  }
`

export const resolvers = {
  Query: {
    hello: () => 'Hello from Apollo Server!',
    ping: () => 'pong',
  },
}
