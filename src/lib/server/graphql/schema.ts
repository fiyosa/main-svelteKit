import { guestTypeDefs, guestResolvers } from './modules/guest'
import { userTypeDefs, userResolvers } from './modules/user'

const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

export const typeDefs = [
  baseTypeDefs,
  ...guestTypeDefs,
  ...userTypeDefs,
]

export const resolvers = {
  Query: {
    ...guestResolvers.Query,
    ...userResolvers.Query,
  },
}
