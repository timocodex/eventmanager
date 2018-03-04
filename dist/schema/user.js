"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = `
scalar UserObject
type User {
  id:ID!
  username:String!
  email:String!
  firstName:String
  lastName:String
  createdAt:String
  updatedAt:String
}
type RegisterResponse {
  ok: Boolean!
  user: User
  token: String
  refreshToken: String
  errors: [Error!]
}
type LoginResponse {
  ok: Boolean!
  token: String
  refreshToken: String
  errors: [Error!]
}
type Query {
  users: [User]
}
type Mutation {
  addUser(user:UserObject): RegisterResponse
  login(email:String!,password:String!):LoginResponse
}
`;