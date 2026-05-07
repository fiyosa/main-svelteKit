import { mutationLoginResolver, mutationLoginTypeDef } from '../../repositories/auth/mutationLoginRepo'

export const typeDefs = mutationLoginTypeDef

export const resolvers = {
  Mutation: { login: mutationLoginResolver },
}
