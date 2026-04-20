// src/lib/server/gql/schema/queryUser.ts

export const typeDefs = `#graphql
  extend type Query {
    user(id: ID!): User
    users: [User]
  }

  type User {
    id: ID
    username: String
    email: String
  }
`

export const resolvers = {
  Query: {
    user: (_: any, { id }: { id: string }) => {
      return {
        id,
        username: `user_${id}`,
        email: `user${id}@example.com`,
      }
    },
    users: () => [
      { id: '1', username: 'admin', email: 'admin@example.com' },
      { id: '2', username: 'guest', email: 'guest@example.com' },
    ],
  },
}
