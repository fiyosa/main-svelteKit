import { mutationLogoutResolver, mutationLogoutTypeDef } from '../../repositories/auth/mutationLogoutRepo'

export const typeDefs = mutationLogoutTypeDef

export const resolvers = {
  Mutation: { logout: mutationLogoutResolver },
}
