import * as mutationLogin from './mutationLogin'
import * as mutationRegister from './mutationRegister'

export const authTypeDefs = [
  //
  mutationLogin.typeDefs,
  mutationRegister.typeDefs,
]

export const authResolvers = {
  Mutation: {
    ...mutationLogin.resolvers.Mutation,
    ...mutationRegister.resolvers.Mutation,
  },
}
