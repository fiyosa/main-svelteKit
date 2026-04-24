export const typeDefs = `#graphql
  extend type Mutation {
    register(input: RegisterReq!): RegisterRes
  }

  input RegisterReq {
    username: String!
    password: String!
    email: String!
    name: String!
  }

  type RegisterRes {
    success: Boolean
    message: String
  }
`

export const resolvers = {
  Mutation: {
    register: (_: any, { input }: { input: { username: string; password: string } }) => {
      return {
        success: true,
        message: `user_${input.username}, ${input.password}`,
      }
    },
  },
}
