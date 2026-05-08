import { guestTypeDefs, guestResolvers } from './modules/guest'
import { userTypeDefs, userResolvers } from './modules/user'
import { authTypeDefs, authResolvers } from './modules/auth'

const baseTypeDefs = `#graphql
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`

export const typeDefs = [
  //
  baseTypeDefs,
  ...guestTypeDefs,
  ...userTypeDefs,
  ...authTypeDefs,
]

export const resolvers = {
  Query: {
    ...guestResolvers.Query,
    ...userResolvers.Query,
    ...authResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
  },
}
