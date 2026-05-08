import { queryAuthResolver, queryAuthTypeDef } from '../../repositories/auth/queryAuthRepo'

export const typeDefs = queryAuthTypeDef

export const resolvers = {
  Query: { auth: queryAuthResolver },
}
