import * as queryPing from './queryPing'

export const guestTypeDefs = [queryPing.typeDefs]

export const guestResolvers = {
  Query: {
    ...queryPing.resolvers.Query,
  },
}
