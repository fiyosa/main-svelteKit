import * as mutationLogin from './mutationLogin'
import * as mutationRegister from './mutationRegister'
import * as mutationLogout from './mutationLogout'
import * as queryAuth from './queryAuth'

export const authTypeDefs = [
  //
  mutationLogin.typeDefs,
  mutationRegister.typeDefs,
  mutationLogout.typeDefs,
  queryAuth.typeDefs,
]

const Query = {
  ...queryAuth.resolvers.Query,
}

const Mutation = {
  ...mutationLogin.resolvers.Mutation,
  ...mutationRegister.resolvers.Mutation,
  ...mutationLogout.resolvers.Mutation,
}

export const authResolvers = { Query, Mutation }
