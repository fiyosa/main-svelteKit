import * as queryUser from './queryUser'

export const userTypeDefs = [queryUser.typeDefs]

export const userResolvers = {
  Query: {
    ...queryUser.resolvers.Query,
  },
}
