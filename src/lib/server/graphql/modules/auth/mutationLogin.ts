export const typeDefs = `#graphql
  extend type Mutation {
    login(input: LoginReq!): LoginRes
  }

  input LoginReq {
    username: String!
    password: String!
  }

  type LoginRes {
    success: Boolean
    message: String
  }
`

export const resolvers = {
  Mutation: {
    login: (_: any, { input }: { input: { username: string; password: string } }) => {
      return {
        success: true,
        message: `user_${input.username}, ${input.password}`,
      }
    },
  },
}
